import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, PriceType } from '../types';
import { uploadImageFile } from '../firebase';
import { VillageLogo } from '../components/VillageLogo';
import { 
  Lock, 
  Utensils, 
  ShoppingBag, 
  Star, 
  Key, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Clock, 
  Phone, 
  ArrowLeft,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const AdminPortalPage: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    menuItems, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem,
    orders, 
    updateOrderStatus,
    reviews, 
    approveReview, 
    deleteReview,
    updateAdminPassword,
    navigate 
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'reviews' | 'password'>('orders');

  // Food Item Modal Form State
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Food Form Fields
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemCategory, setItemCategory] = useState<MenuItem['category']>('Tacos');
  const [itemPriceType, setItemPriceType] = useState<PriceType>('custom');
  
  // Prices
  const [customPrice, setCustomPrice] = useState<number>(450);
  const [sizeSmall, setSizeSmall] = useState<number>(650);
  const [sizeMedium, setSizeMedium] = useState<number>(950);
  const [sizeLarge, setSizeLarge] = useState<number>(1300);
  const [halfPrice, setHalfPrice] = useState<number>(250);
  const [fullPrice, setFullPrice] = useState<number>(450);

  const [itemImage, setItemImage] = useState<string>('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800');
  const [itemAvailable, setItemAvailable] = useState<boolean>(true);
  const [itemFeatured, setItemFeatured] = useState<boolean>(false);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  // Change Password Form
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  const openFoodModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setItemName(item.name);
      setItemDesc(item.description);
      setItemCategory(item.category);
      setItemPriceType(item.priceType);
      setCustomPrice(item.price || 0);
      if (item.sizes) {
        setSizeSmall(item.sizes.small);
        setSizeMedium(item.sizes.medium);
        setSizeLarge(item.sizes.large);
      }
      if (item.halfFull) {
        setHalfPrice(item.halfFull.half);
        setFullPrice(item.halfFull.full);
      }
      setItemImage(item.image);
      setItemAvailable(item.available);
      setItemFeatured(item.featured || false);
    } else {
      setEditingItem(null);
      setItemName('');
      setItemDesc('');
      setItemCategory('Tacos');
      setItemPriceType('custom');
      setCustomPrice(450);
      setSizeSmall(650);
      setSizeMedium(950);
      setSizeLarge(1300);
      setHalfPrice(250);
      setFullPrice(450);
      setItemImage('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800');
      setItemAvailable(true);
      setItemFeatured(false);
    }
    setIsFoodModalOpen(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadImageFile(file, 'menu');
      setItemImage(url);
    } catch (err) {
      alert("Failed to upload food image.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveFoodItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName) return;

    const foodData: Omit<MenuItem, 'id'> = {
      name: itemName,
      description: itemDesc,
      category: itemCategory,
      priceType: itemPriceType,
      price: customPrice,
      sizes: itemPriceType === 'sizes' ? { small: Number(sizeSmall), medium: Number(sizeMedium), large: Number(sizeLarge) } : undefined,
      halfFull: itemPriceType === 'half_full' ? { half: Number(halfPrice), full: Number(fullPrice) } : undefined,
      image: itemImage,
      available: itemAvailable,
      featured: itemFeatured
    };

    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, foodData);
      } else {
        await addMenuItem(foodData);
      }
      setIsFoodModalOpen(false);
    } catch (err) {
      alert("Error saving food item.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;

    await updateAdminPassword(newPassword);
    setPasswordChangeSuccess(true);
    setTimeout(() => {
      setPasswordChangeSuccess(false);
      setNewPassword('');
    }, 3000);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] text-slate-900 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/80 p-8 w-full max-w-md rounded-3xl shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-red-50 text-[#C8232C] border border-red-100 flex items-center justify-center mx-auto rounded-2xl">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold font-serif text-slate-900">Manager Portal</h2>
            <p className="text-slate-500 text-xs">Village Cafe Restaurant Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Password</label>
              <input 
                type="password"
                required
                autoComplete="new-password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter manager password"
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
              />
              {loginError && (
                <p className="text-rose-600 text-xs mt-1 font-semibold">Invalid Admin password.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Login to Admin Portal
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-slate-500 hover:text-slate-900 text-xs flex items-center justify-center gap-1 pt-2 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'pending');

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VillageLogo light={false} className="h-8" />
            <span className="px-3 py-1 bg-red-50 text-[#C8232C] border border-red-100 text-xs font-bold rounded-full flex items-center gap-1">
              ADMIN PORTAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C8232C]" /> Public Site
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-2 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#C8232C] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Orders Management
            {pendingOrders.length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-extrabold animate-bounce">
                {pendingOrders.length} NEW
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'menu'
                ? 'bg-[#C8232C] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Utensils className="w-4 h-4" />
            Menu Management
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-[#C8232C] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Star className="w-4 h-4" />
            Reviews Moderation
          </button>

          <button
            onClick={() => setActiveTab('password')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'password'
                ? 'bg-[#C8232C] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Key className="w-4 h-4" />
            Admin Security
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-serif">Incoming Customer Orders</h3>
                <p className="text-slate-500 text-xs">Live order stream received from the public website.</p>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id}
                  className={`p-6 rounded-3xl border transition-all ${
                    order.status === 'pending'
                      ? 'bg-amber-50 border-amber-300 shadow-md'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">
                          Customer: {order.customerFirstName} {order.customerLastName}
                        </span>
                        <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full ${
                          order.status === 'pending' ? 'bg-amber-500 text-slate-950' :
                          order.status === 'accepted' ? 'bg-blue-600 text-white' :
                          order.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#C8232C] font-bold flex items-center gap-1 mt-1">
                        <Phone className="w-3.5 h-3.5" /> Call Customer: {order.phone}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block font-medium">
                        Received: {new Date(order.createdAt).toLocaleTimeString()}
                      </span>
                      <span className="text-lg font-black text-[#C8232C]">
                        {order.totalAmount} ETB
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 text-xs">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        <div>
                          <span className="font-bold text-slate-800">{item.itemName}</span>
                          <span className="text-[#C8232C] font-semibold ml-2">({item.selectedOption})</span>
                        </div>
                        <div className="font-bold text-slate-700">
                          Qty: {item.quantity} x {item.unitPrice} ETB = <span className="text-[#C8232C] font-extrabold">{item.totalPrice} ETB</span>
                        </div>
                      </div>
                    ))}

                    {order.notes && (
                      <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        Special Notes: "{order.notes}"
                      </p>
                    )}
                  </div>

                  {/* Order Status Action Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-4 mt-2">
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'accepted')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Check className="w-4 h-4" /> Accept Order
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'rejected')}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <X className="w-4 h-4" /> Reject Order
                        </button>
                      </>
                    )}

                    {order.status === 'accepted' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Check className="w-4 h-4" /> Mark Order Completed
                      </button>
                    )}
                  </div>

                </div>
              ))}

              {orders.length === 0 && (
                <div className="bg-white p-12 text-center rounded-3xl border border-slate-200/80 text-slate-500 text-sm font-medium">
                  No incoming orders yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MENU MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-serif">Restaurant Menu Items</h3>
                <p className="text-slate-500 text-xs">Add, edit, change prices, and set availability for menu items.</p>
              </div>

              <button
                onClick={() => openFoodModal()}
                className="flex items-center gap-2 bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold px-5 py-2.5 rounded-2xl text-xs shadow-md cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" /> Add New Food Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 p-5 space-y-4 flex flex-col justify-between shadow-xs">
                  <div className="space-y-3">
                    <div className="h-44 rounded-2xl overflow-hidden relative bg-slate-100 border border-slate-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[#C8232C] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border border-red-100">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-start justify-between">
                      <h4 className="font-extrabold text-slate-900 text-base">{item.name}</h4>
                      <button
                        onClick={() => updateMenuItem(item.id, { available: !item.available })}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer ${
                          item.available ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
                        }`}
                      >
                        {item.available ? 'Available' : 'Sold Out'}
                      </button>
                    </div>

                    <p className="text-slate-500 text-xs line-clamp-2 font-medium">{item.description}</p>

                    <div className="text-xs text-[#C8232C] font-extrabold">
                      Price Type: <span className="uppercase text-slate-700 font-bold">{item.priceType}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => openFoodModal(item)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#C8232C]" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${item.name}?`)) {
                          deleteMenuItem(item.id);
                        }
                      }}
                      className="p-2 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 font-serif">Customer Reviews Moderation</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-3 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 text-sm">{rev.name}</span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      rev.approved !== false ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}>
                      {rev.approved !== false ? 'Approved' : 'Pending Review'}
                    </span>
                  </div>

                  <p className="text-slate-600 text-xs italic font-serif">"{rev.comment}"</p>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    {rev.approved === false && (
                      <button
                        onClick={() => approveReview(rev.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Approve Review
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ADMIN SECURITY */}
        {activeTab === 'password' && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 max-w-md mx-auto space-y-6 shadow-xs">
            <h3 className="text-xl font-extrabold text-slate-900 font-serif">Change Admin Password</h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Manager Password</label>
                <input 
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all"
              >
                Update Admin Password
              </button>

              {passwordChangeSuccess && (
                <p className="text-emerald-600 text-xs text-center font-bold">Password updated successfully!</p>
              )}
            </form>
          </div>
        )}

      </div>

      {/* Food Add/Edit Modal */}
      {isFoodModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl p-6 w-full max-w-lg space-y-4 my-8 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base font-serif">
                {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
              </h3>
              <button onClick={() => setIsFoodModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFoodItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Food Name *</label>
                <input 
                  type="text" 
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea 
                  rows={2}
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select 
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value as any)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  >
                    {['Tacos', 'Burritos', 'Bowls', 'Quesadilla', 'Nachos', 'Drinks', 'Desserts', 'Specials'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Price System Type *</label>
                  <select 
                    value={itemPriceType}
                    onChange={(e) => setItemPriceType(e.target.value as PriceType)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  >
                    <option value="custom">Custom Price (Single)</option>
                    <option value="sizes">Multiple Sizes (Small/Med/Lrg)</option>
                    <option value="half_full">Half / Full Portion</option>
                  </select>
                </div>
              </div>

              {/* Price Fields dependent on selector */}
              {itemPriceType === 'custom' && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="block text-slate-700 font-bold mb-1">Price (ETB)</label>
                  <input 
                    type="number" 
                    required
                    value={customPrice}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-[#C8232C] font-extrabold"
                  />
                </div>
              )}

              {itemPriceType === 'sizes' && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Small (ETB)</label>
                    <input 
                      type="number" 
                      value={sizeSmall}
                      onChange={(e) => setSizeSmall(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Medium (ETB)</label>
                    <input 
                      type="number" 
                      value={sizeMedium}
                      onChange={(e) => setSizeMedium(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Large (ETB)</label>
                    <input 
                      type="number" 
                      value={sizeLarge}
                      onChange={(e) => setSizeLarge(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold"
                    />
                  </div>
                </div>
              )}

              {itemPriceType === 'half_full' && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Half Portion (ETB)</label>
                    <input 
                      type="number" 
                      value={halfPrice}
                      onChange={(e) => setHalfPrice(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Full Portion (ETB)</label>
                    <input 
                      type="number" 
                      value={fullPrice}
                      onChange={(e) => setFullPrice(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-bold mb-1">Upload Food Image File</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  disabled={isUploadingImage}
                  className="w-full text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-4 pt-2 font-bold">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={itemAvailable} 
                    onChange={(e) => setItemAvailable(e.target.checked)} 
                    className="rounded text-[#C8232C]"
                  />
                  <span>Available Today</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={itemFeatured} 
                    onChange={(e) => setItemFeatured(e.target.checked)} 
                    className="rounded text-[#C8232C]"
                  />
                  <span>Popular / Featured</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFoodModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold rounded-xl cursor-pointer shadow-md transition-all"
                >
                  Save Food Item
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
