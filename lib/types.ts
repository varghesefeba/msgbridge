export interface FAQ {
  q: string;
  a: string;
}

export interface CodeExample {
  curl: string;
  node: string;
  python: string;
}

export type Channel = "sms" | "whatsapp" | "rcs" | "voice";

export interface LiveExample {
  channel: Channel;
  sender: string;
  body: string;
  buttons?: string[];
}

export interface ProductPage {
  slug: string; // e.g. "/sms/otp"
  category: "WhatsApp" | "SMS" | "Voice" | "Numbers" | "RCS" | "Verify";
  name: string;
  oneLiner: string;
  example: LiveExample;
  api: CodeExample;
  whenToUse: string[];
  requirements: { item: string; leadTime: string }[];
  goLive: { title: string; detail: string }[];
  related: string[]; // slugs
  faq: FAQ[];
  draft?: boolean;
}

export interface SolutionPage {
  slug: string; // e.g. "/solutions/otp-verification"
  name: string;
  problem: string;
  channels: { name: string; why: string; recommended?: boolean }[];
  flow: { trigger: string; primary: string; fallback: string; outcome: string };
  templates: { title: string; body: string }[];
  setup: { step: string; owner: "MsgBridge" | "You" }[];
  relatedIndustries: string[]; // industry slugs
  relatedProducts: string[]; // product slugs
}

export interface IndustryPage {
  slug: string; // e.g. "/industries/bfsi"
  name: string;
  group: "Regulated" | "High volume" | "Growth";
  scenarios: { moment: string; detail: string }[];
  channelMix: { moment: string; channel: string; why: string }[];
  complianceNotes: string[];
  templatePack: { title: string; body: string }[];
  integrations: string[];
  relatedSolutions: string[]; // solution slugs
}

export interface ServicePage {
  slug: string; // e.g. "/services/dlt-registration"
  name: string;
  subLabel?: string;
  summary: string;
  deliverables: string[];
  whatYouProvide: string[];
  process: { stage: string; timeline: string; outsideControl?: boolean }[];
  rejectionPolicy: string;
  faq: FAQ[];
  draft?: boolean;
}
