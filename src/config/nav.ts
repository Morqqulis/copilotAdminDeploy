import {
  HomeIcon,
  UsersIcon,
  SignalIcon,
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  MicrophoneIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

export interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const SIDEBAR_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: HomeIcon,
  },
  {
    title: 'Clients',
    href: '/clients',
    icon: UsersIcon,
  },
  {
    title: 'Radio Stations',
    href: '/stations',
    icon: SignalIcon,
  },
  {
    title: 'Format Customizer',
    href: '/format',
    icon: AdjustmentsHorizontalIcon,
  },
  {
    title: 'Locations',
    href: '/locations',
    icon: MapPinIcon,
  },
  {
    title: 'AI Voices',
    href: '/voices',
    icon: MicrophoneIcon,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon,
  },
] 