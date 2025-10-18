'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';
import { addItem, removeItem ,updateQuantity} from '@/redux/cartSlice';
import { useRouter } from 'next/navigation';
import {useCartActions} from '@/hooks/cartThunks'




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


// Cart Item Component
function CartItem({ item, onQtyChange, onRemove }) {
    console.log("Cart Item:", item);
    
    return (
        <CartItemContainer>
            <ProductImage src={item.productId.images[0]} alt={item.productId.name} />
            <ProductDetails>
                <ProductName>{item.productId.name}</ProductName>
                <ProductDesc>{item.productId.desc}</ProductDesc>
                <QuantityControl>
                    <QtyButton onClick={() => onQtyChange(item.productId._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</QtyButton>
                    <span>{item.quantity}</span>
                    <QtyButton onClick={() => onQtyChange(item.productId._id, item.quantity + 1)}>+</QtyButton>
                </QuantityControl>
            </ProductDetails>
            <Price>${(item.productId.price * (item.quantity || 1)).toFixed(2)}</Price>
            <RemoveButton onClick={() => onRemove(item?.productId._id)}>
                <MdOutlineDeleteForever size={25} />
            </RemoveButton>
        </CartItemContainer>
    );
}

// Main Cart Page
export default function CartPage() {
    const { addItemToCart, removeItemFromCart, updateCartQuantity } = useCartActions();
    const cartItems = useSelector((state) => state.cart.items);
    console.log("Cart Items from Redux:", cartItems);

    const dispatch = useDispatch();
    
    const handleDeleteFromCart = (productId) => {
        // Implement delete from cart functionality
        dispatch(removeItemFromCart(productId));
    }

    const handleQtyChange = (id, qty) => {
        if (qty < 1) return;
        // Implement quantity change functionality
        dispatch(updateCartQuantity( id, qty ));
    };

    const router = useRouter();

    const handleCheckout = () => {
    router.push('/checkout'); // or '/payment' depending on your route
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 12 : 0;
    const total = subtotal + shipping;

    return (
        <PageContainer>
            <Title>Your Cart</Title>
            {cartItems.length === 0 ? (
                <div>Your cart is empty.</div>
            ) : (
                <>
                    <CartList>
                        {cartItems.map(item => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onQtyChange={handleQtyChange}
                                onRemove={handleDeleteFromCart}
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
                        <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
                    </SummaryContainer>
                </>
            )}
        </PageContainer>
    );
}