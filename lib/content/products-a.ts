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
    price: { headline: "From ₹0.35 per conversation", note: "Priced per conversation, by template category — see the WhatsApp rate card." },
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
    price: { headline: "From ₹4,999 one-off build fee", note: "Plus your WhatsApp Business API conversation charges." },
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
    price: { headline: "From ₹0.28 per message", note: "Priced per message, by type — see the RCS rate card." },
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
      "One-time passwords delivered over DLT-registered routes for login, signup, password reset and payment confirmation.",
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
      "Password and PIN reset",
      "Payment confirmation before a transaction completes",
      "Two-factor authentication for account changes",
    ],
    requirements: [
      { item: "Registered principal entity", leadTime: "Subject to operator DLT approval timelines" },
      { item: "Approved 6-character header", leadTime: "Subject to operator DLT approval timelines" },
      { item: "Approved content template with variables", leadTime: "Subject to operator DLT approval timelines" },
      { item: "TM chain binding", leadTime: "Completed once entity, header and template are approved" },
    ],
    goLive: [
      { title: "Register", detail: "Principal entity and sender header submitted to the DLT platform." },
      { title: "Approve", detail: "Content template drafted and approved, then bound to your entity." },
      { title: "Integrate", detail: "API access is typically ready within one working day once formalities and testing are complete." },
      { title: "Go live", detail: "Start sending OTPs with delivery reports over the API." },
    ],
    price: { headline: "From ₹0.14 per SMS", note: "See the SMS rate card for volume pricing." },
    related: ["/verify", "/voice/otp", "/compliance", "/solutions/otp-verification"],
    faq: [
      {
        q: "How fast does an OTP arrive?",
        a: "Delivery over transactional routes is typically fast, though exact timing depends on the recipient's operator and network conditions at the time.",
      },
      {
        q: "What if SMS delivery fails?",
        a: "For higher-stakes verification, MsgBridge Verify automatically falls back to WhatsApp and then a voice call until the code lands.",
      },
      {
        q: "Do I need my own DLT registration?",
        a: "Your business needs a registered entity, header and template. We can complete this for you — see DLT Registration Assistance.",
      },
      {
        q: "Can I customise the OTP message text?",
        a: "Yes, within DLT's template and variable rules. We help draft the template so it passes approval on the first attempt.",
      },
    ],
  },
  {
    slug: "/sms/transactional",
    category: "SMS",
    name: "Transactional SMS",
    oneLiner:
      "Service messages triggered by a customer action — order updates, payment confirmations, appointment reminders and account alerts.",
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
      "Order confirmations and shipping updates",
      "Payment and refund confirmations",
      "Appointment and booking reminders",
      "Account alerts such as low balance or expiry notices",
    ],
    requirements: [
      { item: "Registered principal entity", leadTime: "Subject to operator DLT approval timelines" },
      { item: "Approved header and content template", leadTime: "Subject to operator DLT approval timelines" },
      { item: "TM chain binding", leadTime: "Completed once entity, header and template are approved" },
    ],
    goLive: [
      { title: "Register", detail: "Entity, header and template submitted for DLT approval." },
      { title: "Approve", detail: "Template approved and bound to your entity via TM chain." },
      { title: "Integrate", detail: "Connect the send API with your order, payment or booking system." },
      { title: "Go live", detail: "Real-time delivery reports are retrievable over the API from day one." },
    ],
    price: { headline: "From ₹0.12 per SMS", note: "See the SMS rate card for volume pricing." },
    related: ["/sms/otp", "/sms/promotional", "/solutions/order-updates"],
    faq: [
      {
        q: "What's the difference between transactional and promotional SMS?",
        a: "Transactional messages are triggered by a customer's own action and can be sent any time. Promotional messages are marketing sends restricted to specific hours and require DND scrubbing.",
      },
      {
        q: "Can I track delivery in real time?",
        a: "Yes. Operator-end delivery reports are available over the API as soon as a message is delivered or fails.",
      },
      {
        q: "How are template variables declared?",
        a: "Each approved template declares its variable positions up front — for example the amount or order number — which you then fill in per request.",
      },
      {
        q: "Is Unicode text supported?",
        a: "Yes, including Hindi and other regional scripts. Unicode messages count as more segments than plain-English text, which affects the price per send.",
      },
    ],
  },
  {
    slug: "/sms/promotional",
    category: "SMS",
    name: "Promotional SMS",
    oneLiner:
      "Marketing sends on promotional routes, scrubbed against the National Do Not Disturb registry and delivered within TRAI's permitted time windows.",
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
      "Sales, discounts and limited-time offers",
      "New product or store launch announcements",
      "Re-engagement campaigns to a customer list",
      "Regional-language campaigns for a local audience",
    ],
    requirements: [
      { item: "Registered principal entity and header", leadTime: "Subject to operator DLT approval timelines" },
      { item: "Approved promotional template", leadTime: "Subject to operator DLT approval timelines" },
      { item: "Consent records for the recipient list", leadTime: "Maintained by you, verified during setup" },
    ],
    goLive: [
      { title: "Register", detail: "Entity, header and promotional template submitted for approval." },
      { title: "Scrub", detail: "Recipient list checked against the National DND registry." },
      { title: "Schedule", detail: "Campaigns are sent only within TRAI's permitted time windows." },
      { title: "Report", detail: "Delivery and opt-out data available over the API and dashboard." },
    ],
    price: { headline: "From ₹0.10 per SMS", note: "See the SMS rate card for volume pricing." },
    related: ["/sms/transactional", "/rcs", "/solutions/marketing"],
    faq: [
      {
        q: "What happens if a number is on the DND registry?",
        a: "Promotional messages are automatically scrubbed against the National DND registry before sending, so registered numbers are excluded from promotional routes.",
      },
      {
        q: "What hours can promotional SMS be sent?",
        a: "Only within the time windows TRAI permits for promotional messages. Sends outside that window are blocked at the platform level.",
      },
      {
        q: "Can I send in Hindi or other regional languages?",
        a: "Yes, Unicode is supported for Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada and other regional scripts. Note that Unicode messages use more segments than plain English text of the same length, which changes the price.",
      },
      {
        q: "Do I need consent from recipients?",
        a: "Yes. You should maintain consent records for your promotional list — see the compliance guide for how opt-in and DND scrubbing fit together.",
      },
    ],
  },
  {
    slug: "/sms/two-way",
    category: "SMS",
    name: "Two-Way & Inbound SMS",
    draft: true,
    oneLiner:
      "Receive replies to your SMS sends on a short code or long code, and route them into your support desk or CRM.",
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
      "Support requests started over SMS",
      "Keyword-based opt-in campaigns",
      "Survey responses collected by reply",
    ],
    requirements: [
      { item: "Short code or long code allocation", leadTime: "Timelines vary by number type and operator" },
      { item: "Inbound webhook endpoint", leadTime: "Set up on your side before go-live" },
    ],
    goLive: [
      { title: "Choose a number", detail: "Pick a short code or long code depending on volume and budget." },
      { title: "Configure", detail: "Point your inbound webhook at the number." },
      { title: "Test", detail: "Send a reply and confirm it reaches your endpoint." },
      { title: "Launch", detail: "Route inbound replies into your support desk or CRM." },
    ],
    price: { headline: "From ₹4,999/month", note: "Number rental plus per-message inbound and outbound rates." },
    related: ["/sms/transactional", "/services/integration"],
    faq: [
      {
        q: "Short code or long code — which do I need?",
        a: "Short codes suit high-volume, consumer-facing campaigns; long codes suit lower-volume or support-style two-way conversations. We'll help you pick based on your use case.",
      },
      {
        q: "How do inbound replies reach my system?",
        a: "Replies are posted to a webhook URL you configure, in near real time.",
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
      "A branded web panel for uploading a contact list and sending a bulk SMS campaign without writing any code.",
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
      "Teams without an in-house developer",
      "Non-technical marketing staff running their own sends",
    ],
    requirements: [
      { item: "Registered entity, header and template", leadTime: "Subject to operator DLT approval timelines" },
      { item: "Contact list in the required format", leadTime: "Prepared by you before your first campaign" },
    ],
    goLive: [
      { title: "Set up", detail: "Your panel login is created once DLT registration is complete." },
      { title: "Upload", detail: "Import your contact list and select an approved template." },
      { title: "Schedule", detail: "Choose a send time within the permitted window for the route." },
      { title: "Review", detail: "Delivery and DND-scrub reports are available in the panel after sending." },
    ],
    price: { headline: "From ₹999/month", note: "Panel access plus per-message rates. Availability depends on a branded sub-panel being provisioned for your account." },
    related: ["/sms/promotional", "/sms/transactional"],
    faq: [
      {
        q: "Do I need to know how to code to use this?",
        a: "No — the panel is a web interface for uploading a list and sending a campaign without any integration work.",
      },
      {
        q: "Is this the same as the SMS API?",
        a: "It sends over the same registered routes as the API; the panel is a no-code way to run one-off campaigns rather than an automated integration.",
      },
      {
        q: "Will my account definitely get a panel?",
        a: "A branded sub-panel is provisioned where available. Confirm current availability for your account with our team before planning around it.",
      },
      {
        q: "Can I still use the API alongside the panel?",
        a: "Yes, both draw from the same registered entity, header and templates.",
      },
    ],
  },
];
