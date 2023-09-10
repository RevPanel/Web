"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../button";
import TickIcon from "../icons/Tick";
import TickOffIcon from "../icons/TickOff";
import Toggle from "../toggle";

type Price = {
  name: string;
  subtitle: string;
  description: string;
  price: number;
  features: {
    [key: string]: boolean;
  };
};

const prices: Price[] = [
  {
    name: "Free",
    subtitle: "Perfect plan to get started",
    description: "A free plan grants you access to some cool features.",
    price: 0,
    features: {
      "Sync accross device": true,
      "5 workspace": true,
      "Collaborate with 5 user": true,
      "Sharing permission": false,
      "Admin tools": false,
      "100+ integrations": false,
    },
  },
  {
    name: "Pro",
    subtitle: "Perfect plan for professionals!",
    description:
      "Only for professionals! The best plan with benefits for your company",
    price: 12,
    features: {
      "Everything in Free Plan": true,
      "Unlimited workspace": true,
      "Collaborative workspace": true,
      "Sharing permission": true,
      "Admin tools": true,
      "100+ integrations": true,
    },
  },
  {
    name: "Ultimate",
    subtitle: "Best suits for great company!",
    description:
      "If you are looking for the best, this is the best plan for your company",
    price: 33,
    features: {
      "Everything in Pro Plan": true,
      "Daily performance reports": true,
      "Artificial intelligence": true,
      "Marketing tools & automations": true,
      "Advanced security": true,
    },
  },
];

function PriceCard(
  price: Price & {
    yearly: boolean;
  }
) {
  return (
    <div className="my-4 flex flex-col gap-2 rounded-xl bg-background-secondary p-4 shadow-lg md:m-0 md:w-[25rem] xl:min-h-[35rem]">
      <h1 className="text-3xl">{price.name}</h1>
      <p className="text-tertiary">{price.subtitle}</p>
      <h2 className="my-5 text-3xl">
        €{Math.round(price.price * (price.yearly ? 0.35 : 1))}
        <span className="text-sm text-tertiary">/month</span>
      </h2>
      <p className="w-full text-tertiary">{price.description}</p>
      <ul className="mt-auto flex flex-col gap-4 text-left text-lg">
        {Object.keys(price.features).map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            {price.features[feature] ? <TickIcon /> : <TickOffIcon />}
            <span className={price.features[feature] ? "" : "text-tertiary"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Button role="primary" className="mx-auto mt-auto w-full !rounded-full">
        Get Started
      </Button>
    </div>
  );
}

export default function Pricing() {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="w-full p-8 py-24 md:bg-[#141417]">
      <div className="mx-auto flex flex-col gap-2 text-center md:w-4/5 md:text-left">
        <Button role="secondary" className="mx-auto w-fit uppercase md:m-0">
          <span className="text-gradient">Prices</span>
        </Button>
        <div className="flex w-full flex-col items-center justify-between md:flex-row">
          <div>
            <h1 className="text-4xl">See the plans we offer</h1>
            <p className="text-tertiary">The best plans for your company</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-start gap-2 text-lg font-semibold">
              <div className="flex flex-col gap-2">
                <p>Monthly</p>
                <div className="flex h-[75px] items-end justify-end">
                  <div className="flex items-center justify-center rounded-full bg-[#E7DEFE] px-3 py-1 text-center text-black">
                    <p className="mx-auto text-center">Save 65%</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Toggle
                  checked={toggle}
                  onChange={(e) => setToggle(e.target.checked)}
                />
                <Image src="/arrow.svg" alt="arrow" width={100} height={100} />
              </div>
              <p>Yearly</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col justify-between gap-2 md:flex-row">
          {prices.map((price) => (
            <PriceCard key={price.name} {...price} yearly={toggle} />
          ))}
        </div>
      </div>
    </div>
  );
}
