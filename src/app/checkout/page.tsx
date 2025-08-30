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
                  A Transaction code will be generated for 5 seconds, this is
                  your order code to be displayed when claiming.
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
                {isPlacingOrder
                  ? "Processing and redirect after..."
                  : "Place Order"}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          {/* RIGHT SIDE */}
          <div className="col-span-full lg:col-span-4 flex items-center justify-center p-6">
            <div className="bg-[#670E10] rounded-lg shadow-lg w-full max-w-md h-[600px] overflow-y-auto p-4">
              <div className="bg-white rounded-lg shadow px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 mr-2"
                      src="/assets/img/SFAC_LOGO_Edited.png"
                      alt="Logo"
                    />
                    <div className="text-gray-700 font-semibold text-lg">
                      The FrancisCanteen
                    </div>
                  </div>
                </div>

                <div className="border-b-2 border-gray-300 pb-8 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Details:</h2>
                  <div className="text-gray-700">
                    <div className="text-xl">DATE: 01/05/2023</div>
                    <div className="text-xl">ORDER CODE #: INV12345</div>
                  </div>
                </div>

                <table className="w-full text-left mb-8">
                  <thead>
                    <tr>
                      <th className="text-gray-700 font-bold uppercase py-2">
                        Description
                      </th>
                      <th className="text-gray-700 font-bold uppercase py-2">
                        Quantity
                      </th>
                      <th className="text-gray-700 font-bold uppercase py-2">
                        Price
                      </th>
                      <th className="text-gray-700 font-bold uppercase py-2">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 text-gray-700">Product 1</td>
                      <td className="py-4 text-gray-700">1</td>
                      <td className="py-4 text-gray-700">$100.00</td>
                      <td className="py-4 text-gray-700">$100.00</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Product 2</td>
                      <td className="py-4 text-gray-700">2</td>
                      <td className="py-4 text-gray-700">$50.00</td>
                      <td className="py-4 text-gray-700">$100.00</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-700">Product 3</td>
                      <td className="py-4 text-gray-700">3</td>
                      <td className="py-4 text-gray-700">$75.00</td>
                      <td className="py-4 text-gray-700">$225.00</td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-end mb-8">
                  <div className="text-gray-700 mr-2">Subtotal:</div>
                  <div className="text-gray-700">$425.00</div>
                </div>

                <div className="text-right mb-8">
                  <div className="text-gray-700 mr-2">Tax:</div>
                  <div className="text-gray-700">$25.50</div>
                </div>

                <div className="flex justify-end mb-8">
                  <div className="text-gray-700 mr-2">Total:</div>
                  <div className="text-gray-700 font-bold text-xl">$450.50</div>
                </div>

                <div className="border-t-2 border-gray-300 pt-8 mb-8">
                  <div className="text-gray-700 mb-2">
                    Any concerns must be reported to the canteen manager.
                  </div>
                  <div className="text-gray-700 mb-2">
                    This is only appplicable for cafeteria operations.
                  </div>
                  <div className="text-gray-700">
                    Saint Francis of Assisi College (SFAC) Las Piñas campus, #47 Admiral Village, Talon 3, Las Piñas City, 1740.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
