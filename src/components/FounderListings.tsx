import data from "../testingData.json";
import FounderListing, { Ad } from "./FounderListing";

const FounderListings = ({ isHome = false }) => {

  const founderListings = isHome ? data.slice(0, 3) : data;

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          { isHome ? "Recent Ads" : "All Ads"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {founderListings.map((ad: Ad) => (
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