/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaArrowLeft } from "react-icons/fa";
import userService from "../services/user.service";
import adService from "../services/adService";
import { Container, Button } from "semantic-ui-react";
import { UserType } from "../types/userType";
import { Ad } from "../types/adType";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    about: "",
    phoneNumber: "",
    avatar: "",
  });
  const [fileUrl, setFileUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

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
        setFormData({
          name: userData.name,
          email: userData.email,
          about: userData.about ?? "",
          phoneNumber: userData.phoneNumber ?? "",
          avatar: userData.avatar ?? "",
        });

        const adsResponse = await adService.getUserAds(userId);
        const userAds = adsResponse.data;

        console.log("USER ADS:", userAds);

        setAds(userAds);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    console.log("File to upload", file);

    const uploadData = new FormData();
    uploadData.append("file", file);

    setUploading(true);

    try {
      const response = await userService.uploadImage(uploadData);
      console.log("File upload response", response);
      
      // Ensure response.data.fileUrl exists and is a string
      if (response.data && typeof response.data.fileUrl === 'string') {
        setFileUrl(response.data.fileUrl);
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: response.data.fileUrl,
        }));
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("File upload error", error);
    } finally {
      setUploading(false);
    }
  };

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!userId) {
        throw new Error("User ID is not available");
      }

      const updatedUser: UserType = {
        _id: user?._id ?? "",
        id: user?.id ?? "",
        iat: user?.iat ?? 0,
        exp: user?.exp ?? 0,
        name: formData.name,
        email: formData.email,
        about: formData.about,
        phoneNumber: formData.phoneNumber,
        avatar: formData.avatar,
      };

      await userService.updateUser(userId, updatedUser);
      setUser({ ...user, ...updatedUser });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      toast.success("Your profile has been updated");
      setLoading(false);
    }
  };

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
            <FaArrowLeft className="mr-2" /> Back to Ad Listings
          </Link>
        </div>
      </section>

      <section className="bg-zinc-100 mt-16">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                {editMode ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={handleFileUpload}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={uploading}
                      />
                    </div>
                    {fileUrl && (
                      <div className="mb-4">
                        <img src={fileUrl} alt="Avatar Preview" className="w-40 rounded-lg" />
                      </div>
                    )}

                    <div className="mb-4">
                      <label
                        className="block text-customBlue text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-customBlue text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-customBlue text-sm font-bold mb-2"
                        htmlFor="about"
                      >
                        About
                      </label>
                      <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-customBlue text-sm font-bold mb-2"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-customBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={uploading}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="mb-4 flex flex-row-reverse justify-between">
                      <img
                        src={user?.avatar}
                        alt="Avatar"
                        className="w-40 rounded-lg"
                      />
                      <div className="mt-4">
                        <h1 className="text-xl font-bold mb-2 text-customBlue">
                          {user?.name}{" "}
                        </h1>
                        <div className="text-gray-500 mb-4">
                          <p className="text-zinc-600">{user?.email}</p>
                        </div>
                        <Button
                          inverted
                          color="blue"
                          onClick={() => setEditMode(true)}
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-customBlue text-lg font-bold mb-6">
                  About Me:
                </h3>
                <Container textAlign="justified">
                  <div className="p-4 bg-gray-100 rounded-md mb-4 overflow-hidden">
                    <p className="text-gray-800 mb-0 break-words">
                      {user?.about}
                    </p>
                  </div>
                </Container>

                <h3 className="text-customBlue text-lg font-bold mb-2">
                  Phone:
                </h3>
                <p className="mb-4">{user?.phoneNumber}</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-customBlue text-lg font-bold mb-6">
                  My Posts:
                </h3>
                <ul>
                  {ads.map((ad, index) => (
                    <li key={index} className="mb-4">
                      <Link
                        to={`/ads/${ad._id}`}
                        className="text-customCyan font-bold hover:text-secondCyan hover:underline"
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
