import StyledComponentsRegistry from '@/lib/registry';
import './globals.css'
import { Inter } from '@next/font/google';
import StyledComponentsThemeProvider from '@/lib/theme-provider';
import Navbar from '@/components/Navbar';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AOSProvider from '@/lib/AOSprovider'


const inter = Inter({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <StyledComponentsRegistry>
          <StyledComponentsThemeProvider>
            <Navbar />
              <AntdRegistry>
                <AOSProvider>
                  {children}
                </AOSProvider>
                </AntdRegistry>
          </StyledComponentsThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}