
import { Link } from "react-router-dom";

const ViewAllAds = () => {
  return (
    <section className="m-auto max-w-lg my-10 px-6">
        <Link
        to="/ads"
        className="block bg-customBlue text-white text-center py-4 px-6 rounded-xl hover:bg-slate-600"
        >
            Browse Ads
        </Link>

    </section>
  )
}

export default ViewAllAds
