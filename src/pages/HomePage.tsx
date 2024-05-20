import Hero from "../components/Hero";
import BoardCards from "../components/BoardCards";
import FounderListings from "../components/FounderListings";
import ViewAllAds from "../components/ViewAllAds";

const HomePage = () => {
  return (
    <>
      <Hero />
      <BoardCards />
      <FounderListings isHome={true} />
      <ViewAllAds />
    </>
  );
};

export default HomePage;
