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
    tags: ["Cellar Pick"]
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
    tableNo: "Table 12",
    specialRequests: "Anniversary celebration, romantic window booth please.",
    status: "Confirmed",
    createdAt: "2026-11-12T10:15:00Z"
  },
  {
    id: "BK-88432",
    userId: "cust-1",
    customerName: "Sophia Montgomery",
    contactNumber: "+1 (555) 392-8819",
    location: "Uptown Bistro & Lounge (Madison Ave)",
    date: "2026-11-25",
    time: "08:00 PM",
    guests: "2 People",
    tableNo: "Table 04",
    specialRequests: "Quiet corner table.",
    status: "Confirmed",
    createdAt: "2026-11-10T14:22:00Z"
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
    createdAt: "2026-10-10T09:40:00Z"
  }
];

export const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM",
  "08:30 PM", "09:00 PM", "09:30 PM"
];

export const GUEST_OPTIONS = [
  "2 People",
  "4 People",
  "6 People"
];
