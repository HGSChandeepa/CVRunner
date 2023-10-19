import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { google, linkedin } from "../assets/index";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["access-token"]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      setCookies("access-token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);

      // Show a success toast
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/add-sections");
    } catch (err) {
      console.error(err);

      // Show an error toast
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const googleLogin = () => {};

  const linkedinLogin = () => {};

  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-10 border-2 border-yellow-600 p-10 rounded-2xl">
      <h1 className="text-xl">Create a free account and launch your career</h1>
      <div className="flex flow-row gap-10">
        <div
          className="flex flex-row items-center justify-center gap-5 bg-black px-4 rounded-lg cursor-pointer w-2/4"
          onClick={googleLogin}
        >
          <h2>GOOGLE</h2>
          <img src={google} alt="google" className="w-10" />
        </div>
        <div
          className="flex flex-row items-center justify-center gap-5 bg-black px-4 rounded-lg cursor-pointer w-2/4"
          onClick={linkedinLogin}
        >
          <h2>LINKEDIN</h2>
          <img src={linkedin} alt="linkedin" className="w-14" />
        </div>
      </div>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          name={username}
          id="username"
          placeholder="username"
          className="w-full text-white bg-black p-2 rounded-lg border-2 border-yellow-600 placeholder-white"
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          name={password}
          id="password"
          placeholder="password"
          className="w-full text-white bg-black p-2 rounded-lg border-2 border-yellow-600 placeholder-white"
        />
        <hr className="opacity-30 py-2" />
        <p>
          Do not have an account?{" "}
          <span
            className="underline text-yellow-500 cursor-pointer"
            onClick={props.toggleRegister}
          >
            Register now
          </span>
        </p>
        <button
          className="px-10 py-2 rounded-md text-black font-medium bg-yellow-400 w-50 mx-auto"
          type="submit"
        >
          LOGIN
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
