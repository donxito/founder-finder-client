import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Mainlayout from "./layouts/MainLayout";
import AdsPage from "./pages/AdsPage";
import NotFound from "./pages/NotFound";
import AdPage from "./pages/AdPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<HomePage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<AdPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
