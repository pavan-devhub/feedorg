import React from 'react';
import { ChevronRight, Lightbulb, MapPin, ClipboardList, ShoppingBasket, Handshake, CircleDollarSign, FolderOpen, Ship, Landmark, ShoppingCart, Building, Monitor, ShieldAlert, GraduationCap, HeadphonesIcon } from 'lucide-react';

const actions = [
  { id: '01', telugu: 'ఎందుకు ఎగుమతి చేయాలి?', english: 'Why Exports?', grad: 'var(--grad-1)', Icon: Lightbulb, wide: false },
  { id: '02', telugu: 'ఎలా మొదలు పెట్టాలి?', english: 'How to Start?', grad: 'var(--grad-2)', Icon: MapPin, wide: false },
  { id: '03', telugu: 'నమోదు & లైసెన్స్‌కు', english: 'Registrations', grad: 'var(--grad-3)', Icon: ClipboardList, wide: false },
  { id: '04', telugu: 'ఉత్పత్తి ఎంపిక', english: 'Product Selection', grad: 'var(--grad-4)', Icon: ShoppingBasket, wide: false },
  { id: '05', telugu: 'కొనుగోలుదారుల సంబంధం', english: 'Buyer Connection', grad: 'var(--grad-5)', Icon: Handshake, wide: false },
  { id: '06', telugu: 'ధర & Finance', english: 'Price & Finance', grad: 'var(--grad-6)', Icon: CircleDollarSign, wide: false },
  { id: '07', telugu: 'ఎగుమతి పత్రాలు', english: 'Export Documents', grad: 'var(--grad-7)', Icon: FolderOpen, wide: false },
  { id: '08', telugu: 'రవాణా & Shipping', english: 'Logistics & Shipping', grad: 'var(--grad-8)', Icon: Ship, wide: false },
  { id: '09', telugu: 'చెల్లింపు & FIRC', english: 'Payment & FIRC', grad: 'var(--grad-9)', Icon: Landmark, wide: false },
  { id: '10', telugu: 'ఆన్‌లైన్ ఎగుమతి', english: 'E-Commerce Exports', grad: 'var(--grad-10)', Icon: ShoppingCart, wide: false },
  { id: '11', telugu: 'ప్రభుత్వ ప్రయోజనాలు', english: 'Govt Benefits', grad: 'var(--grad-11)', Icon: Building, wide: false },
  { id: '12', telugu: 'ప్రభుత్వ Dashboards', english: 'Govt Dashboards', grad: 'var(--grad-12)', Icon: Monitor, wide: false },
  { id: '13', telugu: 'తిరస్కరణ & వివాదాలు', english: 'Rejection & Disputes', grad: 'var(--grad-13)', Icon: ShieldAlert, wide: false },
  { id: '14', telugu: 'నేర్చుకోండి', english: 'Learning & Mentors', grad: 'var(--grad-14)', Icon: GraduationCap, wide: false },
  { id: '15', telugu: 'నా స్థితి & సహాయం', english: 'My Status & Help', grad: 'var(--grad-15)', Icon: HeadphonesIcon, wide: true },
];

const ActionGrid = () => {
  return (
    <div className="action-grid">
      {actions.map((action) => (
        <div key={action.id} className={`action-card ${action.wide ? 'action-card-wide' : ''}`} style={{ background: action.grad }}>
          <div className="action-card-number">{action.id}</div>
          
          {action.wide ? (
            <>
              <div className="flex flex-col h-full justify-center" style={{ paddingLeft: '32px' }}>
                <p className="action-card-text font-bold mb-1" style={{ fontSize: '13px' }}>{action.telugu}</p>
                <p className="action-card-text" style={{ fontSize: '11px' }}>{action.english}</p>
              </div>
              <div className="flex items-center justify-center">
                <action.Icon size={52} strokeWidth={1} color="rgba(255,255,255,0.9)" />
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 w-full flex items-center justify-center pt-4">
                {action.id === '01' ? (
                  <img src="/icon_lightbulb.png" alt="Lightbulb" className="action-card-icon" style={{ position: 'relative', top: 'auto', marginBottom: '8px' }} />
                ) : (
                  <action.Icon size={42} strokeWidth={1.5} color="rgba(255,255,255,0.9)" className="action-card-icon" style={{ position: 'relative', top: 'auto', marginBottom: '8px' }} />
                )}
              </div>
              <div className="w-full" style={{ paddingRight: '12px' }}>
                <p className="action-card-text font-bold mb-1">{action.telugu}</p>
                <p className="action-card-text">{action.english}</p>
              </div>
            </>
          )}

          <div className="action-card-arrow">
            <ChevronRight size={14} strokeWidth={3} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionGrid;
