'use client'
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import gsap from 'gsap'
import Typewriter from 'typewriter-effect'
import { useRouter } from 'next/navigation'
import { BsStars } from 'react-icons/bs'

function ImprovedHero() {
  const contentRef = useRef(null)
  const particlesRef = useRef(null)
  const router = useRouter()

  const handleCTAClick = () => {
    router.push('/products')
  }

  useEffect(() => {
    // Animate content entrance
    gsap.from(contentRef.current, {
      y: -50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })

    // Create floating particles animation
    const particles = particlesRef.current?.querySelectorAll('.particle')
    if (particles) {
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: -30,
          x: Math.random() * 50 - 25,
          opacity: 0.8,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
          ease: 'sine.inOut',
        })
      })
    }
  }, [])

  return (
    <HeroWrapper>
      <BackgroundImage>
        <Image 
          src="/images/image1.jpg" 
          alt="Luxury Hair Products" 
          fill 
          priority 
          style={{ objectFit: 'cover' }} 
        />
        <GradientOverlay />
      </BackgroundImage>

      {/* Floating Particles */}
      <ParticlesContainer ref={particlesRef}>
        {[...Array(8)].map((_, i) => (
          <Particle key={i} className="particle" $index={i}>
            <BsStars />
          </Particle>
        ))}
      </ParticlesContainer>

      <Content ref={contentRef}>
        <TagLine>Premium Hair Collection</TagLine>
        <MainHeading>
          <Typewriter
            options={{
              strings: [
                'Unleash Your Crown',
                'Embrace Your Style',
                'Rule Your Look',
                'Shine With Confidence'
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 40,
            }}
          />
        </MainHeading>
        <Subtitle>
          Discover premium hair care and extensions that elevate your natural beauty. 
          Experience luxury, quality, and confidence with every strand.
        </Subtitle>
        <CTAContainer>
          <PrimaryCTA onClick={handleCTAClick}>
            Shop Collection
          </PrimaryCTA>
          <SecondaryCTA href="/#about">
            Learn More
          </SecondaryCTA>
        </CTAContainer>
        
        <TrustBadges>
          <Badge>
            <BadgeIcon>✓</BadgeIcon>
            <BadgeText>100% Human Hair</BadgeText>
          </Badge>
          <Badge>
            <BadgeIcon>★</BadgeIcon>
            <BadgeText>5-Star Rated</BadgeText>
          </Badge>
          <Badge>
            <BadgeIcon>⚡</BadgeIcon>
            <BadgeText>Fast Delivery</BadgeText>
          </Badge>
        </TrustBadges>
      </Content>

      <ScrollIndicator>
        <ScrollText>Scroll to explore</ScrollText>
        <ScrollArrow>↓</ScrollArrow>
      </ScrollIndicator>
    </HeroWrapper>
  )
}

const HeroWrapper = styled.section`
  margin-bottom: 0;
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;

  @media (max-width: 768px) {
    height: 90vh;
  }
`

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 50%, rgba(252, 176, 69, 0.2), transparent 50%),
                radial-gradient(circle at 70% 50%, rgba(253, 29, 29, 0.2), transparent 50%);
    z-index: 1;
  }
`

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(121, 0, 201, 0.6) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 2;
`

const ParticlesContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
`

const Particle = styled.div`
  position: absolute;
  font-size: ${props => 20 + Math.random() * 30}px;
  color: rgba(252, 176, 69, 0.6);
  left: ${props => (props.$index * 12.5)}%;
  top: ${props => 20 + (props.$index * 10)}%;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const Content = styled.div`
  position: relative;
  z-index: 4;
  text-align: center;
  max-width: 900px;
  padding: 0 24px;
`

const TagLine = styled.div`
  font-size: 0.9rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #fcb045;
  margin-bottom: 16px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    letter-spacing: 2px;
  }
`

const MainHeading = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 24px;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    rgba(252, 176, 69, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
  line-height: 1.2;
  
  @keyframes shimmer {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 32px;
  }
`

const CTAContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
`

const PrimaryCTA = styled.button`
  background: linear-gradient(
    135deg,
    rgba(252, 176, 69, 1) 0%,
    rgba(253, 29, 29, 1) 100%
  );
  color: white;
  padding: 16px 48px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(253, 29, 29, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(253, 29, 29, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 14px 36px;
    font-size: 1rem;
  }
`

const SecondaryCTA = styled.a`
  background: transparent;
  color: white;
  padding: 16px 48px;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: white;
  }

  @media (max-width: 768px) {
    padding: 14px 36px;
    font-size: 1rem;
  }
`

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 16px;
  }
`

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`

const BadgeIcon = styled.span`
  font-size: 1.2rem;
  color: #fcb045;
`

const BadgeText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.7;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-10px); }
  }

  @media (max-width: 768px) {
    bottom: 24px;
  }
`

const ScrollText = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`

const ScrollArrow = styled.span`
  font-size: 1.5rem;
`

export default ImprovedHero