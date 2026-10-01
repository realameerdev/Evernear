import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Upload, Shield, Check, Heart, X, Circle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { EvernearLogo } from './EvernearLogo.tsx';
import { CreatedPerson } from '../types/person.ts';
import { savePersonToVault } from '../utils/vaultStorage.ts';

// Preset memorial portraits for easy testing or fallback
import grandfatherImg from '../assets/images/hero_portrait_grandfather_1790833138810.jpg';
import motherImg from '../assets/images/hero_portrait_mother_1790833151693.jpg';
import mentorImg from '../assets/images/showcase_portrait_mentor_1790833162721.jpg';
import friendImg from '../assets/images/experience_portrait_friend_1790833172428.jpg';
import africanElderImg from '../assets/images/african_elder_portrait_1790838665199.jpg';
import africanMotherImg from '../assets/images/african_mother_portrait_1790838685416.jpg';
import africanYoungManImg from '../assets/images/african_young_man_portrait_1790838702408.jpg';
import africanGirlImg from '../assets/images/african_girl_portrait_1790838715303.jpg';

interface CreateSomeoneFlowProps {
  onCancel: () => void;
  onPersonCreated: (person: CreatedPerson) => void;
}

const STEPS = [
  { id: 1, label: 'About them', subtitle: 'Identity & Photo' },
  { id: 2, label: 'Their personality', subtitle: 'Spirit & Voice' },
  { id: 3, label: 'Memories', subtitle: 'Stories & Lore' },
  { id: 4, label: 'Ready to talk', subtitle: 'Review & Connect' },
];

const PRESET_PHOTOS = [
  { name: 'Baba / Elder', url: africanElderImg },
  { name: 'Mama / Mother', url: africanMotherImg },
  { name: 'Brother / Friend', url: africanYoungManImg },
  { name: 'Little Sister / Child', url: africanGirlImg },
  { name: 'Grandpa Arthur', url: grandfatherImg },
  { name: 'Mother Eleanor', url: motherImg },
  { name: 'Mentor David', url: mentorImg },
  { name: 'Friend Maya', url: friendImg },
];

