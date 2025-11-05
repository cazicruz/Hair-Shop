"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BirthdayPopup() {
  const [show, setShow] = useState(false)

  // 🎯 Set your date
  const birthdayMonth = 11 // November
  const birthdayDay = 6  // 6th

  useEffect(() => {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()

    if (month === birthdayMonth && day === birthdayDay) {
      setShow(true)
    }
  }, [])

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="popup-overlay"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <Confetti />
        <Balloons />

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "white",
            padding: "35px 30px",
            borderRadius: "18px",
            textAlign: "center",
            width: "90%",
            maxWidth: "550px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
          }}
        >
          <h2 style={{ fontSize: "1.8rem" }}>🎉 Happy Birthday Janai!!! 🎂</h2>
          <p style={{ color: "#555", margin: "10px 0 20px" }}>
            Wishing you beauty, joy and endless glow-ups!
          </p>
          <button 
            onClick={() => setShow(false)}
            style={{
              padding: "10px 24px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "30px",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Thank you 💕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* 🎈 Floating Balloons */
function Balloons() {
  const balloons = new Array(6).fill(0)
  return balloons.map((_, i) => (
    <motion.div
      key={i}
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: -400, opacity: 1 }}
      transition={{ duration: 6, delay: i * 0.4, repeat: Infinity }}
      style={{
        position: "absolute",
        left: `${10 + i * 15}%`,
        width: "20px",
        height: "30px",
        background: ["#ff6b6b","#ffca3a","#8ac926","#1982c4","#6a4c93"][i % 5],
        borderRadius: "50% 50% 45% 45%",
        transform: "translateX(-50%)",
      }}
    />
  ))
}

/* 🎊 Light Confetti Sprinkles */
function Confetti() {
  const pieces = new Array(30).fill(0)
  return pieces.map((_, i) => (
    <motion.div
      key={i}
      initial={{ y: -100, x: Math.random() * window.innerWidth }}
      animate={{ y: window.innerHeight + 100 }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
      style={{
        position: "fixed",
        width: "6px",
        height: "10px",
        borderRadius: "2px",
        background: [`#fc5c7d`, `#6a82fb`, `#f6d860`, `#ff8c42`][i % 4]
      }}
    />
  ))
}
