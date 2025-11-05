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
import ImprovedHero from '@/components/home/ImprovedHero'
import ImprovedAbout from "@/components/home/ImprovedAbout";
import ImprovedServices from "@/components/home/ImprovedServices";
import ImprovedTestimonials from "@/components/home/ImprovedTestimonials";
import ImprovedLatest from "@/components/home/ImprovedLatest";
import ImprovedFooter from "@/components/home/ImprovedFooter"
import ImprovedFaq from "@/components/home/ImprovedFaq"

export default function Home() {
  return (
    <div className={styles.container} style={{ overflow: 'hidden' }}>
      {/* <Hero /> */}
      {/* <Navbar /> */}
      {/* <HeroTwo /> */}
      <ImprovedHero />
      {/* <Latest /> */}
      <ImprovedLatest />
      <ImprovedServices />
      <ImprovedTestimonials />
      <ImprovedAbout />
      <ImprovedFaq />
      <ImprovedFooter />
      {/* <ServicesSection /> */}
      {/* <Testimonials /> */}
      {/* <About /> */}
      {/* <Faq /> */}
      {/* <ThemeToggle /> */}
      {/* <Footer /> */}
    </div>
  );
}
