import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PersonalDataPage() {
  //navigate
  const navigate = useNavigate();
  //states for the form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //handleFormSubmit function
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Get the userId from the localStorage
    const userId = localStorage.getItem("userId");

    try {
      // Send the data
      await axios.put("http://localhost:5000/cvdata/personaldata", {
        userId,
        personalData: {
          firstName,
          lastName,
          profileImage,
          email,
          address,
          linkedIn,
          gitHub,
          dateOfBirth,
          phoneNumber,
        },
      });

      // Show a success toast
      toast.success("Personal data saved successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      // Navigate to the sections page
      navigate("/add-sections");
    } catch (err) {
      // Show an error toast
      toast.error("Personal data failed to save. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  //
  return (
    <div>
      <h1 className="text-left text-3xl text-white -500 font-bold mb-10">
        Tell us a little about yourself
      </h1>
      <p className=" opacity-60 my-50 text-left">
        Fill Your Personal Details: Provide the necessary information for your
        CV, including your name, contact details, current company or
        institution, and relevant website links. These details help potential
        employers or recruiters connect with you and assess your qualifications
        effectively. Complete this section accurately to create a professional
        and compelling CV
      </p>
      <form onSubmit={handleFormSubmit}>
        <div className=" flex flex-col md:px-20   mt-11  gap-6 md:grid-cols-2">
          {/* first name and last name */}
          <section className=" flex justify-between  items-center ">
            <div className=" flex flex-col w-2/3 gap-4">
              <div>
                <label
                  htmlFor={firstName}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  id={firstName}
                  name={firstName}
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={lastName}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  id={lastName}
                  name={lastName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            {/* profile image section */}
          </section>

          <div>
            <label
              htmlFor={email}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id={email}
              name={email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor={address}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              id={address}
              name={address}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123 Main Street, Anytown, USA"
              required
            />
          </div>

          {/* social links */}
          <section className=" flex justify-center items-center gap-5">
            <div className="w-full ">
              <label
                htmlFor={linkedIn}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Linkedin
              </label>
              <input
                onChange={(e) => setLinkedIn(e.target.value)}
                type="url"
                id={linkedIn}
                name={linkedIn}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://www.linkedin.com/in/samin-chandeepa/"
                required
              />
            </div>
            <div className=" w-full">
              <label
                htmlFor={gitHub}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Git Hub
              </label>
              <input
                onChange={(e) => setGitHub(e.target.value)}
                type="url"
                id={gitHub}
                name={gitHub}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://www.github.com/in/samin-chandeepa/"
                required
              />
            </div>
          </section>

          <section className=" flex justify-center items-center gap-5">
            <div className="w-full ">
              <label
                htmlFor={dateOfBirth}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              <input
                onChange={(e) => setDateOfBirth(e.target.value)}
                type="date"
                id={dateOfBirth}
                name={dateOfBirth}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className=" w-full">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
                id={phoneNumber}
                name={phoneNumber}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0712345678"
                required
              />
            </div>
          </section>
          <div className=" text-left">
            <p className=" py-3 opacity-30">save the details and continue</p>
            <button className="text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-60 sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
              Submit
            </button>
          </div>
          <br />
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}
