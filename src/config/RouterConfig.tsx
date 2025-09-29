import HomePage from "@/pages/HomePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WeatherDetailsPage from "@/pages/WeatherDetailsPage";
import OutfitPage from "@/pages/OutfitPage";

function RouterConfig() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather/:city" element={<WeatherDetailsPage />} />
          <Route path="/outfit" element={<OutfitPage />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default RouterConfig;
