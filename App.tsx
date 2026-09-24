import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MarketProvider } from './context/MarketContext';
import { Package } from 'lucide-react';

// Views
import LandingPage from './views/LandingPage';
import Marketplace from './views/Marketplace';
import Logistics from './views/Logistics';
import Planner from './views/Planner';
import Dashboard from './views/Dashboard';
import AdminOps from './views/AdminOps';
import Onboarding from './views/Onboarding';

// Components
import Sidebar from './components/Sidebar';
import { UserType } from './types';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="p-4 md:p-10 max-w-7xl mx-auto w-full"
  >
    {children}
  </motion.div>
);

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user?.isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isBoarded) return <Navigate to="/onboarding" replace />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 md:ml-64 transition-all duration-300 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="marketplace" element={<PageWrapper><Marketplace /></PageWrapper>} />
            <Route path="logistics" element={<PageWrapper><Logistics /></PageWrapper>} />
            <Route path="planner" element={<PageWrapper><Planner /></PageWrapper>} />
            <Route path="admin" element={user.role === 'Admin' ? <PageWrapper><AdminOps /></PageWrapper> : <Navigate to="/dashboard/home" replace />} />
            <Route path="*" element={<Navigate to="home" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

const LoginPortal: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [type, setType] = React.useState<UserType>('Buyer');

  useEffect(() => {
    if (user?.isAuthenticated) {
      if (user.isBoarded) navigate('/dashboard', { replace: true });
      else navigate('/onboarding', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-cyan-50/20 blur-[100px] -z-10 rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-slate-100 rounded-[3rem] shadow-2xl p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-200 overflow-hidden">
            <img src="/logo.png" alt="SpiceChain Logo" className="w-full h-full object-contain p-2" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter leading-none">SpiceChain</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Global Trade • Local Roots</p>
        </div>

        <div className="space-y-8">
          <div className="flex gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
            <button 
              onClick={() => setType('Buyer')}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${type === 'Buyer' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-400'}`}
            >
              Buyer
            </button>
            <button 
              onClick={() => setType('Seller')}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${type === 'Seller' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-400'}`}
            >
              Seller
            </button>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Institutional Credentials</label>
            <input 
              type="email" 
              placeholder="name@organization.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-medium"
            />
          </div>

          <button 
            onClick={() => login(email || 'demo@spicechain.io', type)}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-slate-200"
          >
            Access Trade Terminal
          </button>

          <div className="relative flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Enterprise SSO</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:border-cyan-200 hover:bg-cyan-50/50 transition-all">
              Corporate SAML
            </button>
            <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:border-cyan-200 hover:bg-cyan-50/50 transition-all">
              Ledger Auth
            </button>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-10 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Encrypted Session v2.4.0</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MarketProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPortal />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MarketProvider>
    </AuthProvider>
  );
};

export default App;
