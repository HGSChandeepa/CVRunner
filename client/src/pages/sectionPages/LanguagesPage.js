import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserId } from "../../hooks/useGetUserId";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LanguagesPage() {
  const [language, setLanguage] = useState();
  const [allLanguages, setAllLanguages] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);

  const userId = useGetUserId();
  console.log(userId);

  //languages  form
  const addLanguage = async (e) => {
    e.preventDefault();
    setAllLanguages([...allLanguages, language]);

    //store in the database
    try {
      await axios.post("http://localhost:5000/cvdata/languagesData", {
        userId,
        languagesData: [
          {
            languageName: language,
          },
        ],
      });
      setLanguage("");
      //reload the page
      window.location.reload();
      //add toast
      toast.success("Language Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      //add toast
      toast.error("Language Added Failed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      console.error(err);
    }
  };
  //get all the languages
  useEffect(() => {
    const getAllLanguages = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/cvdata/languagesData/${userId}`
        );
        console.log(responce.data);
        setAllLanguages(responce.data);
      } catch (err) {
        console.error(err);
      }
    };

    getAllLanguages();
  }, []);

  //remove language
  const removeLanguage = async (language) => {
    //remove from the state
    setAllLanguages(allLanguages.filter((item) => item !== language));

    //remove from the database
    try {
      await axios.delete(
        `http://localhost:5000/cvdata/lanuagesData/${userId}/${language}`
      );
      alert("Language Removed Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  //technologies form
  const addTechnology = async (e) => {
    e.preventDefault();
    setAllTechnologies([...allTechnologies, technology]);

    //store in the database
    try {
      await axios.post("http://localhost:5000/cvdata/technologiesData", {
        userId,
        technologiesData: [
          {
            technologyName: technology,
          },
        ],
      });
      setTechnology("");
      //reload the page
      window.location.reload();
      //add toast
      toast.success("Technology Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      //add toast
      toast.error("Technology Added Failed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  //get all the technologies
  useEffect(() => {
    const getAllTechnologies = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/cvdata/technologiesData/${userId}`
        );
        setAllTechnologies(responce.data);
      } catch (err) {
        console.error(err);
      }
    };

    getAllTechnologies();
  }, []);

  //remove technology
  const removeTechnology = async (technology) => {
    //remove from the state
    setAllTechnologies(allTechnologies.filter((item) => item !== technology));

    //remove from the database
    try {
      await axios.delete(
        `http://localhost:5000/cvdata/technologiesData/${userId}/${technology}`
      );
      alert("Technology Removed Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-left text-3xl text-yellow-500 font-bold mb-10">
        Languages and Technologies
      </h1>
      <p className=" opacity-100 my-50 text-left">
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

      <div className="md:px-20 md:py-8 mb-5">
        {/* languages */}
        <section className=" text-left mt-10 space-y-10">
          <h1 className="text-lg font-semibold">
            Please Enter Your{" "}
            <span className=" underline text-green-400 font-bold">
              Languages
            </span>
          </h1>

          <div className="flex flex-wrap">
            {allLanguages.map((language) => (
              <div
                key={language._id} // Assuming _id is a unique identifier for languages
                className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/3 md:w-1/4 p-2.5 m-2.5"
              >
                {language.languageName}
                <button
                  className="ml-2.5 text-red-500 hover:text-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:w-28  md:w-32  lg:w-40 px-5 py-2.5 text-center"
                  onClick={() => removeLanguage(language.languageName)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={addLanguage}>
              <input
                id="language"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Language Name"
                required
              />

              <button className=" mt-3 text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm sm:w-28  md:w-32  lg:w-40 px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                Add Language
              </button>
            </form>
          </div>
        </section>

        {/* teck */}
        <section className=" text-left mt-10 space-y-10">
          <h1 className="text-lg font-semibold">
            Please Enter Your{" "}
            <span className=" underline text-green-400 font-bold">
              Technologies
            </span>
          </h1>
          <div>
            <div className="flex flex-wrap">
              {allTechnologies.map((technology) => (
                <div
                  key={technology._id} // Assuming _id is a unique identifier for technologies
                  className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-1/3 md:w-1/4 p-2.5 m-2.5"
                >
                  {technology.technologyName}
                  <button
                    className="ml-2.5 text-red-500 hover:text-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:w-28  md:w-32  lg:w-40 px-5 py-2.5 text-center"
                    onClick={() => removeTechnology(technology.technologyName)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={addTechnology}>
              <input
                id="degree"
                name="technologies"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Language Name"
                required
              />

              <button className=" mt-3 text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm sm:w-28  md:w-32  lg:w-40 px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                Add Technology
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
