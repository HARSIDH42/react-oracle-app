```jsx
import React from 'react';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <div className="product-image">{product.image}</div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button className="add-btn" onClick={onAdd}>Add to Cart</button>
    </div>
  );
}
```