import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export interface Ad {
  id: number;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

interface FounderListingProps {
  ad: Ad;
}

const FounderListing: React.FC<FounderListingProps> = ({ ad }) => {

  const [showFullDescription, setShowFullDescription] = useState(false)

  let description = ad.description

  if (!showFullDescription) {
    description = description.substring(0, 100) + '...'
  }

  const handleClick = () => {
    setShowFullDescription(!showFullDescription)
  }




  return (
    <div className="bg-white rounded-xl shadow-md relative p-4">
      <div className="mb-6">
        <div className="text-gray-600 my-2">{ad.type}</div>
        <h3 className="text-xl font-bold">{ad.title}</h3>
        <p className="text-gray-800 mt-4">{description}</p>

        <button onClick={handleClick} className="text-indigo-500 mb-5 hover:text-indigo-600">
        {showFullDescription ? "Less" : "More"}
        </button>


        <p className="text-indigo-500 mt-2">Investment: {ad.salary}</p>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            {ad.location}
          </div>
          <Link
            to={`/jobs/${ad.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FounderListing;
