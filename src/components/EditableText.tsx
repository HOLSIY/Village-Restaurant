import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WebsiteContent, WebsiteSettings } from '../types';
import { Edit3, Check, X } from 'lucide-react';

interface EditableTextProps {
  contentKey?: keyof WebsiteContent;
  settingsKey?: keyof WebsiteSettings;
  fallback?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  contentKey,
  settingsKey,
  fallback = '',
  className = '',
  as = 'span',
  multiline = false
}) => {
  const { isMasterLoggedIn, isMasterEditMode, content, settings, updateContentText, updateSettingsField } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Get current value
  let currentValue = fallback;
  if (contentKey && content[contentKey]) {
    currentValue = content[contentKey] as string;
  } else if (settingsKey && settings[settingsKey]) {
    currentValue = settings[settingsKey] as string;
  }

  const [tempValue, setTempValue] = useState(currentValue);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (contentKey) {
      updateContentText(contentKey, tempValue);
    } else if (settingsKey) {
      updateSettingsField(settingsKey, tempValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(currentValue);
    setIsEditing(false);
  };

  const Component = as as any;

  // If not master or edit mode disabled, render pure element without overhead
  if (!isMasterLoggedIn || !isMasterEditMode) {
    return <Component className={className}>{currentValue}</Component>;
  }

  return (
    <span className="relative group inline-block max-w-full">
      <Component className={`${className} cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-amber-500 rounded px-1 transition-all`}>
        {currentValue}
      </Component>

      {/* Floating Master Edit Button on Hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setTempValue(currentValue);
          setIsEditing(true);
        }}
        title="Edit text (Master)"
        className="opacity-0 group-hover:opacity-100 absolute -top-3 -right-3 z-30 bg-amber-600 text-white p-1 rounded-full shadow-lg transition-opacity hover:bg-amber-700"
      >
        <Edit3 className="w-3.5 h-3.5" />
      </button>

      {/* Inline Modal Dialog for editing */}
      {isEditing && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-xl shadow-2xl p-5 w-full max-w-lg border border-amber-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-600" />
                Edit Website Text ({contentKey || settingsKey})
              </h3>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 text-sm p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {multiline ? (
              <textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-800 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                autoFocus
              />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave()}
                className="px-4 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700 flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                Save Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </span>
  );
};
