import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/img/logo1.png";
import { UserType } from "../types/userType";

const Navbar = () => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-customCyan underline-effect active-underline rounded-md px-3 py-2"
      : "text-customCyan underline-effect rounded-md px-3 py-2";

  return (
    <nav className="bg-customBlue border-b border-secondBlue">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="logo" />
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/ads" className={linkClass}>
                  Find a co-founder
                </NavLink>
                <NavLink to="/add-ad" className={linkClass}>
                  Add your idea
                </NavLink>

                {!isLoggedIn && (
                  <NavLink className={linkClass} to="/login">
                    Login
                  </NavLink>
                )}

                {!isLoggedIn && (
                  <NavLink className={linkClass} to="/register">
                    Register
                  </NavLink>
                )}

                {isLoggedIn && user && (
                  <NavLink
                    className={linkClass}
                    to={`/profile/${(user as UserType)._id}`}
                  >
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
