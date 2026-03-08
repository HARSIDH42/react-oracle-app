export default function ProductCard({ name, price, icon, addToCart }) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <h3>{name}</h3>
      <p className="price">{price}</p>
      <button className="add-btn" onClick={addToCart}>Add to Cart</button>
    </div>
  )
}