import React from 'react'
import styled from 'styled-components'

const CartButton = styled.button`
  margin-top: 16px;
  padding: 12px 15px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  transition: opacity 0.3s, transform 0.2s;

  &:hover {
    opacity: ${props => (props.disabled ? 0.5 : 0.9)};
  }

  &:active {
    transform: scale(0.97);
  }

  ${props =>
    props.$fullWidth &&
    `
      width: 100%;
    `}
`

function AddToCart({ 
  disabled = false, 
  icon = null, 
  text = "Add to Cart", 
  style, 
  onClick, 
  fullWidth = true 
}) {
  return (
    <CartButton
      disabled={disabled}
      onClick={onClick}
      style={style}
      $fullWidth={fullWidth}
      aria-disabled={disabled}
    >
      {icon && <span style={{ padding: '0px 7px 0px 0px' }}>{icon}</span>}
      {text}
    </CartButton>
  )
}

export default AddToCart
