export const dynamic = 'force-dynamic';

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

export default function AdminLayout({ children }) {
  return (
    <>
        {children}
    </>
  )
}