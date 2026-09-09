'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import i18n from '@/i18n';
import {
  Farm,
  CropScenario,
  Product,
  CartItem,
  Order,
  ProduceListing,
  CurrencyCode,
  UserRole,
} from '@/types/nabta';
import {
  INITIAL_FARMS,
  INITIAL_SCENARIOS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_PRODUCE_LISTINGS,
} from '@/lib/mockData';

interface NabtaContextType {
  // Farms
  farms: Farm[];
  activeFarmId: string;
  activeFarm: Farm;
  setActiveFarmId: (id: string) => void;
  addFarm: (farm: Partial<Farm>) => Farm;

  // Scenarios
  scenarios: CropScenario[];
  activeScenarioId: string;
  activeScenario: CropScenario;
  selectScenario: (scenarioId: string) => void;

  // Products & Marketplace
  products: Product[];
  addProduct: (product: Partial<Product>) => Product;
  updateProductModeration: (productId: string, status: 'APPROVED' | 'REJECTED') => void;
  deleteProduct: (productId: string) => void;

  // Produce Listings (Farmer selling produce)
  produceListings: ProduceListing[];
  addProduceListing: (listing: Partial<ProduceListing>) => ProduceListing;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalUSD: number;
  cartShippingUSD: number;
  cartTotalUSD: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    deliveryAddress: Order['deliveryAddress'];
    paymentMethod: string;
  }) => Order;

  // Preferences & User Role
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  role: UserRole;
  setRole: (r: UserRole) => void;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  dir: 'ltr' | 'rtl';
}

const NabtaContext = createContext<NabtaContextType | undefined>(undefined);

