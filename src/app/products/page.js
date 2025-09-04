"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductList from '@/components/products/ProductList'

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
            <h2>{`Hair Shop Products`}</h2>
            <ProductList products={products}/>
        </main>
    );
}