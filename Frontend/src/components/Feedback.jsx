import React, { useState } from "react";

const Feedback = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "6e277c9c-f45f-46d8-bc20-5bab1d177e7d",
        subject: "New Submission from Web3Forms",
        botcheck: "",
        ...formState,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setResult("Message sent successfully!");
      setFormState({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      setResult("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-50 dark:bg-gray-900 justify-center px-4">
      <div className="max-w-sm w-full bg-white p-4 rounded-md shadow-md">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-black">Contact Me</h1>
          <p className="text-gray-500 text-sm">Send me a message below.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
          <input type="hidden" name="subject" value="New Submission from Web3Forms" />
          <input type="checkbox" name="botcheck" style={{ display: "none" }} />

          <div className="mb-3">
            <label htmlFor="name" className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              required
              value={formState.name}
              onChange={handleChange}
              className="w-full px-2 py-1 text-sm border rounded-md border-black bg-white text-black"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="block text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              required
              value={formState.email}
              onChange={handleChange}
              className="w-full px-2 py-1 text-sm border rounded-md border-black bg-white text-black"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="block text-sm text-gray-600">Phone (Optional)</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="+91 1234567890"
              value={formState.phone}
              onChange={handleChange}
              className="w-full px-2 py-1 text-sm border rounded-md border-black bg-white text-black"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="block text-sm text-gray-600">Your Message</label>
            <textarea
              rows="3"
              name="message"
              id="message"
              placeholder="Your message here..."
              required
              value={formState.message}
              onChange={handleChange}
              className="w-full px-2 py-1 text-sm border rounded-md border-black bg-white text-black"
            ></textarea>
          </div>

          <div className="mb-3">
            <button type="submit" className="w-full px-3 py-2 text-white bg-indigo-500 text-sm rounded-md hover:bg-indigo-600 transition">
              Send Message
            </button>
          </div>

          {result && <p className="text-center text-sm text-gray-500">{result}</p>}
        </form>
      </div>
    </div>
  );
};

export default Feedback;
