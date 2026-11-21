import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { RESTAURANT_IMAGES } from '../../utils/constants';
import Button from '../../components/common/Button';
import { 
  Calendar, 
  Utensils, 
  Wine, 
  Sparkles, 
  Clock, 
  Star, 
  Award, 
  Coffee, 
  ShieldCheck, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowUpRight,
  UtensilsCrossed,
  Layers,
  Umbrella,
  Users,
  Flame,
  Cake,
  ChefHat,
  QrCode,
  ShoppingCart,
  CreditCard,
  Receipt,
  MapPin,
  Scan,
  ConciergeBell,
  FileText,
  Navigation,
  User,
  LogIn,
  ShoppingBag
} from 'lucide-react';

export const HomePage = () => {
  const { isAuthenticated, isCustomer, role } = useAuth();
  const navigate = useNavigate();
  const [cardsVisible, setCardsVisible] = useState(false);
  const signatureSectionRef = useRef(null);

  // Div 3 Ref & Visibility (LHS/RHS slide entrance animation & 50/50 split)
  const div3Ref = useRef(null);
  const [div3Visible, setDiv3Visible] = useState(false);

  // Div 4 Ref & Visibility (LHS/RHS slide entrance animation)
  const div4Ref = useRef(null);
  const [div4Visible, setDiv4Visible] = useState(false);

  // Div Services Ref & Visibility (Smooth Simultaneous Entrance Animation)
  const servicesRef = useRef(null);
  const servicesCardsRef = useRef(null);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [servicesCardsVisible, setServicesCardsVisible] = useState(false);

  // Div 6 Testimonials Ref & Visibility (Smooth Staggered Entrance Animation)
  const testimonialsRef = useRef(null);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);

  // Div 3 Curated Menu Selection State
  const [activeMenuTab, setActiveMenuTab] = useState('appetizers');

  // Div 5 Testimonials Carousel State
  const [testimonialPage, setTestimonialPage] = useState(0);

  // Div 6 Reservation Form State
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '1 Person'
  });
  const [reservationSubmitted, setReservationSubmitted] = useState(false);

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setReservationSubmitted(true);
    setTimeout(() => {
      handleBookTableClick();
    }, 1400);
  };

  // Hero Video Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroContentVisible, setHeroContentVisible] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroContentVisible(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  const heroVideos = [
    '/hero-video-1.mp4',
    '/hero-video-2.mp4',
    '/hero-video-3.mp4',
  ];

  // Seamlessly switch and play active video one-by-one, pausing background videos
  useEffect(() => {
    heroVideos.forEach((_, idx) => {
      const vid = videoRefs.current[idx];
      if (vid) {
        if (idx === currentSlide) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      }
    });
  }, [currentSlide]);

  const handleVideoEnded = () => {
    setCurrentSlide((prev) => (prev + 1) % heroVideos.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroVideos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroVideos.length) % heroVideos.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === signatureSectionRef.current) {
            setCardsVisible(entry.isIntersecting);
          } else if (entry.target === div3Ref.current) {
            setDiv3Visible(entry.isIntersecting);
          } else if (entry.target === div4Ref.current) {
            setDiv4Visible(entry.isIntersecting);
          } else if (entry.target === servicesRef.current) {
            setServicesVisible(entry.isIntersecting);
          } else if (entry.target === testimonialsRef.current) {
            setTestimonialsVisible(entry.isIntersecting);
          }
        });
      },
      { 
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.15 
      }
    );

    // Dedicated observer specifically for Services Cards so animation ONLY triggers when user arrives at the cards
    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === servicesCardsRef.current) {
            setServicesCardsVisible(entry.isIntersecting);
          }
        });
      },
      {
        rootMargin: "0px 0px -160px 0px",
        threshold: 0.15,
      }
    );

    if (signatureSectionRef.current) observer.observe(signatureSectionRef.current);
    if (div3Ref.current) observer.observe(div3Ref.current);
    if (div4Ref.current) observer.observe(div4Ref.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (servicesCardsRef.current) cardsObserver.observe(servicesCardsRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);

    return () => {
      observer.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  const handleBookTableClick = () => {
    if (!isAuthenticated || (!isCustomer && role !== 'admin')) {
      navigate('/login?redirect=/book-table');
      return;
    }
    navigate('/book-table');
  };

  const signatureDishes = [
    {
      title: "Truffle Risotto",
      price: "$42.00",
      image: "/truffle-risotto.jpg",
      flexClass: "w-[80vw] sm:w-[300px] lg:w-auto lg:flex-[1.25] lg:min-w-0",
      imgHeight: "h-[220px] sm:h-[250px] lg:h-[260px]",
    },
    {
      title: "Slow-Cooked Osso Buco",
      price: "$56.00",
      image: "/osso-buco.jpg",
      flexClass: "w-[72vw] sm:w-[260px] lg:w-auto lg:flex-[1.05] lg:min-w-0",
      imgHeight: "h-[190px] sm:h-[220px] lg:h-[225px]",
    },
    {
      title: "Tiramisu alla Lunar",
      price: "$18.00",
      image: "/tiramisu-lunar.jpg",
      flexClass: "w-[65vw] sm:w-[220px] lg:w-auto lg:flex-[0.9] lg:min-w-0",
      imgHeight: "h-[160px] sm:h-[180px] lg:h-[185px]",
    },
    {
      title: "Truffle Risotto",
      price: "$42.00",
      image: "/dish-4.jpg",
      flexClass: "w-[60vw] sm:w-[200px] lg:w-auto lg:flex-[0.8] lg:min-w-0",
      imgHeight: "h-[140px] sm:h-[155px] lg:h-[160px]",
    },
  ];

  // Div 3: Curated Menu Categories (Exact Reference Image 1 Specifications)
  const curatedMenuCategories = {
    appetizers: {
      label: 'Appetizers',
      image: '/curated-bruschetta.jpg',
      alt: 'Artisanal Bruschetta al Pomodoro with cherry tomatoes on slate',
      items: [
        { name: 'Bruschetta al Pomodoro', price: '$12.00' },
        { name: 'Caprese Salad', price: '$14.00' },
        { name: 'Arancini di Riso', price: '$16.00' },
        { name: 'Prosciutto e Melone', price: '$18.00' },
        { name: 'Burrata with Roasted Peppers', price: '$20.00' }
      ]
    },
    mainCourse: {
      label: 'Main Course',
      image: '/osso-buco.jpg',
      alt: 'Slow-Cooked Osso Buco with Saffron Risotto',
      items: [
        { name: 'Truffle Risotto', price: '$42.00' },
        { name: 'Slow-Cooked Osso Buco', price: '$56.00' },
        { name: 'Handcrafted Tagliatelle al Tartufo', price: '$38.00' },
        { name: 'Pan-Seared Chilean Sea Bass', price: '$48.00' },
        { name: 'Bistecca alla Fiorentina', price: '$65.00' }
      ]
    },
    desserts: {
      label: 'Desserts',
      image: '/tiramisu-lunar.jpg',
      alt: 'Tiramisu alla Lunar inside chocolate sphere',
      items: [
        { name: 'Tiramisu alla Lunar', price: '$18.00' },
        { name: 'Warm Dark Chocolate Fondant', price: '$16.00' },
        { name: 'Sicilian Pistachio Cannoli', price: '$14.00' },
        { name: 'Vanilla Bean Panna Cotta', price: '$15.00' },
        { name: 'Artisanal Gelato Selection', price: '$12.00' }
      ]
    },
    wine: {
      label: 'Wine',
      image: RESTAURANT_IMAGES.wineCellar,
      alt: 'Curated Italian Wine Cellar Collection',
      items: [
        { name: 'Barolo DOCG, Marchesi di Barolo', price: '$28.00' },
        { name: 'Brunello di Montalcino, Biondi-Santi', price: '$34.00' },
        { name: 'Amarone della Valpolicella Classico', price: '$32.00' },
        { name: 'Franciacorta Cuvée Prestige Brut', price: '$24.00' },
        { name: 'Gavi di Gavi DOCG, La Scolca', price: '$20.00' }
      ]
    },
    specials: {
      label: 'Specials',
      image: '/truffle-risotto.jpg',
      alt: 'Chef Reserve White Truffle Risotto',
      items: [
        { name: 'Hokkaido Scallops & Imperial Caviar', price: '$54.00' },
        { name: 'A5 Wagyu Beef Carpaccio', price: '$46.00' },
        { name: 'Lobster Tail Thermidor with Saffron', price: '$58.00' },
        { name: 'Black Truffle Gnocchi Dorati', price: '$44.00' },
        { name: 'Wood-Fired Wild Turbot with Capers', price: '$52.00' }
      ]
    }
  };

  const services = [
    {
      icon: Utensils,
      title: "Fine Dining Tasting Menu",
      desc: "Seven-course culinary journey meticulously designed each season by Executive Chef Marco Pierre."
    },
    {
      icon: Wine,
      title: "Sommelier Wine Pairing",
      desc: "Curated selections from our 1,200-bottle cellar spanning Old World vintages and organic vineyards."
    },
    {
      icon: Sparkles,
      title: "Private Celebrations",
      desc: "Intimate private dining rooms with personalized menus, bespoke floral arrangements, and dedicated staff."
    },
    {
      icon: Coffee,
      title: "Artisanal Mocha Lounge",
      desc: "Rare micro-lot coffee beans roasted specifically to create our trademark velvet espresso cocktails."
    }
  ];

  // Div 5: Guest Reviews matching Exact Reference Image 1
  const guestReviews = [
    {
      quote: "Absolutely loved the food and the ambience. A perfect place for a special occasion!",
      author: "Amit Verma",
      location: "Bangalore",
      rating: 5
    },
    {
      quote: "The flavours are exceptional and the service is top-notch. Highly recommended!",
      author: "Priya Nair",
      location: "Hyderabad",
      rating: 5
    },
    {
      quote: "A beautiful dining experience with a thoughtfully crafted menu. Will definitely be back!",
      author: "Rahul Desai",
      location: "Chennai",
      rating: 5
    },
    {
      quote: "The truffle risotto and osso buco were beyond perfection. Lunar has raised the bar for fine dining.",
      author: "Sneha Kapoor",
      location: "Mumbai",
      rating: 5
    },
    {
      quote: "From the warm welcome to the bespoke wine pairing, every detail was orchestrated flawlessly.",
      author: "Vikram Malhotra",
      location: "Delhi",
      rating: 5
    },
    {
      quote: "An unforgettable anniversary dinner. The atmosphere, staff poise, and desserts are world-class.",
      author: "Ananya Iyer",
      location: "Pune",
      rating: 5
    }
  ];

  const totalReviewPages = Math.ceil(guestReviews.length / 3);
  const nextTestimonials = () => {
    setTestimonialPage((prev) => (prev + 1) % totalReviewPages);
  };
  const prevTestimonials = () => {
    setTestimonialPage((prev) => (prev - 1 + totalReviewPages) % totalReviewPages);
  };

  return (
    <div className="bg-[#F2E5DB] text-[#38231F] w-full">
      
      {/* 1. Hero Banner with Sequential Background Videos (Exact Reference Image 1 Design) */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden w-full bg-black">
        {/* Background Videos playing one by one with smooth crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroVideos.map((src, idx) => (
            <video
              key={src}
              ref={(el) => (videoRefs.current[idx] = el)}
              src={src}
              muted
              autoPlay={idx === 0}
              playsInline
              onEnded={handleVideoEnded}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            />
          ))}
          {/* Luxury Cinematic Dark Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/35 to-black/50 pointer-events-none" />
        </div>

        {/* Center Content: "Welcome to Lunar" exactly like Image 2 & 3 with entrance synchronization */}
        <div className={`relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          heroContentVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
        }`}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-white tracking-wide font-sans select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            Welcome to Lunar
          </h1>

          {/* Reserve the Table CTA Button */}
          <div className="mt-6 sm:mt-8">
            <button
              onClick={handleBookTableClick}
              className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#4C1824] hover:bg-[#38111A] text-white font-hanken font-medium text-sm sm:text-base border border-white/20 shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xs cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-[#FABE24] group-hover:rotate-12 transition-transform duration-300" />
              <span>Reserve the Table</span>
              <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Left Arrow Navigation Button (Exact Image 1 Circle Control) */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Navigation Button (Exact Image 1 Circle Control) */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {heroVideos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx
                  ? 'w-2 h-2 bg-white scale-125 shadow-sm'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. Signature Dishes Section (Exact Image 1 Design with Staggered RHS Entrance Animation) */}
      <section 
        ref={signatureSectionRef}
        className="w-full bg-[#4C1824] py-16 sm:py-20 md:py-24 overflow-hidden"
      >
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto">
          
          {/* Header - Left Aligned exactly like Reference Image 1 */}
          <div className="max-w-3xl space-y-2 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-sans">
              Our Signature Dishes
            </h2>
            <p className="text-sm sm:text-base text-[#E0AEB9] font-normal leading-relaxed">
              Discover the pinnacle of fine dining at Lunar with our signature dishes.
            </p>
          </div>

          {/* 4 Cards Showcase - Pure Luxury Horizontal Entrance, Zero Lines/Scrollbars */}
          <div className="w-full overflow-hidden">
            <div className="flex flex-nowrap items-start gap-4 sm:gap-6 lg:gap-7 xl:gap-8 w-full overflow-x-auto lg:overflow-visible pb-4 pt-2 no-scrollbar">
              {signatureDishes.map((dish, index) => {
                // Calibrated staggered delays: 0ms, 160ms, 320ms, 480ms
                const delays = [0, 160, 320, 480];
                const delayMs = delays[index] || 0;

                return (
                  <div
                    key={index}
                    onClick={() => navigate('/menu')}
                    style={{
                      // Natural curved swoop trajectory: moves 95px from right, 28px from below, with 1.8deg subtle leveling rotation
                      transform: cardsVisible 
                        ? 'translate3d(0, 0, 0) rotate(0deg) scale(1)' 
                        : 'translate3d(95px, 28px, 0) rotate(1.8deg) scale(0.95)',
                      opacity: cardsVisible ? 1 : 0,
                      visibility: cardsVisible ? 'visible' : 'hidden',
                      pointerEvents: cardsVisible ? 'auto' : 'none',
                      // Smooth spring-like curve entrance when visible, and instant clean reset when hidden (zero ghosting/light-version)
                      transition: cardsVisible
                        ? `transform 950ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, visibility 0ms ${delayMs}ms`
                        : 'none',
                    }}
                    className={`group shrink-0 lg:shrink cursor-pointer ${dish.flexClass} hover:-translate-y-1.5 transition-transform duration-300`}
                  >
                    {/* Dish Image Container matching Image 1 */}
                    <div className={`w-full ${dish.imgHeight} overflow-hidden rounded-xl bg-black/25 shadow-xl shadow-black/30 border border-white/10 group-hover:border-white/25 transition-all duration-300`}>
                      <img
                        src={dish.image}
                        alt={dish.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Dish Details: Title, Price & Square Arrow Button */}
                    <div className="mt-3.5 sm:mt-4 flex items-start justify-between gap-2 px-0.5">
                      <div className="pr-2">
                        <h3 className="text-sm sm:text-[15px] font-normal text-white group-hover:text-[#E0AEB9] transition-colors leading-snug">
                          {dish.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <span className="text-sm sm:text-[15px] font-light text-white/90">
                          {dish.price}
                        </span>
                        <div 
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm border border-white/25 flex items-center justify-center text-white/80 group-hover:border-white group-hover:bg-white group-hover:text-[#4C1824] transition-all duration-200"
                          title="View Dish Details"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Curated Menu Selection Section (Exact Reference Image Design & 50/50 Split) */}
      <section className="w-full bg-[#FAF4EE] py-16 sm:py-20 md:py-24 border-b border-[#E8DDD4]/60 overflow-hidden">
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto">
          
          {/* Centered Heading: exact match to Image 1 */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[38px] font-semibold text-[#1C1316] tracking-tight leading-[1.25] font-hanken">
              Our menu is a carefully curated<br className="hidden sm:inline" /> selection of Italian masterpieces.
            </h2>
          </div>

          {/* Centered Category Pills: exact match to Image 1 */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-14 font-hanken">
            {Object.entries(curatedMenuCategories).map(([key, category]) => {
              const isActive = activeMenuTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveMenuTab(key)}
                  className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#4C1824] text-white shadow-md shadow-[#4C1824]/20'
                      : 'bg-white text-[#2B1B1F] border border-[#E7DDD5] hover:border-[#4C1824]/40 hover:text-[#4C1824]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* 2-Column Showcase (Exact 50/50 Half-Half Split with Calibrated Viewport Trigger & Smooth Staggered Animations) */}
          <div ref={div3Ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center overflow-hidden">
            
            {/* Left Column (50%): Menu Items with Divider Lines — Smooth Staggered Cascade from LHS */}
            <div
              style={{
                transform: div3Visible ? 'translateX(0)' : 'translateX(-80px)',
                opacity: div3Visible ? 1 : 0,
                transition: 'transform 1200ms cubic-bezier(0.19, 1, 0.22, 1), opacity 1000ms ease-out',
              }}
              className="w-full space-y-0"
            >
              {curatedMenuCategories[activeMenuTab].items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate('/menu')}
                  style={{
                    transform: div3Visible ? 'translateX(0)' : 'translateX(-40px)',
                    opacity: div3Visible ? 1 : 0,
                    transition: `transform 1100ms cubic-bezier(0.19, 1, 0.22, 1) ${idx * 90}ms, opacity 900ms ease-out ${idx * 90}ms`,
                  }}
                  className="flex items-center justify-between py-4 sm:py-4.5 border-b border-[#E8DFD7] cursor-pointer group hover:bg-[#FAF0E6]/60 px-2 sm:px-3 rounded-lg transition-all duration-200 font-hanken"
                >
                  {/* Dish Name with Interactive Hover Gold Indicator */}
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FABE24] mr-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    <span className="text-sm sm:text-[15.5px] font-medium text-[#231815] group-hover:text-[#4C1824] group-hover:translate-x-0.5 transition-all duration-200">
                      {item.name}
                    </span>
                  </div>

                  {/* Dish Price */}
                  <span className="text-sm sm:text-[15.5px] font-medium text-[#231815] group-hover:text-[#4C1824] tabular-nums shrink-0 ml-4 transition-colors">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Column (50%): Featured Image — Smooth Scale & Glide from RHS */}
            <div
              style={{
                transform: div3Visible ? 'translateX(0) scale(1)' : 'translateX(80px) scale(0.96)',
                opacity: div3Visible ? 1 : 0,
                transition: 'transform 1250ms cubic-bezier(0.19, 1, 0.22, 1) 120ms, opacity 1050ms ease-out 120ms',
              }}
              className="w-full"
            >
              <div className="relative w-full h-[310px] sm:h-[350px] lg:h-[380px] xl:h-[410px] rounded-2xl md:rounded-[22px] overflow-hidden shadow-xl shadow-[#38231F]/15 border border-[#E8DDD4] bg-[#2E141B] group">
                <img
                  key={activeMenuTab}
                  src={curatedMenuCategories[activeMenuTab].image}
                  alt={curatedMenuCategories[activeMenuTab].alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Ambient luxury subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. The Story of Lunar (Exact Reference Image 1 Design with Poppins font & LHS/RHS Entrance Animation) */}
      <section ref={div4Ref} className="w-full bg-[#FAF5EF] overflow-hidden border-b border-[#E8DDD4]/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch w-full overflow-hidden">
          
          {/* Left Column: Full-Height Fine Dining Atmosphere Photo with Elegant Quote Overlay — Animates in from LHS */}
          <div
            style={{
              transform: div4Visible ? 'translateX(0)' : 'translateX(-80px)',
              opacity: div4Visible ? 1 : 0,
              transition: 'transform 1250ms cubic-bezier(0.19, 1, 0.22, 1), opacity 1000ms ease-out',
            }}
            className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] lg:h-auto min-h-[360px] lg:min-h-[520px] overflow-hidden group"
          >
            <img
              src="/lunar-story-dining.jpg"
              alt="The Story of Lunar Fine Dining Atmosphere"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Cinematic Gradient Overlay ensuring perfect contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 pointer-events-none" />

            {/* Quote & Brand Vision Text exactly matching User's Image */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 lg:p-12 xl:p-14">
              {/* Vibrant Terracotta Orange Quotation Mark Icon */}
              <div className="mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#D57B35] fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Exact Quote Text in Poppins Font */}
              <p className="font-poppins text-sm sm:text-base md:text-lg lg:text-xl font-normal text-white leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                At Lunar, we bring people together through authentic Italian cuisine, warm hospitality, and memorable dining experiences.
              </p>
            </div>
          </div>

          {/* Right Column: The Story of Lunar Details (Strict Poppins Font) — Animates in from RHS */}
          <div
            style={{
              transform: div4Visible ? 'translateX(0)' : 'translateX(80px)',
              opacity: div4Visible ? 1 : 0,
              transition: 'transform 1250ms cubic-bezier(0.19, 1, 0.22, 1), opacity 1000ms ease-out',
            }}
            className="flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-10 sm:py-14 lg:py-16 bg-[#FAF5EF]"
          >
            
            {/* Tag / Category */}
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6D62] select-none">
              ABOUT US
            </span>

            {/* Main Heading */}
            <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold text-[#1C1417] leading-tight mt-2.5 mb-4 sm:mb-5 tracking-tight">
              The Story of Lunar
            </h2>

            {/* Narrative Description */}
            <p className="font-poppins text-xs sm:text-sm lg:text-[15px] font-normal text-[#5A453F] leading-relaxed max-w-xl mb-6 sm:mb-8">
              Lunar is a fine dining restaurant that celebrates the richness of Italian cuisine. Rooted in tradition and inspired by modern culinary craft, we focus on fresh, locally sourced ingredients, timeless recipes, and a warm, welcoming dining experience.
            </p>

            {/* Pill Border "Reserve Now" Button */}
            <div className="mb-8 sm:mb-10">
              <button
                onClick={handleBookTableClick}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-2 sm:py-2.5 rounded-full border border-[#2B1B1F] text-[#2B1B1F] hover:bg-[#2B1B1F] hover:text-white transition-all duration-200 text-xs sm:text-sm font-poppins font-medium cursor-pointer shadow-sm active:scale-95"
              >
                Reserve Now
              </button>
            </div>

            {/* Thin Horizontal Divider */}
            <div className="border-t border-[#E8DDD4] pt-6 sm:pt-8 max-w-lg">
              {/* Statistics Row with Vertical Divider */}
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                
                {/* Stat 1: 10+ Years */}
                <div className="pr-3 sm:pr-4">
                  <p className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1C1417] tracking-tight">
                    10+
                  </p>
                  <p className="font-poppins text-[11px] sm:text-xs text-[#754D45] font-normal mt-1 leading-snug">
                    Years of Culinary Excellence
                  </p>
                </div>

                {/* Stat 2: 20+ Awards */}
                <div className="border-l border-[#E8DDD4] pl-4 sm:pl-6 lg:pl-8">
                  <p className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1C1417] tracking-tight">
                    20+
                  </p>
                  <p className="font-poppins text-[11px] sm:text-xs text-[#754D45] font-normal mt-1 leading-snug">
                    Awards & Recognitions
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          OUR SERVICES SECTION: More Than a Meal
          (Added immediately after Div 4 without deleting or modifying any existing div)
          Matching Reference Image:
          - Top Header: — OUR SERVICES — / More Than a Meal / Subtitle / Gold swoosh
          - 3 Service Cards:
            1. Dining Experiences (7 services)
            2. Events & Celebrations (4 services)
            3. Digital Convenience (5 services)
          - Centered "Reserve Now →" pill button
         ======================================================== */}
      <section ref={servicesRef} className="w-full bg-[#FAF7F2] py-16 sm:py-20 md:py-24 border-b border-[#E8DDD4]/60 font-hanken overflow-hidden">
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto">
          
          {/* Header Area with Smooth Scroll Entrance Animation */}
          <div 
            style={{
              transform: servicesVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: servicesVisible ? 1 : 0,
              transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            {/* Flanked Eyebrow Tag */}
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-[#D4ADA3]"></span>
              <p className="font-hanken font-bold text-xs sm:text-[12.5px] uppercase tracking-[0.24em] text-[#5B1A28] select-none">
                OUR SERVICES
              </p>
              <span className="w-8 h-[1px] bg-[#D4ADA3]"></span>
            </div>

            {/* Main Heading */}
            <h2 className="font-hanken text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#4C1824] tracking-tight leading-tight">
              More Than a Meal
            </h2>

            {/* Subtitle Paragraph */}
            <p className="font-hanken text-sm sm:text-base text-[#6E4A43] font-normal leading-relaxed max-w-xl mx-auto">
              A complete dining experience with exceptional services, memorable celebrations, and modern conveniences.
            </p>

            {/* Golden Crescent Swoosh */}
            <div className="flex justify-center pt-1 pb-4">
              <svg className="w-20 h-3 text-[#FABE24]" viewBox="0 0 80 12" fill="none">
                <path d="M 4 2 C 28 12, 52 12, 76 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* 3 Service Cards Grid: Simultaneous Bottom-to-Top Animation */}
          <div ref={servicesCardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 xl:gap-9 items-stretch mt-8 sm:mt-10">
            
            {/* ---------------- CARD 1: Dining Experiences ---------------- */}
            <div 
              style={{
                transform: servicesCardsVisible ? 'translateY(0)' : 'translateY(110px)',
                opacity: servicesCardsVisible ? 1 : 0,
                visibility: servicesCardsVisible ? 'visible' : 'hidden',
                transition: servicesCardsVisible
                  ? 'transform 1800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1600ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
              }}
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#EADBCC] shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Photo with Floating Badge */}
                <div className="relative">
                  <div className="overflow-hidden rounded-[20px] sm:rounded-[22px] bg-[#EFE5DB] aspect-[285/227]">
                    <img
                      src="/service-dining.jpg"
                      alt="Dining Experiences"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  {/* Floating Badge overlapping bottom-left corner */}
                  <div className="absolute -bottom-4 sm:-bottom-5 left-4 sm:left-5 w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-2xl bg-[#4C1824] flex items-center justify-center text-white shadow-md shadow-[#4C1824]/20 z-10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                      <path d="M12 4a1.5 1.5 0 0 1 1.5 1.5c0 .3-.1.6-.3.8A8 8 0 0 1 20 14H4a8 8 0 0 1 6.8-7.7c-.2-.2-.3-.5-.3-.8A1.5 1.5 0 0 1 12 4z" />
                      <path d="M2 17h20" />
                      <path d="M7 20h10" />
                    </svg>
                  </div>
                </div>

                {/* Card Content with top padding to accommodate the floating badge */}
                <div className="pt-6 sm:pt-7 space-y-4">
                  {/* Header Row */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-hanken font-bold text-xl sm:text-[22px] text-[#2B181C]">
                        Dining Experiences
                      </h3>
                      <span className="bg-[#FAF4EE] text-[#5B1A28] border border-[#EADBCC] text-xs font-semibold px-3 py-0.5 rounded-full">
                        7 Services
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#7A5B53] mt-1 leading-relaxed">
                      Versatile dining options to suit every taste and occasion.
                    </p>
                  </div>

                  {/* 7 Services Grid: 4 items top, 3 items bottom */}
                  <div className="space-y-2 pt-1">
                    {/* Row 1: 4 items */}
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <path d="M12 4a1.5 1.5 0 0 1 1.5 1.5c0 .3-.1.6-.3.8A8 8 0 0 1 20 14H4a8 8 0 0 1 6.8-7.7c-.2-.2-.3-.5-.3-.8A1.5 1.5 0 0 1 12 4z" />
                          <path d="M2 17h20" />
                          <path d="M7 20h10" />
                        </svg>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Buffet Dining</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <Coffee className="w-4 h-4 text-[#5B1A28]" />
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Breakfast Service</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <Utensils className="w-4 h-4 text-[#5B1A28]" />
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Lunch Service</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <Wine className="w-4 h-4 text-[#5B1A28]" />
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Dinner Service</span>
                      </div>
                    </div>

                    {/* Row 2: 3 items */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <ellipse cx="12" cy="7" rx="9" ry="3" />
                          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                          <path d="M3 17c0 1.66 4 3 9 3s9-1.34 9-3" />
                        </svg>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Brunch Service</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <path d="M4 10a8 8 0 0 1 16 0H4z" />
                          <path d="M12 10v11" />
                          <path d="M7 16h10" />
                          <path d="M9 21h6" />
                        </svg>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Outdoor Dining</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Private Dining</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- CARD 2: Events & Celebrations ---------------- */}
            <div 
              style={{
                transform: servicesCardsVisible ? 'translateY(0)' : 'translateY(110px)',
                opacity: servicesCardsVisible ? 1 : 0,
                visibility: servicesCardsVisible ? 'visible' : 'hidden',
                transition: servicesCardsVisible
                  ? 'transform 1800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1600ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
              }}
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#EADBCC] shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Photo with Floating Badge */}
                <div className="relative">
                  <div className="overflow-hidden rounded-[20px] sm:rounded-[22px] bg-[#EFE5DB] aspect-[285/227]">
                    <img
                      src="/service-events.jpg"
                      alt="Events & Celebrations"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  {/* Floating Badge overlapping bottom-left corner */}
                  <div className="absolute -bottom-4 sm:-bottom-5 left-4 sm:left-5 w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-2xl bg-[#4C1824] flex items-center justify-center text-white shadow-md shadow-[#4C1824]/20 z-10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                      <path d="M5.8 11.3 2 22l10.7-3.79" />
                      <path d="M4 3h.01" />
                      <path d="M22 8h.01" />
                      <path d="M15 2h.01" />
                      <path d="M22 20h.01" />
                      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
                      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.64-.72 1.08-1.37.98a1.14 1.14 0 0 0-.48.07l-.35.15" />
                      <path d="M11 13c1.93 1.93 2.8 4.55 2 6-1.45.8-4.07-.07-6-2s-2.8-4.55-2-6c1.45-.8 4.07.07 6 2Z" />
                    </svg>
                  </div>
                </div>

                {/* Card Content with top padding to accommodate the floating badge */}
                <div className="pt-6 sm:pt-7 space-y-4">
                  {/* Header Row */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-hanken font-bold text-xl sm:text-[22px] text-[#2B181C]">
                        Events & Celebrations
                      </h3>
                      <span className="bg-[#FAF4EE] text-[#5B1A28] border border-[#EADBCC] text-xs font-semibold px-3 py-0.5 rounded-full">
                        4 Services
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#7A5B53] mt-1 leading-relaxed">
                      Make your special moments unforgettable with our curated experiences.
                    </p>
                  </div>

                  {/* 4 Services: 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                    <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-center flex flex-col items-center justify-center gap-2 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#5B1A28]">
                        <path d="M12 2c-.8 1.2-1.5 2.2-1.5 3.2a1.5 1.5 0 0 0 3 0C13.5 4.2 12.8 3.2 12 2z" />
                        <rect x="9.5" y="8" width="5" height="11" rx="1" />
                        <path d="M6 21h12" />
                      </svg>
                      <span className="text-xs sm:text-[12.5px] font-medium text-[#2B181C] leading-snug">Candlelight Dinner</span>
                    </div>
                    <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-center flex flex-col items-center justify-center gap-2 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#5B1A28]">
                        <circle cx="9" cy="12" r="5" />
                        <circle cx="15" cy="12" r="5" />
                      </svg>
                      <span className="text-xs sm:text-[12.5px] font-medium text-[#2B181C] leading-snug">Anniversary Celebration</span>
                    </div>
                    <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-center flex flex-col items-center justify-center gap-2 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#5B1A28]">
                        <path d="M12 2v3" />
                        <path d="M10 5h4" />
                        <rect x="6" y="8" width="12" height="5" rx="1" />
                        <rect x="3" y="13" width="18" height="7" rx="1" />
                        <path d="M3 17h18" />
                      </svg>
                      <span className="text-xs sm:text-[12.5px] font-medium text-[#2B181C] leading-snug">Birthday Celebration</span>
                    </div>
                    <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-center flex flex-col items-center justify-center gap-2 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#5B1A28]">
                        <path d="M6 13.8a4 4 0 0 1-1-2.8 4 4 0 0 1 4-4 4.5 4.5 0 0 1 6 0 4 4 0 0 1 4 4 4 4 0 0 1-1 2.8" />
                        <path d="M7 14h10v4H7z" />
                        <circle cx="12" cy="19.5" r="1.5" />
                        <path d="M5 22h14" />
                      </svg>
                      <span className="text-xs sm:text-[12.5px] font-medium text-[#2B181C] leading-snug">Live Cooking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- CARD 3: Digital Convenience ---------------- */}
            <div 
              style={{
                transform: servicesCardsVisible ? 'translateY(0)' : 'translateY(110px)',
                opacity: servicesCardsVisible ? 1 : 0,
                visibility: servicesCardsVisible ? 'visible' : 'hidden',
                transition: servicesCardsVisible
                  ? 'transform 1800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1600ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
              }}
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#EADBCC] shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Photo with Floating Badge */}
                <div className="relative">
                  <div className="overflow-hidden rounded-[20px] sm:rounded-[22px] bg-[#EFE5DB] aspect-[285/227]">
                    <img
                      src="/service-digital.jpg"
                      alt="Digital Convenience"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  {/* Floating Badge overlapping bottom-left corner */}
                  <div className="absolute -bottom-4 sm:-bottom-5 left-4 sm:left-5 w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-2xl bg-[#4C1824] flex items-center justify-center text-white shadow-md shadow-[#4C1824]/20 z-10">
                    <Scan className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Card Content with top padding to accommodate the floating badge */}
                <div className="pt-6 sm:pt-7 space-y-4">
                  {/* Header Row */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-hanken font-bold text-xl sm:text-[22px] text-[#2B181C]">
                        Digital Convenience
                      </h3>
                      <span className="bg-[#FAF4EE] text-[#5B1A28] border border-[#EADBCC] text-xs font-semibold px-3 py-0.5 rounded-full">
                        5 Services
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#7A5B53] mt-1 leading-relaxed">
                      A smart and seamless dining experience with modern, contactless services.
                    </p>
                  </div>

                  {/* 5 Services: Row 1 (3 items), Row 2 (2 items) */}
                  <div className="space-y-2 pt-1">
                    {/* Row 1: 3 items */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <rect x="3" y="3" width="7" height="7" rx="1.5" />
                          <rect x="14" y="3" width="7" height="7" rx="1.5" />
                          <rect x="3" y="14" width="7" height="7" rx="1.5" />
                          <rect x="14" y="14" width="7" height="7" rx="1.5" />
                        </svg>
                        <span className="text-[10.5px] sm:text-xs font-medium text-[#2B181C] leading-tight">QR Code Menu</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <ShoppingCart className="w-4 h-4 text-[#5B1A28]" />
                        <span className="text-[10.5px] sm:text-xs font-medium text-[#2B181C] leading-tight">QR Code Ordering</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <path d="M8.5 16.5a6 6 0 0 1 0-9" />
                          <path d="M12 19a10 10 0 0 0 0-14" />
                          <path d="M15.5 21.5a14 14 0 0 0 0-19" />
                        </svg>
                        <span className="text-[10.5px] sm:text-xs font-medium text-[#2B181C] leading-tight">Contactless Payment</span>
                      </div>
                    </div>

                    {/* Row 2: 2 items */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <FileText className="w-4 h-4 text-[#5B1A28]" />
                        <span className="text-[10.5px] sm:text-xs font-medium text-[#2B181C] leading-tight">Digital Invoice</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <MapPin className="w-4 h-4 text-[#5B1A28]" />
                        <span className="text-[10.5px] sm:text-xs font-medium text-[#2B181C] leading-tight">Real-time Order Tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Centered Bottom CTA Button with Entrance Animation */}
          <div 
            style={{
              transform: servicesVisible ? 'translateY(0)' : 'translateY(40px)',
              opacity: servicesVisible ? 1 : 0,
              transition: servicesVisible
                ? 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 380ms, opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) 380ms'
                : 'none',
            }}
            className="mt-12 sm:mt-14 flex justify-center"
          >
            <button
              onClick={handleBookTableClick}
              className="inline-flex items-center gap-2.5 px-8 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#4C1824] hover:bg-[#38111A] text-white font-hanken font-medium text-sm sm:text-[15px] shadow-md shadow-[#4C1824]/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
            >
              <span>Reserve Now</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. Customer Testimonials (Exact Reference Image 1 Design with Poppins font & Staggered Scroll Entrance Animation) */}
      <section ref={testimonialsRef} className="w-full bg-[#F5EFE6] py-16 sm:py-20 md:py-24 border-b border-[#E8DDD4]/60 overflow-hidden">
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto">
          
          {/* Header Row: Left Title & Category, Right Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
            
            {/* Category Tag & Section Heading with Smooth Entrance */}
            <div
              style={{
                transform: testimonialsVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: testimonialsVisible ? 1 : 0,
                transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="flex items-center gap-2 font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-[#754D45]">
                <span>GUEST EXPERIENCES</span>
                <span className="inline-block w-8 h-[1.5px] bg-[#754D45]/60"></span>
              </div>
              <h2 className="font-poppins text-3xl sm:text-4xl md:text-[42px] font-bold text-[#1C1417] tracking-tight mt-2.5">
                What Our Guests Say
              </h2>
            </div>

            {/* Navigation Carousel Buttons with Smooth Entrance & Micro-Interactions */}
            <div 
              style={{
                transform: testimonialsVisible ? 'translateX(0)' : 'translateX(25px)',
                opacity: testimonialsVisible ? 1 : 0,
                transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
              }}
              className="flex items-center gap-3 shrink-0"
            >
              <button
                onClick={prevTestimonials}
                aria-label="Previous Testimonials"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#DDD3CA] hover:border-[#4C1824] flex items-center justify-center text-[#2B1B1F] hover:text-[#4C1824] hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonials}
                aria-label="Next Testimonials"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4C1824] hover:bg-[#3D131D] flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Testimonials 3-Card Grid matching Image 1 with Staggered Entrance Animation & Hover Polish */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {guestReviews
              .slice(testimonialPage * 3, testimonialPage * 3 + 3)
              .map((review, index) => {
                const delayMs = index * 160;
                return (
                  <div
                    key={`${testimonialPage}-${index}`}
                    style={{
                      transform: testimonialsVisible ? 'translateY(0) scale(1)' : 'translateY(55px) scale(0.96)',
                      opacity: testimonialsVisible ? 1 : 0,
                      visibility: testimonialsVisible ? 'visible' : 'hidden',
                      transition: testimonialsVisible
                        ? `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, box-shadow 300ms ease, border-color 300ms ease`
                        : 'none',
                    }}
                    className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-[#EBE3DC] flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2.5 hover:border-[#D4ADA3] transition-all duration-300 min-h-[260px] group cursor-default"
                  >
                    <div>
                      {/* Orange Double Quotation Marks Icon with Micro-Interaction */}
                      <div className="mb-4">
                        <svg className="w-6 h-6 text-[#D57B35] group-hover:text-[#B95D1A] group-hover:scale-110 fill-current transition-all duration-300 origin-left" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Review Quote Text in Poppins Font */}
                      <p className="font-poppins text-sm sm:text-[15px] font-normal text-[#2B1B1F] leading-relaxed mb-6 group-hover:text-[#180E11] transition-colors">
                        {review.quote}
                      </p>

                      {/* 5 Filled Stars with Subtle Glow on Hover */}
                      <div className="flex items-center gap-1 text-[#F59E0B] mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B] group-hover:scale-110 transition-transform duration-200" style={{ transitionDelay: `${i * 30}ms` }} />
                        ))}
                      </div>
                    </div>

                    {/* Author Name & City */}
                    <div className="pt-3 border-t border-[#F4EDE5]">
                      <p className="font-poppins font-bold text-sm sm:text-[15px] text-[#1C1417] group-hover:text-[#4C1824] transition-colors">
                        {review.author}
                      </p>
                      <p className="font-poppins text-xs text-[#754D45] font-normal mt-0.5">
                        {review.location}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

        </div>
      </section>

      {/* 6. Callout Banner: "We are always ready to surprise you with new flavours" (Exact Reference Image 1 Design) */}
      <section id="reservation-section" className="w-full bg-[#4C1824] py-20 sm:py-24 md:py-32 text-white overflow-hidden scroll-mt-24">
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto text-center flex flex-col items-center justify-center">
          
          {/* Top Badge: "CRISPY, EVERY BITE TASTE" */}
          <div className="inline-flex items-center justify-center bg-white px-5 sm:px-6 py-2 rounded-md shadow-sm mb-6 sm:mb-8">
            <span className="font-hanken text-xs sm:text-[13px] font-bold tracking-[0.14em] text-[#2B1B1F] uppercase select-none">
              CRISPY, EVERY BITE TASTE
            </span>
          </div>

          {/* Main Centered Heading matching Image 1 */}
          <h2 className="font-hanken text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal sm:font-medium leading-[1.18] tracking-tight text-white max-w-4xl mx-auto mb-8 sm:mb-10">
            We are always ready to surprise
            <br className="hidden sm:inline" />
            {" "}you with new{" "}
            <span className="relative inline-block">
              flavours
              {/* Golden Curved Swoosh Accent under flavours matching Image 3 (positioned lower with breathing room) */}
              <svg
                viewBox="0 0 34 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 right-0.5 sm:right-1 w-8 sm:w-10 md:w-11 pointer-events-none"
              >
                <path
                  d="M0 1C10 5 22 5 33 4C22 9.5 11 9.5 0 1Z"
                  fill="#FFA902"
                />
              </svg>
            </span>
          </h2>

          {/* Reserve Now Button matching Image 1 */}
          <div>
            <button
              onClick={handleBookTableClick}
              className="inline-flex items-center justify-center gap-3 border border-white/85 hover:border-white hover:bg-white hover:text-[#4C1824] text-white px-7 sm:px-9 py-3.5 sm:py-4 font-hanken text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase transition-all duration-300 group cursor-pointer active:scale-95 shadow-sm"
            >
              <span>RESERVE NOW</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:text-[#4C1824] group-hover:translate-x-1 transition-all duration-200" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
