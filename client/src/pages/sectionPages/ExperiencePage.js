import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetUserId } from "../../hooks/useGetUserId";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExperiencePage() {
  const navigate = useNavigate();
  //states
  const [experienceData, setExperienceData] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startedYear, setStartedYear] = useState("");
  const [endingYear, setEndingYear] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  //user id
  const userId = useGetUserId();

  //get all the experience details
  useEffect(() => {
    const getAllExperienceData = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/cvdata/experiencedata/${userId}`
        );
        setExperienceData(responce.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAllExperienceData();
  }, []);

  //
  const addNewExperienceSection = async (e) => {
    e.preventDefault();
    //add new education section
    setExperienceData((prevExperienceData) => [
      ...prevExperienceData,
      {
        companyName: companyName,
        jobTitle: jobTitle,
        startedYear: startedYear,
        endingYear: endingYear,
        jobDescription: jobDescription,
      },
    ]);

    try {
      await axios.post("http://localhost:5000/cvdata/experiencedata", {
        userId,
        experienceData: [
          {
            companyName: companyName,
            jobTitle: jobTitle,
            startedYear: startedYear,
            endingYear: endingYear,
            jobDescription: jobDescription,
          },
        ],
      });

      toast.success("Experience data added successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error("Failed to add experience data", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }

    //clear the input fields
    setCompanyName("");
    setJobDescription("");
    setJobTitle("");
    setStartedYear("");
    setEndingYear("");
  };

  //delete section
  const removeSection = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/cvdata/experiencedata/${userId}/${id}`
      );
      toast.success("Experience data deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      //refresh the page
      window.location.reload();
    } catch (err) {
      toast.error("Failed to delete experience data", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-left text-3xl text-yellow-500 font-bold mb-10">
        Add Your Experience
      </h1>
      <p className=" opacity-30 my-50 text-left">
        Education: I have pursued my education with passion and dedication. I
        hold <strong>[Degree or Certification]</strong> in{" "}
        <strong>[Field of Study]</strong> from
        <strong>[University/Institution]</strong>. During my academic journey, I
        gained valuable knowledge and skills in{" "}
        <strong>[Areas of Focus]</strong> . My education has provided me with a
        solid foundation and a deep understanding of{" "}
        <strong> [Field or Industry]</strong>. I continue to expand my knowledge
        through continuous learning and staying updated with the latest
        developments in my field
      </p>

      {/* display all the experience sectios */}
      <div className=" md:px-20 md:py-8">
        <section className=" flex flex-col items-start mt-5">
          {experienceData.map((exp) => {
            return (
              <div
                key={exp._id}
                className=" sm:w-full  lg:w-2/3  bg-gray-800 text-white   px-4 py-1 my-2 rounded-lg flex flex-row items-center justify-between gap-1 text-left cursor-pointer"
              >
                <div className=" flex flex-col items-start">
                  <h3>
                    {exp.companyName} -{" "}
                    <span className=" opacity-80 text-md">{exp.jobTitle}</span>
                  </h3>
                  <p>
                    {exp.startedYear} - {exp.endingYear}
                  </p>
                  <p className=" text-sm opacity-50">{exp.jobDescription}</p>
                </div>
                <div
                  className=" cursor-pointer"
                  onClick={() => removeSection(exp._id)}
                >
                  <RiDeleteBin5Line />
                </div>
              </div>
            );
          })}
        </section>

        {/* add new education feild */}
        <section>
          <form
            onSubmit={addNewExperienceSection}
            className="flex flex-col mt-10 gap-5"
          >
            <div className="flex flex-col">
              <label
                htmlFor="companyName"
                className="text-left text-xlfont-bold mb-2"
              >
                Add the Company Name
              </label>
              <input
                onChange={(e) => setCompanyName(e.target.value)}
                name={companyName}
                value={companyName}
                id="degree"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Google..."
                required
              />
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="jobTitle"
                  className="text-left text-xlfont-bold mb-2"
                >
                  Enter your Job Title
                </label>
                <input
                  onChange={(e) => setJobTitle(e.target.value)}
                  name={jobTitle}
                  value={jobTitle}
                  id="degree"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Software developer..."
                  required
                />
              </div>
              <hr className=" my-5 opacity-30" />
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="jobDescription"
                  className="text-left text-xlfont-bold mb-2"
                >
                  Add your Job Description
                </label>
                <textarea
                  onChange={(e) => setJobDescription(e.target.value)}
                  name={jobDescription}
                  value={jobDescription}
                  id="degree"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Software developer..."
                  required
                />
              </div>
              <hr className=" my-5 opacity-30" />
            </div>
            <div className=" flex gap-3 items-center">
              <div className="flex flex-col">
                <label className="text-left text-xlfont-bold mb-2">
                  Started year
                </label>
                <input
                  onChange={(e) => setStartedYear(e.target.value)}
                  name={startedYear}
                  value={startedYear}
                  id="startedYear"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="2022"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-left text-xlfont-bold mb-2">
                  Ending Year
                </label>
                <input
                  onChange={(e) => setEndingYear(e.target.value)}
                  name={endingYear}
                  value={endingYear}
                  id="endingYear"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="2025"
                  required
                />
              </div>
            </div>
            <button className=" mt-3 text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm sm:w-28  md:w-32  lg:w-40 px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
              Submit
            </button>
          </form>
          <br />
          <br />
        </section>
      </div>
    </div>
  );
}
