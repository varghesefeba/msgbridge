"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Fires once when the element crosses into view. */
export function useInView<T extends Element>(ref: RefObject<T>, threshold = 0.35, rootMargin = "0px 0px -10% 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);
  return inView;
}

/** 0 → 1 progress as the element travels through the viewport. rAF-throttled. */
export function useScrollProgress<T extends Element>(ref: RefObject<T>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(rect.top < 0 ? 1 : 0);
        return;
      }
      setProgress(Math.min(Math.max(-rect.top / total, 0), 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
  return progress;
}

/** Eased count-up that starts when `start` flips true. */
export function useCountUp(target: number, start: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration, reduced]);
  return value;
}

/** Types out `text` character by character once `start` is true. */
export function useTypewriter(text: string, start: boolean, speed = 18) {
  const [out, setOut] = useState("");
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed, reduced]);
  return out;
}

/** Eases toward `target` whenever it changes — for values driven by user input. */
export function useAnimatedValue(target: number, duration = 420) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = from.current;
    const delta = target - start;
    if (delta === 0) return;
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = start + delta * (1 - Math.pow(1 - p, 3));
      from.current = eased;
      setValue(eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, reduced]);

  return value;
}

/** Steps through 0..steps-1 on an interval while `run` is true. */
export function useSequence(steps: number, run: boolean, interval = 900) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps), interval);
    return () => clearInterval(id);
  }, [steps, run, interval]);
  return step;
}

/** Pointer position within an element, as 0–1 plus raw px. Desktop pointers only. */
export function usePointer<T extends HTMLElement>(ref: RefObject<T>) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5, px: 0, py: 0, active: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        setPos({ x: px / r.width, y: py / r.height, px, py, active: true });
      });
    };
    const onLeave = () => setPos((p) => ({ ...p, active: false }));
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
  return pos;
}

/** Scroll position helpers for the header. */
export function useScrollState(threshold = 24) {
  const [state, setState] = useState({ scrolled: false, progress: 0, hidden: false });
  const last = useRef(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        scrolled: y > threshold,
        progress: max > 0 ? Math.min(y / max, 1) : 0,
        hidden: y > 420 && y > last.current,
      });
      last.current = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);
  return state;
}

/** Magnetic pull toward the cursor, returns a transform string + handlers. */
export function useMagnetic(strength = 0.28, radius = 90) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist > radius + Math.max(r.width, r.height) / 2) return;
      setOffset({ x: dx * strength, y: dy * strength });
    },
    [reduced, strength, radius]
  );

  const onLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return { ref, offset, onMove, onLeave };
}
