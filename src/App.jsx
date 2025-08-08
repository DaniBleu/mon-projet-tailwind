// AfroChinaConnectStarter.jsx
// Single-file React + Tailwind starter (preview-ready component).
// Drop into a React app (Vite / Create React App / Next.js) and ensure Tailwind is configured.

import React, { useState } from "react";

// Mock data
const PRODUCTS = [
  { id: 1, name: "Doudoune Jaune", price: 15000, img: "https://placehold.co/400x400/ffd166/000?text=Doudoune" },
  { id: 2, name: "Ecouteurs Bluetooth", price: 3000, img: "https://placehold.co/400x400/ef476f/fff?text=Ecouteurs" },
  { id: 3, name: "Sac à main", price: 3000, img: "https://placehold.co/400x400/06d6a0/000?text=Sac" },
  { id: 4, name: "Montre Connectée", price: 13000, img: "https://placehold.co/400x400/118ab2/fff?text=Montre" },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState({ name: "home" });

  function addToCart(product) {
    setCart((c) => {
      const found = c.find((x) => x.id === product.id);
      if (found) return c.map((x) => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((c) => c.filter((x) => x.id !== productId));
  }

  function changeQty(productId, qty) {
    setCart((c) => c.map((x) => x.id === productId ? { ...x, qty } : x));
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header cartCount={cart.reduce((s, i) => s + i.qty, 0)} onNavigate={setView} />
      <main className="container mx-auto px-4 py-8">
        {view.name === "home" && (
          <>
            <Hero />
            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Produits en vedette</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCTS.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} onView={() => setView({ name: 'product', product: p })} />
                ))}
              </div>
            </section>
          </>
        )}

        {view.name === "product" && (
          <ProductPage product={view.product} onAdd={addToCart} onBack={() => setView({ name: 'home' })} />
        )}

        {view.name === "cart" && (
          <CartPage cart={cart} onRemove={removeFromCart} onChangeQty={changeQty} onCheckout={() => setView({ name: 'checkout' })} />
        )}

        {view.name === "checkout" && (
          <CheckoutPage cart={cart} onBack={() => setView({ name: 'cart' })} onPlaceOrder={() => { alert('Commande simulée — intégrez un backend et une API de paiement'); setCart([]); setView({ name: 'home' }); }} />
        )}
      </main>
      <Footer />
    </div>
  );
}

function Header({ cartCount, onNavigate }) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center text-white font-bold">AC</div>
          <div>
            <div className="font-bold">AfroChina Connect</div>
            <div className="text-sm text-gray-500">Produits chinois — livrés localement</div>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <button className="text-sm hover:underline" onClick={() => onNavigate({ name: 'home' })}>Accueil</button>
          <button className="text-sm hover:underline" onClick={() => onNavigate({ name: 'home' })}>Boutique</button>
          <button className="relative" onClick={() => onNavigate({ name: 'cart' })}>
            <span className="px-3 py-2 bg-gray-100 rounded">Panier</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="rounded-lg bg-yellow-50 p-6 md:flex md:items-center md:gap-6">
      <div className="md:flex-1">
        <h1 className="text-3xl md:text-4xl font-bold">Achetez des produits chinois en toute confiance</h1>
        <p className="mt-2 text-gray-700">Mode, gadgets, accessoires — sélection validée et livraison locale rapide.</p>
        <div className="mt-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded shadow" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>Voir la boutique</button>
        </div>
      </div>
      <div className="mt-6 md:mt-0 md:flex-1 flex justify-center">
        <img src="https://placehold.co/400x400/ffd166/000?text=Produit+Vedette" alt="Vedette" className="w-60 h-60 object-cover rounded-lg shadow" />
      </div>
    </section>
  );
}

function ProductCard({ product, onAdd, onView }) {
  return (
    <article className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
      <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <div className="text-gray-700 mt-1">FCFA {product.price.toLocaleString()}</div>
      <div className="mt-3 flex gap-2">
        <button className="flex-1 bg-red-600 text-white py-2 rounded" onClick={() => onAdd(product)}>Ajouter</button>
        <button className="flex-1 border border-gray-200 py-2 rounded" onClick={onView}>Voir</button>
      </div>
    </article>
  );
}

function ProductPage({ product, onAdd, onBack }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <img src={product.img} alt={product.name} className="w-full h-96 object-cover rounded" />
      </div>
      <div>
        <button className="text-sm text-gray-500 mb-4" onClick={onBack}>← Retour</button>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="mt-2 text-gray-700">Prix: <strong>FCFA {product.price.toLocaleString()}</strong></p>
        <p className="mt-4 text-gray-600">Description courte du produit. Ici tu peux ajouter les détails, matériaux, tailles, etc.</p>
        <div className="mt-6">
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => onAdd(product)}>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
}

function CartPage({ cart, onRemove, onChangeQty, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-2xl font-semibold mb-4">Panier</h2>
      {cart.length === 0 && <div>Votre panier est vide.</div>}
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-4 py-3 border-b">
          <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1">
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-600">FCFA {item.price.toLocaleString()}</div>
            <div className="mt-2 flex items-center gap-2">
              <input type="number" min="1" value={item.qty} onChange={(e) => onChangeQty(item.id, Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
              <button className="text-sm text-red-600" onClick={() => onRemove(item.id)}>Retirer</button>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <div className="text-lg font-semibold">Total : FCFA {total.toLocaleString()}</div>
        <div>
          <button className="bg-gray-200 px-4 py-2 rounded mr-2" onClick={() => alert('Continuer les achats')}>Continuer</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={onCheckout}>Commander</button>
        </div>
      </div>
    </div>
  );
}

function CheckoutPage({ cart, onBack, onPlaceOrder }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="max-w-2xl bg-white rounded-lg p-6 shadow">
      <h2 className="text-2xl font-semibold mb-4">Paiement</h2>
      <label className="block mb-2 text-sm">Nom complet</label>
      <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Nom et prénom" />
      <label className="block mb-2 text-sm">Adresse de livraison</label>
      <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Ville, quartier, téléphone" />
      <label className="block mb-2 text-sm">Moyen de paiement</label>
      <select className="w-full border rounded px-3 py-2 mb-4">
        <option>Mobile Money</option>
        <option>Carte bancaire</option>
        <option>PayPal</option>
      </select>

      <div className="flex justify-between items-center mt-4">
        <button className="bg-gray-200 px-4 py-2 rounded" onClick={onBack}>Retour</button>
        <div>
          <div className="text-sm">Total à payer</div>
          <div className="text-xl font-bold">FCFA {total.toLocaleString()}</div>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={onPlaceOrder}>Payer</button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-600">© {new Date().getFullYear()} AfroChina Connect — Tous droits réservés</div>
    </footer>
  );
}
