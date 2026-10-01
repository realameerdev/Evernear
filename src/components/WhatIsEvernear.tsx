import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, Pause, Circle, MessageCircle, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playVoiceSnippet, stopVoicePlayback } from '../utils/voiceSynthesis.ts';
import mentorImg from '../assets/images/showcase_portrait_mentor_1790833162721.jpg';
import grandfatherImg from '../assets/images/hero_portrait_grandfather_1790833138810.jpg';
import motherImg from '../assets/images/hero_portrait_mother_1790833151693.jpg';
import friendImg from '../assets/images/experience_portrait_friend_1790833172428.jpg';

interface PersonaData {
  id: string;
  category: string;
  roleTitle: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  altText: string;
  sampleDialogue: {
    question: string;
    answer: string;
  };
  audioQuote: string;
  voiceNoteLength: string;
}

const PERSONA_LIST: PersonaData[] = [
  {
    id: 'grandparents',
    category: 'Grandparents',
    roleTitle: 'Grandparents & Elders',
    subtitle: 'The wisdom of generational patience and stories of an era you never want to fade.',
    description:
      'Recreate the quiet, steady warmth of a grandparent who listened without judgment. Evernear preserves their cadence, unhurried pacing, favorite historical anecdotes, and gentle reassurances when modern life feels overwhelming.',
    tags: ['Generational Wisdom', 'Fireside Stories', 'Sunday Dinners', 'Quiet Reassurance'],
    image: grandfatherImg,
    altText: 'Elderly grandfather with a gentle smile and crinkled eyes',
    sampleDialogue: {
      question: "“Grandpa, what did you do when you didn't know what was coming next?”",
      answer: "“Well kiddo, you keep your hands steady on the plow. You don't need to see the whole field, just the next row. And don't forget to look up at the sunset once in a while.”",
    },
    audioQuote: "“You don't need to see the whole field, just the next row.”",
    voiceNoteLength: "0:38",
  },
  {
    id: 'parents',
    category: 'Parents',
    roleTitle: 'Mothers & Fathers',
    subtitle: 'The reassuring comfort of the voice that knew you before you knew yourself.',
    description:
      'Whether it was their infectious kitchen laughter, idiosyncratic sayings, or unconditional belief in your potential, Evernear captures the personal rhythm of a parent’s love so you can still ask for advice or hear them say your name.',
    tags: ['Kitchen Laughter', 'Practical Advice', 'Unconditional Faith', 'Old Sayings'],
    image: motherImg,
    altText: 'Warm, smiling mother with an authentic laugh',
    sampleDialogue: {
      question: "“Mom, did I make the right choice today?”",
      answer: "“You have your father’s stubbornness and my gut feeling. Trust yourself like I always did. Now take a breath and drink some water.”",
    },
    audioQuote: "“Trust yourself like I always did. You’ve got this, sweetheart.”",
    voiceNoteLength: "0:44",
  },
  {
    id: 'mentors',
    category: 'Mentors & Teachers',
    roleTitle: 'Teachers & Guides',
    subtitle: 'The intellectual spark and disciplined clarity of someone who shaped your worldview.',
    description:
      'Preserve the rigorous advice, recommended books, philosophical insights, and honest critique of the mentor who altered the course of your life. Return to their counsel when facing career forks or creative blocks.',
    tags: ['Intellectual Honesty', 'Craft Guidance', 'Book Recommendations', 'Long-term Thinking'],
    image: mentorImg,
    altText: 'Distinguished silver-haired professor with thoughtful, kind eyes',
    sampleDialogue: {
      question: "“Professor, I feel like my current work lacks depth.”",
      answer: "“Good. That discomfort means your taste has outgrown your current execution. Go back to first principles and don't rush the foundation.”",
    },
    audioQuote: "“That discomfort means your taste has outgrown your execution.”",
    voiceNoteLength: "0:51",
  },
  {
    id: 'friends',
    category: 'Lifelong Friends',
    roleTitle: 'Childhood & Dearest Friends',
    subtitle: 'The inside jokes, shared road trips, and unspoken understanding of a companion.',
    description:
      'Capture the playful banter, music tastes, shared memories, and effortless rapport of a friend who knew every secret. A sanctuary to reminisce over old escapades or share moments you wish they were here to see.',
    tags: ['Inside Jokes', 'Late Night Drives', 'Shared Playlists', 'Unfiltered Banter'],
    image: friendImg,
    altText: 'Young woman smiling warmly in coastal late afternoon light',
    sampleDialogue: {
      question: "“Do you remember that broken-down motel in Santa Fe?”",
      answer: "“Are you kidding? The neon sign buzzed all night and we survived on diner pie! Best trip of our lives. I’d do it again in a heartbeat.”",
    },
    audioQuote: "“Best trip of our lives. We survived on diner pie!”",
    voiceNoteLength: "0:36",
  },
];

export const WhatIsEvernear: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayingSample, setIsPlayingSample] = useState(false);

  const current = PERSONA_LIST[activeIndex];

  const handlePrev = () => {
    stopVoicePlayback();
    setIsPlayingSample(false);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : PERSONA_LIST.length - 1));
  };

  const handleNext = () => {
    stopVoicePlayback();
    setIsPlayingSample(false);
    setActiveIndex((prev) => (prev < PERSONA_LIST.length - 1 ? prev + 1 : 0));
  };

  const toggleSampleVoice = () => {
    if (isPlayingSample) {
      stopVoicePlayback();
      setIsPlayingSample(false);
    } else {
      const isGrandpa = current.id === 'grandparents';
      const isMother = current.id === 'parents';
      const isMentor = current.id === 'mentors';
      
      playVoiceSnippet(
        current.audioQuote,
        {
          pitch: isGrandpa ? 0.82 : isMother ? 1.12 : isMentor ? 0.95 : 1.05,
          rate: isGrandpa ? 0.85 : isMentor ? 0.9 : 0.92,
          genderPreference: (isMother || current.id === 'friends') ? 'female' : 'male',
        },
        () => setIsPlayingSample(true),
        () => setIsPlayingSample(false)
      );
    }
  };

  return (
    <section id="what-it-is" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header with balanced wrap and signature teal highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="text-xs font-semibold tracking-wider text-teal-800 uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span>Honoring Unique Souls</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            Remember them as they{' '}
            <span className="text-[#0D9488]">truly were.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Not a synthetic chatbot, but an intimate living tribute tuned to their authentic voice, cherished stories, unique humor, and deep personal connection.
          </p>
        </motion.div>

        {/* Interactive Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar"
        >
          {PERSONA_LIST.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setIsPlayingSample(false);
                  setActiveIndex(idx);
                }}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 shadow-xs'
                }`}
              >
                {item.category}
              </button>
            );
          })}
        </motion.div>

        {/* Massive Elegant Rounded Showcase Card */}
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl md:rounded-[36px] bg-white border border-neutral-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          
          {/* Internal teal glow behind the portrait on the right */}
          <div 
            className="absolute top-0 right-0 w-[55%] h-full pointer-events-none glow-teal-subtle opacity-75 -z-0"
            aria-hidden="true" 
          />

          {/* Dotted trajectory path across the container */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
            fill="none"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            <path
              d="M500 450 C 650 480, 850 350, 950 120"
              stroke="#0D9488"
              strokeOpacity="0.2"
              strokeWidth="1.5"
              className="memory-trajectory-dash"
            />
            <circle cx="950" cy="120" r="3.5" fill="#0D9488" />
            <circle cx="700" cy="420" r="2.5" fill="#14B8A6" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.div 
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-5 sm:p-10 lg:p-16 items-center"
            >
              
              {/* Left Content Column */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-teal-800 font-semibold mb-2">
                    Archetype {activeIndex + 1} of {PERSONA_LIST.length}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
                    {current.roleTitle}
                  </h3>
                  <p className="mt-2 text-base text-neutral-500 font-normal">
                    {current.subtitle}
                  </p>
                </div>

                <p className="text-neutral-700 leading-relaxed text-base">
                  {current.description}
                </p>

                {/* Memory facet chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-neutral-700 bg-neutral-100/90 border border-neutral-200/60 rounded-md px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Sample Dialogue Excerpt Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                    <span className="flex items-center gap-1.5 text-neutral-800">
                      <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
                      Living Exchange Sample
                    </span>
                    <span>Audio & Text</span>
                  </div>
                  <div className="text-xs text-neutral-600 italic">
                    {current.sampleDialogue.question}
                  </div>
                  <div className="text-xs font-medium text-neutral-900 border-l-2 border-teal-600 pl-3 leading-relaxed">
                    {current.sampleDialogue.answer}
                  </div>
                </div>

                {/* Audio reflection preview + Pagination Controls */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Spoken Reflection Button */}
                  <button
                    onClick={toggleSampleVoice}
                    className="inline-flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 sm:py-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200/80 text-xs font-medium transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                      {isPlayingSample ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 ml-0.5" />}
                    </div>
                    <span>{isPlayingSample ? 'Pause Voice Preview' : 'Hear Sample Voice'}</span>
                    <span className="text-teal-700/70 font-mono text-[11px]">({current.voiceNoteLength})</span>
                  </button>

                  {/* Pagination Controls */}
                  <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous persona"
                      className="w-9 h-9 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors shadow-xs cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <span className="text-xs font-mono font-medium text-neutral-600 tracking-wider">
                      {activeIndex + 1} / {PERSONA_LIST.length}
                    </span>

                    <button
                      onClick={handleNext}
                      aria-label="Next persona"
                      className="w-9 h-9 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors shadow-xs cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

              {/* Right Visual Column: Large Portrait Frame */}
              <div className="lg:col-span-6 relative flex justify-center">
                <div className="relative w-full max-w-[460px] aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-neutral-100">
                  <img
                    src={current.image}
                    alt={current.altText}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter saturate-[0.96] transition-all duration-500"
                  />
                  
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                  
                  {/* Overlay Quote Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-lg">
                    <div className="flex items-center gap-2 text-teal-800 text-xs font-semibold mb-1">
                      <Heart className="w-3.5 h-3.5 text-teal-600 fill-teal-600/30" />
                      <span>Memory Voice Capsule</span>
                    </div>
                    <p className="text-xs italic text-neutral-700 leading-snug">
                      {current.audioQuote}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};
