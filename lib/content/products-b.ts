import type { ProductPage } from "@/lib/types";

export const productsB: ProductPage[] = [
  {
    slug: "/voice/otp",
    category: "Voice",
    name: "Voice OTP",
    oneLiner:
      "An automated voice call that reads out a one-time verification code, used when SMS delivery can't be trusted or as the final step in a verification cascade.",
    example: {
      channel: "voice",
      sender: "MsgBridge Voice",
      body: "Your verification code is 4 8 2 9. Repeating: 4 8 2 9. Press 1 to hear this again.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/voice/otp \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d code="482913" \\\n  -d language="en-IN"`,
      node: `const msgbridge = require("msgbridge");\n\nawait msgbridge.voice.sendOtp({\n  to: "+91XXXXXXXXXX",\n  code: "482913",\n  language: "en-IN",\n});`,
      python: `import msgbridge\n\nmsgbridge.voice.send_otp(\n    to="+91XXXXXXXXXX",\n    code="482913",\n    language="en-IN",\n)`,
    },
    whenToUse: [
      "A customer's SMS OTP never arrives",
      "Login attempts from a landline or a number that can't receive SMS",
      "As the final leg of a cascading verification flow",
      "High-value transactions that need a second, spoken confirmation",
    ],
    requirements: [
      { item: "Approved caller ID / voice sender configuration", leadTime: "Typically same working day" },
      { item: "Selected voice language and repeat-on-request script", leadTime: "Configured before go-live, no approval queue" },
    ],
    goLive: [
      { title: "Share your script", detail: "Tell us the code format, language and whether the call should repeat automatically." },
      { title: "Test in sandbox", detail: "Trigger a handful of test calls to your own number before switching on live traffic." },
      { title: "Go live", detail: "Point your OTP flow at the Voice OTP endpoint, generally activated within a day of setup." },
    ],
    related: ["/verify", "/sms/otp", "/compliance"],
    faq: [
      {
        q: "How is this different from MsgBridge Verify?",
        a: "Voice OTP is a single channel you can call directly. MsgBridge Verify is the cascade that tries SMS, then WhatsApp, then this voice call automatically, so you don't have to build the fallback logic yourself.",
      },
      {
        q: "Can the call repeat the code?",
        a: "Yes. Callers can press a key to hear the code again, and you can configure the number of repeats before the call ends.",
      },
      {
        q: "Which languages are supported?",
        a: "English and the major Indian regional languages are supported; tell us which ones you need during onboarding.",
      },
      {
        q: "Do you guarantee call connection rates?",
        a: "We don't publish a connection-rate guarantee. Delivery runs through our operator partners at carrier-grade quality, and actual connection depends on network conditions and handset availability.",
      },
    ],
  },
  {
    slug: "/voice/tts",
    category: "Voice",
    name: "Text-to-Speech Calls",
    oneLiner:
      "Turn any text message into an automated phone call, delivered in the language your customer expects, at the volume a campaign needs.",
    example: {
      channel: "voice",
      sender: "MsgBridge Voice",
      body: "Hello, this is a reminder from Apollo Clinic. Your appointment is tomorrow at 4 PM. Press 1 to confirm, or press 2 to reschedule.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/voice/tts \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d text="Your appointment is tomorrow at 4 PM" \\\n  -d language="en-IN"`,
      node: `await msgbridge.voice.sendTts({\n  to: "+91XXXXXXXXXX",\n  text: "Your appointment is tomorrow at 4 PM",\n  language: "en-IN",\n});`,
      python: `msgbridge.voice.send_tts(\n    to="+91XXXXXXXXXX",\n    text="Your appointment is tomorrow at 4 PM",\n    language="en-IN",\n)`,
    },
    whenToUse: [
      "Payment and collection reminders",
      "Appointment reminders for clinics and salons",
      "Order and delivery updates read aloud",
      "Scheduled campaigns to a list, without recording a voice",
    ],
    requirements: [
      { item: "Message text or dynamic script", leadTime: "No approval queue — configured at send time" },
      { item: "DLT registration for the calling flow, where applicable", leadTime: "Runs in parallel with integration" },
    ],
    goLive: [
      { title: "Write the message", detail: "Provide the text and any variables — name, amount, date — the same way you'd write an SMS." },
      { title: "Choose the language", detail: "Pick from supported languages; the same text can be sent to different customers in different languages." },
      { title: "Schedule or send", detail: "Send immediately, or schedule a bulk campaign for a specific time window." },
    ],
    related: ["/voice/press-1", "/voice/broadcast", "/solutions/appointments"],
    faq: [
      {
        q: "Can I send the same campaign in multiple languages?",
        a: "Yes. Segment your list by preferred language and each customer hears the message in their own language, generated from the same source text.",
      },
      {
        q: "How large a campaign can I run?",
        a: "Text-to-speech calls scale to high call volumes; talk to us about your expected volume so we can plan capacity with our operator partners.",
      },
      {
        q: "Can I schedule calls for a specific time?",
        a: "Yes, campaigns can be scheduled in advance and will only dial within the time window you set.",
      },
      {
        q: "Do I get a delivery report?",
        a: "Yes, real-time delivery reports are available over the API, including call status and duration.",
      },
    ],
  },
  {
    slug: "/voice/press-1",
    category: "Voice",
    name: "Press-1 Campaigns",
    oneLiner:
      "An automated call that asks a yes/no question and captures the keypress instantly, so a reminder becomes a confirmation instead of a guess.",
    example: {
      channel: "voice",
      sender: "MsgBridge Voice",
      body: "This is a reminder your payment of ₹2,400 is due. Press 1 to confirm you've paid, or press 2 to speak to an agent.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/voice/press-1 \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d recording_id="payment_reminder" \\\n  -d capture_keys="1,2"`,
      node: `await msgbridge.voice.pressOne({\n  to: "+91XXXXXXXXXX",\n  recordingId: "payment_reminder",\n  captureKeys: ["1", "2"],\n});`,
      python: `msgbridge.voice.press_one(\n    to="+91XXXXXXXXXX",\n    recording_id="payment_reminder",\n    capture_keys=["1", "2"],\n)`,
    },
    whenToUse: [
      "Payment reminders that need a yes/no confirmation",
      "Appointment confirmations",
      "Lead qualification at scale",
      "Feedback and satisfaction surveys after a service call",
    ],
    requirements: [
      { item: "A recorded or text-to-speech script with clear keypress instructions", leadTime: "Submitted before the campaign starts" },
      { item: "Defined capture keys and their meaning", leadTime: "Configured at setup, no approval queue" },
    ],
    goLive: [
      { title: "Share the requirement", detail: "Tell us the question and the keys you want to capture." },
      { title: "Submit the recording", detail: "Provide a voice recording or let us generate one from text." },
      { title: "Test and launch", detail: "Run a small test batch, confirm the responses land correctly in your system, then launch the full campaign." },
    ],
    related: ["/voice/tts", "/solutions/payment-reminders", "/services/integration"],
    faq: [
      {
        q: "Where does the captured response go?",
        a: "Each keypress is posted to your webhook in real time, or you can pull it from the delivery report API.",
      },
      {
        q: "What happens if no key is pressed?",
        a: "The call logs as unanswered or no-input, and you can configure a retry or route it to an agent.",
      },
      {
        q: "Can I transfer the call to a live agent?",
        a: "Yes, a keypress can be configured to transfer the caller directly to an agent line instead of just logging a response.",
      },
      {
        q: "Do you record the calls?",
        a: "Call recording is optional and off by default; enable it only where required and disclosed to the recipient.",
      },
    ],
  },
  {
    slug: "/voice/broadcast",
    category: "Voice",
    name: "Voice Broadcast",
    oneLiner: "Send the same voice message to a large list at once, for announcements that need to reach everyone at the same time.",
    example: {
      channel: "voice",
      sender: "MsgBridge Voice",
      body: "This is an important update from your society management: water supply will be interrupted tomorrow from 10 AM to 2 PM.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/voice/broadcast \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d list_id="residents_tower_a" \\\n  -d recording_id="water_notice" \\\n  -d schedule_at="2026-09-10T09:00:00+05:30"`,
      node: `await msgbridge.voice.broadcast({\n  listId: "residents_tower_a",\n  recordingId: "water_notice",\n  scheduleAt: "2026-09-10T09:00:00+05:30",\n});`,
      python: `msgbridge.voice.broadcast(\n    list_id="residents_tower_a",\n    recording_id="water_notice",\n    schedule_at="2026-09-10T09:00:00+05:30",\n)`,
    },
    whenToUse: [
      "Emergency and service-disruption announcements",
      "Event reminders to a large list",
      "Festival or holiday greetings",
      "Recall or safety notices",
    ],
    requirements: [
      { item: "An uploaded contact list", leadTime: "Ready before the campaign is scheduled" },
      { item: "An approved recording or TTS script", leadTime: "No approval queue for TTS; recordings reviewed within one working day" },
    ],
    goLive: [
      { title: "Upload your list", detail: "Import contacts by CSV or sync from your CRM." },
      { title: "Prepare the message", detail: "Record the message or write the text for us to generate it." },
      { title: "Schedule the broadcast", detail: "Send immediately or schedule for a specific date and time." },
    ],
    related: ["/voice/tts", "/solutions/alerts", "/numbers/toll-free"],
    faq: [
      {
        q: "How many numbers can one broadcast reach?",
        a: "Broadcasts scale to large lists; dialling is paced across our operator partners so the campaign completes reliably rather than instantly.",
      },
      {
        q: "Can I stop a broadcast mid-way?",
        a: "Yes, a running broadcast can be paused or cancelled from the dashboard or API at any point.",
      },
      {
        q: "Do unanswered calls get retried?",
        a: "You can configure a retry window for unanswered numbers, separate from the initial broadcast pass.",
      },
      {
        q: "Is there a DND restriction?",
        a: "Broadcast content that is promotional in nature is scrubbed against the DND registry the same way promotional SMS is; purely informational service messages are not.",
      },
    ],
  },
  {
    slug: "/voice/ivr",
    category: "Voice",
    name: "IVR",
    oneLiner: "A phone menu that routes callers to the right team automatically, without anyone having to answer and transfer manually.",
    example: {
      channel: "voice",
      sender: "MsgBridge IVR",
      body: "Thank you for calling. Press 1 for Sales, Press 2 for Support, Press 3 for Billing, or stay on the line for the next available agent.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/voice/ivr \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d number="1800XXXXXXX" \\\n  -d flow_id="sales_support_billing"`,
      node: `await msgbridge.voice.configureIvr({\n  number: "1800XXXXXXX",\n  flowId: "sales_support_billing",\n});`,
      python: `msgbridge.voice.configure_ivr(\n    number="1800XXXXXXX",\n    flow_id="sales_support_billing",\n)`,
    },
    whenToUse: [
      "Routing inbound calls by department",
      "Screening callers before an agent picks up",
      "Collecting an account or order number before transfer",
      "After-hours menus that route to voicemail or callback",
    ],
    requirements: [
      { item: "A number to attach the IVR to (toll-free, virtual or existing)", leadTime: "Depends on number type — see Toll-Free Number" },
      { item: "A defined menu flow and routing logic", leadTime: "Built together during onboarding, typically a few working days" },
    ],
    goLive: [
      { title: "Map the flow", detail: "Decide the menu options and where each one routes — a team, a number, or voicemail." },
      { title: "Build and test", detail: "We configure the flow and you test it end to end before it goes live." },
      { title: "Launch and adjust", detail: "Once live, menu options and routing can be updated without changing your number." },
    ],
    related: ["/numbers/toll-free", "/voice/press-1", "/solutions/support"],
    faq: [
      {
        q: "Can the IVR change based on time of day?",
        a: "Yes, routing rules can vary by time of day, day of week, or holiday calendar.",
      },
      {
        q: "Can it collect information before transferring?",
        a: "Yes, an IVR step can capture an account number, order ID or PIN and pass it to the agent's screen on transfer.",
      },
      {
        q: "Does this work with my existing number?",
        a: "An existing number can be routed through our IVR where porting or call-forwarding is supported by your current provider.",
      },
      {
        q: "Can I see call analytics?",
        a: "Yes, menu selections, call duration and abandonment are all available in the delivery report API and dashboard.",
      },
    ],
  },
  {
    slug: "/numbers/toll-free",
    category: "Numbers",
    name: "Toll-Free Number",
    oneLiner: "A 1800-series number so customers can call your business without paying for the call, routed to the right team automatically.",
    example: {
      channel: "voice",
      sender: "MsgBridge Voice",
      body: "Welcome to Apollo Clinic. Your call is important to us — please hold while we connect you to the next available agent.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/numbers/toll-free \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d plan="standard" \\\n  -d routing_flow_id="clinic_reception"`,
      node: `await msgbridge.numbers.tollFree.create({\n  plan: "standard",\n  routingFlowId: "clinic_reception",\n});`,
      python: `msgbridge.numbers.toll_free.create(\n    plan="standard",\n    routing_flow_id="clinic_reception",\n)`,
    },
    whenToUse: [
      "A single number for a business with multiple branches",
      "Nationwide customer support and enquiries",
      "Marketing campaigns that need a memorable, free-to-call number",
      "Splitting call routing across sales, support and billing",
    ],
    requirements: [
      { item: "Business KYC documents", leadTime: "Submitted at signup" },
      { item: "Number selection and plan", leadTime: "Typically activated within 2-3 working days once KYC clears" },
      { item: "Routing and IVR configuration", leadTime: "Set up alongside activation" },
    ],
    goLive: [
      { title: "Share requirements", detail: "Tell us your call volume, number of branches, and preferred routing." },
      { title: "Choose number and plan", detail: "Pick from available 1800 numbers and a plan that matches expected volume." },
      { title: "Submit KYC", detail: "Complete the business KYC required to activate a toll-free number." },
      { title: "Configure and activate", detail: "Routing and IVR go live once KYC and number selection are confirmed." },
    ],
    related: ["/voice/ivr", "/numbers/missed-call", "/compliance"],
    faq: [
      {
        q: "How long does activation take?",
        a: "Activation is typically 2-3 working days once KYC documents clear; exact timelines depend on document review.",
      },
      {
        q: "Can one toll-free number route to multiple offices?",
        a: "Yes, routing can split by location, time of day, or department, all under one number.",
      },
      {
        q: "Can I get call reports by branch?",
        a: "Yes, call reports can be filtered and exported by routing destination.",
      },
      {
        q: "Is the toll-free number really free for the caller?",
        a: "Yes, the person calling in doesn't pay for the call — the cost is billed to your account instead.",
      },
    ],
  },
  {
    slug: "/numbers/missed-call",
    category: "Numbers",
    name: "Missed Call Number",
    oneLiner: "A number customers can call and hang up on, triggering an automatic action on your side — no call charges for anyone.",
    example: {
      channel: "sms",
      sender: "MsgBridge",
      body: "Thanks for your missed call! We've noted your interest and a team member will call you back within the hour.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/numbers/missed-call \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d number="080XXXXXXXX" \\\n  -d webhook_url="https://yourapp.com/webhooks/missed-call"`,
      node: `await msgbridge.numbers.missedCall.configure({\n  number: "080XXXXXXXX",\n  webhookUrl: "https://yourapp.com/webhooks/missed-call",\n});`,
      python: `msgbridge.numbers.missed_call.configure(\n    number="080XXXXXXXX",\n    webhook_url="https://yourapp.com/webhooks/missed-call",\n)`,
    },
    whenToUse: [
      "Lead capture from print, TV or outdoor ads",
      "Opt-in confirmation for a subscription or alert service",
      "Voting, polling or feedback at scale",
      "A callback-request button on a website or app",
    ],
    requirements: [
      { item: "A dedicated missed-call number", leadTime: "Typically provisioned within 1-2 working days" },
      { item: "A webhook or auto-reply configured for the trigger", leadTime: "Set up during integration" },
    ],
    goLive: [
      { title: "Get your number", detail: "We provision a dedicated missed-call number for your campaign." },
      { title: "Connect the trigger", detail: "Point the webhook at your CRM or configure an automatic SMS reply." },
      { title: "Publish and track", detail: "Put the number on your ad or website and track calls in real time." },
    ],
    related: ["/numbers/toll-free", "/solutions/lead-generation", "/sms/transactional"],
    faq: [
      {
        q: "Does the caller pay anything?",
        a: "No — the call disconnects automatically before it's answered, so neither side is charged for a conversation.",
      },
      {
        q: "How fast does the webhook fire?",
        a: "The webhook fires in real time as the missed call is registered, so you can trigger a callback or auto-reply immediately.",
      },
      {
        q: "Can I run multiple campaigns on one number?",
        a: "Each number is generally tied to one campaign or webhook so responses stay easy to attribute; multiple campaigns can each get their own number.",
      },
      {
        q: "Can this replace a toll-free number?",
        a: "No — a missed-call number is one-way, triggering an action but never connecting a call; a toll-free number is for two-way conversations.",
      },
    ],
  },
  {
    slug: "/numbers/masking",
    category: "Numbers",
    name: "Number Masking",
    oneLiner: "Connect two people by phone through a temporary virtual number, so neither one sees the other's real number.",
    example: {
      channel: "sms",
      sender: "MsgBridge",
      body: "Your driver Ramesh will call you from a masked number shortly to confirm your pickup location.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/numbers/masking/bridge \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d party_a="+91XXXXXXXXXX" \\\n  -d party_b="+91YYYYYYYYYY" \\\n  -d ttl_minutes="60"`,
      node: `await msgbridge.numbers.masking.bridge({\n  partyA: "+91XXXXXXXXXX",\n  partyB: "+91YYYYYYYYYY",\n  ttlMinutes: 60,\n});`,
      python: `msgbridge.numbers.masking.bridge(\n    party_a="+91XXXXXXXXXX",\n    party_b="+91YYYYYYYYYY",\n    ttl_minutes=60,\n)`,
    },
    whenToUse: [
      "Connecting a delivery agent and a customer without sharing numbers",
      "Click-to-call from a website or app listing",
      "Cab and ride bookings",
      "Any two-sided marketplace that needs call privacy",
    ],
    requirements: [
      { item: "A pool of virtual numbers for bridging", leadTime: "Provisioned during onboarding" },
      { item: "Time-based number mapping rules", leadTime: "Configured once during integration" },
    ],
    goLive: [
      { title: "Define the mapping", detail: "Tell us how long a bridge should stay active — per order, per ride, or per session." },
      { title: "Integrate the API", detail: "Call the bridging endpoint whenever two parties need to be connected." },
      { title: "Go live", detail: "Numbers unmask automatically once the time-to-live expires, no manual cleanup needed." },
    ],
    related: ["/numbers/toll-free", "/industries/logistics", "/services/integration"],
    faq: [
      {
        q: "Do both parties see a real number?",
        a: "No, both parties see a temporary virtual number; the real numbers are never exposed to each other.",
      },
      {
        q: "What happens after the call ends?",
        a: "The virtual number mapping stays active until its configured time-to-live expires, then it's released back into the pool.",
      },
      {
        q: "Can I track call history for disputes?",
        a: "Yes, call logs and duration are available over the API for support and dispute resolution.",
      },
      {
        q: "Is this only for calls, or does it cover click-to-call from a webpage too?",
        a: "Both — the same bridging works whether the call is initiated by dialling a number or by a click-to-call button on a website or app.",
      },
    ],
  },
  {
    slug: "/numbers/codes",
    category: "Numbers",
    name: "Short & Long Code",
    draft: true,
    oneLiner: "Dedicated short codes and long codes for two-way SMS at scale, for businesses that need their own number rather than a shared one.",
    example: {
      channel: "sms",
      sender: "56070",
      body: "Reply YES to 56070 to confirm your subscription, or STOP to opt out.",
    },
    api: {
      curl: `curl https://api.msgbridge.in/v1/numbers/codes \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d type="short_code" \\\n  -d use_case="two_way_subscription"`,
      node: `await msgbridge.numbers.codes.request({\n  type: "short_code",\n  useCase: "two_way_subscription",\n});`,
      python: `msgbridge.numbers.codes.request(\n    type="short_code",\n    use_case="two_way_subscription",\n)`,
    },
    whenToUse: [
      "Two-way SMS subscriptions and confirmations",
      "Voting, contests and audience engagement",
      "High-volume alerting where a dedicated identity matters",
      "Keyword-based opt-in campaigns",
    ],
    requirements: [
      { item: "Use-case approval from the relevant registry", leadTime: "Subject to regulator and operator queues — timelines vary" },
      { item: "DLT entity and template registration", leadTime: "Runs in parallel with code provisioning" },
    ],
    goLive: [
      { title: "Share your use case", detail: "Short codes are allocated by use case, so we need the keyword and flow up front." },
      { title: "Submit for approval", detail: "The application goes through the relevant registry and operator review." },
      { title: "Configure and launch", detail: "Once approved, we wire the code into your two-way SMS flow." },
    ],
    related: ["/sms/two-way", "/compliance", "/services/dlt-registration"],
    faq: [
      {
        q: "How long does short-code approval take?",
        a: "This sits in a regulator and operator queue outside our control, so timelines vary; we'll give you the current estimate when you apply.",
      },
      {
        q: "What's the difference between a short code and a long code?",
        a: "A short code is a memorable 5-6 digit number typically used for high-volume, keyword-based campaigns; a long code looks like a regular mobile number and suits lower-volume two-way conversations.",
      },
      {
        q: "Is this page final?",
        a: "This page is still being confirmed with our platform partner — reach out for the latest availability and terms.",
      },
      {
        q: "Can I keep my code if I switch plans?",
        a: "Short and long codes are generally tied to the term of the agreement they were provisioned under; ask your account contact about portability.",
      },
    ],
  },
];
