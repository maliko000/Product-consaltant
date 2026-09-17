import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import type {
  Ticket,
  ClientInquiryLead,
  ConsultingFirmConfig,
  TicketCategory,
  TicketPriority,
  PoultryProduct,
  FarmQuoteOrder
} from "./src/types.ts";
import { INITIAL_PRODUCTS } from "./src/data/products.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Poultry Equipment & Bio-Sanitation Configuration
let firmConfig: ConsultingFirmConfig = {
  firmName: "CluckCare & BioSanitation Systems",
  tagline: "Premium Chicken Accessories & High-Grade Farm Cleaning Instruments",
  leadConsultant: "Dr. Ethan Wright, DVM (Poultry Equipment & Biosecurity Director)",
  contactEmail: "specialist@cluckcaresanitation.com",
  services: [
    {
      id: "equipment-sizing",
      name: "Flock Sizing & Automated Coop Equipment Setup",
      description: "Custom recommendations for gravity feeders, freeze-proof heated nipple drinkers, rollaway nest boxes, and brooder heat plates calibrated to flock size.",
      typicalDuration: "Same-day consultation",
      focusArea: "Chicken Accessories"
    },
    {
      id: "biosecurity-sanitation",
      name: "Coop Biosecurity & Sanitization Protocols",
      description: "Complete disinfection schedules using high-pressure foamers, boot dip stations, and enzymatic cleaners to eradicate mites, lice, and ammonia fumes.",
      typicalDuration: "1 - 2 business days",
      focusArea: "Cleaning Instruments"
    },
    {
      id: "commercial-watering",
      name: "Commercial Poultry Pipeline & Automated Watering Systems",
      description: "Low-pressure automated PVC drinker pipelines, regulator tanks, and inline medicator dosing systems for 100 to 5,000+ birds.",
      typicalDuration: "1 - 3 weeks",
      focusArea: "Commercial Farm Engineering"
    },
    {
      id: "bulk-wholesale",
      name: "Bulk Wholesale & Farm Dealer Supply",
      description: "Pallet orders, wholesale distributor pricing, co-op volume discounts on scrapers, feeders, waterers, and sanitizers.",
      typicalDuration: "Immediate Quote",
      focusArea: "Wholesale & Supply Chain"
    },
    {
      id: "warranty-parts",
      name: "Technical Support, Replacement Parts & Warranty",
      description: "Replacement heating elements, float valves, scraper replacement blades, and motor components.",
      typicalDuration: "Within 24 hours",
      focusArea: "Technical Support"
    }
  ],
  qualifyingQuestions: [
    {
      field: "flockSize",
      question: "How many chickens or poultry birds are currently in your flock?",
      options: [
        "1 - 15 Backyard Hens",
        "16 - 50 Homestead Flock",
        "51 - 250 Free-Range Farm",
        "250+ Commercial Production"
      ]
    },
    {
      field: "coopType",
      question: "What type of coop structure and bedding do you currently maintain?",
      options: [
        "Walk-in Coop with Pine Shavings",
        "Mobile Chicken Tractor with Pasture Run",
        "Sand Bedding Coop",
        "Commercial Layer / Broiler Barn"
      ]
    },
    {
      field: "cleaningRoutine",
      question: "What is your biggest coop cleaning and sanitization challenge right now?",
      options: [
        "Hardened manure caked onto roosts & drop-boards",
        "Ammonia fumes & moisture buildup in bedding",
        "Mite, lice or coccidiosis parasite prevention",
        "Winter freezing waterers & dirty open drinkers"
      ]
    },
    {
      field: "consultingBudget",
      question: "Are you looking for individual retail gear or wholesale/commercial farm bulk supply?",
      options: [
        "Individual Retail Accessories (<$200)",
        "Complete Homestead Care Kit ($200 - $600)",
        "Commercial / Wholesale Farm Order ($1,000+)"
      ]
    }
  ],
  autoTicketingTriggers: [
    "commercial farm installation",
    "bulk wholesale order",
    "biosecurity outbreak",
    "avian flu",
    "coccidiosis sanitization",
    "warranty replacement",
    "custom plumbing pipeline",
    "quote over $500",
    "talk to poultry specialist",
    "order 50+ units"
  ]
};

