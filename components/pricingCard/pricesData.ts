export type PriceCard = {
  isFree: boolean;
  title: string;
  description: string;
  initialPrice: string;
  currentPrice: string;
  timeFrame: string;
  checklist: string[];
  buttonText: string;
};
export const pricingInformation: PriceCard[] = [
  {
    isFree: true,
    title: 'Free',
    description: ' Try our product for Free and review experience.',
    initialPrice: '$0',
    currentPrice: '',
    timeFrame: '',
    checklist: [
      '✔️ Create 1 product',
      '✔️ Create 1 product',
      '✔️ 5 reviews',
      '✔️ Testimonial collection form',
      '✔️ Form sharing, invites & tracking',
      "✔️ Get a 'wall of reviews'",
      '❌ Use your own branding',
    ],
    buttonText: 'Continue for free',
  },
  {
    isFree: false,
    title: 'Premium',
    description: 'For those who want the best review experience.',
    initialPrice: '$35',
    currentPrice: '$19',
    timeFrame: '/month',
    checklist: [
      '✔️ Create infinite products',
      '✔️ Unlimited reviews',
      '✔️ Fully customizable review page',
      '✔️ Choose your perfect color palette',
      '✔️ Form sharing, invites & tracking',
      '❌ Use your own branding',
      '❌ Guaranteed updates to any new feature.',
    ],
    buttonText: 'Get Premium',
  },
  {
    isFree: false,
    title: 'Lifetime',
    description: ' Pay once, use forever.',
    initialPrice: '$350',
    currentPrice: '$299',
    timeFrame: '/life',
    checklist: [
      '✔️ Create infinite products',
      '✔️ Unlimited reviews',
      '✔️ Fully customizable review page',
      "✔️ Get a 'wall of reviews'",
      '✔️ Choose your perfect color palette',
      '✔️ Use your own branding',
      '✔️ Guaranteed updates to any new feature.',
    ],
    buttonText: 'Get Lifetime Package',
  },
];
