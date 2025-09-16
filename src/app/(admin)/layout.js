import { Inter } from "next/font/google";
const inter = Inter({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning>
      <body>
        {children}
        </body>
    </html>
  )
}