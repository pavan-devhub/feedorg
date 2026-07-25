import React from 'react';
import { Search, Mic } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Search size={18} color="#666" />
        <input 
          type="text" 
          placeholder="Search export services, documents, schemes..." 
          className="text-sm text-gray"
        />
        <div style={{ background: '#2ecc71', borderRadius: '50%', padding: '4px' }}>
          <Mic size={16} color="white" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
