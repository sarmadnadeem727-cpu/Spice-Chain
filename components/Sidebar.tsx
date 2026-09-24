import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Truck, 
  Calendar, 
  LogOut, 
  ShieldCheck,
  Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { activeBids } = useMarket();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/home' },
    { name: 'Marketplace', icon: ShoppingBag, path: '/dashboard/marketplace', badge: activeBids.length },
    { name: 'Logistics', icon: Truck, path: '/dashboard/logistics' },
    { name: user?.type === 'Seller' ? 'Harvest Planner' : 'Procurement', icon: Calendar, path: '/dashboard/planner' },
  ];

  if (user?.role === 'Admin') {
    navItems.push({ name: 'Internal Ops', icon: ShieldCheck, path: '/dashboard/admin' });
  }

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 flex flex-col z-50 hidden md:flex">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Package size={24} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-slate-900 font-black text-xl tracking-tighter block leading-none">SpiceChain</span>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1 block">Global Trade • Local Roots</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold tracking-tight transition-all ${
                isActive 
                ? 'bg-emerald-50 text-emerald-700 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </div>
              {item.badge && item.badge > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50/30">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-4 shadow-sm">
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Authenticated Terminal</div>
          <div className="text-sm font-bold text-slate-900 truncate mb-1">{user?.email}</div>
          <div className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-lg inline-block ${
            user?.type === 'Buyer' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {user?.type} Account
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Sign Out Terminal
        </button>
      </div>
    </div>
  );
};

export default Sidebar;