export interface NavLink {
  label: string;
  href: string;
  sub?: string;
  draft?: boolean;
}

export interface NavColumn {
  heading?: string;
  links: NavLink[];
}

export interface NavMenu {
  label: string;
  columns: NavColumn[];
  promo?: { title: string; body: string; cta: string; href: string };
}

export const productsMenu: NavMenu = {
  label: "Products",
  columns: [
    {
      heading: "Conversational",
      links: [
        { label: "WhatsApp Business API", href: "/whatsapp-business-api", sub: "Templates, sessions, green tick, team inbox" },
        { label: "WhatsApp Chatbot", href: "/whatsapp-chatbot", sub: "Flows, lead capture, live-agent handover" },
        { label: "RCS Business Messaging", href: "/rcs", sub: "Rich cards, carousels, verified sender" },
      ],
    },
    {
      heading: "SMS",
      links: [
        { label: "OTP SMS", href: "/sms/otp" },
        { label: "Transactional SMS", href: "/sms/transactional" },
        { label: "Promotional SMS", href: "/sms/promotional" },
        { label: "Two-Way & Inbound SMS", href: "/sms/two-way", draft: true },
        { label: "Bulk SMS Panel", href: "/sms/bulk-campaigns", draft: true },
      ],
    },
    {
      heading: "Voice",
      links: [
        { label: "Voice OTP", href: "/voice/otp" },
        { label: "Text-to-Speech Calls", href: "/voice/tts" },
        { label: "Press-1 Campaigns", href: "/voice/press-1" },
        { label: "Voice Broadcast", href: "/voice/broadcast" },
        { label: "IVR", href: "/voice/ivr" },
      ],
    },
    {
      heading: "Numbers",
      links: [
        { label: "Toll-Free Number", href: "/numbers/toll-free", sub: "1800 series, KYC, routing" },
        { label: "Missed Call Number", href: "/numbers/missed-call" },
        { label: "Number Masking", href: "/numbers/masking", sub: "Click-to-call, privacy bridging" },
        { label: "Short & Long Code", href: "/numbers/codes", draft: true },
      ],
    },
  ],
  promo: {
    title: "MsgBridge Verify",
    body: "SMS, then WhatsApp, then a voice call — one API call, until the code lands.",
    cta: "See the demo",
    href: "/verify",
  },
};

export const solutionsMenu: NavMenu = {
  label: "Solutions",
  columns: [
    {
      heading: "By use case",
      links: [
        { label: "OTP & User Verification", href: "/solutions/otp-verification" },
        { label: "Alerts & Notifications", href: "/solutions/alerts" },
        { label: "Marketing Campaigns", href: "/solutions/marketing" },
        { label: "Customer Support", href: "/solutions/support" },
        { label: "Conversational Commerce", href: "/solutions/commerce" },
      ],
    },
    {
      heading: "By moment",
      links: [
        { label: "Payment & Collection Reminders", href: "/solutions/payment-reminders" },
        { label: "Order & Delivery Updates", href: "/solutions/order-updates" },
        { label: "Appointment Reminders", href: "/solutions/appointments" },
        { label: "Lead Capture & Qualification", href: "/solutions/lead-generation" },
        { label: "Surveys & Feedback", href: "/solutions/surveys" },
      ],
    },
    {
      heading: "Done-for-you services",
      links: [
        { label: "DLT Registration Assistance", href: "/services/dlt-registration", sub: "Entity ID, header, templates, TM chain" },
        { label: "WhatsApp Verification", href: "/services/whatsapp-verification", sub: "Business verification and green tick", draft: true },
        { label: "Chatbot Design & Build", href: "/services/chatbot-development", sub: "7–15 working days" },
        { label: "API Integration Support", href: "/services/integration" },
        { label: "Social Lead Generation", href: "/services/social-leads" },
      ],
    },
  ],
};

export const industriesMenu: NavMenu = {
  label: "Industries",
  columns: [
    {
      heading: "Regulated",
      links: [
        { label: "BFSI & Fintech", href: "/industries/bfsi" },
        { label: "Healthcare", href: "/industries/healthcare" },
        { label: "Insurance", href: "/industries/insurance" },
        { label: "Government & Public Sector", href: "/industries/government" },
      ],
    },
    {
      heading: "High volume",
      links: [
        { label: "E-commerce & D2C", href: "/industries/ecommerce" },
        { label: "Logistics & Delivery", href: "/industries/logistics" },
        { label: "Travel & Hospitality", href: "/industries/travel" },
      ],
    },
    {
      heading: "Growth",
      links: [
        { label: "Education & EdTech", href: "/industries/education" },
        { label: "Real Estate", href: "/industries/real-estate" },
        { label: "SaaS & Startups", href: "/industries/saas" },
        { label: "All industries →", href: "/industries" },
      ],
    },
  ],
};

export const developersMenu: NavMenu = {
  label: "Developers",
  columns: [
    {
      heading: "Start here",
      links: [
        { label: "Documentation", href: "/developers/quickstart" },
        { label: "Quickstart", href: "/developers/quickstart" },
        { label: "Sandbox & Test Credentials", href: "/developers/sandbox", draft: true },
        { label: "Postman Collection", href: "/developers/postman", draft: true },
      ],
    },
    {
      heading: "API reference",
      links: [
        { label: "SMS API", href: "/developers/sms-api" },
        { label: "WhatsApp API", href: "/developers/whatsapp-api" },
        { label: "Voice API", href: "/developers/voice-api" },
        { label: "RCS API", href: "/developers/rcs-api", draft: true },
        { label: "Verify API", href: "/developers/verify-api", draft: true },
      ],
    },
    {
      heading: "Operate",
      links: [
        { label: "Webhooks & Delivery Reports", href: "/developers/webhooks", draft: true },
        { label: "Error Codes", href: "/developers/errors", draft: true },
        { label: "Rate Limits", href: "/developers/limits", draft: true },
      ],
    },
  ],
};

export const companyMenu: NavMenu = {
  label: "Company",
  columns: [
    {
      heading: "Company",
      links: [
        { label: "About MsgBridge", href: "/about" },
        { label: "Why MsgBridge", href: "/why-msgbridge" },
        { label: "Contact & Support", href: "/contact" },
        { label: "Partner & Reseller Programme", href: "/partners" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "DLT & TRAI Compliance Guide", href: "/compliance" },
        { label: "Blog & Guides", href: "/blog" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "SMS Templates Library", href: "/resources/templates" },
      ],
    },
  ],
};

export const primaryMenus: NavMenu[] = [productsMenu, solutionsMenu, industriesMenu, developersMenu, companyMenu];

export const footerLegal: NavLink[] = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Acceptable Use", href: "/legal/aup" },
  { label: "SLA", href: "/legal/sla", draft: true },
  { label: "Refund Policy", href: "/legal/refunds" },
];
