import Hero from "../components/Hero";
import BoardCards from "../components/BoardCards";
import FounderListings from "../components/FounderListings";
import ViewAllAds from "../components/ViewAllAds";
import Searchbar from "../components/Searchbar";

const HomePage = () => {
  return (
    <>
      <Hero />
      <BoardCards />
      <Searchbar />
      <FounderListings isHome={true} />
      <ViewAllAds />
    </>
  );
};

export default HomePage;
