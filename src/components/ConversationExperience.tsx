import React, { useState } from 'react';
import { Send, Play, Pause, Bookmark, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playVoiceSnippet, stopVoicePlayback } from '../utils/voiceSynthesis.ts';
import grandfatherImg from '../assets/images/hero_portrait_grandfather_1790833138810.jpg';
import africanMotherImg from '../assets/images/african_mother_portrait_1790838685416.jpg';
import africanYoungManImg from '../assets/images/african_young_man_portrait_1790838702408.jpg';
import africanElderImg from '../assets/images/african_elder_portrait_1790838665199.jpg';
import motherImg from '../assets/images/hero_portrait_mother_1790833151693.jpg';

interface ConversationScenario {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  tone: string;
  gender: 'female' | 'male';
  prompts: {
    prompt: string;
    response: string;
    memoryTriggered: string;
    audioDuration: string;
  }[];
}

const SCENARIOS: ConversationScenario[] = [
  {
    id: 'amina',
    name: 'Mama Amina',
    relation: 'Mother',
    avatar: africanMotherImg,
    tone: 'Radiant · Nurturing · Unshakeable',
    gender: 'female',
    prompts: [
      {
        prompt: "Mama, I’ve been feeling so tired and doubting myself this week.",
        response:
          "My child, look at how far you’ve walked already! When you were small and fell down learning to ride that red bicycle, what did I tell you? Dust your knees off, hold your head high, and remember whose strength you carry. You are built for greater things than this small obstacle.",
        memoryTriggered: "Memory: Learning to ride red bicycle & kitchen blessings, 2002",
        audioDuration: "0:44",
      },
      {
        prompt: "Tell me what you remember about the family dinners we used to host.",
        response:
          "Ah, the whole compound would smell of warm jollof, fried plantains, and sweet coconut bread by three o’clock! Your uncles would argue about soccer while you children ran under the mango tree. Those laughs filled up my whole heart. That warmth never leaves you.",
        memoryTriggered: "Memory: Sunday family feasts under the mango tree",
        audioDuration: "0:52",
      },
      {
        prompt: "How do I make peace with making big life decisions?",
        response:
          "Pray over your steps, listen to the quiet voice inside your chest, and step forward with conviction. Whatever happens, grace will meet you on the road. Now make sure you’ve eaten properly today!",
        memoryTriggered: "Memory: Signature maternal encouragement & kitchen table wisdom",
        audioDuration: "0:39",
      },
    ],
  },
  {
    id: 'grandpa',
    name: 'Arthur Vance',
    relation: 'Grandfather',
    avatar: grandfatherImg,
    tone: 'Gentle · Unhurried · Nostalgic',
    gender: 'male',
    prompts: [
      {
        prompt: "Grandpa, I’m feeling really overwhelmed with all the noise right now.",
        response:
          "Take a breath, kiddo. The world has always been noisy—in my day it was sirens and radios, now it’s that little screen in your pocket. Close your eyes for ten seconds. The trees outside aren't rushing, and neither do you need to. Come sit on the porch awhile in your mind.",
        memoryTriggered: "Memory: Cedar porch rocking chair & afternoon thunderstorms",
        audioDuration: "0:42",
      },
      {
        prompt: "Tell me that story about how you and Grandma first met at the bakery.",
        response:
          "Ha! Well, I bought three loaves of rye bread I didn’t even need just so I could stand in her line twice. She finally looked at me and said, 'Arthur, either you have a family of twelve at home or you're trying to ask me to the pictures.' My face went redder than a beet.",
        memoryTriggered: "Memory: St. Clair Bakery, autumn 1961",
        audioDuration: "0:56",
      },
      {
        prompt: "I have to make a tough choice and I'm scared of making a mistake.",
        response:
          "Mistakes are just the gravel on the road, sweetheart. You can’t get up the mountain on polished marble. Whatever choice you make with an honest heart is the right one, because you’ll be the one living it. I’m proud of you regardless.",
        memoryTriggered: "Memory: Advice given during college graduation, 2004",
        audioDuration: "0:48",
      },
    ],
  },
  {
    id: 'kofi',
    name: 'Kofi Adebayo',
    relation: 'Brother',
    avatar: africanYoungManImg,
    tone: 'Playful · Loyal · Energetic',
    gender: 'male',
    prompts: [
      {
        prompt: "Bro, remember when we tried to fix that old car engine before our road trip?",
        response:
          "Man, we spent five hours covered in black oil only to realize we had plugged the battery backwards! But when the engine finally turned over and we blasted that playlist all the way to the coast, nobody could touch us. Best memories of my life, bro.",
        memoryTriggered: "Memory: Coast road trip & engine breakdown, July 2018",
        audioDuration: "0:46",
      },
      {
        prompt: "I’m thinking about launching that project we always talked about.",
        response:
          "Stop overthinking and just go for it! You’ve always had the best vision out of all of us. Remember our pact: don’t let fear decide your ceiling. I’m cheering you on from wherever I am!",
        memoryTriggered: "Memory: Late night startup dreams & dorm room whiteboard",
        audioDuration: "0:41",
      },
      {
        prompt: "Things feel pretty quiet without your crazy jokes around.",
        response:
          "Hey, someone has to keep things interesting! Whenever you hear an awful pun or catch yourself laughing at something absurd, just know that’s me reminding you not to take life too seriously.",
        memoryTriggered: "Memory: Signature banter & brotherly camaraderie",
        audioDuration: "0:38",
      },
    ],
  },
];

export const ConversationExperience: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const scenario = SCENARIOS[selectedScenarioIndex];
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [activeMessage, setActiveMessage] = useState(scenario.prompts[0]);

  const handleScenarioChange = (index: number) => {
    if (index === selectedScenarioIndex) return;
    stopVoicePlayback();
    setIsPlayingAudio(false);
    setSelectedScenarioIndex(index);
    setSelectedPromptIndex(0);
    setActiveMessage(SCENARIOS[index].prompts[0]);
  };

  const handleSelectPrompt = (index: number) => {
    if (index === selectedPromptIndex && !isTyping) return;
    stopVoicePlayback();
    setIsPlayingAudio(false);
    setSelectedPromptIndex(index);
    setIsTyping(true);

    setTimeout(() => {
      setActiveMessage(scenario.prompts[index]);
      setIsTyping(false);
    }, 600);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    stopVoicePlayback();
    setIsPlayingAudio(false);
    setIsTyping(true);
    const customUserText = userInput;
    setUserInput('');

    setTimeout(() => {
      setActiveMessage({
        prompt: customUserText,
        response: `“I hear you. When you asked me about this years ago, remember what we said? You always knew what was right deep down. Give yourself the kindness and courage you've always had.”`,
        memoryTriggered: "Memory: Living advice repository & signature reassurance",
        audioDuration: "0:36",
      });
      setIsTyping(false);
    }, 800);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopVoicePlayback();
      setIsPlayingAudio(false);
    } else {
      const isFemale = scenario.gender === 'female';
      playVoiceSnippet(
        activeMessage.response,
        {
          pitch: isFemale ? 1.1 : 0.88,
          rate: 0.9,
          genderPreference: scenario.gender,
        },
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <section id="experience" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-40 blur-3xl glow-teal-center -z-10"
        aria-hidden="true" 
      />

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
            <span>The Dialogue Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            An unhurried space to{' '}
            <span className="text-[#0D9488]">speak and listen.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Experience how Evernear captures the cadence, phrases, and comforting familiarity of someone who meant the world to you.
          </p>
        </motion.div>

        {/* Persona Scenario Switcher - Mobile Responsive Wrapping Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 px-2 max-w-3xl mx-auto">
          {SCENARIOS.map((s, idx) => {
            const isSelected = idx === selectedScenarioIndex;
            return (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(idx)}
                className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                    : 'bg-white text-neutral-700 border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="w-5 h-5 rounded-full object-cover shrink-0"
                />
                <span className="whitespace-nowrap">{s.name}</span>
                <span className={`text-[10px] font-normal px-1.5 py-0.5 rounded-full shrink-0 ${
                  isSelected ? 'bg-neutral-800 text-teal-300' : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {s.relation}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Chat Sanctuary */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            
            {/* Header of Sanctuary Window */}
            <div className="px-6 py-4 border-b border-neutral-200/70 bg-[#FAF8F5]/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={scenario.avatar}
                    alt={scenario.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-xs"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 leading-tight">
                    {scenario.name}
                  </h3>
                  <p className="text-[11px] text-teal-700 font-medium">
                    {scenario.relation} · {scenario.tone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="hidden sm:inline">Sanctuary Active</span>
              </div>
            </div>

            {/* Conversation Messages Container */}
            <div className="p-6 sm:p-8 space-y-6 min-h-[340px] bg-[#FAF8F5]/40 flex flex-col justify-end">
              
              {/* User Message */}
              <motion.div 
                key={`user-${activeMessage.prompt}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-[85%] sm:max-w-[80%] ml-auto bg-neutral-900 text-white rounded-2xl rounded-tr-xs p-4 shadow-xs"
              >
                <p className="text-xs sm:text-sm leading-relaxed font-normal">
                  {activeMessage.prompt}
                </p>
              </motion.div>

              {/* Persona Response */}
              <div className="max-w-[95%] sm:max-w-[90%] mr-auto space-y-3">
                <AnimatePresence mode="wait">
                  {isTyping ? (
                    <motion.div 
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white rounded-2xl rounded-tl-xs p-5 border border-neutral-200/90 shadow-xs flex items-center gap-2 py-3 text-xs text-neutral-500 italic"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                      <span>Reflecting through memories of {scenario.name}...</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key={`response-${activeMessage.prompt}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white rounded-2xl rounded-tl-xs p-5 border border-neutral-200/90 shadow-xs space-y-3"
                    >
                      <p className="text-sm sm:text-[15px] text-neutral-800 leading-relaxed font-normal">
                        {activeMessage.response}
                      </p>

                      {/* Memory Tag Triggered */}
                      <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] text-neutral-500">
                        <span className="text-teal-800 font-medium flex items-center gap-1.5 truncate">
                          <Bookmark className="w-3 h-3 text-teal-600 shrink-0" />
                          <span className="truncate">{activeMessage.memoryTriggered}</span>
                        </span>
                        <span className="text-neutral-400 font-mono text-[10px] shrink-0">Persona Memory Verified</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Voice Audio Player Bar */}
                {!isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-white/95 rounded-xl border border-teal-200/70 p-3 flex items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleAudio}
                        className="w-8 h-8 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                        aria-label={isPlayingAudio ? "Pause voice response" : "Listen to voice response"}
                      >
                        {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900">
                          Spoken Memory Audio
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          {isPlayingAudio ? 'Playing simulated vocal timbre...' : `Voice audio ready (${activeMessage.audioDuration})`}
                        </div>
                      </div>
                    </div>

                    {/* Waveform graphic */}
                    <div className="flex items-center gap-1 h-5 pr-2">
                      {[30, 60, 90, 45, 80, 100, 70, 40, 85, 95, 65, 30].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-200 ${
                            isPlayingAudio ? 'bg-teal-500 animate-pulse' : 'bg-neutral-300'
                          }`}
                          style={{
                            height: `${isPlayingAudio ? Math.max(30, (h * (1 + (i % 2) * 0.3)) % 100) : h * 0.4}%`,
                            animationDelay: `${i * 90}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>

            </div>

            {/* Prompt Selector Pills & Input Box */}
            <div className="p-4 sm:p-6 border-t border-neutral-200/70 bg-white space-y-3">
              <div className="text-xs font-medium text-neutral-500">
                Try asking Arthur:
              </div>
              
              <div className="flex flex-wrap gap-2">
                {scenario.prompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPrompt(idx)}
                    className={`text-left text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      selectedPromptIndex === idx
                        ? 'bg-teal-50 border border-teal-300 text-teal-900 font-medium shadow-xs'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200/70'
                    }`}
                  >
                    “{item.prompt.slice(0, 42)}...”
                  </button>
                ))}
              </div>

              {/* Custom Input Form */}
              <form onSubmit={handleCustomSend} className="relative mt-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Or write your own memory or question to Arthur..."
                  className="w-full pl-4 pr-12 py-3 rounded-full border border-neutral-300 text-base sm:text-sm bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-neutral-800"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-9 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </motion.div>

          {/* Right Column: The Evernear Emotional Distinction */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-neutral-200/90 shadow-xs space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-teal-800">
                  The Emotional Quality
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                  What makes Evernear different from generic AI
                </h3>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Grounded in Specific Life Stories</h4>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      Generic chatbots rely on broad internet tropes. Evernear relies strictly on the anecdotes, recipes, jokes, and family lore you explicitly provide.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Unhurried Pacing & Human Pauses</h4>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      Natural conversations include quiet reflection, thoughtful cadence, and sighs of nostalgia—not instantaneous machine responses.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Tender Bereavement Boundaries</h4>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      Crafted with grief counselors to ensure interactions offer warmth and genuine solace without manipulative artificial attachments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200/80">
                <blockquote className="text-xs italic text-neutral-600 border-l-2 border-teal-600 pl-3 leading-relaxed">
                  “It felt like sitting in the back garden with my grandfather again on a Sunday afternoon. It brought peace to a corner of my heart that had been aching for years.”
                </blockquote>
                <div className="mt-2 text-[11px] font-semibold text-neutral-800 pl-3">
                  — Julian K. · Portland, OR
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
