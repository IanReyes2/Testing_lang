"use client";
import Link from "next/link";
import { useCart } from "../CartContext";
import { useState, useEffect } from "react";
import { CartItem } from "../CartContext";
import Image from "next/image";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string; // 
};

export default function MenuPage() {
  const { addToCart, cartItems } = useCart();
  const [clickedButtons, setClickedButtons] = useState<{
    [key: number]: boolean;
  }>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string | null>(null); 
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const hostname = window.location.hostname;
        const port = 3000;
        const baseUrl = `http://${hostname}:${port}`;

        const url = category
          ? `${baseUrl}/api/menu?category=${category}`
          : `${baseUrl}/api/menu`;

        const res = await fetch(url);
        const json = await res.json();

        // ✅ Make sure we always have an array
        const data: MenuItem[] = Array.isArray(json) ? json : json.data || [];

        const imgRes = await fetch("/api/menu-images");
        const images = await imgRes.json();

        const merged = data.map((item: MenuItem) => ({
          ...item,
          image: images[item.id] || "/assets/img/default.jpg",
        }));

        setMenuItems(merged);
      } catch (err) {
        console.error("Failed to load menu:", err);
        setMenuItems([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [category]);

  const handleAddToCart = (item: CartItem) => {
    addToCart({ ...item, quantity: 1 });
    setClickedButtons((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setClickedButtons((prev) => ({ ...prev, [item.id]: false }));
    }, 500);
  };

  if (loading) return <p className="text-center mt-10">Loading menu...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#670E10] text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-red-800">
          THE FRANCISCanteen
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {/* ✅ Category filters */}
          <button
            onClick={() => setCategory(null)}
            className={`block w-full text-left px-4 py-2 rounded ${
              category === null ? "bg-red-800" : "hover:bg-red-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategory("breakfast")}
            className={`block w-full text-left px-4 py-2 rounded ${
              category === "breakfast" ? "bg-red-800" : "hover:bg-red-800"
            }`}
          >
            Breakfast
          </button>
          <button
            onClick={() => setCategory("lunch")}
            className={`block w-full text-left px-4 py-2 rounded ${
              category === "lunch" ? "bg-red-800" : "hover:bg-red-800"
            }`}
          >
            Lunch
          </button>
          <button
            onClick={() => setCategory("drinks")}
            className={`block w-full text-left px-4 py-2 rounded ${
              category === "drinks" ? "bg-red-800" : "hover:bg-red-800"
            }`}
          >
            Drinks
          </button>

          <Link
            href="/history"
            className="block px-4 py-2 rounded hover:bg-red-800"
          >
            History
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-8">Menu</h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden shadow p-4 flex flex-col justify-between h-full bg-white"
            >
              <div>
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={item.image || "/assets/img/default.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           25vw"
                  />
                </div>
                <h2 className="mb-2 text-lg font-medium">{item.name}</h2>
                <p className="mb-4 text-gray-700">₱{item.price}</p>
              </div>
              <button
                onClick={() => handleAddToCart(item as CartItem)}
                disabled={clickedButtons[item.id]}
                className={`fw-bold px-4 py-2 border-0 rounded transition-colors duration-300 ${
                  clickedButtons[item.id]
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#670E10] hover:bg-red-800"
                } text-white`}
              >
                {clickedButtons[item.id] ? "Added!" : "Add to cart"}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Buttons - Centered */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-2 space-x-4 bg-gray-50">
  <Link href="/startup">
    <button className="fw-bold px-6 py-2 border-0 rounded bg-red-900 hover:bg-red-600 text-white">
      BACK TO HOMEPAGE
    </button>
  </Link>

  {/* Patched Proceed to Cart button */}
  <Link href="/cart">
    <button
      type="button"
      disabled={cartItems.length === 0} // ✅ disable if cart is empty
      className={`relative inline-flex items-center text-sm font-medium text-center fw-bold px-6 py-2 border-0 rounded ${
        cartItems.length === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-900 hover:bg-red-600"
      } text-white`}
    >
      <span className="sr-only">Notifications</span>
      CHECK / PROCEED TO CART
      {cartItems.length > 0 && (
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
          {cartItems.length}
        </div>
      )}
    </button>
  </Link>
</div>
      </main>
    </div>
  );
}
