import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ErsAssessmentPanel from '../components/ers/ErsAssessmentPanel';
import useScrollToTop from '../hooks/useScrollToTop';

const ErsAssessment = ({ onNavigate, isLoggedIn, user, onLogout }) => {
  useScrollToTop('ers-assessment');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc' }}>
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="exports" />
      <div style={{ height: '86px', flexShrink: 0 }} />
      <div style={{ flex: 1, maxWidth: '860px', width: '100%', margin: '0 auto', padding: '32px 20px 64px' }}>
        <ErsAssessmentPanel onBack={() => onNavigate('exports')} backLabel="Back to My Exports" />
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default ErsAssessment;