// In-Memory Products Store
let products: PoultryProduct[] = [...INITIAL_PRODUCTS];

// In-Memory Orders / Quotes Store
let farmOrders: FarmQuoteOrder[] = [
  {
    id: "ORD-501",
    clientName: "Samuel Miller",
    clientEmail: "s.miller@greenpasturespoultry.com",
    farmOrCoopName: "Green Pastures Pastured Poultry",
    items: [
      {
        productId: "prod-feeder-25",
        productName: "AutoFeeder-Pro 25lb Gravity Feeder",
        quantity: 4,
        unitPrice: 48.99
      },
      {
        productId: "prod-waterer-heated",
        productName: "FrostGuard 5-Gal Heated Nipple Drinker",
        quantity: 4,
        unitPrice: 59.99
      },
      {
        productId: "prod-scraper-hd",
        productName: "Heavy-Duty Stainless Coop Manure Scraper",
        quantity: 2,
        unitPrice: 34.99
      },
      {
        productId: "prod-boot-bath",
        productName: "BioGuard Biosecurity Boot Dip Wash Station",
        quantity: 2,
        unitPrice: 38.00
      }
    ],
    totalAmount: 581.90,
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    notes: "Client has 80 heritage laying hens on rotational pasture. Requested expedited freight."
  }
];

// In-Memory Tickets Store
let tickets: Ticket[] = [
  {
    id: "TICK-2041",
    title: "Commercial Automated Watering Pipeline Setup (450 Pastured Layers)",
    description: "Client expanding from mobile chicken tractors to 450-bird hoop house coop. Needs automated low-pressure PVC watering system with freeze-guard circulation loop and inline vitamin/apple cider vinegar dosing.",
    clientName: "Evelyn Reed",
    clientEmail: "evelyn@cedarcrestfarm.org",
    companyName: "Cedar Crest Organic Farm",
    category: "Commercial Poultry Installation",
    priority: "urgent",
    status: "in_progress",
    aiAssessment: {
      complexityReason: "Requires plumbing pressure regulator calculations, anti-freeze thermal trace cable spec, and custom tank float sizing.",
      suggestedExpertise: "Commercial Poultry Installation Specialist",
      estimatedHours: "12 - 18 hrs",
      keyQuestions: [
        "What is the incoming municipal or well water PSI?",
        "Is there 120V electricity run to the coop site for winter heat cables?",
        "Do you require nipple drinkers or bell drinkers?"
      ]
    },
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    assignedConsultant: "Dr. Ethan Wright, DVM",
    transcriptSummary: "Client requested engineering design for 450-bird automated watering pipeline.",
    consultantNotes: [
      {
        id: "note-1",
        author: "Dr. Ethan Wright",
        text: "Sent preliminary schematic with 3/4-inch PVC pipeline and 32 freeze-proof horizontal nipples. Awaiting client confirmation of well water PSI.",
        timestamp: new Date(Date.now() - 3600000 * 20).toISOString()
      }
    ],
    conversationLog: [
      {
        id: "msg-1",
        sender: "client",
        text: "We have 450 laying hens and carrying water buckets in sub-zero winter is unsustainable. We need an engineered freeze-proof watering pipeline.",
        timestamp: new Date(Date.now() - 3600000 * 40).toISOString()
      }
    ]
  },
  {
    id: "TICK-2048",
    title: "Emergency Biosecurity Sanitization Protocol: Persistent Red Mites & High Ammonia",
    description: "Barn with 120 heritage hens experiencing severe drop in egg production and feather loss due to northern fowl mites hiding in wooden roost crevices. Client needs immediate eradication protocol using bio-safe cleaning instruments.",
    clientName: "Garrett Vance",
    clientEmail: "gvance@willowhollow.com",
    companyName: "Willow Hollow Homestead",
    category: "Biosecurity & Sanitization",
    priority: "high",
    status: "open",
    aiAssessment: {
      complexityReason: "Deep parasite infestation requiring dual chemical and physical sanitation: ULV mist fogging, roost scraping, and organic diatomaceous earth dusting.",
      suggestedExpertise: "Avian Biosecurity & Disease Consultant",
      estimatedHours: "8 - 12 hrs",
      keyQuestions: [
        "Can birds be temporarily relocated for 24 hours during deep fogging?",
        "Are roosting perches removable for torching or soaking in EcoCluck?",
        "Have wild birds (sparrows, pigeons) been roosting near the ventilation gaps?"
      ]
    },
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    assignedConsultant: "Unassigned (Queued for Specialist Review)",
    transcriptSummary: "Urgent consultation for red mite eradication and heavy-duty coop scraping protocol.",
    consultantNotes: []
  },
  {
    id: "TICK-2055",
    title: "Wholesale Distributor Order: 50x AutoFeeder-Pro & 50x Stainless Scrapers",
    description: "Regional agricultural feed & supply co-op inquiring on wholesale dealership pricing, freight pallet quotes, and display packaging for retail stores.",
    clientName: "Brenda Higgins",
    clientEmail: "b.higgins@tri-state-farmcoop.com",
    companyName: "Tri-State Farm & Feed Supply Co-Op",
    category: "Bulk Wholesale Order",
    priority: "medium",
    status: "under_review",
    aiAssessment: {
      complexityReason: "High-volume commercial quote involving freight discounts, tier-3 margin schedule, and branded display racks.",
      suggestedExpertise: "Poultry Wholesale & Logistics Director",
      estimatedHours: "4 - 6 hrs",
      keyQuestions: [
        "Do you have a loading dock or require liftgate delivery?",
        "Are you requesting custom retail barcodes or standard UPCs?"
      ]
    },
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    assignedConsultant: "Sales Operations Lead",
    consultantNotes: []
  }
];

