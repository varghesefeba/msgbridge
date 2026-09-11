"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryMenus, type NavMenu } from "@/lib/nav";
import { useScrollState } from "@/lib/motion";
import MobileDrawer from "./MobileDrawer";

/** Reads the background actually painted behind the nav and picks a theme from it. */
function useSurfaceTheme(pillRef: React.RefObject<HTMLElement>, pathname: string) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let frame = 0;

    const sample = () => {
      frame = 0;
      const pill = pillRef.current;
      if (!pill) return;
      const rect = pill.getBoundingClientRect();
      const y = Math.min(rect.bottom + 10, window.innerHeight - 2);
      const stack = document.elementsFromPoint(rect.left + rect.width / 2, y);
      const behind = stack.find((el) => !pill.contains(el) && el !== document.documentElement);
      if (!behind) return;

      let node: Element | null = behind;
      while (node) {
        const bg = getComputedStyle(node).backgroundColor;
        const match = bg.match(/rgba?\(([^)]+)\)/);
        if (match) {
          const [r, g, b, a = "1"] = match[1].split(",").map((v) => parseFloat(v));
          if (parseFloat(String(a)) > 0.5) {
            const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            setDark(luminance < 0.5);
            return;
          }
        }
        node = node.parentElement;
      }
      setDark(false);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };

    sample();
    const settle = setTimeout(sample, 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pillRef, pathname]);

  return dark;
}

