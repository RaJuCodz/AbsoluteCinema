"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useMovieContext } from "@/context/MovieContext";
import SearchBar from "./SearchBar";
import { ChevronDown } from "lucide-react";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { handleGenreSelect } = useMovieContext();
  const [showGenres, setShowGenres] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/trending", label: "Trending" },
    { href: "/movies", label: "Movies" },
    { href: "/tvshows", label: "TV Shows" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur-sm border-b border-zinc-800/10 z-50 transition-colors duration-300 ${
        scrolled ? "bg-zinc-900/90" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            // className="text-xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            <Image src="/logo.jpg" alt="logo" width={55} height={55} />
            {/* AbsoluteCinema */}
          </Link>

          <div className="flex items-center gap-6">
            <SearchBar />
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    pathname === link.href
                      ? "text-yellow-500"
                      : "text-zinc-100 hover:text-yellow-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-zinc-100 hover:text-yellow-400 transition-colors"
                  onClick={() => setShowGenres(!showGenres)}
                >
                  Genres
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showGenres && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-xl border border-zinc-800 py-2">
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => {
                          handleGenreSelect(genre);
                          setShowGenres(false);
                        }}
                        className="w-full text-left px-4 py-2 text-zinc-100 hover:bg-zinc-800 hover:text-yellow-400 transition-colors"
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
