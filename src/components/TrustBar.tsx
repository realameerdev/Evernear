import React from 'react';
import { Lock, EyeOff, Award, Feather, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustBar: React.FC = () => {
  const trustSignals = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      caption: "Device-isolated memory vault",
    },
    {
      icon: EyeOff,
      title: "Zero Model Ingestion",
      caption: "Never shared with public LLMs",
    },
    {
      icon: Feather,
      title: "Living Memory Journal",
      caption: "Grounded in real life stories",
    },
    {
      icon: Shield,
      title: "Bereavement Ethics",
      caption: "Respectful emotional boundaries",
    },
    {
      icon: Award,
      title: "Complete Sovereignty",
      caption: "Export or erase at any second",
    },
  ];

  return (
    <section className="py-10 border-y border-neutral-200/70 bg-[#F6F4EF]/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
            Designed with reverence · Trusted by families and memory-keepers worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 items-center justify-center">
          {trustSignals.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 p-3.5 sm:p-3 rounded-2xl sm:rounded-xl bg-white/70 sm:bg-white/50 border border-neutral-200/60 hover:bg-white hover:border-teal-200/70 hover:shadow-xs transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50/80 border border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-100/70 transition-colors">
                  <Icon className="w-4 h-4 text-teal-800" />
                </div>
                <div className="text-left overflow-hidden">
                  <h2 className="text-xs font-semibold text-neutral-800 truncate">{item.title}</h2>
                  <p className="text-[11px] text-neutral-500 truncate">{item.caption}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