export default function Header() {
  const pathname = usePathname();
  const pillRef = useRef<HTMLDivElement>(null);
  const dark = useSurfaceTheme(pillRef, pathname);
  const { scrolled, progress } = useScrollState(20);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => setOpenMenu(null), [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape" || !openMenu) return;
      triggerRefs.current[openMenu]?.focus();
      setOpenMenu(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const scheduleOpen = useCallback((label: string) => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpenMenu(label), 110);
  }, []);
  const scheduleClose = useCallback(() => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 220);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          ref={pillRef}
          onMouseLeave={scheduleClose}
          className={`pointer-events-auto relative mx-auto flex max-w-[1160px] items-center gap-1 rounded-2xl border pl-4 pr-2 backdrop-blur-xl transition-[height,background-color,border-color,box-shadow] duration-slow ease-out ${
            scrolled ? "h-[58px]" : "h-[64px]"
          } ${
            dark
              ? "border-white/10 bg-ink/70 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]"
              : "border-line bg-white/80 shadow-[0_18px_40px_-26px_rgba(10,11,13,0.5)]"
          }`}
        >
          <Link href="/" aria-label="MsgBridge home" className="group/logo flex shrink-0 items-center gap-2 pr-2">
            <svg width="26" height="17" viewBox="0 0 100 62" aria-hidden className="overflow-visible">
              <path
                d="M6 56C6 30 30 8 50 8C70 8 94 30 94 56"
                fill="none"
                stroke={dark ? "#AFFF49" : "#3F6E12"}
                strokeWidth="12"
                strokeLinecap="round"
                className="transition-[stroke] duration-slow"
                style={{ strokeDasharray: 160, strokeDashoffset: 0, animation: "none" }}
              />
              <circle
                cx="50"
                cy="8"
                r="9"
                fill={dark ? "#FFFFFF" : "#0A0A0A"}
                className="origin-center transition-all duration-base group-hover/logo:scale-125"
              />
            </svg>
            <span className={`font-display text-[19px] font-extrabold tracking-tight ${dark ? "text-white" : "text-ink"}`}>
              msg<span style={{ color: dark ? "#AFFF49" : "#3F7A00" }}>bridge</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {primaryMenus.map((menu) => {
              const isOpen = openMenu === menu.label;
              const isActive = menu.columns.some((c) => c.links.some((l) => pathname === l.href || (l.href !== "/" && pathname.startsWith(`${l.href}/`))));
              return (
                <div key={menu.label} onMouseEnter={() => scheduleOpen(menu.label)}>
                  <button
                    ref={(el) => {
                      triggerRefs.current[menu.label] = el;
                    }}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(isOpen ? null : menu.label)}
                    className={`relative rounded-lg px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-fast ${
                      dark
                        ? isOpen || isActive
                          ? "text-white"
                          : "text-on-dark-3 hover:text-white"
                        : isOpen || isActive
                          ? "text-ink"
                          : "text-text-secondary hover:text-ink"
                    }`}
                  >
                    {menu.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-lime transition-transform duration-base ease-out ${
                        isOpen || isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/contact"
              className={`hidden rounded-lg px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-fast sm:block ${
                dark ? "text-on-dark-3 hover:text-white" : "text-text-secondary hover:text-ink"
              }`}
            >
              Talk to us
            </Link>
            <Link
              href="/contact#demo"
              className="group/cta shine-host relative hidden items-center gap-1.5 rounded-lg bg-lime px-4 py-2.5 font-display text-[13px] font-bold uppercase tracking-[0.05em] text-ink transition-all duration-fast hover:shadow-[0_10px_24px_-10px_rgba(175,255,73,0.9)] active:scale-95 sm:flex"
            >
              <span className="relative z-10">Start free</span>
              <span aria-hidden className="relative z-10 transition-transform duration-base group-hover/cta:translate-x-0.5">
                →
              </span>
            </Link>

            <button
              className={`rounded-lg p-2.5 lg:hidden ${dark ? "text-white" : "text-ink"}`}
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <span
            aria-hidden
            className="absolute inset-x-4 bottom-0 h-px origin-left rounded-full bg-gradient-to-r from-lime-deep via-lime to-transparent"
            style={{ transform: `scaleX(${progress})`, opacity: progress > 0.01 ? 0.9 : 0, transition: "transform 90ms linear, opacity 240ms" }}
          />

          {primaryMenus.map((menu) => (
            <MegaPanel key={menu.label} menu={menu} open={openMenu === menu.label} onClose={() => setOpenMenu(null)} pathname={pathname} />
          ))}
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

function MegaPanel({ menu, open, onClose, pathname }: { menu: NavMenu; open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState({ top: 0, left: 0, width: 0, height: 0, on: false });

  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const item = e.currentTarget.getBoundingClientRect();
    const box = panel.getBoundingClientRect();
    setHighlight({ top: item.top - box.top, left: item.left - box.left, width: item.width, height: item.height, on: true });
  };

  return (
    <div
      ref={panelRef}
      role="menu"
      aria-label={menu.label}
      onMouseLeave={() => setHighlight((h) => ({ ...h, on: false }))}
      className={`absolute left-0 right-0 top-[calc(100%+10px)] origin-top overflow-hidden rounded-2xl border border-line bg-white/95 shadow-[0_36px_80px_-40px_rgba(10,11,13,0.55)] backdrop-blur-xl transition-all duration-slow ease-out ${
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <span
        aria-hidden
        className="absolute rounded-lg bg-lime-050 transition-all duration-300 ease-out"
        style={{
          top: highlight.top,
          left: highlight.left,
          width: highlight.width,
          height: highlight.height,
          opacity: highlight.on ? 1 : 0,
        }}
      />

      <div
        className="relative grid gap-8 p-7"
        style={{ gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0,1fr)) ${menu.promo ? "300px" : ""}` }}
      >
        {menu.columns.map((col, i) => (
          <div
            key={i}
            className="transition-all duration-slow ease-out"
            style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(6px)" }}
          >
            {col.heading && (
              <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
                {col.heading}
              </p>
            )}
            <ul className="space-y-0.5">
              {col.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={`${link.href}|${link.label}`}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      onMouseEnter={move}
                      onFocus={(e) => move(e as unknown as React.MouseEvent<HTMLAnchorElement>)}
                      className="group/link relative z-10 flex flex-col rounded-lg px-2.5 py-2"
                    >
                      <span className="flex items-center gap-2 text-[14.5px] font-medium text-text-primary">
                        {link.label}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" aria-label="current page" />}
                        {link.draft && (
                          <span className="rounded-xs bg-ink px-1.5 py-0.5 font-display text-[9.5px] uppercase tracking-wide text-lime">Soon</span>
                        )}
                        <span
                          aria-hidden
                          className="ml-auto -translate-x-1 text-lime-forest opacity-0 transition-all duration-base group-hover/link:translate-x-0 group-hover/link:opacity-100"
                        >
                          →
                        </span>
                      </span>
                      {link.sub && <span className="mt-0.5 text-[12.5px] leading-snug text-text-muted">{link.sub}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {menu.promo && (
          <Link
            href={menu.promo.href}
            onClick={onClose}
            className="group/promo relative z-10 flex flex-col justify-between overflow-hidden rounded-xl border border-lime-200 bg-lime-050 p-5 transition-colors duration-base hover:bg-lime-100"
            style={{ transitionDelay: open ? "180ms" : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(6px)" }}
          >
            <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-lime" />
            <div>
              <p className="mb-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-lime-forest">Featured</p>
              <p className="mb-1 font-display text-[16px] font-bold text-text-primary">{menu.promo.title}</p>
              <p className="text-[13px] leading-snug text-text-secondary">{menu.promo.body}</p>
            </div>
            <div className="mt-4 flex items-center gap-1.5" aria-hidden>
              {["#53BDEB", "#25D366", "#FF9A3E"].map((c, i) => (
                <span key={c} className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:group-hover/promo:animate-ping"
                    style={{ background: c, animationDelay: `${i * 180}ms` }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: c }} />
                </span>
              ))}
              <span className="ml-2 font-display text-[12px] font-semibold uppercase tracking-wide text-lime-forest">
                {menu.promo.cta} →
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
