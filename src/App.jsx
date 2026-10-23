import { Routes, Route } from "react-router-dom";

// Import Layout
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Import Halaman Frontpage
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";

// Import Halaman Admin
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import ProductForm from "./pages/adminpages/ProductForm";
import AboutPage from "./pages/adminpages/AboutPage";
import Login from "./pages/adminpages/Login"; // <-- IMPORT HALAMAN LOGIN BARU

export default function App() {
  return (
    <Routes>
      {/* ================= FRONTPAGE (PEMBELI) ================= */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* ================= HALAMAN LOGIN ADMIN ================= */}
      {/* Rute ini diletakkan di luar AdminLayout agar tidak ada sidebar saat login */}
      <Route path="/admin/login" element={<Login />} />

      {/* ================= ADMINPAGE (BACKEND) ================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}