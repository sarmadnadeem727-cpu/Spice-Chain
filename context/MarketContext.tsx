import React, { createContext, useContext, useState, useEffect } from 'react';
import { MarketState, SpicePrice, Bid, CandlestickData } from '../types';

interface MarketContextType {
  market: MarketState;
  getMarketPrice: (name: string) => number;
  activeBids: Bid[];
  addBid: (bid: Bid) => void;
  updateBid: (bid: Bid) => void;
  history: Record<string, CandlestickData[]>;
}

const initialPrices: SpicePrice[] = [
  { id: '1', name: 'Black Pepper', price: 6500, change: +2.4, unit: 'MT', category: 'Seed', volume24h: '$2.4B', marketCap: '$14.2B' },
  { id: '2', name: 'Saffron', price: 2800, change: -0.8, unit: 'KG', category: 'Flower', volume24h: '$420M', marketCap: '$8.1B' },
  { id: '3', name: 'Turmeric', price: 1200, change: +1.2, unit: 'MT', category: 'Root', volume24h: '$1.1B', marketCap: '$6.5B' },
  { id: '4', name: 'Cardamom', price: 18500, change: +5.1, unit: 'MT', category: 'Seed', volume24h: '$890M', marketCap: '$12.4B' },
];

const MarketContext = createContext<MarketContextType | undefined>(undefined);

const generateHistory = (basePrice: number): CandlestickData[] => {
  const data: CandlestickData[] = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const open = basePrice + (Math.random() - 0.5) * (basePrice * 0.1);
    const close = open + (Math.random() - 0.5) * (basePrice * 0.05);
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.02);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.02);
    data.push({
      time: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      open,
      close,
      high,
      low
    });
  }
  return data;
};

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [market, setMarket] = useState<MarketState>(() => {
    const saved = localStorage.getItem('spicechain_market');
    return saved ? JSON.parse(saved) : {
      prices: initialPrices,
      lastUpdated: new Date().toISOString(),
    };
  });

  const [history] = useState<Record<string, CandlestickData[]>>(() => {
    const saved = localStorage.getItem('spicechain_history');
    if (saved) return JSON.parse(saved);
    const newHistory = initialPrices.reduce((acc, p) => ({
      ...acc,
      [p.name]: generateHistory(p.price)
    }), {});
    localStorage.setItem('spicechain_history', JSON.stringify(newHistory));
    return newHistory;
  });

  const [activeBids, setActiveBids] = useState<Bid[]>(() => {
    const saved = localStorage.getItem('spicechain_bids');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('spicechain_market', JSON.stringify(market));
  }, [market]);

  useEffect(() => {
    localStorage.setItem('spicechain_bids', JSON.stringify(activeBids));
  }, [activeBids]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarket(prev => ({
        ...prev,
        prices: prev.prices.map(p => {
          const changeVal = (Math.random() - 0.5) * (p.price * 0.005);
          return {
            ...p,
            price: Math.max(0, p.price + changeVal),
            change: (changeVal / p.price) * 100,
          };
        }),
        lastUpdated: new Date().toISOString(),
      }));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getMarketPrice = (name: string) => {
    return market.prices.find(p => name.toLowerCase().includes(p.name.toLowerCase()))?.price || 5000;
  };

  const addBid = (bid: Bid) => setActiveBids(prev => [...prev, bid]);
  const updateBid = (updatedBid: Bid) => setActiveBids(prev => prev.map(b => b.id === updatedBid.id ? updatedBid : b));

  return (
    <MarketContext.Provider value={{ market, getMarketPrice, activeBids, addBid, updateBid, history }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error("useMarket must be used within a MarketProvider");
  return context;
};
