import { NavLink } from "react-router-dom"
import logo from "../assets/img/logo1.png"


const Navbar = () => {

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-customCyan underline-effect active-underline rounded-md px-3 py-2'
      : 'text-customCyan underline-effect rounded-md px-3 py-2';

   
  return (

     <nav className='bg-customBlue border-b border-secondBlue'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='logo' />
           
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
              <NavLink to='/' className={linkClass}>
                  Home
                </NavLink>
                <NavLink to='/ads' className={linkClass}>
                  Ads
                </NavLink>
                <NavLink to='/add-ad' className={linkClass}>
                  Post Ad
                </NavLink>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
