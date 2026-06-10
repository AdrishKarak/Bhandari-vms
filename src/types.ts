export type Location = 'Kolkata HQ' | 'Salt Lake Branch' | 'Howrah Branch' | 'Barasat Branch';

export type Role = 'Director' | 'GM' | 'Team' | 'Accounts' | 'Audit';

export interface User {
  name: string;
  email: string;
  role: Role | string;
  location: Location;
  status: 'Active' | 'Inactive';
  lastActive: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'Pending' | 'Suspended' | 'Pending Onboarding';
  creditPeriod: string; // e.g., "30 days credit", "0 days (advance)"
  gstin: string;
  paymentTerms: string;
  locations: Location[];
  contactName?: string;
  phone?: string;
  email?: string;
  bankName?: string;
  bankAccount?: string;
  ifsc?: string;
  accountType?: string;
  gstTreatment?: string;
  pan?: string;
}

export interface RequisitionItem {
  id: string;
  description: string;
  category: string;
  qty: number;
  unit: string;
  estPrice: number;
  preferredVendor: string;
  notes?: string;
}

export interface Requisition {
  id: string;
  title: string;
  raisedBy: string;
  date: string;
  priority: 'Normal' | 'Urgent' | 'Critical';
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'In Purchase' | 'Completed';
  gmRemark?: string;
  items: RequisitionItem[];
  location: Location;
  department?: string;
  requiredByDate?: string;
  supportingNotes?: string;
}

export interface Quote {
  vendorId: string;
  vendorName: string;
  date: string;
  prices: { [itemId: string]: number };
  paymentTerms: string;
  validityDays: number;
  uploadedUrl?: string;
}

export interface RFQ {
  id: string;
  linkedReqId: string;
  vendorsApproached: string[]; // Vendor IDs or Names
  deadline: string;
  status: 'Draft' | 'Sent' | 'Quotes In' | 'Closed';
  quotes: Quote[];
  deliveryTerms?: string;
  specialInstructions?: string;
}

export interface PurchaseOrderItem {
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
  gstPercent: number;
}

export interface PurchaseOrder {
  id: string;
  vendorName: string;
  itemSummary: string;
  value: number;
  issuedDate: string;
  expectedDelivery: string;
  status: 'Pending Delivery' | 'Dispatched' | 'Delivered' | 'Delivered (GRN Pending)' | 'QC Pending' | 'GRN Submitted' | 'GRN Pending' | 'Completed';
  items?: PurchaseOrderItem[];
  linkedReqId?: string;
  linkedRfqId?: string;
  deliveryAddress?: string;
  deliveryTerms?: string;
}

export interface GRNItem {
  description: string;
  orderQty: number;
  receivedQty: number;
  condition: 'Good' | 'Damaged' | 'Partial';
}

export interface GRN {
  id: string;
  poId: string;
  vendorName: string;
  receivedDate: string;
  receivedBy: string;
  status: 'Pending Submission' | 'Submitted' | 'Accepted' | 'Accepted (QC Pending)' | 'Awaiting Delivery';
  items: GRNItem[];
  shortageDamageNotes?: string;
  photoUrls?: string[];
  deliveryNoteNumber?: string;
  grnRemarks?: string;
}

export interface Invoice {
  id: string;
  vendorName: string;
  poId: string;
  grnId?: string;
  date: string;
  amountExGst: number;
  gstAmount: number;
  totalAmount: number;
  amount?: number;
  status: 'Pending Booking' | 'Sent for Matching' | 'Booked' | 'Posted to Tally' | 'Exception' | 'Pending Approval' | 'Approved' | 'Paid' | 'Rejected' | 'Pending Verification' | 'Submitted';
  exceptionType?: string;
  flaggedOn?: string;
  cgst?: number;
  sgst?: number;
  igst?: number;
}

export interface Contract {
  vendorName: string;
  startDate: string;
  endDate: string;
  daysLeft: number;
  slaTerms: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
}

export interface PaymentBatch {
  id: string;
  vendorName: string;
  invoiceCount: number;
  amount: number;
  dueDate: string;
  status: 'Pending Approval' | 'Approved' | 'Paid' | 'Executed';
  payoutDate?: string;
  invoiceIds?: string[];
  totalValue?: number;
  targetAccount?: string;
}
