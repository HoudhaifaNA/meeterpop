import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProgressBar from "./progress-bar";
import RoutingManager from "./routing-manager";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meeterpop",
  description: "Your best Paincall app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ProgressBar />
        <ToastContainer />
        <RoutingManager>
          <Header />
          {children}
          <Footer />
        </RoutingManager>
      </body>
    </html>
  );
}
