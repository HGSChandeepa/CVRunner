import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Navbar() {
  const userId = localStorage.getItem("userId");
  const [allPersonalData, setAllPersonalData] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/cvdata/userdata/${userId}`
        );
        setAllPersonalData(responce.data.personalData);
      } catch (err) {
        console.error(err);
      }
    };

    getAllData();
  }, [userId]);

  //logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div>
      <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" class="flex items-center">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CVRunner
            </span>
          </a>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className=" flex gap-3 items-center justify-center ">
                <a
                  href="/final-cv"
                  class=" bg-yellow-500 px-5 py-2 rounded-lg text-sm text-white font-medium hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 flex  justify-center items-center"
                >
                  current progress
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-eye"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div class="flex md:order-2">
            {userId ? (
              <div className=" flex gap-5 jc items-center">
                <div class="flex items-center space-x-4 text-left">
                  <div class="font-medium dark:text-white">
                    <div>
                      {allPersonalData.firstName} {allPersonalData.lastName}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      Joined in August 2023
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  type="button"
                  class=" bg-yellow-500 px-5 py-2 rounded-lg text-sm text-white font-medium hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                class=" bg-yellow-500 px-5 py-2 rounded-lg text-sm text-white font-medium hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300"
              >
                Get started
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
