'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import {HeaderText} from '@/components/home/Latest'
import Image from 'next/image'
import {CTAButton} from '@/components/home/HeroTwo'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'
import {useIsMobile} from '@/hooks/IsMobile'

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

const ServiceSlide = ({ services }) => {
  return (
    <>
    <StyledSwiper
    // style={{ width: '100%',height:'100%'}}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      // navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {services.map((service, index) => (
        <SwiperSlide key={index}>
          <ServiceCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Image src={service.img} width={100} height={100} alt={service.title}
/>
            <div>
              <h4>{service.title}</h4>
              <p><strong>{service.description}</strong></p>
            </div>
          </ServiceCard>
        </SwiperSlide>

      ))}
    </StyledSwiper>
    </>
  );
};

const StyledSwiper = styled(Swiper)`
  width: 100%;
  max-width: 900px;  /* optional: center the whole carousel */
  margin: 0 auto;    /* centers the Swiper in its parent */
  
  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;


function ServicesSection({ services=serviceList, title = "Our Services", subtitle = "We offer a variety of hair services to meet your needs." }) {
  const isMobile = useIsMobile();

  return (
    <ServicesWrapper>
      <HeaderText style={{color:'#f8f8f8'}}>
        <h2 style={{color:'#f8f8f8'}}>{title}</h2>
        <p style={{color:'#f8f8f8'}}>{subtitle}</p>
      </HeaderText>
      <Container>
          {isMobile?(
            <ServiceSlide services={services} />
          )
          :(services.map((service, index) => (
            <ServiceCard 
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Image 
              alt={service.title}
              src={service.img}
              width={100}
              height={100} />
              <div>
                <h4>{service.title}</h4>
                <p><strong>{service.description}</strong></p>
              </div>
            </ServiceCard>
          )))}
      </Container>
      <HeaderText>
      <CTAButton style={{margin:'30px'}}>Browse Collection</CTAButton>

      </HeaderText>
    </ServicesWrapper>
  )
}

const ServicesWrapper = styled.section`
padding:1rem 2rem;
position:relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
background: linear-gradient(167deg,rgba(252, 176, 69, 1) 0%, rgba(253, 29, 29, 1) 51%, rgba(252, 176, 69, 1) 15%);

  @media (max-width: 768px) {
    padding:1rem 0px;
    display: block;
    margin:0;
  }

`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self:center;
  flex-wrap: wrap;
  padding:0 0px;
  gap:2rem;
  
  @media (max-width: 768px) {

  padding:0 0px;
  margin:0;
  gap:10px;
  align-items: flex-start;
  flex-wrap: wrap;
  width:auto;


}
  
`;



const ServiceCard= styled(motion.div)`
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
padding:0.5rem 0 0.2rem 0.5rem;
}
img{
min-width:100px;
// padding:10px;
// object-fit:contain;
border-radius: 8px;
}
h4,p{
color: #4b4a4aff;
}

// @media (max-width: 768px) {

// padding:4px;
// margin:0;
// height:110px;

// img{
// min-width:60px;
// // padding:10px;
// // object-fit:contain;
// border-radius: 8px;
// }
// h4{
// font-size:${({theme})=>theme.fontSize.small}
// }
// p{
// font-size:${({theme})=>theme.fontSize.xsmall}
// }
// div{
// display:flex;
// align-self:center;
// flex-direction:column;
// padding:0.5rem 0 0.2rem 0.5rem;
// max-width:100px;
// }
// }
`

export default ServicesSection