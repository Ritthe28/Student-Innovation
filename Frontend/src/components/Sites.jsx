import { useState } from "react";

function Sites() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 text-white p-4 flex space-x-6">
        <button className="hover:underline" onClick={() => setActivePage("home")}>Home</button>
        <button className="hover:underline" onClick={() => setActivePage("internship")}>Internships</button>
        <button className="hover:underline" onClick={() => setActivePage("hackathon")}>Hackathons</button>
      </nav>

      {/* Page Content */}
      <div className="p-6">
        {activePage === "home" && (
          <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Welcome to Student Resource Hub</h1>
            <p className="mt-4 text-lg">Find internships, hackathons, and free study materials all in one place.</p>

            {/* Clickable divs for navigation */}
            <div className="flex justify-center mt-6 space-x-4">
              <div 
                className="bg-blue-500 text-white p-6 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                onClick={() => setActivePage("internship")}
              >
                Go to Internships
              </div>
              <div 
                className="bg-red-500 text-white p-6 rounded-lg cursor-pointer hover:bg-red-600 transition"
                onClick={() => setActivePage("hackathon")}
              >
                Go to Hackathons
              </div>
            </div>
          </div>
        )}

        {activePage === "internship" && (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Internship Opportunities</h2>
            <ul className="list-disc ml-6 space-y-2 flex justify-center flex-wrap gap-2 list-none">
              <li><a href="https://internshala.com" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">Internshala</a></li>
              <li><a href="https://angel.co/jobs" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">AngelList</a></li>
              <li><a href="https://www.linkedin.com/jobs/internships" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">LinkedIn Internships</a></li>
              <li><a href="https://www.glassdoor.co.in" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">Glassdoor</a></li>
              <li><a href="https://in.indeed.com" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">Indeed</a></li>
              <li><a href="https://www.wayup.com" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">Wayup</a></li>
              <li><a href="https://www.angellist.com" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">Angellist</a></li>
              <li><a href="https://www.chegg.com" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">Chegg</a></li>
              <li><a href="https://joinhandshake.com" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">Joinhandshake</a></li>
              <li><a href="https://www.careerbuilder.com" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">Careerbuilder</a></li>
              <li><a href="https://www.simplyhired.com" className="block w-64 h-12 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition">Simplyhired</a></li>
            </ul>
            <button 
              className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              onClick={() => setActivePage("home")}
            >
              Back to Home
            </button>
          </div>
        )}

        {activePage === "hackathon" && (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold text-red-600 mb-4 from-neutral-900">Upcoming Hackathons</h2>
            <ul className="list-disc ml-6 space-y-2 flex justify-center flex-wrap gap-2 list-none">
              <li><a href="https://devpost.com" className="block w-64 h-12 bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition">Devpost</a></li>
              <li><a href="https://mlh.io" className="block w-64 h-12 bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition">Major League Hacking</a></li>
              <li><a href="https://www.techcrunch.com/" className="block w-64 h-12 bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition">Techcrunch</a></li>
              <li><a href="https://www.github.com" className="block w-64 h-12 bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition">Github</a></li>
              <li><a href="https://www.hackathonsinternational.com/" className="block w-64 h-12 bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition">Hackathons International</a></li>
              <li><a href="https://www.hackerrank.com/" className="block w-64 h-12 bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition">Hacker Rank</a></li>

              <li><a href="https://www.hackathon.com/" className="block w-64 h-12 bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition">Hackathon</a></li>
              <li><a href="https://www.hackerearth.com/challenges/" className="block w-64 h-12 bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-600 transition">HackerEarth</a></li>
            </ul>
            <button 
              className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              onClick={() => setActivePage("home")}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sites;