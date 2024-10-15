import {
  PricingTier,
  PricingTierFrequency,
} from '@/data/config/pricingDataInterface';

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    id: 'tier-1',
    href: '/subscribe',
    discountPrice: { '1': '', '2': '' },
    price: { '1': '$0', '2': '$0' },
    description: 'Get all goodies for free, no credit card required.',
    features: [
      'Multi-platform compatibility',
      'Real-time notification system',
      'Advanced user permissions',
    ],
    featured: false,
    highlighted: false,
    cta: 'Sign up',
  },
];

export const pricingFrequencies: PricingTierFrequency[] = [
  {
    id: '4a506b44-6445-40c6-9290-cd9b20c58e75',
    value: '1',
    label: 'Monthly',
    priceSuffix: '/month',
  },
  {
    id: 'a5226345-93ea-4a7f-b6bf-2e6c858fcee0',
    value: '2',
    label: 'Annually',
    priceSuffix: '/year',
  },
];
