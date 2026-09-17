export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'under_review' | 'resolved';

export type TicketCategory =
  | 'Bulk Wholesale Order'
  | 'Biosecurity & Sanitization'
  | 'Commercial Poultry Installation'
  | 'Custom Coop Engineering'
  | 'Equipment Warranty & Tech'
  | 'Flock Health & Hygiene Consultation'
  | 'Operations & Supply Chain'
  | 'General Consultation';

export interface TicketNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface TicketMessage {
  id: string;
  sender: 'client' | 'consultant' | 'system';
  text: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  aiAssessment: {
    complexityReason: string;
    suggestedExpertise: string;
    estimatedHours: string;
    keyQuestions: string[];
  };
  createdAt: string;
  updatedAt: string;
  assignedConsultant?: string;
  transcriptSummary?: string;
  consultantNotes?: TicketNote[];
  conversationLog?: TicketMessage[];
}

export interface ClientInquiryLead {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  productDescription: string;
  targetMarket?: string;
  currentRevenueOrTraction?: string;
  teamSize?: string;
  flockSize?: string;
  coopType?: string;
  cleaningRoutine?: string;
  primaryChallenge: string;
  consultingBudget?: string;
  timeline?: string;
  status: 'new' | 'contacted' | 'ticket_created' | 'converted';
  timestamp: string;
  lastBotQuerySent?: string;
  notes?: string;
}

export interface ProactiveQuery {
  field:
    | 'productDescription'
    | 'flockSize'
    | 'coopType'
    | 'cleaningRoutine'
    | 'targetMarket'
    | 'currentRevenueOrTraction'
    | 'primaryChallenge'
    | 'consultingBudget'
    | 'timeline';
  question: string;
  options?: string[];
  helpContext?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  proactiveProductQuery?: ProactiveQuery;
  ticketCreated?: Ticket;
  isComplexIssueDetected?: boolean;
  ticketTriggerPrompt?: {
    reason: string;
    suggestedCategory: TicketCategory;
    priority: TicketPriority;
  };
}

export interface ConsultingService {
  id: string;
  name: string;
  description: string;
  typicalDuration: string;
  focusArea: string;
}

export interface ConsultingFirmConfig {
  firmName: string;
  tagline: string;
  leadConsultant: string;
  contactEmail: string;
  services: ConsultingService[];
  qualifyingQuestions: ProactiveQuery[];
  autoTicketingTriggers: string[];
}

export type ProductCategory = 'chicken_accessories' | 'cleaning_instruments' | 'bundle_kits';

export interface PoultryProduct {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  rating: number;
  badge?: string;
  description: string;
  specifications: string[];
  recommendedFlockSize: string;
  inStock: boolean;
  iconType: 'feeder' | 'waterer' | 'heater' | 'nest' | 'door' | 'perch' | 'scraper' | 'sprayer' | 'bootbath' | 'brush' | 'rake' | 'fogger' | 'bundle';
}

export interface FarmQuoteOrder {
  id: string;
  clientName: string;
  clientEmail: string;
  farmOrCoopName: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
  status: 'pending_quote' | 'confirmed' | 'fulfilled';
  createdAt: string;
  notes?: string;
}
