import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // Import jembatan API kita

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari Laravel
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.data); // Laravel membungkus data di dalam "data"
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setLoading(false);
    }
  };

  // Jalankan saat halaman pertama kali dibuka
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fungsi untuk menghapus produk
  const handleDelete = async (id, name) => {
    if (window.confirm(`Yakin ingin menghapus produk "${name}"?`)) {
      try {
        await api.delete(`/products/${id}`);
        alert("Produk berhasil dihapus!");
        fetchProducts(); // Refresh data setelah dihapus
      } catch (error) {
        alert("Gagal menghapus produk.");
      }
    }
  };

  if (loading) return <div className="p-6">Memuat data dari server...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Produk</h1>
          <p className="text-sm text-gray-500">
            Total: {products.length} produk (Dari Database Laravel)
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 font-semibold">Produk</th>
              <th className="text-left p-4 font-semibold">Kategori</th>
              <th className="text-right p-4 font-semibold">Harga</th>
              <th className="text-center p-4 font-semibold">Stok</th>
              <th className="text-center p-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-8 text-gray-500">
                  Belum ada produk di database.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.img_url || "https://placehold.co/100x100/e2e8f0/475569?text=No+Image"}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        // Tambahkan baris di bawah ini:
                        onError={(e) => {
                        e.target.onerror = null; // Mencegah looping tanpa henti
                        e.target.src = "https://placehold.co/100x100/e2e8f0/475569?text=No+Image";
                          }}
                       />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{product.category?.name}</td>
                  <td className="p-4 text-right font-semibold text-blue-600">
                    Rp {product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}