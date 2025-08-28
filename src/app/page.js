import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import Latest from '@/components/Latest';

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <Latest />
      <ThemeToggle />
      <h1 className={styles.title}>Welcome to Hair Shop</h1>
      <Footer />
    </div>
  );
}
