'use client'
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { BsStars } from 'react-icons/bs'

const serviceList = [
  { 
    title: "Premium Wigs", 
    description: "Luxury wigs for every occasion and style.", 
    img: "/images/bundle.png",
    color: "#ff6b9d"
  },
  { 
    title: "Hair Tools", 
    description: "Professional styling tools for salon results.", 
    img: "/images/hair-tools.jpg",
    color: "#c471ed"
  },
  { 
    title: "Hair Bundles", 
    description: "100% virgin human hair bundles.", 
    img: "/images/wav hair.png",
    color: "#12c2e9"
  },
  { 
    title: "Hair Products", 
    description: "Premium care products for healthy hair.", 
    img: "/images/hair essentials.png",
    color: "#f64f59"
  },
  { 
    title: "Custom Styling", 
    description: "Personalized styling for your unique look.", 
    img: "/images/wig1.png",
    color: "#feca57"
  },
]

function ImprovedServices({ 
  services = serviceList, 
  title = "Our Premium Collection", 
  subtitle = "Explore our curated selection of premium hair products and services" 
}) {
  const router = useRouter()

  const handleCTAClick = () => {
    router.push('/products')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <ServicesWrapper>
      <HeaderSection data-aos="fade-up">
        <StarIcon><BsStars /></StarIcon>
        <MainTitle>{title}</MainTitle>
        <Subtitle>{subtitle}</Subtitle>
      </HeaderSection>

      <Container
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            as={motion.div}
            variants={itemVariants}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            $color={service.color}
          >
            <ImageContainer>
              <StyledImage 
                alt={service.title}
                src={service.img}
                width={120}
                height={120}
              />
              <ImageOverlay $color={service.color} />
            </ImageContainer>
            <CardContent>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ExploreLink>
                Explore →
              </ExploreLink>
            </CardContent>
            <CardGlow $color={service.color} />
          </ServiceCard>
        ))}
      </Container>

      <CTASection data-aos="fade-up">
        <CTAButton onClick={handleCTAClick}>
          <span>View Full Collection</span>
          <ButtonGradient />
        </CTAButton>
      </CTASection>
    </ServicesWrapper>
  )
}

const ServicesWrapper = styled.section`
  padding: 80px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #fef5f8 50%,
    #ffffff 100%
  );
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(252, 176, 69, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 64px;
  max-width: 700px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`

const StarIcon = styled.div`
  font-size: 2.5rem;
  color: #fcb045;
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`

const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1200px;
  width: 100%;
  padding: 0 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const ServiceCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 16px;
  overflow: hidden;
`

const StyledImage = styled(Image)`
  border-radius: 16px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ServiceCard}:hover & {
    transform: scale(1.1);
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    ${props => props.$color}33 0%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ServiceCard}:hover & {
    opacity: 1;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
`

const ServiceTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
`

const ServiceDescription = styled.p`
  font-size: 0.95rem;
  color: #718096;
  line-height: 1.6;
  margin: 0;
`

const ExploreLink = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #fc5c7d;
  margin-top: 8px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;

  ${ServiceCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`

const CardGlow = styled.div`
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    135deg,
    ${props => props.$color},
    transparent
  );
  border-radius: 20px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;

  ${ServiceCard}:hover & {
    opacity: 0.2;
  }
`

const CTASection = styled.div`
  margin-top: 64px;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 48px;
  }
`

const CTAButton = styled.button`
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 18px 48px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);

  span {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 16px 40px;
    font-size: 1rem;
  }
`

const ButtonGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CTAButton}:hover & {
    opacity: 1;
  }
`

export default ImprovedServices