"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  ArrowUpRight,
  Instagram,
  Mail,
  Youtube,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EssentialMusik() {
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [previewProgress, setPreviewProgress] = useState(0);
  const [showStreamingLinks, setShowStreamingLinks] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const audioRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const artists = [
    {
      id: 1,
      name: "Skepper Jarju",
      genre: "Afrobeats",
      image: "/skepper.jpg",
      bio: "Skepper Jarju is a Gambian Afrobeats artist whose sound blends infectious rhythms, vibrant melodies, and authentic West African energy. Inspired by the global rise of Afrobeats, he creates music centered around rhythm, culture, emotion, and connection. With a style that combines energetic delivery, relatable storytelling, and rich African influences, Skepper Jarju’s music reflects passion, creativity, and originality. Proudly representing Gambian talent, he continues to build his presence within the Afrobeats scene while working on new music and steadily carving out a unique lane of his own.",
      socials: {
        instagram: "https://instagram.com/skepperjarju",
        spotify: "https://open.spotify.com/artist/...",
        youtube: "https://youtube.com/@skepperjarjuofficial2530",
        tiktok: "https://tiktok.com/skepperjarju",
        applemusic: "https://music.apple.com/us/artist/skepper/1740668223",
      },
    },
    {
      id: 2,
      name: "Zimre",
      genre: "Afrofusion",
      bio: "Zimre is a Nigerian singer and songwriter from Kogi State, raised in Kaduna, whose soulful Afrofusion blends emotion, rhythm, and heartfelt storytelling. Inspired by artists like Ed Sheeran, Johnny Drille, and Wizkid, he creates music centered around love, reflection, and deep human connection. Starting his musical journey in the church choir and pursuing music seriously since 2019, Zimre’s sound is calm, honest, and emotionally rich. Rooted in faith and guided by authenticity, he is currently working on new singles and an upcoming EP while steadily building a unique lane of his own.",
      image: "/zimre.jpg",
      socials: {
        instagram: "https://instagram.com/zimre",
        spotify: "",
        youtube: "",
        tiktok: "",
      },
    },
  ];

  const tracks = [
    {
      title: "Distance",
      artist: "Skepper Jarju",
      duration: "3:08",
      audioUrl: "/Distance.mp3",
      previewDuration: 30,
      coverArt: "/distance-cover.jpeg",
      streamingLinks: {
        spotify: "https://spotify.link/LuOVyUbLYXb",
        apple: "https://music.apple.com/us/artist/skepper/1740668223",
        youtube: "https://youtube.com/@skepperjarjuofficial2530",
      },
    },
    {
      title: "Jungle",
      artist: "Skepper Jarju X Hussain Dada",
      duration: "2:58",
      audioUrl: "/skepper-jungle.m4a",
      previewDuration: 30,
      coverArt: "/jungle-cover.jpeg",
      streamingLinks: {
        spotify: "https://spotify.link/LuOVyUbLYXb",
        apple: "https://music.apple.com/us/artist/skepper/1740668223",
        youtube: "https://youtu.be/y8nxUv18zOI?si=qpEJDBCKMA4b29cv",
      },
    },
    {
      title: "Dormi Haram",
      artist: "Skepper Jarju",
      duration: "3:27",
      audioUrl: "/dormi-harram.mp3",
      previewDuration: 30,
      coverArt: "/dormiharram-cover.jpeg",
      streamingLinks: {
        spotify: "https://spotify.link/LuOVyUbLYXb",
        apple: "https://music.apple.com/us/artist/skepper/1740668223",
        youtube: "https://youtube.com/@essentialmusik?si=T6i2Qfgw4r5k9qgZ",
      },
    },
  ];

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePlayPause = (index) => {
    if (activeTrack === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Stop and cleanup previous track
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create new audio instance for this track
      const audio = new Audio(tracks[index].audioUrl);
      audioRef.current = audio;
      setActiveTrack(index);
      setPreviewProgress(0);
      setIsPlaying(true);

      // Handle time updates
      audio.ontimeupdate = () => {
        const currentTime = audio.currentTime;
        const previewDuration = tracks[index].previewDuration;

        // Stop at preview duration
        if (currentTime >= previewDuration) {
          audio.pause();
          audio.currentTime = 0;
          setIsPlaying(false);
          setPreviewProgress(0);
          setShowStreamingLinks(index);
        } else {
          setPreviewProgress((currentTime / previewDuration) * 100);
        }
      };

      // Handle natural end (if audio is shorter than preview duration)
      audio.onended = () => {
        audio.currentTime = 0;
        setIsPlaying(false);
        setPreviewProgress(0);
      };

      // Handle errors
      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
        setActiveTrack(null);
      };

      // Start playback
      audio.play().catch((err) => {
        console.error("Audio playback prevented:", err);
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="bg-zinc-950 text-zinc-50 font-sans antialiased">
      <audio ref={audioRef} />

      {/* Navbar */}
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        smoothScrollTo={smoothScrollTo}
        router={router}
      />

      {/* HomePage */}
      <>
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden pt-24 pb-12 sm:pt-10 sm:pb-0">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-violet-600 rounded-full filter blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-600 rounded-full filter blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="mb-6 sm:mb-12 flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs tracking-widest uppercase opacity-60">
                Independent Label Est. 2022
              </span>
            </div>

            <h1 className="text-[15vw] sm:text-[12vw] md:text-[8rem] leading-[0.85] sm:leading-[0.9] font-light tracking-tighter mb-4 sm:mb-8">
              DEFINING
              <br />
              <span className="font-normal">THE SOUND</span>
              <br />
              OF NOW
            </h1>

            <p className="text-sm sm:text-lg md:text-xl opacity-60 max-w-xl mx-auto mb-8 sm:mb-16 font-light px-4">
              Essential Musik is a home for sound that moves differently,
              exploring the space where rhythm meets emotion, and stories find
              their voice.
            </p>

            <button
              onClick={() => smoothScrollTo("artists")}
              className="group relative px-8 sm:px-10 py-3 sm:py-4 border border-zinc-700 hover:border-zinc-500 transition-colors"
            >
              <span className="relative z-10 flex items-center gap-3 text-xs sm:text-sm tracking-wider">
                EXPLORE THE SOUND
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        </section>

        {/* Artists */}
        <section
          id="artists"
          className="px-4 sm:px-6 md:px-12 py-20 sm:py-32 bg-black text-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 sm:mb-16">
              <p className="text-xs tracking-widest uppercase opacity-60 mb-4">
                Artists
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight">
                Roster
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-zinc-800">
              {artists.map((a, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-black cursor-pointer"
                  onClick={() => setSelectedArtist(a)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedArtist(a)}
                  aria-label={`View details for ${a.name}`}
                >
                  <div className="relative aspect-3/4 overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.name}
                      width={500}
                      height={700}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* "View Profile" hint pill */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      <span className="text-xs tracking-wide">
                        View Profile
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                      <p className="text-xs tracking-widest uppercase opacity-60 mb-2">
                        {a.genre}
                      </p>
                      <h3 className="text-4xl sm:text-5xl font-light tracking-tight mb-4">
                        {a.name}
                      </h3>
                      <p className="text-sm opacity-70 leading-relaxed max-w-md mb-6 line-clamp-3">
                        {a.bio}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                          {a.socials?.instagram && (
                            <a
                              href={a.socials.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                              aria-label="Instagram"
                            >
                              <Instagram className="w-4 h-4" />
                            </a>
                          )}
                          {a.socials?.spotify && (
                            <a
                              href={a.socials.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                              aria-label="Spotify"
                            >
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 20 20"
                                fill="#ffffff"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g>
                                  <g
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                  >
                                    <g
                                      transform="translate(-140.000000, -7479.000000)"
                                      fill="#ffffff"
                                    >
                                      <g transform="translate(56.000000, 160.000000)">
                                        <path d="M99.915,7327.865 C96.692,7325.951 91.375,7325.775 88.297,7326.709 C87.803,7326.858 87.281,7326.58 87.131,7326.085 C86.981,7325.591 87.26,7325.069 87.754,7324.919 C91.287,7323.846 97.159,7324.053 100.87,7326.256 C101.314,7326.52 101.46,7327.094 101.196,7327.538 C100.934,7327.982 100.358,7328.129 99.915,7327.865 L99.915,7327.865 Z M99.81,7330.7 C99.584,7331.067 99.104,7331.182 98.737,7330.957 C96.05,7329.305 91.952,7328.827 88.773,7329.792 C88.36,7329.916 87.925,7329.684 87.8,7329.272 C87.676,7328.86 87.908,7328.425 88.32,7328.3 C91.951,7327.198 96.466,7327.732 99.553,7329.629 C99.92,7329.854 100.035,7330.334 99.81,7330.7 L99.81,7330.7 Z M98.586,7333.423 C98.406,7333.717 98.023,7333.81 97.729,7333.63 C95.381,7332.195 92.425,7331.871 88.944,7332.666 C88.609,7332.743 88.274,7332.533 88.198,7332.197 C88.121,7331.862 88.33,7331.528 88.667,7331.451 C92.476,7330.58 95.743,7330.955 98.379,7332.566 C98.673,7332.746 98.766,7333.129 98.586,7333.423 L98.586,7333.423 Z M94,7319 C88.477,7319 84,7323.477 84,7329 C84,7334.523 88.477,7339 94,7339 C99.523,7339 104,7334.523 104,7329 C104,7323.478 99.523,7319.001 94,7319.001 L94,7319 Z"></path>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </a>
                          )}
                          {a.socials?.youtube && (
                            <a
                              href={a.socials.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                              aria-label="YouTube"
                            >
                              <Youtube className="w-4 h-4" />
                            </a>
                          )}
                          {a.socials?.tiktok && (
                            <a
                              href={a.socials.tiktok}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                              aria-label="TikTok"
                            >
                              <svg
                                width="16"
                                height="16"
                                fill="#ffffff"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
                              </svg>
                            </a>
                          )}
                        </div>

                        {/* Static "tap to explore" hint always visible at bottom-right */}
                        <span className="text-[10px] tracking-widest uppercase opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                          Tap to explore →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Artist Modal */}
        {selectedArtist && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setSelectedArtist(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Panel */}
            <div
              className="relative w-full sm:max-w-3xl bg-zinc-950 border border-zinc-800 sm:rounded-2xl overflow-hidden max-h-[92dvh] flex flex-col sm:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedArtist(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-200 text-white"
                aria-label="Close"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Image column */}
              <div className="relative sm:w-64 shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden">
                <Image
                  src={selectedArtist.image}
                  alt={selectedArtist.name}
                  width={400}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-zinc-950/60" />
              </div>

              {/* Content column */}
              <div className="flex-1 overflow-y-auto p-8 sm:p-10 flex flex-col gap-6">
                <div>
                  <p className="text-xs tracking-widest uppercase opacity-50 mb-2">
                    {selectedArtist.genre}
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
                    {selectedArtist.name}
                  </h2>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedArtist.bio}
                </p>

                {/* Extra fields — render whatever your artist object has */}
                {selectedArtist.label && (
                  <div>
                    <p className="text-[10px] tracking-widest uppercase opacity-40 mb-1">
                      Label
                    </p>
                    <p className="text-sm text-white">{selectedArtist.label}</p>
                  </div>
                )}
                {selectedArtist.origin && (
                  <div>
                    <p className="text-[10px] tracking-widest uppercase opacity-40 mb-1">
                      Origin
                    </p>
                    <p className="text-sm text-white">
                      {selectedArtist.origin}
                    </p>
                  </div>
                )}
                {selectedArtist.releases && (
                  <div>
                    <p className="text-[10px] tracking-widest uppercase opacity-40 mb-2">
                      Releases
                    </p>
                    <ul className="space-y-1">
                      {selectedArtist.releases.map((r, i) => (
                        <li
                          key={i}
                          className="text-sm text-zinc-300 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-zinc-500 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Socials */}
                <div className="flex gap-3 mt-auto pt-4 border-t border-zinc-800">
                  {selectedArtist.socials?.instagram && (
                    <a
                      href={selectedArtist.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-200 text-white"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {selectedArtist.socials?.spotify && (
                    <a
                      href={selectedArtist.socials.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-200 text-white"
                      aria-label="Spotify"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="#ffffff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <g
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              transform="translate(-140.000000, -7479.000000)"
                              fill="#ffffff"
                            >
                              <g transform="translate(56.000000, 160.000000)">
                                <path d="M99.915,7327.865 C96.692,7325.951 91.375,7325.775 88.297,7326.709 C87.803,7326.858 87.281,7326.58 87.131,7326.085 C86.981,7325.591 87.26,7325.069 87.754,7324.919 C91.287,7323.846 97.159,7324.053 100.87,7326.256 C101.314,7326.52 101.46,7327.094 101.196,7327.538 C100.934,7327.982 100.358,7328.129 99.915,7327.865 L99.915,7327.865 Z M99.81,7330.7 C99.584,7331.067 99.104,7331.182 98.737,7330.957 C96.05,7329.305 91.952,7328.827 88.773,7329.792 C88.36,7329.916 87.925,7329.684 87.8,7329.272 C87.676,7328.86 87.908,7328.425 88.32,7328.3 C91.951,7327.198 96.466,7327.732 99.553,7329.629 C99.92,7329.854 100.035,7330.334 99.81,7330.7 L99.81,7330.7 Z M98.586,7333.423 C98.406,7333.717 98.023,7333.81 97.729,7333.63 C95.381,7332.195 92.425,7331.871 88.944,7332.666 C88.609,7332.743 88.274,7332.533 88.198,7332.197 C88.121,7331.862 88.33,7331.528 88.667,7331.451 C92.476,7330.58 95.743,7330.955 98.379,7332.566 C98.673,7332.746 98.766,7333.129 98.586,7333.423 L98.586,7333.423 Z M94,7319 C88.477,7319 84,7323.477 84,7329 C84,7334.523 88.477,7339 94,7339 C99.523,7339 104,7334.523 104,7329 C104,7323.478 99.523,7319.001 94,7319.001 L94,7319 Z"></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </a>
                  )}
                  {selectedArtist.socials?.youtube && (
                    <a
                      href={selectedArtist.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-200 text-white"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                  {selectedArtist.socials?.tiktok && (
                    <a
                      href={selectedArtist.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-200 text-white"
                      aria-label="TikTok"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="#ffffff"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Releases */}
        <section
          id="releases"
          className="px-4 sm:px-6 md:px-12 py-20 sm:py-32 bg-zinc-900/50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 sm:mb-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <p className="text-xs tracking-widest uppercase text-zinc-500 mb-4">
                  Latest
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight">
                  Releases
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-xs">
                Preview 30s samples • Stream full tracks to support the artists
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tracks.map((track, i) => (
                <div
                  key={i}
                  className="group relative bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden"
                >
                  {/* Cover Art */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={track.coverArt}
                      alt={track.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Play Button Overlay - Desktop (hover) */}
                    <div className="hidden sm:block absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => handlePlayPause(i)}
                      >
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors">
                          {activeTrack === i && isPlaying ? (
                            <Pause className="w-7 h-7 text-zinc-900" />
                          ) : (
                            <Play className="w-7 h-7 text-zinc-900 ml-1" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Play Button - Mobile (always visible) */}
                    <div className="sm:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                      <button
                        onClick={() => handlePlayPause(i)}
                        className="pointer-events-auto w-14 h-14 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm active:scale-95 transition-transform shadow-lg"
                      >
                        {activeTrack === i && isPlaying ? (
                          <Pause className="w-6 h-6 text-zinc-900" />
                        ) : (
                          <Play className="w-6 h-6 text-zinc-900 ml-0.5" />
                        )}
                      </button>
                    </div>

                    {/* Preview Progress Bar */}
                    {activeTrack === i && isPlaying && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
                        <div
                          className="h-full bg-linear-to-r from-violet-500 to-cyan-500 transition-all duration-100"
                          style={{ width: `${previewProgress}%` }}
                        />
                      </div>
                    )}

                    {/* Preview Badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-[10px] tracking-wider uppercase">
                      30s Preview
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-light tracking-tight mb-1 truncate">
                          {track.title}
                        </h3>
                        <p className="text-sm text-zinc-400 truncate">
                          {track.artist}
                        </p>
                      </div>
                      <div className="text-right ml-3 shrink-0">
                        <p className="text-xs text-zinc-500 font-mono">
                          {track.duration}
                        </p>
                      </div>
                    </div>

                    {/* Streaming Links */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        showStreamingLinks === i
                          ? "max-h-40 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-4 border-t border-zinc-800">
                        <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                          Stream Full Track
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={track.streamingLinks.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-green-600 transition-colors text-xs"
                          >
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 20 20"
                              fill="#ffffff"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g strokeWidth="0"></g>
                              <g
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g>
                                <g
                                  stroke="none"
                                  strokeWidth="1"
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <g
                                    transform="translate(-140.000000, -7479.000000)"
                                    fill="#ffffff"
                                  >
                                    <g transform="translate(56.000000, 160.000000)">
                                      <path d="M99.915,7327.865 C96.692,7325.951 91.375,7325.775 88.297,7326.709 C87.803,7326.858 87.281,7326.58 87.131,7326.085 C86.981,7325.591 87.26,7325.069 87.754,7324.919 C91.287,7323.846 97.159,7324.053 100.87,7326.256 C101.314,7326.52 101.46,7327.094 101.196,7327.538 C100.934,7327.982 100.358,7328.129 99.915,7327.865 L99.915,7327.865 Z M99.81,7330.7 C99.584,7331.067 99.104,7331.182 98.737,7330.957 C96.05,7329.305 91.952,7328.827 88.773,7329.792 C88.36,7329.916 87.925,7329.684 87.8,7329.272 C87.676,7328.86 87.908,7328.425 88.32,7328.3 C91.951,7327.198 96.466,7327.732 99.553,7329.629 C99.92,7329.854 100.035,7330.334 99.81,7330.7 L99.81,7330.7 Z M98.586,7333.423 C98.406,7333.717 98.023,7333.81 97.729,7333.63 C95.381,7332.195 92.425,7331.871 88.944,7332.666 C88.609,7332.743 88.274,7332.533 88.198,7332.197 C88.121,7331.862 88.33,7331.528 88.667,7331.451 C92.476,7330.58 95.743,7330.955 98.379,7332.566 C98.673,7332.746 98.766,7333.129 98.586,7333.423 L98.586,7333.423 Z M94,7319 C88.477,7319 84,7323.477 84,7329 C84,7334.523 88.477,7339 94,7339 C99.523,7339 104,7334.523 104,7329 C104,7323.478 99.523,7319.001 94,7319.001 L94,7319 Z"></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                            Spotify
                          </a>
                          <a
                            href={track.streamingLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-red-600 transition-colors text-xs"
                          >
                            <Youtube className="w-5 h-5" />
                            YouTube
                          </a>
                          <a
                            href={track.streamingLinks.apple}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-linear-to-r hover:from-pink-600 hover:to-purple-600 transition-colors text-xs"
                          >
                            <svg
                              fill="#ffffff"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              stroke="#ffffff"
                              width="20px"
                              height="20px"
                              className="w-5 h-5"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path d="m24 6.124c0-.029.001-.063.001-.097 0-.743-.088-1.465-.253-2.156l.013.063c-.312-1.291-1.1-2.359-2.163-3.031l-.02-.012c-.536-.35-1.168-.604-1.847-.723l-.03-.004c-.463-.084-1.003-.138-1.553-.15h-.011c-.04 0-.083-.01-.124-.013h-12.025c-.152.01-.3.017-.455.026-.791.016-1.542.161-2.242.415l.049-.015c-1.306.501-2.327 1.495-2.853 2.748l-.012.033c-.17.409-.297.885-.36 1.38l-.003.028c-.051.343-.087.751-.1 1.165v.016c0 .032-.007.062-.01.093v12.224c.01.14.017.283.027.424.02.861.202 1.673.516 2.416l-.016-.043c.609 1.364 1.774 2.387 3.199 2.792l.035.009c.377.111.817.192 1.271.227l.022.001c.555.053 1.11.06 1.667.06h11.028c.554 0 1.099-.037 1.633-.107l-.063.007c.864-.096 1.645-.385 2.321-.823l-.021.013c.825-.539 1.47-1.29 1.867-2.176l.013-.032c.166-.383.295-.829.366-1.293l.004-.031c.084-.539.132-1.161.132-1.794 0-.086-.001-.171-.003-.256v.013q0-5.7 0-11.394zm-6.424 3.99v5.712c.001.025.001.054.001.083 0 .407-.09.794-.252 1.14l.007-.017c-.273.562-.771.979-1.373 1.137l-.015.003c-.316.094-.682.156-1.06.173h-.01c-.029.002-.062.002-.096.002-1.033 0-1.871-.838-1.871-1.871 0-.741.431-1.382 1.056-1.685l.011-.005c.293-.14.635-.252.991-.32l.027-.004c.378-.082.758-.153 1.134-.24.264-.045.468-.252.51-.513v-.003c.013-.057.02-.122.02-.189 0-.002 0-.003 0-.005q0-2.723 0-5.443c-.001-.066-.01-.13-.027-.19l.001.005c-.026-.134-.143-.235-.283-.235-.006 0-.012 0-.018.001h.001c-.178.013-.34.036-.499.07l.024-.004q-1.14.225-2.28.456l-3.7.748c-.016 0-.032.01-.048.013-.222.03-.392.219-.392.447 0 .015.001.03.002.045v-.002.13q0 3.9 0 7.801c.001.028.001.062.001.095 0 .408-.079.797-.224 1.152l.007-.021c-.264.614-.792 1.072-1.436 1.235l-.015.003c-.319.096-.687.158-1.067.172h-.008c-.031.002-.067.003-.104.003-.913 0-1.67-.665-1.815-1.536l-.001-.011c-.02-.102-.031-.218-.031-.338 0-.785.485-1.458 1.172-1.733l.013-.004c.315-.127.687-.234 1.072-.305l.036-.005c.287-.06.575-.116.86-.177.341-.05.6-.341.6-.693 0-.007 0-.015 0-.022v.001-.15q0-4.44 0-8.883c0-.002 0-.004 0-.007 0-.129.015-.254.044-.374l-.002.011c.066-.264.277-.466.542-.517l.004-.001c.255-.066.515-.112.774-.165.733-.15 1.466-.3 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.4.181-.042.407-.079.637-.104l.027-.002c.018-.002.04-.004.061-.004.27 0 .489.217.493.485.008.067.012.144.012.222v.001q0 2.865 0 5.732z"></path>
                              </g>
                            </svg>
                            Apple Music
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Listen Full Track Button */}
                    <button
                      onClick={() =>
                        setShowStreamingLinks(
                          showStreamingLinks === i ? null : i,
                        )
                      }
                      className="w-full mt-4 px-4 py-2.5 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {showStreamingLinks === i
                        ? "Hide Links"
                        : "Stream Full Track"}
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 sm:mt-20 text-center">
              <p className="text-sm sm:text-base text-zinc-400 mb-6 max-w-2xl mx-auto">
                Love what you hear? Streaming on your preferred platform
                directly supports our artists and helps us continue creating.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <span className="text-xs uppercase tracking-wider text-zinc-500">
                  Available on
                </span>
                <div className="flex gap-3 sm:gap-4">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g strokeWidth="0"></g>
                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                    <g>
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-140.000000, -7479.000000)"
                          fill="#ffffff"
                        >
                          <g transform="translate(56.000000, 160.000000)">
                            <path d="M99.915,7327.865 C96.692,7325.951 91.375,7325.775 88.297,7326.709 C87.803,7326.858 87.281,7326.58 87.131,7326.085 C86.981,7325.591 87.26,7325.069 87.754,7324.919 C91.287,7323.846 97.159,7324.053 100.87,7326.256 C101.314,7326.52 101.46,7327.094 101.196,7327.538 C100.934,7327.982 100.358,7328.129 99.915,7327.865 L99.915,7327.865 Z M99.81,7330.7 C99.584,7331.067 99.104,7331.182 98.737,7330.957 C96.05,7329.305 91.952,7328.827 88.773,7329.792 C88.36,7329.916 87.925,7329.684 87.8,7329.272 C87.676,7328.86 87.908,7328.425 88.32,7328.3 C91.951,7327.198 96.466,7327.732 99.553,7329.629 C99.92,7329.854 100.035,7330.334 99.81,7330.7 L99.81,7330.7 Z M98.586,7333.423 C98.406,7333.717 98.023,7333.81 97.729,7333.63 C95.381,7332.195 92.425,7331.871 88.944,7332.666 C88.609,7332.743 88.274,7332.533 88.198,7332.197 C88.121,7331.862 88.33,7331.528 88.667,7331.451 C92.476,7330.58 95.743,7330.955 98.379,7332.566 C98.673,7332.746 98.766,7333.129 98.586,7333.423 L98.586,7333.423 Z M94,7319 C88.477,7319 84,7323.477 84,7329 C84,7334.523 88.477,7339 94,7339 C99.523,7339 104,7334.523 104,7329 C104,7323.478 99.523,7319.001 94,7319.001 L94,7319 Z"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <svg
                    fill="#ffffff"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    width="20px"
                    height="20px"
                    className="w-5 h-5"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="m24 6.124c0-.029.001-.063.001-.097 0-.743-.088-1.465-.253-2.156l.013.063c-.312-1.291-1.1-2.359-2.163-3.031l-.02-.012c-.536-.35-1.168-.604-1.847-.723l-.03-.004c-.463-.084-1.003-.138-1.553-.15h-.011c-.04 0-.083-.01-.124-.013h-12.025c-.152.01-.3.017-.455.026-.791.016-1.542.161-2.242.415l.049-.015c-1.306.501-2.327 1.495-2.853 2.748l-.012.033c-.17.409-.297.885-.36 1.38l-.003.028c-.051.343-.087.751-.1 1.165v.016c0 .032-.007.062-.01.093v12.224c.01.14.017.283.027.424.02.861.202 1.673.516 2.416l-.016-.043c.609 1.364 1.774 2.387 3.199 2.792l.035.009c.377.111.817.192 1.271.227l.022.001c.555.053 1.11.06 1.667.06h11.028c.554 0 1.099-.037 1.633-.107l-.063.007c.864-.096 1.645-.385 2.321-.823l-.021.013c.825-.539 1.47-1.29 1.867-2.176l.013-.032c.166-.383.295-.829.366-1.293l.004-.031c.084-.539.132-1.161.132-1.794 0-.086-.001-.171-.003-.256v.013q0-5.7 0-11.394zm-6.424 3.99v5.712c.001.025.001.054.001.083 0 .407-.09.794-.252 1.14l.007-.017c-.273.562-.771.979-1.373 1.137l-.015.003c-.316.094-.682.156-1.06.173h-.01c-.029.002-.062.002-.096.002-1.033 0-1.871-.838-1.871-1.871 0-.741.431-1.382 1.056-1.685l.011-.005c.293-.14.635-.252.991-.32l.027-.004c.378-.082.758-.153 1.134-.24.264-.045.468-.252.51-.513v-.003c.013-.057.02-.122.02-.189 0-.002 0-.003 0-.005q0-2.723 0-5.443c-.001-.066-.01-.13-.027-.19l.001.005c-.026-.134-.143-.235-.283-.235-.006 0-.012 0-.018.001h.001c-.178.013-.34.036-.499.07l.024-.004q-1.14.225-2.28.456l-3.7.748c-.016 0-.032.01-.048.013-.222.03-.392.219-.392.447 0 .015.001.03.002.045v-.002.13q0 3.9 0 7.801c.001.028.001.062.001.095 0 .408-.079.797-.224 1.152l.007-.021c-.264.614-.792 1.072-1.436 1.235l-.015.003c-.319.096-.687.158-1.067.172h-.008c-.031.002-.067.003-.104.003-.913 0-1.67-.665-1.815-1.536l-.001-.011c-.02-.102-.031-.218-.031-.338 0-.785.485-1.458 1.172-1.733l.013-.004c.315-.127.687-.234 1.072-.305l.036-.005c.287-.06.575-.116.86-.177.341-.05.6-.341.6-.693 0-.007 0-.015 0-.022v.001-.15q0-4.44 0-8.883c0-.002 0-.004 0-.007 0-.129.015-.254.044-.374l-.002.011c.066-.264.277-.466.542-.517l.004-.001c.255-.066.515-.112.774-.165.733-.15 1.466-.3 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.4.181-.042.407-.079.637-.104l.027-.002c.018-.002.04-.004.061-.004.27 0 .489.217.493.485.008.067.012.144.012.222v.001q0 2.865 0 5.732z"></path>
                    </g>
                  </svg>
                  <Youtube className="w-5 h-5 text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="px-4 sm:px-6 md:px-12 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-16 sm:mb-24">
              <p className="text-xs tracking-widest uppercase opacity-60 mb-4">
                About
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight max-w-4xl">
                A collective of artists redefining what it means to listen.
              </h2>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-12 gap-8 sm:gap-12">
              {/* Left Column - Story */}
              <div className="md:col-span-7 space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
                <p>
                  Essential Musik was founded with one purpose: to give artists
                  the freedom to create honestly. No trends. No formulas. Just
                  raw sound and genuine connection.
                </p>

                <p>
                  From the underground scene to global stages, we are driven by
                  discovery, exploring the corners of rhythm, texture, and mood
                  that shape the world of modern music.
                </p>

                <p>
                  Every release is a moment, a reflection of who we are, where
                  we have been, and where sound can take us next.
                </p>
                {/* CEO Card */}
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-6 sm:p-8">
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-zinc-800">
                      <Image
                        src="/ceo.jpg"
                        alt="John Anderson"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1">
                        Jerry Isaacs
                      </h3>
                      <p className="text-xs sm:text-sm tracking-wider uppercase opacity-60 mb-3">
                        Founder & CEO
                      </p>
                      <div className="w-12 h-px bg-zinc-700" />
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed italic">
                    &quot;Music isn&apos;t just about what you hear. It&apos;s
                    about what you feel, what you remember, and who you become
                    through it.&quot;
                  </p>
                </div>
              </div>

              {/* Right Column - Visual Stack */}
              {/* Right Column - Past Events Gallery */}
              <div className="md:col-span-5 space-y-6 sm:space-y-8">
                {/* Past Events Title */}
                <div className="mb-6">
                  <p className="text-xs tracking-widest uppercase opacity-60 mb-2">
                    Past Events
                  </p>
                  <div className="w-12 h-px bg-zinc-700" />
                </div>

                {/* Event Images Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square bg-zinc-900 overflow-hidden group">
                    <Image
                      src="/event1.jpeg"
                      alt="Past Event 1"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="relative aspect-square bg-zinc-900 overflow-hidden group">
                    <Image
                      src="/event4.jpeg"
                      alt="Past Event 2"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="relative aspect-square bg-zinc-900 overflow-hidden group">
                    <Image
                      src="/event3.jpeg"
                      alt="Past Event 3"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="relative aspect-square bg-zinc-900 overflow-hidden group">
                    <Image
                      src="/event6.jpeg"
                      alt="Past Event 4"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Featured Event - Larger */}
                <div className="relative aspect-video bg-zinc-900 overflow-hidden group">
                  <Image
                    src="/event5.jpeg"
                    alt="Featured Past Event"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm text-zinc-400 mb-1">
                      Busumbala Carnival 2024
                    </p>
                    <p className="text-xs text-zinc-500">Over 500 attendees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="px-4 sm:px-6 md:px-12 py-20 sm:py-32 border-t border-zinc-900"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight mb-6 sm:mb-8">
              Let&apos;s create something real
            </h2>
            <p className="text-base sm:text-lg opacity-60 mb-12 sm:mb-16 max-w-xl mx-auto px-4">
              Artists, producers, and collaborators. We&apos;re always
              listening. Send your demos, ideas, or sounds that deserve to be
              heard.
            </p>
            <a
              href="mailto:info@essentialmusik.com"
              className="inline-flex items-center gap-3 text-base sm:text-lg hover:opacity-60 transition-opacity break-all"
            >
              info@essentialmusik.com
              <ArrowUpRight className="w-5 h-5 shrink-0" />
            </a>

            <div className="mt-16 sm:mt-20 flex items-center justify-center gap-6 sm:gap-8">
              <a
                href="https://www.instagram.com/essentialmusik?igsh=MW5xeno2cG9md2F6OQ=="
                target="_blank"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@essentialmusik?si=T6i2Qfgw4r5k9qgZ"
                target="_blank"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </>

      {/* Footer */}
      <footer className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Bottom Bar */}
          <div className="border-t border-zinc-900 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-40">
            <div className="flex items-center gap-6">
              <p>© 2022 Essential Musik</p>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </a>
            </div>
            <p>London</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
