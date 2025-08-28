'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Dummy fetch function, replace with real API call
const fetchProduct = async (id) => {
    // Simulate API response
    return {
        id:1,
        name: 'Luxury Hair Extension',
        description: 'Premium quality human hair extension for a natural look.',
        price: 129.99,
        image: '/images/hair essentials.png',
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
        <div style={{ maxWidth: 800, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8 }}>
            <div style={{ display: 'flex', gap: 32 }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: 320, height: 320, objectFit: 'cover', borderRadius: 8 }}
                />
                <div>
                    <h1>{product.name}</h1>
                    <p style={{ color: '#888' }}>{product.brand}</p>
                    <p>{product.description}</p>
                    <ul>
                        <li><strong>Length:</strong> {product.length}</li>
                        <li><strong>Color:</strong> {product.color}</li>
                    </ul>
                    <h2 style={{ color: '#b12704' }}>${product.price.toFixed(2)}</h2>
                    <p>
                        {product.inStock ? (
                            <span style={{ color: 'green' }}>In Stock</span>
                        ) : (
                            <span style={{ color: 'red' }}>Out of Stock</span>
                        )}
                    </p>
                    <button
                        style={{
                            marginTop: 16,
                            padding: '12px 32px',
                            background: '#222',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: product.inStock ? 'pointer' : 'not-allowed',
                            opacity: product.inStock ? 1 : 0.5,
                        }}
                        disabled={!product.inStock}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}