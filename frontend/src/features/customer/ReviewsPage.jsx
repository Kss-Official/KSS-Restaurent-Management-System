import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  User,
  ChevronLeft,
  ChevronRight,
  Leaf,
  X
} from 'lucide-react';

const guestStoriesSets = [
  [
    {
      id: 1,
      quote: "Absolutely loved the food and the ambience. A perfect place for a special occasion!",
      author: "Amit Verma",
      location: "Bangalore",
      rating: 5
    },
    {
      id: 2,
      quote: "The flavours are exceptional and the service is top-notch. Highly recommended!",
      author: "Priya Nair",
      location: "Hyderabad",
      rating: 5
    },
    {
      id: 3,
      quote: "A beautiful dining experience with a thoughtfully crafted menu. Will definitely be back!",
      author: "Rahul Desai",
      location: "Chennai",
      rating: 5
    }
  ],
  [
    {
      id: 4,
      quote: "The truffle risotto and the sommelier wine pairings were pure poetry. Truly unforgettable evening!",
      author: "Sneha Kapoor",
      location: "Mumbai",
      rating: 5
    },
    {
      id: 5,
      quote: "Flawless hospitality from start to finish. Every single course was presented with meticulous artistry.",
      author: "Vikram Malhotra",
      location: "Delhi",
      rating: 5
    },
    {
      id: 6,
      quote: "Lunar sets the gold standard for Italian fine dining in India. We will cherish this celebration forever.",
      author: "Ananya Iyer",
      location: "Pune",
      rating: 5
    }
  ],
  [
    {
      id: 7,
      quote: "Remarkable culinary depth and exceptional warmth. The handcrafted pasta is an absolute masterclass.",
      author: "Rohan Mehta",
      location: "Kolkata",
      rating: 5
    },
    {
      id: 8,
      quote: "From the candlelight table to the bespoke course recommendations, everything was truly five-star.",
      author: "Kavita Sharma",
      location: "Jaipur",
      rating: 5
    },
    {
      id: 9,
      quote: "A dining sanctuary where passion meets perfection. Can't wait to return on our next anniversary!",
      author: "Arjun Reddy",
      location: "Hyderabad",
      rating: 5
    }
  ]
];

