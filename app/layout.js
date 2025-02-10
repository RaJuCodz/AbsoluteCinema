// "use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { MovieProvider } from "@/context/MovieContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Absolute Cinema",
  description: "Your ultimate movie destination",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen`}
      >
        <MovieProvider>
          <ErrorBoundary>
            <Navbar />
            <main className="pt-16">{children}</main>
          </ErrorBoundary>
        </MovieProvider>
      </body>
    </html>
  );
}
