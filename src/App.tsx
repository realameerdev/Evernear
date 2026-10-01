/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { TrustBar } from './components/TrustBar.tsx';
import { WhatIsEvernear } from './components/WhatIsEvernear.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { ConversationExperience } from './components/ConversationExperience.tsx';
import { MemoryAndPersonalization } from './components/MemoryAndPersonalization.tsx';
import { PrivacyDignity } from './components/PrivacyDignity.tsx';
import { FinalCTA } from './components/FinalCTA.tsx';
import { Footer } from './components/Footer.tsx';
import { CreatedPerson } from './types/person.ts';
import { getVaultPeople } from './utils/vaultStorage.ts';

// Dynamic code-splitting for subviews to maximize landing page performance
const CreateSomeoneFlow = lazy(() => import('./components/CreateSomeoneFlow.tsx').then(m => ({ default: m.CreateSomeoneFlow })));
const PersonProfile = lazy(() => import('./components/PersonProfile.tsx').then(m => ({ default: m.PersonProfile })));
const MyPeopleWorkspace = lazy(() => import('./components/MyPeopleWorkspace.tsx').then(m => ({ default: m.MyPeopleWorkspace })));
const ConversationDialog = lazy(() => import('./components/ConversationDialog.tsx').then(m => ({ default: m.ConversationDialog })));

type AppView = 'landing' | 'my-people' | 'create' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [vaultPeople, setVaultPeople] = useState<CreatedPerson[]>([]);
  const [activePerson, setActivePerson] = useState<CreatedPerson | null>(null);
  const [conversationTargetPerson, setConversationTargetPerson] = useState<CreatedPerson | null>(null);

  // Load vault people on mount
  useEffect(() => {
    const people = getVaultPeople();
    setVaultPeople(people);
  }, []);

  const refreshVault = () => {
    const people = getVaultPeople();
    setVaultPeople(people);
    if (activePerson) {
      const refreshedActive = people.find((p) => p.id === activePerson.id);
      if (refreshedActive) setActivePerson(refreshedActive);
    }
  };

  const handleStartCreate = () => {
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelCreate = () => {
    setCurrentView('my-people');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePersonCreated = (person: CreatedPerson) => {
    refreshVault();
    setActivePerson(person);
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPerson = (person: CreatedPerson) => {
    setActivePerson(person);
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePersonDeleted = () => {
    refreshVault();
    setActivePerson(null);
    setCurrentView('my-people');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePersonUpdated = (updated: CreatedPerson) => {
    refreshVault();
    setActivePerson(updated);
    if (conversationTargetPerson && conversationTargetPerson.id === updated.id) {
      setConversationTargetPerson(updated);
    }
  };

  const handleScrollToHowItWorks = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePersonDeletedById = (personId: string) => {
    refreshVault();
    if (activePerson && activePerson.id === personId) {
      setActivePerson(null);
    }
  };

  // View: Create Someone Flow
  if (currentView === 'create') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-teal-800 text-xs">Opening sanctuary...</div>}>
        <CreateSomeoneFlow
          onCancel={handleCancelCreate}
          onPersonCreated={handlePersonCreated}
        />
      </Suspense>
    );
  }

  // View: Person Profile
  if (currentView === 'profile' && activePerson) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-teal-800 text-xs">Loading memorial...</div>}>
        <PersonProfile
          person={activePerson}
          onBackToSanctuary={() => setCurrentView('my-people')}
          onPersonDeleted={handlePersonDeleted}
          onOpenConversation={(p) => setConversationTargetPerson(p)}
        />
        <ConversationDialog
          person={conversationTargetPerson}
          isOpen={!!conversationTargetPerson}
          onClose={() => setConversationTargetPerson(null)}
          onPersonUpdated={handlePersonUpdated}
        />
      </Suspense>
    );
  }

  // View: My People Workspace
  if (currentView === 'my-people') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-teal-800 text-xs">Loading vault...</div>}>
        <MyPeopleWorkspace
          people={vaultPeople}
          onSelectPerson={handleSelectPerson}
          onCreateNew={handleStartCreate}
          onOpenConversation={(p) => setConversationTargetPerson(p)}
          onReturnToLanding={() => setCurrentView('landing')}
          onDeletePerson={handlePersonDeletedById}
          onRefreshVault={refreshVault}
        />
        <ConversationDialog
          person={conversationTargetPerson}
          isOpen={!!conversationTargetPerson}
          onClose={() => setConversationTargetPerson(null)}
          onPersonUpdated={handlePersonUpdated}
        />
      </Suspense>
    );
  }

  // Default View: Full Landing Page
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Top Bar Contract */}
      <Navbar
        onCreateClick={handleStartCreate}
        onHowItWorksClick={handleScrollToHowItWorks}
        onOpenMyPeople={() => setCurrentView('my-people')}
        peopleCount={vaultPeople.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onCreateClick={handleStartCreate}
          onHowItWorksClick={handleScrollToHowItWorks}
        />

        {/* Quiet Trust Bar */}
        <TrustBar />

        {/* Section 1: What Evernear is */}
        <WhatIsEvernear />

        {/* Section 2: How It Works */}
        <HowItWorks />

        {/* Section 3: The Conversation Experience */}
        <ConversationExperience />

        {/* Section 4: Memory & Personalization */}
        <MemoryAndPersonalization />

        {/* Section 5: Privacy & Ethical Covenant */}
        <PrivacyDignity />

        {/* Section 6: Final CTA */}
        <FinalCTA
          onCreateClick={handleStartCreate}
          onHowItWorksClick={handleScrollToHowItWorks}
        />
      </main>

      {/* Footer */}
      <Footer
        onCreateClick={handleStartCreate}
        onHowItWorksClick={handleScrollToHowItWorks}
      />

      {/* Conversation Preview Modal if triggered */}
      <ConversationDialog
        person={conversationTargetPerson}
        isOpen={!!conversationTargetPerson}
        onClose={() => setConversationTargetPerson(null)}
        onPersonUpdated={handlePersonUpdated}
      />
    </div>
  );
}
