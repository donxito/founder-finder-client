import Hero from "../components/Hero";
import BoardCards from "../components/BoardCards";
import FounderListings from "../components/FounderListings";
// import ViewAllAds from "../components/ViewAllAds";
import Newsletter from "../components/Newsletter";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FounderListings isHome={true} />
      <BoardCards />
      {/* <ViewAllAds /> */}
      <Newsletter />
    </>
  );
};

export default HomePage;
