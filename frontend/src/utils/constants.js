// Curated High-Definition Restaurant & Food Imagery (Warm Mocha & Fine Dining Palette)
export const RESTAURANT_IMAGES = {
  hero: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85", // Luxury steak and warm candlelit dining
  heroAlt: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85", // Grand warm luxury dining hall
  about: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85", // Elegant table setting
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=85", // Master Chef plating
  interior: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85", // Warm mahogany interior
  privateDining: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85", // Premium booth dining
  wineCellar: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=85", // Wine cellar
  dessertSignature: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85", // Mocha chocolate dessert
  coffeeBar: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85", // Artisanal coffee brewing

  // Food & Dishes
  dish1: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", // Prime Ribeye Steak
  dish2: "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80", // Truffle Cream Tagliatelle
  dish3: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", // Dark Mocha Soufflé
  dish4: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", // Gourmet Lamb Chops
  dish5: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", // Artisanal Rustic Pizza
  dish6: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80", // Pan Seared Scallops
  dish7: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80", // Caramel Macchiato & Pastry
  dish8: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80", // Reserve Red Vintage
};

export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  CUSTOMER: "customer",
  KITCHEN: "kitchen",
  RECEPTIONIST: "receptionist",
  WAITER: "waiter",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Admin",
  [ROLES.MANAGER]: "Restaurant Manager",
  [ROLES.CUSTOMER]: "Customer",
  [ROLES.KITCHEN]: "Kitchen Staff",
  [ROLES.RECEPTIONIST]: "Receptionist",
  [ROLES.WAITER]: "Waiter Staff",
};

export const RESTAURANT_LOCATIONS = [
  "Manhattan Flagship (Downtown 5th Ave)",
  "Uptown Bistro & Lounge (Madison Ave)",
  "Beverly Hills Garden Terrace (Wilshire Blvd)",
  "SoHo Culinary Loft (Spring St)",
];

