import * as lucide from 'lucide-react';

const iconsToCheck = [
  'Phone', 'Mail', 'Download', 'PlayCircle', 'FileText', 'Shield', 'Home', 'Users', 'Settings', 'Calendar', 'Map', 'Activity', 'Users2', 'Globe2', 'PhoneCall', 'Trophy', 'BadgeCheck', 'ShieldCheck', 'Star', 'User', 'UserPlus', 'ChevronDown', 'ChevronRight', 'ChevronLeft', 'ArrowRight', 'Sprout', 'Building2', 'Ship', 'Coins', 'Package', 'TrendingUp', 'GraduationCap', 'ClipboardList', 'Store', 'HeartHandshake', 'Wrench', 'Lightbulb', 'ShoppingBag', 'CreditCard', 'Target', 'Eye', 'Rocket', 'Search', 'Leaf', 'Landmark', 'PieChart', 'BarChart3', 'MoreHorizontal', 'Cloud', 'Sun',
  'CheckCircle2'
];

let missing = false;
for (const icon of iconsToCheck) {
  if (!lucide[icon]) {
    console.error(`Missing icon in lucide-react: ${icon}`);
    missing = true;
  }
}

if (!missing) {
  console.log("All icons exist.");
}
