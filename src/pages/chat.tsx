import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, Clock } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  research_interest: string;
}

interface Connection {
  id: number;
  mentor_name: string;
  status: string;
  mentor_id: number;
}

interface Mentor {
  id: number;
  name: string;
  research_interest: string;
}

async function fetchData<T>(url: string, method: string = 'GET', body: any = null): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null,
  });
  if (!response.ok) throw new Error(`Error fetching data from ${url}`);
  return await response.json();
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionsLoading, setConnectionsLoading] = useState(false);
  const [mentorsLoading, setMentorsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData)); // Load user from localStorage
        fetchConnections(JSON.parse(userData).id);
        fetchPotentialMentors(JSON.parse(userData).research_interest);
      } else {
        navigate('/login'); // If no user data found, redirect to login
      }
    }
  }, [navigate]);

  const fetchConnections = async (studentId: number) => {
    setConnectionsLoading(true);
    try {
      const data = await fetchData<Connection[]>('http://localhost:5000/api/connections');
      setConnections(data);
    } catch {
      setError('Failed to load connections');
      setConnections([]);
    } finally {
      setConnectionsLoading(false);
    }
  };

  const fetchPotentialMentors = async (researchInterest: string) => {
    setMentorsLoading(true);
    try {
      const data = await fetchData<{ mentors: Mentor[] }>(
        'http://localhost:5000/api/mentors',
        'POST',
        { researchInterest }
      );
      setMentors(data.mentors || []);
    } catch {
      setError('Failed to load mentors');
      setMentors([]);
    } finally {
      setMentorsLoading(false);
    }
  };

  const handleConnect = async (mentorId: number) => {
    if (!user) {
      alert('No user logged in.');
      return;
    }
    try {
      await fetchData('http://localhost:5000/api/connections', 'POST', {
        mentorId,
        studentId: user.id,
      });
      alert('Connection request sent!');
      await fetchConnections(user.id);
    } catch {
      alert('Failed to connect with the mentor.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading user data...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="text-gray-600 mt-2">Track your research journey and recent activities</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Learning Progress"
          value="4/12"
          label="Modules Completed"
          icon={BookOpen}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <DashboardCard
          title="Mentorship"
          value={connections.length.toString()}
          label="Active Connections"
          icon={Users}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <DashboardCard
          title="Achievements"
          value="6"
          label="Badges Earned"
          icon={Award}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
        <DashboardCard
          title="Time Invested"
          value="24h"
          label="This Month"
          icon={Clock}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="card">
          <h2 className="text-xl font-semibold mb-4">Your Connections</h2>
          <div className="space-y-4">
            {connectionsLoading ? (
              <div className="text-center">Loading connections...</div>
            ) : connections.length > 0 ? (
              connections.map((connection) => (
                <div key={connection.id} className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-medium">
                    Connected to: {connection.mentor_name} (Status: {connection.status})
                  </p>
                  <Chat mentorId={connection.mentor_id} />
                </div>
              ))
            ) : (
              <p className="text-gray-500">You have no active connections yet.</p>
            )}
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold mb-4">Potential Mentors</h2>
          <div className="space-y-4">
            {mentorsLoading ? (
              <div className="text-center">Loading mentors...</div>
            ) : mentors.length > 0 ? (
              mentors.map((mentor) => (
                <div key={mentor.id} className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-medium">
                    Mentor: {mentor.name} (Research Area: {mentor.research_interest})
                  </p>
                  <button
                    onClick={() => handleConnect(mentor.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    Connect
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No mentors available at the moment.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  label,
  icon: Icon,
  color,
  bgColor,
}: {
  title: string;
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-600">{title}</h3>
          <div className="mt-2">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-gray-600 text-sm ml-2">{label}</span>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </div>
  );
}

// Simple Chat Component
function Chat({ mentorId }: { mentorId: number }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="mt-4">
      <div className="border-t pt-4">
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 bg-gray-100 rounded-lg">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 rounded-lg flex-1"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
