import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Package, 
  Ship, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  Zap,
  Globe,
  Plus
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMarket } from '../context/MarketContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const KPIBox = ({ label, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:y-[-4px] transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black text-cyan-500 bg-cyan-50 px-2 py-1 rounded-lg">
        <ArrowUpRight size={12} /> +4.2%
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</h3>
      <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
      <p className="text-[10px] font-bold text-slate-400 truncate">{sub}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { history, market } = useMarket();
  const navigate = useNavigate();

  const pepperData = history['Black Pepper'] || [];

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Global Command Center</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            Live Terminal Session • {user?.region} Node
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/dashboard/marketplace')}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-3"
          >
            <Plus size={18} /> New Trade Order
          </button>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPIBox label="Total Exposure" value="$1.2M" sub="Across 14 active contracts" icon={Activity} color="bg-blue-600" />
        <KPIBox label="Logistics Health" value="94%" sub="3 Vessels on schedule" icon={Ship} color="bg-cyan-600" />
        <KPIBox label="Escrow Locked" value="$420K" sub="Pending milestone release" icon={ShieldCheck} color="bg-amber-600" />
        <KPIBox label="Market Index" value="+12.4%" sub="Global spice volatility" icon={Zap} color="bg-purple-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Market Trend Sparkline */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm overflow-hidden relative">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Market Pulse</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Tellicherry Index (USD/MT)</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-cyan-600">$6,450.00</p>
              <p className="text-[10px] font-black text-slate-400 uppercase">Current Benchmark</p>
            </div>
          </div>
          
          <div className="h-64 -mx-10 -mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pepperData}>
                <defs>
                  <linearGradient id="dashGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#dashGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Logistics Feed */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px]" />
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3 tracking-tighter"><Ship className="text-cyan-400"/> Fleet Deployment</h3>
          
          <div className="space-y-8 flex-1">
            {[
              { vessel: 'Spice Admiral', origin: 'Cochin', progress: 42, eta: '4 Days' },
              { vessel: 'Dak Lak Star', origin: 'Vietnam', progress: 88, eta: '1 Day' },
              { vessel: 'Saffron Wing', origin: 'Kashmir', progress: 15, eta: '12 Days' }
            ].map((v, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">{v.vessel}</span>
                  <span className="text-white">ETA: {v.eta}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${v.progress}%` }} 
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                  />
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/dashboard/logistics')}
            className="w-full py-4 mt-8 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
          >
            View Fleet Ledger
          </button>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
           <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <Activity className="text-blue-500"/> Real-Time Network Activity
           </h3>
           <div className="space-y-4">
             {[
               { user: 'S. Patel', action: 'Locked Escrow', asset: 'Black Pepper', amount: '$42,500', time: '2m ago' },
               { user: 'Vietnam Hub', action: 'Released Batch', asset: 'White Pepper', amount: '$12,200', time: '14m ago' },
               { user: 'Enterprise_X', action: 'Proposals Recvd', asset: 'Kashmiri Saffron', amount: '$8,400', time: '1h ago' },
               { user: 'Customs_Node', action: 'Verified Manifest', asset: 'Vessel SC-441', amount: 'Logistics', time: '2h ago' }
             ].map((log, i) => (
               <div key={i} className="flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 rounded-2xl transition-all">
                 <div className="flex items-center gap-5">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 font-bold text-xs shadow-sm">
                     {log.user.charAt(0)}
                   </div>
                   <div>
                     <p className="text-sm font-black text-slate-900">{log.user} <span className="text-slate-400 font-bold text-xs">— {log.action}</span></p>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-0.5">{log.asset}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-black text-slate-900">{log.amount}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{log.time}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-cyan-600 rounded-[3rem] p-10 text-white shadow-2xl flex flex-col justify-between group">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md">
              <Globe size={32} />
            </div>
            <h3 className="text-3xl font-black leading-none tracking-tighter">Verified <br/>Origin Protocol</h3>
            <p className="text-cyan-100 text-sm font-medium leading-relaxed opacity-80">Your regional trust score is in the top 5% of global exporters. Continue maintaining compliance to reduce trade friction.</p>
          </div>
          <button className="mt-10 py-4 bg-white text-cyan-600 rounded-2xl text-[10px] font-black uppercase tracking-widest group-hover:scale-105 transition-transform">
            Review Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
