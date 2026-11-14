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
  UtensilsCrossed 
} from 'lucide-react';

export const MenuPage = () => {
  const { menuItems, cart, addToCart, wishlist, toggleWishlist } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItem, setAddedItem] = useState(null);

  const categories = ['All', 'Appetizers', 'Mains', 'Desserts', 'Beverages'];

  const filteredItems = menuItems.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <div className="bg-[#F2E5DB] py-16 space-y-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#754D45]">
          Haute Gastronomy
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#38231F]">
          Seasonal À La Carte Menu
        </h1>
        <div className="w-16 h-1 bg-[#754D45] mx-auto rounded-full"></div>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#754D45]">
          Each recipe is an artisanal exploration of textures and aromas, highlighting locally sourced ingredients paired with our distinctive mocha nuances.
        </p>

        {/* Quick Cart Pill */}
        {cart && cart.length > 0 && (
          <div className="pt-2">
            <Link 
              to="/cart"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#754D45] text-white text-xs font-bold shadow-lg hover:bg-[#754D45] transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#A2766B]" />
              <span>Table Cart: {cart.reduce((a, b) => a + b.qty, 0)} items ({formatCurrency(cart.reduce((s, it) => s + (it.price * it.qty), 0))})</span>
              <span className="underline ml-1">Review & Order →</span>
            </Link>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-[#D0ADA0]/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#754D45] text-white shadow-md'
                    : 'bg-[#F2E5DB] text-[#38231F] hover:bg-[#F2E5DB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#754D45] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[#D0ADA0] bg-[#F2E5DB] focus:outline-none focus:ring-2 focus:ring-[#754D45] text-[#38231F]"
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#D0ADA0] max-w-xl mx-auto">
            <p className="font-serif text-lg text-[#754D45] font-semibold">No culinary items match your search.</p>
            <p className="text-xs text-[#754D45] mt-1">Try searching for other ingredients or clear filters.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-[#754D45] text-white rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isWishlisted = wishlist?.includes(item.id);
              const isAdded = addedItem === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#D0ADA0]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top tags */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {item.signature && (
                        <span className="bg-[#754D45] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#F2E5DB]" />
                          Signature
                        </span>
                      )}
                    </div>

                    {/* Wishlist toggle heart */}
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-transform hover:scale-110 ${
                        isWishlisted ? 'bg-white text-red-500' : 'bg-white/80 text-[#38231F] hover:text-red-500'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                    </button>

                    <span className="absolute bottom-3 right-3 bg-[#38231F]/90 text-white font-serif font-bold text-sm px-3.5 py-1 rounded-xl backdrop-blur-sm">
                      {formatCurrency(item.price)}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-xl font-bold text-[#38231F] group-hover:text-[#754D45] transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#754D45] leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#F2E5DB] space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags?.map((tag, i) => (
                          <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F2E5DB] text-[#754D45]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant={isAdded ? "dark" : "primary"}
                          size="sm"
                          className="flex-1 shadow-sm"
                          icon={isAdded ? Check : ShoppingBag}
                          onClick={() => handleAddToCart(item)}
                        >
                          {isAdded ? "Added to Cart!" : "Add to Order"}
                        </Button>

                        <Link to="/customer/book-table">
                          <Button variant="outline" size="sm" icon={Calendar} title="Reserve Table">
                            Book
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Wine & Pairing Notice */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-6 rounded-2xl bg-[#F2E5DB] border border-[#D0ADA0] text-[#38231F]">
          <p className="font-serif font-bold text-lg">Wine & Beverage Pairing Available</p>
          <p className="text-xs sm:text-sm mt-1 text-[#754D45]">
            Our in-house sommelier is at your service during dinner service to pair reserve cellar vintages with each course.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;