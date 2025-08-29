"use client";
import { useCart } from "../CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image"; // ✅ use next/image

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const handleLogoClick = () => {
    clearCart();
    router.push("/startup");
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="mb-4 text-lg">Your cart is empty</p>
          <Link href="/menu">
            <button
              className="fw-bold px-4 py-2 border-0 rounded"
              style={{ backgroundColor: "#670E10", color: "#fff" }}
            >
              Go Back to Menu
            </button>
          </Link>
        </div>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Item info */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <span className="text-base sm:text-lg">{item.name}</span>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span className="text-base">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>

            {/* Price */}
            <span className="font-medium text-base sm:text-lg">
              ₱{item.price * item.quantity}
            </span>

            {/* Remove button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-0 sm:ml-4 px-3 py-1 text-white rounded"
              style={{ backgroundColor: "#670E10" }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      {/* Header */}
      <header
        id="header"
        className="header fixed-top w-full"
        style={{ backgroundColor: "#670E10", color: "#fff" }}
      >
        <div className="container flex justify-between items-center py-2">
          <div
            className="relative h-10 w-32 sm:h-12 sm:w-40 md:h-16 md:w-48 cursor-pointer"
            onClick={handleLogoClick}
          >
            <Image
              src="/assets/img/SFAC_LOGO_Edited.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <nav id="navmenu" className="navmenu">
            <ul className="flex gap-4 m-0 list-none">
              <li>
                <Link href="history">History</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <div className="fixed left-0 right-0 w-full flex justify-center pb-6 bottom-0 space-x-4">
          <Link href="/menu">
            <button
              className="fw-bold px-6 py-3 border-0 rounded text-base sm:text-lg"
              style={{ backgroundColor: "#670E10", color: "#fff" }}
            >
              BACK TO MENU
            </button>
          </Link>
          <Link href="/checkout">
            <button
              className="fw-bold px-6 py-3 border-0 rounded text-base sm:text-lg"
              style={{ backgroundColor: "#670E10", color: "#fff" }}
            >
              GO TO CHECKOUT
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
