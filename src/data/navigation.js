import {
  LayoutDashboard,
  Activity,
  Radio,
  AlertTriangle,
  Footprints,
  CalendarClock,
  ClipboardCheck,
  Users,
  UserCog,
  UserPlus,
  GraduationCap,
  ShieldCheck,
  Building2,
  Contact,
  DoorOpen,
  FileSignature,
  FileText,
  Receipt,
  Wallet,
  Landmark,
  FolderOpen,
  Wrench,
  KeyRound,
  ClipboardList,
  BarChart3,
  Sparkles,
  MessageSquare,
  Bell,
  LifeBuoy,
  Briefcase,
  UserCheck,
} from 'lucide-react';

// Sidebar menu configuration. Only "dashboard" has a real page.
export const navGroups = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', slug: '', icon: LayoutDashboard },
      { label: 'Operations', slug: 'operations', icon: Activity },
      { label: 'Control Room', slug: 'control-room', icon: Radio },
      { label: 'Incidents', slug: 'incidents', icon: AlertTriangle },
      { label: 'Patrols', slug: 'patrols', icon: Footprints },
      { label: 'Scheduling', slug: 'scheduling', icon: CalendarClock },
      { label: 'Attendance', slug: 'attendance', icon: ClipboardCheck },
    ],
  },
  {
    title: 'Workforce',
    slug: 'workforce',
    items: [
      { label: 'Guards', slug: 'guards', icon: ShieldCheck },
      { label: 'Employees', slug: 'employees', icon: UserCog },
      { label: 'Recruitment', slug: 'recruitment', icon: UserPlus },
      { label: 'Training', slug: 'training', icon: GraduationCap },
      { label: 'Compliance', slug: 'compliance', icon: UserCheck },
    ],
  },
  {
    title: 'Clients & Sites',
    slug: 'clients-sites',
    items: [
      { label: 'Clients', slug: 'clients', icon: Users },
      { label: 'Contacts', slug: 'contacts', icon: Contact },
      { label: 'Sites & Locations', slug: 'sites-locations', icon: Building2 },
      { label: 'Access Points', slug: 'access-points', icon: DoorOpen },
    ],
  },
  {
    title: 'Commercial',
    slug: 'commercial',
    items: [
      { label: 'Contracts', slug: 'contracts', icon: FileSignature },
      { label: 'Quotations', slug: 'quotations', icon: ClipboardList },
      { label: 'Invoices', slug: 'invoices', icon: Receipt },
      { label: 'Payroll', slug: 'payroll', icon: Wallet },
      { label: 'Finance', slug: 'finance', icon: Landmark },
    ],
  },
  {
    title: 'Resources',
    slug: 'resources',
    items: [
      { label: 'Documents', slug: 'documents', icon: FolderOpen },
      { label: 'Equipment', slug: 'equipment', icon: Wrench },
      { label: 'Keyholding', slug: 'keyholding', icon: KeyRound },
      { label: 'Visitor Management', slug: 'visitor-management', icon: Briefcase },
    ],
  },
  {
    title: 'Reports & Insights',
    slug: 'reports-insights',
    items: [
      { label: 'Reports', slug: 'reports', icon: FileText },
      { label: 'AI Insights', slug: 'ai-insights', icon: Sparkles },
    ],
  },
  {
    title: 'Communication',
    slug: 'communication',
    items: [
      { label: 'Messages', slug: 'messages', icon: MessageSquare },
      { label: 'Notifications', slug: 'notifications', icon: Bell },
      { label: 'Service Desk', slug: 'service-desk', icon: LifeBuoy },
    ],
  },
];

// Group headings (Workforce, Commercial, ...) are clickable placeholders too.
export const findNavItem = (slug) =>
  navGroups.flatMap((g) => g.items).find((item) => item.slug === slug) ||
  navGroups.filter((g) => g.slug).map((g) => ({ label: g.title, slug: g.slug })).find((item) => item.slug === slug);
