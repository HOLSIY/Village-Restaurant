import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Eye, Edit2, UploadCloud, LogOut, CheckCircle2, Layout } from 'lucide-react';

export const MasterTopBar: React.FC = () => {
  const { 
    isMasterLoggedIn, 
    isMasterEditMode, 
    toggleMasterEditMode, 
    hasUnpublishedChanges, 
    publishMasterChanges, 
    logoutMaster,
    navigate
  } = useApp();

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  if (!isMasterLoggedIn) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await publishMasterChanges();
      setPublishedSuccess(true);
      setTimeout(() => setPublishedSuccess(false), 3000);
    } catch (err) {
      alert("Failed to publish changes globally. Please check internet connection.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-[#0F0F0F] border-b border-[#D4AF37]/30 text-[#F5F2ED] py-2 px-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        
        {/* Left Status Badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#D4AF37]/10 text-[#D4AF37] font-bold border border-[#D4AF37]/30 uppercase text-[10px] tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            Master Mode
          </span>

          {hasUnpublishedChanges ? (
            <span className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 animate-pulse">
              ● Pending Drafts
            </span>
          ) : (
            <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
              ✓ Published
            </span>
          )}
        </div>

        {/* Center Actions */}
        <div className="flex items-center gap-2">
          {/* Toggle Live Visual Text Editing */}
          <button
            onClick={toggleMasterEditMode}
            className={`flex items-center gap-1.5 px-3 py-1 font-bold text-[10px] uppercase tracking-wider border cursor-pointer transition-colors ${
              isMasterEditMode 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                : 'bg-[#141414] text-slate-300 border-white/10 hover:border-[#D4AF37]/50'
            }`}
          >
            {isMasterEditMode ? (
              <>
                <Edit2 className="w-3 h-3 text-black" />
                Live Editing: ON
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-slate-400" />
                Live Editing: OFF
              </>
            )}
          </button>

          {/* Master Portal Link */}
          <button
            onClick={() => navigate('/fathersenaf21')}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#141414] hover:bg-white/10 text-slate-200 border border-white/10 text-[10px] uppercase tracking-wider cursor-pointer"
          >
            <Layout className="w-3 h-3 text-[#D4AF37]" />
            Master Portal
          </button>

          {/* Publish Globally Button */}
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`flex items-center gap-1.5 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-black cursor-pointer shadow-md transition-all ${
              hasUnpublishedChanges
                ? 'bg-[#D4AF37] hover:bg-[#c29f2f] animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {isPublishing ? (
              <span>Saving...</span>
            ) : publishedSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Published!
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5" />
                PUBLISH GLOBALLY
              </>
            )}
          </button>
        </div>

        {/* Right Logout */}
        <button
          onClick={logoutMaster}
          className="flex items-center gap-1 text-slate-400 hover:text-rose-400 text-[10px] uppercase tracking-wider cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Exit
        </button>

      </div>
    </div>
  );
};
