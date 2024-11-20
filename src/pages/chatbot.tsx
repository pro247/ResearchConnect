import React, { useState } from 'react';

interface Message {
  sender: string;
  text: string;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = { sender: 'You', text: message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');

      setTimeout(() => {
        let botResponse = '';

        if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
          botResponse = 'Hello! How can I assist you with your research today?';
        } else if (message.toLowerCase().includes('background')) {
          botResponse = 'Could you briefly tell me about your background in research?';
        } else if (message.toLowerCase().includes('beginner')) {
          botResponse = 'No problem! If you are new to research, it is good to start with foundational topics. Do you have any specific questions?';
        } else if (message.toLowerCase().includes('datasets')) {
          botResponse = 'Datasets are crucial for research. Are you looking for a specific type of dataset, such as text, image, or tabular data?';
        } else if (message.toLowerCase().includes('project')) {
          botResponse = 'Research projects can range from small proofs of concept to large-scale implementations. Do you have a specific project in mind?';
        } else {
          botResponse = 'I am here to help with your research. Could you please provide more details or ask a specific question?';
        }

        const botMessage: Message = { sender: 'Bot', text: botResponse };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Research Chatbot</h1>
      </header>

      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="max-h-48 overflow-y-auto border p-2 mb-2 bg-white">
            {messages.map((msg, index) => (
              <p key={index} className={`${msg.sender === 'You' ? 'text-blue-500' : 'text-gray-500'}`}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full mt-2 p-2 border rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}