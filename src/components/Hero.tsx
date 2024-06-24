import Searchbar from "./Searchbar"

const Hero = () => {

    const title = "Starting a company alone is extremely difficult."
    const subtitles = [
      "Finding a co-founder requires time and resources. It's like a marriage - you'll likely spend more time with your co-founder than your spouse, so choose wisely!",
      "The journey of entrepreneurship is long and arduous, having a co-founder can make it more manageable.",
      "A great co-founder complements your skills and shares your vision.",
      "Having a co-founder can significantly increase the chance of your startup's success.",
      "Choose a co-founder who can challenge you and bring out the best in you."
    ];

    const getRandomSubtitle = () => {
      const randomIndex = Math.floor(Math.random() * subtitles.length);
      return subtitles[randomIndex];
    }

    const subtitle = getRandomSubtitle();


  return (
    <section className='bg-slate-400 py-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-customBlue sm:text-5xl md:text-6xl mt-10 pt-20 pb-10 tracking-wide '>
            {title}
          </h1>
          <p className='my-6 py-6 text-xl font-semibold text-white'>{subtitle}</p>
        </div>
      </div>
      <Searchbar />
  
    </section>


  )
}

export default Hero
