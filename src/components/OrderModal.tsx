import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, OrderItem } from '../types';
import { X, ShoppingBag, CheckCircle2, Clock, Phone, Plus, Minus } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedItem?: MenuItem | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, preselectedItem }) => {
  const { menuItems, placeOrder, settings } = useApp();

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(preselectedItem || null);
  const [selectedOption, setSelectedOption] = useState<string>('Standard');
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Form fields
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<{ id: string; name: string } | null>(null);

  // When preselected item changes
  useEffect(() => {
    if (preselectedItem) {
      setSelectedItem(preselectedItem);
    } else if (menuItems.length > 0 && !selectedItem) {
      setSelectedItem(menuItems[0]);
    }
  }, [preselectedItem, menuItems]);

  // Calculate unit price whenever selected item or size option changes
  useEffect(() => {
    if (!selectedItem) return;

    if (selectedItem.priceType === 'sizes' && selectedItem.sizes) {
      if (selectedOption === 'Small') setUnitPrice(selectedItem.sizes.small);
      else if (selectedOption === 'Large') setUnitPrice(selectedItem.sizes.large);
      else {
        setSelectedOption('Medium');
        setUnitPrice(selectedItem.sizes.medium);
      }
    } else if (selectedItem.priceType === 'half_full' && selectedItem.halfFull) {
      if (selectedOption === 'Half') setUnitPrice(selectedItem.halfFull.half);
      else {
        setSelectedOption('Full');
        setUnitPrice(selectedItem.halfFull.full);
      }
    } else {
      setSelectedOption('Custom');
      setUnitPrice(selectedItem.price || 0);
    }
  }, [selectedItem, selectedOption]);

  if (!isOpen) return null;

  const totalPrice = unitPrice * quantity;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerFirstName || !phone || !selectedItem) return;

    setIsSubmitting(true);

    try {
      const orderItem: OrderItem = {
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        quantity,
        selectedOption,
        unitPrice,
        totalPrice
      };

      const orderId = await placeOrder({
        customerFirstName,
        customerLastName,
        phone,
        items: [orderItem],
        totalAmount: totalPrice,
        notes
      });

      setOrderConfirmation({
        id: orderId,
        name: `${customerFirstName} ${customerLastName}`
      });
    } catch (err) {
      alert("Error placing order. Please try calling us directly at " + settings.phone);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setOrderConfirmation(null);
    setCustomerFirstName('');
    setCustomerLastName('');
    setPhone('');
    setNotes('');
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden text-slate-900">
        
        {/* Modal Header */}
        <div className="bg-slate-50 text-slate-900 p-6 relative border-b border-slate-100">
          <button 
            onClick={resetAndClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#C8232C] text-xs font-bold uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Village Cafe Direct Order</span>
          </div>

          <h3 className="text-2xl font-serif font-extrabold text-slate-900">Place Your Food Order</h3>
          <p className="text-slate-500 text-xs font-normal mt-0.5">Pay on delivery or pickup on Menelik II Ave</p>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {orderConfirmation ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-serif font-bold text-slate-900">Order Received!</h4>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <p className="font-mono font-bold text-[#C8232C]">Order ID: #{orderConfirmation.id.slice(0, 8)}</p>
                <p className="text-slate-700"><span className="text-slate-500">Customer:</span> {orderConfirmation.name}</p>
                <p className="text-slate-700"><span className="text-slate-500">Phone:</span> {phone}</p>
                <p className="text-slate-700"><span className="text-slate-500">Item:</span> {selectedItem?.name} ({selectedOption}) x {quantity}</p>
                <p className="text-[#C8232C] font-mono font-bold text-base border-t border-slate-200 pt-2">
                  Total Amount: {totalPrice} ETB
                </p>
              </div>

              <p className="text-xs text-slate-500 flex items-center justify-center gap-1 font-normal">
                <Clock className="w-4 h-4 text-[#C8232C]" />
                <span>Our kitchen has received your order. We will prepare it fresh!</span>
              </p>

              <button
                onClick={resetAndClose}
                className="w-full bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md mt-4 cursor-pointer transition-colors"
              >
                Back to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
              
              {/* Select Food Item */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono mb-1">1. Select Food Item</label>
                <select
                  value={selectedItem?.id || ''}
                  onChange={(e) => {
                    const found = menuItems.find(m => m.id === e.target.value);
                    if (found) setSelectedItem(found);
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium text-xs focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                >
                  {menuItems.map(item => (
                    <option key={item.id} value={item.id} className="bg-white text-slate-900">
                      {item.name} ({item.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Type / Size Options */}
              {selectedItem && selectedItem.priceType === 'sizes' && selectedItem.sizes && (
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono mb-1">2. Select Size Option</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'Small', price: selectedItem.sizes.small },
                      { key: 'Medium', price: selectedItem.sizes.medium },
                      { key: 'Large', price: selectedItem.sizes.large }
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.key}
                        onClick={() => setSelectedOption(opt.key)}
                        className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedOption === opt.key
                            ? 'bg-[#C8232C] text-white font-bold border-[#C8232C] shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 font-medium hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-xs font-bold uppercase tracking-wider">{opt.key}</span>
                        <span className="text-[10px] font-mono">{opt.price} ETB</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem && selectedItem.priceType === 'half_full' && selectedItem.halfFull && (
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono mb-1">2. Select Portion Option</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'Half', price: selectedItem.halfFull.half },
                      { key: 'Full', price: selectedItem.halfFull.full }
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.key}
                        onClick={() => setSelectedOption(opt.key)}
                        className={`py-2.5 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedOption === opt.key
                            ? 'bg-[#C8232C] text-white font-bold border-[#C8232C] shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 font-medium hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-xs font-bold uppercase tracking-wider">{opt.key} Portion</span>
                        <span className="text-[10px] font-mono">{opt.price} ETB</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono font-bold text-base text-slate-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">3. Customer Information</label>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input 
                      type="text"
                      required
                      placeholder="First Name *"
                      value={customerFirstName}
                      onChange={(e) => setCustomerFirstName(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="text"
                      placeholder="Last Name"
                      value={customerLastName}
                      onChange={(e) => setCustomerLastName(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <input 
                    type="tel"
                    required
                    placeholder="Phone Number * (e.g. 093 862 5858)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-[#C8232C] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <textarea 
                    rows={2}
                    placeholder="Special Notes or Delivery Instructions (e.g. extra salsa, no onions)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono font-bold">Total Price:</span>
                  <span className="text-xl font-mono font-extrabold text-[#C8232C]">{totalPrice} ETB</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Order...' : 'CONFIRM ORDER'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
