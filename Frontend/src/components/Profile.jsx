import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';

const Profile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [note, setNote] = useState('');
  const [pdf, setPdf] = useState(null);
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [notes, setNotes] = useState([]);
  const [title , settitle]= useState("")

  if (!user) {
    return <div>Loading...</div>;
  }

  // 🔹 Fetch Notes
  const fetchNotes = async () => {
    try {
      let response;
      if (user.role === 'teacher') {
        response = await axios.get(`http://localhost:3000/notes/download?username=${user.username}`);
      } else {
        response = await axios.get('http://localhost:3000/notes/all'); // Fetch all notes for students
      }
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes: ', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔹 Handle Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (user.role !== 'teacher') {
      alert("Only teachers can upload notes!");
      return;
    }

    const formData = new FormData();
    formData.append('title', 'Sample Title');
    formData.append('content', note);
    formData.append('uploadedBy', user.username);
    formData.append('role', user.role);
    formData.append('branch', branch);
    formData.append('semester', semester);
    if (pdf) {
      formData.append('pdf', pdf);
    }

    try {
      await axios.post('http://localhost:3000/notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Note uploaded successfully!');
      setNote('');
      setPdf(null);
      setBranch('');
      setSemester('');
      fetchNotes(); // Refresh notes after upload
    } catch (error) {
      console.error('Error uploading note: ', error);
    }
  };

  // 🔹 Handle PDF Download
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
        alert('Failed to download file.');
      }
    } else {
      alert('Unable to download the file.');
    }
  };


  const handledelete  = async(id )=>{
 let data =   await axios.get(`http://localhost:3000/notes/delete/${id}`)
 console.log(data.data);


  }





  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 mt-[10vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome, {user.username}!</h1>
        <p className="text-lg mb-4">Your profile information:</p>
        <p className="text-gray-700 mb-4">Username: {user.username}</p>
        <p className="text-gray-700 mb-4">Role: {user.role}</p>

        {/* 🔹 Upload Form (Only for Teachers) */}
        {user.role === 'teacher' && (
          <form onSubmit={handleUpload} className="space-y-4">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="5"
              placeholder="Enter your note here..."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Branch</option>
              <option value="Computer Eng">Computer Eng</option>
              <option value="IT Eng">ECE</option>
              <option value="Entc Eng">ME</option>
              <option value="AI&ML Eng">EEE</option>
              <option value="Civil Eng">Civil</option>
            </select>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
            <input type="text"   onChange={(e)=>settitle(e.target.value)}    value={title}  placeholder='Enter Your Title...........'                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

            />
            <input
              type="file"
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Upload Note
            </button>
          </form>
        )}

        {/* 🔹 Notes List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">{user.role === 'teacher' ? 'Your Uploaded Notes' : 'Available Notes'}</h2>
          {notes.length > 0 ? (
            notes.map((note) => (
        
              <div key={note._id} className="bg-gray-100 p-4 rounded-lg mb-4">
                      {console.log(note._id)}
                <p className="font-bold">{note.title}</p>
                <p className="text-gray-700">{note.content}</p>
                <p className="text-gray-500">Branch: {note.branch}</p>
                <p className="text-gray-500">Semester: {note.semester}</p>
                {note.pdf && note.pdf.data && note.pdf.contentType && (
                  < div className='flex gap-1'>
                  <button
                    onClick={() => handleDownload(note.pdf)}
                    className="inline-block mt-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                 Download PDF
                  </button>
                  {user.role === 'teacher'&&<button className="inline-block mt-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" onClick={()=>handledelete(note._id)}>Delete</button>}
                  
                      </div>
            
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