// In-Memory Client Inquiries Store (Queries sent to owner)
let inquiryLeads: ClientInquiryLead[] = [
  {
    id: "inq-201",
    clientName: "Laura Martinez",
    clientEmail: "laura@oakridgefarms.com",
    companyName: "Oak Ridge Pastures",
    productDescription: "35 pasture-raised laying hens producing organic pastured eggs.",
    flockSize: "35 Hens",
    coopType: "Movable Chicken Tractor",
    cleaningRoutine: "Weekly scraping with manual spade, lots of caked droppings on perches.",
    primaryChallenge: "Tired of frozen water in winter and feed being scattered and wasted by rats.",
    consultingBudget: "Homestead Upgrade ($300 - $500)",
    timeline: "Ready to order this week",
    status: "contacted",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    lastBotQuerySent: "What is your current power source near the coop for heated waterers?",
    notes: "Recommended FrostGuard 5-Gal waterer and 2x AutoFeeder-Pro 25lb. Sent quote via email."
  },
  {
    id: "inq-202",
    clientName: "Carl Thompson",
    clientEmail: "carl.t@backyardflock.net",
    companyName: "Thompson Backyard Homestead",
    productDescription: "12 backyard Orpington and Plymouth Rock hens in suburban garden coop.",
    flockSize: "12 Hens",
    coopType: "Walk-in Wooden Shed with Hemp Bedding",
    cleaningRoutine: "Deep litter method, clean roosts once a month.",
    primaryChallenge: "Need an ergonomic scraper that won't ruin the wood roosts, and an easy sifting rake for hemp bedding.",
    consultingBudget: "Under $150",
    timeline: "Immediate",
    status: "new",
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    lastBotQuerySent: "Do your roosting bars have rounded edges or flat 2x4s?",
    notes: "Direct website inquiry from AI consultation widget."
  }
];

// Helper to generate ticket ID
function generateTicketId(): string {
  const num = Math.floor(2000 + Math.random() * 8000);
  return `TICK-${num}`;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Config
app.get("/api/config", (req, res) => {
  res.json(firmConfig);
});

app.post("/api/config", (req, res) => {
  firmConfig = { ...firmConfig, ...req.body };
  res.json({ success: true, config: firmConfig });
});

// Products API
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const newProd: PoultryProduct = {
    id: `prod-${Date.now()}`,
    name: req.body.name || "Poultry Equipment Item",
    category: req.body.category || "chicken_accessories",
    price: Number(req.body.price) || 29.99,
    stock: Number(req.body.stock) || 10,
    rating: 5.0,
    badge: req.body.badge || "New Item",
    description: req.body.description || "High-quality poultry farming gear.",
    specifications: Array.isArray(req.body.specifications) ? req.body.specifications : ["Durable farm construction"],
    recommendedFlockSize: req.body.recommendedFlockSize || "All flock sizes",
    inStock: true,
    iconType: req.body.iconType || "feeder"
  };
  products.unshift(newProd);
  res.status(201).json(newProd);
});

