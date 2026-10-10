import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductById(id);

  // Kalau produk tidak ditemukan
  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          ← Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // reset pesan setelah 2 detik
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <div>
      <Link to="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Kembali ke Dashboard
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">
        {/* Gambar Produk */}
<div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover"
  />
</div>

        {/* Info Produk */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-4">
            Kategori: {product.category}
          </p>

          <p className="text-3xl text-blue-600 font-bold mb-4">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <p className="text-sm text-gray-500 mb-4">
            Stok tersedia: <span className="font-semibold">{product.stock}</span>
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-semibold">Jumlah:</label>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-6 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold"
            >
              🛒 Tambah ke Keranjang
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg font-semibold"
            >
              Beli Sekarang
            </button>
          </div>

          {added && (
            <div className="mt-4 bg-green-100 text-green-800 p-3 rounded">
              ✅ Produk berhasil ditambahkan ke keranjang!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}