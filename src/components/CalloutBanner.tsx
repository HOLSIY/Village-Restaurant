import React from 'react';
import { EditableText } from './EditableText';
import { useApp } from '../context/AppContext';
import { Phone, Calendar, Utensils } from 'lucide-react';

interface CalloutBannerProps {
  onOpenOrderModal: () => void;
}

export const CalloutBanner: React.FC<CalloutBannerProps> = ({ onOpenOrderModal }) => {
  const { settings } = useApp();

  return (
    <section className="py-8 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative bg-gradient-to-r from-[#C8232C] to-[#A81C24] text-white rounded-[28px] p-8 sm:p-12 shadow-md overflow-hidden">
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-red-100 text-xs font-bold uppercase tracking-wider">
                <Utensils className="w-4 h-4" />
                <EditableText contentKey="bannerTitle" fallback="Reserve Your Table or Group Order Now!" />
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-white">
                <EditableText contentKey="bannerSubtitle" fallback="Good Mexican food is better when shared with friends & family." />
              </h3>

              <p className="text-red-100 text-xs tracking-wider opacity-90">
                Located on Menelik II Ave, Addis Ababa • Direct Call: {settings.phone}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenOrderModal}
                className="bg-white hover:bg-slate-50 text-[#C8232C] font-extrabold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                <span>ORDER / RESERVE NOW</span>
              </button>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="bg-black/20 hover:bg-black/30 text-white font-bold px-6 py-3.5 rounded-2xl border border-white/20 transition-all text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>{settings.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