export const INITIAL_MENU_ITEMS = [
  {
    id: 1,
    name: "Dry-Aged Mocha Ribeye",
    category: "Mains",
    price: 48.00,
    description: "28-day dry-aged beef glazed with dark cocoa and espresso butter reduction, served with roasted root vegetables.",
    image: RESTAURANT_IMAGES.dish1,
    signature: true,
    available: true,
    prepTime: "20-25 mins",
    calories: "780 kcal",
    allergens: ["Dairy"],
    ingredients: "28-day dry aged USDA prime ribeye, Valrhona dark chocolate, espresso bean butter, roasted baby carrots, broccolini.",
    customizations: [
      { name: "Cooking Temperature", options: ["Rare", "Medium Rare", "Medium", "Well Done"] },
      { name: "Butter Glaze", options: ["Mocha Espresso Butter", "Garlic Herb Butter", "Truffle Butter (+$4)"] }
    ],
    tags: ["Chef Special", "Signature"]
  },
  {
    id: 2,
    name: "Truffle & Wild Mushroom Pappardelle",
    category: "Mains",
    price: 34.00,
    description: "Handmade pasta, shaved black Perigord truffle, chanterelle mushrooms, aged Parmesan cream.",
    image: RESTAURANT_IMAGES.dish2,
    signature: true,
    available: true,
    prepTime: "15-18 mins",
    calories: "620 kcal",
    allergens: ["Gluten", "Dairy", "Eggs"],
    ingredients: "Fresh artisan egg pasta, black truffles, wild chanterelles, 30-month Parmigiano-Reggiano, thyme.",
    customizations: [
      { name: "Pasta Type", options: ["Pappardelle", "Gluten-Free Penne"] },
      { name: "Truffle Portion", options: ["Standard (3g)", "Extra Black Truffle +5g (+$8)"] }
    ],
    tags: ["Vegetarian", "Signature"]
  },
  {
    id: 3,
    name: "Rosemary Glazed Colorado Lamb",
    category: "Mains",
    price: 44.00,
    description: "Herb-crusted tender lamb cutlets with roasted garlic purée, pomegranate jus, and heirloom carrots.",
    image: RESTAURANT_IMAGES.dish4,
    signature: true,
    available: true,
    prepTime: "22-25 mins",
    calories: "710 kcal",
    allergens: ["None"],
    ingredients: "Colorado free-range lamb, fresh rosemary, roasted garlic, pomegranate reduction, organic carrots.",
    customizations: [
      { name: "Doneness", options: ["Medium Rare", "Medium"] },
      { name: "Side", options: ["Garlic Purée", "Truffle Fries", "Grilled Asparagus"] }
    ],
    tags: ["Gluten-Free"]
  },
  {
    id: 4,
    name: "Pan-Seared Hokkaido Scallops",
    category: "Appetizers",
    price: 26.00,
    description: "Crispy pancetta, cauliflower velvet, brown butter emulsion, and micro greens.",
    image: RESTAURANT_IMAGES.dish6,
    signature: false,
    available: true,
    prepTime: "12-15 mins",
    calories: "380 kcal",
    allergens: ["Molluscs", "Dairy"],
    ingredients: "Wild U-10 Hokkaido scallops, smoked pancetta, cauliflower cream, clarified brown butter.",
    customizations: [
      { name: "Pancetta", options: ["With Pancetta", "Without Pancetta (Pescetarian)"] }
    ],
    tags: ["Seafood", "Popular"]
  },
  {
    id: 5,
    name: "Artisanal Burrata & Heirloom Fig",
    category: "Appetizers",
    price: 22.00,
    description: "Creamy Puglia burrata, mission figs, crushed pistachio, 25-year balsamic glaze, warm sourdough.",
    image: RESTAURANT_IMAGES.dish5,
    signature: false,
    available: true,
    prepTime: "10 mins",
    calories: "450 kcal",
    allergens: ["Dairy", "Nuts", "Gluten"],
    ingredients: "Imported burrata, black mission figs, Sicilian pistachios, aged balsamic di Modena, levain bread.",
    customizations: [
      { name: "Nuts", options: ["Included", "Nut-Free (No Pistachio)"] }
    ],
    tags: ["Vegetarian"]
  },
  {
    id: 6,
    name: "Warm Mocha Chocolate Fondant",
    category: "Desserts",
    price: 18.00,
    description: "Valrhona 70% dark chocolate lava cake infused with espresso, roasted hazelnut gelato, gold leaf.",
    image: RESTAURANT_IMAGES.dish3,
    signature: true,
    available: true,
    prepTime: "15 mins",
    calories: "520 kcal",
    allergens: ["Dairy", "Eggs", "Nuts", "Gluten"],
    ingredients: "Valrhona Guanaja 70%, single-origin espresso shot, organic eggs, Piedmont hazelnuts, 24k gold leaf.",
    customizations: [
      { name: "Gelato Flavor", options: ["Roasted Hazelnut", "Tahitian Vanilla Bean", "Espresso Crunch"] }
    ],
    tags: ["Dessert", "Signature"]
  },
  {
    id: 7,
    name: "Velvet Espresso Crème Brûlée",
    category: "Desserts",
    price: 16.00,
    description: "Madagascar vanilla bean custard, crunchy caramelized turbinado crust, cocoa dusted biscotti.",
    image: RESTAURANT_IMAGES.dish7,
    signature: false,
    available: true,
    prepTime: "8 mins",
    calories: "410 kcal",
    allergens: ["Dairy", "Eggs", "Gluten"],
    ingredients: "Double cream, egg yolks, Madagascar Bourbon vanilla, turbinado sugar, dark espresso roast.",
    customizations: [],
    tags: ["Dessert"]
  },
  {
    id: 8,
    name: "Reserve Cabernet Sauvignon 2018",
    category: "Beverages",
    price: 95.00,
    description: "Napa Valley vintage with complex notes of blackberry, cedar oak, and roasted espresso beans.",
    image: RESTAURANT_IMAGES.dish8,
    signature: false,
    available: true,
    prepTime: "5 mins",
    calories: "160 kcal/glass",
    allergens: ["Sulfites"],
    ingredients: "100% Cabernet Sauvignon grapes, French oak aged 22 months.",
    customizations: [
      { name: "Service", options: ["By the Bottle", "Decanted Table-side"] }
    ],
    tags: ["Cellar Pick"]
  }
];

