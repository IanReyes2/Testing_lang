'use client';
import Link from 'next/link';

export default function MenuPage() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-5 mb-4">Menu</h1>
      {/* menu content here */}
      <Link href="/cart">
        <button
          className="fw-bold px-4 py-2 border-0 rounded"
          style={{
            backgroundColor: '#670E10',
            color: '#fff',
          }}
        >
          Proceed to Cart
        </button>
      </Link>
    </div>
  );
}
