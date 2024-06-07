import { Outlet  } from "react-router-dom" // for nested routing
import Navbar from "../components/Navbar"
import { ToastContainer } from "react-toastify"
import Footer from "../components/Footer";
import 'react-toastify/dist/ReactToastify.css';


const Mainlayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/> {/* Render the child route components defined in the router configuration */}
    <ToastContainer /> {/*  */}
    <Footer/>
    
    </>
  )
}

export default Mainlayout
