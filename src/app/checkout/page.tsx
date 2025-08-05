'use client';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  const handleCheckout = () => {
    // process checkout logic here
    router.push('/');
  };

  return (
    <div className="container text-center py-5">
      <h1 className="display-5 mb-4">Checkout</h1>
      {/* checkout details here */}
      <button
        onClick={handleCheckout}
        className="fw-bold px-4 py-2 border-0 rounded"
        style={{
          backgroundColor: '#670E10', 
          color: '#fff',
        }}
      >
        Finish Order
      </button>
    </div>
  );
}
