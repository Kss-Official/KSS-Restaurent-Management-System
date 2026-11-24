import React, { useState, useMemo, useEffect } from 'react';
import { useAppStore } from '../../store/store';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {
  Home,
  Leaf,
  LayoutDashboard,
  UtensilsCrossed,
  Clock,
  Calendar,
  DollarSign,
  Layers,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  CreditCard,
  TrendingUp,
  BarChart3,
  Bell,
  ChevronDown,
  ChevronRight,
  Eye,
  Download,
  ChefHat,
  Sparkles,
  Check,
  X,
  Settings,
  LogOut,
  ShoppingBag,
  Menu,
  ShieldCheck,
  User,
  Coffee,
  HelpCircle,
  FileText,
  Users,
  IndianRupee,
  CircleDollarSign,
  ReceiptText,
  Armchair,
  CalendarClock,
  Wallet,
  LayoutGrid,
  Flame,
  ChevronLeft,
  ConciergeBell,
  Pizza,
  Salad,
  Cake,
  CupSoda,
  Heart,
  Filter,
  Trash2,
  Pencil,
  Fish,
  Wine,
  BadgePercent,
  Boxes,
  Utensils,
  Soup,
  Hourglass,
  MapPin,
  MoreVertical,
  ShoppingCart,
  RotateCcw,
  Lock,
  EyeOff,
  Store,
  Phone,
  Mail,
  UserCheck,
  Star,
  ArrowDownToLine,
  Printer,
  Copy,
  Coins,
  Trophy
} from 'lucide-react';

// Seater Table SVG Icons matching the reference design
const TableTwoSeaterIcon = ({ className = "w-4 h-4 text-[#500F1D]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="4" cy="7" r="2" />
    <path d="M3 10.5C2 10.5 1 11.5 1 13v4h2v3h2v-3h.5V11C5.5 10.5 4.5 10.5 3 10.5z" />
    <rect x="7" y="10" width="10" height="2.5" rx="1" />
    <path d="M8.5 12.5v7.5H10v-6h4v6h1.5v-7.5z" />
    <circle cx="20" cy="7" r="2" />
    <path d="M21 10.5c1 0 2 1 2 2.5v4h-2v3h-2v-3h-.5V11c0-.5 1-.5 2.5-.5z" />
  </svg>
);

const TableFourSeaterIcon = ({ className = "w-4 h-4 text-[#500F1D]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="8" width="12" height="8" rx="1.5" />
    <circle cx="9" cy="4.5" r="1.5" />
    <path d="M7.5 7h3v-1h-3z" />
    <circle cx="15" cy="4.5" r="1.5" />
    <path d="M13.5 7h3v-1h-3z" />
    <circle cx="9" cy="19.5" r="1.5" />
    <path d="M7.5 17h3v1h-3z" />
    <circle cx="15" cy="19.5" r="1.5" />
    <path d="M13.5 17h3v1h-3z" />
  </svg>
);

// Chair-Table-Chair Icon matching Reference Image 1 & 2
const TableReportHeaderIcon = ({ className = "w-6 h-6 text-white" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="7" width="2.5" height="11" rx="1" />
    <rect x="2" y="11" width="5" height="2" rx="0.5" />
    <rect x="4.5" y="13" width="2" height="5" rx="0.5" />
    <rect x="8" y="9" width="8" height="2.5" rx="0.8" />
    <rect x="11" y="11.5" width="2" height="7" rx="0.5" />
    <rect x="19.5" y="7" width="2.5" height="11" rx="1" />
    <rect x="17" y="11" width="5" height="2" rx="0.5" />
    <rect x="17.5" y="13" width="2" height="5" rx="0.5" />
  </svg>
);

const TableSixSeaterIcon = ({ className = "w-4 h-4 text-[#500F1D]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="8" width="16" height="8" rx="1.5" />
    <circle cx="6.5" cy="4.5" r="1.4" />
    <circle cx="12" cy="4.5" r="1.4" />
    <circle cx="17.5" cy="4.5" r="1.4" />
    <circle cx="6.5" cy="19.5" r="1.4" />
    <circle cx="12" cy="19.5" r="1.4" />
    <circle cx="17.5" cy="19.5" r="1.4" />
  </svg>
);

export const ManagerPortal = () => {
  // Navigation Section (Food & Menu or Dashboard, preserved in localStorage)
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const sec = params.get('section');
        if (sec) return sec;
        const saved = localStorage.getItem('manager_active_section');
        if (saved) return saved;
      } catch (e) { }
    }
    return 'food-menu';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [salesTimeRange, setSalesTimeRange] = useState('1D'); // 1D, 7D, 30D, Custom
  const [selectedDateFilter, setSelectedDateFilter] = useState('Today, 16 Nov 2026');
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleSectionSelect = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('manager_active_section', section);
        const url = new URL(window.location.href);
        url.searchParams.set('section', section);
        window.history.replaceState(null, '', url.toString());
      } catch (e) { }
    }
  };

  // Sub-tabs for other sections
  const [foodSubTab, setFoodSubTab] = useState('availability');
  const [ordersSubTab, setOrdersSubTab] = useState('all');
  const [tableSubTab, setTableSubTab] = useState('floor');
  const [posSubTab, setPosSubTab] = useState('transactions');

  // Centralized Store Data
  const {
    currentUser,
    tables,
    updateTableStatus,
    sessions,
    bookings,
    orders,
    updateOrderStatus,
    menuItems,
    setMenuItems,
    inventory,
    updateInventoryStock,
    reviews,
    complaints
  } = useAppStore();

  // Local State
  const [searchFoodQuery, setSearchFoodQuery] = useState('');
  const [selectedFoodCategory, setSelectedFoodCategory] = useState('All');
  const [transferFromTable, setTransferFromTable] = useState('T08');
  const [transferToTable, setTransferToTable] = useState('T10');
  const [transferToast, setTransferToast] = useState(null);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);

  // Filter & Search State for Food & Menu
  const [selectedMenuCategory, setSelectedMenuCategory] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDishModal, setViewDishModal] = useState(null);
  const [editDishModal, setEditDishModal] = useState(null);
  const [foodMenuSubTab, setFoodMenuSubTab] = useState('availability'); // 'availability' | 'out-of-stock' | 'pricing' | 'activation' | 'schedule'
  const [openMoreMenuId, setOpenMoreMenuId] = useState(null);

  // Order & Kitchen Section State
  const [kitchenFilterTab, setKitchenFilterTab] = useState('All Orders');
  const [expandedKitchenOrder, setExpandedKitchenOrder] = useState(null);
  const [kitchenOrders, setKitchenOrders] = useState([
    {
      table: 'T01',
      orderId: '#1001',
      kotId: 'KOT-841',
      station: 'Hot Kitchen & Risotto',
      itemsCount: '2 Items',
      itemsList: [
        { name: 'Truffle Risotto', qty: 1, price: 420 },
        { name: 'Garlic Bread', qty: 1, price: 150 }
      ],
      time: '02:15 PM',
      elapsed: '14 mins',
      target: '18 mins',
      progress: 75,
      status: 'Preparing',
      statusBg: 'bg-[#FEF9C3]',
      statusText: 'text-[#B45309]',
      statusDot: 'bg-[#D97706]'
    },
    {
      table: 'T02',
      orderId: '#1002',
      kotId: 'KOT-842',
      station: 'Pizza & Oven Pass',
      itemsCount: '1 Item',
      itemsList: [
        { name: 'Margherita Pizza', qty: 1, price: 450 }
      ],
      time: '02:20 PM',
      elapsed: '12 mins',
      target: '12 mins',
      progress: 100,
      status: 'Ready',
      statusBg: 'bg-[#DCFCE7]',
      statusText: 'text-[#15803D]',
      statusDot: 'bg-[#16A34A]'
    },
    {
      table: 'T03',
      orderId: '#1003',
      kotId: 'KOT-843',
      station: 'Salad & Continental',
      itemsCount: '3 Items',
      itemsList: [
        { name: 'Caesar Salad', qty: 1, price: 280 },
        { name: 'Penne Alfredo', qty: 1, price: 380 },
        { name: 'Iced Coffee', qty: 1, price: 150 }
      ],
      time: '02:25 PM',
      elapsed: '10 mins',
      target: '16 mins',
      progress: 60,
      status: 'Preparing',
      statusBg: 'bg-[#FEF9C3]',
      statusText: 'text-[#B45309]',
      statusDot: 'bg-[#D97706]'
    },
    {
      table: 'T04',
      orderId: '#1004',
      kotId: 'KOT-844',
      station: 'Appetizer & Grill',
      itemsCount: '2 Items',
      itemsList: [
        { name: 'Bruschetta', qty: 1, price: 220 },
        { name: 'Lasagna Bolognese', qty: 1, price: 400 }
      ],
      time: '02:30 PM',
      elapsed: '4 mins',
      target: '20 mins',
      progress: 20,
      status: 'Pending',
      statusBg: 'bg-[#FEE2E2]',
      statusText: 'text-[#DC2626]',
      statusDot: 'bg-[#DC2626]'
    },
    {
      table: 'T05',
      orderId: '#1005',
      kotId: 'KOT-845',
      station: 'Bakery & Dessert Pass',
      itemsCount: '1 Item',
      itemsList: [
        { name: 'Chocolate Brownie', qty: 1, price: 180 }
      ],
      time: '02:35 PM',
      elapsed: '15 mins',
      target: '8 mins',
      progress: 100,
      status: 'Ready',
      statusBg: 'bg-[#DCFCE7]',
      statusText: 'text-[#15803D]',
      statusDot: 'bg-[#16A34A]'
    },
    {
      table: 'T07',
      orderId: '#1008',
      kotId: 'KOT-848',
      station: 'Tandoor Station',
      itemsCount: '2 Items',
      itemsList: [
        { name: 'Paneer Tikka', qty: 2, price: 640 },
        { name: 'Garlic Naan', qty: 2, price: 120 }
      ],
      time: '02:05 PM',
      elapsed: '28 mins',
      target: '18 mins',
      progress: 85,
      delayReason: 'Tandoor coal reheating delay (+10 mins)',
      isDelayed: true,
      status: 'Delayed',
      statusBg: 'bg-[#FEE2E2]',
      statusText: 'text-[#DC2626]',
      statusDot: 'bg-[#DC2626]'
    },
    {
      table: 'T09',
      orderId: '#1009',
      kotId: 'KOT-849',
      station: 'Main Pass',
      itemsCount: '1 Item',
      itemsList: [
        { name: 'Wild Atlantic Salmon', qty: 1, price: 580 }
      ],
      time: '02:00 PM',
      elapsed: '30 mins',
      target: '20 mins',
      progress: 0,
      delayReason: 'Customer requested cancellation due to wait time',
      isDelayed: true,
      status: 'Cancelled',
      statusBg: 'bg-[#F3F4F6]',
      statusText: 'text-[#4B5563]',
      statusDot: 'bg-[#6B7280]'
    }
  ]);

  const updateKitchenOrderStatus = (orderId, newStatus) => {
    setKitchenOrders(prev => prev.map(ord => {
      if (ord.orderId === orderId) {
        let bg = 'bg-[#FEF9C3]';
        let text = 'text-[#B45309]';
        let dot = 'bg-[#D97706]';
        if (newStatus === 'Ready to Serve') {
          bg = 'bg-[#DCFCE7]';
          text = 'text-[#15803D]';
          dot = 'bg-[#16A34A]';
        } else if (newStatus === 'Pending') {
          bg = 'bg-[#FEE2E2]';
          text = 'text-[#DC2626]';
          dot = 'bg-[#DC2626]';
        } else if (newStatus === 'Served') {
          bg = 'bg-[#DCFCE7]';
          text = 'text-[#15803D]';
          dot = 'bg-[#16A34A]';
        }
        return { ...ord, status: newStatus, statusBg: bg, statusText: text, statusDot: dot };
      }
      return ord;
    }));
    setSelectedOrderModal(prev => prev ? {
      ...prev,
      status: newStatus,
      statusBg: newStatus === 'Ready to Serve' || newStatus === 'Served' ? 'bg-[#DCFCE7]' : newStatus === 'Pending' ? 'bg-[#FEE2E2]' : 'bg-[#FEF9C3]',
      statusText: newStatus === 'Ready to Serve' || newStatus === 'Served' ? 'text-[#15803D]' : newStatus === 'Pending' ? 'text-[#DC2626]' : 'text-[#B45309]',
      statusDot: newStatus === 'Ready to Serve' || newStatus === 'Served' ? 'bg-[#16A34A]' : newStatus === 'Pending' ? 'bg-[#DC2626]' : 'bg-[#D97706]'
    } : null);
  };

  // Table Management State
  const [tableLocationHeader, setTableLocationHeader] = useState('Indoor Hall');
  const [tableStatusFilter, setTableStatusFilter] = useState('All Status');
  const [tableCapacityFilter, setTableCapacityFilter] = useState('All Capacity');
  const [tableLocationFilter, setTableLocationFilter] = useState('All Tables');
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [tableSelectedDate, setTableSelectedDate] = useState('2026-11-21');
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableRowsPerPage, setTableRowsPerPage] = useState(8);
  const [addTableModalOpen, setAddTableModalOpen] = useState(false);
  const [selectedTableDetailsModal, setSelectedTableDetailsModal] = useState(null);
  const [editTableModal, setEditTableModal] = useState(null);
  const [activeTableMoreMenuId, setActiveTableMoreMenuId] = useState(null);

  const [newTableData, setNewTableData] = useState({
    tableNo: 'T17',
    capacity: '4 Seater',
    price: 1200,
    location: 'Indoor Hall',
    status: 'Available',
    booking: '—'
  });

  const [tableManagementList, setTableManagementList] = useState([
    { id: 1, tableNo: 'T01', capacity: '2 Seater', price: 800, location: 'Indoor Hall', status: 'Available', booking: '—' },
    { id: 2, tableNo: 'T02', capacity: '2 Seater', price: 800, location: 'Indoor Hall', status: 'Reserved', booking: 'R. Sharma • 7:00 PM' },
    { id: 3, tableNo: 'T03', capacity: '2 Seater', price: 800, location: 'Indoor Hall', status: 'Available', booking: '—' },
    { id: 4, tableNo: 'T04', capacity: '4 Seater', price: 1200, location: 'Indoor Hall', status: 'Available', booking: '—' },
    { id: 5, tableNo: 'T05', capacity: '4 Seater', price: 1200, location: 'Indoor Hall', status: 'Reserved', booking: 'P. Mehta • 8:00 PM' },
    { id: 6, tableNo: 'T06', capacity: '4 Seater', price: 1200, location: 'Indoor Hall', status: 'Available', booking: '—' },
    { id: 7, tableNo: 'T07', capacity: '6 Seater', price: 1800, location: 'Outdoor Terrace', status: 'Available', booking: '—' },
    { id: 8, tableNo: 'T08', capacity: '6 Seater', price: 1800, location: 'Outdoor Terrace', status: 'Maintenance', booking: '—' },
    { id: 9, tableNo: 'T09', capacity: '2 Seater', price: 800, location: 'Indoor Hall', status: 'Available', booking: '—' },
    { id: 10, tableNo: 'T10', capacity: '2 Seater', price: 800, location: 'Indoor Hall', status: 'Reserved', booking: 'K. Patel • 8:30 PM' },
    { id: 11, tableNo: 'T11', capacity: '4 Seater', price: 1200, location: 'Indoor Hall', status: 'Available', booking: '—' },
    { id: 12, tableNo: 'T12', capacity: '4 Seater', price: 1200, location: 'Indoor Hall', status: 'Available', booking: '—' },
    { id: 13, tableNo: 'T13', capacity: '4 Seater', price: 1200, location: 'Outdoor Terrace', status: 'Reserved', booking: 'A. Singh • 9:00 PM' },
    { id: 14, tableNo: 'T14', capacity: '6 Seater', price: 1800, location: 'Outdoor Terrace', status: 'Available', booking: '—' },
    { id: 15, tableNo: 'T15', capacity: '6 Seater', price: 1800, location: 'Outdoor Terrace', status: 'Reserved', booking: 'S. Gupta • 7:30 PM' },
    { id: 16, tableNo: 'T16', capacity: '6 Seater', price: 1800, location: 'Outdoor Terrace', status: 'Reserved', booking: 'V. Verma • 9:30 PM' }
  ]);

  // POS & Reports View Mode State ('pos' | 'reports')
  const [posReportViewMode, setPosReportViewMode] = useState('pos');
  const [posSubTabActive, setPosSubTabActive] = useState('POS Transactions');
  const [posTableFilter, setPosTableFilter] = useState('All Tables');
  const [posPaymentMethodFilter, setPosPaymentMethodFilter] = useState('All Payment Methods');
  const [posStatusFilter, setPosStatusFilter] = useState('All Status');
  const [posDateFilter, setPosDateFilter] = useState('21 Nov 2025 - 21 Nov 2025');
  const [posSearchQuery, setPosSearchQuery] = useState('');
  const [posCurrentPage, setPosCurrentPage] = useState(1);
  const [selectedPosTransactionModal, setSelectedPosTransactionModal] = useState(null);
  const [editingPosTransaction, setEditingPosTransaction] = useState(null);
  const [posToastMessage, setPosToastMessage] = useState('');

  // Sales Report View State (Exact Reference Image media_1795427482538_6216289d.jpg & Filters)
  const [salesSearchQuery, setSalesSearchQuery] = useState('');
  const [salesCategoryFilter, setSalesCategoryFilter] = useState('All Categories');
  const [salesPaymentFilter, setSalesPaymentFilter] = useState('All Payment Methods');
  const [salesStatusFilter, setSalesStatusFilter] = useState('All Status');
  const [salesDateRangeFilter, setSalesDateRangeFilter] = useState('All Dates');
  const [salesCurrentPage, setSalesCurrentPage] = useState(1);
  const [salesRowsPerPage, setSalesRowsPerPage] = useState(5);
  const [selectedSalesReportModal, setSelectedSalesReportModal] = useState(null);
  const [salesFilterToast, setSalesFilterToast] = useState('');

  // Initial reference image entries + additional realistic operational records for testing filters
  const [salesReportEntries, setSalesReportEntries] = useState([
    {
      id: 1,
      dateTime: '30 Nov 2026, 09:45 AM',
      orderId: 'ORD1248',
      tableNo: 'T05',
      items: 'Paneer Tikka, Cold Coffee',
      category: 'Starter, Beverage',
      amount: 420,
      paymentMethod: 'UPI',
      status: 'Completed'
    },
    {
      id: 2,
      dateTime: '30 Nov 2026, 08:30 PM',
      orderId: 'ORD1247',
      tableNo: 'T12',
      items: 'Margherita Pizza',
      category: 'Pizza',
      amount: 450,
      paymentMethod: 'Card',
      status: 'Completed'
    },
    {
      id: 3,
      dateTime: '30 Nov 2026, 07:15 PM',
      orderId: 'ORD1246',
      tableNo: 'T08',
      items: 'Pasta Alfredo',
      category: 'Main Course',
      amount: 380,
      paymentMethod: 'Cash',
      status: 'Completed'
    },
    {
      id: 4,
      dateTime: '30 Nov 2026, 06:50 PM',
      orderId: 'ORD1245',
      tableNo: 'T03',
      items: 'Brownie',
      category: 'Dessert',
      amount: 180,
      paymentMethod: 'UPI',
      status: 'Completed'
    },
    {
      id: 5,
      dateTime: '30 Nov 2026, 05:20 PM',
      orderId: 'ORD1244',
      tableNo: 'T10',
      items: 'Cold Coffee',
      category: 'Beverage',
      amount: 149,
      paymentMethod: 'Cash',
      status: 'Pending'
    },
    {
      id: 6,
      dateTime: '30 Nov 2026, 04:30 PM',
      orderId: 'ORD1243',
      tableNo: 'T01',
      items: 'Crispy Corn, Lemonade',
      category: 'Starter, Beverage',
      amount: 320,
      paymentMethod: 'Card',
      status: 'Completed'
    },
    {
      id: 7,
      dateTime: '30 Nov 2026, 03:15 PM',
      orderId: 'ORD1242',
      tableNo: 'T07',
      items: 'Farmhouse Pizza, Garlic Bread',
      category: 'Pizza, Starter',
      amount: 560,
      paymentMethod: 'UPI',
      status: 'Completed'
    },
    {
      id: 8,
      dateTime: '30 Nov 2026, 02:00 PM',
      orderId: 'ORD1241',
      tableNo: 'T02',
      items: 'Paneer Butter Masala, Garlic Naan',
      category: 'Main Course',
      amount: 480,
      paymentMethod: 'Cash',
      status: 'Completed'
    },
    {
      id: 9,
      dateTime: '30 Nov 2026, 01:10 PM',
      orderId: 'ORD1240',
      tableNo: 'T09',
      items: 'Chocolate Lava Cake',
      category: 'Dessert',
      amount: 195,
      paymentMethod: 'Card',
      status: 'Completed'
    },
    {
      id: 10,
      dateTime: '30 Nov 2026, 12:20 PM',
      orderId: 'ORD1239',
      tableNo: 'T04',
      items: 'Cold Coffee, Veg Sandwich',
      category: 'Beverage, Starter',
      amount: 299,
      paymentMethod: 'UPI',
      status: 'Pending'
    },
    {
      id: 11,
      dateTime: '29 Nov 2026, 08:45 PM',
      orderId: 'ORD1238',
      tableNo: 'T06',
      items: 'Barbecue Veg Pizza',
      category: 'Pizza',
      amount: 520,
      paymentMethod: 'UPI',
      status: 'Completed'
    },
    {
      id: 12,
      dateTime: '29 Nov 2026, 07:20 PM',
      orderId: 'ORD1237',
      tableNo: 'T11',
      items: 'Dal Makhani, Butter Roti',
      category: 'Main Course',
      amount: 360,
      paymentMethod: 'Cash',
      status: 'Completed'
    },
    {
      id: 13,
      dateTime: '29 Nov 2026, 06:05 PM',
      orderId: 'ORD1236',
      tableNo: 'T03',
      items: 'Gulab Jamun with Ice Cream',
      category: 'Dessert',
      amount: 160,
      paymentMethod: 'Card',
      status: 'Completed'
    },
    {
      id: 14,
      dateTime: '29 Nov 2026, 04:40 PM',
      orderId: 'ORD1235',
      tableNo: 'T05',
      items: 'Iced Peach Tea, French Fries',
      category: 'Beverage, Starter',
      amount: 240,
      paymentMethod: 'UPI',
      status: 'Completed'
    },
    {
      id: 15,
      dateTime: '29 Nov 2026, 02:15 PM',
      orderId: 'ORD1234',
      tableNo: 'T08',
      items: 'Spring Rolls, Masala Chai',
      category: 'Starter, Beverage',
      amount: 220,
      paymentMethod: 'Cash',
      status: 'Pending'
    }
  ]);

  // Real-time automatic filtering across all filters and search query
  const filteredSalesReportEntries = useMemo(() => {
    return salesReportEntries.filter((row) => {
      // 1. Search Query filter (matches Order ID, Table No, Items, Category, Payment Method, Status, Date/Time, Amount)
      if (salesSearchQuery.trim()) {
        const q = salesSearchQuery.toLowerCase().trim();
        const numQ = q.replace(/[₹\s,]/g, '');
        const matches =
          row.orderId.toLowerCase().includes(q) ||
          row.tableNo.toLowerCase().includes(q) ||
          row.items.toLowerCase().includes(q) ||
          row.category.toLowerCase().includes(q) ||
          row.paymentMethod.toLowerCase().includes(q) ||
          row.status.toLowerCase().includes(q) ||
          row.dateTime.toLowerCase().includes(q) ||
          (numQ !== '' && String(row.amount).includes(numQ));
        if (!matches) return false;
      }

      // 2. Category Filter
      if (salesCategoryFilter && salesCategoryFilter !== 'All Categories') {
        if (!row.category.toLowerCase().includes(salesCategoryFilter.toLowerCase())) {
          return false;
        }
      }

      // 3. Payment Method Filter
      if (salesPaymentFilter && salesPaymentFilter !== 'All Payment Methods') {
        if (row.paymentMethod.toLowerCase() !== salesPaymentFilter.toLowerCase()) {
          return false;
        }
      }

      // 4. Status Filter
      if (salesStatusFilter && salesStatusFilter !== 'All Status') {
        if (row.status.toLowerCase() !== salesStatusFilter.toLowerCase()) {
          return false;
        }
      }

      // 5. Date Range Filter
      if (salesDateRangeFilter && salesDateRangeFilter !== 'All Dates') {
        if (salesDateRangeFilter === 'Today' || salesDateRangeFilter === '30 Nov 2026') {
          if (!row.dateTime.includes('30 Nov 2026')) return false;
        } else if (salesDateRangeFilter === 'Yesterday' || salesDateRangeFilter === '29 Nov 2026') {
          if (!row.dateTime.includes('29 Nov 2026')) return false;
        } else if (salesDateRangeFilter === 'Last 7 Days') {
          if (!row.dateTime.includes('Nov 2026')) return false;
        } else if (salesDateRangeFilter === 'This Month' || salesDateRangeFilter === 'Nov 2026') {
          if (!row.dateTime.includes('Nov 2026')) return false;
        } else {
          if (!row.dateTime.toLowerCase().includes(salesDateRangeFilter.toLowerCase())) {
            return false;
          }
        }
      }

      return true;
    });
  }, [salesReportEntries, salesSearchQuery, salesCategoryFilter, salesPaymentFilter, salesStatusFilter, salesDateRangeFilter]);

  const totalSalesPages = Math.max(1, Math.ceil(filteredSalesReportEntries.length / salesRowsPerPage));

  const paginatedSalesReportEntries = useMemo(() => {
    const start = (salesCurrentPage - 1) * salesRowsPerPage;
    return filteredSalesReportEntries.slice(start, start + salesRowsPerPage);
  }, [filteredSalesReportEntries, salesCurrentPage, salesRowsPerPage]);

  // ==============================================================
  // Food & Sales Report State (Exact Reference: media_1795428754370_c73d4680.jpg)
  // ==============================================================
  const [foodSalesInnerTab, setFoodSalesInnerTab] = useState('Food Sales');
  const [foodSalesCategoryTimeFilter, setFoodSalesCategoryTimeFilter] = useState('This Month');
  const [foodSalesTrendFilter, setFoodSalesTrendFilter] = useState('Last 7 Days');
  const [viewAllFoodSalesModal, setViewAllFoodSalesModal] = useState(false);
  const [viewPaymentDetailsModal, setViewPaymentDetailsModal] = useState(false);

  // Exact 5 food items from reference image
  const [foodSalesList, setFoodSalesList] = useState([
    { id: 1, name: 'Paneer Tikka', category: 'Starter', qtySold: 185, revenue: 73970, status: 'Active', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=120&q=80' },
    { id: 2, name: 'Pasta Alfredo', category: 'Main Course', qtySold: 142, revenue: 56800, status: 'Active', image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281290?auto=format&fit=crop&w=120&q=80' },
    { id: 3, name: 'Margherita Pizza', category: 'Pizza', qtySold: 130, revenue: 52350, status: 'Active', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=120&q=80' },
    { id: 4, name: 'Cold Coffee', category: 'Beverage', qtySold: 120, revenue: 17880, status: 'Active', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=120&q=80' },
    { id: 5, name: 'Brownie', category: 'Dessert', qtySold: 98, revenue: 14700, status: 'Inactive', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=120&q=80' },
  ]);

  // Exact 4 daily sales trend entries from reference image
  const [salesTrendList, setSalesTrendList] = useState([
    { date: '24 Nov 2026', orders: 120, revenue: 46000, growth: '↑ 12%', isPositive: true },
    { date: '25 Nov 2026', orders: 118, revenue: 44500, growth: '↑ 8%', isPositive: true },
    { date: '26 Nov 2026', orders: 115, revenue: 42800, growth: '↓ 2%', isPositive: false },
    { date: '27 Nov 2026', orders: 130, revenue: 48700, growth: '↑ 15%', isPositive: true },
  ]);

  // Exact payment summary records from reference image
  const [foodSalesPaymentSummary, setFoodSalesPaymentSummary] = useState([
    { method: 'Cash', type: 'cash', transactions: 320, amount: 120000 },
    { method: 'UPI', type: 'upi', transactions: 520, amount: 210000 },
    { method: 'Card', type: 'card', transactions: 280, amount: 115000 },
    { method: 'Online', type: 'online', transactions: 128, amount: 40000 },
  ]);

  // Handler for Exporting Food & Sales Report
  const handleExportFoodSalesReport = () => {
    const csvContent = [
      '--- FOOD & SALES REPORT ---',
      'Total Food Sold,1248,Growth,12%',
      'Total Revenue,Rs 485750,Growth,18%',
      'Average Order Value,Rs 389,Growth,10%',
      'Top Selling Item,Paneer Tikka',
      '',
      '--- FOOD SALES LIST ---',
      'Food Item,Category,Quantity Sold,Revenue,Status',
      ...foodSalesList.map(item => `"${item.name}","${item.category}",${item.qtySold},"₹${item.revenue}","${item.status}"`),
      '',
      '--- SALES TREND ---',
      'Date,Total Orders,Revenue,Growth',
      ...salesTrendList.map(t => `"${t.date}",${t.orders},"₹${t.revenue}","${t.growth}"`),
      '',
      '--- PAYMENT SUMMARY ---',
      'Payment Method,Transactions,Total Amount',
      ...foodSalesPaymentSummary.map(p => `"${p.method}",${p.transactions},"₹${p.amount}"`),
      'Total,1248,"₹4,85,000"'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Food_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setPosToastMessage('Food & Sales Report exported successfully!');
    setTimeout(() => setPosToastMessage(''), 2500);
  };

  // ==============================================================
  // Billing Overview State & Data (Exact Reference: media_1795430085813_cdcef314.jpg)
  // ==============================================================
  const [billingSearchQuery, setBillingSearchQuery] = useState('');
  const [billingPaymentMethodFilter, setBillingPaymentMethodFilter] = useState('Payment Method');
  const [billingStatusFilter, setBillingStatusFilter] = useState('Status');
  const [billingTableFilter, setBillingTableFilter] = useState('Table No.');
  const [billingCurrentPage, setBillingCurrentPage] = useState(1);
  const [billingRowsPerPage, setBillingRowsPerPage] = useState(5);
  const [billingItemsDropdownOpen, setBillingItemsDropdownOpen] = useState(false);
  const [billingToast, setBillingToast] = useState('');

  // Exact 5 rows from reference image + extra live operational records
  const [billingBillsList, setBillingBillsList] = useState([
    {
      id: 1,
      billNo: 'BILL1248',
      orderId: 'ORD1248',
      customerName: 'Priya Sharma',
      tableNo: 'T05',
      amount: 1250,
      paymentMethod: 'UPI',
      status: 'Paid',
      dateTime: '30 Nov 2026, 09:45 AM',
      items: [
        { name: 'Paneer Tikka', qty: 2, price: 640 },
        { name: 'Cold Coffee', qty: 2, price: 298 },
        { name: 'Garlic Bread', qty: 1, price: 160 },
        { name: 'Mineral Water', qty: 2, price: 152 }
      ],
      subtotal: 1250,
      discount: 0,
      tax: 0
    },
    {
      id: 2,
      billNo: 'BILL1247',
      orderId: 'ORD1247',
      customerName: 'Rahul Mehta',
      tableNo: 'T12',
      amount: 980,
      paymentMethod: 'Card',
      status: 'Paid',
      dateTime: '30 Nov 2026, 08:30 PM',
      items: [
        { name: 'Margherita Pizza', qty: 1, price: 450 },
        { name: 'Pasta Alfredo', qty: 1, price: 380 },
        { name: 'Lemon Iced Tea', qty: 1, price: 150 }
      ],
      subtotal: 980,
      discount: 0,
      tax: 0
    },
    {
      id: 3,
      billNo: 'BILL1246',
      orderId: 'ORD1246',
      customerName: 'Sneha Patel',
      tableNo: 'T08',
      amount: 720,
      paymentMethod: 'Cash',
      status: 'Paid',
      dateTime: '30 Nov 2026, 07:15 PM',
      items: [
        { name: 'Veg Hakka Noodles', qty: 1, price: 280 },
        { name: 'Chilli Paneer', qty: 1, price: 320 },
        { name: 'Soft Drink', qty: 1, price: 120 }
      ],
      subtotal: 720,
      discount: 0,
      tax: 0
    },
    {
      id: 4,
      billNo: 'BILL1245',
      orderId: 'ORD1245',
      customerName: 'Amit Singh',
      tableNo: 'T03',
      amount: 1180,
      paymentMethod: 'UPI',
      status: 'Pending',
      dateTime: '30 Nov 2026, 06:50 PM',
      items: [
        { name: 'Dal Makhani', qty: 1, price: 360 },
        { name: 'Butter Naan', qty: 4, price: 240 },
        { name: 'Paneer Butter Masala', qty: 1, price: 420 },
        { name: 'Gulab Jamun', qty: 2, price: 160 }
      ],
      subtotal: 1180,
      discount: 0,
      tax: 0
    },
    {
      id: 5,
      billNo: 'BILL1244',
      orderId: 'ORD1244',
      customerName: 'Neha Gupta',
      tableNo: 'T10',
      amount: 860,
      paymentMethod: 'Cash',
      status: 'Paid',
      dateTime: '30 Nov 2026, 05:20 PM',
      items: [
        { name: 'Farmhouse Pizza', qty: 1, price: 480 },
        { name: 'Cold Coffee', qty: 2, price: 280 },
        { name: 'Choco Lava Cake', qty: 1, price: 100 }
      ],
      subtotal: 860,
      discount: 0,
      tax: 0
    },
    {
      id: 6,
      billNo: 'BILL1243',
      orderId: 'ORD1243',
      customerName: 'Vikram Verma',
      tableNo: 'T01',
      amount: 650,
      paymentMethod: 'Card',
      status: 'Paid',
      dateTime: '30 Nov 2026, 04:15 PM',
      items: [
        { name: 'Crispy Corn', qty: 1, price: 220 },
        { name: 'Masala Dosa', qty: 2, price: 320 },
        { name: 'Filter Coffee', qty: 1, price: 110 }
      ],
      subtotal: 650,
      discount: 0,
      tax: 0
    },
    {
      id: 7,
      billNo: 'BILL1242',
      orderId: 'ORD1242',
      customerName: 'Ananya Roy',
      tableNo: 'T07',
      amount: 1420,
      paymentMethod: 'UPI',
      status: 'Paid',
      dateTime: '30 Nov 2026, 03:00 PM',
      items: [
        { name: 'Paneer Butter Masala', qty: 1, price: 420 },
        { name: 'Garlic Naan', qty: 4, price: 320 },
        { name: 'Veg Biryani', qty: 1, price: 480 },
        { name: 'Sweet Lassi', qty: 2, price: 200 }
      ],
      subtotal: 1420,
      discount: 0,
      tax: 0
    },
    {
      id: 8,
      billNo: 'BILL1241',
      orderId: 'ORD1241',
      customerName: 'Karan Kapoor',
      tableNo: 'T02',
      amount: 950,
      paymentMethod: 'Cash',
      status: 'Pending',
      dateTime: '30 Nov 2026, 02:10 PM',
      items: [
        { name: 'Tandoori Roti', qty: 6, price: 240 },
        { name: 'Shahi Paneer', qty: 1, price: 390 },
        { name: 'Jeera Rice', qty: 1, price: 220 },
        { name: 'Gulab Jamun', qty: 1, price: 100 }
      ],
      subtotal: 950,
      discount: 0,
      tax: 0
    }
  ]);

  // Selected bill row for right-side detail panel (null by default so panel only opens on Eye icon click)
  const [selectedBillingRow, setSelectedBillingRow] = useState(null);

  // Prevent background page scroll when Bill Details panel is open
  useEffect(() => {
    if (selectedBillingRow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedBillingRow]);

  // Real-time automatic filtering for Billing Overview
  const filteredBillingBills = useMemo(() => {
    return billingBillsList.filter((row) => {
      // 1. Search Query
      if (billingSearchQuery.trim()) {
        const q = billingSearchQuery.toLowerCase().trim();
        const numQ = q.replace(/[₹\s,]/g, '');
        const matches =
          row.billNo.toLowerCase().includes(q) ||
          row.orderId.toLowerCase().includes(q) ||
          row.customerName.toLowerCase().includes(q) ||
          row.tableNo.toLowerCase().includes(q) ||
          row.paymentMethod.toLowerCase().includes(q) ||
          row.status.toLowerCase().includes(q) ||
          (numQ !== '' && String(row.amount).includes(numQ));
        if (!matches) return false;
      }

      // 2. Payment Method Filter
      if (billingPaymentMethodFilter && billingPaymentMethodFilter !== 'Payment Method' && billingPaymentMethodFilter !== 'All Payment Methods') {
        if (row.paymentMethod.toLowerCase() !== billingPaymentMethodFilter.toLowerCase()) {
          return false;
        }
      }

      // 3. Status Filter
      if (billingStatusFilter && billingStatusFilter !== 'Status' && billingStatusFilter !== 'All Status') {
        if (row.status.toLowerCase() !== billingStatusFilter.toLowerCase()) {
          return false;
        }
      }

      // 4. Table Filter
      if (billingTableFilter && billingTableFilter !== 'Table No.' && billingTableFilter !== 'All Tables') {
        if (row.tableNo.toLowerCase() !== billingTableFilter.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [billingBillsList, billingSearchQuery, billingPaymentMethodFilter, billingStatusFilter, billingTableFilter]);

  const totalBillingPages = Math.max(1, Math.ceil(filteredBillingBills.length / billingRowsPerPage));

  const paginatedBillingBills = useMemo(() => {
    const start = (billingCurrentPage - 1) * billingRowsPerPage;
    return filteredBillingBills.slice(start, start + billingRowsPerPage);
  }, [filteredBillingBills, billingCurrentPage, billingRowsPerPage]);

  // Handler for exporting Billing Overview report
  const handleExportBillingReport = () => {
    const headers = ['Bill No.', 'Order ID', 'Customer Name', 'Table No.', 'Amount', 'Payment Method', 'Status', 'Date & Time'];
    const rows = filteredBillingBills.map(b => [
      `"${b.billNo}"`,
      `"${b.orderId}"`,
      `"${b.customerName}"`,
      `"${b.tableNo}"`,
      `"₹ ${b.amount}"`,
      `"${b.paymentMethod}"`,
      `"${b.status}"`,
      `"${b.dateTime}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Billing_Overview_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setBillingToast('Billing report exported successfully!');
    setTimeout(() => setBillingToast(''), 2500);
  };

  // ==============================================================
  // Payment Summary State & Data (Exact Reference: media_1795430759243_7e981db2.jpg)
  // ==============================================================
  const [paymentSummaryMethodFilter, setPaymentSummaryMethodFilter] = useState('All Payment Methods');
  const [paymentSummaryCurrentPage, setPaymentSummaryCurrentPage] = useState(1);
  const [paymentSummaryRowsPerPage, setPaymentSummaryRowsPerPage] = useState(5);
  const [selectedTransactionModal, setSelectedTransactionModal] = useState(null);
  const [paymentSummaryToast, setPaymentSummaryToast] = useState('');

  // Exact 5 transactions from Reference Image + additional live records
  const [paymentSummaryTransactions, setPaymentSummaryTransactions] = useState([
    {
      id: 1,
      dateTime: '30 Nov 2026, 09:45 AM',
      transactionId: 'TXN987654',
      orderId: 'ORD1248',
      method: 'UPI',
      amount: 1250,
      status: 'Success',
      customerName: 'Priya Sharma',
      tableNo: 'T05'
    },
    {
      id: 2,
      dateTime: '30 Nov 2026, 08:30 PM',
      transactionId: 'TXN987653',
      orderId: 'ORD1247',
      method: 'Card',
      amount: 980,
      status: 'Success',
      customerName: 'Rahul Mehta',
      tableNo: 'T12'
    },
    {
      id: 3,
      dateTime: '30 Nov 2026, 07:15 PM',
      transactionId: 'TXN987652',
      orderId: 'ORD1246',
      method: 'Cash',
      amount: 720,
      status: 'Success',
      customerName: 'Sneha Patel',
      tableNo: 'T08'
    },
    {
      id: 4,
      dateTime: '30 Nov 2026, 06:50 PM',
      transactionId: 'TXN987651',
      orderId: 'ORD1245',
      method: 'UPI',
      amount: 1180,
      status: 'Failed',
      customerName: 'Amit Singh',
      tableNo: 'T03'
    },
    {
      id: 5,
      dateTime: '30 Nov 2026, 05:20 PM',
      transactionId: 'TXN987650',
      orderId: 'ORD1244',
      method: 'Card',
      amount: 860,
      status: 'Success',
      customerName: 'Neha Gupta',
      tableNo: 'T10'
    },
    {
      id: 6,
      dateTime: '30 Nov 2026, 04:10 PM',
      transactionId: 'TXN987649',
      orderId: 'ORD1243',
      method: 'Online',
      amount: 650,
      status: 'Success',
      customerName: 'Vikram Verma',
      tableNo: 'T01'
    },
    {
      id: 7,
      dateTime: '30 Nov 2026, 03:00 PM',
      transactionId: 'TXN987648',
      orderId: 'ORD1242',
      method: 'UPI',
      amount: 1420,
      status: 'Success',
      customerName: 'Ananya Roy',
      tableNo: 'T07'
    },
    {
      id: 8,
      dateTime: '30 Nov 2026, 02:15 PM',
      transactionId: 'TXN987647',
      orderId: 'ORD1241',
      method: 'Cash',
      amount: 950,
      status: 'Success',
      customerName: 'Karan Kapoor',
      tableNo: 'T02'
    }
  ]);

  // Real-time automatic filter for Payment Summary Recent Transactions
  const filteredPaymentSummaryTransactions = useMemo(() => {
    return paymentSummaryTransactions.filter((tx) => {
      if (
        paymentSummaryMethodFilter &&
        paymentSummaryMethodFilter !== 'All Payment Methods' &&
        paymentSummaryMethodFilter !== 'All Methods'
      ) {
        if (tx.method.toLowerCase() !== paymentSummaryMethodFilter.toLowerCase()) {
          return false;
        }
      }
      return true;
    });
  }, [paymentSummaryTransactions, paymentSummaryMethodFilter]);

  const totalPaymentSummaryPages = Math.max(
    1,
    Math.ceil(filteredPaymentSummaryTransactions.length / paymentSummaryRowsPerPage)
  );

  const paginatedPaymentSummaryTransactions = useMemo(() => {
    const start = (paymentSummaryCurrentPage - 1) * paymentSummaryRowsPerPage;
    return filteredPaymentSummaryTransactions.slice(start, start + paymentSummaryRowsPerPage);
  }, [filteredPaymentSummaryTransactions, paymentSummaryCurrentPage, paymentSummaryRowsPerPage]);

  // Handler for Exporting Payment Summary Report
  const handleExportPaymentSummaryReport = () => {
    const csvContent = [
      '--- PAYMENT SUMMARY REPORT ---',
      'Total Transactions,1248,Growth,12%',
      'Total Payment Amount,Rs 485750,Growth,18%',
      'Successful Payments,1220,Growth,15%',
      'Failed Payments,28,Growth,2%',
      '',
      '--- PAYMENT METHOD BREAKDOWN ---',
      'Method,Percentage,Total Amount',
      'UPI,42%,Rs 204000',
      'Cash,32%,Rs 155000',
      'Card,18%,Rs 87500',
      'Online,8%,Rs 38250',
      '',
      '--- RECENT TRANSACTIONS ---',
      'Date & Time,Transaction ID,Order ID,Payment Method,Amount,Status',
      ...filteredPaymentSummaryTransactions.map(t =>
        `"${t.dateTime}","${t.transactionId}","${t.orderId}","${t.method}","₹ ${t.amount}","${t.status}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Payment_Summary_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setPaymentSummaryToast('Payment summary report exported successfully!');
    setTimeout(() => setPaymentSummaryToast(''), 2500);
  };

  // Exact 5 transactions from Image 1 with dates, plus additional live operational records
  const [posTransactions, setPosTransactions] = useState([
    { id: 1, billNo: 'B0001', tableNo: 'T01', items: 'Margherita Pizza, Cold Coffee', qty: 2, amount: 748, method: 'UPI', status: 'Paid', time: '21 Nov, 02:15 PM', date: '21 Nov 2025' },
    { id: 2, billNo: 'B0002', tableNo: 'T03', items: 'Pasta, Garlic Bread', qty: 2, amount: 899, method: 'Card', status: 'Paid', time: '21 Nov, 03:05 PM', date: '21 Nov 2025' },
    { id: 3, billNo: 'B0003', tableNo: 'T05', items: 'Caesar Salad, Mojito', qty: 2, amount: 699, method: 'Cash', status: 'Paid', time: '21 Nov, 04:20 PM', date: '21 Nov 2025' },
    { id: 4, billNo: 'B0004', tableNo: 'T07', items: 'Pizza, Cold Coffee', qty: 2, amount: 748, method: 'UPI', status: 'Paid', time: '21 Nov, 05:10 PM', date: '21 Nov 2025' },
    { id: 5, billNo: 'B0005', tableNo: 'T09', items: 'Pasta, Brownie', qty: 2, amount: 799, method: 'Card', status: 'Paid', time: '21 Nov, 06:25 PM', date: '21 Nov 2025' },
    { id: 6, billNo: 'B0006', tableNo: 'T02', items: 'Tandoori Murgh, Butter Naan', qty: 3, amount: 950, method: 'UPI', status: 'Paid', time: '21 Nov, 07:15 PM', date: '21 Nov 2025' },
    { id: 7, billNo: 'B0007', tableNo: 'T04', items: 'Truffle Risotto, Berry Cooler', qty: 2, amount: 640, method: 'Card', status: 'Paid', time: '21 Nov, 07:45 PM', date: '21 Nov 2025' },
    { id: 8, billNo: 'B0008', tableNo: 'T06', items: 'Paneer Tikka, Mojito', qty: 2, amount: 530, method: 'Cash', status: 'Pending', time: '21 Nov, 08:10 PM', date: '21 Nov 2025' },
    { id: 9, billNo: 'B0009', tableNo: 'T08', items: 'Chicken Milanese, Iced Tea', qty: 2, amount: 680, method: 'Card', status: 'Paid', time: '20 Nov, 01:30 PM', date: '20 Nov 2025' },
    { id: 10, billNo: 'B0010', tableNo: 'T10', items: 'Dark Chocolate Fondant', qty: 1, amount: 290, method: 'UPI', status: 'Paid', time: '19 Nov, 09:20 PM', date: '19 Nov 2025' }
  ]);

  // Export POS Transactions Report to CSV
  const handleExportPosReport = () => {
    const dataToExport = posTransactions.filter(tx => {
      if (posTableFilter !== 'All Tables' && tx.tableNo !== posTableFilter) return false;
      if (posPaymentMethodFilter !== 'All Payment Methods' && tx.method !== posPaymentMethodFilter) return false;
      if (posStatusFilter !== 'All Status' && tx.status !== posStatusFilter) return false;
      if (posDateFilter !== 'All Dates') {
        if (posDateFilter === '21 Nov 2025 - 21 Nov 2025' || posDateFilter === '21 Nov 2025') {
          if (!tx.time.includes('21 Nov') && tx.date !== '21 Nov 2025') return false;
        } else if (posDateFilter === 'Today') {
          if (!tx.time.includes('16 Nov') && tx.date !== '16 Nov 2026') return false;
        } else if (posDateFilter === '20 Nov 2025') {
          if (!tx.time.includes('20 Nov') && tx.date !== '20 Nov 2025') return false;
        } else if (posDateFilter === '19 Nov 2025') {
          if (!tx.time.includes('19 Nov') && tx.date !== '19 Nov 2025') return false;
        }
      }
      if (posSearchQuery.trim()) {
        const q = posSearchQuery.toLowerCase().trim();
        const matchBill = tx.billNo.toLowerCase().includes(q);
        const matchTable = tx.tableNo.toLowerCase().includes(q);
        const matchItems = tx.items.toLowerCase().includes(q);
        const matchMethod = tx.method.toLowerCase().includes(q);
        if (!matchBill && !matchTable && !matchItems && !matchMethod) return false;
      }
      return true;
    });

    if (dataToExport.length === 0) {
      alert('No transactions found matching your current filters to export.');
      return;
    }

    const headers = ['#', 'Bill No.', 'Table No.', 'Order Items', 'Qty', 'Total Amount', 'Payment Method', 'Payment Status', 'Time'];
    const csvRows = [
      headers.join(','),
      ...dataToExport.map((tx, idx) => [
        idx + 1,
        `"${tx.billNo}"`,
        `"${tx.tableNo}"`,
        `"${(tx.items || '').replace(/"/g, '""')}"`,
        tx.qty,
        `"₹${tx.amount}"`,
        `"${tx.method}"`,
        `"${tx.status}"`,
        `"${tx.time}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `POS_Transactions_Report_${posDateFilter.replace(/[^a-zA-Z0-9]/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setPosToastMessage(`Exported ${dataToExport.length} transactions successfully!`);
    setTimeout(() => setPosToastMessage(''), 3000);
  };

  // Reports View State (Daily Report default)
  const [reportsSubTabActive, setReportsSubTabActive] = useState('Daily Report');
  const [reportsTableFilter, setReportsTableFilter] = useState('All Tables');
  const [reportsStatusFilter, setReportsStatusFilter] = useState('All Status');
  const [reportsCurrentPage, setReportsCurrentPage] = useState(1);
  const [selectedComplaintModal, setSelectedComplaintModal] = useState(null);

  // Exact 5 complaints from Image 2
  const [customerComplaints, setCustomerComplaints] = useState([
    { id: 1, date: '21 Nov 2025', time: '02:15 PM', tableNo: 'T03', complaint: 'Food was cold', status: 'Pending' },
    { id: 2, date: '21 Nov 2025', time: '01:50 PM', tableNo: 'T07', complaint: 'Service is slow', status: 'In Progress' },
    { id: 3, date: '21 Nov 2025', time: '01:20 PM', tableNo: 'T05', complaint: 'Bill issue', status: 'Resolved' },
    { id: 4, date: '21 Nov 2025', time: '12:45 PM', tableNo: 'T09', complaint: 'Table not clean', status: 'Pending' },
    { id: 5, date: '21 Nov 2025', time: '12:30 PM', tableNo: 'T01', complaint: 'Too much delay', status: 'In Progress' }
  ]);

  // ==============================================================
  // TABLE REPORT STATE (Exact Reference Image: media_1795434943328_a3a99345.jpg)
  // ==============================================================
  const [tableReportSubTab, setTableReportSubTab] = useState('Table Overview');
  const [tableReportSearchQuery, setTableReportSearchQuery] = useState('');
  const [tableReportStatusFilter, setTableReportStatusFilter] = useState('All Status');
  const [tableReportWaiterFilter, setTableReportWaiterFilter] = useState('All Waiter');
  const [tableReportTimeFilter, setTableReportTimeFilter] = useState('All Time');
  const [tableReportCurrentPage, setTableReportCurrentPage] = useState(1);
  const [tableReportRowsPerPage, setTableReportRowsPerPage] = useState(8);
  const [selectedTableReportCard, setSelectedTableReportCard] = useState(null); // Reference Image 2 Modal
  const [isAssignTableModalOpen, setIsAssignTableModalOpen] = useState(false);
  const [assignTableForm, setAssignTableForm] = useState({ tableNo: 'T06', waiter: 'Rohit Sharma', customerName: '', customerMobile: '' });
  const [tableReportToast, setTableReportToast] = useState('');

  // 20 Tables Data matching Reference Image 1 exactly
  const [tableReportList, setTableReportList] = useState([
    { id: 1, tableNo: 'T01', capacity: 2, status: 'Occupied', assignedWaiter: 'Rohit Sharma', startTime: '11:45 AM', endTime: '—', orderId: 'ORD1248', totalAmount: '1,250', customerName: 'Priya Sharma', customerMobile: '+91 98765 43210' },
    { id: 2, tableNo: 'T02', capacity: 4, status: 'Occupied', assignedWaiter: 'Amit Singh', startTime: '12:10 PM', endTime: '—', orderId: 'ORD1249', totalAmount: '1,480', customerName: 'Rahul Verma', customerMobile: '+91 98765 43211' },
    { id: 3, tableNo: 'T03', capacity: 4, status: 'Occupied', assignedWaiter: 'Neha Gupta', startTime: '12:20 PM', endTime: '—', orderId: 'ORD1250', totalAmount: '980', customerName: 'Ananya Roy', customerMobile: '+91 98765 43212' },
    { id: 4, tableNo: 'T04', capacity: 2, status: 'Reserved', assignedWaiter: 'Priya Sharma', startTime: '01:00 PM', endTime: '—', orderId: 'ORD1251', totalAmount: '0', customerName: 'Vikram Malhotra', customerMobile: '+91 98765 43213' },
    { id: 5, tableNo: 'T05', capacity: 6, status: 'Occupied', assignedWaiter: 'Rahul Mehta', startTime: '12:50 PM', endTime: '—', orderId: 'ORD1252', totalAmount: '2,150', customerName: 'Siddharth Jain', customerMobile: '+91 98765 43214' },
    { id: 6, tableNo: 'T06', capacity: 4, status: 'Available', assignedWaiter: '—', startTime: '—', endTime: '—', orderId: '—', totalAmount: '—', customerName: '', customerMobile: '' },
    { id: 7, tableNo: 'T07', capacity: 2, status: 'Available', assignedWaiter: '—', startTime: '—', endTime: '—', orderId: '—', totalAmount: '—', customerName: '', customerMobile: '' },
    { id: 8, tableNo: 'T08', capacity: 6, status: 'Occupied', assignedWaiter: 'Sneha Patel', startTime: '12:30 PM', endTime: '—', orderId: 'ORD1253', totalAmount: '1,780', customerName: 'Kavita Reddy', customerMobile: '+91 98765 43215' },
    { id: 9, tableNo: 'T09', capacity: 4, status: 'Occupied', assignedWaiter: 'Rohit Sharma', startTime: '12:45 PM', endTime: '—', orderId: 'ORD1254', totalAmount: '1,620', customerName: 'Aditya Birla', customerMobile: '+91 98765 43216' },
    { id: 10, tableNo: 'T10', capacity: 2, status: 'Occupied', assignedWaiter: 'Amit Singh', startTime: '01:15 PM', endTime: '—', orderId: 'ORD1255', totalAmount: '840', customerName: 'Pooja Hegde', customerMobile: '+91 98765 43217' },
    { id: 11, tableNo: 'T11', capacity: 8, status: 'Occupied', assignedWaiter: 'Neha Gupta', startTime: '01:00 PM', endTime: '—', orderId: 'ORD1256', totalAmount: '3,450', customerName: 'Rajesh Khanna', customerMobile: '+91 98765 43218' },
    { id: 12, tableNo: 'T12', capacity: 4, status: 'Available', assignedWaiter: '—', startTime: '—', endTime: '—', orderId: '—', totalAmount: '—', customerName: '', customerMobile: '' },
    { id: 13, tableNo: 'T13', capacity: 2, status: 'Occupied', assignedWaiter: 'Priya Sharma', startTime: '01:30 PM', endTime: '—', orderId: 'ORD1257', totalAmount: '1,120', customerName: 'Meera Nair', customerMobile: '+91 98765 43219' },
    { id: 14, tableNo: 'T14', capacity: 6, status: 'Occupied', assignedWaiter: 'Rahul Mehta', startTime: '12:15 PM', endTime: '—', orderId: 'ORD1258', totalAmount: '2,890', customerName: 'Arjun Kapoor', customerMobile: '+91 98765 43220' },
    { id: 15, tableNo: 'T15', capacity: 4, status: 'Reserved', assignedWaiter: 'Sneha Patel', startTime: '02:00 PM', endTime: '—', orderId: 'ORD1259', totalAmount: '0', customerName: 'Deepika Sen', customerMobile: '+91 98765 43221' },
    { id: 16, tableNo: 'T16', capacity: 2, status: 'Available', assignedWaiter: '—', startTime: '—', endTime: '—', orderId: '—', totalAmount: '—', customerName: '', customerMobile: '' },
    { id: 17, tableNo: 'T17', capacity: 4, status: 'Occupied', assignedWaiter: 'Rohit Sharma', startTime: '01:20 PM', endTime: '—', orderId: 'ORD1260', totalAmount: '1,350', customerName: 'Karan Johar', customerMobile: '+91 98765 43222' },
    { id: 18, tableNo: 'T18', capacity: 2, status: 'Available', assignedWaiter: '—', startTime: '—', endTime: '—', orderId: '—', totalAmount: '—', customerName: '', customerMobile: '' },
    { id: 19, tableNo: 'T19', capacity: 6, status: 'Occupied', assignedWaiter: 'Amit Singh', startTime: '12:40 PM', endTime: '—', orderId: 'ORD1261', totalAmount: '2,400', customerName: 'Simran Kaur', customerMobile: '+91 98765 43223' },
    { id: 20, tableNo: 'T20', capacity: 4, status: 'Available', assignedWaiter: '—', startTime: '—', endTime: '—', orderId: '—', totalAmount: '—', customerName: '', customerMobile: '' }
  ]);

  // Filtering for Table Report
  const filteredTableReports = useMemo(() => {
    return tableReportList.filter(item => {
      if (tableReportSearchQuery.trim()) {
        const query = tableReportSearchQuery.toLowerCase().trim();
        const matchesTable = item.tableNo.toLowerCase().includes(query);
        const matchesWaiter = item.assignedWaiter.toLowerCase().includes(query);
        const matchesOrder = item.orderId.toLowerCase().includes(query);
        if (!matchesTable && !matchesWaiter && !matchesOrder) return false;
      }
      if (tableReportStatusFilter !== 'All Status' && item.status !== tableReportStatusFilter) {
        return false;
      }
      if (tableReportWaiterFilter !== 'All Waiter' && item.assignedWaiter !== tableReportWaiterFilter) {
        return false;
      }
      return true;
    });
  }, [tableReportList, tableReportSearchQuery, tableReportStatusFilter, tableReportWaiterFilter]);

  const totalTableReportPages = Math.ceil(filteredTableReports.length / tableReportRowsPerPage) || 1;
  const paginatedTableReports = useMemo(() => {
    const startIndex = (tableReportCurrentPage - 1) * tableReportRowsPerPage;
    return filteredTableReports.slice(startIndex, startIndex + tableReportRowsPerPage);
  }, [filteredTableReports, tableReportCurrentPage, tableReportRowsPerPage]);

  // Download Daily Report CSV function
  const handleDownloadDailyReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "DAILY RESTAURANT PERFORMANCE REPORT\n" +
      "Overview of today's restaurant performance\n" +
      "Date: " + new Date().toLocaleDateString('en-IN') + "\n\n" +
      "KEY METRICS\n" +
      "Total Orders,128,+12%\n" +
      "Total Revenue,Rs. 48750,+15%\n" +
      "Average Bill,Rs. 381,+8%\n" +
      "Total Customers,120,+10%\n\n" +
      "SALES SUMMARY\n" +
      "Particulars,Amount / Count,Change\n" +
      "Total Orders,128,+12%\n" +
      "Total Revenue,Rs. 48750,+15%\n" +
      "Discount Given,Rs. 2500,+5%\n" +
      "Tax Collected,Rs. 3850,+7%\n" +
      "Net Revenue,Rs. 50100,+14%\n\n" +
      "TOP SELLING ITEMS\n" +
      "Food Item,Quantity Sold,Revenue\n" +
      "Paneer Tikka,42,Rs. 16800\n" +
      "Margherita Pizza,35,Rs. 14000\n" +
      "Pasta Alfredo,30,Rs. 12000\n" +
      "Cold Coffee,28,Rs. 4200\n" +
      "Brownie,25,Rs. 3750\n\n" +
      "PAYMENT SUMMARY\n" +
      "Payment Method,Transactions,Amount\n" +
      "UPI,52,Rs. 20800\n" +
      "Cash,38,Rs. 14250\n" +
      "Card,28,Rs. 11200\n" +
      "Online,10,Rs. 3000\n" +
      "Total,128,Rs. 48750\n\n" +
      "TABLE PERFORMANCE\n" +
      "Table No.,Orders,Revenue\n" +
      "T01,8,Rs. 3250\n" +
      "T02,7,Rs. 2980\n" +
      "T03,6,Rs. 2700\n" +
      "T04,6,Rs. 2500\n" +
      "T05,5,Rs. 2200\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `daily_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Daily Report matching Reference Image (media_1795435491705_e040b1a0.jpg)
  const renderDailyReport = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#500F1D] flex items-center justify-center shrink-0 shadow-xs">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#500F1D] tracking-tight">
              Daily Report
            </h1>
            <p className="text-xs sm:text-sm text-[#75696B] font-medium mt-0.5">
              Overview of today's restaurant performance
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadDailyReport}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Download Report</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/80" />
        </button>
      </div>

      {/* 2. Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Orders */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="w-14 h-14 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
            <ShoppingCart className="w-6 h-6 text-[#500F1D]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm text-[#75696B] font-medium">Total Orders</div>
            <div className="flex items-baseline gap-2.5 mt-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2528]">128</span>
              <span className="text-xs sm:text-sm font-semibold text-[#16A34A] flex items-center gap-0.5">
                <span>↑</span> 12%
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="w-14 h-14 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6 text-[#500F1D]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm text-[#75696B] font-medium">Total Revenue</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2528]">₹ 48,750</span>
              <span className="text-xs sm:text-sm font-semibold text-[#16A34A] flex items-center gap-0.5">
                <span>↑</span> 15%
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Average Bill */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="w-14 h-14 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6 text-[#500F1D]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm text-[#75696B] font-medium">Average Bill</div>
            <div className="flex items-baseline gap-2.5 mt-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2528]">₹ 381</span>
              <span className="text-xs sm:text-sm font-semibold text-[#16A34A] flex items-center gap-0.5">
                <span>↑</span> 8%
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Total Customers */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="w-14 h-14 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-[#500F1D]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm text-[#75696B] font-medium">Total Customers</div>
            <div className="flex items-baseline gap-2.5 mt-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2528]">120</span>
              <span className="text-xs sm:text-sm font-semibold text-[#16A34A] flex items-center gap-0.5">
                <span>↑</span> 10%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Row: Sales Summary (Col 5) & Orders Trend (Col 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Sales Summary Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs flex flex-col justify-between">
          <div className="bg-[#500F1D] text-white px-5 py-3.5 flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-white" />
            <h3 className="font-serif font-bold text-base sm:text-lg tracking-tight">Sales Summary</h3>
          </div>

          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF1EB]">
                  <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                    <th className="py-3 px-4 rounded-l-2xl">Particulars</th>
                    <th className="py-3 px-4 text-center">Amount / Count</th>
                    <th className="py-3 px-4 text-center rounded-r-2xl">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EDE8] text-xs sm:text-sm">
                  <tr className="hover:bg-[#FAF7F5] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#2D2528]">Total Orders</td>
                    <td className="py-3 px-4 text-center font-bold text-[#2D2528]">128</td>
                    <td className="py-3 px-4 text-center font-semibold text-[#16A34A]">↑ 12%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F5] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#2D2528]">Total Revenue</td>
                    <td className="py-3 px-4 text-center font-bold text-[#2D2528]">₹ 48,750</td>
                    <td className="py-3 px-4 text-center font-semibold text-[#16A34A]">↑ 15%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F5] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#2D2528]">Discount Given</td>
                    <td className="py-3 px-4 text-center font-bold text-[#2D2528]">₹ 2,500</td>
                    <td className="py-3 px-4 text-center font-semibold text-[#16A34A]">↑ 5%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F5] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#2D2528]">Tax Collected</td>
                    <td className="py-3 px-4 text-center font-bold text-[#2D2528]">₹ 3,850</td>
                    <td className="py-3 px-4 text-center font-semibold text-[#16A34A]">↑ 7%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F5] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#2D2528]">Net Revenue</td>
                    <td className="py-3 px-4 text-center font-bold text-[#2D2528]">₹ 50,100</td>
                    <td className="py-3 px-4 text-center font-semibold text-[#16A34A]">↑ 14%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Orders Trend Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs flex flex-col justify-between">
          <div className="bg-[#500F1D] text-white px-5 py-3.5 flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-white" />
            <h3 className="font-serif font-bold text-base sm:text-lg tracking-tight">Orders Trend</h3>
          </div>

          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
            <div className="relative w-full h-56 sm:h-64">
              <svg viewBox="0 0 540 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="orderTrendDailyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#500F1D" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#500F1D" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Grid Lines & Y Axis Labels */}
                <line x1="45" y1="20" x2="520" y2="20" stroke="#F0E6E1" strokeWidth="1" strokeDasharray="3 3" />
                <text x="35" y="24" textAnchor="end" fontSize="11" fill="#75696B" fontWeight="600">150</text>

                <line x1="45" y1="65" x2="520" y2="65" stroke="#F0E6E1" strokeWidth="1" strokeDasharray="3 3" />
                <text x="35" y="69" textAnchor="end" fontSize="11" fill="#75696B" fontWeight="600">100</text>

                <line x1="45" y1="110" x2="520" y2="110" stroke="#F0E6E1" strokeWidth="1" strokeDasharray="3 3" />
                <text x="35" y="114" textAnchor="end" fontSize="11" fill="#75696B" fontWeight="600">50</text>

                <line x1="45" y1="155" x2="520" y2="155" stroke="#E8DDD8" strokeWidth="1.2" />
                <text x="35" y="159" textAnchor="end" fontSize="11" fill="#75696B" fontWeight="600">0</text>

                {/* Y-Axis Line */}
                <line x1="45" y1="15" x2="45" y2="155" stroke="#E8DDD8" strokeWidth="1.2" />

                {/* Area Gradient Fill */}
                <path
                  d="M 65 110 L 175 78 L 290 47 L 405 29 L 505 42 L 505 155 L 65 155 Z"
                  fill="url(#orderTrendDailyGrad)"
                />

                {/* Trend Stroke Line */}
                <path
                  d="M 65 110 L 175 78 L 290 47 L 405 29 L 505 42"
                  fill="none"
                  stroke="#500F1D"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Dots & Values */}
                {[
                  { x: 65, y: 110, val: 50, time: '9 AM' },
                  { x: 175, y: 78, val: 85, time: '12 PM' },
                  { x: 290, y: 47, val: 120, time: '3 PM' },
                  { x: 405, y: 29, val: 140, time: '6 PM' },
                  { x: 505, y: 42, val: 125, time: '9 PM' }
                ].map((pt, idx) => (
                  <g key={idx} className="cursor-pointer group">
                    <circle cx={pt.x} cy={pt.y} r="4.5" fill="#500F1D" className="transition-transform group-hover:scale-125" />
                    <circle cx={pt.x} cy={pt.y} r="8" fill="#500F1D" opacity="0.15" />
                    <text x={pt.x} y="178" textAnchor="middle" fontSize="11" fill="#75696B" fontWeight="600">
                      {pt.time}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: 3 Columns (Top Selling Items | Payment Summary | Table Performance) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* 1. Top Selling Items */}
        <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs flex flex-col justify-between">
          <div className="bg-[#500F1D] text-white px-5 py-3.5 flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-white" />
            <h3 className="font-serif font-bold text-base sm:text-lg tracking-tight">Top Selling Items</h3>
          </div>

          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF1EB]">
                  <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                    <th className="py-3 px-3 rounded-l-2xl">Food Item</th>
                    <th className="py-3 px-3 text-center">Quantity Sold</th>
                    <th className="py-3 px-3 text-right rounded-r-2xl">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EDE8] text-xs sm:text-sm">
                  {[
                    { name: 'Paneer Tikka', qty: 42, revenue: '16,800', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=120&q=80' },
                    { name: 'Margherita Pizza', qty: 35, revenue: '14,000', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=120&q=80' },
                    { name: 'Pasta Alfredo', qty: 30, revenue: '12,000', img: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=120&q=80' },
                    { name: 'Cold Coffee', qty: 28, revenue: '4,200', img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=120&q=80' },
                    { name: 'Brownie', qty: 25, revenue: '3,750', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=120&q=80' }
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F5] transition-colors">
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-8 h-8 rounded-lg object-cover border border-[#E8DDD8] shrink-0"
                          />
                          <span className="font-semibold text-[#2D2528]">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-[#2D2528]">{item.qty}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-[#2D2528]">₹ {item.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 2. Payment Summary */}
        <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs flex flex-col justify-between">
          <div className="bg-[#500F1D] text-white px-5 py-3.5 flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-white" />
            <h3 className="font-serif font-bold text-base sm:text-lg tracking-tight">Payment Summary</h3>
          </div>

          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF1EB]">
                  <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                    <th className="py-3 px-3 rounded-l-2xl">Payment Method</th>
                    <th className="py-3 px-3 text-center">Transactions</th>
                    <th className="py-3 px-3 text-right rounded-r-2xl">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EDE8] text-xs sm:text-sm">
                  {[
                    { method: 'UPI', txns: 52, amount: '20,800' },
                    { method: 'Cash', txns: 38, amount: '14,250' },
                    { method: 'Card', txns: 28, amount: '11,200' },
                    { method: 'Online', txns: 10, amount: '3,000' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F5] transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#2D2528]">{row.method}</td>
                      <td className="py-3 px-3 text-center font-bold text-[#2D2528]">{row.txns}</td>
                      <td className="py-3 px-3 text-right font-bold text-[#2D2528]">₹ {row.amount}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-[#FAF7F5] font-bold border-t-2 border-[#E8DDD8]">
                    <td className="py-3 px-3 text-[#500F1D] font-bold">Total</td>
                    <td className="py-3 px-3 text-center text-[#500F1D] font-bold">128</td>
                    <td className="py-3 px-3 text-right text-[#500F1D] font-extrabold">₹ 48,750</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. Table Performance */}
        <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs flex flex-col justify-between">
          <div className="bg-[#500F1D] text-white px-5 py-3.5 flex items-center gap-2.5">
            <Armchair className="w-5 h-5 text-white" />
            <h3 className="font-serif font-bold text-base sm:text-lg tracking-tight">Table Performance</h3>
          </div>

          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF1EB]">
                  <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                    <th className="py-3 px-3 rounded-l-2xl">Table No.</th>
                    <th className="py-3 px-3 text-center">Orders</th>
                    <th className="py-3 px-3 text-right rounded-r-2xl">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EDE8] text-xs sm:text-sm">
                  {[
                    { tableNo: 'T01', orders: 8, revenue: '3,250' },
                    { tableNo: 'T02', orders: 7, revenue: '2,980' },
                    { tableNo: 'T03', orders: 6, revenue: '2,700' },
                    { tableNo: 'T04', orders: 6, revenue: '2,500' },
                    { tableNo: 'T05', orders: 5, revenue: '2,200' }
                  ].map((tbl, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F5] transition-colors">
                      <td className="py-3 px-3 font-bold text-[#500F1D]">{tbl.tableNo}</td>
                      <td className="py-3 px-3 text-center font-bold text-[#2D2528]">{tbl.orders}</td>
                      <td className="py-3 px-3 text-right font-bold text-[#2D2528]">₹ {tbl.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Settings Section State
  const [managerProfile, setManagerProfile] = useState({
    name: 'Aman Sharma',
    empId: 'MDG001',
    phone: '+91 98765 43210',
    email: 'aman@royaldine.com',
    role: 'Manager',
    joinedOn: '15 Nov 2025',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  });

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSuccessToast, setPasswordSuccessToast] = useState(false);

  // Notification Preferences (System Alerts removed as requested)
  const [notifPreferences, setNotifPreferences] = useState({
    booking: true,
    orders: true,
    payments: true,
    complaints: true
  });

  // Restaurant Settings (Name: LUNAR, Location: Bangalore as requested)
  const [restaurantSettings, setRestaurantSettings] = useState({
    name: 'LUNAR',
    location: 'Bangalore',
    workingHours: '11:00 AM – 11:00 PM',
    currency: '₹ INR',
    contactNumber: '+91 98765 43210',
    email: 'contact@lunar.com'
  });

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [editRestaurantModalOpen, setEditRestaurantModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null); // { key, label, value }

  // Dashboard & Operations State
  const [kitchenDelayedOrders, setKitchenDelayedOrders] = useState([
    { id: 'ORD-982', table: 'T07', items: 'Paneer Tikka (x2), Garlic Naan', station: 'Tandoor Station', elapsed: '28 mins', target: '18 mins', delay: '+10 mins', reason: 'Tandoor temperature reheating', priority: 'High' },
    { id: 'ORD-985', table: 'T02', items: 'Truffle Risotto, Grilled Salmon', station: 'Continental Pass', elapsed: '24 mins', target: '15 mins', delay: '+9 mins', reason: 'Customization check required', priority: 'Urgent' },
    { id: 'ORD-989', table: 'T15', items: 'Chicken Milanese, Caesar Salad', station: 'Hot Kitchen', elapsed: '22 mins', target: '16 mins', delay: '+6 mins', reason: 'Peak order queue surge', priority: 'Medium' }
  ]);

  const [lowStockDishes, setLowStockDishes] = useState([
    { id: 3, name: 'Paneer Tikka', category: 'Starters', stock: 2, threshold: 10, unit: 'Portions', status: 'Critical', supplier: 'Dairy Fresh Ltd', actionStatus: 'Unavailable' },
    { id: 102, name: 'Truffle Mushroom Soup', category: 'Soups', stock: 4, threshold: 12, unit: 'Bowls', status: 'Low', supplier: 'Artisan Imports', actionStatus: 'Available' },
    { id: 103, name: 'Wild Atlantic Salmon', category: 'Main Course', stock: 1, threshold: 8, unit: 'Portions', status: 'Critical', supplier: 'Ocean Fresh Co', actionStatus: 'Unavailable' },
    { id: 104, name: 'Belgian Chocolate Lava', category: 'Dessert', stock: 3, threshold: 15, unit: 'Pieces', status: 'Low', supplier: 'Sweet Delights', actionStatus: 'Available' }
  ]);

  // Food Menu Shifts & Schedules
  const [menuShifts, setMenuShifts] = useState([
    { id: 1, name: 'Breakfast Shift', hours: '07:00 AM – 11:00 AM', active: true, itemsCount: 18, description: 'Fresh bakery, coffee, eggs, dosas & morning platters' },
    { id: 2, name: 'Lunch Shift', hours: '12:00 PM – 04:00 PM', active: true, itemsCount: 36, description: 'Executive buffets, thalis, pastas, mains & mocktails' },
    { id: 3, name: 'High Tea & Snacks', hours: '04:00 PM – 07:00 PM', active: true, itemsCount: 14, description: 'Artisanal teas, sandwiches, sliders & pastries' },
    { id: 4, name: 'Dinner Shift', hours: '07:00 PM – 11:30 PM', active: true, itemsCount: 42, description: 'Signature steaks, curries, pizzas, wine & desserts' },
    { id: 5, name: 'Late Night Bar Bites', hours: '11:30 PM – 01:30 AM', active: false, itemsCount: 10, description: 'Finger foods, tapas, craft cocktails & munchies' },
    { id: 6, name: 'Weekend Grand Brunch', hours: 'Sat & Sun • 11:00 AM – 04:00 PM', active: true, itemsCount: 28, description: 'Live grill counters, champagne brunch & dessert spread' }
  ]);

  const [menuSchedules, setMenuSchedules] = useState([
    { id: 1, day: 'Monday – Friday', shift: 'Breakfast', timing: '07:00 AM – 11:00 AM', theme: 'Weekday Express', station: 'Bakery & Hot Pass', status: 'Active' },
    { id: 2, day: 'Monday – Friday', shift: 'Lunch', timing: '12:00 PM – 04:00 PM', theme: 'Corporate & A la Carte', station: 'Main Kitchen', status: 'Active' },
    { id: 3, day: 'Monday – Sunday', shift: 'Dinner', timing: '07:00 PM – 11:30 PM', theme: 'Fine Dining Royal', station: 'All Stations', status: 'Active' },
    { id: 4, day: 'Saturday – Sunday', shift: 'Grand Brunch', timing: '11:00 AM – 04:00 PM', theme: 'Weekend Live Stations', station: 'Tandoor & Grill', status: 'Scheduled' },
    { id: 5, day: 'Friday – Saturday', shift: 'Late Night Bites', timing: '11:30 PM – 01:30 AM', theme: 'Moonlight Lounge', station: 'Bar & Appetizers', status: 'Active' }
  ]);

  const [priceEditModal, setPriceEditModal] = useState(null);

  // Table Management Subtabs & Transfer State
  const [tableManagementSubTab, setTableManagementSubTab] = useState('floor-view');
  const [selectedFloorTable, setSelectedFloorTable] = useState(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferSourceTable, setTransferSourceTable] = useState('T02');
  const [transferTargetTable, setTransferTargetTable] = useState('T07');
  const [transferReason, setTransferReason] = useState('Guest requested Outdoor Terrace seating');

  const [transferHistoryList, setTransferHistoryList] = useState([
    { id: 'TR-101', fromTable: 'T02', toTable: 'T07', guest: 'R. Sharma', time: '01:45 PM', reason: 'Customer requested Outdoor Terrace view', approvedBy: 'Aman Sharma (Manager)', status: 'Completed' },
    { id: 'TR-102', fromTable: 'T05', toTable: 'T06', guest: 'P. Mehta', time: '12:30 PM', reason: 'Party expanded to 6 persons', approvedBy: 'Aman Sharma (Manager)', status: 'Completed' },
    { id: 'TR-103', fromTable: 'T08', toTable: 'T14', guest: 'Dr. Alok Verma', time: '11:15 AM', reason: 'Table T08 shifted to maintenance', approvedBy: 'Aman Sharma (Manager)', status: 'Completed' }
  ]);

  const [walkinAllocations, setWalkinAllocations] = useState([
    { id: 'WQ-101', guestName: 'Karan Mehra', phone: '+91 98112 34567', partySize: 4, waitTime: '10 mins', sectionPref: 'Indoor Hall', status: 'Waiting' },
    { id: 'WQ-102', guestName: 'Ananya Deshmukh', phone: '+91 97234 56789', partySize: 2, waitTime: '5 mins', sectionPref: 'Outdoor Terrace', status: 'Waiting' },
    { id: 'WQ-103', guestName: 'Sanjay Singhania', phone: '+91 98450 11223', partySize: 6, waitTime: '15 mins', sectionPref: 'Any', status: 'Waiting' }
  ]);

  const [occupancyHistoryList, setOccupancyHistoryList] = useState([
    { session: 'SES-901', table: 'T01', capacity: '2 Seater', guests: 2, checkIn: '12:15 PM', checkOut: '01:10 PM', duration: '55 mins', billedAmount: '₹1,480', waiter: 'Julian Vance', status: 'Turned Over' },
    { session: 'SES-902', table: 'T04', capacity: '4 Seater', guests: 4, checkIn: '12:30 PM', checkOut: '01:45 PM', duration: '75 mins', billedAmount: '₹3,250', waiter: 'Elena Rostova', status: 'Turned Over' },
    { session: 'SES-903', table: 'T07', capacity: '6 Seater', guests: 5, checkIn: '01:00 PM', checkOut: '02:15 PM', duration: '75 mins', billedAmount: '₹5,120', waiter: 'Julian Vance', status: 'Turned Over' },
    { session: 'SES-904', table: 'T03', capacity: '2 Seater', guests: 2, checkIn: '01:20 PM', checkOut: '02:05 PM', duration: '45 mins', billedAmount: '₹1,150', waiter: 'Julian Vance', status: 'Turned Over' }
  ]);

  // POS & Reports Subtabs Data
  const [billingOverviewList, setBillingOverviewList] = useState([
    { billNo: 'B0001', orderId: 'ORD-901', table: 'T01', guest: 'Walk-in Guest', items: 2, subtotal: 650, gst: 32.5, service: 65.5, total: 748, method: 'UPI', status: 'Settled', time: '02:15 PM' },
    { billNo: 'B0002', orderId: 'ORD-902', table: 'T03', guest: 'R. Sharma', items: 3, subtotal: 780, gst: 39, service: 80, total: 899, method: 'Card', status: 'Settled', time: '03:05 PM' },
    { billNo: 'B0003', orderId: 'ORD-903', table: 'T05', guest: 'P. Mehta', items: 2, subtotal: 610, gst: 30.5, service: 58.5, total: 699, method: 'Cash', status: 'Settled', time: '04:20 PM' },
    { billNo: 'B0004', orderId: 'ORD-904', table: 'T07', guest: 'K. Patel', items: 2, subtotal: 650, gst: 32.5, service: 65.5, total: 748, method: 'UPI', status: 'Settled', time: '05:10 PM' },
    { billNo: 'B0005', orderId: 'ORD-905', table: 'T09', guest: 'A. Singh', items: 3, subtotal: 695, gst: 34.75, service: 69.25, total: 799, method: 'Card', status: 'Settled', time: '06:25 PM' }
  ]);

  const [paymentSummaryModes, setPaymentSummaryModes] = useState([
    { method: 'UPI (GPay / PhonePe / Paytm)', count: 24, gross: 23352, fee: 0, net: 23352, share: '48%', status: 'Auto-Reconciled' },
    { method: 'Credit / Debit Cards (POS Terminal)', count: 15, gross: 15568, fee: 233.5, net: 15334.5, share: '32%', status: 'Settled to Bank' },
    { method: 'Cash at Counter', count: 9, gross: 9730, fee: 0, net: 9730, share: '20%', status: 'Cash Drawer Verified' }
  ]);

  const [refundRequestsList, setRefundRequestsList] = useState([
    { id: 'REF-201', billNo: 'B0002', table: 'T03', amount: 180, customer: 'R. Sharma', reason: 'Disliked Beverage taste - replaced with water', requestedBy: 'Waiter Julian', status: 'Approved', approvedBy: 'Aman Sharma (Manager)', time: '03:15 PM' },
    { id: 'REF-202', billNo: 'B0004', table: 'T07', amount: 350, customer: 'K. Patel', reason: 'Billed double Cold Coffee by error', requestedBy: 'Cashier MDG', status: 'Approved', approvedBy: 'Aman Sharma (Manager)', time: '05:22 PM' },
    { id: 'REF-203', billNo: 'B0005', table: 'T09', amount: 220, customer: 'A. Singh', reason: 'Dessert delayed past checkout time', requestedBy: 'Customer Sophia', status: 'Pending Review', approvedBy: '—', time: '06:40 PM' }
  ]);

  const [salesReportsList, setSalesReportsList] = useState([
    { date: '21 Nov 2026', day: 'Saturday', ordersCount: 48, grossSales: 48650, discount: 1250, netRevenue: 47400, gstCollected: 2432, avgTicket: 1013 },
    { date: '20 Nov 2026', day: 'Friday', ordersCount: 42, grossSales: 42800, discount: 950, netRevenue: 41850, gstCollected: 2140, avgTicket: 1019 },
    { date: '19 Nov 2026', day: 'Thursday', ordersCount: 38, grossSales: 37900, discount: 800, netRevenue: 37100, gstCollected: 1895, avgTicket: 997 },
    { date: '18 Nov 2026', day: 'Wednesday', ordersCount: 36, grossSales: 35400, discount: 650, netRevenue: 34750, gstCollected: 1770, avgTicket: 983 },
    { date: '17 Nov 2026', day: 'Tuesday', ordersCount: 34, grossSales: 33100, discount: 500, netRevenue: 32600, gstCollected: 1655, avgTicket: 973 }
  ]);

  const [foodSalesPerformance, setFoodSalesPerformance] = useState([
    { rank: 1, name: 'Margherita Pizza', category: 'Pizza', unitsSold: 42, price: 450, revenue: 18900, margin: '68%', share: '18.2%' },
    { rank: 2, name: 'Truffle Risotto', category: 'Main Course', unitsSold: 31, price: 420, revenue: 13020, margin: '62%', share: '12.6%' },
    { rank: 3, name: 'Chicken Milanese', category: 'Main Course', unitsSold: 28, price: 380, revenue: 10640, margin: '58%', share: '10.3%' },
    { rank: 4, name: 'Paneer Tikka', category: 'Starters', unitsSold: 32, price: 320, revenue: 10240, margin: '65%', share: '9.9%' },
    { rank: 5, name: 'Caesar Salad', category: 'Salads', unitsSold: 25, price: 280, revenue: 7000, margin: '74%', share: '6.8%' },
    { rank: 6, name: 'Cold Coffee Frappe', category: 'Beverages', unitsSold: 38, price: 180, revenue: 6840, margin: '82%', share: '6.6%' }
  ]);

  // Prevent background scrolling when any modal is open
  useEffect(() => {
    if (
      addItemModalOpen ||
      editDishModal ||
      viewDishModal ||
      selectedOrderModal ||
      addTableModalOpen ||
      selectedTableDetailsModal ||
      selectedTableReportCard ||
      isAssignTableModalOpen ||
      editTableModal ||
      selectedPosTransactionModal ||
      selectedSalesReportModal ||
      selectedComplaintModal ||
      editProfileModalOpen ||
      editRestaurantModalOpen
    ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [
    addItemModalOpen,
    editDishModal,
    viewDishModal,
    selectedOrderModal,
    addTableModalOpen,
    selectedTableDetailsModal,
    selectedTableReportCard,
    isAssignTableModalOpen,
    editTableModal,
    selectedPosTransactionModal,
    selectedSalesReportModal,
    selectedComplaintModal,
    editProfileModalOpen,
    editRestaurantModalOpen
  ]);

  // New Food Item Form State
  const [newFoodItem, setNewFoodItem] = useState({
    name: '',
    category: 'Main Course',
    description: '',
    cuisine: 'Italian',
    diet: 'Veg',
    stock: '15 servings',
    price: '',
    status: 'Available',
    available: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'
  });

  const handleCreateFoodItem = (e) => {
    e.preventDefault();
    if (!newFoodItem.name || !newFoodItem.price) return;
    const item = {
      id: Date.now(),
      name: newFoodItem.name,
      description: newFoodItem.description || 'Freshly prepared signature dish',
      category: newFoodItem.category,
      cuisine: newFoodItem.cuisine || 'Continental',
      diet: newFoodItem.diet || 'Veg',
      stock: newFoodItem.stock || '10 servings',
      available: newFoodItem.status === 'Available',
      price: parseFloat(newFoodItem.price) || 0,
      status: newFoodItem.status,
      isFavorite: false,
      image: newFoodItem.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'
    };
    setFoodItemsList(prev => [item, ...prev]);
    setAddItemModalOpen(false);
    setNewFoodItem({
      name: '',
      category: 'Main Course',
      description: '',
      cuisine: 'Italian',
      diet: 'Veg',
      stock: '15 servings',
      price: '',
      status: 'Available',
      available: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'
    });
    setTransferToast(`Dish "${item.name}" added to menu successfully!`);
    setTimeout(() => setTransferToast(null), 4000);
  };

  const handleToggleFavorite = (id) => {
    setFoodItemsList(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  };

  const handleDeleteDish = (id, name) => {
    setFoodItemsList(prev => prev.filter(item => item.id !== id));
    setTransferToast(`Dish "${name}" removed from menu.`);
    setTimeout(() => setTransferToast(null), 3000);
  };

  const handleUpdateDish = (e) => {
    e.preventDefault();
    if (!editDishModal) return;
    setFoodItemsList(prev => prev.map(item => item.id === editDishModal.id ? editDishModal : item));
    setTransferToast(`Updated "${editDishModal.name}" successfully!`);
    setEditDishModal(null);
    setTimeout(() => setTransferToast(null), 3000);
  };

  // Recent Orders matching screenshot exactly
  const screenshotRecentOrders = [
    { orderId: '#1051', table: 'T12', items: '2 Items', amount: '1,240', status: 'Ready', time: '07:42 PM', statusColor: 'green' },
    { orderId: '#1050', table: 'T07', items: '3 Items', amount: '1,850', status: 'Preparing', time: '07:40 PM', statusColor: 'orange' },
    { orderId: '#1049', table: 'T15', items: '1 Item', amount: '620', status: 'Delivered', time: '07:38 PM', statusColor: 'green' },
    { orderId: '#1048', table: 'T06', items: '2 Items', amount: '755', status: 'Preparing', time: '07:35 PM', statusColor: 'orange' },
    { orderId: '#1047', table: 'T14', items: '1 Item', amount: '430', status: 'Ready', time: '07:32 PM', statusColor: 'green' },
  ];

  // Today's Reservations matching screenshot exactly
  const screenshotReservations = [
    { time: '07:00 PM', guests: 4, table: 'T08', status: 'Confirmed', statusColor: 'green' },
    { time: '08:00 PM', guests: 2, table: 'T14', status: 'Confirmed', statusColor: 'green' },
    { time: '08:30 PM', guests: 6, table: 'T16', status: 'Pending', statusColor: 'yellow' },
    { time: '09:00 PM', guests: 4, table: 'T10', status: 'Confirmed', statusColor: 'green' },
  ];

  // Kitchen Status radial rings data matching screenshot exactly
  const kitchenStatusMetrics = [
    { label: 'In Progress', orders: '15 Orders', percentage: 78, color: '#541B2A' },
    { label: 'Ready', orders: '12 Orders', percentage: 62, color: '#C8A66B' },
    { label: 'Served', orders: '18 Orders', percentage: 92, color: '#21845A' },
    { label: 'Completed', orders: '20 Orders', percentage: 100, color: '#3976B8' },
  ];

  // Floor layout tables for Table Management section
  const [floorTables, setFloorTables] = useState([
    { id: 'T01', status: 'Occupied', guests: 4, currentBill: 2150 },
    { id: 'T02', status: 'Available', guests: 0, currentBill: 0 },
    { id: 'T03', status: 'Reserved', guests: 2, currentBill: 0 },
    { id: 'T04', status: 'Not Available', guests: 0, currentBill: 0 },
    { id: 'T05', status: 'Available', guests: 0, currentBill: 0 },
    { id: 'T06', status: 'Occupied', guests: 6, currentBill: 3420 },
    { id: 'T07', status: 'Available', guests: 0, currentBill: 0 },
    { id: 'T08', status: 'Reserved', guests: 4, currentBill: 0 },
    { id: 'T09', status: 'Not Available', guests: 0, currentBill: 0 },
    { id: 'T10', status: 'Available', guests: 0, currentBill: 0 },
  ]);

  // Food Catalog (48 Items matching screenshot exactly)
  const [foodItemsList, setFoodItemsList] = useState([
    // Row 1-6 Matching Screenshot Exactly
    { id: 1, name: 'Truffle Risotto', description: 'Creamy Italian risotto', category: 'Main Course', price: 420, status: 'Active', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 2, name: 'Chicken Milanese', description: 'Crispy breaded chicken cutlet', category: 'Main Course', price: 380, status: 'Active', available: true, cuisine: 'Italian', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 3, name: 'Paneer Tikka', description: 'Clay oven charred cottage cheese', category: 'Starters', price: 320, status: 'Paused', available: false, cuisine: 'Indian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 4, name: 'Margherita Pizza', description: 'Classic Italian pizza', category: 'Pizza', price: 450, status: 'Active', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 5, name: 'Caesar Salad', description: 'Fresh romaine salad with parmesan', category: 'Salads', price: 280, status: 'Active', available: true, cuisine: 'American', diet: 'Veg', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 6, name: 'Chocolate Brownie', description: 'Rich chocolate delight with fudge', category: 'Desserts', price: 180, status: 'Active', available: true, cuisine: 'American', diet: 'Veg', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80', isFavorite: false },

    // Next Items for Catalog (Items 7-48)
    { id: 7, name: 'Virgin Mojito', description: 'Refreshing mint and lime cooler', category: 'Beverages', price: 120, status: 'Active', available: true, cuisine: 'Continental', diet: 'Veg', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 8, name: 'Bruschetta', description: 'Grilled bread with fresh tomatoes', category: 'Starters', price: 220, status: 'Active', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 9, name: 'Penne Alfredo', description: 'Creamy parmesan Alfredo pasta', category: 'Main Course', price: 380, status: 'Active', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281290?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 10, name: 'Lasagna Bolognese', description: 'Slow-cooked classic lasagna', category: 'Main Course', badgeLabel: 'Italian', price: 400, status: 'Active', available: true, cuisine: 'Italian', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=500&q=80', isFavorite: false },

    // Page 2 Dishes
    { id: 11, name: 'Spaghetti Carbonara', description: 'Rich egg and pancetta sauce', category: 'Main Course', price: 390, status: 'Available', available: true, cuisine: 'Italian', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 12, name: 'Quattro Formaggi', description: 'Four cheese luxury pizza', category: 'Pizzas', price: 490, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 13, name: 'Greek Salad', description: 'Kalamata olives & feta', category: 'Salads', price: 260, status: 'Available', available: true, cuisine: 'Continental', diet: 'Veg', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 14, name: 'Classic Tiramisu', description: 'Espresso-soaked savoiardi', category: 'Desserts', price: 240, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 15, name: 'Berry Mint Lemonade', description: 'Crushed wild berries & lemon', category: 'Beverages', price: 140, status: 'Available', available: true, cuisine: 'Continental', diet: 'Veg', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 16, name: 'Crispy Calamari', description: 'Golden rings with tartar', category: 'Starters', price: 260, status: 'Available', available: true, cuisine: 'Continental', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 17, name: 'Classic Smash Burger', description: 'Juicy Angus beef with cheddar', category: 'American', price: 340, status: 'Available', available: true, cuisine: 'American', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 18, name: 'Pepperoni Feast', description: 'Spicy American pepperoni', category: 'American', price: 510, status: 'Available', available: true, cuisine: 'American', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 19, name: 'Teriyaki Glazed Salmon', description: 'Fresh salmon in teriyaki glaze', category: 'Japanese', price: 540, status: 'Available', available: true, cuisine: 'Japanese', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 20, name: 'Steamed Dim Sum Platter', description: 'Handcrafted crystal dumplings', category: 'Chinese', price: 280, status: 'Available', available: true, cuisine: 'Chinese', diet: 'Veg', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80', isFavorite: false },

    // Page 3 Dishes
    { id: 21, name: 'Classic Cappuccino', description: 'Velvety micro-foam espresso', category: 'Beverages', price: 130, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 22, name: 'Garlic Herb Bread', description: 'Toasted baguette with parsley', category: 'Starters', price: 140, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 23, name: 'Mushroom Ravioli', description: 'Handcrafted wild mushroom pocket', category: 'Main Course', price: 360, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 24, name: 'Smokey BBQ Wings', description: 'Glazed chicken wings in hickory sauce', category: 'American', price: 320, status: 'Available', available: true, cuisine: 'American', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 25, name: 'Miso Tonkotsu Ramen', description: 'Rich broth with chashu pork', category: 'Japanese', price: 440, status: 'Available', available: true, cuisine: 'Japanese', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 26, name: 'Szechuan Chilli Noodles', description: 'Spicy noodles with wok tossed greens', category: 'Chinese', price: 290, status: 'Available', available: true, cuisine: 'Chinese', diet: 'Veg', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 27, name: 'Mango Basil Cooler', description: 'Alphonso puree with fresh basil', category: 'Beverages', price: 160, status: 'Available', available: true, cuisine: 'Indian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 28, name: 'Paneer Tikka', description: 'Clay oven charred cottage cheese', category: 'Starters', price: 240, status: 'Available', available: true, cuisine: 'Indian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 29, name: 'Pizza & Mojito Combo', description: 'Personal Margherita with Mojito', category: 'Combo', isCombo: true, price: 499, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 30, name: 'Burger & Shake Combo', description: 'Smash burger with thick vanilla shake', category: 'Combo', isCombo: true, price: 449, status: 'Available', available: true, cuisine: 'American', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80', isFavorite: false },

    // Page 4 Dishes
    { id: 31, name: 'Chef Risotto Deal', description: 'Signature Risotto at 20% off', category: 'Promo', isPromo: true, price: 336, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 32, name: 'Family Feast Platter', description: 'Chef special assortment for 4', category: 'Promo', isPromo: true, price: 999, status: 'Available', available: true, cuisine: 'Continental', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 33, name: 'Peach Green Iced Tea', description: 'Brewed green tea with peach', category: 'Beverages', price: 130, status: 'Available', available: true, cuisine: 'Continental', diet: 'Veg', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 34, name: 'Chicken Seekh Kebab', description: 'Spiced minced chicken skewers', category: 'Starters', price: 290, status: 'Available', available: true, cuisine: 'Indian', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 35, name: 'Paneer Butter Masala', description: 'Rich tomato cashew gravy', category: 'Main Course', price: 310, status: 'Available', available: true, cuisine: 'Indian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 36, name: 'Truffle Funghi Pizza', description: 'Porcini mushrooms & truffle oil', category: 'Pizzas', price: 540, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 37, name: 'Edamame Poke Bowl', description: 'Steamed edamame & sushi rice', category: 'Japanese', price: 320, status: 'Available', available: true, cuisine: 'Japanese', diet: 'Veg', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 38, name: 'Kung Pao Chicken', description: 'Wok fried with peanuts & scallions', category: 'Chinese', price: 350, status: 'Available', available: true, cuisine: 'Chinese', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 39, name: 'Espresso Doppio', description: 'Double shot rich Arabica blend', category: 'Beverages', price: 110, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 40, name: 'Truffle Fries', description: 'Hand-cut fries with parmesan', category: 'American', price: 190, status: 'Available', available: true, cuisine: 'American', diet: 'Veg', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=500&q=80', isFavorite: false },

    // Page 5 Dishes
    { id: 41, name: 'Chicken Tikka Masala', description: 'Chargrilled chicken in spiced gravy', category: 'Main Course', price: 360, status: 'Available', available: true, cuisine: 'Indian', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 42, name: 'Stuffed Mushrooms', description: 'Herbed cheese & walnut filling', category: 'Starters', price: 210, status: 'Available', available: true, cuisine: 'Italian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 43, name: 'Ebi Prawn Tempura', description: 'Crispy battered black tiger prawns', category: 'Japanese', price: 420, status: 'Available', available: true, cuisine: 'Japanese', diet: 'Non-Veg', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 44, name: 'Crispy Veg Spring Rolls', description: 'Golden rolls with sweet chilli dip', category: 'Chinese', price: 220, status: 'Available', available: true, cuisine: 'Chinese', diet: 'Veg', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 45, name: 'Dal Makhani Royale', description: 'Slow-simmered black lentils', category: 'Main Course', price: 270, status: 'Available', available: true, cuisine: 'Indian', diet: 'Veg', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 46, name: 'Trio Appetizer Combo', description: 'Garlic bread, calamari & bruschetta', category: 'Combo', isCombo: true, price: 490, status: 'Available', available: true, cuisine: 'Continental', diet: 'Veg', image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 47, name: 'Mojito Happy Hour Promo', description: 'Buy 1 get 1 on signature mojitos', category: 'Promo', isPromo: true, price: 199, status: 'Available', available: true, cuisine: 'Continental', diet: 'Veg', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80', isFavorite: false },
    { id: 48, name: 'New York Cheesecake', description: 'Classic graham crust & sour cream', category: 'Desserts', price: 230, status: 'Available', available: true, cuisine: 'American', diet: 'Veg', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80', isFavorite: false }
  ]);

  // Handle table transfer
  const handleApproveTransfer = () => {
    if (transferFromTable === transferToTable) {
      alert("Source and destination table cannot be the same.");
      return;
    }
    setFloorTables(prev => {
      const fromObj = prev.find(t => t.id === transferFromTable);
      return prev.map(t => {
        if (t.id === transferFromTable) return { ...t, status: 'Available', guests: 0, currentBill: 0 };
        if (t.id === transferToTable) return { ...t, status: fromObj?.status || 'Occupied', guests: fromObj?.guests || 2, currentBill: fromObj?.currentBill || 1200 };
        return t;
      });
    });
    setTransferToast(`Successfully transferred from ${transferFromTable} to ${transferToTable}!`);
    setTimeout(() => setTransferToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F5EBE4] flex text-[#2D2528] font-sans antialiased selection:bg-[#541B2A] selection:text-white">

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ========================================================
          SIDEBAR - Sleek & Compact (w-56)
         ======================================================== */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-56 bg-[#500F1D] text-[#FFFFFF] flex flex-col justify-between transition-transform duration-300 shadow-2xl border-r border-[#3D0A14] lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full bg-[#500F1D]">
          {/* Top Logo Container - Compact & Elegant */}
          <div className="h-[62px] bg-[#500F1D] border-b border-white/10 px-3 flex flex-col items-center justify-center shrink-0">
            <Leaf className="w-6 h-6 text-[#F5DF92] stroke-[2] drop-shadow-xs" />
            <span className="text-base font-extrabold text-white tracking-wide leading-none mt-1 font-sans">
              Lunar
            </span>
          </div>

          {/* Below Divider Line: Navigation Links */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 flex flex-col justify-between">
            <nav className="space-y-2">

              {/* 1. Dashboard (Active gold pill by default) */}
              <button
                onClick={() => handleSectionSelect('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeSection === 'dashboard'
                  ? 'bg-gradient-to-r from-[#F7E19A] via-[#E8BF55] to-[#D5A73F] text-[#4A0E17] font-bold shadow-md shadow-[#D5A73F]/30'
                  : 'text-white hover:bg-white/10 font-medium'
                  }`}
              >
                <Home className={`w-4 h-4 shrink-0 ${activeSection === 'dashboard' ? 'text-[#4A0E17]' : 'text-white'}`} strokeWidth={2} />
                <span className={`text-xs ${activeSection === 'dashboard' ? 'font-bold text-[#4A0E17]' : 'font-medium text-white'}`}>
                  Dashboard
                </span>
              </button>

              {/* 2. Food & Menu */}
              <button
                onClick={() => handleSectionSelect('food-menu')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeSection === 'food-menu'
                  ? 'bg-gradient-to-r from-[#F7E19A] via-[#E8BF55] to-[#D5A73F] text-[#4A0E17] font-bold shadow-md shadow-[#D5A73F]/30'
                  : 'text-white hover:bg-white/10 font-medium'
                  }`}
              >
                <UtensilsCrossed className={`w-4 h-4 shrink-0 ${activeSection === 'food-menu' ? 'text-[#4A0E17]' : 'text-white'}`} strokeWidth={2} />
                <span className={`text-xs ${activeSection === 'food-menu' ? 'font-bold text-[#4A0E17]' : 'font-medium text-white'}`}>
                  Food & Menu
                </span>
              </button>

              {/* 3. Orders & Kitchen */}
              <button
                onClick={() => handleSectionSelect('orders-kitchen')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeSection === 'orders-kitchen'
                  ? 'bg-gradient-to-r from-[#F7E19A] via-[#E8BF55] to-[#D5A73F] text-[#4A0E17] font-bold shadow-md shadow-[#D5A73F]/30'
                  : 'text-white hover:bg-white/10 font-medium'
                  }`}
              >
                <Layers className={`w-4 h-4 shrink-0 ${activeSection === 'orders-kitchen' ? 'text-[#4A0E17]' : 'text-white'}`} strokeWidth={2} />
                <span className={`text-xs ${activeSection === 'orders-kitchen' ? 'font-bold text-[#4A0E17]' : 'font-medium text-white'}`}>
                  Orders & Kitchen
                </span>
              </button>

              {/* 4. Table Management */}
              <button
                onClick={() => handleSectionSelect('tables-reservations')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeSection === 'tables-reservations'
                  ? 'bg-gradient-to-r from-[#F7E19A] via-[#E8BF55] to-[#D5A73F] text-[#4A0E17] font-bold shadow-md shadow-[#D5A73F]/30'
                  : 'text-white hover:bg-white/10 font-medium'
                  }`}
              >
                <Calendar className={`w-4 h-4 shrink-0 ${activeSection === 'tables-reservations' ? 'text-[#4A0E17]' : 'text-white'}`} strokeWidth={2} />
                <span className={`text-xs ${activeSection === 'tables-reservations' ? 'font-bold text-[#4A0E17]' : 'font-medium text-white'}`}>
                  Table Management
                </span>
              </button>

              {/* 5. POS */}
              <button
                onClick={() => { handleSectionSelect('pos-reports'); setPosReportViewMode('pos'); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${(activeSection === 'pos-reports' && posReportViewMode === 'pos') || activeSection === 'pos'
                  ? 'bg-gradient-to-r from-[#F7E19A] via-[#E8BF55] to-[#D5A73F] text-[#4A0E17] font-bold shadow-md shadow-[#D5A73F]/30'
                  : 'text-white hover:bg-white/10 font-medium'
                  }`}
              >
                <CreditCard className={`w-4 h-4 shrink-0 ${(activeSection === 'pos-reports' && posReportViewMode === 'pos') || activeSection === 'pos' ? 'text-[#4A0E17]' : 'text-white'}`} strokeWidth={2} />
                <span className={`text-xs ${(activeSection === 'pos-reports' && posReportViewMode === 'pos') || activeSection === 'pos' ? 'font-bold text-[#4A0E17]' : 'font-medium text-white'}`}>
                  POS
                </span>
              </button>

              {/* 6. Reports */}
              <button
                onClick={() => { handleSectionSelect('pos-reports'); setPosReportViewMode('reports'); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${(activeSection === 'pos-reports' && posReportViewMode === 'reports') || activeSection === 'reports'
                  ? 'bg-gradient-to-r from-[#F7E19A] via-[#E8BF55] to-[#D5A73F] text-[#4A0E17] font-bold shadow-md shadow-[#D5A73F]/30'
                  : 'text-white hover:bg-white/10 font-medium'
                  }`}
              >
                <FileText className={`w-4 h-4 shrink-0 ${(activeSection === 'pos-reports' && posReportViewMode === 'reports') || activeSection === 'reports' ? 'text-[#4A0E17]' : 'text-white'}`} strokeWidth={2} />
                <span className={`text-xs ${(activeSection === 'pos-reports' && posReportViewMode === 'reports') || activeSection === 'reports' ? 'font-bold text-[#4A0E17]' : 'font-medium text-white'}`}>
                  Reports
                </span>
              </button>

              {/* 7. Settings */}
              <button
                onClick={() => handleSectionSelect('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeSection === 'settings'
                  ? 'bg-gradient-to-r from-[#F7E19A] via-[#E8BF55] to-[#D5A73F] text-[#4A0E17] font-bold shadow-md shadow-[#D5A73F]/30'
                  : 'text-white hover:bg-white/10 font-medium'
                  }`}
              >
                <Settings className={`w-4 h-4 shrink-0 ${activeSection === 'settings' ? 'text-[#4A0E17]' : 'text-white'}`} strokeWidth={2} />
                <span className={`text-xs ${activeSection === 'settings' ? 'font-bold text-[#4A0E17]' : 'font-medium text-white'}`}>
                  Settings
                </span>
              </button>

            </nav>

            {/* Logout button at bottom */}
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => { alert('Logging out of LUNAR Manager Portal...'); window.location.href = '/'; }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
              >
                <LogOut className="w-3.5 h-3.5 text-white/70" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MAIN WORKSPACE AREA
         ======================================================== */}
      <div className="flex-1 lg:pl-56 flex flex-col min-h-screen">

        {/* Top Header - Compact, Pure White */}
        <header className="px-4 sm:px-6 py-2.5 sticky top-0 z-30 bg-white backdrop-blur-md border-b border-[#E8DDD8] flex items-center justify-between gap-3 shadow-xs">

          {/* Left: Welcome text with waving hand 👋 & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-[#2D2528] bg-white border border-[#E8DDD8] shadow-xs shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h1 className="font-sans text-xl sm:text-2xl font-extrabold text-[#2D2528] tracking-tight leading-tight">
                Welcome Back, Priyanka!
              </h1>
              <p className="text-xs text-[#75696B] font-medium leading-tight">
                Here's what's happening at your restaurant today.
              </p>
            </div>
          </div>

          {/* Right: Date Pill, Notification Bell, Profile Pill (Vertically Centered) */}
          <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">

            {/* Date Pill Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] shadow-xs hover:border-[#541B2A] transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#873C50]" />
                <span>{selectedDateFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#75696B]" />
              </button>
              {dateDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-[#E8DDD8] py-2 z-50 text-xs">
                  {['Today, 16 Nov 2026', 'Yesterday, 15 Nov 2026', 'This Week', 'This Month'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setSelectedDateFilter(opt); setDateDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 font-medium transition-colors ${selectedDateFilter === opt ? 'bg-[#541B2A] text-white font-bold' : 'hover:bg-[#FAF7F5] text-[#2D2528]'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell with Badge '3' */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="w-10 h-10 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#541B2A] shadow-xs transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E53E3E] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  3
                </span>
              </button>
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-xl border border-[#E8DDD8] py-2 z-50 text-xs divide-y divide-[#E8DDD8]">
                  <div className="px-4 py-2 font-bold text-[#2D2528] flex justify-between">
                    <span>Manager Notifications</span>
                    <span className="text-[10px] text-[#873C50] font-semibold">3 New</span>
                  </div>
                  <div className="py-1">
                    <div className="px-4 py-2 hover:bg-[#FAF7F5] cursor-pointer">
                      <p className="font-bold text-[#C44747]">🚨 Order #1049 Delayed</p>
                      <p className="text-[#75696B] text-[11px]">Table T15 waiting 15 mins for Margherita Pizza.</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-[#FAF7F5] cursor-pointer">
                      <p className="font-bold text-[#B7791F]">⚠️ Low Stock: Paneer</p>
                      <p className="text-[#75696B] text-[11px]">Only 2 kg remaining. Marked unavailable.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill matching screenshot: Avatar, Priyanka, Manager, Chevron */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] shadow-xs hover:border-[#541B2A] transition-colors"
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Priyanka"
                  className="w-8 h-8 rounded-full object-cover border border-[#C8A66B]"
                />
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-[#2D2528] leading-tight">Priyanka</p>
                  <p className="text-[10px] text-[#75696B] leading-tight">Manager</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#75696B]" />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white shadow-xl border border-[#E8DDD8] p-1.5 z-50 animate-fadeIn">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/';
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-[#C44747] hover:bg-[#FDF2F2] transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-[#C44747]" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Global Toast */}
        {transferToast && (
          <div className="mx-6 sm:mx-10 mt-2 p-3.5 rounded-2xl bg-[#E8F4ED] border border-[#21845A]/40 text-[#21845A] text-xs font-bold flex items-center gap-2 shadow-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{transferToast}</span>
          </div>
        )}

        {/* ========================================================
            SECTION BODY CONTENT - Compact Spacing & Reduced Gaps
           ======================================================== */}
        <main className="p-3.5 sm:p-5 flex-1 space-y-3.5">

          {/* ====================================================================
              1. DASHBOARD - EXACT SCREENSHOT IMPLEMENTATION
             ==================================================================== */}
          {activeSection === 'dashboard' && (
            <div className="space-y-3.5 animate-fadeIn">

              {/* Row 1: 4 Top KPI Cards - Modern Attractive Icons & Smooth Hover Animation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                {/* 1. Today's Sales */}
                <div className="group bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-[#E8DDD8] flex items-center gap-3.5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-[#873C50]/40 cursor-pointer">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#541B2A] to-[#3B0E1B] flex items-center justify-center text-[#E6C687] shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <IndianRupee className="w-5 h-5" strokeWidth={2.4} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#75696B]">Today's Sales</p>
                    <p className="font-bold text-xl text-[#2D2528] leading-tight mt-0.5">₹48,750</p>
                    <p className="text-[11px] font-bold text-[#21845A] mt-0.5">↑ 12%</p>
                  </div>
                </div>

                {/* 2. Total Orders */}
                <div className="group bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-[#E8DDD8] flex items-center gap-3.5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-[#873C50]/40 cursor-pointer">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#541B2A] to-[#3B0E1B] flex items-center justify-center text-[#E6C687] shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <ReceiptText className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#75696B]">Total Orders</p>
                    <p className="font-bold text-xl text-[#2D2528] leading-tight mt-0.5">142</p>
                    <p className="text-[11px] font-bold text-[#21845A] mt-0.5">↑ 8%</p>
                  </div>
                </div>

                {/* 3. Active Tables */}
                <div className="group bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-[#E8DDD8] flex items-center gap-3.5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-[#873C50]/40 cursor-pointer">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#541B2A] to-[#3B0E1B] flex items-center justify-center text-[#E6C687] shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Armchair className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#75696B]">Active Tables</p>
                    <p className="font-bold text-xl text-[#2D2528] leading-tight mt-0.5">18 / 24</p>
                    <p className="text-[11px] font-bold text-[#21845A] mt-0.5">↑ 2%</p>
                  </div>
                </div>

                {/* 4. Pending Reservations */}
                <div className="group bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-[#E8DDD8] flex items-center gap-3.5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-[#873C50]/40 cursor-pointer">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#541B2A] to-[#3B0E1B] flex items-center justify-center text-[#E6C687] shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <CalendarClock className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#75696B]">Pending Reservations</p>
                    <p className="font-bold text-xl text-[#2D2528] leading-tight mt-0.5">12</p>
                    <p className="text-[11px] font-bold text-[#75696B] mt-0.5">↓ 0%</p>
                  </div>
                </div>

              </div>

              {/* ====================================================================
                  ROW 2: Sales Overview Smooth Curved Area Graph
                  Matching Reference Image 1 exactly
                 ==================================================================== */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDD8] shadow-xs">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#541B2A]/10 text-[#541B2A] flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2D2528] leading-tight">Sales Overview</h3>
                      <p className="text-[11px] text-[#75696B] font-medium mt-0.5">Your sales performance over time</p>
                    </div>
                  </div>

                  {/* Filter Pills: 7D (active burgundy pill), 30D, Custom */}
                  <div className="flex items-center gap-1 bg-[#FAF7F5] p-1 rounded-full border border-[#E8DDD8]">
                    {['7D', '30D'].map(period => (
                      <button
                        key={period}
                        onClick={() => setSalesTimeRange(period)}
                        className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${salesTimeRange === period
                          ? 'bg-[#541B2A] text-white shadow-xs'
                          : 'text-[#75696B] hover:text-[#2D2528]'
                          }`}
                      >
                        {period}
                      </button>
                    ))}
                    <button className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[#75696B] hover:text-[#2D2528]">
                      <span>Custom</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Smooth Curved Line + Gradient Area Chart */}
                <div className="mt-2 relative w-full overflow-x-auto">
                  <svg className="w-full min-w-[560px] h-[230px] overflow-visible" viewBox="0 0 760 250" preserveAspectRatio="none">
                    <defs>
                      {/* Deep Burgundy Area Gradient */}
                      <linearGradient id="salesSmoothAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#541B2A" stopOpacity="0.30" />
                        <stop offset="50%" stopColor="#873C50" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#FAF7F5" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Dashed Grid Lines & Left Y-Axis Values */}
                    <text x="35" y="49" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="end">40k</text>
                    <line x1="45" y1="45" x2="730" y2="45" stroke="#F0E5DC" strokeDasharray="4 4" />

                    <text x="35" y="91" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="end">30k</text>
                    <line x1="45" y1="87" x2="730" y2="87" stroke="#F0E5DC" strokeDasharray="4 4" />

                    <text x="35" y="134" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="end">20k</text>
                    <line x1="45" y1="130" x2="730" y2="130" stroke="#F0E5DC" strokeDasharray="4 4" />

                    <text x="35" y="176" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="end">10k</text>
                    <line x1="45" y1="172" x2="730" y2="172" stroke="#F0E5DC" strokeDasharray="4 4" />

                    <text x="35" y="219" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="end">0k</text>
                    <line x1="45" y1="215" x2="730" y2="215" stroke="#E8DDD8" strokeWidth="1.2" />

                    {/* Gradient Area Fill under Curve */}
                    <path
                      d="M 60 185 C 110 172, 120 162, 170 159 C 220 156, 230 140, 280 134 C 330 128, 340 122, 390 117 C 440 112, 450 108, 500 104 C 550 100, 565 74, 610 70 C 655 66, 675 95, 710 100 L 710 215 L 60 215 Z"
                      fill="url(#salesSmoothAreaGrad)"
                    />

                    {/* Connecting Smooth Burgundy Curve Line */}
                    <path
                      d="M 60 185 C 110 172, 120 162, 170 159 C 220 156, 230 140, 280 134 C 330 128, 340 122, 390 117 C 440 112, 450 108, 500 104 C 550 100, 565 74, 610 70 C 655 66, 675 95, 710 100"
                      fill="none"
                      stroke="#541B2A"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />

                    {/* Circle Points on Curve */}
                    <circle cx="60" cy="185" r="4" fill="#541B2A" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="170" cy="159" r="4" fill="#541B2A" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="280" cy="134" r="4" fill="#541B2A" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="390" cy="117" r="4" fill="#541B2A" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="500" cy="104" r="4" fill="#541B2A" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="610" cy="70" r="5" fill="#541B2A" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="710" cy="100" r="4" fill="#541B2A" stroke="#FFFFFF" strokeWidth="2" />

                    {/* Tooltip Badge at Peak (Saturday: ₹48,750) */}
                    <g>
                      <rect x="575" y="24" width="70" height="26" rx="6" fill="#500F1D" />
                      <polygon points="606,50 614,50 610,54" fill="#500F1D" />
                      <text x="610" y="41" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                        ₹48,750
                      </text>
                    </g>

                    {/* X-Axis Day Labels */}
                    <text x="60" y="235" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="middle">Mon</text>
                    <text x="170" y="235" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="middle">Tue</text>
                    <text x="280" y="235" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="middle">Wed</text>
                    <text x="390" y="235" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="middle">Thu</text>
                    <text x="500" y="235" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="middle">Fri</text>
                    <text x="610" y="235" fill="#541B2A" fontSize="11" fontWeight="bold" textAnchor="middle">Sat</text>
                    <text x="710" y="235" fill="#75696B" fontSize="11" fontWeight="500" textAnchor="middle">Sun</text>
                  </svg>
                </div>
              </div>

              {/* ====================================================================
                  ROW 3: Kitchen Status (Left) + Payment Summary Pie Chart (Right)
                 ==================================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">

                {/* Kitchen Status Card (7 Cols) */}
                <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDD8] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8DDD8]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#541B2A] text-white flex items-center justify-center shadow-xs">
                          <ChefHat className="w-4 h-4 text-[#E6C687]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-[#2D2528]">Kitchen Status</h3>
                          <p className="text-[11px] text-[#75696B]">Real-time prep station performance</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F4ED] text-[11px] font-bold text-[#21845A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#21845A] animate-pulse"></span>
                        <span>Live Updates</span>
                      </span>
                    </div>

                    {/* 4 Circular Progress Gauges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 text-center">
                      {kitchenStatusMetrics.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center p-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8]/60 hover:border-[#873C50] transition-colors">
                          <div className="relative w-14 h-14 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="15.5" fill="transparent" stroke="#E8DDD8" strokeWidth="3" />
                              <circle
                                cx="18" cy="18" r="15.5" fill="transparent"
                                stroke={item.color}
                                strokeWidth="3.2"
                                strokeDasharray="97.4"
                                strokeDashoffset={97.4 - (97.4 * item.percentage) / 100}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute text-[11px] font-extrabold text-[#2D2528]">{item.percentage}%</span>
                          </div>
                          <p className="text-xs font-bold text-[#2D2528] mt-2 leading-tight">{item.label}</p>
                          <p className="text-[10px] text-[#75696B] font-medium mt-0.5">{item.orders}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-[#E8DDD8] flex items-center justify-between text-[11px] text-[#75696B]">
                    <span>Avg prep time: <strong className="text-[#2D2528]">14 mins</strong></span>
                    <button
                      onClick={() => setActiveSection('orders-kitchen')}
                      className="text-[11px] font-bold text-[#873C50] hover:underline"
                    >
                      View KDS Board →
                    </button>
                  </div>
                </div>

                {/* Payment Summary (Pie / Donut Chart) (5 Cols)
                    Matching Reference Images 2 & 4 with 3 Distinct Segment Colors */}
                <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDD8] shadow-xs flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8DDD8]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#541B2A] text-white flex items-center justify-center shadow-xs">
                          <CreditCard className="w-4 h-4 text-[#E6C687]" />
                        </div>
                        <h3 className="font-bold text-sm text-[#2D2528]">Payment Summary</h3>
                      </div>
                      <button
                        onClick={() => { setActiveSection('pos-reports'); setPosSubTab('payment'); }}
                        className="text-xs font-bold text-[#873C50] hover:text-[#541B2A] transition-colors hover:underline"
                      >
                        View Report →
                      </button>
                    </div>

                    {/* Body: Donut Chart + Corresponding Numbers in a Single Horizontal Line */}
                    <div className="pt-4 flex flex-row items-center justify-center gap-6 sm:gap-10">

                      {/* Donut Chart SVG with 3 Distinct Segment Colors */}
                      <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          {/* Base subtle track */}
                          <circle cx="50" cy="50" r="38" fill="transparent" stroke="#FAF7F5" strokeWidth="13" />

                          {/* Segment 1: UPI 48% (Deep Burgundy: #500F1D) */}
                          <circle
                            cx="50" cy="50" r="38"
                            fill="transparent"
                            stroke="#500F1D"
                            strokeWidth="13"
                            strokeDasharray="114.6 124.1"
                            strokeDashoffset="0"
                          />

                          {/* Segment 2: Card 32% (Warm Radiant Gold: #D4A017) */}
                          <circle
                            cx="50" cy="50" r="38"
                            fill="transparent"
                            stroke="#D4A017"
                            strokeWidth="13"
                            strokeDasharray="76.4 162.3"
                            strokeDashoffset="-114.6"
                          />

                          {/* Segment 3: Cash 20% (Distinct Emerald Jade: #227B5A) */}
                          <circle
                            cx="50" cy="50" r="38"
                            fill="transparent"
                            stroke="#227B5A"
                            strokeWidth="13"
                            strokeDasharray="47.7 191.0"
                            strokeDashoffset="-191.0"
                          />
                        </svg>

                        {/* Donut Center Label - Clean single horizontal line without breaking */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
                          <span className="font-sans font-extrabold text-lg sm:text-xl text-[#2D2528] leading-none whitespace-nowrap tracking-normal">
                            ₹48,750
                          </span>
                          <span className="text-[11px] font-medium text-[#75696B] mt-1 whitespace-nowrap">
                            Total Sales
                          </span>
                        </div>
                      </div>

                      {/* Corresponding Numbers in a Single Line alongside the Donut */}
                      <div className="flex flex-col justify-center space-y-3 min-w-[130px]">

                        {/* UPI */}
                        <div className="flex items-center justify-between text-xs font-semibold gap-6">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#500F1D] shrink-0 shadow-xs"></span>
                            <span className="text-[#2D2528] font-bold">UPI</span>
                          </div>
                          <span className="font-extrabold text-[#2D2528] text-sm">48%</span>
                        </div>

                        {/* Card */}
                        <div className="flex items-center justify-between text-xs font-semibold gap-6">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#D4A017] shrink-0 shadow-xs"></span>
                            <span className="text-[#2D2528] font-bold">Card</span>
                          </div>
                          <span className="font-extrabold text-[#2D2528] text-sm">32%</span>
                        </div>

                        {/* Cash - Distinct Emerald Green */}
                        <div className="flex items-center justify-between text-xs font-semibold gap-6">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#227B5A] shrink-0 shadow-xs"></span>
                            <span className="text-[#2D2528] font-bold">Cash</span>
                          </div>
                          <span className="font-extrabold text-[#2D2528] text-sm">20%</span>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* Bottom Highlight Pill */}
                  <div className="mt-4 py-2 px-3 rounded-xl bg-[#FAF3EE] border border-[#E8DDD8] flex items-center justify-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-[#21845A]" />
                    <span className="text-[11px] font-bold text-[#21845A]">+14%</span>
                    <span className="text-[11px] font-medium text-[#75696B]">vs yesterday</span>
                  </div>

                </div>

              </div>

              {/* ====================================================================
                  ROW 4: Recent Orders (Below Kitchen Status)
                 ==================================================================== */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDD8] shadow-xs">

                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DDD8]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#541B2A] text-white flex items-center justify-center shadow-xs">
                      <ShoppingBag className="w-4 h-4 text-[#E6C687]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#2D2528]">Recent Orders</h3>
                      <p className="text-[11px] text-[#75696B]">Live order queue across restaurant floor</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveSection('orders-kitchen')}
                    className="text-xs font-bold text-[#873C50] hover:text-[#541B2A] transition-colors hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-left text-xs">
                    <thead className="text-[10px] text-[#75696B] uppercase font-bold bg-[#FAF7F5] rounded-lg">
                      <tr>
                        <th className="py-2.5 px-3 rounded-l-lg">Order #</th>
                        <th className="py-2.5 px-3">Table</th>
                        <th className="py-2.5 px-3">Items</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right rounded-r-lg">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DDD8] text-xs">
                      {screenshotRecentOrders.map((ord, i) => (
                        <tr key={i} className="hover:bg-[#FAF7F5] transition-colors">
                          <td className="py-2.5 px-3 font-bold text-[#2D2528]">{ord.orderId}</td>
                          <td className="py-2.5 px-3 font-semibold text-[#541B2A]">{ord.table}</td>
                          <td className="py-2.5 px-3 text-[#75696B]">{ord.items}</td>
                          <td className="py-2.5 px-3 font-extrabold text-[#2D2528]">₹{ord.amount}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${ord.statusColor === 'green'
                              ? 'bg-[#E8F4ED] text-[#21845A]'
                              : 'bg-[#FFF4DF] text-[#B7791F]'
                              }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right text-[#75696B] font-medium">{ord.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* ====================================================================
                  ROW: Kitchen Delayed Orders (Actionable Kitchen Monitoring)
                 ==================================================================== */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDD8] shadow-xs">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8DDD8] gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#DC2626] text-white flex items-center justify-center shadow-xs">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#2D2528]">Kitchen Delayed Orders</h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[10px] font-bold text-[#DC2626] animate-pulse">
                          {kitchenDelayedOrders.length} Urgent
                        </span>
                      </div>
                      <p className="text-[11px] text-[#75696B]">Tickets exceeding standard preparation thresholds</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setActiveSection('orders-kitchen'); setKitchenFilterTab('Delayed / Cancelled'); }}
                    className="text-xs font-bold text-[#873C50] hover:text-[#541B2A] transition-colors hover:underline self-start sm:self-auto"
                  >
                    Manage Delays →
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-left text-xs">
                    <thead className="text-[10px] text-[#75696B] uppercase font-bold bg-[#FAF7F5] rounded-lg">
                      <tr>
                        <th className="py-2.5 px-3 rounded-l-lg">Order #</th>
                        <th className="py-2.5 px-3">Table</th>
                        <th className="py-2.5 px-3">Delayed Items</th>
                        <th className="py-2.5 px-3">Prep Station</th>
                        <th className="py-2.5 px-3">Target vs Elapsed</th>
                        <th className="py-2.5 px-3">Delay Reason</th>
                        <th className="py-2.5 px-3 text-center">Expedite</th>
                        <th className="py-2.5 px-3 text-center rounded-r-lg">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DDD8] text-xs">
                      {kitchenDelayedOrders.map((ord, i) => (
                        <tr key={i} className="hover:bg-[#FFF7F7] transition-colors">
                          <td className="py-2.5 px-3 font-bold text-[#DC2626]">{ord.id}</td>
                          <td className="py-2.5 px-3 font-bold text-[#541B2A]">{ord.table}</td>
                          <td className="py-2.5 px-3 font-medium text-[#2D2528]">{ord.items}</td>
                          <td className="py-2.5 px-3 text-[#75696B]">{ord.station}</td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-[#DC2626]">{ord.elapsed}</span>
                            <span className="text-[#75696B] text-[10px] ml-1">/ {ord.target} ({ord.delay})</span>
                          </td>
                          <td className="py-2.5 px-3 text-[#75696B] italic">{ord.reason}</td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setTransferToast(`Order ${ord.id} flagged as PRIORITY to Head Chef!`);
                                setTimeout(() => setTransferToast(null), 3500);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-[10px] transition-all shadow-2xs active:scale-95 cursor-pointer"
                            >
                              ⚡ Expedite
                            </button>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => { setActiveSection('orders-kitchen'); setKitchenFilterTab('Delayed / Cancelled'); }}
                                className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setTransferToast(`Editing delay notes for ${ord.id}`);
                                  setTimeout(() => setTransferToast(null), 3000);
                                }}
                                className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                title="Edit Notes"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setTransferToast(`Order ${ord.id} escalated to Floor Manager`);
                                  setTimeout(() => setTransferToast(null), 3000);
                                }}
                                className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                title="More Actions"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ====================================================================
                  ROW: Low Food Availability (Inventory Warning & Quick Toggles)
                 ==================================================================== */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDD8] shadow-xs">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8DDD8] gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#D97706] text-white flex items-center justify-center shadow-xs">
                      <Boxes className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#2D2528]">Low Food Availability</h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[10px] font-bold text-[#D97706]">
                          {lowStockDishes.length} Items Below Safe Threshold
                        </span>
                      </div>
                      <p className="text-[11px] text-[#75696B]">Menu dishes nearing stock exhaustion; toggle availability to prevent order rejects</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setActiveSection('food-menu'); setFoodMenuSubTab('out-of-stock'); }}
                    className="text-xs font-bold text-[#873C50] hover:text-[#541B2A] transition-colors hover:underline self-start sm:self-auto"
                  >
                    View Out of Stock →
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-left text-xs">
                    <thead className="text-[10px] text-[#75696B] uppercase font-bold bg-[#FAF7F5] rounded-lg">
                      <tr>
                        <th className="py-2.5 px-3 rounded-l-lg">Dish Name</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Stock Left</th>
                        <th className="py-2.5 px-3">Threshold</th>
                        <th className="py-2.5 px-3">Supplier</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-center">Availability Toggle</th>
                        <th className="py-2.5 px-3 text-center rounded-r-lg">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DDD8] text-xs">
                      {lowStockDishes.map((dish) => (
                        <tr key={dish.id} className="hover:bg-[#FAF7F5] transition-colors">
                          <td className="py-2.5 px-3 font-bold text-[#2D2528]">{dish.name}</td>
                          <td className="py-2.5 px-3 text-[#75696B]">{dish.category}</td>
                          <td className="py-2.5 px-3 font-extrabold text-[#DC2626]">{dish.stock} {dish.unit}</td>
                          <td className="py-2.5 px-3 text-[#75696B]">{dish.threshold} {dish.unit}</td>
                          <td className="py-2.5 px-3 text-[#75696B]">{dish.supplier}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${dish.status === 'Critical' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#FEF3C7] text-[#D97706]'
                              }`}>
                              ● {dish.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                const newStatus = dish.actionStatus === 'Available' ? 'Unavailable' : 'Available';
                                setLowStockDishes(prev => prev.map(d => d.id === dish.id ? { ...d, actionStatus: newStatus } : d));
                                setFoodItemsList(prev => prev.map(f => f.name.toLowerCase() === dish.name.toLowerCase() ? { ...f, available: newStatus === 'Available' } : f));
                                setTransferToast(`"${dish.name}" set to ${newStatus}`);
                                setTimeout(() => setTransferToast(null), 3000);
                              }}
                              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shadow-2xs cursor-pointer ${dish.actionStatus === 'Available'
                                ? 'bg-[#E8F4ED] text-[#21845A] hover:bg-[#D5EFE0]'
                                : 'bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FCD2D2]'
                                }`}
                            >
                              {dish.actionStatus === 'Available' ? '● Available (Click to Pause)' : '● Mark Available'}
                            </button>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => { setActiveSection('food-menu'); setFoodMenuSubTab('out-of-stock'); }}
                                className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setLowStockDishes(prev => prev.map(d => d.id === dish.id ? { ...d, stock: d.stock + 10, status: 'Optimal', actionStatus: 'Available' } : d));
                                  setTransferToast(`Restocked 10 units for ${dish.name}!`);
                                  setTimeout(() => setTransferToast(null), 3000);
                                }}
                                className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                title="Quick Restock +10"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setTransferToast(`Reorder requested from ${dish.supplier}`);
                                  setTimeout(() => setTransferToast(null), 3000);
                                }}
                                className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                title="Supplier Reorder"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ====================================================================
                  ROW 5: Today's Reservations (Below Recent Orders)
                 ==================================================================== */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDD8] shadow-xs">

                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DDD8]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#541B2A] text-white flex items-center justify-center shadow-xs">
                      <Calendar className="w-4 h-4 text-[#E6C687]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#2D2528]">Today's Reservations</h3>
                      <p className="text-[11px] text-[#75696B]">Bookings scheduled for today's dining shifts</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setActiveSection('tables-reservations'); setTableSubTab('reservations'); }}
                    className="text-xs font-bold text-[#873C50] hover:text-[#541B2A] transition-colors hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {/* Table matching Reference Image 4 */}
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-left text-xs">
                    <thead className="text-[11px] text-[#75696B] uppercase font-bold bg-[#FAF7F5] rounded-xl">
                      <tr>
                        <th className="py-3 px-4 rounded-l-xl">Time</th>
                        <th className="py-3 px-4">Guests</th>
                        <th className="py-3 px-4">Table</th>
                        <th className="py-3 px-4 text-right rounded-r-xl">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DDD8] text-xs">
                      {screenshotReservations.map((res, i) => (
                        <tr key={i} className="hover:bg-[#FAF7F5] transition-colors">
                          <td className="py-3.5 px-4 font-bold text-[#2D2528]">{res.time}</td>
                          <td className="py-3.5 px-4 text-[#75696B] font-semibold">{res.guests} Guests</td>
                          <td className="py-3.5 px-4 font-extrabold text-[#541B2A]">{res.table}</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${res.statusColor === 'green'
                              ? 'bg-[#E8F4ED] text-[#21845A]'
                              : 'bg-[#FFF4DF] text-[#B7791F]'
                              }`}>
                              {res.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Quick Actions (Full Width) */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDD8] shadow-xs">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E8DDD8]">
                  <Sparkles className="w-4 h-4 text-[#873C50]" />
                  <h3 className="font-bold text-sm text-[#2D2528]">Quick Actions</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                  <button
                    onClick={() => setActiveSection('orders-kitchen')}
                    className="p-3 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8] hover:border-[#541B2A] hover:bg-[#F5EBE4] transition-all flex flex-col items-center text-center group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DDD8] flex items-center justify-center text-[#541B2A] group-hover:bg-[#541B2A] group-hover:text-white transition-colors mb-1.5">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#2D2528]">Add Order</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('tables-reservations')}
                    className="p-3 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8] hover:border-[#541B2A] hover:bg-[#F5EBE4] transition-all flex flex-col items-center text-center group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DDD8] flex items-center justify-center text-[#541B2A] group-hover:bg-[#541B2A] group-hover:text-white transition-colors mb-1.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#2D2528]">Add Table</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('food-menu')}
                    className="p-3 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8] hover:border-[#541B2A] hover:bg-[#F5EBE4] transition-all flex flex-col items-center text-center group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DDD8] flex items-center justify-center text-[#541B2A] group-hover:bg-[#541B2A] group-hover:text-white transition-colors mb-1.5">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#2D2528]">View Menu</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('pos-reports')}
                    className="p-3 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8] hover:border-[#541B2A] hover:bg-[#F5EBE4] transition-all flex flex-col items-center text-center group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DDD8] flex items-center justify-center text-[#541B2A] group-hover:bg-[#541B2A] group-hover:text-white transition-colors mb-1.5">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#2D2528]">View Reports</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ====================================================================
              2. FOOD & MENU OPERATIONS (Exact Mockup Match)
             ==================================================================== */}
          {activeSection === 'food-menu' && (
            <div className="space-y-4 animate-fadeIn">

              {/* Food & Menu Header Section - Matching Screenshot Exactly */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5 pb-1">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#500F1D] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <UtensilsCrossed className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2528] tracking-tight leading-tight">
                      Food & Menu
                    </h2>
                    <p className="text-xs text-[#75696B] font-medium leading-tight mt-0.5">
                      Manage food items, categories and menu details
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAddItemModalOpen(true)}
                  className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#500F1D] hover:bg-[#3D0C1A] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" strokeWidth={2.4} />
                  <span>Add Food Item</span>
                </button>
              </div>

              {/* Navigation Tabs - 5 Specified Tabs */}
              <div className="flex flex-wrap items-center gap-2.5 pt-0.5 pb-0.5">
                {[
                  { id: 'availability', label: 'Food Availability' },
                  { id: 'out-of-stock', label: 'Out of Stock' },
                  { id: 'pricing', label: 'Food Price (Permissions)' },
                  { id: 'activation', label: 'Menu Activation' },
                  { id: 'schedule', label: 'Menu Schedule' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setFoodMenuSubTab(tab.id); setCurrentPage(1); }}
                    className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${foodMenuSubTab === tab.id || (tab.id === 'availability' && foodMenuSubTab === 'items')
                      ? 'bg-[#500F1D] text-white shadow-xs'
                      : 'bg-[#FAF5F0] hover:bg-white text-[#2D2528] border border-[#E8DDD8]'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Subtab 1: Food Items Table View (Matches Screenshot Exactly with Status column removed) */}
              {(foodMenuSubTab === 'availability' || foodMenuSubTab === 'items') && (
                <div className="space-y-4 sm:space-y-5">
                  {/* 4 Summary Stat Cards (Matches Reference Image Exactly) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* 1. Total Food Items */}
                    <div
                      onClick={() => { setSelectedMenuCategory('All'); setSelectedAvailability('All'); setSelectedDiet('All'); setSearchFoodQuery(''); setCurrentPage(1); }}
                      className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FAF0EA] flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-[#500F1D]" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="5" r="1.5" />
                          <path d="M4 17c.6-5.5 3.8-9 8-9s7.4 3.5 8 9H4z" />
                          <rect x="2" y="18" width="20" height="2" rx="1" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-[#75696B] font-medium">Total Food Items</p>
                        <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">48</div>
                        <div className="text-xs font-semibold text-[#16A34A] flex items-center gap-0.5 mt-0.5">
                          <span>↑ 2%</span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Categories */}
                    <div
                      onClick={() => setFoodMenuSubTab('categories')}
                      className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FAF0EA] flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-[#500F1D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" />
                          <rect x="14" y="3" width="7" height="7" rx="2" />
                          <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" />
                          <rect x="14" y="14" width="7" height="7" rx="2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-[#75696B] font-medium">Categories</p>
                        <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">7</div>
                        <div className="text-xs font-semibold text-[#16A34A] flex items-center gap-0.5 mt-0.5">
                          <span>↑ 1%</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Popular Items */}
                    <div
                      onClick={() => { setSelectedMenuCategory('All'); setCurrentPage(1); }}
                      className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FAF0EA] flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-[#500F1D]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-[#75696B] font-medium">Popular Items</p>
                        <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">12</div>
                        <div className="text-xs font-semibold text-[#16A34A] flex items-center gap-0.5 mt-0.5">
                          <span>↑ 5%</span>
                        </div>
                      </div>
                    </div>

                    {/* 4. Active Items */}
                    <div
                      onClick={() => { setSelectedAvailability('Available'); setCurrentPage(1); }}
                      className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FAF0EA] flex items-center justify-center shrink-0">
                        <div className="w-6 h-6 rounded-full bg-[#500F1D] flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[#75696B] font-medium">Active Items</p>
                        <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">46</div>
                        <div className="text-xs font-semibold text-[#16A34A] flex items-center gap-0.5 mt-0.5">
                          <span>↑ 96%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-[#E8DDD8] p-5 sm:p-6 shadow-xs">
                    {/* Search & Filters Bar */}
                    <div className="flex flex-col xl:flex-row xl:items-center gap-3 sm:gap-4 mb-5">
                      {/* Search Input expanding to fill space */}
                      <div className="relative flex-1 min-w-[220px]">
                        <Search className="w-4 h-4 text-[#75696B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search food items..."
                          value={searchFoodQuery}
                          onChange={(e) => { setSearchFoodQuery(e.target.value); setCurrentPage(1); }}
                          className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#2D2528] placeholder-[#75696B] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs"
                        />
                      </div>

                      {/* Filter Dropdowns */}
                      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                        {/* Category Dropdown */}
                        <div className="relative">
                          <select
                            value={selectedMenuCategory}
                            onChange={(e) => { setSelectedMenuCategory(e.target.value); setCurrentPage(1); }}
                            className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                          >
                            <option value="All">Category: All</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Italian">Italian</option>
                            <option value="American">American</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Combo">Combo</option>
                            <option value="Promo">Promo</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Food Type Dropdown */}
                        <div className="relative">
                          <select
                            value={selectedDiet}
                            onChange={(e) => { setSelectedDiet(e.target.value); setCurrentPage(1); }}
                            className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                          >
                            <option value="All">Food Type: All</option>
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Availability Dropdown */}
                        <div className="relative">
                          <select
                            value={selectedAvailability}
                            onChange={(e) => { setSelectedAvailability(e.target.value); setCurrentPage(1); }}
                            className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                          >
                            <option value="All">Availability: All</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Table with Status column removed */}
                    {(() => {
                      const filtered = foodItemsList.filter(item => {
                        if (selectedMenuCategory !== 'All' && item.category !== selectedMenuCategory) return false;
                        if (selectedCuisine !== 'All' && item.cuisine !== selectedCuisine) return false;
                        if (selectedDiet !== 'All' && item.diet !== selectedDiet) return false;
                        if (selectedAvailability !== 'All') {
                          if (selectedAvailability === 'Available' && !item.available) return false;
                          if (selectedAvailability === 'Unavailable' && item.available) return false;
                        }
                        if (searchFoodQuery.trim()) {
                          const q = searchFoodQuery.toLowerCase();
                          const matchesName = item.name.toLowerCase().includes(q);
                          const matchesDesc = (item.description || '').toLowerCase().includes(q);
                          const matchesCat = (item.category || '').toLowerCase().includes(q);
                          const matchesCuisine = (item.cuisine || '').toLowerCase().includes(q);
                          if (!matchesName && !matchesDesc && !matchesCat && !matchesCuisine) return false;
                        }
                        return true;
                      });

                      // 6 items per page matching screenshot: "Showing 1 – 6 of 48 items"
                      const itemsPerPage = 6;
                      const totalFiltered = filtered.length;
                      const totalPages = Math.max(1, Math.ceil(totalFiltered / itemsPerPage));
                      const validPage = Math.min(currentPage, totalPages);
                      const startIndex = (validPage - 1) * itemsPerPage;
                      const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

                      return (
                        <>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-[#FAF1EB] text-[#500F1D]">
                                  <th className="py-4 px-4 text-sm font-bold text-[#500F1D] rounded-l-2xl whitespace-nowrap">Food Item</th>
                                  <th className="py-4 px-4 text-sm font-bold text-[#500F1D] whitespace-nowrap">Category</th>
                                  <th className="py-4 px-4 text-sm font-bold text-[#500F1D] whitespace-nowrap">Cuisine</th>
                                  <th className="py-4 px-4 text-sm font-bold text-[#500F1D] whitespace-nowrap">Food Type</th>
                                  <th className="py-4 px-4 text-sm font-bold text-[#500F1D] whitespace-nowrap">Price</th>
                                  <th className="py-4 px-4 text-sm font-bold text-[#500F1D] whitespace-nowrap min-w-[130px]">Availability</th>
                                  <th className="py-4 px-4 text-sm font-bold text-[#500F1D] rounded-r-2xl whitespace-nowrap text-center min-w-[140px]">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.map((item) => (
                                  <tr key={item.id} className="hover:bg-[#FAF7F5] transition-colors border-b border-[#F0E6E1]/70">
                                    {/* Food Item */}
                                    <td className="py-4 px-4 font-bold text-sm sm:text-base text-[#2D2528] whitespace-nowrap">
                                      {item.name}
                                    </td>

                                    {/* Category */}
                                    <td className="py-4 px-4 font-semibold text-xs sm:text-sm text-[#4A3E3D] whitespace-nowrap">
                                      {item.category}
                                    </td>

                                    {/* Cuisine */}
                                    <td className="py-4 px-4 font-semibold text-xs sm:text-sm text-[#4A3E3D] whitespace-nowrap">
                                      {item.cuisine}
                                    </td>

                                    {/* Food Type */}
                                    <td className="py-4 px-4 font-semibold text-xs sm:text-sm text-[#4A3E3D] whitespace-nowrap">
                                      {item.diet}
                                    </td>

                                    {/* Price */}
                                    <td className="py-4 px-4 font-bold text-sm sm:text-base text-[#2D2528] whitespace-nowrap">
                                      ₹{item.price}
                                    </td>

                                    {/* Availability */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setFoodItemsList(prev => prev.map(f => f.id === item.id ? { ...f, available: !f.available } : f));
                                          setTransferToast(`"${item.name}" marked as ${!item.available ? 'Available' : 'Unavailable'}`);
                                          setTimeout(() => setTransferToast(null), 3000);
                                        }}
                                        title="Click to toggle availability (Manager Permission)"
                                        className="cursor-pointer group"
                                      >
                                        {item.available ? (
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F8F0] text-[#16A34A] shadow-2xs group-hover:bg-[#D4EFE0] transition-colors">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                                            <span>Available</span>
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEECEC] text-[#DC2626] shadow-2xs group-hover:bg-[#FCD4D4] transition-colors">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
                                            <span>Unavailable</span>
                                          </span>
                                        )}
                                      </button>
                                    </td>

                                    {/* Actions: Matching Second Reference Image Exactly */}
                                    <td className="py-4 px-4 whitespace-nowrap text-center">
                                      <div className="flex items-center justify-center gap-1.5 relative">
                                        {/* 1. View Dish */}
                                        <button
                                          type="button"
                                          onClick={() => setViewDishModal(item)}
                                          className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                          title="View Dish Details"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </button>

                                        {/* 2. Edit Dish */}
                                        <button
                                          type="button"
                                          onClick={() => setEditDishModal(item)}
                                          className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                          title="Edit Food Item"
                                        >
                                          <Pencil className="w-3.5 h-3.5" />
                                        </button>

                                        {/* 3. More Options */}
                                        <div className="relative">
                                          <button
                                            type="button"
                                            onClick={() => setOpenMoreMenuId(openMoreMenuId === item.id ? null : item.id)}
                                            className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                            title="More Options"
                                          >
                                            <MoreVertical className="w-4 h-4" />
                                          </button>

                                          {/* Dropdown Menu for More */}
                                          {openMoreMenuId === item.id && (
                                            <>
                                              <div
                                                className="fixed inset-0 z-20"
                                                onClick={() => setOpenMoreMenuId(null)}
                                              />
                                              <div className="absolute right-0 top-9 z-30 w-44 bg-white rounded-xl shadow-xl border border-[#E8DDD8] py-1 text-left text-xs">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    setFoodItemsList(prev => prev.map(f => f.id === item.id ? { ...f, available: !f.available } : f));
                                                    setOpenMoreMenuId(null);
                                                  }}
                                                  className="w-full px-3.5 py-2 text-left font-semibold text-[#15803D] hover:bg-[#FAF7F5] flex items-center gap-2"
                                                >
                                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                                                  <span>Toggle Availability</span>
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    handleDeleteDish(item.id, item.name);
                                                    setOpenMoreMenuId(null);
                                                  }}
                                                  className="w-full px-3.5 py-2 text-left font-semibold text-[#DC2626] hover:bg-[#FEECEC] flex items-center gap-2"
                                                >
                                                  <Trash2 className="w-3.5 h-3.5 text-[#DC2626]" />
                                                  <span>Delete Item</span>
                                                </button>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Pagination Footer matching screenshot */}
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 mt-2 border-t border-[#F0E6E1]/60 text-xs">
                            <span className="text-[#75696B] font-medium text-xs">
                              Showing {totalFiltered > 0 ? startIndex + 1 : 0} – {Math.min(startIndex + itemsPerPage, totalFiltered)} of {totalFiltered} items
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={validPage === 1}
                                className="w-7 h-7 rounded-lg border border-[#E8DDD8] bg-white flex items-center justify-center text-[#75696B] hover:bg-[#FAF7F5] hover:text-[#2D2528] disabled:opacity-40 transition-colors cursor-pointer"
                                aria-label="Previous Page"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>

                              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((pageNum) => (
                                <button
                                  key={pageNum}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${validPage === pageNum
                                    ? 'bg-[#500F1D] text-white shadow-xs'
                                    : 'border border-[#E8DDD8] bg-white text-[#75696B] hover:bg-[#FAF7F5] hover:text-[#2D2528]'
                                    }`}
                                >
                                  {pageNum}
                                </button>
                              ))}

                              <button
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={validPage >= totalPages}
                                className="w-7 h-7 rounded-lg border border-[#E8DDD8] bg-white flex items-center justify-center text-[#75696B] hover:bg-[#FAF7F5] hover:text-[#2D2528] disabled:opacity-40 transition-colors cursor-pointer"
                                aria-label="Next Page"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Subtab 2: Out of Stock (Instant Restock & Availability Management) */}
              {foodMenuSubTab === 'out-of-stock' && (
                <div className="space-y-4 sm:space-y-5">
                  {/* 4 Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-[#75696B] font-medium">Currently Unavailable</p>
                        <div className="text-2xl font-bold text-[#DC2626] leading-tight mt-0.5">
                          {foodItemsList.filter(f => !f.available).length} Dishes
                        </div>
                        <p className="text-[11px] text-[#75696B] mt-0.5">Marked 86 by Manager</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                        <Boxes className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-[#75696B] font-medium">Low Stock Warning</p>
                        <div className="text-2xl font-bold text-[#D97706] leading-tight mt-0.5">{lowStockDishes.length} Items</div>
                        <p className="text-[11px] text-[#15803D] mt-0.5">Reorder auto-triggered</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#FAF2EB] text-[#500F1D] flex items-center justify-center shrink-0">
                        <Flame className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-[#75696B] font-medium">High Demand Paused</p>
                        <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">1 (Paneer Tikka)</div>
                        <p className="text-[11px] text-[#75696B] mt-0.5">Awaiting batch restock</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#E8F4ED] text-[#21845A] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-[#75696B] font-medium">Restocked Today</p>
                        <div className="text-2xl font-bold text-[#21845A] leading-tight mt-0.5">8 Dishes</div>
                        <p className="text-[11px] text-[#21845A] mt-0.5">Available for dining</p>
                      </div>
                    </div>
                  </div>

                  {/* Out of Stock Table */}
                  <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                    <div className="p-4 sm:p-5 border-b border-[#F0E6DF] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-base text-[#2D2528]">Out of Stock & Unavailable Food Items</h3>
                        <p className="text-xs text-[#75696B]">Manager can instantly reactivate dishes when fresh stock is received</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFoodItemsList(prev => prev.map(f => ({ ...f, available: true })));
                          setTransferToast("All menu items marked as Available!");
                          setTimeout(() => setTransferToast(null), 3000);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] font-bold text-xs shadow-2xs transition-all cursor-pointer self-start sm:self-auto"
                      >
                        ✓ Mark All Available
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FAF1EB]">
                          <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                            <th className="py-4 px-5 rounded-l-2xl whitespace-nowrap">Food Item</th>
                            <th className="py-4 px-4 whitespace-nowrap">Category</th>
                            <th className="py-4 px-4 whitespace-nowrap">Price</th>
                            <th className="py-4 px-4 whitespace-nowrap">Reason</th>
                            <th className="py-4 px-4 whitespace-nowrap">Status</th>
                            <th className="py-4 px-4 text-center whitespace-nowrap">Manager Action</th>
                            <th className="py-4 px-4 text-center rounded-r-2xl whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5EDE8] text-xs sm:text-sm">
                          {foodItemsList.filter(f => !f.available).map((item) => (
                            <tr key={item.id} className="hover:bg-[#FAF7F5] transition-colors">
                              <td className="py-4 px-5 font-bold text-[#2D2528] flex items-center gap-3">
                                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover border border-[#E8DDD8]" />
                                <div>
                                  <p className="font-bold text-[#2D2528]">{item.name}</p>
                                  <p className="text-[11px] text-[#75696B] font-normal">{item.cuisine} • {item.diet}</p>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-[#75696B] font-semibold">{item.category}</td>
                              <td className="py-4 px-4 font-extrabold text-[#2D2528]">₹{item.price}</td>
                              <td className="py-4 px-4 text-[#DC2626] font-medium">Stock Depleted / High Demand</td>
                              <td className="py-4 px-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEECEC] text-[#DC2626]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
                                  <span>Unavailable</span>
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFoodItemsList(prev => prev.map(f => f.id === item.id ? { ...f, available: true } : f));
                                    setTransferToast(`"${item.name}" marked as Available!`);
                                    setTimeout(() => setTransferToast(null), 3000);
                                  }}
                                  className="px-3.5 py-1.5 rounded-xl bg-[#21845A] hover:bg-[#1A6C49] text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
                                >
                                  ✓ Mark Available & Restock
                                </button>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setViewDishModal(item)}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                    title="View Dish"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditDishModal(item)}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                    title="Edit Details"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTransferToast(`Stock reorder alert sent for ${item.name}`);
                                      setTimeout(() => setTransferToast(null), 3000);
                                    }}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                    title="More Options"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 3: Food Price (Based on Permissions) */}
              {foodMenuSubTab === 'pricing' && (
                <div className="space-y-4 sm:space-y-5">
                  {/* Manager Permission Badge Card */}
                  <div className="bg-gradient-to-r from-[#500F1D] to-[#3B0E1B] rounded-3xl p-5 sm:p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#E5A81E] shrink-0 border border-white/20">
                        <ShieldCheck className="w-6 h-6 text-[#E5A81E]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-bold text-lg text-white">Manager Pricing Authority</h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#16A34A] text-white text-[10px] font-bold">
                            Active Permission
                          </span>
                        </div>
                        <p className="text-xs text-white/80 mt-0.5">
                          Logged in as {managerProfile.name} (Role: Manager) • Authorized to adjust base prices, apply discounts, and configure seasonal rates.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-white/70">Audit Logging</p>
                      <p className="text-sm font-bold text-[#E5A81E]">Enabled • All price edits logged</p>
                    </div>
                  </div>

                  {/* Pricing Table */}
                  <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                    <div className="p-4 sm:p-5 border-b border-[#F0E6DF] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-base text-[#2D2528]">Food Price Management</h3>
                        <p className="text-xs text-[#75696B]">View base cost, dining price, discount percentage and tax rate</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FAF1EB]">
                          <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                            <th className="py-4 px-5 rounded-l-2xl whitespace-nowrap">Food Item</th>
                            <th className="py-4 px-4 whitespace-nowrap">Category</th>
                            <th className="py-4 px-4 whitespace-nowrap">Dine-in Price</th>
                            <th className="py-4 px-4 whitespace-nowrap">Takeaway Price</th>
                            <th className="py-4 px-4 whitespace-nowrap">Discount %</th>
                            <th className="py-4 px-4 whitespace-nowrap">GST (5%)</th>
                            <th className="py-4 px-4 whitespace-nowrap">Permission</th>
                            <th className="py-4 px-4 text-center rounded-r-2xl whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5EDE8] text-xs sm:text-sm">
                          {foodItemsList.slice(0, 10).map((item) => (
                            <tr key={item.id} className="hover:bg-[#FAF7F5] transition-colors">
                              <td className="py-4 px-5 font-bold text-[#2D2528]">
                                <div className="flex items-center gap-3">
                                  <img src={item.image} alt={item.name} className="w-9 h-9 rounded-xl object-cover border border-[#E8DDD8]" />
                                  <span>{item.name}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-[#75696B] font-semibold">{item.category}</td>
                              <td className="py-4 px-4 font-bold text-[#2D2528]">₹{item.price}</td>
                              <td className="py-4 px-4 font-semibold text-[#75696B]">₹{Math.round(item.price * 0.95)}</td>
                              <td className="py-4 px-4 font-bold text-[#15803D]">0%</td>
                              <td className="py-4 px-4 text-[#75696B]">₹{(item.price * 0.05).toFixed(1)}</td>
                              <td className="py-4 px-4">
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#500F1D] bg-[#FAF2EB] px-2.5 py-1 rounded-full">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#500F1D]" />
                                  <span>Manager Override</span>
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setPriceEditModal({ id: item.id, name: item.name, price: item.price, category: item.category })}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                    title="View Pricing"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setPriceEditModal({ id: item.id, name: item.name, price: item.price, category: item.category })}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                    title="Edit Price (Permission Approved)"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTransferToast(`Price history exported for ${item.name}`);
                                      setTimeout(() => setTransferToast(null), 3000);
                                    }}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                    title="Audit Log"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 4: Menu Activation (Shifts & Live Service Toggles) */}
              {foodMenuSubTab === 'activation' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="bg-white rounded-3xl border border-[#E8DDD8] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#2D2528]">Restaurant Menu Shifts & Activation</h3>
                      <p className="text-xs text-[#75696B] mt-0.5">Toggle service menus live across POS terminals, online ordering, and digital tablets</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#E8F4ED] text-[#21845A] font-bold text-xs">
                      ● Operating Hours: 11:00 AM – 11:00 PM
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuShifts.map((shift) => (
                      <div
                        key={shift.id}
                        className={`rounded-3xl p-5 border transition-all duration-300 ${shift.active
                          ? 'bg-white border-[#500F1D]/30 shadow-md'
                          : 'bg-[#FAF7F5] border-[#E8DDD8] opacity-75'
                          }`}
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-[#F0E6DF]">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${shift.active ? 'bg-[#500F1D] text-white' : 'bg-[#E8DDD8] text-[#75696B]'}`}>
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-[#2D2528]">{shift.name}</h4>
                              <p className="text-[11px] text-[#75696B] font-medium">{shift.hours}</p>
                            </div>
                          </div>

                          {/* Toggle Switch */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={shift.active}
                              onChange={() => {
                                setMenuShifts(prev => prev.map(s => s.id === shift.id ? { ...s, active: !s.active } : s));
                                setTransferToast(`${shift.name} is now ${!shift.active ? 'Activated' : 'Deactivated'}`);
                                setTimeout(() => setTransferToast(null), 3000);
                              }}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#E8DDD8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E8DDD8] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#500F1D]"></div>
                          </label>
                        </div>

                        <div className="py-3 text-xs text-[#75696B] space-y-1.5">
                          <p>{shift.description}</p>
                          <div className="flex items-center justify-between text-xs font-semibold pt-1">
                            <span className="text-[#2D2528]">Active Catalog:</span>
                            <span className="text-[#500F1D] font-bold">{shift.itemsCount} Items</span>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${shift.active ? 'bg-[#E8F4ED] text-[#21845A]' : 'bg-[#E8DDD8] text-[#75696B]'}`}>
                            {shift.active ? '● Live in Kitchen' : '○ Disabled'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setTransferToast(`Editing items for ${shift.name}`);
                              setTimeout(() => setTransferToast(null), 2500);
                            }}
                            className="text-xs font-bold text-[#873C50] hover:underline"
                          >
                            Configure Items →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subtab 5: Menu Schedule (Weekly Automated Roster) */}
              {foodMenuSubTab === 'schedule' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="bg-white rounded-3xl border border-[#E8DDD8] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#2D2528]">Weekly Menu Schedule</h3>
                      <p className="text-xs text-[#75696B] mt-0.5">Automated timetable for activating themed menus, buffet setups and station assignments</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setTransferToast("Schedule template updated successfully!");
                        setTimeout(() => setTransferToast(null), 3000);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#500F1D] text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#3D0B16] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Schedule Rule</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FAF1EB]">
                          <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                            <th className="py-4 px-5 rounded-l-2xl whitespace-nowrap">Day Schedule</th>
                            <th className="py-4 px-4 whitespace-nowrap">Shift Name</th>
                            <th className="py-4 px-4 whitespace-nowrap">Timing Window</th>
                            <th className="py-4 px-4 whitespace-nowrap">Menu Theme</th>
                            <th className="py-4 px-4 whitespace-nowrap">Assigned Station</th>
                            <th className="py-4 px-4 whitespace-nowrap">Status</th>
                            <th className="py-4 px-4 text-center rounded-r-2xl whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5EDE8] text-xs sm:text-sm">
                          {menuSchedules.map((sch) => (
                            <tr key={sch.id} className="hover:bg-[#FAF7F5] transition-colors">
                              <td className="py-4 px-5 font-bold text-[#2D2528]">{sch.day}</td>
                              <td className="py-4 px-4 font-semibold text-[#500F1D]">{sch.shift}</td>
                              <td className="py-4 px-4 text-[#2D2528] font-medium">{sch.timing}</td>
                              <td className="py-4 px-4 text-[#75696B]">{sch.theme}</td>
                              <td className="py-4 px-4 text-[#75696B]">{sch.station}</td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${sch.status === 'Active' ? 'bg-[#E8F4ED] text-[#21845A]' : 'bg-[#FEF3C7] text-[#D97706]'
                                  }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${sch.status === 'Active' ? 'bg-[#21845A]' : 'bg-[#D97706]'}`}></span>
                                  <span>{sch.status}</span>
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTransferToast(`Viewing schedule rule #${sch.id}`);
                                      setTimeout(() => setTransferToast(null), 2500);
                                    }}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                    title="View Schedule"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTransferToast(`Editing timing for ${sch.shift}`);
                                      setTimeout(() => setTransferToast(null), 2500);
                                    }}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                    title="Edit Schedule"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTransferToast(`Duplicating schedule rule #${sch.id}`);
                                      setTimeout(() => setTransferToast(null), 2500);
                                    }}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                                    title="More Options"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ====================================================================
              3. ORDERS & KITCHEN MONITORING
             ==================================================================== */}
          {activeSection === 'orders-kitchen' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#500F1D] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4c-.5 0-1 .5-1 1v1.1C6.6 6.6 3 10.8 3 16h18c0-5.2-3.6-9.4-8-9.9V5c0-.5-.5-1-1-1z" />
                      <path d="M2 19h20" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2528] tracking-tight">Order & Kitchen</h1>
                    <p className="text-xs sm:text-sm text-[#75696B] mt-0.5">Track orders by table and manage kitchen operations.</p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setKitchenFilterTab('All Orders')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow active:scale-98"
                  >
                    <span>View All Orders</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4 Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. Total Orders */}
                <div
                  onClick={() => setKitchenFilterTab('All Orders')}
                  className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF2EB] flex items-center justify-center shrink-0">
                    <Utensils className="w-5 h-5 text-[#500F1D]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#75696B] font-medium">Total Orders</p>
                    <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">24</div>
                    <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5 mt-0.5">
                      <span>↑ 12%</span>
                    </div>
                  </div>
                </div>

                {/* 2. In Progress */}
                <div
                  onClick={() => setKitchenFilterTab('In Progress')}
                  className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF2EB] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#500F1D]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#75696B] font-medium">In Progress</p>
                    <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">12</div>
                    <div className="text-xs font-semibold text-[#D97706] flex items-center gap-0.5 mt-0.5">
                      <span>↑ 8%</span>
                    </div>
                  </div>
                </div>

                {/* 3. Ready to Serve */}
                <div
                  onClick={() => setKitchenFilterTab('Ready to Serve')}
                  className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF2EB] flex items-center justify-center shrink-0">
                    <div className="w-7 h-7 rounded-full bg-[#500F1D] flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#75696B] font-medium">Ready to Serve</p>
                    <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">8</div>
                    <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5 mt-0.5">
                      <span>↑ 4%</span>
                    </div>
                  </div>
                </div>

                {/* 4. Pending */}
                <div
                  onClick={() => setKitchenFilterTab('Pending')}
                  className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF2EB] flex items-center justify-center shrink-0">
                    <Hourglass className="w-5 h-5 text-[#500F1D]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#75696B] font-medium">Pending</p>
                    <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">4</div>
                    <div className="text-xs font-semibold text-[#DC2626] flex items-center gap-0.5 mt-0.5">
                      <span>↑ 2%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Tabs - 5 Specified Tabs */}
              <div className="flex flex-wrap items-center gap-2.5">
                {['All Orders', 'Pending', 'Preparing', 'Ready', 'Delayed / Cancelled'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setKitchenFilterTab(tab)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${kitchenFilterTab === tab
                      ? 'bg-[#500F1D] text-white shadow-xs'
                      : 'bg-[#FAF5F0] hover:bg-[#F2EAE4] text-[#4A3E3D]'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Orders Table Container */}
              <div className="bg-white rounded-3xl border border-[#E8DDD8] p-4 sm:p-6 shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#FAF1EB]">
                      <tr className="text-[#500F1D] font-bold text-sm">
                        <th className="py-3.5 px-5 rounded-l-2xl text-left whitespace-nowrap">Table No.</th>
                        <th className="py-3.5 px-4 text-left whitespace-nowrap">Order ID / KOT</th>
                        <th className="py-3.5 px-4 text-left whitespace-nowrap">Items</th>
                        <th className="py-3.5 px-4 text-left whitespace-nowrap">Kitchen Station</th>
                        <th className="py-3.5 px-4 text-left whitespace-nowrap">Elapsed / Target</th>
                        <th className="py-3.5 px-4 text-left whitespace-nowrap">Prep Progress</th>
                        <th className="py-3.5 px-4 text-left whitespace-nowrap">Status</th>
                        <th className="py-3.5 px-4 rounded-r-2xl text-center whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5EDE8]">
                      {kitchenOrders
                        .filter((ord) => {
                          if (kitchenFilterTab === 'All Orders') return true;
                          if (kitchenFilterTab === 'Pending') return ord.status === 'Pending';
                          if (kitchenFilterTab === 'Preparing') return ord.status === 'Preparing' || ord.status === 'In Progress';
                          if (kitchenFilterTab === 'Ready') return ord.status === 'Ready' || ord.status === 'Ready to Serve';
                          if (kitchenFilterTab === 'Delayed / Cancelled') return ord.isDelayed || ord.status === 'Delayed' || ord.status === 'Cancelled';
                          return true;
                        })
                        .map((ord) => (
                          <React.Fragment key={ord.orderId}>
                            <tr className={`hover:bg-[#FAF7F5] transition-colors ${ord.isDelayed ? 'bg-[#FFF5F5]/60' : ''}`}>
                              {/* Table No. */}
                              <td className="py-4 px-5 whitespace-nowrap">
                                <span className="inline-flex items-center justify-center bg-[#FAF2EB] text-[#500F1D] font-bold text-sm px-3.5 py-1.5 rounded-lg min-w-[50px]">
                                  {ord.table}
                                </span>
                              </td>

                              {/* Order Id & KOT */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                <div className="font-bold text-[#2D2528] text-sm">{ord.orderId}</div>
                                <div className="text-[11px] text-[#75696B] font-semibold">{ord.kotId || 'KOT-800'}</div>
                              </td>

                              {/* Items */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => setExpandedKitchenOrder(expandedKitchenOrder === ord.orderId ? null : ord.orderId)}
                                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D2528] hover:text-[#500F1D] transition-colors cursor-pointer"
                                >
                                  <span>{ord.itemsCount}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-[#75696B] transition-transform duration-200 ${expandedKitchenOrder === ord.orderId ? 'rotate-180 text-[#500F1D]' : ''}`} />
                                </button>
                              </td>

                              {/* Kitchen Station */}
                              <td className="py-4 px-4 whitespace-nowrap text-xs font-semibold text-[#541B2A]">
                                {ord.station || 'Hot Kitchen'}
                              </td>

                              {/* Elapsed / Target */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                <div className="text-xs font-bold text-[#2D2528]">{ord.elapsed || '10 mins'}</div>
                                <div className="text-[11px] text-[#75696B]">Target: {ord.target || '15 mins'}</div>
                              </td>

                              {/* Prep Progress */}
                              <td className="py-4 px-4 whitespace-nowrap min-w-[140px]">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2 bg-[#FAF0EA] rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all duration-500 ${ord.status === 'Cancelled' ? 'bg-[#9CA3AF]' :
                                        ord.isDelayed ? 'bg-[#DC2626]' :
                                          ord.progress >= 100 ? 'bg-[#16A34A]' :
                                            ord.progress >= 50 ? 'bg-[#D97706]' : 'bg-[#EAB308]'
                                        }`}
                                      style={{ width: `${ord.progress ?? 50}%` }}
                                    />
                                  </div>
                                  <span className="text-[11px] font-bold text-[#2D2528]">{ord.progress ?? 50}%</span>
                                </div>
                                {ord.delayReason && (
                                  <p className="text-[10px] text-[#DC2626] font-medium italic mt-0.5 max-w-[180px] truncate">{ord.delayReason}</p>
                                )}
                              </td>

                              {/* Status */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${ord.status === 'Cancelled' ? 'bg-[#F3F4F6] text-[#4B5563]' :
                                  ord.status === 'Delayed' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                                    ord.status === 'Ready' || ord.status === 'Ready to Serve' ? 'bg-[#DCFCE7] text-[#15803D]' :
                                      ord.status === 'Pending' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                                        'bg-[#FEF9C3] text-[#B45309]'
                                  }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${ord.status === 'Cancelled' ? 'bg-[#6B7280]' :
                                    ord.status === 'Delayed' ? 'bg-[#DC2626]' :
                                      ord.status === 'Ready' || ord.status === 'Ready to Serve' ? 'bg-[#16A34A]' :
                                        ord.status === 'Pending' ? 'bg-[#DC2626]' :
                                          'bg-[#D97706]'
                                    }`}></span>
                                  {ord.status}
                                </span>
                              </td>

                              {/* Actions: Matching Second Reference Image Exactly */}
                              <td className="py-4 px-4 whitespace-nowrap text-center">
                                <div className="flex items-center justify-center gap-1.5 relative">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedOrderModal(ord)}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                    title="View Order Details"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedOrderModal(ord)}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                    title="Update Order Status"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setExpandedKitchenOrder(expandedKitchenOrder === ord.orderId ? null : ord.orderId)}
                                    className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                    title="Toggle Items List"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* Expanded Items Drawer */}
                            {expandedKitchenOrder === ord.orderId && (
                              <tr className="bg-[#FAF7F5]/80">
                                <td colSpan={8} className="py-3 px-6">
                                  <div className="p-3 bg-white rounded-xl border border-[#E8DDD8] max-w-md">
                                    <div className="text-xs font-bold text-[#500F1D] mb-2 flex items-center justify-between">
                                      <span>Items in {ord.orderId} (Table {ord.table})</span>
                                      <span className="text-[#75696B] font-normal">{ord.time}</span>
                                    </div>
                                    <div className="space-y-1.5">
                                      {ord.itemsList?.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs text-[#2D2528] font-medium py-1 border-b border-[#F5EDE8] last:border-b-0">
                                          <span>• {item.name}</span>
                                          <div className="flex items-center gap-3">
                                            <span className="text-[#75696B]">Qty: {item.qty}</span>
                                            <span className="font-bold text-[#500F1D]">₹{item.price}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              4. TABLE & RESERVATION MANAGEMENT
             ==================================================================== */}
          {activeSection === 'tables-reservations' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Luxury Header Banner */}
              <div
                className="relative rounded-3xl overflow-hidden p-6 sm:p-7 shadow-sm border border-[#E8DDD8]"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(20, 10, 10, 0.94) 0%, rgba(35, 15, 18, 0.88) 50%, rgba(20, 10, 10, 0.92) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 flex items-center justify-center text-[#E5A81E] shrink-0">
                      <svg className="w-10 h-10 text-[#E5A81E]" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="5" cy="8" r="2.2" />
                        <path d="M3 13c0-1.5 1-2.5 2.5-2.5h.5v6H4v3H2v-3.5c0-1.5.5-3 1-3z" />
                        <rect x="7" y="11" width="10" height="2.5" rx="1" />
                        <path d="M8.5 13.5v7.5H10v-6h4v6h1.5v-7.5z" />
                        <circle cx="19" cy="8" r="2.2" />
                        <path d="M21 13c0-1.5-1-2.5-2.5-2.5h-.5v6h2v3h2v-3.5c0-1.5-.5-3-1-3z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Table Management</h1>
                      <p className="text-xs sm:text-sm text-[#F5EDE8]/90 mt-0.5">Manage your restaurant tables, view status and update availability.</p>
                    </div>
                  </div>

                  {/* Location Toggle Pills */}
                  <div className="inline-flex items-center p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setTableLocationHeader('Indoor Hall')}
                      className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${tableLocationHeader === 'Indoor Hall'
                        ? 'bg-[#500F1D] text-white shadow-sm'
                        : 'text-white hover:text-white/80'
                        }`}
                    >
                      Indoor Hall
                    </button>
                    <button
                      type="button"
                      onClick={() => setTableLocationHeader('Outdoor Terrace')}
                      className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${tableLocationHeader === 'Outdoor Terrace'
                        ? 'bg-[#500F1D] text-white shadow-sm'
                        : 'text-white hover:text-white/80'
                        }`}
                    >
                      Outdoor Terrace
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Summary KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. 2 Seater Tables */}
                <div
                  onClick={() => { setTableCapacityFilter('2 Seater'); setTableCurrentPage(1); }}
                  className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#500F1D] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <TableTwoSeaterIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[#75696B] font-medium">2 Seater Tables</p>
                      <div className="text-xl font-serif font-bold text-[#2D2528] leading-tight mt-0.5">5 Total</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-right text-xs">
                    <div className="flex items-center justify-end gap-1.5 font-medium text-[#2D2528]">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                      <span>3 Available</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5 font-medium text-[#2D2528]">
                      <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                      <span>2 Reserved</span>
                    </div>
                  </div>
                </div>

                {/* 2. 4 Seater Tables */}
                <div
                  onClick={() => { setTableCapacityFilter('4 Seater'); setTableCurrentPage(1); }}
                  className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#E5A81E] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <TableFourSeaterIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[#75696B] font-medium">4 Seater Tables</p>
                      <div className="text-xl font-serif font-bold text-[#2D2528] leading-tight mt-0.5">6 Total</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-right text-xs">
                    <div className="flex items-center justify-end gap-1.5 font-medium text-[#2D2528]">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                      <span>4 Available</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5 font-medium text-[#2D2528]">
                      <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                      <span>2 Reserved</span>
                    </div>
                  </div>
                </div>

                {/* 3. 6 Seater Tables */}
                <div
                  onClick={() => { setTableCapacityFilter('6 Seater'); setTableCurrentPage(1); }}
                  className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#500F1D] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <TableSixSeaterIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[#75696B] font-medium">6 Seater Tables</p>
                      <div className="text-xl font-serif font-bold text-[#2D2528] leading-tight mt-0.5">5 Total</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-right text-xs">
                    <div className="flex items-center justify-end gap-1.5 font-medium text-[#2D2528]">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                      <span>3 Available</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5 font-medium text-[#2D2528]">
                      <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                      <span>2 Reserved</span>
                    </div>
                  </div>
                </div>

                {/* 4. Total Tables */}
                <div
                  onClick={() => { setTableCapacityFilter('All Capacity'); setTableStatusFilter('All Status'); setTableLocationFilter('All Tables'); setTableCurrentPage(1); }}
                  className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#F5E8D3] flex items-center justify-center text-[#9E731C] shrink-0 shadow-xs">
                      <Layers className="w-6 h-6 text-[#9E731C]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#75696B] font-medium">Total Tables</p>
                      <div className="text-2xl font-serif font-bold text-[#2D2528] leading-tight mt-0.5">16</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-right text-xs">
                    <div className="flex items-center justify-end gap-1.5 font-medium text-[#2D2528]">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                      <span>10 Available</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5 font-medium text-[#2D2528]">
                      <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                      <span>6 Reserved</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5 font-medium text-[#2D2528]">
                      <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
                      <span>0 Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unified Tables Management Card (Filters + Search + Table + Pagination) */}
              <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                {/* Integrated Filters & Actions Toolbar */}
                <div className="p-4 sm:p-5 border-b border-[#F0E6DF] bg-white">
                  <div className="flex flex-col xl:flex-row xl:items-center gap-3 sm:gap-4 w-full">
                    {/* Left Dropdown Filters */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {/* All Tables Dropdown */}
                      <div className="relative">
                        <select
                          value={tableLocationFilter}
                          onChange={(e) => { setTableLocationFilter(e.target.value); setTableCurrentPage(1); }}
                          className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                        >
                          <option value="All Tables">All Tables</option>
                          <option value="Indoor Hall">Indoor Hall</option>
                          <option value="Outdoor Terrace">Outdoor Terrace</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* All Status Dropdown */}
                      <div className="relative">
                        <select
                          value={tableStatusFilter}
                          onChange={(e) => { setTableStatusFilter(e.target.value); setTableCurrentPage(1); }}
                          className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                        >
                          <option value="All Status">All Status</option>
                          <option value="Available">Available</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* All Capacity Dropdown */}
                      <div className="relative">
                        <select
                          value={tableCapacityFilter}
                          onChange={(e) => { setTableCapacityFilter(e.target.value); setTableCurrentPage(1); }}
                          className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                        >
                          <option value="All Capacity">All Capacity</option>
                          <option value="2 Seater">2 Seater</option>
                          <option value="4 Seater">4 Seater</option>
                          <option value="6 Seater">6 Seater</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Date Picker Button */}
                      <div className="relative">
                        <input
                          type="date"
                          value={tableSelectedDate}
                          onChange={(e) => setTableSelectedDate(e.target.value)}
                          className="bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Middle: Search Bar Expanding to Cover All Space Between Filters and Add Button */}
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="w-4 h-4 text-[#75696B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by Table No, Capacity, Location..."
                        value={tableSearchQuery}
                        onChange={(e) => { setTableSearchQuery(e.target.value); setTableCurrentPage(1); }}
                        className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-[#2D2528] placeholder-[#75696B] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs"
                      />
                    </div>

                    {/* Right: Add Table Button */}
                    <button
                      type="button"
                      onClick={() => setAddTableModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 shrink-0 cursor-pointer self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Table</span>
                    </button>
                  </div>
                </div>

                {/* Tables Table */}
                <div className="p-4 sm:p-6 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#FAF1EB]">
                      <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                        <th className="w-14 text-center py-3.5 px-3 rounded-l-2xl">#</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Table No.</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Capacity</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Price</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Location</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">Current Booking</th>
                        <th className="py-3.5 px-4 whitespace-nowrap text-center rounded-r-2xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5EDE8]">
                      {tableManagementList
                        .filter(tbl => {
                          if (tableLocationFilter !== 'All Tables' && tbl.location !== tableLocationFilter) return false;
                          if (tableStatusFilter !== 'All Status' && tbl.status !== tableStatusFilter) return false;
                          if (tableCapacityFilter !== 'All Capacity' && tbl.capacity !== tableCapacityFilter) return false;
                          if (tableSearchQuery.trim()) {
                            const q = tableSearchQuery.toLowerCase().trim();
                            if (!tbl.tableNo.toLowerCase().includes(q) && !tbl.booking.toLowerCase().includes(q)) return false;
                          }
                          return true;
                        })
                        .slice((tableCurrentPage - 1) * tableRowsPerPage, tableCurrentPage * tableRowsPerPage)
                        .map((tbl) => (
                          <tr key={tbl.id} className="hover:bg-[#FAF7F5] transition-colors">
                            {/* # */}
                            <td className="text-center py-4 px-3 font-semibold text-xs sm:text-sm text-[#2D2528]">
                              {tbl.id}
                            </td>

                            {/* Table No. */}
                            <td className="py-4 px-4 font-bold text-sm text-[#2D2528] whitespace-nowrap">
                              {tbl.tableNo}
                            </td>

                            {/* Capacity */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2D2528]">
                                {tbl.capacity === '2 Seater' && <TableTwoSeaterIcon className="w-5 h-5 text-[#500F1D]" />}
                                {tbl.capacity === '4 Seater' && <TableFourSeaterIcon className="w-5 h-5 text-[#500F1D]" />}
                                {tbl.capacity === '6 Seater' && <TableSixSeaterIcon className="w-5 h-5 text-[#500F1D]" />}
                                <span>{tbl.capacity}</span>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="py-4 px-4 font-bold text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                              ₹{tbl.price.toLocaleString()}
                            </td>

                            {/* Location */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#FAF2EB] text-[#500F1D]">
                                <MapPin className="w-3.5 h-3.5 text-[#500F1D] shrink-0" />
                                <span>{tbl.location}</span>
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${tbl.status === 'Available' ? 'bg-[#DCFCE7] text-[#15803D]' :
                                tbl.status === 'Reserved' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                                  'bg-[#FEF9C3] text-[#B45309]'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${tbl.status === 'Available' ? 'bg-[#16A34A]' :
                                  tbl.status === 'Reserved' ? 'bg-[#DC2626]' :
                                    'bg-[#D97706]'
                                  }`}></span>
                                {tbl.status}
                              </span>
                            </td>

                            {/* Current Booking */}
                            <td className="py-4 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                              {tbl.booking}
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center gap-1.5 relative">
                                <button
                                  type="button"
                                  onClick={() => setSelectedTableDetailsModal(tbl)}
                                  className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                  title="View Table Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditTableModal(tbl)}
                                  className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                  title="Edit Table"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setActiveTableMoreMenuId(activeTableMoreMenuId === tbl.id ? null : tbl.id)}
                                  className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs relative"
                                  title="More Options"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>

                                {/* More Options Dropdown */}
                                {activeTableMoreMenuId === tbl.id && (
                                  <div className="absolute right-0 top-8 z-30 w-44 bg-white rounded-xl shadow-xl border border-[#E8DDD8] py-1 text-left text-xs">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setTableManagementList(prev => prev.map(t => t.id === tbl.id ? { ...t, status: 'Available', booking: '—' } : t));
                                        setActiveTableMoreMenuId(null);
                                      }}
                                      className="w-full px-3 py-2 text-left font-semibold text-[#15803D] hover:bg-[#FAF7F5] flex items-center gap-2"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span> Mark Available
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setTableManagementList(prev => prev.map(t => t.id === tbl.id ? { ...t, status: 'Reserved', booking: 'Walk-in • Reserved' } : t));
                                        setActiveTableMoreMenuId(null);
                                      }}
                                      className="w-full px-3 py-2 text-left font-semibold text-[#DC2626] hover:bg-[#FAF7F5] flex items-center gap-2"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span> Mark Reserved
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setTableManagementList(prev => prev.map(t => t.id === tbl.id ? { ...t, status: 'Maintenance', booking: '—' } : t));
                                        setActiveTableMoreMenuId(null);
                                      }}
                                      className="w-full px-3 py-2 text-left font-semibold text-[#B45309] hover:bg-[#FAF7F5] flex items-center gap-2"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span> Under Maintenance
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DDD8] bg-white">
                  <div className="text-xs text-[#75696B] font-medium">
                    Showing {Math.min(1 + (tableCurrentPage - 1) * tableRowsPerPage, 16)}–{Math.min(tableCurrentPage * tableRowsPerPage, 16)} of 16 Tables
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setTableCurrentPage(p => Math.max(1, p - 1))}
                      disabled={tableCurrentPage === 1}
                      className="w-7 h-7 rounded-lg border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:bg-[#FAF7F5] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTableCurrentPage(1)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-colors ${tableCurrentPage === 1 ? 'bg-[#500F1D] text-white shadow-xs' : 'border border-[#E8DDD8] text-[#2D2528] hover:bg-[#FAF7F5]'
                        }`}
                    >
                      1
                    </button>
                    <button
                      type="button"
                      onClick={() => setTableCurrentPage(2)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-colors ${tableCurrentPage === 2 ? 'bg-[#500F1D] text-white shadow-xs' : 'border border-[#E8DDD8] text-[#2D2528] hover:bg-[#FAF7F5]'
                        }`}
                    >
                      2
                    </button>
                    <button
                      type="button"
                      onClick={() => setTableCurrentPage(p => Math.min(2, p + 1))}
                      disabled={tableCurrentPage === 2}
                      className="w-7 h-7 rounded-lg border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:bg-[#FAF7F5] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#75696B]">
                    <span>Rows per page:</span>
                    <select
                      value={tableRowsPerPage}
                      onChange={(e) => { setTableRowsPerPage(Number(e.target.value)); setTableCurrentPage(1); }}
                      className="bg-white border border-[#E8DDD8] rounded-md px-2 py-0.5 text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                    >
                      <option value={8}>8</option>
                      <option value={16}>16</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              5. POS (Exact Reference Image: media_1795435930375_4f5478d6.png)
             ==================================================================== */}
          {(activeSection === 'pos' || (activeSection === 'pos-reports' && posReportViewMode === 'pos')) && (
            <div className="space-y-6 animate-fadeIn">
              {/* Luxury Header Banner - Displayed on POS Transactions view */}
              {posSubTabActive === 'POS Transactions' && (
                    <div
                      className="relative rounded-3xl overflow-hidden p-6 sm:p-7 shadow-sm border border-[#E8DDD8]"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(20, 10, 10, 0.94) 0%, rgba(35, 15, 18, 0.88) 50%, rgba(20, 10, 10, 0.92) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 flex items-center justify-center text-[#E5A81E] shrink-0">
                            <svg className="w-10 h-10 text-[#E5A81E]" viewBox="0 0 24 24" fill="currentColor">
                              <rect x="3" y="14" width="4" height="7" rx="1" />
                              <rect x="10" y="8" width="4" height="13" rx="1" />
                              <rect x="17" y="3" width="4" height="18" rx="1" />
                            </svg>
                          </div>
                          <div>
                            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">POS & Reports</h1>
                            <p className="text-xs sm:text-sm text-[#F5EDE8]/90 mt-0.5">Track sales, payments and performance reports</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-tabs Row - 4 POS Tabs (Matching media_1795435930375_4f5478d6.png) */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {[
                      { id: 'POS Transactions', label: 'POS Transactions', icon: ReceiptText },
                      { id: 'Billing Overview', label: 'Billing Overview', icon: FileText },
                      { id: 'Payment Summary', label: 'Payment Summary', icon: CreditCard },
                      { id: 'Food Sales Reports', label: 'Food Sales Reports', icon: ConciergeBell }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = posSubTabActive === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setPosSubTabActive(tab.id)}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                            ? 'bg-[#500F1D] text-white shadow-xs'
                            : 'bg-[#FAF5F0] hover:bg-[#F2EAE4] text-[#4A3E3D] border border-[#EFE5E0]'
                            }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Subtab 1: POS Transactions (Screenshot 1 View) */}
                  {posSubTabActive === 'POS Transactions' && (
                    <div className="space-y-6">
                      {/* 5 Summary KPI Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
                        {/* Card 1: Total Orders */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <ShoppingCart className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Orders</p>
                            <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">48</div>
                            <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5 mt-0.5">
                              <span>↑ 12%</span>
                            </div>
                          </div>
                        </div>

                        {/* Card 2: Total Sales */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#500F1D] flex items-center justify-center text-[#E5A81E] font-bold text-xl shrink-0 shadow-xs">
                            ₹
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Sales</p>
                            <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">₹48,650</div>
                          </div>
                        </div>

                        {/* Card 3: Total Payments */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <CreditCard className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Payments</p>
                            <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">₹48,650</div>
                            <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5 mt-0.5">
                              <span>↑ 15%</span>
                            </div>
                          </div>
                        </div>

                        {/* Card 4: Refunds */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <RotateCcw className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Refunds</p>
                            <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">₹1,250</div>
                            <div className="text-xs font-semibold text-[#DC2626] flex items-center gap-0.5 mt-0.5">
                              <span>↓ 5%</span>
                            </div>
                          </div>
                        </div>

                        {/* Card 5: Net Revenue */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <TrendingUp className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Net Revenue</p>
                            <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5">₹47,400</div>
                            <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5 mt-0.5">
                              <span>↑ 14%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Toast Notification for POS Actions */}
                      {posToastMessage && (
                        <div className="fixed top-6 right-6 z-50 bg-[#500F1D] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#E8DDD8] animate-slideDown">
                          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                          <span className="text-xs font-semibold">{posToastMessage}</span>
                        </div>
                      )}

                      {/* Transactions Table Container - Integrated Filter Toolbar & Data Table (Matching Second Reference Image) */}
                      <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                        {/* Integrated Header Toolbar */}
                        <div className="p-4 sm:p-5 border-b border-[#E8DDD8]/80 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                          {/* Left Dropdown Filters */}
                          <div className="flex flex-wrap items-center gap-2.5">
                            {/* All Tables */}
                            <div className="relative">
                              <select
                                value={posTableFilter}
                                onChange={(e) => {
                                  setPosTableFilter(e.target.value);
                                  setPosCurrentPage(1);
                                }}
                                className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                              >
                                <option value="All Tables">All Tables</option>
                                {Array.from(new Set(posTransactions.map(t => t.tableNo))).sort().map(tbl => (
                                  <option key={tbl} value={tbl}>{tbl}</option>
                                ))}
                              </select>
                              <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* All Payment Methods */}
                            <div className="relative">
                              <select
                                value={posPaymentMethodFilter}
                                onChange={(e) => {
                                  setPosPaymentMethodFilter(e.target.value);
                                  setPosCurrentPage(1);
                                }}
                                className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                              >
                                <option value="All Payment Methods">All Payment Methods</option>
                                <option value="UPI">UPI</option>
                                <option value="Card">Card</option>
                                <option value="Cash">Cash</option>
                              </select>
                              <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* All Status */}
                            <div className="relative">
                              <select
                                value={posStatusFilter}
                                onChange={(e) => {
                                  setPosStatusFilter(e.target.value);
                                  setPosCurrentPage(1);
                                }}
                                className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                              >
                                <option value="All Status">All Status</option>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                              </select>
                              <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Date Range Selector Pill with Dropdown */}
                            <div className="relative">
                              <select
                                value={posDateFilter}
                                onChange={(e) => {
                                  setPosDateFilter(e.target.value);
                                  setPosCurrentPage(1);
                                }}
                                className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-9 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
                              >
                                <option value="21 Nov 2025 - 21 Nov 2025">21 Nov 2025 – 21 Nov 2025</option>
                                <option value="All Dates">All Dates</option>
                                <option value="Today">Today (16 Nov 2026)</option>
                                <option value="20 Nov 2025">20 Nov 2025</option>
                                <option value="19 Nov 2025">19 Nov 2025</option>
                              </select>
                              <Calendar className="w-4 h-4 text-[#75696B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                              <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* Middle: Search Bar Expanding to Cover Space */}
                          <div className="relative flex-1 min-w-[200px]">
                            <Search className="w-4 h-4 text-[#75696B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              placeholder="Search by Bill No. / Table No..."
                              value={posSearchQuery}
                              onChange={(e) => {
                                setPosSearchQuery(e.target.value);
                                setPosCurrentPage(1);
                              }}
                              className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-[#2D2528] placeholder-[#75696B] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs"
                            />
                            {posSearchQuery && (
                              <button
                                type="button"
                                onClick={() => {
                                  setPosSearchQuery('');
                                  setPosCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          {/* Right: Export Report Button */}
                          <button
                            type="button"
                            onClick={handleExportPosReport}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 shrink-0 cursor-pointer self-start sm:self-auto"
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Report</span>
                          </button>
                        </div>

                        {/* Transactions Table */}
                        <div className="p-4 sm:p-6 overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead className="bg-[#FAF1EB]">
                              <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                                <th className="w-12 text-center py-3.5 px-3 rounded-l-2xl">#</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Bill No.</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Table No.</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Order Items</th>
                                <th className="text-center py-3.5 px-4 whitespace-nowrap">Qty</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Total Amount</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Payment Method</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Payment Status</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Time</th>
                                <th className="text-center py-3.5 px-4 whitespace-nowrap rounded-r-2xl">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F5EDE8]">
                              {(() => {
                                const filtered = posTransactions.filter(tx => {
                                  if (posTableFilter !== 'All Tables' && tx.tableNo !== posTableFilter) return false;
                                  if (posPaymentMethodFilter !== 'All Payment Methods' && tx.method !== posPaymentMethodFilter) return false;
                                  if (posStatusFilter !== 'All Status' && tx.status !== posStatusFilter) return false;
                                  if (posDateFilter !== 'All Dates') {
                                    if (posDateFilter === '21 Nov 2025 - 21 Nov 2025' || posDateFilter === '21 Nov 2025') {
                                      if (!tx.time.includes('21 Nov') && tx.date !== '21 Nov 2025') return false;
                                    } else if (posDateFilter === 'Today') {
                                      if (!tx.time.includes('16 Nov') && tx.date !== '16 Nov 2026') return false;
                                    } else if (posDateFilter === '20 Nov 2025') {
                                      if (!tx.time.includes('20 Nov') && tx.date !== '20 Nov 2025') return false;
                                    } else if (posDateFilter === '19 Nov 2025') {
                                      if (!tx.time.includes('19 Nov') && tx.date !== '19 Nov 2025') return false;
                                    }
                                  }
                                  if (posSearchQuery.trim()) {
                                    const q = posSearchQuery.toLowerCase().trim();
                                    const matchBill = tx.billNo.toLowerCase().includes(q);
                                    const matchTable = tx.tableNo.toLowerCase().includes(q);
                                    const matchItems = tx.items.toLowerCase().includes(q);
                                    const matchMethod = tx.method.toLowerCase().includes(q);
                                    if (!matchBill && !matchTable && !matchItems && !matchMethod) return false;
                                  }
                                  return true;
                                });

                                if (filtered.length === 0) {
                                  return (
                                    <tr>
                                      <td colSpan={10} className="py-12 text-center text-[#75696B]">
                                        <ReceiptText className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#500F1D]" />
                                        <p className="font-semibold text-sm text-[#2D2528]">No transactions found</p>
                                        <p className="text-xs text-[#75696B] mt-1">Try adjusting your filters, table selection, or search query.</p>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setPosTableFilter('All Tables');
                                            setPosPaymentMethodFilter('All Payment Methods');
                                            setPosStatusFilter('All Status');
                                            setPosDateFilter('All Dates');
                                            setPosSearchQuery('');
                                          }}
                                          className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8] text-xs font-bold text-[#500F1D] hover:bg-[#F2E5DC] transition-colors cursor-pointer"
                                        >
                                          Reset Filters
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }

                                return filtered.map((tx, idx) => (
                                  <tr key={tx.id} className="hover:bg-[#FAF7F5] transition-colors">
                                    {/* # */}
                                    <td className="text-center py-4 px-3 font-semibold text-xs sm:text-sm text-[#2D2528]">
                                      {idx + 1}
                                    </td>

                                    {/* Bill No. */}
                                    <td className="py-4 px-4 font-bold text-sm text-[#2D2528] whitespace-nowrap">
                                      {tx.billNo}
                                    </td>

                                    {/* Table No. - Matching Screenshot Burgundy Highlight */}
                                    <td className="py-4 px-4 whitespace-nowrap font-bold text-sm text-[#500F1D]">
                                      {tx.tableNo}
                                    </td>

                                    {/* Order Items */}
                                    <td className="py-4 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                      {tx.items}
                                    </td>

                                    {/* Qty */}
                                    <td className="py-4 px-4 text-center font-bold text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                                      {tx.qty}
                                    </td>

                                    {/* Total Amount */}
                                    <td className="py-4 px-4 font-bold text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                                      ₹{tx.amount}
                                    </td>

                                    {/* Payment Method */}
                                    <td className="py-4 px-4 font-semibold text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                                      {tx.method}
                                    </td>

                                    {/* Payment Status */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${tx.status === 'Paid'
                                        ? 'bg-[#DCFCE7] text-[#15803D]'
                                        : tx.status === 'Pending'
                                          ? 'bg-[#FEF3C7] text-[#B45309]'
                                          : 'bg-[#FEE2E2] text-[#B91C1C]'
                                        }`}>
                                        {tx.status === 'Paid' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        <span>{tx.status}</span>
                                      </span>
                                    </td>

                                    {/* Time */}
                                    <td className="py-4 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                      {tx.time}
                                    </td>

                                    {/* Actions: Matching Reference Image Exactly */}
                                    <td className="py-4 px-4 whitespace-nowrap text-center">
                                      <div className="flex items-center justify-center gap-1.5 relative">
                                        <button
                                          type="button"
                                          onClick={() => setSelectedPosTransactionModal(tx)}
                                          className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                          title="View Receipt"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setEditingPosTransaction(tx)}
                                          className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                          title="Edit Transaction"
                                        >
                                          <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const csvData = [
                                              ['Bill No', 'Table No', 'Order Items', 'Qty', 'Total Amount', 'Payment Method', 'Payment Status', 'Time'],
                                              [`"${tx.billNo}"`, `"${tx.tableNo}"`, `"${tx.items}"`, tx.qty, `"₹${tx.amount}"`, `"${tx.method}"`, `"${tx.status}"`, `"${tx.time}"`]
                                            ].map(r => r.join(',')).join('\n');
                                            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
                                            const url = URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = `Receipt_${tx.billNo}.csv`;
                                            a.click();
                                            URL.revokeObjectURL(url);
                                            setPosToastMessage(`Downloaded receipt for ${tx.billNo}`);
                                            setTimeout(() => setPosToastMessage(''), 2500);
                                          }}
                                          className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                          title="Download Bill"
                                        >
                                          <MoreVertical className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ));
                              })()}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DDD8] bg-white">
                          {(() => {
                            const filtered = posTransactions.filter(tx => {
                              if (posTableFilter !== 'All Tables' && tx.tableNo !== posTableFilter) return false;
                              if (posPaymentMethodFilter !== 'All Payment Methods' && tx.method !== posPaymentMethodFilter) return false;
                              if (posStatusFilter !== 'All Status' && tx.status !== posStatusFilter) return false;
                              if (posDateFilter !== 'All Dates') {
                                if (posDateFilter === '21 Nov 2025 - 21 Nov 2025' || posDateFilter === '21 Nov 2025') {
                                  if (!tx.time.includes('21 Nov') && tx.date !== '21 Nov 2025') return false;
                                } else if (posDateFilter === 'Today') {
                                  if (!tx.time.includes('16 Nov') && tx.date !== '16 Nov 2026') return false;
                                } else if (posDateFilter === '20 Nov 2025') {
                                  if (!tx.time.includes('20 Nov') && tx.date !== '20 Nov 2025') return false;
                                } else if (posDateFilter === '19 Nov 2025') {
                                  if (!tx.time.includes('19 Nov') && tx.date !== '19 Nov 2025') return false;
                                }
                              }
                              if (posSearchQuery.trim()) {
                                const q = posSearchQuery.toLowerCase().trim();
                                const matchBill = tx.billNo.toLowerCase().includes(q);
                                const matchTable = tx.tableNo.toLowerCase().includes(q);
                                const matchItems = tx.items.toLowerCase().includes(q);
                                const matchMethod = tx.method.toLowerCase().includes(q);
                                if (!matchBill && !matchTable && !matchItems && !matchMethod) return false;
                              }
                              return true;
                            });

                            if (filtered.length === 0) {
                              return (
                                <tr>
                                  <td colSpan={10} className="py-12 text-center text-[#75696B]">
                                    <ReceiptText className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#500F1D]" />
                                    <p className="font-semibold text-sm text-[#2D2528]">No transactions found</p>
                                    <p className="text-xs text-[#75696B] mt-1">Try adjusting your filters, table selection, or search query.</p>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setPosTableFilter('All Tables');
                                        setPosPaymentMethodFilter('All Payment Methods');
                                        setPosStatusFilter('All Status');
                                        setPosDateFilter('All Dates');
                                        setPosSearchQuery('');
                                      }}
                                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8] text-xs font-bold text-[#500F1D] hover:bg-[#F2E5DC] transition-colors cursor-pointer"
                                    >
                                      Reset Filters
                                    </button>
                                  </td>
                                </tr>
                              );
                            }

                            return filtered.map((tx, idx) => (
                              <tr key={tx.id} className="hover:bg-[#FAF7F5] transition-colors">
                                {/* # */}
                                <td className="text-center py-4 px-3 font-semibold text-xs sm:text-sm text-[#2D2528]">
                                  {idx + 1}
                                </td>

                                {/* Bill No. */}
                                <td className="py-4 px-4 font-bold text-sm text-[#2D2528] whitespace-nowrap">
                                  {tx.billNo}
                                </td>

                                {/* Table No. - Matching Screenshot Burgundy Highlight */}
                                <td className="py-4 px-4 whitespace-nowrap font-bold text-sm text-[#500F1D]">
                                  {tx.tableNo}
                                </td>

                                {/* Order Items */}
                                <td className="py-4 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                  {tx.items}
                                </td>

                                {/* Qty */}
                                <td className="py-4 px-4 text-center font-bold text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                                  {tx.qty}
                                </td>

                                {/* Total Amount */}
                                <td className="py-4 px-4 font-bold text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                                  ₹{tx.amount}
                                </td>

                                {/* Payment Method */}
                                <td className="py-4 px-4 font-semibold text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                                  {tx.method}
                                </td>

                                {/* Payment Status */}
                                <td className="py-4 px-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${tx.status === 'Paid'
                                    ? 'bg-[#DCFCE7] text-[#15803D]'
                                    : tx.status === 'Pending'
                                      ? 'bg-[#FEF3C7] text-[#B45309]'
                                      : 'bg-[#FEE2E2] text-[#B91C1C]'
                                    }`}>
                                    {tx.status === 'Paid' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                    <span>{tx.status}</span>
                                  </span>
                                </td>

                                {/* Time */}
                                <td className="py-4 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                  {tx.time}
                                </td>

                                {/* Actions: Matching Reference Image Exactly */}
                                <td className="py-4 px-4 whitespace-nowrap text-center">
                                  <div className="flex items-center justify-center gap-1.5 relative">
                                    <button
                                      type="button"
                                      onClick={() => setSelectedPosTransactionModal(tx)}
                                      className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                      title="View Receipt"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingPosTransaction(tx)}
                                      className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                      title="Edit Transaction"
                                    >
                                      <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const csvData = [
                                          ['Bill No', 'Table No', 'Order Items', 'Qty', 'Total Amount', 'Payment Method', 'Payment Status', 'Time'],
                                          [`"${tx.billNo}"`, `"${tx.tableNo}"`, `"${tx.items}"`, tx.qty, `"₹${tx.amount}"`, `"${tx.method}"`, `"${tx.status}"`, `"${tx.time}"`]
                                        ].map(r => r.join(',')).join('\n');
                                        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `Receipt_${tx.billNo}.csv`;
                                        a.click();
                                        URL.revokeObjectURL(url);
                                        setPosToastMessage(`Downloaded receipt for ${tx.billNo}`);
                                        setTimeout(() => setPosToastMessage(''), 2500);
                                      }}
                                      className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                      title="Download Bill"
                                    >
                                      <MoreVertical className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ));
                          })()}

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setPosCurrentPage(1)}
                              className="w-7 h-7 rounded-lg border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:bg-[#FAF7F5] cursor-pointer"
                            >
                              «
                            </button>
                            {[1, 2, 3, 4, 5].map((pg) => (
                              <button
                                key={pg}
                                type="button"
                                onClick={() => setPosCurrentPage(pg)}
                                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-colors ${posCurrentPage === pg ? 'bg-[#500F1D] text-white shadow-xs' : 'border border-[#E8DDD8] text-[#2D2528] hover:bg-[#FAF7F5]'
                                  }`}
                              >
                                {pg}
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={() => setPosCurrentPage(5)}
                              className="w-7 h-7 rounded-lg border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:bg-[#FAF7F5] cursor-pointer"
                            >
                              »
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Subtab 6: Food Sales Reports (Exact Reference Image: media_1795428754370_c73d4680.jpg) */}
                  {(posSubTabActive === 'Food Sales Reports' || posSubTabActive === 'Food Sales Report' || posSubTabActive === 'Food & Sales Report') && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 1. Header Row: Food & Sales Report Title & Export Report Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          {/* Burgundy Rounded Square Icon with Bar Chart SVG */}
                          <div className="w-12 h-12 rounded-2xl bg-[#500F1D] flex items-center justify-center shrink-0 shadow-xs">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 3v18h18" />
                              <path d="m19 7-6 6-4-4-5 5" />
                              <path d="M15 7h4v4" />
                              <path d="M7 17v-2" />
                              <path d="M11 17v-5" />
                              <path d="M15 17v-8" />
                            </svg>
                          </div>
                          <div>
                            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#500F1D] tracking-tight">Food &amp; Sales Report</h1>
                            <p className="text-xs sm:text-sm text-[#75696B] font-medium mt-0.5">Track food performance and sales details</p>
                          </div>
                        </div>

                        {/* Export Report Dropdown Button */}
                        <div className="self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={handleExportFoodSalesReport}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                          >
                            <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
                            <span>Export Report</span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                          </button>
                        </div>
                      </div>

                      {/* 2. 4 Summary Metric Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {/* Card 1: Total Food Sold */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <ConciergeBell className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Food Sold</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">1,248</div>
                              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">
                                <span>↑ 12%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 2: Total Revenue */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center text-[#500F1D] font-bold text-xl shrink-0 shadow-2xs">
                            ₹
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Revenue</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">₹4,85,750</div>
                              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">
                                <span>↑ 18%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 3: Average Order Value */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <Utensils className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Average Order Value</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">₹389</div>
                              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">
                                <span>↑ 10%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 4: Top Selling Item */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <Star className="w-5 h-5 fill-[#500F1D] text-[#500F1D]" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs text-[#75696B] font-semibold truncate">Top Selling Item</p>
                            <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5 truncate">
                              Paneer Tikka
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Sub-tabs Row - 4 Pills Matching Reference Image */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {[
                          { id: 'Food Sales', label: 'Food Sales', icon: UtensilsCrossed },
                          { id: 'Sales by Category', label: 'Sales by Category', icon: LayoutGrid },
                          { id: 'Sales Trend', label: 'Sales Trend', icon: TrendingUp },
                          { id: 'Payment Summary', label: 'Payment Summary', icon: CreditCard }
                        ].map((pill) => {
                          const Icon = pill.icon;
                          const isPillActive = foodSalesInnerTab === pill.id;
                          return (
                            <button
                              key={pill.id}
                              type="button"
                              onClick={() => setFoodSalesInnerTab(pill.id)}
                              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${isPillActive
                                ? 'bg-[#500F1D] text-white shadow-xs'
                                : 'bg-[#FAF5F0] hover:bg-[#F2EAE4] text-[#4A3E3D] border border-[#EFE5E0]'
                                }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{pill.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* 4. Organized Layout: Balanced Two-Row Grid */}
                      <div className="space-y-6">
                        {/* Top Row: Food Sales List (7 cols) + Sales by Category (5 cols) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                          {/* WIDGET 1: Food Sales List (Left Top) */}
                          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs flex flex-col justify-between">
                            {/* Widget Header */}
                            <div className="p-4 sm:p-5 border-b border-[#E8DDD8]/80 flex items-center justify-between shrink-0">
                              <div className="flex items-center gap-2.5">
                                <ConciergeBell className="w-5 h-5 text-[#500F1D]" />
                                <h2 className="font-serif font-bold text-base sm:text-lg text-[#500F1D]">Food Sales List</h2>
                              </div>
                              <button
                                type="button"
                                onClick={() => setViewAllFoodSalesModal(true)}
                                className="text-xs sm:text-sm font-bold text-[#500F1D] hover:underline inline-flex items-center gap-1 cursor-pointer"
                              >
                                <span>View All</span>
                                <span>→</span>
                              </button>
                            </div>

                            {/* Food Sales Table */}
                            <div className="p-4 sm:p-5 overflow-x-auto flex-1 flex flex-col justify-center">
                              <table className="w-full text-left border-collapse">
                                <thead className="bg-[#FAF1EB]">
                                  <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                                    <th className="w-10 text-center py-3.5 px-3 rounded-l-2xl">#</th>
                                    <th className="py-3.5 px-4 whitespace-nowrap">Food Item</th>
                                    <th className="py-3.5 px-4 whitespace-nowrap">Category</th>
                                    <th className="text-center py-3.5 px-4 whitespace-nowrap">Quantity Sold</th>
                                    <th className="py-3.5 px-4 whitespace-nowrap">Revenue</th>
                                    <th className="py-3.5 px-4 whitespace-nowrap rounded-r-2xl">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F5EDE8]">
                                  {foodSalesList.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-[#FAF7F5] transition-colors">
                                      <td className="text-center py-3.5 px-3 font-semibold text-xs sm:text-sm text-[#2D2528]">
                                        {idx + 1}
                                      </td>
                                      <td className="py-3.5 px-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            onError={(e) => {
                                              e.currentTarget.onerror = null;
                                              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80';
                                            }}
                                            className="w-10 h-10 rounded-xl object-cover border border-[#E8DDD8] shadow-2xs shrink-0"
                                          />
                                          <span className="font-bold text-xs sm:text-sm text-[#2D2528]">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="py-3.5 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#75696B]">
                                        {item.category}
                                      </td>
                                      <td className="py-3.5 px-4 text-center whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                        {item.qtySold}
                                      </td>
                                      <td className="py-3.5 px-4 whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                        ₹{item.revenue.toLocaleString('en-IN')}
                                      </td>
                                      <td className="py-3.5 px-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Active'
                                          ? 'bg-[#DCFCE7] text-[#15803D]'
                                          : 'bg-[#FEE2E2] text-[#DC2626]'
                                          }`}>
                                          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`}></span>
                                          <span>{item.status}</span>
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* WIDGET 2: Sales by Category (Right Top) */}
                          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs flex flex-col justify-between">
                            {/* Widget Header */}
                            <div className="p-4 sm:p-5 border-b border-[#E8DDD8]/80 flex items-center justify-between shrink-0">
                              <div className="flex items-center gap-2.5">
                                <Clock className="w-5 h-5 text-[#500F1D]" />
                                <h2 className="font-serif font-bold text-base sm:text-lg text-[#500F1D]">Sales by Category</h2>
                              </div>
                              <div className="relative">
                                <select
                                  value={foodSalesCategoryTimeFilter}
                                  onChange={(e) => setFoodSalesCategoryTimeFilter(e.target.value)}
                                  className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl pl-3 pr-7 py-1.5 text-xs font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none cursor-pointer"
                                >
                                  <option value="This Month">This Month</option>
                                  <option value="Today">Today</option>
                                  <option value="This Week">This Week</option>
                                  <option value="This Year">This Year</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>

                            {/* Donut Chart & Legend with Clean Alignment */}
                            <div className="p-6 flex-1 flex flex-col justify-center">
                              <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                                {/* Visual Donut Chart SVG matching exact proportions */}
                                <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                                  <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
                                    {/* Main Course: 38% -> 85.95 */}
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="36"
                                      fill="transparent"
                                      stroke="#500F1D"
                                      strokeWidth="16"
                                      strokeDasharray="85.95 140.24"
                                      strokeDashoffset="0"
                                    />
                                    {/* Starters: 28% -> 63.33 */}
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="36"
                                      fill="transparent"
                                      stroke="#E5A81E"
                                      strokeWidth="16"
                                      strokeDasharray="63.33 162.86"
                                      strokeDashoffset="-85.95"
                                    />
                                    {/* Pizza: 20% -> 45.24 */}
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="36"
                                      fill="transparent"
                                      stroke="#DC2626"
                                      strokeWidth="16"
                                      strokeDasharray="45.24 180.95"
                                      strokeDashoffset="-149.28"
                                    />
                                    {/* Beverages: 14% -> 31.67 */}
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="36"
                                      fill="transparent"
                                      stroke="#FED7AA"
                                      strokeWidth="16"
                                      strokeDasharray="31.67 194.52"
                                      strokeDashoffset="-194.52"
                                    />
                                  </svg>

                                  {/* Donut Center Display */}
                                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                                    <span className="text-xl font-bold text-[#2D2528] leading-tight">
                                      ₹4,85,750
                                    </span>
                                    <span className="text-xs font-semibold text-[#75696B] mt-0.5">
                                      Total Sales
                                    </span>
                                  </div>
                                </div>

                                {/* Legend Column with proper width and alignment */}
                                <div className="space-y-3.5 w-full sm:w-48">
                                  <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2.5">
                                      <span className="w-3.5 h-3.5 rounded-full bg-[#500F1D] shrink-0"></span>
                                      <span className="font-semibold text-[#2D2528]">Main Course</span>
                                    </div>
                                    <span className="font-bold text-[#2D2528]">38%</span>
                                  </div>

                                  <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2.5">
                                      <span className="w-3.5 h-3.5 rounded-full bg-[#E5A81E] shrink-0"></span>
                                      <span className="font-semibold text-[#2D2528]">Starters</span>
                                    </div>
                                    <span className="font-bold text-[#2D2528]">28%</span>
                                  </div>

                                  <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2.5">
                                      <span className="w-3.5 h-3.5 rounded-full bg-[#DC2626] shrink-0"></span>
                                      <span className="font-semibold text-[#2D2528]">Pizza</span>
                                    </div>
                                    <span className="font-bold text-[#2D2528]">20%</span>
                                  </div>

                                  <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2.5">
                                      <span className="w-3.5 h-3.5 rounded-full bg-[#FED7AA] shrink-0"></span>
                                      <span className="font-semibold text-[#2D2528]">Beverages</span>
                                    </div>
                                    <span className="font-bold text-[#2D2528]">14%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row: Sales Trend (6 cols) + Payment Summary (6 cols) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                          {/* WIDGET 3: Sales Trend (Left Bottom) */}
                          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs flex flex-col justify-between">
                            {/* Widget Header */}
                            <div className="p-4 sm:p-5 border-b border-[#E8DDD8]/80 flex items-center justify-between shrink-0">
                              <div className="flex items-center gap-2.5">
                                <TrendingUp className="w-5 h-5 text-[#500F1D]" />
                                <h2 className="font-serif font-bold text-base sm:text-lg text-[#500F1D]">Sales Trend</h2>
                              </div>
                              <div className="relative">
                                <select
                                  value={foodSalesTrendFilter}
                                  onChange={(e) => setFoodSalesTrendFilter(e.target.value)}
                                  className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl pl-3 pr-7 py-1.5 text-xs font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none cursor-pointer"
                                >
                                  <option value="Last 7 Days">Last 7 Days</option>
                                  <option value="Last 14 Days">Last 14 Days</option>
                                  <option value="This Month">This Month</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>

                            {/* Sales Trend Table */}
                            <div className="p-4 sm:p-5 overflow-x-auto flex-1 flex flex-col justify-between">
                              <table className="w-full text-left border-collapse">
                                <thead className="bg-[#FAF1EB]">
                                  <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                                    <th className="py-3.5 px-4 rounded-l-2xl whitespace-nowrap">Date</th>
                                    <th className="py-3.5 px-4 whitespace-nowrap">Total Orders</th>
                                    <th className="py-3.5 px-4 whitespace-nowrap">Revenue</th>
                                    <th className="py-3.5 px-4 rounded-r-2xl whitespace-nowrap">Growth</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F5EDE8]">
                                  {salesTrendList.map((row, i) => (
                                    <tr key={i} className="hover:bg-[#FAF7F5] transition-colors">
                                      <td className="py-3.5 px-4 font-medium text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                                        {row.date}
                                      </td>
                                      <td className="py-3.5 px-4 font-bold text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                                        {row.orders}
                                      </td>
                                      <td className="py-3.5 px-4 font-bold text-xs sm:text-sm text-[#2D2528] whitespace-nowrap">
                                        ₹{row.revenue.toLocaleString('en-IN')}
                                      </td>
                                      <td className="py-3.5 px-4 font-bold text-xs sm:text-sm whitespace-nowrap">
                                        <span className={row.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}>
                                          {row.growth}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr className="bg-[#FAF7F5] border-t border-[#E8DDD8] font-bold text-xs sm:text-sm text-[#2D2528]">
                                    <td className="py-3.5 px-4 rounded-bl-2xl">Average / Total</td>
                                    <td className="py-3.5 px-4">483 Orders</td>
                                    <td className="py-3.5 px-4 text-[#500F1D] font-extrabold text-sm sm:text-base">₹1,82,000</td>
                                    <td className="py-3.5 px-4 rounded-br-2xl text-[#16A34A] font-bold">↑ 8.25%</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>

                          {/* WIDGET 4: Payment Summary (Right Bottom) */}
                          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs flex flex-col justify-between">
                            {/* Widget Header */}
                            <div className="p-4 sm:p-5 border-b border-[#E8DDD8]/80 flex items-center justify-between shrink-0">
                              <div className="flex items-center gap-2.5">
                                <CreditCard className="w-5 h-5 text-[#500F1D]" />
                                <h2 className="font-serif font-bold text-base sm:text-lg text-[#500F1D]">Payment Summary</h2>
                              </div>
                              <button
                                type="button"
                                onClick={() => setViewPaymentDetailsModal(true)}
                                className="text-xs sm:text-sm font-bold text-[#500F1D] hover:underline inline-flex items-center gap-1 cursor-pointer"
                              >
                                <span>View Details</span>
                                <span>→</span>
                              </button>
                            </div>

                            {/* Payment Summary Table */}
                            <div className="p-4 sm:p-5 overflow-x-auto flex-1 flex flex-col justify-between">
                              <table className="w-full text-left border-collapse">
                                <thead className="bg-[#FAF1EB]">
                                  <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                                    <th className="py-3.5 px-4 rounded-l-2xl whitespace-nowrap">Payment Method</th>
                                    <th className="text-center py-3.5 px-4 whitespace-nowrap">Transactions</th>
                                    <th className="py-3.5 px-4 rounded-r-2xl whitespace-nowrap">Total Amount</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F5EDE8]">
                                  {foodSalesPaymentSummary.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-[#FAF7F5] transition-colors">
                                      <td className="py-3.5 px-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2.5">
                                          {item.type === 'cash' && (
                                            <div className="w-6 h-6 rounded-md bg-[#FAF2EB] flex items-center justify-center text-[#500F1D]">
                                              <ShoppingBag className="w-3.5 h-3.5" />
                                            </div>
                                          )}
                                          {item.type === 'upi' && (
                                            <div className="w-6 h-6 rounded-md bg-orange-50 flex items-center justify-center text-orange-600 font-bold text-[10px]">
                                              UPI
                                            </div>
                                          )}
                                          {item.type === 'card' && (
                                            <div className="w-6 h-6 rounded-md bg-rose-50 flex items-center justify-center text-rose-600">
                                              <CreditCard className="w-3.5 h-3.5" />
                                            </div>
                                          )}
                                          {item.type === 'online' && (
                                            <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                                              NET
                                            </div>
                                          )}
                                          <span className="font-semibold text-xs sm:text-sm text-[#2D2528]">{item.method}</span>
                                        </div>
                                      </td>
                                      <td className="py-3.5 px-4 text-center whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                        {item.transactions}
                                      </td>
                                      <td className="py-3.5 px-4 whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                        ₹{item.amount.toLocaleString('en-IN')}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr className="bg-[#FAF7F5] border-t border-[#E8DDD8] font-bold text-xs sm:text-sm text-[#2D2528]">
                                    <td className="py-3.5 px-4 rounded-bl-2xl">Total</td>
                                    <td className="py-3.5 px-4 text-center">1,248</td>
                                    <td className="py-3.5 px-4 rounded-br-2xl text-[#500F1D] font-extrabold text-sm sm:text-base">
                                      ₹4,85,000
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subtab 2: Billing Overview (Exact Reference Image: media_1795430085813_cdcef314.jpg) */}
                  {posSubTabActive === 'Billing Overview' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 1. Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-[#500F1D] flex items-center justify-center shrink-0 shadow-xs">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#500F1D] tracking-tight">
                              Billing Overview
                            </h1>
                            <p className="text-xs sm:text-sm text-[#75696B] font-medium mt-0.5">
                              Track and manage all bills and payments
                            </p>
                          </div>
                        </div>

                        {/* Export Report Dropdown Button */}
                        <div className="self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={handleExportBillingReport}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
                          >
                            <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
                            <span>Export Report</span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                          </button>
                        </div>
                      </div>

                      {/* Toast notification */}
                      {billingToast && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] rounded-xl text-xs font-semibold animate-fadeIn">
                          <Check className="w-3.5 h-3.5" />
                          <span>{billingToast}</span>
                        </div>
                      )}

                      {/* 2. 4 Metric KPI Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {/* Card 1: Total Bills */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center shrink-0">
                            <ReceiptText className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Bills</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">1,248</div>
                              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">
                                <span>↑ 12%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 2: Total Revenue */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center shrink-0">
                            <Wallet className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Revenue</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">₹ 4,85,750</div>
                              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">
                                <span>↑ 18%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 3: Pending Bills */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center shrink-0">
                            <Clock className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Pending Bills</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">48</div>
                            </div>
                          </div>
                        </div>

                        {/* Card 4: Settled Bills */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#500F1D] flex items-center justify-center shrink-0 text-white shadow-2xs">
                            <Check className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Settled Bills</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">1,200</div>
                              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">
                                <span>↑ 10%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Unified Card: Search Bar, Filters & Table Combined into a Single Aligned Layout (Exact Reference: media_1795439113913_16813127.png) */}
                      <div className="w-full bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                        {/* Unified Top Toolbar: Search on Left, Filters on Right */}
                        <div className="p-4 sm:p-5 border-b border-[#E8DDD8] flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white">
                          {/* Search on Left with ample padding preventing icon collision */}
                          <div className="relative flex-1 min-w-[240px] max-w-md">
                            <Search className="w-4 h-4 text-[#75696B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Search by Bill No. / Order ID / Customer Name..."
                              value={billingSearchQuery}
                              onChange={(e) => {
                                setBillingSearchQuery(e.target.value);
                                setBillingCurrentPage(1);
                              }}
                              className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-10 pr-9 py-2 text-xs sm:text-sm text-[#2D2528] placeholder-[#75696B] focus:outline-none focus:ring-1 focus:ring-[#500F1D] focus:border-[#500F1D] shadow-2xs transition-colors"
                            />
                            {billingSearchQuery && (
                              <button
                                type="button"
                                onClick={() => {
                                  setBillingSearchQuery('');
                                  setBillingCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#75696B] hover:text-[#500F1D] cursor-pointer"
                                title="Clear search"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          {/* Filters on Right */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                            {/* Payment Method */}
                            <div className="relative">
                              <select
                                value={billingPaymentMethodFilter}
                                onChange={(e) => {
                                  setBillingPaymentMethodFilter(e.target.value);
                                  setBillingCurrentPage(1);
                                }}
                                className={`appearance-none bg-white border rounded-2xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer ${billingPaymentMethodFilter !== 'Payment Method' &&
                                  billingPaymentMethodFilter !== 'All Payment Methods'
                                  ? 'border-[#500F1D] text-[#500F1D] bg-[#FAF5F2]'
                                  : 'border-[#E8DDD8] text-[#2D2528] hover:border-[#500F1D]/60'
                                  }`}
                              >
                                <option value="Payment Method">Payment Method</option>
                                <option value="All Payment Methods">All Payment Methods</option>
                                <option value="UPI">UPI</option>
                                <option value="Card">Card</option>
                                <option value="Cash">Cash</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Status */}
                            <div className="relative">
                              <select
                                value={billingStatusFilter}
                                onChange={(e) => {
                                  setBillingStatusFilter(e.target.value);
                                  setBillingCurrentPage(1);
                                }}
                                className={`appearance-none bg-white border rounded-2xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer ${billingStatusFilter !== 'Status' && billingStatusFilter !== 'All Status'
                                  ? 'border-[#500F1D] text-[#500F1D] bg-[#FAF5F2]'
                                  : 'border-[#E8DDD8] text-[#2D2528] hover:border-[#500F1D]/60'
                                  }`}
                              >
                                <option value="Status">Status</option>
                                <option value="All Status">All Status</option>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Table No. */}
                            <div className="relative">
                              <select
                                value={billingTableFilter}
                                onChange={(e) => {
                                  setBillingTableFilter(e.target.value);
                                  setBillingCurrentPage(1);
                                }}
                                className={`appearance-none bg-white border rounded-2xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer ${billingTableFilter !== 'Table No.' && billingTableFilter !== 'All Tables'
                                  ? 'border-[#500F1D] text-[#500F1D] bg-[#FAF5F2]'
                                  : 'border-[#E8DDD8] text-[#2D2528] hover:border-[#500F1D]/60'
                                  }`}
                              >
                                <option value="Table No.">Table No.</option>
                                <option value="All Tables">All Tables</option>
                                <option value="T01">T01</option>
                                <option value="T02">T02</option>
                                <option value="T03">T03</option>
                                <option value="T05">T05</option>
                                <option value="T07">T07</option>
                                <option value="T08">T08</option>
                                <option value="T10">T10</option>
                                <option value="T12">T12</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Reset Button if filter is active */}
                            {(billingSearchQuery ||
                              (billingPaymentMethodFilter !== 'Payment Method' &&
                                billingPaymentMethodFilter !== 'All Payment Methods') ||
                              (billingStatusFilter !== 'Status' && billingStatusFilter !== 'All Status') ||
                              (billingTableFilter !== 'Table No.' && billingTableFilter !== 'All Tables')) && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setBillingSearchQuery('');
                                    setBillingPaymentMethodFilter('Payment Method');
                                    setBillingStatusFilter('Status');
                                    setBillingTableFilter('Table No.');
                                    setBillingCurrentPage(1);
                                  }}
                                  className="px-3 py-2 rounded-2xl bg-[#FAF7F5] hover:bg-[#F2EAE4] border border-[#E8DDD8] text-xs font-semibold text-[#500F1D] transition-colors cursor-pointer"
                                >
                                  Reset
                                </button>
                              )}

                            {/* Apply Filter Button */}
                            <button
                              type="button"
                              onClick={() => {
                                const count = filteredBillingBills.length;
                                setBillingToast(`Filters applied: ${count} bill${count === 1 ? '' : 's'} found`);
                                setTimeout(() => setBillingToast(''), 2500);
                              }}
                              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
                            >
                              <Filter className="w-4 h-4 fill-white" />
                              <span>Apply Filter</span>
                            </button>
                          </div>
                        </div>

                        {/* Table directly connected under Toolbar */}
                        <div className="p-4 sm:p-5 overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            {/* Exact Header Bar matching reference image: soft cream background bg-[#FAF1EB] with text-[#500F1D] */}
                            <thead className="bg-[#FAF1EB]">
                              <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                                <th className="py-2.5 px-4 rounded-l-2xl whitespace-nowrap">Bill No.</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Order ID</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Customer Name</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Table No.</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Amount</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Payment Method</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Status</th>
                                <th className="text-center py-2.5 px-4 rounded-r-2xl whitespace-nowrap">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F5EDE8] bg-white">
                              {paginatedBillingBills.length === 0 ? (
                                <tr>
                                  <td colSpan={8} className="py-12 text-center text-[#75696B]">
                                    <p className="font-bold text-sm text-[#2D2528]">No bills found</p>
                                    <p className="text-xs text-[#75696B]">Try adjusting your search query or filters.</p>
                                  </td>
                                </tr>
                              ) : (
                                paginatedBillingBills.map((b) => {
                                  const isSelected = selectedBillingRow?.id === b.id;
                                  return (
                                    <tr
                                      key={b.id}
                                      className={`transition-colors ${isSelected ? 'bg-[#FAF2EB]' : 'hover:bg-[#FAF7F5]'
                                        }`}
                                    >
                                      <td className="py-2.5 px-4 whitespace-nowrap font-semibold text-xs sm:text-sm text-[#2D2528]">
                                        {b.billNo}
                                      </td>
                                      <td className="py-2.5 px-4 whitespace-nowrap font-medium text-xs sm:text-sm text-[#2D2528]">
                                        {b.orderId}
                                      </td>
                                      <td className="py-2.5 px-4 whitespace-nowrap font-semibold text-xs sm:text-sm text-[#2D2528]">
                                        {b.customerName}
                                      </td>
                                      <td className="py-2.5 px-4 whitespace-nowrap font-medium text-xs sm:text-sm text-[#2D2528]">
                                        {b.tableNo}
                                      </td>
                                      <td className="py-2.5 px-4 whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                        ₹ {b.amount.toLocaleString('en-IN')}
                                      </td>
                                      <td className="py-2.5 px-4 whitespace-nowrap text-xs sm:text-sm text-[#2D2528]">
                                        {b.paymentMethod}
                                      </td>
                                      <td className="py-2.5 px-4 whitespace-nowrap">
                                        <span
                                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${b.status === 'Paid'
                                            ? 'bg-[#DCFCE7] text-[#15803D]'
                                            : 'bg-[#FEF3C7] text-[#D97706]'
                                            }`}
                                        >
                                          {b.status}
                                        </span>
                                      </td>
                                      <td className="py-2.5 px-4 whitespace-nowrap text-center">
                                        <button
                                          type="button"
                                          onClick={() => setSelectedBillingRow(b)}
                                          className={`w-8 h-8 rounded-full inline-flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs ${isSelected
                                            ? 'bg-[#500F1D] text-white'
                                            : 'bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D]'
                                            }`}
                                          title="View Bill Details"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DDD8] bg-white">
                          <div className="text-xs sm:text-sm text-[#75696B] font-medium">
                            {filteredBillingBills.length === 0 ? (
                              'Showing 0 bills'
                            ) : (
                              `Showing ${(billingCurrentPage - 1) * billingRowsPerPage + 1}–${Math.min(
                                billingCurrentPage * billingRowsPerPage,
                                filteredBillingBills.length
                              )} of ${filteredBillingBills.length === billingBillsList.length
                                ? '1,248'
                                : filteredBillingBills.length
                              } bills`
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            {/* Pagination Numbers */}
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={billingCurrentPage <= 1}
                                onClick={() => setBillingCurrentPage((p) => Math.max(1, p - 1))}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#75696B] transition-colors ${billingCurrentPage <= 1
                                  ? 'opacity-40 cursor-not-allowed'
                                  : 'hover:bg-[#FAF7F5] cursor-pointer'
                                  }`}
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>

                              {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                  key={page}
                                  type="button"
                                  onClick={() => setBillingCurrentPage(page)}
                                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${billingCurrentPage === page
                                    ? 'bg-[#500F1D] text-white shadow-2xs'
                                    : 'hover:bg-[#FAF7F5] text-[#2D2528]'
                                    }`}
                                >
                                  {page}
                                </button>
                              ))}

                              <button
                                type="button"
                                disabled={billingCurrentPage >= totalBillingPages}
                                onClick={() => setBillingCurrentPage((p) => Math.min(totalBillingPages, p + 1))}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#75696B] transition-colors ${billingCurrentPage >= totalBillingPages
                                  ? 'opacity-40 cursor-not-allowed'
                                  : 'hover:bg-[#FAF7F5] cursor-pointer'
                                  }`}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Rows per page */}
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#75696B] font-medium">
                              <span>Rows per page:</span>
                              <div className="relative">
                                <select
                                  value={billingRowsPerPage}
                                  onChange={(e) => {
                                    setBillingRowsPerPage(Number(e.target.value));
                                    setBillingCurrentPage(1);
                                  }}
                                  className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl pl-3 pr-7 py-1 text-xs font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none cursor-pointer"
                                >
                                  <option value={5}>5</option>
                                  <option value={10}>10</option>
                                  <option value={20}>20</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5. Bill Details Side Panel Drawer (Opens ONLY when Eye icon is clicked) */}
                      {selectedBillingRow && (
                        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
                          {/* Backdrop */}
                          <div
                            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
                            onClick={() => setSelectedBillingRow(null)}
                          />

                          {/* Side Panel Drawer */}
                          <div className="relative z-10 w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl border-l border-[#E8DDD8] flex flex-col justify-between overflow-y-auto p-5 sm:p-6 animate-fadeIn">
                            <div>
                              {/* Top Header of Side Panel */}
                              <div className="flex items-center justify-between border-b border-[#E8DDD8]/80 pb-3.5 mb-4">
                                <div className="flex items-center gap-2">
                                  <ReceiptText className="w-5 h-5 text-[#500F1D]" />
                                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#500F1D]">Bill Details</h3>
                                </div>

                                <div className="flex items-center gap-2">
                                  {/* Copy Bill Number Pill */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (selectedBillingRow?.billNo) {
                                        navigator.clipboard?.writeText(selectedBillingRow.billNo);
                                        setBillingToast(`Copied ${selectedBillingRow.billNo} to clipboard!`);
                                        setTimeout(() => setBillingToast(''), 2000);
                                      }
                                    }}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8] text-xs font-bold text-[#500F1D] hover:bg-[#F2EAE4] transition-colors cursor-pointer shadow-2xs"
                                    title="Copy Bill No."
                                  >
                                    <span>{selectedBillingRow?.billNo || 'BILL1248'}</span>
                                    <Copy className="w-3.5 h-3.5 text-[#75696B]" />
                                  </button>

                                  {/* Close Button */}
                                  <button
                                    type="button"
                                    onClick={() => setSelectedBillingRow(null)}
                                    className="w-8 h-8 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] hover:bg-[#F2EAE4] transition-colors cursor-pointer shadow-2xs"
                                    title="Close panel"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Payment Status & Time Banner */}
                              <div className="flex flex-col items-center justify-center py-2 text-center">
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 shadow-2xs ${selectedBillingRow?.status === 'Paid' ? 'bg-[#500F1D]' : 'bg-[#D97706]'
                                    }`}
                                >
                                  {selectedBillingRow?.status === 'Paid' ? (
                                    <Check className="w-6 h-6 stroke-[2.5]" />
                                  ) : (
                                    <Clock className="w-6 h-6 stroke-[2.5]" />
                                  )}
                                </div>
                                <p
                                  className={`font-bold text-sm sm:text-base ${selectedBillingRow?.status === 'Paid' ? 'text-[#16A34A]' : 'text-[#D97706]'
                                    }`}
                                >
                                  {selectedBillingRow?.status === 'Paid' ? 'Payment Successful' : 'Payment Pending'}
                                </p>
                                <p className="text-xs text-[#75696B] font-medium mt-0.5">
                                  {selectedBillingRow?.dateTime || '30 Nov 2026, 09:45 AM'}
                                </p>
                              </div>

                              {/* Key-Value Details */}
                              <div className="space-y-3 text-xs sm:text-sm border-t border-b border-[#F5EDE8] py-4 my-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-[#75696B] font-medium">Order ID</span>
                                  <span className="font-semibold text-[#2D2528]">: {selectedBillingRow?.orderId}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[#75696B] font-medium">Customer Name</span>
                                  <span className="font-semibold text-[#2D2528]">: {selectedBillingRow?.customerName}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[#75696B] font-medium">Table Number</span>
                                  <span className="font-semibold text-[#2D2528]">: {selectedBillingRow?.tableNo}</span>
                                </div>

                                {/* Items Dropdown */}
                                <div className="relative">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[#75696B] font-medium">Items</span>
                                    <button
                                      type="button"
                                      onClick={() => setBillingItemsDropdownOpen(!billingItemsDropdownOpen)}
                                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#500F1D] hover:underline cursor-pointer"
                                    >
                                      <span>: View Items</span>
                                      <ChevronDown
                                        className={`w-3.5 h-3.5 transition-transform ${billingItemsDropdownOpen ? 'rotate-180' : ''
                                          }`}
                                      />
                                    </button>
                                  </div>

                                  {billingItemsDropdownOpen && (
                                    <div className="mt-2 p-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8] space-y-1.5 text-xs animate-fadeIn">
                                      {selectedBillingRow?.items?.map((it, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-[#2D2528]">
                                          <span>
                                            {it.name} <span className="text-[#75696B]">× {it.qty}</span>
                                          </span>
                                          <span className="font-bold">₹ {it.price}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-[#75696B] font-medium">Subtotal</span>
                                  <span className="font-semibold text-[#2D2528]">
                                    : ₹ {(selectedBillingRow?.subtotal || selectedBillingRow?.amount || 0).toLocaleString('en-IN')}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[#75696B] font-medium">Discount</span>
                                  <span className="font-semibold text-[#2D2528]">: ₹ {selectedBillingRow?.discount || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[#75696B] font-medium">Tax</span>
                                  <span className="font-semibold text-[#2D2528]">: ₹ {selectedBillingRow?.tax || 0}</span>
                                </div>
                              </div>

                              {/* Total Amount Box */}
                              <div className="p-3.5 rounded-2xl bg-[#FBF4EB] border border-[#EADACF] flex items-center justify-between text-xs sm:text-sm font-bold my-3">
                                <span className="text-[#500F1D] font-serif font-bold">Total Amount</span>
                                <span className="text-base sm:text-lg text-[#500F1D] font-extrabold">
                                  : ₹ {selectedBillingRow?.amount?.toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>

                            {/* Print Bill Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setBillingToast(`Printing bill ${selectedBillingRow?.billNo}...`);
                                setTimeout(() => {
                                  setBillingToast('');
                                  window.print();
                                }, 400);
                              }}
                              className="w-full mt-3 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-[#500F1D] text-[#500F1D] bg-white hover:bg-[#FAF5F2] font-semibold text-xs sm:text-sm transition-all shadow-2xs active:scale-95 cursor-pointer"
                            >
                              <Printer className="w-4 h-4 text-[#500F1D]" />
                              <span>Print Bill</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subtab 3: Payment Summary (Exact Reference Image: media_1795430759243_7e981db2.jpg) */}
                  {posSubTabActive === 'Payment Summary' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 1. Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-[#500F1D] flex items-center justify-center shrink-0 shadow-xs">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#500F1D] tracking-tight">
                              Payment Summary
                            </h1>
                            <p className="text-xs sm:text-sm text-[#75696B] font-medium mt-0.5">
                              Track payment details and summary
                            </p>
                          </div>
                        </div>

                        {/* Export Report Dropdown Button */}
                        <div className="self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={handleExportPaymentSummaryReport}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
                          >
                            <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
                            <span>Export Report</span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                          </button>
                        </div>
                      </div>

                      {/* Toast notification */}
                      {paymentSummaryToast && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] rounded-xl text-xs font-semibold animate-fadeIn">
                          <Check className="w-3.5 h-3.5" />
                          <span>{paymentSummaryToast}</span>
                        </div>
                      )}

                      {/* 2. 4 Metric KPI Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {/* Card 1: Total Transactions */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                          <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center shrink-0">
                            <Wallet className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Transactions</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2528] leading-tight">
                                1,248
                              </span>
                              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-0.5">
                                ↑ 12%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card 2: Total Payment Amount */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                          <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center shrink-0">
                            <span className="text-xl font-serif font-bold text-[#500F1D]">₹</span>
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Payment Amount</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2528] leading-tight">
                                ₹ 4,85,750
                              </span>
                              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-0.5">
                                ↑ 18%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card 3: Successful Payments */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                          <div className="w-12 h-12 rounded-full bg-[#500F1D] flex items-center justify-center shrink-0 text-white shadow-2xs">
                            <Check className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Successful Payments</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2528] leading-tight">
                                1,220
                              </span>
                              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-0.5">
                                ↑ 15%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card 4: Failed Payments */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                          <div className="w-12 h-12 rounded-full bg-[#500F1D] flex items-center justify-center shrink-0 text-white shadow-2xs">
                            <X className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Failed Payments</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2528] leading-tight">
                                28
                              </span>
                              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-0.5">
                                ↑ 2%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Middle Row: Payment Method Breakdown (Left) + Payment Trend (Right) */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        {/* WIDGET 1: Payment Method Breakdown (Left 6 Cols) */}
                        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E8DDD8] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                          {/* Header */}
                          <div className="flex items-center gap-2.5 pb-4 border-b border-[#E8DDD8]/80">
                            <BarChart3 className="w-5 h-5 text-[#500F1D]" />
                            <h2 className="font-serif font-bold text-base sm:text-lg text-[#500F1D]">
                              Payment Method Breakdown
                            </h2>
                          </div>

                          {/* Donut Chart & Legend Row */}
                          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4 flex-1">
                            {/* Donut Chart */}
                            <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                              <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
                                {/* Circumference ≈ 226.19 */}
                                {/* UPI: 42% -> 95.00 */}
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="36"
                                  fill="transparent"
                                  stroke="#500F1D"
                                  strokeWidth="16"
                                  strokeDasharray="95.00 131.19"
                                  strokeDashoffset="0"
                                />
                                {/* Cash: 32% -> 72.38 */}
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="36"
                                  fill="transparent"
                                  stroke="#E5A81E"
                                  strokeWidth="16"
                                  strokeDasharray="72.38 153.81"
                                  strokeDashoffset="-95.00"
                                />
                                {/* Card: 18% -> 40.71 */}
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="36"
                                  fill="transparent"
                                  stroke="#DC2626"
                                  strokeWidth="16"
                                  strokeDasharray="40.71 185.48"
                                  strokeDashoffset="-167.38"
                                />
                                {/* Online: 8% -> 18.10 */}
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="36"
                                  fill="transparent"
                                  stroke="#FED7AA"
                                  strokeWidth="16"
                                  strokeDasharray="18.10 208.09"
                                  strokeDashoffset="-208.09"
                                />
                              </svg>

                              {/* Donut Center Display */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                                <span className="text-base sm:text-lg font-serif font-bold text-[#2D2528] leading-tight">
                                  ₹4,85,750
                                </span>
                                <span className="text-[11px] font-medium text-[#75696B] mt-0.5">
                                  Total Amount
                                </span>
                              </div>
                            </div>

                            {/* Legend Details matching screenshot */}
                            <div className="space-y-3 w-full sm:w-auto text-xs sm:text-sm">
                              {/* UPI */}
                              <div className="flex items-center justify-between sm:justify-start gap-6">
                                <div className="flex items-center gap-2.5 min-w-[70px]">
                                  <span className="w-3 h-3 rounded-full bg-[#500F1D]"></span>
                                  <span className="font-semibold text-[#2D2528]">UPI</span>
                                </div>
                                <span className="font-semibold text-[#75696B] min-w-[36px]">42%</span>
                                <span className="font-bold text-[#2D2528] text-right min-w-[80px]">₹2,04,000</span>
                              </div>

                              {/* Cash */}
                              <div className="flex items-center justify-between sm:justify-start gap-6">
                                <div className="flex items-center gap-2.5 min-w-[70px]">
                                  <span className="w-3 h-3 rounded-full bg-[#E5A81E]"></span>
                                  <span className="font-semibold text-[#2D2528]">Cash</span>
                                </div>
                                <span className="font-semibold text-[#75696B] min-w-[36px]">32%</span>
                                <span className="font-bold text-[#2D2528] text-right min-w-[80px]">₹1,55,000</span>
                              </div>

                              {/* Card */}
                              <div className="flex items-center justify-between sm:justify-start gap-6">
                                <div className="flex items-center gap-2.5 min-w-[70px]">
                                  <span className="w-3 h-3 rounded-full bg-[#DC2626]"></span>
                                  <span className="font-semibold text-[#2D2528]">Card</span>
                                </div>
                                <span className="font-semibold text-[#75696B] min-w-[36px]">18%</span>
                                <span className="font-bold text-[#2D2528] text-right min-w-[80px]">₹87,500</span>
                              </div>

                              {/* Online */}
                              <div className="flex items-center justify-between sm:justify-start gap-6">
                                <div className="flex items-center gap-2.5 min-w-[70px]">
                                  <span className="w-3 h-3 rounded-full bg-[#FED7AA]"></span>
                                  <span className="font-semibold text-[#2D2528]">Online</span>
                                </div>
                                <span className="font-semibold text-[#75696B] min-w-[36px]">8%</span>
                                <span className="font-bold text-[#2D2528] text-right min-w-[80px]">₹38,250</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* WIDGET 2: Payment Trend (Right 6 Cols) */}
                        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E8DDD8] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                          {/* Header */}
                          <div className="flex items-center gap-2.5 pb-4 border-b border-[#E8DDD8]/80">
                            <TrendingUp className="w-5 h-5 text-[#500F1D]" />
                            <h2 className="font-serif font-bold text-base sm:text-lg text-[#500F1D]">
                              Payment Trend
                            </h2>
                          </div>

                          {/* Line Chart Body */}
                          <div className="relative pt-3 flex-1 flex flex-col justify-end">
                            <svg className="w-full h-48 sm:h-52" viewBox="0 0 500 200" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#870020" stopOpacity="0.18" />
                                  <stop offset="100%" stopColor="#870020" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>

                              {/* Horizontal Grid lines */}
                              <line x1="30" y1="30" x2="480" y2="30" stroke="#F0E8E4" strokeWidth="1" />
                              <line x1="30" y1="75" x2="480" y2="75" stroke="#F0E8E4" strokeWidth="1" />
                              <line x1="30" y1="120" x2="480" y2="120" stroke="#F0E8E4" strokeWidth="1" />
                              <line x1="30" y1="165" x2="480" y2="165" stroke="#E8DDD8" strokeWidth="1.2" />

                              {/* Y-axis Text Labels */}
                              <text x="8" y="34" fill="#75696B" fontSize="11" fontWeight="500">3k</text>
                              <text x="8" y="79" fill="#75696B" fontSize="11" fontWeight="500">2k</text>
                              <text x="8" y="124" fill="#75696B" fontSize="11" fontWeight="500">1k</text>
                              <text x="8" y="169" fill="#75696B" fontSize="11" fontWeight="500">0k</text>

                              {/* Area Fill */}
                              <polygon
                                points="
                                  45,130
                                  115,100
                                  185,82
                                  255,72
                                  325,66
                                  395,50
                                  465,72
                                  465,165
                                  45,165
                                "
                                fill="url(#trendGradient)"
                              />

                              {/* Line Graph */}
                              <polyline
                                fill="none"
                                stroke="#870020"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points="
                                  45,130
                                  115,100
                                  185,82
                                  255,72
                                  325,66
                                  395,50
                                  465,72
                                "
                              />

                              {/* Data Point Circles */}
                              {[
                                { x: 45, y: 130, val: '₹1,200', day: 'Mon' },
                                { x: 115, y: 100, val: '₹1,800', day: 'Tue' },
                                { x: 185, y: 82, val: '₹2,200', day: 'Wed' },
                                { x: 255, y: 72, val: '₹2,400', day: 'Thu' },
                                { x: 325, y: 66, val: '₹2,500', day: 'Fri' },
                                { x: 395, y: 50, val: '₹2,800', day: 'Sat' },
                                { x: 465, y: 72, val: '₹2,400', day: 'Sun' }
                              ].map((pt, i) => (
                                <g key={i}>
                                  <circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r="4.5"
                                    fill="#870020"
                                    stroke="#FFFFFF"
                                    strokeWidth="2"
                                    className="cursor-pointer hover:r-6 transition-all"
                                  />
                                </g>
                              ))}

                              {/* X-axis Day Labels */}
                              <text x="45" y="190" textAnchor="middle" fill="#75696B" fontSize="11" fontWeight="500">Mon</text>
                              <text x="115" y="190" textAnchor="middle" fill="#75696B" fontSize="11" fontWeight="500">Tue</text>
                              <text x="185" y="190" textAnchor="middle" fill="#75696B" fontSize="11" fontWeight="500">Wed</text>
                              <text x="255" y="190" textAnchor="middle" fill="#75696B" fontSize="11" fontWeight="500">Thu</text>
                              <text x="315" y="190" textAnchor="middle" fill="#75696B" fontSize="11" fontWeight="500">Fri</text>
                              <text x="395" y="190" textAnchor="middle" fill="#75696B" fontSize="11" fontWeight="500">Sat</text>
                              <text x="465" y="190" textAnchor="middle" fill="#75696B" fontSize="11" fontWeight="500">Sun</text>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* 4. Bottom Section: Recent Transactions Table */}
                      <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                        {/* Header toolbar */}
                        <div className="p-4 sm:p-5 border-b border-[#E8DDD8]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <Menu className="w-5 h-5 text-[#500F1D]" />
                            <h2 className="font-serif font-bold text-base sm:text-lg text-[#500F1D]">
                              Recent Transactions
                            </h2>
                          </div>

                          {/* All Payment Methods Filter Dropdown */}
                          <div className="relative self-start sm:self-auto">
                            <select
                              value={paymentSummaryMethodFilter}
                              onChange={(e) => {
                                setPaymentSummaryMethodFilter(e.target.value);
                                setPaymentSummaryCurrentPage(1);
                              }}
                              className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer shadow-2xs"
                            >
                              <option value="All Payment Methods">All Payment Methods</option>
                              <option value="UPI">UPI</option>
                              <option value="Card">Card</option>
                              <option value="Cash">Cash</option>
                              <option value="Online">Online</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Transactions Table */}
                        <div className="p-4 sm:p-5 overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead className="bg-[#FAF1EB]">
                              <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                                <th className="py-3 px-4 rounded-l-2xl whitespace-nowrap">Date &amp; Time</th>
                                <th className="py-3 px-4 whitespace-nowrap">Transaction ID</th>
                                <th className="py-3 px-4 whitespace-nowrap">Order ID</th>
                                <th className="py-3 px-4 whitespace-nowrap">Payment Method</th>
                                <th className="py-3 px-4 whitespace-nowrap">Amount</th>
                                <th className="py-3 px-4 whitespace-nowrap">Status</th>
                                <th className="text-center py-3 px-4 rounded-r-2xl whitespace-nowrap">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F5EDE8] bg-white">
                              {paginatedPaymentSummaryTransactions.length === 0 ? (
                                <tr>
                                  <td colSpan={7} className="py-12 text-center text-[#75696B]">
                                    <p className="font-bold text-sm text-[#2D2528]">No transactions found</p>
                                    <p className="text-xs text-[#75696B]">
                                      Try switching payment method filters.
                                    </p>
                                  </td>
                                </tr>
                              ) : (
                                paginatedPaymentSummaryTransactions.map((tx) => (
                                  <tr key={tx.id} className="hover:bg-[#FAF7F5] transition-colors">
                                    <td className="py-3.5 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                      {tx.dateTime}
                                    </td>
                                    <td className="py-3.5 px-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-[#2D2528]">
                                      {tx.transactionId}
                                    </td>
                                    <td className="py-3.5 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                      {tx.orderId}
                                    </td>
                                    <td className="py-3.5 px-4 whitespace-nowrap">
                                      <div className="flex items-center gap-2">
                                        {tx.method === 'UPI' && (
                                          <div className="w-6 h-6 rounded-md bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold text-[9px]">
                                            UPI
                                          </div>
                                        )}
                                        {tx.method === 'Card' && (
                                          <div className="w-6 h-6 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                                            <CreditCard className="w-3.5 h-3.5" />
                                          </div>
                                        )}
                                        {tx.method === 'Cash' && (
                                          <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                                            <Wallet className="w-3.5 h-3.5" />
                                          </div>
                                        )}
                                        {tx.method === 'Online' && (
                                          <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-[9px]">
                                            NET
                                          </div>
                                        )}
                                        <span className="font-semibold text-xs sm:text-sm text-[#2D2528]">
                                          {tx.method}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3.5 px-4 whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                      ₹ {tx.amount.toLocaleString('en-IN')}
                                    </td>
                                    <td className="py-3.5 px-4 whitespace-nowrap">
                                      <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${tx.status === 'Success'
                                          ? 'bg-[#DCFCE7] text-[#15803D]'
                                          : 'bg-[#FEE2E2] text-[#DC2626]'
                                          }`}
                                      >
                                        <span
                                          className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Success' ? 'bg-[#16A34A]' : 'bg-[#DC2626]'
                                            }`}
                                        ></span>
                                        <span>{tx.status}</span>
                                      </span>
                                    </td>
                                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                                      <button
                                        type="button"
                                        onClick={() => setSelectedTransactionModal(tx)}
                                        className="px-4 py-1.5 rounded-full border border-[#E8DDD8] text-xs font-semibold text-[#500F1D] bg-[#FAF7F5] hover:bg-[#F2EAE4] transition-colors cursor-pointer shadow-2xs"
                                      >
                                        View
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DDD8] bg-white">
                          <div className="text-xs sm:text-sm text-[#75696B] font-medium">
                            {filteredPaymentSummaryTransactions.length === 0 ? (
                              'Showing 0 transactions'
                            ) : (
                              `Showing ${(paymentSummaryCurrentPage - 1) * paymentSummaryRowsPerPage + 1}–${Math.min(
                                paymentSummaryCurrentPage * paymentSummaryRowsPerPage,
                                filteredPaymentSummaryTransactions.length
                              )} of ${filteredPaymentSummaryTransactions.length === paymentSummaryTransactions.length
                                ? '1,248'
                                : filteredPaymentSummaryTransactions.length
                              } transactions`
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            {/* Pagination Numbers */}
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={paymentSummaryCurrentPage <= 1}
                                onClick={() => setPaymentSummaryCurrentPage((p) => Math.max(1, p - 1))}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#75696B] transition-colors ${paymentSummaryCurrentPage <= 1
                                  ? 'opacity-40 cursor-not-allowed'
                                  : 'hover:bg-[#FAF7F5] cursor-pointer'
                                  }`}
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>

                              {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                  key={page}
                                  type="button"
                                  onClick={() => setPaymentSummaryCurrentPage(page)}
                                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${paymentSummaryCurrentPage === page
                                    ? 'bg-[#500F1D] text-white shadow-2xs'
                                    : 'hover:bg-[#FAF7F5] text-[#2D2528]'
                                    }`}
                                >
                                  {page}
                                </button>
                              ))}

                              <button
                                type="button"
                                disabled={paymentSummaryCurrentPage >= totalPaymentSummaryPages}
                                onClick={() =>
                                  setPaymentSummaryCurrentPage((p) => Math.min(totalPaymentSummaryPages, p + 1))
                                }
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#75696B] transition-colors ${paymentSummaryCurrentPage >= totalPaymentSummaryPages
                                  ? 'opacity-40 cursor-not-allowed'
                                  : 'hover:bg-[#FAF7F5] cursor-pointer'
                                  }`}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Rows per page */}
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#75696B] font-medium">
                              <span>Rows per page:</span>
                              <div className="relative">
                                <select
                                  value={paymentSummaryRowsPerPage}
                                  onChange={(e) => {
                                    setPaymentSummaryRowsPerPage(Number(e.target.value));
                                    setPaymentSummaryCurrentPage(1);
                                  }}
                                  className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl pl-3 pr-7 py-1 text-xs font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none cursor-pointer"
                                >
                                  <option value={5}>5</option>
                                  <option value={10}>10</option>
                                  <option value={20}>20</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subtab 5: Daily Report (Exact Reference Image: media_1795435491705_e040b1a0.jpg) */}
                  {posSubTabActive === 'Daily Report' && renderDailyReport()}

                  {/* Fallback for other subtabs (e.g. Refund Requests) */}
                  {posSubTabActive !== 'POS Transactions' &&
                    posSubTabActive !== 'Billing Overview' &&
                    posSubTabActive !== 'Payment Summary' &&
                    posSubTabActive !== 'Food Sales Reports' &&
                    posSubTabActive !== 'Food Sales Report' &&
                    posSubTabActive !== 'Food & Sales Report' &&
                    posSubTabActive !== 'Daily Report' && (
                      <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DDD8] space-y-3">
                        <div className="w-16 h-16 rounded-2xl bg-[#FAF2EB] text-[#500F1D] flex items-center justify-center mx-auto">
                          <ReceiptText className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[#500F1D]">{posSubTabActive}</h3>
                        <p className="text-sm text-[#75696B]">This section is coming soon or currently has no active records.</p>
                      </div>
                    )}
                </div>
              )}

          {/* ==============================================================
              6. REPORTS & ANALYTICS
              ============================================================== */}
          {(activeSection === 'reports' || (activeSection === 'pos-reports' && posReportViewMode === 'reports')) && (
            <div className="space-y-6 animate-fadeIn">
              {/* Reports Header Banner */}
              <div className="rounded-3xl bg-[#500F1D] p-6 sm:p-7 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#500F1D] flex items-center justify-center shadow-xs shrink-0">
                    <FileText className="w-6 h-6 text-[#500F1D]" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Reports</h1>
                    <p className="text-xs sm:text-sm text-white/80 mt-0.5">Audit customer complaints, sales performance and dining details</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { handleSectionSelect('pos'); setPosReportViewMode('pos'); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Back to POS</span>
                </button>
              </div>

              {/* Reports Sub-tabs Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* 1. Customer Complaints */}
                <button
                  type="button"
                  onClick={() => setReportsSubTabActive('Customer Complaints')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${reportsSubTabActive === 'Customer Complaints'
                    ? 'bg-[#500F1D] text-white shadow-xs'
                    : 'bg-[#FAF5F0] hover:bg-[#F2EAE4] text-[#4A3E3D] border border-[#EFE5E0]'
                    }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">!</div>
                  <span>Customer Complaints</span>
                </button>

                {/* 2. Sales Report */}
                <button
                  type="button"
                  onClick={() => setReportsSubTabActive('Sales Report')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${reportsSubTabActive === 'Sales Report'
                    ? 'bg-[#500F1D] text-white shadow-xs'
                    : 'bg-[#FAF5F0] hover:bg-[#F2EAE4] text-[#4A3E3D] border border-[#EFE5E0]'
                    }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Sales Report</span>
                </button>

                {/* 3. Table Report */}
                <button
                  type="button"
                  onClick={() => setReportsSubTabActive('Table Report')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${reportsSubTabActive === 'Table Report'
                    ? 'bg-[#500F1D] text-white shadow-xs'
                    : 'bg-[#FAF5F0] hover:bg-[#F2EAE4] text-[#4A3E3D] border border-[#EFE5E0]'
                    }`}
                >
                  <Armchair className="w-4 h-4" />
                  <span>Table Report</span>
                </button>

                {/* 4. Daily Report */}
                <button
                  type="button"
                  onClick={() => setReportsSubTabActive('Daily Report')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${reportsSubTabActive === 'Daily Report'
                    ? 'bg-[#500F1D] text-white shadow-xs'
                    : 'bg-[#FAF5F0] hover:bg-[#F2EAE4] text-[#4A3E3D] border border-[#EFE5E0]'
                    }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Daily Report</span>
                </button>
              </div>

                  {/* Subtab 1: Customer Complaints */}
                  {reportsSubTabActive === 'Customer Complaints' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Filter Bar */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* All Tables */}
                        <div className="relative">
                          <select
                            value={reportsTableFilter}
                            onChange={(e) => setReportsTableFilter(e.target.value)}
                            className="appearance-none bg-white border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#FAF7F5] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-xs cursor-pointer"
                          >
                            <option value="All Tables">All Tables</option>
                            <option value="T01">Table T01</option>
                            <option value="T03">Table T03</option>
                            <option value="T05">Table T05</option>
                            <option value="T07">Table T07</option>
                            <option value="T09">Table T09</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* All Status */}
                        <div className="relative">
                          <select
                            value={reportsStatusFilter}
                            onChange={(e) => setReportsStatusFilter(e.target.value)}
                            className="appearance-none bg-white border border-[#E8DDD8] rounded-2xl pl-4 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#FAF7F5] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-xs cursor-pointer"
                          >
                            <option value="All Status">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Date Range Pill */}
                        <div className="relative">
                          <div className="flex items-center gap-2 bg-white border border-[#E8DDD8] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#2D2528] shadow-xs cursor-pointer">
                            <Calendar className="w-4 h-4 text-[#75696B]" />
                            <span>21 Nov 2025 – 21 Nov 2025</span>
                            <ChevronDown className="w-3.5 h-3.5 text-[#75696B]" />
                          </div>
                        </div>

                        {/* Apply Filter Button */}
                        <button
                          type="button"
                          onClick={() => alert('Filter applied to complaints report')}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                        >
                          <Filter className="w-4 h-4" />
                          <span>Apply Filter</span>
                        </button>
                      </div>

                      {/* Section Title */}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="w-6 h-6 rounded-lg bg-[#FEE2E2] flex items-center justify-center text-[#DC2626]">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <h2 className="text-xl font-serif font-bold text-[#2D2528]">Customer Complaints</h2>
                      </div>

                      {/* Complaints Table Container */}
                      <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                        <div className="p-4 sm:p-6 overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead className="bg-[#500F1D]">
                              <tr className="text-white font-bold text-xs sm:text-sm">
                                <th className="w-12 text-center py-3.5 px-3 rounded-l-2xl">#</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Date & Time</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Table No.</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Complaint</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                                <th className="text-center py-3.5 px-4 whitespace-nowrap rounded-r-2xl">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F5EDE8]">
                              {customerComplaints
                                .filter(c => {
                                  if (reportsTableFilter !== 'All Tables' && c.tableNo !== reportsTableFilter) return false;
                                  if (reportsStatusFilter !== 'All Status' && c.status !== reportsStatusFilter) return false;
                                  return true;
                                })
                                .map((c) => (
                                  <tr key={c.id} className="hover:bg-[#FAF7F5] transition-colors">
                                    <td className="text-center py-4 px-3 font-semibold text-xs sm:text-sm text-[#2D2528]">
                                      {c.id}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap text-xs sm:text-sm text-[#2D2528]">
                                      <div className="font-semibold">{c.date}</div>
                                      <div className="text-[#75696B] text-xs font-normal">{c.time}</div>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap font-bold text-sm text-[#2D2528]">
                                      {c.tableNo}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap font-semibold text-xs sm:text-sm text-[#2D2528]">
                                      {c.complaint}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${c.status === 'Pending'
                                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                                        : c.status === 'In Progress'
                                          ? 'bg-[#FEF9C3] text-[#B45309]'
                                          : 'bg-[#DCFCE7] text-[#15803D]'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Pending' ? 'bg-[#DC2626]' :
                                          c.status === 'In Progress' ? 'bg-[#D97706]' :
                                            'bg-[#16A34A]'
                                          }`}></span>
                                        {c.status}
                                      </span>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap text-center">
                                      <div className="flex items-center justify-center gap-1.5 relative">
                                        <button
                                          type="button"
                                          onClick={() => setSelectedComplaintModal(c)}
                                          className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                          title="View Complaint Details"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setSelectedComplaintModal(c)}
                                          className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                          title="Resolve / Edit Complaint"
                                        >
                                          <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setCustomerComplaints(prev => prev.map(comp => comp.id === c.id ? { ...comp, status: comp.status === 'Resolved' ? 'In Progress' : 'Resolved' } : comp));
                                          }}
                                          className="w-8 h-8 rounded-xl bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                          title="Toggle Resolved Status"
                                        >
                                          <MoreVertical className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-4 sm:p-5 flex items-center justify-between gap-4 border-t border-[#E8DDD8] bg-white">
                          <div className="text-xs text-[#75696B] font-medium">
                            Showing 1–5 of 5 Complaints
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled
                              className="w-7 h-7 rounded-lg border border-[#E8DDD8] flex items-center justify-center text-[#75696B] opacity-50 cursor-not-allowed"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              className="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center bg-[#500F1D] text-white shadow-xs"
                            >
                              1
                            </button>
                            <button
                              type="button"
                              disabled
                              className="w-7 h-7 rounded-lg border border-[#E8DDD8] flex items-center justify-center text-[#75696B] opacity-50 cursor-not-allowed"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

{/* ==============================================================
                      SUBTAB: SALES REPORT (Exact Reference Image media_1795427482538_6216289d.jpg)
                      ============================================================== */}
                  {reportsSubTabActive === 'Sales Report' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 1. Header Row: Sales Report Title & Export Report Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          {/* Burgundy Rounded Square Icon with Line & Bars SVG */}
                          <div className="w-12 h-12 rounded-2xl bg-[#500F1D] flex items-center justify-center shrink-0 shadow-xs">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 3v18h18" />
                              <path d="m19 7-6 6-4-4-5 5" />
                              <path d="M15 7h4v4" />
                              <path d="M7 17v-2" />
                              <path d="M11 17v-5" />
                              <path d="M15 17v-8" />
                            </svg>
                          </div>
                          <div>
                            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#500F1D] tracking-tight">Sales Report</h1>
                            <p className="text-xs sm:text-sm text-[#75696B] font-medium mt-0.5">Track your restaurant sales and performance</p>
                          </div>
                        </div>

                        {/* Export Report Button */}
                        <div className="self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={() => {
                              const headers = ['Date & Time', 'Order ID', 'Table No.', 'Items', 'Category', 'Amount', 'Payment Method', 'Status'];
                              const rows = filteredSalesReportEntries.map(e => [
                                `"${e.dateTime}"`,
                                `"${e.orderId}"`,
                                `"${e.tableNo}"`,
                                `"${e.items}"`,
                                `"${e.category}"`,
                                `"₹ ${e.amount}"`,
                                `"${e.paymentMethod}"`,
                                `"${e.status}"`
                              ]);
                              const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                              const encodedUri = encodeURI(csvContent);
                              const link = document.createElement('a');
                              link.setAttribute('href', encodedUri);
                              link.setAttribute('download', 'Sales_Report_30Nov2026.csv');
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                          >
                            <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
                            <span>Export Report</span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-90" />
                          </button>
                        </div>
                      </div>

                      {/* 2. 4 Summary Metric Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {/* Card 1: Total Orders */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <ShoppingCart className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Orders</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">1,248</div>
                              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">
                                <span>↑ 12%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 2: Total Revenue */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center text-[#500F1D] font-bold text-xl shrink-0 shadow-2xs">
                            ₹
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Revenue</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">₹4,85,750</div>
                              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">
                                <span>↑ 18%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 3: Average Bill */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Average Bill</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <div className="text-2xl font-bold text-[#2D2528] leading-tight">₹389</div>
                              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">
                                <span>↑ 10%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 4: Top Selling Item */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <Star className="w-5 h-5 fill-[#500F1D] text-[#500F1D]" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs text-[#75696B] font-semibold truncate">Top Selling Item</p>
                            <div className="text-2xl font-bold text-[#2D2528] leading-tight mt-0.5 truncate">
                              Paneer Tikka
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Toast notification if filter applied */}
                      {salesFilterToast && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] rounded-xl text-xs font-semibold animate-fadeIn">
                          <Check className="w-3.5 h-3.5" />
                          <span>{salesFilterToast}</span>
                        </div>
                      )}

                      {/* 3. Section Title: Sales Details (Moved Above Filters Row) */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <div className="w-7 h-7 rounded-lg bg-[#500F1D] flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="3" y="14" width="4" height="7" rx="1" />
                            <rect x="10" y="8" width="4" height="13" rx="1" />
                            <rect x="17" y="3" width="4" height="18" rx="1" />
                          </svg>
                        </div>
                        <h2 className="text-xl font-serif font-bold text-[#500F1D]">Sales Details</h2>
                      </div>

                      {/* 4. Unified Card: Filters Row + Table Container Connected Seamlessly */}
                      <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                        {/* Filters & Search Row directly connected with the table */}
                        <div className="p-4 sm:p-5 border-b border-[#E8DDD8] flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white">
                          {/* Left: Filter Dropdowns */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                            {/* Select Date Range */}
                            <div className="relative">
                              <select
                                value={salesDateRangeFilter}
                                onChange={(e) => {
                                  setSalesDateRangeFilter(e.target.value);
                                  setSalesCurrentPage(1);
                                }}
                                className={`appearance-none bg-white border rounded-2xl pl-9 pr-8 py-2 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer ${salesDateRangeFilter && salesDateRangeFilter !== 'All Dates'
                                  ? 'border-[#500F1D] text-[#500F1D] bg-[#FAF5F2]'
                                  : 'border-[#E8DDD8] text-[#2D2528] hover:border-[#500F1D]/60'
                                  }`}
                              >
                                <option value="All Dates">Select Date Range</option>
                                <option value="Today">Today (30 Nov 2026)</option>
                                <option value="Yesterday">Yesterday (29 Nov 2026)</option>
                                <option value="Last 7 Days">Last 7 Days</option>
                                <option value="This Month">This Month (Nov 2026)</option>
                              </select>
                              <Calendar className="w-4 h-4 text-[#500F1D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                              <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* All Categories */}
                            <div className="relative">
                              <select
                                value={salesCategoryFilter}
                                onChange={(e) => {
                                  setSalesCategoryFilter(e.target.value);
                                  setSalesCurrentPage(1);
                                }}
                                className={`appearance-none bg-white border rounded-2xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer ${salesCategoryFilter && salesCategoryFilter !== 'All Categories'
                                  ? 'border-[#500F1D] text-[#500F1D] bg-[#FAF5F2]'
                                  : 'border-[#E8DDD8] text-[#2D2528] hover:border-[#500F1D]/60'
                                  }`}
                              >
                                <option value="All Categories">All Categories</option>
                                <option value="Starter">Starter</option>
                                <option value="Beverage">Beverage</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Dessert">Dessert</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* All Payment Methods */}
                            <div className="relative">
                              <select
                                value={salesPaymentFilter}
                                onChange={(e) => {
                                  setSalesPaymentFilter(e.target.value);
                                  setSalesCurrentPage(1);
                                }}
                                className={`appearance-none bg-white border rounded-2xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer ${salesPaymentFilter && salesPaymentFilter !== 'All Payment Methods'
                                  ? 'border-[#500F1D] text-[#500F1D] bg-[#FAF5F2]'
                                  : 'border-[#E8DDD8] text-[#2D2528] hover:border-[#500F1D]/60'
                                  }`}
                              >
                                <option value="All Payment Methods">All Payment Methods</option>
                                <option value="UPI">UPI</option>
                                <option value="Card">Card</option>
                                <option value="Cash">Cash</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* All Status */}
                            <div className="relative">
                              <select
                                value={salesStatusFilter}
                                onChange={(e) => {
                                  setSalesStatusFilter(e.target.value);
                                  setSalesCurrentPage(1);
                                }}
                                className={`appearance-none bg-white border rounded-2xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer ${salesStatusFilter && salesStatusFilter !== 'All Status'
                                  ? 'border-[#500F1D] text-[#500F1D] bg-[#FAF5F2]'
                                  : 'border-[#E8DDD8] text-[#2D2528] hover:border-[#500F1D]/60'
                                  }`}
                              >
                                <option value="All Status">All Status</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* Middle: Clean, Beautiful Search Bar matching reference image with proper alignment, spacing, and icon padding */}
                          <div className="relative flex-1 min-w-[220px] max-w-sm">
                            <Search className="w-4 h-4 text-[#75696B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Search by Order ID, Table No, Items..."
                              value={salesSearchQuery}
                              onChange={(e) => {
                                setSalesSearchQuery(e.target.value);
                                setSalesCurrentPage(1);
                              }}
                              className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-10 pr-9 py-2 text-xs sm:text-sm text-[#2D2528] placeholder-[#75696B] focus:outline-none focus:ring-1 focus:ring-[#500F1D] focus:border-[#500F1D] shadow-2xs transition-colors"
                            />
                            {salesSearchQuery && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSalesSearchQuery('');
                                  setSalesCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#75696B] hover:text-[#500F1D] cursor-pointer"
                                title="Clear search"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          {/* Right: Apply Filter Button & Reset Action */}
                          <div className="flex items-center gap-2 shrink-0">
                            {(salesSearchQuery ||
                              salesCategoryFilter !== 'All Categories' ||
                              salesPaymentFilter !== 'All Payment Methods' ||
                              salesStatusFilter !== 'All Status' ||
                              (salesDateRangeFilter !== 'All Dates' && salesDateRangeFilter !== '')) && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSalesSearchQuery('');
                                    setSalesCategoryFilter('All Categories');
                                    setSalesPaymentFilter('All Payment Methods');
                                    setSalesStatusFilter('All Status');
                                    setSalesDateRangeFilter('All Dates');
                                    setSalesCurrentPage(1);
                                    setSalesFilterToast('All filters reset');
                                    setTimeout(() => setSalesFilterToast(''), 2000);
                                  }}
                                  className="px-3.5 py-2 rounded-2xl bg-[#FAF7F5] hover:bg-[#F2EAE4] border border-[#E8DDD8] text-xs font-semibold text-[#500F1D] transition-colors cursor-pointer"
                                  title="Reset all filters"
                                >
                                  Reset
                                </button>
                              )}

                            <button
                              type="button"
                              onClick={() => {
                                const count = filteredSalesReportEntries.length;
                                setSalesFilterToast(`Filters applied: ${count} transaction${count === 1 ? '' : 's'} found`);
                                setTimeout(() => setSalesFilterToast(''), 2500);
                              }}
                              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
                            >
                              <Filter className="w-4 h-4 fill-white" />
                              <span>Apply Filter</span>
                            </button>
                          </div>
                        </div>
                        <div className="p-4 sm:p-5 overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            {/* Table Header matching exact reference image: compact height, bg-[#FAF1EB], text-[#500F1D] */}
                            <thead className="bg-[#FAF1EB]">
                              <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                                <th className="py-2.5 px-4 rounded-l-2xl whitespace-nowrap">Date & Time</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Order ID</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Table No.</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Items</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Category</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Amount</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Payment Method</th>
                                <th className="py-2.5 px-4 whitespace-nowrap">Status</th>
                                <th className="text-center py-2.5 px-4 rounded-r-2xl whitespace-nowrap">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F5EDE8] bg-white">
                              {paginatedSalesReportEntries.length === 0 ? (
                                <tr>
                                  <td colSpan={9} className="py-12 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                      <div className="w-12 h-12 rounded-full bg-[#FAF2EB] text-[#500F1D] flex items-center justify-center shadow-2xs">
                                        <Search className="w-5 h-5 text-[#500F1D]" />
                                      </div>
                                      <p className="font-serif font-bold text-base text-[#2D2528]">No sales transactions found</p>
                                      <p className="text-xs text-[#75696B] max-w-sm">
                                        No orders match your selected filters or search query.
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSalesSearchQuery('');
                                          setSalesCategoryFilter('All Categories');
                                          setSalesPaymentFilter('All Payment Methods');
                                          setSalesStatusFilter('All Status');
                                          setSalesDateRangeFilter('All Dates');
                                          setSalesCurrentPage(1);
                                        }}
                                        className="px-4 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0B16] transition-colors cursor-pointer"
                                      >
                                        Clear All Filters
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ) : (
                                paginatedSalesReportEntries.map((row) => (
                                  <tr key={row.id} className="hover:bg-[#FAF7F5] transition-colors">
                                    {/* Date & Time */}
                                    <td className="py-2.5 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                      {row.dateTime}
                                    </td>

                                    {/* Order ID */}
                                    <td className="py-2.5 px-4 whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                      {row.orderId}
                                    </td>

                                    {/* Table No. */}
                                    <td className="py-2.5 px-4 whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                      {row.tableNo}
                                    </td>

                                    {/* Items */}
                                    <td className="py-2.5 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                      {row.items}
                                    </td>

                                    {/* Category */}
                                    <td className="py-2.5 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                      {row.category}
                                    </td>

                                    {/* Amount */}
                                    <td className="py-2.5 px-4 whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                      ₹ {row.amount}
                                    </td>

                                    {/* Payment Method */}
                                    <td className="py-2.5 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                      {row.paymentMethod}
                                    </td>

                                    {/* Status */}
                                    <td className="py-2.5 px-4 whitespace-nowrap">
                                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${row.status === 'Completed'
                                        ? 'bg-[#DCFCE7] text-[#15803D]'
                                        : 'bg-[#FEF3C7] text-[#D97706]'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Completed' ? 'bg-[#16A34A]' : 'bg-[#D97706]'
                                          }`}></span>
                                        <span>{row.status}</span>
                                      </span>
                                    </td>

                                    {/* Action */}
                                    <td className="py-2.5 px-4 whitespace-nowrap text-center">
                                      <button
                                        type="button"
                                        onClick={() => setSelectedSalesReportModal(row)}
                                        className="w-7 h-7 rounded-lg bg-[#FAF2EB] hover:bg-[#F2E5DC] text-[#500F1D] inline-flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
                                        title="View Order Details"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DDD8] bg-white">
                          <div className="text-xs sm:text-sm text-[#75696B] font-medium">
                            {filteredSalesReportEntries.length === 0 ? (
                              'Showing 0 entries'
                            ) : (
                              `Showing ${(salesCurrentPage - 1) * salesRowsPerPage + 1}–${Math.min(
                                salesCurrentPage * salesRowsPerPage,
                                filteredSalesReportEntries.length
                              )} of ${filteredSalesReportEntries.length === salesReportEntries.length
                                ? '1,248'
                                : filteredSalesReportEntries.length
                              } entries`
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            {/* Pagination Controls */}
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={salesCurrentPage <= 1}
                                onClick={() => setSalesCurrentPage(p => Math.max(1, p - 1))}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#75696B] transition-colors ${salesCurrentPage <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#FAF7F5] cursor-pointer'
                                  }`}
                              >
                                &lt;
                              </button>

                              {Array.from({ length: totalSalesPages }, (_, i) => i + 1).slice(0, 5).map((pg) => (
                                <button
                                  key={pg}
                                  type="button"
                                  onClick={() => setSalesCurrentPage(pg)}
                                  className={`w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm font-semibold flex items-center justify-center cursor-pointer transition-colors ${salesCurrentPage === pg
                                    ? 'rounded-full bg-[#500F1D] text-white font-bold shadow-xs'
                                    : 'rounded-lg text-[#2D2528] hover:bg-[#FAF7F5]'
                                    }`}
                                >
                                  {pg}
                                </button>
                              ))}

                              <button
                                type="button"
                                disabled={salesCurrentPage >= totalSalesPages}
                                onClick={() => setSalesCurrentPage(p => Math.min(totalSalesPages, p + 1))}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#75696B] transition-colors ${salesCurrentPage >= totalSalesPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#FAF7F5] cursor-pointer'
                                  }`}
                              >
                                &gt;
                              </button>
                            </div>

                            {/* Rows per page selector */}
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#75696B] ml-2">
                              <span>Rows per page:</span>
                              <div className="relative">
                                <select
                                  value={salesRowsPerPage}
                                  onChange={(e) => {
                                    setSalesRowsPerPage(Number(e.target.value));
                                    setSalesCurrentPage(1);
                                  }}
                                  className="appearance-none bg-white border border-[#E8DDD8] rounded-lg pl-2.5 pr-6 py-1 text-xs font-semibold text-[#2D2528] hover:bg-[#FAF7F5] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                                >
                                  <option value={5}>5</option>
                                  <option value={10}>10</option>
                                  <option value={20}>20</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}


                  {/* Tab 3: Table Report (Exact Reference Image 1 media_1795434943328_a3a99345.jpg) */}
                  {reportsSubTabActive === 'Table Report' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Toast Notification */}
                      {tableReportToast && (
                        <div className="p-3.5 rounded-2xl bg-[#DCFCE7] border border-[#16A34A]/30 text-[#15803D] text-xs font-semibold flex items-center justify-between animate-fadeIn">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                            <span>{tableReportToast}</span>
                          </div>
                          <button onClick={() => setTableReportToast('')} className="text-[#15803D] hover:text-[#16A34A] cursor-pointer">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* 1. Header: Burgundy Square Icon + Title + Assign Table Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-[#500F1D] flex items-center justify-center shrink-0 shadow-xs">
                            <TableReportHeaderIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#500F1D] tracking-tight">Table Report</h1>
                            <p className="text-xs sm:text-sm text-[#75696B] font-medium mt-0.5">Track table status, assignments and dining details</p>
                          </div>
                        </div>

                        {/* + Assign Table Button */}
                        <div className="self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={() => setIsAssignTableModalOpen(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                          >
                            <Plus className="w-4 h-4 stroke-[2.2]" />
                            <span>Assign Table</span>
                          </button>
                        </div>
                      </div>

                      {/* 2. 4 Metric KPI Cards (Exact Image 1) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {/* Card 1: Total Tables */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <TableReportHeaderIcon className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Total Tables</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <span className="text-2xl font-bold text-[#2D2528] leading-tight">20</span>
                              <span className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">↑ 2%</span>
                            </div>
                          </div>
                        </div>

                        {/* Card 2: Occupied Tables */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Occupied Tables</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <span className="text-2xl font-bold text-[#2D2528] leading-tight">14</span>
                              <span className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">↑ 1%</span>
                            </div>
                          </div>
                        </div>

                        {/* Card 3: Available Tables */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <Clock className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Available Tables</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <span className="text-2xl font-bold text-[#2D2528] leading-tight">6</span>
                              <span className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">↑ 3%</span>
                            </div>
                          </div>
                        </div>

                        {/* Card 4: Today's Bookings */}
                        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                          <div className="w-12 h-12 rounded-full bg-[#FAF2EB] flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-[#500F1D]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#75696B] font-semibold">Today's Bookings</p>
                            <div className="flex items-baseline gap-2.5 mt-0.5">
                              <span className="text-2xl font-bold text-[#2D2528] leading-tight">48</span>
                              <span className="text-xs font-semibold text-[#15803D] flex items-center gap-0.5">↑ 8%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Sub-tabs Row */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {[
                          { id: 'Table Overview', label: 'Table Overview' },
                          { id: 'Table History', label: 'Table History' },
                          { id: 'Assign History', label: 'Assign History' },
                          { id: 'Waiter Performance', label: 'Waiter Performance' }
                        ].map((subTab) => {
                          const isActive = tableReportSubTab === subTab.id;
                          return (
                            <button
                              key={subTab.id}
                              type="button"
                              onClick={() => setTableReportSubTab(subTab.id)}
                              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                isActive
                                  ? 'bg-[#500F1D] text-white shadow-xs'
                                  : 'bg-[#FAF5F0] hover:bg-[#F2EAE4] text-[#4A3E3D] border border-[#EFE5E0]'
                              }`}
                            >
                              <span>{subTab.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Sub-tab 1: Table Overview (Exact Image 1) */}
                      {tableReportSubTab === 'Table Overview' && (
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                          {/* Left: Table Container & Search/Filters */}
                          <div className="xl:col-span-8 2xl:col-span-9 space-y-4">
                            {/* Search and Filters Bar */}
                            <div className="bg-white rounded-3xl p-3 sm:p-4 border border-[#E8DDD8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                              {/* Search Bar */}
                              <div className="relative flex-1 min-w-[200px]">
                                <Search className="w-4 h-4 text-[#75696B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                  type="text"
                                  placeholder="Search by Table No...."
                                  value={tableReportSearchQuery}
                                  onChange={(e) => {
                                    setTableReportSearchQuery(e.target.value);
                                    setTableReportCurrentPage(1);
                                  }}
                                  className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-10 pr-9 py-2 text-xs sm:text-sm text-[#2D2528] placeholder-[#75696B] focus:outline-none focus:ring-1 focus:ring-[#500F1D] focus:border-[#500F1D] transition-colors"
                                />
                                {tableReportSearchQuery && (
                                  <button
                                    type="button"
                                    onClick={() => setTableReportSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#75696B] hover:text-[#500F1D] cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>

                              {/* Filters Dropdown */}
                              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                                {/* All Status */}
                                <div className="relative">
                                  <select
                                    value={tableReportStatusFilter}
                                    onChange={(e) => {
                                      setTableReportStatusFilter(e.target.value);
                                      setTableReportCurrentPage(1);
                                    }}
                                    className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                                  >
                                    <option value="All Status">All Status</option>
                                    <option value="Occupied">Occupied</option>
                                    <option value="Available">Available</option>
                                    <option value="Reserved">Reserved</option>
                                  </select>
                                  <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>

                                {/* All Waiter */}
                                <div className="relative">
                                  <select
                                    value={tableReportWaiterFilter}
                                    onChange={(e) => {
                                      setTableReportWaiterFilter(e.target.value);
                                      setTableReportCurrentPage(1);
                                    }}
                                    className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                                  >
                                    <option value="All Waiter">All Waiter</option>
                                    <option value="Rohit Sharma">Rohit Sharma</option>
                                    <option value="Amit Singh">Amit Singh</option>
                                    <option value="Neha Gupta">Neha Gupta</option>
                                    <option value="Priya Sharma">Priya Sharma</option>
                                    <option value="Rahul Mehta">Rahul Mehta</option>
                                    <option value="Sneha Patel">Sneha Patel</option>
                                  </select>
                                  <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>

                                {/* All Time */}
                                <div className="relative">
                                  <select
                                    value={tableReportTimeFilter}
                                    onChange={(e) => setTableReportTimeFilter(e.target.value)}
                                    className="appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-semibold text-[#2D2528] hover:bg-[#F2EAE4] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                                  >
                                    <option value="All Time">All Time</option>
                                    <option value="Morning">Morning</option>
                                    <option value="Afternoon">Afternoon</option>
                                    <option value="Evening">Evening</option>
                                  </select>
                                  <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                              </div>
                            </div>

                            {/* Table */}
                            <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                              <div className="p-4 sm:p-5 overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                  <thead className="bg-[#500F1D]">
                                    <tr className="text-white font-bold text-xs sm:text-sm">
                                      <th className="py-3 px-4 rounded-l-2xl whitespace-nowrap">Table No.</th>
                                      <th className="py-3 px-4 whitespace-nowrap">Capacity</th>
                                      <th className="py-3 px-4 whitespace-nowrap">Status</th>
                                      <th className="py-3 px-4 whitespace-nowrap">Assigned Waiter</th>
                                      <th className="py-3 px-4 whitespace-nowrap">Start Time</th>
                                      <th className="py-3 px-4 whitespace-nowrap">End Time</th>
                                      <th className="py-3 px-4 whitespace-nowrap">Order ID</th>
                                      <th className="py-3 px-4 whitespace-nowrap">Total Amount</th>
                                      <th className="text-center py-3 px-4 rounded-r-2xl whitespace-nowrap">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#F5EDE8] bg-white">
                                    {paginatedTableReports.length === 0 ? (
                                      <tr>
                                        <td colSpan={9} className="py-12 text-center">
                                          <div className="flex flex-col items-center justify-center space-y-2">
                                            <TableReportHeaderIcon className="w-8 h-8 text-[#75696B]" />
                                            <p className="font-serif font-bold text-base text-[#2D2528]">No tables match your filter</p>
                                            <p className="text-xs text-[#75696B]">Try clearing your search or filters.</p>
                                          </div>
                                        </td>
                                      </tr>
                                    ) : (
                                      paginatedTableReports.map((row) => (
                                        <tr key={row.id} className="hover:bg-[#FAF7F5] transition-colors">
                                          {/* Table No. */}
                                          <td className="py-3 px-4 whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                            {row.tableNo}
                                          </td>

                                          {/* Capacity */}
                                          <td className="py-3 px-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-[#2D2528]">
                                            <div className="flex items-center gap-1.5">
                                              <Users className="w-3.5 h-3.5 text-[#75696B]" />
                                              <span>{row.capacity}</span>
                                            </div>
                                          </td>

                                          {/* Status */}
                                          <td className="py-3 px-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                              row.status === 'Occupied'
                                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                                : row.status === 'Reserved'
                                                ? 'bg-[#FEF3C7] text-[#D97706]'
                                                : 'bg-[#E0F2FE] text-[#0369A1]'
                                            }`}>
                                              {row.status}
                                            </span>
                                          </td>

                                          {/* Assigned Waiter */}
                                          <td className="py-3 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                            {row.assignedWaiter}
                                          </td>

                                          {/* Start Time */}
                                          <td className="py-3 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#2D2528]">
                                            {row.startTime}
                                          </td>

                                          {/* End Time */}
                                          <td className="py-3 px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-[#75696B]">
                                            {row.endTime}
                                          </td>

                                          {/* Order ID */}
                                          <td className="py-3 px-4 whitespace-nowrap font-semibold text-xs sm:text-sm text-[#2D2528]">
                                            {row.orderId}
                                          </td>

                                          {/* Total Amount */}
                                          <td className="py-3 px-4 whitespace-nowrap font-bold text-xs sm:text-sm text-[#2D2528]">
                                            {row.totalAmount === '—' ? '—' : `₹${row.totalAmount}`}
                                          </td>

                                          {/* Actions: View or Assign */}
                                          <td className="py-3 px-4 whitespace-nowrap text-center">
                                            {row.status === 'Available' ? (
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  setAssignTableForm({ tableNo: row.tableNo, waiter: 'Rohit Sharma', customerName: '', customerMobile: '' });
                                                  setIsAssignTableModalOpen(true);
                                                }}
                                                className="px-4 py-1 rounded-full border border-[#E8DDD8] text-[#500F1D] text-xs font-semibold hover:bg-[#FAF2EB] transition-colors cursor-pointer"
                                              >
                                                Assign
                                              </button>
                                            ) : (
                                              <button
                                                type="button"
                                                onClick={() => setSelectedTableReportCard(row)}
                                                className="px-4 py-1 rounded-full border border-[#E8DDD8] text-[#500F1D] text-xs font-semibold hover:bg-[#FAF2EB] transition-colors cursor-pointer"
                                              >
                                                View
                                              </button>
                                            )}
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                  </tbody>
                                </table>
                              </div>

                              {/* Pagination Footer */}
                              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DDD8] bg-white">
                                <div className="text-xs sm:text-sm text-[#75696B] font-medium">
                                  Showing {filteredTableReports.length === 0 ? 0 : (tableReportCurrentPage - 1) * tableReportRowsPerPage + 1}–{Math.min(tableReportCurrentPage * tableReportRowsPerPage, filteredTableReports.length)} of {filteredTableReports.length} Tables
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                  {/* Page Buttons */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={tableReportCurrentPage <= 1}
                                      onClick={() => setTableReportCurrentPage(p => Math.max(1, p - 1))}
                                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#75696B] transition-colors ${
                                        tableReportCurrentPage <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#FAF7F5] cursor-pointer'
                                      }`}
                                    >
                                      &lt;
                                    </button>

                                    {Array.from({ length: totalTableReportPages }, (_, i) => i + 1).map((pg) => (
                                      <button
                                        key={pg}
                                        type="button"
                                        onClick={() => setTableReportCurrentPage(pg)}
                                        className={`w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm font-semibold flex items-center justify-center cursor-pointer transition-colors ${
                                          tableReportCurrentPage === pg
                                            ? 'rounded-full bg-[#500F1D] text-white font-bold shadow-xs'
                                            : 'rounded-lg text-[#2D2528] hover:bg-[#FAF7F5]'
                                        }`}
                                      >
                                        {pg}
                                      </button>
                                    ))}

                                    <button
                                      type="button"
                                      disabled={tableReportCurrentPage >= totalTableReportPages}
                                      onClick={() => setTableReportCurrentPage(p => Math.min(totalTableReportPages, p + 1))}
                                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#75696B] transition-colors ${
                                        tableReportCurrentPage >= totalTableReportPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#FAF7F5] cursor-pointer'
                                      }`}
                                    >
                                      &gt;
                                    </button>
                                  </div>

                                  {/* Rows per page */}
                                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#75696B] ml-2">
                                    <span>Rows per page:</span>
                                    <div className="relative">
                                      <select
                                        value={tableReportRowsPerPage}
                                        onChange={(e) => {
                                          setTableReportRowsPerPage(Number(e.target.value));
                                          setTableReportCurrentPage(1);
                                        }}
                                        className="appearance-none bg-white border border-[#E8DDD8] rounded-lg pl-2.5 pr-6 py-1 text-xs font-semibold text-[#2D2528] hover:bg-[#FAF7F5] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                                      >
                                        <option value={8}>8</option>
                                        <option value={12}>12</option>
                                        <option value={20}>20</option>
                                      </select>
                                      <ChevronDown className="w-3.5 h-3.5 text-[#75696B] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right: Embedded Table Details Card (Reference Image 1 Layout) */}
                          <div className="hidden xl:block xl:col-span-4 2xl:col-span-3">
                            {(() => {
                              const activeItem = tableReportList.find(t => t.tableNo === 'T01') || tableReportList[0];
                              return (
                                <div className="bg-[#FAF7F5] rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-sm">
                                  {/* Burgundy Header Bar */}
                                  <div className="bg-[#500F1D] text-white px-5 py-3.5 flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                      <TableReportHeaderIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-serif font-bold text-base text-white tracking-wide">Table Details</h3>
                                  </div>

                                  {/* Card Body */}
                                  <div className="p-5 space-y-4">
                                    {/* Big Table Box */}
                                    <div className="bg-[#FAF2EB] rounded-2xl p-4 text-center border border-[#E8DDD8]/60 shadow-2xs">
                                      <h2 className="font-serif font-bold text-3xl text-[#500F1D] tracking-tight">
                                        {activeItem.tableNo}
                                      </h2>
                                      <div className="mt-1.5">
                                        <span className={`inline-flex items-center px-4 py-0.5 rounded-full text-xs font-bold ${
                                          activeItem.status === 'Occupied'
                                            ? 'bg-[#DCFCE7] text-[#15803D]'
                                            : activeItem.status === 'Reserved'
                                            ? 'bg-[#FEF3C7] text-[#D97706]'
                                            : 'bg-[#E0F2FE] text-[#0369A1]'
                                        }`}>
                                          {activeItem.status}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2 text-xs sm:text-sm">
                                      <div className="flex justify-between items-center py-0.5">
                                        <span className="text-[#2D2528] font-medium">Capacity</span>
                                        <span className="font-semibold text-[#2D2528]">: {activeItem.capacity} Chairs</span>
                                      </div>
                                      <div className="flex justify-between items-center py-0.5">
                                        <span className="text-[#2D2528] font-medium">Assigned Waiter</span>
                                        <span className="font-semibold text-[#2D2528]">: {activeItem.assignedWaiter}</span>
                                      </div>
                                      <div className="flex justify-between items-center py-0.5">
                                        <span className="text-[#2D2528] font-medium">Start Time</span>
                                        <span className="font-semibold text-[#2D2528]">: {activeItem.startTime}</span>
                                      </div>
                                      <div className="flex justify-between items-center py-0.5">
                                        <span className="text-[#2D2528] font-medium">Order ID</span>
                                        <span className="font-semibold text-[#2D2528]">: {activeItem.orderId}</span>
                                      </div>
                                      <div className="flex justify-between items-center py-0.5">
                                        <span className="text-[#2D2528] font-medium">Total Amount</span>
                                        <span className="font-bold text-[#2D2528]">: ₹ {activeItem.totalAmount}</span>
                                      </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-[#E8DDD8]"></div>

                                    {/* Customer Details */}
                                    <div className="space-y-2 text-xs sm:text-sm">
                                      <div className="flex items-center gap-2 text-[#500F1D] font-bold">
                                        <Users className="w-4 h-4 text-[#500F1D]" />
                                        <span>Customer Details</span>
                                      </div>
                                      <div className="flex justify-between items-center py-0.5">
                                        <span className="text-[#2D2528] font-medium">Name</span>
                                        <span className="font-semibold text-[#2D2528]">: {activeItem.customerName}</span>
                                      </div>
                                      <div className="flex justify-between items-center py-0.5">
                                        <span className="text-[#2D2528] font-medium">Mobile</span>
                                        <span className="font-semibold text-[#2D2528]">: {activeItem.customerMobile}</span>
                                      </div>
                                    </div>

                                    {/* Quick Actions Header */}
                                    <div className="bg-[#500F1D] text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>Quick Actions</span>
                                    </div>

                                    {/* Buttons */}
                                    <div className="space-y-2">
                                      <div className="grid grid-cols-2 gap-2">
                                        <button
                                          type="button"
                                          onClick={() => setSelectedTableReportCard(activeItem)}
                                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#500F1D] text-[#500F1D] hover:bg-[#FAF2EB] text-xs font-semibold transition-all cursor-pointer"
                                        >
                                          <Eye className="w-3.5 h-3.5" />
                                          <span>View Bill</span>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setSelectedTableReportCard(activeItem)}
                                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#500F1D] text-[#500F1D] hover:bg-[#FAF2EB] text-xs font-semibold transition-all cursor-pointer"
                                        >
                                          <ShoppingCart className="w-3.5 h-3.5" />
                                          <span>Add Items</span>
                                        </button>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedTableReportCard(activeItem);
                                        }}
                                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#500F1D] text-[#500F1D] hover:bg-[#FAF2EB] text-xs font-semibold transition-all cursor-pointer w-full"
                                      >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Free Table</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      )}

                      {/* Sub-tab 2: Table History */}
                      {tableReportSubTab === 'Table History' && (
                        <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8] shadow-xs space-y-4">
                          <h3 className="font-serif font-bold text-lg text-[#2D2528]">Table Turnover &amp; Dining History</h3>
                          <p className="text-xs text-[#75696B]">Recent dining turnover sessions and table lifecycle logs.</p>
                          <div className="divide-y divide-[#F5EDE8]">
                            {[
                              { table: 'T01', sessions: 5, avgTime: '42 mins', revenue: '₹ 6,250', status: 'Optimal' },
                              { table: 'T02', sessions: 4, avgTime: '55 mins', revenue: '₹ 5,920', status: 'Optimal' },
                              { table: 'T03', sessions: 6, avgTime: '38 mins', revenue: '₹ 5,880', status: 'Fast' },
                              { table: 'T05', sessions: 3, avgTime: '75 mins', revenue: '₹ 6,450', status: 'Slow' },
                              { table: 'T08', sessions: 4, avgTime: '48 mins', revenue: '₹ 7,120', status: 'Optimal' }
                            ].map((row, idx) => (
                              <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                                <div className="flex items-center gap-3">
                                  <span className="font-bold text-[#500F1D] text-sm">{row.table}</span>
                                  <span className="text-[#75696B]">{row.sessions} turnover sessions</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-[#2D2528]">Avg: <strong className="font-bold">{row.avgTime}</strong></span>
                                  <span className="font-bold text-[#2D2528]">{row.revenue}</span>
                                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">{row.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sub-tab 3: Assign History */}
                      {tableReportSubTab === 'Assign History' && (
                        <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8] shadow-xs space-y-4">
                          <h3 className="font-serif font-bold text-lg text-[#2D2528]">Table Assignment Logs</h3>
                          <p className="text-xs text-[#75696B]">Record of waiter assignments and section shifts for today.</p>
                          <div className="divide-y divide-[#F5EDE8]">
                            {[
                              { waiter: 'Rohit Sharma', tables: 'T01, T09, T17', time: '11:30 AM', assignedBy: 'Manager' },
                              { waiter: 'Amit Singh', tables: 'T02, T10, T19', time: '11:45 AM', assignedBy: 'Manager' },
                              { waiter: 'Neha Gupta', tables: 'T03, T11', time: '12:00 PM', assignedBy: 'Manager' },
                              { waiter: 'Rahul Mehta', tables: 'T05, T14', time: '12:15 PM', assignedBy: 'Floor Lead' },
                              { waiter: 'Sneha Patel', tables: 'T08, T15', time: '12:20 PM', assignedBy: 'Manager' }
                            ].map((log, idx) => (
                              <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                                <div>
                                  <p className="font-bold text-[#2D2528]">{log.waiter}</p>
                                  <p className="text-xs text-[#75696B]">Assigned Tables: <span className="font-semibold text-[#500F1D]">{log.tables}</span></p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-[#2D2528]">{log.time}</p>
                                  <p className="text-xs text-[#75696B]">By {log.assignedBy}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sub-tab 4: Waiter Performance */}
                      {tableReportSubTab === 'Waiter Performance' && (
                        <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8] shadow-xs space-y-4">
                          <h3 className="font-serif font-bold text-lg text-[#2D2528]">Waiter Service &amp; Dining Metrics</h3>
                          <p className="text-xs text-[#75696B]">Active table turn rates and service feedback scores.</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                              { name: 'Rohit Sharma', tables: 3, orders: 12, sales: '₹ 15,220', rating: '4.9 ★' },
                              { name: 'Amit Singh', tables: 3, orders: 10, sales: '₹ 13,880', rating: '4.8 ★' },
                              { name: 'Neha Gupta', tables: 2, orders: 9, sales: '₹ 11,430', rating: '4.9 ★' },
                              { name: 'Rahul Mehta', tables: 2, orders: 8, sales: '₹ 12,040', rating: '4.7 ★' },
                              { name: 'Sneha Patel', tables: 2, orders: 7, sales: '₹ 9,780', rating: '4.8 ★' },
                              { name: 'Priya Sharma', tables: 2, orders: 6, sales: '₹ 7,500', rating: '5.0 ★' }
                            ].map((w, idx) => (
                              <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8] space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-[#2D2528]">{w.name}</span>
                                  <span className="text-xs font-bold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full">{w.rating}</span>
                                </div>
                                <div className="text-xs text-[#75696B] space-y-1">
                                  <p>Active Tables: <strong className="text-[#2D2528]">{w.tables}</strong></p>
                                  <p>Orders Served: <strong className="text-[#2D2528]">{w.orders}</strong></p>
                                  <p>Sales Generated: <strong className="text-[#500F1D]">{w.sales}</strong></p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subtab 4: Daily Report */}
                  {reportsSubTabActive === 'Daily Report' && (
                    <div className="space-y-6 animate-fadeIn">
                      {renderDailyReport()}
                    </div>
                  )}

            </div>
          )}

          {/* ====================================================================
              6. SETTINGS (Image: media_1795266346408_9209e4ee.jpg)
             ==================================================================== */}
              {activeSection === 'settings' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Header Banner */}
                  <div
                    className="relative rounded-3xl overflow-hidden p-6 sm:p-7 shadow-sm border border-[#E8DDD8]"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(20, 10, 10, 0.94) 0%, rgba(35, 15, 18, 0.88) 50%, rgba(20, 10, 10, 0.92) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className="w-12 h-12 flex items-center justify-center text-[#E5A81E] shrink-0">
                        <Settings className="w-10 h-10 text-[#E5A81E]" />
                      </div>
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Settings</h1>
                        <p className="text-xs sm:text-sm text-[#F5EDE8]/90 mt-0.5">Manage your account, preferences and restaurant settings.</p>
                      </div>
                    </div>
                  </div>

                  {/* Password update success message */}
                  {passwordSuccessToast && (
                    <div className="p-4 rounded-2xl bg-[#DCFCE7] border border-[#16A34A]/30 text-[#15803D] text-xs font-semibold flex items-center justify-between animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                        <span>Password updated successfully!</span>
                      </div>
                      <button onClick={() => setPasswordSuccessToast(false)} className="text-[#15803D] hover:text-[#16A34A] cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* 2x2 Cards Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* -----------------------------------------------------------
                    Card 1: Manager Profile
                   ----------------------------------------------------------- */}
                    <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                      <div className="bg-[#500F1D] text-white px-6 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-white" />
                          <h3 className="font-sans font-bold text-sm text-white">Manager Profile</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditProfileModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-white/40 text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3 h-3 text-white" />
                          <span>Edit</span>
                        </button>
                      </div>

                      <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        {/* Left: Avatar & Role Pill */}
                        <div className="flex flex-col items-center gap-3 shrink-0">
                          <div className="w-24 h-24 rounded-full border-2 border-[#E5A81E] p-0.5 overflow-hidden shadow-sm">
                            <img
                              src={managerProfile.image}
                              alt={managerProfile.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <span className="px-4 py-1 rounded-full bg-[#500F1D] text-white text-xs font-bold shadow-2xs">
                            {managerProfile.role}
                          </span>
                        </div>

                        {/* Right: Info List */}
                        <div className="flex-1 w-full space-y-3 text-xs sm:text-sm">
                          {/* Full Name */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 flex items-center justify-center shrink-0">
                              <User className="w-4 h-4 text-[#75696B]" />
                            </div>
                            <span className="w-28 text-[#75696B] font-medium shrink-0">Full Name</span>
                            <span className="text-[#75696B] font-bold mr-1">:</span>
                            <span className="font-bold text-[#2D2528] truncate">{managerProfile.name}</span>
                          </div>

                          {/* Employee ID */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-[#75696B]" />
                            </div>
                            <span className="w-28 text-[#75696B] font-medium shrink-0">Employee ID</span>
                            <span className="text-[#75696B] font-bold mr-1">:</span>
                            <span className="font-bold text-[#2D2528] truncate">{managerProfile.empId}</span>
                          </div>

                          {/* Phone Number */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 flex items-center justify-center shrink-0">
                              <Phone className="w-4 h-4 text-[#75696B]" />
                            </div>
                            <span className="w-28 text-[#75696B] font-medium shrink-0">Phone Number</span>
                            <span className="text-[#75696B] font-bold mr-1">:</span>
                            <span className="font-bold text-[#2D2528] truncate">{managerProfile.phone}</span>
                          </div>

                          {/* Email Address */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 flex items-center justify-center shrink-0">
                              <Mail className="w-4 h-4 text-[#75696B]" />
                            </div>
                            <span className="w-28 text-[#75696B] font-medium shrink-0">Email Address</span>
                            <span className="text-[#75696B] font-bold mr-1">:</span>
                            <span className="font-bold text-[#2D2528] truncate">{managerProfile.email}</span>
                          </div>

                          {/* Role */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 flex items-center justify-center shrink-0">
                              <UserCheck className="w-4 h-4 text-[#75696B]" />
                            </div>
                            <span className="w-28 text-[#75696B] font-medium shrink-0">Role</span>
                            <span className="text-[#75696B] font-bold mr-1">:</span>
                            <span className="font-bold text-[#2D2528] truncate">{managerProfile.role}</span>
                          </div>

                          {/* Joined On */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 flex items-center justify-center shrink-0">
                              <Calendar className="w-4 h-4 text-[#75696B]" />
                            </div>
                            <span className="w-28 text-[#75696B] font-medium shrink-0">Joined On</span>
                            <span className="text-[#75696B] font-bold mr-1">:</span>
                            <span className="font-bold text-[#2D2528] truncate">{managerProfile.joinedOn}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* -----------------------------------------------------------
                    Card 2: Change Password
                   ----------------------------------------------------------- */}
                    <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                      <div className="bg-[#500F1D] text-white px-6 py-3.5 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-white" />
                        <h3 className="font-sans font-bold text-sm text-white">Change Password</h3>
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!passwordForm.current || !passwordForm.newPass || !passwordForm.confirm) {
                            alert('Please fill out all password fields.');
                            return;
                          }
                          if (passwordForm.newPass !== passwordForm.confirm) {
                            alert('New passwords do not match.');
                            return;
                          }
                          setPasswordSuccessToast(true);
                          setPasswordForm({ current: '', newPass: '', confirm: '' });
                          setTimeout(() => setPasswordSuccessToast(false), 4000);
                        }}
                        className="p-6 space-y-4"
                      >
                        {/* Current Password */}
                        <div>
                          <label className="block text-xs font-bold text-[#2D2528] mb-1.5">Current Password</label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="Enter current password"
                              value={passwordForm.current}
                              onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                              className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#75696B] hover:text-[#500F1D] cursor-pointer"
                            >
                              {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div>
                          <label className="block text-xs font-bold text-[#2D2528] mb-1.5">New Password</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              value={passwordForm.newPass}
                              onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                              className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#75696B] hover:text-[#500F1D] cursor-pointer"
                            >
                              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="block text-xs font-bold text-[#2D2528] mb-1.5">Confirm Password</label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm new password"
                              value={passwordForm.confirm}
                              onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                              className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#75696B] hover:text-[#500F1D] cursor-pointer"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Update Password Button */}
                        <div className="flex justify-end pt-1">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#500F1D] hover:bg-[#3D0B16] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                          >
                            <Lock className="w-4 h-4" />
                            <span>Update Password</span>
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* -----------------------------------------------------------
                    Card 3: Notification Preferences (System Alerts REMOVED as requested)
                   ----------------------------------------------------------- */}
                    <div className="bg-white rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-xs">
                      <div className="bg-[#500F1D] text-white px-6 py-3.5 flex items-center gap-2">
                        <Bell className="w-4 h-4 text-white" />
                        <h3 className="font-sans font-bold text-sm text-white">Notification Preferences</h3>
                      </div>

                      <div className="p-6 space-y-4">
                        {/* 1. Booking Notifications */}
                        <div className="flex items-center justify-between py-1">
                          <div>
                            <p className="text-xs font-bold text-[#2D2528]">Booking Notifications</p>
                            <p className="text-[11px] text-[#75696B]">Receive alerts for new table bookings and reservation changes</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNotifPreferences(prev => ({ ...prev, booking: !prev.booking }))}
                            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifPreferences.booking ? 'bg-[#500F1D]' : 'bg-[#E8DDD8]'}`}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifPreferences.booking ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </button>
                        </div>

                        {/* 2. Order Notifications */}
                        <div className="flex items-center justify-between py-1">
                          <div>
                            <p className="text-xs font-bold text-[#2D2528]">Order Notifications</p>
                            <p className="text-[11px] text-[#75696B]">Get notified when new food orders are placed</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNotifPreferences(prev => ({ ...prev, orders: !prev.orders }))}
                            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifPreferences.orders ? 'bg-[#500F1D]' : 'bg-[#E8DDD8]'}`}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifPreferences.orders ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </button>
                        </div>

                        {/* 3. Payment Alerts */}
                        <div className="flex items-center justify-between py-1">
                          <div>
                            <p className="text-xs font-bold text-[#2D2528]">Payment Alerts</p>
                            <p className="text-[11px] text-[#75696B]">Receive notifications for successful settlements</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNotifPreferences(prev => ({ ...prev, payments: !prev.payments }))}
                            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifPreferences.payments ? 'bg-[#500F1D]' : 'bg-[#E8DDD8]'}`}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifPreferences.payments ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </button>
                        </div>

                        {/* 4. Customer Complaints */}
                        <div className="flex items-center justify-between py-1">
                          <div>
                            <p className="text-xs font-bold text-[#2D2528]">Customer Feedback & Complaints</p>
                            <p className="text-[11px] text-[#75696B]">Get alerts for immediate customer feedback tickets</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNotifPreferences(prev => ({ ...prev, complaints: !prev.complaints }))}
                            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifPreferences.complaints ? 'bg-[#500F1D]' : 'bg-[#E8DDD8]'}`}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifPreferences.complaints ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </main>
      </div>

      {/* View Dish Modal */}
      {viewDishModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-[#E8DDD8] shadow-2xl space-y-4">
            <div className="relative h-48 w-full bg-[#FAF7F5]">
              <img src={viewDishModal.image} alt={viewDishModal.name} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setViewDishModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-[#500F1D] text-white shadow-sm">
                {viewDishModal.category}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#2D2528]">{viewDishModal.name}</h3>
                  <p className="text-xs text-[#75696B] mt-0.5">{viewDishModal.description}</p>
                </div>
                <span className="font-sans font-extrabold text-lg text-[#500F1D]">₹{viewDishModal.price}</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#E8DDD8] text-xs">
                <div className="p-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8]/80 text-center">
                  <p className="text-[10px] text-[#75696B] font-medium">Cuisine</p>
                  <p className="font-bold text-[#2D2528] mt-0.5">{viewDishModal.cuisine || 'Italian'}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8]/80 text-center">
                  <p className="text-[10px] text-[#75696B] font-medium">Type</p>
                  <p className="font-bold text-[#2D2528] mt-0.5">{viewDishModal.diet || 'Veg'}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF7F5] border border-[#E8DDD8]/80 text-center">
                  <p className="text-[10px] text-[#75696B] font-medium">Status</p>
                  <p className={`font-bold mt-0.5 ${viewDishModal.available ? 'text-[#21845A]' : 'text-[#C44747]'}`}>
                    {viewDishModal.available ? 'Available' : 'Out of Stock'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setFoodItemsList(prev => prev.map(item => item.id === viewDishModal.id ? { ...item, available: !item.available } : item));
                    setViewDishModal(prev => ({ ...prev, available: !prev.available }));
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewDishModal.available
                    ? 'bg-[#FCECEC] text-[#C44747] hover:bg-[#F8D7D7]'
                    : 'bg-[#E8F4ED] text-[#21845A] hover:bg-[#D5EFE0]'
                    }`}
                >
                  {viewDishModal.available ? 'Mark Out of Stock' : 'Mark Available'}
                </button>
                <button
                  onClick={() => setViewDishModal(null)}
                  className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Price Edit Modal for Manager Permissions */}
      {priceEditModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
                  <IndianRupee className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#2D2528]">Manager Price Override</h3>
                  <p className="text-xs text-[#75696B]">{priceEditModal.name}</p>
                </div>
              </div>
              <button
                onClick={() => setPriceEditModal(null)}
                className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedPrice = parseFloat(priceEditModal.price) || 0;
                setFoodItemsList(prev => prev.map(f => f.id === priceEditModal.id ? { ...f, price: updatedPrice } : f));
                setTransferToast(`Updated price for "${priceEditModal.name}" to ₹${updatedPrice}`);
                setPriceEditModal(null);
                setTimeout(() => setTransferToast(null), 3000);
              }}
              className="space-y-4 text-xs"
            >
              <div className="p-3 bg-[#FAF2EB] rounded-2xl border border-[#E8DDD8]">
                <p className="font-bold text-[#500F1D] text-xs">Permission Verification</p>
                <p className="text-[#75696B] text-[11px] mt-0.5">Role: Manager ({managerProfile.name}) • Authorization ID: MGR-AUTH-8821</p>
              </div>

              <div>
                <label className="block font-bold text-[#2D2528] mb-1">Dine-in Selling Price (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={priceEditModal.price}
                  onChange={(e) => setPriceEditModal({ ...priceEditModal, price: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-sm font-bold text-[#2D2528] focus:outline-none focus:ring-2 focus:ring-[#500F1D]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D2528] mb-1">Reason for Price Adjustment</label>
                <select className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-2 focus:ring-[#500F1D]">
                  <option>Seasonal ingredient price fluctuation</option>
                  <option>Promotional happy hour pricing</option>
                  <option>Chef special ingredient premium</option>
                  <option>Management general revision</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setPriceEditModal(null)}
                  className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-bold text-[#75696B] hover:bg-[#FAF7F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#500F1D] hover:bg-[#3D0C1A] text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  Confirm & Apply Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Details Modal */}
      {selectedTableDetailsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
                  <Armchair className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#2D2528]">Table {selectedTableDetailsModal.tableNo} Details</h3>
                  <p className="text-xs text-[#75696B]">{selectedTableDetailsModal.capacity} • {selectedTableDetailsModal.location}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTableDetailsModal(null)}
                className="w-8 h-8 rounded-full hover:bg-[#FAF7F5] flex items-center justify-center text-[#75696B] hover:text-[#2D2528]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8]">
                  <p className="text-[#75696B] font-medium text-[11px]">Price / Booking Fee</p>
                  <p className="text-base font-bold text-[#2D2528] mt-0.5">₹{selectedTableDetailsModal.price.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8]">
                  <p className="text-[#75696B] font-medium text-[11px]">Current Status</p>
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${selectedTableDetailsModal.status === 'Available' ? 'bg-[#DCFCE7] text-[#15803D]' :
                      selectedTableDetailsModal.status === 'Reserved' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                        'bg-[#FEF9C3] text-[#B45309]'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedTableDetailsModal.status === 'Available' ? 'bg-[#16A34A]' :
                        selectedTableDetailsModal.status === 'Reserved' ? 'bg-[#DC2626]' :
                          'bg-[#D97706]'
                        }`}></span>
                      {selectedTableDetailsModal.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8]">
                <p className="text-[#75696B] font-medium text-[11px]">Active Reservation / Booking</p>
                <p className="text-xs font-bold text-[#2D2528] mt-1">{selectedTableDetailsModal.booking}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E8DDD8]">
                <p className="font-bold text-[#2D2528]">Quick Status Change</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTableManagementList(prev => prev.map(t => t.id === selectedTableDetailsModal.id ? { ...t, status: 'Available', booking: '—' } : t));
                      setSelectedTableDetailsModal(prev => ({ ...prev, status: 'Available', booking: '—' }));
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${selectedTableDetailsModal.status === 'Available'
                      ? 'bg-[#DCFCE7] text-[#15803D] ring-2 ring-[#15803D]/40 font-bold'
                      : 'bg-[#FAF5F0] text-[#75696B] hover:bg-[#DCFCE7]/40'
                      }`}
                  >
                    Available
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTableManagementList(prev => prev.map(t => t.id === selectedTableDetailsModal.id ? { ...t, status: 'Reserved', booking: 'Walk-in Guest • 8:00 PM' } : t));
                      setSelectedTableDetailsModal(prev => ({ ...prev, status: 'Reserved', booking: 'Walk-in Guest • 8:00 PM' }));
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${selectedTableDetailsModal.status === 'Reserved'
                      ? 'bg-[#FEE2E2] text-[#DC2626] ring-2 ring-[#DC2626]/40 font-bold'
                      : 'bg-[#FAF5F0] text-[#75696B] hover:bg-[#FEE2E2]/40'
                      }`}
                  >
                    Reserved
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTableManagementList(prev => prev.map(t => t.id === selectedTableDetailsModal.id ? { ...t, status: 'Maintenance', booking: '—' } : t));
                      setSelectedTableDetailsModal(prev => ({ ...prev, status: 'Maintenance', booking: '—' }));
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${selectedTableDetailsModal.status === 'Maintenance'
                      ? 'bg-[#FEF9C3] text-[#B45309] ring-2 ring-[#B45309]/40 font-bold'
                      : 'bg-[#FAF5F0] text-[#75696B] hover:bg-[#FEF9C3]/40'
                      }`}
                  >
                    Maintenance
                  </button>
                </div>
              </div>
            </div>

      <div className="flex justify-end pt-2 border-t border-[#E8DDD8]">
        <button
          type="button"
          onClick={() => setSelectedTableDetailsModal(null)}
          className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
    </div >
  )
}

{/* Edit Table Modal */ }
{
  editTableModal && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <Pencil className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-[#2D2528]">Edit Table {editTableModal.tableNo}</h3>
              <p className="text-xs text-[#75696B]">Update pricing, capacity or location</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEditTableModal(null)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTableManagementList(prev => prev.map(t => t.id === editTableModal.id ? editTableModal : t));
            setEditTableModal(null);
          }}
          className="space-y-3.5 text-xs"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#2D2528] mb-1">Capacity</label>
              <select
                value={editTableModal.capacity}
                onChange={(e) => setEditTableModal({ ...editTableModal, capacity: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
              >
                <option value="2 Seater">2 Seater</option>
                <option value="4 Seater">4 Seater</option>
                <option value="6 Seater">6 Seater</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#2D2528] mb-1">Price (₹)</label>
              <input
                type="number"
                required
                min="100"
                value={editTableModal.price}
                onChange={(e) => setEditTableModal({ ...editTableModal, price: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-bold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#2D2528] mb-1">Location</label>
              <select
                value={editTableModal.location}
                onChange={(e) => setEditTableModal({ ...editTableModal, location: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
              >
                <option value="Indoor Hall">Indoor Hall</option>
                <option value="Outdoor Terrace">Outdoor Terrace</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#2D2528] mb-1">Status</label>
              <select
                value={editTableModal.status}
                onChange={(e) => setEditTableModal({ ...editTableModal, status: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
              >
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#2D2528] mb-1">Current Booking / Note</label>
            <input
              type="text"
              value={editTableModal.booking || ''}
              onChange={(e) => setEditTableModal({ ...editTableModal, booking: e.target.value })}
              placeholder="e.g. R. Sharma • 7:00 PM or —"
              className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-medium text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E8DDD8]">
            <button
              type="button"
              onClick={() => setEditTableModal(null)}
              className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-bold text-[#75696B] hover:bg-[#FAF7F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#500F1D] hover:bg-[#3D0C1A] text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

{/* POS Transaction Details Modal */ }
{
  selectedPosTransactionModal && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <ReceiptText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-[#2D2528]">Bill {selectedPosTransactionModal.billNo}</h3>
              <p className="text-xs text-[#75696B]">Table {selectedPosTransactionModal.tableNo} • {selectedPosTransactionModal.time}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPosTransactionModal(null)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8] space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8DDD8]/70">
              <span className="font-bold text-[#500F1D]">Items Ordered</span>
              <span className="text-[#75696B]">Qty: {selectedPosTransactionModal.qty}</span>
            </div>
            <p className="font-medium text-[#2D2528]">{selectedPosTransactionModal.items}</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8]">
              <p className="text-[#75696B] font-medium text-[11px]">Payment Method</p>
              <p className="font-bold text-[#2D2528] mt-0.5">{selectedPosTransactionModal.method}</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8]">
              <p className="text-[#75696B] font-medium text-[11px]">Total Paid</p>
              <p className="font-extrabold text-[#500F1D] text-base mt-0.5">₹{selectedPosTransactionModal.amount}</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-between">
            <span className="text-[#75696B] font-medium">Payment Status</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{selectedPosTransactionModal.status}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E8DDD8]">
          <button
            type="button"
            onClick={() => {
              const tx = selectedPosTransactionModal;
              const csvData = [
                ['Bill No', 'Table No', 'Order Items', 'Qty', 'Total Amount', 'Payment Method', 'Payment Status', 'Time'],
                [`"${tx.billNo}"`, `"${tx.tableNo}"`, `"${tx.items}"`, tx.qty, `"₹${tx.amount}"`, `"${tx.method}"`, `"${tx.status}"`, `"${tx.time}"`]
              ].map(r => r.join(',')).join('\n');
              const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Receipt_${tx.billNo}.csv`;
              a.click();
              URL.revokeObjectURL(url);
              setPosToastMessage(`Receipt downloaded for ${tx.billNo}`);
              setTimeout(() => setPosToastMessage(''), 2500);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] hover:bg-[#FAF7F5] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download / Print Receipt</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedPosTransactionModal(null)}
            className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

{/* Edit POS Transaction Modal */ }
{
  editingPosTransaction && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <Pencil className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-[#2D2528]">Edit Bill {editingPosTransaction.billNo}</h3>
              <p className="text-xs text-[#75696B]">Table {editingPosTransaction.tableNo} • {editingPosTransaction.time}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEditingPosTransaction(null)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPosTransactions(prev => prev.map(t => t.id === editingPosTransaction.id ? editingPosTransaction : t));
            setEditingPosTransaction(null);
            setPosToastMessage(`Updated Bill ${editingPosTransaction.billNo} successfully!`);
            setTimeout(() => setPosToastMessage(''), 2500);
          }}
          className="space-y-3.5 text-xs"
        >
          <div>
            <label className="block font-bold text-[#2D2528] mb-1">Order Items</label>
            <input
              type="text"
              value={editingPosTransaction.items}
              onChange={(e) => setEditingPosTransaction({ ...editingPosTransaction, items: e.target.value })}
              className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-3 py-2 text-xs font-medium text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#2D2528] mb-1">Total Amount (₹)</label>
              <input
                type="number"
                value={editingPosTransaction.amount}
                onChange={(e) => setEditingPosTransaction({ ...editingPosTransaction, amount: Number(e.target.value) })}
                className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-3 py-2 text-xs font-medium text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#2D2528] mb-1">Item Quantity</label>
              <input
                type="number"
                min="1"
                value={editingPosTransaction.qty}
                onChange={(e) => setEditingPosTransaction({ ...editingPosTransaction, qty: Number(e.target.value) })}
                className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-3 py-2 text-xs font-medium text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#2D2528] mb-1">Payment Method</label>
              <select
                value={editingPosTransaction.method}
                onChange={(e) => setEditingPosTransaction({ ...editingPosTransaction, method: e.target.value })}
                className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-3 py-2 text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
              >
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#2D2528] mb-1">Payment Status</label>
              <select
                value={editingPosTransaction.status}
                onChange={(e) => setEditingPosTransaction({ ...editingPosTransaction, status: e.target.value })}
                className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-3 py-2 text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E8DDD8]">
            <button
              type="button"
              onClick={() => setEditingPosTransaction(null)}
              className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] hover:bg-[#FAF7F5] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

{/* Sales Report Order Details Modal (Image Exact match) */ }
{
  selectedSalesReportModal && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <ReceiptText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-[#2D2528]">{selectedSalesReportModal.orderId}</h3>
              <p className="text-xs text-[#75696B]">Table {selectedSalesReportModal.tableNo} • {selectedSalesReportModal.dateTime}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedSalesReportModal(null)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8] space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8DDD8]/70">
              <span className="font-bold text-[#500F1D]">Items Ordered</span>
              <span className="text-[#75696B]">Category: {selectedSalesReportModal.category}</span>
            </div>
            <p className="font-medium text-[#2D2528] text-sm">{selectedSalesReportModal.items}</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8]">
              <p className="text-[#75696B] font-medium text-[11px]">Payment Method</p>
              <p className="font-bold text-[#2D2528] mt-0.5">{selectedSalesReportModal.paymentMethod}</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8]">
              <p className="text-[#75696B] font-medium text-[11px]">Total Amount</p>
              <p className="font-extrabold text-[#500F1D] text-base mt-0.5">₹ {selectedSalesReportModal.amount}</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-between">
            <span className="text-[#75696B] font-medium">Order Status</span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${selectedSalesReportModal.status === 'Completed'
              ? 'bg-[#DCFCE7] text-[#15803D]'
              : 'bg-[#FEF3C7] text-[#D97706]'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${selectedSalesReportModal.status === 'Completed' ? 'bg-[#16A34A]' : 'bg-[#D97706]'
                }`}></span>
              <span>{selectedSalesReportModal.status}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E8DDD8]">
          <button
            type="button"
            onClick={() => alert(`Receipt downloaded for ${selectedSalesReportModal.orderId}`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] hover:bg-[#FAF7F5] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Bill</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedSalesReportModal(null)}
            className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

{/* Customer Complaint Details Modal */ }
{
  selectedComplaintModal && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-[#2D2528]">Complaint #{selectedComplaintModal.id}</h3>
              <p className="text-xs text-[#75696B]">Table {selectedComplaintModal.tableNo} • {selectedComplaintModal.date} {selectedComplaintModal.time}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedComplaintModal(null)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8]">
            <p className="text-[#75696B] font-medium text-[11px] mb-1">Issue Reported</p>
            <p className="font-bold text-[#2D2528] text-sm">{selectedComplaintModal.complaint}</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-between">
            <span className="text-[#75696B] font-medium">Current Status</span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${selectedComplaintModal.status === 'Pending'
              ? 'bg-[#FEF9C3] text-[#B45309]'
              : selectedComplaintModal.status === 'In Progress'
                ? 'bg-[#DBEAFE] text-[#1D4ED8]'
                : 'bg-[#DCFCE7] text-[#15803D]'
              }`}>
              {selectedComplaintModal.status}
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E8DDD8]">
            <p className="font-bold text-[#2D2528]">Update Resolution Status</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setCustomerComplaints(prev => prev.map(c => c.id === selectedComplaintModal.id ? { ...c, status: 'Pending' } : c));
                  setSelectedComplaintModal(prev => ({ ...prev, status: 'Pending' }));
                }}
                className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${selectedComplaintModal.status === 'Pending'
                  ? 'bg-[#FEF9C3] text-[#B45309] ring-2 ring-[#B45309]/50 font-bold'
                  : 'bg-[#FAF5F0] text-[#75696B] hover:bg-[#FEF9C3]/40'
                  }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomerComplaints(prev => prev.map(c => c.id === selectedComplaintModal.id ? { ...c, status: 'In Progress' } : c));
                  setSelectedComplaintModal(prev => ({ ...prev, status: 'In Progress' }));
                }}
                className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${selectedComplaintModal.status === 'In Progress'
                  ? 'bg-[#DBEAFE] text-[#1D4ED8] ring-2 ring-[#1D4ED8]/50 font-bold'
                  : 'bg-[#FAF5F0] text-[#75696B] hover:bg-[#DBEAFE]/40'
                  }`}
              >
                In Progress
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomerComplaints(prev => prev.map(c => c.id === selectedComplaintModal.id ? { ...c, status: 'Resolved' } : c));
                  setSelectedComplaintModal(prev => ({ ...prev, status: 'Resolved' }));
                }}
                className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${selectedComplaintModal.status === 'Resolved'
                  ? 'bg-[#DCFCE7] text-[#15803D] ring-2 ring-[#15803D]/50 font-bold'
                  : 'bg-[#FAF5F0] text-[#75696B] hover:bg-[#DCFCE7]/40'
                  }`}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#E8DDD8]">
          <button
            type="button"
            onClick={() => setSelectedComplaintModal(null)}
            className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

{/* Edit Manager Profile Modal */ }
{
  editProfileModalOpen && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-[#2D2528]">Edit Manager Profile</h3>
              <p className="text-xs text-[#75696B]">Update your personal and contact details</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEditProfileModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEditProfileModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <div>
            <label className="block font-bold text-[#2D2528] mb-1">Full Name</label>
            <input
              type="text"
              required
              value={managerProfile.name}
              onChange={(e) => setManagerProfile({ ...managerProfile, name: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D2528] mb-1">Phone Number</label>
            <input
              type="text"
              required
              value={managerProfile.phone}
              onChange={(e) => setManagerProfile({ ...managerProfile, phone: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D2528] mb-1">Email Address</label>
            <input
              type="email"
              required
              value={managerProfile.email}
              onChange={(e) => setManagerProfile({ ...managerProfile, email: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E8DDD8]">
            <button
              type="button"
              onClick={() => setEditProfileModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-bold text-[#75696B] hover:bg-[#FAF7F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#500F1D] hover:bg-[#3D0C1A] text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

{/* Edit Restaurant Setting Field Modal */ }
{
  editRestaurantModalOpen && editingField && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <Pencil className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-[#2D2528]">Edit {editingField.label}</h3>
              <p className="text-xs text-[#75696B]">Update restaurant configuration</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEditRestaurantModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setRestaurantSettings({ ...restaurantSettings, [editingField.key]: editingField.value });
            setEditRestaurantModalOpen(false);
          }}
          className="space-y-3.5 text-xs"
        >
          <div>
            <label className="block font-bold text-[#2D2528] mb-1">{editingField.label}</label>
            <input
              type="text"
              required
              value={editingField.value}
              onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#E8DDD8] text-xs font-bold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E8DDD8]">
            <button
              type="button"
              onClick={() => setEditRestaurantModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-bold text-[#75696B] hover:bg-[#FAF7F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#500F1D] hover:bg-[#3D0C1A] text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

{/* View All Food Sales Items Modal */ }
{
  viewAllFoodSalesModal && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <ConciergeBell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#500F1D]">All Food Sales Items</h3>
              <p className="text-xs text-[#75696B]">Comprehensive dishes sold and performance ranking</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setViewAllFoodSalesModal(false)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#500F1D] sticky top-0 z-10">
              <tr className="text-white font-bold text-xs">
                <th className="w-10 text-center py-3 px-3 rounded-l-xl">#</th>
                <th className="py-3 px-3">Item</th>
                <th className="py-3 px-3">Category</th>
                <th className="text-center py-3 px-3">Qty</th>
                <th className="py-3 px-3">Revenue</th>
                <th className="py-3 px-3 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EDE8] text-xs">
              {foodSalesList.map((item, idx) => (
                <tr key={item.id} className="hover:bg-[#FAF7F5]">
                  <td className="text-center py-3 px-3 font-semibold text-[#2D2528]">{idx + 1}</td>
                  <td className="py-3 px-3 font-bold text-[#2D2528]">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80';
                        }}
                        className="w-8 h-8 rounded-lg object-cover border border-[#E8DDD8]"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#75696B]">{item.category}</td>
                  <td className="py-3 px-3 text-center font-bold text-[#2D2528]">{item.qtySold}</td>
                  <td className="py-3 px-3 font-bold text-[#500F1D]">₹{item.revenue.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${item.status === 'Active' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEE2E2] text-[#DC2626]'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`}></span>
                      <span>{item.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#E8DDD8] shrink-0">
          <button
            type="button"
            onClick={() => setViewAllFoodSalesModal(false)}
            className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

{/* Payment Summary Detailed Modal */ }
{
  viewPaymentDetailsModal && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#500F1D]">Payment Methods Audit</h3>
              <p className="text-xs text-[#75696B]">Tender collection breakdown & reconciliation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setViewPaymentDetailsModal(false)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {foodSalesPaymentSummary.map((pm, i) => (
            <div key={i} className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-between">
              <div>
                <p className="font-bold text-[#2D2528] text-sm">{pm.method}</p>
                <p className="text-[11px] text-[#75696B]">{pm.transactions} verified transactions</p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-[#500F1D] text-base">₹{pm.amount.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-emerald-700 font-semibold">Settled</p>
              </div>
            </div>
          ))}

          <div className="p-3.5 rounded-2xl bg-[#500F1D] text-white flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">Total Collections</p>
              <p className="text-[11px] text-[#F5EDE8]/80">1,248 total orders</p>
            </div>
            <p className="font-extrabold text-lg text-[#E5A81E]">₹4,85,000</p>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#E8DDD8]">
          <button
            type="button"
            onClick={() => setViewPaymentDetailsModal(false)}
            className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

{/* Transaction Details Modal */ }
{
  selectedTransactionModal && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E8DDD8] shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#500F1D]">Transaction Audit</h3>
              <p className="text-xs text-[#75696B]">{selectedTransactionModal.transactionId}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedTransactionModal(null)}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm">
          <div className="flex justify-between py-1 border-b border-[#F5EDE8]">
            <span className="text-[#75696B]">Order ID</span>
            <span className="font-bold text-[#2D2528]">{selectedTransactionModal.orderId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F5EDE8]">
            <span className="text-[#75696B]">Customer</span>
            <span className="font-bold text-[#2D2528]">{selectedTransactionModal.customerName}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F5EDE8]">
            <span className="text-[#75696B]">Table Number</span>
            <span className="font-bold text-[#2D2528]">{selectedTransactionModal.tableNo}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F5EDE8]">
            <span className="text-[#75696B]">Date &amp; Time</span>
            <span className="font-medium text-[#2D2528]">{selectedTransactionModal.dateTime}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F5EDE8]">
            <span className="text-[#75696B]">Payment Method</span>
            <span className="font-bold text-[#2D2528]">{selectedTransactionModal.method}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F5EDE8]">
            <span className="text-[#75696B]">Status</span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${selectedTransactionModal.status === 'Success'
                ? 'bg-[#DCFCE7] text-[#15803D]'
                : 'bg-[#FEE2E2] text-[#DC2626]'
                }`}
            >
              {selectedTransactionModal.status}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FBF4EB] border border-[#EADACF] flex justify-between items-center text-sm font-bold mt-2">
            <span className="text-[#500F1D] font-serif">Settlement Amount</span>
            <span className="text-base text-[#500F1D] font-extrabold">
              ₹ {selectedTransactionModal.amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#E8DDD8]">
          <button
            type="button"
            onClick={() => setSelectedTransactionModal(null)}
            className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

          {/* Table Report: Table Details Modal (Exact Reference Image 2: media_1795435227764_ba9982d6.jpg) */}
      {selectedTableReportCard && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedTableReportCard(null)}
        >
          <div
            className="bg-[#FAF7F5] rounded-3xl border border-[#E8DDD8] overflow-hidden shadow-2xl max-w-sm w-full animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Burgundy Header Bar */}
            <div className="bg-[#500F1D] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <TableReportHeaderIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif font-bold text-base text-white tracking-wide">Table Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTableReportCard(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Big Table Box */}
              <div className="bg-[#FAF2EB] rounded-2xl p-4 text-center border border-[#E8DDD8]/60 shadow-2xs">
                <h2 className="font-serif font-bold text-3xl text-[#500F1D] tracking-tight">
                  {selectedTableReportCard.tableNo}
                </h2>
                <div className="mt-1.5">
                  <span className={`inline-flex items-center px-4 py-0.5 rounded-full text-xs font-bold ${
                    selectedTableReportCard.status === 'Occupied'
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : selectedTableReportCard.status === 'Reserved'
                      ? 'bg-[#FEF3C7] text-[#D97706]'
                      : 'bg-[#E0F2FE] text-[#0369A1]'
                  }`}>
                    {selectedTableReportCard.status}
                  </span>
                </div>
              </div>

              {/* Table Info Key-Values */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2D2528] font-medium">Capacity</span>
                  <span className="font-semibold text-[#2D2528]">: {selectedTableReportCard.capacity} Chairs</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2D2528] font-medium">Assigned Waiter</span>
                  <span className="font-semibold text-[#2D2528]">: {selectedTableReportCard.assignedWaiter}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2D2528] font-medium">Start Time</span>
                  <span className="font-semibold text-[#2D2528]">: {selectedTableReportCard.startTime}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2D2528] font-medium">Order ID</span>
                  <span className="font-semibold text-[#2D2528]">: {selectedTableReportCard.orderId}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2D2528] font-medium">Total Amount</span>
                  <span className="font-bold text-[#2D2528]">: {selectedTableReportCard.totalAmount === '—' ? '—' : `₹ ${selectedTableReportCard.totalAmount}`}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E8DDD8]"></div>

              {/* Customer Details */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#500F1D] font-bold">
                  <Users className="w-4 h-4 text-[#500F1D]" />
                  <span>Customer Details</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2D2528] font-medium">Name</span>
                  <span className="font-semibold text-[#2D2528]">: {selectedTableReportCard.customerName || 'Walk-in Guest'}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2D2528] font-medium">Mobile</span>
                  <span className="font-semibold text-[#2D2528]">: {selectedTableReportCard.customerMobile || '—'}</span>
                </div>
              </div>

              {/* Quick Actions Header */}
              <div className="bg-[#500F1D] text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Actions</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTableReportToast(`Viewing bill for Order ${selectedTableReportCard.orderId}...`);
                      setTimeout(() => setTableReportToast(''), 2500);
                    }}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#500F1D] text-[#500F1D] hover:bg-[#FAF2EB] text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Bill</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTableReportToast(`Add items dialog for Table ${selectedTableReportCard.tableNo}`);
                      setTimeout(() => setTableReportToast(''), 2500);
                    }}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#500F1D] text-[#500F1D] hover:bg-[#FAF2EB] text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add Items</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const tableNo = selectedTableReportCard.tableNo;
                    setTableReportList(prev => prev.map(t => t.tableNo === tableNo ? {
                      ...t,
                      status: 'Available',
                      assignedWaiter: '—',
                      startTime: '—',
                      endTime: '—',
                      orderId: '—',
                      totalAmount: '—',
                      customerName: '',
                      customerMobile: ''
                    } : t));
                    setSelectedTableReportCard(prev => ({
                      ...prev,
                      status: 'Available',
                      assignedWaiter: '—',
                      startTime: '—',
                      endTime: '—',
                      orderId: '—',
                      totalAmount: '—',
                      customerName: '',
                      customerMobile: ''
                    }));
                    setTableReportToast(`Table ${tableNo} is now Available!`);
                    setTimeout(() => setTableReportToast(''), 3000);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#500F1D] text-[#500F1D] hover:bg-[#FAF2EB] text-xs font-semibold transition-all active:scale-95 cursor-pointer w-full"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Free Table</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Table Modal */}
      {isAssignTableModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsAssignTableModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E8DDD8] shadow-2xl space-y-4 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#500F1D] text-white flex items-center justify-center shadow-xs">
                  <TableReportHeaderIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#500F1D]">Assign Table</h3>
                  <p className="text-xs text-[#75696B]">Allocate a table to waiter and dining guest</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAssignTableModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF7F5] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] hover:text-[#500F1D] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#2D2528] mb-1">Select Table</label>
                <div className="relative">
                  <select
                    value={assignTableForm.tableNo}
                    onChange={(e) => setAssignTableForm(prev => ({ ...prev, tableNo: e.target.value }))}
                    className="w-full appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-3 py-2 text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                  >
                    {tableReportList.filter(t => t.status === 'Available').map(t => (
                      <option key={t.id} value={t.tableNo}>{t.tableNo} ({t.capacity} Chairs - Available)</option>
                    ))}
                    {tableReportList.filter(t => t.status !== 'Available').map(t => (
                      <option key={t.id} value={t.tableNo}>{t.tableNo} ({t.capacity} Chairs - {t.status})</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2528] mb-1">Assign Waiter</label>
                <div className="relative">
                  <select
                    value={assignTableForm.waiter}
                    onChange={(e) => setAssignTableForm(prev => ({ ...prev, waiter: e.target.value }))}
                    className="w-full appearance-none bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-3 py-2 text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                  >
                    <option value="Rohit Sharma">Rohit Sharma</option>
                    <option value="Amit Singh">Amit Singh</option>
                    <option value="Neha Gupta">Neha Gupta</option>
                    <option value="Priya Sharma">Priya Sharma</option>
                    <option value="Rahul Mehta">Rahul Mehta</option>
                    <option value="Sneha Patel">Sneha Patel</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#75696B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2528] mb-1">Guest Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={assignTableForm.customerName}
                  onChange={(e) => setAssignTableForm(prev => ({ ...prev, customerName: e.target.value }))}
                  className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-3 py-2 text-xs text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2528] mb-1">Guest Contact Mobile</label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 00000"
                  value={assignTableForm.customerMobile}
                  onChange={(e) => setAssignTableForm(prev => ({ ...prev, customerMobile: e.target.value }))}
                  className="w-full bg-[#FAF7F5] border border-[#E8DDD8] rounded-xl px-3 py-2 text-xs text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-[#E8DDD8]">
              <button
                type="button"
                onClick={() => setIsAssignTableModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#75696B] hover:bg-[#FAF7F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  setTableReportList(prev => prev.map(t => t.tableNo === assignTableForm.tableNo ? {
                    ...t,
                    status: 'Occupied',
                    assignedWaiter: assignTableForm.waiter,
                    startTime: timeStr,
                    orderId: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
                    totalAmount: '0',
                    customerName: assignTableForm.customerName || 'Walk-in Guest',
                    customerMobile: assignTableForm.customerMobile || '+91 98765 00000'
                  } : t));
                  setIsAssignTableModalOpen(false);
                  setTableReportToast(`Table ${assignTableForm.tableNo} assigned to ${assignTableForm.waiter}!`);
                  setTimeout(() => setTableReportToast(''), 3000);
                }}
                className="px-5 py-2 rounded-xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0C1A] shadow-xs cursor-pointer"
              >
                Assign &amp; Seat
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ManagerPortal;