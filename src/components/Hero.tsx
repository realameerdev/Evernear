import React, { useState } from 'react';
import { ArrowRight, Play, Pause, ShieldCheck, Heart, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { playVoiceSnippet, stopVoicePlayback } from '../utils/voiceSynthesis.ts';
import grandfatherImg from '../assets/images/hero_portrait_grandfather_1790833138810.jpg';
import motherImg from '../assets/images/hero_portrait_mother_1790833151693.jpg';

interface HeroProps {
  onCreateClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCreateClick, onHowItWorksClick }) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeMemoryQuote, setActiveMemoryQuote] = useState(0);

  const sampleQuotes = [
    { text: "“Take the quiet road home, kiddo. The world can wait an hour.”", speaker: "Grandpa Arthur", context: "Evening phone calls" },
    { text: "“I never left you without a laugh, did I? Now go have seconds.”", speaker: "Mom (Eleanor)", context: "Sunday kitchen memory" },
  ];

  const toggleVoicePlayback = () => {
    if (isPlayingVoice) {
      stopVoicePlayback();
      setIsPlayingVoice(false);
    } else {
      const quote = sampleQuotes[activeMemoryQuote];
      const isGrandpa = quote.speaker.includes('Arthur');
      
      playVoiceSnippet(
        quote.text,
        {
          pitch: isGrandpa ? 0.85 : 1.1,
          rate: 0.88,
          genderPreference: isGrandpa ? 'male' : 'female',
        },
        () => setIsPlayingVoice(true),
        () => {
          setIsPlayingVoice(false);
          setActiveMemoryQuote((prev) => (prev + 1) % sampleQuotes.length);
        }
      );
    }
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background Soft Teal Atmospheric Ambient Glows (static, fast) */}
      <div 
        className="absolute top-12 right-4 w-[650px] h-[650px] rounded-full pointer-events-none opacity-60 blur-3xl glow-teal-subtle -z-10"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-48 right-1/4 w-[380px] h-[380px] rounded-full pointer-events-none opacity-40 blur-2xl bg-teal-100/60 -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy with motion */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8 z-10"
          >
            {/* Subtle editorial kicker */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-800 uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span>Private Memory Sanctuary</span>
              <span className="text-neutral-300">·</span>
              <span className="text-neutral-500 font-normal">Encrypted & Sovereign</span>
            </motion.div>

            {/* Main Headline with balanced wrap and teal accent phrase */}
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-neutral-900 tracking-tight leading-[1.08] text-balance"
            >
              Some connections deserve{' '}
              <span className="text-[#0D9488] font-semibold inline-block relative">
                another conversation.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2 text-teal-400/40 pointer-events-none"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M0 6C25 1 75 1 100 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-xl"
            >
              Create a private AI recreation of someone meaningful to you, shaped by what you remember and choose to share.
            </motion.p>

            {/* Action CTA Row */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 max-w-md sm:max-w-none"
            >
              <button
                onClick={onCreateClick}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Talk to someone</span>
                <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto px-7 py-3.5 text-base font-medium text-neutral-800 hover:text-neutral-950 rounded-full border border-neutral-300/80 bg-white/70 hover:bg-white hover:border-neutral-400 transition-all duration-200 shadow-xs cursor-pointer text-center"
              >
                How it works
              </button>
            </motion.div>

            {/* Quiet Trust Markers */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4 border-t border-neutral-200/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-500"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Zero model training on your memories</span>
              </div>
              <span className="hidden sm:inline text-neutral-300">·</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-neutral-400" />
                <span>Preserve voice cadence & stories</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Composition with floating cards, portraits & curved paths */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0 flex justify-center w-full overflow-hidden sm:overflow-visible">
            
            {/* The Asymmetric Composition Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[360px] sm:max-w-[540px] h-[480px] sm:h-[580px] mx-auto"
            >

              {/* Decorative Curving Dotted Memory Trajectory */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 540 580"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40 280 C 80 180, 200 80, 480 90"
                  stroke="#14B8A6"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  className="memory-trajectory-dash"
                />
                <path
                  d="M100 450 C 260 480, 420 380, 500 200"
                  stroke="#0F766E"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                  className="memory-trajectory-dash"
                />
                <circle cx="480" cy="90" r="3.5" fill="#0D9488" />
                <circle cx="40" cy="280" r="3" fill="#14B8A6" fillOpacity="0.6" />
                <circle cx="500" cy="200" r="3.5" fill="#0D9488" />
                <circle cx="280" cy="380" r="2.5" fill="#14B8A6" />
              </svg>

              {/* Primary Framed Portrait Card: Grandfather */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-4 right-4 sm:right-14 w-[210px] sm:w-[280px] rounded-3xl bg-white p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(13,148,136,0.08)] border border-neutral-200/90 z-10 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src={grandfatherImg}
                    alt="A kind, smiling grandfather in warm natural light"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter saturate-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 text-white text-[11px] sm:text-xs font-medium drop-shadow-sm">
                    Grandpa Arthur · 1941–2020
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 1: Top Right Person Card */}
              <motion.div 
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="absolute top-0 right-0 sm:-right-4 bg-white/95 backdrop-blur-sm px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl border border-neutral-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.05)] z-20 flex items-center gap-2 sm:gap-2.5"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 border border-neutral-100">
                  <img src={grandfatherImg} alt="Arthur avatar" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] sm:text-xs font-semibold text-neutral-900 leading-tight">Arthur Vance</div>
                  <div className="text-[10px] sm:text-[11px] text-teal-700 font-medium">Grandfather</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: Mid-Left Memory Tag */}
              <motion.div 
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="absolute top-28 sm:top-36 left-0 sm:left-4 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] z-20 flex flex-col gap-0.5 sm:gap-1 max-w-[170px] sm:max-w-[210px]"
              >
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-800">
                  <Bookmark className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-teal-600" />
                  <span className="truncate">Story: Cape May</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-neutral-500">
                  <span className="text-teal-700 font-medium">Summer 1974</span>
                  <span>·</span>
                  <span>Recorded</span>
                </div>
              </motion.div>

              {/* Secondary Overlapping Portrait Card: Joyful Mother */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-16 sm:bottom-16 right-2 sm:right-8 w-[170px] sm:w-[240px] rounded-3xl bg-white p-2 sm:p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.09)] border border-neutral-200/90 z-15 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src={motherImg}
                    alt="A joyful mother with an authentic warm laugh"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter saturate-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 sm:bottom-2.5 sm:left-3 text-white text-[11px] sm:text-xs font-medium drop-shadow-sm">
                    Eleanor · Warmth & Humor
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 3: Persona Pill (Visible on sm+) */}
              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="hidden sm:flex absolute bottom-28 left-8 bg-white/95 backdrop-blur-sm px-3.5 py-2.5 rounded-2xl border border-neutral-200/80 shadow-[0_12px_28px_rgba(0,0,0,0.06)] z-25 items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-neutral-100">
                  <img src={motherImg} alt="Eleanor avatar" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-neutral-900 leading-tight">Eleanor Vance</div>
                  <div className="text-[11px] text-neutral-500">Mother · Sunday Waffles</div>
                </div>
              </motion.div>

              {/* Floating Badge 4: Interactive Audio Snippet / Conversation Bubble */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 sm:bottom-2 right-0 sm:right-2 bg-white/98 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-neutral-200/90 shadow-[0_20px_40px_rgba(13,148,136,0.12)] z-30 w-full max-w-[290px] sm:max-w-[280px]"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleVoicePlayback}
                      className="w-7 h-7 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                      aria-label={isPlayingVoice ? "Pause voice note" : "Play voice note"}
                    >
                      {isPlayingVoice ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                    <div>
                      <div className="text-[11px] font-semibold text-neutral-900 flex items-center gap-1.5">
                        <span>Voice Recreation</span>
                        {isPlayingVoice && (
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                        )}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">0:42 / 1:18</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-teal-800 font-medium px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100">
                    Warm Tone
                  </span>
                </div>

                {/* Animated or static subtle audio waveform bars */}
                <div className="flex items-center gap-1 h-5 px-1 py-0.5 bg-neutral-50 rounded-lg">
                  {[40, 75, 55, 90, 60, 30, 85, 95, 45, 70, 80, 50, 65, 85, 40].map((height, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlayingVoice ? 'bg-teal-500 animate-pulse' : 'bg-neutral-300'
                      }`}
                      style={{
                        height: `${isPlayingVoice ? Math.max(25, (height * (1 + (i % 3) * 0.2)) % 100) : height}%`,
                        animationDelay: `${i * 75}ms`,
                      }}
                    />
                  ))}
                </div>

                {/* Quote text display */}
                <p className="mt-2 text-[11px] italic text-neutral-600 leading-snug line-clamp-2">
                  {sampleQuotes[activeMemoryQuote].text}
                </p>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
