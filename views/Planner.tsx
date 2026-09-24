
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Calendar, Sun, CloudRain, Wind, ArrowRight, CheckCircle2 } from 'lucide-react';

const Planner: React.FC = () => {
  const { user } = useAuth();
  const isSeller = user?.type === 'Seller';

  const upcomingEvents = isSeller ? [
    { title: 'Black Pepper Drying', date: 'Oct 24', status: 'Ready', risk: 'Low' },
    { title: 'Turmeric Extraction', date: 'Nov 02', status: 'Pending', risk: 'Weather Alert' },
    { title: 'Organic Certification Audit', date: 'Nov 15', status: 'Upcoming', risk: 'None' },
  ] : [
    { title: 'Q4 Saffron Procurement', date: 'Oct 28', status: 'Bidding Open', risk: 'Price Volatility' },
    { title: 'US Customs Clearance - Batch 12', date: 'Nov 05', status: 'Processing', risk: 'Low' },
    { title: 'Cardamom Inspection (Kerala)', date: 'Nov 12', status: 'Scheduled', risk: 'None' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{isSeller ? 'Harvest Planner' : 'Procurement Tracker'}</h1>
          <p className="text-slate-500">Manage crop cycles and critical operational milestones.</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all">
          <Calendar size={18} /> Add Entry
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">October - November 2024</h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">Prev</button>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">Next</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-4">
              {Array(31).fill(0).map((_, i) => (
                <div key={i} className={`aspect-square border border-slate-50 rounded-2xl p-2 relative transition-colors ${
                  [12, 18, 24].includes(i+1) ? 'bg-emerald-50/50 border-emerald-100' : 'hover:bg-slate-50 cursor-pointer'
                }`}>
                  <span className={`text-sm font-bold ${[12, 18, 24].includes(i+1) ? 'text-emerald-600' : 'text-slate-400'}`}>{i + 1}</span>
                  {[12, 24].includes(i+1) && (
                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-emerald-500 rounded-full" />
                  )}
                  {i+1 === 18 && (
                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-amber-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Soil Temp', value: '24°C', icon: Sun, color: 'text-amber-500' },
              { label: 'Humidity', value: '72%', icon: CloudRain, color: 'text-blue-500' },
              { label: 'Wind Speed', value: '12km/h', icon: Wind, color: 'text-slate-500' },
            ].map(item => (
              <div key={item.label} className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center gap-4">
                <div className={`${item.color} bg-slate-50 p-3 rounded-xl`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">{item.label}</div>
                  <div className="text-lg font-bold text-slate-900">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" /> Critical Timeline
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{event.date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      event.risk === 'None' ? 'bg-slate-100 text-slate-400' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {event.risk}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{event.title}</h4>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                    <span>{event.status}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
              View Detailed Schedule
            </button>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-3xl text-white shadow-xl shadow-amber-200">
            <h3 className="text-xl font-bold mb-2">Harvest Quality Risk</h3>
            <p className="text-amber-100 text-sm mb-6 leading-relaxed">Early monsoon warnings in the Kerala hub may affect drying cycles. Consider switching to mechanical dehumidifiers.</p>
            <button className="bg-white text-amber-600 px-6 py-3 rounded-xl font-bold hover:bg-amber-50 transition-all text-sm">
              Read Risk Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
