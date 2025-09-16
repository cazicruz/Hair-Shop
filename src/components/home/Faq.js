'use client'
import React from 'react'
import { Collapse } from 'antd'
import styled from 'styled-components'
import {HeaderText} from '@/components/home/Latest'


function Faq() {
  const items = [
    {
      key: '1',
      label: <CollapseText>What services do you offer?</CollapseText>,
      children: <div>We offer high-quality raw human hair wigs, bundles, lace fronts, hair care products, and tools.</div>,
    },
    {
      key: '2',
      label: <CollapseText>How do I track my order?</CollapseText>,
      children: <div>You can track your order by logging into your account or contacting our customer support team.</div>,
    },
    {
      key: '3',
      label: <CollapseText>What is your return policy?</CollapseText>,
      children: <div>We offer a 48-hour return and exchange policy. To be eligible for a refund, your item must be in its original condition and accompanied by all original tags, packaging, and accessories. Please see our full policy on our IG page.</div>,
    },
    {
      key: '4',
      label: <CollapseText>What payment methods do you accept?</CollapseText>,
      children: <div>We accept major credit cards (Visa, Mastercard) via Paystack.</div>,
    },
    {
      key: '5',
      label: <CollapseText>Do you offer discounts?</CollapseText>,
      children: <div>We offer occasional discounts and promotions. Please follow us on social media to stay updated.</div>,
    },
  ]

  return (
    <Wrapper id='faq'>
      <HeaderText className="latest" data-aos="flip-up">
      <h2>FAQ&apos;s</h2>
      <p>Have questions? We're here to help! Check out our <br />frequently asked questions below.</p>
      </HeaderText>
      <FaqContainer>
        {items.map((item, index) => (
          <div
            key={item.key}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            data-aos-duration="600"
          >
            <Collapse
              accordion
              expandIconPosition="end"
              items={[item]}
              style={{ border: 'none', background: 'inherit', color: '#fff' }}
            />
          </div>
        ))}
      </FaqContainer>
    </Wrapper>
  )
}

const Wrapper= styled.section`
display:flex;
flex-direction:column;
padding: 1rem 0rem;
align-text:center;

justify-content: center;
align-items: center;
background: ${({ theme }) => theme.colors.background};
color: ${({ theme }) => theme.colors.text};

  
`
const FaqContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
width:1000px;
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    

    div {
      font-size: ${props => props.theme.fontSize.xsmall};
      align-items: center;
    }
  }
`;
const CollapseText = styled.div`
//   padding: 1rem ;
  margin:0px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

//   @media (max-width: 768px) {
//     // font-size: ${props => props.theme.fontSize.xsmall};
//   }
`;
export default Faq