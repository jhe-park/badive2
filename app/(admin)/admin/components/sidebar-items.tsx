import { Chip } from '@heroui/react';
import { Icon } from '@iconify/react';

import { SidebarItemType } from './sidebar';
import TeamAvatar from './team-avatar';

/**
 * Please check the https://heroui.com/docs/guide/routing to have a seamless router integration
 */

export const items = [
  {
    key: 'schedule',
    href: '#',
    icon: 'solar:home-2-linear',
    title: '스케쥴',
  },
  {
    key: 'projects',
    href: '#',
    icon: 'solar:widget-2-outline',
    title: '매출현황',
    endContent: <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />,
  },
  {
    key: 'tasks',
    href: '#',
    icon: 'solar:checklist-minimalistic-outline',
    title: 'Tasks',
    endContent: <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />,
  },
  {
    key: 'team',
    href: '#',
    icon: 'solar:users-group-two-rounded-outline',
    title: 'Team',
  },
  {
    key: 'tracker',
    href: '#',
    icon: 'solar:sort-by-time-linear',
    title: 'Tracker',
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
  {
    key: 'analytics',
    href: '#',
    icon: 'solar:chart-outline',
    title: 'Analytics',
  },
  {
    key: 'perks',
    href: '#',
    icon: 'solar:gift-linear',
    title: 'Perks',
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
  {
    key: 'expenses',
    href: '#',
    icon: 'solar:bill-list-outline',
    title: 'Expenses',
  },
  {
    key: 'settings',
    href: '#',
    icon: 'solar:settings-outline',
    title: 'Settings',
  },
];

export const sectionItems = [
  {
    key: 'overview',
    title: '',
    items: [
      {
        key: 'schedule',
        href: '/admin/schedule',
        icon: '',
        title: '스케쥴',
      },
      {
        key: 'sales',
        href: '/admin/sales',
        icon: '',
        title: '매출현황',
      },
      {
        key: 'instructor',
        href: '/admin/instructor',
        icon: '',
        title: '강사관리',
      },
      {
        key: 'member',
        href: '/admin/member',
        icon: '',
        title: '회원관리',
      },
      {
        key: 'program',
        href: '/admin/program',
        icon: '',
        title: '프로그램',
      },
      {
        key: 'tour',
        href: '/admin/tour',
        icon: '',
        title: '투어관리',
      },
      {
        key: 'resort',
        href: '/admin/resort',
        icon: '',
        title: '리조트',
      },
      {
        key: 'notification',
        href: '/admin/notification',
        icon: '',
        title: '공지사항',
      },
      {
        key: 'faq',
        href: '/admin/faq',
        icon: '',
        title: 'FAQ',
      },
    ],
  },
];

export const sectionItemsWithTeams = [...sectionItems];

export const brandItems = [
  {
    key: 'overview',
    title: 'Overview',
    items: [
      {
        key: 'home',
        href: '#',
        icon: 'solar:home-2-linear',
        title: 'Home',
      },
      {
        key: 'projects',
        href: '#',
        icon: 'solar:widget-2-outline',
        title: 'Projects',
        endContent: <Icon className="text-primary-foreground/60" icon="solar:add-circle-line-duotone" width={24} />,
      },
      {
        key: 'tasks',
        href: '#',
        icon: 'solar:checklist-minimalistic-outline',
        title: 'Tasks',
        endContent: <Icon className="text-primary-foreground/60" icon="solar:add-circle-line-duotone" width={24} />,
      },
      {
        key: 'team',
        href: '#',
        icon: 'solar:users-group-two-rounded-outline',
        title: 'Team',
      },
      {
        key: 'tracker',
        href: '#',
        icon: 'solar:sort-by-time-linear',
        title: 'Tracker',
        endContent: (
          <Chip className="bg-primary-foreground font-medium text-primary" size="sm" variant="flat">
            New
          </Chip>
        ),
      },
    ],
  },
  {
    key: '',
    title: '',
    items: [
      {
        key: 'heroui',
        href: '#',
        title: 'HeroUI',
        startContent: (
          <TeamAvatar
            // @ts-ignore
            classNames={{
              base: 'border-1 border-primary-foreground/20',
              name: 'text-primary-foreground/80',
            }}
            name="Hero UI"
          />
        ),
      },
      {
        key: 'tailwind-variants',
        href: '#',
        title: 'Tailwind Variants',
        startContent: (
          <TeamAvatar
            // @ts-ignore

            classNames={{
              base: 'border-1 border-primary-foreground/20',
              name: 'text-primary-foreground/80',
            }}
            name="Tailwind Variants"
          />
        ),
      },
      {
        key: 'heroui-pro',
        href: '#',
        title: 'HeroUI Pro',
        startContent: (
          <TeamAvatar
            // @ts-ignore

            classNames={{
              base: 'border-1 border-primary-foreground/20',
              name: 'text-primary-foreground/80',
            }}
            name="HeroUI Pro"
          />
        ),
      },
    ],
  },
];

export const sectionLongList = [
  ...sectionItems,
  {
    key: 'payments',
    title: 'Payments',
    items: [
      {
        key: 'payroll',
        href: '#',
        title: 'Payroll',
        icon: 'solar:dollar-minimalistic-linear',
      },
      {
        key: 'invoices',
        href: '#',
        title: 'Invoices',
        icon: 'solar:file-text-linear',
      },
      {
        key: 'billing',
        href: '#',
        title: 'Billing',
        icon: 'solar:card-outline',
      },
      {
        key: 'payment-methods',
        href: '#',
        title: 'Payment Methods',
        icon: 'solar:wallet-money-outline',
      },
      {
        key: 'payouts',
        href: '#',
        title: 'Payouts',
        icon: 'solar:card-transfer-outline',
      },
    ],
  },
];

export const sectionNestedItems = [
  {
    key: 'home',
    href: '#',
    icon: 'solar:home-2-linear',
    title: 'Home',
  },
  {
    key: 'projects',
    href: '#',
    icon: 'solar:widget-2-outline',
    title: 'Projects',
    endContent: <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />,
  },
  {
    key: 'tasks',
    href: '#',
    icon: 'solar:checklist-minimalistic-outline',
    title: 'Tasks',
    endContent: <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />,
  },
  {
    key: 'team',
    href: '#',
    icon: 'solar:users-group-two-rounded-outline',
    title: 'Team',
  },
  {
    key: 'tracker',
    href: '#',
    icon: 'solar:sort-by-time-linear',
    title: 'Tracker',
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
  {
    key: 'analytics',
    href: '#',
    icon: 'solar:chart-outline',
    title: 'Analytics',
  },
  {
    key: 'perks',
    href: '#',
    icon: 'solar:gift-linear',
    title: 'Perks',
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
  {
    key: 'cap_table',
    title: 'Cap Table',
    icon: 'solar:pie-chart-2-outline',
    type: (SidebarItemType as any).Nest,
    items: [
      {
        key: 'shareholders',
        icon: 'solar:users-group-rounded-linear',
        href: '#',
        title: 'Shareholders',
      },
      {
        key: 'note_holders',
        icon: 'solar:notes-outline',
        href: '#',
        title: 'Note Holders',
      },
      {
        key: 'transactions_log',
        icon: 'solar:clipboard-list-linear',
        href: '#',
        title: 'Transactions Log',
      },
    ],
  },
  {
    key: 'expenses',
    href: '#',
    icon: 'solar:bill-list-outline',
    title: 'Expenses',
  },
];
