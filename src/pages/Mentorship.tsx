import { useState, useEffect } from "react";
import { Users, MessageSquare, Star, Search } from "lucide-react";

// Define the Mentor interface
interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  research_interest: string;
  mentees: number;
}

export function Mentorship() {
  const [selectedResearchInterest, setSelectedResearchInterest] = useState("");
  const [mentors, setMentors] = useState<Mentor[]>([]);

  const fetchMentors = async (query = "") => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/mentors?researchInterest=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch mentors");
      }
      const data: Mentor[] = await response.json(); // Explicitly type the response
      setMentors(data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  useEffect(() => {
    fetchMentors(); // Fetch all mentors on page load
  }, []);

  const handleConnect = async (mentorId: string) => {
    // Handle connection logic
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Find Your Research Mentor
        </h1>
        <p className="text-gray-600 mt-2">
          Connect with experienced researchers in your field
        </p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="card">
            <div className="flex items-start space-x-4">
              <img
                src={mentor.avatar || "https://via.placeholder.com/150"}
                alt={mentor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">{mentor.name}</h3>
                <p className="text-gray-600">{mentor.title}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">
                    {mentor.rating || "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Research Areas</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.research_interest.split(",").map((area, idx) => (
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
                <span>{mentor.mentees || "0"} mentees</span>
              </div>
              <button
                className="btn-secondary"
                onClick={() => handleConnect(mentor.id)}
              >
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
