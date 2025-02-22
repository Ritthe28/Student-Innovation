import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const NotesDownload = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/notes/download');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes: ', error);
      }
    };

    fetchNotes();
  }, []);

  const handleDownload = (pdf) => {
    if (pdf && pdf.data && pdf.contentType && pdf.filename) {
      console.log('Downloading:', pdf.filename);
      const byteArray = new Uint8Array(atob(pdf.data).split('').map(char => char.charCodeAt(0)));
      const blob = new Blob([byteArray], { type: pdf.contentType });
      saveAs(blob, pdf.filename);
    } else {
      console.error('Invalid PDF data:', pdf);
      alert('Unable to download the file.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Download Notes</h2>
      <ul className="space-y-4">
        {notes.map((note, index) => (
          <li key={index} className="p-4 bg-white shadow-md rounded-lg">
            <p className="text-lg font-semibold">{note.title}</p>
            <p className="text-gray-700">{note.content}</p>
            {note.pdf && note.pdf.filename && (
              <button
                onClick={() => handleDownload(note.pdf)}
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
              >
                Download {note.pdf.filename}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesDownload;
