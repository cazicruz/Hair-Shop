import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import Latest from '@/components/Latest';
import Testimonials from "@/components/Testimonials";
import ServicesSection from "@/components/ServicesSection";
import Faq from '@/components/Faq'
import CardSwiper from '@/components/CardSwiper'
import About from "@/components/About";
import HeroTwo from '@/components/HeroTwo';
import HairCarousel from '@/components/HairCarusel';

export default function Home() {
  return (
    <div className={styles.container} style={{ overflowX: 'hidden' }}>
      {/* <Hero /> */}
      <HeroTwo />
      <Latest />
      <ServicesSection />
      <Testimonials />
      <About />
      {/* <HairCarousel /> */}
      <Faq />
      {/* <CardSwiper /> */}
      <ThemeToggle />
      <Footer />
    </div>
  );
}
