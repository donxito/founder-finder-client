import { useState, useEffect } from "react";
import FounderListing, { Ad } from "./FounderListing";
import Spinner from "./Spinner";
import adService from "../services/adService";

interface Props {
  isHome?: boolean;
}

const FounderListings: React.FC<Props> = ({ isHome = false }) => {
  
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        let response;
        if (isHome) {
          response = await adService.getAllAds();
          const allAds = response.data;
          if (Array.isArray(allAds)) {
            
            const adsWithId = allAds.map((ad: Ad) => ({
              ...ad,
              id: ad._id // Map _id to id
            }));
            setAds(adsWithId.slice(-3)); // show the last 3 ads
          } else {
            setAds([]);
          }
        } else {
          response = await adService.getAllAds();
          // Assuming _id is present in each ad object
          const adsWithId = response.data.map((ad: Ad) => ({
            ...ad,
            id: ad._id // Map _id to id
          }));
          setAds(adsWithId);
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Log fetch errors
      } finally {
        setLoading(false);
      }
    };
  
    fetchAds();
  }, [isHome]);

  return (
    <section className="bg-zinc-100 px-4 py-16 mb-2">
      <div className=" container-sm sm:container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-customBlue mb-14 text-center">
          {isHome ? "Latest Posts" : "Find a co-founder"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ads.map((ad: Ad) => (
              <FounderListing key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FounderListings;
