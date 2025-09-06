'use client';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export default function ImageWithThumbnail({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomed, setZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef(null);

  const handleMouseDown = (e) => {
    if (!zoomed) return;
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e) => {
    if (!zoomed || !dragStart.current) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    dragStart.current = null;
  };

  return (
    <Wrapper>
      <MainImage
        $zoomed={zoomed}
        $offset={offset}
        onClick={() => {
          setZoomed(!zoomed);
          setOffset({ x: 0, y: 0 });
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Image
          src={selectedImage}
          alt={productName}
          width={300}
          height={400}
          style={{ objectFit: 'cover', borderRadius: '12px', userSelect: 'none' }}
          draggable={false}
        />
      </MainImage>

      <Thumbnails>
        {images.map((img, i) => (
          <Thumb
            key={i}
            $active={selectedImage === img}
            onClick={() => {
              setSelectedImage(img);
              setZoomed(false);
              setOffset({ x: 0, y: 0 });
            }}
          >
            <Image
              src={img}
              alt={`${productName}-${i}`}
              width={70}
              height={70}
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </Thumb>
        ))}
      </Thumbnails>
    </Wrapper>
  );
}

// --- Styled Components ---

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImage = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: ${({ $zoomed }) => ($zoomed ? 'grab' : 'zoom-in')};
  width: 320px;
  height: 320px;

  img {
    transition: transform 0.2s ease;
    transform: ${({ $zoomed, $offset }) =>
      $zoomed
        ? `scale(1.8) translate(${$offset.x / 2}px, ${$offset.y / 2}px)`
        : 'scale(1) translate(0,0)'};
    cursor: ${({ $zoomed }) => ($zoomed ? 'grab' : 'zoom-in')};
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;

    img {
      width: 100% !important;
      height: auto !important;
    }
  }
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Thumb = styled.div`
  border: 2px solid ${({ $active }) => ($active ? '#ff7eb3' : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.2s ease-in-out;

  &:hover {
    border-color: #ff7eb3;
  }
`;
