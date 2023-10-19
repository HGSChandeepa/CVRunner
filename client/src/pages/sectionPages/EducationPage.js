import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetUserId } from "../../hooks/useGetUserId";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

export default function EducationPage() {
  //navigate
  const navigate = useNavigate();
  //states
  const [educationData, setEducationData] = useState([]);
  const [degree, setDegree] = useState("");
  const [startedYear, setStartedYear] = useState();
  const [endingYear, setEndingYear] = useState();
  const [selectedEducationSection, setSelectedEducationSection] = useState({});

  //get the userid from the hook
  const userId = useGetUserId();
  console.log(userId);

  //get all the education ddetails
  useEffect(() => {
    const getAllEducationData = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/cvdata/educationdata/${userId}`
        );
        setEducationData(responce.data);
      } catch (err) {
        console.error(err);
      }
    };

    getAllEducationData();
  }, []);

  //addNewEducationSection
  const addNewEducationSection = async (e) => {
    e.preventDefault();
    //add new education section
    setEducationData((prevEducationData) => [
      ...prevEducationData,
      {
        degree: degree,
        startedYear: startedYear,
        endingYear: endingYear,
      },
    ]);

    try {
      await axios.post("http://localhost:5000/cvdata/educationdata", {
        userId,
        educationData: [
          {
            degree,
            startedYear,
            endingYear,
          },
        ],
      });

      // Show a success toast
      toast.success("Education section added successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      // Show an error toast
      toast.error("Education section failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }

    //clear the input fields
    setDegree("");
    setStartedYear("");
    setEndingYear("");
  };

  //delete section
  const deleteSection = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/cvdata/educationdata/${userId}/${id}`
      );
      //show a success delete toast
      toast.success("Education section deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      //refresh the page
      window.location.reload();
    } catch (err) {
      // Show an error toast
      toast.error("Cant delete please try again", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  //open single education section
  //here we need to open a popup to edit the education section
  const openSingleEducationSection = (id) => {
    //set the selected education section
    const selectedEducationSection = educationData.find(
      (edu) => edu._id === id
    );
    setSelectedEducationSection(selectedEducationSection);
  };

  return (
    <div>
      <h1 className="text-left text-3xl text-white font-bold mb-10">
        Add Your Education Details
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

      {/* display all the education sectios */}

      <div className="px-20 py-8">
        <section className=" flex flex-col items-start mt-5 ">
          {educationData.map((edu) => {
            return (
              <div
                onClick={(edu) => openSingleEducationSection(edu._id)}
                key={edu._id}
                className="  sm:w-full  lg:w-2/3  bg-gray-800 text-white   px-4 py-1 my-2 rounded-lg flex flex-row items-center justify-between gap-1 text-left cursor-pointer"
              >
                <div className=" flex flex-col items-start">
                  <h3>{edu.degree}</h3>
                  <p>
                    {edu.startedYear} - {edu.endingYear}
                  </p>
                </div>
                <div
                  className=" cursor-pointer"
                  onClick={() => deleteSection(edu._id)}
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
            onSubmit={addNewEducationSection}
            className="flex flex-col mt-10 gap-3"
          >
            <div className="flex flex-col">
              <label className="text-left text-xlfont-bold mb-2">
                Degree or Certification Details
              </label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                name={degree}
                value={degree}
                id="degree"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Add Details..."
                required
              />
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
        </section>
      </div>
    </div>
  );
}
