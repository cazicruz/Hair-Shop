import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/cartSlice';
import { toast } from 'react-toastify';
import {capitalizeFirst} from '@/utils/helpers'
import {useCartActions} from '@/hooks/cartThunks'
import { useCart } from '@/hooks/useCart';



function ProductCard({product}) {
    const { addItemToCart} = useCartActions();
    const dispatch = useDispatch();
    const inStock = product.stockQuantity > 0;
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
            addToCart.mutateAsync(product).then(() => {
                toast.success(`${product.name} added to cart!`, { className: 'toast-success' });
            });
        }
  return (
    <div>
        
        <ProductContainer  >
        <Link href={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Image
                src={product.images[0]}
                alt={product.name}
                width={200}
                height={280}
                style={{ width: "100%", height: "280px", objectFit: "", borderRadius: "6px" }}
            />
            <h2 style={{ fontSize: "1.2rem", margin: "1rem 0 0.5rem" }}>{capitalizeFirst(product.name)}</h2>
            <p style={{ color: "#888", marginBottom: "0.5rem" }}>{capitalizeFirst(product.description)}</p>
            <strong style={{ fontSize: "1.1rem" }}>₦{product.price.toFixed(2)}</strong>
        </Link>
            <ButtonWrapper>
                <button
                style={{
                    padding: "0.5rem 0.5rem",
                    background: "rgba(253, 29, 29, 1)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
                onClick={(e)=>{
                    e.preventDefault();
                    handleAddToCart(product);
                }}
                >
                Add to Cart
                </button>
                <div>
                    <p>
                        {inStock ? (
                            <span style={{ color: 'green' }}>In Stock</span>
                        ) : (
                            <span style={{ color: 'red' }}>Out of Stock</span>
                        )}
                    </p>
                </div>
                {/* <button
                disabled={!inStock}
                style={{
                    padding: "0.5rem",
                    background: inStock ? "#8a1ee9fc" : "#aa7ed0fc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: inStock ? 'pointer' : 'not-allowed',
                }}
                >
                Buy Now
                </button> */}
            </ButtonWrapper>
        </ProductContainer>
    </div>
  )
}
const ProductContainer = styled.div`
    border: 1px solid #eee;
    borderRadius: 8px;
    padding: 1rem;
    background: #fff;
    boxShadow: 0 2px 8px rgba(0,0,0,0.05);

    &:hover {
        img{
         object-fit:cover;
    
        }
    }
`
const ButtonWrapper= styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0.5rem 0 0.5rem; ;

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:first-child {
        background: "rgba(253, 29, 29, 1)";
        color: "#fff";
    }

    button:last-child {
        background: "#8a1ee9fc";
        color: "#fff";
    }
    @media (max-width: 600px) {
        flex-direction: column;
        padding:0;
        margin:0;
        
        /* Make 2nd child appear first */
        div:nth-child(2) {
        
            order: -1;
        }
        button {
            width: 100%;
            margin:0;
            padding:0;
        }

`

export default ProductCard