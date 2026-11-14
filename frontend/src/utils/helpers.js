// Utility helper functions

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount || 0);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const generateBookingId = () => {
  return 'BK-' + Math.floor(10000 + Math.random() * 90000);
};

// Generates exactly six-digit Table Session ID (e.g., 000001, 000002...)
export const generateSessionId = (currentCount = 0) => {
  const nextNum = currentCount + 1;
  return String(nextNum).padStart(6, '0');
};

// Generates QR Code data URL using lightweight standard QR API or inline SVG representation
export const getQrCodeUrl = (code) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=6F4E37&bgcolor=FAF6F0&data=${encodeURIComponent(code)}`;
};

export const getStoredItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Error reading localStorage", e);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error writing localStorage", e);
  }
};
