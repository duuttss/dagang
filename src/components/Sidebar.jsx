import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white shadow-md min-h-screen`}
    >
      <div className="p-4 font-bold text-xl border-b">My Admin</div>
      
      <nav className="flex flex-col p-4 space-y-2">
        {/* MENU BARU: Jalan Cepat ke Dashboard Pembeli */}
        <Link
          to="/dashboard"
          className="hover:bg-blue-50 text-blue-600 font-semibold p-2 rounded border border-blue-200 mb-2"
          onClick={() => setSidebarOpen(false)}
        >
          🏠 Lihat Toko (Pembeli)
        </Link>

        <hr className="border-gray-200 my-2" />

        {/* MENU ADMIN LAMA */}
        <Link
          to="/admin/dashboard"
          className="hover:bg-gray-200 p-2 rounded"
          onClick={() => setSidebarOpen(false)}
        >
          📦 Produk
        </Link>
        <Link
          to="/admin/products/new"
          className="hover:bg-gray-200 p-2 rounded"
          onClick={() => setSidebarOpen(false)}
        >
          ➕ Tambah Produk
        </Link>
        <Link
          to="/admin/about"
          className="hover:bg-gray-200 p-2 rounded"
          onClick={() => setSidebarOpen(false)}
        >
          ℹ️ About
        </Link>
      </nav>
    </div>
  );
}