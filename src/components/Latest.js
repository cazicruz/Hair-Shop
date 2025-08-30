'use client'
import React,{ useState }  from "react";
import styled from "styled-components";
import ImageSlider from '@/components/ImageSlider';


const newItems = [
  { id: 1, name: 'Argan Oil Shampoo', image: '/images/wav hair.png', price: '$15.99' },
  { id: 2, name: 'Keratin Hair Mask', image: '/images/lux hair.png', price: '$12.49' },
  { id: 3, name: 'Silk Protein Conditioner', image: '/images/wav hair.png', price: '$13.99' },
  { id: 4, name: 'Silky Straight Hair Extension', image: '/images/hair essentials.png', price: '$49.99' },
  { id: 5, name: 'Curly Hair Bundle', image: '/images/lux hair.png', price: '$59.99' },
  { id: 6, name: 'Wavy Lace Front Wig', image: '/images/Golden-Brown Hair Spiral.png', price: '$89.99' },
];
const SliderWrapper = styled.section`
    margin:auto;
    // background-color:red;
    display:flex; 
    align-items:center;
    flex-direction:column;
    padding: 20px 20px 0px 20px;

    //add mobile style
    @media (max-width: 768px) {
        padding: 10px 10px 0px 10px;
        max-width: 100vw;
    }

`;
function Latest() {
  return (
    <SliderWrapper>
      <h2>New In Shop ✨</h2>
        <p>Check a random list of our latest arrivals!</p>
      <ImageSlider content={newItems} />
    </SliderWrapper>
  )
}

export default Latest