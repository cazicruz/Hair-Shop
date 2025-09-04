'use client'
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {HeaderText} from '@/components/home/Latest'



// import  ImageSlider from '@/components/ImageSlider'

const testimonies=[
    { quote: "This is the best hair shop ever!", author: "Happy Customer", image:'/images/wav hair.png' },
    { quote: "I love the variety of products available.", author: "Satisfied Client", image:'/images/lux hair.png' },
    { quote: "The staff is so friendly and helpful!", author: "Loyal Customer", image:'/images/hair essentials.png' },  
    { quote: "The staff is so friendly and helpful!", author: "Loyal Customer", image:'/images/hair essentials.png' },  
]

const TestimonySlide = ({ testimonies }) => {
  return (
    <Swiper
    style={{height:'150px'}}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {testimonies.map((testimony, index) => (
        <SwiperSlide key={index}>
          <TestimonyCard>
            <Image
              src={testimony.image}
              alt={`${testimony.author}'s testimony`}
              width={100}
              height={100}
            />
            <div>
              <p>
                {testimony.quote}
                <br />
                <strong>- {testimony.author}</strong>
              </p>
            </div>
          </TestimonyCard>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


function Testimonials() {
  return (
    <Wrapper>
        <HeaderText>
            <h2>Testimonials</h2>
            <p>What our customers are saying about us:</p>
        </HeaderText>
      <div>
          <TestimonySlide  testimonies={testimonies} />
      </div>
    </Wrapper>
  )
}


export const Wrapper = styled.section`
display:flex;
flex-direction:column;
  padding:1rem 2rem;  
  height:;
position:relative;
`
export const TestimonyCard = styled.div`
padding:0 10% ;
display:flex;
align-items:flex-start;
justify-contents:center;
gap:20px;
// height:contain;
box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;


img{
border-radius:8px;
}
div{
align-self:center;
padding:10px;
box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}
`
export default Testimonials