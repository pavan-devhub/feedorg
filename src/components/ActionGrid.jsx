import React from 'react';
import { 
  Lightbulb, MapPin, ClipboardCheck, Package, Handshake, 
  CircleDollarSign, FolderOpen, Ship, Landmark, ShoppingCart, 
  Building2, Monitor, ShieldAlert, GraduationCap, HeadphonesIcon,
  ChevronRight
} from 'lucide-react';

const actions = [
  { id: '01', telugu: 'ఎందుకు ఎగుమతి చేయాలి?', english: 'Why Exports?', grad: 'linear-gradient(180deg, #FDC830 0%, #F37335 100%)', Icon: Lightbulb, colSpan: 3 },
  { id: '02', telugu: 'ఎలా మొదలు పెట్టాలి?', english: 'How to Start?', grad: 'linear-gradient(180deg, #FDC830 0%, #F37335 100%)', Icon: MapPin, colSpan: 3 },
  { id: '03', telugu: 'నమోదు & లైసెన్స్‌లు', english: 'Registrations', grad: 'linear-gradient(180deg, #56AB2F 0%, #288014 100%)', Icon: ClipboardCheck, colSpan: 3 },
  { id: '04', telugu: 'ఉత్పత్తి ఎంపిక', english: 'Product Selection', grad: 'linear-gradient(180deg, #56AB2F 0%, #288014 100%)', Icon: Package, colSpan: 3 },
  
  { id: '05', telugu: 'కొనుగోలుదారుల సంబంధం', english: 'Buyer Connection', grad: 'linear-gradient(180deg, #4A90E2 0%, #005C97 100%)', Icon: Handshake, colSpan: 3 },
  { id: '06', telugu: 'ధర & Finance', english: 'Price & Finance', grad: 'linear-gradient(180deg, #4A90E2 0%, #005C97 100%)', Icon: CircleDollarSign, colSpan: 3 },
  { id: '07', telugu: 'ఎగుమతి పత్రాలు', english: 'Export Documents', grad: 'linear-gradient(180deg, #9D50BB 0%, #6E48AA 100%)', Icon: FolderOpen, colSpan: 3 },
  { id: '08', telugu: 'రవాణా & Shipping', english: 'Logistics & Shipping', grad: 'linear-gradient(180deg, #9D50BB 0%, #6E48AA 100%)', Icon: Ship, colSpan: 3 },
  
  { id: '09', telugu: 'చెల్లింపు & FIRC', english: 'Payment & FIRC', grad: 'linear-gradient(180deg, #38ef7d 0%, #11998e 100%)', Icon: Landmark, colSpan: 3 },
  { id: '10', telugu: 'ఆన్‌లైన్ ఎగుమతి', english: 'E-Commerce Exports', grad: 'linear-gradient(180deg, #38ef7d 0%, #11998e 100%)', Icon: ShoppingCart, colSpan: 3 },
  { id: '11', telugu: 'ప్రభుత్వ ప్రయోజనాలు', english: 'Govt Benefits', grad: 'linear-gradient(180deg, #FF8008 0%, #FF8C00 100%)', Icon: Building2, colSpan: 3 },
  { id: '12', telugu: 'ప్రభుత్వ Dashboards', english: 'Govt Dashboards', grad: 'linear-gradient(180deg, #FF8008 0%, #FF8C00 100%)', Icon: Monitor, colSpan: 3 },
  
  { id: '13', telugu: 'తిరస్కరణ & వివాదాలు', english: 'Rejection & Disputes', grad: 'linear-gradient(180deg, #FF416C 0%, #FF4B2B 100%)', Icon: ShieldAlert, colSpan: 4 },
  { id: '14', telugu: 'నేర్చుకోండి', english: 'Learning & Mentors', grad: 'linear-gradient(180deg, #DA4453 0%, #89216B 100%)', Icon: GraduationCap, colSpan: 4 },
  { id: '15', telugu: 'నా స్థితి & సహాయం', english: 'My Status & Help', grad: 'linear-gradient(180deg, #AA8B56 0%, #6C5B3D 100%)', Icon: HeadphonesIcon, colSpan: 4 },
];

