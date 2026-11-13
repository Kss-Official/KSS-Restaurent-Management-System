import React from 'react';
import { RESTAURANT_IMAGES } from '../../utils/constants';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Utensils, Wine, Sparkles, Building2, Gift, Coffee, Calendar } from 'lucide-react';

export const ServicesPage = () => {
  const serviceList = [
    {
      icon: Utensils,
      title: "Chef's Omakase & Tasting Table",
      image: RESTAURANT_IMAGES.dish1,
      desc: "An exclusive 8-course culinary adventure hosted in front of our open kitchen. Interact directly with our chefs as each masterpiece is plated and narrated.",
      capacity: "Up to 12 Guests"
    },
    {
      icon: Wine,
      title: "Private Sommelier Cellar Dinners",
      image: RESTAURANT_IMAGES.wineCellar,
      desc: "Dine inside our climate-controlled 1,200 bottle subterranean wine cellar. Paired with aged Grand Crus and vintage champagnes selected for your palate.",
      capacity: "6 – 16 Guests"
    },
    {
      icon: Building2,
      title: "Corporate & Executive Galas",
      image: RESTAURANT_IMAGES.interior,
      desc: "High-level board dinners, investor presentations, and product launches equipped with discreet audiovisual integration, bespoke stationery, and fine dining.",
      capacity: "20 – 120 Guests"
    },
    {
      icon: Sparkles,
      title: "Weddings & Intimate Receptions",
      image: RESTAURANT_IMAGES.privateDining,
      desc: "Full buyout services transforming Aura Mocha into a candlelit wonderland. Includes customized dessert bars, personalized cocktail menus, and dedicated valet.",
      capacity: "50 – 200 Guests"
    },
    {
      icon: Coffee,
      title: "Artisanal Mocha Coffee Cupping",
      image: RESTAURANT_IMAGES.coffeeBar,
      desc: "Weekend morning workshops guided by our head roaster exploring single-origin terroir, espresso profiling, and chocolate pairing alchemy.",
      capacity: "Up to 15 Guests"
    },
    {
      icon: Gift,
      title: "Bespoke Culinary Gift Concierge",
      image: RESTAURANT_IMAGES.dessertSignature,
      desc: "Customized gift boxes featuring our signature aged balsamic, cold-pressed olive oils, custom dark mocha truffles, and gold-embossed gift memberships.",
      capacity: "Custom Requests"
    }
  ];

  return (
    <div className="bg-[#FAF6F0] py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#8E5B34]">
          Exclusive Offerings
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#26160E]">
          Our Bespoke Services
        </h1>
        <div className="w-16 h-1 bg-[#6F4E37] mx-auto rounded-full"></div>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#563B29]">
          Beyond our renowned daily dinner services, Aura Mocha creates tailored gastronomic experiences for intimate gatherings, executive events, and connoisseurs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-[#D5BFA4]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#6F4E37] text-white flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-[#E6D7C3]" />
                  </div>
                  <span className="absolute bottom-3 right-3 px-3 py-1 bg-[#26160E]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    {srv.capacity}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#26160E] mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#563B29] leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#F4ECE1] flex items-center justify-between">
                    <Link to="/contact">
                      <Button variant="outline" size="sm">
                        Inquire Details
                      </Button>
                    </Link>
                    <Link to="/customer/book-table">
                      <Button variant="primary" size="sm" icon={Calendar}>
                        Reserve
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
