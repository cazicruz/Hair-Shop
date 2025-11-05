'use client'
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { BsStarFill } from 'react-icons/bs'

const testimonies = [
  { 
    quote: "The quality of hair is absolutely amazing! I've been using their products for over a year now and I couldn't be happier. Highly recommend!", 
    author: "Elizabeth Odogwu", 
    image: '/images/wav hair.png',
    rating: 5,
    location: "Edo"
  },
  { 
    quote: "B-Classy Hairs transformed my look completely. The variety of products and the customer service is top-notch. Will definitely come back!", 
    author: "Esosa Odogwu", 
    image: '/images/lux hair.png',
    rating: 5,
    location: "Edo"
  },
  { 
    quote: "The staff is so friendly and knowledgeable! They helped me find the perfect wig that matches my style. Love it!", 
    author: "Grace Adeyemi", 
    image: '/images/hair essentials.png',
    rating: 5,
    location: "Abuja"
  },  
  { 
    quote: "Best hair products I've ever used! The quality is exceptional and the prices are very reasonable. Five stars!", 
    author: "Jennifer Okafor", 
    image: '/images/bundle.png',
    rating: 5,
    location: "Enugu"
  },
]

function ImprovedTestimonials() {
  return (
    <Wrapper>
      <HeaderSection data-aos="fade-up">
        <StarsDecoration>⭐⭐⭐</StarsDecoration>
        <MainTitle>What Our Clients Say</MainTitle>
        <Subtitle>Real experiences from real customers who love our products</Subtitle>
      </HeaderSection>

      <SwiperContainer>
        <StyledSwiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          loop={true}
        >
          {testimonies.map((testimony, index) => (
            <SwiperSlide key={index}>
              <TestimonyCard data-aos="fade-up" data-aos-delay={index * 100}>
                <QuoteIcon>"</QuoteIcon>
                
                <CardHeader>
                  <ImageWrapper>
                    <Image
                      src={testimony.image}
                      alt={testimony.author}
                      width={80}
                      height={80}
                    />
                  </ImageWrapper>
                  <RatingContainer>
                    {[...Array(testimony.rating)].map((_, i) => (
                      <Star key={i}><BsStarFill /></Star>
                    ))}
                  </RatingContainer>
                </CardHeader>

                <TestimonyContent>
                  <Quote>{testimony.quote}</Quote>
                  <AuthorInfo>
                    <AuthorName>{testimony.author}</AuthorName>
                    <Location>{testimony.location}</Location>
                  </AuthorInfo>
                </TestimonyContent>

                <CardGradient />
              </TestimonyCard>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </SwiperContainer>

      <TrustBadge>
        <BadgeIcon>✓</BadgeIcon>
        <BadgeText>Trusted by 1000+ satisfied customers</BadgeText>
      </TrustBadge>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 80px 24px;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #fef5f8 50%,
    #ffffff 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(102, 126, 234, 0.08),
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
    margin-bottom: 40px;
  }
`

const StarsDecoration = styled.div`
  font-size: 1.5rem;
  margin-bottom: 16px;
  animation: sparkle 2s ease-in-out infinite;

  @keyframes sparkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
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

const SwiperContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`

const StyledSwiper = styled(Swiper)`
  padding-bottom: 60px;

  .swiper-button-next,
  .swiper-button-prev {
    color: #667eea;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &:after {
      font-size: 18px;
    }

    &:hover {
      background: #667eea;
      color: white;
    }
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #667eea;
    opacity: 0.3;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #667eea;
  }
`

const TestimonyCard = styled.div`
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  }
`

const QuoteIcon = styled.div`
  position: absolute;
  top: 16px;
  right: 24px;
  font-size: 4rem;
  color: rgba(102, 126, 234, 0.1);
  font-family: Georgia, serif;
  line-height: 1;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
`

const ImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  img {
    object-fit: cover;
  }
`

const RatingContainer = styled.div`
  display: flex;
  gap: 4px;
`

const Star = styled.span`
  color: #feca57;
  font-size: 1rem;
`

const TestimonyContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Quote = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 20px;
  text-align: center;
  font-style: italic;
`

const AuthorInfo = styled.div`
  text-align: center;
  padding-top: 16px;
  border-top: 2px solid #f0f0f0;
`

const AuthorName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
`

const Location = styled.div`
  font-size: 0.9rem;
  color: #718096;
`

const CardGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;

  ${TestimonyCard}:hover & {
    transform: scaleX(1);
  }
`

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 48px;
  padding: 16px 32px;
  background: white;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`

const BadgeIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
`

const BadgeText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

export default ImprovedTestimonials