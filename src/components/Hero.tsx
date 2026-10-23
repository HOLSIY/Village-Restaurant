import React from 'react';
import { EditableText } from './EditableText';
import { ShoppingBag, ArrowRight, Phone, Star, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeroProps {
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  const { settings } = useApp();

  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuEl = document.querySelector('#menu');
    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative py-6 sm:py-10 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main White Canvas Box (Screenshot 1) */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-slate-100 shadow-sm p-6 sm:p-10 lg:p-14 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Top Pill Badges Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <div className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full px-3.5 py-1.5 flex items-center gap-1 shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Google Rated 4.4</span>
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                </div>

                <div className="bg-red-50 text-red-700 border border-red-100 text-xs font-bold rounded-full px-3.5 py-1.5">
                  <EditableText contentKey="heroBadge" fallback="Authentic Mexican Cuisine" />
                </div>

                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold rounded-full px-3.5 py-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Open Daily Until 11:00 PM</span>
                </div>
              </div>

              {/* Headline (Editorial Serif from Screenshot 1) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 font-extrabold tracking-tight leading-[1.1]">
                <EditableText contentKey="heroTitleLine1" fallback="Authentic Mexican Flavors" className="block" />
                <EditableText 
                  contentKey="heroTitleLine2" 
                  fallback="Made Fresh" 
                  className="inline-block text-[#C8232C] italic font-serif font-normal mr-3" 
                />
                <span className="text-[#C8232C] font-serif font-extrabold">Every Single Day.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                <EditableText 
                  contentKey="heroDescription" 
                  multiline
                  fallback="Experience authentic Mexican cuisine prepared fresh every day. From handcrafted tacos and burritos to loaded nachos and refreshing drinks, Village Cafe brings bold flavors and quality ingredients to the heart of Addis Ababa." 
                />
              </p>

              {/* Action Buttons (Screenshot 1) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#menu"
                  onClick={scrollToMenu}
                  className="bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold px-7 py-3.5 rounded-2xl flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  <EditableText contentKey="heroCtaMenu" fallback="Browse Menu" />
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-7 py-3.5 rounded-2xl flex items-center gap-2 text-sm shadow-2xs transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <EditableText contentKey="heroCtaOrder" fallback="Call to Order" />
                </a>
              </div>

            </div>

            {/* Right Column: Circular Taco Showcase with floating badges (Screenshot 1) */}
            <div className="lg:col-span-5 relative flex justify-center py-6">
              <div className="relative w-72 sm:w-80 lg:w-96 aspect-square">
                
                {/* Circular Outer Ring with soft pink shadow glow */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-red-100/60 via-pink-50/40 to-amber-100/50 blur-xl"></div>
                <div className="absolute inset-0 rounded-full border-2 border-red-100/80 p-2"></div>

                {/* Circular Food Image */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                  <img 
                    src={settings.logoUrl || "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=1000"} 
                    alt="Authentic Mexican Tacos Platter" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge 1: Top Left */}
                <div className="absolute top-4 -left-6 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-slate-100 text-[11px] font-bold text-emerald-800 flex items-center gap-1.5 animate-bounce">
                  <span>🌱</span> FRESH BASIL
                </div>

                {/* Floating Badge 2: Bottom Right */}
                <div className="absolute -bottom-2 right-2 z-20 bg-red-50 text-red-800 px-4 py-2 rounded-full shadow-md border border-red-200 text-xs font-extrabold flex items-center gap-1.5">
                  <span>🔥</span> HABESTA HOT HONEY
                </div>

                {/* Floating Badge 3: Bottom Left */}
                <div className="absolute bottom-8 -left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-100 text-[11px] font-bold text-red-600">
                  <span>🍅</span> FRESH SALSA
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
