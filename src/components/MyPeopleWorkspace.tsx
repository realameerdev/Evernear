import React, { useState } from 'react';
import { Search, Plus, MessageSquare, ArrowRight, Shield, Clock, Heart, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreatedPerson } from '../types/person.ts';
import { EvernearLogo } from './EvernearLogo.tsx';

interface MyPeopleWorkspaceProps {
  people: CreatedPerson[];
  onSelectPerson: (person: CreatedPerson) => void;
  onCreateNew: () => void;
  onOpenConversation: (person: CreatedPerson) => void;
  onReturnToLanding: () => void;
}

export const MyPeopleWorkspace: React.FC<MyPeopleWorkspaceProps> = ({
  people,
  onSelectPerson,
  onCreateNew,
  onOpenConversation,
  onReturnToLanding,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Search only searches the user's private people
  const filteredPeople = people.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.relationship.toLowerCase().includes(q) ||
      p.personality.toLowerCase().includes(q) ||
      p.memories.toLowerCase().includes(q)
    );
  });

  // Recent conversations (people with conversation history)
  const recentConversations = people
    .filter((p) => p.conversationHistory && p.conversationHistory.length > 0)
    .sort((a, b) => {
      const timeA = new Date(a.lastConversationAt || a.createdAt).getTime();
      const timeB = new Date(b.lastConversationAt || b.createdAt).getTime();
      return timeB - timeA;
    });

  const formatLastTime = (dateStr?: string) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffHours < 24 && date.getDate() === now.getDate()) {
      return `Today · ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
    }
    if (diffHours < 48) {
      return `Yesterday · ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Workspace Header Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-neutral-200/60 px-4 sm:px-12 py-3.5 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onReturnToLanding}
              className="p-1.5 rounded-full hover:bg-neutral-200/50 text-neutral-600 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <span className="text-neutral-300">/</span>
            <EvernearLogo size="sm" showWordmark={true} />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onCreateNew}
              className="px-4 sm:px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-teal-300" />
              <span>Talk to someone</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 sm:px-8 sm:py-16 space-y-10 sm:space-y-12">
        
        {/* Workspace Title & Search Header */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <Shield className="w-3.5 h-3.5 text-teal-600" />
              <span>Private Sanctuary</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight">
              My People
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              People and memories you’ve chosen to keep close.
            </p>
          </div>

          {/* Search Bar & Stats */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your private people..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-300/90 text-base sm:text-sm bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all text-neutral-800 placeholder:text-neutral-400 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs font-medium cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-neutral-500 flex items-center gap-2">
              <span>{people.length} {people.length === 1 ? 'person' : 'people'} in your vault</span>
              <span>·</span>
              <span className="text-teal-700 font-medium">100% private</span>
            </div>
          </div>
        </div>

        {/* Recent Conversations Overview (if any) */}
        {recentConversations.length > 0 && !searchQuery && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase font-bold tracking-widest text-neutral-500">
                Recent Conversations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentConversations.slice(0, 3).map((person) => {
                const latestMsg = person.conversationHistory[person.conversationHistory.length - 1];
                return (
                  <div
                    key={`recent-${person.id}`}
                    onClick={() => onOpenConversation(person)}
                    className="p-4 rounded-2xl bg-white border border-neutral-200/80 hover:border-teal-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200 shrink-0">
                        <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate">
                        <h3 className="text-sm font-bold text-neutral-900 truncate group-hover:text-teal-800 transition-colors">
                          {person.name}
                        </h3>
                        <p className="text-[11px] text-teal-700 font-medium">{person.relationship}</p>
                      </div>
                    </div>

                    <p className="text-xs italic text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                      {latestMsg?.text || 'Conversation open'}
                    </p>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatLastTime(person.lastConversationAt)}</span>
                      </span>
                      <span className="text-teal-700 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>Continue</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* People Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase font-bold tracking-widest text-neutral-500">
              {searchQuery ? `Search Results (${filteredPeople.length})` : 'All Created Recreations'}
            </h2>
          </div>

          {filteredPeople.length === 0 ? (
            <div className="text-center py-16 px-6 rounded-3xl bg-white border border-neutral-200/80 space-y-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-900">
                  {searchQuery ? 'No matching people found' : 'Your sanctuary is empty'}
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  {searchQuery 
                    ? `No private tributes match “${searchQuery}”. Search only checks your personal workspace.`
                    : 'Choose someone meaningful to begin preserving their voice and memories.'
                  }
                </p>
              </div>
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-full border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                >
                  Clear search
                </button>
              ) : (
                <button
                  onClick={onCreateNew}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  Talk to someone
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeople.map((person) => {
                const latestMsg = person.conversationHistory && person.conversationHistory.length > 0
                  ? person.conversationHistory[person.conversationHistory.length - 1].text
                  : person.personality;

                return (
                  <div
                    key={person.id}
                    className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(13,148,136,0.07)] hover:border-teal-300/80 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Atmospheric top glow */}
                    <div 
                      className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none glow-teal-subtle opacity-40 -z-0"
                      aria-hidden="true" 
                    />

                    <div className="p-6 sm:p-7 space-y-5">
                      
                      {/* Person Header Lockup */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div 
                            onClick={() => onSelectPerson(person)}
                            className="relative w-14 h-14 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xs cursor-pointer group-hover:scale-105 transition-transform shrink-0"
                          >
                            <img
                              src={person.photoUrl}
                              alt={person.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center filter saturate-[0.96]"
                            />
                          </div>

                          <div>
                            <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/60 mb-1">
                              {person.relationship}
                            </span>
                            <h3 
                              onClick={() => onSelectPerson(person)}
                              className="text-lg font-bold text-neutral-900 cursor-pointer group-hover:text-teal-900 transition-colors leading-tight"
                            >
                              {person.name}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Conversation / Memory Preview */}
                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-neutral-200/60 space-y-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block">
                          Recent Conversation Preview
                        </span>
                        <p className="text-xs italic text-neutral-700 line-clamp-2 leading-relaxed">
                          {latestMsg}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-400" />
                          <span>{formatLastTime(person.lastConversationAt)}</span>
                        </span>
                        <span className="text-teal-700 font-mono text-[10px]">Private Recreation</span>
                      </div>

                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-6 py-3.5 bg-neutral-50/60 border-t border-neutral-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onSelectPerson(person)}
                        className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={() => onOpenConversation(person)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3 text-teal-300" />
                        <span>Continue</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>

    </div>
  );
};
