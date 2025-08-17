"use client";
import Link from "next/link";
import Image from "next/image";

export default function StartupPage() {
  return (
    <div>
      {/* Header */}
      <header
        id="header"
        className="header fixed-top"
        style={{ backgroundColor: "#670E10", color: "#fff" }}
      >
        <div className="relative w-full h-64 md:h-96">
          <Image
            src="/assets/img/SFAC_LOGO_Edited.png"
            alt="logo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <nav id="navmenu" className="navmenu">
            <li>
              <ul className="d-flex gap-4 m-0 list-unstyled">
                <Link href="history">History</Link>
              </ul>
            </li>
          </nav>
        </div>
      </header>

      {/* Body with image background */}
      <main
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/img/paper-texture.jpg') center/cover no-repeat",
          minHeight: "100vh",
          paddingTop: "100px",
          paddingBottom: "80px",
        }}
      >
        <div className="container">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              color: "#ffffff",
              textShadow: "2px 2px 6px #000",
            }}
          >
            THE FRANCISCanteen
          </h1>

          <h2 className="lead text-white mb-4">Your Everyday Food Pal.</h2>

          {/* Start Ordering Button */}
          <Link href="/menu">
            <button
              className="fw-bold px-5 py-2"
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
        </div>
      </main>

      {/* Footer */}
      <footer
        id="footer"
        className="footer text-white py-3"
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
            Saint Francis of Assisi College. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
