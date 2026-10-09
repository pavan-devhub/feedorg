import React from 'react';
import heroImg from '../../assets/images/loans-finance/header-image.png';

// Rounded, inset header photo with the page title on a tab in its bottom-left corner;
// the introduction sits underneath the photo.
export const LoansHero = () => {
  return (
    <section className="loans-hero">
      <div className="loans-hero__media">
        <img className="loans-hero__image" src={heroImg} alt="Smiling farmer receiving a bundle of rupee notes from a bank officer at the bank counter" />
        <h1 className="loans-hero__title">Loans &amp; <span>Finance</span></h1>
      </div>
      <p className="loans-hero__intro">
        Find the right <span className="loans-hero__intro-accent">finance, loans, subsidies and financial support</span> for your <span className="loans-hero__intro-strong">agriculture, business and export needs.</span>
      </p>
    </section>
  );
};
