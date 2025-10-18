import StyledComponentsRegistry from '@/lib/registry';
import '../globals.css'
import { Inter } from "next/font/google";
import StyledComponentsThemeProvider from '@/lib/theme-provider';
import Navbar from '@/components/home/Navbar';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AOSProvider from '@/lib/AOSprovider'
import { Provider } from 'react-redux';
import {store,persistor} from '../../redux/store';
import ReduxProvider from '@/components/UI/ReduxProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css'
import CartSync from '@/components/cartSync'
import ReactQueryProvider from '@/components/ReactQueryProvider';
import AuthProvider from '@/context/AuthProvider';


const inter = Inter({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <StyledComponentsThemeProvider>
              <AntdRegistry>
                <AOSProvider>
                    <ReduxProvider>
                      <ReactQueryProvider>
                        <AuthProvider>
                          <CartSync />
                          <Navbar />
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
                        </AuthProvider>
                      </ReactQueryProvider>
                    </ReduxProvider>
                </AOSProvider>
                </AntdRegistry>
          </StyledComponentsThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}