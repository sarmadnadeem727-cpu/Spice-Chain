import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Award, ArrowUpRight, AlertCircle, X, MessageSquare, 
  Send, Lock, ChevronDown, Radar as RadarIcon, Info, ShieldCheck, Ship,
  Zap, DollarSign, Calendar, TrendingUp, BarChart2
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, AreaChart, Area, Tooltip as RechartsTooltip, XAxis, YAxis
} from 'recharts';
import { SpiceListing, Milestone, Bid } from '../types';
import { useMarket } from '../context/MarketContext';
import { useAuth } from '../context/AuthContext';
import { analyzeTradePrice } from '../services/gemini';

const MOCK_LISTINGS: SpiceListing[] = [
  { 
    id: 'l1', 
    name: 'Tellicherry Black Pepper', 
    category: 'Seed', 
    origin: 'Kerala, India', 
    daysSinceHarvest: 12, 
    trustScore: { 
      rating: 98, 
      verifications: ['Organic', 'Export-Ready'],
      metrics: [
        { subject: 'Quality', A: 98, fullMark: 100 },
        { subject: 'Punctuality', A: 95, fullMark: 100 },
        { subject: 'Sustain', A: 90, fullMark: 100 },
        { subject: 'Verify', A: 100, fullMark: 100 },
        { subject: 'Reliability', A: 99, fullMark: 100 },
      ]
    }, 
    quantity: 500, 
    pricePerUnit: 6450, 
    thumbnail: 'https://images.unsplash.com/photo-1599481238332-b06297397af9?auto=format&fit=crop&q=80&w=1200', 
    description: 'Sun-dried high piperine content black pepper from the hills of Wayanad.' 
  },
  { 
    id: 'l2', 
    name: 'Kashmiri Mogra Saffron', 
    category: 'Flower', 
    origin: 'Pampore, India', 
    daysSinceHarvest: 5, 
    trustScore: { 
      rating: 99, 
      verifications: ['ISO 3632', 'GI Tag'],
      metrics: [
        { subject: 'Quality', A: 100, fullMark: 100 },
        { subject: 'Punctuality', A: 90, fullMark: 100 },
        { subject: 'Sustain', A: 85, fullMark: 100 },
        { subject: 'Verify', A: 100, fullMark: 100 },
        { subject: 'Reliability', A: 100, fullMark: 100 },
      ]
    }, 
    quantity: 10, 
    pricePerUnit: 2750, 
    thumbnail: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=1200', 
    description: 'Triple-A grade filaments with deep crimson color and intense aroma.' 
  },
  { 
    id: 'l3', 
    name: 'Salem Turmeric', 
    category: 'Root', 
    origin: 'Tamil Nadu, India', 
    daysSinceHarvest: 18, 
    trustScore: { 
      rating: 94, 
      verifications: ['Non-GMO'],
      metrics: [
        { subject: 'Quality', A: 88, fullMark: 100 },
        { subject: 'Punctuality', A: 92, fullMark: 100 },
        { subject: 'Sustain', A: 78, fullMark: 100 },
        { subject: 'Verify', A: 95, fullMark: 100 },
        { subject: 'Reliability', A: 98, fullMark: 100 },
      ]
    }, 
    quantity: 1200, 
    pricePerUnit: 1250, 
    thumbnail: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&q=80&w=1200', 
    description: 'High curcumin content roots, machine dried for uniform quality.' 
  },
  { 
    id: 'l4', 
    name: 'Green Cardamom', 
    category: 'Seed', 
    origin: 'Idukki, India', 
    daysSinceHarvest: 8, 
    trustScore: { 
      rating: 96, 
      verifications: ['7mm+ Grade'],
      metrics: [
        { subject: 'Quality', A: 95, fullMark: 100 },
        { subject: 'Punctuality', A: 88, fullMark: 100 },
        { subject: 'Sustain', A: 92, fullMark: 100 },
        { subject: 'Verify', A: 100, fullMark: 100 },
        { subject: 'Reliability', A: 94, fullMark: 100 },
      ]
    }, 
    quantity: 300, 
    pricePerUnit: 18400, 
    thumbnail: 'https://images.unsplash.com/photo-1626122650392-563b7f886f4a?auto=format&fit=crop&q=80&w=1200', 
    description: 'Bold green pods with intense fragrance and high essential oil content.' 
  }
];

