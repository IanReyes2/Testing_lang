"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../CartContext";
import { useHistoryContext } from "../HistoryContext";
import { useState } from "react";
import Image from "next/image";
import { API_URL } from "../../../config";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { addOrderToHistory } = useHistoryContext();

  const [orderCode, setOrderCode] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [snapshotCart, setSnapshotCart] = useState<typeof cartItems>([]);
  const [receiptTotal, setReceiptTotal] = useState<number>(0);

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

 const handleFinishOrder = async () => {
  if (isPlacingOrder || showReceipt) return;
  setIsPlacingOrder(true);

  try {
    // Generate order code and timestamp
    const code = genCode();
    const dateStr = new Date().toISOString();

    // Snapshot cart items
    const itemsSnapshot = cartItems.map((it) => ({
      ...it,
      price: Number(it.price),
      quantity: it.quantity || 1,
    }));
    const total = itemsSnapshot.reduce(
      (sum, it) => sum + Number(it.price) * (it.quantity || 1),
      0
    );

    if (itemsSnapshot.length === 0) throw new Error("Cart is empty");

    // Persist to state for receipt
    setOrderCode(code);
    setOrderDate(dateStr);
    setSnapshotCart(itemsSnapshot);
    setReceiptTotal(total);
    setShowReceipt(true);

    // Prepare payload for backend
    const payload = {
      customerName: "Kiosk",
      customer: "kiosk",
      orderCode: code,
      total,
      orderType: "kiosk",
      tableNumber: null,
      items: itemsSnapshot.map((item) => ({
        name: item.name,
        unitPrice: item.price,
        qty: item.quantity,
      })),
    };

    // Validate payload items
    for (const it of payload.items) {
      if (
        typeof it.name !== "string" ||
        typeof it.unitPrice !== "number" ||
        typeof it.qty !== "number"
      ) {
        throw new Error(
          "Each item must have name (string), unitPrice (number), qty (number)"
        );
      }
    }

    // Send order to backend
    const response = await fetch(`${API_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const resText = await response.text();
      throw new Error(`Failed to send order to backend: ${resText}`);
    }

    const data = await response.json();
    console.log("Order successfully sent to backend:", data);

    // Save to history context
    addOrderToHistory({
      id: Date.now().toString(),
      code,
      items: itemsSnapshot,
      date: dateStr,
    });

    clearCart();
    await new Promise((res) => setTimeout(res, 10000));
    router.push("/startup");
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(`Failed to place order: ${err.message}`);
    } else {
      alert(`Failed to place order: ${String(err)}`);
    }
    setIsPlacingOrder(false);
  }
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
                  A Transaction code will be generated for 5 seconds once you
                  place the order. You will be redirected after.
                </div>

                <div className="bg-gray-100 border border-gray-300 p-2 rounded-md text-gray-700 pointer-events-none">
                  {orderCode || "Code appears here."}
                </div>
              </form>

              <button
                type="button"
                disabled={isPlacingOrder || showReceipt}
                className={`mt-4 inline-flex w-full items-center justify-center rounded py-2.5 px-4 text-base font-semibold tracking-wide outline-none ring-offset-2 transition sm:text-lg ${
                  isPlacingOrder || showReceipt
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "hover:text-opacity-100 focus:ring-2 focus:ring-teal-500"
                }`}
                onClick={handleFinishOrder}
                style={
                  !(isPlacingOrder || showReceipt)
                    ? { backgroundColor: "#670E10", color: "#fff" }
                    : {}
                }
              >
                {isPlacingOrder || showReceipt ? "Order Placed" : "Place Order"}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-full lg:col-span-4 flex items-center justify-center p-6">
            <div className="bg-[#670E10] rounded-lg shadow-lg w-full max-w-md h-[600px] overflow-y-auto p-4">
              <div className="bg-white rounded-lg shadow px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 mr-2"
                      src="/assets/img/SFAC_LOGO_Edited.png"
                      alt="Logo"
                    />
                    <div className="text-gray-700 font-semibold text-lg">
                      THE FRANCISCanteen
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="border-b-2 border-gray-300 pb-8 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Details:</h2>
                  {showReceipt ? (
                    <div className="text-gray-700 space-y-1">
                      <div className="text-xl">DATE: {orderDate}</div>
                      <div className="text-xl">ORDER CODE #: {orderCode}</div>
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      Receipt will appear here after you place the order.
                    </div>
                  )}
                </div>

                {/* Items Table */}
                {showReceipt && (
                  <>
                    <table className="w-full text-left mb-8">
                      <thead>
                        <tr>
                          <th className="text-gray-700 font-bold uppercase py-2">
                            Description
                          </th>
                          <th className="text-gray-700 font-bold uppercase py-2">
                            Qty
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
                        {snapshotCart.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-4 text-gray-700">
                              <div className="flex items-center">
                                {item.image && (
                                  <div className="relative w-10 h-10 mr-2 flex-shrink-0">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover rounded"
                                    />
                                  </div>
                                )}
                                <span>{item.name}</span>
                              </div>
                            </td>
                            <td className="py-4 text-gray-700">
                              {item.quantity || 1}
                            </td>
                            <td className="py-4 text-gray-700">
                              ₱{Number(item.price).toFixed(2)}
                            </td>
                            <td className="py-4 text-gray-700">
                              ₱
                              {(
                                Number(item.price) * (item.quantity || 1)
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end mb-8">
                      <div className="text-gray-700 mr-2">Total:</div>
                      <div className="text-gray-700 font-bold text-xl">
                        ₱{receiptTotal.toFixed(2)}
                      </div>
                    </div>
                  </>
                )}

                {/* Footer Notes */}
                <div className="border-t-2 border-gray-300 pt-8 mb-0">
                  <div className="text-gray-700 mb-2">
                    Any concerns must be reported to the canteen manager.
                  </div>
                  <div className="text-gray-700 mb-2">
                    This is only applicable for cafeteria operations.
                  </div>
                  <div className="text-gray-700">
                    Saint Francis of Assisi College (SFAC) Las Piñas campus, #47
                    Admiral Village, Talon 3, Las Piñas City, 1740.
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
