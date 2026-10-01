import React from 'react';
import { Lock, EyeOff, Trash2, Download, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const PrivacyDignity: React.FC = () => {
  const pillars = [
    {
      icon: EyeOff,
      title: "Zero Public Training",
      desc: "Your stories, recordings, and private words are never ingested into general foundational models or made accessible to other users.",
    },
    {
      icon: Lock,
      title: "Isolated Encryption",
      desc: "Every recreation exists in a cryptographically isolated sanctuary vault. Even our engineering team cannot view your personal conversations.",
    },
    {
      icon: Download,
      title: "Full Archive Export",
      desc: "Download your complete memory record, transcripts, and recreated voice audio files in standard open formats anytime for family archives.",
    },
    {
      icon: Trash2,
      title: "Instant Purge",
      desc: "If you ever choose to let go, a single click permanently destroys your vault, personas, audio files, and all associated embeddings with zero retention.",
    },
  ];

  return (
    <section id="privacy" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-800 uppercase mb-3">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>The Evernear Covenant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            Your memories are sacred.{' '}
            <span className="text-[#0D9488]">Never training data.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Recreating a loved one requires unmatched ethical responsibility. We hold ourselves to strict privacy covenants that put your emotional peace and dignity above all else.
          </p>
        </motion.div>

        {/* 4 Core Privacy Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-teal-700" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Ethical Comparison Table Container */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 sm:p-12 overflow-hidden"
        >
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              A standard built specifically for remembrance
            </h3>
            <p className="text-sm text-neutral-500 mt-1">
              How Evernear compares to standard consumer AI chat services
            </p>
          </div>

          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[540px] text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/80">
                  <th className="py-4 pr-6 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Ethical Principle
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-teal-900 bg-teal-50/60 rounded-t-xl">
                    Evernear Sanctuary
                  </th>
                  <th className="py-4 pl-6 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Generic AI Chatbots
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                <tr>
                  <td className="py-4 pr-6 font-medium text-neutral-900">
                    Memories used to train external models
                  </td>
                  <td className="py-4 px-6 bg-teal-50/60 font-semibold text-teal-900 flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-600" />
                    <span>Never. Strict quarantine.</span>
                  </td>
                  <td className="py-4 pl-6 text-neutral-500 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span>Often opted-in by default</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 pr-6 font-medium text-neutral-900">
                    Advertising & Data Broker Sales
                  </td>
                  <td className="py-4 px-6 bg-teal-50/60 font-semibold text-teal-900 flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-600" />
                    <span>Zero ads. No data monetization.</span>
                  </td>
                  <td className="py-4 pl-6 text-neutral-500 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span>Targeted profiles & behavior logging</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 pr-6 font-medium text-neutral-900">
                    Emotional sensitivity & grief counseling bounds
                  </td>
                  <td className="py-4 px-6 bg-teal-50/60 font-semibold text-teal-900 flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-600" />
                    <span>Consulted with bereavement experts</span>
                  </td>
                  <td className="py-4 pl-6 text-neutral-500 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span>Unregulated generic persona prompts</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 pr-6 font-medium text-neutral-900">
                    Permanent self-service vault erasure
                  </td>
                  <td className="py-4 px-6 bg-teal-50/60 font-semibold text-teal-900 flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-600" />
                    <span>Instant, cryptographic deletion</span>
                  </td>
                  <td className="py-4 pl-6 text-neutral-500 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span>Lingers in server backups for months</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
