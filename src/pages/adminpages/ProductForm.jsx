import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../services/api";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL (jika ada)
  const isEditMode = Boolean(id); // Jika ada ID, berarti mode Edit

  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    category_id: 1, 
    stock: 0,
    img: "",
  });

  const [loading, setLoading] = useState(false);

  // Jika mode Edit, ambil data produk dari API berdasarkan ID
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          const data = response.data.data;
          setForm({
            name: data.name,
            price: data.price,
            description: data.description || "",
            category_id: data.category.id,
            stock: data.stock,
            // Jika img_url dari API adalah link internet, ambil itu. 
            // Jika tidak, kosongkan (karena user mungkin tidak mengubah gambar).
            img: data.img_url && data.img_url.startsWith('http') ? data.img_url : "",
          });
        } catch (error) {
          alert("Gagal mengambil data produk.");
          navigate("/admin/dashboard");
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" || name === "stock" || name === "category_id" 
              ? Number(value) 
              : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        // Jika Edit, gunakan method PUT
        await api.put(`/products/${id}`, form);
        alert("Produk berhasil diupdate!");
      } else {
        // Jika Tambah Baru, gunakan method POST
        await api.post("/products", form);
        alert("Produk berhasil ditambahkan!");
      }
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan produk. Cek console untuk detail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to="/admin/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Kembali ke Manajemen Produk
      </Link>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Produk" : "Tambah Produk Baru"}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nama Produk *</label>
            <input
              type="text" name="name" value={form.name} onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2" required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Kategori *</label>
              <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
                <option value="1">Elektronik</option>
                <option value="2">Fashion</option>
                <option value="3">Makanan & Minuman</option>
                <option value="4">Olahraga</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Harga (Rp) *</label>
              <input
                type="number" name="price" value={form.price} onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2" required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Stok *</label>
            <input
              type="number" name="stock" value={form.stock} onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2" required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Deskripsi</label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2" rows="3"
            />
          </div>

          {/* PERUBAHAN DI SINI: Label dan tipe input diubah menjadi URL */}
          <div>
            <label className="block text-sm font-semibold mb-1">URL Gambar (Opsional)</label>
            <input
              type="url" name="img" value={form.img} onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2" placeholder="https://example.com/gambar.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Kosongkan jika tidak ingin mengubah gambar, atau masukkan link gambar dari internet (misal: Unsplash).
            </p>
            
            {/* Preview Gambar jika URL diisi */}
            {form.img && (
              <img 
                src={form.img} 
                alt="Preview" 
                className="mt-3 w-24 h-24 object-cover rounded border"
                onError={(e) => { e.target.style.display = 'none'; }} // Sembunyikan jika link rusak
              />
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit" disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-400"
            >
              {loading ? "Menyimpan..." : (isEditMode ? "Simpan Perubahan" : "Simpan Produk")}
            </button>
            <Link to="/admin/dashboard" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 font-semibold">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}