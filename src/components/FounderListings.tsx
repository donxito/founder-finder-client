import React, { useState, useEffect } from "react";
import FounderListing, { Ad } from "./FounderListing";
import Spinner from "./Spinner";

interface Props {
  isHome?: boolean;
}

const FounderListings: React.FC<Props> = ({ isHome = false }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAds = async () => {
      const apiUrl = isHome 
        ? "/api/ads?_limit=3" 
        : "/api/ads";
  
      try {
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
  
        const data = await res.json();
        setAds(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAds();
  }, [isHome]);
  

  return (
    <section className="bg-zinc-100 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-customBlue mb-6 text-center">
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
