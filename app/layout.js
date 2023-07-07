import './globals.css'
import localFont from 'next/font/local'

const Magda = localFont({src: '../public/fonts/Magda.otf'})

export const metadata = {
  title: 'Egg',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Magda.className}>{children}</body>
    </html>
  )
}
