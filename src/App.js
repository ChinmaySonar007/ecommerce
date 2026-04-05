import { useState, useEffect } from "react";

const products = [
  { id: 1, name: "Obsidian Tote", category: "Bags", price: 349, tag: "New", emoji: "🖤", description: "Hand-stitched full-grain leather with gold hardware." },
  { id: 2, name: "Arc Sunglasses", category: "Eyewear", price: 229, tag: "Bestseller", emoji: "🕶️", description: "Titanium frame with gradient UV-400 lenses." },
  { id: 3, name: "Linen Blazer", category: "Clothing", price: 495, tag: "", emoji: "🧥", description: "Unstructured Italian linen, summer weight." },
  { id: 4, name: "Ceramic Mug", category: "Home", price: 68, tag: "New", emoji: "☕", description: "Hand-thrown stoneware, dishwasher safe." },
  { id: 5, name: "Merino Scarf", category: "Accessories", price: 185, tag: "", emoji: "🧣", description: "Extra-fine merino, 180cm length, dip-dyed." },
  { id: 6, name: "Canvas Sneakers", category: "Footwear", price: 158, tag: "Sale", emoji: "👟", description: "Organic cotton canvas, rubber sole, unisex." },
  { id: 7, name: "Amber Perfume", category: "Beauty", price: 312, tag: "", emoji: "🌿", description: "Woody amber base, 50ml Eau de Parfum." },
  { id: 8, name: "Wool Throw", category: "Home", price: 275, tag: "Bestseller", emoji: "🛋️", description: "Herringbone weave, 100% Shetland wool." },
];

const categories = ["All", ...new Set(products.map(p => p.category))];

