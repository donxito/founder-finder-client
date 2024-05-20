import { Link } from "react-router-dom"
import Card from "./Card"

const BoardCards = () => {
  return (
    <section className='py-4'>
    <div className='container-xl lg:container m-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
        <Card>
          <h2 className='text-2xl font-bold'>Find your Founder Partner</h2>
          <p className='mt-2 mb-4'>
            Browse our adds a see if you find something interesting
          </p>
          <Link
            to='/ads'
            className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
          >
            Browse Ads
          </Link>
        </Card>
        <Card bg='bg-indigo-300'>
          <h2 className='text-2xl font-bold'>Add your Idea</h2>
          <p className='mt-2 mb-4'>
            List your idea to find the perfect founder partner 
          </p>
          <Link
            to='/post-ad'
            className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
          >
            Post Ad
          </Link>
        </Card>
      </div>
    </div>
  </section>
  )
}

export default BoardCards
