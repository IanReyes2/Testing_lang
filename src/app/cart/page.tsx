"use client";
import { useCart } from "../CartContext";
import Link from "next/link";

export default function CartPage() {
const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="mb-4 text-lg">Your cart is empty</p>
          <Link href="/menu">
            <button
              className="fw-bold px-4 py-2 border-0 rounded"
              style={{
                backgroundColor: "#670E10",
                color: "#fff",
              }}
            >
              Go Back to Menu
            </button>
          </Link>
        </div>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 mb-4 flex items-center justify-between"
          >
            {/* yung itsura ng item */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />
              <span>{item.name}</span>
            </div>

            {/* add or minus items to */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            {/* para makita kung magkano inorder mo */}
            <span>₱{item.price * item.quantity}</span>

            {/* Remove item to */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 px-3 py-1 text-white rounded"
              style={{ backgroundColor: "#670E10" }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      {/* yung kulay red sa tuktok*/}
      <header
        id="header"
        className="header fixed-top"
        style={{ backgroundColor: "#670E10", color: "#fff" }}
      >
        <div className="container d-flex justify-content-between align-items-center py-2">
          <img
            src="/assets/img/SFAC_LOGO_Edited.png"
            alt="Logo"
            className="h-12 sm:h-16 md:h-20 lg:h-24 object-contain"
          />
          <nav id="navmenu" className="navmenu">
            <ul className="d-flex gap-4 m-0 list-unstyled">
              <li>
                <a href="#history">History</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <div className="fixed left-0 right-0 w-full flex justify-center pb-6">
          <Link href="/checkout">
            <button
              className="fw-bold px-4 py-2 border-0 rounded"
              style={{
                backgroundColor: "#670E10",
                color: "#fff",
              }}
            >
              CHECK MO NA HAHAHAHAHAAHAHA
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
