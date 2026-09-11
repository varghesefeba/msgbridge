"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents" className="sticky top-[96px] hidden lg:block">
      <p className="text-[12px] font-display font-semibold uppercase tracking-wide text-text-muted mb-3">On this page</p>
      <ul className="space-y-1 border-l border-line">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block pl-4 py-1.5 text-[13.5px] border-l-2 -ml-px transition-colors duration-fast ${
                active === s.id ? "border-lime-deep text-lime-forest font-medium" : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
