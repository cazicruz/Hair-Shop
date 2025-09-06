'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageWithThumbnail from '@/components/products/ImageWithThumbnail'
import ProductDetailsSection from '@/components/products/ProductDetailsSection'

// Dummy fetch function, replace with real API call
const fetchProduct = async (id) => {
    // Simulate API response
    return {
        id:1,
        name: 'Luxury Hair Extension',
        description: 'Premium quality human hair extension for a natural look.',
        price: 129.99,
        images: [
            "/images/hair essentials.png",
            "/images/bundle2.png",
            "/images/bundle.png",
        ],
        inStock: true,
        brand: 'GlamourLocks',
        length: '18 inches',
        color: 'Natural Black',
    };
};

export default function ProductDetails() {
    const params = useParams();
    const id = params.id;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetchProduct(id).then(setProduct);
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main style={{ maxWidth: 800, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8 }}>
            <ProductDetailsWrapper style={{ display: 'flex', gap: 32}}>
                <ImageWithThumbnail
                    images={product.images}
                    productName={product.name}
                    style={{ width: 320, height: 320, objectFit: 'cover', borderRadius: 8 }}
                />
                <ProductDetailsSection product={product} />
            </ProductDetailsWrapper>

        </main>
    );
}
const ProductDetailsWrapper = styled.div`
display:flex;
gap:32;

@media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    ImageWithThumbnail{
    min-width:100%;}
`