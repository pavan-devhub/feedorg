import React from 'react';
import './DistrictModelSection.css';
import pieChartImg from '../../assets/safemissionpiechart.png';

export default function DistrictModelSection() {
  return (
    <section className="district-model-section" id="sm-district-model" aria-label="Integrated District Model">
      <div className="district-model-container">
        {/* Left Column: Heading, Accent Bar & Description */}
        <div className="district-model-content">
          <h2 className="district-model-title">
            <span className="district-title-line district-title-dark">Integrated</span>
            <span className="district-title-line district-title-dark">District Model</span>
            <span className="district-title-line district-title-gold">(20{"\u2011"}Acre AEZ)</span>
          </h2>

          {/* Bi-color Orange-to-Green Accent Bar */}
          <div className="district-accent-bar" aria-hidden="true"></div>

          {/* Explanatory Body Copy */}
          <div className="district-model-text">
            <p className="district-model-paragraph">
              Within a single DSMS, the operational model of SAFE Mission has been designed as a{' '}
              <strong className="district-text-highlight">20{"\u2011"}acre integrated AEZ architecture</strong>.
              This is primarily composed of four operational zones.
            </p>

            <p className="district-model-paragraph">
              Together, these four zones combine{' '}
              <strong className="district-text-highlight">
                production + post-harvest + processing + trade + leasing + animal husbandry + export ecosystem
              </strong>{' '}
              into a single district-level cooperative asset structure.
            </p>
          </div>
        </div>

        {/* Right Column: 20-Acre AEZ Pie Chart Diagram */}
        <div className="district-model-visual">
          <div className="district-model-visual-frame">
            <img
              src={pieChartImg}
              alt="Integrated District Model (20-Acre AEZ) Pie Chart Diagram: Zone 1 Multi-layer Farming 14 acres (70%), Zone 2 Packhouse & CFC 1 acre (5%), Zone 3 High-value Horticulture 3 acres (15%), Zone 4 Animal Husbandry 2 acres (10%)"
              className="district-model-pie-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

