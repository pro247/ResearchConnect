import { useState } from 'react';
import { Users, MessageSquare, Star, Search } from 'lucide-react';

export function Mentorship() {
    const [selectedResearchInterest, setSelectedResearchInterest] = useState('');

    const [mentors, setMentors] = useState([
        {
            id: '1',
            name: "Dr. Sarah Johnson",
            title: "Professor of Computer Science",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            rating: 4.9,
            areas: ["Machine Learning", "AI Ethics", "Data Science"],
            mentees: 12
        },
        {
            id: '2',
            name: "Dr. Michael Chen",
            title: "Associate Professor of Biology",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            rating: 4.8,
            areas: ["Molecular Biology", "Genetics", "Biotechnology"],
            mentees: 8
        },
        {
            id: '3',
            name: "Dr. Emily Rodriguez",
            title: "Research Director",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            rating: 4.9,
            areas: ["Psychology", "Cognitive Science", "Research Methods"],
            mentees: 15
        }
    ]);

    const handleConnect = async (mentorId: string) => {
        const studentId = JSON.parse(localStorage.getItem('user') || '{}').id;

        if (!studentId) {
            alert('User is not logged in.');
            return;
        }

        const response = await fetch('http://localhost:5000/api/request-connection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentId,
                mentorId, 
                researchInterest: selectedResearchInterest,
            }),
        });

        if (response.ok) {
            alert('Connection request sent to the mentor.');
        } else {
            alert('Failed to send connection request.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Find Your Research Mentor</h1>
                <p className="text-gray-600 mt-2">Connect with experienced researchers in your field</p>
            </header>

            <div className="card mb-8">
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search by research area or expertise..."
                        className="input-field flex-1"
                        onChange={(e) => setSelectedResearchInterest(e.target.value)}
                    />
                    <button className="btn-primary" onClick={() => handleConnect('')}>
                        <Search className="w-4 h-4 mr-2 inline-block" />
                        Search
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                    <div key={mentor.id} className="card">
                        <div className="flex items-start space-x-4">
                            <img
                                src={mentor.avatar}
                                alt={mentor.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-xl font-semibold">{mentor.name}</h3>
                                <p className="text-gray-600">{mentor.title}</p>
                                <div className="flex items-center mt-1">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <span className="text-sm text-gray-600 ml-1">{mentor.rating}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-medium mb-2">Research Areas</h4>
                            <div className="flex flex-wrap gap-2">
                                {mentor.areas.map((area, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                            <div className="flex items-center text-sm text-gray-600">
                                <Users className="w-4 h-4 mr-1" />
                                <span>{mentor.mentees} mentees</span>
                            </div>
                            <button className="btn-secondary" onClick={() => handleConnect(mentor.id)}>
                                <MessageSquare className="w-4 h-4 mr-2 inline-block" />
                                Connect
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
