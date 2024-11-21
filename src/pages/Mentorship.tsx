import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Message {
  sender: string;
  text: string;
}

export function Mentorship() {
  const { mentorId } = useParams<{ mentorId: string }>(); 
  const [mentor, setMentor] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>(''); 
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating mentor fetching 
    if (mentorId === '1') setMentor('George Jere');
    if (mentorId === '2') setMentor('Moses Kongolo');
    if (mentorId === '3') setMentor('Sarah Tembo');
  }, [mentorId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'You', text: message },
      ]);
      setMessage('');

      setTimeout(() => {
        let mentorResponse = "";

        if (messages.length === 0 && (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi"))) {
          mentorResponse = "Hello there, Could you briefly tell me about your background in AI? Do you have any prior experience or specific areas you're interested in?";
        } else if (messages.length === 1) {
          mentorResponse = "Great, could you let me know the specific research area you are focusing on?";
        } else if (messages.length === 2) {
          mentorResponse = "Alright, we will begin with problem framing. Here are some tips on problem framing in research writing: \n1. Clearly define the problem statement. \n2. Review relevant literature to understand the context. \n3. Identify the research gap. \n4. Formulate research questions or hypotheses. \nPlease submit your problem framing draft once you are done.";
        } else if (message.toLowerCase().includes("thank you") || message.toLowerCase().includes("thanks")) {
          mentorResponse = "You're welcome";
        } else {
          mentorResponse = "Could you please provide more details or ask a specific question?";
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'Mentor', text: mentorResponse },
        ]);
      }, 2000); 
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