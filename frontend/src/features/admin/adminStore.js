import { getStoredItem, setStoredItem } from '../../utils/helpers';
import { ROLES, INITIAL_TABLES, INITIAL_ORDERS } from '../../utils/constants';

// Initial Seed Data for Admin Portal
export const INITIAL_FOOD_MASTER = [
  {
    id: 'FOOD-101',
    name: 'Truffle Mushroom Risotto',
    category: 'Mains',
    subcategory: 'Italian',
    price: 420,
    isVeg: true,
    prepTime: 18,
    stationId: 'ST-01', // Hot Kitchen / Mains
    available: true,
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80',
    description: 'Arborio rice, wild forest mushrooms, black truffle oil, aged parmesan shavings.'
  },
  {
    id: 'FOOD-102',
    name: 'Tandoori Murgh Tikka',
    category: 'Starters',
    subcategory: 'North Indian',
    price: 360,
    isVeg: false,
    prepTime: 15,
    stationId: 'ST-02', // Tandoor Station
    available: true,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    description: 'Tender chicken marinated in Kashmiri chili, hung yogurt and aromatic tandoori spices.'
  },
  {
    id: 'FOOD-103',
    name: 'Crispy Paneer Malai Roll',
    category: 'Starters',
    subcategory: 'Indian Fusion',
    price: 310,
    isVeg: true,
    prepTime: 12,
    stationId: 'ST-03', // Appetizers & Fryer
    available: true,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    description: 'Handmade cottage cheese strips seasoned with aromatic cream and crushed peppercorns.'
  },
  {
    id: 'FOOD-104',
    name: 'Signature Chicken Milanese',
    category: 'Mains',
    subcategory: 'Continental',
    price: 480,
    isVeg: false,
    prepTime: 22,
    stationId: 'ST-04', // Grill & Sauté
    available: true,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp parmesan-crusted chicken breast served with lemon herb butter and garden salad.'
  },
  {
    id: 'FOOD-105',
    name: 'Artisan Woodfired Margherita Pizza',
    category: 'Pizza & Breads',
    subcategory: 'Woodfired',
    price: 450,
    isVeg: true,
    prepTime: 14,
    stationId: 'ST-05', // Bakery & Pizza
    available: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, fresh basil, and extra virgin olive oil.'
  },
  {
    id: 'FOOD-106',
    name: 'Belgian Dark Chocolate Fondant',
    category: 'Desserts',
    subcategory: 'Pastry',
    price: 290,
    isVeg: true,
    prepTime: 10,
    stationId: 'ST-05', // Bakery & Pizza
    available: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    description: 'Warm molten 70% Belgian chocolate cake served with Madagascar bourbon vanilla bean gelato.'
  },
  {
    id: 'FOOD-107',
    name: 'Sparkling Hibiscus Berry Cooler',
    category: 'Beverages',
    subcategory: 'Mocktails',
    price: 220,
    isVeg: true,
    prepTime: 6,
    stationId: 'ST-06', // Beverage & Bar
    available: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    description: 'Brewed organic hibiscus flower tea, wild raspberry syrup, mint leaves, and effervescent soda.'
  }
];