// Physical Restaurant Tables (Status: Available -> Reserved -> Occupied -> Cleaning -> Available)
export const INITIAL_TABLES = [
  { id: "T-01", number: 1, capacity: 2, section: "Floor A (Window)", status: "Available", activeSessionId: null, waiter: "Julian Vance", qrCode: "QR-TABLE-01" },
  { id: "T-02", number: 2, capacity: 4, section: "Floor A (Window)", status: "Occupied", activeSessionId: "000001", waiter: "Julian Vance", qrCode: "QR-TABLE-02" },
  { id: "T-03", number: 3, capacity: 2, section: "Floor A (Interior)", status: "Available", activeSessionId: null, waiter: "Julian Vance", qrCode: "QR-TABLE-03" },
  { id: "T-04", number: 4, capacity: 4, section: "Floor A (Booth)", status: "Occupied", activeSessionId: "000002", waiter: "Julian Vance", qrCode: "QR-TABLE-04" },
  { id: "T-05", number: 5, capacity: 6, section: "Floor B (Terrace)", status: "Reserved", activeSessionId: null, waiter: "Lucas Vance", qrCode: "QR-TABLE-05" },
  { id: "T-06", number: 6, capacity: 2, section: "Floor B (Terrace)", status: "Cleaning", activeSessionId: null, waiter: "Lucas Vance", qrCode: "QR-TABLE-06" },
  { id: "T-07", number: 7, capacity: 4, section: "Floor B (Terrace)", status: "Occupied", activeSessionId: "000003", waiter: "Lucas Vance", qrCode: "QR-TABLE-07" },
  { id: "T-08", number: 8, capacity: 6, section: "Private Dining Suite", status: "Available", activeSessionId: null, waiter: "Lucas Vance", qrCode: "QR-TABLE-08" },
  { id: "T-09", number: 9, capacity: 2, section: "Lounge Bar", status: "Available", activeSessionId: null, waiter: "Amelia Thorne", qrCode: "QR-TABLE-09" },
  { id: "T-10", number: 10, capacity: 4, section: "Lounge Bar", status: "Available", activeSessionId: null, waiter: "Amelia Thorne", qrCode: "QR-TABLE-10" },
  { id: "T-11", number: 11, capacity: 6, section: "Sommelier Cellar", status: "Reserved", activeSessionId: null, waiter: "Amelia Thorne", qrCode: "QR-TABLE-11" },
  { id: "T-12", number: 12, capacity: 8, section: "Presidential Vault", status: "Available", activeSessionId: null, waiter: "Julian Vance", qrCode: "QR-TABLE-12" },
];

// Active & Historical Dining Sessions (Daily 6-Digit Counter: 000001, 000002...)
export const INITIAL_SESSIONS = [
  {
    sessionId: "000001",
    tableNumber: 2,
    tableId: "T-02",
    reservationId: "BK-90214",
    guestName: "Sophia Montgomery",
    guestPhone: "+1 (555) 392-8819",
    partySize: 4,
    checkInTime: "06:45 PM",
    checkOutTime: null,
    status: "Active", // "Active", "Billed", "Completed"
    waiter: "Julian Vance",
    orders: ["ORD-501"],
    advancePayment: 50.00,
    subtotal: 130.00,
    tax: 11.70,
    serviceCharge: 13.00,
    discount: 0.00,
    total: 104.70, // after advance
    paymentStatus: "Pending", // "Pending", "Paid"
    paymentMethod: null
  },
  {
    sessionId: "000002",
    tableNumber: 4,
    tableId: "T-04",
    reservationId: "BK-88432",
    guestName: "Lord Alistair Sterling",
    guestPhone: "+1 (555) 890-1122",
    partySize: 4,
    checkInTime: "07:10 PM",
    checkOutTime: null,
    status: "Active",
    waiter: "Julian Vance",
    orders: ["ORD-502"],
    advancePayment: 0.00,
    subtotal: 118.00,
    tax: 10.62,
    serviceCharge: 11.80,
    discount: 15.00,
    total: 125.42,
    paymentStatus: "Pending",
    paymentMethod: null
  },
  {
    sessionId: "000003",
    tableNumber: 7,
    tableId: "T-07",
    reservationId: "BK-90412",
    guestName: "Victoria Kensington",
    guestPhone: "+1 (555) 442-9901",
    partySize: 2,
    checkInTime: "07:30 PM",
    checkOutTime: null,
    status: "Active",
    waiter: "Lucas Vance",
    orders: ["ORD-503"],
    advancePayment: 25.00,
    subtotal: 62.00,
    tax: 5.58,
    serviceCharge: 6.20,
    discount: 0.00,
    total: 48.78,
    paymentStatus: "Pending",
    paymentMethod: null
  }
];

