'use client';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  const handleCheckout = () => {
    // process checkout logic here
    router.push('/');
  };

  return (
    <section>
<div
      // wrapper div holds the background image
      className="text-gray-600 body-font"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/img/gallery/gallery-1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        paddingBottom: '140px' 
      }}
    >
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            ROOF PARTY POLAROID
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Master Cleanse Reliac Heirloom
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify,
            subway tile poke farm-to-table. Franzen you probably haven't heard of them
            man bun deep jianbing selfies heirloom prism food truck ugh squid celiac
            humblebrag.
          </p>
        </div>
        <div className="flex flex-wrap">
          {/* Column 1 */}
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Shooting Stars
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon
              disrupt edison bulbche.
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              The Catalyzer
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon
              disrupt edison bulbche.
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Neptune
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon
              disrupt edison bulbche.
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Melanchole
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon
              disrupt edison bulbche.
            </p>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6">
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
      </div>
          </div>
    </section>
  );
}
