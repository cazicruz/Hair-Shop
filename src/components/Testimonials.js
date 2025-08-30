'use client'
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { Carousel } from 'antd';

// import  ImageSlider from '@/components/ImageSlider'

const testimonies=[
    { quote: "This is the best hair shop ever!", author: "Happy Customer",photo:'/images/wav hair.png' },
    { quote: "I love the variety of products available.", author: "Satisfied Client", photo:'/images/lux hair.png' },
    { quote: "The staff is so friendly and helpful!", author: "Loyal Customer", photo:'/images/hair essentials.png' },  
]

function Testimonials() {
  return (
    <Wrapper>
        <span className="header">
            <h2>Testimonials</h2>
            <p>What our customers are saying about us:</p>
        </span>
      <div>
            {testimonies.map((testimony, index) => (
            <TestimonyWrapper key={index}>
                <Image
                style={{ borderRadius: '50%', marginBottom: '1rem' }}
                src={testimony.photo} alt={`Testimonial ${index + 1}`} width={100} height={100} />
                <p>"{testimony.quote}" <br /> <strong>- {testimony.author}</strong></p>
            </TestimonyWrapper>
            ))}
        </div>
    </Wrapper>
  )
}

export const Wrapper = styled.section`
  padding: 2rem 1rem;
  display:flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  div{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap:5px;
      }

  @media (max-width: 768px) {
    padding: 1rem;
    max-width: 100%;
      flex-direction: column;

      div{
        display: flex;
        flex-direction: row;
        align-items: center;
      }

  }
`
const TestimonyWrapper = styled.div`
  margin-bottom: 1rem;
  padding:10px;
  display:flex;
  flex-direction: column;
@media (max-width: 768px) {
    padding: 0.5rem;
    margin: 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    height: 100px;

    p{
      margin: 0;
      font-size: ${props => props.theme.fontSize.xxsmall};
      strong{
        display: inline-block;
        font-weight: bold;
        font-size: ${props => props.theme.fontSize.xxsmall};
      }
    }
    img{
      max-width: 50%;
      height: 50px;

    }
      @media (max-width: 768px) {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        margin: 0;
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: 8px;
        height: 100px;
        text-align: end;

        p{
        margin: 5px;
        font-size: $0.5rem;

        strong{
            display: inline-block;
          font-weight: bold;
          font-size: ${props => props.theme.fontSize.xxsmall};
        }
        img{
        max-width: 50%;
        height: 50px;
        }
    }
`
export default Testimonials