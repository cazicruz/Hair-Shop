'use client'
import StyledComponentsRegistry from '@/lib/registry';
import './globals.css'
import { Inter } from "next/font/google";
import StyledComponentsThemeProvider from '@/lib/theme-provider';
import Navbar from '@/components/home/Navbar';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AOSProvider from '@/lib/AOSprovider'
import { Provider } from 'react-redux';
import {store,persistor} from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const inter = Inter({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <StyledComponentsRegistry>
          <StyledComponentsThemeProvider>
              <AntdRegistry>
                <AOSProvider>
                  <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                      <Navbar />
                      {children}
                    </PersistGate>
                  </Provider>
                </AOSProvider>
                </AntdRegistry>
          </StyledComponentsThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}