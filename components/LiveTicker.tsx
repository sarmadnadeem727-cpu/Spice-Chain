import React from 'react';
import { motion } from 'framer-motion';
import { useMarket } from '../context/MarketContext';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const LiveTicker: React.FC = () => {
  const { market } = useMarket();

  return (
    <div className="bg-slate-900 text-white overflow-hidden py-2 text-[10px] font-bold whitespace-nowrap border-b border-slate-800">
      <motion.div 
        className="inline-block"
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        <div className="flex gap-16 px-4 uppercase tracking-widest">
          {Array(6).fill(market.prices).flat().map((price, idx) => (
            <div key={`${price.id}-${idx}`} className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">{price.name}</span>
                <span className="text-white">${price.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              
              <div className={`flex items-center ${price.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {price.change >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                {Math.abs(price.change).toFixed(2)}%
              </div>

              <div className="flex items-center gap-3 text-slate-500 border-l border-slate-800 pl-4">
                <span>VOL: {price.volume24h}</span>
                <span>CAP: {price.marketCap}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LiveTicker;