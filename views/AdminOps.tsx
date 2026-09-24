
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, PiggyBank, Receipt, CreditCard } from 'lucide-react';

const budgetData = [
  { day: 'D1', spent: 0, balance: 20000 },
  { day: 'D5', spent: 1500, balance: 18500 },
  { day: 'D10', spent: 4200, balance: 15800 },
  { day: 'D15', spent: 6800, balance: 13200 },
  { day: 'D20', spent: 9100, balance: 10900 },
  { day: 'D25', spent: 11200, balance: 8800 },
  { day: 'D30', spent: 12500, balance: 7500 },
];

const AdminOps: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Internal Ops</h1>
          <p className="text-slate-500">Seed budget and platform infrastructure monitoring.</p>
        </div>
        <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold flex items-center gap-2">
          <Wallet size={16} /> Admin Verified
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Seed Budget</div>
          <div className="text-4xl font-bold mb-1">PKR 20,000</div>
          <div className="text-emerald-400 text-sm font-medium">Platform Initial Capital</div>
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Allocated</div>
              <div className="font-bold">PKR 12,500</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Remaining</div>
              <div className="font-bold text-emerald-400">PKR 7,500</div>
            </div>
          </div>
        </div>

        {[
          { label: 'Burn Rate (Weekly)', val: 'PKR 1,200', icon: PiggyBank, color: 'text-amber-500' },
          { label: 'Cloud Infrastructure', val: '$0.00 (Tier 1)', icon: CreditCard, color: 'text-blue-500' },
        ].map(item => (
          <div key={item.label} className="bg-white border border-slate-100 p-8 rounded-3xl">
            <div className={`${item.color} bg-slate-50 p-4 rounded-2xl inline-block mb-4`}>
              <item.icon size={28} />
            </div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</div>
            <div className="text-2xl font-bold text-slate-900">{item.val}</div>
            <div className="mt-4 text-xs text-slate-500">Auto-scaling enabled for trade spikes.</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-slate-900 mb-8">Burn Analysis: PKR 20,000 Initial</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="spent" stroke="#ef4444" strokeWidth={3} fill="#ef444410" />
              <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={3} fill="#10b98110" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Receipt size={18} className="text-slate-400" /> Recent Requisitions
        </h4>
        <div className="space-y-3">
          {[
            { item: 'Domain Registration (spicechain.trade)', cost: 'PKR 1,800', date: 'Oct 02' },
            { item: 'Cloud Storage API Gateway', cost: 'PKR 2,400', date: 'Oct 15' },
            { item: 'B2B Verification Fees', cost: 'PKR 3,500', date: 'Oct 28' },
          ].map((req, i) => (
            <div key={i} className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400">{req.date}</span>
                <span className="font-medium text-slate-700">{req.item}</span>
              </div>
              <span className="font-bold text-slate-900">{req.cost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOps;
