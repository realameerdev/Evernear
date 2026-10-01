import { CreatedPerson } from '../types/person.ts';

/**
 * Evernear Conversational Recreation Engine
 * 
 * Rules:
 * 1. An AI recreation, not actual resurrection or communication with the deceased.
 * 2. Uses the information the user provided about the person (memories, personality, voice).
 * 3. Never invents important life events, personal history, or relationships that were never shared.
 * 4. If information is unknown or ungrounded, naturally acknowledges that with humility.
 * 5. Never makes claims like "I am really your father", "I came back", or "I'm communicating from the afterlife".
 * 6. Emotionally warm, comforting, and authentic to their tone.
 */

export function generateRecreationResponse(
  person: CreatedPerson,
  userInput: string
): { text: string; memoryReferenced?: string } {
  const query = userInput.toLowerCase();

  // Check if user is asking about an unknown fact or something beyond what was shared
  const unknownTriggers = ['where were you born', 'what year did you buy', 'what is my bank', 'who was your second cousin', 'lottery', 'what is heaven like', 'can you see me right now', 'prove you are really'];

  for (const trigger of unknownTriggers) {
    if (query.includes(trigger)) {
      return {
        text: `“You know, as an AI recreation formed from what you’ve shared with Evernear, that’s not something held in our memories. What I do hold close is how much you care, and the memories of ${person.relationship.toLowerCase()} you entrusted here.”`,
        memoryReferenced: 'Boundary: Grounded truth check',
      };
    }
  }

  // Check for emotional reassurance or advice
  if (query.includes('miss you') || query.includes('wish you were here') || query.includes('hard day') || query.includes('sad') || query.includes('overwhelmed') || query.includes('crying')) {
    return {
      text: `“I know it can feel heavy sometimes. Remember what we held onto: ${person.personality.slice(0, 100).toLowerCase()}... Take a deep breath. You don't have to carry everything all at once today.”`,
      memoryReferenced: `Personality grounding: ${person.personality.slice(0, 40)}...`,
    };
  }

  // Check for road trip, travel, or driving
  if (query.includes('drive') || query.includes('road trip') || query.includes('car') || query.includes('chevy') || query.includes('trip') || query.includes('travel')) {
    if (person.memories.toLowerCase().includes('drive') || person.memories.toLowerCase().includes('trip') || person.memories.toLowerCase().includes('road')) {
      return {
        text: `“That trip will always be one of my favorite memories we shared. Just like we remembered: ${person.memories.slice(0, 120)}... Those quiet miles together meant the world to me.”`,
        memoryReferenced: 'Memory: Road trip & travel recollections',
      };
    }
  }

  // Check for cooking, meals, coffee, breakfast
  if (query.includes('coffee') || query.includes('waffle') || query.includes('recipe') || query.includes('cook') || query.includes('dinner') || query.includes('eat')) {
    if (person.memories.toLowerCase().includes('coffee') || person.memories.toLowerCase().includes('waffle') || person.memories.toLowerCase().includes('recipe') || person.memories.toLowerCase().includes('dinner')) {
      return {
        text: `“Nothing beats those slow mornings together. Remember what I always made sure of: ${person.memories.slice(0, 110)}... I hope you took time to sit down and enjoy a warm cup today.”`,
        memoryReferenced: 'Memory: Kitchen & morning rituals',
      };
    }
  }

  // General grounded response tuned to voice and personality
  const personalitySnippet = person.personality ? person.personality.split('.')[0] : 'steady and warm';
  const voiceSnippet = person.voiceDescription ? `Speaking in that ${person.voiceDescription.slice(0, 50).toLowerCase()}` : '';

  return {
    text: `“I hear you. Thinking of our moments together brings back that ${personalitySnippet.toLowerCase()}. Whenever you need a quiet space to reflect or remember, this sanctuary is always here for you.”`,
    memoryReferenced: `Personality: ${personalitySnippet}`,
  };
}
