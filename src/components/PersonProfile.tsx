import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Plus, Shield, Download, Trash2, Edit3, Heart, Check, Volume2, Calendar, FileText, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreatedPerson } from '../types/person.ts';
import { updatePersonInVault, deletePersonFromVault } from '../utils/vaultStorage.ts';

interface PersonProfileProps {
  person: CreatedPerson;
  onBackToSanctuary: () => void;
  onPersonDeleted: () => void;
  onOpenConversation: (person: CreatedPerson) => void;
}

export const PersonProfile: React.FC<PersonProfileProps> = ({
  person: initialPerson,
  onBackToSanctuary,
  onPersonDeleted,
  onOpenConversation,
}) => {
  const [person, setPerson] = useState<CreatedPerson>(initialPerson);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingMemories, setIsEditingMemories] = useState(false);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [newMemoryText, setNewMemoryText] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  // Edit details state
  const [editName, setEditName] = useState(person.name);
  const [editRelationship, setEditRelationship] = useState(person.relationship);
  const [editGender, setEditGender] = useState<'female' | 'male' | 'other'>(person.gender || 'male');
  const [editPersonality, setEditPersonality] = useState(person.personality);
  const [editVoice, setEditVoice] = useState(person.voiceDescription);
  const [editMemories, setEditMemories] = useState(person.memories);

  const formattedDate = new Date(person.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updatePersonInVault(person.id, {
      name: editName.trim() || person.name,
      relationship: editRelationship.trim() || person.relationship,
      gender: editGender,
      personality: editPersonality.trim() || person.personality,
      voiceDescription: editVoice.trim() || person.voiceDescription,
    });
    if (updated) {
      setPerson(updated);
      setIsEditingDetails(false);
    }
  };

  const handleSaveMemories = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updatePersonInVault(person.id, {
      memories: editMemories.trim() || person.memories,
    });
    if (updated) {
      setPerson(updated);
      setIsEditingMemories(false);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;

    const combinedMemories = person.memories
      ? `${person.memories}\n\n• ${newMemoryText.trim()}`
      : `• ${newMemoryText.trim()}`;

    const updated = updatePersonInVault(person.id, {
      memories: combinedMemories,
    });

    if (updated) {
      setPerson(updated);
      setNewMemoryText('');
      setIsAddingMemory(false);
    }
  };

  const handleDelete = () => {
    deletePersonFromVault(person.id);
    onPersonDeleted();
  };

  const handleExportArchive = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(person, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `evernear-${person.name.toLowerCase().replace(/\s+/g, '-')}-archive.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Profile Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-neutral-200/60 px-4 sm:px-12 py-3.5 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBackToSanctuary}
              className="p-1.5 sm:p-2 rounded-full hover:bg-neutral-200/60 text-neutral-600 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              aria-label="Back to My People"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>My People</span>
            </button>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-semibold text-neutral-800 truncate max-w-[120px] sm:max-w-xs">
              {person.name}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsEditingDetails(true)}
              className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              title="Edit Details"
              aria-label="Edit Details"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportArchive}
              className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              title="Download Memory Archive"
              aria-label="Export Archive"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
              title="Delete from Vault"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Profile Canvas */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 sm:px-6 sm:py-16 space-y-8 sm:space-y-12">
        
        {/* Export notification */}
        <AnimatePresence>
          {showExportSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600" />
                <span>Memory archive JSON exported successfully for your private records.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Hero Header Card */}
        <div className="relative rounded-3xl md:rounded-[36px] bg-white border border-neutral-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.04)] p-5 sm:p-12 overflow-hidden">
          
          {/* Ambient Teal Aura */}
          <div 
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none glow-teal-subtle opacity-70"
            aria-hidden="true" 
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left: Framed Large Photo */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden bg-neutral-100 border-2 border-white shadow-xl">
                <img
                  src={person.photoUrl}
                  alt={person.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter saturate-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white text-[11px] font-medium flex items-center gap-1.5 drop-shadow-xs">
                  <Shield className="w-3.5 h-3.5 text-teal-300" />
                  <span>Private Workspace Vault</span>
                </div>
              </div>
            </div>

            {/* Right: Identity, Relationship & Actions */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-semibold">
                    {person.relationship}
                  </span>
                  
                  {/* Clear AI recreation indication */}
                  <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-[11px] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    <span>AI Recreation</span>
                  </span>

                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Created {formattedDate}</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight">
                  {person.name}
                </h1>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed max-w-2xl">
                A private conversational AI recreation shaped by your memories, personality observations, and voice description.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onOpenConversation(person)}
                  className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <MessageSquare className="w-4 h-4 text-teal-300" />
                  <span>Continue conversation</span>
                </button>

                <button
                  onClick={() => setIsAddingMemory(true)}
                  className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-medium text-neutral-800 hover:text-neutral-950 rounded-full border border-neutral-300/80 bg-white hover:bg-neutral-50 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-teal-700" />
                  <span>Add memory</span>
                </button>

                <button
                  onClick={() => setIsEditingDetails(true)}
                  className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-950 rounded-full border border-neutral-300/80 bg-white hover:bg-neutral-50 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Edit details</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 3 Core Editorial Sections: Personality, Voice, Memories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Personality & Voice (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Card: What were they like */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-teal-800">
                  <Heart className="w-4 h-4 text-teal-600" />
                  <span>Personality & Spirit</span>
                </div>
                <button
                  onClick={() => setIsEditingDetails(true)}
                  className="text-xs text-neutral-400 hover:text-neutral-700 font-medium cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                What they were like
              </h2>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/70 text-sm text-neutral-700 leading-relaxed italic">
                “{person.personality}”
              </div>
            </div>

            {/* Card: How did they sound */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-teal-800">
                  <Volume2 className="w-4 h-4 text-teal-600" />
                  <span>Vocal Timbre & Cadence</span>
                </div>
                <button
                  onClick={() => setIsEditingDetails(true)}
                  className="text-xs text-neutral-400 hover:text-neutral-700 font-medium cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                How they sounded
              </h2>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/70 text-sm text-neutral-700 leading-relaxed italic">
                “{person.voiceDescription || 'A calm, familiar voice that speaks with unhurried warmth.'}”
              </div>
            </div>

            {/* Clear AI Recreation Notice */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-neutral-200/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>AI Recreation Notice</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Evernear is an AI recreation, not actual resurrection or communication with the deceased. It speaks using the memories and personality you provided, and will not invent fictional life events.
              </p>
            </div>

          </div>

          {/* Column 2: Cherished Memories & Conversation History (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Memories Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-teal-800 mb-1">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <span>Living Chronicle</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                    What Evernear remembers
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditMemories(person.memories);
                      setIsEditingMemories(true);
                    }}
                    className="px-3 py-1.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    Edit memories
                  </button>
                  <button
                    onClick={() => setIsAddingMemory(true)}
                    className="px-4 py-1.5 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-teal-700" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Memory Text display */}
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-neutral-200/70 text-neutral-800 leading-relaxed text-sm whitespace-pre-line font-normal">
                  {person.memories || 'No memories recorded yet. Click “Add memory” to add stories, favorite moments, or quotes.'}
                </div>
              </div>
            </div>

            {/* Conversation History Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-800">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                      Conversation History
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Private exchanges held with {person.name}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenConversation(person)}
                  className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-300" />
                  <span>Open Space</span>
                </button>
              </div>

              {/* Messages list */}
              {person.conversationHistory && person.conversationHistory.length > 0 ? (
                <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                  {person.conversationHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'ml-auto max-w-[85%] bg-neutral-900 text-white rounded-tr-xs'
                          : 'mr-auto max-w-[90%] bg-[#FAF8F5] border border-neutral-200/80 text-neutral-800 rounded-tl-xs space-y-1'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                        <span className={msg.sender === 'user' ? 'text-neutral-400' : 'text-teal-800 font-semibold'}>
                          {msg.sender === 'user' ? 'You' : person.name}
                        </span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                      </div>
                      <p>{msg.text}</p>
                      {msg.memoryReferenced && (
                        <div className="pt-1.5 border-t border-neutral-200/60 text-[10px] text-teal-700 font-mono">
                          {msg.memoryReferenced}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-500 text-xs space-y-2">
                  <p>No conversations recorded yet.</p>
                  <button
                    onClick={() => onOpenConversation(person)}
                    className="text-teal-700 font-medium hover:underline cursor-pointer"
                  >
                    Start your first conversation with {person.name} →
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

      </main>

      {/* Edit Details Modal */}
      <AnimatePresence>
        {isEditingDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-neutral-200 shadow-2xl space-y-5"
            >
              <h3 className="text-xl font-bold text-neutral-900">Edit Details</h3>

              <form onSubmit={handleSaveDetails} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-neutral-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-neutral-700 mb-1">Relationship</label>
                  <input
                    type="text"
                    value={editRelationship}
                    onChange={(e) => setEditRelationship(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-neutral-700 mb-1">Voice & Persona Gender</label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setEditGender('female')}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer text-center ${
                        editGender === 'female'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      Female Voice
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditGender('male')}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer text-center ${
                        editGender === 'male'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      Male Voice
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditGender('other')}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer text-center ${
                        editGender === 'other'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      Neutral
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-neutral-700 mb-1">Personality</label>
                  <textarea
                    rows={3}
                    value={editPersonality}
                    onChange={(e) => setEditPersonality(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-neutral-700 mb-1">Voice Description</label>
                  <textarea
                    rows={2}
                    value={editVoice}
                    onChange={(e) => setEditVoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsEditingDetails(false)}
                    className="px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Memories Modal */}
      <AnimatePresence>
        {isEditingMemories && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-neutral-200 shadow-2xl space-y-5"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-neutral-900">Edit Memories</h3>
                <p className="text-xs text-neutral-500">
                  Update the stories, phrases, or chapters Evernear uses for {person.name}.
                </p>
              </div>

              <form onSubmit={handleSaveMemories} className="space-y-4">
                <textarea
                  rows={8}
                  value={editMemories}
                  onChange={(e) => setEditMemories(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 leading-relaxed font-normal"
                />

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsEditingMemories(false)}
                    className="px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
                  >
                    Save Memories
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {isAddingMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-neutral-200 shadow-2xl space-y-5"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-neutral-900">Add a New Memory</h3>
                <p className="text-xs text-neutral-500">
                  Introduce a new chapter, joke, or life story for {person.name}.
                </p>
              </div>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <textarea
                  rows={4}
                  value={newMemoryText}
                  onChange={(e) => setNewMemoryText(e.target.value)}
                  placeholder="e.g. In the summer of 1988, we got lost driving to the lake cabin and stopped at a roadside cherry stand..."
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 leading-relaxed"
                  autoFocus
                />

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsAddingMemory(false)}
                    className="px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newMemoryText.trim()}
                    className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
                  >
                    Anchor Memory
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-neutral-200 shadow-2xl space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-neutral-900">Permanently Delete Persona?</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Deleting <strong>{person.name}</strong> will permanently erase their profile, all recorded memories, and their full conversation history from your workspace vault. This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-5 py-2.5 rounded-full border border-neutral-300 text-neutral-700 text-xs font-medium hover:bg-neutral-100 cursor-pointer"
                >
                  Keep Tribute
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-5 py-2.5 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700 shadow-xs cursor-pointer"
                >
                  Permanently Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
