"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryMenus } from "@/lib/nav";

export default function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(primaryMenus[0]?.label ?? null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={`fixed inset-0 z-[70] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/80 backdrop-blur-md transition-opacity duration-slow ${open ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className={`absolute inset-x-0 top-0 flex h-full flex-col bg-ink transition-all duration-slow ease-out ${
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between px-6">
          <span className="font-display text-[18px] font-extrabold text-white">
            msg<span className="text-lime">bridge</span>
          </span>
          <button ref={closeRef} onClick={onClose} aria-label="Close menu" className="rounded-lg p-2 text-white transition-colors hover:bg-white/10">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {primaryMenus.map((menu, mi) => {
            const isOpen = expanded === menu.label;
            return (
              <div
                key={menu.label}
                className="border-b border-ink-line transition-all duration-500 ease-out"
                style={{
                  transitionDelay: open ? `${80 + mi * 45}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(12px)",
                }}
              >
                <button
                  className="flex w-full items-center justify-between py-4 font-display text-[15px] font-semibold uppercase tracking-wide text-white"
                  onClick={() => setExpanded(isOpen ? null : menu.label)}
                  aria-expanded={isOpen}
                >
                  {menu.label}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-on-dark-4 transition-transform duration-base ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-base ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-3">
                      {menu.columns.map((col) => (
                        <div key={col.heading ?? "col"} className="mb-3 last:mb-0">
                          {col.heading && (
                            <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-on-dark-5">{col.heading}</p>
                          )}
                          {col.links.map((link) => (
                            <Link
                              key={`${link.href}|${link.label}`}
                              href={link.href}
                              onClick={onClose}
                              className="flex items-center justify-between py-2 text-[15px] text-on-dark-2 transition-colors active:text-lime"
                            >
                              {link.label}
                              <span aria-hidden className="text-on-dark-6">
                                →
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="shrink-0 border-t border-ink-line bg-ink p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-lime px-6 py-3.5 font-display text-[15px] font-bold uppercase tracking-[0.06em] text-ink active:scale-[0.98]"
          >
            Talk to us <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
