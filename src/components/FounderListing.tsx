// FounderListing.tsx

import React, { useState, useEffect } from "react";
import { FaMapMarker } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Container, Button, Label } from "semantic-ui-react";
import { format, isValid, parseISO } from "date-fns";
import { icons } from "../lib/data";

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
  date?: string;
  example?: boolean;
  category?: string | string[];
}

interface FounderListingProps {
  ad: Ad;
}

const FounderListing: React.FC<FounderListingProps> = ({ ad }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [formattedDate, setFormattedDate] = useState("Invalid date");
  const navigate = useNavigate();

  useEffect(() => {
    // Parse and format date if available
    if (ad.date) {
      try {
        const createdAtDate = parseISO(ad.date);
        if (isValid(createdAtDate)) {
          const formatted = format(createdAtDate, "MMMM dd, yyyy");
          setFormattedDate(formatted);
        }
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    }
  }, [ad.date]);

  // Handle category as an array or string
  const categories = Array.isArray(ad.category) ? ad.category : [ad.category];

  // Find the corresponding icon for the first category in the array
  const categoryIcon = icons.find((icon) =>
    categories.includes(icon.name)
  )?.icon;

  const handleClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleShowSkills = () => {
    setShowSkills(!showSkills);
  };

  const handleReadMore = () => {
    navigate(`/ads/${ad?.id}`);
  };

  let description = ad.description;
  if (!showFullDescription) {
    description = description.substring(0, 200) + "...";
  }

  //console.log(ad.category);

  return (
    <div className="bg-white rounded-xl shadow-md relative p-4">
    
        {ad.example && (
          <Label as="a" color="blue" ribbon size="small" onClick={handleReadMore}>
            Example
          </Label>
        )}



      

      <div className="container-xl lg:container m-auto">
      

        <div className="flex flex-row justify-between">
        <div className="text-zinc-400 my-2">{ad.author.name}</div>
        {categoryIcon && (
          <div className="bg-customBlue rounded-lg w-12 h-12 text-customCyan flex items-center justify-center text-3xl">
            {categoryIcon}
          </div>
        )}



        </div>

        <h3 className="text-xl font-bold my-2">{ad.businessIdea}</h3>

        <Container textAlign="justified">
          <div className="p-4 bg-gray-100 rounded-md mb-4 overflow-hidden">
            <p className="text-gray-800 mb-0 break-words">{description}</p>
            {/* Button to toggle description text */}
            <button
              onClick={handleClick}
              className="text-customCyan mb-2 hover:text-secondCyan"
            >
              {showFullDescription ? "Less" : "More"}
            </button>
          </div>
        </Container>

        {formattedDate && (
          <time className="text-gray-500 text-sm italic pb-2">
            {formattedDate}
          </time>
        )}

        <div className="border border-slate-100 mb-5"></div>

        {/* Button to toggle skills list */}
        <button
          className="text-secondCyan hover:text-customBlue mb-4 font-medium"
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
          <div className="text-slate-700 my-3">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            {ad.location}
          </div>

          <Button color="blue" onClick={handleReadMore}>
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FounderListing;
