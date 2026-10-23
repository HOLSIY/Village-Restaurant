import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';
import { EditableText } from './EditableText';
import { Heart, ChevronRight, Star } from 'lucide-react';

interface PopularDishesProps {
  onSelectItemForOrder: (item: MenuItem) => void;
}

export const PopularDishes: React.FC<PopularDishesProps> = ({ onSelectItemForOrder }) => {
  const { menuItems } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Tacos', 'Burritos', 'Bowls', 'Quesadilla', 'Nachos', 'Drinks', 'Desserts', 'Specials'];

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  // Helper to format price layout (matching Screenshot 2)
  const renderPriceGrid = (item: MenuItem) => {
    if (item.priceType === 'sizes' && item.sizes) {
      return (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs space-y-1.5 font-sans">
          <div className="flex justify-between items-center text-slate-600">
            <span>Small (s)</span>
            <span className="font-extrabold text-[#C8232C]">ETB {item.sizes.small.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Medium (M)</span>
            <span className="font-extrabold text-[#C8232C]">ETB {item.sizes.medium.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Large (L)</span>
            <span className="font-extrabold text-[#C8232C]">ETB {item.sizes.large.toLocaleString()}</span>
          </div>
        </div>
      );
    } else if (item.priceType === 'half_full' && item.halfFull) {
      return (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs space-y-1.5 font-sans">
          <div className="flex justify-between items-center text-slate-600">
            <span>Half Portion</span>
            <span className="font-extrabold text-[#C8232C]">ETB {item.halfFull.half.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Full Portion</span>
            <span className="font-extrabold text-[#C8232C]">ETB {item.halfFull.full.toLocaleString()}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs flex justify-between items-center font-sans">
          <span className="text-slate-600 font-medium">Price</span>
          <span className="font-extrabold text-[#C8232C] text-sm">ETB {item.price.toLocaleString()}</span>
        </div>
      );
    }
  };

  return (
    <section id="menu" className="py-14 sm:py-20 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="bg-red-50 text-[#C8232C] border border-red-100 text-xs font-bold rounded-full px-4 py-1.5 inline-block">
            <EditableText contentKey="menuBadge" fallback="BAKED FRESH IN OUR OVEN & KITCHEN" />
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 font-extrabold tracking-tight">
            <EditableText contentKey="menuTitle" fallback="Traditional Handcrafted Menu" />
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-xl mx-auto">
            <EditableText contentKey="menuSubtitle" fallback="Every dish is prepared fresh with high quality ingredients, traditional Mexican recipes, and passion." />
          </p>

          {/* Category Filter Pills (Screenshot 2) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C8232C] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Cards Grid (Screenshot 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-[24px] border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-3">
                {/* Image & Category Pill (Screenshot 2) */}
                <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill Badge top-left */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Favorite Heart Button top-right */}
                  <button
                    onClick={(e) => toggleFavorite(e, item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md text-slate-600 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${favorites[item.id] ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {!item.available && (
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center">
                      <span className="text-white font-bold text-xs bg-rose-600 px-3 py-1 rounded-full uppercase tracking-wider">
                        Sold Out Today
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Reviews */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-[#C8232C] transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Rating Stars (Screenshot 2) */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="font-extrabold text-slate-900 text-xs">4.9</span>
                    <span className="text-slate-400 text-[11px]">(110 reviews)</span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed pt-0.5">
                    {item.description}
                  </p>
                </div>

                {/* Price Box */}
                {renderPriceGrid(item)}
              </div>

              {/* Order Now Button (Screenshot 2) */}
              <div className="pt-4">
                <button
                  onClick={() => onSelectItemForOrder(item)}
                  disabled={!item.available}
                  className="w-full bg-slate-50 hover:bg-[#C8232C] hover:text-white disabled:bg-slate-100 disabled:text-slate-400 text-slate-900 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-1 transition-all border border-slate-200/80 cursor-pointer shadow-2xs"
                >
                  <span>Order Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs uppercase font-bold tracking-widest">
            No food items found in this category right now.
          </div>
        )}

      </div>
    </section>
  );
};
