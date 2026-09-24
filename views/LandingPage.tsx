import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, X, CheckCircle, Mail, Building, Globe, Package } from 'lucide-react';
import LiveTicker from '../components/LiveTicker';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoRequested, setDemoRequested] = useState(false);
  const [demoData, setDemoData] = useState({ name: '', email: '', company: '' });

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoRequested(true);
    localStorage.setItem('spicechain_demo_requested', 'true');
    setTimeout(() => {
      setShowDemoModal(false);
      setDemoRequested(false);
      setDemoData({ name: '', email: '', company: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <LiveTicker />
      
      <header className="px-10 py-6 flex justify-between items-center border-b border-slate-100 glass sticky top-0 z-[60]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-200 overflow-hidden p-1 border border-slate-100">
            <img src="/logo.png" alt="SpiceChain Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block">
            <span className="text-slate-900 font-black text-2xl tracking-tighter block leading-none">SpiceChain</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 block">Global Trade • Local Roots</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            <a href="#features" className="hover:text-cyan-600 transition-colors">Features</a>
            <a href="#network" className="hover:text-cyan-600 transition-colors">Global Network</a>
            <a href="#" className="hover:text-cyan-600 transition-colors">Documentation</a>
          </nav>
          <button 
            onClick={() => navigate('/login')}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            Launch Platform
          </button>
        </div>
      </header>

      <main>
        <section className="relative pt-32 pb-40 px-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-cyan-50 opacity-40 blur-[120px] rounded-full -z-10"></div>
          
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-black uppercase tracking-widest mb-10 border border-cyan-100">
                <Shield size={14} /> Decentralized Trade Authority v2.4
              </div>
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-slate-900 mb-10 leading-[0.9]">
                Global Trade. <br />
                <span className="text-cyan-600 italic">Local Roots.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                The premier B2B SaaS platform for the global spice exchange. Verify origins, secure logistics, and negotiate milestone-based contracts in one secure ledger.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-cyan-600 transition-all shadow-2xl shadow-slate-200"
                >
                  Enter Trade Room <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => setShowDemoModal(true)}
                  className="bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:border-cyan-600 transition-all shadow-sm"
                >
                  Request Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
          {[
            { 
              title: "Verified Origin Proof", 
              desc: "Every batch is verified through a 3-step phytosanitary check and blockchain-backed origin proof, adhering to local root standards.",
              icon: Shield,
              color: "text-cyan-600"
            },
            { 
              title: "Market Depth AI", 
              desc: "Stay ahead of price volatility with live indices from Saffron to Cardamom, powered by our custom trade guardrails.",
              icon: Zap,
              color: "text-amber-500"
            },
            { 
              title: "Smart Corridor Logistics", 
              desc: "End-to-end logistics with smart routing and real-time vessel tracking across US, EU, and Middle Eastern corridors.",
              icon: Globe,
              color: "text-blue-500"
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:border-cyan-200 hover:bg-white transition-all group shadow-sm hover:shadow-xl hover:shadow-cyan-900/5"
            >
              <div className="mb-8 p-4 bg-white rounded-2xl inline-block shadow-sm group-hover:scale-110 transition-transform">
                <feature.icon className={`${feature.color}`} size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </section>
      </main>

      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative border border-slate-100"
            >
              <button onClick={() => setShowDemoModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
                <X size={24} />
              </button>
              
              {!demoRequested ? (
                <>
                  <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-200 overflow-hidden p-2 border border-slate-100">
                      <img src="/logo.png" alt="SpiceChain Logo" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">Enterprise Access</h3>
                    <p className="text-slate-500 font-medium">Join the global spice trade network today.</p>
                  </div>
                  <form onSubmit={handleDemoRequest} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Organization</label>
                      <div className="relative">
                        <Building className="absolute left-4 top-3.5 text-slate-300" size={18} />
                        <input 
                          type="text" 
                          required
                          value={demoData.company}
                          onChange={(e) => setDemoData({ ...demoData, company: e.target.value })}
                          placeholder="Global Spice Hub Ltd"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Corporate Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-slate-300" size={18} />
                        <input 
                          type="email" 
                          required
                          value={demoData.email}
                          onChange={(e) => setDemoData({ ...demoData, email: e.target.value })}
                          placeholder="trade@spicehub.com"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-medium"
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all mt-4 shadow-xl shadow-slate-200">
                      Request Full Terminal Preview
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Request Received</h3>
                  <p className="text-slate-500 font-medium leading-relaxed px-4">Our trade verification team will contact {demoData.email} within 1 business day.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="border-t border-slate-100 py-16 px-6 bg-slate-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden p-1">
                <img src="/logo.png" alt="SpiceChain Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-slate-900 font-black text-lg tracking-tighter block leading-none">SpiceChain</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1 block">Institutional Trade Ledger</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-sm font-black uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-cyan-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-600 transition-colors">Terms of Trade</a>
              <a href="#" className="hover:text-cyan-600 transition-colors">Compliance</a>
              <a href="#" className="hover:text-cyan-600 transition-colors">Global Support</a>
            </div>
          </div>
          <div className="mt-16 text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] opacity-40">
            © 2024 SpiceChain Enterprise Trading Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
