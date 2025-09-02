'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import {HeaderText} from '@/components/Latest'
import Image from 'next/image'

const serviceList = [
  { title: "Wigs", description: "Professional wigs for all occasions.", img: "/images/bundle.png" },
  { title: "Hair Tools", description: "Expert hair tools for styling and care.", img: "/images/hair-tools.jpg" },
  { title: "Hair Bundles", description: "Expert hair bundling services.", img: "/images/wav hair.png" },
  { title: "Hair Products", description: "Hair products for all your styling needs.", img: "/images/hair essentials.png" },
  { title: "Hair Styling", description: "Creative hair styling for any occasion.", img: "/images/wig1.png" },
]


//   const contentStyle = {
//   margin: 0,
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

function ServicesSection({ services=serviceList, title = "Our Services", subtitle = "We offer a variety of hair services to meet your needs." }) {
  return (
    <ServicesWrapper>
      <HeaderText>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </HeaderText>
      <Container>
        {services.map((service, index) => (
          <ServiceCard>
            <Image 
            src={service.img}
            width={100}
            height={100} />
            <div>
              <h3>{service.title}</h3>
              <p><strong>{service.description}</strong></p>
            </div>
          </ServiceCard>
        ))}
      </Container>
    </ServicesWrapper>
  )
}

const ServicesWrapper = styled.section`
padding:2rem 2rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 100%;
background: linear-gradient(167deg,rgba(252, 176, 69, 1) 0%, rgba(253, 29, 29, 1) 51%, rgba(252, 176, 69, 1) 15%);

  // @media (max-width: 768px) {
  //   align-items: flex-start;
  //   padding: 10px 10px 0px 10px;
  //   text-align: left;
  //   max-width: 100%;
  // }
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding:0 40px;
  gap:3rem; 
`;

const ServiceCard= styled.div`
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
padding:1rem;
background:#f8f8f8;
max-width:15rem;
height:10rem;
border-radius: 8px;


div{
display:flex;
align-self:center;
flex-direction:column;
padding:1rem;
}
img{
min-width:100px;
// padding:10px;
// object-fit:contain;
border-radius: 8px;
}
h3,p{
color: #4b4a4aff;

}

`

export default ServicesSection