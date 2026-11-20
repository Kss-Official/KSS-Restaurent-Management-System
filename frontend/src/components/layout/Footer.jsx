import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Clock, Calendar, MapPin, Phone, Mail, MessageCircle, Link2 } from 'lucide-react';

export const Footer = () => {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'About Us', path: '/about' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Blogs', path: '/blogs' },
  ];

  return (
    <footer className="w-full bg-[#FAF7F2] text-[#2B1B1F] pt-8 sm:pt-10 md:pt-12 overflow-hidden font-hanken">
      {/* 4-Column Main Grid matching Reference Image 1 */}
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">
          
          {/* ========================================================
              COLUMN 1: Brand Column (Logo, Description, Social Icons)
             ======================================================== */}
          <div className="lg:col-span-4 space-y-5">
            {/* Lunar Brand Logo */}
            <Link to="/" className="inline-flex items-center gap-2 group" aria-label="Lunar Home">
              <Leaf
                strokeWidth={2}
                className="w-7 h-7 text-[#4C1824] group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-hanken font-bold text-3xl sm:text-[34px] text-[#4C1824] tracking-tight">
                Lunar
              </span>
            </Link>

            {/* Description Text matching Image 1 */}
            <p className="font-hanken text-sm leading-relaxed text-[#6E4A43] max-w-[300px]">
              A modern dining destination serving exceptional cuisine in a warm and elegant setting.
            </p>

            {/* 4 Social Icons in Rounded Squircle Boxes matching Image 1 */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-[#F4EDE5] hover:bg-[#EAE0D6] flex items-center justify-center text-[#4C1824] transition-all hover:scale-105 active:scale-95 shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-[#F4EDE5] hover:bg-[#EAE0D6] flex items-center justify-center text-[#4C1824] transition-all hover:scale-105 active:scale-95 shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Chat Bubble */}
              <a
                href="#chat"
                aria-label="Chat"
                className="w-10 h-10 rounded-xl bg-[#F4EDE5] hover:bg-[#EAE0D6] flex items-center justify-center text-[#4C1824] transition-all hover:scale-105 active:scale-95 shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-xl bg-[#F4EDE5] hover:bg-[#EAE0D6] flex items-center justify-center text-[#4C1824] transition-all hover:scale-105 active:scale-95 shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.27 6.27 0 0 0 1.88-4.46V8.65a8.28 8.28 0 0 0 4.89 1.57V6.77a4.83 4.83 0 0 1-1-.08z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ========================================================
              COLUMN 2: Quick Links Column matching Image 1
             ======================================================== */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[#2B1B1F]" />
              <h4 className="font-hanken font-bold text-lg text-[#2B1B1F]">
                Quick Links
              </h4>
            </div>
            {/* Gold bar accent matching Image 1 */}
            <div className="w-6 h-0.5 bg-[#C69234] rounded-full mb-3" />

            <nav className="flex flex-col space-y-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="font-hanken text-sm text-[#5A3830] hover:text-[#4C1824] transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ========================================================
              COLUMN 3: Open Hours Column matching Image 1
             ======================================================== */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#2B1B1F]" />
              <h4 className="font-hanken font-bold text-lg text-[#2B1B1F]">
                Open Hours
              </h4>
            </div>

            {/* 3 Schedule Card Pills matching Image 1 */}
            <div className="space-y-2.5 pt-1">
              {/* Tue – Fri */}
              <div className="bg-[#F3ECE4]/85 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-[13px] text-[#4A2E28] font-hanken shadow-2xs">
                <div className="flex items-center gap-2 font-semibold">
                  <Calendar className="w-4 h-4 text-[#754D45]" />
                  <span>Tue – Fri</span>
                </div>
                <span className="text-[#6E4A43] font-medium">10:00 AM – 09:00 PM</span>
              </div>

              {/* Sat – Sun */}
              <div className="bg-[#F3ECE4]/85 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-[13px] text-[#4A2E28] font-hanken shadow-2xs">
                <div className="flex items-center gap-2 font-semibold">
                  <Calendar className="w-4 h-4 text-[#754D45]" />
                  <span>Sat – Sun</span>
                </div>
                <span className="text-[#6E4A43] font-medium">09:00 AM – 10:00 PM</span>
              </div>

              {/* Mon */}
              <div className="bg-[#F3ECE4]/85 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-[13px] text-[#4A2E28] font-hanken shadow-2xs">
                <div className="flex items-center gap-2 font-semibold">
                  <Calendar className="w-4 h-4 text-[#754D45]" />
                  <span>Mon</span>
                </div>
                <span className="bg-[#E9DDD5] text-[#754D45] px-3 py-0.5 rounded-full text-xs font-semibold">
                  Closed
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================
              COLUMN 4: Get in Touch Column matching Image 1
             ======================================================== */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#2B1B1F]" />
              <h4 className="font-hanken font-bold text-lg text-[#2B1B1F]">
                Get in Touch
              </h4>
            </div>

            <div className="space-y-3.5 pt-1 font-hanken text-xs sm:text-[13.5px] text-[#5A3830]">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#754D45] flex-shrink-0 mt-0.5" />
                <span className="leading-snug text-[#6E4A43]">
                  787 Renner Land, Lake<br />Kylebury 27195
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#754D45] flex-shrink-0" />
                <a
                  href="tel:+11234567890"
                  className="text-[#6E4A43] hover:text-[#4C1824] transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#754D45] flex-shrink-0" />
                <a
                  href="mailto:hello@lunarrestaurant.com"
                  className="text-[#6E4A43] hover:text-[#4C1824] transition-colors"
                >
                  hello@lunarrestaurant.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          BOTTOM ORGANIC DUAL WAVE DECORATION matching Image 1
         ======================================================== */}
      <div className="w-full overflow-hidden leading-none mt-8 sm:mt-10 -mb-0.5 select-none">
        <svg
          viewBox="0 0 1024 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20 sm:h-24 md:h-28 lg:h-32 block"
          preserveAspectRatio="none"
        >
          {/* Upper Taupe/Mauve Organic Wave Layer */}
          <path
            d="M 0 25 C 200 23, 400 37, 560 41 C 720 45, 880 28, 1024 16 L 1024 120 L 0 120 Z"
            fill="#CEBEBD"
          />
          {/* Lower Deep Burgundy Wave Base Layer */}
          <path
            d="M 0 36 C 200 34, 400 48, 560 51 C 720 55, 880 39, 1024 27 L 1024 120 L 0 120 Z"
            fill="#4C1824"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
