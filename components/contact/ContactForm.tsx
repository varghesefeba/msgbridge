"use client";

import { useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "@/lib/motion";

const USE_CASES = ["OTP & Verification", "Marketing", "Support", "Order Updates", "Payment Reminders", "Other"];
const VOLUMES = ["< 10,000 / month", "10,000 – 100,000 / month", "100,000 – 1,000,000 / month", "1,000,000+ / month"];

const DISPOSABLE = ["mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "yopmail.com"];

type Errors = Partial<Record<"name" | "email" | "phone" | "company" | "consent", string>>;

function validateField(name: string, value: string): string | undefined {
  switch (name) {
    case "name":
      return value.trim().length < 2 ? "Enter your name so we know who we're replying to." : undefined;
    case "email": {
      if (!value.trim()) return "We need an email address to reply to.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "That doesn't look like a complete email address.";
      if (DISPOSABLE.some((d) => value.toLowerCase().endsWith(`@${d}`)))
        return "Use an address you actually read — we reply within 4 working hours.";
      return undefined;
    }
    case "phone":
      return /^\d{10}$/.test(value.replace(/\s/g, "")) ? undefined : "Indian mobile numbers are 10 digits.";
    case "company":
      return value.trim().length < 2 ? "Tell us the company name." : undefined;
    default:
      return undefined;
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [shake, setShake] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const reduced = useReducedMotion();

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    const message = validateField(e.target.name, e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: message }));
  }

  // Once a field is already showing an error, clear it the moment it's fixed —
  // validating on blur alone leaves a stale error sitting there while you type.
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const field = e.target.name as keyof Errors;
    if (!errors[field]) return;
    const message = validateField(field, e.target.value);
    if (!message) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("company_website")) return; // honeypot

    const next: Errors = {};
    (["name", "email", "phone", "company"] as const).forEach((field) => {
      const message = validateField(field, String(data.get(field) ?? ""));
      if (message) next[field] = message;
    });
    if (!data.get("consent")) next.consent = "We need your consent before we can get in touch.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");
    setTimeout(() => setStatus("sent"), reduced ? 0 : 900);
  }

  if (status === "sent") {
    return (
      <div
        id="demo"
        role="status"
        aria-live="polite"
        className="animate-fade-up rounded-lg border border-lime-deep bg-lime-050 p-8 text-center"
      >
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12.6l4.6 4.5L19 7"
              stroke="#0A0B0D"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: "mb-check-draw 480ms cubic-bezier(0.2,0.7,0.3,1) 120ms forwards" }}
            />
          </svg>
        </span>
        <p className="mb-2 font-display text-[20px] font-bold text-text-primary">Thanks — we&rsquo;ll be in touch.</p>
        <p className="mx-auto max-w-[38ch] text-[14.5px] leading-relaxed text-text-secondary">
          First response within 4 working hours, on WhatsApp or email. You&rsquo;ll get a named contact, not a ticket
          number.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
          className="mt-6 font-display text-[12.5px] font-semibold uppercase tracking-wide text-lime-forest underline-grow"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      id="demo"
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 rounded-lg border border-line bg-white p-6 md:p-8"
      style={{ animation: shake && !reduced ? "mb-shake 320ms ease-in-out 2" : undefined }}
    >
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" autoComplete="name" error={errors.name} onBlur={onBlur} onChange={onChange} />
        <Field label="Work email" name="email" type="email" autoComplete="email" error={errors.email} onBlur={onBlur} onChange={onChange} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" prefix="+91" error={errors.phone} onBlur={onBlur} onChange={onChange} />
        <Field label="Company" name="company" autoComplete="organization" error={errors.company} onBlur={onBlur} onChange={onChange} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Use case" name="use_case" options={USE_CASES} />
        <SelectField label="Monthly volume" name="volume" options={VOLUMES} />
      </div>

      <div className="group/field relative">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder=" "
          className="peer w-full resize-y rounded-sm border border-line bg-white px-4 pb-2.5 pt-6 text-[14.5px] text-text-primary outline-none transition-colors duration-fast focus:border-lime-deep"
        />
        <label
          htmlFor="message"
          className="pointer-events-none absolute left-4 top-4 origin-left text-[14.5px] text-text-muted transition-all duration-fast ease-out peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-lime-forest peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
        >
          What are you trying to send?
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] text-text-muted">
          <span className="relative mt-0.5 flex h-4 w-4 shrink-0">
            <input
              type="checkbox"
              name="consent"
              aria-invalid={errors.consent ? true : undefined}
              onChange={() => setErrors((p) => ({ ...p, consent: undefined }))}
              className="peer h-4 w-4 appearance-none rounded-xs border border-line bg-white transition-colors duration-fast checked:border-lime-deep checked:bg-lime-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-deep"
            />
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              fill="none"
              className="pointer-events-none absolute inset-0 m-auto h-3 w-3 scale-50 text-white opacity-0 transition-all duration-base peer-checked:scale-100 peer-checked:opacity-100"
            >
              <path d="M3 8.4l3.4 3.3L13 5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            I agree to the{" "}
            <a href="/legal/privacy" className="underline-grow font-medium text-lime-forest">
              Privacy Policy
            </a>{" "}
            and to be contacted about this enquiry.
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-1.5 pl-7 text-[12.5px] text-[#b91c1c]">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="shine-host group/submit relative inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-lime px-8 py-3.5 font-display text-[15px] font-bold uppercase tracking-[0.06em] text-ink transition-all duration-fast ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-12px_rgba(175,255,73,0.85)] active:translate-y-0 active:scale-[0.98] disabled:cursor-wait sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <span
              aria-hidden
              className="h-4 w-4 rounded-full border-2 border-ink/25 border-t-ink"
              style={{ animation: reduced ? "none" : "mb-spin-slow 0.7s linear infinite" }}
            />
            <span className="relative z-10">Sending</span>
          </>
        ) : (
          <>
            <span className="relative z-10">Send message</span>
            <span aria-hidden className="relative z-10 transition-transform duration-base ease-out group-hover/submit:translate-x-1">
              →
            </span>
          </>
        )}
      </button>

      <p className="font-mono text-[11px] text-text-muted">First response within 4 working hours.</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  prefix,
  error,
  onBlur,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  prefix?: string;
  error?: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div
        className={`relative flex items-stretch rounded-sm border bg-white transition-colors duration-fast focus-within:border-lime-deep ${
          error ? "border-[#dc2626]" : "border-line"
        }`}
      >
        {prefix && (
          <span className="flex items-end border-r border-line bg-paper-warm px-3 pb-2.5 font-mono text-[13.5px] text-text-muted">
            {prefix}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder=" "
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          onBlur={onBlur}
          onChange={onChange}
          className="peer min-w-0 flex-1 rounded-sm bg-transparent px-4 pb-2.5 pt-6 text-[14.5px] text-text-primary outline-none"
        />
        <label
          htmlFor={name}
          className={`pointer-events-none absolute top-4 origin-left text-[14.5px] transition-all duration-fast ease-out peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-lime-forest peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] ${
            error ? "text-[#dc2626]" : "text-text-muted"
          }`}
          style={{ left: prefix ? "4.25rem" : "1rem" }}
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-[12.5px] text-[#b91c1c]">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div className="relative rounded-sm border border-line bg-white transition-colors duration-fast focus-within:border-lime-deep">
      <label htmlFor={name} className="pointer-events-none absolute left-4 top-2 text-[11px] text-text-muted">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full cursor-pointer appearance-none rounded-sm bg-transparent pb-2.5 pl-4 pr-10 pt-6 text-[14.5px] text-text-primary outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
      >
        <path d="m4 6.5 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
