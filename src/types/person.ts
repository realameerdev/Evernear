export interface ConversationMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  memoryReferenced?: string;
}

export interface CreatedPerson {
  id: string;
  name: string;
  relationship: string;
  gender?: 'female' | 'male' | 'other';
  photoUrl: string;
  personality: string;
  voiceDescription: string;
  memories: string;
  createdAt: string;
  isLiving?: boolean;
  livingConsentConfirmed?: boolean;
  lastConversationAt?: string;
  conversationHistory: ConversationMessage[];
  sensitiveTopics?: string;
}
