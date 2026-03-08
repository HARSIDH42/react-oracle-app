import Header from "./components/Header.jsx"
import ProductCard from "./components/ProductCard.jsx"
import "./styles.css"

export default function App() {
  const products = [
    { id: 1, name: "Minimalist Watch", price: "$120", img: "⌚" },
    { id: 2, name: "Wireless Headphones", price: "$199", img: "🎧" },
    { id: 3, name: "Smart Speaker", price: "$89", img: "🔊" },
    { id: 4, name: "Leather Wallet", price: "$45", img: "💼" },
  ]

  return (
    <div className="container">
      <Header />
      <main>
        <h1 className="hero-title">Discover Our Collection</h1>
        <div className="products">
          {products.map((p) => (
            <ProductCard key={p.id} name={p.name} price={p.price} icon={p.img} />
          ))}
        </div>
      </main>
    </div>
  )
}