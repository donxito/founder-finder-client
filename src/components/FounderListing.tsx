import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export interface Ad {
  _id: string;
  id: string;
  posterName: string;
  businessIdea: string;
  description: string;
  location: string;
  investment: string;
  requiredSkills: Array<string>;
  author: {
    name: string;
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
    description = description.substring(0, 200) + "...";
  }

  const handleClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleShowSkills = () => {
    setShowSkills(!showSkills);
  };

  console.log(ad);

  return (
    <div className="bg-white rounded-xl shadow-md relative p-4">
      <div className="container-xl lg:container m-auto">
        <div className="text-zinc-400 my-2">{ad.author.name}</div>

        <h3 className="text-xl font-bold my-2">{ad.businessIdea}</h3>

        <Container textAlign="justified">
          <div className="p-4 bg-gray-100 rounded-md mb-4 overflow-hidden">
            <p className="text-gray-800 mb-0 break-words">{description}</p>
              {/* Button to toggle description text */}
            <button
              onClick={handleClick}
              className="text-blue-500 mb-2 hover:text-blue-700"
            >
              {showFullDescription ? "Less" : "More"}
            </button>
          </div>
        </Container>

        <div className="border border-slate-100 mb-5"></div>

        {/* Button to toggle skills list */}
        <button
          className="text-customCyan hover:text-secondCyan mb-4 font-medium"
          onClick={handleShowSkills}
        >
          Must Have Skills
        </button>
        {showSkills && (
          <ul className="text-slate-700 my-1 list-disc pl-5 text-sm">
            {ad?.requiredSkills.map((skill, index) => (
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
