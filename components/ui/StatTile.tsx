import CountUp from "@/components/motion/CountUp";

export default function StatTile({
  value,
  suffix = "",
  prefix = "",
  label,
  dark = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="group/stat">
      <div className={`font-display text-[38px] font-extrabold leading-none ${dark ? "text-on-dark" : "text-text-primary"}`}>
        <CountUp to={value} prefix={prefix} suffix={suffix} />
      </div>
      <div
        data-reveal="clip"
        className="mt-2.5 h-[2px] w-10 rounded-full bg-lime transition-all duration-base ease-out group-hover/stat:w-16"
      />
      <div className={`mt-2.5 text-[13.5px] ${dark ? "text-on-dark-3" : "text-text-muted"}`}>{label}</div>
    </div>
  );
}