export const INITIAL_CATEGORIES = [
  {
    id: 'CAT-1',
    name: 'Starters',
    subcategories: ['Kebabs & Tandoor', 'Crisp Appetizers', 'Soup & Broth'],
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=600&q=80',
    active: true,
    itemCount: 8
  },
  {
    id: 'CAT-2',
    name: 'Mains',
    subcategories: ['Curries', 'Grill & Steaks', 'Pasta & Risotto'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    active: true,
    itemCount: 12
  },
  {
    id: 'CAT-3',
    name: 'Pizza & Breads',
    subcategories: ['Woodfired Pizza', 'Artisan Naans', 'Garlic Breads'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    active: true,
    itemCount: 6
  },
  {
    id: 'CAT-4',
    name: 'Desserts',
    subcategories: ['Cakes & Pastries', 'Gourmet Gelato', 'Puddings'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    active: true,
    itemCount: 5
  },
  {
    id: 'CAT-5',
    name: 'Beverages',
    subcategories: ['Craft Mocktails', 'Single Origin Coffee', 'Artisan Shakes'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    active: true,
    itemCount: 7
  }
];

export const INITIAL_MENUS = [
  {
    id: 'MN-01',
    name: 'Breakfast Grand Menu',
    type: 'Breakfast',
    schedule: {
      startTime: '07:00 AM',
      endTime: '11:00 AM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    assignedCategories: ['Beverages', 'Starters', 'Pizza & Breads'],
    assignedItemsCount: 14,
    active: true
  },
  {
    id: 'MN-02',
    name: 'Executive Lunch Buffet & A La Carte',
    type: 'Lunch',
    schedule: {
      startTime: '12:00 PM',
      endTime: '04:00 PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    assignedCategories: ['Starters', 'Mains', 'Pizza & Breads', 'Desserts', 'Beverages'],
    assignedItemsCount: 28,
    active: true
  },
  {
    id: 'MN-03',
    name: 'Royal Dine Candlelight Dinner',
    type: 'Dinner',
    schedule: {
      startTime: '07:00 PM',
      endTime: '11:30 PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    assignedCategories: ['Starters', 'Mains', 'Pizza & Breads', 'Desserts', 'Beverages'],
    assignedItemsCount: 36,
    active: true
  }
];

export const INITIAL_KITCHEN_SETUP = {
  kitchenName: 'LUNAR Central Culinary Suite',
  headChef: 'Marco Pierre (Executive Chef)',
  maxConcurrentOrders: 35,
  operatingHours: '07:00 AM – 11:30 PM',
  autoRouting: true,
  audioAlerts: true,
  bumpThresholdMins: 18,
  prepWarningThresholdMins: 12,
  orderDispatchStrategy: 'Simultaneous Course Release',
  kitchenPrinterIp: '192.168.1.150:9100'
};

export const INITIAL_KITCHEN_STATIONS = [
  {
    id: 'ST-01',
    name: 'Hot Kitchen & Curry Pass',
    code: 'HK-PASS',
    leadChef: 'Chef Sanjeev (Sous Chef)',
    screenCount: 2,
    activeTickets: 4,
    avgPrepTime: '16m',
    status: 'Active'
  },
  {
    id: 'ST-02',
    name: 'Tandoor & Clay Oven Section',
    code: 'TND-01',
    leadChef: 'Chef Harinder',
    screenCount: 1,
    activeTickets: 3,
    avgPrepTime: '12m',
    status: 'Active'
  },
  {
    id: 'ST-03',
    name: 'Appetizers & Fryer Station',
    code: 'APP-FRY',
    leadChef: 'Chef Vikas',
    screenCount: 1,
    activeTickets: 2,
    avgPrepTime: '9m',
    status: 'Active'
  },
  {
    id: 'ST-04',
    name: 'Grill, Rotisserie & Sauté',
    code: 'GRL-SAUT',
    leadChef: 'Chef Raymond',
    screenCount: 2,
    activeTickets: 5,
    avgPrepTime: '18m',
    status: 'Active'
  },
  {
    id: 'ST-05',
    name: 'Bakery, Pizza & Pastry',
    code: 'BAK-PZZ',
    leadChef: 'Pastry Chef Chloe',
    screenCount: 1,
    activeTickets: 2,
    avgPrepTime: '13m',
    status: 'Active'
  },
  {
    id: 'ST-06',
    name: 'Beverage Bar & Mocktail Lounge',
    code: 'BAR-MOCK',
    leadChef: 'Mixologist Alan',
    screenCount: 1,
    activeTickets: 1,
    avgPrepTime: '5m',
    status: 'Active'
  }
];

export const INITIAL_KDS_DEVICES = [
  {
    id: 'KDS-001',
    name: 'Pass Master Screen 01',
    ipAddress: '192.168.1.101',
    macAddress: 'B8:27:EB:4A:12:F1',
    stationId: 'ST-01',
    stationName: 'Hot Kitchen & Curry Pass',
    screenSize: '24" Touch Display',
    model: 'Elo Touch I-Series 4',
    status: 'Online',
    lastHeartbeat: 'Just now'
  },
  {
    id: 'KDS-002',
    name: 'Tandoor Oven Display',
    ipAddress: '192.168.1.102',
    macAddress: 'B8:27:EB:9C:55:10',
    stationId: 'ST-02',
    stationName: 'Tandoor & Clay Oven Section',
    screenSize: '21.5" Waterproof KDS',
    model: 'Advantech UTC-520',
    status: 'Online',
    lastHeartbeat: '12s ago'
  },
  {
    id: 'KDS-003',
    name: 'Grill & Sauté Station Tablet',
    ipAddress: '192.168.1.103',
    macAddress: '00:1A:2B:3C:4D:5E',
    stationId: 'ST-04',
    stationName: 'Grill, Rotisserie & Sauté',
    screenSize: '15.6" Thermal Shielded',
    model: 'Posiflex XT-3815',
    status: 'Online',
    lastHeartbeat: '25s ago'
  },
  {
    id: 'KDS-004',
    name: 'Woodfire Bakery KDS Unit',
    ipAddress: '192.168.1.104',
    macAddress: '24:4B:FE:09:A1:77',
    stationId: 'ST-05',
    stationName: 'Bakery, Pizza & Pastry',
    screenSize: '18.5" Wall Mounted',
    model: 'Aures Yuno II',
    status: 'Online',
    lastHeartbeat: '1m ago'
  },
  {
    id: 'KDS-005',
    name: 'Beverage Bar Tablet Station',
    ipAddress: '192.168.1.105',
    macAddress: 'A0:C5:89:12:34:67',
    stationId: 'ST-06',
    stationName: 'Beverage Bar & Mocktail Lounge',
    screenSize: '12.9" Bar Tablet',
    model: 'Apple iPad Pro KDS Stand',
    status: 'Online',
    lastHeartbeat: '5s ago'
  }
];

export const INITIAL_KDS_CONFIG = {
  viewMode: 'Grid', // 'Grid' or 'Flow'
  greenThresholdMins: 10,
  yellowThresholdMins: 16,
  redThresholdMins: 22,
  fontSize: 'Medium',
  soundChimeOnOrder: true,
  autoArchiveMins: 15,
  oneClickBump: true,
  showTicketSummaryBar: true,
  enableSplitOrderItems: true
};

export const INITIAL_TABLE_SECTIONS = [
  {
    id: 'SEC-01',
    name: 'Indoor Luxury Hall',
    floor: 'Ground Floor',
    totalTables: 8,
    maxCapacity: 34,
    manager: 'Harrison Blake',
    status: 'Open'
  },
  {
    id: 'SEC-02',
    name: 'Outdoor Royal Terrace',
    floor: 'Roof Garden / Terrace',
    totalTables: 6,
    maxCapacity: 28,
    manager: 'Aman Sharma',
    status: 'Open'
  },
  {
    id: 'SEC-03',
    name: 'Private VIP Dining Suites',
    floor: 'Mezzanine Suite A',
    totalTables: 3,
    maxCapacity: 20,
    manager: 'Elena Rostova',
    status: 'Reserved'
  },
  {
    id: 'SEC-04',
    name: 'Cocktail Bar & Tapas Lounge',
    floor: 'Ground Floor East Wing',
    totalTables: 5,
    maxCapacity: 16,
    manager: 'Alan Cross',
    status: 'Open'
  }
];

export const INITIAL_TABLE_TYPES = [
  {
    id: 'TT-01',
    name: 'Standard Dining Table',
    stdCapacity: 4,
    minCapacity: 2,
    maxCapacity: 4,
    surcharge: 0,
    description: 'Classic high-finish walnut wood table with cushioned armchairs.'
  },
  {
    id: 'TT-02',
    name: 'Intimate Couple Booth',
    stdCapacity: 2,
    minCapacity: 1,
    maxCapacity: 2,
    surcharge: 100,
    description: 'Private upholstered velvet booths with soft warm candlelight.'
  },
  {
    id: 'TT-03',
    name: 'Family & Celebration Table',
    stdCapacity: 6,
    minCapacity: 4,
    maxCapacity: 8,
    surcharge: 0,
    description: 'Long banquet dining setup with revolving lazy Susan tray.'
  },
  {
    id: 'TT-04',
    name: 'Executive VIP Boardroom Table',
    stdCapacity: 10,
    minCapacity: 6,
    maxCapacity: 12,
    surcharge: 500,
    description: 'Exclusive suite setup with dedicated personal server call button.'
  },
  {
    id: 'TT-05',
    name: 'High-Top Bar Cocktail Station',
    stdCapacity: 2,
    minCapacity: 1,
    maxCapacity: 3,
    surcharge: 0,
    description: 'High ergonomic barstools right next to our cocktail show bar.'
  }
];

export const INITIAL_TABLE_COMBINATIONS = [
  {
    id: 'TC-01',
    name: 'Hall Grand Banquet Unit (T01 + T02)',
    tableIds: ['T01', 'T02'],
    section: 'Indoor Luxury Hall',
    combinedCapacity: 8,
    allowSingleUnitBooking: true,
    status: 'Joined'
  },
  {
    id: 'TC-02',
    name: 'Terrace Sunset Party Pod (T05 + T06)',
    tableIds: ['T05', 'T06'],
    section: 'Outdoor Royal Terrace',
    combinedCapacity: 12,
    allowSingleUnitBooking: true,
    status: 'Split'
  },
  {
    id: 'TC-03',
    name: 'Family Corner Feast (T03 + T04)',
    tableIds: ['T03', 'T04'],
    section: 'Indoor Luxury Hall',
    combinedCapacity: 10,
    allowSingleUnitBooking: false,
    status: 'Joined'
  }
];

export const INITIAL_POS_CONFIG = {
  terminalId: 'POS-MAIN-001',
  restaurantName: 'LUNAR',
  restaurantBranch: 'Bangalore Flagship',
  currency: 'INR',
  currencySymbol: '₹',
  roundingMode: 'Nearest Integer',
  autoPrintReceiptOnSettle: true,
  defaultServiceType: 'Dine-In',
  gstin: '29ABCDE1234F1Z5',
  fssaiNumber: '11223344556677',
  enableKitchenTicketPrint: true,
  allowSplitPayments: true
};

export const INITIAL_POS_COUNTERS = [
  {
    id: 'CTR-01',
    name: 'Main Front Billing Counter 1',
    assignedCashier: 'Priyanka (Senior Cashier)',
    openingDrawerCash: 5000,
    currentDrawerCash: 24650,
    shiftStartTime: '11:00 AM',
    status: 'Open'
  },
  {
    id: 'CTR-02',
    name: 'Terrace Mobile Billing Station',
    assignedCashier: 'Aman Sharma (Manager)',
    openingDrawerCash: 3000,
    currentDrawerCash: 16800,
    shiftStartTime: '12:30 PM',
    status: 'Open'
  },
  {
    id: 'CTR-03',
    name: 'Bar & Cocktail POS Register',
    assignedCashier: 'Alan Cross (Bartender)',
    openingDrawerCash: 2500,
    currentDrawerCash: 9400,
    shiftStartTime: '01:00 PM',
    status: 'Open'
  },
  {
    id: 'CTR-04',
    name: 'Takeaway & Delivery Dispatch POS',
    assignedCashier: 'Rohit K. (Dispatcher)',
    openingDrawerCash: 2000,
    currentDrawerCash: 7200,
    shiftStartTime: '11:00 AM',
    status: 'Open'
  }
];

export const INITIAL_PAYMENT_METHODS = [
  {
    id: 'PAY-01',
    name: 'Cash Payment',
    type: 'Cash',
    surchargePercent: 0,
    gateway: 'Cash Register Drawer',
    active: true
  },
  {
    id: 'PAY-02',
    name: 'Credit / Debit Card (Swipe/Tap)',
    type: 'Card',
    surchargePercent: 0,
    gateway: 'HDFC EDC Terminal / Pinelabs',
    active: true
  },
  {
    id: 'PAY-03',
    name: 'UPI / Dynamic QR Pay',
    type: 'UPI',
    surchargePercent: 0,
    gateway: 'Razorpay Smart QR (GPay/PhonePe)',
    active: true
  },
  {
    id: 'PAY-04',
    name: 'Net Banking / Corporate Transfer',
    type: 'NetBanking',
    surchargePercent: 0,
    gateway: 'Direct Bank Wire / NEFT',
    active: true
  },
  {
    id: 'PAY-05',
    name: 'Digital Wallets (Apple Pay / Paytm)',
    type: 'Wallet',
    surchargePercent: 0,
    gateway: 'Stripe & Paytm Gateway',
    active: true
  },
  {
    id: 'PAY-06',
    name: 'Loyalty Reward Points Redemption',
    type: 'Loyalty',
    surchargePercent: 0,
    gateway: 'Lunar Connoisseur Club',
    active: true
  }
];

export const INITIAL_TAX_CONFIG = [
  {
    id: 'TAX-01',
    name: 'CGST (Central GST)',
    ratePercent: 2.5,
    applicableOn: 'Food & Non-Alcoholic Drinks',
    type: 'Percentage',
    active: true
  },
  {
    id: 'TAX-02',
    name: 'SGST (State GST)',
    ratePercent: 2.5,
    applicableOn: 'Food & Non-Alcoholic Drinks',
    type: 'Percentage',
    active: true
  },
  {
    id: 'TAX-03',
    name: 'Discretionary Staff Service Charge',
    ratePercent: 5.0,
    applicableOn: 'Total Dine-in Order',
    type: 'Percentage',
    active: true
  },
  {
    id: 'TAX-04',
    name: 'Liquor State Excise VAT',
    ratePercent: 10.0,
    applicableOn: 'Bar, Wine & Spirits',
    type: 'Percentage',
    active: true
  }
];

export const INITIAL_DISCOUNT_CONFIG = [
  {
    id: 'DISC-01',
    code: 'WELCOME10',
    title: 'New Guest Welcome Incentive',
    discountPercent: 10,
    type: 'Percentage',
    minOrderAmount: 800,
    maxDiscount: 250,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    active: true
  },
  {
    id: 'DISC-02',
    code: 'ROYALVIP15',
    title: 'Lunar Black Gold VIP Privileged Dining',
    discountPercent: 15,
    type: 'Percentage',
    minOrderAmount: 1500,
    maxDiscount: 1000,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    active: true
  },
  {
    id: 'DISC-03',
    code: 'HAPPYHOUR20',
    title: 'Happy Hours Beverage & Appetizers',
    discountPercent: 20,
    type: 'Percentage',
    minOrderAmount: 1000,
    maxDiscount: 600,
    validFrom: '2026-05-01',
    validTo: '2026-11-30',
    active: true
  },
  {
    id: 'DISC-04',
    code: 'CHEFMAGIC',
    title: 'Executive Chef Tasting Special',
    discountPercent: 12,
    type: 'Percentage',
    minOrderAmount: 2000,
    maxDiscount: 800,
    validFrom: '2026-08-01',
    validTo: '2026-12-31',
    active: true
  }
];

export const INITIAL_RECEIPT_SETTINGS = {
  headerTitle: 'LUNAR RESTAURANT & LOUNGE',
  subtitle: 'Luxury Fine Dining Experience',
  address: 'Level 4, Orion Towers, Indiranagar, Bangalore - 560038',
  phone: '+91 (080) 4567-8900',
  email: 'concierge@lunar-dine.com',
  website: 'www.lunar-dine.com',
  footerGreeting: 'Thank you for dining with us! We look forward to hosting you again.',
  showTaxBreakdown: true,
  showQrFeedback: true,
  showTipLine: true,
  showServerName: true,
  fontSize: 'Compact / Regular'
};

export const INITIAL_ADMIN_STAFF = [
  { id: 1, name: "Arthur Pendelton", role: ROLES.ADMIN, email: "admin@lunar.com", phone: "+91 98765 00001", shift: "General Shift", status: "Active", salary: "₹1,20,000", joined: "15 Jan 2024" },
  { id: 2, name: "Harrison Blake", role: ROLES.MANAGER, email: "manager@lunar.com", phone: "+91 98765 00002", shift: "Morning / Afternoon", status: "Active", salary: "₹75,000", joined: "10 Feb 2024" },
  { id: 3, name: "Aman Sharma", role: ROLES.MANAGER, email: "aman@lunar.com", phone: "+91 98765 43210", shift: "Evening / Night", status: "Active", salary: "₹72,000", joined: "15 Nov 2025" },
  { id: 4, name: "Chef Marco Pierre", role: ROLES.KITCHEN, email: "chef@lunar.com", phone: "+91 98765 00003", shift: "Culinary Shift", status: "Active", salary: "₹95,000", joined: "01 Mar 2024" },
  { id: 5, name: "Elena Rostova", role: ROLES.RECEPTIONIST, email: "reception@lunar.com", phone: "+91 98765 00004", shift: "Front Desk Shift", status: "Active", salary: "₹45,000", joined: "12 Apr 2024" },
  { id: 6, name: "Julian Vance", role: ROLES.WAITER, email: "julian@lunar.com", phone: "+91 98765 00005", shift: "Floor Service A", status: "Active", salary: "₹32,000", joined: "01 Jun 2024" },
  { id: 7, name: "Lucas Vance", role: ROLES.WAITER, email: "lucas@lunar.com", phone: "+91 98765 00006", shift: "Floor Service B", status: "Active", salary: "₹32,000", joined: "15 Jun 2024" },
  { id: 8, name: "Alan Cross", role: "Bartender", email: "alan@lunar.com", phone: "+91 98765 00007", shift: "Evening Lounge", status: "Active", salary: "₹40,000", joined: "20 Jul 2024" }
];

// Helper hook / accessor for Admin persistent data in localStorage
export const useAdminDatabase = () => {
  // Food & Menu
  const getFoodMaster = () => getStoredItem('lunar_food_master', INITIAL_FOOD_MASTER);
  const saveFoodMaster = (data) => setStoredItem('lunar_food_master', data);

  const getCategories = () => getStoredItem('lunar_categories', INITIAL_CATEGORIES);
  const saveCategories = (data) => setStoredItem('lunar_categories', data);

  const getMenus = () => getStoredItem('lunar_menus', INITIAL_MENUS);
  const saveMenus = (data) => setStoredItem('lunar_menus', data);

  // Kitchen & KDS
  const getKitchenSetup = () => getStoredItem('lunar_kitchen_setup', INITIAL_KITCHEN_SETUP);
  const saveKitchenSetup = (data) => setStoredItem('lunar_kitchen_setup', data);

  const getKitchenStations = () => getStoredItem('lunar_kitchen_stations', INITIAL_KITCHEN_STATIONS);
  const saveKitchenStations = (data) => setStoredItem('lunar_kitchen_stations', data);

  const getKdsDevices = () => getStoredItem('lunar_kds_devices', INITIAL_KDS_DEVICES);
  const saveKdsDevices = (data) => setStoredItem('lunar_kds_devices', data);

  const getKdsConfig = () => getStoredItem('lunar_kds_config', INITIAL_KDS_CONFIG);
  const saveKdsConfig = (data) => setStoredItem('lunar_kds_config', data);

  // Tables
  const getTableSections = () => getStoredItem('lunar_table_sections', INITIAL_TABLE_SECTIONS);
  const saveTableSections = (data) => setStoredItem('lunar_table_sections', data);

  const getTableTypes = () => getStoredItem('lunar_table_types', INITIAL_TABLE_TYPES);
  const saveTableTypes = (data) => setStoredItem('lunar_table_types', data);

  const getTableCombinations = () => getStoredItem('lunar_table_combinations', INITIAL_TABLE_COMBINATIONS);
  const saveTableCombinations = (data) => setStoredItem('lunar_table_combinations', data);

  // POS & System Settings
  const getPosConfig = () => getStoredItem('lunar_pos_config', INITIAL_POS_CONFIG);
  const savePosConfig = (data) => setStoredItem('lunar_pos_config', data);

  const getPosCounters = () => getStoredItem('lunar_pos_counters', INITIAL_POS_COUNTERS);
  const savePosCounters = (data) => setStoredItem('lunar_pos_counters', data);

  const getPaymentMethods = () => getStoredItem('lunar_payment_methods', INITIAL_PAYMENT_METHODS);
  const savePaymentMethods = (data) => setStoredItem('lunar_payment_methods', data);

  const getTaxConfig = () => getStoredItem('lunar_tax_config', INITIAL_TAX_CONFIG);
  const saveTaxConfig = (data) => setStoredItem('lunar_tax_config', data);

  const getDiscountConfig = () => getStoredItem('lunar_discount_config', INITIAL_DISCOUNT_CONFIG);
  const saveDiscountConfig = (data) => setStoredItem('lunar_discount_config', data);

  const getReceiptSettings = () => getStoredItem('lunar_receipt_settings', INITIAL_RECEIPT_SETTINGS);
  const saveReceiptSettings = (data) => setStoredItem('lunar_receipt_settings', data);

  const getAdminStaff = () => getStoredItem('lunar_admin_staff', INITIAL_ADMIN_STAFF);
  const saveAdminStaff = (data) => setStoredItem('lunar_admin_staff', data);

  return {
    getFoodMaster, saveFoodMaster,
    getCategories, saveCategories,
    getMenus, saveMenus,
    getKitchenSetup, saveKitchenSetup,
    getKitchenStations, saveKitchenStations,
    getKdsDevices, saveKdsDevices,
    getKdsConfig, saveKdsConfig,
    getTableSections, saveTableSections,
    getTableTypes, saveTableTypes,
    getTableCombinations, saveTableCombinations,
    getPosConfig, savePosConfig,
    getPosCounters, savePosCounters,
    getPaymentMethods, savePaymentMethods,
    getTaxConfig, saveTaxConfig,
    getDiscountConfig, saveDiscountConfig,
    getReceiptSettings, saveReceiptSettings,
    getAdminStaff, saveAdminStaff
  };
};
