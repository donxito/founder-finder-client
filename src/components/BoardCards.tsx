import { Link } from "react-router-dom"
import Card from "./Card"

const BoardCards = () => {
  return (
    <section className='py-20 bg-zinc-100 '>
    <div className='container-xl lg:container m-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 rounded-lg'>
        <Card>
          <h2 className='text-2xl font-bold'>Find your Founder Partner</h2>
          <p className='mt-2 mb-4'>
            Browse our adds and see if you find something interesting
          </p>
          <Link
            to='/ads'
            className='inline-block bg-slate-700 text-white rounded-lg px-4 py-2 hover:bg-secondCyan'
          >
            Browse Ads
          </Link>
        </Card>
        <Card bg='bg-secondCyan'>
          <h2 className='text-2xl font-bold text-white'>Add your Idea</h2>
          <p className='mt-2 mb-4 text-white'>
            List your idea to find the perfect founder partner 
          </p>
          <Link
            to='/add-ad'
            className='inline-block bg-zinc-300 text-customBlue rounded-lg px-4 py-2 hover:bg-customCyan'
          >
            Post Ads
          </Link>
        </Card>
      </div>
    </div>
  </section>
  )
}

export default BoardCards
