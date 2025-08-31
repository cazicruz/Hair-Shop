'use client'
import React from 'react'
import Image from 'next/image';
import styled from 'styled-components';

function About() {
  return (
    <section style={{padding:'2rem 0'}}>
      <AboutContainer>
        <ImageSection>
  <Image src="/images/whiteAndBlack.jpg" alt="About Us"  width={500} height={300} />          <GradientOverlay />
        </ImageSection>
        <TextSection>
          <h3>Our Mission</h3>
          <p>To provide exceptional hair care services that enhance our clients&apos; natural beauty.</p>
          <p>We are a leading hair salon offering a wide range of services to keep your hair looking its best.</p>
        </TextSection>
      </AboutContainer>
    </section>
  )
}
const AboutContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 300px;
  // padding:1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    position: relative;
  }
`;

const ImageSection = styled.div`
  position: relative;
  flex: 1;
  // overflow: hidden;

  @media (max-width: 768px) {
  display:flex;
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 300px;
    }
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  width:auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), #f9f9f9);
  z-index: 2;

  @media (max-width: 768px) {
    left: 0;
    top: 100%;
    bottom: 90%;
    height: 80px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0), #f9f9f9);
  }
`;

const TextSection = styled.div`
  flex: 1;
  padding: 24px;
  color: #000000ff;
  background: #f9f9f9;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2,h3,p{
  color:#000;}

  @media (max-width: 768px) {
    padding: 16px;
    text-align: left;
    position:absolute;
    display:flex;
    background:transparent;
    align-items:center;
    width:200px;
    align-self:flex-end;


  //   h2,h3,p{
  // color:#fff;}
  }
`;

export default About;
