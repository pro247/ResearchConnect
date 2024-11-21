import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  sender: string;
  text: string;
}

export function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoBack = () => {
    navigate('/guidelines');
  };

  // Function to simulate bot's responses based on user message
  const simulateBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hi there! How can I assist you today?';
    } else if (lowerCaseMessage.includes('how are you')) {
      return 'I am a bot, but I am doing well. How about you?';
    } else if (lowerCaseMessage.includes('bye')) {
      return 'Goodbye! Feel free to return anytime.';
    } else if (lowerCaseMessage.includes('background')) {
      return 'Could you briefly tell me about your background in research?';
    } else if (lowerCaseMessage.includes('beginner')) {
      return 'No problem! If you are new to research, it is good to start with foundational topics. Do you have any specific questions?';
    } else if (lowerCaseMessage.includes('datasets')) {
      return 'Datasets are crucial for research. Are you looking for a specific type of dataset, such as text, image, or tabular data?';
    } else if (lowerCaseMessage.includes('project')) {
      return 'Research projects can range from small proofs of concept to large-scale implementations. Do you have a specific project in mind?';
    } else if (lowerCaseMessage.includes('machine learning') && lowerCaseMessage.includes('data collection')) {
      return 'When collecting data for machine learning, it is important to ensure the data is representative, clean, and relevant. Techniques include surveys, web scraping, and using public datasets.';
    } else if (lowerCaseMessage.includes('data collection') && lowerCaseMessage.includes('research writing')) {
      return 'Data collection in research writing involves gathering information from various sources to support your research. This can include experiments, surveys, interviews, and literature reviews.';
    } else if (lowerCaseMessage.includes('data collection') || lowerCaseMessage.includes('research data collection')) {
      return 'For research data collection, consider methods like surveys, interviews, experiments, and using existing datasets. Ensure your data is accurate and relevant to your research question.';
    } else if (lowerCaseMessage.includes('getting started with research')) {
      return 'To get started with research, identify a topic of interest, conduct a literature review, and formulate a research question or hypothesis.';
    } else if (lowerCaseMessage.includes('literature review tips')) {
      return 'For a literature review, search for relevant articles, summarize key findings, and identify gaps in the existing research.';
    } else if (lowerCaseMessage.includes('citation guidelines')) {
      return 'Follow the citation style required by your field, such as APA, MLA, or Chicago. Ensure all sources are properly cited to avoid plagiarism.';
    } else if (lowerCaseMessage.includes('what is machine learning')) {
      return 'Machine learning is a subset of AI that involves training algorithms to learn patterns from data and make predictions or decisions.';
    }
    // Default response for unrecognized messages 
    return 'Sorry, I did not understand that. Could you please rephrase?';
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage: Message = { sender: 'You', text: message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
      setLoading(true);

   
      setTimeout(() => {
        const botMessageText = simulateBotResponse(message);
        const botMessage: Message = { sender: 'Bot', text: botMessageText };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setLoading(false);
      }, 1000); 
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Research Chatbot</h1>
        <button
          onClick={handleGoBack}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          Go Back
        </button>
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
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}