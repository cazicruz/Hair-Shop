"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductList from '@/components/products/ProductList'
import { products } from "@/data/products";

// Dummy product data
const productsData = products;

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