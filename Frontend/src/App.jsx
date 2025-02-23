import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import YouTubeSearch from './components/YoutubePlaylist';
import EngineeringCourses from './components/EngineeringCources';
import Navbar from './components/Navbar';
import Feedback from './components/Feedback';
import FrontPage from './components/Chatbot';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import Sites from './components/Sites';
import './index.css';

const App = () => {
const [log, setlog ]= useState(false)
const [state, setstate]= useState(false)


  return (
    <>
    <Navbar log= {log} />
    <Routes>
     
      
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<><SignUp /> <Footer/></> } />
          <Route path="/login" element={<><Login setlog={setlog} />  <Footer/></>} />
          {log&&<><Route path="/profile" element={<><Profile /> <Footer/></>} />
          <Route path='/yt' element={<div><YouTubeSearch/>  </div>}> </Route>
          <Route path='/ec' element={<><EngineeringCourses/><Footer/></>}></Route>
          <Route path='/feedback' element={<><Feedback /> <Footer/></>}></Route>
          <Route path='/navbar' element={<><Navbar/><Footer/></>}></Route>
          <Route path='/chatbot' element={<><FrontPage/><Footer/></>}></Route>
          <Route path='/footer' element={<Footer />}></Route>
           <Route path='/sites' element={<Sites/>}></Route> </> }
       
    </Routes>
<ToastContainer/>
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
