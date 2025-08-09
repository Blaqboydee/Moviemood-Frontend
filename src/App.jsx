import React from "react";
import "./index.css";
import { Route, Routes, useLocation } from "react-router-dom";
import MovieUpload from "./pages/Movieupload";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import ImageCarousel from "./components/MoviesLoop";
import AdminShowtimeForm from "./pages/AdminShowtimeForm";
import Bookticket from "./pages/Bookticket";
import MoviePage from "./pages/Moviepage";
import SelectSeatsPage from "./pages/SelectSeatsPage";
import FoodAndDrinks from "./pages/Foodanddrinks";
import FoodAdmin from "./pages/AdminFoodanddrinks";
import PaymentComponent from "./components/Payment";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MyOrders from "./pages/MyOrders";
import Admindashboard from "./pages/Admindashboard";

const App = () => {
  const location = useLocation();
  const knownPaths = [
    "/",
    "/login",
    "/adminupload",
    "/adminshowtime",
    "/carousel",
    "/adminfood",
    "/foodsanddrinks",
    "/test/:movieSlug",
    "/select-seats/:movieId/:showtimeId",
    "/myorders"
  ];
  const hideNavbar =
  location.pathname === "/login" ||
  !(
    knownPaths.includes(location.pathname) ||
    location.pathname.includes("/select-seats/") ||
    location.pathname.includes("/test/")
  );

  return (
    <>
    
      {!hideNavbar && <Navbar />}
      <PaymentComponent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/carousel" element={<ImageCarousel />} />
        <Route path="/test/:movieSlug" element={<MoviePage />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/foodsanddrinks" element={<FoodAndDrinks />} />
        <Route
          path="/select-seats/:movieId/:showtimeId"
          element={<SelectSeatsPage />}
        />
        <Route path="/bookticket/:movieSlug" element={<Bookticket />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />}></Route>

        <Route path="/dashboard" element={<Admindashboard/>}>
        <Route index element={<AdminShowtimeForm/>}/>
        <Route path="/dashboard/adminshowtime" element={<AdminShowtimeForm />} />
        <Route path="/dashboard/adminupload" element={<MovieUpload />} />
        <Route path="/dashboard/adminfood" element={<FoodAdmin />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