export const CreateSomeoneFlow: React.FC<CreateSomeoneFlowProps> = ({
  onCancel,
  onPersonCreated,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Grandparent');
  const [gender, setGender] = useState<'female' | 'male' | 'other'>('male');
  const [customRelation, setCustomRelation] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string>(grandfatherImg);
  const [isCustomPhoto, setIsCustomPhoto] = useState(false);

  // Living Person authorization state
  const [isLiving, setIsLiving] = useState(false);
  const [livingConsentConfirmed, setLivingConsentConfirmed] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Conversational text areas
  const [personality, setPersonality] = useState('');
  const [voiceDescription, setVoiceDescription] = useState('');
  const [memories, setMemories] = useState('');

  // Handle photo upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          setIsCustomPhoto(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    setValidationError('');

    // If living person, enforce explicit authorization
    if (currentStep === 1 && isLiving && !livingConsentConfirmed) {
      setValidationError('Please confirm that you have explicit authorization from this living person before proceeding.');
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finalize and save
      const effectiveRelation = relationship === 'Other' && customRelation.trim() 
        ? customRelation.trim() 
        : relationship;

      const newPerson = savePersonToVault({
        name: name.trim() || 'Someone Cherished',
        relationship: effectiveRelation || 'Loved One',
        gender: gender,
        photoUrl: photoUrl || (gender === 'female' ? motherImg : grandfatherImg),
        personality: personality.trim() || 'Gentle, thoughtful, and unhurried warmth.',
        voiceDescription: voiceDescription.trim() || (gender === 'female' ? 'A warm, soothing feminine cadence with comforting familiarity.' : 'A calm, steady baritone cadence with comforting familiarity.'),
        memories: memories.trim() || 'Treasured memories of shared laughter and quiet conversations.',
        isLiving,
        livingConsentConfirmed: isLiving ? livingConsentConfirmed : false,
      });

      onPersonCreated(newPerson);
    }
  };

  const handleBack = () => {
    setValidationError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCancel();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Top Bar with brand and subtle progress indicator */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-neutral-200/60 px-4 sm:px-12 py-3.5 sm:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onCancel}
              className="flex items-center group transition-opacity hover:opacity-80 cursor-pointer"
              aria-label="Return home"
            >
              <EvernearLogo size="sm" showWordmark={true} />
            </button>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
              Talk to someone
            </span>
          </div>

          <button
            onClick={onCancel}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 px-3 py-1.5 rounded-full hover:bg-neutral-200/50 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Exit</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editorial Progress Indicator: About them → Their personality → Memories → Ready to talk */}
        <div className="max-w-4xl mx-auto mt-3 sm:mt-4 pt-3 border-t border-neutral-200/40">
          <div className="flex items-center justify-between">
            {STEPS.map((s, idx) => {
              const isCurrent = s.id === currentStep;
              const isPast = s.id < currentStep;
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-medium transition-all ${
                        isCurrent
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : isPast
                          ? 'bg-teal-600 text-white'
                          : 'bg-neutral-200 text-neutral-500'
                      }`}
                    >
                      {isPast ? <Check className="w-3.5 h-3.5" /> : s.id}
                    </span>
                    <span
                      className={`text-xs font-medium hidden sm:inline transition-colors ${
                        isCurrent ? 'text-neutral-900 font-semibold' : 'text-neutral-500'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>

                  {idx < STEPS.length - 1 && (
                    <div
                      className={`h-[1.5px] flex-1 mx-2 sm:mx-4 transition-colors ${
                        isPast ? 'bg-teal-500' : 'bg-neutral-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Form Canvas */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 sm:px-6 sm:py-16">
        
        {/* Step 1: About Them */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-teal-800 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                Step 1 of 4
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Tell us about someone you hold dear.
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed">
                Choose and prepare someone meaningful you want to talk to. Even a simple nickname or family photo helps anchor their presence.
              </p>
            </div>

            {/* Photo Selection Area */}
            <div className="p-5 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                  Their Photo
                </label>
                <p className="text-xs text-neutral-500">
                  Upload a photo to be used as their appearance reference, or select a sample portrait for now.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Active Photo Preview */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-neutral-100 border-2 border-teal-500/50 shadow-md shrink-0">
                  <img
                    src={photoUrl}
                    alt="Selected tribute portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  {isCustomPhoto && (
                    <div className="absolute top-1.5 right-1.5 bg-teal-600 text-white rounded-full p-1 shadow-xs">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Upload Button & Presets */}
                <div className="space-y-4 w-full text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload their photo</span>
                    </button>
                    <span className="text-xs text-neutral-400">JPG, PNG, WebP</span>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-500 mb-2 font-medium">Or select an archetypal portrait:</p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                      {PRESET_PHOTOS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setPhotoUrl(preset.url);
                            setIsCustomPhoto(false);
                          }}
                          className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            photoUrl === preset.url && !isCustomPhoto
                              ? 'border-teal-600 scale-105 shadow-xs'
                              : 'border-transparent hover:opacity-80'
                          }`}
                          title={preset.name}
                        >
                          <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Name & Relationship Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
                  What was their name, or what did you call them?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dad, Grandma, Sarah, Michael, Grandpa Art"
                  className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-[#FAF8F5]/50 focus:bg-white transition-all text-neutral-900 font-medium placeholder:text-neutral-400"
                  autoFocus
                />
              </div>

              {/* Relationship Chips */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
                  Relationship
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Father', 'Mother', 'Grandparent', 'Friend', 'Partner', 'Sibling', 'Mentor', 'Other'].map((rel) => {
                    const isSelected = relationship === rel;
                    return (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => {
                          setRelationship(rel);
                          if (rel === 'Mother') {
                            setGender('female');
                            if (!isCustomPhoto) setPhotoUrl(motherImg);
                          } else if (rel === 'Father') {
                            setGender('male');
                            if (!isCustomPhoto) setPhotoUrl(grandfatherImg);
                          }
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-teal-700 text-white shadow-xs'
                            : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 border border-neutral-200/80'
                        }`}
                      >
                        {rel}
                      </button>
                    );
                  })}
                </div>

                {relationship === 'Other' && (
                  <input
                    type="text"
                    value={customRelation}
                    onChange={(e) => setCustomRelation(e.target.value)}
                    placeholder="Specify connection (e.g. Godmother, Childhood Coach)"
                    className="mt-3 w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                  />
                )}
              </div>

              {/* Voice & Persona Gender Selection */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                    Voice & Persona Gender
                  </label>
                  <span className="text-[11px] text-teal-800 font-medium">Controls Vocal Timbre</span>
                </div>
                <p className="text-xs text-neutral-500 mb-3">
                  Select how Evernear should voice their reflections and audio responses:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setGender('female');
                      if (!isCustomPhoto && photoUrl === grandfatherImg) setPhotoUrl(motherImg);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      gender === 'female'
                        ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20 shadow-xs'
                        : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">Female Voice</span>
                      {gender === 'female' && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                    </div>
                    <span className="text-[11px] text-neutral-500 leading-tight">
                      Warm, gentle feminine tone
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGender('male');
                      if (!isCustomPhoto && photoUrl === motherImg) setPhotoUrl(grandfatherImg);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      gender === 'male'
                        ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20 shadow-xs'
                        : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">Male Voice</span>
                      {gender === 'male' && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                    </div>
                    <span className="text-[11px] text-neutral-500 leading-tight">
                      Deep, steady baritone tone
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender('other')}
                    className={`col-span-2 sm:col-span-1 p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      gender === 'other'
                        ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20 shadow-xs'
                        : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">Neutral</span>
                      {gender === 'other' && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                    </div>
                    <span className="text-[11px] text-neutral-500 leading-tight">
                      Balanced cadence
                    </span>
                  </button>
                </div>
              </div>

              {/* Living Person Authorization Policy */}
              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isLiving}
                    onChange={(e) => {
                      setIsLiving(e.target.checked);
                      if (!e.target.checked) setLivingConsentConfirmed(false);
                    }}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-neutral-300 cursor-pointer"
                  />
                  <span className="text-xs text-neutral-700 font-medium">
                    This recreation represents someone who is currently living
                  </span>
                </label>

                {isLiving && (
                  <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-2">
                    <p className="text-xs text-teal-950 leading-relaxed">
                      <strong>Living Person Policy:</strong> Evernear requires appropriate authorization before creating a realistic likeness or voice recreation of a living individual.
                    </p>
                    <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={livingConsentConfirmed}
                        onChange={(e) => setLivingConsentConfirmed(e.target.checked)}
                        className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-neutral-300 mt-0.5 cursor-pointer"
                      />
                      <span className="text-xs text-teal-900 font-medium">
                        I confirm I have explicit permission and authorization from this person to create this private personal recreation.
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {validationError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Their Personality & Voice */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-teal-800 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                Step 2 of 4
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Their personality and voice.
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed">
                Describe how they were in everyday moments and how their voice felt. Write naturally in your own words.
              </p>
            </div>

            {/* Field 1: Personality */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                    What were they like?
                  </label>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    warm, funny, quiet, protective, playful, serious, gentle...
                  </p>
                </div>
                <span className="text-[11px] text-teal-800 font-medium">Conversational</span>
              </div>

              <textarea
                rows={4}
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="e.g. Warm and patient, with a quiet sense of humor. Never raised his voice. Could sit on the porch for hours watching the rain and always listened before giving advice."
                className="w-full px-4 py-3.5 rounded-2xl border border-neutral-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-[#FAF8F5]/40 focus:bg-white transition-all text-neutral-900 leading-relaxed resize-y"
              />

              {/* Quick inspiration chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-400 font-medium">Inspirations:</span>
                {[
                  "Warm & protective",
                  "Playful & teasing",
                  "Quiet listener",
                  "Fiercely honest",
                  "Gentle & unhurried",
                ].map((promptText) => (
                  <button
                    key={promptText}
                    type="button"
                    onClick={() => setPersonality((prev) => prev ? `${prev} ${promptText}.` : `${promptText}.`)}
                    className="px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-[11px] transition-colors cursor-pointer"
                  >
                    + {promptText}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2: Voice */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                    How did they sound?
                  </label>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    deep, soft, calm, energetic, slow, playful, Nigerian accent, Midwestern lilt...
                  </p>
                </div>
                <span className="text-[11px] text-neutral-400">Optional</span>
              </div>

              <textarea
                rows={3}
                value={voiceDescription}
                onChange={(e) => setVoiceDescription(e.target.value)}
                placeholder="e.g. Deep, raspy baritone with a slow, reassuring cadence. Always chuckled softly before telling a joke, and spoke with deliberate thoughtfulness."
                className="w-full px-4 py-3.5 rounded-2xl border border-neutral-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-[#FAF8F5]/40 focus:bg-white transition-all text-neutral-900 leading-relaxed resize-y"
              />
            </div>
          </motion.div>
        )}

        {/* Step 3: Memories */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-teal-800 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                Step 3 of 4
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                What should Evernear remember?
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed">
                Add a few meaningful memories, stories, phrases, habits, or things you remember about them.
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                    Memories, Stories & Sayings
                  </label>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Things they always repeated, shared road trips, Sunday traditions, favorite recipes...
                  </p>
                </div>
                <span className="text-[11px] text-teal-800 font-medium">Core Lore</span>
              </div>

              <textarea
                rows={5}
                value={memories}
                onChange={(e) => setMemories(e.target.value)}
                placeholder="e.g. He taught me to drive the old pickup in 1994. Every Sunday morning he made buttermilk waffles from an old handwritten recipe card. He always repeated: 'Take the quiet road home, kiddo. The world can wait an hour.'"
                className="w-full px-4 py-3.5 rounded-2xl border border-neutral-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-[#FAF8F5]/40 focus:bg-white transition-all text-neutral-900 leading-relaxed resize-y"
              />

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
                <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <p className="text-xs text-teal-900 leading-relaxed">
                  Evernear uses these memories strictly to ground their conversations. You can always add more memories from their profile later.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Sanctuary Review & Create */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-3 text-center max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-teal-800 font-semibold flex items-center justify-center gap-2">
                <Heart className="w-3.5 h-3.5 text-teal-600" />
                Final Step
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Introducing {name.trim() || 'them'} to Evernear.
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed">
                Review their tribute before establishing their encrypted memory sanctuary.
              </p>
            </div>

            {/* Memorial Tribute Summary Card */}
            <div className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-5 sm:p-10 overflow-hidden">
              <div 
                className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none glow-teal-subtle opacity-70"
                aria-hidden="true" 
              />

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Photo */}
                <div className="sm:col-span-4 flex justify-center sm:justify-start">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-white shadow-xl bg-neutral-100">
                    <img
                      src={photoUrl}
                      alt={name || 'Tribute'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="sm:col-span-8 space-y-3 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80">
                      {relationship === 'Other' && customRelation ? customRelation : relationship}
                    </div>
                    <div className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                      {gender === 'female' ? 'Female Voice Timbre' : gender === 'male' ? 'Male Voice Timbre' : 'Neutral Voice'}
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                    {name.trim() || 'Unnamed Memorial'}
                  </h2>
                  <div className="text-xs text-neutral-500 flex items-center justify-center sm:justify-start gap-2">
                    <Shield className="w-3.5 h-3.5 text-teal-600" />
                    <span>Private AI Recreation · Personal Workspace</span>
                  </div>
                </div>
              </div>

              {/* Recorded Nuances */}
              <div className="relative z-10 mt-8 pt-6 border-t border-neutral-100 space-y-4 text-xs text-neutral-700">
                {personality && (
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-1">Their Personality:</span>
                    <p className="italic text-neutral-600 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-neutral-200/60">
                      “{personality}”
                    </p>
                  </div>
                )}

                {voiceDescription && (
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-1">Voice & Sound:</span>
                    <p className="italic text-neutral-600 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-neutral-200/60">
                      “{voiceDescription}”
                    </p>
                  </div>
                )}

                {memories && (
                  <div>
                    <span className="font-semibold text-neutral-900 block mb-1">Memories & Stories:</span>
                    <p className="italic text-neutral-600 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-neutral-200/60">
                      “{memories}”
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy covenant reminder */}
            <div className="text-center text-xs text-neutral-500 max-w-md mx-auto">
              This persona belongs solely to your private workspace. It is never indexed, shared, or made public.
            </div>
          </motion.div>
        )}

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between pt-8 mt-6 border-t border-neutral-200/70">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
          >
            <span>
              {currentStep === 4 ? 'Begin Conversation' : 'Continue'}
            </span>
            <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </main>

    </div>
  );
};
