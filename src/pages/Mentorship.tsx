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

        if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
          mentorResponse = "Hello! How can I assist you with your AI research today?";
        } else if (message.toLowerCase().includes("background")) {
          mentorResponse = "Great, before we dive into the research, could you briefly tell me about your background in AI? Do you have any prior experience or specific areas you're interested in?";
        } else if (message.toLowerCase().includes("i have worked on machine learning") || message.toLowerCase().includes("i have experience with ai")) {
          mentorResponse = "That’s fantastic! Since you have experience with machine learning, would you like to explore deep learning techniques or reinforcement learning? We could also talk about challenges in model deployment if you're interested.";
        } else if (message.toLowerCase().includes("beginner")) {
          mentorResponse = "No problem! If you're new to AI, it's good to start with foundational topics like supervised learning and basic neural networks. Have you already worked on any machine learning projects?";
        } else if (message.toLowerCase().includes("supervised learning")) {
          mentorResponse = "Supervised learning is a great starting point. You'll typically work with labeled data to train models. Do you have a dataset in mind, or would you like me to suggest some sources?";
        } else if (message.toLowerCase().includes("deep learning") || message.toLowerCase().includes("natural language processing")) {
          mentorResponse = "Deep learning and NLP are exciting areas of research! Do you have any specific problem you're thinking about, like text classification or neural machine translation?";
        } else if (message.toLowerCase().includes("datasets") || message.toLowerCase().includes("data")) {
          mentorResponse = "Datasets are crucial for AI research. Platforms like Kaggle, UCI, and Google Dataset Search offer many options. Are you looking for a specific type of dataset, such as text, image, or tabular data?";
        } else if (message.toLowerCase().includes("project") || message.toLowerCase().includes("idea")) {
          mentorResponse = "AI research projects can range from small proofs of concept to large-scale implementations. Are you considering a small-scale project like sentiment analysis or something more complex like building a neural network model?";
        } else if (message.toLowerCase().includes("challenges") || message.toLowerCase().includes("struggle")) {
          mentorResponse = "AI research comes with challenges, such as poor-quality data, overfitting, and model interpretability. Which challenges do you feel you’re facing, or is there any area you'd like help with?";
        } else {
          mentorResponse = "AI research is vast. I suggest starting with a specific area. Could you let me know if you’re more interested in machine learning, deep learning, NLP, or another field?";
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