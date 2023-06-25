// These styles apply to every route in the application
import Navbar from "./Navbar";
import Footer from "./Footer";

import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function Layout({ children }: any) {
  return (
    <main className={`${montserrat.className} bg-white text-blacktext dark:bg-background`}>
      <Navbar />
      <main className="py-32 container mx-auto px-4 sm:px-0">
        {children}
      </main>
      <Footer />
    </main>
  );
}
