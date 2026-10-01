import React from 'react';
import { EvernearLogo } from './EvernearLogo.tsx';
import { Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onCreateClick: () => void;
  onHowItWorksClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCreateClick, onHowItWorksClick }) => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-neutral-200/80 pt-16 pb-12 text-neutral-600">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200/70">
          
          {/* Brand & Manifesto Column (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block">
              <EvernearLogo size="md" />
            </a>
            
            <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
              Evernear is a private AI experience that lets people create a conversational recreation of someone meaningful from their past, shaped by their memories, personality, stories, and voice description.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-teal-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Dedicated to human dignity, memory, and solace</span>
            </div>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              The Experience
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#what-it-is" className="hover:text-teal-700 transition-colors">
                  What Evernear Is
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-teal-700 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-teal-700 transition-colors">
                  Sample Conversation
                </a>
              </li>
              <li>
                <a href="#personalization" className="hover:text-teal-700 transition-colors">
                  Voice & Memories
                </a>
              </li>
            </ul>
          </div>

          {/* Ethics & Guidance (Span 2) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              Ethics & Trust
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#privacy" className="hover:text-teal-700 transition-colors">
                  Zero Model Ingestion
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-teal-700 transition-colors">
                  Bereavement Guidelines
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-teal-700 transition-colors">
                  One-Click Purge
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-teal-700 transition-colors">
                  Export Archives
                </a>
              </li>
            </ul>
          </div>

          {/* Action Column (Span 3) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              Talk to someone
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Start building a private memorial space for someone you cherish.
            </p>
            <button
              onClick={onCreateClick}
              className="mt-2 w-full py-2.5 px-4 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all text-center shadow-xs cursor-pointer"
            >
              Talk to someone
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Respect */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Evernear Technologies Inc.</span>
            <span>·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-neutral-700 transition-colors">
              Privacy Covenant
            </a>
            <a href="#privacy" className="hover:text-neutral-700 transition-colors">
              Terms of Remembrance
            </a>
            <a href="#privacy" className="hover:text-neutral-700 transition-colors">
              Security Whitepaper
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
