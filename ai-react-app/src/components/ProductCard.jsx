export default function ProductCard({ name, price, icon }) {
  return (
    <div className="card">
      <div className="card-image">{icon}</div>
      <h3>{name}</h3>
      <p className="price">{price}</p>
      <button className="add-btn">Add to Cart</button>
    </div>
  )
}