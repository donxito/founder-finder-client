import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Mainlayout from "./layouts/MainLayout";
import AdsPage from "./pages/AdsPage";
import NotFound from "./pages/NotFound";
import AdPage from "./pages/AdPage";
import AddAdPage from "./pages/AddAdPage";
import EditAdPage from "./pages/EditAdpage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";

import IsLoggedIn from "./context/IsLoggedIn";
import IsAnon from "./context/IsAnon";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<HomePage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<AdPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/profile/:userId"
          element={
            <IsLoggedIn>
              <ProfilePage />
            </IsLoggedIn>
          }
        />

        <Route
          path="/edit-ad/:id"
          element={
            <IsLoggedIn>
              <EditAdPage />
            </IsLoggedIn>
          }
        />

        <Route
          path="/add-ad"
          element={
            <IsLoggedIn>
              <AddAdPage />
            </IsLoggedIn>
          }
        />

        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        
        <Route
          path="/register"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

  );
}

export default App;
