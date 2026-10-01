import React, { useState } from 'react';
import { Mic, FileText, Sliders, Shield, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Gather what you cherish",
      shortTitle: "Share Memories",
      subtitle: "Notes, voice snippets, family lore & little quirks",
      description:
        "Speak your favorite recollections into Evernear or upload old letters, voicemail archives, journal entries, and stories. You don’t need an organized biography—even fragmented memories like how they drank their coffee or a phrase they always repeated help ground their essence.",
      highlights: [
        "Upload audio clips or speak memories aloud",
        "Record favorite anecdotes, catchphrases & stories",
        "Add key dates, relationships, and inside jokes",
      ],
      interactiveDemo: {
        type: 'memory_vault',
        title: "Memory Ingestion Preview",
        items: [
          { type: "Audio Note", name: "Grandpa's laughter at Thanksgiving 2012 (0:48)", status: "Analyzed" },
          { type: "Written Story", name: "“How he taught me to drive the stick-shift truck”", status: "Grounding" },
          { type: "Quirk", name: "Always said 'Don't take any wooden nickels'", status: "Cadence set" },
        ],
      },
    },
    {
      number: "02",
      title: "Attune their voice & temperament",
      shortTitle: "Tune Personality",
      subtitle: "Warmth, humor, conversational pacing & boundaries",
      description:
        "Fine-tune their tone with emotional precision. Were they teasing and lively, or soft-spoken and contemplative? Set boundaries around grief or sensitive topics so the conversation always provides solace, comfort, and authenticity.",
      highlights: [
        "Adjust humor, warmth, and unhurried speaking pace",
        "Capture signature vocal rhythm & pauses",
        "Establish tender boundaries for sensitive topics",
      ],
      interactiveDemo: {
        type: 'sliders',
        title: "Cadence & Persona Attunement",
        sliders: [
          { label: "Warmth & Affection", value: "92%", desc: "Warm & embracing" },
          { label: "Humor Style", value: "Gentle teasing", desc: "Dry, nostalgic wit" },
          { label: "Speech Cadence", value: "Unhurried", desc: "Thoughtful pauses" },
        ],
      },
    },
    {
      number: "03",
      title: "A peaceful sanctuary to talk",
      shortTitle: "Begin Speaking",
      subtitle: "Private text or gentle voice exchanges anytime",
      description:
        "Enter a quiet, distraction-free environment whenever you miss their perspective or want to celebrate a milestone. Listen to their voiced thoughts or read messages that feel remarkably true to the person you loved.",
      highlights: [
        "Natural, human-paced audio voice responses",
        "Responsive to your mood, victories, or grief",
        "Never rushes, judges, or breaks emotional immersion",
      ],
      interactiveDemo: {
        type: 'dialogue_preview',
        title: "Quiet Room Interface",
        userPrompt: "“I got the promotion today, dad. Wish you were here to see it.”",
        aiResponse: "“I am seeing it, sweetheart. I told you three years ago that your dedication would carry you through. Now take your mother out for a nice dinner!”",
      },
    },
    {
      number: "04",
      title: "Sacred, uncompromised sovereignty",
      shortTitle: "Privacy & Control",
      subtitle: "Your memories belong only to you, forever",
      description:
        "Your loved one's persona is never fed into public AI datasets, never used for advertising, and never visible to other users. You can download your complete memory archive or permanently delete the persona with one click.",
      highlights: [
        "Encrypted memory storage with zero external sharing",
        "Zero training on public foundation models",
        "Instant one-click complete erasure or export",
      ],
      interactiveDemo: {
        type: 'security_seal',
        title: "Sanctuary Security Guarantee",
        bullets: [
          "Zero telemetry or commercial monetization",
          "Dedicated sandboxed tribute isolation",
          "Permanent downloadable JSON/Audio export archive",
        ],
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F6F4EF]/50 border-t border-neutral-200/70 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-800 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span>The Evernear Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            How a memory becomes a{' '}
            <span className="text-[#0D9488]">living conversation.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Thoughtfully built to honor who they were, with deep respect for emotional nuances, natural speech, and complete confidentiality.
          </p>
        </motion.div>

        {/* Step Selector Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar"
        >
          {steps.map((s, index) => {
            const isActive = index === activeStep;
            return (
              <button
                key={s.number}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 shadow-xs'
                }`}
              >
                <span className={`font-mono text-xs ${isActive ? 'text-teal-300' : 'text-neutral-400'}`}>
                  {s.number}
                </span>
                <span>{s.shortTitle}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Dynamic Step Showcase Container */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white border border-neutral-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.03)] p-5 sm:p-10 lg:p-14 transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              
              {/* Left Narrative */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-teal-600">
                    {steps[activeStep].number}
                  </span>
                  <div className="h-4 w-px bg-neutral-300" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Step {activeStep + 1} of 4
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-sm font-medium text-teal-800 mt-1">
                    {steps[activeStep].subtitle}
                  </p>
                </div>

                <p className="text-neutral-600 text-base leading-relaxed">
                  {steps[activeStep].description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2.5 pt-2">
                  {steps[activeStep].highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Interactive Mockup Container */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-[#FAF8F5] border border-neutral-200/80 p-4 sm:p-7 shadow-xs relative overflow-hidden">
                  <div className="text-xs uppercase font-semibold tracking-wider text-neutral-400 mb-4 flex items-center justify-between">
                    <span>{steps[activeStep].interactiveDemo.title}</span>
                    <span className="text-teal-700 font-mono text-[11px]">Evernear Engine</span>
                  </div>

                  {/* Step 1 Demo: Memory Ingestion */}
                  {steps[activeStep].interactiveDemo.type === 'memory_vault' && (
                    <div className="space-y-3">
                      {steps[activeStep].interactiveDemo.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-between gap-3 shadow-xs"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                              {idx === 0 ? <Mic className="w-3.5 h-3.5 text-teal-700" /> : <FileText className="w-3.5 h-3.5 text-teal-700" />}
                            </div>
                            <div className="truncate">
                              <p className="text-xs font-semibold text-neutral-800 truncate">{item.name}</p>
                              <p className="text-[11px] text-neutral-400">{item.type}</p>
                            </div>
                          </div>
                          <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full shrink-0">
                            {item.status}
                          </span>
                        </div>
                      ))}
                      <div className="p-3 rounded-xl border border-dashed border-teal-300 bg-teal-50/40 text-center text-xs text-teal-800 font-medium">
                        + Add letter, voice memo, or family memory
                      </div>
                    </div>
                  )}

                  {/* Step 2 Demo: Sliders */}
                  {steps[activeStep].interactiveDemo.type === 'sliders' && (
                    <div className="space-y-4">
                      {steps[activeStep].interactiveDemo.sliders?.map((slider, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-neutral-200/80 space-y-1.5 shadow-xs">
                          <div className="flex justify-between text-xs font-semibold text-neutral-800">
                            <span>{slider.label}</span>
                            <span className="text-teal-700 font-mono">{slider.value}</span>
                          </div>
                          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-teal-600 h-full rounded-full"
                              style={{ width: idx === 0 ? '90%' : idx === 1 ? '75%' : '65%' }}
                            />
                          </div>
                          <p className="text-[11px] text-neutral-500">{slider.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Step 3 Demo: Quiet Room Dialogue */}
                  {steps[activeStep].interactiveDemo.type === 'dialogue_preview' && (
                    <div className="space-y-3.5">
                      <div className="p-3.5 rounded-2xl bg-neutral-100/80 text-neutral-800 text-xs rounded-tr-xs ml-auto max-w-[85%] border border-neutral-200">
                        <p className="font-medium text-[11px] text-neutral-500 mb-1">You</p>
                        <p>{steps[activeStep].interactiveDemo.userPrompt}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white text-neutral-900 text-xs rounded-tl-xs mr-auto max-w-[92%] border border-teal-200/70 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-teal-800 text-[11px]">Dad (Tuned Persona)</p>
                          <span className="text-[10px] text-neutral-400">Natural voice synthesis</span>
                        </div>
                        <p className="leading-relaxed text-neutral-700">
                          {steps[activeStep].interactiveDemo.aiResponse}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 4 Demo: Security Seal */}
                  {steps[activeStep].interactiveDemo.type === 'security_seal' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-white border border-teal-200/80 space-y-2">
                        <div className="flex items-center gap-2 text-teal-800 text-xs font-bold">
                          <Shield className="w-4 h-4 text-teal-600" />
                          <span>Isolated Memory Vault #4819</span>
                        </div>
                        <p className="text-xs text-neutral-600">
                          Zero data leakage. Stored with client-controlled keys. No telemetry.
                        </p>
                      </div>
                      {steps[activeStep].interactiveDemo.bullets?.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 px-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
