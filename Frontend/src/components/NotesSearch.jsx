import React, { useState } from 'react';
import axios from 'axios';

const NotesSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/search', { params: { q: query } });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching notes: ', error);
    }
  };

  return (
    <div>
      <h2>Search Notes</h2>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for notes..." />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSearch;
