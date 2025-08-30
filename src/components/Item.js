import React from 'react'

function Item() {
  return (
    <div>item</div>
  )
}

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

export default Item