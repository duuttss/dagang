import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

// Data produk awal (kalau LocalStorage kosong)
const initialProducts = [
  {
    id: 1,
    name: "Kaos Polos Premium",
    price: 75000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "Kaos polos premium bahan cotton combed 30s, nyaman dipakai sehari-hari.",
    category: "Fashion",
    stock: 25,
  },
  {
    id: 2,
    name: "Sepatu Sneakers",
    price: 350000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Sepatu sneakers kasual dengan sol karet anti-slip, cocok untuk aktivitas harian.",
    category: "Fashion",
    stock: 12,
  },
  {
    id: 3,
    name: "Headphone Wireless",
    price: 450000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Headphone wireless dengan noise cancelling, baterai tahan 20 jam.",
    category: "Elektronik",
    stock: 8,
  },
  {
    id: 4,
    name: "Tas Ransel",
    price: 180000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    description: "Tas ransel dengan banyak kompartemen, cocok untuk sekolah atau kerja.",
    category: "Fashion",
    stock: 15,
  },
  {
    id: 5,
    name: "Smartwatch",
    price: 650000,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    description: "Smartwatch dengan monitor detak jantung, GPS, dan tahan air.",
    category: "Elektronik",
    stock: 5,
  },
  {
    id: 6,
    name: "Lipstik Matte",
    price: 85000,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
    description: "Lipstik matte tahan lama, tidak mudah luntur, tersedia berbagai warna.",
    category: "Kecantikan",
    stock: 30,
  },
];

const STORAGE_KEY = "myShop_products";

export function ProductProvider({ children }) {
  // Inisialisasi: baca dari LocalStorage kalau ada
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialProducts;
    } catch (e) {
      console.error("Gagal baca LocalStorage:", e);
      return initialProducts;
    }
  });

  // Setiap products berubah → simpan ke LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      console.log("Produk tersimpan ke LocalStorage:", products.length, "item");
    } catch (e) {
      console.error("Gagal simpan ke LocalStorage:", e);
    }
  }, [products]);

  const addProduct = (product) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts([...products, { ...product, id: newId }]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === Number(id));
  };

  const resetProducts = () => {
    if (window.confirm("Reset semua produk ke data awal?")) {
      setProducts(initialProducts);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}