import Card from "./Card";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const BoardCards = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-ad");
  };

  const handleOtherClick = () => {
    navigate("/ads");
  };

  return (
    <section className="py-16 bg-white mb-10">
      <div className="container-lg lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 rounded-sm">
          <Card>
            <h2 className="text-2xl font-bold text-white">
              Find your co-Founder
            </h2>
            <p className="mt-2 mb-4 text-white">
              Browse our adds and see if you find something interesting
            </p>
            <Button onClick={handleOtherClick} inverted color="blue">
              Browse Ads
            </Button>
          </Card>

          <Card bg="bg-customBlue">
            <h2 className="text-2xl font-bold text-white">
              Add your Idea
            </h2>
            <p className="mt-2 mb-4 text-white">
              List your idea to find the perfect founder partner
            </p>
            <Button onClick={handleClick} inverted color="grey">Post Ads</Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BoardCards;
