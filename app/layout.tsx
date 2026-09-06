export const metadata = {
  title: 'Zhirexz Store',
  description: 'Toko Online Zhirexz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
