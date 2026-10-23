import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EditableText } from './EditableText';
import { Star, MessageSquarePlus, CheckCircle, X } from 'lucide-react';

export const Reviews: React.FC = () => {
  const { reviews, addReview } = useApp();
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  // Review form state
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Filter approved reviews for public
  const approvedReviews = reviews.filter(r => r.approved !== false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    setIsSubmitting(true);
    try {
      await addReview({
        name,
        rating,
        comment,
        image: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200`
      });
      setSubmittedMessage(true);
      setTimeout(() => {
        setSubmittedMessage(false);
        setShowReviewModal(false);
        setName('');
        setComment('');
        setRating(5);
      }, 2500);
    } catch (err) {
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <span className="bg-red-50 text-[#C8232C] border border-red-100 text-xs font-bold rounded-full px-4 py-1.5 inline-block mb-3">
              GUEST FEEDBACK
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 font-extrabold tracking-tight">
              <EditableText contentKey="reviewsTitle" fallback="Loved by Food Lovers in Addis" />
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm mt-1 font-normal max-w-xl">
              <EditableText contentKey="reviewsSubtitle" fallback="Read honest experiences from our valued guests on Menelik II Ave." />
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="flex items-center gap-2 bg-[#C8232C] hover:bg-[#A81C24] text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {approvedReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} 
                    />
                  ))}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic font-normal">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-6">
                <img 
                  src={rev.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"} 
                  alt={rev.name} 
                  className="w-9 h-9 rounded-full border border-slate-200 object-cover"
                />
                <div>
                  <h4 className="text-xs font-serif font-bold text-slate-900">{rev.name}</h4>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold">Verified Guest</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl text-slate-900 border border-slate-100">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-serif text-lg font-bold text-slate-900">Write a Review for Village Cafe</h3>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedMessage ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-slate-900">Thank you!</h4>
                <p className="text-xs text-slate-600">Your review has been submitted and will appear shortly after approval.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-500 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Samuel Desta"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-500 mb-1">Rating</label>
                  <div className="flex gap-2 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-500 mb-1">Your Review</label>
                  <textarea 
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience with our tortas and service..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-[#C8232C] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#C8232C] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
