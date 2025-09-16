import React from "react";
import Image from "next/image";
import styles from "../page.module.css";
import Footer from "@/components/home/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/home/Hero";
import Latest from '@/components/home/Latest';
import Testimonials from "@/components/home/Testimonials";
import ServicesSection from "@/components/home/ServicesSection";
import Faq from '@/components/home/Faq'
import About from "@/components/home/About";
import HeroTwo from '@/components/home/HeroTwo';

export default function Home() {
  return (
    <div className={styles.container} style={{ overflowX: 'hidden' }}>
      {/* <Hero /> */}
      {/* <Navbar /> */}
      <HeroTwo />
      <Latest />
      <ServicesSection />
      <Testimonials />
      <About />
      <Faq />
      <ThemeToggle />
      <Footer />
    </div>
  );
}
