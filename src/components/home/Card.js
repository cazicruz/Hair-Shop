import React ,{useState} from 'react'
import Image from 'next/image'
import styled from 'styled-components'

function Card({ title, description, price,img, border=true ,priceModify=false}) {
  const [isPriceModified, setIsPriceModified] = useState(priceModify)
    return (
    <CardWrapper border={border} >
      {img&& <Image src={img} alt={title} width={200} height={200} />}
      <h3>{title}</h3>
      {price && <PriceTag priceModify={isPriceModified}>{price}</PriceTag>}
      {description && <p>{description}</p>}
    </CardWrapper>
  )
}
const CardWrapper = styled.div`
  border: ${({ border }) => (border ? '1px solid' : 'none')} ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  text-align: center;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
  align-items: center;
//   flex-shrink: 2;
  max-width: 300px;
  img {
    border-radius: 20px;
  }
    h3 {
    font-size: ${(props) => props.theme.fontSize.small};
      margin: 0px 0;
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
      font-size: ${props => props.theme.fontSize.xsmall};
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
const PriceTag = styled.p`
  color: ${({ priceModify, theme }) => priceModify ? theme.colors.primary : 'inherit'};
  font-size: ${({ priceModify, theme }) => priceModify ? theme.fontSize.small : 'inherit'};
  font-weight: ${({ priceModify }) => priceModify ? 600 : 'normal'};
  padding: 0;
  margin:0px;
`;

export default Card