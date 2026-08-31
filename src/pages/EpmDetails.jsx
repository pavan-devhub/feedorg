import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './EpmDetails.css';

const EpmDetails = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="epm-details-page">
      <div className="epm-details-container">
        
        {/* Header Section */}
        <div className="epm-details-header">
          <button className="epm-header-back-btn" onClick={() => onNavigate('epm')}>
            <ArrowLeft size={18} />
            Back to EPM Page
          </button>
          <h2 className="epm-details-title">EPM Details</h2>
        </div>

        {/* Top Buttons Row */}
        <div className="epm-details-tabs">
          <button 
            className={`epm-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming EPMs
          </button>
          <button 
            className={`epm-tab-btn ${activeTab === 'previous' ? 'active' : ''}`}
            onClick={() => setActiveTab('previous')}
          >
            Previous EPMs
          </button>
        </div>

        {/* Filters Block */}
        <div className="epm-filters-block">
          <div className="epm-filter-group">
            <label>Month:</label>
            <select>
              <option value="">Select Month</option>
              <option value="jan">January</option>
              <option value="feb">February</option>
              <option value="mar">March</option>
              <option value="apr">April</option>
              <option value="may">May</option>
              <option value="jun">June</option>
              <option value="jul">July</option>
              <option value="aug">August</option>
              <option value="sep">September</option>
              <option value="oct">October</option>
              <option value="nov">November</option>
              <option value="dec">December</option>
            </select>
          </div>
          
          <div className="epm-filter-group">
            <label>State:</label>
            <select>
              <option value="">Select State</option>
              <option value="ap">Andhra Pradesh</option>
              <option value="ts">Telangana</option>
            </select>
          </div>

          <div className="epm-filter-group">
            <label>District:</label>
            <select>
              <option value="">Select District</option>
              <option value="guntur">Guntur</option>
              <option value="krishna">Krishna</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
          </div>

          <div className="epm-filter-group">
            <label>Place:</label>
            <select>
              <option value="">Select Place</option>
              <option value="vijayawada">Vijayawada</option>
              <option value="vizag">Vizag</option>
              <option value="warangal">Warangal</option>
            </select>
          </div>
        </div>
        
        {/* Content Area based on tab selection */}
        <div className="epm-details-content">
          {activeTab === 'upcoming' ? (
            <div className="epm-data-placeholder">
              <h3>Upcoming EPMs Content</h3>
              <p>No upcoming EPMs match the selected filters.</p>
            </div>
          ) : (
            <div className="epm-data-placeholder">
              <h3>Previous EPMs Content</h3>
              <p>No previous EPMs match the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpmDetails;
