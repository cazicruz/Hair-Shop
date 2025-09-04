"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

// Dummy product data
const productsData = [
    {
        id: 1,
        name: "Silky Straight Hair Extension",
        price: 49.99,
        image: '/images/hair essentials.png',
        description: "Premium quality silky straight hair extension.",
    },
    {
        id: 2,
        name: "Curly Hair Bundle",
        price: 59.99,
        image: "/images/lux hair.png",
        description: "Natural curly hair bundle for a voluminous look.",
    },
    {
        id: 3,
        name: "Wavy Lace Front Wig",
        price: 89.99,
        image: "/images/Golden-Brown Hair Spiral.png",
        description: "Soft wavy lace front wig, easy to style.",
    },
];

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
// use client
    useEffect(() => {
        // Simulate fetching products from an API
        setProducts(productsData);
    }, []);

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Hair Shop Products</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2rem",
                marginTop: "2rem"
            }}>
                {products.map(product => (
                    <Link href={`/products/${product.id}`}><div key={product.id} style={{
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "1rem",
                        background: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "6px" }}
                        />
                        <h2 style={{ fontSize: "1.2rem", margin: "1rem 0 0.5rem" }}>{product.name}</h2>
                        <p style={{ color: "#888", marginBottom: "0.5rem" }}>{product.description}</p>
                        <strong style={{ fontSize: "1.1rem" }}>${product.price.toFixed(2)}</strong>
                        <button
                            style={{
                                margin: "1rem",
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
                    </div></Link>
                ))}
            </div>
        </main>
    );
}