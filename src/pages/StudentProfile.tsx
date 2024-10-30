import { Mail, Briefcase, GraduationCap } from 'lucide-react';

export function StudentProfile({ student }: { student: any }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
          <p className="text-lg text-gray-600">{student.degree} in {student.major}</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>Message</span>
        </button>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Academic Background</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{student.university}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{student.year} Year Student</span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Research Interests</h2>
        <div className="flex flex-wrap gap-2">
          {student.researchInterests.map((interest: string, idx: number) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Goals</h2>
        <p className="text-gray-700">{student.goals}</p>
      </section>
    </div>
  );
}


const student = {
  name: "Alex Brown",
  degree: "Bachelor's",
  major: "Computer Science",
  university: "University of California, Berkeley",
  year: 3,
  researchInterests: ["Artificial Intelligence", "Human-Computer Interaction", "Machine Learning"],
  goals: "To gain research experience in AI and pursue a graduate program with a focus on human-centered AI.",
};
