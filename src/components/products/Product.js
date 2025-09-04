'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { FaOpencart } from 'react-icons/fa';

function Product({ product }) {
  return (
    <Wrapper>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          style={{ borderRadius: '12px', objectFit: 'cover' }}
        />

      <Details>
        <h1>{product.name}</h1>
        <p className="tagline">Luxury hair extensions for bold & classy women</p>
        <p className="description">{product.description}</p>
        <Price>${product.price}</Price>
        <AddToCart>
          <FaOpencart /> Add to Cart
        </AddToCart>
      </Details>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem;
  font-family: 'Helvetica Neue', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Details = styled.div`
  flex: 1;
  max-width: 500px;
  color: #2d2d2d;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .tagline {
    font-size: 1rem;
    font-weight: 500;
    color: #d6336c;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: #555;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #8b0000;
  margin-bottom: 1.5rem;
`;

const AddToCart = styled.button`
  background: linear-gradient(90deg, #ff758c, #ff7eb3);
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;`

  export default Product 