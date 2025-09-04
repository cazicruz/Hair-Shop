import React from 'react'
import ProductCard from './ProductCard';


function ProductList({products}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
      marginTop: "2rem"
    }}>
      {products.map(product => (
          <ProductCard product={product} key={product.id}/>
      ))}
  </div>
  )
}

export default ProductList