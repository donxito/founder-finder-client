/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";

interface Ad {
  id: number;
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
    phone: number;
  };
}

const AdPage = () => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ads/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch ad");
        }
        const data = await res.json();
        console.log(data);
        setAd(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/ads"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2"></FaArrowLeft> Back to Ad Listings
          </Link>
        </div>
      </section>


      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
             {/* grid layout with two columns on larger screens  */} 
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{ad?.posterName}</div>
                <h1 className="text-3xl font-bold mb-4">{ad?.businessIdea}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-lg text-orange-700 mr-2"></FaMapMarker>
                  <p className="text-orange-700">{ad?.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Description
                </h3>
                <p className="mb-4">{ad?.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Initial Investment
                </h3>
                <p className="mb-4">{ad?.investment}</p>


                <h4 className="text-indigo-800 text-lg font-semibold mb-2">
                  Must Have Skills
                </h4>

                <p className="mb-4">{ad?.requiredSkills.map((skill, index) => {
                  return <li key={index}>{skill}</li>
                })}</p>

            


              </div>
            </main>


              {/*<!-- sidebar */} {/*<!-- Poster Info */}   
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">About me</h3>

                <h2 className="text-2xl">{ad?.posterInfo.name}</h2>

                <p className="my-2">{ad?.posterInfo.about}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {ad?.posterInfo.email}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {ad?.posterInfo.phone}
                </p>
              </div>

              {/*<!-- Manage */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Ad</h3>
                <a
                  href="/add-job.html"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Ad
                </a>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Ad
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdPage;
