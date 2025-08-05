'use client';

import Link from 'next/link';

export default function MenuPage() {
  const menuItems = [
    { title: 'The Catalyzer', price: '₱89', image: '/assets/img/SWASTIKA.png' },
    { title: 'Shooting Stars', price: '₱99', image: '/assets/img/SWASTIKA.png' },
    { title: 'Neptune', price: '₱79', image: '/assets/img/SWASTIKA.png' },
    { title: 'The 400 Blows', price: '₱109', image: '/assets/img/SWASTIKA.png' },
    { title: 'The Catalyzer', price: '₱89', image: '/assets/img/SWASTIKA.png' },
    { title: 'Shooting Stars', price: '₱99', image: '/assets/img/SWASTIKA.png' },
    { title: 'Neptune', price: '₱79', image: '/assets/img/SWASTIKA.png' },
    { title: 'The 400 Blows', price: '₱109', image: '/assets/img/SWASTIKA.png' },
  ];

  return (
    <div className="container text-center pt-[120px] pb-5">
      <h1 className="display-5 mb-4">Menu</h1>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {menuItems.map((item, index) => (
              <div key={index} className="lg:w-1/5 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt={item.title}
                    className="object-cover object-center w-full h-full block"
                    src={item.image}
                  />
                </a>
                <div className="mt-3">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                  <p className="mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceed to Cart Button */}
      <Link href="/cart">
        <button
          className="fw-bold px-5 py-2"
          style={{
            backgroundColor: '#670E10',
            color: '#ffffff',
            border: 'none',
            fontSize: '1.1rem',
          }}
        >
          Proceed to Cart
        </button>
      </Link>
    </div>
  );
}
