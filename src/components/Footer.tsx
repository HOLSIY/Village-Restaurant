import React from 'react';
import { useApp } from '../context/AppContext';
import { VillageLogo } from './VillageLogo';
import { EditableText } from './EditableText';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, navigate } = useApp();

  return (
    <footer className="bg-white text-slate-600 text-xs border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-4 space-y-4">
            <VillageLogo light={false} className="h-9" />
            
            <p className="text-slate-500 leading-relaxed max-w-sm font-normal text-xs">
              <EditableText contentKey="footerDesc" fallback="Village Cafe is Addis Ababa's premier destination for authentic Mexican tortas, artisan tacos, supreme nachos, and fresh specialty coffee." />
            </p>

            <div className="flex items-center space-x-2 pt-1">
              <a href="#" className="p-2.5 bg-slate-100 hover:bg-[#C8232C] hover:text-white text-slate-700 rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-slate-100 hover:bg-[#C8232C] hover:text-white text-slate-700 rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-slate-100 hover:bg-[#C8232C] hover:text-white text-slate-700 rounded-full transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="#home" className="hover:text-[#C8232C] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#C8232C] transition-colors">About Us</a></li>
              <li><a href="#menu" className="hover:text-[#C8232C] transition-colors">Our Menu</a></li>
              <li><a href="#gallery" className="hover:text-[#C8232C] transition-colors">Gallery</a></li>
              <li><a href="#reviews" className="hover:text-[#C8232C] transition-colors">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-[#C8232C] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-wider">Opening Hours</h4>
            <div className="space-y-1.5 text-xs text-slate-600 font-medium">
              <p className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#C8232C]">Monday - Sunday</p>
              <p>{settings.openingHoursWeekday}</p>
            </div>
          </div>

          {/* Col 4: Contact Us */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-serif font-bold text-slate-900 uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-2.5 text-xs font-medium">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8232C] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </p>
              <p className="flex items-center gap-2 font-mono font-extrabold text-[#C8232C]">
                <Phone className="w-4 h-4 text-[#C8232C] shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`}>{settings.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8232C] shrink-0" />
                <span>{settings.email}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Village Cafe. All Rights Reserved. Menelik II Ave, Addis Ababa.</p>
        </div>

      </div>
    </footer>
  );
};
