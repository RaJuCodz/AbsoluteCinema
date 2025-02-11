"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useMovieContext } from "@/context/MovieContext";
import SearchBar from "./SearchBar";
import { ChevronDown, Menu, X } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowGenres(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/trending", label: "Trending" },
    { href: "/movies", label: "Movies" },
    { href: "/tvshows", label: "TV Shows" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur-sm border-b border-zinc-800/10 z-50 transition-colors duration-300 ${
        scrolled || isMobileMenuOpen ? "bg-zinc-900/90" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.jpg" alt="logo" width={55} height={55} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="py-4 space-y-4">
            <SearchBar />
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    pathname === link.href
                      ? "bg-yellow-500 text-zinc-900"
                      : "text-zinc-100 hover:bg-zinc-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 py-2">
                <button
                  className="flex items-center justify-between w-full text-zinc-100"
                  onClick={() => setShowGenres(!showGenres)}
                >
                  Genres
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showGenres ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-2 space-y-1 transition-all duration-200 ${
                    showGenres ? "max-h-96" : "max-h-0 overflow-hidden"
                  }`}
                >
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => {
                        handleGenreSelect(genre);
                        setIsMobileMenuOpen(false);
                        setShowGenres(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg text-zinc-100 hover:bg-zinc-800 hover:text-yellow-400 transition-colors"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
