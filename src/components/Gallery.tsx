import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EditableText } from './EditableText';
import { X, ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = ['All', 'Food', 'Ambiance'];

  const filteredGallery = activeFilter === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="bg-red-50 text-[#C8232C] border border-red-100 text-xs font-bold rounded-full px-4 py-1.5 inline-block">
            OUR KITCHEN & ATMOSPHERE
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 font-extrabold tracking-tight">
            <EditableText contentKey="galleryTitle" fallback="Restaurant Atmosphere & Food Gallery" />
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-xl mx-auto">
            <EditableText contentKey="gallerySubtitle" fallback="Explore our vibrant dishes, artisanal tortas, and cozy cafe vibes on Menelik II Ave." />
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#C8232C] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item.imageUrl)}
              className="relative h-64 rounded-3xl border border-slate-200/80 bg-white overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-all"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div className="text-white flex items-center justify-between w-full">
                  <div>
                    <h4 className="font-serif font-bold text-base text-white">{item.title}</h4>
                    <span className="text-[10px] text-red-300 uppercase tracking-wider font-bold">{item.category || 'Village Cafe'}</span>
                  </div>
                  <div className="p-2.5 bg-[#C8232C] text-white rounded-full">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 bg-white/10 px-4 py-2 rounded-full border border-white/20"
            >
              <X className="w-4 h-4" /> Close
            </button>
            <img 
              src={lightboxImage} 
              alt="Gallery Preview" 
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border-2 border-white"
            />
          </div>
        </div>
      )}
    </section>
  );
};
