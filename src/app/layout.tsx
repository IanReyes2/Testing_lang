import Script from "next/script";
import './globals.css';
import { CartProvider } from './CartContext';
import { HistoryProvider } from "../app/HistoryContext";
import 'bootstrap/dist/css/bootstrap.min.css';


// ✅ Add these imports instead of <link> tags
import '../../styles/main.css';
import '../../styles/vendor/bootstrap-icons.css';
import '../../styles/vendor/aos.css';
import '../../styles/vendor/glightbox.min.css';
import '../../styles/vendor/swiper-bundle.min.css';

export const metadata = {
  title: 'The FrancisCanteen :)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
     <html lang="en">
      <head>
        {/* Template CSS Files - removed <link>, now handled by imports */}
      </head>
      <body>
        <CartProvider>
          <HistoryProvider>
            {children}
          </HistoryProvider>
        </CartProvider>

        {/* Template JS Files */}
        <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/php-email-form/validate.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/aos/aos.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/glightbox/js/glightbox.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
