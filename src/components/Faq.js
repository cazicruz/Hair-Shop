'use client'
import React from 'react';
import { Collapse, Select } from 'antd';
import styled from 'styled-components';


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function Faq() {
    const items = [
        {
          key: '1',
          label: <CollapseText>What services do you offer?</CollapseText>,
          children: <div>
            We offer high-quality raw human hair wigs, bundles, lace fronts, hair care products, and tools.
          </div>,
        //   style: { border: 'none', backgroundColor: 'red' }
        },
        {
          key: '2',
          label: <CollapseText>How do I track my order?</CollapseText>,
          children: <div>
            You can track your order by logging into your account or contacting our customer support team.
          </div>,
        },
        {
          key: '3',
          label: <CollapseText>What is your return policy?</CollapseText>,
          children: <div>
            We offer a 48-hour return and exchange policy. To be eligible for a refund, your item must be in its original condition and accompanied by all original tags, packaging, and accessories. Please see our full policy on our IG page.
          </div>,
        },
        {
          key: '4',
          label: <CollapseText>What payment methods do you accept?</CollapseText>,
          children: <div>
            We accept major credit cards (Visa, Mastercard) via Paystack.
          </div>,
        },
        {
          key: '5',
          label: <CollapseText>Do you offer discounts?</CollapseText>,
          children: <div>
            We offer occasional discounts and promotions. Please follow us on social media to stay updated.
          </div>,
        },
      ];
  return (
    <Wrapper>
        <h2>FAQ's</h2 >
        <p>Have questions? We're here to help! Check out our frequently asked questions below.</p>
        <FaqContainer>
            <Collapse
            // defaultActiveKey={['1']}
            // onChange={onChange}
            accordion
            expandIconPosition={"end"}
            items={items}
            style={{ border: 'none', background:'inherit', color: '#fff' }}
            >
            </Collapse>
        </FaqContainer>
    </Wrapper>
  )
}
const Wrapper= styled.section`
display:flex;
flex-direction:column;
padding: 2rem 2rem;
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