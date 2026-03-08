export default function Header({ cart }) {
  return (
    <header className="navbar">
      <div className="logo">MODERN<span>STORE</span></div>
      <nav className="nav-links">
        <a href="#">Products</a>
        <a href="#">Support</a>
      </nav>
      <div className="cart-btn">
        <span>Cart</span>
        <div className="cart-counter">{cart}</div>
      </div>
    </header>
  )
}