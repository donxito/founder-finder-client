import { useState, useEffect } from "react";
import { FaMapMarker } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
import { format, isValid, parseISO } from "date-fns";

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
}

interface FounderListingProps {
  ad: Ad;
}

const FounderListing: React.FC<FounderListingProps> = ({ ad }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [formattedDate, setFormattedDate] = useState("Invalid date");

  const navigate = useNavigate();

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

  const handleReadMore = () => {
    navigate(`/ads/${ad?.id}`);
  };

  // date functions

  useEffect(() => {
    if (ad.date) {
      try {
        const createdAtDate = parseISO(ad.date);
        // console.log('Raw createdAt:', ad.date);
        // console.log('Parsed createdAtDate:', createdAtDate);

        if (isValid(createdAtDate)) {
          const formatted = format(createdAtDate, "MMMM dd, yyyy");
          // console.log('Formatted Date:', formatted);
          setFormattedDate(formatted);
        }
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    }
  }, [ad.date]);

  // console.log(ad)

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
              className="text-customCyan mb-2 hover:text-secondCyan"
            >
              {showFullDescription ? "Less" : "More"}
            </button>
          </div>
        </Container>

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

          <time className="text-gray-500 text-sm italic text-right pb-2 relative right-4">
            {formattedDate}
          </time>

          <Button color="blue" onClick={handleReadMore}>
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FounderListing;