// Unified Orders Linked Directly to 6-Digit Table Session ID
export const INITIAL_ORDERS = [
  {
    id: "ORD-501",
    kotId: "KOT-101",
    sessionId: "000001",
    tableNumber: 2,
    waiter: "Julian Vance",
    placedBy: "Customer",
    time: "15 mins ago",
    status: "Preparing", // "New", "Accepted", "Preparing", "Ready to Serve", "Served", "Rejected"
    rejectReason: "",
    isDelayed: false,
    items: [
      { id: 1, name: "Dry-Aged Mocha Ribeye", price: 48.00, qty: 2, notes: "Medium Rare, extra reduction", customizations: "Medium Rare, Mocha Butter" },
      { id: 5, name: "Artisanal Burrata & Heirloom Fig", price: 22.00, qty: 1, notes: "No nuts for guest", customizations: "Nut-Free" },
      { id: 7, name: "Velvet Espresso Crème Brûlée", price: 16.00, qty: 1, notes: "", customizations: "" }
    ]
  },
  {
    id: "ORD-502",
    kotId: "KOT-102",
    sessionId: "000002",
    tableNumber: 4,
    waiter: "Julian Vance",
    placedBy: "Waiter",
    time: "6 mins ago",
    status: "New",
    rejectReason: "",
    isDelayed: false,
    items: [
      { id: 2, name: "Truffle & Wild Mushroom Pappardelle", price: 34.00, qty: 2, notes: "Extra shaved truffle", customizations: "Pappardelle, Extra Black Truffle +5g" },
      { id: 4, name: "Pan-Seared Hokkaido Scallops", price: 26.00, qty: 1, notes: "Crispy pancetta well done", customizations: "With Pancetta" },
      { id: 6, name: "Warm Mocha Chocolate Fondant", price: 18.00, qty: 1, notes: "", customizations: "Roasted Hazelnut Gelato" }
    ]
  },
  {
    id: "ORD-503",
    kotId: "KOT-103",
    sessionId: "000003",
    tableNumber: 7,
    waiter: "Lucas Vance",
    placedBy: "Customer",
    time: "24 mins ago",
    status: "Ready to Serve",
    rejectReason: "",
    isDelayed: true,
    items: [
      { id: 3, name: "Rosemary Glazed Colorado Lamb", price: 44.00, qty: 1, notes: "Medium rare", customizations: "Medium Rare, Truffle Fries" },
      { id: 6, name: "Warm Mocha Chocolate Fondant", price: 18.00, qty: 1, notes: "Serve right away", customizations: "Tahitian Vanilla" }
    ]
  },
  {
    id: "ORD-500",
    kotId: "KOT-100",
    sessionId: "000001",
    tableNumber: 2,
    waiter: "Julian Vance",
    placedBy: "Waiter",
    time: "40 mins ago",
    status: "Served",
    rejectReason: "",
    isDelayed: false,
    items: [
      { id: 8, name: "Reserve Cabernet Sauvignon 2018", price: 95.00, qty: 1, notes: "Decant at table", customizations: "Decanted Table-side" }
    ]
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "BK-90214",
    userId: "cust-1",
    customerName: "Sophia Montgomery",
    contactNumber: "+1 (555) 392-8819",
    location: "Manhattan Flagship (Downtown 5th Ave)",
    date: "2026-11-20",
    time: "07:30 PM",
    guests: "4 People",
    tableNo: "Table 2",
    specialRequests: "Anniversary celebration, romantic window booth please.",
    status: "Checked-In", // "Confirmed", "Checked-In", "Completed", "Cancelled"
    sessionId: "000001",
    advancePaid: 50.00,
    qrCode: "BK-90214-QR-SOPHIA",
    createdAt: "2026-11-12T10:15:00Z"
  },
  {
    id: "BK-88432",
    userId: "cust-2",
    customerName: "Lord Alistair Sterling",
    contactNumber: "+1 (555) 890-1122",
    location: "Uptown Bistro & Lounge (Madison Ave)",
    date: "2026-11-25",
    time: "08:00 PM",
    guests: "4 People",
    tableNo: "Table 4",
    specialRequests: "Quiet corner table, sommelier pairing requested.",
    status: "Checked-In",
    sessionId: "000002",
    advancePaid: 0.00,
    qrCode: "BK-88432-QR-ALISTAIR",
    createdAt: "2026-11-10T14:22:00Z"
  },
  {
    id: "BK-90412",
    userId: "cust-3",
    customerName: "Victoria Kensington",
    contactNumber: "+1 (555) 442-9901",
    location: "Manhattan Flagship (Downtown 5th Ave)",
    date: "2026-11-20",
    time: "07:30 PM",
    guests: "2 People",
    tableNo: "Table 7",
    specialRequests: "Terrace heating.",
    status: "Checked-In",
    sessionId: "000003",
    advancePaid: 25.00,
    qrCode: "BK-90412-QR-VICTORIA",
    createdAt: "2026-11-14T08:10:00Z"
  },
  {
    id: "BK-76190",
    userId: "cust-1",
    customerName: "Sophia Montgomery",
    contactNumber: "+1 (555) 392-8819",
    location: "Beverly Hills Garden Terrace (Wilshire Blvd)",
    date: "2026-10-15",
    time: "06:30 PM",
    guests: "6 People",
    tableNo: "Table 18",
    specialRequests: "Outdoor terrace seating with heaters.",
    status: "Completed",
    sessionId: "000000",
    advancePaid: 50.00,
    qrCode: "BK-76190-QR-OLD",
    createdAt: "2026-10-10T09:40:00Z"
  }
];

