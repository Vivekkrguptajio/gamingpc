export interface SpecOption {
  label: string;
  priceDelta: number;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'gaming-pcs' | 'components' | 'accessories';
  subCategory?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  soldCount?: string;
  badge?: string; // 'Best Seller' | 'Premium' | 'High Performance' | 'Ultimate' | 'Hot Deal' | 'New'
  inStock: boolean;
  stockCount?: number;
  image: string;
  gallery: string[];
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    motherboard?: string;
    cooling?: string;
    psu?: string;
    case?: string;
  };
  configOptions?: {
    ram?: SpecOption[];
    storage?: SpecOption[];
    cooling?: SpecOption[];
    gpu?: SpecOption[];
  };
  description: string;
  features: string[];
  technicalSpecs: Record<string, string>;
  faqs: { question: string; answer: string }[];
}

export interface ComponentItem {
  id: string;
  name: string;
  category: 'processor' | 'gpu' | 'motherboard' | 'ram' | 'storage' | 'psu' | 'cooler' | 'case' | 'fans';
  brand: string;
  price: number;
  originalPrice?: number;
  specs: string;
  image: string;
  wattage: number; // For power consumption estimation
  socket?: string; // 'LGA1700' | 'AM5'
  memoryType?: string; // 'DDR5' | 'DDR4'
  formFactor?: string; // 'ATX' | 'Micro-ATX'
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  image: string;
  basePrice: number;
  finalPrice: number;
  quantity: number;
  selectedConfig?: {
    ram?: string;
    ramPriceDelta?: number;
    storage?: string;
    storagePriceDelta?: number;
    cooling?: string;
    coolingPriceDelta?: number;
    gpu?: string;
    gpuPriceDelta?: number;
  };
  isCustomBuild?: boolean;
  customComponents?: {
    category: string;
    name: string;
    price: number;
  }[];
}

export interface OrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
  configSummary?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Confirmed' | 'Processing' | 'Out for Delivery' | 'Delivered';
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliveryOption: 'standard' | 'express';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  estimatedDelivery: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  savedAddresses: {
    id: string;
    tag: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }[];
}
