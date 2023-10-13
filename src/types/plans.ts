export type Price = {
  name: string;
  subtitle: string;
  description: string;
  price: number;
  features: {
    [key: string]: boolean;
  };
};

export const plans: Price[] = [
  {
    name: "Free",
    subtitle: "The free plan, best for personal use.",
    description:
      "Just some basic features for your personal use, but free, forever!",
    price: 0,
    features: {
      "Max servers: 1": true,
      "Max services: 5": true,
      "Max users: 3": true,
      "Basic stastistics": true,
      "Advanced features": false,
    },
  },
  {
    name: "Premium",
    subtitle: "The best plan to keep all your projects organized",
    description:
      "Best for small companies or for more professional project management. Comes with more usefull features",
    price: 7.99,
    features: {
      "Max servers: 3": true,
      "Max services: 15": true,
      "Max users: 5": true,
      "Advanced features": true,
      "AI Assistant": true,
      "Beta Features": false,
    },
  },
  {
    name: "Pro",
    subtitle: "The best plan for your company",
    description:
      "Best for every type of project. You can do whatever you want and you have access to all the exclusive features.",
    price: 14.99,
    features: {
      "Everything in Pro Plan": true,
      "Unillimited servers, services and users": true,
      "AI Assistant": true,
      "Personal Assistant": true,
      "Beta Features": true,
      "Advanced Statistics": true,
    },
  },
];

export function getPlan(plan: string | null | undefined) {
  if (!plan) return plans[0];

  return plans.find((p) => p.name === plan) || plans[0];
}