const actionMeta = {
  '01': { category: 'Opportunity', accent: '#D90429', accent2: '#EF233C', surface: '#fff7df', progress: 14, featured: true },
  '02': { category: 'Roadmap', accent: '#F77F00', accent2: '#F9A03F', surface: '#fff4e5', progress: 22 },
  '03': { category: 'Compliance', accent: '#FFB703', accent2: '#FFC300', surface: '#ecf9ef', progress: 32 },
  '04': { category: 'Quality', accent: '#8CB369', accent2: '#A7C957', surface: '#f1fae9', progress: 39 },
  '05': { category: 'Buyers', accent: '#2A9D8F', accent2: '#218380', surface: '#edf6ff', progress: 47 },
  '06': { category: 'Finance', accent: '#00B4D8', accent2: '#48CAE4', surface: '#eaf9f8', progress: 53 },
  '07': { category: 'Paperwork', accent: '#0077B6', accent2: '#023E8A', surface: '#f6f0ff', progress: 60 },
  '08': { category: 'Logistics', accent: '#7209B7', accent2: '#4361EE', surface: '#f0f4ff', progress: 66 },
  '09': { category: 'Payment', accent: '#F72585', accent2: '#B5179E', surface: '#eafbf4', progress: 72 },
  '10': { category: 'Digital', accent: '#4CC9F0', accent2: '#4361EE', surface: '#edf9f0', progress: 77 },
  '11': { category: 'Benefits', accent: '#F8961E', accent2: '#F9C74F', surface: '#fff2e3', progress: 83 },
  '12': { category: 'Portals', accent: '#43AA8B', accent2: '#90BE6D', surface: '#fff3e8', progress: 88 },
  '13': { category: 'Protection', accent: '#577590', accent2: '#277DA1', surface: '#fff0f2', progress: 92 },
  '14': { category: 'Learning', accent: '#F94144', accent2: '#F3722C', surface: '#fff0f6', progress: 96 },
  '15': { category: 'Support', accent: '#5A189A', accent2: '#7B2CBF', surface: '#f8f3e9', progress: 100 },
};

const fallbackMeta = {
  category: 'Export',
  accent: '#1f8d5f',
  accent2: '#f2b441',
  surface: '#f3faf6',
  progress: 50,
};

const ActionGrid = ({ onNavigate, searchQuery = '' }) => {
  const query = searchQuery.toLowerCase();
  const filteredActions = actions.filter(action => 
    action.telugu.toLowerCase().includes(query) || 
    action.english.toLowerCase().includes(query)
  );

  return (
    <div className="action-grid-container">
      <div className="action-grid-header">
        <div>
          <span className="action-grid-kicker">Export Journey</span>
          <h2 className="action-grid-title">Growth actions for every stage</h2>
        </div>
        <div className="action-grid-metrics" aria-label="Action grid summary">
          <span>{filteredActions.length} services</span>
          <span>KYJ roadmap</span>
        </div>
      </div>

      {filteredActions.length === 0 ? (
        <div className="action-empty-state">
          No matching actions found for "{searchQuery}"
        </div>
      ) : (
        <div className="action-grid">
          {filteredActions.map((action) => {
            const meta = actionMeta[action.id] || fallbackMeta;
            const Icon = action.Icon;

            return (
              <button
                key={action.id}
                className={`action-card ${meta.featured ? 'action-card-featured' : ''}`}
                style={{
                  '--action-accent': meta.accent,
                  '--action-accent-2': meta.accent2,
                  '--action-surface': meta.surface,
                  '--action-progress': `${meta.progress}%`,
                }}
                type="button"
                aria-label={`Open ${action.english}`}
                onClick={() => onNavigate('exports')}
              >
                <span className="action-card-shine" aria-hidden="true"></span>

                <span className="action-card-top">
                  <span className="action-card-number">{action.id}</span>
                  <span className="action-card-category">{meta.category}</span>
                </span>

                <span className="action-card-body">
                  <span className="action-icon-container">
                    <Icon size={34} strokeWidth={1.8} className="action-icon-img" />
                  </span>

                  <span className="action-text-content">
                    <span className="action-telugu">{action.telugu}</span>
                    <span className="action-english">{action.english}</span>
                  </span>
                </span>

                <span className="action-card-footer">
                  <span className="action-progress-track" aria-hidden="true">
                    <span className="action-progress-fill"></span>
                  </span>
                  <span className="action-card-arrow-container" aria-hidden="true">
                    <ChevronRight size={18} />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActionGrid;
