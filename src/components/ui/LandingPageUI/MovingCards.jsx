"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../aceComponents/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className=" rounded-md flex flex-col antialiased bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "MediApp helped me find a doctor quickly and with ease, grateful that a service like this exsits!",
    name: "Dorothy Cox",
    title: "Blooimington",
  },
  {
    quote:
      "MediApp made it so simple to schedule my appointment. I can't imagine doing it any other way!",
    name: "Michael Turner",
    title: "San Francisco",
  },

  {
    quote:
      "Finding a specialist through MediApp was quick and stress-free. I'm thankful for this service.",
    name: "Alicia Rodriguez",
    title: "Miami",
  },
  {
    quote:
      "MediApp took the guesswork out of finding a good doctor. I had my appointment booked in minutes!",
    name: "Gregory Johnson",
    title: "Seattle",
  },
  {
    quote:
      "The convenience of MediApp is unbeatable. I found a doctor who takes my insurance and is close to home!",
    name: "Karen Lee",
    title: "Boston",
  },
];
