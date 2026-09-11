"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for every [data-reveal] / [data-draw] element on the page, so
 * server components can opt into scroll reveals with a plain attribute and
 * ship no client JS of their own.
 */
export default function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const seen = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "true");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    function scan() {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in]), [data-draw]:not([data-in])").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);

        // Give each child of a stagger container its index.
        const parent = el.parentElement;
        if (parent?.hasAttribute("data-stagger") && !el.style.getPropertyValue("--i")) {
          el.style.setProperty("--i", String(Array.prototype.indexOf.call(parent.children, el)));
        }

        // Measure SVG path length so the draw animation is exact.
        if (el.hasAttribute("data-draw") && typeof (el as unknown as SVGPathElement).getTotalLength === "function") {
          const len = Math.ceil((el as unknown as SVGPathElement).getTotalLength());
          if (len > 0) el.style.setProperty("--draw-len", String(len));
        }

        observer.observe(el);
      });
    }

    scan();
    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [pathname]);

  return null;
}
