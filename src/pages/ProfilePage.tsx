/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaArrowLeft } from "react-icons/fa";
import userService from "../services/user.service";
import adService from "../services/adService";
import { Container } from "semantic-ui-react";
import { UserType } from "../types/userType";
import { Ad } from "../types/adType";




const ProfilePage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          throw new Error("User ID is not available");
        }

        const userResponse = await userService.getUser(userId);
        const userData = userResponse.data;
        console.log("USER:", userData);

        setUser(userData);

        const adsResponse = await adService.getUserAds(userId); // Assuming this method exists in adService
        const userAds = adsResponse.data;
        console.log("USER ADS:", userAds);
        setAds(userAds);
      } catch (error) {
        setError("Failed to fetch user data or ads");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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

      <section className="bg-zinc-100">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-xl font-bold mb-2 text-customBlue">
                  {user?.name}
                </h1>

                <div className="text-gray-500 mb-4">
                  <p className="text-zinc-600">{user?.email}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-customBlue text-lg font-bold mb-6">
                  About
                </h3>
                <Container textAlign="justified">
                  <div className="p-4 bg-gray-100 rounded-md mb-4 overflow-hidden">
                    <p className="text-gray-800 mb-0 break-words">
                      {user?.about}
                    </p>
                  </div>
                </Container>

                <h3 className="text-customBlue text-lg font-bold mb-2">
                  Phone
                </h3>
                <p className="mb-4">{user?.phoneNumber}</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-customBlue text-lg font-bold mb-6">
                  My Ads:
                </h3>
                <ul>
                  {ads.map((ad, index) => (
                    <li key={index} className="mb-4">
                      <Link
                        to={`/ads/${ad._id}`}
                        className="text-customBlue hover:underline"
                      >
                        {ad.businessIdea}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
