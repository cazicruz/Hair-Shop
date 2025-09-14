import React from 'react'
import AddToCart from '@/components/buttons/AddToCart'
import { FaOpencart } from 'react-icons/fa';
import { IoBagHandleSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cartSlice';


function ProductDetailsSection({product}) {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        // Implement add to cart functionality
        dispatch(addItem(product));
    }
  return (
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
        <AddToCart
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
            icon={<FaOpencart size={20} />}
            onClick={() => handleAddToCart(product)}
            disabled={!product.inStock}
            text={'Add to Cart'}
        /> 
        <AddToCart
            style={{
                marginTop: 16,
                padding: '10px 32px',
                background: '#fff',
                color: '#222',
                border: '2px solid #222',
                borderRadius: 4,
                cursor: product.inStock ? 'pointer' : 'not-allowed',
                opacity: product.inStock ? 1 : 0.5,
            }}
            icon={<IoBagHandleSharp size={20} />}
            disabled={!product.inStock}
            text={'Buy Now'}
        /> 
    </div>
  )
}

export default ProductDetailsSection