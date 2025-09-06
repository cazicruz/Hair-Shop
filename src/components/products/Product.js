'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { FaOpencart } from 'react-icons/fa';

const product = {
  name: "Brazilian Body Wave",
  description: "100% human hair, silky and soft, perfect for every occasion.",
  price: 120,
  images: [
    "/images/image1.jpg",
    "/images/bundle2.png",
    "/images/bundle.png",
  ],
  sizes: ["10 inch", "12 inch", "14 inch", "16 inch"],
  shipping: "Ships within 2-4 business days. Free shipping on orders above $100."
};


function Product() {
  const [selectedImage, setSelectedImage] = useState(product?.images[0]||product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]||product.sizes[0]);

  return (
    <Wrapper>
      <Gallery>
        <MainImage>
          <Image
            src={selectedImage}
            alt={product.name}
            width={300}
            height={400}
            style={{ borderRadius: '12px', objectFit: 'cover' }}
          />
        </MainImage>
        <Thumbnails>
          {product.images.map((img, i) => (
            <Thumb
              key={i}
              onClick={() => setSelectedImage(img)}
              $active={selectedImage === img}
            >
              <Image
                src={img}
                alt={`${product.name}-${i}`}
                width={50}
                height={70}
                style={{ borderRadius: '8px', objectFit: 'cover' }}
              />
            </Thumb>
          ))}
        </Thumbnails>
      </Gallery>

      <Details>
        <h1>{product.name}</h1>
        <p className="tagline">Luxury hair extensions for bold & classy women</p>
        <p className="description">{product.description}</p>
        <Price>${product.price}</Price>

        <Section>
          <h4>Choose Size:</h4>
          <Sizes>
            {product.sizes.map((size, i) => (
              <SizeOption
                key={i}
                $active={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </SizeOption>
            ))}
          </Sizes>
        </Section>

        <Section>
          <h4>Shipping Details:</h4>
          <p>{product.shipping}</p>
        </Section>

        <AddToCart>
          <FaOpencart /> Add to Cart
        </AddToCart>
      </Details>
    </Wrapper>
  );
}

// --- Styled Components ---

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  font-family: 'Helvetica Neue', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Gallery = styled.div`
  flex: 1;
  max-width: 450px;
`;

const MainImage = styled.div`
  margin-bottom: 1rem;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Thumb = styled.div`
  border: 2px solid ${({ $active }) => ($active ? '#ff7eb3' : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.2s ease-in-out;

  &:hover {
    border: 2px solid #ff7eb3;
  }
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

const Section = styled.div`
  margin-bottom: 1.5rem;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    font-size: 0.95rem;
    color: #555;
  }
`;

const Sizes = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SizeOption = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 2px solid ${({ $active }) => ($active ? '#ff7eb3' : '#ddd')};
  background: ${({ $active }) => ($active ? '#ff7eb3' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#333')};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff7eb3;
  }
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
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default Product;
