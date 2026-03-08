```jsx
import React from 'react';

export default function Header({ cartCount }) {
  return (
    <header className="header">
      <nav className="nav container">
        <div className="logo">Store.</div>
        <div className="cart-icon">
          Bag {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </div>
      </nav>
    </header>
  );
}
```