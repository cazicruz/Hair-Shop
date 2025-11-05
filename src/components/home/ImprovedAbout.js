'use client'
import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { motion } from 'framer-motion'

function ImprovedAbout() {
  return (
    <section id='about'>
      <AboutContainer>
        <ImageSection 
          as={motion.div}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ImageWrapper>
            <Image 
              src="/images/whiteAndBlack.jpg" 
              alt="About B-Classy Hairs"  
              width={600} 
              height={400}
              style={{ objectFit: 'cover' }}
            />
            <ImageOverlay />
          </ImageWrapper>
        </ImageSection>

        <TextSection
          as={motion.div}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ContentWrapper>
            <TagLine>About Us</TagLine>
            <Title>Empowering Beauty, One Strand at a Time</Title>
            
            <MissionBox>
              <MissionIcon>✨</MissionIcon>
              <MissionContent>
                <MissionTitle>Our Mission</MissionTitle>
                <MissionText>
                  To provide exceptional hair care services and premium products that 
                  enhance our clients' natural beauty and boost their confidence.
                </MissionText>
              </MissionContent>
            </MissionBox>

            <Description>
              We are a leading hair salon offering a wide range of services to keep 
              your hair looking its best. From premium wigs and bundles to professional 
              styling tools and care products, we're dedicated to helping you achieve 
              the look you've always dreamed of.
            </Description>

            <StatsGrid>
              <StatItem>
                <StatNumber>5+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>1000+</StatNumber>
                <StatLabel>Happy Clients</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>100%</StatNumber>
                <StatLabel>Quality Products</StatLabel>
              </StatItem>
            </StatsGrid>

            <CTAButton href="/products">
              Explore Our Collection
            </CTAButton>
          </ContentWrapper>
        </TextSection>
      </AboutContainer>
    </section>
  )
}

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
  background: linear-gradient(135deg, #fef9f8 0%, #fff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(252, 176, 69, 0.1), transparent);
    border-radius: 50%;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`

const ImageSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media (max-width: 968px) {
    padding: 40px 20px 20px;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transform: rotate(-2deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg) scale(1.02);
  }

  img {
    border-radius: 20px;
  }

  @media (max-width: 968px) {
    height: 350px;
    max-width: 100%;
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(252, 176, 69, 0.2) 0%,
    rgba(253, 29, 29, 0.2) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`

const TextSection = styled.div`
  display: flex;
  align-items: center;
  padding: 60px 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {
    padding: 40px 20px 60px;
  }
`

const ContentWrapper = styled.div`
  max-width: 550px;
`

const TagLine = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #fc5c7d;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 12px;
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #2d3748;
  line-height: 1.2;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const MissionBox = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 16px;
  border-left: 4px solid #667eea;
  margin-bottom: 24px;
`

const MissionIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
`

const MissionContent = styled.div``

const MissionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px 0;
`

const MissionText = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
`

const Description = styled.p`
  font-size: 1.05rem;
  color: #718096;
  line-height: 1.8;
  margin-bottom: 32px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
`

const StatItem = styled.div`
  text-align: center;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #718096;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

const CTAButton = styled.a`
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`

export default ImprovedAbout