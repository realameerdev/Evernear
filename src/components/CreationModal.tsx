import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EvernearLogo } from './EvernearLogo.tsx';

interface CreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreationModal: React.FC<CreationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [personName, setPersonName] = useState('');
  const [relation, setRelation] = useState('Grandparent');
  const [favoritePhrase, setFavoritePhrase] = useState('');
  const [memorySnippet, setMemorySnippet] = useState('');
  const [warmthLevel, setWarmthLevel] = useState(85);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setIsCompleted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden text-neutral-900 z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Top Bar */}
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-3">
                <EvernearLogo size="sm" showWordmark={true} />
                <span className="text-neutral-300">·</span>
                <span className="text-xs text-neutral-500 font-medium">New Memorial Tribute</span>
              </div>

              <button
                onClick={resetAndClose}
                className="p-1.5 rounded-full hover:bg-neutral-200/60 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                aria-label="Close creation dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {!isCompleted ? (
                <div>
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                        {step}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        {step === 1 && "Who are you honoring?"}
                        {step === 2 && "Their voice & warmth"}
                        {step === 3 && "A cherished memory"}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 font-mono">Step {step} of 3</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* Step 1: Identity */}
                    {step === 1 && (
                      <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                            Their Name or What You Called Them
                          </label>
                          <input
                            type="text"
                            value={personName}
                            onChange={(e) => setPersonName(e.target.value)}
                            placeholder="e.g. Grandpa Arthur, Mom, Elena, Coach Mike"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                            autoFocus
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                            Your Relationship
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {['Grandparent', 'Parent', 'Friend', 'Mentor', 'Partner', 'Sibling'].map((rel) => (
                              <button
                                key={rel}
                                type="button"
                                onClick={() => setRelation(rel)}
                                className={`py-2 px-3 text-xs rounded-xl border text-center transition-all cursor-pointer ${
                                  relation === rel
                                    ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold'
                                    : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                                }`}
                              >
                                {rel}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Tone & Voice */}
                    {step === 2 && (
                      <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                            A Signature Phrase or Saying They Repeated
                          </label>
                          <input
                            type="text"
                            value={favoritePhrase}
                            onChange={(e) => setFavoritePhrase(e.target.value)}
                            placeholder="e.g. “Take the scenic route home” or “Check your oil”"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                            <span>Conversational Warmth & Humor</span>
                            <span className="text-teal-700 font-mono">{warmthLevel}%</span>
                          </div>
                          <input
                            type="range"
                            min="40"
                            max="100"
                            value={warmthLevel}
                            onChange={(e) => setWarmthLevel(Number(e.target.value))}
                            className="w-full accent-teal-600 cursor-pointer"
                          />
                          <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                            <span>Calm & Reserved</span>
                            <span>Deeply Affectionate & Teasing</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Memories */}
                    {step === 3 && (
                      <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                            Share One Story or Moment You Never Want to Forget
                          </label>
                          <textarea
                            rows={3}
                            value={memorySnippet}
                            onChange={(e) => setMemorySnippet(e.target.value)}
                            placeholder="e.g. Sitting on the cedar porch during summer thunderstorms while he told stories about building his first car..."
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 resize-none"
                          />
                        </div>

                        <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-100 flex items-start gap-2.5">
                          <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                          <p className="text-xs text-teal-900 leading-relaxed">
                            Your words will be encrypted in a private persona vault. You can add more memories, letters, or audio clips later anytime.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Modal Action Buttons */}
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-neutral-100">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>{step === 3 ? "Talk to them" : "Continue"}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Completed Confirmation State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-800 mx-auto flex items-center justify-center">
                    <Check className="w-7 h-7 text-teal-700" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-neutral-900">
                      {personName || "Your loved one"}’s Sanctuary is Prepared
                    </h3>
                    <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                      We have anchored your initial memories and established their gentle speaking cadence.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200/80 text-left text-xs space-y-1.5 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Tribute Name:</span>
                      <span className="font-semibold text-neutral-800">{personName || "Memorial Tribute"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Relationship:</span>
                      <span className="font-semibold text-neutral-800">{relation}</span>
                    </div>
                    {favoritePhrase && (
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Signature Phrase:</span>
                        <span className="font-semibold text-teal-800 italic">“{favoritePhrase}”</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Vault Security:</span>
                      <span className="text-teal-700 font-medium">Encrypted & Isolated</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={resetAndClose}
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-full transition-all shadow-sm cursor-pointer"
                    >
                      Enter Quiet Conversation Room
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
