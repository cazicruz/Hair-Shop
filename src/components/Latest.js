'use client'
import React,{ useState }  from "react";
import styled from "styled-components";
import ImageSlider from '@/components/ImageSlider';
import CardSwiper from '@/components/CardSwiper';
import Card from '@/components/Card';
import { HeroImage } from '@/components/Hero';
import HairCarousel from '@/components/HairCarusel'



const newItems = [
  { id: 1, name: 'Argan Oil Shampoo', image: '/images/red-hair.png', price: '$15.99' },
  { id: 2, name: 'Keratin Hair Mask', image: '/images/image3.png', price: '$12.49' },
  { id: 3, name: 'Silk Protein Conditioner', image: '/images/image4.png', price: '$13.99' },
  { id: 4, name: 'Silky Straight Hair Extension', image: '/images/image5.png', price: '$49.99' },
  { id: 5, name: 'Curly Hair Bundle', image: '/images/image6.png', price: '$59.99' },
  { id: 6, name: 'Wavy Lace Front Wig', image: '/images/image2.jpg', price: '$89.99' },
];
const SliderWrapper = styled.section`
  padding:1rem 2rem;
  justify-content:center;
  align-text:center;
  // background:linear-gradient(90deg,rgba(252, 157, 69, 1) 0%, rgba(253, 29, 29, 1) 73%, rgba(131, 58, 180, 1) 100%);

`;
export const HeaderText=styled.div`
margin-bottom:1rem;
display:flex;
justify-content:center;
flex-direction :column;
align-items:center;
align-text:center;
` 

function Latest() {
  return (
    <SliderWrapper>
        <HeaderText className="latest">
        <h2>New In Shop ✨</h2>
        <p>Check a random list of our latest arrivals!</p>
        </HeaderText>
        <HairCarousel itemsList={newItems} />
    </SliderWrapper>
  )
}

export default Latest