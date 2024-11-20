import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Message {
  sender: string;
  text: string;
}

export function Mentorship() {
  const { mentorId } = useParams<{ mentorId: string }>(); // Get the mentorId from URL params
  const [mentor, setMentor] = useState<string>(''); // Simulate mentor name
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>(''); // Message being typed
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating mentor fetching (you can fetch real data here)
    if (mentorId === '1') setMentor('George Jere');
    if (mentorId === '2') setMentor('Moses Kongolo');
    if (mentorId === '3') setMentor('Sarah Tembo');
  }, [mentorId]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { sender: 'You', text: message },
        { sender: mentor, text: `Reply from ${mentor}: Thank you for reaching out!` },
      ]);
      setMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chat with {mentor}</h1>
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

      <button
        onClick={() => navigate('/dashboard')}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
