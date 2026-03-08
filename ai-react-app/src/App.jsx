import { useState } from "react"
import Header from "./components/Header"
import ProductCard from "./components/ProductCard"
import "./styles.css"

export default function App() {
  const [cart, setCart] = useState(0)

  const addToCart = () => setCart(prev => prev + 1)

  const products = [
    { name: "Zenith Watch", price: "$299", icon: "⌚" },
    { name: "Sonic Headphones", price: "$349", icon: "🎧" },
    { name: "Aura Speaker", price: "$159", icon: "🔊" },
    { name: "Vision Pro", price: "$899", icon: "🥽" },
    { name: "Focus Tablet", price: "$499", icon: "📱" },
    { name: "Orbit Mouse", price: "$89", icon: "🖱️" }
  ]

  return (
    <div className="app">
      <Header cart={cart} />
      
      <main>
        <section className="hero">
          <span className="badge">New Collection 2024</span>
          <h1>Engineered for <br /><span>Excellence.</span></h1>
          <p>Discover a curated selection of premium electronics designed to elevate your daily workflow.</p>
        </section>

        <section className="products">
          {products.map((p, i) => (
            <ProductCard key={i} {...p} addToCart={addToCart} />
          ))}
        </section>
      </main>
    </div>
  )
}