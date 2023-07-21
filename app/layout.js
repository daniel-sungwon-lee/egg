import './globals.css'
import localFont from 'next/font/local'

const Magda = localFont({src: '../public/fonts/Magda.otf'})

export const metadata = {
  title: 'Egg',
  description: 'Chicken and Egg tracker',
  openGraph: {
    title: 'Egg',
    description: 'Chicken and Egg tracker',
    url: 'https://eggggg.netlify.app/',
    siteName: 'Egg',
    images: [
      {
        url:'/images/egg.svg',
        width: 512,
        height: 512
      }
    ],
    type: 'website'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Magda.className}>{children}</body>
    </html>
  )
}
