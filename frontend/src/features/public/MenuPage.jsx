import React, { useState } from 'react';
import { useAppStore } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Calendar, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Utensils,
  UtensilsCrossed,
  LayoutGrid,
  Leaf,
  Wine,
  Pizza,
  Flame,
  Fish,
  Soup,
  Cake,
  Boxes,
  BadgePercent,
  X,
  ArrowRight,
  IndianRupee
} from 'lucide-react';

export const MenuPage = () => {
  const { menuItems, cart, addToCart, wishlist, toggleWishlist } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemName, setAddedItemName] = useState(null);

  // Exact 11 Categories matching user reference:
  // All, Main Course, Vegetarian, Beverages, Italian, American, Japanese, Chinese, Desserts, Combo, Promo
  const categories = [
    { id: 'All', label: 'All', icon: LayoutGrid },
    { id: 'Main Course', label: 'Main Course', icon: Utensils },
    { id: 'Vegetarian', label: 'Vegetarian', icon: Leaf },
    { id: 'Beverages', label: 'Beverages', icon: Wine },
    { id: 'Italian', label: 'Italian', icon: Pizza },
    { id: 'American', label: 'American', icon: Flame },
    { id: 'Japanese', label: 'Japanese', icon: Fish },
    { id: 'Chinese', label: 'Chinese', icon: Soup },
    { id: 'Desserts', label: 'Desserts', icon: Cake },
    { id: 'Combo', label: 'Combo', icon: Boxes },
    { id: 'Promo', label: 'Promo', icon: BadgePercent },
  ];

  // ========================================================
  // DIV 3: CURATED CATEGORY CARDS (All cards visible on 'All', Appetizers Removed)
  // All prices in Indian Rupee (₹)
  // ========================================================
  const curatedSections = [
    {
      id: 'main-course',
      categoryType: 'Main Course',
      title: 'Main Course',
      subtitle: 'A selection of our signature Italian mains crafted to perfection.',
      itemCount: '10 Items',
      icon: Utensils,
      image: '/menu-cat-mains.jpg',
      imagePosition: 'left', // Alternating layout
      columns: [
        [
          { name: 'Truffle Risotto', price: '₹420.00', priceNum: 420.00, veg: true },
          { name: 'Slow-Cooked Osso Buco', price: '₹560.00', priceNum: 560.00, veg: false },
          { name: 'Fettuccine Alfredo', price: '₹380.00', priceNum: 380.00, veg: true },
          { name: 'Spaghetti Carbonara', price: '₹360.00', priceNum: 360.00, veg: false },
          { name: 'Lasagna Bolognese', price: '₹400.00', priceNum: 400.00, veg: false },
        ],
        [
          { name: 'Chicken Milanese', price: '₹380.00', priceNum: 380.00, veg: false },
          { name: 'Seafood Risotto', price: '₹480.00', priceNum: 480.00, veg: false },
          { name: 'Grilled Salmon', price: '₹520.00', priceNum: 520.00, veg: false },
          { name: 'Eggplant Parmigiana', price: '₹340.00', priceNum: 340.00, veg: true },
          { name: 'Margherita Pizza', price: '₹320.00', priceNum: 320.00, veg: true },
        ]
      ]
    },
    {
      id: 'vegetarian',
      categoryType: 'Vegetarian',
      title: 'Vegetarian',
      subtitle: 'Fresh, vibrant and flavorful plant-based culinary creations.',
      itemCount: '6 Items',
      icon: Leaf,
      image: '/menu-cat-vegetarian.jpg',
      imagePosition: 'right', // Alternating layout
      columns: [
        [
          { name: 'Caprese Salad', price: '₹240.00', priceNum: 240.00, veg: true },
          { name: 'Mediterranean Salad', price: '₹260.00', priceNum: 260.00, veg: true },
          { name: 'Vegetable Risotto', price: '₹380.00', priceNum: 380.00, veg: true },
        ],
        [
          { name: 'Garden Fresh Pasta', price: '₹320.00', priceNum: 320.00, veg: true },
          { name: 'Stuffed Mushrooms', price: '₹280.00', priceNum: 280.00, veg: true },
          { name: 'Grilled Vegetables Platter', price: '₹310.00', priceNum: 310.00, veg: true },
        ]
      ]
    },
    {
      id: 'italian',
      categoryType: 'Italian',
      title: 'Italian',
      subtitle: 'Traditional wood-fired stone-baked Italian artisanal pizzas.',
      itemCount: '6 Items',
      icon: Pizza,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'left', // Alternating layout
      columns: [
        [
          { name: 'Margherita Pizza', price: '₹320.00', priceNum: 320.00, veg: true },
          { name: 'Truffle Pizza', price: '₹480.00', priceNum: 480.00, veg: true },
          { name: 'Prosciutto Pizza', price: '₹420.00', priceNum: 420.00, veg: false },
        ],
        [
          { name: 'Quattro Formaggi', price: '₹390.00', priceNum: 390.00, veg: true },
          { name: 'Diavola Pizza', price: '₹410.00', priceNum: 410.00, veg: false },
          { name: 'Vegetariana Pizza', price: '₹350.00', priceNum: 350.00, veg: true },
        ]
      ]
    },
    {
      id: 'desserts',
      categoryType: 'Desserts',
      title: 'Desserts',
      subtitle: 'End your meal on a sweet note.',
      itemCount: '5 Items',
      icon: Cake,
      image: '/menu-cat-desserts.jpg',
      imagePosition: 'right', // Alternating layout
      columns: [
        [
          { name: 'Tiramisu alla Lunar', price: '₹280.00', priceNum: 280.00, veg: true },
          { name: 'Panna Cotta', price: '₹240.00', priceNum: 240.00, veg: true },
          { name: 'Chocolate Fondant', price: '₹290.00', priceNum: 290.00, veg: true },
        ],
        [
          { name: 'Affogato', price: '₹190.00', priceNum: 190.00, veg: true },
          { name: 'Gelato (Assorted)', price: '₹160.00', priceNum: 160.00, veg: true },
        ]
      ]
    },
    {
      id: 'wine-beverages',
      categoryType: 'Wine & Beverages',
      title: 'Wine & Beverages',
      subtitle: 'A curated selection to perfectly complement your meal.',
      itemCount: '8 Items',
      icon: Wine,
      image: '/menu-cat-wine.jpg',
      imagePosition: 'left', // Alternating layout
      columns: [
        [
          { name: 'Chianti Classico', price: '₹650.00', priceNum: 650.00, veg: true },
          { name: 'Pinot Grigio', price: '₹580.00', priceNum: 580.00, veg: true },
          { name: 'Prosecco', price: '₹520.00', priceNum: 520.00, veg: true },
          { name: 'Sangiovese', price: '₹610.00', priceNum: 610.00, veg: true },
        ],
        [
          { name: 'Merlot', price: '₹590.00', priceNum: 590.00, veg: true },
          { name: 'Chardonnay', price: '₹570.00', priceNum: 570.00, veg: true },
          { name: 'Espresso', price: '₹120.00', priceNum: 120.00, veg: true },
          { name: 'Cappuccino', price: '₹150.00', priceNum: 150.00, veg: true },
        ]
      ]
    },
    {
      id: 'combo',
      categoryType: 'Combo',
      title: 'Combo',
      subtitle: 'Value-packed meal pairings, burgers, pizzas and sharing combo feasts.',
      itemCount: '6 Items',
      icon: Boxes,
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'right', // Alternating layout
      columns: [
        [
          { name: 'Pizza & Pasta Combo', price: '₹449.00', priceNum: 449.00, veg: true },
          { name: 'Burger & Fries Combo', price: '₹349.00', priceNum: 349.00, veg: false },
          { name: 'Pasta & Drink Combo', price: '₹329.00', priceNum: 329.00, veg: true },
        ],
        [
          { name: 'Pizza & Drink Combo', price: '₹399.00', priceNum: 399.00, veg: true },
          { name: 'Family Feast Combo', price: '₹899.00', priceNum: 899.00, veg: false },
          { name: "Chef's Special Combo", price: '₹749.00', priceNum: 749.00, veg: false },
        ]
      ]
    },
    {
      id: 'promo',
      categoryType: 'Promo',
      title: 'Promo',
      subtitle: 'Exclusive seasonal specials, tasting flights, and limited-time offers.',
      itemCount: '6 Items',
      icon: BadgePercent,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'left', // Alternating layout
      columns: [
        [
          { name: 'Lunch Special Combo', price: '₹399.00', priceNum: 399.00, veg: true },
          { name: 'Dinner Delight Combo', price: '₹599.00', priceNum: 599.00, veg: false },
          { name: 'Family Feast Combo', price: '₹999.00', priceNum: 999.00, veg: false },
        ],
        [
          { name: 'Weekend Brunch Offer', price: '₹449.00', priceNum: 449.00, veg: true },
          { name: 'Couple Special Combo', price: '₹799.00', priceNum: 799.00, veg: false },
          { name: 'Celebration Combo', price: '₹1299.00', priceNum: 1299.00, veg: false },
        ]
      ]
    },
    {
      id: 'american',
      categoryType: 'American',
      title: 'American',
      subtitle: 'USDA Prime dry-aged steaks, artisan burgers, and smoked cutlets.',
      itemCount: '4 Items',
      icon: Flame,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'right', // Alternating layout
      columns: [
        [
          { name: 'Prime Espresso Dry-Aged Ribeye', price: '₹850.00', priceNum: 850.00, veg: false },
          { name: 'Lunar Double Wagyu Smash Burger', price: '₹450.00', priceNum: 450.00, veg: false },
        ],
        [
          { name: 'Rosemary Glazed Colorado Lamb', price: '₹690.00', priceNum: 690.00, veg: false },
          { name: 'Truffle Parmesan Hand-Cut Fries', price: '₹220.00', priceNum: 220.00, veg: true },
        ]
      ]
    },
    {
      id: 'japanese',
      categoryType: 'Japanese',
      title: 'Japanese',
      subtitle: 'Mastercrafted sushi rolls and umami-rich Robata specialties.',
      itemCount: '4 Items',
      icon: Fish,
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'left', // Alternating layout
      columns: [
        [
          { name: 'Hokkaido Truffle Salmon Aburi Roll', price: '₹490.00', priceNum: 490.00, veg: false },
          { name: 'Miso Glazed Chilean Sea Bass', price: '₹680.00', priceNum: 680.00, veg: false },
        ],
        [
          { name: 'Crispy Wagyu Beef Tataki', price: '₹550.00', priceNum: 550.00, veg: false },
          { name: 'Edomae Unagi & Ikura Don', price: '₹580.00', priceNum: 580.00, veg: false },
        ]
      ]
    },
    {
      id: 'chinese',
      categoryType: 'Chinese',
      title: 'Chinese',
      subtitle: 'Artisan dumplings, handmade noodles, and slow-roasted duck.',
      itemCount: '4 Items',
      icon: Soup,
      image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'right', // Alternating layout
      columns: [
        [
          { name: 'Artisan Truffle Xiao Long Bao', price: '₹360.00', priceNum: 360.00, veg: false },
          { name: 'Crispy Szechuan Chili Duck Bao', price: '₹480.00', priceNum: 480.00, veg: false },
        ],
        [
          { name: 'Imperial Steamed Prawn Dumplings', price: '₹340.00', priceNum: 340.00, veg: false },
          { name: 'Wok-Tossed Wagyu in Black Pepper', price: '₹640.00', priceNum: 640.00, veg: false },
        ]
      ]
    }
  ];

  const handleAddDish = (dish) => {
    addToCart({
      id: `curated-${dish.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: dish.name,
      price: dish.priceNum || 20.00,
      image: '/menu-cat-mains.jpg',
      category: 'Curated'
    });
    setAddedItemName(dish.name);
    setTimeout(() => setAddedItemName(null), 2200);
  };

  // Determine which sections to render based on user category tab and search query
  const getVisibleSections = () => {
    let list = [];
    if (selectedCategory === 'All') {
      list = curatedSections; // All cards are visible!
    } else if (selectedCategory === 'Main Course') {
      list = curatedSections.filter(s => s.id === 'main-course');
    } else if (selectedCategory === 'Vegetarian') {
      list = curatedSections.filter(s => s.id === 'vegetarian');
    } else if (selectedCategory === 'Italian') {
      list = curatedSections.filter(s => s.id === 'italian');
    } else if (selectedCategory === 'Combo') {
      list = curatedSections.filter(s => s.id === 'combo');
    } else if (selectedCategory === 'Promo') {
      list = curatedSections.filter(s => s.id === 'promo');
    } else if (selectedCategory === 'Beverages') {
      list = curatedSections.filter(s => s.id === 'wine-beverages');
    } else if (selectedCategory === 'Desserts') {
      list = curatedSections.filter(s => s.id === 'desserts');
    } else if (selectedCategory === 'American') {
      list = curatedSections.filter(s => s.id === 'american');
    } else if (selectedCategory === 'Japanese') {
      list = curatedSections.filter(s => s.id === 'japanese');
    } else if (selectedCategory === 'Chinese') {
      list = curatedSections.filter(s => s.id === 'chinese');
    } else {
      list = curatedSections;
    }

    // Apply search filter if query is typed
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.map(sec => ({
        ...sec,
        columns: sec.columns.map(col => 
          col.filter(d => d.name.toLowerCase().includes(q))
        )
      })).filter(sec => sec.columns.some(col => col.length > 0));
    }

    return list;
  };

  const visibleSections = getVisibleSections();

  return (
    <div className="bg-[#FAF7F2] text-[#38231F] w-full pb-0 font-hanken">
      {/* ========================================================
          1. Menu Page Hero Section (Refined Compact Height)
          - Full-width deep burgundy #4C1824 background
          - Left: Gold "OUR MENU", bold "Our Menu" title, descriptive text
          - Right: Circular Italian Pasta dish in dark ring frame
         ======================================================== */}
      <section className="relative w-full bg-[#4C1824] pt-24 sm:pt-26 md:pt-28 pb-8 sm:pb-10 md:pb-12 overflow-hidden text-white">
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
            
            {/* Left Column: Heading & Narrative Details */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              {/* Gold Eyebrow Tag */}
              <p className="font-hanken font-bold text-xs sm:text-[12.5px] uppercase tracking-[0.22em] text-[#FABE24] select-none">
                OUR MENU
              </p>

              {/* Main Heading */}
              <h1 className="font-hanken text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold text-white tracking-tight leading-[1.15]">
                Our Menu
              </h1>

              {/* Narrative Subtitle */}
              <p className="font-hanken text-xs sm:text-sm md:text-[14.5px] font-normal leading-relaxed text-[#E0AEB9] max-w-lg">
                Explore our wide range of Italian dishes, from classic favourites to chef's specials — freshly prepared and served with authentic flavours.
              </p>

              {/* Quick Cart Pill (if active) */}
              {cart && cart.length > 0 && (
                <div className="pt-1">
                  <Link 
                    to="/cart"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#FABE24]" />
                    <span className="flex items-center gap-1">
                      Table Cart: {cart.reduce((a, b) => a + b.qty, 0)} items (
                      <IndianRupee className="w-3 h-3 inline text-[#FABE24]" />
                      {cart.reduce((s, it) => s + (it.price * it.qty), 0).toFixed(2)})
                    </span>
                    <span className="underline ml-1">Review & Order →</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column: Circular Food Photo Frame (Balanced & Compact) */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative w-[220px] sm:w-[260px] md:w-[320px] lg:w-[350px] xl:w-[380px] aspect-square rounded-full overflow-hidden border-[6px] sm:border-[8px] border-[#5B3228]/85 shadow-2xl bg-[#2A0E15] group">
                <img
                  src="/menu-hero-bowl-sq.jpg"
                  alt="Our Menu Featured Italian Pasta"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. DIV 2: CATEGORY FILTER PILLS & SEARCH BAR
          (Exact Match to User Reference Image: All, Vegetarian,
           Beverages, Italian, American, Japanese, Chinese, Desserts, Combo, Promo)
         ======================================================== */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 max-w-[1720px] mx-auto pt-4 sm:pt-6 space-y-5">
        
        {/* Horizontal Category Pill Row matching Reference Image */}
        <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2 px-1">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13.5px] font-medium font-hanken transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#5B1A28] text-white shadow-md shadow-[#5B1A28]/25 border border-[#5B1A28]'
                    : 'bg-[#FAF3EB] hover:bg-[#F0E4D5] text-[#4C1824] border border-[#E8DACB] hover:border-[#DFCBB8] active:scale-95'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-[#5B1A28]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Compact Search & Meta Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
          <p className="text-xs sm:text-sm text-[#754D45] font-hanken">
            Viewing <span className="font-semibold text-[#4C1824]">{selectedCategory}</span> Menu &bull; Tap any dish to add directly to order
          </p>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#754D45] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-full border border-[#E8DACB] bg-[#FAF3EB] focus:outline-none focus:ring-2 focus:ring-[#5B1A28] text-[#38151E] placeholder:text-[#A07B72] font-hanken shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#754D45] hover:text-[#38151E] p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Added Toast Confirmation */}
      {addedItemName && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4C1824] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs sm:text-sm font-medium font-hanken">
            Added <strong className="text-[#FABE24]">{addedItemName}</strong> to your order!
          </span>
        </div>
      )}

      {/* ========================================================
          3. DIV 3: EXACT 4 ITALIAN CURATED CATEGORY CARDS
          Matching User's Reference Image (media_1794919240317_e640d0c4.png):
          - Card 1: Appetizers (6 items, LHS image, RHS 2-column dishes)
          - Card 2: Main Course (10 items, LHS 2-column dishes, RHS image)
          - Card 3: Desserts (5 items, LHS image, RHS 2-column dishes)
          - Card 4: Wine & Beverages (8 items, LHS 2-column dishes, RHS image)
         ======================================================== */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 max-w-[1720px] mx-auto space-y-6 sm:space-y-8">
        {visibleSections.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF3EB]/70 rounded-3xl border border-dashed border-[#D0ADA0] max-w-xl mx-auto space-y-3">
            <p className="font-hanken text-lg text-[#5B1A28] font-bold">No culinary items match your search.</p>
            <p className="text-xs sm:text-sm text-[#754D45]">Try searching for other ingredients or reset the filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-2 px-5 py-2 text-xs sm:text-sm font-semibold bg-[#5B1A28] text-white rounded-full shadow-sm hover:bg-[#45121E] transition-all cursor-pointer"
            >
              Reset to All Dishes
            </button>
          </div>
        ) : (
          visibleSections.map((section) => {
            const SectionIcon = section.icon;
            const isLeftImage = section.imagePosition === 'left';

            return (
              <div
                key={section.id}
                className="bg-[#FAF4EE] rounded-[24px] sm:rounded-[32px] border border-[#EADBCC] p-5 sm:p-7 md:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow duration-300"
              >
                {/* Section Header matching Reference Image */}
                <div className="flex items-start sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#F0E4D5]">
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    {/* Squircle Icon Badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EFE5DB] flex items-center justify-center text-[#5B1A28] border border-[#E4D5C7]/70 shadow-xs flex-shrink-0">
                      <SectionIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-bold text-[#4C1824] leading-tight">
                        {section.title}
                      </h2>
                      <p className="font-hanken text-xs sm:text-[13px] text-[#7A5B53] mt-0.5">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Count Pill */}
                  <span className="flex-shrink-0 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#EFE5DB] text-[#5B1A28] border border-[#E4D5C7]/70">
                    {section.itemCount}
                  </span>
                </div>

                {/* Section Content: Alternating Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center pt-5 sm:pt-6">
                  {isLeftImage ? (
                    <>
                      {/* Left: Image Container */}
                      <div className="lg:col-span-5 w-full">
                        <div className="relative aspect-[16/11] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-[#EFE5DB] group">
                          <img
                            src={section.image}
                            alt={section.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Right: 2 Sub-Columns of Dishes */}
                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-1">
                        {/* Sub-Column 1 */}
                        <div className="space-y-0.5">
                          {section.columns[0]?.map((dish) => (
                            <div
                              key={dish.name}
                              onClick={() => handleAddDish(dish)}
                              className="py-2.5 sm:py-3 flex items-center justify-between px-2 sm:px-2.5 rounded-xl hover:bg-white/60 transition-all cursor-pointer group select-none"
                              title="Click to add to your order"
                            >
                              <div className="flex items-center gap-2 pr-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FABE24] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="font-hanken font-medium text-[13.5px] sm:text-[14.5px] text-[#2B181C] group-hover:text-[#5B1A28] transition-colors leading-snug">
                                  {dish.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="font-hanken font-bold text-[13.5px] sm:text-[14.5px] text-[#8A1E31] flex items-center">
                                  <IndianRupee className="w-3.5 h-3.5 inline mr-0.5 text-[#8A1E31]" />
                                  <span>{String(dish.price).replace(/[$₹]/g, '').trim()}</span>
                                </span>
                                <span className="opacity-0 group-hover:opacity-100 p-1 rounded-full bg-[#5B1A28] text-white transition-opacity shadow-xs">
                                  <ShoppingBag className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Sub-Column 2 */}
                        <div className="space-y-0.5">
                          {section.columns[1]?.map((dish) => (
                            <div
                              key={dish.name}
                              onClick={() => handleAddDish(dish)}
                              className="py-2.5 sm:py-3 flex items-center justify-between px-2 sm:px-2.5 rounded-xl hover:bg-white/60 transition-all cursor-pointer group select-none"
                              title="Click to add to your order"
                            >
                              <div className="flex items-center gap-2 pr-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FABE24] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="font-hanken font-medium text-[13.5px] sm:text-[14.5px] text-[#2B181C] group-hover:text-[#5B1A28] transition-colors leading-snug">
                                  {dish.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="font-hanken font-bold text-[13.5px] sm:text-[14.5px] text-[#8A1E31] flex items-center">
                                  <IndianRupee className="w-3.5 h-3.5 inline mr-0.5 text-[#8A1E31]" />
                                  <span>{String(dish.price).replace(/[$₹]/g, '').trim()}</span>
                                </span>
                                <span className="opacity-0 group-hover:opacity-100 p-1 rounded-full bg-[#5B1A28] text-white transition-opacity shadow-xs">
                                  <ShoppingBag className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left: 2 Sub-Columns of Dishes (Reversed layout) */}
                      <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-1">
                        {/* Sub-Column 1 */}
                        <div className="space-y-0.5">
                          {section.columns[0]?.map((dish) => (
                            <div
                              key={dish.name}
                              onClick={() => handleAddDish(dish)}
                              className="py-2.5 sm:py-3 flex items-center justify-between px-2 sm:px-2.5 rounded-xl hover:bg-white/60 transition-all cursor-pointer group select-none"
                              title="Click to add to your order"
                            >
                              <div className="flex items-center gap-2 pr-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FABE24] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="font-hanken font-medium text-[13.5px] sm:text-[14.5px] text-[#2B181C] group-hover:text-[#5B1A28] transition-colors leading-snug">
                                  {dish.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="font-hanken font-bold text-[13.5px] sm:text-[14.5px] text-[#8A1E31] flex items-center">
                                  <IndianRupee className="w-3.5 h-3.5 inline mr-0.5 text-[#8A1E31]" />
                                  <span>{String(dish.price).replace(/[$₹]/g, '').trim()}</span>
                                </span>
                                <span className="opacity-0 group-hover:opacity-100 p-1 rounded-full bg-[#5B1A28] text-white transition-opacity shadow-xs">
                                  <ShoppingBag className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Sub-Column 2 */}
                        <div className="space-y-0.5">
                          {section.columns[1]?.map((dish) => (
                            <div
                              key={dish.name}
                              onClick={() => handleAddDish(dish)}
                              className="py-2.5 sm:py-3 flex items-center justify-between px-2 sm:px-2.5 rounded-xl hover:bg-white/60 transition-all cursor-pointer group select-none"
                              title="Click to add to your order"
                            >
                              <div className="flex items-center gap-2 pr-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FABE24] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="font-hanken font-medium text-[13.5px] sm:text-[14.5px] text-[#2B181C] group-hover:text-[#5B1A28] transition-colors leading-snug">
                                  {dish.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="font-hanken font-bold text-[13.5px] sm:text-[14.5px] text-[#8A1E31] flex items-center">
                                  <IndianRupee className="w-3.5 h-3.5 inline mr-0.5 text-[#8A1E31]" />
                                  <span>{String(dish.price).replace(/[$₹]/g, '').trim()}</span>
                                </span>
                                <span className="opacity-0 group-hover:opacity-100 p-1 rounded-full bg-[#5B1A28] text-white transition-opacity shadow-xs">
                                  <ShoppingBag className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Image Container (Reversed layout) */}
                      <div className="lg:col-span-5 order-1 lg:order-2 w-full">
                        <div className="relative aspect-[16/11] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-[#EFE5DB] group">
                          <img
                            src={section.image}
                            alt={section.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* ========================================================
          4. DIV 4: SPECIAL DINING RESERVATION CTA BANNER
          (Exact Match to User Reference Image media_1794920022171_622f298d.png)
          - Deep burgundy card container with large rounded corners
          - Centered Gold Eyebrow: "RESERVE YOUR TABLE"
          - Heading: "Planning a Special Dining Experience?"
          - Subtitle: "Book your table now and let us take care of the perfect Italian dining experience for you."
          - White Pill Button: "Reserve Now →"
         ======================================================== */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 max-w-[1720px] mx-auto pt-6 sm:pt-8 pb-2 sm:pb-4">
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

export default MenuPage;