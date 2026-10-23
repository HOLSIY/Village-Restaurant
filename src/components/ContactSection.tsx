import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EditableText } from './EditableText';
import { MapPin, Phone, Clock, Calendar, CheckCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings } = useApp();

  // Table reservation form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('07:00 PM');
  const [guests, setGuests] = useState('2 People');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFullName('');
      setPhone('');
      setSpecialRequests('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main White Canvas Box (Screenshot 4) */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-slate-100 shadow-sm p-6 sm:p-10 lg:p-12 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Visit Our Branch Details (Screenshot 4) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badge */}
              <div>
                <span className="bg-red-50 text-[#C8232C] border border-red-100 text-xs font-bold rounded-full px-4 py-1.5 inline-block">
                  <EditableText contentKey="contactTitle" fallback="JOIN US ON MENELIK II AVENUE" />
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight">
                Visit Our Branch
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
                <EditableText 
                  contentKey="contactSubtitle" 
                  multiline
                  fallback="Located in the heart of Addis Ababa on Menelik II Avenue, Village Cafe offers an authentic Mexican dining experience. Visit us for handcrafted tacos, burritos, and signature dishes, or contact us for takeaway and reservations." 
                />
              </p>

              {/* 3 Information Cards (Screenshot 4) */}
              <div className="space-y-4 pt-2">
                
                {/* 1. Address Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-start gap-4 hover:border-slate-200 transition-colors">
                  <div className="p-3 bg-red-100/60 text-[#C8232C] rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-900">ADDRESS LOCATION</h4>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">
                      <EditableText settingsKey="address" fallback="MENELIK II AVENUE, ADDIS ABABA" />
                    </p>
                    <span className="inline-block mt-1 bg-red-100/80 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                      Google Maps Plus: XQXC+8W
                    </span>
                  </div>
                </div>

                {/* 2. Phone Booking & Delivery Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-start gap-4 hover:border-slate-200 transition-colors">
                  <div className="p-3 bg-amber-100/60 text-amber-700 rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-900">PHONE BOOKING & DELIVERY</h4>
                    <p className="text-sm font-extrabold text-[#C8232C] mt-0.5">
                      <EditableText settingsKey="phone" fallback="+251 93 862 5858" />
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Order by phone, pay safely on delivery (Cash / Telebirr)</p>
                  </div>
                </div>

                {/* 3. Business Hours Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-start gap-4 hover:border-slate-200 transition-colors">
                  <div className="p-3 bg-emerald-100/60 text-emerald-700 rounded-xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-900">BUSINESS HOURS</h4>
                    <p className="text-xs font-extrabold text-slate-800 mt-0.5">
                      <EditableText settingsKey="openingHoursWeekday" fallback="Open Daily Until 11:00 PM" />
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Book a Table Reservation Form (Screenshot 4) */}
            <div className="lg:col-span-6 bg-slate-50/80 border border-slate-200/80 rounded-[28px] p-6 sm:p-8 shadow-2xs">
              <div className="mb-6 space-y-1">
                <h3 className="text-2xl font-serif font-extrabold text-slate-900">Book a Table</h3>
                <p className="text-xs text-slate-500 font-medium">Secure your table instantly</p>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-slate-900">Table Reservation Confirmed!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you {fullName}! We have received your reservation request for {guests} on {date || 'today'} at {time}. See you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookTable} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-500 mb-1">
                        FULL NAME *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dawit Abebe"
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-500 mb-1">
                        ETHIOPIAN PHONE *
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0999208873"
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-500 mb-1">
                        DATE *
                      </label>
                      <input 
                        type="date" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-500 mb-1">
                        TIME *
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none cursor-pointer"
                      >
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                        <option value="09:00 PM">09:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-500 mb-1">
                        NUMBER OF GUESTS
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none cursor-pointer"
                      >
                        <option value="1 Person">1 Person</option>
                        <option value="2 People">2 People</option>
                        <option value="4 People">4 People</option>
                        <option value="6 People">6 People</option>
                        <option value="8+ Large Party">8+ Large Party</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-500 mb-1">
                      SPECIAL REQUESTS / OCCASIONS
                    </label>
                    <textarea 
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Birthday dining table set-up, or requests for high-chairs for toddlers."
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>CONFIRM TABLE RESERVATION</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
