"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../button";
import Toggle from "../toggle";

type Price = {
  name: string;
  subtitle: string;
  description: string;
  price: number;
  features: {
    [key: string]: boolean;
  };
  primary: boolean;
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
    primary: false,
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
    primary: false,
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
    primary: true,
  },
];

function PriceCard(
  price: Price & {
    yearly: boolean;
  }
) {
  return (
    <div
      className={
        "bg-background-secondary md:bg-transparent m-4 md:m-0 p-4 md:w-[25rem] xl:min-h-[35rem] rounded-xl flex flex-col gap-2 " +
        (price.primary ? "!bg-background-secondary" : "")
      }
    >
      <h1 className="text-3xl">{price.name}</h1>
      <p className="text-tertiary">{price.subtitle}</p>
      <h2 className="text-3xl my-5">
        €{Math.round(price.price * (price.yearly ? 0.35 : 1))}
        <span className="text-sm text-tertiary">/month</span>
      </h2>
      <p className="text-tertiary w-full">{price.description}</p>
      <ul className="mt-auto flex flex-col gap-4 text-lg">
        {Object.keys(price.features).map((feature, i) => (
          <li key={i}>
            {price.features[feature] ? (
              <Image
                src="/tick.svg"
                alt="tick"
                width={20}
                height={20}
                className="inline-block mr-2"
              />
            ) : (
              <Image
                src="/tick-off.svg"
                alt="tick"
                width={20}
                height={20}
                className="inline-block mr-2"
              />
            )}
            <span className={price.features[feature] ? "" : "text-tertiary"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Button role="primary" className="mt-auto w-full !rounded-full mx-auto">
        Get Started
      </Button>
    </div>
  );
}

export default function Pricing() {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="md:w-4/5 mx-auto flex flex-col gap-2 text-center md:text-left">
      <Button role="secondary" className="uppercase w-fit mx-auto md:m-0">
        <span className="text-gradient">Prices</span>
      </Button>
      <div className="flex flex-col md:flex-row items-center w-full justify-between">
        <div>
          <h1 className="text-4xl">See the plans we offer</h1>
          <p className="text-tertiary">The best plans for your company</p>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-start text-lg font-semibold">
            <div className="flex flex-col gap-2">
              <p>Monthly</p>
              <div className="h-[75px] flex justify-end items-end">
                <div className="flex justify-center items-center text-center bg-[#E7DEFE] rounded-full text-black py-1 px-3">
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

      <div className="mt-4 w-full flex flex-col md:flex-row gap-2 justify-between">
        {prices.map((price) => (
          <PriceCard key={price.name} {...price} yearly={toggle} />
        ))}
      </div>
    </div>
  );
}
