// app/(auth)/layout.tsx or layout.js
import React from "react";
import '../globals.css';
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import '../toast.css'
const inter = Inter({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

export default function AuthLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body
        style={{ margin: 0, padding: 0, fontFamily: "'Roboto', sans-serif",
        }}
      >
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start ",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #e0c3fc 100%)"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: "0.2rem 1rem",
            minWidth: "350px",
            maxWidth: "400px",
            width: "100%"
          }}>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <h1 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: "2rem",
                color: "#7c3aed",
                background:" -webkit-linear-gradient(258deg,rgba(121, 0, 201, 1) 0%, rgba(253, 29, 29, 1) 28%, rgba(252, 176, 69, 1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                marginBottom: "0.5rem"
              }}>
                B-classy
              </h1>
              <p style={{ color: "#6b7280", fontSize: "1rem" }}>
                Welcome! Please login or sign up to continue.
              </p>
            </div>
            <ReactQueryProvider>
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
            {children}
            </ReactQueryProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
