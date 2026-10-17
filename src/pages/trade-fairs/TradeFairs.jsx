import React, { useState } from 'react';
import { RotateCw, Search } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TradeFairsHero from './TradeFairsHero';
import FilterDropdown from './FilterDropdown';
import FairsTable from './FairsTable';
import SourcesSection from './SourcesSection';
import { SECTORS, PLACES, YEARS, MONTHS, FAIR_NAMES, FAIRS } from './tradeFairsData';
import './TradeFairs.css';

const EMPTY_FILTERS = { sector: '', place: '', year: '', month: '', name: '' };

// Dropdown shows "Agriculture Sector" but filters on the full ministry name the fairs carry
const SECTOR_OPTIONS = SECTORS.map((sector) => ({ value: sector, label: `${sector.replace(/^Ministry of /, '')} Sector` }));

// Exact sector and place, year and month of the start date, name or city search;
// listed by start date
const filterFairs = (scope, { sector, place, year, month, name }) => {
  const query = name.trim().toLowerCase();
  return FAIRS.filter(
    (fair) =>
      fair.scope === scope &&
      (!sector || fair.sector === sector) &&
      (!place || fair.place === place) &&
      (!year || fair.start.slice(0, 4) === year) &&
      (!month || Number(fair.start.slice(5, 7)) === Number(month)) &&
      (!query || `${fair.name} ${fair.city}`.toLowerCase().includes(query)),
  ).sort((a, b) => (a.start < b.start ? -1 : 1));
};

// The TRADE FAIRS service (Services menu > Trade Fairs): the site navbar and footer around
// the Trade Fairs portal, imported from the Tradeafairs project. That project was built on
// Tailwind; its styles are ported to TradeFairs.css, scoped to this page.
const TradeFairs = ({ onNavigate, isLoggedIn, user, onLogout }) => {
  const [scope, setScope] = useState('international');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  // Country/State options depend on the scope, so switching starts from a clean filter set.
  // Any scope or filter change goes back to the first page of results.
  const changeScope = (next) => {
    if (next === scope) return;
    setScope(next);
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };
  const setFilter = (key) => (value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };
  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  return (
    <div className="tf-page">
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="TradeFairs" />

      <div className="tf-content">
        <TradeFairsHero scope={scope} onScopeChange={changeScope} />

        <main className="tf-shell tf-finder-wrap">
          {/* Find a fair */}
          <div className="tf-card tf-finder">
            {/* Soft blue sweep in the bottom-right corner */}
            <svg aria-hidden="true" className="tf-finder__wave" viewBox="0 0 340 235" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tf-card-wave-a" x1="0" x2="1" y1="1" y2="0">
                  <stop offset="0" stopColor="#eef5fd" stopOpacity="0" />
                  <stop offset="1" stopColor="#e8f1fc" />
                </linearGradient>
                <linearGradient id="tf-card-wave-b" x1="0" x2="1" y1="1" y2="0">
                  <stop offset="0" stopColor="#f4f8fe" stopOpacity="0" />
                  <stop offset="1" stopColor="#f3f8fe" />
                </linearGradient>
              </defs>
              <path d="M0 235C110 205 215 125 340 18V235Z" fill="url(#tf-card-wave-a)" />
              <path d="M120 235C205 210 275 165 340 118V235Z" fill="url(#tf-card-wave-b)" />
            </svg>

            <div className="tf-finder__head">
              <span className="tf-finder__accent" />
              <Search className="tf-finder__icon" size={28} strokeWidth={2} />
              <h2 className="tf-finder__title">Find a fair</h2>
            </div>

            <div className="tf-filters">
              <div className="tf-filter">
                <label htmlFor="filter-sector" className="tf-filter__label">Sector</label>
                <FilterDropdown id="filter-sector" value={filters.sector} onChange={setFilter('sector')} options={SECTOR_OPTIONS} />
              </div>
              <div className="tf-filter">
                <label htmlFor="filter-place" className="tf-filter__label">{scope === 'international' ? 'Country' : 'State'}</label>
                <FilterDropdown id="filter-place" value={filters.place} onChange={setFilter('place')} options={PLACES[scope]} />
              </div>
              <div className="tf-filter">
                <label htmlFor="filter-year" className="tf-filter__label">Year</label>
                <FilterDropdown id="filter-year" value={filters.year} onChange={setFilter('year')} options={YEARS} />
              </div>
              <div className="tf-filter">
                <label htmlFor="filter-month" className="tf-filter__label">Month</label>
                <FilterDropdown id="filter-month" value={filters.month} onChange={setFilter('month')} options={MONTHS} />
              </div>
              <div className="tf-filter">
                <label htmlFor="filter-name" className="tf-filter__label">Fair name</label>
                <input
                  id="filter-name"
                  type="text"
                  list="fair-names"
                  autoComplete="off"
                  placeholder="Type part of a name"
                  value={filters.name}
                  onChange={(event) => setFilter('name')(event.target.value)}
                  className="tf-control tf-control--text"
                />
                <datalist id="fair-names">
                  {FAIR_NAMES[scope].map((name) => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
            </div>

            <button type="button" onClick={clearFilters} className="tf-clear">
              <RotateCw size={18} strokeWidth={2} /> Clear filters
            </button>
          </div>
        </main>

        <FairsTable
          scope={scope}
          fairs={filterFairs(scope, filters)}
          page={page}
          onPageChange={setPage}
          onClearFilters={clearFilters}
        />

        <SourcesSection />
      </div>

      <Footer />
    </div>
  );
};

export default TradeFairs;
