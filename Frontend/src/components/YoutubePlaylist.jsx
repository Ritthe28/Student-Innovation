import React, { useState } from "react";

const API_KEY = "AIzaSyCv0nEaQNqAQxUCW5WH_h1HcDcLoa2jkls";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const fetchSearchResults = async (query, maxResults = 20) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(query+"")}&type=video&order=viewCount&key=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("An error occurred:", error.message);
        return null;
    }
};

const YouTubeSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!query) return;
        const searchResponse = await fetchSearchResults(query);
        if (searchResponse && searchResponse.items) {
            setResults(searchResponse.items);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto mt-[10vh]">
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search YouTube..."
                    className="border p-2 w-full rounded-l"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded-r">Search</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((video) => (
                    <div key={video.id.videoId} className="border rounded p-2 shadow-lg">
                        <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="w-full rounded" />
                        <h3 className="text-lg font-bold mt-2">{video.snippet.title}</h3>
                        <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
                        <a
                            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 mt-2 inline-block"
                        >
                            Watch Video
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YouTubeSearch;
