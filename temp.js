// const axios = require('axios');

// const API_KEY = 'AIzaSyCv0nEaQNqAQxUCW5WH_h1HcDcLoa2jkls'; // Replace with your actual API key
// const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// async function searchYouTube(query, maxResults = 20) {
//     try {
//         // Step 1: Search for videos sorted by view count
//         const searchResponse = await axios.get(`${BASE_URL}/search`, {
//             params: {
//                 part: 'snippet',
//                 maxResults: 50, // Get more results first
//                 q: query,
//                 type: 'video',
//                 order: 'viewCount', // Sort by views
//                 key: API_KEY
//             }
//         });

//         let videos = [];

//         for (const item of searchResponse.data.items) {
//             const videoId = item.id.videoId;
//             const title = item.snippet.title;
//             const description = item.snippet.description;
//             const channelTitle = item.snippet.channelTitle;
//             const publishedAt = item.snippet.publishedAt;
//             const thumbnailUrl = item.snippet.thumbnails.high.url;

//             // Filter out unrelated content
//             if (!title.toLowerCase().includes(query.toLowerCase()) &&
//                 !description.toLowerCase().includes(query.toLowerCase())) {
//                 continue;
//             }

//             // Step 2: Get video statistics
//             const videoResponse = await axios.get(`${BASE_URL}/videos`, {
//                 params: {
//                     part: 'statistics',
//                     id: videoId,
//                     key: API_KEY
//                 }
//             });

//             const statistics = videoResponse.data.items[0].statistics;
//             const views = parseInt(statistics.viewCount || '0');
//             const likes = statistics.likeCount || 'N/A';
//             const comments = statistics.commentCount || 'N/A';

//             // Add video details to the list
//             videos.push({
//                 title,
//                 url: `https://www.youtube.com/watch?v=${videoId}`,
//                 thumbnail: thumbnailUrl,
//                 channel: channelTitle,
//                 publishedAt,
//                 views,
//                 likes,
//                 comments
//             });
//         }

//         // Step 3: Sort results by views (descending)
//         videos.sort((a, b) => b.views - a.views);

//         // Return top maxResults videos
//         return videos.slice(0, maxResults);
//     } catch (error) {
//         console.error('An error occurred:', error.message);
//         return [];
//     }
// }

// // Example usage
// (async () => {
//     const query = 'C++'; // Replace with user input
//     const results = await searchYouTube(query);
    
//     results.forEach(video => {
//         console.log(`Title: ${video.title}`);
//         console.log(`Channel: ${video.channel}`);
//         console.log(`Published At: ${video.publishedAt}`);
//         console.log(`Thumbnail: ${video.thumbnail}`);
//         console.log(`Views: ${video.views}`);
//         console.log(`Likes: ${video.likes}`);
//         console.log(`Comments: ${video.comments}`);
//         console.log(`Link: ${video.url}\n`);
//     });
// })();


let a = "Rohit";
let b = "Warship"
let d = a+b;
for (let i =0 ; i <d.length;i++){
    console.log (d[i],"\n")

}