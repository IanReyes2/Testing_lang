"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../CartContext";
import { useHistoryContext } from "../HistoryContext";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { addOrderToHistory } = useHistoryContext();
  const [orderCode, setOrderCode] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const genCode = () => {
    const letters =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const numbers = String(Math.floor(Math.random() * 999) + 1).padStart(
      3,
      "0"
    );
    return letters + numbers;
  };

  const handleFinishOrder = () => {
    setIsPlacingOrder(true);
    const code = genCode();
    setOrderCode(code);
    addOrderToHistory({
      id: Date.now().toString(),
      code,
      items: cartItems,
      date: new Date().toLocaleString(),
    });

    clearCart();

    setTimeout(() => {
      router.push("/");
    }, 5000);
  };

  return (
    <section>
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          {/* LEFT SIDE */}
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Checkout Information
              </h1>
              <form action="" className="mt-10 flex flex-col space-y-4">
                <div className="p-2 rounded-md text-gray-700 pointer-events-none">
                  A Transaction code will be generated for 5 seconds after
                  placing your order.
                </div>
                <div className="bg-gray-100 border border-gray-300 p-2 rounded-md text-gray-700 pointer-events-none">
                  {orderCode || "Code appears here."}
                </div>
              </form>
              <button
                type="button"
                disabled={isPlacingOrder}
                className={`mt-4 inline-flex w-full items-center justify-center rounded py-2.5 px-4 text-base font-semibold tracking-wide outline-none ring-offset-2 transition sm:text-lg ${
                  isPlacingOrder
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "hover:text-opacity-100 focus:ring-2 focus:ring-teal-500"
                }`}
                onClick={handleFinishOrder}
                style={
                  !isPlacingOrder
                    ? { backgroundColor: "#670E10", color: "#fff" }
                    : {}
                }
              >
                {isPlacingOrder ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <div>
              <div className="absolute inset-0 h-full w-full bg-red-950 opacity-95"></div>
            </div>
            <div className="relative">
              <ul className="space-y-5">
                {cartItems.length === 0 ? (
                  <p className="text-white">Your cart is empty</p>
                ) : (
                  cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <div className="inline-flex items-center">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-semibold text-white">
                            {item.name}
                          </p>
                          <p className="text-sm font-medium text-white text-opacity-80">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        ₱{item.price * item.quantity}
                      </p>
                    </li>
                  ))
                )}
              </ul>

              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>

              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>
                    ₱
                    {cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
