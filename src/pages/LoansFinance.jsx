import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LoansHero } from '../components/loans/LoansHero';
import { FinanceStats } from '../components/loans/FinanceStats';
import { FinanceCategories } from '../components/loans/FinanceCategories';
import { FinanceDetailsForm } from '../components/loans/FinanceDetailsForm';
import { FinanceOptionsTable } from '../components/loans/FinanceOptionsTable';
import { GovernmentSchemes } from '../components/loans/GovernmentSchemes';
import { FinancialTools } from '../components/loans/FinancialTools';
import './LoansFinance.css';

// In-page links ("#financial-tools", or a bare "#" placeholder) must not change the URL hash: that
// fires popstate, and App's history handler would treat it as a navigation and go back to home.
// So they are handled here - a link to a section scrolls to it, a placeholder link does nothing.
const handleInPageLink = (event) => {
  const link = event.target.closest?.('a[href^="#"]');
  if (!link) return;
  event.preventDefault();
  const target = document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1)));
  if (!target) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
};

// The LOANS & FINANCE service: the site navbar and footer around the Loans & Finance sections
// (components/loans, imported from the FeedFinanceAndLoans project).
const LoansFinance = ({ onNavigate, isLoggedIn, user, onLogout }) => (
  <div className="lf-page">
    <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="loans-finance" />
    <div className="lf-page-nav-spacer" />
    <div className="lf-content" onClick={handleInPageLink}>
      <LoansHero />
      <FinanceStats />

      <div className="lf-mt-8 lf-flex lf-flex-col lf-w-full">
        <FinanceCategories />
        <FinanceDetailsForm />
        <FinanceOptionsTable />

        {/* Section 4 runs full width, above section 5 */}
        <div className="lf-w-full">
          <GovernmentSchemes />
        </div>

        <div className="lf-w-full">
          <FinancialTools />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default LoansFinance;
