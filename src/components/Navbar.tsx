import React, { useState, useEffect } from 'react';
import { EvernearLogo } from './EvernearLogo.tsx';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onCreateClick: () => void;
  onHowItWorksClick: () => void;
  onOpenMyPeople?: () => void;
  peopleCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onCreateClick, 
  onHowItWorksClick,
  onOpenMyPeople,
  peopleCount = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger silky fold-in when user scrolls down
      setIsScrolled(window.scrollY > 35);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'What it is', href: '#what-it-is' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Experience', href: '#experience' },
    { label: 'Personalization', href: '#personalization' },
    { label: 'Privacy & Ethics', href: '#privacy' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 pointer-events-none">
      <div 
        className={`w-full mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? 'px-4 sm:px-6 pt-3 pb-1 max-w-5xl' 
            : 'px-6 sm:px-8 lg:px-12 pt-1 pb-0 max-w-7xl'
        }`}
      >
        {/* Silk folding navigation capsule - remains stagnant at top */}
        <div
          className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
            isScrolled
              ? 'h-14 sm:h-15 px-5 sm:px-6 bg-[#FAF8F5]/90 backdrop-blur-xl border border-neutral-300/70 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.06)]'
              : 'h-20 px-0 bg-transparent border border-transparent rounded-2xl shadow-none'
          }`}
        >
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center group transition-transform duration-300 hover:opacity-90 shrink-0"
            aria-label="Evernear Home"
          >
            <EvernearLogo size={isScrolled ? 'sm' : 'md'} />
          </a>

          {/* Zone 2: Editorial Navigation Links (Desktop) */}
          <nav 
            className={`hidden md:flex items-center font-medium text-neutral-600 transition-all duration-500 ${
              isScrolled ? 'gap-6 text-[13px]' : 'gap-8 text-[15px]'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-neutral-900 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-teal-600 hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenMyPeople && (
              <button
                onClick={onOpenMyPeople}
                className={`text-xs font-semibold text-teal-900 bg-teal-50/90 hover:bg-teal-100 rounded-full border border-teal-200/80 transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  isScrolled ? 'px-3 py-1.5' : 'px-4 py-2'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span>My People {peopleCount > 0 ? `(${peopleCount})` : ''}</span>
              </button>
            )}

            <button
              onClick={onHowItWorksClick}
              className={`font-medium text-neutral-700 hover:text-neutral-950 rounded-full border border-neutral-300/80 bg-white/70 hover:bg-white hover:border-neutral-400 transition-all duration-300 whitespace-nowrap shadow-xs cursor-pointer ${
                isScrolled ? 'px-3.5 py-1.5 text-xs' : 'px-5 py-2 text-sm'
              }`}
            >
              How it works
            </button>

            <button
              onClick={onCreateClick}
              className={`font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-1.5 whitespace-nowrap group cursor-pointer ${
                isScrolled ? 'px-4 py-1.5 text-xs' : 'px-5 py-2 text-sm'
              }`}
            >
              <span>Talk to someone</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-neutral-700 hover:bg-neutral-200/50 transition-colors pointer-events-auto"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden pointer-events-auto max-w-lg mx-auto px-4 mt-2 max-h-[85vh] overflow-y-auto"
          >
            <div className="bg-[#FAF8F5] border border-neutral-300/80 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl backdrop-blur-xl">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-neutral-800 hover:text-teal-700 py-1 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-neutral-200/70 flex flex-col gap-2.5">
                {onOpenMyPeople && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenMyPeople();
                    }}
                    className="w-full py-2.5 text-center text-xs font-semibold text-teal-900 rounded-full border border-teal-200/80 bg-teal-50 shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span>My People ({peopleCount})</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onHowItWorksClick();
                  }}
                  className="w-full py-2.5 text-center text-xs font-medium text-neutral-800 rounded-full border border-neutral-300 bg-white shadow-xs cursor-pointer"
                >
                  How it works
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onCreateClick();
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-white bg-neutral-900 rounded-full shadow-sm cursor-pointer"
                >
                  Talk to someone
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