app.patch("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// Orders & Quotes API
app.get("/api/orders", (req, res) => {
  res.json(farmOrders);
});

app.post("/api/orders", (req, res) => {
  const body = req.body;
  const newOrder: FarmQuoteOrder = {
    id: `ORD-${Math.floor(500 + Math.random() * 500)}`,
    clientName: body.clientName || "Farm Customer",
    clientEmail: body.clientEmail || "orders@poultryclient.com",
    farmOrCoopName: body.farmOrCoopName || "Customer Farm",
    items: body.items || [],
    totalAmount: Number(body.totalAmount) || 0,
    status: body.status || "pending_quote",
    createdAt: new Date().toISOString(),
    notes: body.notes || "Order/quote created via online portal."
  };
  farmOrders.unshift(newOrder);
  res.status(201).json(newOrder);
});

// Tickets Endpoints
app.get("/api/tickets", (req, res) => {
  res.json(tickets);
});

app.post("/api/tickets", (req, res) => {
  const body = req.body;
  const newTicket: Ticket = {
    id: body.id || generateTicketId(),
    title: body.title || "Poultry Equipment Consultation Ticket",
    description: body.description || "Client requested personalized equipment or sanitation assistance.",
    clientName: body.clientName || "Farm Owner",
    clientEmail: body.clientEmail || "client@poultryfarm.com",
    companyName: body.companyName || "Homestead / Poultry Farm",
    category: body.category || "General Consultation",
    priority: body.priority || "medium",
    status: "open",
    aiAssessment: body.aiAssessment || {
      complexityReason: "Requires technical specialist sizing or custom biosecurity review.",
      suggestedExpertise: "Poultry Specialist",
      estimatedHours: "4 - 8 hrs",
      keyQuestions: ["What is the total bird count?", "What is the coop power and water layout?"]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assignedConsultant: body.assignedConsultant || "Dr. Ethan Wright, DVM",
    transcriptSummary: body.transcriptSummary || "",
    consultantNotes: [],
    conversationLog: body.conversationLog || []
  };

  tickets.unshift(newTicket);
  res.status(201).json(newTicket);
});

app.patch("/api/tickets/:id", (req, res) => {
  const { id } = req.params;
  const index = tickets.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  tickets[index] = {
    ...tickets[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json(tickets[index]);
});

app.post("/api/tickets/:id/notes", (req, res) => {
  const { id } = req.params;
  const ticket = tickets.find(t => t.id === id);
  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  const { author, text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Note text is required" });
  }

  const note = {
    id: `note-${Date.now()}`,
    author: author || "Poultry Specialist",
    text,
    timestamp: new Date().toISOString()
  };

  if (!ticket.consultantNotes) {
    ticket.consultantNotes = [];
  }
  ticket.consultantNotes.push(note);
  ticket.updatedAt = new Date().toISOString();

  res.status(201).json(note);
});

// Inquiries / Leads (Queries sent to owner)
app.get("/api/inquiries", (req, res) => {
  res.json(inquiryLeads);
});

app.post("/api/inquiries", (req, res) => {
  const lead: ClientInquiryLead = {
    id: `inq-${Date.now()}`,
    clientName: req.body.clientName || "Prospective Poultry Keeper",
    clientEmail: req.body.clientEmail || "",
    companyName: req.body.companyName || "Homestead / Farm",
    productDescription: req.body.productDescription || "Poultry equipment inquiry",
    flockSize: req.body.flockSize,
    coopType: req.body.coopType,
    cleaningRoutine: req.body.cleaningRoutine,
    primaryChallenge: req.body.primaryChallenge || req.body.inquiryText || "Flock equipment recommendation",
    consultingBudget: req.body.consultingBudget,
    timeline: req.body.timeline,
    status: "new",
    timestamp: new Date().toISOString(),
    lastBotQuerySent: req.body.lastBotQuerySent,
    notes: req.body.notes || "Captured from live AI consultation conversation."
  };

  inquiryLeads.unshift(lead);
  res.status(201).json(lead);
});

app.patch("/api/inquiries/:id", (req, res) => {
  const { id } = req.params;
  const index = inquiryLeads.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Inquiry not found" });
  }

  inquiryLeads[index] = {
    ...inquiryLeads[index],
    ...req.body
  };

  res.json(inquiryLeads[index]);
});

// -------------------------------------------------------------
// Real-Time AI Chatbot for Chicken Accessories & Cleaning Instruments
// -------------------------------------------------------------
app.post("/api/chat", async (req, res) => {
  try {
    const {
      message,
      history = [],
      clientContext = {},
      forceEscalate = false
    } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const productsList = products
      .map(p => `• [${p.category.toUpperCase()}] ${p.name} ($${p.price.toFixed(2)}) - ${p.description}. Recommended: ${p.recommendedFlockSize}. Specs: ${p.specifications.slice(0, 2).join(", ")}. In Stock: ${p.stock} units.`)
      .join("\n");

    const qualifyingContext = firmConfig.qualifyingQuestions
      .map(q => `• Ask about ${q.field}: "${q.question}" [Options: ${q.options?.join(", ")}]`)
      .join("\n");

    const systemPrompt = `
You are the Senior AI Poultry Equipment & Bio-Sanitation Consultant for "${firmConfig.firmName}".
Our Lead Specialist is ${firmConfig.leadConsultant}.

OUR REAL PRODUCT INVENTORY (CHICKEN ACCESSORIES & CLEANING INSTRUMENTS):
${productsList}

OUR CORE ADVISORY SERVICES:
1. Chicken Accessories: Gravity Feeders (rainproof/ratproof), Heated Nipple Drinkers (anti-freeze to -15°F), Rollaway Nesting Boxes, Brooder Heat Plates, Automatic Solar Coop Doors, Roost Perches, Protective Hen Saddles, Oyster Shell Dispensers.
2. Cleaning Instruments & Biosecurity: 45° Ergonomic Stainless Steel Roost Manure Scrapers, High-Pressure Foam Sanitizer Wands, Biosecurity Boot Dip Footbaths, Tempered Steel Wire Dropping Brushes, Bedding Sifter Rakes, Ultra-Low Volume Cold Mist Foggers, EcoCluck Enzymatic Bio-Safe Cleaner.

YOUR MISSION:
1. ANSWER INQUIRIES IN REAL-TIME:
Provide expert, authoritative, practical poultry farming and coop sanitation guidance. Explain exactly which accessory or cleaning instrument fits their specific flock size, coop structure, and weather conditions.
Give clear, actionable steps, maintenance tips, and direct product recommendations from our inventory.

2. SEND PROACTIVE DISCOVERY QUERIES TO CLIENTS ("You send me queries too about my product etc"):
Actively ask the client about their flock, coop, and sanitization setup so you can tailor the perfect gear package!
If the client hasn't mentioned it yet, select ONE relevant qualifying query to ask:
${qualifyingContext}
Examples of sharp proactive queries:
- "How many chickens or birds do you currently care for?"
- "Do you have 120V power available near your coop for winter heated waterers and brooder plates?"
- "What type of bedding do you use on the coop floor (pine shavings, hemp, sand, or deep litter)?"
- "Are you fighting caked manure on wooden roosts or looking to eliminate winter water freezing?"

3. AUTOMATED TICKETING SYSTEM FOR COMPLEX ISSUES:
Detect if the inquiry involves a complex scenario requiring human specialist scoping or dedicated quote preparation:
Examples of Complex Issues:
- Bulk wholesale farm orders (e.g., 20+ feeders, pallet quotes, regional co-op resale).
- Commercial automated watering pipeline engineering (100+ birds, PVC layout, pressure regulation).
- Emergency disease outbreak / bio-security quarantine protocol (severe red mites, coccidiosis, avian influenza sanitization).
- Custom coop dimension manufacturing or complex electrical wiring audits.
- Warranty claims, defective heating elements, or custom replacement part requests.
- When the user explicitly requests: "Talk to human specialist", "Open a ticket", "I need a wholesale quote", or when forceEscalate is true.

If complex:
- Flag 'isComplexIssue' as true.
- If it requires formal ticket creation or user requested it, set 'autoCreateTicket' to true.
- Provide structured ticket metadata (title, category, priority, complexityReason, suggestedExpertise, estimatedHours, keyQuestions).
Valid categories: 'Bulk Wholesale Order', 'Biosecurity & Sanitization', 'Commercial Poultry Installation', 'Custom Coop Engineering', 'Equipment Warranty & Tech', 'Flock Health & Hygiene Consultation', 'General Consultation'.
Valid priorities: 'low', 'medium', 'high', 'urgent'.

4. CAPTURE DISCOVERY DATA:
Extract any client details (name, email, farm/coop name, flock size, coop type, cleaning routine, primary challenge) into 'extractedClientInfo' so the farm owner can review them in their Consultant & Operations Hub.

OUTPUT FORMAT:
You MUST respond with valid JSON:
{
  "reply": "string (Rich markdown with practical poultry advice, equipment recommendations with prices, and sanitization instructions)",
  "isComplexIssue": boolean,
  "autoCreateTicket": boolean,
  "ticketDetails": {
    "title": "string",
    "category": "string",
    "priority": "low | medium | high | urgent",
    "complexityReason": "string explaining why this poultry issue needs specialist review",
    "suggestedExpertise": "string",
    "estimatedHours": "string",
    "keyQuestions": ["string", "string"]
  } | null,
  "proactiveProductQuery": {
    "field": "flockSize | coopType | cleaningRoutine | productDescription | consultingBudget",
    "question": "string (the natural inquiry you are posing to the client about their flock/coop/routine)",
    "options": ["string", "string", "string"]
  } | null,
  "suggestedActions": ["string", "string", "string"],
  "extractedClientInfo": {
    "clientName": "string or null",
    "clientEmail": "string or null",
    "companyName": "string or null",
    "flockSize": "string or null",
    "coopType": "string or null",
    "cleaningRoutine": "string or null",
    "primaryChallenge": "string or null"
  } | null
}
`;

    // Construct conversation messages
    const formattedHistory = (history || []).slice(-6).map((h: any) => ({
      role: h.sender === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));

    const userPromptContent = `
CLIENT FARM CONTEXT:
Name: ${clientContext.clientName || "Unknown"}
Email: ${clientContext.clientEmail || "Not provided"}
Farm / Coop Name: ${clientContext.companyName || "Homestead Flock"}
Known Flock / Setup: ${clientContext.productDescription || "Not yet stated"}
Force Escalate / Manual Ticket Request: ${forceEscalate ? "YES - USER EXPLICITLY REQUESTED TICKET" : "No"}

NEW CLIENT MESSAGE:
"${message}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: userPromptContent }] }
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.7
      }
    });

    const responseText = response.text || "{}";
    let parsed: any;
    try {
      parsed = JSON.parse(responseText);
    } catch (err) {
      parsed = {
        reply: responseText,
        isComplexIssue: forceEscalate,
        autoCreateTicket: forceEscalate,
        ticketDetails: null,
        proactiveProductQuery: null,
        suggestedActions: ["Browse Chicken Accessories", "View Cleaning Instruments", "Request Wholesale Quote"]
      };
    }

    let createdTicket: Ticket | undefined = undefined;

    // If autoCreateTicket is true or forceEscalate is requested, generate a real Ticket
    if (parsed.autoCreateTicket || forceEscalate || (parsed.isComplexIssue && parsed.ticketDetails)) {
      const ticketDetails = parsed.ticketDetails || {
        title: `Poultry Equipment Consultation: ${message.slice(0, 50)}...`,
        category: "General Consultation" as TicketCategory,
        priority: "high" as TicketPriority,
        complexityReason: "Requires poultry equipment specialist scoping.",
        suggestedExpertise: "Dr. Ethan Wright, DVM",
        estimatedHours: "4 - 8 hrs",
        keyQuestions: ["What is the total flock bird count?", "What is the coop water and electrical setup?"]
      };

      createdTicket = {
        id: generateTicketId(),
        title: ticketDetails.title || `Inquiry: ${message.slice(0, 50)}...`,
        description: message,
        clientName: clientContext.clientName || parsed.extractedClientInfo?.clientName || "Poultry Keeper",
        clientEmail: clientContext.clientEmail || parsed.extractedClientInfo?.clientEmail || "client@poultryfarm.com",
        companyName: clientContext.companyName || parsed.extractedClientInfo?.companyName || "Homestead / Poultry Farm",
        category: (ticketDetails.category as TicketCategory) || "General Consultation",
        priority: (ticketDetails.priority as TicketPriority) || "high",
        status: "open",
        aiAssessment: {
          complexityReason: ticketDetails.complexityReason || "Commercial farm scale or severe biosecurity pathogen risk identified.",
          suggestedExpertise: ticketDetails.suggestedExpertise || "Poultry Equipment Specialist",
          estimatedHours: ticketDetails.estimatedHours || "6 - 12 hrs",
          keyQuestions: ticketDetails.keyQuestions || ["What is the coop layout?", "What is the target completion date?"]
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedConsultant: "Dr. Ethan Wright, DVM (Lead Specialist)",
        transcriptSummary: `Client requested consultation regarding: "${message}". AI flagged for poultry specialist review.`,
        consultantNotes: [],
        conversationLog: [
          {
            id: `msg-${Date.now()}`,
            sender: "client",
            text: message,
            timestamp: new Date().toISOString()
          },
          {
            id: `msg-${Date.now() + 1}`,
            sender: "system",
            text: `Automated Ticket generated via AI Consultation triage (${ticketDetails.category}). Priority: ${ticketDetails.priority}.`,
            timestamp: new Date().toISOString()
          }
        ]
      };

      tickets.unshift(createdTicket);
    }

    // Auto-save lead inquiry if new details extracted
    if (parsed.extractedClientInfo && (parsed.extractedClientInfo.flockSize || parsed.extractedClientInfo.coopType || parsed.extractedClientInfo.companyName || parsed.extractedClientInfo.clientEmail)) {
      const existing = inquiryLeads.find(l => l.clientEmail && l.clientEmail === parsed.extractedClientInfo.clientEmail);
      if (!existing) {
        inquiryLeads.unshift({
          id: `inq-${Date.now()}`,
          clientName: parsed.extractedClientInfo.clientName || clientContext.clientName || "Poultry Keeper",
          clientEmail: parsed.extractedClientInfo.clientEmail || clientContext.clientEmail || "",
          companyName: parsed.extractedClientInfo.companyName || clientContext.companyName || "Homestead Flock",
          productDescription: `${parsed.extractedClientInfo.flockSize || "Flock"} - ${parsed.extractedClientInfo.coopType || "Coop"}`,
          flockSize: parsed.extractedClientInfo.flockSize,
          coopType: parsed.extractedClientInfo.coopType,
          cleaningRoutine: parsed.extractedClientInfo.cleaningRoutine,
          primaryChallenge: parsed.extractedClientInfo.primaryChallenge || message,
          status: createdTicket ? "ticket_created" : "new",
          timestamp: new Date().toISOString(),
          lastBotQuerySent: parsed.proactiveProductQuery?.question,
          notes: `Extracted during live consultation. User asked: "${message.slice(0, 100)}"`
        });
      }
    }

    res.json({
      reply: parsed.reply || "Thank you for asking. Our chicken accessories and cleaning instruments are engineered for maximum flock health and easy coop maintenance. How else can we assist your farm?",
      isComplexIssue: parsed.isComplexIssue || false,
      ticketCreated: createdTicket,
      proactiveProductQuery: parsed.proactiveProductQuery || null,
      suggestedActions: parsed.suggestedActions || ["View chicken feeders & waterers", "Inspect manure scrapers", "Request custom farm quote"],
      extractedClientInfo: parsed.extractedClientInfo || null
    });

  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: "Failed to generate poultry consulting response",
      details: error?.message || String(error)
    });
  }
});

// -------------------------------------------------------------
// Vite Middleware / Static Asset Setup
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CluckCare & BioSanitation Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
