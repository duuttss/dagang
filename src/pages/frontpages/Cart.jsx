import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  // Kalau keranjang kosong
  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
        <p className="text-gray-500 mb-6">Keranjang kamu masih kosong.</p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daftar Item */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow flex gap-4 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-blue-600 font-bold">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 py-1 border-x">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right w-32">
                <p className="text-sm text-gray-500">Subtotal</p>
                <p className="font-bold">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </p>
              </div>

              {/* Hapus */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-xl"
                title="Hapus"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* Ringkasan */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-6">
            <h2 className="text-xl font-bold mb-4">Ringkasan Belanja</h2>

            <div className="flex justify-between mb-2">
              <span>Total Item</span>
              <span>{cart.reduce((t, i) => t + i.quantity, 0)}</span>
            </div>

            <div className="flex justify-between mb-4 pb-4 border-b">
              <span className="font-semibold">Total Harga</span>
              <span className="font-bold text-blue-600 text-lg">
                Rp {getTotalPrice().toLocaleString("id-ID")}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Lanjut ke Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}