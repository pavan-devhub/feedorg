import React, { useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// Before the sections' styles, as in the static page's home.css: their rules (e.g. the CTA's
// wider .container) must win over the shared layout utilities here.
import './MyExports.css';
import Hero from './components/Hero/Hero';
import ProgramTree from './components/ProgramTree/ProgramTree';
import FinalCta from './components/FinalCta/FinalCta';
import BackToTop from './components/BackToTop/BackToTop';
import { useProgress } from './hooks/useProgress';
import { useReveal } from './hooks/useReveal';
import useScrollToTop from '../../hooks/useScrollToTop';

export default function MyExports({ onNavigate, isLoggedIn, user, onLogout }) {
  const progress = useProgress();
  const tree = useRef(null);
  useReveal();
  useScrollToTop('exports');

  const focusLesson = (id) => tree.current?.focusLesson(id);
  const showPhase = (id) => tree.current?.showPhase(id);

  return (
    <div className="my-exports-wrapper">
      <Navbar
        onNavigate={onNavigate}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
        currentPage="exports"
      />
      <div className="my-exports-page">
        <main>
          <Hero onExplorePhase={showPhase} />
          <ProgramTree ref={tree} progress={progress} />
          <FinalCta progress={progress} onContinue={focusLesson} onNavigate={onNavigate} />
        </main>
        <BackToTop />
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
