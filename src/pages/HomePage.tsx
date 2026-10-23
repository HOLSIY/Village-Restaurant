import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { MasterTopBar } from '../components/MasterTopBar';
import { Hero } from '../components/Hero';
import { AboutPreview } from '../components/AboutPreview';
import { PopularDishes } from '../components/PopularDishes';
import { CalloutBanner } from '../components/CalloutBanner';
import { Gallery } from '../components/Gallery';
import { Reviews } from '../components/Reviews';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { OrderModal } from '../components/OrderModal';
import { MenuItem } from '../types';

export const HomePage: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedItemForOrder, setSelectedItemForOrder] = useState<MenuItem | null>(null);

  const handleOpenOrderModal = () => {
    setSelectedItemForOrder(null);
    setIsOrderModalOpen(true);
  };

  const handleSelectItemForOrder = (item: MenuItem) => {
    setSelectedItemForOrder(item);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] font-sans antialiased text-[#F5F2ED] selection:bg-[#D4AF37] selection:text-slate-950">
      
      {/* Top Bar for Master Control Center */}
      <MasterTopBar />

      {/* Main Navigation Header */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* Main Sections */}
      <main>
        <Hero onOpenOrderModal={handleOpenOrderModal} />
        <AboutPreview />
        <PopularDishes onSelectItemForOrder={handleSelectItemForOrder} />
        <CalloutBanner onOpenOrderModal={handleOpenOrderModal} />
        <Gallery />
        <Reviews />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Ordering Modal */}
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        preselectedItem={selectedItemForOrder}
      />

    </div>
  );
};
