import React from "react";
import { FcIdea, FcNext } from "react-icons/fc";

function SingleSection({ onClickMethode, sectionName }) {
  return (
    <div
      onClick={onClickMethode}
      className=" flex flex-row justify-center items-center gap-4 bg-gray-700 p-5 rounded-md cursor-pointer hover:bg-gray-800"
    >
      <FcIdea className=" text-xl" />
      <h3>{sectionName}</h3>
      <FcNext />
    </div>
  );
}

export default SingleSection;
