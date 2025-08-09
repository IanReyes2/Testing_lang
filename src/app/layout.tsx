import './globals.css';
import { CartProvider } from './CartContext';

export const metadata = {
  title: 'The FrancisCanteen :)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Template CSS Files */}
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/aos/aos.css" />
        <link rel="stylesheet" href="/assets/vendor/glightbox/css/glightbox.min.css" />
        <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>

        {/* Template JS Files */}
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/vendor/php-email-form/validate.js"></script>
        <script src="/assets/vendor/aos/aos.js"></script>
        <script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
        <script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
        <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
        <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="/assets/js/main.js"></script>
      </body>
    </html>
  );
}