// Waiting List for Reception
export const INITIAL_WAITING_LIST = [
  { id: "W-101", name: "David Sterling", phone: "+1 (555) 231-8899", guests: "2 People", waitTime: "10 mins", status: "Waiting", addedAt: "07:25 PM" },
  { id: "W-102", name: "Lady Genevieve", phone: "+1 (555) 667-2211", guests: "4 People", waitTime: "20 mins", status: "Notified", addedAt: "07:15 PM" },
  { id: "W-103", name: "Alexander Vance", phone: "+1 (555) 991-3344", guests: "6 People", waitTime: "35 mins", status: "Waiting", addedAt: "07:05 PM" }
];

// Promotional Offers & Discount Coupons
export const INITIAL_OFFERS = [
  { id: "OFF-1", code: "MOCHA15", title: "15% Welcome Haute Dining", discountPercent: 15, validUntil: "2026-12-31", minSpend: 100, usageCount: 42, active: true },
  { id: "OFF-2", code: "CHEFGOLD", title: "20% Master Chef Tasting Special", discountPercent: 20, validUntil: "2026-11-30", minSpend: 150, usageCount: 18, active: true },
  { id: "OFF-3", code: "CELLAR25", title: "$25 Flat Discount on Reserve Cellar Bottles", discountAmount: 25, validUntil: "2026-12-15", minSpend: 200, usageCount: 9, active: true },
  { id: "OFF-4", code: "VIPSECRET", title: "Complimentary Dark Mocha Fondant", discountAmount: 18, validUntil: "2026-12-31", minSpend: 80, usageCount: 31, active: true }
];

// Customer Reviews & Feedback
export const INITIAL_REVIEWS = [
  { id: "REV-1", guest: "Sophia Montgomery", rating: 5, date: "2026-11-12", comment: "The dry-aged mocha ribeye was cooked to perfection. The wine pairing from the sommelier was outstanding.", status: "Published" },
  { id: "REV-2", guest: "Marcus Sterling", rating: 5, date: "2026-11-10", comment: "Flawless table service and ambient candlelit dining. By far the finest culinary experience in the city.", status: "Published" },
  { id: "REV-3", guest: "Victoria Kensington", rating: 4, date: "2026-11-08", comment: "Exceptional burrata and truffle pasta. Service was slightly delayed on the terrace, but resolved immediately by the manager.", status: "Published" },
  { id: "REV-4", guest: "Arthur Pendelton", rating: 5, date: "2026-11-05", comment: "An absolute masterclass in flavor balance and presentation. The chocolate fondant is unmatched.", status: "Published" }
];

