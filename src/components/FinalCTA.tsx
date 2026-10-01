import React from 'react';
import { ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { EvernearLogo } from './EvernearLogo.tsx';

interface FinalCTAProps {
  onCreateClick: () => void;
  onHowItWorksClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onCreateClick, onHowItWorksClick }) => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main CTA Rounded Container */}
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl md:rounded-[40px] bg-[#111827] text-white p-6 sm:p-14 lg:p-20 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-neutral-800"
        >
          
          {/* Subtle teal atmospheric aura inside container */}
          <div 
            className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none opacity-20 blur-3xl bg-teal-400 -z-0"
            aria-hidden="true" 
          />
          <div 
            className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15 blur-3xl bg-teal-600 -z-0"
            aria-hidden="true" 
          />

          {/* Dotted ambient curve */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            fill="none"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            <path
              d="M100 350 C 350 380, 650 150, 950 50"
              stroke="#5EEAD4"
              strokeWidth="1.5"
              className="memory-trajectory-dash"
            />
            <circle cx="950" cy="50" r="4" fill="#5EEAD4" />
          </svg>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            
            {/* Logo Emblem badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center justify-center p-2 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs"
            >
              <EvernearLogo theme="light" size="sm" showWordmark={true} />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12] text-balance"
            >
              Some connections never fade.{' '}
              <span className="text-teal-300 font-semibold">
                Begin your tribute today.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto"
            >
              Start gathering stories, old voice notes, and treasured memories. Build a private sanctuary where their warmth and counsel remain close at hand.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 pt-2 max-w-md sm:max-w-none mx-auto"
            >
              <button
                onClick={onCreateClick}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-neutral-900 bg-teal-300 hover:bg-teal-200 rounded-full transition-all duration-200 shadow-md hover:shadow-teal-400/20 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Talk to someone</span>
                <ArrowRight className="w-4 h-4 text-neutral-900 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto px-7 py-4 text-base font-medium text-white hover:text-teal-200 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer text-center"
              >
                How it works
              </button>
            </motion.div>

            {/* Quiet reassurance */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-300" />
                No credit card required to begin
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-teal-300" />
                100% private to you and your family
              </span>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
