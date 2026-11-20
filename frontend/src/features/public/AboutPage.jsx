import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  Coffee,
  Scan,
  ShoppingCart,
  FileText,
  MapPin
} from 'lucide-react';

export const AboutPage = () => {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const servicesRef = useRef(null);
  const servicesCardsRef = useRef(null);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [servicesCardsVisible, setServicesCardsVisible] = useState(false);

  const handleBookTableClick = () => {
    navigate('/book-table');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === servicesRef.current) {
            setServicesVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === servicesCardsRef.current) {
            setServicesCardsVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -160px 0px' }
    );

    if (servicesRef.current) observer.observe(servicesRef.current);
    if (servicesCardsRef.current) cardsObserver.observe(servicesCardsRef.current);

    return () => {
      observer.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#FAF7F2] text-[#2B1B1F] w-full pb-0 font-hanken">
      {/* ========================================================
          1. Hero Section matching Reference Images 1 & 2
          - Full-width Deep Burgundy (#4C1824) background
          - Left: Gold "ABOUT US", bold "The Story of Lunar" title, descriptive text
          - Right: High-res Moon View Dining Table (about-hero-lunar.jpg) with rounded corners
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
                ABOUT US
              </p>

              {/* Main Heading */}
              <h1 className="font-hanken font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                The Story of Lunar
              </h1>

              {/* Subtitle Description */}
              <p className="font-hanken text-sm sm:text-base md:text-[17px] text-[#F3ECE4]/90 font-normal leading-relaxed max-w-xl">
                A fine dining restaurant that celebrates the richness of Italian cuisine, crafted with authenticity, quality, and a passion for great food.
              </p>
            </div>

            {/* Right Column: Moon-View Dining Table Photo */}
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
                  src="/about-hero-lunar.jpg"
                  alt="The Story of Lunar - Atmospheric Dining"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. The Story of Lunar: Full-Bleed 50/50 Split Section
          Matching Reference Images 1, 2, 3, 4:
          - LHS: Full-bleed dining ambiance photo (/about-dining-story.jpg)
                 with bottom dark gradient and orange quotation overlay:
                 "At Lunar, we bring people together through authentic Italian cuisine, 
                  warm hospitality, and memorable dining experiences."
          - RHS: Warm cream (#FAF7F2) canvas:
                 - "ABOUT US" tag
                 - "The Story of Lunar" heading
                 - Comprehensive narrative paragraph
                 - "Reserve Now" rounded pill button
                 - Horizontal divider line
                 - Two-column metrics (10+ Years of Culinary Excellence | 20+ Awards & Recognitions)
         ======================================================== */}
      <section className="w-full bg-[#FAF7F2] border-b border-[#E8DDD4]/60 overflow-hidden font-hanken">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[500px] lg:min-h-[580px] xl:min-h-[640px]">
          
          {/* LHS: Full-bleed photo with quote overlay */}
          <div className="relative w-full min-h-[440px] sm:min-h-[520px] lg:min-h-full overflow-hidden group">
            <img
              src="/about-dining-story.jpg"
              alt="Lunar Restaurant Dining Experience"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark gradient for text readability matching Image 4 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
            
            {/* Quote content placed at bottom-left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12 z-10">
              {/* Warm Orange quotation mark matching Reference Image 4 */}
              <div className="text-[#E28743] text-4xl sm:text-5xl font-serif font-black leading-none mb-2 select-none">
                “
              </div>
              <p className="font-hanken text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-lg drop-shadow-sm">
                At Lunar, we bring people together through authentic Italian cuisine, warm hospitality, and memorable dining experiences.
              </p>
            </div>
          </div>

          {/* RHS: Narrative, Reserve button, and Stats matching Image 3 */}
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20 bg-[#FAF7F2]">
            <div className="max-w-xl">
              {/* Eyebrow Tag */}
              <p className="font-hanken font-bold text-xs sm:text-[13px] tracking-[0.24em] text-[#9E6941] uppercase mb-3">
                ABOUT US
              </p>

              {/* Heading */}
              <h2 className="font-hanken font-bold text-3xl sm:text-4xl md:text-[44px] text-[#1C1417] tracking-tight leading-[1.16] mb-5">
                The Story of Lunar
              </h2>

              {/* Narrative Paragraph */}
              <p className="font-hanken text-sm sm:text-base text-[#60453D] leading-relaxed mb-8">
                Lunar is a fine dining restaurant that celebrates the richness of Italian cuisine. Rooted in tradition and inspired by modern culinary craft, we focus on fresh, locally sourced ingredients, timeless recipes, and a warm, welcoming dining experience.
              </p>

              {/* Reserve Now Pill Button */}
              <div>
                <Link
                  to="/book-table"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#8C7A6B]/50 hover:border-[#4C1824] bg-transparent hover:bg-[#4C1824] text-[#2B181C] hover:text-white font-medium text-sm sm:text-base transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  Reserve Now
                </Link>
              </div>

              {/* Horizontal Divider Line */}
              <div className="w-full h-[1px] bg-[#E8DDD4] my-8 sm:my-10" />

              {/* Two-column Metrics */}
              <div className="grid grid-cols-2 items-center gap-6 sm:gap-10">
                {/* Metric 1 */}
                <div className="space-y-1">
                  <p className="font-hanken font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#1C1417] tracking-tight leading-none">
                    10+
                  </p>
                  <p className="font-hanken text-xs sm:text-sm text-[#75554D] font-normal leading-snug">
                    Years of Culinary Excellence
                  </p>
                </div>

                {/* Metric 2 with vertical separator */}
                <div className="space-y-1 border-l border-[#E8DDD4] pl-6 sm:pl-10">
                  <p className="font-hanken font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#1C1417] tracking-tight leading-none">
                    20+
                  </p>
                  <p className="font-hanken text-xs sm:text-sm text-[#75554D] font-normal leading-snug">
                    Awards & Recognitions
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          3. OUR SERVICES: More Than a Meal (Burgundy Background #4A121E)
          Matching Reference Image:
          - Top Header: OUR SERVICES (Gold) / More Than a Meal (White) / Subtitle (Muted Cream)
          - 3 Service Cards:
            1. Dining Experiences (7 services)
            2. Events & Celebrations (4 services)
            3. Digital Convenience (5 services)
          - Centered White Pill "Reserve Now →" Button with Burgundy Text
         ======================================================== */}
      <section ref={servicesRef} className="w-full bg-[#4A121E] py-16 sm:py-20 md:py-24 font-hanken overflow-hidden">
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
            {/* Centered Eyebrow Tag */}
            <p className="font-hanken font-bold text-xs sm:text-[13px] uppercase tracking-[0.24em] text-[#FABE24] select-none">
              OUR SERVICES
            </p>

            {/* Main Heading in Crisp White */}
            <h2 className="font-hanken text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-tight">
              More Than a Meal
            </h2>

            {/* Subtitle Paragraph in Soft Cream */}
            <p className="font-hanken text-sm sm:text-base text-[#E6D4CB]/85 font-normal leading-relaxed max-w-xl mx-auto">
              A complete dining experience with exceptional services, memorable celebrations, and modern conveniences.
            </p>
          </div>

          {/* 3 Service Cards Grid: Simultaneous Bottom-to-Top Animation */}
          <div ref={servicesCardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 xl:gap-9 items-stretch mt-10 sm:mt-12">
            
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
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group cursor-default"
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
                  <div className="absolute -bottom-4 sm:-bottom-5 left-4 sm:left-5 w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-2xl bg-[#4A121E] flex items-center justify-center text-white shadow-md shadow-black/30 z-10">
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                          <path d="M7 2v20" />
                          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                        </svg>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Lunch Service</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <path d="M8 22h8" />
                          <path d="M12 15v7" />
                          <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
                        </svg>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Dinner Service</span>
                      </div>
                    </div>

                    {/* Row 2: 3 items */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <path d="M12 2a10 10 0 0 0-10 10c0 4.4 2.9 8.2 7 9.5V17a3 3 0 0 1 6 0v4.5c4.1-1.3 7-5.1 7-9.5A10 10 0 0 0 12 2z" />
                          <path d="M12 6v6" />
                        </svg>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#2B181C] leading-tight">Brunch Service</span>
                      </div>
                      <div className="bg-[#FAF6F0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center flex flex-col items-center justify-center gap-1.5 border border-[#F0E5D8]/80 hover:bg-[#F2E8DC] hover:scale-[1.03] transition-all">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5B1A28]">
                          <path d="M22 12a10.06 10.06 0 0 0-20 0Z" />
                          <path d="M12 12v8a2 2 0 0 0 4 0" />
                          <path d="M12 2v1" />
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
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group cursor-default"
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
                  <div className="absolute -bottom-4 sm:-bottom-5 left-4 sm:left-5 w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-2xl bg-[#4A121E] flex items-center justify-center text-white shadow-md shadow-black/30 z-10">
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
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group cursor-default"
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
                  <div className="absolute -bottom-4 sm:-bottom-5 left-4 sm:left-5 w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-2xl bg-[#4A121E] flex items-center justify-center text-white shadow-md shadow-black/30 z-10">
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

          {/* Centered Bottom CTA Button with Entrance Animation (White Pill) */}
          <div 
            style={{
              transform: servicesVisible ? 'translateY(0)' : 'translateY(40px)',
              opacity: servicesVisible ? 1 : 0,
              transition: servicesVisible
                ? 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 380ms, opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) 380ms'
                : 'none',
            }}
            className="mt-12 sm:mt-16 flex justify-center"
          >
            <button
              onClick={handleBookTableClick}
              className="inline-flex items-center gap-2.5 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#FAF7F2] text-[#4A121E] font-hanken font-bold text-sm sm:text-[15px] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
            >
              <span>Reserve Now</span>
              <ArrowRight className="w-4 h-4 text-[#4A121E] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. WHY CHOOSE LUNAR: A Dining Experience You'll Always Remember
          Matching Reference Images 1, 2, 3:
          - Background: Warm cream #FAF7F2
          - Left Column (LHS):
            - Tag: WHY CHOOSE LUNAR (Gold)
            - Title: A Dining Experience You’ll Always Remember (#4C1824)
            - Subtitle narrative
            - 3 Feature rows with rounded white icon boxes & bold titles:
              1. Authentic Italian Cuisine (ChefHat)
              2. Fresh & Quality Ingredients (Split Circle)
              3. Warm & Elegant Ambiance (Star)
          - Right Column (RHS):
            - Layered offset card:
              - Dark burgundy backdrop card (#4C1824) offset to top-right
              - Foreground card with 6px crisp white border, rounded-[32px],
                displaying /about-dining-truffle.jpg with smooth hover zoom
         ======================================================== */}
      <section className="w-full bg-[#FAF7F2] pt-14 sm:pt-18 md:pt-20 pb-6 sm:pb-8 font-hanken overflow-hidden">
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
            
            {/* Left Column (LHS Content) */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6">
              <div>
                {/* Eyebrow Tag */}
                <p className="font-hanken font-bold text-xs sm:text-[13px] uppercase tracking-[0.24em] text-[#B87B44]">
                  WHY CHOOSE LUNAR
                </p>

                {/* Main Heading */}
                <h2 className="font-hanken font-bold text-3xl sm:text-4xl md:text-[44px] text-[#4C1824] tracking-tight leading-[1.15] mt-3 mb-4">
                  A Dining Experience You’ll Always Remember
                </h2>

                {/* Narrative Subtitle */}
                <p className="font-hanken text-sm sm:text-base text-[#60453D] leading-relaxed max-w-xl">
                  From authentic Italian recipes to a cozy ambiance and attentive service, Lunar offers the perfect blend of great food, comfort, and memorable moments.
                </p>
              </div>

              {/* 3 Feature Items */}
              <div className="space-y-4 sm:space-y-5 pt-2">
                
                {/* Item 1 */}
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-[#EADBCC] flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#4C1824]/40 group-hover:scale-105 transition-all">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#4C1824]">
                      <path d="M6 13.8a4 4 0 0 1-1-2.8 4 4 0 0 1 4-4 4.5 4.5 0 0 1 6 0 4 4 0 0 1 4 4 4 4 0 0 1-1 2.8" />
                      <path d="M7 14h10v4H7z" />
                      <path d="M5 22h14" />
                    </svg>
                  </div>
                  <span className="font-hanken font-bold text-base sm:text-[17px] text-[#2B181C]">
                    Authentic Italian Cuisine
                  </span>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-[#EADBCC] flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#4C1824]/40 group-hover:scale-105 transition-all">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#4C1824]">
                      <circle cx="12" cy="12" r="9" />
                      <line x1="12" y1="3" x2="12" y2="21" />
                    </svg>
                  </div>
                  <span className="font-hanken font-bold text-base sm:text-[17px] text-[#2B181C]">
                    Fresh & Quality Ingredients
                  </span>
                </div>

                {/* Item 3 */}
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-[#EADBCC] flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#4C1824]/40 group-hover:scale-105 transition-all">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#4C1824]">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <span className="font-hanken font-bold text-base sm:text-[17px] text-[#2B181C]">
                    Warm & Elegant Ambiance
                  </span>
                </div>

              </div>
            </div>

            {/* Right Column (RHS Layered Offset Card matching Image 1 & 3) */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px] pt-4 pr-4 sm:pt-5 sm:pr-5 group">
                
                {/* Burgundy Backdrop Card (offset to top-right) */}
                <div className="absolute top-0 right-0 w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-[28px] sm:rounded-[34px] bg-[#4C1824] pointer-events-none shadow-md transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

                {/* Foreground Photo Card with Crisp White Border */}
                <div className="relative z-10 rounded-[28px] sm:rounded-[34px] overflow-hidden border-[5px] sm:border-[6px] border-white shadow-2xl bg-[#EFE5DB] aspect-[285/227] sm:aspect-[4/3]">
                  <img
                    src="/about-dining-truffle.jpg"
                    alt="A Dining Experience You'll Always Remember - Truffle Risotto"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. CTA BANNER SECTION: Reserve Your Table
          (Exact Match to Menu Page Div 4)
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
            <p className="font-hanken text-sm sm:text-base font-normal leading-relaxed text-[#E0AEB9] max-w-xl mx-auto">
              Book your table now and let us take care of the perfect Italian dining experience for you.
            </p>

            {/* White Pill Button with Right Arrow */}
            <div className="pt-2 sm:pt-3">
              <Link
                to="/book-table"
                className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white hover:bg-[#FAF5EF] text-[#4C1824] font-hanken font-semibold text-sm sm:text-[15px] shadow-lg shadow-black/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
              >
                <span>Reserve Now</span>
                <ArrowRight className="w-4 h-4 text-[#4C1824] group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
