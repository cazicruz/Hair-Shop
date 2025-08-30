import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

function Card({ title, description, price,img }) {
  return (
    <CardWrapper>
      {img && <Image src={img} alt={title} width={200} height={200} />}
      <h3>{title}</h3>
      <p>{description}</p>
      {price && <p>Price: ${price}</p>}
    </CardWrapper>
  )
}
const CardWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  text-align: center;
  img {
    border-radius: 20px;
  }
    h3 {
      margin: 12px 0;
    }

  margin: 16px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
      padding: 10px;
      margin:0;


    h3,p{
      font-size: ${props => props.theme.fontSize.xxsmall};
      padding: 0px;
      margin: 5px 0 0 0;
    }
    // padding: 0px;
    img {
      width: 100px;
      height: 100px;
    //   object-fit: cover;
      border-radius: 8px;
    }
  }
`;

export default Card