'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { HeroImage } from '@/components/home/Hero';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';



const Wrapper = styled.section`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0px;
  background: ${props => props.theme.colors.background};
`;

const SliderContainer = styled.div`
  width: 100%;
    max-width: 100vw;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 10px 0;
    max-width: 100vw;
    overflow: hidden;
  }
`;

const SliderTrack = styled(motion.div)`
  display: flex;
  cursor: grab;
`;

const Item = styled.div`
  flex: 0 0 calc(100% / 4);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
//   border: 1px solid #eee;
//   background: white;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 12px 0;
    font-size: ${(props) => props.theme.fontSize.xsmall};
    font-weight: 600;
  }
    p {
    font-size: ${(props) => props.theme.fontSize.small};
    font-weight: 600;
    color: ${(props) => props.theme.colors.primary};
    }

  @media (max-width: 768px) {
    flex: 0 0 calc(100% / 2);
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    flex: 0 0 100%;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #333;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #555;
  }
`;

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#333' : '#bbb')};
  border: none;
  cursor: pointer;

  &:hover {
    background: #666;
  }
`;

const ImageSlider = ({content, children}) => {
  const visibleItems = 4;
  const [items, setItems] = useState(content);
  const [index, setIndex] = useState(0);
  const totalItems = items.length;
  const extendedItems = [...items, ...items, ...items];
  const baseIndex = totalItems;
  const currentIndex = baseIndex + index;

  const autoplayRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => prev - 1);
  }, []);

  // Reset for infinite effect
  useEffect(() => {
    if (index > totalItems || index < -totalItems) {
      setIndex(0);
    }
  }, [index, totalItems]);

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 3000);
    }
    return () => clearInterval(autoplayRef.current);
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleDotClick = (dotIndex) => {
    setIndex(dotIndex);
  };
  

  return (
    <Wrapper
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <PrevButton onClick={prevSlide}>
        <RiArrowLeftSLine />
      </PrevButton>
      <NextButton onClick={nextSlide}>
        <RiArrowRightSLine />
      </NextButton>
      <SliderContainer>
        <SliderTrack
          drag="x"
          dragConstraints={{ left: -200, right: 200 }}
          onDragEnd={(event, info) => {
            if (info.offset.x < -50) nextSlide();
            if (info.offset.x > 50) prevSlide();
          }}
          animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
          transition={{ duration: 0.4 }}
        >
          {extendedItems.map((item, i) => (
            <Item key={i}>
              <HeroImage
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                loading="eager"
              />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </Item>
          ))}
        </SliderTrack>
      </SliderContainer>

      {/* Pagination Dots */}
      <Pagination>
        {Array.from({ length: totalItems }).map((_, dotIndex) => (
          <Dot
            key={dotIndex}
            onClick={() => handleDotClick(dotIndex)}
            active={dotIndex === ((index % totalItems) + totalItems) % totalItems}
          />
        ))}
      </Pagination>
      
    </Wrapper>
  );
};

export default ImageSlider;
