"use client";
import Link from "next/link";
import { useCart } from "../CartContext";
import { useState } from "react";

export default function MenuPage() {
  const { addToCart } = useCart();
  const [clickedButtons, setClickedButtons] = useState<{
    [key: number]: boolean;
  }>({});

  const menuItems = [
    {
      id: 1,
      name: "The Catalyzer",
      price: 89,
      image: "/assets/img/SWASTIKA.png",
    },
    {
      id: 2,
      name: "Shooting Stars",
      price: 99,
      image: "/assets/img/SWASTIKA.png",
    },
    { id: 3, name: "Neptune", price: 79, image: "/assets/img/SWASTIKA.png" },
    {
      id: 4,
      name: "The 400 Blows",
      price: 109,
      image: "/assets/img/SWASTIKA.png",
    },
    {
      id: 5,
      name: "The Catalyzer",
      price: 89,
      image: "/assets/img/SWASTIKA.png",
    },
    {
      id: 6,
      name: "Shooting Stars",
      price: 99,
      image: "/assets/img/SWASTIKA.png",
    },
    { id: 7, name: "Neptune", price: 79, image: "/assets/img/SWASTIKA.png" },
    {
      id: 8,
      name: "The 400 Blows",
      price: 109,
      image: "/assets/img/SWASTIKA.png",
    },
  ];

  const handleAddToCart = (item: any) => {
    addToCart({ ...item, quantity: 1 });
    setClickedButtons((prev) => ({ ...prev, [item.id]: true }));

    // ito yung sa time kung gano kabilis mag change color
    setTimeout(() => {
      setClickedButtons((prev) => ({ ...prev, [item.id]: false }));
    }, 500);
  };

  return (
    <div className="container text-center pt-[120px] pb-5">
      <h1 className="display-5 mb-8">Menu</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <h2>{item.name}</h2>
            <p>₱{item.price}</p>
            <button
              onClick={() => handleAddToCart(item)}
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
