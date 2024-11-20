import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

// Simple User and Mentor Interfaces
interface User {
  id: number;
  name: string;
  research_interest: string;
}

interface Mentor {
  id: number;
  name: string;
  research_interest: string;
}

interface Connection {
  mentorId: number;
  mentorName: string;
  connected: boolean;
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect if not logged in
    } else {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
        fetchMentors(JSON.parse(userData).research_interest);
      } else {
        navigate('/login');
      }
    }
  }, [navigate]);

  // Keywords map for broad matching
  const interestKeywords: { [key: string]: string[] } = {
    'Machine Learning': ['AI', 'Machine Learning', 'Deep Learning'],
    'Data Science': ['Data Science', 'Statistics', 'Big Data'],
    'Biotechnology': ['Biotech', 'Genetics', 'Bioengineering'],
    'Nanotechnology': ['Nanotech', 'Nano'],
    'Cybersecurity': ['Cybersecurity', 'Information Security', 'Network Security'],
    'Renewable Energy': ['Solar', 'Wind', 'Renewable Energy'],
    'Quantum Computing': ['Quantum', 'Quantum Computing', 'Quantum Mechanics'],
    'Neuroscience': ['Neuroscience', 'Brain Science'],
    'Climate Change': ['Climate Change', 'Environmental Science'],
  };

  // Fetching mentors based on research interest
  const fetchMentors = (researchInterest: string) => {
    const availableMentors = [
      { id: 1, name: 'George Jere', research_interest: 'AI' },
      { id: 2, name: 'Magret magalasi', research_interest: 'Blockchain' },
      { id: 3, name: 'Sarah Tembo', research_interest: 'Data Science' },
    ];

   
    const keywords = interestKeywords[researchInterest] || [];

    // Filtering mentors based on the keywords
    const filteredMentors = availableMentors.filter(mentor =>
      keywords.some(keyword =>
        mentor.research_interest.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    setMentors(filteredMentors);
  };

  const handleConnect = (mentorId: number, mentorName: string) => {
    setConnections(prev => [
      ...prev,
      { mentorId, mentorName, connected: true }
    ]);
  };

  const handleChatClick = (mentorId: number) => {
    navigate(`/mentorship/${mentorId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
      </header>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Potential Mentors</h2>
        <div className="space-y-4">
          {mentors.length > 0 ? (
            mentors.map(mentor => (
              <div key={mentor.id} className="p-4 border border-gray-200 rounded-lg">
                <p className="font-medium">
                  Mentor: {mentor.name} (Research Area: {mentor.research_interest})
                </p>
                <button
                  onClick={() => handleConnect(mentor.id, mentor.name)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Connect
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No mentors available based on your research interest.</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Connections</h2>
        <div className="space-y-4">
          {connections.length > 0 ? (
            connections.map(connection => (
              <div key={connection.mentorId} className="p-4 border border-gray-200 rounded-lg">
                <p className="font-medium">
                  Connected with: {connection.mentorName}
                </p>
                <button
                  onClick={() => handleChatClick(connection.mentorId)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Chat with Mentor
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You have no active connections yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
