"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Re-keys on route change so the enter animation replays. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
