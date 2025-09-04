'use client'
import React,{useState} from 'react'
import Product from '@/components/products/Product'

const fetchProduct = {
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
function PaymentPage() {
        const [product, setProduct] = useState(fetchProduct);
    
        
    
        
    
  return (
    <div>
        <Product product={product}/>
    </div>
  )
}

export default PaymentPage