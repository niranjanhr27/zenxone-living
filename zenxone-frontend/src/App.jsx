import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Properties from "./pages/Properties/Properties";
import Amazon from "./pages/Properties/Amazon";
import BHK from "./pages/Properties/BHK";
import Amenities from "./pages/Amenities/Amenities";
import Gallery from "./pages/Gallery/Gallery";
import Login from "./pages/Login/Login";
import Pricing from "./pages/Pricing/Pricing";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import Reviews from "./pages/Reviews/Reviews";
import BookNow from "./pages/BookNow/BookNow";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Leads from "./pages/Admin/Leads";
import Visits from "./pages/Admin/Visits";
import Students from "./pages/Admin/Students";
import Bookings from "./pages/Admin/Bookings";
import Payments from "./pages/Admin/Payments";
import PropertiesAdmin from "./pages/Admin/PropertiesAdmin";
import RoomsAdmin from "./pages/Admin/RoomsAdmin";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/amazon" element={<Amazon />} />
          <Route path="/properties/bhk" element={<BHK />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/book-now" element={<BookNow />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="visits" element={<Visits />} />
          <Route path="students" element={<Students />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="properties" element={<PropertiesAdmin />} />
          <Route path="rooms" element={<RoomsAdmin />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
