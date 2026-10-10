import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, addProduct, updateProduct } = useProducts();

  const isEditMode = Boolean(id);
  const existingProduct = isEditMode ? getProductById(id) : null;

  const [form, setForm] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "Fashion",
    stock: 0,
  });

  // Kalau mode edit, isi form dengan data produk existing
  useEffect(() => {
    if (existingProduct) {
      setForm({
        name: existingProduct.name,
        price: existingProduct.price,
        image: existingProduct.image,
        description: existingProduct.description,
        category: existingProduct.category,
        stock: existingProduct.stock,
      });
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    if (!form.name || form.price <= 0) {
      alert("Nama dan harga harus diisi dengan benar!");
      return;
    }

    // Pakai placeholder image kalau kosong
    const finalForm = {
      ...form,
      image:
        form.image ||
        `https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=${encodeURIComponent(
          form.name
        )}`,
    };

    if (isEditMode) {
      updateProduct(Number(id), finalForm);
      alert("Produk berhasil diupdate!");
    } else {
      addProduct(finalForm);
      alert("Produk berhasil ditambahkan!");
    }

    navigate("/admin/dashboard");
  };

  // Kalau mode edit tapi produk tidak ditemukan
  if (isEditMode && !existingProduct) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
        <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
          ← Kembali ke Manajemen Produk
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/admin/dashboard"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Kembali ke Manajemen Produk
      </Link>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Produk" : "Tambah Produk Baru"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-4"
        >
          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Nama Produk *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Contoh: Kaos Polos Premium"
              required
            />
          </div>

          {/* Kategori & Harga */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Kategori *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option>Fashion</option>
                <option>Elektronik</option>
                <option>Kecantikan</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Harga (Rp) *
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                min="0"
                placeholder="75000"
                required
              />
            </div>
          </div>

          {/* Stok */}
          <div>
            <label className="block text-sm font-semibold mb-1">Stok *</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              min="0"
              placeholder="10"
              required
            />
          </div>

          {/* URL Gambar */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              URL Gambar (opsional)
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="https://example.com/gambar.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Kosongkan untuk pakai gambar placeholder otomatis.
            </p>

            {/* Preview Gambar */}
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded border"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Deskripsi
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              rows="4"
              placeholder="Jelaskan detail produk..."
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              {isEditMode ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
            <Link
              to="/admin/dashboard"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 font-semibold"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}