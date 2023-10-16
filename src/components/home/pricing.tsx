"use client";

import { Price, plans } from "@/types/plans";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../button";
import TickIcon from "../icons/Tick";
import TickOffIcon from "../icons/TickOff";
import Toggle from "../toggle";

function PriceCard(
  price: Price & {
    yearly: boolean;
  }
) {
  return (
    <div className="my-4 flex flex-col gap-2 rounded-xl bg-background-secondary p-4 shadow-lg md:m-0 md:w-[25rem] xl:min-h-[35rem]">
      <h2 className="text-3xl">{price.name}</h2>
      <p className="text-tertiary">{price.subtitle}</p>
      <h2 className="my-5 text-3xl">
        €{Math.round(price.price * (price.yearly ? 0.75 : 1))}
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
      <Button
        onClick={() => {
          axios
            .post("/api/stripe/create", {
              plan: price.name.toLowerCase(),
              yearly: price.yearly,
            })
            .then((res) => {
              window.location.href = res.data.url;
            });
        }}
        role="primary"
        type="button"
        className="mx-auto mt-auto w-full !rounded-full"
      >
        Get Started
      </Button>
    </div>
  );
}

export default function Pricing() {
  const [toggle, setToggle] = useState(true);

  return (
    <div id="pricing" className="w-full p-8 py-24 md:bg-[#141417]">
      <div className="mx-auto flex flex-col gap-2 text-center md:w-4/5 md:text-left">
        <Button
          type="button"
          role="secondary"
          className="mx-auto w-fit uppercase md:m-0"
        >
          <span className="text-gradient">Prices</span>
        </Button>
        <div className="flex w-full flex-col items-center justify-between md:flex-row">
          <div>
            <h2 className="text-4xl">See the plans we offer</h2>
            <h3 className="text-tertiary">The best plans for your company</h3>
          </div>
          <div className="flex flex-col">
            <div className="flex items-start gap-2 text-lg font-semibold">
              <div className="flex flex-col gap-2">
                <p>Monthly</p>
                <div className="flex h-[75px] items-end justify-end">
                  <div className="flex items-center justify-center rounded-full bg-[#E7DEFE] px-3 py-1 text-center text-black">
                    <p className="mx-auto text-center">Save 25%</p>
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
          {plans.map((price) => (
            <PriceCard key={price.name} {...price} yearly={toggle} />
          ))}
        </div>
      </div>
    </div>
  );
}
