import React from 'react';
import { EditableText } from './EditableText';
import { Leaf, Award, Clock, Heart, ArrowRight } from 'lucide-react';

export const AboutPreview: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main White Card Canvas */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-slate-100 shadow-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Text Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badge */}
              <div>
                <span className="bg-red-50 text-[#C8232C] border border-red-100 text-xs font-bold rounded-full px-4 py-1.5 inline-block">
                  <EditableText contentKey="aboutBadge" fallback="ABOUT VILLAGE CAFE" />
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 font-extrabold tracking-tight leading-tight">
                <EditableText contentKey="aboutTitle" fallback="We Serve Authentic" /> {' '}
                <EditableText 
                  contentKey="aboutTitleHighlight" 
                  fallback="Mexican Tacos & Happiness" 
                  className="text-[#C8232C] italic font-serif font-normal block sm:inline" 
                />
              </h2>

              {/* Paragraphs */}
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                <EditableText 
                  contentKey="aboutDescription" 
                  multiline
                  fallback="At Village Cafe, we believe that great Mexican food brings people together. Located on Menelik II Avenue in Addis Ababa, our chefs craft every torta, taco, and burrito with authentic Mexican recipes, imported dried chilies, and fresh local produce." 
                />
              </p>

              <p className="text-slate-700 text-xs leading-relaxed border-l-4 border-[#C8232C] pl-4 py-3 bg-red-50/50 rounded-r-xl italic font-serif font-medium">
                <EditableText 
                  contentKey="aboutStory" 
                  multiline
                  fallback="From our signature toasted bolillo rolls to our slow-cooked meats and house-brewed drinks, we deliver an unforgettable culinary journey in Addis Ababa." 
                />
              </p>

              {/* CTA */}
              <div className="pt-2">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Full Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Right Showcase Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" 
                  alt="Village Cafe Interior Atmosphere" 
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Experience Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-3">
                  <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xl font-serif font-extrabold text-slate-900 block leading-none">100%</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Authentic Taste</span>
                  </div>
                </div>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-center space-y-1.5 hover:border-red-200 transition-colors">
                  <div className="w-8 h-8 mx-auto bg-red-100 text-[#C8232C] rounded-xl flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-extrabold text-slate-800">Fresh Local</h4>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-center space-y-1.5 hover:border-red-200 transition-colors">
                  <div className="w-8 h-8 mx-auto bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-extrabold text-slate-800">Master Chefs</h4>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-center space-y-1.5 hover:border-red-200 transition-colors">
                  <div className="w-8 h-8 mx-auto bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-extrabold text-slate-800">Fast & Hot</h4>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-center space-y-1.5 hover:border-red-200 transition-colors">
                  <div className="w-8 h-8 mx-auto bg-pink-100 text-pink-700 rounded-xl flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-extrabold text-slate-800">Made With Love</h4>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
