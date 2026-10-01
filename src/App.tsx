/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { BackgroundAtmosphere } from './components/BackgroundAtmosphere.tsx';
import { CreateSomeoneFlow } from './components/CreateSomeoneFlow.tsx';
import { PersonProfile } from './components/PersonProfile.tsx';
import { MyPeopleWorkspace } from './components/MyPeopleWorkspace.tsx';
import { ConversationDialog } from './components/ConversationDialog.tsx';
import { CreatedPerson } from './types/person.ts';
import { getVaultPeople } from './utils/vaultStorage.ts';

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

  // View: Create Someone Flow
  if (currentView === 'create') {
    return (
      <CreateSomeoneFlow
        onCancel={handleCancelCreate}
        onPersonCreated={handlePersonCreated}
      />
    );
  }

  // View: Person Profile
  if (currentView === 'profile' && activePerson) {
    return (
      <>
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
      </>
    );
  }

  // View: My People Workspace
  if (currentView === 'my-people') {
    return (
      <>
        <MyPeopleWorkspace
          people={vaultPeople}
          onSelectPerson={handleSelectPerson}
          onCreateNew={handleStartCreate}
          onOpenConversation={(p) => setConversationTargetPerson(p)}
          onReturnToLanding={() => setCurrentView('landing')}
        />
        <ConversationDialog
          person={conversationTargetPerson}
          isOpen={!!conversationTargetPerson}
          onClose={() => setConversationTargetPerson(null)}
          onPersonUpdated={handlePersonUpdated}
        />
      </>
    );
  }

  // Default View: Full Landing Page
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900 relative">
      {/* Soft animated background atmosphere */}
      <BackgroundAtmosphere />

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
