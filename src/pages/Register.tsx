import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock } from 'lucide-react';

export function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student' as 'student' | 'mentor',
    researchInterest: '',
    enrollmentDate: '',
    academicLevel: '',
    specialization: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const researchInterests = [
    'Machine Learning',
    'Data Science',
    'Biotechnology',
    'Nanotechnology',
    'Cybersecurity',
    'Renewable Energy',
    'Quantum Computing',
    'Neuroscience',
    'Climate Change'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Registration failed');

      alert('Registration successful!');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="role" className="sr-only">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'student' | 'mentor' })}
                className="input-field"
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            <div>
              <label htmlFor="researchInterest" className="sr-only">Research Interest</label>
              <select
                id="researchInterest"
                name="researchInterest"
                value={formData.researchInterest}
                onChange={(e) => setFormData({ ...formData, researchInterest: e.target.value })}
                className="input-field"
              >
                <option value="">Select Research Interest</option>
                {researchInterests.map((interest) => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
            </div>

            {formData.role === 'student' && (
              <>
                <div>
                  <label htmlFor="enrollmentDate" className="sr-only">Enrollment Date</label>
                  <input
                    id="enrollmentDate"
                    name="enrollmentDate"
                    type="date"
                    required
                    className="input-field"
                    placeholder="Enrollment Date"
                    value={formData.enrollmentDate}
                    onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="academicLevel" className="sr-only">Academic Level</label>
                  <input
                    id="academicLevel"
                    name="academicLevel"
                    type="text"
                    required
                    className="input-field"
                    placeholder="Academic Level"
                    value={formData.academicLevel}
                    onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
                  />
                </div>
              </>
            )}

            {formData.role === 'mentor' && (
              <div>
                <label htmlFor="specialization" className="sr-only">Specialization</label>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}