export function NabtaProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with localStorage fallbacks
  const [farms, setFarms] = useState<Farm[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nabta_farms');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_FARMS;
  });

  const [activeFarmId, setActiveFarmId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nabta_active_farm_id');
      if (saved) return saved;
    }
    return INITIAL_FARMS[0]?.id || 'farm-1';
  });

  const [scenarios, setScenarios] = useState<CropScenario[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nabta_scenarios');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_SCENARIOS;
  });

  const [activeScenarioId, setActiveScenarioId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nabta_active_scenario_id');
      if (saved) return saved;
    }
    return 'scenario-1';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nabta_products');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [produceListings, setProduceListings] = useState<ProduceListing[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nabta_produce_listings');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_PRODUCE_LISTINGS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nabta_cart');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nabta_orders');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return INITIAL_ORDERS;
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [role, setRoleState] = useState<UserRole>('FARMER');
  const [language, setLanguageState] = useState<'en' | 'ar'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nabta_lang') || localStorage.getItem('i18nextLng');
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return i18n.language === 'ar' ? 'ar' : 'en';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = (lang: 'en' | 'ar') => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabta_lang', lang);
      localStorage.setItem('i18nextLng', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const validLang = lng === 'ar' ? 'ar' : 'en';
      setLanguageState(validLang);
      const newDir = validLang === 'ar' ? 'rtl' : 'ltr';
      if (typeof window !== 'undefined') {
        localStorage.setItem('nabta_lang', validLang);
        localStorage.setItem('i18nextLng', validLang);
        document.documentElement.lang = validLang;
        document.documentElement.dir = newDir;
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;
    }
  }, [language, dir]);

  // Persistence effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabta_farms', JSON.stringify(farms));
    }
  }, [farms]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabta_active_farm_id', activeFarmId);
    }
  }, [activeFarmId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabta_scenarios', JSON.stringify(scenarios));
    }
  }, [scenarios]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabta_active_scenario_id', activeScenarioId);
    }
  }, [activeScenarioId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabta_products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabta_produce_listings', JSON.stringify(produceListings));
    }
  }, [produceListings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabta_cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabta_orders', JSON.stringify(orders));
    }
  }, [orders]);

  // Derived active farm
  const activeFarm = useMemo(() => {
    return farms.find((f) => f.id === activeFarmId) || farms[0] || INITIAL_FARMS[0];
  }, [farms, activeFarmId]);

  // Derived active scenario
  const activeScenario = useMemo(() => {
    return scenarios.find((s) => s.id === activeScenarioId) || scenarios[0] || INITIAL_SCENARIOS[0];
  }, [scenarios, activeScenarioId]);

  // Action: Add Farm
  const addFarm = (farmData: Partial<Farm>): Farm => {
    const newFarm: Farm = {
      id: `farm-${Date.now()}`,
      name: farmData.name || 'New Agricultural Sector',
      location: farmData.location || 'Regional Zone',
      country: farmData.country || 'Egypt',
      coordinates: farmData.coordinates || { lat: 30.0, lng: 31.0 },
      areaHectares: farmData.areaHectares || 50,
      irrigationType: farmData.irrigationType || 'Automated Drip Fertigation',
      soil: farmData.soil || {
        ph: 6.8,
        ec: 1.3,
        texture: 'Sandy Loam',
        organicMatter: 2.1,
        nitrogenPpm: 40,
        phosphorusPpm: 25,
        potassiumPpm: 200,
        calciumPpm: 350,
        magnesiumPpm: 88,
        salinityRisk: 'Low',
      },
      climate: farmData.climate || {
        zone: 'Arid Subtropical Basin',
        growingDegreeDays: 2500,
        avgSummerTempC: 35,
        avgWinterTempC: 16,
        annualRainfallMm: 35,
        frostRiskDays: 0,
        currentTempC: 29.0,
        humidityPercent: 40,
        windSpeedKmh: 12,
        solarRadiationWm2: 850,
      },
      water: farmData.water || {
        source: 'Deep Aquifer Extraction',
        allocationM3Ha: 6500,
        qualityEc: 0.8,
        salinityTds: 490,
        reliabilityRating: 'High',
      },
      analysisStatus: 'ANALYZED',
      lastSatellitePass: 'Just Now (Sentinel-2 Real-Time)',
      ndviAverage: 0.74,
      healthIndex: 90,
    };

    setFarms((prev) => [newFarm, ...prev]);
    setActiveFarmId(newFarm.id);
    return newFarm;
  };

  // Action: Select Scenario
  const selectScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setScenarios((prev) =>
      prev.map((s) => ({
        ...s,
        status: s.id === scenarioId ? 'Selected' : s.status === 'Selected' ? 'Analyzed' : s.status,
      }))
    );
    // Bind to farm
    setFarms((prev) =>
      prev.map((f) =>
        f.id === activeFarmId ? { ...f, activeScenarioId: scenarioId } : f
      )
    );
  };

  // Action: Add Product (Supplier)
  const addProduct = (productData: Partial<Product>): Product => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: productData.name || 'Enterprise Agro Input',
      category: productData.category || 'fertilizers',
      subcategory: productData.subcategory || 'Specialty Input',
      manufacturer: productData.manufacturer || 'Global Agrochemicals Ltd.',
      supplierName: productData.supplierName || 'Verified Supplier',
      supplierId: productData.supplierId || 'supp-current',
      countryOfOrigin: productData.countryOfOrigin || 'Egypt',
      priceUSD: productData.priceUSD || 100,
      unit: productData.unit || 'Standard Unit',
      minOrderQuantity: productData.minOrderQuantity || 1,
      availability: productData.availability || 'In Stock',
      stockQuantity: productData.stockQuantity || 50,
      rating: 5.0,
      reviewCount: 1,
      images: productData.images && productData.images.length > 0
        ? productData.images
        : ['https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80'],
      description: productData.description || 'Verified agricultural input compliant with precision telemetry standards.',
      specifications: productData.specifications || { 'Quality Grade': 'Standard A' },
      certifications: productData.certifications || ['ISO 9001 Compliant'],
      suitableCrops: productData.suitableCrops || ['Tomato', 'Bell Pepper'],
      suitableSoilConditions: productData.suitableSoilConditions || ['General soil types'],
      shippingInformation: productData.shippingInformation || 'Global freight forwarder dispatch.',
      moderationStatus: 'PENDING',
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  // Action: Moderate Product
  const updateProductModeration = (productId: string, status: 'APPROVED' | 'REJECTED') => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, moderationStatus: status } : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Action: Add Produce Listing
  const addProduceListing = (listingData: Partial<ProduceListing>): ProduceListing => {
    const newListing: ProduceListing = {
      id: `listing-${Date.now()}`,
      farmerName: listingData.farmerName || 'Osama Farouk',
      farmName: listingData.farmName || activeFarm.name,
      productName: listingData.productName || 'Direct Farm Harvest',
      variety: listingData.variety || 'Commercial Hybrid',
      quantityTons: listingData.quantityTons || 10,
      location: listingData.location || activeFarm.location,
      pricePerTonUSD: listingData.pricePerTonUSD || 500,
      harvestDate: listingData.harvestDate || new Date().toISOString().split('T')[0],
      images: listingData.images && listingData.images.length > 0
        ? listingData.images
        : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'],
      description: listingData.description || 'Direct from certified grower.',
      certifications: listingData.certifications || ['GLOBALG.A.P.'],
      availability: listingData.availability || 'Immediate',
      status: 'Active',
    };

    setProduceListings((prev) => [newListing, ...prev]);

    // Also mirror into marketplace as farm produce
    const mirroredProduct: Product = {
      id: `prod-harvest-${newListing.id}`,
      name: `${newListing.productName} (${newListing.variety})`,
      category: 'farm-produce',
      subcategory: 'Direct Farmer Listing',
      manufacturer: newListing.farmName,
      supplierName: newListing.farmerName,
      supplierId: 'farmer-direct',
      countryOfOrigin: activeFarm.country,
      priceUSD: newListing.pricePerTonUSD,
      unit: 'Metric Ton',
      minOrderQuantity: 1,
      availability: 'In Stock',
      stockQuantity: newListing.quantityTons,
      rating: 5.0,
      reviewCount: 1,
      images: newListing.images,
      description: newListing.description,
      specifications: {
        'Harvest Date': newListing.harvestDate,
        'Available Batch': `${newListing.quantityTons} Tons`,
      },
      certifications: newListing.certifications,
      suitableCrops: ['Wholesale Distribution', 'Produce Terminal Markets'],
      suitableSoilConditions: ['N/A'],
      shippingInformation: 'Ex-Farm Gate or Port Dispatch.',
      moderationStatus: 'APPROVED',
      producerHarvestDate: newListing.harvestDate,
    };
    setProducts((prev) => [mirroredProduct, ...prev]);

    return newListing;
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotalUSD = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.priceUSD * item.quantity, 0);
  }, [cart]);

  const cartShippingUSD = useMemo(() => {
    return cart.length > 0 ? 120 + cart.length * 25 : 0;
  }, [cart]);

  const cartTotalUSD = useMemo(() => {
    return cartSubtotalUSD + cartShippingUSD;
  }, [cartSubtotalUSD, cartShippingUSD]);

  // Order creation
  const createOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    deliveryAddress: Order['deliveryAddress'];
    paymentMethod: string;
  }): Order => {
    const newOrder: Order = {
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      deliveryAddress: orderData.deliveryAddress,
      items: [...cart],
      subtotalUSD: cartSubtotalUSD,
      shippingUSD: cartShippingUSD,
      totalUSD: cartTotalUSD,
      paymentMethod: orderData.paymentMethod,
      status: 'Processing',
      estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      trackingNumber: `NABTA-EXP-${Math.floor(1000000 + Math.random() * 9000000)}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const setCurrency = (c: CurrencyCode) => setCurrencyState(c);
  const setRole = (r: UserRole) => setRoleState(r);

  return (
    <NabtaContext.Provider
      value={{
        farms,
        activeFarmId,
        activeFarm,
        setActiveFarmId,
        addFarm,
        scenarios,
        activeScenarioId,
        activeScenario,
        selectScenario,
        products,
        addProduct,
        updateProductModeration,
        deleteProduct,
        produceListings,
        addProduceListing,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotalUSD,
        cartShippingUSD,
        cartTotalUSD,
        orders,
        createOrder,
        currency,
        setCurrency,
        role,
        setRole,
        language,
        setLanguage,
        dir,
      }}
    >
      {children}
    </NabtaContext.Provider>
  );
}

export function useNabta() {
  const context = useContext(NabtaContext);
  if (!context) {
    throw new Error('useNabta must be used within a NabtaProvider');
  }
  return context;
}
