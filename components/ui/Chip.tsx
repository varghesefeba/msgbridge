const channelColor: Record<string, string> = {
  whatsapp: "bg-[rgba(37,211,102,0.12)] text-[#1b9950]",
  sms: "bg-[rgba(83,189,235,0.15)] text-ch-sms-text",
  rcs: "bg-[rgba(61,130,245,0.12)] text-ch-rcs",
  voice: "bg-[rgba(255,154,62,0.15)] text-[#b95f00]",
  ai: "bg-[rgba(124,92,255,0.12)] text-ch-ai",
};

export default function Chip({ label, channel }: { label: string; channel?: keyof typeof channelColor }) {
  const cls = channel ? channelColor[channel] : "bg-lime-100 text-lime-forest";
  return (
    <span className={`inline-flex items-center rounded-pill px-3 py-1 text-[13px] font-display font-semibold uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
}
