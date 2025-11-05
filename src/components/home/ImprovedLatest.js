'use client'
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { BsStars, BsCartPlus } from 'react-icons/bs'
import { motion } from 'framer-motion'

const newItems = [
  { id: 1, name: 'Argan Oil Shampoo', image: '/images/red-hair.png', price: '₦15,000', tag: 'New', discount: null },
  { id: 2, name: 'Keratin Hair Mask', image: '/images/image3.png', price: '₦12,500', tag: 'Hot', discount: '20%' },
  { id: 3, name: 'Silk Protein Conditioner', image: '/images/image4.png', price: '₦13,900', tag: 'New', discount: null },
  { id: 4, name: 'Silky Straight Hair Extension', image: '/images/image5.png', price: '₦49,900', tag: 'Trending', discount: null },
  { id: 5, name: 'Curly Hair Bundle', image: '/images/image6.png', price: '₦59,900', tag: 'New', discount: '15%' },
  { id: 6, name: 'Wavy Lace Front Wig', image: '/images/image2.jpg', price: '₦89,900', tag: 'Hot', discount: null },
]

function ImprovedLatest() {
  return (
    <SliderWrapper>
      <HeaderSection data-aos="fade-up">
        <IconWrapper>
          <BsStars />
        </IconWrapper>
        <MainTitle>New In Shop</MainTitle>
        <Subtitle>Discover our latest arrivals and trending products</Subtitle>
      </HeaderSection>

      <CarouselContainer>
        <StyledSwiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            320: { 
              slidesPerView: 1,
              spaceBetween: 20,
              effect: 'slide'
            },
            768: { 
              slidesPerView: 2,
              spaceBetween: 30,
              effect: 'slide'
            },
            1024: { 
              slidesPerView: 3,
              spaceBetween: 40,
              effect: 'coverflow'
            },
          }}
          loop={true}
        >
          {newItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <ProductCard
                as={motion.div}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {item.discount && (
                  <DiscountBadge>{item.discount} OFF</DiscountBadge>
                )}
                <TagBadge $tag={item.tag}>{item.tag}</TagBadge>

                <ImageContainer>
                  <StyledImage
                    src={item.image}
                    alt={item.name}
                    width={280}
                    height={280}
                  />
                  <ImageOverlay>
                    <QuickViewButton>
                      <BsCartPlus /> Add to Cart
                    </QuickViewButton>
                  </ImageOverlay>
                </ImageContainer>

                <ProductInfo>
                  <ProductName>{item.name}</ProductName>
                  <PriceContainer>
                    <CurrentPrice>{item.price}</CurrentPrice>
                    {item.discount && (
                      <OriginalPrice>
                        ₦{Math.round(parseInt(item.price.replace(/[₦,]/g, '')) / (1 - parseInt(item.discount) / 100)).toLocaleString()}
                      </OriginalPrice>
                    )}
                  </PriceContainer>
                  <Rating>
                    <StarFilled>★★★★★</StarFilled>
                    <RatingText>(4.9)</RatingText>
                  </Rating>
                </ProductInfo>

                <CardShine />
              </ProductCard>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </CarouselContainer>

      <ViewAllContainer data-aos="fade-up">
        <ViewAllButton href="/products">
          View All Products
        </ViewAllButton>
      </ViewAllContainer>
    </SliderWrapper>
  )
}

const SliderWrapper = styled.section`
  padding: 80px 24px;
  background: linear-gradient(
    180deg,
    #fff 0%,
    #fef9f8 50%,
    #fff 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(
      circle,
      rgba(252, 176, 69, 0.08),
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 64px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: 48px;
  }
`

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  color: white;
  font-size: 2rem;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`

const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const CarouselContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`

const StyledSwiper = styled(Swiper)`
  padding: 40px 20px 80px;

  .swiper-slide {
    width: 320px;
    height: auto;

    @media (max-width: 768px) {
      width: 280px;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #667eea;
    width: 48px;
    height: 48px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:after {
      font-size: 20px;
      font-weight: bold;
    }

    &:hover {
      background: #667eea;
      color: white;
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      width: 36px;
      height: 36px;

      &:after {
        font-size: 16px;
      }
    }
  }

  .swiper-pagination {
    bottom: 20px;
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: #667eea;
    opacity: 0.3;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    width: 32px;
    border-radius: 6px;
  }
`

const ProductCard = styled.div`
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  height: 100%;

  &:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`

const DiscountBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
`

const TagBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${props => {
    switch(props.$tag) {
      case 'New': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'Hot': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'Trending': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      default: return '#667eea';
    }
  }};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
  background: #f8f9fa;

  @media (max-width: 768px) {
    height: 240px;
  }
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProductCard}:hover & {
    opacity: 1;
  }
`

const QuickViewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  color: #2d3748;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transform: translateY(20px);
  transition: all 0.3s ease;

  ${ProductCard}:hover & {
    transform: translateY(0);
  }

  &:hover {
    background: #667eea;
    color: white;
  }
`

const ProductInfo = styled.div`
  padding: 8px 0;
`

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #a0aec0;
  text-decoration: line-through;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StarFilled = styled.span`
  color: #feca57;
  font-size: 0.9rem;
  letter-spacing: 2px;
`

const RatingText = styled.span`
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
`

const CardShine = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  transition: all 0.5s ease;

  ${ProductCard}:hover & {
    left: 100%;
  }
`

const ViewAllContainer = styled.div`
  text-align: center;
  margin-top: 48px;
`

const ViewAllButton = styled.a`
  display: inline-block;
  padding: 16px 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 14px 36px;
    font-size: 1rem;
  }
`

export default ImprovedLatest