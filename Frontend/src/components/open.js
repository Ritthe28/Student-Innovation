import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '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', // 🔑 Replace with your actual OpenAI API key
});

async function fetchOpenAIResponse() {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Use 'gpt-3.5-turbo' if you don't have access to GPT-4o
            messages: [{ role: 'user', content: 'Say' }],
            max_tokens: 200, // Limit response length
        });

        console.log('Response:', response.choices[0].message.content);
        console.log('Request ID:', response.id); // Request ID from OpenAI
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

// Call the function
fetchOpenAIResponse();
