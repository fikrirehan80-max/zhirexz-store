'use client'
import { useState, useEffect } from "react";

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any>({});
  const PASSWORD = "zhirexz123"; // GANTI PASSWORD KAMU
  const [login, setLogin] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [tab, setTab] = useState("orders");

  const [newNama, setNewNama] = useState("");
  const [newHarga, setNewHarga] = useState("");
  const [newDesk, setNewDesk] = useState("");
  const [newKat, setNewKat] = useState("vps");

  useEffect(() => {
    const dataOrder = localStorage.getItem('orders');
    const dataProd = localStorage.getItem('products');
    if(dataOrder) setOrders(JSON.parse(dataOrder));
    if(dataProd) setProducts(JSON.parse(dataProd));
  }, [])

  const updateStatus = (id: number) => {
    const newOrders = orders.map(o => o.id === id? {...o, status: "SUCCESS"} : o);
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  }

  const tambahProduk = () => {
    if(!newNama ||!newHarga) return alert("Isi nama dan harga!");
    const idBaru = Date.now();
    const prodBaru = {...products};
    prodBaru[newKat].push({ id: idBaru, nama: newNama, harga: Number(newHarga), deskripsi: newDesk });
    setProducts(prodBaru);
    localStorage.setItem('products', JSON.stringify(prodBaru));
    setNewNama(""); setNewHarga(""); setNewDesk("");
    alert("Produk berhasil ditambah!");
  }

  const hapusProduk = (kat: string, id: number) => {
    const prodBaru = {...products};
    prodBaru[kat] = prodBaru[kat].filter((p: any) => p.id!== id);
    setProducts(prodBaru);
    localStorage.setItem('products', JSON.stringify(prodBaru));
  }

  if(!login) return (
    <div className="p-6 text-center min-h-screen flex-col justify-center">
      <h1 className="text-2xl font-bold">Login Admin</h1>
      <input type="password" placeholder="Password" value={passInput} onChange={e => setPassInput(e.target.value)}
        className="border p-2 mt-4 rounded max-w-xs mx-auto"/>
      <button onClick={() => passInput === PASSWORD && setLogin(true)}
        className="bg-blue-500 text-white p-2 rounded mt-2 max-w-xs mx-auto">Login</button>
    </div>
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded text-center">ADMIN PANEL ZHIREXZ</h1>
      <div className="flex gap-2 mt-4 justify-center">
        <button onClick={() => setTab("orders")} className={`px-4 py-2 rounded ${tab === "orders"? "bg-blue-500 text-white" : "bg-gray-200"}`}>Data Order</button>
        <button onClick={() => setTab("products")} className={`px-4 py-2 rounded ${tab === "products"? "bg-blue-500 text-white" : "bg-gray-200"}`}>Kelola Produk</button>
      </div>

      {tab === "orders" && ("use client"
import { useState, useEffect } from "react"

export default function Admin() {
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")

  const ADMIN_PASS = "admin123" // GANTI PASSWORD KAMU DISINI

  useEffect(() => {
    const data = localStorage.getItem("products")
    if (data) setProducts(JSON.parse(data))
  }, [])

  const saveProducts = (newProducts: any[]) => {
    setProducts(newProducts)
    localStorage.setItem("products", JSON.stringify(newProducts))
  }

  const addProduct = () => {
    if (!name || !price) return alert("Nama & Harga wajib!")
    const newProducts = [...products, { name, price, desc }]
    saveProducts(newProducts)
    setName(""); setPrice(""); setDesc("")
  }

  const deleteProduct = (i: number) => {
    const newProducts = products.filter((_, index) => index !== i)
    saveProducts(newProducts)
  }

  if (!isLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-zinc-900 p-8 rounded-2xl w-80">
          <h1 className="text-2xl font-bold mb-4">Login Admin</h1>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-black border border-zinc-700 rounded"/>
          <button onClick={() => password === ADMIN_PASS ? setIsLogin(true) : alert("Salah!")}
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded">Masuk</button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel 🔥</h1>
      
      {/* FORM TAMBAH PRODUK */}
      <div className="bg-zinc-900 p-6 rounded-2xl mb-6">
        <h2 className="font-bold mb-4">Tambah Produk</h2>
        <input placeholder="Nama Produk" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 mb-2 bg-black rounded"/>
        <input placeholder="Harga" type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 mb-2 bg-black rounded"/>
        <textarea placeholder="Deskripsi" value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2 mb-2 bg-black rounded"/>
        <button onClick={addProduct} className="w-full bg-yellow-400 text-black font-bold py-2 rounded">Tambah</button>
      </div>

      {/* DAFTAR PRODUK */}
      <div className="space-y-2">
        {products.map((p, i) => (
          <div key={i} className="bg-zinc-900 p-4 rounded flex justify-between">
            <div>
              <p className="font-bold">{p.name}</p>
              <p className="text-yellow-400">Rp {p.price}</p>
            </div>
            <button onClick={() => deleteProduct(i)} className="text-red-500">Hapus</button>
          </div>
        ))}
      </div>
      <a href="/" className="block text-center mt-6 text-gray-400">← Kembali ke Toko</a>
    </main>
  )
          }
