import React from 'react'
import AddToCart from '@/components/buttons/AddToCart'
import { FaOpencart } from 'react-icons/fa';
import { IoBagHandleSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import {useCartActions} from '@/hooks/cartThunks'
import {capitalizeFirst} from '@/utils/helpers'



function ProductDetailsSection({product}) {
      const { addItemToCart} = useCartActions();
      const inStock = product.stockQuantity > 0;

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        // Implement add to cart functionality
        dispatch(addItemToCart(product));
        toast.success('Product added to cart!', { className: 'toast-success' });
    }
  return (
    <div style={{width:'100%', paddingRight:'30px'}}>
        <h1>{capitalizeFirst(product.name)}</h1>
        <p style={{ color: '#888' }}>{capitalizeFirst(product.brand)}</p>
        <p>{product.description}</p>
        <ul>
            <li><strong>Length:</strong> {`${product.length.value}${product.length.unit}`}</li>
            <li><strong>Color:</strong> {capitalizeFirst(product.color)}</li>
        </ul>
        <h2 style={{ color: '#b12704' }}>${product.price.toFixed(2)}</h2>
        <p>
            {inStock ? (
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
                cursor: inStock ? 'pointer' : 'not-allowed',
                opacity: inStock ? 1 : 0.5,
            }}
            icon={<FaOpencart size={20} />}
            onClick={() => handleAddToCart(product)}
            disabled={!!product.stockQuantity}
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
                cursor: inStock ? 'pointer' : 'not-allowed',
                opacity: inStock ? 1 : 0.5,
            }}
            icon={<IoBagHandleSharp size={20} />}
            disabled={!!product.stockQuantity}
            text={'Buy Now'}
        /> 
    </div>
  )
}

export default ProductDetailsSection