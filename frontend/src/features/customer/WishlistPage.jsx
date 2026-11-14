import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  UtensilsCrossed, 
  Sparkles,
  Check
} from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, menuItems, addToCart } = useAppStore();

  const savedItems = menuItems.filter(item => wishlist.includes(item.id));

  return (
    <div className="py-12 bg-[#F4EDE8] min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DDD8]/50 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#754D45]">Saved Delicacies</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#301A18]">My Culinary Wishlist</h1>
            <p className="text-xs text-[#754D45] mt-1">
              Keep track of your favorite signature dishes and order them seamlessly whenever you dine with us.
            </p>
          </div>

          <Link to="/menu">
            <Button variant="outline" size="sm" icon={UtensilsCrossed}>
              Explore Full Menu
            </Button>
          </Link>
        </div>

        {savedItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DDD8]/50 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F4EDE8] text-red-500 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#301A18]">Your Wishlist is Empty</h3>
            <p className="text-sm text-[#754D45] max-w-md mx-auto">
              Save dishes you wish to try on your upcoming dining experience. Tap the heart icon on any menu item to save it here.
            </p>
            <div className="pt-2">
              <Link to="/menu">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Browse Our Menu
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DDD8]/60 shadow-md hover:border-[#754D45] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleWishlist(dish.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-red-500 shadow-md hover:scale-110 transition-transform"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#301A18]/80 text-white backdrop-blur-sm">
                      {dish.category}
                    </span>
                  </div>

                  {/* Dish Info */}
                  <div className="p-6 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif font-bold text-xl text-[#301A18]">
                        {dish.name}
                      </h3>
                      <span className="font-mono font-bold text-lg text-[#754D45]">
                        {formatCurrency(dish.price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#754D45] line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Add to Cart Button */}
                <div className="p-6 pt-0">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    icon={ShoppingBag}
                    onClick={() => {
                      addToCart(dish);
                      alert(`${dish.name} added to your table order cart!`);
                    }}
                  >
                    Add to Table Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default WishlistPage;