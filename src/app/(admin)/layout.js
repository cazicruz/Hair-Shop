import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning>
      <body>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        </body>
    </html>
  )
}