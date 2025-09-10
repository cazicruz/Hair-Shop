import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import styled from 'styled-components';

function ProductCard({product}) {
  return (
    <div>
        <Link href={`/products/${product.id}`} >
            <ProductContainer  >
                <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={280}
                    style={{ width: "100%", height: "280px", objectFit: "", borderRadius: "6px" }}
                />
                <h2 style={{ fontSize: "1.2rem", margin: "1rem 0 0.5rem" }}>{product.name}</h2>
                <p style={{ color: "#888", marginBottom: "0.5rem" }}>{product.description}</p>
                <strong style={{ fontSize: "1.1rem" }}>${product.price.toFixed(2)}</strong>
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
                    >
                    Add to Cart
                    </button>
                    <button
                    style={{
                        padding: "0.5rem",
                        background: "#8a1ee9fc",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                    >
                    Buy Now
                    </button>
                </ButtonWrapper>
            </ProductContainer>
            </Link>
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
    justify-content: center;
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
        button {
            width: 100%;
            margin:0;
            padding:0;
        }

`

export default ProductCard