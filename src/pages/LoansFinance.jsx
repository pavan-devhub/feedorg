import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoansFinanceFrame from '../components/LoansFinanceFrame';
import './LoansFinance.css';

// The LOANS & FINANCE service. Its UI is the separate FeedLoanAndFinance front end, shown at its
// full height under the navbar with the site footer after it - the page scrolls as one.
const LoansFinance = ({ onNavigate, isLoggedIn, user, onLogout }) => (
  <div className="lf-page">
    <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="loans-finance" />
    <div className="lf-page-nav-spacer" />
    <LoansFinanceFrame className="lf-page-frame" />
    <Footer />
  </div>
);

export default LoansFinance;
