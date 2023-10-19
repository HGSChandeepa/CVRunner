import React, { useState } from "react";
import { HomePageDescription } from "../constants/ConstHomePage";
import Register from "../components/register";
import Login from "../components/login";
import NewSectionsPage from "./NewSectionsPage";

function HomePage() {
  const userId = window.localStorage.getItem("userId");
  const [isRegister, setIsRegister] = useState(false);

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="px-20 mb-10">
      {userId ? (
        <NewSectionsPage />
      ) : (
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
              Create Your
            </h2>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
              Next Level Resume
            </h1>
          </div>

          <p className="text-left text-gray-500">{HomePageDescription}</p>

          <section className="flex flex-col items-center justify-center gap-10 mt-10">
            <h1 className="text-xl text-yellow-500 font-bold">
              Create your free account
            </h1>

            {isRegister ? (
              <Register toggleRegister={toggleRegister} />
            ) : (
              <Login toggleRegister={toggleRegister} />
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default HomePage;
