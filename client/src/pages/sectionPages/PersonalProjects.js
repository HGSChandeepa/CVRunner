import axios from "axios";
import React, { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useGetUserId } from "../../hooks/useGetUserId";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PersonalProjects() {
  //userID
  const userId = useGetUserId();

  const [projectData, setProjectData] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [teckStack, setTeckStack] = useState("");
  const [link, setLink] = useState("");
  const [startedYear, setStartedYear] = useState("");
  const [endingYear, setEndingYear] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  //form submit
  const addProjectSection = async (e) => {
    e.preventDefault();
    // Add new education section
    setProjectData((prevProjectData) => [
      ...prevProjectData,
      {
        projectName: projectName,
        teckstack: teckStack,
        projectLink: link,
        projectDescription: projectDescription,
        startedYear: startedYear,
        endingYear: endingYear,
      },
    ]);

    // Save in the database

    try {
      await axios.post("http://localhost:5000/cvdata/projectsdata", {
        userId,
        projectsData: [
          // Corrected property name from projectData to projectsData
          {
            projectName: projectName,
            teckstack: teckStack,
            projectLink: link,
            projectDescription: projectDescription,
            startedYear: startedYear,
            endingYear: endingYear,
          },
        ],
      });

      //clear the form
      setProjectName("");
      setTeckStack("");
      setLink("");
      setStartedYear("");
      setEndingYear("");
      setProjectDescription("");

      //show toast
      toast.success("Project data added successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error("Project data added Faild", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  //get all the project details
  useEffect(() => {
    const getAllProjectData = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/cvdata/projectsdata/${userId}`
        );
        setProjectData(responce.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAllProjectData();
  }, []);

  //delete project section
  const deleteProjectSection = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/cvdata/projectsdata/${userId}/${id}`
      );
        
      //reload the page
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" px-20">
      <h1 className="text-left text-3xl text-white-500 font-bold mb-10">
        Add Your Personal Projects
      </h1>
      <p className=" opacity-70 my-50 text-left">
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
          {projectData.map((prj) => {
            return (
              <div
                key={prj._id}
                className=" sm:w-full    bg-gray-800 text-white   px-4 py-1 my-2 rounded-lg flex flex-row items-center justify-between gap-1 text-left cursor-pointer"
              >
                <div className=" flex flex-col items-start">
                  <h3>
                    {prj.projectName} -{" "}
                    <span className=" opacity-80 text-md">{prj.teckStack}</span>
                  </h3>
                  <p>
                    {prj.startedYear} - {prj.endingYear}
                  </p>
                  <p className=" text-sm opacity-50">
                    {prj.projectDescription}
                  </p>
                </div>
                <div
                  className=" cursor-pointer"
                  onClick={() => deleteProjectSection(prj._id)}
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
            onSubmit={addProjectSection}
            className="flex flex-col mt-10 gap-5"
          >
            <div className="flex flex-col">
              <label
                htmlFor="companyName"
                className="text-left text-xlfont-bold mb-2"
              >
                Add the nema of your project
              </label>
              <input
                onChange={(e) => setProjectName(e.target.value)}
                name={projectName}
                value={projectName}
                id="degree"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Ecommerce website..."
                required
              />
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="jobTitle"
                  className="text-left text-xlfont-bold mb-2"
                >
                  Add The Teck Stack You Used in Your Project
                </label>
                <input
                  onChange={(e) => setTeckStack(e.target.value)}
                  name={teckStack}
                  value={teckStack}
                  id="degree"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="MERN stack..."
                  required
                />
              </div>
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="jobTitle"
                  className="text-left text-xlfont-bold mb-2"
                >
                  Link to Your Project
                </label>
                <input
                  onChange={(e) => setLink(e.target.value)}
                  name={link}
                  value={link}
                  id="degree"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="link"
                  required
                />
              </div>
              <hr className=" my-5 opacity-30" />
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="jobDescription"
                  className="text-left text-xlfont-bold mb-2"
                >
                  Short Description About Your Project
                </label>
                <textarea
                  onChange={(e) => setProjectDescription(e.target.value)}
                  name={projectDescription}
                  value={projectDescription}
                  id="degree"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="This is a full stack ecommerce website..."
                  required
                />
              </div>
              <hr className=" my-5 opacity-30" />
            </div>
            <div className=" flex gap-3 items-center">
              <div className="flex flex-col">
                <label className="text-left text-xlfont-bold mb-2">
                  Started Year
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
                  Ended Year
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
