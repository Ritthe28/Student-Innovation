import fetch from "node-fetch"; // Install with: npm install node-fetch

const API_KEY = "AiOzNbg4sPnXZmEy7VKQ9TLjlwkUIF3p"; // Replace with actual API key

async function fetchResearchPapers(query) {
    const url = `https://api.core.ac.uk/v3/search/journals?query=${encodeURIComponent(query)}`;
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log(data); // Output the response
}

fetchResearchPapers("artificial intelligence reserch paper"); // Example query
