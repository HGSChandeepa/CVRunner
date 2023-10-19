import React from "react";
import { NewSectionsPageDesccription } from "../constants/ConstHomePage";
import SingleSection from "../components/singleSection";
import { Link, useNavigate } from "react-router-dom";
import Space from "../assets/spacce.png";
function NewSectionsPage() {
  //navihator
  const navigate = useNavigate();
  //
  return (
    <div className=" px-20 mb-10">
      <section className=" flex flex-col items-start justify-center ">
        <h1 className=" font-bold text-5xl block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-yellow-400 to-purple-500 lg:inline">
          {" "}
          You can add New Sections
        </h1>
        <p className="mt-10 text-left text-gray-400">
          {NewSectionsPageDesccription}
        </p>
      </section>

      {/* sections */}
      <section className=" flex flex-row justify-around mt-20">
        <section>
          <img src={Space} className="w-[500px]" alt="space" />
        </section>
        <section className=" mt-5 flex flex-col gap-4">
          {/* add a personal details single sectiom */}
          <div className=" bg-gradient-to-r from-yellow-400 to-purple-500 p-2 rounded-lg">
            {" "}
            <SingleSection
              sectionName={"Final CV"}
              onClickMethode={() => {
                navigate("/final-cv");
              }}
            />
          </div>

          <SingleSection
            sectionName={"PERSONAL DETAILS"}
            onClickMethode={() => {
              navigate("/add-sections/personal-data");
            }}
          />

          <SingleSection
            sectionName={"EDUCATION"}
            onClickMethode={() => {
              navigate("/add-sections/education");
            }}
          />
          <SingleSection
            sectionName={"EXPERIENCE"}
            onClickMethode={() => {
              navigate("/add-sections/experience");
            }}
          />

          <SingleSection
            sectionName={"PERSONAL PROJECTS"}
            onClickMethode={() => {
              navigate("/add-sections/projects");
            }}
          />
          <SingleSection
            sectionName={"LANGUAGES AND TECHNOLOGIES"}
            onClickMethode={() => {
              navigate("/add-sections/languages");
            }}
          />
          <SingleSection
            sectionName={"ACHIEVEMENTS"}
            onClickMethode={() => {
              navigate("/add-sections/achievements");
            }}
          />
        </section>
      </section>
    </div>
  );
}

export default NewSectionsPage;
