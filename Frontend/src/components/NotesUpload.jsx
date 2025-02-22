import React, { useState } from 'react';
import axios from 'axios';

const NotesUpload = () => {
  const [note, setNote] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/upload', { content: note });
      alert('Note uploaded successfully!');
      setNote('');
    } catch (error) {
      console.error('Error uploading note: ', error);
    }
  };

  return (
    <div>
      <h2>Upload Notes</h2>
      <form onSubmit={handleUpload}>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows="5" cols="33" placeholder="Enter your note here..."></textarea>
        <br />
        <button type="submit">Upload Note</button>
      </form>
    </div>
  );
};

export default NotesUpload;
