'use client'
import React,{useRef,useEffect} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import gsap from 'gsap'
import Typewriter from 'typewriter-effect'

function HeroTwo() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.from(contentRef.current, {
      y: -50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
  }, [])
  return (
    <HeroWrapper>
      <BackgroundImage>
        <Image src="/images/image1.jpg" alt="Luxury Hair Products" fill priority   style={{ objectFit: 'cover' }} />
        <Overlay />
      </BackgroundImage>
      <Content ref={contentRef}>
        <h1>
          <Typewriter
            options={{
              strings: ['Unleash Your Crown', 'Embrace Your Style', 'Rule Your Look'],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 40,
            }}
          />
        </h1>
        <p>Discover premium hair care and extensions that elevate your natural beauty.</p>
        <CTAButton>Shop Now</CTAButton>
      </Content>
    </HeroWrapper>
  )
}

const HeroWrapper = styled.section`
    margin-bottom: 2rem;
  position: relative;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;

  @media (max-width: 768px) {
  height: 60vh;
}
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  img {
    object-fit: contain;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3));
  z-index: 2;
`;

const Content = styled.div`
  color: #fff;
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 600px;
  padding: 0 20px;
  @keyframes shimmer {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
    }

  h1 {
    
    font-size: 3rem;
    margin-bottom: 16px;
    font-weight: 700;
      color: gold;
      font-size: 72px;
  background: -webkit-linear-gradient(258deg,rgba(121, 0, 201, 1) 0%, rgba(253, 29, 29, 1) 28%, rgba(252, 176, 69, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;

  

  }

  p {
    font-size: 1.2rem;
    margin-bottom: 24px;
      color: #fff;

  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const CTAButton = styled.button`
background: linear-gradient(42deg,rgba(252, 176, 69, 1) 0%, rgba(253, 29, 29, 1) 77%, rgba(121, 0, 201, 1) 100%);
color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e055a1;
  }
`;

export default HeroTwo;
