'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, ComponentItem } from '@/types';
import { generateOrderId } from '@/lib/utils';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  compareList: Product[];
  orders: Order[];
  user: UserProfile;
  toasts: Toast[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedConfig?: CartItem['selectedConfig']
  ) => void;
  addCustomBuildToCart: (components: ComponentItem[], totalPrice: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>) => Order;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  cartCount: number;
  cartTotal: number;
  cartOriginalTotal: number;
}

const defaultUser: UserProfile = {
  name: 'Vivek Gupta',
  email: 'vivek.gupta@example.com',
  phone: '+91 98765 43210',
  savedAddresses: [
    {
      id: 'addr-1',
      tag: 'Home',
      street: '123 Gaming Street, Cyber City, Phase 2',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560100',
      isDefault: true,
    },
    {
      id: 'addr-2',
      tag: 'Office',
      street: 'Tower B, Tech Innovation Hub, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      isDefault: false,
    },
  ],
};

const initialOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'GF-98214371',
    date: '2026-11-10',
    status: 'Delivered',
    items: [
      {
        name: 'Vortex RGB Mechanical Gaming Keyboard',
        image: '/images/accessories/keyboard-rgb.jpg',
        price: 4999,
        quantity: 1,
      },
      {
        name: 'Phantom Ultra Wireless Gaming Mouse',
        image: '/images/accessories/mouse-wireless.jpg',
        price: 3499,
        quantity: 1,
      },
    ],
    shippingAddress: {
      fullName: 'Vivek Gupta',
      email: 'vivek.gupta@example.com',
      phone: '+91 98765 43210',
      street: '123 Gaming Street, Cyber City, Phase 2',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560100',
    },
    deliveryOption: 'express',
    paymentMethod: 'upi',
    subtotal: 8498,
    discount: 500,
    shipping: 0,
    total: 7998,
    estimatedDelivery: '2026-11-12',
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [user] = useState<UserProfile>(defaultUser);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Initialize from LocalStorage (post-mount: localStorage is unavailable during SSR)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gf_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('gf_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCompare = localStorage.getItem('gf_compare');
      if (savedCompare) setCompareList(JSON.parse(savedCompare));

      const savedOrders = localStorage.getItem('gf_orders');
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (parsed.length > 0) setOrders(parsed);
      }
    } catch {
      // ignore JSON errors
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Save to LocalStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('gf_cart', JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('gf_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('gf_compare', JSON.stringify(compareList));
    } catch {}
  }, [compareList, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('gf_orders', JSON.stringify(orders));
    } catch {}
  }, [orders, hydrated]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedConfig?: CartItem['selectedConfig']
  ) => {
    let finalUnitPrice = product.price;
    let configKey = '';

    if (selectedConfig) {
      if (selectedConfig.ramPriceDelta) finalUnitPrice += selectedConfig.ramPriceDelta;
      if (selectedConfig.storagePriceDelta) finalUnitPrice += selectedConfig.storagePriceDelta;
      if (selectedConfig.coolingPriceDelta) finalUnitPrice += selectedConfig.coolingPriceDelta;
      if (selectedConfig.gpuPriceDelta) finalUnitPrice += selectedConfig.gpuPriceDelta;

      configKey = `${selectedConfig.ram || ''}-${selectedConfig.storage || ''}-${selectedConfig.cooling || ''}-${selectedConfig.gpu || ''}`;
    }

    const cartItemId = `${product.id}_${configKey}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          basePrice: product.price,
          finalPrice: finalUnitPrice,
          quantity,
          selectedConfig,
        },
      ];
    });

    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const addCustomBuildToCart = (components: ComponentItem[], totalPrice: number) => {
    const cartItemId = `custom-pc-${Date.now()}`;
    const cpu = components.find((c) => c.category === 'processor')?.name || 'Custom CPU';
    const gpu = components.find((c) => c.category === 'gpu')?.name || 'Custom GPU';

    const newItem: CartItem = {
      cartItemId,
      productId: 'custom-pc-build',
      name: `Custom PC Build (${cpu.split(' ')[0]} + ${gpu.split(' ')[0]})`,
      image: '/images/banners/pc-builder.jpg',
      basePrice: totalPrice,
      finalPrice: totalPrice,
      quantity: 1,
      isCustomBuild: true,
      customComponents: components.map((c) => ({
        category: c.category.toUpperCase(),
        name: c.name,
        price: c.price,
      })),
    };

    setCart((prev) => [...prev, newItem]);
    showToast('Custom PC Configuration added to cart!', 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Added ${product.name} to wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const addToCompare = (product: Product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        showToast(`${product.name} is already in comparison`, 'info');
        return prev;
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 items can be compared at once', 'warning');
        return prev;
      }
      showToast(`Added ${product.name} to comparison!`, 'success');
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
    showToast('Removed from comparison', 'info');
  };

  const isInCompare = (productId: string) => {
    return compareList.some((p) => p.id === productId);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderId(),
      date: new Date().toISOString().split('T')[0],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  const cartOriginalTotal = cart.reduce((acc, item) => acc + (item.basePrice * 1.15) * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        orders,
        user,
        toasts,
        addToCart,
        addCustomBuildToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        isInCompare,
        placeOrder,
        showToast,
        cartCount,
        cartTotal,
        cartOriginalTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
