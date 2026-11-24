import React, { useState } from 'react';
import { useAdminDatabase } from '../adminStore';
import { formatCurrency } from '../../../utils/helpers';
import { 
  UtensilsCrossed, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  MoreVertical, 
  Check, 
  X, 
  Clock, 
  Flame, 
  Leaf, 
  Tag, 
  Calendar, 
  Layers, 
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export const FoodMenuManagement = () => {
  const { 
    getFoodMaster, saveFoodMaster, 
    getCategories, saveCategories, 
    getMenus, saveMenus,
    getKitchenStations
  } = useAdminDatabase();

  const [activeSubTab, setActiveSubTab] = useState('food-master'); // 'food-master', 'categories', 'menus'
  
  // States loaded from persistent store
  const [foodItems, setFoodItems] = useState(() => getFoodMaster());
  const [categories, setCategories] = useState(() => getCategories());
  const [menus, setMenus] = useState(() => getMenus());
  const stations = getKitchenStations();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedVegFilter, setSelectedVegFilter] = useState('All');
  const [selectedStationFilter, setSelectedStationFilter] = useState('All');

  // Modals state
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [viewingFood, setViewingFood] = useState(null);
  const [deleteFoodTarget, setDeleteFoodTarget] = useState(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteCategoryTarget, setDeleteCategoryTarget] = useState(null);

  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  // Form State for Food Master
  const [foodForm, setFoodForm] = useState({
    name: '',
    category: 'Mains',
    subcategory: 'Continental',
    price: '',
    isVeg: true,
    prepTime: 15,
    stationId: 'ST-01',
    available: true,
    image: '',
    description: ''
  });

  // Form State for Category
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    subcategories: '',
    image: '',
    active: true
  });

  // Form State for Menu
  const [menuForm, setMenuForm] = useState({
    name: '',
    type: 'Dinner',
    startTime: '07:00 PM',
    endTime: '11:30 PM',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    assignedCategories: ['Starters', 'Mains'],
    active: true
  });

  // --- Food Master Handlers ---
  const handleOpenAddFood = () => {
    setEditingFood(null);
    setFoodForm({
      name: '',
      category: categories[0]?.name || 'Mains',
      subcategory: 'Classic',
      price: '',
      isVeg: true,
      prepTime: 15,
      stationId: stations[0]?.id || 'ST-01',
      available: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      description: ''
    });
    setFoodModalOpen(true);
  };

  const handleOpenEditFood = (item) => {
    setEditingFood(item);
    setFoodForm({
      name: item.name,
      category: item.category,
      subcategory: item.subcategory,
      price: item.price,
      isVeg: item.isVeg,
      prepTime: item.prepTime,
      stationId: item.stationId,
      available: item.available,
      image: item.image,
      description: item.description
    });
    setFoodModalOpen(true);
  };

  const handleSaveFood = (e) => {
    e.preventDefault();
    if (!foodForm.name || !foodForm.price) return;

    let updated;
    if (editingFood) {
      updated = foodItems.map(item => 
        item.id === editingFood.id 
          ? { ...item, ...foodForm, price: Number(foodForm.price), prepTime: Number(foodForm.prepTime) }
          : item
      );
    } else {
      const newItem = {
        id: `FOOD-${Date.now().toString().slice(-4)}`,
        ...foodForm,
        price: Number(foodForm.price),
        prepTime: Number(foodForm.prepTime)
      };
      updated = [newItem, ...foodItems];
    }
    setFoodItems(updated);
    saveFoodMaster(updated);
    setFoodModalOpen(false);
  };

  const handleToggleAvailability = (foodId) => {
    const updated = foodItems.map(item => 
      item.id === foodId ? { ...item, available: !item.available } : item
    );
    setFoodItems(updated);
    saveFoodMaster(updated);
  };

  const handleDeleteFood = () => {
    if (!deleteFoodTarget) return;
    const updated = foodItems.filter(item => item.id !== deleteFoodTarget.id);
    setFoodItems(updated);
    saveFoodMaster(updated);
    setDeleteFoodTarget(null);
  };

  // --- Category Handlers ---
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      subcategories: '',
      image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=600&q=80',
      active: true
    });
    setCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      subcategories: Array.isArray(cat.subcategories) ? cat.subcategories.join(', ') : cat.subcategories,
      image: cat.image,
      active: cat.active
    });
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name) return;

    const subcats = categoryForm.subcategories
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    let updated;
    if (editingCategory) {
      updated = categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: categoryForm.name, image: categoryForm.image, active: categoryForm.active, subcategories: subcats }
          : cat
      );
    } else {
      const newCat = {
        id: `CAT-${Date.now().toString().slice(-3)}`,
        name: categoryForm.name,
        subcategories: subcats,
        image: categoryForm.image,
        active: categoryForm.active,
        itemCount: 0
      };
      updated = [...categories, newCat];
    }
    setCategories(updated);
    saveCategories(updated);
    setCategoryModalOpen(false);
  };

  const handleToggleCategoryActive = (catId) => {
    const updated = categories.map(c => c.id === catId ? { ...c, active: !c.active } : c);
    setCategories(updated);
    saveCategories(updated);
  };

  const handleDeleteCategory = () => {
    if (!deleteCategoryTarget) return;
    const updated = categories.filter(c => c.id !== deleteCategoryTarget.id);
    setCategories(updated);
    saveCategories(updated);
    setDeleteCategoryTarget(null);
  };

  // --- Menu Handlers ---
  const handleOpenAddMenu = () => {
    setEditingMenu(null);
    setMenuForm({
      name: '',
      type: 'Dinner',
      startTime: '07:00 PM',
      endTime: '11:00 PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      assignedCategories: ['Starters', 'Mains'],
      active: true
    });
    setMenuModalOpen(true);
  };

  const handleOpenEditMenu = (menu) => {
    setEditingMenu(menu);
    setMenuForm({
      name: menu.name,
      type: menu.type,
      startTime: menu.schedule.startTime,
      endTime: menu.schedule.endTime,
      days: menu.schedule.days,
      assignedCategories: menu.assignedCategories,
      active: menu.active
    });
    setMenuModalOpen(true);
  };

  const handleSaveMenu = (e) => {
    e.preventDefault();
    if (!menuForm.name) return;

    let updated;
    if (editingMenu) {
      updated = menus.map(m => 
        m.id === editingMenu.id 
          ? {
              ...m,
              name: menuForm.name,
              type: menuForm.type,
              schedule: {
                startTime: menuForm.startTime,
                endTime: menuForm.endTime,
                days: menuForm.days
              },
              assignedCategories: menuForm.assignedCategories,
              active: menuForm.active
            }
          : m
      );
    } else {
      const newM = {
        id: `MN-${Date.now().toString().slice(-3)}`,
        name: menuForm.name,
        type: menuForm.type,
        schedule: {
          startTime: menuForm.startTime,
          endTime: menuForm.endTime,
          days: menuForm.days
        },
        assignedCategories: menuForm.assignedCategories,
        assignedItemsCount: foodItems.filter(f => menuForm.assignedCategories.includes(f.category)).length,
        active: menuForm.active
      };
      updated = [...menus, newM];
    }
    setMenus(updated);
    saveMenus(updated);
    setMenuModalOpen(false);
  };

  const handleToggleMenuStatus = (menuId) => {
    const updated = menus.map(m => m.id === menuId ? { ...m, active: !m.active } : m);
    setMenus(updated);
    saveMenus(updated);
  };

  // Filtering Food Items
  const filteredFoodItems = foodItems.filter(item => {
    if (selectedCategoryFilter !== 'All' && item.category !== selectedCategoryFilter) return false;
    if (selectedVegFilter === 'Veg' && !item.isVeg) return false;
    if (selectedVegFilter === 'Non-Veg' && item.isVeg) return false;
    if (selectedStationFilter !== 'All' && item.stationId !== selectedStationFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(q) ||
        item.subcategory?.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStationName = (stId) => {
    const st = stations.find(s => s.id === stId);
    return st ? st.name : stId;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header with Sub-tab Navigation */}
      <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
              <UtensilsCrossed size={22} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#500F1D]">Food & Menu Management</h1>
              <p className="text-xs text-[#500F1D]/70 font-medium">Configure recipes, categories, kitchen assignments, and dining menu schedules.</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center bg-[#FAF7F5] p-1.5 rounded-2xl border border-[#E8DDD8] gap-1 self-start sm:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('food-master')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeSubTab === 'food-master'
                ? 'bg-[#500F1D] text-white shadow-sm'
                : 'text-[#500F1D]/70 hover:text-[#500F1D] hover:bg-white'
            }`}
          >
            Food Master
          </button>
          <button
            onClick={() => setActiveSubTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeSubTab === 'categories'
                ? 'bg-[#500F1D] text-white shadow-sm'
                : 'text-[#500F1D]/70 hover:text-[#500F1D] hover:bg-white'
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveSubTab('menus')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeSubTab === 'menus'
                ? 'bg-[#500F1D] text-white shadow-sm'
                : 'text-[#500F1D]/70 hover:text-[#500F1D] hover:bg-white'
            }`}
          >
            Menu Schedules ({menus.length})
          </button>
        </div>
      </div>

      {/* SUBTAB 1: FOOD MASTER */}
      {activeSubTab === 'food-master' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E8DDD8] shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
                <UtensilsCrossed size={18} />
              </div>
              <div>
                <p className="text-xs text-[#500F1D]/70 font-medium">Total Items</p>
                <p className="text-xl font-bold text-[#500F1D]">{foodItems.length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E8DDD8] shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-700">
                <Leaf size={18} />
              </div>
              <div>
                <p className="text-xs text-[#500F1D]/70 font-medium">Vegetarian</p>
                <p className="text-xl font-bold text-green-700">{foodItems.filter(f => f.isVeg).length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E8DDD8] shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-700">
                <Flame size={18} />
              </div>
              <div>
                <p className="text-xs text-[#500F1D]/70 font-medium">Non-Veg</p>
                <p className="text-xl font-bold text-red-700">{foodItems.filter(f => !f.isVeg).length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E8DDD8] shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5A81E]/15 flex items-center justify-center text-[#996500]">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-xs text-[#500F1D]/70 font-medium">Available</p>
                <p className="text-xl font-bold text-[#500F1D]">{foodItems.filter(f => f.available).length}</p>
              </div>
            </div>
          </div>

          {/* Table Container with Integrated Filter Bar */}
          <div className="bg-white rounded-3xl border border-[#E8DDD8] shadow-sm overflow-hidden">
            {/* Integrated Toolbar */}
            <div className="p-4 sm:p-5 border-b border-[#E8DDD8] bg-[#FAF7F5] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#500F1D]/50" />
                  <input
                    type="text"
                    placeholder="Search by food name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E8DDD8] focus:outline-none focus:ring-2 focus:ring-[#500F1D]/20 text-[#500F1D]"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Category Dropdown */}
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E8DDD8] text-[#500F1D] font-medium focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>

                {/* Dietary Dropdown */}
                <select
                  value={selectedVegFilter}
                  onChange={(e) => setSelectedVegFilter(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E8DDD8] text-[#500F1D] font-medium focus:outline-none"
                >
                  <option value="All">All Diets</option>
                  <option value="Veg">Vegetarian Only</option>
                  <option value="Non-Veg">Non-Veg Only</option>
                </select>

                {/* Station Dropdown */}
                <select
                  value={selectedStationFilter}
                  onChange={(e) => setSelectedStationFilter(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E8DDD8] text-[#500F1D] font-medium focus:outline-none"
                >
                  <option value="All">All Kitchen Stations</option>
                  {stations.map(st => (
                    <option key={st.id} value={st.id}>{st.name}</option>
                  ))}
                </select>
              </div>

              {/* Add Food Item Button */}
              <button
                onClick={handleOpenAddFood}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm shrink-0"
              >
                <Plus size={16} />
                <span>+ Add Food Item</span>
              </button>
            </div>

            {/* Food Master Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF1EB]">
                  <tr className="text-[#500F1D] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6 rounded-l-2xl">Item Details</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Diet</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Prep Time</th>
                    <th className="py-3.5 px-4">Kitchen Station</th>
                    <th className="py-3.5 px-4">Availability</th>
                    <th className="py-3.5 px-4 text-center rounded-r-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DDD8] text-xs sm:text-sm">
                  {filteredFoodItems.length > 0 ? (
                    filteredFoodItems.map((item) => (
                      <tr key={item.id} className="hover:bg-[#FAF7F5] transition-colors">
                        <td className="py-3 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80'}
                              alt={item.name}
                              className="w-11 h-11 rounded-xl object-cover border border-[#E8DDD8] shadow-xs shrink-0"
                            />
                            <div>
                              <p className="font-bold text-[#500F1D] leading-snug">{item.name}</p>
                              <p className="text-[11px] text-[#500F1D]/60">{item.id} • {item.subcategory}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-[#FAF7F5] border border-[#E8DDD8] text-[#500F1D] text-xs font-medium">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {item.isVeg ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                              <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Veg
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                              <span className="w-2 h-2 rounded-full bg-rose-600"></span> Non-Veg
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-bold text-[#500F1D]">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="py-3 px-4 text-[#500F1D]/80">
                          <span className="inline-flex items-center gap-1">
                            <Clock size={13} className="text-[#500F1D]/50" />
                            {item.prepTime} mins
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs font-medium text-[#500F1D] bg-[#FAF7F5] px-2.5 py-1 rounded-lg border border-[#E8DDD8]">
                            {getStationName(item.stationId)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleAvailability(item.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                              item.available 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                                : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                            {item.available ? 'Available' : 'Unavailable'}
                          </button>
                        </td>
                        {/* Action Column Matching the Reference UI */}
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setViewingFood(item)}
                              title="View Details"
                              className="p-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8] transition-colors"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              onClick={() => handleOpenEditFood(item)}
                              title="Edit Food Item"
                              className="p-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8] transition-colors"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => setDeleteFoodTarget(item)}
                              title="Delete Item"
                              className="p-1.5 rounded-xl bg-[#FAF7F5] hover:bg-red-50 text-red-600 border border-[#E8DDD8] transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-[#500F1D]/60">
                        <UtensilsCrossed size={36} className="mx-auto mb-2 opacity-30 text-[#500F1D]" />
                        <p className="font-medium">No food items matched your search criteria.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: CATEGORIES */}
      {activeSubTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">Category & Subcategory Hierarchy</h2>
              <p className="text-xs text-[#500F1D]/70">Organize food offerings into clear master menus and kitchen workflows.</p>
            </div>
            <button
              onClick={handleOpenAddCategory}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#500F1D]/30 transition-all"
              >
                <div>
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleToggleCategoryActive(cat.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border ${
                          cat.active 
                            ? 'bg-emerald-500/90 text-white border-emerald-400' 
                            : 'bg-red-500/90 text-white border-red-400'
                        }`}
                      >
                        {cat.active ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-serif font-bold text-[#500F1D]">{cat.name}</h3>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#FAF7F5] border border-[#E8DDD8] text-[#500F1D]">
                        {foodItems.filter(f => f.category === cat.name).length} Items
                      </span>
                    </div>

                    <p className="text-xs text-[#500F1D]/70 font-semibold mb-2">Subcategories:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories && cat.subcategories.map((sub, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAF7F5] text-[11px] font-medium text-[#500F1D] border border-[#E8DDD8]">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF7F5] border-t border-[#E8DDD8] flex items-center justify-between">
                  <span className="text-[11px] text-[#500F1D]/60 font-mono">{cat.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditCategory(cat)}
                      className="p-2 rounded-xl bg-white hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8] transition-colors"
                      title="Edit Category"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteCategoryTarget(cat)}
                      className="p-2 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-[#E8DDD8] transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: MENU SCHEDULES & ACTIVATION */}
      {activeSubTab === 'menus' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">Service Menu Schedules & Activation</h2>
              <p className="text-xs text-[#500F1D]/70">Configure automatic service time windows for Breakfast, Lunch, and Dinner dining.</p>
            </div>
            <button
              onClick={handleOpenAddMenu}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Create Service Menu</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menus.map((menu) => (
              <div 
                key={menu.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] shadow-sm p-6 flex flex-col justify-between hover:border-[#500F1D]/30 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#E5A81E]/20 text-[#8F5E00] border border-[#E5A81E]/30">
                        {menu.type} Menu
                      </span>
                      <h3 className="text-lg font-serif font-bold text-[#500F1D] mt-2">{menu.name}</h3>
                    </div>
                    <button
                      onClick={() => handleToggleMenuStatus(menu.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        menu.active 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {menu.active ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  {/* Schedule Details */}
                  <div className="space-y-3 bg-[#FAF7F5] p-4 rounded-2xl border border-[#E8DDD8] mb-4">
                    <div className="flex items-center gap-2 text-xs text-[#500F1D]">
                      <Clock size={15} className="text-[#500F1D]/60" />
                      <span className="font-semibold">{menu.schedule.startTime} – {menu.schedule.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#500F1D]">
                      <Calendar size={15} className="text-[#500F1D]/60" />
                      <span>{menu.schedule.days.join(', ')}</span>
                    </div>
                  </div>

                  {/* Assigned Categories */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#500F1D]/70">Assigned Categories ({menu.assignedCategories?.length || 0}):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {menu.assignedCategories?.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAF7F5] border border-[#E8DDD8] text-[11px] font-medium text-[#500F1D]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E8DDD8] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#500F1D]">
                    {foodItems.filter(f => menu.assignedCategories?.includes(f.category)).length} Available Items
                  </span>
                  <button
                    onClick={() => handleOpenEditMenu(menu)}
                    className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8] transition-colors inline-flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <Edit3 size={14} />
                    <span>Edit Schedule</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* ADD / EDIT FOOD ITEM MODAL */}
      {foodModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8] my-8 animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
                  <UtensilsCrossed size={18} />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                  {editingFood ? 'Edit Food Master Recipe' : 'Add New Food Item'}
                </h3>
              </div>
              <button 
                onClick={() => setFoodModalOpen(false)}
                className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveFood} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Food Item Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Truffle Mushroom Risotto"
                    value={foodForm.name}
                    onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none focus:ring-2 focus:ring-[#500F1D]/20 text-[#500F1D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Category *</label>
                  <select
                    value={foodForm.category}
                    onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Subcategory</label>
                  <input
                    type="text"
                    placeholder="e.g. Italian, Woodfired"
                    value={foodForm.subcategory}
                    onChange={(e) => setFoodForm({ ...foodForm, subcategory: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Price (₹) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="420"
                    value={foodForm.price}
                    onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Prep Time (mins)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="15"
                    value={foodForm.prepTime}
                    onChange={(e) => setFoodForm({ ...foodForm, prepTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Kitchen Station Mapping *</label>
                  <select
                    value={foodForm.stationId}
                    onChange={(e) => setFoodForm({ ...foodForm, stationId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  >
                    {stations.map(st => (
                      <option key={st.id} value={st.id}>{st.name} ({st.code})</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Food Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={foodForm.image}
                    onChange={(e) => setFoodForm({ ...foodForm, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Description & Ingredients</label>
                  <textarea
                    rows={2}
                    placeholder="Short description of recipe, culinary profile, or key allergens..."
                    value={foodForm.description}
                    onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  />
                </div>

                <div className="flex items-center gap-4 sm:col-span-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dietType"
                      checked={foodForm.isVeg === true}
                      onChange={() => setFoodForm({ ...foodForm, isVeg: true })}
                      className="accent-[#500F1D]"
                    />
                    <span className="text-xs font-bold text-emerald-700">Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dietType"
                      checked={foodForm.isVeg === false}
                      onChange={() => setFoodForm({ ...foodForm, isVeg: false })}
                      className="accent-[#500F1D]"
                    />
                    <span className="text-xs font-bold text-rose-700">Non-Vegetarian</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setFoodModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs sm:text-sm font-semibold text-[#500F1D] hover:bg-[#FAF7F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] shadow-sm"
                >
                  {editingFood ? 'Save Changes' : 'Create Food Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW FOOD ITEM MODAL */}
      {viewingFood && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E8DDD8] animate-scaleUp">
            <div className="relative h-48">
              <img src={viewingFood.image} alt={viewingFood.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setViewingFood(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#500F1D]/60 font-mono">{viewingFood.id}</span>
                  <h3 className="text-xl font-serif font-bold text-[#500F1D]">{viewingFood.name}</h3>
                </div>
                <p className="text-xl font-bold text-[#500F1D]">{formatCurrency(viewingFood.price)}</p>
              </div>

              <p className="text-xs text-[#500F1D]/80 leading-relaxed">{viewingFood.description || 'No description provided.'}</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8]">
                  <p className="text-[11px] text-[#500F1D]/60 font-medium">Category</p>
                  <p className="text-xs font-bold text-[#500F1D]">{viewingFood.category} ({viewingFood.subcategory})</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8]">
                  <p className="text-[11px] text-[#500F1D]/60 font-medium">Dietary Type</p>
                  <p className="text-xs font-bold text-[#500F1D]">{viewingFood.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8]">
                  <p className="text-[11px] text-[#500F1D]/60 font-medium">Prep Time</p>
                  <p className="text-xs font-bold text-[#500F1D]">{viewingFood.prepTime} Minutes</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8]">
                  <p className="text-[11px] text-[#500F1D]/60 font-medium">Station</p>
                  <p className="text-xs font-bold text-[#500F1D]">{getStationName(viewingFood.stationId)}</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setViewingFood(null)}
                  className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE FOOD CONFIRM MODAL */}
      {deleteFoodTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DDD8] animate-scaleUp text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h4 className="text-lg font-serif font-bold text-[#500F1D] mb-1">Delete Food Item?</h4>
            <p className="text-xs text-[#500F1D]/70 mb-6">
              Are you sure you want to remove <strong>"{deleteFoodTarget.name}"</strong>? This will permanently delete it from the food master catalog.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteFoodTarget(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D] hover:bg-[#FAF7F5]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFood}
                className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8] animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={() => setCategoryModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Starters"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Subcategories (comma separated)</label>
                <input
                  type="text"
                  placeholder="Kebabs, Crisp Appetizers, Soups"
                  value={categoryForm.subcategories}
                  onChange={(e) => setCategoryForm({ ...categoryForm, subcategories: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="catActive"
                  checked={categoryForm.active}
                  onChange={(e) => setCategoryForm({ ...categoryForm, active: e.target.checked })}
                  className="accent-[#500F1D] w-4 h-4 rounded"
                />
                <label htmlFor="catActive" className="text-xs font-bold text-[#500F1D] cursor-pointer">
                  Category is Active on Customer & Kitchen Portals
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CATEGORY CONFIRM */}
      {deleteCategoryTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DDD8] text-center">
            <h4 className="text-lg font-serif font-bold text-[#500F1D] mb-1">Delete Category?</h4>
            <p className="text-xs text-[#500F1D]/70 mb-6">
              Delete category "{deleteCategoryTarget.name}"? Food items in this category will need reassignment.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteCategoryTarget(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
                className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MENU MODAL */}
      {menuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingMenu ? 'Edit Service Menu' : 'Create Service Menu'}
              </h3>
              <button onClick={() => setMenuModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveMenu} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Menu Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Dine Candlelight Dinner"
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Menu Type</label>
                  <select
                    value={menuForm.type}
                    onChange={(e) => setMenuForm({ ...menuForm, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Late Night">Late Night</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Active Status</label>
                  <select
                    value={menuForm.active ? 'true' : 'false'}
                    onChange={(e) => setMenuForm({ ...menuForm, active: e.target.value === 'true' })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  >
                    <option value="true">Active</option>
                    <option value="false">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Start Time</label>
                  <input
                    type="text"
                    placeholder="07:00 PM"
                    value={menuForm.startTime}
                    onChange={(e) => setMenuForm({ ...menuForm, startTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">End Time</label>
                  <input
                    type="text"
                    placeholder="11:30 PM"
                    value={menuForm.endTime}
                    onChange={(e) => setMenuForm({ ...menuForm, endTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">
                  Assigned Categories
                </label>
                <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAF7F5] rounded-xl border border-[#E8DDD8]">
                  {categories.map((c) => {
                    const isChecked = menuForm.assignedCategories.includes(c.name);
                    return (
                      <label key={c.id} className="flex items-center gap-2 text-xs font-medium text-[#500F1D] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setMenuForm({
                                ...menuForm,
                                assignedCategories: menuForm.assignedCategories.filter(cat => cat !== c.name)
                              });
                            } else {
                              setMenuForm({
                                ...menuForm,
                                assignedCategories: [...menuForm.assignedCategories, c.name]
                              });
                            }
                          }}
                          className="accent-[#500F1D] rounded"
                        />
                        <span>{c.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setMenuModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenuManagement;
