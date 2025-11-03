import { Instagram, Mail, Menu, Twitter, X } from "lucide-react";
import React from "react";

function Navbar({ mobileMenuOpen, setMobileMenuOpen, smoothScrollTo, router }) {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4 bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl sm:text-2xl tracking-tighter font-light relative z-50 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          >
            ESSENTIAL MUSIK
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {/* <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              Home
            </button> */}
            <button
              onClick={() => smoothScrollTo("artists")}
              className="opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              Artists
            </button>
            <button
              onClick={() => smoothScrollTo("releases")}
              className="opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              Releases
            </button>
            <button
              onClick={() => router.push("/shop")}
              className="opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 flex items-center gap-2"
            >
              Shop
            </button>
            <button
              onClick={() => smoothScrollTo("contact")}
              className="opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-zinc-950 transition-all duration-500 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center h-full gap-8 text-2xl transition-all duration-700 delay-100 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            Home
          </button> */}
          <button
            onClick={() => {
              smoothScrollTo("artists");
              setMobileMenuOpen(false);
            }}
            className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            Artists
          </button>
          <button
            onClick={() => {
              smoothScrollTo("releases");
              setMobileMenuOpen(false);
            }}
            className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            Releases
          </button>
          <button
            onClick={() => {
              router.push("/shop");
              setMobileMenuOpen(false);
            }}
            className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-3"
          >
            Shop
          </button>
          <button
            onClick={() => {
              smoothScrollTo("contact");
              setMobileMenuOpen(false);
            }}
            className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            Contact
          </button>

          {/* Social Icons in Mobile Menu */}
          <div className="flex items-center gap-8 mt-12">
            <a
              href="#"
              className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;