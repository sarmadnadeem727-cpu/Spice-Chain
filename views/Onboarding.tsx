
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Building2, Globe2, FileUp, CheckCircle2, ChevronRight, Briefcase, Factory, Store, ShieldCheck } from 'lucide-react';

const Onboarding: React.FC = () => {
  const { user, completeOnboardingStep } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: 'SME',
    region: 'South Asia'
  });

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
    else {
      completeOnboardingStep();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
          {[1, 2].map(s => (
            <div 
              key={s} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? 'bg-cyan-600 text-white' : 'bg-white text-slate-400 border-2 border-slate-200'
              }`}
            >
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900">Select Business Type</h2>
                  <p className="text-slate-500">We'll tailor your dashboard experience</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: 'SME', label: 'SME / Local Trader', icon: Store, desc: 'Small to medium scale spice businesses.' },
                    { id: 'Exporter', label: 'Global Exporter', icon: Globe2, desc: 'Enterprise logistics and international trade.' },
                    { id: 'Wholesaler', label: 'Bulk Wholesaler', icon: Factory, desc: 'Bulk procurement and warehousing.' }
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, businessType: type.id })}
                      className={`flex items-center gap-6 p-6 rounded-2xl border-2 transition-all text-left ${
                        formData.businessType === type.id ? 'border-cyan-500 bg-cyan-50' : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className={`p-4 rounded-xl ${formData.businessType === type.id ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <type.icon size={28} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{type.label}</div>
                        <div className="text-sm text-slate-500">{type.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900">Final Confirmation</h2>
                  <p className="text-slate-500">You are all set to join the global trade network.</p>
                </div>
                <div className="bg-cyan-50 border border-cyan-100 p-8 rounded-2xl text-center">
                   <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-cyan-900 mb-2">Identity Verified</h3>
                   <p className="text-cyan-700 text-sm">Your business profile has been fast-tracked for global trading.</p>
                </div>
              </div>
            )}

            <div className="mt-12 flex justify-between items-center">
              <button 
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className={`text-slate-400 font-bold hover:text-slate-600 ${step === 1 ? 'invisible' : ''}`}
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-cyan-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-cyan-700 shadow-lg shadow-cyan-200"
              >
                {step === 2 ? 'Enter Dashboard' : 'Continue'} <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
