/**
 * Evernear Voice Synthesizer & Audio Engine
 * 
 * Provides voice playback for persona voice previews, hero snippets,
 * and conversation responses using the Web Speech Synthesis API.
 * Accurately aligns voice gender (Female vs Male) based on user selection
 * and relationship context with realistic pitch, cadence, and timbre.
 */

import { CreatedPerson } from '../types/person.ts';

export interface VoiceConfig {
  pitch?: number;
  rate?: number;
  genderPreference?: 'female' | 'male' | 'other';
  toneDescription?: string;
}

let currentUtterance: SpeechSynthesisUtterance | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Initialize voices cache and handle asynchronous loading
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

/**
 * Stop any active voice playback immediately
 */
export function stopVoicePlayback() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

/**
 * Determine person's vocal gender preference
 */
export function detectPersonGender(person: Partial<CreatedPerson>): 'female' | 'male' {
  if (person.gender === 'female') return 'female';
  if (person.gender === 'male') return 'male';

  const combinedContext = `${person.relationship || ''} ${person.personality || ''} ${person.name || ''} ${person.voiceDescription || ''}`.toLowerCase();

  const femaleKeywords = [
    'mother', 'mom', 'mommy', 'mama', 'grandmother', 'grandma', 'nana', 'granny', 'sister',
    'daughter', 'aunt', 'auntie', 'wife', 'girlfriend', 'niece', 'woman', 'female', 'her', 'she', 'lady', 'eleanor', 'sarah', 'mary', 'claire'
  ];

  const maleKeywords = [
    'father', 'dad', 'daddy', 'papa', 'grandfather', 'grandpa', 'gramps', 'brother',
    'son', 'uncle', 'husband', 'boyfriend', 'nephew', 'man', 'male', 'him', 'he', 'guy', 'gentleman', 'arthur', 'michael', 'david', 'john'
  ];

  const hasFemale = femaleKeywords.some(k => combinedContext.includes(k));
  const hasMale = maleKeywords.some(k => combinedContext.includes(k));

  if (hasFemale && !hasMale) return 'female';
  if (hasMale && !hasFemale) return 'male';

  return 'female'; // Default graceful warmth
}

/**
 * Find best matching browser speech synthesis voice for a specific gender
 */
function findVoiceForGender(isFemale: boolean): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
  const candidatePool = englishVoices.length > 0 ? englishVoices : voices;

  const femaleKeywords = [
    'female', 'woman', 'samantha', 'victoria', 'karen', 'zira', 'susan', 'catherine',
    'fiona', 'moira', 'tessa', 'serena', 'alva', 'claire', 'stephanie', 'jenny', 'ava',
    'emma', 'aria', 'sonia', 'veena', 'hazel', 'heera', 'natural'
  ];

  const maleKeywords = [
    'male', 'man', 'daniel', 'david', 'george', 'oliver', 'guy', 'rishi', 'arthur',
    'tom', 'alex', 'fred', 'bruce', 'junior', 'ralph', 'albert', 'mark'
  ];

  if (isFemale) {
    // 1. Look for explicit female english voices
    const directMatch = candidatePool.find(v => {
      const name = v.name.toLowerCase();
      return femaleKeywords.some(k => name.includes(k)) && !maleKeywords.some(mk => name.includes(mk));
    });
    if (directMatch) return directMatch;
  } else {
    // 2. Look for explicit male english voices
    const directMatch = candidatePool.find(v => {
      const name = v.name.toLowerCase();
      return maleKeywords.some(k => name.includes(k)) && !femaleKeywords.some(fk => name.includes(fk));
    });
    if (directMatch) return directMatch;
  }

  // Fallback to first available English voice
  return candidatePool[0] || voices[0] || null;
}

/**
 * Play a voice quote aloud with persona-tailored pitch, cadence, and timbre
 */
export function playVoiceSnippet(
  text: string,
  config: VoiceConfig = {},
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported in this browser environment.');
    return false;
  }

  // Cancel any ongoing speech
  stopVoicePlayback();

  // Clean text from quotes or bracketed annotations for clear speech
  const cleanText = text.replace(/["“”«»]/g, '').trim();
  if (!cleanText) return false;

  const isFemale = config.genderPreference === 'female';
  const isMale = config.genderPreference === 'male';

  const utterance = new SpeechSynthesisUtterance(cleanText);
  currentUtterance = utterance;

  // Set calibrated pitch and cadence:
  // Female voices get a brighter, warmer pitch (~1.12 - 1.18)
  // Male voices get a deeper, richer baritone pitch (~0.82 - 0.88)
  if (config.pitch !== undefined) {
    utterance.pitch = config.pitch;
  } else if (isFemale) {
    utterance.pitch = 1.14;
  } else if (isMale) {
    utterance.pitch = 0.84;
  } else {
    utterance.pitch = 1.0;
  }

  utterance.rate = config.rate ?? 0.88; // Unhurried, thoughtful cadence

  // Select matched voice
  const matchedVoice = findVoiceForGender(isFemale);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('Speech synthesis note:', e);
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

/**
 * Check if voice is currently speaking
 */
export function isVoicePlaying(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}
