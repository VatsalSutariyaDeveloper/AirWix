// /config/sidebarMenu.ts
import { FaUser, FaChartPie, FaBox, FaFileAlt, FaClipboardCheck } from 'react-icons/fa'

export const menuList = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: FaChartPie,
  },
  {
    key: 'crm',
    label: 'CRM',
    icon: FaUser,
    subItems: [
      { label: 'Add Inquiry', path: '/crm/inquiries', icon: FaFileAlt },
      { label: 'Follow-ups', path: '/crm/followups', icon: FaClipboardCheck },
    ],
  },
  {
    key: 'inventory',
    label: 'Inventory',
    icon: FaBox,
    subItems: [
      { label: 'Items', path: '/inventory/items', icon: FaBox },
      { label: 'Stock', path: '/inventory/stock', icon: FaClipboardCheck },
    ],
  },
]
