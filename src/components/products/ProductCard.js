import React from 'react'
import Link from "next/link";
import Image from 'next/image';

function ProductCard({product}) {
  return (
    <div>
        <Link href={`/products/${product.id}`} >
            <div  style={{
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "1rem",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            // maxWidth:"250px",
            }}>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={180}
                    style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "6px" }}
                />
                <h2 style={{ fontSize: "1.2rem", margin: "1rem 0 0.5rem" }}>{product.name}</h2>
                <p style={{ color: "#888", marginBottom: "0.5rem" }}>{product.description}</p>
                <strong style={{ fontSize: "1.1rem" }}>${product.price.toFixed(2)}</strong>
                <button
                style={{
                    margin: "1rem 0 0 1rem",
                    padding: "0.5rem 1rem",
                    background: "#e91e63",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
                >
                Add to Cart
                </button>
            </div>
            </Link>
    </div>
  )
}

export default ProductCard