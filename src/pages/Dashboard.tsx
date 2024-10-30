import React, { useEffect, useState } from 'react';
import { BookOpen, Users, Award, Clock } from 'lucide-react';

interface User {
    name: string;
    email: string;
    role: string;
    research_interest: string;
}

interface Connection {
    id: number;
    mentor_name: string;
    status: string;
}

interface Mentor {
    id: number;
    name: string;
    research_interest: string;
}

export function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
                await fetchConnections(JSON.parse(userData).id);
                await fetchPotentialMentors(JSON.parse(userData).research_interest); 
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    const fetchConnections = async (studentId: number) => {
        const response = await fetch('http://localhost:5000/api/connections', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            setConnections(data);
        }
    };

    const fetchPotentialMentors = async (researchInterest: string) => {
        const response = await fetch('http://localhost:5000/api/mentors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ researchInterest }),
        });

        if (response.ok) {
            const data = await response.json();
            setMentors(data.mentors); 
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto">
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
                        {connections.length > 0 ? (
                            connections.map(connection => (
                                <div key={connection.id} className="p-4 border border-gray-200 rounded-lg">
                                    <p className="font-medium">Connected to: {connection.mentor_name} (Status: {connection.status})</p>
                                </div>
                            ))
                        ) : (
                            <p>No connections found.</p>
                        )}
                    </div>
                </section>

                <section className="card">
                    <h2 className="text-xl font-semibold mb-4">Potential Mentors</h2>
                    <div className="space-y-4">
                        {mentors.length > 0 ? (
                            mentors.map(mentor => (
                                <div key={mentor.id} className="p-4 border border-gray-200 rounded-lg">
                                    <p className="font-medium">Mentor: {mentor.name} (Research Area: {mentor.research_interest})</p>
                                    <p className="text-green-500">Successfully connected!</p>
                                </div>
                            ))
                        ) : (
                            <p>No potential mentors found.</p>
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
    bgColor 
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


const upcomingSessions = [
    {
        title: "Mentorship Call",
        time: "Tomorrow, 2:00 PM",
        description: "Discussion about research proposal with Dr. Johnson"
    },
    {
        title: "Workshop",
        time: "Friday, 3:00 PM",
        description: "Introduction to Statistical Analysis in Research"
    }
];
