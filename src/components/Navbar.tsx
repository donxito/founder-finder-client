import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/img/logo1.png";
import { UserType } from "../types/userType";

const Navbar = () => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-customCyan underline-effect active-underline rounded-md px-3 py-2"
      : "text-customCyan underline-effect rounded-md px-3 py-2";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-customBlue border-b border-secondBlue">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <NavLink className="flex items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/ads" className={linkClass}>
              Find a co-founder
            </NavLink>
            <NavLink to="/add-ad" className={linkClass}>
              Add your idea
            </NavLink>
            {!isLoggedIn && (
              <>
                <NavLink className={linkClass} to="/login">
                  Login
                </NavLink>
                <NavLink className={linkClass} to="/register">
                  Register
                </NavLink>
              </>
            )}
            {isLoggedIn && user && (
              <NavLink className={linkClass} to={`/profile/${(user as UserType)._id}`}>
                Profile
              </NavLink>
            )}
            {isLoggedIn && (
              <button
                onClick={logOutUser}
                className="text-customCyan underline-effect rounded-md px-3 py-2"
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-customCyan focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="h-8 w-8 transition-transform transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? "block" : "hidden"} md:hidden`}
        aria-labelledby="mobile-menu"
      >
        <ul className="flex flex-col items-center space-y-4 mt-4">
          <li>
            <NavLink
              to="/ads"
              className={linkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Find a co-founder
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-ad"
              className={linkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Add your idea
            </NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={linkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={linkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && user && (
            <li>
              <NavLink
                to={`/profile/${(user as UserType)._id}`}
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button
                onClick={() => {
                  logOutUser();
                  setIsMenuOpen(false);
                }}
                className="text-customCyan underline-effect rounded-md px-3 py-2"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
