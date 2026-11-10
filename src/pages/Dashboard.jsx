import React, { useEffect, useMemo, useState } from 'react';
import {
  Bell, ChevronDown, User, Package, Users, FileText, Star, Settings,
  Users2, Calendar, Sprout, ShieldCheck, Banknote, BookOpen,
  ArrowRightLeft, BarChart3, Activity, MoreHorizontal,
  BellRing, ShoppingCart, Link2, ChevronRight, ArrowRight, TrendingUp,
  Megaphone, MapPin, CloudRain, Info, ScrollText,
  Coins, Crown, ClipboardList, Warehouse, Wallet, Landmark, Receipt,
  Briefcase, GraduationCap, Truck, Stethoscope, Tractor, Cpu, Palette, Smartphone, Tag,
  Ship, Store, Building2, Layers, Key, PawPrint, Globe2, UserCog, PhoneCall,
  House, CalendarDays, Globe, HandCoins
} from 'lucide-react';
import './Dashboard.css';
import MyDetailsForm from '../components/MyDetailsForm';
import ErsAssessmentPanel from '../components/ers/ErsAssessmentPanel';
import MyEpmActivities from '../components/dashboard/MyEpmActivities';
import useMyNotifications from '../hooks/useMyNotifications';
import WelcomeHero from '../components/dashboard/WelcomeHero';
import { CommodityIcon, MarketChartIcon, TrendArrow } from '../components/dashboard/WidgetArt';
import HomeServices from '../components/HomeServices';
import { buildPersonalUpdates } from '../utils/personalUpdates';
import { TONE_COLORS, describeNotification, openNotificationLink, timeAgo } from '../utils/notifications';
import PlansPage from '../components/plans/PlansPage';
import { plans, CURRENT_PLAN_ID } from '../components/plans/plansData';
import useScrollToTop from '../hooks/useScrollToTop';
import scrollToSection from '../utils/scrollToSection';

const sidebarMenu = [
  {
    category: '',
    items: [
      // The dashboard's landing screen (hero, ERS / coins / plan, quick access, alerts).
      { id: 'home', title: 'Home', icon: House, color: '#2563eb' },
      {
        id: 'profile', title: 'My Profile', icon: User, color: '#1e293b',
        subItems: [
          { id: 'profile-details', title: 'My Details', icon: User },
          { id: 'profile-products', title: 'My Products', icon: Package },
          { id: 'profile-vendors', title: 'My Vendors', icon: Users },
          { id: 'profile-certificates', title: 'My Certificates & Licences', icon: FileText },
          { id: 'profile-testimonials', title: 'My Testimonials', icon: Star },
          { id: 'profile-subscriptions', title: 'Active Subscriptions', icon: Settings },
        ]
      },
      {
        id: 'org', title: 'MY Org', icon: Users, color: '#4338ca',
        subItems: [
          { id: 'org-about', title: 'About My Org', icon: Info },
          {
            id: 'org-members', title: 'My Members', icon: Users2,
            subItems: [
              { id: 'org-members-share-capital', title: 'Share Capital Registry - All Options', icon: ArrowRightLeft },
              { id: 'org-members-ledger', title: 'Member Ledger', icon: ScrollText },
            ]
          },
          { id: 'org-agm', title: 'AGM & BoD Meetings', icon: Calendar },
          { id: 'org-farm-activity', title: 'Farm Activity', icon: Sprout },
          { id: 'org-schemes', title: 'Schemes', icon: ShieldCheck },
          { id: 'org-loans', title: 'Loans & Finance', icon: Banknote },
        ]
      },
      {
        id: 'accounts', title: 'My Accounts', icon: Layers, color: '#ea580c',
        subItems: [
          {
            id: 'accounts-registers', title: 'My Registers', icon: ScrollText,
            subItems: [
              { id: 'accounts-registers-purchase', title: 'Purchase Registry', icon: ClipboardList },
              { id: 'accounts-registers-sales', title: 'Sales Registry', icon: TrendingUp },
              { id: 'accounts-registers-stock', title: 'Stock Registry', icon: Warehouse },
            ]
          },
          {
            id: 'accounts-transactions', title: 'My Transactions', icon: ArrowRightLeft,
            subItems: [
              { id: 'accounts-transactions-cashbook', title: 'Cash Book Registry', icon: Wallet },
              { id: 'accounts-transactions-bank', title: 'Bank Registry', icon: Landmark },
              { id: 'accounts-transactions-expenses', title: 'Expenses Registry', icon: Receipt },
            ]
          },
        ]
      },
      {
        id: 'reports', title: 'My Reports', icon: BarChart3, color: '#e11d48',
        subItems: [
          { id: 'reports-ledger', title: 'Ledger Registry', icon: ScrollText },
          { id: 'reports-financial', title: 'Financial Reports', icon: FileText },
        ]
      },
      { id: 'status', title: 'Status of Activities', icon: Activity, color: '#16a34a' },
      { id: 'compliances', title: 'My Compliances', icon: ShieldCheck, color: '#16a34a' },
      {
        id: 'other', title: 'Other Services', icon: MoreHorizontal, color: '#1e293b',
        subItems: [
          { id: 'other-org-business-plan', title: 'Org Business Plan', icon: Briefcase },
          { id: 'other-capacity-building', title: 'Capacity Building', icon: GraduationCap },
          { id: 'other-godown-storage', title: 'Godown/Storage', icon: Warehouse },
          { id: 'other-logistics', title: 'Logistics - Item Tracking', icon: Truck },
          { id: 'other-farm-advisory', title: 'Farm Advisory Services/Crop Doctor', icon: Stethoscope },
          { id: 'other-agri-inputs', title: 'Seeds, Fertilizers, Agri Machinery', icon: Tractor },
          { id: 'other-technology', title: 'Technology', icon: Cpu },
          { id: 'other-branding', title: 'Branding & Promotion', icon: Palette },
          { id: 'other-digital-marketing', title: 'Digital Marketing', icon: Smartphone },
        ]
      },
      {
        id: 'news', title: 'News & Alerts', icon: Bell, color: '#f97316',
        subItems: [
          { id: 'news-alerts-notifications', title: 'Alerts & Notifications', icon: Bell },
          { id: 'news-offers-coupons', title: 'Offers & Coupons', icon: Tag },
          { id: 'news-subscriptions-plans', title: 'Subscriptions & Plans', icon: Settings },
        ]
      },
      {
        id: 'trade', title: 'My Trade', icon: ShoppingCart, color: '#15803d',
        subItems: [
          {
            id: 'trade-plans', title: 'My Plans', icon: ClipboardList,
            subItems: [
              // `page` items open a site page instead of a dashboard section.
              { id: 'trade-plans-export', title: 'Export - KYJ with FEED', icon: Ship, page: 'kyj' },
              {
                id: 'trade-plans-domestic', title: 'Domestic Trade', icon: Store,
                subItems: [
                  { id: 'trade-plans-domestic-tenders', title: 'Tenders & Institutional Domestic Supply', icon: Building2 },
                  { id: 'trade-plans-domestic-ecommerce', title: 'E-commerce - My Market', icon: ShoppingCart },
                  { id: 'trade-plans-domestic-value-addition', title: 'Value Addition', icon: Layers },
                  { id: 'trade-plans-domestic-cfc', title: 'CFC - Give Place for Hire', icon: Key },
                  { id: 'trade-plans-domestic-animal-husbandry', title: 'Animal Husbandry', icon: PawPrint },
                ]
              },
            ]
          },
          {
            id: 'trade-connections', title: 'My Connections', icon: Users2,
            subItems: [
              { id: 'trade-connections-export', title: 'Export Connections - International Buyers', icon: Globe2 },
              { id: 'trade-connections-domestic', title: 'Domestic Connections - My Market Trade Buyers (Vendors)', icon: Users },
            ]
          },
        ]
      },
      {
        id: 'directory', title: 'Directory', icon: BookOpen, color: '#0d9488',
        subItems: [
          { id: 'directory-officers', title: 'Horticulture/Agriculture Officers', icon: UserCog },
          { id: 'directory-input-dealers', title: 'Input Seed / Dealers Numbers', icon: Tractor },
          { id: 'directory-govt-schemes', title: 'Govt. Loans & Schemes', icon: Landmark },
          { id: 'directory-nbfcs', title: 'NBFCs & Financial Services', icon: Coins },
          { id: 'directory-farm-service', title: 'Farm Service Contacts', icon: PhoneCall },
          { id: 'directory-feed-offices', title: 'FEED Office Numbers - Dist. Wise', icon: MapPin },
        ]
      },
    ]
  }
];

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../api/config';

