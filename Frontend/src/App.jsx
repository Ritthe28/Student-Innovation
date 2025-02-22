import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import YouTubeSearch from './components/YoutubePlaylist';
import EngineeringCourses from './components/EngineeringCources';
import Navbar from './components/Navbar';
import Feedback from './components/Feedback';
import './index.css';

const App = () => {
const [log, setlog ]= useState(false)


  return (
    <>
    <Navbar log= {log} />
    <Routes>
     
      
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setlog={setlog} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/yt' element={<YouTubeSearch/>}> </Route>
          <Route path='/ec' element={<EngineeringCourses/>}></Route>
          <Route path='/feedback' element={<Feedback />}></Route>
          <Route path='navbar' element={<Navbar/>}></Route>
       
    </Routes>
    </>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to the Auth & Notes App</h2>
      <div className="flex space-x-4">
        <a
          href="/signup"
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default App;
