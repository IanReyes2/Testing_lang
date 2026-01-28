"use client";
import Link from "next/link";
import Image from "next/image";

export default function StartupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header
        id="header"
        className="fixed top-0 left-0 right-0 z-20"
        style={{ backgroundColor: "#670E10", color: "#fff" }}
      >
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          <Image
            src="/assets/img/SENG.png"
            alt="Logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <nav>
            <ul className="flex gap-4 list-none m-0">
              <li>
                <Link href="/history" className="hover:underline">
                 Order History
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Body */}
      <main
        className="flex flex-col items-center justify-center text-center flex-grow text-white"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/img/paper-texture.jpg') center/cover no-repeat",
          paddingTop: "100px", 
          paddingBottom: "80px", 
        }}
      >
        {/* Hero Logo */}
        <div className="mb-6">
          <Image
            src="/assets/img/SFAC_LOGO_Edited.png"
            alt="Big Logo"
            width={250}
            height={250}
            className="mx-auto object-contain"
          />
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
          style={{
            color: "#ffffff",
            textShadow: "2px 2px 6px #000",
          }}
        >
          THE FRANCISCanteen
        </h1>

        <h2 className="text-lg sm:text-xl md:text-2xl mb-6">
          Your Everyday Food Pal.
        </h2>

        {/* Start Ordering Button */}
        <Link href="/menu">
          <button
            className="fw-bold px-5 py-2 rounded shadow-md"
            style={{
              backgroundColor: "#670E10",
              color: "#ffffff",
              border: "none",
              fontSize: "1.1rem",
            }}
          >
            Start Ordering
          </button>
        </Link>
      </main>

      {/* Footer */}
      <footer
        id="footer"
        className="footer text-white py-2"
        style={{
          backgroundColor: "#670E10",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <div className="container">
          <p className="text-center m-0">
            Copyright © {new Date().getFullYear()} - All rights reserved by Saint
            Francis of Assisi College Las Piñas Campus.
          </p>
        </div>
      </footer>
    </div>
  );
}