// Complaints Log
export const INITIAL_COMPLAINTS = [
  { id: "CMP-01", guest: "Dr. Jonathan Crane", table: "Table 7", date: "2026-11-14", issue: "Terrace breeze too cold despite overhead heaters.", status: "Resolved", resolution: "Provided cashmere throws & relocated to Table 2 window booth." },
  { id: "CMP-02", guest: "Amira Bennett", table: "Table 4", date: "2026-11-13", issue: "Steak was medium instead of medium rare.", status: "Resolved", resolution: "Executive chef personally prepared a fresh cut with complimentary reserve port." }
];

// Inventory & Ingredients Stock
export const INITIAL_INVENTORY = [
  { id: "INV-01", item: "Dry-Aged Prime Ribeye (USDA Prime)", category: "Butchery", stock: 18, minStock: 25, unit: "Cuts (14oz)", status: "Low Stock", unitCost: 28.50, supplier: "Heritage Cattle Farms NY" },
  { id: "INV-02", item: "Perigord Black Truffles", category: "Specialty", stock: 6, minStock: 5, unit: "Ounces", status: "Optimal", unitCost: 95.00, supplier: "Provençal Epicure Imports" },
  { id: "INV-03", item: "Reserve Cabernet Sauvignon 2018", category: "Cellar", stock: 14, minStock: 12, unit: "Bottles", status: "Optimal", unitCost: 52.00, supplier: "Napa Valley Estate Dist." },
  { id: "INV-04", item: "Valrhona 70% Dark Cocoa", category: "Patisserie", stock: 4, minStock: 10, unit: "Kilograms", status: "Low Stock", unitCost: 34.00, supplier: "Valrhona Gourmet Direct" },
  { id: "INV-05", item: "Single-Origin Ethiopian Espresso Beans", category: "Barista", stock: 22, minStock: 15, unit: "Bags (2lb)", status: "Optimal", unitCost: 18.00, supplier: "Yirgacheffe Roasters" },
  { id: "INV-06", item: "Hokkaido Sea Scallops (U-10)", category: "Seafood", stock: 28, minStock: 30, unit: "Portions", status: "Optimal", unitCost: 19.50, supplier: "Tokyo Bay Fishery Express" }
];

// Roles and Permission Definitions
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "Full System Configuration",
    "Revenue & Executive Financial Reports",
    "Staff Hiring & Salary Administration",
    "Menu Catalog Editing & Pricing",
    "Master Inventory & Supplier Approvals",
    "Access All 6 Portals"
  ],
  [ROLES.MANAGER]: [
    "Floor Supervision & Table Reallocation",
    "Daily Shift Roster & Staff Duty Controls",
    "Inventory Requisition to Admin",
    "Comp & Courtesy Discount Approvals",
    "Guest Complaint Resolution",
    "Daily Z-Report & Cash Settlement"
  ],
  [ROLES.RECEPTIONIST]: [
    "Guest Reservation Desk & Confirmation",
    "Arrival QR Scanning & Check-In",
    "Daily 6-Digit Table Session Generation",
    "Waiting Queue Management",
    "Table Allocation & Checkout Processing"
  ],
  [ROLES.KITCHEN]: [
    "Live Kitchen Display System (KDS)",
    "New Order Accept / Reject with Reason",
    "Preparation Time Updates",
    "Ready to Serve Dispatch Alerts",
    "Ingredient Stock Threshold Requests"
  ],
  [ROLES.WAITER]: [
    "Assigned Section & Table Oversight",
    "Order Punching linked to Table Session",
    "Live Ready-to-Serve Notifications",
    "Mark Dishes as Served",
    "Table Reassignment Awareness"
  ],
  [ROLES.CUSTOMER]: [
    "Explore Menu & Allergen Information",
    "Table Reservation & Deposit with QR",
    "My Dining Orders Live Tracking",
    "Cart & Customization Checkout",
    "Review & Rating Submission"
  ]
};

export const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM",
  "08:30 PM", "09:00 PM", "09:30 PM"
];

export const GUEST_OPTIONS = [
  "2 People",
  "4 People",
  "6 People",
  "8 People",
  "10+ Gala Party"
];
