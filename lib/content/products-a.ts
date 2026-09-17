import type { ProductPage } from "@/lib/types";

export const productsA: ProductPage[] = [
  {
    slug: "/whatsapp-business-api",
    category: "WhatsApp",
    name: "WhatsApp Business API",
    oneLiner:
      "Send template messages, run 24-hour service conversations, and manage every chat from one team inbox on the official WhatsApp Business API.",
    example: {
      channel: "whatsapp",
      sender: "MsgBridge",
      body: "Hi Aisha, your order #4821 has shipped and should arrive by Thursday.",
      buttons: ["Track order", "Contact support"],
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/whatsapp/messages \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d template_id="order_shipped" \\\n  -d waba_id="$WABA_ID"`,
      node: `const msgbridge = require("msgbridge");\n\nawait msgbridge.whatsapp.send({\n  to: "+91XXXXXXXXXX",\n  templateId: "order_shipped",\n  wabaId: process.env.WABA_ID,\n});`,
      python: `import msgbridge\n\nmsgbridge.whatsapp.send(\n    to="+91XXXXXXXXXX",\n    template_id="order_shipped",\n    waba_id="$WABA_ID",\n)`,
    },
    whenToUse: [
      "Order and delivery updates with tracking buttons",
      "Payment confirmations and receipts",
      "Customer support conversations inside a 24-hour window",
      "Catalogue browsing and in-chat payments",
    ],
    requirements: [
      { item: "Business verification and green tick", leadTime: "Subject to Meta's review timelines" },
      { item: "Approved message templates", leadTime: "Typically 24–48 hours per template" },
      { item: "Team inbox setup", leadTime: "Usually ready within 1 working day" },
    ],
    goLive: [
      { title: "Register", detail: "Submit your business details for WhatsApp Business API onboarding." },
      { title: "Verify", detail: "Complete business verification through the Meta-approved BSP partner." },
      { title: "Approve templates", detail: "Draft and submit your first message templates for approval." },
      { title: "Go live", detail: "Integrate the API and start sending from your team inbox." },
    ],
    related: ["/whatsapp-chatbot", "/rcs", "/services/whatsapp-verification"],
    faq: [
      {
        q: "Are you a Meta Business Solution Provider?",
        a: "We onboard WhatsApp accounts through a Meta-approved BSP partner, so you get the official Business API without dealing with the provider chain yourself.",
      },
      {
        q: "How long does business verification take?",
        a: "It depends on Meta's review of your submitted documents. We prepare and submit the application correctly the first time to avoid the most common rejection reasons.",
      },
      {
        q: "Can I send messages outside the 24-hour window?",
        a: "Yes, using an approved template message. Free-form replies are only available within 24 hours of a customer's last message.",
      },
      {
        q: "Do you support catalogues and in-chat payments?",
        a: "Yes, both are available on the Business API and can be enabled during onboarding.",
      },
    ],
  },
  {
    slug: "/whatsapp-chatbot",
    category: "WhatsApp",
    name: "WhatsApp Chatbot",
    oneLiner:
      "Automate common questions, capture leads, and hand complex conversations to a live agent, on WhatsApp, around the clock.",
    example: {
      channel: "whatsapp",
      sender: "MsgBridge",
      body: "Hi! I can help you check your order status, book a service, or talk to our team.",
      buttons: ["Check order status", "Talk to a person"],
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/chatbot/flows/trigger \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d flow_id="order_status" \\\n  -d waba_id="$WABA_ID"`,
      node: `await msgbridge.chatbot.trigger({\n  to: "+91XXXXXXXXXX",\n  flowId: "order_status",\n  wabaId: process.env.WABA_ID,\n});`,
      python: `msgbridge.chatbot.trigger(\n    to="+91XXXXXXXXXX",\n    flow_id="order_status",\n    waba_id="$WABA_ID",\n)`,
    },
    whenToUse: [
      "Answering common questions without a human on standby",
      "Capturing and qualifying leads from an ad or a website chat button",
      "Order and service status updates",
      "Appointment booking with a handover to a live agent when needed",
    ],
    requirements: [
      { item: "WhatsApp Business API access", leadTime: "See WhatsApp Business API requirements" },
      { item: "Conversation flow design", leadTime: "Included in the build" },
      { item: "CRM or website integration", leadTime: "Varies with the systems involved" },
    ],
    goLive: [
      { title: "Requirements", detail: "Map the conversations the bot needs to handle and where it should hand off." },
      { title: "Build", detail: "Flows, automated replies and integrations are built and connected." },
      { title: "Test", detail: "Run through every path, including the handover to a live agent." },
      { title: "Launch", detail: "Go live, with monitoring during the first weeks of traffic." },
    ],
    related: ["/whatsapp-business-api", "/services/chatbot-development", "/solutions/support"],
    faq: [
      {
        q: "How long does a chatbot build take?",
        a: "Typically 7–15 working days, depending on how many flows are needed, bot complexity, and Meta's template review timelines.",
      },
      {
        q: "Can it hand off to a real person?",
        a: "Yes. Any flow can be configured to transfer the conversation to a live agent in your team inbox, with the chat history intact.",
      },
      {
        q: "What systems can it connect to?",
        a: "Common integrations include your CRM, ERP, and website via webhooks. We scope the specific connectors during onboarding.",
      },
      {
        q: "Does it work outside e-commerce?",
        a: "Yes — healthcare, education, travel, logistics, real estate and financial services all run chatbot flows on this same product.",
      },
    ],
  },
  {
    slug: "/rcs",
    category: "RCS",
    name: "RCS Business Messaging",
    oneLiner:
      "Branded, verified, app-like messages in the native messages app — rich media, carousels and suggested actions, without needing a separate app install.",
    example: {
      channel: "rcs",
      sender: "MsgBridge ✓",
      body: "Your order #4821 has shipped\nArriving in 2 days",
      buttons: ["Track order", "Reschedule delivery"],
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/rcs/messages \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d agent_id="$RCS_AGENT_ID" \\\n  -d card_id="order_shipped_card"`,
      node: `await msgbridge.rcs.send({\n  to: "+91XXXXXXXXXX",\n  agentId: process.env.RCS_AGENT_ID,\n  cardId: "order_shipped_card",\n});`,
      python: `msgbridge.rcs.send(\n    to="+91XXXXXXXXXX",\n    agent_id="$RCS_AGENT_ID",\n    card_id="order_shipped_card",\n)`,
    },
    whenToUse: [
      "Campaigns that need rich media and carousels",
      "Order, payment and appointment updates with a verified sender badge",
      "Travel itineraries with maps and suggested actions",
      "Support conversations with quick-reply buttons",
    ],
    requirements: [
      { item: "Verified RCS agent identity", leadTime: "Timelines vary by operator review" },
      { item: "Rich card design", leadTime: "Included in onboarding" },
    ],
    goLive: [
      { title: "Register agent", detail: "Submit your business for a verified RCS sender identity." },
      { title: "Design cards", detail: "Build rich cards and carousels for your key messages." },
      { title: "Integrate", detail: "Connect the API and send a test card to your own device." },
      { title: "Launch", detail: "Roll out to your full audience, with automatic fallback where RCS is unavailable." },
    ],
    related: ["/whatsapp-business-api", "/sms/promotional", "/solutions/marketing"],
    faq: [
      {
        q: "Will every customer see the rich RCS card?",
        a: "RCS availability varies by device, network, operator and RCS support. We recommend an SMS fallback for recipients whose device or carrier doesn't support it yet.",
      },
      {
        q: "Who verifies the sender identity?",
        a: "RCS agent verification runs through our operator partners as part of onboarding. We handle the submission on your behalf.",
      },
      {
        q: "Can I reuse my WhatsApp templates?",
        a: "The formats differ, but the same campaign content usually adapts well into an RCS rich card with minor changes.",
      },
      {
        q: "Is analytics included?",
        a: "Yes — delivery and interaction tracking for RCS messages is available over the same reporting API as your other channels.",
      },
    ],
  },
  {
    slug: "/sms/otp",
    category: "SMS",
    name: "OTP SMS",
    oneLiner:
      "One-time passwords on dedicated, OTP-grade routes — DLT-registered, DND-exempt, with delivery receipts straight from the operator.",
    example: {
      channel: "sms",
      sender: "MSGBRG",
      body: "482913 is your MsgBridge OTP. Valid for 5 minutes. Do not share this code with anyone.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/sms/send \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d template_id="otp_login" \\\n  -d entity_id="$ENTITY_ID"`,
      node: `await msgbridge.sms.send({\n  to: "+91XXXXXXXXXX",\n  templateId: "otp_login",\n  entityId: process.env.ENTITY_ID,\n});`,
      python: `msgbridge.sms.send(\n    to="+91XXXXXXXXXX",\n    template_id="otp_login",\n    entity_id="$ENTITY_ID",\n)`,
    },
    whenToUse: [
      "Login and signup verification",
      "Password and PIN resets",
      "Payment confirmation before a transaction completes",
      "Two-factor authentication on account changes",
    ],
    requirements: [
      { item: "Principal entity on the operator's DLT portal", leadTime: "Usually same-day to 48 hours, with your GST and PAN" },
      { item: "Six-character sender header, mapped to your brand", leadTime: "Clears in 1–3 working days once the entity is live" },
      { item: "Registered content template with variables", leadTime: "Filed in parallel — nothing waits on nothing" },
      { item: "TM chain binding to a high-priority route", leadTime: "Completed once entity, header and template are live" },
    ],
    goLive: [
      { title: "Register in parallel", detail: "Entity, sender header and template are filed together with your integration, so registration never blocks the build." },
      { title: "Bind the route", detail: "Your OTP template is bound to a dedicated, high-priority route built for authentication traffic." },
      { title: "Integrate", detail: "One send call — API access is typically ready within a working day of approvals." },
      { title: "Go live", detail: "OTPs land with operator-end delivery receipts: delivered, failed and rejected states with reason codes." },
    ],
    related: ["/verify", "/voice/otp", "/compliance", "/solutions/otp-verification"],
    faq: [
      {
        q: "Do OTPs go to DND numbers?",
        a: "Yes — transactional and service-implicit traffic is exempt from DND. Only promotional and explicit-consent traffic is filtered.",
      },
      {
        q: "How fast does an OTP arrive?",
        a: "OTPs run on dedicated, high-priority routes built for authentication traffic, prioritised over bulk and promotional sends. Exact timing still depends on the recipient's operator and network at that moment.",
      },
      {
        q: "How long does DLT registration take?",
        a: "Principal entity registration is usually same-day to 48 hours. Sender IDs and content templates clear in 1–3 working days once the entity is live. We file all three in parallel with your integration so nothing waits on nothing.",
      },
      {
        q: "What if an OTP doesn't arrive?",
        a: "You get operator-end delivery receipts with reason codes, so a failure is visible immediately. For higher-stakes verification, MsgBridge Verify falls back to WhatsApp and then a voice call until the code lands.",
      },
    ],
  },
  {
    slug: "/sms/transactional",
    category: "SMS",
    name: "Transactional SMS",
    oneLiner:
      "Service messages tied to a customer action — order, delivery and payment updates on DLT-registered routes, with delivery receipts straight from the operator.",
    example: {
      channel: "sms",
      sender: "MSGBRG",
      body: "Your payment of Rs.2,499 for order #4821 was received. Thank you for shopping with us.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/sms/send \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d template_id="payment_confirmed" \\\n  -d entity_id="$ENTITY_ID" \\\n  -d content.amount="2499"`,
      node: `await msgbridge.sms.send({\n  to: "+91XXXXXXXXXX",\n  templateId: "payment_confirmed",\n  entityId: process.env.ENTITY_ID,\n  content: { amount: "2499" },\n});`,
      python: `msgbridge.sms.send(\n    to="+91XXXXXXXXXX",\n    template_id="payment_confirmed",\n    entity_id="$ENTITY_ID",\n    content={"amount": "2499"},\n)`,
    },
    whenToUse: [
      "Order confirmations and dispatch updates",
      "Payment and refund confirmations",
      "Delivery and booking updates tied to a purchase",
      "Account alerts — low balance, expiry and security notices",
    ],
    requirements: [
      { item: "Principal entity on the operator's DLT portal", leadTime: "Usually same-day to 48 hours, with your GST and PAN" },
      { item: "Six-character sender header and content template", leadTime: "Clear in 1–3 working days, filed in parallel" },
      { item: "TM chain binding across the routes", leadTime: "Completed once entity, header and template are live" },
    ],
    goLive: [
      { title: "Register in parallel", detail: "Entity, header and template are filed together with your integration — nothing waits on nothing." },
      { title: "Connect", detail: "Wire the send call into your order, payment or booking system." },
      { title: "Validate templates", detail: "Every send is checked against the registered template before it leaves the platform, so a stray space never fails silently." },
      { title: "Go live", detail: "Operator-end delivery receipts return delivered, failed and rejected states with reason codes." },
    ],
    related: ["/sms/otp", "/sms/promotional", "/solutions/order-updates"],
    faq: [
      {
        q: "What's the difference between transactional, service and promotional?",
        a: "Transactional is service-implicit — OTPs, banking alerts, ticket confirmations. Service is service-explicit — order, delivery and payment updates tied to a purchase. Both are exempt from DND and can send any time. Promotional is marketing: filtered against DND and restricted to permitted hours.",
      },
      {
        q: "Why did my message fail with a template mismatch?",
        a: "DLT compares the sent text against the registered template character by character, including variable placement. A stray space or an extra full stop is enough. Our sender validates against the registered template before it leaves the platform and tells you exactly what differs.",
      },
      {
        q: "What counts as one message?",
        a: "160 characters of plain English, or 70 if the text contains any Unicode — one Hindi character or one emoji turns the whole message Unicode. Longer messages split into segments and bill per segment.",
      },
      {
        q: "Can I track delivery in real time?",
        a: "Yes. Operator-end delivery receipts return delivered, failed and rejected states with reason codes, over the same API you send on.",
      },
    ],
  },
  {
    slug: "/sms/promotional",
    category: "SMS",
    name: "Promotional SMS",
    oneLiner:
      "Opt-in offers and cold campaigns to non-DND numbers — scrubbed against preference lists and sent inside TRAI's permitted windows.",
    example: {
      channel: "sms",
      sender: "MSGBRG",
      body: "Weekend sale: 30% off storewide, today only. Shop now: msgb.in/sale",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/sms/send \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d template_id="weekend_sale" \\\n  -d entity_id="$ENTITY_ID" \\\n  -d route="promotional"`,
      node: `await msgbridge.sms.send({\n  to: "+91XXXXXXXXXX",\n  templateId: "weekend_sale",\n  entityId: process.env.ENTITY_ID,\n  route: "promotional",\n});`,
      python: `msgbridge.sms.send(\n    to="+91XXXXXXXXXX",\n    template_id="weekend_sale",\n    entity_id="$ENTITY_ID",\n    route="promotional",\n)`,
    },
    whenToUse: [
      "Sales, discounts and limited-time offers to an opted-in list",
      "Cold campaigns to non-DND numbers",
      "New product and store-launch announcements",
      "Regional-language campaigns for a local audience",
    ],
    requirements: [
      { item: "Principal entity and six-character header", leadTime: "Entity same-day to 48 hours; header in 1–3 working days" },
      { item: "Registered promotional content template", leadTime: "Clears in 1–3 working days, filed in parallel" },
      { item: "Consent records for your list", leadTime: "Opt-in logs kept where a regulator can actually see them" },
    ],
    goLive: [
      { title: "Register in parallel", detail: "Entity, header and promotional template are filed alongside your setup." },
      { title: "Scrub", detail: "Preference lists are checked before send, so DND-registered numbers drop out automatically." },
      { title: "Schedule", detail: "Campaigns go out only inside TRAI's permitted windows for the route." },
      { title: "Report", detail: "Delivery, DND-scrub and opt-out data come back with reason codes over the API and panel." },
    ],
    related: ["/sms/transactional", "/rcs", "/solutions/marketing"],
    faq: [
      {
        q: "What happens if a number is on the DND registry?",
        a: "Promotional and explicit-consent traffic is filtered against preference lists before send, so DND-registered numbers are excluded. Transactional and service-implicit traffic is exempt.",
      },
      {
        q: "What hours can promotional SMS be sent?",
        a: "Only within the time windows TRAI permits for promotional messages. Sends outside that window are blocked at the platform level.",
      },
      {
        q: "Can I send in Hindi or other regional languages?",
        a: "Yes. Unicode covers Hindi, Marathi, Bengali, Tamil, Telugu and other scripts. But one Unicode character turns the whole message Unicode — 70 characters per segment instead of 160 — and longer messages bill per segment.",
      },
      {
        q: "Do I need consent from recipients?",
        a: "For opt-in offers, yes — keep opt-in logs where a regulator can see them. Cold campaigns are only permitted to non-DND numbers.",
      },
    ],
  },
  {
    slug: "/sms/two-way",
    category: "SMS",
    name: "Two-Way & Inbound SMS",
    draft: true,
    oneLiner:
      "Replies to your SMS on a long code or short code — keyword responses routed into the same shared inbox as WhatsApp and RCS.",
    example: {
      channel: "sms",
      sender: "56070",
      body: "Reply YES to confirm your appointment on Friday at 4 PM, or NO to reschedule.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/sms/inbound/webhook-config \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d number="56070" \\\n  -d webhook_url="https://yourapp.com/sms/inbound"`,
      node: `await msgbridge.sms.configureInbound({\n  number: "56070",\n  webhookUrl: "https://yourapp.com/sms/inbound",\n});`,
      python: `msgbridge.sms.configure_inbound(\n    number="56070",\n    webhook_url="https://yourapp.com/sms/inbound",\n)`,
    },
    whenToUse: [
      "Appointment confirmations with a YES/NO reply",
      "Keyword opt-in and opt-out campaigns",
      "Support conversations that start over SMS",
      "Survey responses collected by reply",
    ],
    requirements: [
      { item: "Short code or long code allocation", leadTime: "Timelines vary by number type and operator" },
      { item: "Inbound routing — shared inbox or webhook", leadTime: "Configured before go-live" },
    ],
    goLive: [
      { title: "Choose a number", detail: "Pick a short code or long code depending on volume and budget." },
      { title: "Route inbound", detail: "Keyword replies land in the same shared inbox as WhatsApp and RCS, or post to a webhook you configure." },
      { title: "Test", detail: "Send a reply and confirm it reaches your inbox or endpoint." },
      { title: "Launch", detail: "Inbound replies flow into your support desk or CRM in near real time." },
    ],
    related: ["/sms/transactional", "/services/integration"],
    faq: [
      {
        q: "Can customers reply to my SMS?",
        a: "On a long code or short code, yes. Keyword replies route into the same shared inbox as WhatsApp and RCS, so a reply does not disappear into a dead number.",
      },
      {
        q: "Short code or long code — which do I need?",
        a: "Short codes suit high-volume, consumer-facing campaigns; long codes suit lower-volume or support-style two-way conversations. We'll help you pick based on your use case.",
      },
      {
        q: "Can I keep my existing number?",
        a: "In most cases you can port an existing number, subject to operator processes.",
      },
      {
        q: "Is this available yet?",
        a: "This page describes the intended shape of the product. Confirm current availability and lead times with our team before committing to a launch date.",
      },
    ],
  },
  {
    slug: "/sms/bulk-campaigns",
    category: "SMS",
    name: "Bulk SMS Panel",
    draft: true,
    oneLiner:
      "Upload a list, pick an approved template, and send — CSV or API, segmented from your CRM, with delivery receipts on every send.",
    example: {
      channel: "sms",
      sender: "MSGBRG",
      body: "Diwali offer: flat 20% off on all orders above Rs.999. Valid till Sunday.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/sms/campaigns \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d name="diwali_offer" \\\n  -d template_id="diwali_offer" \\\n  -d list_id="$LIST_ID"`,
      node: `await msgbridge.sms.createCampaign({\n  name: "diwali_offer",\n  templateId: "diwali_offer",\n  listId: process.env.LIST_ID,\n});`,
      python: `msgbridge.sms.create_campaign(\n    name="diwali_offer",\n    template_id="diwali_offer",\n    list_id="$LIST_ID",\n)`,
    },
    whenToUse: [
      "Seasonal sales and festive offers",
      "One-off announcements to an existing list",
      "Scheduled sends segmented from your CRM",
      "Non-technical marketing staff running their own sends",
    ],
    requirements: [
      { item: "Registered entity, header and template", leadTime: "Entity same-day to 48 hours; header and template in 1–3 working days" },
      { item: "Contact list as CSV, or a CRM segment", leadTime: "Prepared by you before your first campaign" },
    ],
    goLive: [
      { title: "Set up", detail: "Your panel login is created once DLT registration is complete." },
      { title: "Upload or segment", detail: "Import a CSV or pull a segment from your CRM, then pick an approved template." },
      { title: "Schedule", detail: "Choose a send time inside the permitted window for the route." },
      { title: "Review", detail: "Delivery receipts and DND-scrub reports land in the panel, with reason codes on every failure." },
    ],
    related: ["/sms/promotional", "/sms/transactional"],
    faq: [
      {
        q: "Do I need to know how to code to use this?",
        a: "No — the panel is a web interface for uploading a list and sending a campaign without any integration work.",
      },
      {
        q: "CSV or API — what's the difference?",
        a: "Both send over the same registered routes. Upload a CSV in the panel for one-off campaigns, or call the API for automated, CRM-segmented sends.",
      },
      {
        q: "What counts as one message?",
        a: "160 characters of plain English, or 70 if the text contains any Unicode — one Hindi character or one emoji turns the whole message Unicode. Longer messages split into segments and bill per segment.",
      },
      {
        q: "Will my account definitely get a panel?",
        a: "A branded sub-panel is provisioned where available. Confirm current availability for your account with our team before planning around it.",
      },
    ],
  },
];
