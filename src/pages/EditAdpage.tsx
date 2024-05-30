import  { useState, useEffect, FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adService from "../services/adService";



const EditAdPage = () => {
  const [businessIdea, setBusinessIdea] = useState("");
  const [description, setDescription] = useState("");
  const [investment, setInvestment] = useState("");
  const [location, setLocation] = useState("");
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const { id } = useParams<{ id: string }>();
  console.log("ID from params:", id);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await adService.getAd(id!);
        const adData = response.data;

        setBusinessIdea(adData.businessIdea);
        setDescription(adData.description);
        setInvestment(adData.investment);
        setLocation(adData.location);
        setRequiredSkills(adData.requiredSkills);
      } catch (error) {
        console.error("Error fetching ad:", error);
        toast.error("Failed to fetch ad data");
      }
    };

    fetchAd();
  }, [id]);

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setRequiredSkills([...requiredSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setRequiredSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await adService.updateAd(id!, {
        businessIdea,
        description,
        investment,
        location,
        requiredSkills,
        posterName: "",
        posterInfo: {
          name: "",
          about: "",
          email: "",
          phone: 0
        }
      });
        toast.success("Ad updated successfully");
        navigate(`/ads/${id}`);
    } catch (error) {
        console.error("Error updating ad:", error);
        toast.error("Failed to update ad");
    }
};


  return (
    <section className="bg-zinc-100">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Edit Ad</h2>

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
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Initial Investment
              </label>
              <select
                id="investment"
                name="investment"
                className="border rounded w-full py-2 px-3"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                >
                <option value="">Select an investment range</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-bold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="requiredSkills"
                className="block text-gray-700 font-bold mb-2"
              >
                Required Skills
              </label>
              <div className="flex flex-wrap">
                {requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-1 focus:outline-none"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      &#10006;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  id="newSkill"
                  name="newSkill"
                  className="border rounded w-full py-2 px-3 mt-2"
                  placeholder="Add a new skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
                  onClick={handleAddSkill}
                >
                  Add
                </button>
              </div>
            </div>


            <div className="flex justify-between">
              <Link
                to={`/ads/${id}`}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditAdPage;