// "FEED Updates" card at the top of the sidebar - each one opens the page it's about.
const feedUpdates = [
  { id: 'epm', icon: CalendarDays, tone: 'green', title: 'EPM Registrations Open –', sub: 'Next Meet on Dec 15', page: 'epm' },
  { id: 'safe-mission', icon: FileText, tone: 'orange', title: 'Safe Mission – New', sub: 'Guidelines Released', page: 'safe-mission' },
  { id: 'feedworld', icon: Globe, tone: 'purple', title: 'FEED World – Nov Edition', sub: 'Now Available', page: 'feedworld' },
];

// The FEED Updates card shows this many at a time while the list rolls upwards. The list is repeated
// enough times that, after moving up by one full pass, the window is still full - even when there
// are fewer updates than it shows.
const UPDATES_VISIBLE = 5;
const updateCopies = Math.max(2, 1 + Math.ceil(UPDATES_VISIBLE / feedUpdates.length));
const rollingUpdates = Array.from({ length: updateCopies }, () => feedUpdates).flat();

// `crop` picks the commodity's drawing and tile colour (see CommodityIcon in WidgetArt).
const marketItems = [
  { id: 5, name: 'Sugarcane', price: '₹3,150', trend: 'up', percent: '+0.5%', crop: 'sugarcane' },
  { id: 6, name: 'Mustard', price: '₹5,400', trend: 'up', percent: '+4.2%', crop: 'mustard' },
  { id: 1, name: 'Wheat', price: '₹2,200', trend: 'up', percent: '+2.4%', crop: 'wheat' },
  { id: 2, name: 'Rice (Paddy)', price: '₹2,100', trend: 'down', percent: '-1.2%', crop: 'rice' },
  { id: 3, name: 'Soyabean', price: '₹4,500', trend: 'up', percent: '+3.8%', crop: 'soyabean' },
  { id: 4, name: 'Maize', price: '₹2,350', trend: 'up', percent: '+0.5%', crop: 'maize' },
];

const alertsData = [
  {
    id: 1, tag: 'New', icon: Megaphone, iconBg: '#ddf8d6', iconColor: '#1f9a35',
    title: 'New Subsidy Scheme Announced',
    desc: 'Get up to 50% subsidy on drip irrigation equipment.',
    time: '2 hours ago',
  },
  {
    id: 2, icon: GraduationCap, iconBg: '#feebc8', iconColor: '#f06d14',
    title: 'Training Program Update',
    desc: 'Farmers Training Program scheduled on 28 May.',
    time: '5 hours ago',
  },
  {
    id: 3, icon: Info, iconBg: '#d9ebfd', iconColor: '#1f63d6',
    title: 'Market Update',
    desc: 'Wheat prices increased by 2.4% in your region.',
    time: '1 day ago',
  },
];

const activityData = [
  {
    id: 4, icon: FileText, iconBg: '#f1e2fd', iconColor: '#9a2bd8',
    title: 'Report Generated', desc: 'Monthly report for April generated', time: '2 days ago',
  },
  {
    id: 1, icon: User, iconBg: '#dbeafe', iconColor: '#2563eb',
    title: 'Profile Updated', desc: 'You updated your profile information', time: '2 hours ago',
  },
  {
    id: 2, icon: Package, iconBg: '#d3f6dc', iconColor: '#16903a',
    title: 'Product Added', desc: 'You added new product: Organic Wheat', time: '5 hours ago',
  },
  {
    id: 3, icon: Users, iconBg: '#fde5d0', iconColor: '#f2681a',
    title: 'New Member Joined', desc: 'Ramesh Kumar joined your organization', time: '1 day ago',
  },
];

