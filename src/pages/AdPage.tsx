/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
import adService from "../services/adService";
import { Container, Button } from "semantic-ui-react";
import ContactForm from "../components/contactForm";
import { useAuth } from "../context/auth.context";
import { icons } from "../lib/data";
import { format, isValid, parseISO } from "date-fns";

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
    email?: string;
    phoneNumber?: string;
    userId?: string;
    avatar?: string;
  };
  date?: string;
  example?: boolean;
  category?: string | string[];
}

const AdPage = () => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formattedDate, setFormattedDate] = useState("Invalid date");

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        if (!id) {
          throw new Error("Ad ID is not available");
        }

        const response = await adService.getAd(id);
        const adData = response.data;

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
            phoneNumber: adData.author.phoneNumber ?? "",
            userId: adData.author._id,
            avatar: adData.author.avatar ?? "",
          },
          date: adData.date,
          example: adData.example,
          category: adData.category,
        };

        setAd(transformedAd);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  // date
  useEffect(() => {
    if (ad?.date) {
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
  }, [ad?.date]);

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
  };

  //isOwner
  const isAdOwner = user?._id === ad?.posterInfo.userId;

  // Handle category as an array or string
  const categories = Array.isArray(ad?.category) ? ad.category : [ad?.category];

  // Find the corresponding icon for the first category in the array
  const categoryIcon = icons.find((icon) =>
    categories?.includes(icon.name)
  )?.icon;

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
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <main>

              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                  <h1 className="text-xl font-bold mb-2 text-customBlue">
                    {ad?.businessIdea}
                  </h1>

                  {categoryIcon && (
                    <div className="bg-customBlue rounded-lg w-16 h-16 text-customCyan flex items-center justify-center text-5xl my-4 sm:my-0">
                      {categoryIcon}
                    </div>
                  )}
                </div>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-lg text-customCyan mr-2"></FaMapMarker>
                  <p className="text-customCyan">{ad?.location}</p>
                </div>

                {formattedDate && (
                  <time className="text-gray-500 text-sm italic pb-2">
                    {formattedDate}
                  </time>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-customBlue text-lg font-bold mb-6">
                  Description
                </h3>
                <Container textAlign="justified">
                  <div className="p-4 bg-gray-100 rounded-md mb-4 overflow-hidden">
                    <p className="text-gray-800 mb-0 break-words">
                      {ad?.description}
                    </p>
                  </div>
                </Container>
                <hr className="my-4" />

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

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-2xl md:text-3xl text-customBlue text-center">
                    Hello! I'm {ad?.posterInfo?.name}
                  </h2>
                  <img
                    src={ad?.posterInfo?.avatar}
                    alt="Avatar"
                    className="w-48 rounded-lg mb-4"
                  />
                  <Container textAlign="justified" className="w-full max-w-2xl">
                    <div className="p-4 bg-gray-100 rounded-md overflow-hidden">
                      <p className="text-gray-800 break-words">
                        {ad?.posterInfo?.about}
                      </p>
                    </div>
                  </Container>
                </div>

                <hr className="my-4" />

                <h3 className="text-xl text-customBlue">
                  Send a message to {ad?.posterInfo?.name}:
                </h3>

                <ContactForm />
              </div>

              {isAdOwner && (
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-xl font-bold mb-6 text-customBlue">
                    Manage your Post
                  </h3>
                  <Button onClick={handleClick} color="facebook">
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDeleteClick(`${id}`)}
                    basic
                    color="blue"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdPage;
