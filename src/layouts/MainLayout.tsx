import { Outlet  } from "react-router-dom" 
import Navbar from "../components/Navbar"


const Mainlayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Mainlayout
