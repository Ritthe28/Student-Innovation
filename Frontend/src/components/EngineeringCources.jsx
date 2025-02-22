import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { saveAs } from "file-saver";

const EngineeringCourses = () => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Subject data based on semester
  const subjectsBySemester = {
    "Computer Eng Sem 1": ["Maths 1", "Physics", "Chemistry"],
    "Computer Eng Sem 2": ["Maths 2", "Programming", "Electronics"],
    // Add more semesters and subjects here...
  };

  // Toggle Course Dropdown
  const toggleSubMenu = (course) => {
    setActiveSubMenu(activeSubMenu === course ? null : course);
    setSelectedCourse(course);
  };

  // Show Subjects and Fetch Notes
  const showSubjects = (sem) => {
    setSelectedSemester(sem);
    fetchNotes(selectedCourse, sem);
  };

  // Fetch Notes from API
  const fetchNotes = async (course, semester) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/notes/course-semester?course=${course}&semester=${semester}`
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes: ", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Updated Handle PDF Download
  const handleDownload = (pdf) => {
    if (pdf && pdf.data && pdf.contentType) {
      try {
        const byteCharacters = atob(pdf.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: pdf.contentType });
        saveAs(blob, pdf.filename);
      } catch (error) {
        console.error("Error decoding Base64:", error);
        alert("Failed to download file.");
      }
    } else {
      alert("Unable to download the file.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-[10vh]">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 p-6 shadow-lg w-[23vw]">
        <h1 className="text-2xl font-bold mb-6">Engineering Notes</h1>
        <ul className="space-y-4">
          {["Computer Eng", "IT Eng", "Entc Eng", "AI&ML Eng", "Civil Eng", "Mechanical Eng"].map((course, index) => (
            <li key={index} className="space-y-2">
              {/* Course Dropdown */}
              <div
                className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                onClick={() => toggleSubMenu(course)}
              >
                <span>{course}</span>
                {activeSubMenu === course ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
              </div>

              {/* Semester Dropdown */}
              {activeSubMenu === course && (
                <ul className="ml-6 mt-2 space-y-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <li
                      key={sem}
                      className="cursor-pointer p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                      onClick={() => showSubjects(sem)}
                    >
                      Sem {sem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Notes Section */}
        {selectedSemester ? (
          
          <div className="mt-6">
            
            <h1 className="text-3xl font-bold mb-4">{selectedSemester} Notes</h1>
            {loading ? (
              <p>Loading notes...</p>
            ) : notes.length > 0 ? (
              <ul className="space-y-2">
                
                {notes.map((note, index) => (
                  <li key={index} className="p-2 bg-gray-800 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-bold">{note.title}</p>
                      <p className="text-gray-400 text-sm">{note.content}</p>
                    </div>
                    {note.pdf && note.pdf.data && note.pdf.contentType && (
                      <button
                        className="bg-green-500 text-black px-3 py-1 rounded hover:bg-green-600 transition"
                        onClick={() => handleDownload(note.pdf)}
                      >
                        Download
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No notes available.</p>
            )}
          </div>
        ):<h1 className="text-3xl">Your Notes are Here </h1>}
      </div>
    </div>
  );
};

export default EngineeringCourses;
