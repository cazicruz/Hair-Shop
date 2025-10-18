"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductList from '@/components/products/ProductList'



export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     // Simulate fetching products from an API
    //     setProducts(productsData);
    // }, []);

    return (
        <main style={{ padding: "2rem" }}>
            <h2>{`Hair Shop Products`}</h2>
            <ProductList products={products}/>
        </main>
    );
}