import React from 'react';
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
  ChevronRight,
  Heart
} from 'lucide-react';

export const HomePage = () => {
  const { isAuthenticated, isCustomer } = useAuth();
  const navigate = useNavigate();

  const handleBookTableClick = () => {
    if (isAuthenticated && isCustomer) {
      navigate('/customer/book-table');
    } else {
      navigate('/login?redirect=/customer/book-table');
    }
  };

  const signatureDishes = [
    {
      title: "Dry-Aged Mocha Ribeye",
      price: "$48.00",
      desc: "28-day aged USDA prime ribeye glazed with dark Valrhona cocoa reduction, bone marrow espresso butter, and charred broccolini.",
      image: RESTAURANT_IMAGES.dish1,
      badge: "Chef's Selection"
    },
    {
      title: "Truffle Pappardelle",
      price: "$34.00",
      desc: "Fresh egg ribbons tossed in aged Parmigiano Reggiano emulsion, wild French chanterelles, and hand-shaved Norcia black truffles.",
      image: RESTAURANT_IMAGES.dish2,
      badge: "Signature"
    },
    {
      title: "Warm Mocha Fondant",
      price: "$18.00",
      desc: "Single-origin Peruvian chocolate lava infused with espresso liqueur, Tahitian vanilla bean cream, and edible gold leaf.",
      image: RESTAURANT_IMAGES.dish3,
      badge: "Award Winner"
    },
    {
      title: "Colorado Rosemary Lamb",
      price: "$44.00",
      desc: "Tender roasted lamb cutlets crusted with winter savory herbs, smooth garlic parsnip puree, and sun-ripened fig reduction.",
      image: RESTAURANT_IMAGES.dish4,
      badge: "Seasonal"
    }
  ];

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

  const testimonials = [
    {
      quote: "An extraordinary gastronomic journey. The harmony of rich mocha undertones with savory dry-aged beef was a revelation.",
      author: "Eleanor Vance",
      title: "Michelin Guide Reviewer",
      rating: 5
    },
    {
      quote: "The atmosphere, staff poise, and table allocation were flawless. Aura Mocha is our celebratory destination of choice in Manhattan.",
      author: "Marcus Sterling",
      title: "Luxury Lifestyle Critic",
      rating: 5
    },
    {
      quote: "From the warm Burrata to the unforgettable Mocha Fondant, every plate feels like pure art on porcelain.",
      author: "Dr. Alistair Finch",
      title: "Private Member",
      rating: 5
    }
  ];

  const galleryImages = [
    { src: RESTAURANT_IMAGES.heroAlt, alt: "Dining Room Ambience" },
    { src: RESTAURANT_IMAGES.interior, alt: "Warm Mocha Bar & Lounge" },
    { src: RESTAURANT_IMAGES.dish5, alt: "Artisanal Burrata" },
    { src: RESTAURANT_IMAGES.privateDining, alt: "Private Booth Dining" },
    { src: RESTAURANT_IMAGES.dish6, alt: "Hokkaido Scallops" },
    { src: RESTAURANT_IMAGES.coffeeBar, alt: "Espresso Barista Craft" }
  ];

  return (
    <div className="bg-[#F4EDE8] text-[#55352F] space-y-24">
      
      {/* 1. Large Hero Banner with HD Photography */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background HD Image with Warm Mocha Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={RESTAURANT_IMAGES.hero}
            alt="Aura Mocha Luxury Restaurant Dining"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#55352F]/92 via-[#754D45]/80 to-[#55352F]/88"></div>
          {/* Subtle Mocha accent tint */}
          <div className="absolute inset-0 bg-[#754D45]/20 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-24 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#A2766B]/40 text-[#FFFFFF] text-xs font-semibold tracking-widest uppercase shadow-md">
            <Award className="w-4 h-4 text-[#A2766B]" />
            <span>Michelin Recommended 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-tight drop-shadow-md">
            Culinary Artistry in <br />
            <span className="italic font-normal text-[#A2766B]">Warm Mocha Elegance</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#FFFFFF] opacity-95 font-light leading-relaxed">
            Where prime dry-aged meats, handcrafted pastas, and artisanal roasted coffee harmoniously meet luxury contemporary hospitality.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="gold"
              size="lg"
              icon={Calendar}
              onClick={handleBookTableClick}
              className="w-full sm:w-auto shadow-xl shadow-black/30"
            >
              Book a Table
            </Button>
            <Link to="/menu" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-[#F4EDE8] text-[#F4EDE8] hover:bg-[#F4EDE8] hover:text-[#55352F]"
              >
                Explore Haute Menu
              </Button>
            </Link>
          </div>

          {/* Quick highlights */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#A2766B]/30 max-w-4xl mx-auto text-center">
            <div>
              <p className="font-serif text-2xl font-bold text-[#A2766B]">28 Days</p>
              <p className="text-xs uppercase tracking-wider text-[#F4EDE8]">In-House Dry Aging</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-[#A2766B]">1,200+</p>
              <p className="text-xs uppercase tracking-wider text-[#F4EDE8]">Cellar Vintages</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-[#A2766B]">4 Cities</p>
              <p className="text-xs uppercase tracking-wider text-[#F4EDE8]">Exclusive Locations</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-[#A2766B]">100%</p>
              <p className="text-xs uppercase tracking-wider text-[#F4EDE8]">Single-Origin Mocha</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular & Signature Dishes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#754D45]">
            Gastronomic Excellence
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#55352F]">
            Our Signature Creations
          </h2>
          <div className="w-16 h-1 bg-[#754D45] mx-auto rounded-full"></div>
          <p className="text-sm sm:text-base text-[#754D45] leading-relaxed">
            Every dish embodies our dedication to earthy depth, artisanal sourcing, and visually captivating presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {signatureDishes.map((dish, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-[#A2766B]/30 flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-[#754D45] text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {dish.badge}
                </span>
                <span className="absolute bottom-3 right-3 bg-[#55352F]/90 text-[#FFFFFF] font-serif font-bold text-sm px-3 py-1 rounded-lg backdrop-blur-sm">
                  {dish.price}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#55352F] group-hover:text-[#754D45] transition-colors">
                    {dish.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#754D45] leading-relaxed mt-2">
                    {dish.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#A2766B]/20 flex items-center justify-between text-xs text-[#754D45]">
                  <span className="flex items-center gap-1 font-medium">
                    <Star className="w-3.5 h-3.5 fill-[#A2766B] text-[#A2766B]" />
                    4.9 / 5.0 Rating
                  </span>
                  <Link to="/menu" className="font-semibold text-[#754D45] hover:underline flex items-center gap-0.5">
                    Order <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/menu">
            <Button variant="secondary" size="lg" icon={ArrowRight}>
              View Complete À La Carte Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. About Our Restaurant Section */}
      <section className="bg-[#FAF7F5] py-20 border-y border-[#A2766B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Mosaic */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={RESTAURANT_IMAGES.about}
                  alt="Aura Mocha Fine Dining Atmosphere"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-56 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <img
                  src={RESTAURANT_IMAGES.chef}
                  alt="Master Chef Preparing Dish"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-6 left-6 bg-gradient-to-br from-[#55352F] via-[#754D45] to-[#55352F] text-[#FFFFFF] p-5 rounded-2xl shadow-2xl max-w-[190px] border border-[#A2766B]/40">
                <p className="font-serif text-3xl font-bold text-[#A2766B]">18+</p>
                <p className="text-[11px] font-medium tracking-wider uppercase text-[#FFFFFF] mt-0.5">Years of Culinary Heritage</p>
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-6 lg:pl-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#754D45]">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#55352F] leading-tight">
                Crafted with Passion, Served with Warmth
              </h2>
              <p className="text-base text-[#754D45] leading-relaxed">
                Founded in the heart of Manhattan, Aura Mocha was conceived with a vision to redefine modern fine dining through rich, earth-inspired elements: aged cuts of meat, organic produce, and deeply satisfying mocha roast notes.
              </p>
              <p className="text-sm text-[#754D45] leading-relaxed">
                Our kitchen is led by award-winning chefs who balance classic French culinary techniques with avant-garde flavor pairings. Whether you join us for an intimate celebration or a private corporate dinner, our attentive staff ensures every moment is memorable.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#A2766B]/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#754D45] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#55352F]">Sustainable Sourcing</h4>
                    <p className="text-xs text-[#754D45]">Farm-to-table organic meats and vegetables.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#754D45] text-white flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#55352F]">Michelin Standards</h4>
                    <p className="text-xs text-[#754D45]">Impeccable service and culinary artistry.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/about">
                  <Button variant="primary" size="md">
                    Read Our Complete Story
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#754D45]">
            Bespoke Hospitality
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#55352F]">
            Curated Culinary Services
          </h2>
          <div className="w-16 h-1 bg-[#754D45] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-[#A2766B]/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#754D45] text-white flex items-center justify-center mb-6 group-hover:bg-[#55352F] transition-colors shadow-md shadow-[#754D45]/20">
                  <Icon className="w-7 h-7 text-[#FFFFFF]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#55352F] mb-3 group-hover:text-[#754D45] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#754D45] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Special Call to Action: Book a Table Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#55352F] via-[#754D45] to-[#55352F] border-2 border-[#A2766B]/40 text-[#FFFFFF] p-8 sm:p-16">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src={RESTAURANT_IMAGES.privateDining}
              alt="Dining Room Table"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="px-3 py-1 rounded-full bg-[#A2766B] text-[#55352F] text-xs font-bold uppercase tracking-wider shadow-sm">
              Reserve Your Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-tight">
              An Evening of Tasteful Distinction Awaits You
            </h2>
            <p className="text-sm sm:text-base text-[#FFFFFF] opacity-95 leading-relaxed">
              Tables at Aura Mocha are in high demand during dinner services. Reserve your table in advance to guarantee an intimate dining experience with our dedicated sommelier.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Button
                variant="gold"
                size="lg"
                icon={Calendar}
                onClick={handleBookTableClick}
              >
                Reserve a Table Now
              </Button>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#FFFFFF] text-[#FFFFFF] hover:bg-white hover:text-[#55352F]"
                >
                  Contact Concierge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="bg-[#FAF7F5] py-20 border-y border-[#A2766B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#754D45]">
              Guest Experiences
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#55352F]">
              What Our Patrons Say
            </h2>
            <div className="w-16 h-1 bg-[#754D45] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-[#A2766B]/30 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#A2766B]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-base italic text-[#55352F] leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#A2766B]/20">
                  <p className="font-serif font-bold text-sm text-[#55352F]">{test.author}</p>
                  <p className="text-xs text-[#754D45] font-medium">{test.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Restaurant Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#754D45]">
            Visual Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#55352F]">
            Moments at Aura Mocha
          </h2>
          <div className="w-16 h-1 bg-[#754D45] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative h-64 sm:h-72 rounded-2xl overflow-hidden group shadow-md"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#55352F]/90 via-[#754D45]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="font-serif text-[#FFFFFF] font-medium text-sm drop-shadow">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
