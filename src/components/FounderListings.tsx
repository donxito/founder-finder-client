import { useState, useEffect } from "react";
import FounderListing, { Ad } from "./FounderListing";
import Spinner from "./Spinner";

const FounderListings = ({ isHome = false }) => {


  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      const apiUrl = isHome 
      ? "/api/founders?_limit=3" 
      : "/api/founders";

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setAds(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  useEffect;

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Ads" : "All Ads"}
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
