import React from "react";
import { useState, useEffect } from "react";
import { useGetUserId } from "../../hooks/useGetUserId";
import axios from "axios";
import { RiArrowLeftRightFill, RiDeleteBin5Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AchievementsPage() {
  const [achivements, setAvhivements] = useState([]);
  const [achievementName, setAvhivementName] = useState("");
  const [achievementDescription, setAvhivementdes] = useState("");
  const [achievementYear, setAvhivementYear] = useState("");

  const userId = useGetUserId();

  //form submit
  const addAchievementSection = async (e) => {
    e.preventDefault();
    setAvhivements((prevAchievements) => [
      ...prevAchievements,
      {
        achievementName,
        achievementDescription,
        achievementYear,
      },
    ]);

    //store the data in the database
    try {
      await axios.post("http://localhost:5000/cvdata/achievementsdata", {
        userId,
        achievementsData: [
          {
            achievementName,
            achievementDescription,
            achievementYear,
          },
        ],
      });

      //add toast
      toast.success("Achievement Added Successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      //clear the form
      setAvhivementName("");
      setAvhivementdes("");
      setAvhivementYear("");
    } catch (error) {
      //add toast
      toast.error("Achievement Added Failed", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  //get the data from the database
  useEffect(() => {
    const getAchievementsData = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/cvdata/achievementsdata/${userId}`
        );
        setAvhivements(responce.data);
      } catch (err) {
        console.error(err);
      }
    };

    getAchievementsData();
  }, []);

  //delete a section
  const deleteSection = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/cvdata/achievementsdata/${userId}/${id}`
      );
      alert("Achievement deleted successfully");
      //refresh the page
      window.location.reload();
      setAvhivements((prevAchievements) =>
        prevAchievements.filter((achievements) => achievements._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" px-20">
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

      <div className="md:px-20 py-8">
        {/* display  */}
        {achivements.map((ach) => {
          return (
            <div
              key={ach._id}
              className="  sm:w-full  lg:w-2/3  bg-gray-800 text-white   px-4 py-1 my-2 rounded-lg flex flex-row  items-center  justify-between gap-1 text-left cursor-pointer"
            >
              <div>
                <div className=" flex flex-col font-bold text-xl items-start">
                  <h3>{ach.achievementName}</h3>
                </div>
                <div className=" flex flex-col items-start">
                  <h3>{ach.achievementDescription}</h3>
                </div>
                <div className=" flex flex-col items-start">
                  <h3>{ach.achievementYear}</h3>
                </div>
              </div>

              <div
                className=" cursor-pointer"
                onClick={() => deleteSection(ach._id)}
              >
                <RiDeleteBin5Line />
              </div>
            </div>
          );
        })}
        {/* add new education feild */}
        <section>
          <form
            onSubmit={addAchievementSection}
            className="flex flex-col mt-10 gap-3"
          >
            <div className="flex flex-col">
              <label className="text-left text-xlfont-bold mb-2">
                Add Your{" "}
                <span className=" ">
                  Achievements
                </span>
              </label>
              <input
                onChange={(e) => setAvhivementName(e.target.value)}
                name={achievementName}
                value={achievementName}
                id="title"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Title of the Achievement"
                required
              />
              <hr className=" my-5 opacity-30" />
            </div>
            <div className="flex flex-col">
              <label className="text-left text-xlfont-bold mb-2">
                Add Your Description
              </label>
              <textarea
                onChange={(e) => setAvhivementdes(e.target.value)}
                name={achievementDescription}
                value={achievementDescription}
                id="title"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Description of the Achievement"
                required
              />
              <hr className=" my-5 opacity-30" />
            </div>
            <div className=" flex gap-3 items-center">
              <div className="flex flex-col">
                <label className="text-left text-xlfont-bold mb-2">
                  Achivement year
                </label>
                <input
                  onChange={(e) => setAvhivementYear(e.target.value)}
                  name={achievementYear}
                  value={achievementYear}
                  id="startedYear"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="Number"
                  placeholder="2022"
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
