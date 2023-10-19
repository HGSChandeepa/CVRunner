import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";

export default function FinalCV() {
  //here we will get all the data from the database
  //and then we will display it in the final cv

  const userId = useGetUserId();
  const cvContainer = useRef(null);

  //states
  const [allPersonalData, setAllPersonalData] = useState([]);
  const [allEducationData, setAllEducationData] = useState([]);
  const [allExperienceData, setAllExperienceData] = useState([]);
  const [allLanguagesData, setAllLanguagesData] = useState([]);
  const [allTechnologiesData, setAllTechnologiesData] = useState([]);
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [allAchivementsData, setAllAchivementsData] = useState([]);

  console.log(userId);

  //get all the data from the database
  useEffect(() => {
    const getAllData = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/cvdata/userdata/${userId}`
        );
        setAllPersonalData(responce.data.personalData);
        setAllEducationData(responce.data.educationData);
        setAllExperienceData(responce.data.experienceData);
        setAllLanguagesData(responce.data.languagesData);
        setAllTechnologiesData(responce.data.technologiesData);
        setAllProjectsData(responce.data.projectsData);
        setAllAchivementsData(responce.data.achievementsData);
      } catch (err) {
        console.error(err);
      }
    };

    getAllData();
  }, [userId]);

  // ... (Previous code remains the same)

  const handleDownloadPDF = () => {
    // Get the element.
    const element = cvContainer.current;
    if (!element) {
      console.error("CV container element not found");
      return;
    }

    //convert the element to html
    const html = ReactDOMServer.renderToString(element);

    // Configuration for PDF generation
    const pdfOptions = {
      margin: 10,
      filename: "your_cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generate PDF
    html2pdf()
      .from(element)
      .set(pdfOptions)
      .outputPdf((pdf) => {
        const blob = new Blob([pdf], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "your_cv.pdf";
        a.click();
      });
  };

  return (
    <div className="flex">
      <div
        className="px-8 py-4 bg-white  w-[794px] mx-20 my-8 text-black text-left "
        ref={cvContainer}
        id="cv-container"
      >
        <div className="mb-8 ">
          <h2 className="text-xl font-bold mb-4  border-b-4 ">
            Personal Data
          </h2>
          <p className="mb-2">
            <span className="font-semibold">First Name:</span>{" "}
            {allPersonalData.firstName}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Last Name:</span>{" "}
            {allPersonalData.lastName}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span>{" "}
            {allPersonalData.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Address:</span>{" "}
            {allPersonalData.address}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Date of Birth:</span>{" "}
            {/* {new Date(allPersonalData.dateOfBirth.$date).toLocaleDateString()} */}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone Number:</span>{" "}
            {allPersonalData.phoneNumber}
          </p>

          <div className="flex gap-5">
            <p className="mb-2">
              <a
                href={allPersonalData.gitHub}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-semibold  text-blue-600">GitHub</span>{" "}
              </a>
            </p>
            <p className="mb-2">
              <a
                href={allPersonalData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-semibold text-blue-600">LinkedIn</span>{" "}
              </a>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4  border-b-4">
            Education Data
          </h2>
          {allEducationData.map((education, index) => (
            <div key={index} className="mb-2">
              <p>
                <span className="font-semibold">Degree:</span>{" "}
                {education.degree}
              </p>
              <p>
                <span className="font-semibold">Started Year:</span>{" "}
                {education.startedYear}
              </p>
              <p>
                <span className="font-semibold">Ending Year:</span>{" "}
                {education.endingYear}
              </p>
            </div>
          ))}
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4  border-b-4">
            Experience Data
          </h2>
          {allExperienceData.map((ex, index) => (
            <div key={index} className="mb-2">
              <p>
                <span className="font-semibold">company Name:</span>{" "}
                {ex.companyName}
              </p>
              <p>
                <span className="font-semibold">Job Title:</span>{" "}
                {ex.jobTitle}
              </p>
              <p>
                <span className="font-semibold">Job Description:</span>{" "}
                {ex.jobDescription}
              </p>

              <p>
                <span className="font-semibold">Started Year:</span>{" "}
                {ex.startedYear}
              </p>
              <p>
                <span className="font-semibold">Ending Year:</span>{" "}
                {ex.endingYear}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4  border-b-4">
            Personal Projects Data
          </h2>
          {allProjectsData.map((pp, index) => (
            <div key={index} className="mb-2">
              <p>
                <span className="font-semibold">project Name:</span>{" "}
                {pp.projectName}
              </p>
              <p>
                <span className="font-semibold">teckstack:</span>{" "}
                {pp.teckstack}
              </p>
              <p>
                <span className="font-semibold">Project Description:</span>{" "}
                {pp.projectDescription}
              </p>

              <p>
                <span className="font-semibold">Started Year:</span>{" "}
                {pp.startedYear}
              </p>
              <p>
                <span className="font-semibold">Ending Year:</span>{" "}
                {pp.endingYear}
              </p>

              <p>
                <span className="font-semibold"></span>{" "}
               <a className="font-semibold text-blue-600 underline"  href= {pp.projectLink}>Link</a>
              </p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4  border-b-4">
            Languages Data
          </h2>
          {allLanguagesData.map((language, index) => (
            <p key={index} className="mb-2">
              <span className="font-semibold">Language:</span>{" "}
              {language.languageName}
            </p>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4  border-b-4">
            Technologies Data
          </h2>
          {allTechnologiesData.map((technology, index) => (
            <p key={index} className="mb-2">
              <span className="font-semibold">Technology:</span>{" "}
              {technology.technologyName}
            </p>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4  border-b-4">
            Achievements Data
          </h2>
          {allAchivementsData.map((achievement, index) => (
            <div key={index} className="mb-2">
              <p>
                <span className="font-semibold">Achievement Name:</span>{" "}
                {achievement.achievementName}
              </p>
              <p>
                <span className="font-semibold">Achievement Description:</span>{" "}
                {achievement.achievementDescription}
              </p>
              <p>
                <span className="font-semibold">Achievement Year:</span>{" "}
                {achievement.achievementYear}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-2/5 text-left space-y-10  mt-6  border-b-4">
        <p className=" text-left ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
          sequi itaque eaque, debitis sint nostrum, quis repellendus ratione vel
          illo suscipit impedit libero explicabo deserunt ipsam eligendi id.
          Omnis, ducimus
        </p>

        <div className=" flex flex-col ">
          <a href="/add-sections" className=" w-40">
            <button
              className="bg-gray-600 text-white py-2 px-4 rounded mt-4 hover:bg-yellow-600 ease-in-out"
              // onClick={handleDownloadPDF}
            >
              Keep Editing
            </button>
          </a>
          <hr className=" mt-10" />

          <p className=" text-left mt-10 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
            sequi itaque eaque, debitis sint nostrum
          </p>
          <button
            className="bg-gradient-to-r from-yellow-400 to-purple-500 hover:from-yellow-600 hover:to-purple-600 ease-in-out text-white py-2 px-4 rounded mt-4 hover:bg-yellow-600 ease-in-out"
            // onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
