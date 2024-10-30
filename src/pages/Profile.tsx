import { useAuth } from '../contexts/AuthContext';
import { Award, BookOpen, Users, Settings } from 'lucide-react';

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{user?.role}</p>
            </div>
            
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Research Interests</h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button className="btn-secondary w-full">
                <Settings className="w-4 h-4 mr-2 inline-block" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-6">
            <section className="card">
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <Award className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
              <div className="space-y-4">
                {progress.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{item.module}</span>
                        <span className="text-sm text-gray-600">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <h2 className="text-xl font-semibold mb-4">Mentorship Connections</h2>
              <div className="space-y-4">
                {connections.map((connection, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-600 mr-3" />
                      <div>
                        <h3 className="font-medium">{connection.name}</h3>
                        <p className="text-sm text-gray-600">{connection.role}</p>
                      </div>
                    </div>
                    <button className="btn-secondary">Message</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

const interests = [
  "Machine Learning",
  "Data Science",
  "AI Ethics",
  "Research Methods"
];

const achievements = [
  { title: "Research Pioneer", date: "Mar 2024" },
  { title: "Data Master", date: "Feb 2024" },
  { title: "Team Player", date: "Jan 2024" }
];

const progress = [
  { module: "Research Methods", progress: 80 },
  { module: "Data Analysis", progress: 60 },
  { module: "Academic Writing", progress: 40 }
];

const connections = [
  { name: "Dr. Sarah Johnson", role: "Research Mentor" },
  { name: "Dr. Michael Chen", role: "Project Advisor" }
];