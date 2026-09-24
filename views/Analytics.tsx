import React from 'react';
import { motion } from 'framer-motion';
import { 
  ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, 
  Activity, Globe, Scale, BarChart3, Info
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';

const StatCard = ({ label, value, change, up, icon: Icon }: any) => (
  <div className="bg-white border border-slate-100 p-8 rounded-[2rem] hover:shadow-2xl transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-slate-50 text-slate-600 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</div>
    <div className="text-3xl font-black text-slate-900 tracking-tighter">{value}</div>
  </div>
);

const Analytics: React.FC = () => {
  const { history } = useMarket();
  const pepperHistory = history['Black Pepper'] || [];

  // Simulate volume data for the hybrid chart
  const hybridData = pepperHistory.map(d => ({
    ...d,
    volume: 500 + Math.random() * 1000,
    sentiment: d.close >= d.open ? 'Bullish' : 'Bearish'
  }));

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Market Intelligence</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Institutional Terminal • Real-Time Trade Ledger</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-900 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Info size={16} className="text-slate-400" /> API Documentation
          </button>
          <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-colors">Export Ledger</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Total Vol (24h)" value="$2.4B" change="+12.5%" up={true} icon={DollarSign} />
        <StatCard label="Global Cap" value="$14.2B" change="+4.2%" up={true} icon={TrendingUp} />
        <StatCard label="Index Volatility" value="1.4%" change="-2.1%" up={false} icon={Activity} />
        <StatCard label="Liquidity Depth" value="High" change="+0.5%" up={true} icon={Scale} />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Tellicherry Pepper Volatility</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Institutional Area & Volume Index (30D)</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-lg">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-[10px] font-black uppercase text-emerald-600">Price Trend</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg">
                <span className="w-2 h-2 bg-slate-300 rounded-full" />
                <span className="text-[10px] font-black uppercase text-slate-400">Trade Volume</span>
              </div>
            </div>
          </div>
          
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={hybridData}>
                <defs>
                  <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
                  dy={10} 
                  interval={4}
                />
                <YAxis 
                  yAxisId="left"
                  domain={['auto', 'auto']} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
                  dx={-10} 
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 'auto']} 
                  hide
                />
                <Tooltip 
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-5 rounded-[1.5rem] shadow-2xl border border-slate-800 min-w-[200px]">
                          <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{data.time}</p>
                             <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${data.sentiment === 'Bullish' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                               {data.sentiment}
                             </span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between gap-8 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                              <span>Close Price</span>
                              <span className="text-white">${data.close.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between gap-8 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                              <span>Volume Depth</span>
                              <span className="text-white">{data.volume.toFixed(0)} MT</span>
                            </div>
                            <div className="flex justify-between gap-8 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                              <span>Range (H/L)</span>
                              <span className="text-white">${data.high.toFixed(0)} / ${data.low.toFixed(0)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  yAxisId="right"
                  dataKey="volume" 
                  fill="#f1f5f9" 
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="close" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorClose)" 
                  animationDuration={1500}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
          <h3 className="text-xl font-bold mb-10 flex items-center gap-3 tracking-tighter"><Globe className="text-slate-500"/> Regional Liquidity</h3>
          <div className="space-y-8 flex-1 relative z-10">
            {[
              { label: 'Kerala Hub (IN)', val: '45%', color: 'bg-emerald-500', trend: '+2.4%' },
              { label: 'Dak Lak Node (VN)', val: '24%', color: 'bg-emerald-600', trend: '-1.1%' },
              { label: 'Espírito Santo (BR)', val: '18%', color: 'bg-emerald-700', trend: '+0.8%' },
              { label: 'Lampung Terminal (ID)', val: '13%', color: 'bg-slate-500', trend: '+5.2%' },
            ].map(origin => (
              <div key={origin.label} className="space-y-3">
                <div className="flex justify-between text-[10px] font-black tracking-[0.2em] uppercase">
                  <span className="text-slate-400">{origin.label}</span>
                  <div className="flex gap-3">
                    <span className={origin.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}>{origin.trend}</span>
                    <span className="text-white">{origin.val}</span>
                  </div>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: origin.val }} 
                    transition={{ duration: 1.5, ease: "circOut" }} 
                    className={`h-full rounded-full ${origin.color} shadow-[0_0_15px_rgba(16,185,129,0.2)]`} 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800">
             <div className="flex items-center gap-4 p-5 bg-white/5 rounded-[2rem] border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer">
               <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-xl group-hover:scale-110 transition-transform">
                <BarChart3 size={24} />
               </div>
               <div>
                 <p className="text-[10px] text-white font-black uppercase tracking-widest">Protocol Intelligence</p>
                 <p className="text-[9px] text-slate-400 leading-tight font-medium mt-1">Cross-ledger verification active for all regional nodes.</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;