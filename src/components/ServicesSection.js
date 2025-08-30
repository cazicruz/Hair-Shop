'use client'
import React from 'react'
import {Wrapper}  from '@/components/Testimonials'
import styled from 'styled-components'
import { Carousel } from 'antd';
import Card from '@/components/Card';

//   const contentStyle = {
//   margin: 0,
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

function ServicesSection() {
  const onChange = currentSlide => {
    console.log(currentSlide);
  };
  return (
    <ServicesWrapper>
      <h2>Our Services</h2>
      <p>We offer a variety of hair services to meet your needs.</p>
      <Container>
        <div>
          <Card 
            title="Wigs"
            description="Professional wigs for all occasions."
            // price={29.99}
            // img="/images/haircut.jpg"
          />
        </div>
        <MiddleChild>
          <Card 
            title="Hair Tools"
            description="Expert hair tools for styling and care."
            // price={49.99}
            img="/images/hair essentials.png"
          />
        
          <Card 
            title="Hair Bundles"
            description="Expert hair bundling services."
            // price={49.99}
            img="/images/wav hair.png"
          />
        
          <Card 
            title="Hair Products"
            description="Hair products for all your styling needs."
            // price={49.99}
            img="/images/hair essentials.png"
          />
        </MiddleChild>
        <div>
          <Card 
            title="Hair Styling"
            description="Creative hair styling for any occasion."
            // price={39.99}
            // img="/images/hair-styling.jpg"
          />
        </div>
      </Container>
    </ServicesWrapper>
  )
}

const ServicesWrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 100%;
flex-wrap: wrap;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 10px 10px 0px 10px;
    text-align: left;
    max-width: 100%;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  // gap: 20px;

  first-child {
    width: 200px;
    border: 2px solid ${({ theme }) => theme.colors.border};
  }
    last-child {
    width:200px;
    border: 2px solid ${({ theme }) => theme.colors.border};
  }
  @media (max-width: 768px) {
  display:flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;

    first-child, last-child {
      width: 100%;
      display:block;
    }
      last-child {
      width: 100%;
      display:block;

    }
    
  }
`;

const MiddleChild = styled.div`
  display:flex;
  flex-direction:row;

  @media (max-width: 768px) {
    // flex-direction: column;
    align-items: center;
    width: 100%;
    // gap: 10px;
    border: none;
  }
`;

export default ServicesSection