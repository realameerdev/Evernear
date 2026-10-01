import React from 'react';
import { X, Plus, Shield, ArrowRight, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreatedPerson } from '../types/person.ts';

interface SanctuaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  people: CreatedPerson[];
  onSelectPerson: (person: CreatedPerson) => void;
  onCreateNew: () => void;
}

export const SanctuaryDrawer: React.FC<SanctuaryDrawerProps> = ({
  isOpen,
  onClose,
  people,
  onSelectPerson,
  onCreateNew,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#FAF8F5] border-l border-neutral-200/80 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-neutral-200/70 bg-white flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Your Private Sanctuary
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {people.length} {people.length === 1 ? 'person' : 'people'} preserved in your personal vault
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* People List */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {people.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                      Your sanctuary is currently empty. Create your first tribute to keep someone meaningful close.
                    </p>
                  </div>
                ) : (
                  people.map((person) => {
                    const formatted = new Date(person.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                    return (
                      <div
                        key={person.id}
                        onClick={() => {
                          onSelectPerson(person);
                          onClose();
                        }}
                        className="p-4 rounded-2xl bg-white border border-neutral-200/80 hover:border-teal-400/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-3.5 overflow-hidden">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                            <img
                              src={person.photoUrl}
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="truncate">
                            <h4 className="text-sm font-bold text-neutral-900 truncate group-hover:text-teal-800 transition-colors">
                              {person.name}
                            </h4>
                            <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                              <span className="text-teal-700 font-medium">{person.relationship}</span>
                              <span>·</span>
                              <span>{formatted}</span>
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-neutral-200/70 bg-white space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    onCreateNew();
                  }}
                  className="w-full py-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-teal-300" />
                  <span>Talk to someone new</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                  <Shield className="w-3.5 h-3.5 text-teal-600" />
                  <span>Device encrypted · Zero public sharing</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
