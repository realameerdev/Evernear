import React from 'react';
import { Sliders, BookOpen, Compass, ShieldCheck, BookmarkCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const MemoryAndPersonalization: React.FC = () => {
  return (
    <section id="personalization" className="py-20 md:py-28 bg-[#F6F4EF]/60 border-t border-neutral-200/70 relative">
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
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span>Deep Personalization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            Personalized to the finest{' '}
            <span className="text-[#0D9488]">texture of their spirit.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            True connection lives in the details: how they paused before delivering a punchline, the advice they repeated every summer, and the warmth they radiated across a room.
          </p>
        </motion.div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Bento Card 1: Voice & Cadence (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 bg-white rounded-3xl p-5 sm:p-10 border border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                <Sliders className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-xs font-mono text-neutral-400">Dimension 01</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Voice & Cadence Sculpting
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                Describe how they spoke or upload a brief voice note. Evernear shapes subtle pitch variations, speech tempo, authentic pauses, and their signature laugh.
              </p>
            </div>

            {/* Interactive Visual Sliders Representation */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200/80 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-neutral-800">
                  <span>Conversational Pacing</span>
                  <span className="text-teal-700 font-mono">Unhurried & Reflective</span>
                </div>
                <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full w-[78%]" />
                </div>
                <p className="text-[11px] text-neutral-500">Includes natural thoughtful pauses before answering deep questions</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200/80 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-neutral-800">
                  <span>Laughter & Warmth Index</span>
                  <span className="text-teal-700 font-mono">Hearty & Affectionate</span>
                </div>
                <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full w-[88%]" />
                </div>
                <p className="text-[11px] text-neutral-500">Chortles and gentle chuckle cues when remembering funny family episodes</p>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: The Chronicle of Stories (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 bg-white rounded-3xl p-5 sm:p-10 border border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-teal-700" />
                </div>
                <span className="text-xs font-mono text-neutral-400">Dimension 02</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                  The Story Chronicle
                </h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  Anchor their memories into distinct life eras—childhood, first love, career milestones, favorite vacation spots, and proud moments.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { era: "1950–1968", label: "Growing up on the farm & fixing radios" },
                  { era: "1972", label: "The cross-country road trip in the blue Chevy" },
                  { era: "1990s", label: "Teaching grandchildren how to fish on the lake" },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-neutral-200/80 flex items-center gap-3 text-xs">
                    <span className="font-mono text-teal-800 font-semibold text-[11px] shrink-0">{item.era}</span>
                    <span className="text-neutral-700 truncate">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-teal-600" />
              <span>Memories cross-reference naturally in conversations</span>
            </div>
          </motion.div>

          {/* Bento Card 3: Personality Quirks & Phrasing (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 bg-white rounded-3xl p-5 sm:p-10 border border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-teal-700" />
                </div>
                <span className="text-xs font-mono text-neutral-400">Dimension 03</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                  Quirks & Signature Sayings
                </h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  Everyone has phrases that were uniquely theirs. Evernear naturally weaves their favorite idioms, greetings, and comforting idioms into dialogue.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "“Don’t take any wooden nickels”",
                  "“Check the oil before you leave”",
                  "“Let’s sleep on it, kiddo”",
                  "“Best pie in thirty counties”",
                ].map((phrase, i) => (
                  <span key={i} className="text-xs italic bg-neutral-50 border border-neutral-200 text-neutral-700 px-3 py-1.5 rounded-lg">
                    {phrase}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-teal-600" />
              <span>Preserves the playful, human spark of their personality</span>
            </div>
          </motion.div>

          {/* Bento Card 4: Emotional Safeguards & Bereavement Care (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 bg-white rounded-3xl p-5 sm:p-10 border border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-xs font-mono text-neutral-400">Dimension 04</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Emotional Safeguards & Dignity
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                You define what topics are off-limits or require gentle handling. Evernear will never fabricate false histories, hallucinate traumatic events, or violate the sacred respect of remembrance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/80">
                <p className="text-xs font-semibold text-neutral-800">Sensitivities Guided by You</p>
                <p className="text-[11px] text-neutral-500 mt-1">Specify whether conversations should acknowledge their passing or exist in timeless remembrance.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/80">
                <p className="text-xs font-semibold text-neutral-800">No Hallucinated Fiction</p>
                <p className="text-[11px] text-neutral-500 mt-1">If a detail wasn't in their memory vault, the persona responds with humility rather than inventing false facts.</p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
