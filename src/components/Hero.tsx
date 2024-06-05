import Searchbar from "./Searchbar"

const Hero = () => {

    const title = "Starting a company alone is extremely difficult."
    const subtitle = "Finding a co-founder requires time and resources. It's like a marriage - you'll likely spend more time with your co-founder than your spouse, so choose wisely!"


  return (
    <section className='bg-slate-700 py-20 '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-zinc-400 sm:text-5xl md:text-6xl mt-10 pt-20 pb-10'>
            {title}
          </h1>
          <p className='my-6 py-6 text-xl font-semibold text-zinc-200'>{subtitle}</p>
        </div>
      </div>
      <Searchbar />
  
    </section>


  )
}

export default Hero
