import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  ThumbsUp, 
  ShieldCheck, 
  Send,
  User
} from 'lucide-react';

export const ReviewsPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { reviews, setReviews } = useAppStore();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favoriteDish, setFavoriteDish] = useState('');
  const [guestName, setGuestName] = useState(currentUser?.name || '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newRev = {
      id: Date.now(),
      guest: guestName || 'Esteemed Patron',
      rating,
      comment: favoriteDish ? `${comment} (Favorite: ${favoriteDish})` : comment,
      date: 'Just now',
      verified: true
    };

    setReviews(prev => [newRev, ...prev]);
    setComment('');
    setFavoriteDish('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="py-12 bg-[#F2E5DB] min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E5DB] text-[#754D45] text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[#A2766B] text-[#A2766B]" /> Guest Testimonials & Accolades
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#38231F]">
            Patron Reviews & Reflections
          </h1>
          <p className="text-sm text-[#754D45]">
            Read unfiltered impressions from guests who have indulged in our sensory culinary journeys.
          </p>
        </div>

        {/* Rating Breakdown Banner */}
        <div className="bg-white rounded-3xl p-8 border border-[#D0ADA0]/60 shadow-md grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:border-r border-[#F2E5DB] md:pr-8">
            <p className="text-xs uppercase font-bold tracking-widest text-[#754D45]">Overall Excellence</p>
            <div className="font-serif text-5xl font-bold text-[#38231F] mt-2">4.92</div>
            <div className="flex justify-center gap-1 text-[#A2766B] my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#754D45]">Based on 380+ Verified Diners</p>
          </div>

          <div className="space-y-2 text-xs md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="w-24 font-bold text-[#38231F]">Culinary Precision</span>
              <div className="flex-1 bg-[#F2E5DB] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#754D45] h-full rounded-full w-[98%]"></div>
              </div>
              <span className="font-mono font-bold text-[#754D45]">4.9 / 5</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-24 font-bold text-[#38231F]">Floor Hospitality</span>
              <div className="flex-1 bg-[#F2E5DB] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#754D45] h-full rounded-full w-[96%]"></div>
              </div>
              <span className="font-mono font-bold text-[#754D45]">4.8 / 5</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-24 font-bold text-[#38231F]">Atmosphere</span>
              <div className="flex-1 bg-[#F2E5DB] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#754D45] h-full rounded-full w-[99%]"></div>
              </div>
              <span className="font-mono font-bold text-[#754D45]">5.0 / 5</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-24 font-bold text-[#38231F]">Sommelier Pairings</span>
              <div className="flex-1 bg-[#F2E5DB] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#754D45] h-full rounded-full w-[95%]"></div>
              </div>
              <span className="font-mono font-bold text-[#754D45]">4.8 / 5</span>
            </div>
          </div>
        </div>

        {/* Form and List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Submission Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D0ADA0]/60 shadow-md space-y-6 h-fit">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#754D45]">Share Your Review</span>
              <h3 className="font-serif text-xl font-bold text-[#38231F] mt-1">Reflect on Your Dining</h3>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Thank you! Your verified review has been published.</span>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-[#754D45] block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#D0ADA0]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#754D45] block mb-1">Rating</label>
                <div className="flex gap-2 text-[#A2766B]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-[#A2766B]' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#754D45] block mb-1">Favorite Dish (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Dry-Aged Wagyu Ribeye"
                  value={favoriteDish}
                  onChange={(e) => setFavoriteDish(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#D0ADA0]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#754D45] block mb-1">Your Review</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the flavors, ambiance, or staff service..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#D0ADA0]"
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full shadow-lg"
                icon={Send}
              >
                Submit Review
              </Button>
            </form>
          </div>

          {/* List of Reviews */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#38231F]">Recent Guest Reflections</h3>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-6 border border-[#D0ADA0]/50 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F2E5DB] border border-[#754D45]/30 flex items-center justify-center font-serif font-bold text-[#754D45]">
                        {rev.guest[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-base text-[#38231F]">{rev.guest}</h4>
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Verified Diner
                          </span>
                        </div>
                        <p className="text-[11px] text-[#754D45]">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 text-[#A2766B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#38231F] leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReviewsPage;