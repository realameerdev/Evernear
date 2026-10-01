import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Shield, RefreshCw, Bookmark, Volume2, Play, Pause, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreatedPerson } from '../types/person.ts';
import { generateRecreationResponse } from '../utils/aiRecreationEngine.ts';
import { appendMessageToHistory } from '../utils/vaultStorage.ts';
import { playVoiceSnippet, stopVoicePlayback, detectPersonGender } from '../utils/voiceSynthesis.ts';

interface ConversationDialogProps {
  person: CreatedPerson | null;
  isOpen: boolean;
  onClose: () => void;
  onPersonUpdated?: (updatedPerson: CreatedPerson) => void;
}

export const ConversationDialog: React.FC<ConversationDialogProps> = ({
  person: initialPerson,
  isOpen,
  onClose,
  onPersonUpdated,
}) => {
  const [person, setPerson] = useState<CreatedPerson | null>(initialPerson);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPerson(initialPerson);
  }, [initialPerson]);

  useEffect(() => {
    return () => {
      stopVoicePlayback();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [person?.conversationHistory, isTyping]);

  if (!isOpen || !person) return null;

  const messages = person.conversationHistory || [];

  const handleToggleSpeak = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      stopVoicePlayback();
      setSpeakingMsgId(null);
    } else {
      const gender = detectPersonGender(person);
      const isFemale = gender === 'female';
      
      playVoiceSnippet(
        text,
        {
          pitch: isFemale ? 1.15 : 0.84,
          rate: 0.88,
          genderPreference: isFemale ? 'female' : 'male',
        },
        () => setSpeakingMsgId(msgId),
        () => setSpeakingMsgId(null)
      );
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const userText = userInput.trim();
    setUserInput('');

    // Append user message immediately
    const updatedAfterUser = appendMessageToHistory(person.id, 'user', userText);
    if (updatedAfterUser) {
      setPerson(updatedAfterUser);
      if (onPersonUpdated) onPersonUpdated(updatedAfterUser);
    }

    setIsTyping(true);

    // Generate grounded response following ethical AI behavior rules
    setTimeout(() => {
      const { text, memoryReferenced } = generateRecreationResponse(person, userText);
      const updatedAfterAi = appendMessageToHistory(person.id, 'ai', text, memoryReferenced);
      if (updatedAfterAi) {
        setPerson(updatedAfterAi);
        if (onPersonUpdated) onPersonUpdated(updatedAfterAi);
      }
      setIsTyping(false);
    }, 750);
  };

  const initialGreeting = `Hello sweetheart. It’s so good to hear from you. I was just thinking about our times together.`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 border-b border-neutral-200/80 bg-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-200 shrink-0">
                <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 leading-tight">
                  {person.name}
                </h3>
                <p className="text-[11px] text-teal-800 font-medium">
                  {person.relationship} · AI Recreation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[11px] text-neutral-400 font-mono">Private Vault</span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-200/60 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                aria-label="Close conversation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conversation history area */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF8F5]/40">
            {/* Initial Welcome Bubble */}
            <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-xs p-4 border border-teal-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-teal-800">
                <div className="flex items-center gap-2">
                  <span>{person.name}</span>
                  <button
                    onClick={() => handleToggleSpeak('initial', initialGreeting)}
                    className="p-1 rounded-full hover:bg-teal-50 text-teal-700 transition-colors cursor-pointer"
                    title={speakingMsgId === 'initial' ? "Pause audio" : "Listen to response"}
                  >
                    {speakingMsgId === 'initial' ? <VolumeX className="w-3.5 h-3.5 text-teal-600 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5 text-teal-600" />}
                  </button>
                </div>
                <span className="text-[10px] text-neutral-400 font-normal">Sanctuary Open</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                {initialGreeting}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[10px] text-neutral-400 border-t border-neutral-100">
                <Bookmark className="w-3 h-3 text-teal-600" />
                <span>Grounded in: {person.personality.slice(0, 35)}...</span>
              </div>
            </div>

            {/* Conversation Flow */}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'ml-auto bg-neutral-900 text-white rounded-tr-xs shadow-xs'
                    : 'mr-auto bg-white border border-teal-200/80 text-neutral-800 rounded-tl-xs shadow-xs space-y-1.5'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                  <div className="flex items-center gap-2">
                    <span className={m.sender === 'user' ? 'text-neutral-400' : 'text-teal-800 font-semibold'}>
                      {m.sender === 'user' ? 'You' : person.name}
                    </span>
                    {m.sender === 'ai' && (
                      <button
                        onClick={() => handleToggleSpeak(m.id, m.text)}
                        className="p-0.5 rounded-full hover:bg-teal-50 text-teal-700 transition-colors cursor-pointer"
                        title={speakingMsgId === m.id ? "Pause audio" : "Listen to response"}
                      >
                        {speakingMsgId === m.id ? <VolumeX className="w-3 h-3 text-teal-600 animate-pulse" /> : <Volume2 className="w-3 h-3 text-teal-600" />}
                      </button>
                    )}
                  </div>
                  <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                </div>
                <p>{m.text}</p>
                {m.memoryReferenced && (
                  <div className="pt-1.5 border-t border-neutral-100 text-[10px] text-teal-700 flex items-center gap-1">
                    <Bookmark className="w-2.5 h-2.5" />
                    <span>{m.memoryReferenced}</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="mr-auto bg-white rounded-2xl p-3.5 border border-neutral-200 text-xs text-neutral-500 italic flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                <span>Reflecting through memories of {person.name}...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-5 py-2.5 bg-[#FAF8F5] border-t border-neutral-200/60 overflow-x-auto no-scrollbar flex items-center gap-2">
            {[
              "I miss you and wanted to say hello.",
              "What advice would you give me today?",
              "Tell me a memory you loved.",
            ].map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setUserInput(prompt)}
                className="px-3 py-1.5 rounded-full bg-white border border-neutral-200 hover:border-teal-300 text-[11px] text-neutral-600 hover:text-neutral-900 whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-4 sm:p-5 border-t border-neutral-200/80 bg-white space-y-2">
            <div className="relative">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={`Speak with ${person.name}...`}
                className="w-full pl-4 pr-12 py-3 rounded-full border border-neutral-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-[#FAF8F5]/50 focus:bg-white text-neutral-800"
                autoFocus
              />
              <button
                type="submit"
                disabled={!userInput.trim() || isTyping}
                className="absolute right-1.5 top-1.5 bottom-1.5 w-9 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-center text-[10px] text-neutral-400 flex items-center justify-center gap-1.5 px-2">
              <Shield className="w-3 h-3 text-teal-600 shrink-0" />
              <span className="truncate">Private AI Recreation · Grounded strictly in shared memories</span>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
