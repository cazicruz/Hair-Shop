'use client'
import React from 'react'
import styled from 'styled-components'
import { FaMapMarkerAlt, FaStore, FaPhone, FaInstagram, FaFacebook, FaWhatsapp, FaHeart } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'
import { RiTiktokLine } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'

function ImprovedFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <FooterWrapper id='contact'>
      <FooterContainer>
        {/* Brand Section */}
        <FooterSection data-aos="fade-up">
          <BrandContainer>
            <LogoWrapper>
              <Image 
                src="/favicon.png" 
                alt="B-Classy Hair Shop Logo" 
                width={60} 
                height={60}
                style={{ borderRadius: '12px' }}
              />
              <BrandName>B-Classy Hairs</BrandName>
            </LogoWrapper>
            <BrandTagline>
              Empowering your beauty with premium hair products and exceptional service.
            </BrandTagline>
            <SocialLinks>
              <SocialLink 
                href="https://www.instagram.com/bclassy_hairs?igsh=b21uZ25rYXoxaGJ0" 
                target="_blank" 
                rel="noopener noreferrer"
                $color="#E1306C"
              >
                <FaInstagram />
              </SocialLink>
              <SocialLink 
                href="https://www.tiktok.com/@bclassy_hairs?_t=ZS-90ja5wFewYp&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                $color="#000000"
              >
                <RiTiktokLine />
              </SocialLink>
              <SocialLink 
                href="https://www.facebook.com/share/16X5mzpkSk/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                $color="#1877F2"
              >
                <FaFacebook />
              </SocialLink>
              <SocialLink 
                href="https://wa.me/+2348125617018" 
                target="_blank" 
                rel="noopener noreferrer"
                $color="#25D366"
              >
                <FaWhatsapp />
              </SocialLink>
            </SocialLinks>
          </BrandContainer>
        </FooterSection>

        {/* Store Info */}
        <FooterSection data-aos="fade-up" data-aos-delay="100">
          <SectionTitle>
            <FaStore /> Store Information
          </SectionTitle>
          <InfoList>
            <InfoItem>
              <InfoIcon><FaMapMarkerAlt /></InfoIcon>
              <InfoContent>
                <InfoLabel>Address</InfoLabel>
                <InfoText>NTA, Ozouba Road, Port Harcourt, Rivers State</InfoText>
              </InfoContent>
            </InfoItem>
            <InfoItem>
              <InfoIcon><FaPhone /></InfoIcon>
              <InfoContent>
                <InfoLabel>Phone</InfoLabel>
                <InfoText>+234 812 561 7018</InfoText>
              </InfoContent>
            </InfoItem>
            <InfoItem>
              <InfoIcon><MdEmail /></InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoText>info@bclassyhairs.com</InfoText>
              </InfoContent>
            </InfoItem>
          </InfoList>
        </FooterSection>

        {/* Opening Hours */}
        <FooterSection data-aos="fade-up" data-aos-delay="200">
          <SectionTitle>Opening Hours</SectionTitle>
          <HoursList>
            <HoursItem>
              <Day>Monday - Saturday</Day>
              <Time>10:00 AM - 5:00 PM</Time>
            </HoursItem>
            <HoursItem $closed>
              <Day>Sunday</Day>
              <Time>Closed</Time>
            </HoursItem>
          </HoursList>
          <CallToAction>
            <CTAButton href="tel:+2348125617018">
              <FaPhone /> Call Us Now
            </CTAButton>
          </CallToAction>
        </FooterSection>

        {/* Quick Links */}
        <FooterSection data-aos="fade-up" data-aos-delay="300">
          <SectionTitle>Quick Links</SectionTitle>
          <LinksList>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/faq">FAQ's</FooterLink>
          </LinksList>
        </FooterSection>
      </FooterContainer>

      <Divider />

      {/* Bottom Bar */}
      <BottomBar>
        <Copyright>
          <CopyrightText>
            © {currentYear} <strong>B-Classy Hairs</strong>. All rights reserved.
          </CopyrightText>
          <LoveText>
            This website and all its content are the exclusive property of B-Classy Hairs...
            {/* Made with <HeartIcon><FaHeart /></HeartIcon> in Nigeria */}
          </LoveText>
        </Copyright>
        <Developer>
          <DeveloperText>
            Designed & Developed by{' '}
            <DeveloperLink href="https://cazicruz.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
              <strong>DavDev</strong>
            </DeveloperLink>
          </DeveloperText>
        </Developer>
      </BottomBar>

      {/* Decorative Elements */}
      <DecorativeCircle1 />
      <DecorativeCircle2 />
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 24px 24px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 16px 24px;
  }
`

const FooterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 48px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`

const BrandName = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  color: white;
`

const BrandTagline = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`

const SocialLink = styled.a`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  color: white;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: ${props => props.$color};
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`

const SectionTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
`

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InfoItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  font-size: 1.2rem;
  flex-shrink: 0;
`

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const InfoLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.8);
`

const InfoText = styled.span`
  font-size: 1rem;
  line-height: 1.5;
  color: white;
`

const HoursList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const HoursItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border-left: 4px solid ${props => props.$closed ? '#f5576c' : '#4ade80'};
`

const Day = styled.span`
  font-weight: 600;
`

const Time = styled.span`
  color: rgba(255, 255, 255, 0.9);
`

const CallToAction = styled.div`
  margin-top: 8px;
`

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  color: #667eea;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    background: #f0f0f0;
  }
`

const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding: 8px 0;
  display: inline-block;
  position: relative;

  &::before {
    content: '→';
    position: absolute;
    left: -20px;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover {
    color: white;
    padding-left: 20px;

    &::before {
      opacity: 1;
      left: 0;
    }
  }
`

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 48px 0 24px;
`

const BottomBar = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CopyrightText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
`

const LoveText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const HeartIcon = styled.span`
  color: #ff6b9d;
  animation: heartbeat 1.5s ease-in-out infinite;

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`

const Developer = styled.div``

const DeveloperText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
`

const DeveloperLink = styled.a`
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #feca57;
  }
`

const DecorativeCircle1 = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
  top: -100px;
  right: -100px;
  pointer-events: none;
`

const DecorativeCircle2 = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent);
  bottom: -150px;
  left: -150px;
  pointer-events: none;
`

export default ImprovedFooter