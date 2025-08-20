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
  image?: string; // in case your DB has an image column later
};

export default function MenuPage() {
  const { addToCart } = useCart();
  const [clickedButtons, setClickedButtons] = useState<{ [key: number]: boolean }>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error("❌ Failed to load menu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const handleAddToCart = (item: CartItem) => {
    addToCart({ ...item, quantity: 1 });
    setClickedButtons((prev) => ({ ...prev, [item.id]: true }));

    setTimeout(() => {
      setClickedButtons((prev) => ({ ...prev, [item.id]: false }));
    }, 500);
  };

  if (loading) return <p className="text-center mt-10">Loading menu...</p>;

  return (
    <div className="container text-center pt-[120px] pb-5">
      <h1 className="display-5 mb-8">Menu</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow p-4 flex flex-col justify-between h-full"
          >
            <div>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={item.image || "/assets/img/default.jpg"} // fallback image
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                />
              </div>
              <h2 className="mb-2">{item.name}</h2>
              <p className="mb-4">₱{item.price}</p>
            </div>
            <button
              onClick={() => handleAddToCart(item as CartItem)}
              disabled={clickedButtons[item.id]}
              className="fw-bold px-4 py-2 border-0 rounded transition-colors duration-300"
              style={{
                backgroundColor: clickedButtons[item.id] ? "#999" : "#670E10",
                color: "#fff",
                cursor: clickedButtons[item.id] ? "not-allowed" : "pointer",
              }}
            >
              {clickedButtons[item.id] ? "Added!" : "Add to cart"}
            </button>
          </div>
        ))}
      </div>

      <header
        id="header"
        className="header fixed-top"
        style={{ backgroundColor: "#670E10", color: "#fff" }}
      >
        <div className="container d-flex justify-content-between align-items-center py-2">
          <Link href="/startup">
            <div className="relative h-12 sm:h-16 md:h-20 lg:h-24 w-auto">
              <Image
                src="/assets/img/SFAC_LOGO_Edited.png"
                alt="Logo"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
          </Link>
          <nav id="navmenu" className="navmenu">
            <li>
              <ul className="d-flex gap-4 m-0 list-unstyled">
                <Link href="history">History</Link>
              </ul>
            </li>
          </nav>
        </div>
      </header>

      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6">
        <Link href="/cart">
          <button
            className="fw-bold px-4 py-2 border-0 rounded"
            style={{
              backgroundColor: "#670E10",
              color: "#fff",
            }}
          >
            Proceed to cart
          </button>
        </Link>
      </div>
    </div>
  );
}
