"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const merchItems = [
  {
    id: 1,
    name: "ESSENTIAL Hoodie",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
    category: "Apparel",
  },
  {
    id: 2,
    name: "Vinyl Collection Vol. 1",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&h=800&fit=crop",
    category: "Vinyl",
  },
  {
    id: 3,
    name: "SABLE Tour Tee",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
    category: "Apparel",
  },
  {
    id: 4,
    name: "Logo Dad Cap",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop",
    category: "Accessories",
  },
  {
    id: 5,
    name: "VANTA EP Vinyl",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1619983081563-430f63602796?w=800&h=800&fit=crop",
    category: "Vinyl",
  },
  {
    id: 6,
    name: "Essential Tote Bag",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop",
    category: "Accessories",
  },
];

const MerchPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Replace with your actual WhatsApp number (include country code without + or spaces)
  const whatsappNumber = "919630095691";

  useEffect(() => {
    // Use requestAnimationFrame to trigger animation after initial render
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleWhatsAppInquiry = (item) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${item.name} ($${item.price}). Can you provide more details?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-12 py-14 bg-zinc-950 text-zinc-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-all duration-300 mb-8 sm:mb-12 group border border-zinc-800 hover:border-zinc-600 px-4 py-2.5 rounded-sm"
        >
          <svg
            className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        <div className="mb-12 sm:mb-20">
          <p className="text-xs tracking-widest uppercase opacity-60 mb-4">
            Shop
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight mb-6">
            Merchandise
          </h2>
          <p className="text-base sm:text-lg opacity-60 max-w-2xl">
            Official Essential Musik apparel, vinyl releases, and accessories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {merchItems.map((item, index) => (
            <div
              key={item.id}
              className={`group cursor-pointer transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              onClick={() => handleWhatsAppInquiry(item)}
            >
              <div className="relative aspect-square bg-zinc-900 mb-3 sm:mb-4 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width={500}
                  height={500}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* WhatsApp Inquiry Button - Desktop (hover) */}
                <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 px-4 py-2.5 rounded-sm flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="text-xs tracking-widest uppercase">
                      Inquire
                    </span>
                  </div>
                </div>

                {/* WhatsApp Icon - Mobile (always visible) */}
                <div className="md:hidden absolute top-3 right-3 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 p-2 rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs opacity-60">{item.category}</p>
                <h3 className="text-sm sm:text-base font-light tracking-tight">
                  {item.name}
                </h3>
                <p className="text-sm sm:text-base font-light">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchPage;
