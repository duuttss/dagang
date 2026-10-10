import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "transfer",
    notes: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!form.name || !form.phone || !form.address) {
      alert("Mohon lengkapi nama, telepon, dan alamat!");
      return;
    }

    // Generate nomor pesanan
    const orderNum = "ORD-" + Date.now().toString().slice(-8);
    setOrderNumber(orderNum);

    // Simulasi proses checkout
    setOrderSuccess(true);
    clearCart();
  };

  // Kalau keranjang kosong & belum sukses checkout
  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-500 mb-6">
          Keranjang kamu kosong. Silakan belanja dulu.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  // Halaman sukses
  if (orderSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-2">Pesanan Berhasil!</h1>
          <p className="text-gray-600 mb-4">
            Terima kasih, {form.name}. Pesanan kamu sedang diproses.
          </p>
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p className="text-sm text-gray-500">Nomor Pesanan</p>
            <p className="font-bold text-lg">{orderNumber}</p>
          </div>
          <Link
            to="/dashboard"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Pengiriman */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Informasi Pengiriman</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Nama penerima"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Alamat Lengkap *
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  placeholder="Jalan, nomor rumah, kota, kode pos"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Catatan (opsional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  rows="2"
                  placeholder="Contoh: titip ke satpam"
                />
              </div>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Metode Pembayaran</h2>

            <div className="space-y-3">
              {[
                { value: "transfer", label: "Transfer Bank" },
                { value: "cod", label: "COD (Bayar di Tempat)" },
                { value: "ewallet", label: "E-Wallet (OVO, GoPay)" },
              ].map((method) => (
                <label
                  key={method.value}
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={form.payment === method.value}
                    onChange={handleChange}
                  />
                  <span>{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Buat Pesanan
          </button>
        </form>

        {/* Ringkasan Pesanan */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-6">
            <h2 className="text-lg font-bold mb-4">Ringkasan Pesanan</h2>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-blue-600">
                Rp {getTotalPrice().toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}