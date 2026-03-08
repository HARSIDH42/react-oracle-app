```jsx
import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import './styles.css';

const products = [
  { id: 1, name: 'Pro Headphones', price: 299, image: '🎧' },
  { id: 2, name: 'Smart Watch', price: 399, image: '⌚' },
  { id: 3, name: 'Laptop Pro', price: 1299, image: '💻' },
  { id: 4, name: 'Tablet Air', price: 599, image: '📱' },
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => setCartCount(prev => prev + 1);

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <main className="container">
        <h1>Latest Arrivals</h1>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </main>
    </div>
  );
}
```