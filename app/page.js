import React, { useState, useEffect } from 'react';
import { Play, Pause, Music2, ArrowUpRight, Instagram, Twitter, Mail } from 'lucide-react';

export default function EssentialMusik() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredArtist, setHoveredArtist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const artists = [
    { 
      id: 1,
      name: 'SABLE', 
      genre: 'Techno',
      color: 'from-violet-600 to-fuchsia-600',
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=1200&fit=crop'
    },
    { 
      id: 2,
      name: 'VANTA', 
      genre: 'House',
      color: 'from-cyan-600 to-blue-600',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1200&fit=crop'
    },
    { 
      id: 3,
      name: 'NOIRE', 
      genre: 'Ambient',
      color: 'from-rose-600 to-orange-600',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1200&fit=crop'
    }
  ];

  const tracks = [
    { title: 'Midnight Protocol', artist: 'SABLE', duration: '4:32', bpm: 128 },
    { title: 'Velvet Underground', artist: 'VANTA', duration: '5:18', bpm: 124 },
    { title: 'Silent Moves', artist: 'NOIRE', duration: '6:45', bpm: 118 },
    { title: 'Neon Pulse', artist: 'SABLE', duration: '3:56', bpm: 132 },
    { title: 'Ocean Floor', artist: 'NOIRE', duration: '7:12', bpm: 110 }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-50 font-sans antialiased">
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl tracking-tighter font-light">
            ESSENTIAL
          </div>
          <div className="flex items-center gap-8 text-sm">
            <a href="#artists" className="opacity-60 hover:opacity-100 transition-opacity">Artists</a>
            <a href="#releases" className="opacity-60 hover:opacity-100 transition-opacity">Releases</a>
            <a href="#contact" className="opacity-60 hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero - Clean Typography */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-12 flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs tracking-widest uppercase opacity-60">Independent Label Est. 2024</span>
          </div>
          
          <h1 className="text-[12vw] md:text-[8rem] leading-[0.9] font-light tracking-tighter mb-8">
            ELECTRONIC<br />
            <span className="font-normal">MUSIC</span><br />
            REDEFINED
          </h1>
          
          <p className="text-lg md:text-xl opacity-60 max-w-xl mx-auto mb-16 font-light">
            Pushing boundaries in underground electronic music. Curated releases from emerging artists.
          </p>

          <button className="group relative px-10 py-4 border border-zinc-700 hover:border-zinc-500 transition-colors">
            <span className="relative z-10 flex items-center gap-3 text-sm tracking-wider">
              EXPLORE CATALOG
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* Artists - Large Images */}
      <section id="artists" className="px-6 md:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-xs tracking-widest uppercase opacity-60 mb-4">Artists</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">Roster</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {artists.map((artist) => (
              <div 
                key={artist.id}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredArtist(artist.id)}
                onMouseLeave={() => setHoveredArtist(null)}
              >
                <img 
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${artist.color} mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 border border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                  
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs tracking-widest uppercase opacity-80 mb-2">{artist.genre}</p>
                    <h3 className="text-4xl font-light tracking-tight">{artist.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Releases - Minimalist List */}
      <section id="releases" className="px-6 md:px-12 py-32 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-xs tracking-widest uppercase opacity-60 mb-4">Latest</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">Releases</h2>
          </div>

          <div className="space-y-1">
            {tracks.map((track, i) => (
              <div 
                key={i}
                className="group relative border-t border-zinc-800 hover:bg-zinc-900/50 transition-colors cursor-pointer"
                onClick={() => {
                  setActiveTrack(i);
                  setIsPlaying(!isPlaying || activeTrack !== i);
                }}
              >
                <div className="grid grid-cols-12 gap-4 items-center py-6 px-4">
                  <div className="col-span-1 flex items-center justify-center">
                    {activeTrack === i && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    <span className={`${activeTrack === i && isPlaying ? 'hidden' : 'group-hover:hidden'} text-sm opacity-40`}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  
                  <div className="col-span-6 md:col-span-5">
                    <p className="font-light tracking-tight text-lg">{track.title}</p>
                  </div>
                  
                  <div className="col-span-3 md:col-span-4">
                    <p className="text-sm opacity-60">{track.artist}</p>
                  </div>
                  
                  <div className="hidden md:block col-span-1">
                    <p className="text-xs opacity-40">{track.bpm} BPM</p>
                  </div>
                  
                  <div className="col-span-2 md:col-span-1 text-right">
                    <p className="text-sm opacity-60 font-mono">{track.duration}</p>
                  </div>
                </div>

                {activeTrack === i && isPlaying && (
                  <div className="absolute bottom-0 left-0 h-0.5 bg-violet-500 w-1/3 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About - Split Layout */}
      <section className="px-6 md:px-12 py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase opacity-60 mb-8">About</p>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-12">
              We champion artists who push the boundaries of electronic music
            </h2>
            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p>
                Essential Musik was founded on the principle that great music deserves a platform free from commercial constraints. We work with a carefully curated roster of artists who share our vision for innovation in electronic music.
              </p>
              <p>
                From deep techno to ambient soundscapes, our releases span the spectrum of underground electronic music. Each release is crafted with attention to sonic detail and artistic integrity.
              </p>
            </div>
          </div>
          
          <div className="relative aspect-square bg-zinc-900">
            <img 
              src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=800&fit=crop"
              alt="Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact - Simple CTA */}
      <section id="contact" className="px-6 md:px-12 py-32 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            Let's work together
          </h2>
          <p className="text-lg opacity-60 mb-16 max-w-xl mx-auto">
            Demos, collaborations, bookings — we want to hear from you.
          </p>
          
          <a 
            href="mailto:info@essentialmusik.com"
            className="inline-flex items-center gap-3 text-lg hover:opacity-60 transition-opacity"
          >
            info@essentialmusik.com
            <ArrowUpRight className="w-5 h-5" />
          </a>

          <div className="mt-20 flex items-center justify-center gap-8">
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm opacity-40">
          <p>© 2024 Essential Musik</p>
          <p>Berlin / London / LA</p>
        </div>
      </footer>
    </div>
  );
}