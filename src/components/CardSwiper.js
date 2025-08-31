'use client'
import React ,{useRef}from 'react'
import Card from '@/components/Card'
import styled from 'styled-components'
import { MdArrowBackIos,MdArrowForwardIos } from "react-icons/md";


function CardSwiper({children}) {
    const carouselRef = useRef(null);
    const handleNext = () => {
        const carousel = carouselRef.current || document.querySelector('.carousel');
        carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
    }
    const handlePrev = () => {
        const carousel = carouselRef.current || document.querySelector('.carousel');
        carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
    }
  return (
    <div style={{position:'relative'}}>
    <Carousel ref={carouselRef} className='carousel'>
    <div>
      {children ?children :(
        <>
        
      <Card 
        title="Hair Tools"
        description="Expert hair tools for styling and care."
        img="/images/hair essentials.png"
        className='card'
      />
      <Card 
        title="Hair Bundles"
        description="Expert hair bundling services."
        img="/images/wav hair.png"
                className='card'

      />
      <Card 
        title="Hair Products"
        description="Hair products for all your styling needs."
        img="/images/hair essentials.png"
                className='card'

      />
      <Card 
        title="Hair Bundles"
        description="Expert hair bundling services."
        img="/images/wav hair.png"
                className='card'

      />
      <Card 
        title="Hair Products"
        description="Hair products for all your styling needs."
        img="/images/hair essentials.png"
                className='card'

      />
      <Card 
        title="Hair Bundles"
        description="Expert hair bundling services."
        img="/images/wav hair.png"
                className='card'

      />
      <Card 
        title="Hair Products"
        description="Hair products for all your styling needs."
        img="/images/hair essentials.png"
                className='card'

      />
      
      </>)}
    </div>
    </Carousel>
    <span style={{display:'flex',justifyContent:'space-between',marginTop:'10px', position:'absolute', width:'100%', top:'50%', transform:'translateY(-50%)', padding:'0 16px'}}>
    <button onClick={handlePrev} style={{background:'rgba(255, 255, 255, 0.7)', border:'none', padding:'8px', cursor:'pointer', boxShadow:'0 2px 4px rgba(0, 0, 0, 0.2)'}}>
        <span>
            <MdArrowBackIos size={18} />
        </span>
    </button>
    <button onClick={handleNext} style={{background:'rgba(255, 255, 255, 0.7)', border:'none', padding:'8px', cursor:'pointer', boxShadow:'0 2px 4px rgba(0, 0, 0, 0.2)'}}>
        <span>
            <MdArrowForwardIos size={18} />
        </span>
    </button>
    </span>
    </div>
  )
}

const Carousel = styled.div`
  overflow-x: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
    div{

      display: flex;
      gap: 16px;
      scroll-snap-type: x mandatory;
    }
      .card{
      min-width:250px;
      scroll-snap-align: start;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
      @media (max-width: 768px) {
        margin-bottom:20px;
        .card{
        margin-bottom:0px;
        }
      }

//   & > div {
//     flex: 0 0 auto;
//     scroll-snap-align: start;
//   }
`;

export default CardSwiper