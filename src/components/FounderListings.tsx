import data from "../testingData.json";
import FounderListing, { Ad } from "./FounderListing";

const FounderListings = () => {

  const recentAds = data.slice(0, 3);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Ads
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAds.map((ad: Ad) => (
            <FounderListing 
            key={ad.id} 
            ad={ad}
             />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderListings;