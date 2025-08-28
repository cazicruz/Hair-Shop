'use client'
import React from "react";
import styled from "styled-components";
import Image from 'next/image'


const HeroSection = styled.section`
    background: linear-gradient(90deg, #f8e1f4 0%, #fff 100%);
    padding: 60px 20px;
    text-align: center;
`;

const HeroContent = styled.div`
    max-width: 700px;
    margin: 0 auto;
`;

const HeroTitle = styled.h1`
    font-size: 2.8rem;
    font-weight: bold;
    color: #2d1e2f;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: ${({theme}) =>theme.fontSize?.xxlarge || "2rem"};
    }
`;

const HeroText = styled.p`
    font-size: 1.2rem;
    color: #5a3e5c;
    margin-bottom: 32px;

    @media (max-width: 768px) {
        font-size: ${({theme}) =>theme.fontSize?.small || "0.8rem"};
    }
`;

const ShopButton = styled.a`
    display: inline-block;
    background: #a259c6;
    color: #fff;
    padding: 14px 36px;
    border-radius: 30px;
    font-weight: bold;
    text-decoration: none;
    font-size: 1rem;
    box-shadow: 0 4px 16px rgba(162,89,198,0.15);

    @media (max-width: 768px) {
        font-size: ${({theme}) =>theme.fontSize?.xsmall || "0.8rem"};
        padding: 10px 20px;

    }
`;

const HeroImageWrapper = styled.div`
    margin-top: 40px;


    // @media (max-width: 768px) {
    //     margin-top: 20px;
    //     // padding: 10px 20px;

    // }
    
`;

export const  HeroImage = styled(Image)`
    // width: auto;
    max-width: 400px;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(162,89,198,0.12);

    @media (max-width: 768px) {
        max-width: 50%;
        height: 200px;
    }
`;

const Hero = () => (
    <HeroSection>
        <HeroContent>
            <HeroTitle>
                Elevate Your Look with Luxurious Hair
            </HeroTitle>
            <HeroText>
                Discover premium hair extensions, wigs, and care products designed to help you shine every day. Shop the latest styles and experience unmatched quality.
            </HeroText>
            <ShopButton href="/shop">
                Shop Now
            </ShopButton>
        </HeroContent>
        <HeroImageWrapper>
            {/* <Image
                src="/images/lux hair.png"
                width={400}
                height={500} /> */}
            <HeroImage
                src="/images/lux hair.png"
                width={500}
                height={400} />
        </HeroImageWrapper>
    </HeroSection>
);

export default Hero;