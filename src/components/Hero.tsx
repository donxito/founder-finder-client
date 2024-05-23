

const Hero = () => {

    const title = "Starting a company alone is extremely difficult."
    const subtitle = "Finding a co-founder requires time and resources. It's like a marriage - you'll likely spend more time with your co-founder than your spouse, so choose wisely!"


  return (
    <section className='bg-slate-600 py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            {title}
          </h1>
          <p className='my-4 text-xl text-white'>{subtitle}</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
