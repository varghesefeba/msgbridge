"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/types";

export default function Accordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line" itemScope itemType="https://schema.org/FAQPage">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            className="group/faq relative border-b border-line"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-[2px] origin-top bg-lime transition-transform duration-base ease-out"
              style={{ transform: `scaleY(${isOpen ? 1 : 0})` }}
            />

            <h3 className="m-0">
              <button
                itemProp="name"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 py-5 pl-5 pr-2 text-left"
              >
                <span
                  aria-hidden
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-base ease-out"
                  style={{
                    borderColor: isOpen ? "#6FA800" : "#D3D7CE",
                    background: isOpen ? "rgba(175,255,73,0.22)" : "transparent",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-all duration-base ease-out"
                    style={{ background: isOpen ? "#6FA800" : "#D3D7CE", transform: isOpen ? "scale(1.15)" : "scale(0.8)" }}
                  />
                </span>

                <span className="font-display text-[16.5px] font-semibold text-text-primary transition-transform duration-base ease-out group-hover/faq:translate-x-0.5">
                  {item.q}
                </span>

                <svg
                  aria-hidden
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className={`ml-auto shrink-0 text-text-muted transition-transform duration-base ease-out ${isOpen ? "rotate-45" : ""}`}
                >
                  <path d="M8 3.5v9M3.5 8h9" strokeLinecap="round" />
                </svg>
              </button>
            </h3>

            <div
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
              className="grid transition-[grid-template-rows] duration-base ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  itemProp="text"
                  className="max-w-[66ch] pb-5 pl-[36px] pr-2 text-[15.5px] leading-[1.7] text-text-secondary transition-opacity duration-base"
                  style={{ opacity: isOpen ? 1 : 0 }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
