import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Ship, MapPin, Zap, Package, CheckCircle, 
  ArrowRight, Anchor, ShieldCheck, Globe
} from 'lucide-react';

const Logistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  const corridorNodes = [
    { label: 'Loading Terminal', status: 'Completed', icon: Package, location: 'Cochin Seaport' },
    { label: 'Customs Node', status: 'Active', icon: ShieldCheck, location: 'International Waters' },
    { label: 'Phytosanitary Scan', status: 'Pending', icon: Zap, location: 'Inspection Zone' },
    { label: 'Destination Terminal', status: 'Pending', icon: MapPin, location: 'Port Newark' },
  ];

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Fleet Corridor</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-Time Vessel Tracking • Multi-Modal Logistics</p>
        </div>
        <div className="flex gap-4 bg-white p-1 border border-slate-100 rounded-2xl shadow-sm">
          <button onClick={() => setActiveTab('active')} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>Active Fleet</button>
          <button onClick={() => setActiveTab('history')} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>Trade Archive</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.8rem] flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Ship size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Vessel: Spice Admiral</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Vessel ID: SC-T721-X9 • Origin: Cochin Hub</p>
                </div>
              </div>
              <div className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                In-Transit
              </div>
            </div>

            {/* Visual Logistics Pipeline */}
            <div className="relative py-12 px-6">
              {/* Pipeline Base Line */}
              <div className="absolute top-1/2 left-10 right-10 h-1.5 bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '42%' }} 
                  transition={{ duration: 3, ease: 'easeInOut' }} 
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                />
              </div>
              
              <div className="flex justify-between relative">
                {corridorNodes.map((node, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 relative z-10">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.4 }}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl transition-all ${
                        node.status === 'Completed' ? 'bg-emerald-500 text-white' : 
                        node.status === 'Active' ? 'bg-blue-600 text-white ring-8 ring-blue-500/10' : 
                        'bg-white text-slate-200 border-slate-50'
                      }`}
                    >
                      <node.icon size={20} className={node.status === 'Active' ? 'animate-pulse' : ''} />
                    </motion.div>
                    <div className="text-center">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${node.status === 'Pending' ? 'text-slate-300' : 'text-slate-900'}`}>{node.label}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{node.location}</p>
                    </div>
                  </div>
                ))}

                {/* Animated Vessel Icon Moving Along Pipeline */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                  initial={{ left: '10%' }}
                  animate={{ left: '40%' }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                >
                  <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/40 transform -rotate-45">
                    <Ship size={16} className="animate-pulse" />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><Globe size={14}/></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Destination: Port Newark, US</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><Anchor size={14}/></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">ETA: Nov 28, 2024</span>
                </div>
              </div>
              <button className="flex items-center gap-2 text-xs font-black uppercase text-blue-600 hover:gap-4 transition-all">Download Shipping Manifest <ArrowRight size={16}/></button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm">
             <h3 className="text-xl font-black text-slate-900 mb-8">Asset Journey Logs</h3>
             <div className="space-y-4">
               {[
                 { event: 'Departure Cochin Hub', time: 'Nov 02, 09:42 AM', type: 'Check' },
                 { event: 'Phytosanitary Pre-Approval', time: 'Oct 28, 02:15 PM', type: 'Cert' },
                 { event: 'Batch Aggregation Complete', time: 'Oct 25, 11:30 AM', type: 'Log' },
               ].map((log, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-default">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{log.event}</p>
                        <p className="text-xs text-slate-400 font-medium">{log.time}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-500">{log.type}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl">
            <h4 className="text-xl font-black mb-8 flex items-center gap-3"><Zap className="text-emerald-400"/> Trade Logistics Fee</h4>
            <div className="space-y-6">
              {[
                { l: 'Ocean Freight (MT)', v: '$2,840', s: 'Current Market rate' },
                { l: 'Port Insurance', v: '$420', s: 'Triple-A coverage' },
                { l: 'B2B Surcharge', v: '$910', s: 'Verified route fee' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.l}</p><p className="text-[10px] text-slate-600 font-medium group-hover:text-slate-300">{item.s}</p></div>
                  <p className="text-lg font-black">{item.v}</p>
                </div>
              ))}
              <div className="pt-8 border-t border-slate-800 flex justify-between items-end">
                <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Overhead</p><p className="text-4xl font-black text-emerald-400 tracking-tighter">$4,170</p></div>
                <div className="bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase">Save 12% on Hubs</div>
              </div>
            </div>
            <button className="w-full mt-10 py-5 bg-white text-slate-900 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-100 transition-all">Download Proforma Invoice</button>
          </div>

          <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm">
            <h4 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3"><ShieldCheck className="text-blue-500"/> Origin Audit Status</h4>
            <div className="space-y-5">
              {[
                { label: 'Blockchain L/C Locked', done: true },
                { label: 'Merchant ID Verified', done: true },
                { label: 'Phyto Pre-Approval', done: true },
                { label: 'Escrow Milestone 1', done: true },
                { label: 'Port Arrival Verification', done: false },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${task.done ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-200'}`}>
                    <CheckCircle size={20} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-tight ${task.done ? 'text-slate-900' : 'text-slate-300'}`}>{task.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;