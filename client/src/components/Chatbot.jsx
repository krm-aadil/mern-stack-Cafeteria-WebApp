import React, { useState } from 'react';
import TopBar from './TopBar'; // Import your top bar component

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [chatLog, setChatLog] = useState([]); // To maintain the conversation history

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/chat/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setChatLog([...chatLog, { query, response: data.answer }]); // Add both query and response to the chat log
    setResponse(data.answer);
    setQuery(''); // Clear the input field
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <TopBar selectedFoods={[]} />

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {chatLog.length > 0 ? (
          <div className="space-y-4">
            {chatLog.map((chat, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="bg-gray-200 p-4 rounded-lg self-start max-w-2xl">
                  <p className="font-bold text-gray-800">You:</p>
                  <p>{chat.query}</p>
                </div>
                <div className="bg-red-600 text-white p-4 rounded-lg self-end max-w-2xl">
                  <p className="font-bold">Cafeteria Assistant:</p>
                  <p>{chat.response}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">Start a conversation about the food...</div>
        )}
      </div>

      {/* Input Box */}
      <div className="bg-black p-4 border-t border-gray-300 fixed bottom-0 w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full max-w-4xl space-x-4"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me about the food..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
