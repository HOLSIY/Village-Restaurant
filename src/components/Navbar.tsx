import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { VillageLogo } from './VillageLogo';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const { currentPath, navigate } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple intersection check for active nav link
      const sections = [
        { id: 'home', name: 'HOME' },
        { id: 'about', name: 'ABOUT' },
        { id: 'menu', name: 'MENU' },
        { id: 'reviews', name: 'REVIEWS' },
        { id: 'gallery', name: 'OUR KITCHEN & ATMOSPHERE' },
        { id: 'contact', name: 'CONTACT' },
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'MENU', href: '#menu' },
    { name: "CHEF'S PICKS", href: '#popular' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'OUR KITCHEN & ATMOSPHERE', href: '#gallery' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent, href: string, name: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(name);

    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback search by query selector if ID not directly on element
        const sel = document.querySelector(href);
        if (sel) sel.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 bg-white border-b border-slate-200/80 ${
        isScrolled ? 'py-2.5 shadow-sm' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Restaurant Logo & Location */}
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home', 'HOME')}
          className="flex flex-col items-start group py-1"
        >
          <VillageLogo light={false} className="h-9 sm:h-10" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#008060] mt-0.5">
            MENELIK II AVENUE, ADDIS ABABA
          </span>
        </a>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href, link.name)}
                className={`text-[11px] xl:text-[12px] font-extrabold uppercase tracking-wider py-1.5 transition-all relative ${
                  isActive 
                    ? 'text-[#C8232C]' 
                    : 'text-slate-800 hover:text-[#C8232C]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#C8232C] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Order Now Pill Button */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={onOpenOrderModal}
            className="flex items-center gap-2 bg-[#C8232C] hover:bg-[#A81C24] text-white text-xs font-extrabold rounded-full px-6 py-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-102 active:scale-98"
          >
            <div className="p-0.5 border border-white/40 rounded-sm">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="tracking-wide">My Order</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenOrderModal}
            className="bg-[#C8232C] text-white p-2.5 rounded-full shadow-md flex items-center justify-center cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-800 hover:text-[#C8232C] p-2 rounded-xl focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 pt-4 pb-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href, link.name)}
                  className={`text-xs uppercase tracking-widest font-extrabold py-2 border-b border-slate-100 flex items-center justify-between ${
                    isActive ? 'text-[#C8232C]' : 'text-slate-800 hover:text-[#C8232C]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#C8232C]" />}
                </a>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full bg-[#C8232C] hover:bg-[#A81C24] text-white text-xs font-extrabold uppercase tracking-widest py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>MY ORDER ONLINE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

