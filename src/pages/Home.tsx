import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Library, Award } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Start Your Research Journey Today
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with mentors, access resources, and develop research skills from your freshman year onwards.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/guidelines"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Explore Resources
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ResearchConnect?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* <FeatureCard
              icon={BookOpen}
              title="Structured Learning"
              description="Access curated learning modules tailored to your academic level"
            /> */}
            <FeatureCard
              icon={Users}
              title="Expert Mentorship"
              description="Connect with experienced researchers in your field of interest"
            />
            <FeatureCard
              icon={Library}
              title="Research Guidelines"
              description="Access a comprehensive library of research materials and guides"
            />
            <FeatureCard
              icon={Award}
              title="Track Progress"
              description="Earn badges and track your research journey milestones"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Research Journey?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have already started their research careers with ResearchConnect.
        </p>
        <Link
          to="/register"
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition inline-block"
        >
          Join ResearchConnect
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}