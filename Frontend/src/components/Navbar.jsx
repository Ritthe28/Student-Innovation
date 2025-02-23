import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = ({log}) => {
    const navigate = useNavigate()
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 top-0 fixed w-[100vw]">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          alt="Engineering Notes logo"
          className="mr-2"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/dwx3RchMprraljOKVtxxKWr_zHjq5X1TR7G0ZbQHo3o.jpg"
          width="40"
        />
        <span className="text-white font-semibold text-lg cursor-pointer" onClick={()=>navigate("/")}>Eng Notes</span>
      </div>

      {/* Navigation Links */}
      {log&&<>
    
      <div className="flex items-center space-x-6">
      <a className="text-white text-sm hover:text-gray-300 cursor-pointer"  onClick={()=>navigate("/ec")}>
          Eng Notes
        </a>
        <a onClick={()=>navigate("/yt")} className="text-white text-lg hover:text-gray-300 cursor-pointer" href="#">
    Learn
        </a>
      
        <a className="text-white text-sm hover:text-gray-300 cursor-pointer" onClick={()=>navigate("/sites")}>
          Tech-Updates
        </a>
        <a className="text-white text-sm hover:text-gray-300 cursor-pointer" onClick={()=>navigate("/chatbot")}>
          Chatbot
        </a>
      {log ?<button onClick={()=>navigate("profile")} className="rounded-full p-[1px]">🌟</button>:null}
      </div></>}
    </nav>
  );
};

export default Navbar;