const Marketplace: React.FC = () => {
  const { user } = useAuth();
  const { getMarketPrice, addBid, history } = useMarket();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedListing, setSelectedListing] = useState<SpiceListing | null>(null);
  const [isPreflight, setIsPreflight] = useState(false);
  
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [qty, setQty] = useState(100);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const categories = ['All', 'Seed', 'Flower', 'Root', 'Bark'];

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter(l => 
      (activeCategory === 'All' || l.category === activeCategory) &&
      (l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.origin.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, activeCategory]);

  const selectedHistory = useMemo(() => {
    if (!selectedListing) return [];
    // Map listing name to correct history key
    const key = Object.keys(history).find(k => selectedListing.name.toLowerCase().includes(k.toLowerCase())) || 'Black Pepper';
    return history[key] || [];
  }, [selectedListing, history]);

  const totalBaseValue = bidAmount * qty;
  const freight = totalBaseValue * 0.08;
  const insurance = totalBaseValue * 0.02;
  const importDuty = totalBaseValue * 0.02;
  const totalContractValue = totalBaseValue + freight + insurance + importDuty;

  const milestones: Milestone[] = [
    { description: 'Contract Signing & 20% Escrow', percentage: 20, amount: totalContractValue * 0.2, isCompleted: false },
    { description: 'Phytosanitary Certification & 40% Escrow', percentage: 40, amount: totalContractValue * 0.4, isCompleted: false },
    { description: 'Port Delivery & Final 40% Release', percentage: 40, amount: totalContractValue * 0.4, isCompleted: false }
  ];

  const handleOpenListing = (listing: SpiceListing) => {
    setSelectedListing(listing);
    setBidAmount(listing.pricePerUnit);
    setQty(Math.min(listing.quantity, 100));
    setAiAnalysis(null);
    setIsPreflight(false);
  };

  const runAnalysis = async () => {
    if (!selectedListing) return;
    setIsAnalyzing(true);
    const mkt = getMarketPrice(selectedListing.name);
    const result = await analyzeTradePrice(selectedListing.name, mkt, bidAmount);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleLockTrade = () => {
    if (!selectedListing || !user) return;
    const newBid: Bid = {
      id: Math.random().toString(36).substr(2, 9),
      listingId: selectedListing.id,
      bidderId: user.id,
      amount: bidAmount,
      status: 'Pending',
      milestones: milestones.map(m => ({ ...m, isCompleted: false })),
      messages: []
    };
    addBid(newBid);
    setSelectedListing(null);
    setIsPreflight(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Trade War Room</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Live Global Exchange Terminal</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Origin, Batch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl w-full sm:w-64 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none font-medium"
            />
          </div>
          <div className="flex gap-2 bg-white p-1 border border-slate-100 rounded-2xl shadow-sm">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-xs font-black uppercase tracking-tight rounded-xl transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredListings.map((listing) => (
          <motion.div
            key={listing.id}
            whileHover={{ y: -6 }}
            onClick={() => handleOpenListing(listing)}
            className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all cursor-pointer flex flex-col"
          >
            <div className="relative h-64 overflow-hidden">
              <img src={listing.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={listing.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute top-5 right-5">
                <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] font-black text-emerald-600 shadow-xl">
                  <Award size={12} /> {listing.trustScore.rating}% Reliability
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">{listing.category}</p>
                <h3 className="text-xl font-black tracking-tight leading-none">{listing.name}</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-end border-b border-slate-50 pb-4">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Index Price</p>
                  <p className="text-2xl font-black text-slate-900">${listing.pricePerUnit.toLocaleString()}<span className="text-xs font-medium text-slate-400">/MT</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Lot Size</p>
                  <p className="text-xs font-bold text-slate-600">{listing.quantity} MT</p>
                </div>
              </div>
              <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Negotiate Trade</button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedListing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh]"
            >
              <div className="flex-1 p-12 overflow-y-auto border-r border-slate-100 space-y-10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-5">
                    <img src={selectedListing.thumbnail} className="w-20 h-20 rounded-2xl object-cover shadow-xl" alt={selectedListing.name} />
                    <div>
                      <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{selectedListing.name}</h2>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Origin Hub: {selectedListing.origin}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedListing(null)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all"><X size={24}/></button>
                </div>

                {!isPreflight ? (
                  <div className="space-y-10">
                    <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                           <BarChart2 className="text-emerald-500" size={18} />
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Institutional Price Index</h4>
                        </div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                          <TrendingUp size={12} /> 30-Day Outlook
                        </span>
                      </div>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedHistory}>
                            <defs>
                              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis hide dataKey="time" />
                            <YAxis hide domain={['auto', 'auto']} />
                            <RechartsTooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                            />
                            <Area type="monotone" dataKey="close" stroke="#10b981" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                      <div className="flex items-center gap-10">
                        <div className="flex-1 space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Proposed Bid ($/MT)</p>
                          <input 
                            type="number" 
                            value={bidAmount} 
                            onChange={(e) => setBidAmount(Number(e.target.value))}
                            className="w-full bg-transparent text-5xl font-black text-slate-900 outline-none border-b-4 border-slate-100 focus:border-emerald-500 pb-2 transition-all"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quantity (MT)</p>
                          <input 
                            type="number" 
                            value={qty} 
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="w-full bg-transparent text-5xl font-black text-slate-900 outline-none border-b-4 border-slate-100 focus:border-emerald-500 pb-2 transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                         <button 
                          onClick={runAnalysis}
                          disabled={isAnalyzing}
                          className="flex items-center gap-2 text-xs font-black uppercase text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                         >
                           <Zap size={16} className={isAnalyzing ? 'animate-pulse' : ''} /> {isAnalyzing ? 'Analyzing Terminal Data...' : 'AI Trade Guardrail'}
                         </button>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Benchmark: ${getMarketPrice(selectedListing.name).toFixed(2)}</p>
                      </div>

                      {aiAnalysis && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-3xl border ${aiAnalysis.isAnomaly ? 'bg-amber-50 border-amber-100 text-amber-900' : 'bg-emerald-50 border-emerald-100 text-emerald-900'}`}>
                          <div className="flex items-start gap-4">
                            <AlertCircle size={20} className="mt-0.5" />
                            <div>
                              <p className="text-sm font-black mb-1">{aiAnalysis.message}</p>
                              <p className="text-xs font-medium opacity-80 leading-relaxed">{aiAnalysis.justification}</p>
                              {aiAnalysis.isAnomaly && (
                                <button 
                                  onClick={() => setBidAmount(aiAnalysis.suggestedCounter)}
                                  className="mt-4 px-5 py-2.5 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/10"
                                >
                                  Accept Counter-Offer: ${aiAnalysis.suggestedCounter.toFixed(2)}
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <button 
                      onClick={() => setIsPreflight(true)}
                      className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-2xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
                    >
                      Pre-Flight Contract Review <ArrowUpRight size={24}/>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <button onClick={() => setIsPreflight(false)} className="text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors group"><ChevronDown className="rotate-90 group-hover:-translate-x-1 transition-transform" size={16}/> Back to War Room</button>
                    
                    <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 space-y-8">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Contract Financials</h3>
                      <div className="space-y-5">
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-slate-500 uppercase tracking-widest text-[10px]">Asset Base Value</span>
                          <span className="text-slate-900">${totalBaseValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-slate-500 uppercase tracking-widest text-[10px]">Shipping & Handling (8%)</span>
                          <span className="text-slate-900">${freight.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold border-b border-slate-200 pb-5">
                          <span className="text-slate-500 uppercase tracking-widest text-[10px]">Regulatory Insurance (2%)</span>
                          <span className="text-slate-900">${insurance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-3xl font-black pt-2">
                          <span className="text-slate-900 uppercase tracking-widest text-[10px] mt-2">Total L/C Value</span>
                          <span className="text-emerald-600">${totalContractValue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <h4 className="text-lg font-black text-slate-900 flex items-center gap-3 tracking-tight"><Lock size={20} className="text-slate-400"/> Escrow Settlement Timeline</h4>
                      <div className="relative pl-10 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                        {milestones.map((m, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -left-[35px] w-8 h-8 bg-white border-2 border-slate-900 rounded-xl z-10 flex items-center justify-center font-black text-[10px] shadow-sm">{i+1}</div>
                            <div className="flex justify-between items-center bg-white border border-slate-100 p-8 rounded-[1.5rem] shadow-sm hover:border-emerald-200 transition-colors">
                              <div><p className="font-black text-slate-900 text-sm">{m.description}</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{m.percentage}% Tranche Release</p></div>
                              <p className="text-2xl font-black text-slate-900">${m.amount.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={handleLockTrade}
                      className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-lg shadow-2xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all"
                    >
                      <ShieldCheck size={24}/> Authorize Contract & Lock Escrow
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full md:w-[450px] bg-slate-50 p-12 flex flex-col space-y-12 h-full overflow-y-auto">
                <div>
                  <h4 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight"><RadarIcon size={20} className="text-emerald-600"/> Merchant Trust Scoring</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedListing.trustScore.metrics}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                        <Radar name="Merchant" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h4 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight"><MessageSquare size={20} className="text-blue-600"/> Trade Negotiation</h4>
                  <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col shadow-sm">
                    <div className="flex-1 space-y-5 overflow-y-auto max-h-[300px] pr-2">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0 shadow-inner"><RadarIcon size={16}/></div>
                        <div className="bg-slate-50 p-5 rounded-2xl rounded-tl-none text-xs font-bold text-slate-600 leading-relaxed border border-slate-100">System: Corporate Terminal Identity Verified. Port ID verification requested for batch SC-T721.</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-50 flex gap-4">
                      <input placeholder="Propose custom milestone..." className="flex-1 bg-slate-50 border-none rounded-xl px-5 py-3 text-xs font-medium focus:ring-2 focus:ring-blue-500/10 outline-none" />
                      <button className="p-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-lg"><Send size={18}/></button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;