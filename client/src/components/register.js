import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { google, linkedin } from "../assets/index";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register(props) {
  //navigatoer
  const navigate = useNavigate();
  //states for the email and password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //fetching the data from the backend
  const registerSubmit = async (event) => {
    event.preventDefault();
    try {
      //fetch the data
      await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Show a success toast
      toast.success("Register successful", {
        position: "top-right",
        autoClose: 3000,
      });

      //navigate to the Newsections page
      navigate("/add-sections");
    } catch (err) {
      console.error(err);
      // Show an error toast
      toast.error("Registration failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  //login with google
  const googleLogin = () => {};

  //login with linkedin
  const linkedinLogin = () => {};

  return (
    <div className=" mt-5 flex flex-col items-center justify-center gap-10 border-2 border-yellow-600 p-10 rounded-2xl  ">
      <h1 className=" text-xl">Create a free account and launch your career</h1>
      {/* socials */}
      <div className=" flex flow-row gap-10">
        {/* gmail */}
        <div
          className=" flex flex-row items-center justify-center gap-5 bg-black  px-4 rounded-lg cursor-pointer w-2/4"
          onClick={googleLogin()}
        >
          <h2>GOOGLE</h2>
          <img src={google} alt="google" className="w-10" />
        </div>

        {/* linkedin */}
        <div
          className=" flex flex-row items-center justify-center gap-5  bg-black   px-4 rounded-lg cursor-pointer w-2/4"
          onClick={linkedinLogin()}
        >
          <h2>LINKEDIN</h2>
          <img src={linkedin} alt="linkedin" className="w-14" />
        </div>
      </div>

      {/*username email password form */}
      <form onSubmit={registerSubmit} className=" w-full flex flex-col gap-5 ">
        {/* username */}
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          name={username}
          id="username"
          placeholder="username"
          className=" w-full text-white bg-black p-2 rounded-lg border-2 border-yellow-600 placeholder-white"
        />
        {/* email */}

        <input
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          name={email}
          id="email"
          placeholder="email"
          className=" w-full text-white bg-black p-2 rounded-lg border-2 border-yellow-600 placeholder-white"
        />
        {/* password */}

        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          name={password}
          id="password"
          placeholder="password"
          className=" w-full text-white bg-black -900 p-2 rounded-lg border-2 border-yellow-600 placeholder-white"
        />
        {/* conferm password */}
        <input
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          name={confirmPassword}
          id="confirmPassword"
          placeholder="confirmPassword"
          className=" w-full text-white bg-black -900 p-2 rounded-lg border-2 border-yellow-600 placeholder-white"
        />
        <hr className=" opacity-30 py-2" />

        <p>
          Already have an account?{" "}
          <span
            className=" underline text-yellow-500 cursor-pointer"
            onClick={props.toggleRegister}
          >
            Login now
          </span>
        </p>
        <button className="px-10 py-2 rounded-md text-black  font-medium bg-yellow-400 w-50 mx-auto">
          REGISTER
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
