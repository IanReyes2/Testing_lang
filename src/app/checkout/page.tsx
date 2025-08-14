"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../CartContext";
import { useHistoryContext } from "../HistoryContext";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { addOrderToHistory } = useHistoryContext();
  const [orderCode, setOrderCode] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); // for greying out button

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
    setIsPlacingOrder(true); // grey out button

    const code = genCode();
    setOrderCode(code);

    addOrderToHistory({
      id: Date.now(),
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
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Checkout Information
              </h1>
              <form action="" className="mt-10 flex flex-col space-y-4">
                <div className="p-2 rounded-md text-gray-700 pointer-events-none">
                  A Transaction code will be generated for 5 seconds after placing your order.
                </div>
                <div className="bg-gray-100 border border-gray-300 p-2 rounded-md text-gray-700 pointer-events-none">
                  {orderCode || "Code appears here."}
                </div>
              </form>
              <button
                type="button"
                disabled={isPlacingOrder} // disable after click
                className={`mt-4 inline-flex w-full items-center justify-center rounded py-2.5 px-4 text-base font-semibold tracking-wide outline-none ring-offset-2 transition sm:text-lg ${
                  isPlacingOrder
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "hover:text-opacity-100 focus:ring-2 focus:ring-teal-500"
                }`}
                onClick={handleFinishOrder}
                style={!isPlacingOrder ? { backgroundColor: "#670E10", color: "#fff" } : {}}
              >
                {isPlacingOrder ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <div>
              <div className="absolute inset-0 h-full w-full bg-red-950 opacity-95"></div>
            </div>
            <div className="relative">
              <ul className="space-y-5">
                <li className="flex justify-between">
                  <div className="inline-flex">
                    <img
                      src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=500&q=60"
                      alt=""
                      className="max-h-16"
                    />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        Nano Titanium Hair Dryer
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        Pdf, doc Kindle
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">$260.00</p>
                </li>
                <li className="flex justify-between">
                  <div className="inline-flex">
                    <img
                      src="https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=500&q=60"
                      alt=""
                      className="max-h-16"
                    />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        Luisia H35
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        Hair Dryer
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">$350.00</p>
                </li>
              </ul>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>$510.00</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
