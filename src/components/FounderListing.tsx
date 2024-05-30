import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Ad {
  _id: string;
  id: string;
  businessIdea: string;
  description: string;
  location: string;
  investment: string;
  requiredSkills: Array<string>;
  posterInfo: {
    name: string;
    about: string;
    email: string;
    phoneNumber: string;
  };
}

interface FounderListingProps {
  ad: Ad;
}

const FounderListing: React.FC<FounderListingProps> = ({ ad }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  let description = ad.description;
  if (!showFullDescription) {
    description = description.substring(0, 100) + "...";
  }

  const handleClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleShowSkills = () => {
    setShowSkills(!showSkills);
  };

  let skills = ad.requiredSkills;
  if (!skills) {
    skills = [];
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative p-4">
      <div className="mb-6">
        <div className="text-zinc-400 my-2">{ad?.posterInfo?.name}</div>
        <h3 className="text-xl font-bold">{ad.businessIdea}</h3>
        <p className="text-gray-800 mt-4">{description}</p>
        <button
          onClick={handleClick}
          className="text-customCyan mb-5 hover:text-secondCyan"
        >
          {showFullDescription ? "Less" : "More"}
        </button>
        <div className="border border-slate-100 mb-5"></div>
        <button
          className="text-customCyan hover:text-secondCyan mb-4 font-medium"
          onClick={handleShowSkills}
        >
          Must Have Skills
        </button>
        {showSkills && (
          <ul className="text-slate-700 my-1 list-disc pl-5 text-sm">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}
        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-zinc-600 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            {ad.location}
          </div>
          <Link
            to={`/ads/${ad?.id}`}
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
