import React from 'react';
// import coding_background from "./assets/coding_background.webp";
import student from "../assets/student.png"

const Photo = () => {
  return (
    <div className="h-[70vh] flex mt-[10vh]">
      <div className="w-1/2 bg-cover bg-center h-[70vh]" style={{ backgroundImage: `url(${student})` }}></div>

      <div className="w-1/2 bg-black p-8 flex items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            WE ARE HERE FOR HELP
          </h1>
          <p className="text-lg md:text-xl italic text-gray-200">
            This website contains Engineering Notes for Study
          </p>
        </div>
      </div>
    </div>


  );
}

export default Photo;
