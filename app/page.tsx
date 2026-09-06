export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-2">ZHIREXZ STORE 🔥</h1>
      <p className="text-gray-400 mb-8">Order via QRIS</p>

      <div className="bg-zinc-900 p-6 rounded-2xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Scan QRIS untuk Bayar</h2>
        <img 
          src="/qris.jpg" 
          alt="QRIS" 
          className="w-64 mx-auto border-4 border-yellow-400 rounded-lg"
        />
        <p className="text-sm text-gray-400 mt-3">
          Setelah bayar, kirim bukti ke WA ya
        </p>
      </div>

      <p className="mt-8 text-sm text-gray-500">© 2026 Zhirexz Store</p>
    </main>
  )
}      