// Notification kinds the "Latest Alerts & Announcements" widget shows: changes to the user's
// EPMs and their countdown reminders, newly announced EPMs and new Feed World issues (their own
// sign-ups only go to the bell).
const ALERT_TYPES = ['epm-update', 'epm-reminder', 'new-epm', 'new-publication'];

const Dashboard = ({ onNavigate, isLoggedIn, user, onLogout, navState }) => {
  const [activeTab, setActiveTab] = useState(navState?.tab || 'home');
  const [openMenus, setOpenMenus] = useState({});
  const [ersPanelOpen, setErsPanelOpen] = useState(false);
  const [plansPanelOpen, setPlansPanelOpen] = useState(false);
  // `loaded` once /api/ers/status has answered - until then the banner leaves ERS out.
  const [ersStatus, setErsStatus] = useState({ loaded: false, attempted: false, percentage: 0, passed: false, completedOn: null });
  const notifications = useMyNotifications();
  const welcomeName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() || 'FEED Member';

  // A link into the dashboard (e.g. a notification's { tab: 'status' }) opens that section. App
  // makes a new navState on every navigation, so this re-runs even when the tab is the same.
  useEffect(() => {
    if (navState?.tab) {
      setActiveTab(navState.tab);
      setErsPanelOpen(false);
      setPlansPanelOpen(false);
    }
  }, [navState]);

  // Until the notifications load (or if they can't), the widget just shows its standing announcements.
  const epmAlerts = useMemo(() => (notifications || [])
    .filter((n) => ALERT_TYPES.includes(n.type))
    .map((n) => {
      const d = describeNotification(n);
      const [iconBg, iconColor] = TONE_COLORS[d.tone] || TONE_COLORS.blue;
      return {
        id: n.id, icon: d.icon, iconBg, iconColor, title: d.title, desc: d.message,
        tag: n.unread ? 'New' : null, time: timeAgo(n.createdAt), link: d.link,
      };
    }), [notifications]);

  const alerts = [...epmAlerts, ...alertsData];

  // What the welcome banner cycles through once the greeting has tucked into its corner.
  const personalUpdates = useMemo(
    () => buildPersonalUpdates({ notifications, ers: ersStatus }),
    [notifications, ersStatus],
  );

  // The ERS and Plan cards sit under the sidebar on every view, so either can be clicked while the
  // other's panel is open: each closes the other, or ERS (checked first) would keep the screen.
  const openErsPanel = () => {
    setPlansPanelOpen(false);
    setErsPanelOpen(true);
  };
  const openPlansPanel = () => {
    setErsPanelOpen(false);
    setPlansPanelOpen(true);
  };

  const openPersonalUpdate = (update) => {
    if (update.action === 'ers') openErsPanel();
    else openNotificationLink(update.link, onNavigate);
  };

  // activeTab/ersPanelOpen/plansPanelOpen together decide what's on screen inside the
  // dashboard - none of them touch App.jsx's currentPage, so this view needs its own reset.
  useScrollToTop(plansPanelOpen ? 'plans' : ersPanelOpen ? 'ers' : activeTab);

  const currentPlan = plans.find((p) => p.id === CURRENT_PLAN_ID) || plans[0];

  const ERS_RING_RADIUS = 36;
  const ERS_RING_CIRCUMFERENCE = 2 * Math.PI * ERS_RING_RADIUS;
  const ersRingOffset = ERS_RING_CIRCUMFERENCE * (1 - (ersStatus.attempted ? ersStatus.percentage : 0) / 100);
  const ersStatusTone = !ersStatus.attempted ? 'pending' : ersStatus.passed ? 'pass' : 'fail';
  const ersCtaLabel = !ersStatus.attempted ? 'Start Assessment' : ersStatus.passed ? 'View Results' : 'Retake Assessment';
  const ersCtaSubtext = !ersStatus.attempted ? 'Begin your empowerment journey' : ersStatus.passed ? 'See your certificate & score' : 'Track your progress and improve';
  const ersEncourageTitle = !ersStatus.attempted ? "Let's\nBegin!" : ersStatus.passed ? 'Great\nProgress!' : 'Keep\nGoing!';
  const ersEncourageText = !ersStatus.attempted
    ? 'Take the test'
    : ersStatus.passed
      ? 'Keep it up!'
      : "You're close";
  const ersCompletedOnLabel = ersStatus.completedOn
    ? new Date(ersStatus.completedOn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  const KRISHI_COINS_BALANCE = 12450;
  const [coinsDisplay, setCoinsDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCoinsDisplay(Math.round(eased * KRISHI_COINS_BALANCE));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const fetchErsStatus = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return;
      const res = await fetch(`${API_BASE_URL}/api/ers/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.attempted) {
        setErsStatus({
          loaded: true,
          attempted: true,
          percentage: data.status.percentage,
          passed: data.status.passed,
          completedOn: data.status.createdAt,
        });
      } else {
        setErsStatus({ loaded: true, attempted: false, percentage: 0, passed: false, completedOn: null });
      }
    } catch (e) {
      console.error('Failed to fetch ERS status', e);
    }
  };

  useEffect(() => {
    fetchErsStatus();
  }, []);

  const toggleMenu = (depth, id) => {
    setOpenMenus(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (Number(k) >= depth) delete next[k]; });
      if (prev[depth] !== id) next[depth] = id;
      return next;
    });
  };

  // "See All" on FEED Updates: back to the dashboard home and down to its alerts list.
  const showAllUpdates = () => {
    setErsPanelOpen(false);
    setPlansPanelOpen(false);
    setActiveTab('home');
    setTimeout(() => scrollToSection('db-alerts'), 60);
  };

  const branchContainsActive = (item) => {
    if (item.id === activeTab) return true;
    return !!item.subItems && item.subItems.some(branchContainsActive);
  };

  const firstLeafId = (item) => (item.subItems ? firstLeafId(item.subItems[0]) : item.id);

  const renderNavItems = (items, depth = 0) => (
    <ul className={depth === 0 ? 'db-nav-list' : 'db-nav-sublist'}>
      {items.map(item => {
        const hasSubItems = !!item.subItems;
        const isOpen = openMenus[depth] === item.id;
        const isActiveBranch = branchContainsActive(item);
        return (
          <React.Fragment key={item.id}>
            <li
              className={`${depth === 0 ? 'db-nav-item' : 'db-nav-subitem'} ${isActiveBranch ? 'active' : ''}`}
              style={item.color ? { '--db-nav-color': item.color } : undefined}
              onClick={(e) => {
                e.stopPropagation();
                // Any sidebar choice leaves the ERS / Plans panels, so e.g. Home always lands home.
                setErsPanelOpen(false);
                setPlansPanelOpen(false);
                if (item.page) {
                  onNavigate(item.page);
                } else if (hasSubItems) {
                  toggleMenu(depth, item.id);
                  setActiveTab(firstLeafId(item));
                } else {
                  setActiveTab(item.id);
                }
              }}
            >
              <item.icon size={depth === 0 ? 20 : 15} strokeWidth={depth === 0 ? 2.1 : 2} className="db-nav-icon" />
              <span className="db-nav-title">{item.title}</span>
              {hasSubItems && (
                <ChevronDown
                  size={16}
                  className="db-nav-arrow"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                />
              )}
            </li>
            {hasSubItems && isOpen && renderNavItems(item.subItems, depth + 1)}
          </React.Fragment>
        );
      })}
    </ul>
  );

  // Simulated active tabs logic from ExportsPortal...
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc' }}>
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="dashboard" />
      <div className="db-layout">
      
      {/* 1. LEFT COLUMN: the FEED Updates card, the navigation card, then the ERS / Krishi Coins / Plan
          cards stacked under them */}
      <div className="db-left-col">
        {/* FEED Updates: a card of its own above the navigation */}
        <section className="db-updates">
          <div className="db-updates-head">
            {/* blue swoosh: drops from the right edge to the bottom-left, light band under it, sunrise glow top-right */}
            <svg className="db-updates-wave" viewBox="0 0 340 112" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="dbUpdBlue" x1="0" y1="0.3" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1d4ed8" />
                  <stop offset="45%" stopColor="#1f5ae0" />
                  <stop offset="80%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="dbUpdSheen" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.75" />
                  <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="dbUpdUnder" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.75" />
                  <stop offset="55%" stopColor="#bfdbfe" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#dbeafe" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="dbUpdSun" x1="1" y1="0.4" x2="0.55" y2="0">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="40%" stopColor="#fb923c" stopOpacity="0.95" />
                  <stop offset="75%" stopColor="#fed7aa" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <filter id="dbUpdSoft" x="-30%" y="-60%" width="160%" height="220%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
                <filter id="dbUpdSoftSm" x="-20%" y="-100%" width="140%" height="300%">
                  <feGaussianBlur stdDeviation="1.2" />
                </filter>
                <clipPath id="dbUpdClip">
                  <path d="M0 0 H340 V31 C 316 37, 274 50, 232 56 C 180 63, 90 66, 0 66 Z" />
                </clipPath>
              </defs>
              {/* pale wave peeking out under the left half of the edge */}
              <path d="M0 66 C 90 66, 180 63, 232 56 L 236 59 C 182 68, 92 74, 0 76 Z" fill="url(#dbUpdUnder)" />
              {/* main blue: flat on the left, sweeping up to the right edge */}
              <path d="M0 0 H340 V31 C 316 37, 274 50, 232 56 C 180 63, 90 66, 0 66 Z" fill="url(#dbUpdBlue)" />
              {/* lighter blue swoosh riding just above the edge */}
              <path d="M0 50 C 90 50, 182 46, 238 37 C 280 30, 314 18, 340 8 V 31 C 316 37, 274 50, 232 56 C 180 63, 90 66, 0 66 Z" fill="url(#dbUpdSheen)" />
              {/* sunrise stripe across the top-right corner */}
              <g clipPath="url(#dbUpdClip)">
                <path d="M204 -12 H356 V50 C 320 30, 274 4, 204 -12 Z" fill="url(#dbUpdSun)" filter="url(#dbUpdSoft)" />
              </g>
              <path d="M314 41 C 324 38, 332 35, 340 31 V 35 C 332 38, 324 41, 316 44 Z" fill="#22c55e" opacity="0.85" filter="url(#dbUpdSoftSm)" />
            </svg>
            <span className="db-updates-head-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path d="M3.2 9.2 H6.4 L14.6 4.6 V19.4 L6.4 14.8 H3.2 A1.2 1.2 0 0 1 2 13.6 V10.4 A1.2 1.2 0 0 1 3.2 9.2 Z" fill="currentColor" />
                <path d="M6.6 15.2 L7.9 19.2 A1 1 0 0 0 8.85 19.9 H9.9 A0.8 0.8 0 0 0 10.65 18.85 L9.6 15.9 Z" fill="currentColor" />
                <path d="M17.6 8.6 L20.2 7.2 M18.1 12 H21.2 M17.6 15.4 L20.2 16.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              </svg>
            </span>
            <h2 className="db-updates-title">FEED Updates</h2>
            <button type="button" className="db-updates-see-all" onClick={showAllUpdates}>
              See All <ArrowRight size={13} strokeWidth={2.6} />
            </button>
          </div>
          {/* The updates roll upwards endlessly: the list is repeated so the loop is seamless, and
              the copies are hidden from screen readers and the keyboard. Pauses under the pointer. */}
          <div className="db-updates-window">
            <ul className="db-updates-list" style={{ '--upd-copies': updateCopies, '--upd-count': feedUpdates.length }}>
              {rollingUpdates.map((u, idx) => {
                const isCopy = idx >= feedUpdates.length;
                return (
                  <li key={`${u.id}-${idx}`} aria-hidden={isCopy || undefined}>
                    <button type="button" className="db-update-item" onClick={() => onNavigate(u.page)} tabIndex={isCopy ? -1 : undefined}>
                      <span className={`db-update-icon is-${u.tone}`}><u.icon size={18} strokeWidth={2.2} /></span>
                      <span className="db-update-text">{u.title}<br />{u.sub}</span>
                      <ChevronRight size={20} strokeWidth={2.4} className="db-update-arrow" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Navigation card: Home onwards, with the farm scene at its foot */}
        <aside className="db-sidebar">
          <div className="db-sidebar-content">
            <nav className="db-nav">
              {sidebarMenu.map((group, gIdx) => (
                <div key={gIdx} className="db-nav-group">
                  {group.category && <h3 className="db-nav-category">{group.category}</h3>}
                  {renderNavItems(group.items)}
                </div>
              ))}
            </nav>

            {/* Farm scene at the foot of the sidebar: peach hills, tractor on a striped field, sun, trees */}
            <svg className="db-sidebar-farm" viewBox="0 0 376 125" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="dbFarmSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="55%" stopColor="#fff7e8" />
                  <stop offset="100%" stopColor="#fdebc8" />
                </linearGradient>
                <radialGradient id="dbFarmGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="45%" stopColor="#fde68a" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="dbFarmSunDisc" cx="0.45" cy="0.45" r="0.6">
                  <stop offset="0%" stopColor="#fffdf0" />
                  <stop offset="70%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fde68a" />
                </radialGradient>
                <linearGradient id="dbFarmPeachBack" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#ffedd5" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="dbFarmPeach" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fdba74" />
                  <stop offset="100%" stopColor="#fed7aa" />
                </linearGradient>
                <linearGradient id="dbFarmHillBack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d9f99d" />
                  <stop offset="35%" stopColor="#a3e635" />
                  <stop offset="100%" stopColor="#65a30d" />
                </linearGradient>
                <linearGradient id="dbFarmHillFront" x1="0" y1="0" x2="0.4" y2="1">
                  <stop offset="0%" stopColor="#bef264" />
                  <stop offset="45%" stopColor="#84cc16" />
                  <stop offset="100%" stopColor="#4d7c0f" />
                </linearGradient>
                <radialGradient id="dbFarmTreeDark" cx="0.35" cy="0.3" r="0.75">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="55%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#14532d" />
                </radialGradient>
                <radialGradient id="dbFarmTreeLight" cx="0.35" cy="0.3" r="0.75">
                  <stop offset="0%" stopColor="#d9f99d" />
                  <stop offset="55%" stopColor="#a3c93a" />
                  <stop offset="100%" stopColor="#65a30d" />
                </radialGradient>
              </defs>

              {/* sky wash + sun with rays */}
              <rect x="0" y="0" width="376" height="125" fill="url(#dbFarmSky)" />
              <circle cx="266" cy="54" r="58" fill="url(#dbFarmGlow)" />
              <g stroke="#fde68a" strokeWidth="2.4" strokeLinecap="round" opacity="0.8">
                <path d="M240 50 L226 47" />
                <path d="M243 39 L230 32" />
                <path d="M250 30 L241 19" />
                <path d="M260 25 L257 11" />
                <path d="M272 25 L275 11" />
                <path d="M282 30 L291 19" />
                <path d="M289 39 L302 32" />
                <path d="M292 50 L306 47" />
              </g>
              <circle cx="266" cy="54" r="22" fill="url(#dbFarmSunDisc)" stroke="#fde68a" strokeWidth="2" strokeOpacity="0.85" />

              {/* peach hills, far left */}
              <path d="M0 40 C 18 36, 34 40, 52 50 C 72 60, 96 68, 130 74 L130 125 L0 125 Z" fill="url(#dbFarmPeachBack)" />
              <path d="M0 52 C 16 48, 30 52, 46 62 C 62 72, 82 80, 104 86 L 0 125 Z" fill="url(#dbFarmPeach)" />

              {/* hedge along the back hill + trees */}
              <path d="M236 68 C 238 62, 246 60, 250 63 C 252 57, 262 56, 266 60 C 270 55, 280 55, 284 59 C 288 54, 298 55, 300 59 C 304 54, 314 54, 318 58 C 322 53, 332 54, 334 58 C 338 53, 348 53, 350 57 C 354 52, 366 52, 368 57 C 372 54, 378 55, 380 58 L380 72 L236 72 Z" fill="#166534" />
              <path d="M244 68 C 248 64, 254 63, 258 66 C 262 62, 270 62, 274 65 C 280 61, 288 62, 292 65 C 298 61, 306 62, 310 65 C 316 61, 324 62, 328 65 C 334 61, 342 62, 346 65 C 352 61, 360 62, 364 65 C 368 62, 376 62, 380 64 L380 72 L244 72 Z" fill="#15803d" />
              {/* big dark tree, right */}
              <path d="M347 66 L347 46 M347 52 L340 44 M347 50 L355 42" stroke="#713f12" strokeWidth="3" strokeLinecap="round" fill="none" />
              <g fill="url(#dbFarmTreeDark)">
                <circle cx="334" cy="40" r="11" />
                <circle cx="346" cy="30" r="13" />
                <circle cx="359" cy="39" r="11" />
                <circle cx="339" cy="47" r="9" />
                <circle cx="355" cy="47" r="9" />
              </g>
              {/* olive tree, middle */}
              <path d="M199 74 L199 52 M199 58 L194 53 M199 56 L204 51" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <g fill="url(#dbFarmTreeLight)">
                <circle cx="192" cy="48" r="7.5" />
                <circle cx="199" cy="42" r="9" />
                <circle cx="206.5" cy="48" r="7.5" />
                <circle cx="199" cy="51" r="6.5" />
              </g>
              <circle cx="172" cy="74" r="6" fill="#84cc16" />
              <circle cx="179" cy="76" r="4" fill="#65a30d" />

              {/* back rolling hill with field rows */}
              <path d="M118 92 C 150 78, 192 66, 242 63 C 292 60, 332 60, 376 64 L376 125 L118 125 Z" fill="url(#dbFarmHillBack)" />
              <g fill="none" strokeLinecap="round">
                <path d="M150 90 C 202 76, 282 70, 376 72" stroke="#ecfccb" strokeOpacity="0.55" strokeWidth="1.4" />
                <path d="M164 100 C 218 86, 298 79, 376 81" stroke="#facc15" strokeOpacity="0.55" strokeWidth="1.4" />
                <path d="M184 110 C 238 96, 314 89, 376 91" stroke="#ecfccb" strokeOpacity="0.5" strokeWidth="1.4" />
                <path d="M210 121 C 262 106, 330 99, 376 101" stroke="#facc15" strokeOpacity="0.5" strokeWidth="1.4" />
                <path d="M250 125 C 290 116, 340 110, 376 111" stroke="#ecfccb" strokeOpacity="0.45" strokeWidth="1.4" />
              </g>

              {/* front field (left) with curved rows */}
              <path d="M0 86 C 40 82, 90 82, 130 88 C 172 94, 216 108, 262 125 L0 125 Z" fill="url(#dbFarmHillFront)" />
              <g fill="none" strokeLinecap="round">
                <path d="M0 93 C 52 89, 116 92, 164 104 C 190 111, 210 118, 226 125" stroke="#facc15" strokeOpacity="0.6" strokeWidth="1.5" />
                <path d="M0 102 C 46 98, 98 101, 138 111 C 156 116, 170 121, 180 125" stroke="#ecfccb" strokeOpacity="0.55" strokeWidth="1.5" />
                <path d="M0 111 C 40 108, 80 111, 112 118 C 122 121, 130 123, 136 125" stroke="#facc15" strokeOpacity="0.55" strokeWidth="1.5" />
                <path d="M0 119 C 30 117, 60 119, 86 125" stroke="#ecfccb" strokeOpacity="0.5" strokeWidth="1.5" />
              </g>

              {/* tractor */}
              <g fill="#1e4d2b">
                <rect x="83" y="49" width="25" height="3.6" rx="1.6" />
                <rect x="85" y="51" width="3.2" height="18" />
                <rect x="103" y="51" width="3" height="14" />
                <path d="M88 58 H96 L98 66 H88 Z" />
                <circle cx="93" cy="56.5" r="2.6" />
                <path d="M86 64 H128 A4 4 0 0 1 132 68 V75 H86 Z" />
                <rect x="116" y="53" width="2.8" height="11" rx="1" />
                <path d="M67 74 A15 15 0 0 1 97 74 Z" />
              </g>
              <path d="M107 66.5 H127 M107 70 H127" stroke="#4ade80" strokeOpacity="0.35" strokeWidth="1" />
              <circle cx="82" cy="77" r="12" fill="#1e4d2b" />
              <circle cx="82" cy="77" r="7.8" fill="none" stroke="#ffffff" strokeWidth="2.2" />
              <circle cx="82" cy="77" r="3" fill="#ffffff" />
              <circle cx="82" cy="77" r="1.3" fill="#1e4d2b" />
              <circle cx="123" cy="79" r="9" fill="#1e4d2b" />
              <circle cx="123" cy="79" r="5.6" fill="none" stroke="#ffffff" strokeWidth="1.9" />
              <circle cx="123" cy="79" r="2.3" fill="#ffffff" />
              <circle cx="123" cy="79" r="1" fill="#1e4d2b" />
            </svg>
          </div>
        </aside>

        {/* Overview Summary: ERS / Krishi Coins / Plan, one under another */}
        <section className="db-summary-grid">

          <div
            className="db-summary-card db-ers-card"
            onClick={openErsPanel}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openErsPanel(); } }}
          >
            <div className="db-ers-header">
              <div className="db-ers-icon">
                <Users size={20} strokeWidth={2.2} />
              </div>
              <div className="db-ers-heading">
                <h4 className="db-ers-title">ERS</h4>
                <p className="db-ers-subtitle">Empowerment &amp; Rural Support</p>
              </div>
              <span className="db-ers-badge">
                <span className="db-ers-badge-dot" aria-hidden="true"></span>
                Active
              </span>
            </div>

            <div className="db-ers-body">
              <div className="db-ers-progress-col">
                <span className="db-ers-eyebrow">ERS Testing</span>
                <div className="db-ers-progress-row">
                {ersStatus.attempted ? (
                <div className="db-ers-ring">
                  <svg viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="ersRingGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    <circle className="db-ers-ring-track" cx="50" cy="50" r={ERS_RING_RADIUS} />
                    <circle
                      className="db-ers-ring-fill"
                      cx="50" cy="50" r={ERS_RING_RADIUS}
                      style={{ strokeDasharray: ERS_RING_CIRCUMFERENCE, strokeDashoffset: ersRingOffset }}
                    />
                  </svg>
                  <div className="db-ers-ring-center">
                    <span className="db-ers-ring-value">{Math.round(ersStatus.percentage)}%</span>
                  </div>
                </div>
                ) : (
                <div className="db-ers-hex" aria-hidden="true">
                  <Users size={22} strokeWidth={2.2} />
                </div>
                )}

                <div className={`db-ers-encourage is-${ersStatusTone}`}>
                  <div className="db-ers-encourage-title">
                    {ersEncourageTitle.split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                    ))}
                  </div>
                  <div className="db-ers-encourage-text">{ersEncourageText}</div>
                </div>
                </div>
              </div>

              <div className="db-ers-status-col">
                <div className={`db-ers-status-panel db-ers-status-${ersStatusTone}`}>
                  <div className="db-ers-status-badge" aria-hidden="true">
                    <ShieldCheck size={12} />
                  </div>
                  <span className="db-ers-status-eyebrow">Assessment Status</span>
                  <span className="db-ers-status-value">
                    {ersStatus.attempted ? (ersStatus.passed ? 'Passed' : 'Not Passed') : 'Not Started'}
                  </span>
                  <span className="db-ers-status-sub">
                    {!ersStatus.attempted ? (
                      'Take the assessment to get started'
                    ) : ersStatus.passed ? (
                      'Completed successfully'
                    ) : (
                      <>Review your answers and <span className="db-ers-status-retake">retake</span></>
                    )}
                  </span>
                  {ersCompletedOnLabel && (
                    <div className="db-ers-status-meta">
                      <Calendar size={11} />
                      <span className="db-ers-status-meta-text">
                        <span className="db-ers-status-meta-label">Completed On</span>
                        <span className="db-ers-status-meta-date">{ersCompletedOnLabel}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className="db-ers-cta" type="button">
              <span className="db-ers-cta-icon"><FileText size={15} /></span>
              <span className="db-ers-cta-text">
                <strong>{ersCtaLabel}</strong>
                <small>{ersCtaSubtext}</small>
              </span>
              <span className="db-ers-cta-arrow"><ArrowRight size={14} /></span>
            </button>
          </div>

          <div className="db-summary-card db-coins2-card">
            <div className="db-premium-glow db-coins2-glow-a" aria-hidden="true"></div>
            <div className="db-premium-glow db-coins2-glow-b" aria-hidden="true"></div>

            <div className="db-premium-header">
              <div className="db-premium-icon-wrap db-coins2-icon-wrap">
                <HandCoins size={21} strokeWidth={2.2} />
              </div>
              <div className="db-premium-heading">
                <h4 className="db-premium-title">Krishi Coins</h4>
                <p className="db-premium-subtitle">Your rewards balance</p>
              </div>
            </div>

            <div className="db-coins2-body">
              <div className="db-coins2-balance-col">
                <div className="db-coins2-balance">
                  <span className="db-coins2-balance-value">{coinsDisplay.toLocaleString()}</span>
                  <span className="db-coins2-balance-label">Krishi Coins</span>
                </div>
                <div className="db-coins2-growth">
                  <TrendingUp size={11} /> +320 this month
                </div>
              </div>

              <div className="db-coin-stack" aria-hidden="true">
                <div className="db-coin-stack-glow"></div>
                <span className="db-coin-sparkle"></span>
                <div className="db-coin db-coin-back"></div>
                <div className="db-coin db-coin-dot"></div>
                <div className="db-coin db-coin-main"><span>&#8377;</span></div>
                <div className="db-coin db-coin-small"><span>&#8377;</span></div>
              </div>
            </div>

            <div className="db-coins2-footer">
              <span className="db-premium-hint">Redeem for discounts &amp; inputs</span>
              <button className="db-premium-cta db-coins2-cta" type="button">
                <span className="db-premium-cta-text"><strong>Redeem Now</strong></span>
                <span className="db-premium-cta-circle"><ArrowRight size={13} /></span>
              </button>
            </div>
          </div>

          <div className="db-summary-card db-card-plan">
            <div className="db-plan-corner-ribbon">{currentPlan.name}</div>
            <div className="db-plan-main">
              <div className="db-summary-left">
                <div className="db-summary-icon-wrap">
                  <Crown size={24} fill="currentColor" strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="db-summary-title">Plan</h4>
                  <p className="db-summary-subtitle">{currentPlan.duration}</p>
                </div>
              </div>
              <div className="db-plan-actions">
                <span className="db-plan-tier-badge"><Star size={13} fill="currentColor" strokeWidth={1.8} /> {currentPlan.name}</span>
                <button type="button" className="db-upgrade-btn" onClick={openPlansPanel}>Manage Plan <ArrowRight size={15} /></button>
              </div>
            </div>
            <div className="db-summary-bar-track">
              <div className="db-summary-bar-fill"></div>
            </div>
          </div>

        </section>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <main className="db-main">
        
        {/* Top Header */}


        <div className="db-content-scroll">

          {ersPanelOpen ? (
            <ErsAssessmentPanel
              onBack={() => setErsPanelOpen(false)}
              onStatusUpdated={fetchErsStatus}
            />
          ) : plansPanelOpen ? (
            <PlansPage onBack={() => setPlansPanelOpen(false)} />
          ) : activeTab === 'status' ? (
            // A notification's link carries the EPM it's about - the section opens at its card.
            <MyEpmActivities user={user} onNavigate={onNavigate} focus={navState?.epmId ? navState : null} />
          ) : !activeTab.startsWith('profile') ? (
            <>
              {/* Hero Banner */}
          <WelcomeHero name={welcomeName} updates={personalUpdates} onOpen={openPersonalUpdate} />

          {/* FEED Services: the home page's services block, without its ant; each service opens in a new tab */}
          <HomeServices id="db-services" onNavigate={onNavigate} showAnt={false} className="db-services" openInNewTab />

          {/* Quick Access - Frequently Used */}
          <section className="db-quick-actions">
            <div className="db-section-header">
              <div className="db-section-line"></div>
              <h3>Quick Access – Frequently Used</h3>
            </div>
            
            <div className="db-actions-grid">
              
              <div className="db-action-card bg-pastel-green">
                <img src="/images/farmer_profile.avif" alt="Profile" className="db-action-img" />
                <h4>Update<br/>My Profile</h4>
                <button className="db-action-btn bg-dark-green"><ChevronRight size={18} /></button>
              </div>

              <div className="db-action-card bg-pastel-blue">
                <img src="/images/veg_produce.avif" alt="Product" className="db-action-img" />
                <h4>Add<br/>Product / Service</h4>
                <button className="db-action-btn bg-dark-blue"><ChevronRight size={18} /></button>
              </div>

              <div className="db-action-card bg-pastel-orange">
                <img src="/images/people_group.avif" alt="Members" className="db-action-img" />
                <h4>View<br/>Members</h4>
                <button className="db-action-btn bg-dark-orange"><ChevronRight size={18} /></button>
              </div>

              <div className="db-action-card bg-pastel-purple">
                <img src="/images/chart_report.avif" alt="Reports" className="db-action-img" />
                <h4>View<br/>Reports</h4>
                <button className="db-action-btn bg-dark-purple"><ChevronRight size={18} /></button>
              </div>

              <div className="db-action-card bg-pastel-pink">
                <img src="/images/megaphone.avif" alt="Alerts" className="db-action-img" />
                <h4>News &<br/>Alerts</h4>
                <button className="db-action-btn bg-dark-pink"><ChevronRight size={18} /></button>
              </div>

            </div>
          </section>



          <section className="db-widgets-grid">

            {/* Latest Alerts & Announcements */}
            <div className="db-widget-card db-widget--alerts" id="db-alerts">
              <div className="db-widget-header">
                <div className="db-widget-title">
                  <Bell className="db-widget-title-icon" strokeWidth={2} />
                  <span className="db-widget-title-rule" aria-hidden="true" />
                  <h3>Latest Alerts &amp; Announcements</h3>
                </div>
              </div>
              <div className="db-widget-content">
                {/* The list is doubled for the endless scroll; slower the longer it gets. */}
                <div className="db-alert-list" style={{ animationDuration: `${Math.max(14, alerts.length * 4.7)}s` }}>
                  {[...alerts, ...alerts].map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className={`db-alert-item${item.link ? ' is-link' : ''}`}
                      {...(item.link ? {
                        role: 'button',
                        tabIndex: idx < alerts.length ? 0 : -1,
                        onClick: () => openNotificationLink(item.link, onNavigate),
                        onKeyDown: (e) => { if (e.key === 'Enter') openNotificationLink(item.link, onNavigate); },
                      } : {})}
                    >
                      <div className="db-alert-icon" style={{ background: item.iconBg, color: item.iconColor }}>
                        <item.icon strokeWidth={2.2} />
                      </div>
                      <div className="db-alert-info">
                        <div className="db-alert-title-row">
                          <div className="db-alert-title-group">
                            {item.tag && <span className="db-alert-tag">{item.tag}</span>}
                            <h4>{item.title}</h4>
                          </div>
                          <span className="db-alert-time">{item.time}</span>
                        </div>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="db-widget-footer">
                <button type="button" className="db-widget-btn">View All Alerts <ArrowRight strokeWidth={2.4} /></button>
              </div>
              <img className="db-widget-scene" src="/images/dashboard/widgets/alerts-scene.webp" alt="" aria-hidden="true" />
            </div>

            {/* Recent Activity */}
            <div className="db-widget-card db-widget--activity">
              <div className="db-widget-header">
                <div className="db-widget-title">
                  <Activity className="db-widget-title-icon" strokeWidth={2.4} />
                  <span className="db-widget-title-rule" aria-hidden="true" />
                  <h3>Recent Activity</h3>
                </div>
              </div>
              <div className="db-widget-content">
                <div className="db-activity-list">
                  {[...activityData, ...activityData].map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="db-activity-item">
                      <div className="db-activity-icon" style={{ background: item.iconBg, color: item.iconColor }}>
                        <item.icon strokeWidth={2} />
                      </div>
                      <div className="db-activity-info">
                        <div className="db-activity-top">
                          <h4>{item.title}</h4>
                          <span>{item.time}</span>
                        </div>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="db-widget-footer">
                <button type="button" className="db-widget-btn">View All Activity <ArrowRight strokeWidth={2.4} /></button>
              </div>
              <img className="db-widget-scene" src="/images/dashboard/widgets/activity-scene.webp" alt="" aria-hidden="true" />
            </div>

            {/* Market Prices */}
            <div className="db-widget-card db-widget--market">
              <div className="db-widget-header">
                <div className="db-widget-title">
                  <MarketChartIcon className="db-widget-title-icon" />
                  <span className="db-widget-title-rule" aria-hidden="true" />
                  <h3>Market Prices</h3>
                </div>
              </div>
              <div className="db-market-table">
                <div className="db-market-table-head">
                  <span>Commodity</span>
                  <span>Price (₹/Q)</span>
                  <span>Change</span>
                </div>
                <div className="db-market-table-body-wrap">
                  {/* Shows whole rows only; whatever height is left over stays as space above the button */}
                  <div className="db-market-table-window">
                    <div className="db-market-table-body">
                      {[...marketItems, ...marketItems].map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="db-market-table-row">
                          <div className="db-market-table-name">
                            <CommodityIcon crop={item.crop} className="db-market-icon" />
                            <span className="db-market-name">{item.name}</span>
                          </div>
                          <div className="db-market-table-price">{item.price}</div>
                          <div className={`db-market-table-change ${item.trend}`}>
                            <TrendArrow down={item.trend !== 'up'} />{item.percent}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="db-widget-footer">
                <button type="button" className="db-widget-btn">View Full Market <ArrowRight strokeWidth={2.4} /></button>
              </div>
              <img className="db-widget-scene" src="/images/dashboard/widgets/market-scene.webp" alt="" aria-hidden="true" />
            </div>

          </section>
            </>
          ) : (
            <div style={{ padding: '24px' }}>
              <div className="hide-scrollbar" style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '16px'
              }}>
                {[
                  { id: 'profile-details', label: 'My Details', icon: User, bg: '#eef2ff', color: '#4f46e5', border: '#c7d2fe' },
                  { id: 'profile-products', label: 'My Products', icon: Package, bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
                  { id: 'profile-vendors', label: 'My Vendors', icon: Users, bg: '#fff7ed', color: '#ea580c', border: '#fed7aa' },
                  { id: 'profile-certificates', label: 'My Certificates & Licences', icon: FileText, bg: '#fdf4ff', color: '#c026d3', border: '#fbcfe8' },
                  { id: 'profile-testimonials', label: 'My Testimonials', icon: Star, bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
                  { id: 'profile-subscriptions', label: 'Active Subscriptions', icon: Settings, bg: '#f0fdfa', color: '#0d9488', border: '#ccfbf1' },
                ].map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        backgroundColor: tab.bg,
                        color: tab.color,
                        border: isActive ? `2px solid ${tab.color}` : `1px solid ${tab.border}`,
                        padding: isActive ? '11px 19px' : '12px 20px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: isActive ? `0 4px 10px ${tab.border}` : '0 2px 4px rgba(0,0,0,0.05)',
                        flexShrink: 0
                      }}
                    >
                      <tab.icon size={18} /> {tab.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: '24px', minHeight: '60vh' }}>
                {activeTab === 'profile-details' ? (
                  <MyDetailsForm />
                ) : (
                  <div style={{ minHeight: '60vh', backgroundColor: '#fff', borderRadius: '16px', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '1.125rem' }}>
                    <p>Content will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
        </div>
      </main>

    </div>
    <Footer />
    </div>
  );
};

export default Dashboard;
