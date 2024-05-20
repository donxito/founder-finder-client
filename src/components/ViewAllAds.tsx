
import { Link } from "react-router-dom";

const ViewAllAds = () => {
  return (
    <section className="m-auto max-w-lg my-10 px-6">
        <Link
        to="/ads"
        className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
            View All Ads
        </Link>

    </section>
  )
}

export default ViewAllAds
