import { useState,  FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adService from "../services/adService";



interface PosterInfo {
  name: string;
  about: string;
  email: string;
  phone: number;
}

interface AdRequestBody {
  businessIdea: string;
  description: string;
  investment: string;
  location: string;
  posterName: string;
  posterInfo: PosterInfo;
  requiredSkills: string[];
}


const AddAdPage = () => {

  const [businessIdea, setBusinessIdea] = useState("");
  const [description, setDescription] = useState("");
  const [investment, setInvestment] = useState("");
  const [location, setLocation] = useState("");
  const [posterName, setPosterName] = useState("");
  const [posterAbout, setPosterAbout] = useState("");
  const [posterEmail, setPosterEmail] = useState("");
  const [posterPhone, setPosterPhone] = useState<number>(0);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");

  const navigate  = useNavigate();



  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setRequiredSkills([...requiredSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setRequiredSkills((prevSkills) =>
      prevSkills.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const requestBody: AdRequestBody = {
      businessIdea,
      description,
      investment,
      location,
      posterName,
      requiredSkills,
      posterInfo: {
        name: posterName,
        about: posterAbout,
        email: posterEmail,
        phone: posterPhone,
      }
    };
  
    try {
      await adService.createAd(requestBody );
      toast.success("Your Ad has been created successfully");
      navigate("/ads");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };


  return (
    <section className="bg-zinc-100">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Post Ad</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Idea Name
              </label>
              <input
                type="text"
                id="businessIdea"
                name="businessIdea"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Write just a few words about your idea"
                value={businessIdea}
                onChange={(e) => setBusinessIdea(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Idea Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows={4}
                placeholder="Add any job duties, expectations, requirements, etc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                Initial Investment
              </label>
              <select
                id="investment"
                name="investment"
                className="border rounded w-full py-2 px-3"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                required
              >
                <option value="">Select Investment</option>
                <option value="No Idea">No Idea</option>
                <option value="Under 10.000 DKK">Under 10.000 DKK</option>
                <option value="10.000 DKK - 20.000 DKK">10.000 DKK - 20.000 DKK</option>
                <option value="20.000 DKK - 30.000 DKK">20.000 DKK - 30.000 DKK</option>
                <option value="30.000 DKK - 40.000 DKK">30.000 DKK - 40.000 DKK</option>
                <option value="40.000 DKK - 50.000 DKK">40.000 DKK - 50.000 DKK</option>
                <option value="50.000 DKK - 60.000 DKK">50.000 DKK - 60.000 DKK</option>
                <option value="60.000 DKK - 70.000 DKK">60.000 DKK - 70.000 DKK</option>
                <option value="70.000 DKK - 80.000 DKK">70.000 DKK - 80.000 DKK</option>
                <option value="80.000 DKK - 90.000 DKK">80.000 DKK - 90.000 DKK</option>
                <option value="90.000 DKK - 100.000 DKK">90.000 DKK - 100.000 DKK</option>
                <option value="Over 100.000 DKK">Over 100.000 DKK</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Write the desired location or 'Remote'"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Must Have Skills</label>
              <div className="flex">
                <input
                  type="text"
                  id="newSkill"
                  name="newSkill"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-secondCyan text-white py-2 px-4 ml-2 rounded"
                >
                  Add
                </button>
              </div>
              <ul>
                {requiredSkills.map((skill, index) => (
                  <li key={index} className="flex justify-between items-center mt-2">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-2xl mb-5">User Info</h3>

            <div className="mb-4">
              <label htmlFor="posterName" className="block text-gray-700 font-bold mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="posterName"
                name="posterName"
                className="border rounded w-full py-2 px-3"
                placeholder="Write your name"
                value={posterName}
                onChange={(e) => setPosterName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="posterAbout"
                className="block text-gray-700 font-bold mb-2"
              >
                Your Description
              </label>
              <textarea
                id="posterAbout"
                name="posterAbout"
                className="border rounded w-full py-2 px-3"
                rows={4}
                placeholder="What you do?"
                value={posterAbout}
                onChange={(e) => setPosterAbout(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="posterEmail"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="posterEmail"
                name="posterEmail"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address"
                value={posterEmail}
                onChange={(e) => setPosterEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="posterPhone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="posterPhone"
                name="posterPhone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone number"
                value={posterPhone}
                onChange={(e) => setPosterPhone(parseInt(e.target.value, 10))}// Convert the string value to a number using parseInt
              />
            </div>

            <div>
              <button
                className="bg-secondCyan hover:bg-customCyan text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddAdPage;