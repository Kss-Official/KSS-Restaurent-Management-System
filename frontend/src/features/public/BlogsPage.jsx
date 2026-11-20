import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  ChefHat,
  Bookmark,
  Utensils,
  Bell,
  Sparkles,
  RefreshCw
} from 'lucide-react';

const blogStoriesData = [
  {
    id: 1,
    title: "The Secret Behind Perfect Italian Pasta",
    description: "Simple techniques and authentic ingredients to create pasta that's rich, flavourful and truly Italian.",
    category: "Food & Recipes",
    date: "Oct 24, 2026",
    image: "/blogs-card-pasta-burrata.jpg",
    categoryType: "food",
  },
  {
    id: 2,
    title: "Creating the Perfect Romantic Dinner",
    description: "From the right ambience to a thoughtfully crafted menu, here's how Lunar sets the mood for love.",
    category: "Dining Experiences",
    date: "Oct 20, 2026",
    image: "/blogs-card-romantic-dinner.jpg",
    categoryType: "dining",
  },
  {
    id: 3,
    title: "Behind the Kitchen at Lunar",
    description: "Meet our chefs, explore their inspiration, and get a glimpse of the passion that drives our kitchen.",
    category: "Chef's Stories",
    date: "Oct 18, 2026",
    image: "/blogs-card-behind-kitchen.jpg",
    categoryType: "chef",
  },
  {
    id: 4,
    title: "Exploring the Rich Flavours of Italian Cuisine",
    description: "A journey through Italy's iconic dishes, regional flavours, and the traditions that make them special.",
    category: "Food & Recipes",
    date: "Oct 22, 2026",
    image: "/blogs-card-caprese-salad.jpg",
    categoryType: "food",
  },
  {
    id: 5,
    title: "Why Ambience Matters in Fine Dining",
    description: "How the right space, lighting, and atmosphere elevate a meal into a memorable experience.",
    category: "Dining Experiences",
    date: "Oct 10, 2026",
    image: "/blogs-card-ambience-grand.jpg",
    categoryType: "dining",
  },
  {
    id: 6,
    title: "What's New at Lunar",
    description: "Discover our latest menu additions, upcoming events, and special celebrations at Lunar.",
    category: "Restaurant Updates",
    date: "Oct 06, 2026",
    image: "/blogs-card-lunar-menu.jpg",
    categoryType: "updates",
  },
];

const filterCategories = [
  { id: 'all', label: 'All Stories', icon: Bookmark },
  { id: 'food', label: 'Food & Recipes', icon: Utensils },
  { id: 'chef', label: "Chef's Stories", icon: ChefHat },
  { id: 'updates', label: 'Restaurant Updates', icon: Bell },
];

export const BlogsPage = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const featuredRef = useRef(null);
  const [featuredVisible, setFeaturedVisible] = useState(false);

  const storiesRef = useRef(null);
  const [storiesVisible, setStoriesVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturedVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-40px' }
    );

    if (featuredRef.current) {
      observer.observe(featuredRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoriesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-40px' }
    );

    if (storiesRef.current) {
      observer.observe(storiesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food & Recipes':
        return <Utensils className="w-3.5 h-3.5 text-[#8C3445]" />;
      case 'Dining Experiences':
        return <Sparkles className="w-3.5 h-3.5 text-[#8C3445]" />;
      case "Chef's Stories":
        return <ChefHat className="w-3.5 h-3.5 text-[#8C3445]" />;
      case 'Restaurant Updates':
        return <Bell className="w-3.5 h-3.5 text-[#8C3445]" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-[#8C3445]" />;
    }
  };

  const filteredStories = activeCategory === 'all'
    ? blogStoriesData
    : blogStoriesData.filter((s) => s.categoryType === activeCategory);

  return (
    <div className="bg-[#FAF7F2] text-[#2B1B1F] w-full font-hanken pb-0">
      {/* ========================================================
          1. Hero Section matching Reference Images 1 & 2
          - Full-width Deep Burgundy (#4C1824) background starting at y=0
          - Left: Gold "OUR BLOGS", bold "Stories From Lunar", Subtitle, Narrative
          - Right: High-res Handcrafted Pasta & Wine Photo (/blogs-hero-pasta.jpg) with rounded corners
          - Synchronized with floating navbar animation (Stage 2 top pill -> Stage 3 open)
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
              className="lg:col-span-6 space-y-4 sm:space-y-5"
            >
              {/* Gold Eyebrow Tag */}
              <p className="font-hanken font-bold text-xs sm:text-[13px] tracking-[0.24em] text-[#FABE24] uppercase">
                OUR BLOGS
              </p>

              {/* Main Heading */}
              <h1 className="font-hanken font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                Stories From Lunar
              </h1>

              {/* Subheading */}
              <h2 className="font-hanken text-lg sm:text-xl md:text-[22px] text-white font-medium leading-snug">
                Discover the Flavours, Stories & Experiences Behind Lunar.
              </h2>

              {/* Narrative Paragraph */}
              <p className="font-hanken text-sm sm:text-base md:text-[17px] text-[#F3ECE4]/85 font-normal leading-relaxed max-w-xl">
                Explore culinary inspiration, authentic Italian flavours, dining experiences, and stories that make every moment at Lunar special.
              </p>
            </div>

            {/* Right Column: Handcrafted Pasta & Wine Photo */}
            <div 
              style={{
                transform: heroVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
                opacity: heroVisible ? 1 : 0,
                transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
              }}
              className="lg:col-span-6 flex justify-center lg:justify-end"
            >
              <div className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A0E15] border border-white/10 group">
                <img
                  src="/blogs-hero-pasta.jpg"
                  alt="Stories From Lunar - Handcrafted Pasta & Wine"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. Div 2: "FEATURED STORY" - The Art of Authentic Italian Cooking
          - Matches Reference Image media_1794987118774_e99fe4f0.jpg & media_1794987135602_8ff76a13.jpg
          - Flanked Eyebrow: — FEATURED STORY —
          - Title: "The Art of Authentic Italian Cooking" (Deep Burgundy #3B0E17 font-hanken bold)
          - Featured Article White Card:
            - LHS: Chef plating handcrafted pasta with Lunar apron (/blogs-featured-chef.jpg)
            - RHS: Badge (ChefHat + "Italian Cuisine") | (Calendar + "Oct 28, 2026")
                   Title: "The Art of Authentic Italian Cooking"
                   Description: "Discover the traditions, ingredients, and techniques that make Italian cuisine one of the world's most loved culinary experiences."
                   Button: "Read Article →"
         ======================================================== */}
      <section 
        ref={featuredRef}
        className="w-full bg-[#FAF7F2] py-14 sm:py-18 md:py-24 border-b border-[#E8DDD4]/60 font-hanken overflow-hidden"
      >
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
          
          {/* Eyebrow & Section Header */}
          <div 
            style={{
              transform: featuredVisible ? 'translateY(0)' : 'translateY(35px)',
              opacity: featuredVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14"
          >
            {/* Flanked Eyebrow */}
            <div className="inline-flex items-center justify-center gap-3">
              <span className="w-8 sm:w-12 h-[1px] bg-[#D4ADA3]"></span>
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#8C3445] uppercase">
                FEATURED STORY
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#D4ADA3]"></span>
            </div>

            {/* Main Title */}
            <h2 className="font-hanken font-bold text-3xl sm:text-4xl md:text-5xl text-[#3B0E17] tracking-tight">
              The Art of Authentic Italian Cooking
            </h2>
          </div>

          {/* Featured Article White Card matching Image 1 */}
          <div
            style={{
              transform: featuredVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.97)',
              opacity: featuredVisible ? 1 : 0,
              transition: 'transform 950ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms'
            }}
            className="bg-white rounded-[26px] sm:rounded-[36px] p-5 sm:p-7 md:p-8 lg:p-10 border border-[#ECE5DA] shadow-xs hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
              
              {/* Left Column: Chef Pasta Photo (7 cols) */}
              <div className="lg:col-span-7 rounded-[18px] sm:rounded-[24px] overflow-hidden bg-[#2A0E15] group shadow-xs">
                <img
                  src="/blogs-featured-chef.jpg"
                  alt="Chef preparing authentic Italian pasta at Lunar"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Right Column: Meta, Heading, Description, Action (5 cols) */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-5 lg:pr-2 xl:pr-4">
                
                {/* Category & Date Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#EADBCC] text-xs font-semibold text-[#754D45]">
                    <ChefHat className="w-3.5 h-3.5 text-[#8C3445]" />
                    <span>Italian Cuisine</span>
                  </span>
                  
                  <span className="text-[#D4ADA3]">|</span>

                  <div className="inline-flex items-center gap-1.5 text-xs text-[#754D45]">
                    <Calendar className="w-3.5 h-3.5 text-[#8C3445]" />
                    <span>Oct 28, 2026</span>
                  </div>
                </div>

                {/* Article Heading */}
                <h3 className="font-hanken font-bold text-2xl sm:text-3xl text-[#3B0E17] tracking-tight leading-snug">
                  The Art of Authentic Italian Cooking
                </h3>

                {/* Narrative Description */}
                <p className="font-hanken text-sm sm:text-base text-[#6E4A43] font-normal leading-relaxed">
                  Discover the traditions, ingredients, and techniques that make Italian cuisine one of the world's most loved culinary experiences.
                </p>

                {/* Action Button: Read Article */}
                <div className="pt-2 sm:pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2.5 px-7 py-3 sm:py-3.5 rounded-full bg-[#4C1824] hover:bg-[#380E17] text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 shadow-md cursor-pointer group"
                  >
                    <span>Read Article</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1 font-mono">→</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          3. Div 3: "EXPLORE OUR STORIES" - 6-Article Showcase Grid
          - Matches Reference Image media_1794987246384_083a7d41.jpg
          - Flanked Eyebrow: — EXPLORE OUR STORIES —
          - Main Heading: "A Collection of Flavours, Experiences and Inspirations."
          - Subtitle: "From timeless recipes to unforgettable dining moments, explore it all here."
          - Filter Pills: [All Stories, Food & Recipes, Chef's Stories, Restaurant Updates]
          - 6-Card Grid (3 columns on desktop):
            - Card 1: The Secret Behind Perfect Italian Pasta (/blogs-card-pasta-burrata.jpg)
            - Card 2: Creating the Perfect Romantic Dinner (/blogs-card-romantic-dinner.jpg)
            - Card 3: Behind the Kitchen at Lunar (/blogs-card-behind-kitchen.jpg)
            - Card 4: Exploring the Rich Flavours of Italian Cuisine (/blogs-card-caprese-salad.jpg)
            - Card 5: Why Ambience Matters in Fine Dining (/blogs-card-ambience-grand.jpg)
            - Card 6: What's New at Lunar (/blogs-card-lunar-menu.jpg)
          - Center "Load More ↻" Pill Button
         ======================================================== */}
      <section 
        ref={storiesRef}
        className="w-full bg-[#FAF7F2] pt-14 sm:pt-18 md:pt-20 pb-4 sm:pb-6 font-hanken overflow-hidden"
      >
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
          
          {/* Eyebrow, Title & Subtitle */}
          <div 
            style={{
              transform: storiesVisible ? 'translateY(0)' : 'translateY(35px)',
              opacity: storiesVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10"
          >
            {/* Flanked Eyebrow */}
            <div className="inline-flex items-center justify-center gap-3">
              <span className="w-8 sm:w-12 h-[1px] bg-[#D4ADA3]"></span>
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#8C3445] uppercase">
                EXPLORE OUR STORIES
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#D4ADA3]"></span>
            </div>

            {/* Main Heading */}
            <h2 className="font-hanken font-bold text-3xl sm:text-4xl md:text-5xl text-[#3B0E17] max-w-3xl mx-auto tracking-tight leading-[1.18]">
              A Collection of Flavours, Experiences and Inspirations.
            </h2>

            {/* Subtitle */}
            <p className="font-hanken text-sm sm:text-base text-[#6E4A43] max-w-2xl mx-auto font-normal leading-relaxed">
              From timeless recipes to unforgettable dining moments, explore it all here.
            </p>
          </div>

          {/* Filter Pills Bar */}
          <div 
            style={{
              transform: storiesVisible ? 'translateY(0)' : 'translateY(25px)',
              opacity: storiesVisible ? 1 : 0,
              transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 100ms'
            }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12 sm:mb-14"
          >
            {filterCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#4C1824] text-white shadow-md scale-105'
                      : 'bg-white text-[#2B1B1F] border border-[#EADBCC] hover:bg-[#FAF5EE] hover:text-[#4C1824] shadow-2xs'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#754D45]'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* 6-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredStories.slice(0, displayCount).map((story, index) => (
              <article
                key={story.id}
                style={{
                  transform: storiesVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.96)',
                  opacity: storiesVisible ? 1 : 0,
                  transition: `transform 850ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms, opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`
                }}
                className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 border border-[#ECE5DA] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Article Photo */}
                  <div className="w-full h-48 sm:h-52 rounded-[18px] sm:rounded-[20px] overflow-hidden mb-5 bg-[#2A0E15]">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Meta: Category & Date */}
                  <div className="flex items-center gap-2 text-xs text-[#754D45] mb-2.5">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#8C3445]">
                      {getCategoryIcon(story.category)}
                      <span>{story.category}</span>
                    </span>
                    <span className="text-[#D4ADA3]">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#8C3445]" />
                      <span>{story.date}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-hanken font-bold text-lg sm:text-[19px] text-[#3B0E17] tracking-tight leading-snug mb-2 group-hover:text-[#8C3445] transition-colors">
                    {story.title}
                  </h3>

                  {/* Description */}
                  <p className="font-hanken text-xs sm:text-[13.5px] text-[#6E4A43] font-normal leading-relaxed line-clamp-2">
                    {story.description}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="pt-4 mt-4 border-t border-[#F5EFE9]">
                  <span className="font-hanken font-bold text-xs sm:text-[13px] text-[#3B0E17] group-hover:text-[#8C3445] inline-flex items-center gap-1.5 transition-colors duration-200">
                    <span>Read More</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1 font-mono">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button matching Image 1 */}
          <div className="flex justify-center mt-8 sm:mt-10 mb-0">
            <button
              onClick={() => setDisplayCount(prev => (prev >= 6 ? 6 : prev + 3))}
              className="px-6 sm:px-7 py-3 rounded-full bg-white hover:bg-[#FAF5EE] border border-[#EADBCC] text-xs sm:text-sm font-semibold text-[#2B1B1F] hover:text-[#4C1824] shadow-xs hover:shadow-md inline-flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Load More</span>
              <RefreshCw className="w-3.5 h-3.5 text-[#8C3445]" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. CTA BANNER SECTION: Reserve Your Table
          (Exact Match to About Page Div 5 & Reviews Page)
          - Deep burgundy gradient card container with large rounded corners
          - Centered Gold Eyebrow: "RESERVE YOUR TABLE"
          - Heading: "Planning a Special Dining Experience?"
          - Subtitle: "Book your table now and let us take care of the perfect Italian dining experience for you."
          - White Pill Button: "Reserve Now →"
         ======================================================== */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 max-w-[1720px] mx-auto pt-2 sm:pt-4 pb-2 sm:pb-4 font-hanken">
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
    </div>
  );
};

export default BlogsPage;
