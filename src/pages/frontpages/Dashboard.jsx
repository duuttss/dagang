import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

export default function Dashboard() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-600 text-sm line-clamp-2 mb-2">
              {product.description}
            </p>
            <p className="text-blue-600 font-bold mb-2">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Stok: {product.stock} | {product.category}
            </p>

            <div className="mt-auto flex gap-2">
              <Link
                to={`/product/${product.id}`}
                className="flex-1 text-center text-blue-600 border border-blue-600 hover:bg-blue-50 py-2 rounded"
              >
                Lihat Detail
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-2 rounded"
              >
                + Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}