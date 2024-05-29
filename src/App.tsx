import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Mainlayout from "./layouts/MainLayout";
import AdsPage from "./pages/AdsPage";
import NotFound from "./pages/NotFound";
import AdPage from "./pages/AdPage";
import AddAdPage from "./pages/AddAdPage";
import EditAdpage from "./pages/EditAdpage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";


//import IsLoggedIn from "./context/IsLoggedIn";
//import IsAnon from "./context/IsAnon";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route index element={<HomePage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<AdPage/>} />
        <Route path="/edit-ad/:id" element={<EditAdpage />} />
        <Route path="/add-ad" element={<AddAdPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
