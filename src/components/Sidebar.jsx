import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white shadow-md`}
    >
      <div className="p-4 font-bold text-xl border-b">My Admin</div>
      <nav className="flex flex-col p-4 space-y-2">
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