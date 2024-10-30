import React, { useState } from 'react';


const researchInterests = [
  "Machine Learning",
  "Data Science",
  "Neuroscience",
  "Quantum Computing",
  "Robotics",
  "Environmental Science",
  "Biotechnology",
];

function InterestsDropdown({ onSelectInterest }) {
  const [selectedInterest, setSelectedInterest] = useState("");

  const handleSelection = (event) => {
    const interest = event.target.value;
    setSelectedInterest(interest);
    onSelectInterest(interest); 
  };

  return (
    <div>
      <label>Select your research interest:</label>
      <select value={selectedInterest} onChange={handleSelection}>
        <option value="">-- Select Interest --</option>
        {researchInterests.map((interest, index) => (
          <option key={index} value={interest}>
            {interest}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InterestsDropdown;