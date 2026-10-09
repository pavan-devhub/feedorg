import React from 'react';
import {
  Activity, ArrowRight, Building, Calculator, Calendar, Check, CheckCircle, ChevronDown, CircleHelp,
  ClipboardList, CloudRain, Coins, CreditCard, Droplets, Factory, FileText, HandCoins, IndianRupee,
  Landmark, Mail, MapPin, Package, Phone, Search, Ship, Snowflake, Sprout, Tractor, User, UserRound,
  Warehouse, Wheat,
} from 'lucide-react';
import { FaBuilding, FaMoneyBillWave, FaPercentage } from 'react-icons/fa';

// The icons the Loans & Finance page uses, by the names its components pass in. Named imports keep
// the bundle to just these (a `* as` import of lucide-react would pull in every icon it has).
const ICONS = {
  Activity, ArrowRight, Building, Calculator, Calendar, Check, CheckCircle, ChevronDown,
  ClipboardList, CloudRain, Coins, CreditCard, Droplets, Factory, FileText, HandCoins, Landmark,
  Mail, MapPin, Package, Phone, Search, Ship, Snowflake, Sprout, Tractor, User, UserRound,
  Warehouse, Wheat,
  Rupee: IndianRupee,
  // No lucide icon by these names, so they come from react-icons
  Institution: FaBuilding,
  Money: FaMoneyBillWave,
  Percentage: FaPercentage,
};

export const FinanceIcon = ({ name, className, size = 24, color }) => {
  const IconComponent = ICONS[name] || CircleHelp;
  return <IconComponent className={className} size={size} color={color} />;
};