export const ReviewsPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { reviews, setReviews } = useAppStore();

  const [heroVisible, setHeroVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favoriteDish, setFavoriteDish] = useState('');
  const [guestName, setGuestName] = useState(currentUser?.name || '');
  const [submitted, setSubmitted] = useState(false);

  // Div 2 - Guest Stories Carousel State & Animation Ref
  const [currentStorySet, setCurrentStorySet] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const storiesRef = useRef(null);
  const [storiesVisible, setStoriesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoriesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-40px' }
    );

    if (storiesRef.current) {
      observer.observe(storiesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Div 3 - Lunar Experience Animation Ref
  const experienceRef = useRef(null);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExperienceVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-40px' }
    );

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrevStory = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentStorySet((prev) => (prev === 0 ? guestStoriesSets.length - 1 : prev - 1));
    setTimeout(() => setIsSliding(false), 300);
  };

  const handleNextStory = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentStorySet((prev) => (prev === guestStoriesSets.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsSliding(false), 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="bg-[#FAF7F2] text-[#2B1B1F] w-full pb-0 font-hanken">
      {/* ========================================================
          1. Hero Section matching Reference Images 1 & 2
          - Full-width Deep Burgundy (#4C1824) background starting at y=0
          - Left: Gold "REVIEWS", bold "Loved by Those Who Dine With Us", subtitle
          - Right: High-res Dining Room Table Photo (/reviews-hero-lunar.jpg) with rounded corners
          - Synchronized with floating navbar animation
         ======================================================== */}
      <section className="relative w-full bg-[#4C1824] pt-24 sm:pt-26 md:pt-28 lg:pt-30 pb-12 sm:pb-16 md:pb-20 overflow-hidden text-white">
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Heading & Narrative */}
            <div 
              style={{
                transform: heroVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
                opacity: heroVisible ? 1 : 0,
                transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="lg:col-span-5 space-y-4 sm:space-y-5"
            >
              {/* Gold Eyebrow Tag */}
              <p className="font-hanken font-bold text-xs sm:text-[13px] tracking-[0.24em] text-[#FABE24] uppercase">
                REVIEWS
              </p>

              {/* Main Heading */}
              <h1 className="font-hanken font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                Loved by Those Who Dine With Us
              </h1>

              {/* Subtitle Description */}
              <p className="font-hanken text-sm sm:text-base md:text-[17px] text-[#F3ECE4]/90 font-normal leading-relaxed max-w-xl">
                Real experiences, genuine moments and wonderful memories at Lunar.
              </p>
            </div>

            {/* Right Column: Dining Room Table Photo */}
            <div 
              style={{
                transform: heroVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
                opacity: heroVisible ? 1 : 0,
                transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
              }}
              className="lg:col-span-7 flex justify-center lg:justify-end"
            >
              <div className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A0E15] border border-white/10 group">
                <img
                  src="/reviews-hero-lunar.jpg"
                  alt="Loved by Those Who Dine With Us - Lunar Restaurant"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. Div 2: "OUR GUESTS' STORIES" - Testimonials Carousel
          - Matches Reference Image media_1794985525977_bbdb1d26.jpg & media_1794985542919_836060cb.png
          - Flanked Eyebrow: — OUR GUESTS' STORIES —
          - Title: "Trusted by Food Lovers" (Deep Burgundy #3B0E17 serif font)
          - Subtitle: "From intimate dinners to special celebrations, our guests love the Lunar experience."
          - Carousel with circular left/right buttons and 3 cards
          - Staggered bottom-to-top scroll animation + smooth slide transitions
         ======================================================== */}
      <section 
        ref={storiesRef}
        className="w-full bg-[#FAF7F2] py-16 sm:py-20 md:py-24 border-b border-[#E8DDD4]/60 font-hanken overflow-hidden"
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 max-w-[1440px] mx-auto">
          
          {/* Eyebrow & Section Header */}
          <div 
            style={{
              transform: storiesVisible ? 'translateY(0)' : 'translateY(35px)',
              opacity: storiesVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14"
          >
            {/* Flanked Eyebrow */}
            <div className="inline-flex items-center justify-center gap-3">
              <span className="w-8 sm:w-12 h-[1px] bg-[#D4ADA3]"></span>
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#8C3445] uppercase">
                OUR GUESTS' STORIES
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#D4ADA3]"></span>
            </div>

            {/* Main Title */}
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#3B0E17] tracking-tight">
              Trusted by Food Lovers
            </h2>

            {/* Subtitle */}
            <p className="font-hanken text-sm sm:text-base text-[#6E4A43] max-w-2xl mx-auto font-normal leading-relaxed">
              From intimate dinners to special celebrations, our guests love the Lunar experience.
            </p>
          </div>

          {/* Carousel Slider Row: Left Arrow + 3 Cards + Right Arrow */}
          <div className="relative flex items-center gap-3 sm:gap-4 md:gap-6">
            
            {/* Circular Left Arrow Button */}
            <button
              onClick={handlePrevStory}
              aria-label="Previous reviews"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#EADBCC] shadow-xs hover:shadow-md flex items-center justify-center text-[#2B1B1F] hover:text-[#4C1824] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 3 Testimonial Cards Grid */}
            <div 
              style={{
                opacity: isSliding ? 0.35 : 1,
                transform: isSliding ? 'scale(0.985)' : 'scale(1)',
                transition: 'all 280ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 flex-1"
            >
              {guestStoriesSets[currentStorySet].map((story, index) => (
                <div
                  key={story.id}
                  style={{
                    transform: storiesVisible 
                      ? 'translateY(0) scale(1)' 
                      : 'translateY(60px) scale(0.96)',
                    opacity: storiesVisible ? 1 : 0,
                    transition: `transform 850ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 140}ms, opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 140}ms`,
                  }}
                  className="bg-white rounded-[22px] sm:rounded-[24px] p-6 sm:p-7 md:p-8 border border-[#ECE5DA] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Orange Quote Mark */}
                    <div className="text-[#C06E2F] mb-3 select-none flex items-center">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Testimonial Quote Text */}
                    <p className="font-hanken text-[#2B1B1F] text-sm sm:text-[15px] leading-relaxed font-normal min-h-[64px]">
                      {story.quote}
                    </p>

                    {/* 5 Amber/Gold Stars */}
                    <div className="flex items-center gap-1 text-[#F6AA29] my-4">
                      {[...Array(story.rating || 5)].map((_, starIdx) => (
                        <Star key={starIdx} className="w-3.5 h-3.5 fill-current stroke-none" />
                      ))}
                    </div>
                  </div>

                  {/* Author & City */}
                  <div>
                    <h4 className="font-hanken font-bold text-[#1F1617] text-sm sm:text-base leading-tight">
                      {story.author}
                    </h4>
                    <p className="font-hanken text-xs sm:text-[13px] text-[#754D45] mt-0.5">
                      {story.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Circular Right Arrow Button */}
            <button
              onClick={handleNextStory}
              aria-label="Next reviews"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#EADBCC] shadow-xs hover:shadow-md flex items-center justify-center text-[#2B1B1F] hover:text-[#4C1824] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {guestStoriesSets.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  if (isSliding) return;
                  setIsSliding(true);
                  setCurrentStorySet(dotIdx);
                  setTimeout(() => setIsSliding(false), 300);
                }}
                aria-label={`Go to slide set ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentStorySet === dotIdx
                    ? 'w-6 h-2 bg-[#8C3445]'
                    : 'w-2 h-2 bg-[#D4ADA3]/60 hover:bg-[#D4ADA3]'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. Div 3: "LUNAR EXPERIENCE" - More Than Just a Meal
          - Matches Reference Image media_1794985773539_e779d8a9.jpg & media_1794985871248_a11a95bd.png
          - Left: 3-Image Collage (Tall Dining Room with LUNAR glass badge + Lasagna + Chocolate Lava Cake)
          - Right: "LUNAR EXPERIENCE", "More Than Just a Meal" (Serif), Narrative, "Reserve Now →" pill button
         ======================================================== */}
      <section 
        ref={experienceRef}
        className="w-full bg-[#FAF7F2] pt-14 sm:pt-18 md:pt-20 pb-10 sm:pb-12 md:pb-14 font-hanken overflow-hidden"
      >
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1540px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: 3-Image Collage Gallery */}
            <div 
              style={{
                transform: experienceVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
                opacity: experienceVisible ? 1 : 0,
                transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="lg:col-span-7 xl:col-span-7"
            >
              <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-5 items-stretch">
                
                {/* Tall Dining Room Photo (7 cols) */}
                <div className="col-span-7 relative rounded-[20px] sm:rounded-[26px] overflow-hidden shadow-lg bg-[#2A0E15] group">
                  <img
                    src="/reviews-experience-dining.jpg"
                    alt="Lunar Dining Room Experience"
                    className="w-full h-full object-cover min-h-[340px] sm:min-h-[400px] md:min-h-[460px] transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Floating LUNAR Glass Pill Badge on top-right matching Image 1 */}
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 bg-black/45 backdrop-blur-md text-white px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-sm pointer-events-none select-none">
                    <Leaf className="w-3 h-3 text-white" strokeWidth={2} />
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase">LUNAR</span>
                  </div>
                </div>

                {/* Stacked 2 Images (5 cols) */}
                <div className="col-span-5 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-between">
                  {/* Top: Lasagna */}
                  <div className="flex-1 relative rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md bg-[#2A0E15] group">
                    <img
                      src="/reviews-experience-lasagna.jpg"
                      alt="Handcrafted Layered Lasagna"
                      className="w-full h-full object-cover min-h-[160px] sm:min-h-[190px] md:min-h-[220px] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom: Chocolate Lava Cake */}
                  <div className="flex-1 relative rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md bg-[#2A0E15] group">
                    <img
                      src="/reviews-experience-dessert.jpg"
                      alt="Chocolate Lava Cake with Fresh Berries"
                      className="w-full h-full object-cover min-h-[160px] sm:min-h-[190px] md:min-h-[220px] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Narrative & Action */}
            <div 
              style={{
                transform: experienceVisible ? 'translateY(0)' : 'translateY(40px)',
                opacity: experienceVisible ? 1 : 0,
                transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, opacity 850ms cubic-bezier(0.16, 1, 0.3, 1) 150ms'
              }}
              className="lg:col-span-5 xl:col-span-5 space-y-4 sm:space-y-6 lg:pl-2 xl:pl-6"
            >
              {/* Eyebrow */}
              <p className="font-hanken font-bold text-xs sm:text-[13px] tracking-[0.24em] text-[#8C3445] uppercase select-none">
                LUNAR EXPERIENCE
              </p>

              {/* Main Heading */}
              <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#3B0E17] tracking-tight leading-[1.15]">
                More Than Just a Meal
              </h2>

              {/* Narrative Paragraph */}
              <p className="font-hanken text-sm sm:text-base md:text-[17px] text-[#6E4A43] font-normal leading-relaxed max-w-xl">
                At Lunar, we’re proud to be part of your special moments from everyday dinners to celebrations with loved ones. Our great food, warm hospitality and elegant ambience make every visit truly memorable.
              </p>

              {/* Reserve Now Pill Button */}
              <div className="pt-2 sm:pt-4">
                <Link
                  to="/book-table"
                  className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#4C1824] hover:bg-[#380E17] text-white text-sm sm:text-[15px] font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 shadow-md cursor-pointer group"
                >
                  <span>Reserve Now</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1 font-mono">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. CTA BANNER SECTION: Reserve Your Table
          (Exact Match to Menu Page Div 4 & About Page Div 5)
          - Deep burgundy gradient card container with large rounded corners
          - Centered Gold Eyebrow: "RESERVE YOUR TABLE"
          - Heading: "Planning a Special Dining Experience?"
          - Subtitle: "Book your table now and let us take care of the perfect Italian dining experience for you."
          - White Pill Button: "Reserve Now →"
         ======================================================== */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 max-w-[1720px] mx-auto pt-4 sm:pt-6 pb-2 sm:pb-4 font-hanken">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-gradient-to-br from-[#4A0E1B] via-[#350711] to-[#24040A] py-12 sm:py-16 md:py-18 px-6 sm:px-12 md:px-16 text-center text-white shadow-xl shadow-[#350711]/20 border border-white/10">
          
          {/* Subtle warm ambient glow behind heading */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#FABE24]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-5">
            {/* Gold Eyebrow Tag */}
            <p className="font-hanken font-bold text-xs sm:text-[13px] uppercase tracking-[0.24em] text-[#FABE24] select-none">
              RESERVE YOUR TABLE
            </p>

            {/* Main Heading */}
            <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.18]">
              Planning a Special Dining Experience?
            </h2>

            {/* Subtitle Paragraph */}
            <p className="font-hanken text-sm sm:text-base font-normal text-[#F2E5DB]/85 leading-relaxed max-w-xl mx-auto">
              Book your table now and let us take care of the perfect Italian dining experience for you.
            </p>

            {/* White Pill Button: Reserve Now */}
            <div className="pt-2 sm:pt-3">
              <Link
                to="/book-table"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#FAF7F2] text-[#350711] font-bold text-sm sm:text-[15px] transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 shadow-md cursor-pointer group"
              >
                <span>Reserve Now</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Review Submission & Verified Reflections Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl p-6 sm:p-8 overflow-y-auto border border-[#EADBCC] shadow-2xl">
            <button
              onClick={() => setShowReviewModal(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#754D45]">Share Your Review</span>
              <h3 className="font-hanken text-2xl font-bold text-[#2B181C] mt-1">Reflect on Your Dining</h3>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Thank you! Your verified review has been published.</span>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4 mb-8">
              <div>
                <label className="text-xs font-bold uppercase text-[#754D45] block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#EADBCC] focus:outline-none focus:border-[#4C1824] focus:ring-1 focus:ring-[#4C1824]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#754D45] block mb-1">Rating</label>
                <div className="flex gap-2 text-[#FABE24]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-[#FABE24] text-[#FABE24]' : 'text-gray-300'}`} />
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
                  className="w-full text-xs p-3 rounded-xl border border-[#EADBCC] focus:outline-none focus:border-[#4C1824] focus:ring-1 focus:ring-[#4C1824]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#754D45] block mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the flavors, ambiance, or staff service..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#EADBCC] focus:outline-none focus:border-[#4C1824] focus:ring-1 focus:ring-[#4C1824]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#4C1824] hover:bg-[#381019] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </form>

            <h4 className="font-hanken font-bold text-lg text-[#2B181C] mb-4">Recent Verified Reflections</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EADBCC]/60 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-[#2B181C]">{rev.guest}</span>
                    <div className="flex gap-0.5 text-[#FABE24]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#6E4A43]">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;