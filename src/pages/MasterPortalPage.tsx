import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WebsiteContent, WebsiteSettings, GalleryItem } from '../types';
import { uploadImageFile } from '../firebase';
import { VillageLogo } from '../components/VillageLogo';
import { 
  ShieldCheck, 
  Lock, 
  Edit3, 
  Image as ImageIcon, 
  Palette, 
  Save, 
  UploadCloud, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Eye, 
  ArrowLeft,
  Info
} from 'lucide-react';

export const MasterPortalPage: React.FC = () => {
  const { 
    isMasterLoggedIn, 
    loginMaster, 
    logoutMaster, 
    settings, 
    content, 
    gallery, 
    updateContentText, 
    updateSettingsField, 
    publishMasterChanges,
    addGalleryItem,
    deleteGalleryItem,
    hasUnpublishedChanges,
    navigate,
    toggleMasterEditMode
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Tab inside Master Portal
  const [activeTab, setActiveTab] = useState<'wording' | 'images' | 'branding' | 'gallery'>('wording');

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Image Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Food');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginMaster(passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  const handlePublishAll = async () => {
    setIsPublishing(true);
    try {
      await publishMasterChanges();
      setPublishedSuccess(true);
      setTimeout(() => setPublishedSuccess(false), 3000);
    } catch (err) {
      alert("Error publishing changes to Firestore. Please check your network.");
    } finally {
      setIsPublishing(false);
    }
  };

  // Upload local image for hero or about or gallery
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetKey: keyof WebsiteContent) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImageFile(file, 'website-content');
      updateContentText(targetKey, imageUrl);
      alert("Image uploaded successfully! Remember to click 'Publish Website' to save globally.");
    } catch (err) {
      alert("Failed to upload image file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleNewGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !newGalleryTitle) {
      alert("Please enter an image title first before selecting a file.");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImageFile(file, 'gallery');
      await addGalleryItem({
        imageUrl,
        title: newGalleryTitle,
        category: newGalleryCategory
      });
      setNewGalleryTitle('');
      alert("New gallery photo added successfully!");
    } catch (err) {
      alert("Failed to upload gallery image.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isMasterLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] text-slate-900 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 w-full max-w-md shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-red-50 text-[#C8232C] rounded-2xl flex items-center justify-center mx-auto border border-red-100">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold font-serif text-slate-900">Father / Master Portal</h2>
            <p className="text-slate-500 text-xs">Village Cafe Global Owner Control Center</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Master Password</label>
              <input 
                type="password"
                required
                autoComplete="new-password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter master password"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
              />
              {loginError && (
                <p className="text-rose-600 text-xs mt-1 font-semibold">Invalid Master password.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Unlock Master Control
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-slate-500 hover:text-slate-900 text-xs flex items-center justify-center gap-1 pt-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VillageLogo light={false} className="h-8" />
            <span className="px-3 py-1 bg-red-50 text-[#C8232C] text-xs font-bold rounded-full border border-red-100 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> FATHER / MASTER PORTAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                toggleMasterEditMode();
                navigate('/');
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              <Eye className="w-4 h-4 text-[#C8232C]" />
              <span>Live Visual Edit Mode</span>
            </button>

            <button
              onClick={handlePublishAll}
              disabled={isPublishing}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all cursor-pointer ${
                hasUnpublishedChanges
                  ? 'bg-amber-500 hover:bg-amber-600 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isPublishing ? (
                <span>Publishing to Cloud...</span>
              ) : publishedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Published!
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" /> PUBLISH WEBSITE GLOBALLY
                </>
              )}
            </button>

            <button
              onClick={logoutMaster}
              className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold cursor-pointer"
            >
              Exit Portal
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('wording')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'wording'
                ? 'bg-[#C8232C] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            Website Text & Copywriting
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'images'
                ? 'bg-[#C8232C] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Website Images Management
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'branding'
                ? 'bg-[#C8232C] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Palette className="w-4 h-4" />
            Branding, Theme & Details
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#C8232C] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Plus className="w-4 h-4" />
            Photo Gallery
          </button>
        </div>

        {/* TAB 1: WEBSITE WORDING */}
        {activeTab === 'wording' && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-serif">Global Website Text & Titles</h3>
                <p className="text-slate-500 text-xs">Edit any sentence or headline. Changes update globally when published.</p>
              </div>

              <div className="text-xs text-[#C8232C] bg-red-50 px-3 py-2 rounded-xl border border-red-100 flex items-center gap-1.5 font-bold">
                <Info className="w-4 h-4" />
                <span>You can also click text directly on the live website!</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
              
              {/* Hero Section Wording */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-[#C8232C] uppercase tracking-wider text-[11px]">1. Hero Section</h4>
                
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Hero Badge</label>
                  <input 
                    type="text" 
                    value={content.heroBadge || ''} 
                    onChange={(e) => updateContentText('heroBadge', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Hero Headline Line 1</label>
                  <input 
                    type="text" 
                    value={content.heroTitleLine1 || ''} 
                    onChange={(e) => updateContentText('heroTitleLine1', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Hero Headline Line 2 (Italic)</label>
                  <input 
                    type="text" 
                    value={content.heroTitleLine2 || ''} 
                    onChange={(e) => updateContentText('heroTitleLine2', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-[#C8232C] font-bold focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Hero Description</label>
                  <textarea 
                    rows={3}
                    value={content.heroDescription || ''} 
                    onChange={(e) => updateContentText('heroDescription', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>
              </div>

              {/* About Section Wording */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-[#C8232C] uppercase tracking-wider text-[11px]">2. About Section</h4>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">About Title</label>
                  <input 
                    type="text" 
                    value={content.aboutTitle || ''} 
                    onChange={(e) => updateContentText('aboutTitle', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">About Title Highlight</label>
                  <input 
                    type="text" 
                    value={content.aboutTitleHighlight || ''} 
                    onChange={(e) => updateContentText('aboutTitleHighlight', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-[#C8232C] font-bold focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">About Story Paragraph 1</label>
                  <textarea 
                    rows={3}
                    value={content.aboutDescription || ''} 
                    onChange={(e) => updateContentText('aboutDescription', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">About Story Paragraph 2 (Highlighted)</label>
                  <textarea 
                    rows={2}
                    value={content.aboutStory || ''} 
                    onChange={(e) => updateContentText('aboutStory', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Menu & Callout Section Wording */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-[#C8232C] uppercase tracking-wider text-[11px]">3. Menu & Callout Banner</h4>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Menu Title</label>
                  <input 
                    type="text" 
                    value={content.menuTitle || ''} 
                    onChange={(e) => updateContentText('menuTitle', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Menu Subtitle</label>
                  <input 
                    type="text" 
                    value={content.menuSubtitle || ''} 
                    onChange={(e) => updateContentText('menuSubtitle', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Banner Headline</label>
                  <input 
                    type="text" 
                    value={content.bannerTitle || ''} 
                    onChange={(e) => updateContentText('bannerTitle', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Banner Subtitle</label>
                  <input 
                    type="text" 
                    value={content.bannerSubtitle || ''} 
                    onChange={(e) => updateContentText('bannerSubtitle', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Gallery & Footer Wording */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-[#C8232C] uppercase tracking-wider text-[11px]">4. Gallery, Contact & Footer</h4>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Gallery Title</label>
                  <input 
                    type="text" 
                    value={content.galleryTitle || ''} 
                    onChange={(e) => updateContentText('galleryTitle', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Contact Title</label>
                  <input 
                    type="text" 
                    value={content.contactTitle || ''} 
                    onChange={(e) => updateContentText('contactTitle', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Footer Description</label>
                  <textarea 
                    rows={3}
                    value={content.footerDesc || ''} 
                    onChange={(e) => updateContentText('footerDesc', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: IMAGES MANAGEMENT */}
        {activeTab === 'images' && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900 font-serif">Website Image Management</h3>
              <p className="text-slate-500 text-xs">Upload local image files or paste image URLs to update website visuals globally.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              
              {/* Hero Image */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-extrabold text-[#C8232C]">Hero Section Main Banner Image</h4>
                
                <div className="h-44 rounded-2xl overflow-hidden bg-slate-200 border border-slate-300 shadow-inner">
                  <img src={content.heroImage} alt="Hero" className="w-full h-full object-cover" />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Option A: Upload Local Image File</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'heroImage')}
                    className="w-full text-slate-700 text-xs bg-white p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Option B: Image URL</label>
                  <input 
                    type="text" 
                    value={content.heroImage || ''}
                    onChange={(e) => updateContentText('heroImage', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              {/* About Image */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-extrabold text-[#C8232C]">About Section Interior / Dish Photo</h4>

                <div className="h-44 rounded-2xl overflow-hidden bg-slate-200 border border-slate-300 shadow-inner">
                  <img src={content.aboutImage} alt="About" className="w-full h-full object-cover" />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Option A: Upload Local Image File</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'aboutImage')}
                    className="w-full text-slate-700 text-xs bg-white p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Option B: Image URL</label>
                  <input 
                    type="text" 
                    value={content.aboutImage || ''}
                    onChange={(e) => updateContentText('aboutImage', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: BRANDING & THEME */}
        {activeTab === 'branding' && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900 font-serif">Branding, Colors & Restaurant Information</h3>
              <p className="text-slate-500 text-xs">Update official contact details, opening hours, and brand details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-[#C8232C]">Restaurant Identity</h4>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Restaurant Name</label>
                  <input 
                    type="text" 
                    value={settings.restaurantName || ''}
                    onChange={(e) => updateSettingsField('restaurantName', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={settings.phone || ''}
                    onChange={(e) => updateSettingsField('phone', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-[#C8232C] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Location Address</label>
                  <input 
                    type="text" 
                    value={settings.address || ''}
                    onChange={(e) => updateSettingsField('address', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-[#C8232C]">Opening Hours & Contact</h4>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Weekday Hours</label>
                  <input 
                    type="text" 
                    value={settings.openingHoursWeekday || ''}
                    onChange={(e) => updateSettingsField('openingHoursWeekday', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Weekend Hours</label>
                  <input 
                    type="text" 
                    value={settings.openingHoursWeekend || ''}
                    onChange={(e) => updateSettingsField('openingHoursWeekend', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Inquiry Email</label>
                  <input 
                    type="email" 
                    value={settings.email || ''}
                    onChange={(e) => updateSettingsField('email', e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900 font-serif">Photo Gallery Manager</h3>
              <p className="text-slate-500 text-xs">Add new atmosphere photos or food creations to the public gallery.</p>
            </div>

            {/* Upload New Gallery Item Form */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 text-xs">
              <h4 className="font-extrabold text-[#C8232C]">Add New Gallery Photo</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Photo Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Handmade Tacos"
                    value={newGalleryTitle}
                    onChange={(e) => setNewGalleryTitle(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select 
                    value={newGalleryCategory}
                    onChange={(e) => setNewGalleryCategory(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900"
                  >
                    <option value="Food">Food</option>
                    <option value="Ambiance">Ambiance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Select File to Upload</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleNewGalleryUpload}
                    disabled={isUploading}
                    className="w-full text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Existing Gallery List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="relative bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 group h-40">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-xs">
                    <span className="font-bold text-white leading-tight">{item.title}</span>
                    <button
                      onClick={() => deleteGalleryItem(item.id)}
                      className="bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-xl flex items-center justify-center gap-1 self-end cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