export default function App() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 900);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0c0b09;
          --surface: #161410;
          --card: #1a1814;
          --border: #2a2620;
          --accent: #c8a96e;
          --accent2: #8b6b3d;
          --text: #e8e0d0;
          --muted: #7a7060;
          --white: #f5f0e8;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Cormorant Garamond', Georgia, serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* NAV */
        .nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(12, 11, 9, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem;
          height: 64px;
        }
        .nav-logo {
          font-size: 1.5rem; font-weight: 600; letter-spacing: 0.18em;
          color: var(--accent); text-transform: uppercase;
          font-style: italic;
        }
        .nav-right { display: flex; align-items: center; gap: 2rem; }
        .nav-link {
          font-family: 'DM Mono', monospace; font-size: 0.72rem;
          letter-spacing: 0.12em; color: var(--muted); text-transform: uppercase;
          cursor: pointer; border: none; background: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--white); }
        .cart-btn {
          display: flex; align-items: center; gap: 0.5rem;
          font-family: 'DM Mono', monospace; font-size: 0.72rem;
          letter-spacing: 0.1em; color: var(--text); text-transform: uppercase;
          cursor: pointer; border: 1px solid var(--border); background: none;
          padding: 0.45rem 1rem; transition: all 0.2s;
        }
        .cart-btn:hover { border-color: var(--accent); color: var(--accent); }
        .cart-badge {
          background: var(--accent); color: var(--bg);
          border-radius: 50%; width: 18px; height: 18px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 600;
        }

        /* HERO */
        .hero {
          position: relative; overflow: hidden;
          min-height: 62vh; display: flex; align-items: center;
          padding: 0 2.5rem;
          border-bottom: 1px solid var(--border);
        }
        .hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 70% 50%, #2a1f0e 0%, transparent 70%),
                      radial-gradient(ellipse 40% 40% at 20% 80%, #1a1208 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-grain {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }
        .hero-content {
          position: relative; max-width: 600px;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .hero-content.visible { opacity: 1; transform: translateY(0); }
        .hero-eyebrow {
          font-family: 'DM Mono', monospace; font-size: 0.7rem;
          letter-spacing: 0.22em; color: var(--accent); text-transform: uppercase;
          margin-bottom: 1.2rem;
        }
        .hero-title {
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 300;
          line-height: 1.05; color: var(--white); margin-bottom: 1.5rem;
          font-style: italic;
        }
        .hero-title em { font-style: normal; color: var(--accent); }
        .hero-sub {
          font-size: 1.1rem; font-weight: 300; color: var(--muted);
          max-width: 420px; line-height: 1.7; margin-bottom: 2.5rem;
        }
        .hero-cta {
          display: inline-block; padding: 0.8rem 2.2rem;
          border: 1px solid var(--accent); color: var(--accent);
          font-family: 'DM Mono', monospace; font-size: 0.72rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer; background: none;
          transition: all 0.25s;
        }
        .hero-cta:hover { background: var(--accent); color: var(--bg); }

        /* CATALOG */
        .catalog { padding: 4rem 2.5rem 6rem; }
        .catalog-header {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;
        }
        .catalog-title {
          font-size: 2rem; font-weight: 300; font-style: italic; color: var(--white);
        }
        .filter-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .filter-btn {
          font-family: 'DM Mono', monospace; font-size: 0.68rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.35rem 0.9rem; border: 1px solid var(--border);
          background: none; color: var(--muted); cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover { color: var(--text); border-color: var(--muted); }
        .filter-btn.active { border-color: var(--accent); color: var(--accent); background: rgba(200,169,110,0.07); }

        /* GRID */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1.5px;
        }

        /* CARD */
        .product-card {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 2.2rem 1.8rem 1.8rem;
          cursor: pointer;
          position: relative; overflow: hidden;
          transition: border-color 0.25s;
          animation: fadeUp 0.5s both;
        }
        .product-card:hover { border-color: #3a3228; }
        .product-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.04) 0%, transparent 65%);
          opacity: 0; transition: opacity 0.3s;
          pointer-events: none;
        }
        .product-card:hover::before { opacity: 1; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-tag {
          position: absolute; top: 1.2rem; right: 1.2rem;
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.2rem 0.55rem;
        }
        .card-tag.new { background: var(--accent); color: var(--bg); }
        .card-tag.bestseller { background: transparent; border: 1px solid var(--accent); color: var(--accent); }
        .card-tag.sale { background: #7a2020; color: #ffb5b5; }

        .card-emoji { font-size: 3rem; margin-bottom: 1.5rem; display: block; }
        .card-category {
          font-family: 'DM Mono', monospace; font-size: 0.65rem;
          color: var(--muted); letter-spacing: 0.14em; text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .card-name {
          font-size: 1.45rem; font-weight: 400; color: var(--white);
          margin-bottom: 0.5rem; font-style: italic;
        }
        .card-desc {
          font-size: 0.9rem; color: var(--muted); line-height: 1.6;
          margin-bottom: 1.6rem;
        }
        .card-footer {
          display: flex; align-items: center; justify-content: space-between;
        }
        .card-price {
          font-family: 'DM Mono', monospace; font-size: 1rem;
          color: var(--accent); letter-spacing: 0.04em;
        }
        .add-btn {
          font-family: 'DM Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.45rem 1rem; border: 1px solid var(--border);
          background: none; color: var(--text); cursor: pointer;
          transition: all 0.2s;
        }
        .add-btn:hover { border-color: var(--accent); color: var(--accent); }
        .add-btn.added { border-color: var(--accent); background: var(--accent); color: var(--bg); }

        /* CART DRAWER */
        .cart-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          z-index: 200; backdrop-filter: blur(3px);
          animation: fadeIn 0.2s both;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .cart-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 400px;
          max-width: 95vw; background: var(--surface);
          border-left: 1px solid var(--border);
          z-index: 201; display: flex; flex-direction: column;
          animation: slideIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.5rem 1.8rem; border-bottom: 1px solid var(--border);
        }
        .drawer-title {
          font-size: 1.2rem; font-style: italic; font-weight: 300; color: var(--white);
        }
        .close-btn {
          background: none; border: none; color: var(--muted);
          font-size: 1.4rem; cursor: pointer; line-height: 1;
          transition: color 0.2s;
        }
        .close-btn:hover { color: var(--white); }
        .drawer-items { flex: 1; overflow-y: auto; padding: 1.2rem 1.8rem; }
        .drawer-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; height: 100%; gap: 1rem;
          color: var(--muted); font-size: 1rem; font-style: italic;
        }
        .cart-item {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 0; border-bottom: 1px solid var(--border);
        }
        .ci-emoji { font-size: 2rem; width: 48px; text-align: center; }
        .ci-info { flex: 1; }
        .ci-name { font-size: 1rem; font-style: italic; color: var(--white); margin-bottom: 0.2rem; }
        .ci-price {
          font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--accent);
        }
        .ci-qty {
          font-family: 'DM Mono', monospace; font-size: 0.7rem;
          color: var(--muted); margin-left: 0.5rem;
        }
        .ci-remove {
          background: none; border: none; color: var(--muted);
          cursor: pointer; font-size: 1rem; transition: color 0.2s;
        }
        .ci-remove:hover { color: #c05050; }
        .drawer-foot {
          padding: 1.5rem 1.8rem; border-top: 1px solid var(--border);
        }
        .total-row {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 1.2rem;
        }
        .total-label {
          font-family: 'DM Mono', monospace; font-size: 0.7rem;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted);
        }
        .total-amount {
          font-family: 'DM Mono', monospace; font-size: 1.3rem; color: var(--white);
        }
        .checkout-btn {
          width: 100%; padding: 1rem; background: var(--accent);
          color: var(--bg); border: none; cursor: pointer;
          font-family: 'DM Mono', monospace; font-size: 0.75rem;
          letter-spacing: 0.16em; text-transform: uppercase;
          transition: background 0.2s;
        }
        .checkout-btn:hover { background: #d9ba80; }

        /* MARQUEE */
        .marquee-bar {
          overflow: hidden; border-bottom: 1px solid var(--border);
          background: var(--surface); padding: 0.6rem 0;
          white-space: nowrap;
        }
        .marquee-inner {
          display: inline-block;
          animation: marquee 28s linear infinite;
          font-family: 'DM Mono', monospace; font-size: 0.68rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--muted);
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        footer {
          border-top: 1px solid var(--border); padding: 2rem 2.5rem;
          display: flex; justify-content: space-between; align-items: center;
          font-family: 'DM Mono', monospace; font-size: 0.65rem;
          color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase;
          flex-wrap: wrap; gap: 1rem;
        }

        @media (max-width: 600px) {
          .nav { padding: 0 1.2rem; }
          .hero { padding: 3rem 1.2rem; min-height: 50vh; }
          .catalog { padding: 3rem 1.2rem 4rem; }
          .catalog-header { flex-direction: column; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <span className="nav-logo">Aurum</span>
        <div className="nav-right">
          <button className="nav-link">Collections</button>
          <button className="nav-link">About</button>
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            Bag
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* MARQUEE */}
      <div className="marquee-bar">
        <span className="marquee-inner">
          {"Free shipping on orders over $250 · New arrivals every Thursday · Sustainably sourced materials · Free returns within 30 days · Free shipping on orders over $250 · New arrivals every Thursday · Sustainably sourced materials · Free returns within 30 days · "}
        </span>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <div className={`hero-content ${heroVisible ? "visible" : ""}`}>
          <p className="hero-eyebrow">Spring/Summer 2026 Collection</p>
          <h1 className="hero-title">Curated for<br /><em>those who know</em></h1>
          <p className="hero-sub">A thoughtfully assembled edit of objects worth owning. Timeless design, materials that last a lifetime.</p>
          <button className="hero-cta" onClick={() => document.querySelector('.catalog').scrollIntoView({ behavior: 'smooth' })}>
            Explore the Edit
          </button>
        </div>
      </section>

      {/* CATALOG */}
      <section className="catalog">
        <div className="catalog-header">
          <h2 className="catalog-title">The Collection</h2>
          <div className="filter-row">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >{cat}</button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="product-card"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {product.tag && (
                <span className={`card-tag ${product.tag.toLowerCase()}`}>{product.tag}</span>
              )}
              <span className="card-emoji">{product.emoji}</span>
              <div className="card-category">{product.category}</div>
              <div className="card-name">{product.name}</div>
              <div className="card-desc">{product.description}</div>
              <div className="card-footer">
                <span className="card-price">${product.price}</span>
                <button
                  className={`add-btn ${addedId === product.id ? "added" : ""}`}
                  onClick={() => addToCart(product)}
                >
                  {addedId === product.id ? "✓ Added" : "+ Add"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>© 2026 Aurum Studio</span>
        <span>Privacy · Terms · Sustainability</span>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <>
          <div className="cart-overlay" onClick={() => setCartOpen(false)} />
          <aside className="cart-drawer">
            <div className="drawer-head">
              <span className="drawer-title">Your Bag</span>
              <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            <div className="drawer-items">
              {cart.length === 0 ? (
                <div className="drawer-empty">
                  <span style={{ fontSize: "2rem" }}>◯</span>
                  <span>Your bag is empty</span>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="cart-item">
                  <span className="ci-emoji">{item.emoji}</span>
                  <div className="ci-info">
                    <div className="ci-name">{item.name}</div>
                    <div className="ci-price">
                      ${item.price}
                      <span className="ci-qty">× {item.qty}</span>
                    </div>
                  </div>
                  <button className="ci-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="drawer-foot">
                <div className="total-row">
                  <span className="total-label">Total</span>
                  <span className="total-amount">${total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout →</button>
              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
}
