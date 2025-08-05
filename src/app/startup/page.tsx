'use client';

import Link from 'next/link';

export default function StartupPage() {
  return (
    <div>

      {/* Header */}
      <header
        id="header"
        className="header fixed-top"
        style={{ backgroundColor: '#670E10', color: '#fff' }}
      >
        <div className="container d-flex justify-content-between align-items-center py-2">
          <img
            src="/assets/img/SFAC_LOGO_Edited.png"
            alt="Logo"
            className="h-12 sm:h-16 md:h-20 lg:h-24 object-contain"
          />
          <nav id="navmenu" className="navmenu">
            <ul className="d-flex gap-4 m-0 list-unstyled">
              <li><a href="#history">History</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Body with image background */}
      <main
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/img/SWASTIKA.png') center/cover no-repeat",
          minHeight: '100vh',
          paddingTop: '100px',
          paddingBottom: '80px',
        }}
      >
        <div className="container">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              color: '#ffffff',
              textShadow: '2px 2px 6px #000',
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
                backgroundColor: '#670E10',
                color: '#ffffff',
                border: 'none',
                fontSize: '1.1rem',
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
          backgroundColor: '#670E10',
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
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
