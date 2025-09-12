'use client';
import React from 'react';
import styled from 'styled-components';
import { MdOutlineDeleteForever } from "react-icons/md";


// Reusable Components
const PageContainer = styled.div`
    max-width: 900px;
    margin: 40px auto;
    padding: 24px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 24px;
    color: #222;
`;

const CartList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const CartItemContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;
`;

const ProductImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 20px;
`;

const ProductDetails = styled.div`
    flex: 1;
`;

const ProductName = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
`;

const ProductDesc = styled.div`
    font-size: 0.95rem;
    color: #666;
    margin-top: 4px;
`;

const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const QtyButton = styled.button`
    background: #f3f3f3;
    border: none;
    border-radius: 6px;
    width: 28px;
    height: 28px;
    font-size: 1.2rem;
    cursor: pointer;
`;

const Price = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    color: #f04c4c;
    margin-left: 24px;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: #e91e63;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 16px;
`;

const SummaryContainer = styled.div`
    margin-top: 32px;
    padding: 20px;
    background: #fafafa;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
`;

const CheckoutButton = styled.button`
    margin-top: 18px;
    padding: 12px 0;
    background: #f04c4c;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;    
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #c2185b;
    }
`;

// Dummy Data
const cartItems = [
    {
        id: 1,
        name: 'Brazilian Body Wave Wig',
        desc: '100% Human Hair, Natural Black, 20 inches',
        image: '/images/freepik__the-style-is-candid-image-photography-with-natural__34909.png',
        price: 120,
        qty: 1,
    },
    {
        id: 2,
        name: 'Deep Curly Lace Front',
        desc: 'Premium Remy Hair, 18 inches',
        image: '/images/wig1.png',
        price: 95,
        qty: 2,
    },
];

// Cart Item Component
function CartItem({ item, onQtyChange, onRemove }) {
    return (
        <CartItemContainer>
            <ProductImage src={item.image} alt={item.name} />
            <ProductDetails>
                <ProductName>{item.name}</ProductName>
                <ProductDesc>{item.desc}</ProductDesc>
                <QuantityControl>
                    <QtyButton onClick={() => onQtyChange(item.id, item.qty - 1)} disabled={item.qty <= 1}>-</QtyButton>
                    <span>{item.qty}</span>
                    <QtyButton onClick={() => onQtyChange(item.id, item.qty + 1)}>+</QtyButton>
                </QuantityControl>
            </ProductDetails>
            <Price>${(item.price * item.qty).toFixed(2)}</Price>
            <RemoveButton onClick={() => onRemove(item.id)}>
                <MdOutlineDeleteForever size={25} />
            </RemoveButton>
        </CartItemContainer>
    );
}

// Main Cart Page
export default function CartPage() {
    const [items, setItems] = React.useState(cartItems);

    const handleQtyChange = (id, qty) => {
        setItems(items =>
            items.map(item =>
                item.id === id ? { ...item, qty: qty > 0 ? qty : 1 } : item
            )
        );
    };

    const handleRemove = id => {
        setItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 12 : 0;
    const total = subtotal + shipping;

    return (
        <PageContainer>
            <Title>Your Cart</Title>
            {items.length === 0 ? (
                <div>Your cart is empty.</div>
            ) : (
                <>
                    <CartList>
                        {items.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onQtyChange={handleQtyChange}
                                onRemove={handleRemove}
                            />
                        ))}
                    </CartList>
                    <SummaryContainer>
                        <SummaryRow>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </SummaryRow>
                        <SummaryRow>
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </SummaryRow>
                        <SummaryRow style={{ fontWeight: 700 }}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </SummaryRow>
                        <CheckoutButton>Proceed to Checkout</CheckoutButton>
                    </SummaryContainer>
                </>
            )}
        </PageContainer>
    );
}