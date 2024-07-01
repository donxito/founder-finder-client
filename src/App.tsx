import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Mainlayout from "./layouts/MainLayout";
import IsLoggedIn from "./context/IsLoggedIn";
import IsAnon from "./context/IsAnon";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AdsPage = lazy(() => import("./pages/AdsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdPage = lazy(() => import("./pages/AdPage"));
const AddAdPage = lazy(() => import("./pages/AddAdPage"));
const EditAdPage = lazy(() => import("./pages/EditAdpage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignUpPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default App;
