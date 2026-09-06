export default function Home() {
  return (
    <main style={{minHeight:'100vh', background:'#000', color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px'}}>
      <h1 style={{fontSize:'40px', fontWeight:'bold', marginBottom:'8px'}}>ZHIREXZ STORE 🔥</h1>
      <p style={{color:'#aaa', marginBottom:'32px'}}>Order via QRIS</p>

      <div style={{background:'#18181b', padding:'24px', borderRadius:'16px', maxWidth:'400px', width:'100%', textAlign:'center'}}>
        <h2 style={{fontSize:'24px', fontWeight:'bold', marginBottom:'16px'}}>Scan QRIS untuk Bayar</h2>
        <img 
          src="/qris.jpg" 
          alt="QRIS" 
          style={{width:'256px', margin:'0 auto', border:'4px solid #facc15', borderRadius:'8px'}}
        />
        <p style={{fontSize:'12px', color:'#aaa', marginTop:'12px'}}>
          Setelah bayar, kirim bukti ke WA ya
        </p>
      </div>

      <p style={{marginTop:'32px', fontSize:'12px', color:'#555'}}>© 2026 Zhirexz Store</p>
    </main>
  )
                  }
