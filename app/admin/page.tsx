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

      {tab === "orders" && (
        <div className="mt-4">
          {orders.length === 0? <p>Belum ada order</p> :
            orders.map(o => (
              <div key={o.id} className="border-2 border-yellow-400 rounded-xl p-4 mt-4">
                <p><b>Produk:</b> {o.produk}</p><p><b>Harga:</b> Rp{o.harga.toLocaleString()}</p>
                <p><b>WA:</b> {o.wa}</p><p><b>User:</b> {o.user}</p>
                <p><b>Tanggal:</b> {o.tanggal}</p>
                <p><b>Status:</b> <span className={o.status === 'PENDING'? 'text-red-500' : 'text-green-500'}>{o.status}</span></p>
                {o.bukti && <img src={o.bukti} className="w-60 mt-2 cursor-pointer border" onClick={() => window.open(o.bukti, '_blank')}/>}
                {o.status === 'PENDING' && <button onClick={() => updateStatus(o.id)} className="mt-2 bg-green-500 text-white p-2 rounded">Tandai Sudah Bayar</button>}
              </div>
            ))
          }
        </div>
      )}

      {tab === "products" && (
        <div className="mt-4">
          <div className="border-2 border-purple-500 rounded-xl p-4 mb-6">
            <h2 className="font-bold text-lg mb-2">+ Tambah Produk Baru</h2>
            <select value={newKat} onChange={e => setNewKat(e.target.value)} className="border p-2 w-full rounded mb-2">
              <option value="vps">VPS NAT</option><option value="panel">PANEL</option>
              <option value="script">SCRIPT</option><option value="app">APP PREMIUM</option>
            </select>
            <input placeholder="Nama Produk" value={newNama} onChange={e => setNewNama(e.target.value)} className="border p-2 w-full rounded mb-2"/>
            <input placeholder="Harga" type="number" value={newHarga} onChange={e => setNewHarga(e.target.value)} className="border p-2 w-full rounded mb-2"/>
            <input placeholder="Deskripsi" value={newDesk} onChange={e => setNewDesk(e.target.value)} className="border p-2 w-full rounded mb-2"/>
            <button onClick={tambahProduk} className="w-full bg-green-500 text-white p-2 rounded font-bold">Simpan Produk</button>
          </div>

          {Object.entries(products).map(([kat, items]: any) => (
            <div key={kat} className="mb-6">
              <h2 className="font-bold text-purple-600">{kat.toUpperCase()}</h2>
              {items.map((p: any) => (
                <div key={p.id} className="border p-2 rounded flex justify-between mt-2">
                  <div><p className="font-bold">{p.nama} - Rp{p.harga.toLocaleString()}</p><p className="text-sm">{p.deskripsi}</p></div>
                  <button onClick={() => hapusProduk(kat, p.id)} className="bg-red-500 text-white px-3 rounded">Hapus</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
