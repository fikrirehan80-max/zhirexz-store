'use client'
import { useState, useEffect } from "react";

const DATA_DEFAULT = {
  vps: [
    { id: 1, nama: "VPS NAT 1GB", harga: 8000, deskripsi: "RAM 1GB - 1 Core - 10GB SSD" },
    { id: 2, nama: "VPS NAT 2GB", harga: 15000, deskripsi: "RAM 2GB - 1 Core - 20GB SSD" },
    { id: 3, nama: "VPS NAT 4GB", harga: 28000, deskripsi: "RAM 4GB - 2 Core - 40GB SSD" },
  ],
  panel: [
    { id: 4, nama: "PANEL 1GB", harga: 2000, deskripsi: "Panel Pterodactyl 1GB Unlimited" },
    { id: 5, nama: "PANEL 2GB", harga: 4000, deskripsi: "Panel Pterodactyl 2GB Unlimited" },
    { id: 6, nama: "PANEL 4GB", harga: 8000, deskripsi: "Panel Pterodactyl 4GB Unlimited" },
    { id: 7, nama: "PANEL 8GB", harga: 15000, deskripsi: "Panel Pterodactyl 8GB Unlimited" },
    { id: 8, nama: "ADMIN PANEL", harga: 10000, deskripsi: "Akses Admin Pterodactyl Full" },
  ],
  script: [
    { id: 9, nama: "SC MECHABOT", harga: 15000, deskripsi: "Script Bot WhatsApp MechaBot Full Fitur" },
    { id: 10, nama: "SC REKBER", harga: 25000, deskripsi: "Script Website Rekber Auto Siap Pakai" },
    { id: 11, nama: "SC AUTO ORDER", harga: 20000, deskripsi: "Script Website Auto Order QRIS" },
  ],
  app: [
    { id: 12, nama: "NETFLIX 1 BULAN", harga: 25000, deskripsi: "Akun Premium 1 Bulan Garansi" },
    { id: 13, nama: "SPOTIFY 1 BULAN", harga: 15000, deskripsi: "Akun Premium 1 Bulan" },
    { id: 14, nama: "CANVA PRO 1 BULAN", harga: 10000, deskripsi: "Invite Link Canva Pro" },
  ]
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [produk, setProduk] = useState<any>(null);
  const [wa, setWa] = useState("");
  const [user, setUser] = useState("");
  const [bukti, setBukti] = useState("");
  const [KATEGORI, setKATEGORI] = useState<any>(DATA_DEFAULT);

  useEffect(() => {
    const data = localStorage.getItem('products');
    if(data) setKATEGORI(JSON.parse(data));
    else localStorage.setItem('products', JSON.stringify(DATA_DEFAULT));
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 p-3 shadow-lg">
        <div className="flex justify-center gap-2 flex-wrap">
          {['vps','panel','script','app'].map(cat => (
            <button key={cat} onClick={() => scrollTo(cat)}
              className="bg-white/20 text-white px-4 py-2 rounded-full font-bold hover:bg-white/30">
              {cat === 'vps' && 'VPS NAT'}
              {cat === 'panel' && 'PANEL'}
              {cat === 'script' && 'SCRIPT'}
              {cat === 'app' && 'APP PREMIUM'}
            </button>
          ))}
          <button onClick={() => window.location.href='/cek'}
            className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
            CEK STATUS
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">ZHIREXZ OFFICIAL STORE</h1>
        <p className="text-yellow-600">Layanan Otomatis 24 Jam</p>
      </div>

      {/* KATALOG */}
      {step === 1 && (
        <div className="p-6">
          {Object.entries(KATEGORI).map(([key, items]: any) => (
            <div key={key} id={key} className="mb-10">
              <h2 className="text-2xl font-bold text-center mb-4 text-purple-600">
                {key === 'vps' && 'VPS NAT'}
                {key === 'panel' && 'PANEL PTERODACTYL'}
                {key === 'script' && 'SCRIPT / SC'}
                {key === 'app' && 'APP PREMIUM'}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((p: any) => (
                  <div key={p.id} className="border-2 border-yellow-400 rounded-xl p-4 shadow-lg hover:scale-105 transition">
                    <h3 className="font-bold text-lg">{p.nama}</h3>
                    <p className="text-sm text-gray-600">{p.deskripsi}</p>
                    <p className="font-bold text-yellow-600 mt-1">Rp{p.harga.toLocaleString()}</p>
                    <button onClick={() => {setProduk(p); setStep(2)}}
                      className="mt-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg font-bold">
                      Beli Sekarang
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CHECKOUT */}
      {step === 2 && (
        <div className="p-6 max-w-md mx-auto">
          <h2 className="text-xl font-bold">Checkout: {produk.nama}</h2>
          <p className="text-lg font-bold text-yellow-600">Total: Rp{produk.harga.toLocaleString()}</p>
          <input placeholder="Nomor WA" value={wa} onChange={e => setWa(e.target.value)} className="border p-2 w-full mt-2 rounded"/>
          <input placeholder="Username/Email" value={user} onChange={e => setUser(e.target.value)} className="border p-2 w-full mt-2 rounded"/>
          <button onClick={() => setStep(3)}
            className="mt-3 w-full bg-yellow-400 text-black font-bold p-2 rounded-lg">
            Lanjut Bayar
          </button>
        </div>
      )}

      {/* PEMBAYARAN QRIS */}
      {step === 3 && (
        <div className="p-6 text-center max-w-md mx-auto">
          <h2 className="text-xl font-bold">Scan QRIS untuk Bayar</h2>
          <p className="text-lg font-bold text-yellow-600">Total: Rp{produk.harga.toLocaleString()}</p>
          <img src="/qris.jpg" className="w-64 mx-auto my-4 border-4 border-yellow-400 rounded-lg shadow-lg"/>

          <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if(file){ const reader = new FileReader(); reader.onload = () => setBukti(reader.result as string); reader.readAsDataURL(file); }
            }}
            className="mt-3 w-full border p-2 rounded"
          />
          {bukti && <img src={bukti} className="w-40 mx-auto mt-3 border rounded"/>}

          <button onClick={() => {
              if(!wa ||!user ||!bukti) return alert("Isi semua data + upload bukti dulu!");
              const newOrder = { id: Date.now(), produk: produk.nama, harga: produk.harga, wa, user, bukti, status: "PENDING", tanggal: new Date().toLocaleString() }
              const old = JSON.parse(localStorage.getItem('orders') || '[]');
              localStorage.setItem('orders', JSON.stringify([...old, newOrder]));
              alert("Order terkirim! Admin akan cek bukti kamu dalam 5 menit")
              setStep(1); setWa(""); setUser(""); setBukti("");
            }}
            className="mt-3 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold p-3 rounded-lg">
            Kirim Bukti Pembayaran
          </button>
        </div>
      )}
    </main>
  )
      }
