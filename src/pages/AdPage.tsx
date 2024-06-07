/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
import adService from "../services/adService";
import { Container, Button } from "semantic-ui-react";

interface Ad {
  id: string;
  posterName: string;
  businessIdea: string;
  location: string;
  investment: string;
  requiredSkills: string[];
  description: string;
  posterInfo: {
    name: string;
    about: string;
    email: string;
    phoneNumber: string;
  };
}

const AdPage = () => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        if (!id) {
          // Handle case where ID is not available
          throw new Error("Ad ID is not available");
        }

        const response = await adService.getAd(id ?? "");
        console.log(response); // Verify the fetched data

        const adData = response.data;

        // Transform the data to match the Ad interface
        const transformedAd: Ad = {
          id: adData.id,
          posterName: adData.posterName,
          businessIdea: adData.businessIdea,
          location: adData.location,
          investment: adData.investment,
          requiredSkills: adData.requiredSkills,
          description: adData.description,
          posterInfo: {
            name: adData.author.name,
            about: adData.author.about ?? "",
            email: adData.author.email,
            phoneNumber: adData.author.phoneNumber ?? 0,
          },
        };

        setAd(transformedAd);
      } catch (error) {
        setError("Failed to fetch ad");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  const onDeleteClick = async (adId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this Ad?");

    if (!confirm) {
      return;
    }

    try {
      await adService.deleteAd(adId);
      toast.success("Ad deleted successfully");
      navigate("/ads");
    } catch (error) {
      console.error("Error deleting ad:", error);
      toast.error("Failed to delete ad");
    }
  };

  const handleClick = () => {
    navigate(`/edit-ad/${id}`);
  }

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/ads"
            className="text-secondCyan hover:text-customCyan flex items-center"
          >
            <FaArrowLeft className="mr-2"></FaArrowLeft> Back to Ad Listings
          </Link>
        </div>
      </section>

      <section className="bg-zinc-100 mt-16">
        <div className="container m-auto py-10 px-6">
          {/* grid layout with two columns on larger screens  */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-xl font-bold mb-2 text-customBlue">
                  {ad?.businessIdea}
                </h1>

                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-lg text-customCyan mr-2"></FaMapMarker>
                  <p className="text-customCyan">{ad?.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                
              <h3 className="text-customBlue text-lg font-bold mb-6">
                  Description
                </h3>
                <Container textAlign="justified">
                <div className="p-4 bg-gray-100 rounded-md mb-4 overflow-hidden">
                  <p className="text-gray-800 mb-0 break-words">{ad?.description}</p>
                </div>
                </Container>


                <h3 className="text-customBlue text-lg font-bold mb-2">
                  Initial Investment
                </h3>
                <p className="mb-4">{ad?.investment}</p>

                <h4 className="text-customBlue text-lg font-semibold mb-2">
                  Must Have Skills
                </h4>

                <ul className="mb-4">
                  {ad?.requiredSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </main>
            {/*<!-- sidebar */} {/*<!-- Poster Info */}
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl text-customBlue">
                  Hello! I'm {ad?.posterInfo?.name}
                </h2>

                <p className="my-2 text-zinc-500">{ad?.posterInfo?.about}</p>

                <hr className="my-4" />

                <h3 className="text-xl text-customBlue">Contact Email:</h3>

                <p className="my-2 bg-zinc-200 p-2 font-bold text-gray-600">
                  {ad?.posterInfo?.email}
                </p>

                <h3 className="text-xl text-customBlue">Contact Phone:</h3>

                <p className="my-2 bg-zinc-200 p-2 font-bold text-gray-600">
                  {ad?.posterInfo?.phoneNumber}
                </p>
              </div>

              {/*<!-- Manage */}

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6 text-customBlue">
                  Manage your Post
                </h3>
                <Button

                onClick={handleClick}
                  color="facebook"
                >
                  Edit 
                </Button>

                <Button
                  onClick={() => onDeleteClick(`${id}`)}
                  basic color="blue"
                >
                  Delete 
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdPage;
