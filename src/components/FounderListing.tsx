import React, { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

// Define the structure of an individual founder ad
export interface Ad {
  id: number;
  posterName: string;
  businessIdea: string;
  description: string;
  location: string;
  investment: string;
  requiredSkills: Array<string>;
}

// Define the props interface for the FounderListing component
interface FounderListingProps {
  ad: Ad;
}

const FounderListing: React.FC<FounderListingProps> = ({ ad }) => {
  // State variables to control whether to show full description and skills
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  // Truncate description if not showing full description
  let description = ad.description;
  if (!showFullDescription) {
    description = description.substring(0, 100) + "...";
  }

  // Toggle showFullDescription state when "More" button is clicked
  const handleClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Show/hide skills list when "Must Have Skills" button is clicked
  const handleShowSkills = () => {
    setShowSkills(!showSkills);
  };

  // If requiredSkills is null, assign an empty array to skills
  let skills = ad.requiredSkills;
  if (!skills) {
    skills = [];
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative p-4">
      <div className="mb-6">
        <div className="text-zinc-400 my-2">{ad.posterName}</div>

        <h3 className="text-xl font-bold">{ad.businessIdea}</h3>

        <p className="text-gray-800 mt-4">{description}</p>

        {/* Button to toggle full description */}
        <button
          onClick={handleClick}
          className="text-customCyan mb-5 hover:text-secondCyan"
        >
          {showFullDescription ? "Less" : "More"}
        </button>
        <div className="border border-slate-100 mb-5"></div>

        {/* Button to toggle skills list */}
        <button
          className="text-customCyan hover:text-secondCyan mb-4 font-medium"
          onClick={handleShowSkills}
        >
          Must Have Skills
        </button>
        {/* Display skills list if showSkills is true */}
        {showSkills && (
          <ul className="text-slate-700 my-1 list-disc pl-5  text-sm">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}

        <p className="text-stale-700 text-lg text-decoration-line: underline mt-2">Investment: </p>
        <li className="list-none">{ad.investment}</li>
        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-zinc-600 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            {ad.location}
          </div>

          <Link
            to={`/ads/${ad.id}`}
            className="h-[36px] bg-customBlue hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FounderListing;
