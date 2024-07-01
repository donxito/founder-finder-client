import  { useState, useEffect, FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adService from "../services/adService";
import { Button } from "semantic-ui-react";



const EditAdPage = () => {
  const [businessIdea, setBusinessIdea] = useState("");
  const [description, setDescription] = useState("");
  const [investment, setInvestment] = useState("");
  const [location, setLocation] = useState("");
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [category, setCategory] = useState("")

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
        setCategory(adData.category);
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
        },
        category,
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
            <h2 className="text-3xl text-center font-semibold mb-6 text-customBlue">Edit Your Idea</h2>

            <div className="mb-4">
            <label className="block text-customBlue font-semibold mb-2">
                Business Idea
              </label>
              <input
                type="text"
                id="businessIdea"
                name="businessIdea"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Write just a few words about your idea"
                value={businessIdea}
                onChange={(event) => setBusinessIdea(event.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-customBlue font-semibold mb-2"
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
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-customBlue font-semibold mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="border rounded w-full py-2 px-3"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="" disabled>Select Business category</option>
                <option value="Art">Art</option>
                <option value="Culture">Culture</option>
                <option value="Vestuary">Vestuary</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Sport">Sport</option>
                <option value="Design">Design</option>
                <option value="Media">Media</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Science">Science</option>
                <option value="Environment">Environment</option>
                <option value="Children">Children</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-customBlue font-semibold mb-2"
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
                <option value="" disabled>Select an investment range</option>
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
              <label
                htmlFor="location"
                className="block text-customBlue font-semibold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="requiredSkills"
                className="block text-customBlue font-semibold mb-2">
                Required Skills
              </label>
              <div className="flex flex-wrap">
                {requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-customCyan mr-2 mb-2"
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
                  className="border rounded w-full py-2 px-3 mt-2 mr-4"
                  placeholder="Add a new skill"
                  value={newSkill}
                  onChange={(event) => setNewSkill(event.target.value)}
                />
                <Button
                type="button"
                basic color="blue" 
                onClick={handleAddSkill}
                >
                  Add Skills
                </Button>
              </div>
            </div>


            <div className="flex justify-between">

            <button
                type="submit"
                className="bg-secondCyan text-white  hover:bg-customBlue  py-2 px-4 ml-2 rounded"
              >
                Save
              </button>


              <Link
                to={`/ads/${id}`}
                className=" text-gray-800 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              >
                Cancel
              </Link>
            
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditAdPage;

