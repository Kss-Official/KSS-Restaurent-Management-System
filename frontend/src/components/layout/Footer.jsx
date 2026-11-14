import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock, Globe, Share2, MessageCircle } from 'lucide-react';
import { RESTAURANT_LOCATIONS } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="bg-[#542334] text-[#F4EDE8] border-t border-[#873C50]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#542334] border border-[#873C50] flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5 text-[#C8A66B]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Aura Mocha
              </span>
            </div>
            <p className="text-sm text-[#E8DDD8] leading-relaxed">
              Where culinary craftsmanship meets warm Burgundy & Champagne elegance. Experience Michelin-inspired recipes, artisanal roasting, and unforgettable hospitality.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#globe" aria-label="Website" className="w-9 h-9 rounded-full bg-[#542334] hover:bg-[#873C50] flex items-center justify-center text-[#E8DDD8] hover:text-white transition-colors border border-[#873C50]/50">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#social" aria-label="Social Share" className="w-9 h-9 rounded-full bg-[#542334] hover:bg-[#873C50] flex items-center justify-center text-[#E8DDD8] hover:text-white transition-colors border border-[#873C50]/50">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#messages" aria-label="Messages" className="w-9 h-9 rounded-full bg-[#542334] hover:bg-[#873C50] flex items-center justify-center text-[#E8DDD8] hover:text-white transition-colors border border-[#873C50]/50">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide border-b border-[#873C50] pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#E8DDD8]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Experience</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Our Culinary Story</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">Seasonal Haute Menu</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Private Dining & Events</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Reservations & Contact</Link>
              </li>
            </ul>
          </div>

          {/* Hours & Dining */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide border-b border-[#873C50] pb-2">
              Dining Hours
            </h4>
            <div className="space-y-3 text-sm text-[#E8DDD8]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C8A66B] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Lunch Service</p>
                  <p className="text-xs text-[#E8DDD8]/80">Mon – Sun: 11:30 AM – 03:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C8A66B] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Dinner Service</p>
                  <p className="text-xs text-[#E8DDD8]/80">Mon – Sun: 05:30 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C8A66B] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Lounge & Espresso Bar</p>
                  <p className="text-xs text-[#E8DDD8]/80">Fri & Sat: Until 01:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Flagship */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide border-b border-[#873C50] pb-2">
              Concierge
            </h4>
            <div className="space-y-3 text-sm text-[#E8DDD8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A66B] mt-0.5 shrink-0" />
                <span>{RESTAURANT_LOCATIONS[0]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A66B] shrink-0" />
                <span>+1 (555) 800-4499</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A66B] shrink-0" />
                <span>concierge@auramocha.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#873C50]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B66A79]">
          <p>© {new Date().getFullYear()} Aura Mocha Haute Cuisine. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Burgundy & Champagne Luxury Design System</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;