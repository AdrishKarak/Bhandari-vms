import { Location, User, Vendor, Requisition, RFQ, PurchaseOrder, GRN, Invoice, Contract, PaymentBatch } from './types';

export const INITIAL_LOCATIONS: Location[] = [
  'Kolkata HQ',
  'Salt Lake Branch',
  'Howrah Branch',
  'Barasat Branch'
];

export const INITIAL_USERS: User[] = [
  { name: 'Arun Bhandari', email: 'arun@bhandari.in', role: 'Director', location: 'Kolkata HQ', status: 'Active', lastActive: 'Today' },
  { name: 'Vikram Sen', email: 'vikram@bhandari.in', role: 'GM', location: 'Kolkata HQ', status: 'Active', lastActive: 'Today' },
  { name: 'Priya Nair', email: 'priya@bhandari.in', role: 'GM', location: 'Salt Lake Branch', status: 'Active', lastActive: 'Yesterday' },
  { name: 'Ratan Das', email: 'ratan@bhandari.in', role: 'Team', location: 'Kolkata HQ', status: 'Active', lastActive: 'Today' },
  { name: 'Suresh Kumar', email: 'suresh@bhandari.in', role: 'Team', location: 'Howrah Branch', status: 'Active', lastActive: '2 days ago' },
  { name: 'Monika Sharma', email: 'monika@bhandari.in', role: 'Accounts', location: 'Kolkata HQ', status: 'Active', lastActive: 'Today' },
  { name: 'Sanjay Ghosh', email: 'sanjay@bhandari.in', role: 'Audit', location: 'Kolkata HQ', status: 'Active', lastActive: 'Yesterday' },
  { name: 'Deepa Mehta', email: 'deepa@bhandari.in', role: 'Accounts', location: 'Salt Lake Branch', status: 'Active', lastActive: '3 days ago' },
  { name: 'Amit Roy', email: 'amit@bhandari.in', role: 'Team', location: 'Barasat Branch', status: 'Inactive', lastActive: '14 days ago' },
  { name: 'Neha Singh', email: 'neha@bhandari.in', role: 'GM', location: 'Howrah Branch', status: 'Active', lastActive: '1 day ago' }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'V001',
    name: 'Ramesh Traders',
    category: 'Lubricants',
    status: 'Active',
    creditPeriod: '30 days credit',
    gstin: '19AABCU9603R1ZX',
    paymentTerms: 'Net 30',
    locations: ['Kolkata HQ', 'Salt Lake Branch'],
    contactName: 'Ramesh Gupta',
    phone: '+91 98300 12345',
    email: 'ramesh@rameshtraders.com',
    bankName: 'HDFC Bank',
    bankAccount: '50100432109876',
    ifsc: 'HDFC0000123',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9603R'
  },
  {
    id: 'V002',
    name: 'Bengal Auto Supplies',
    category: 'Spare Parts',
    status: 'Active',
    creditPeriod: '45 days credit',
    gstin: '19AABCU9604R1ZY',
    paymentTerms: 'Net 45',
    locations: ['Kolkata HQ', 'Barasat Branch'],
    contactName: 'Subhasis Roy',
    phone: '+91 98310 54321',
    email: 'subhasis@bengalauto.com',
    bankName: 'ICICI Bank',
    bankAccount: '000405001234',
    ifsc: 'ICIC0000004',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9604R'
  },
  {
    id: 'V003',
    name: 'Howrah Tyres Ltd.',
    category: 'Tyres',
    status: 'Active',
    creditPeriod: '0 days (advance)',
    gstin: '19AABCU9605R1ZZ',
    paymentTerms: 'Advance',
    locations: ['Howrah Branch', 'Kolkata HQ'],
    contactName: 'Ashok Das',
    phone: '+91 98322 98765',
    email: 'sales@howrahtyres.com',
    bankName: 'State Bank of India',
    bankAccount: '10987654321',
    ifsc: 'SBIN0000001',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9605R'
  },
  {
    id: 'V004',
    name: 'Eastern Lubricants Pvt Ltd.',
    category: 'Lubricants',
    status: 'Active',
    creditPeriod: '30 days credit',
    gstin: '19AABCU9606R1ZA',
    paymentTerms: 'Net 30',
    locations: ['Kolkata HQ', 'Salt Lake Branch', 'Barasat Branch'],
    contactName: 'Pradip Bose',
    phone: '+91 94330 65432',
    email: 'pradip@easternlubricants.com',
    bankName: 'Axis Bank',
    bankAccount: '915020012345678',
    ifsc: 'UTIB0000005',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9606R'
  },
  {
    id: 'V005',
    name: 'Metro Accessories',
    category: 'Accessories',
    status: 'Active',
    creditPeriod: '15 days credit',
    gstin: '19AABCU9607R1ZB',
    paymentTerms: 'Net 15',
    locations: ['Salt Lake Branch', 'Kolkata HQ'],
    contactName: 'Sanjay Mehta',
    phone: '+91 98305 23456',
    email: 'sanjay@metroacc.in',
    bankName: 'HDFC Bank',
    bankAccount: '50100987654321',
    ifsc: 'HDFC0000123',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9607R'
  },
  {
    id: 'V006',
    name: 'Salt Lake Electricals',
    category: 'Electricals',
    status: 'Pending',
    creditPeriod: '30 days credit',
    gstin: '19AABCU9608R1ZC',
    paymentTerms: 'Net 30',
    locations: ['Salt Lake Branch'],
    contactName: 'Nikhil Sen',
    phone: '+91 98311 87654',
    email: 'nikhil@slelectricals.com',
    bankName: 'Kotak Mahindra',
    bankAccount: '1234567890',
    ifsc: 'KKBK0000123',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9608R'
  },
  {
    id: 'V007',
    name: 'New Town Auto Parts',
    category: 'Spare Parts',
    status: 'Active',
    creditPeriod: '45 days credit',
    gstin: '19AABCU9609R1ZD',
    paymentTerms: 'Net 45',
    locations: ['Howrah Branch', 'Kolkata HQ'],
    contactName: 'Rajesh Sen',
    phone: '+91 98318 76543',
    email: 'rajesh@newtownauto.com',
    bankName: 'ICICI Bank',
    bankAccount: '000405009876',
    ifsc: 'ICIC0000004',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9609R'
  },
  {
    id: 'V008',
    name: 'Park Street Tools',
    category: 'Tools',
    status: 'Suspended',
    creditPeriod: '0 days credit',
    gstin: '19AABCU9610R1ZE',
    paymentTerms: 'Advance',
    locations: ['Kolkata HQ'],
    contactName: 'Vikram Jit',
    phone: '+91 98301 23456',
    email: 'vikram@parkstreettools.com',
    bankName: 'IDBI Bank',
    bankAccount: '12310400000987',
    ifsc: 'IBKL0000001',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9610R'
  },
  {
    id: 'V009',
    name: 'Jadavpur Hardware',
    category: 'Tools',
    status: 'Active',
    creditPeriod: '15 days credit',
    gstin: '19AABCU9611R1ZF',
    paymentTerms: 'Net 15',
    locations: ['Kolkata HQ', 'Salt Lake Branch'],
    contactName: 'Gobinda Pal',
    phone: '+91 94331 45678',
    email: 'gobinda@jadavpurhardware.com',
    bankName: 'Yes Bank',
    bankAccount: '123456789012345',
    ifsc: 'YESB0000123',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9611R'
  },
  {
    id: 'V010',
    name: 'Kolkata Spare Parts Co.',
    category: 'Spare Parts',
    status: 'Active',
    creditPeriod: '30 days credit',
    gstin: '19AABCU9612R1ZG',
    paymentTerms: 'Net 30',
    locations: ['Kolkata HQ', 'Barasat Branch'],
    contactName: 'Dilip Ghosh',
    phone: '+91 98308 90123',
    email: 'dilip@kolkataspares.com',
    bankName: 'Bank of Baroda',
    bankAccount: '98450100001234',
    ifsc: 'BARB0KOLKAt',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9612R'
  },
  {
    id: 'V011',
    name: 'North Bengal Filters',
    category: 'Spare Parts',
    status: 'Pending Onboarding',
    creditPeriod: '',
    gstin: '',
    paymentTerms: '',
    locations: ['Kolkata HQ'],
    contactName: 'Debabrata Das',
    phone: '+91 94340 12345',
    email: 'deb@northbengalfilters.com',
    bankName: '',
    bankAccount: '',
    ifsc: '',
    accountType: '',
    gstTreatment: '',
    pan: ''
  },
  {
    id: 'V012',
    name: 'Diamond Harbour Oils',
    category: 'Lubricants',
    status: 'Active',
    creditPeriod: '30 days credit',
    gstin: '19AABCU9614R1ZI',
    paymentTerms: 'Net 30',
    locations: ['Kolkata HQ', 'Howrah Branch'],
    contactName: 'Bimal Halder',
    phone: '+91 98366 12345',
    email: 'bimal@dhoils.com',
    bankName: 'United Bank of India',
    bankAccount: '0123456789012',
    ifsc: 'UTBI0KOLK56',
    accountType: 'Current',
    gstTreatment: 'Regular',
    pan: 'AABCU9614R'
  }
];

export const INITIAL_REQUISITIONS: Requisition[] = [
  {
    id: 'REQ-2024-001',
    title: 'Engine Oil 10W30 (20 Ltrs)',
    raisedBy: 'Ratan Das',
    date: '2024-01-10',
    priority: 'Normal',
    status: 'Approved',
    gmRemark: 'Approved. Proceed with RFQ.',
    location: 'Kolkata HQ',
    department: 'Purchase',
    items: [
      { id: 'I1_1', description: 'Engine Oil 10W30', category: 'Lubricants', qty: 20, unit: 'Ltr', estPrice: 900, preferredVendor: 'Ramesh Traders' }
    ]
  },
  {
    id: 'REQ-2024-002',
    title: 'Brake Pads Set (10 Sets)',
    raisedBy: 'Suresh Kumar',
    date: '2024-01-12',
    priority: 'Urgent',
    status: 'Pending Approval',
    location: 'Howrah Branch',
    department: 'Service',
    items: [
      { id: 'I2_1', description: 'Brake Pads Set', category: 'Spare Parts', qty: 10, unit: 'Set', estPrice: 950, preferredVendor: 'New Town Auto Parts' }
    ]
  },
  {
    id: 'REQ-2024-003',
    title: 'Tyre 185/65R15 (4 Nos)',
    raisedBy: 'Ratan Das',
    date: '2024-01-14',
    priority: 'Critical',
    status: 'Approved',
    gmRemark: 'Proceed immediately',
    location: 'Kolkata HQ',
    department: 'Parts',
    items: [
      { id: 'I3_1', description: 'Tyre 185/65R15', category: 'Tyres', qty: 4, unit: 'Pcs', estPrice: 7000, preferredVendor: 'Howrah Tyres Ltd.' }
    ]
  },
  {
    id: 'REQ-2024-004',
    title: 'Workshop Stationery',
    raisedBy: 'Ratan Das',
    date: '2024-01-15',
    priority: 'Normal',
    status: 'Draft',
    location: 'Kolkata HQ',
    department: 'Admin',
    items: [
      { id: 'I4_1', description: 'Workshop Log Books', category: 'Stationery', qty: 15, unit: 'Pcs', estPrice: 150, preferredVendor: 'Ramesh Traders' }
    ]
  },
  {
    id: 'REQ-2024-005',
    title: 'Air Filter Cartridge (6 Nos)',
    raisedBy: 'Suresh Kumar',
    date: '2024-01-16',
    priority: 'Normal',
    status: 'Rejected',
    gmRemark: 'Supplier not on AVL. Raise again with AVL vendor.',
    location: 'Howrah Branch',
    department: 'Service',
    items: [
      { id: 'I5_1', description: 'Air Filter Cartridge', category: 'Spare Parts', qty: 6, unit: 'Pcs', estPrice: 600, preferredVendor: 'North Bengal Filters' }
    ]
  },
  {
    id: 'REQ-2024-006',
    title: 'Electrical Wiring Harness (2 Sets)',
    raisedBy: 'Ratan Das',
    date: '2024-01-18',
    priority: 'Urgent',
    status: 'In Purchase',
    location: 'Kolkata HQ',
    department: 'Service',
    items: [
      { id: 'I6_1', description: 'Electrical Wiring Harness', category: 'Electricals', qty: 2, unit: 'Set', estPrice: 11200, preferredVendor: 'Bengal Auto Supplies' }
    ]
  },
  {
    id: 'REQ-2024-007',
    title: 'Gear Oil SAE90 (10 Ltrs)',
    raisedBy: 'Suresh Kumar',
    date: '2024-01-19',
    priority: 'Normal',
    status: 'Completed',
    location: 'Howrah Branch',
    department: 'Service',
    items: [
      { id: 'I7_1', description: 'Gear Oil SAE90', category: 'Lubricants', qty: 10, unit: 'Ltr', estPrice: 620, preferredVendor: 'Eastern Lubricants Pvt Ltd.' }
    ]
  },
  {
    id: 'REQ-2024-008',
    title: 'Safety Gloves (20 Pairs)',
    raisedBy: 'Ratan Das',
    date: '2024-01-20',
    priority: 'Normal',
    status: 'Pending Approval',
    location: 'Kolkata HQ',
    department: 'Admin',
    items: [
      { id: 'I8_1', description: 'Worker Safety Gloves', category: 'Safety Equipment', qty: 20, unit: 'Set', estPrice: 240, preferredVendor: 'Jadavpur Hardware' }
    ]
  },
  {
    id: 'REQ-2024-009',
    title: 'Battery 12V 65Ah (3 Nos)',
    raisedBy: 'Ratan Das',
    date: '2024-01-21',
    priority: 'Urgent',
    status: 'Approved',
    location: 'Kolkata HQ',
    department: 'Service',
    items: [
      { id: 'I9_1', description: 'Battery 12V 65Ah', category: 'Electricals', qty: 3, unit: 'Pcs', estPrice: 4900, preferredVendor: 'Metro Accessories' }
    ]
  },
  {
    id: 'REQ-2024-010',
    title: 'Coolant Concentrate (5 Ltrs)',
    raisedBy: 'Suresh Kumar',
    date: '2024-01-22',
    priority: 'Normal',
    status: 'Approved',
    location: 'Howrah Branch',
    department: 'Service',
    items: [
      { id: 'I10_1', description: 'Coolant Concentrate', category: 'Lubricants', qty: 5, unit: 'Ltr', estPrice: 1020, preferredVendor: 'Diamond Harbour Oils' }
    ]
  }
];

export const INITIAL_RFQS: RFQ[] = [
  {
    id: 'RFQ-2024-001',
    linkedReqId: 'REQ-2024-001',
    vendorsApproached: ['Ramesh Traders', 'Eastern Lubricants Pvt Ltd.', 'Diamond Harbour Oils'],
    deadline: '2024-01-20',
    status: 'Closed',
    quotes: [
      { vendorId: 'V001', vendorName: 'Ramesh Traders', date: '2024-01-18', prices: { 'I1_1': 900 }, paymentTerms: 'Net 30', validityDays: 30 },
      { vendorId: 'V004', vendorName: 'Eastern Lubricants Pvt Ltd.', date: '2024-01-17', prices: { 'I1_1': 950 }, paymentTerms: 'Net 30', validityDays: 30 },
      { vendorId: 'V012', vendorName: 'Diamond Harbour Oils', date: '2024-01-18', prices: { 'I1_1': 920 }, paymentTerms: 'Net 30', validityDays: 30 }
    ]
  },
  {
    id: 'RFQ-2024-002',
    linkedReqId: 'REQ-2024-003',
    vendorsApproached: ['Howrah Tyres Ltd.', 'Metro Accessories'],
    deadline: '2024-01-22',
    status: 'Quotes In',
    quotes: [
      { vendorId: 'V003', vendorName: 'Howrah Tyres Ltd.', date: '2024-01-20', prices: { 'I3_1': 7000 }, paymentTerms: 'Advance', validityDays: 15 },
      { vendorId: 'V005', vendorName: 'Metro Accessories', date: '2024-01-21', prices: { 'I3_1': 7200 }, paymentTerms: 'Net 15', validityDays: 30 }
    ]
  },
  {
    id: 'RFQ-2024-003',
    linkedReqId: 'REQ-2024-006',
    vendorsApproached: ['Bengal Auto Supplies', 'New Town Auto Parts', 'Kolkata Spare Parts Co.'],
    deadline: '2024-01-28',
    status: 'Sent',
    quotes: [
      { vendorId: 'V002', vendorName: 'Bengal Auto Supplies', date: '2024-01-24', prices: { 'I6_1': 11200 }, paymentTerms: 'Net 45', validityDays: 30 }
    ]
  },
  {
    id: 'RFQ-2024-004',
    linkedReqId: 'REQ-2024-009',
    vendorsApproached: ['Metro Accessories', 'Salt Lake Electricals'],
    deadline: '2024-01-30',
    status: 'Sent',
    quotes: []
  },
  {
    id: 'RFQ-2024-005',
    linkedReqId: 'REQ-2024-010',
    vendorsApproached: ['Diamond Harbour Oils', 'Ramesh Traders', 'Eastern Lubricants Pvt Ltd.'],
    deadline: '2024-01-25',
    status: 'Quotes In',
    quotes: [
      { vendorId: 'V012', vendorName: 'Diamond Harbour Oils', date: '2024-01-23', prices: { 'I10_1': 1020 }, paymentTerms: 'Net 30', validityDays: 35 },
      { vendorId: 'V001', vendorName: 'Ramesh Traders', date: '2024-01-24', prices: { 'I10_1': 1050 }, paymentTerms: 'Net 30', validityDays: 30 }
    ]
  },
  {
    id: 'RFQ-2024-006',
    linkedReqId: 'REQ-2024-007',
    vendorsApproached: ['Eastern Lubricants Pvt Ltd.', 'Ramesh Traders', 'Diamond Harbour Oils'],
    deadline: '2024-01-10',
    status: 'Closed',
    quotes: [
      { vendorId: 'V004', vendorName: 'Eastern Lubricants Pvt Ltd.', date: '2024-01-08', prices: { 'I7_1': 620 }, paymentTerms: 'Net 30', validityDays: 30 },
      { vendorId: 'V001', vendorName: 'Ramesh Traders', date: '2024-01-07', prices: { 'I7_1': 640 }, paymentTerms: 'Net 30', validityDays: 30 },
      { vendorId: 'V012', vendorName: 'Diamond Harbour Oils', date: '2024-01-08', prices: { 'I7_1': 630 }, paymentTerms: 'Net 30', validityDays: 30 }
    ]
  },
  {
    id: 'RFQ-2024-007',
    linkedReqId: 'REQ-2024-002',
    vendorsApproached: ['New Town Auto Parts', 'Bengal Auto Supplies'],
    deadline: '2024-02-01',
    status: 'Draft',
    quotes: []
  },
  {
    id: 'RFQ-2024-008',
    linkedReqId: 'REQ-2024-008',
    vendorsApproached: ['Jadavpur Hardware', 'Park Street Tools'],
    deadline: '2024-01-29',
    status: 'Sent',
    quotes: [
      { vendorId: 'V009', vendorName: 'Jadavpur Hardware', date: '2024-01-25', prices: { 'I8_1': 240 }, paymentTerms: 'Net 15', validityDays: 30 }
    ]
  }
];

export const INITIAL_POS: PurchaseOrder[] = [
  {
    id: 'PO-2024-001',
    vendorName: 'Ramesh Traders',
    itemSummary: 'Engine Oil 10W30',
    value: 18000,
    issuedDate: '2024-01-21',
    expectedDelivery: '2024-01-25',
    status: 'Delivered (GRN Pending)',
    linkedReqId: 'REQ-2024-001',
    linkedRfqId: 'RFQ-2024-001',
    deliveryAddress: 'Kolkata HQ Workshop, Ground Floor, Salt Lake Sec V, Kolkata 700091',
    deliveryTerms: 'Immediate delivery. Packaged in sealed 5L containers.',
    items: [
      { description: 'Engine Oil 10W30', qty: 20, unitPrice: 900, total: 18000, gstPercent: 18 }
    ]
  },
  {
    id: 'PO-2024-002',
    vendorName: 'Howrah Tyres Ltd.',
    itemSummary: 'Tyre 185/65R15',
    value: 28000,
    issuedDate: '2024-01-23',
    expectedDelivery: '2024-01-28',
    status: 'Dispatched',
    linkedReqId: 'REQ-2024-003',
    linkedRfqId: 'RFQ-2024-002',
    deliveryAddress: 'Kolkata HQ Parts Section, Kolkata 700091',
    deliveryTerms: 'SLA: 2-day delivery. Original manufacturer warranty documents required.',
    items: [
      { description: 'Tyre 185/65R15', qty: 4, unitPrice: 7000, total: 28000, gstPercent: 28 }
    ]
  },
  {
    id: 'PO-2024-003',
    vendorName: 'New Town Auto Parts',
    itemSummary: 'Brake Pads',
    value: 9500,
    issuedDate: '2024-01-18',
    expectedDelivery: '2024-01-22',
    status: 'QC Pending',
    linkedReqId: 'REQ-2024-002',
    linkedRfqId: 'RFQ-2024-007',
    deliveryAddress: 'Howrah Branch Workshop, Howrah 711101',
    deliveryTerms: 'SLA: 5-day delivery.',
    items: [
      { description: 'Brake Pads Set', qty: 10, unitPrice: 950, total: 9500, gstPercent: 18 }
    ]
  },
  {
    id: 'PO-2024-004',
    vendorName: 'Eastern Lubricants Pvt Ltd.',
    itemSummary: 'Gear Oil SAE90',
    value: 6200,
    issuedDate: '2024-01-12',
    expectedDelivery: '2024-01-15',
    status: 'Completed',
    linkedReqId: 'REQ-2024-007',
    linkedRfqId: 'RFQ-2024-006',
    deliveryAddress: 'Howrah Branch, Service Depot, Howrah 711101',
    deliveryTerms: 'Net 30 payment timeline.',
    items: [
      { description: 'Gear Oil SAE90', qty: 10, unitPrice: 620, total: 6200, gstPercent: 18 }
    ]
  },
  {
    id: 'PO-2024-005',
    vendorName: 'Bengal Auto Supplies',
    itemSummary: 'Wiring Harness',
    value: 22400,
    issuedDate: '2024-01-24',
    expectedDelivery: '2024-01-30',
    status: 'Dispatched',
    linkedReqId: 'REQ-2024-006',
    linkedRfqId: 'RFQ-2024-003',
    deliveryAddress: 'Kolkata HQ Electrical Depot, Kolkata 700091',
    deliveryTerms: 'Handle with extreme care.',
    items: [
      { description: 'Electrical Wiring Harness', qty: 2, unitPrice: 11200, total: 22400, gstPercent: 18 }
    ]
  },
  {
    id: 'PO-2024-006',
    vendorName: 'Jadavpur Hardware',
    itemSummary: 'Safety Gloves',
    value: 4800,
    issuedDate: '2024-01-22',
    expectedDelivery: '2024-01-26',
    status: 'GRN Submitted',
    linkedReqId: 'REQ-2024-008',
    linkedRfqId: 'RFQ-2024-008',
    deliveryAddress: 'Kolkata HQ Admin Stores, Kolkata 700091',
    deliveryTerms: 'Pack in bundles of 5 pairs.',
    items: [
      { description: 'Worker Safety Gloves', qty: 20, unitPrice: 240, total: 4800, gstPercent: 18 }
    ]
  },
  {
    id: 'PO-2024-007',
    vendorName: 'Kolkata Spare Parts Co.',
    itemSummary: 'Air Filter',
    value: 3600,
    issuedDate: '2024-01-20',
    expectedDelivery: '2024-01-24',
    status: 'GRN Pending',
    linkedReqId: 'REQ-2024-005',
    deliveryAddress: 'Kolkata HQ, Kolkata 700091',
    items: [
      { description: 'Air Filter Cartridge', qty: 6, unitPrice: 600, total: 3600, gstPercent: 18 }
    ]
  },
  {
    id: 'PO-2024-008',
    vendorName: 'Diamond Harbour Oils',
    itemSummary: 'Coolant Conc.',
    value: 5100,
    issuedDate: '2024-01-25',
    expectedDelivery: '2024-01-29',
    status: 'Dispatched',
    linkedReqId: 'REQ-2024-010',
    linkedRfqId: 'RFQ-2024-005',
    deliveryAddress: 'Howrah Branch, Howrah 711101',
    items: [
      { description: 'Coolant Concentrate', qty: 5, unitPrice: 1020, total: 5100, gstPercent: 18 }
    ]
  },
  {
    id: 'PO-2024-009',
    vendorName: 'Ramesh Traders',
    itemSummary: 'Engine Oil 10W30',
    value: 12000,
    issuedDate: '2024-01-17',
    expectedDelivery: '2024-01-20',
    status: 'Completed',
    linkedReqId: 'REQ-2024-001',
    linkedRfqId: 'RFQ-2024-001',
    deliveryAddress: 'Kolkata HQ, Kolkata 700091',
    items: [
      { description: 'Engine Oil 10W30', qty: 13.33, unitPrice: 900, total: 12000, gstPercent: 18 }
    ]
  },
  {
    id: 'PO-2024-010',
    vendorName: 'Metro Accessories',
    itemSummary: 'Battery 12V',
    value: 14700,
    issuedDate: '2024-01-26',
    expectedDelivery: '2024-02-01',
    status: 'Pending Delivery',
    linkedReqId: 'REQ-2024-009',
    linkedRfqId: 'RFQ-2024-004',
    deliveryAddress: 'Kolkata HQ, Kolkata 700091',
    items: [
      { description: 'Battery 12V 65Ah', qty: 3, unitPrice: 4900, total: 14700, gstPercent: 18 }
    ]
  }
];

export const INITIAL_GRNS: GRN[] = [
  {
    id: 'GRN-2024-001',
    poId: 'PO-2024-004',
    vendorName: 'Eastern Lubricants Pvt Ltd.',
    receivedDate: '2024-01-15',
    receivedBy: 'Ratan Das',
    status: 'Accepted',
    items: [
      { description: 'Gear Oil SAE90', orderQty: 10, receivedQty: 10, condition: 'Good' }
    ]
  },
  {
    id: 'GRN-2024-002',
    poId: 'PO-2024-009',
    vendorName: 'Ramesh Traders',
    receivedDate: '2024-01-20',
    receivedBy: 'Ratan Das',
    status: 'Accepted',
    items: [
      { description: 'Engine Oil 10W30', orderQty: 13, receivedQty: 13, condition: 'Good' }
    ]
  },
  {
    id: 'GRN-2024-003',
    poId: 'PO-2024-003',
    vendorName: 'New Town Auto Parts',
    receivedDate: '2024-01-22',
    receivedBy: 'Suresh Kumar',
    status: 'Accepted (QC Pending)',
    items: [
      { description: 'Brake Pads Set', orderQty: 10, receivedQty: 10, condition: 'Good' }
    ]
  },
  {
    id: 'GRN-2024-004',
    poId: 'PO-2024-006',
    vendorName: 'Jadavpur Hardware',
    receivedDate: '2024-01-23',
    receivedBy: 'Ratan Das',
    status: 'Submitted',
    items: [
      { description: 'Worker Safety Gloves', orderQty: 20, receivedQty: 20, condition: 'Good' }
    ]
  },
  {
    id: 'GRN-2024-005',
    poId: 'PO-2024-001',
    vendorName: 'Ramesh Traders',
    receivedDate: '2024-01-25',
    receivedBy: 'Ratan Das',
    status: 'Pending Submission',
    items: [
      { description: 'Engine Oil 10W30', orderQty: 20, receivedQty: 20, condition: 'Good' }
    ]
  },
  {
    id: 'GRN-2024-006',
    poId: 'PO-2024-007',
    vendorName: 'Kolkata Spare Parts Co.',
    receivedDate: 'pending',
    receivedBy: 'Suresh Kumar',
    status: 'Pending Submission',
    items: [
      { description: 'Air Filter Cartridge', orderQty: 6, receivedQty: 0, condition: 'Partial' }
    ]
  },
  {
    id: 'GRN-2024-007',
    poId: 'PO-2024-005',
    vendorName: 'Bengal Auto Supplies',
    receivedDate: 'in transit',
    receivedBy: '',
    status: 'Awaiting Delivery',
    items: [
      { description: 'Electrical Wiring Harness', orderQty: 2, receivedQty: 0, condition: 'Good' }
    ]
  },
  {
    id: 'GRN-2024-008',
    poId: 'PO-2024-002',
    vendorName: 'Howrah Tyres Ltd.',
    receivedDate: 'in transit',
    receivedBy: '',
    status: 'Awaiting Delivery',
    items: [
      { description: 'Tyre 185/65R15', orderQty: 4, receivedQty: 0, condition: 'Good' }
    ]
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2024-001',
    vendorName: 'Ramesh Traders',
    poId: 'PO-2024-009',
    grnId: 'GRN-2024-002',
    date: '2024-01-20',
    amountExGst: 10169,
    gstAmount: 1831,
    totalAmount: 12000,
    status: 'Booked'
  },
  {
    id: 'INV-2024-002',
    vendorName: 'Eastern Lubricants Pvt Ltd.',
    poId: 'PO-2024-004',
    grnId: 'GRN-2024-001',
    date: '2024-01-15',
    amountExGst: 5254,
    gstAmount: 946,
    totalAmount: 6200,
    status: 'Posted to Tally'
  },
  {
    id: 'INV-2024-003',
    vendorName: 'New Town Auto Parts',
    poId: 'PO-2024-003',
    grnId: 'GRN-2024-003',
    date: '2024-01-23',
    amountExGst: 8051,
    gstAmount: 1449,
    totalAmount: 9500,
    status: 'Pending Booking'
  },
  {
    id: 'INV-2024-004',
    vendorName: 'Jadavpur Hardware',
    poId: 'PO-2024-006',
    grnId: 'GRN-2024-004',
    date: '2024-01-24',
    amountExGst: 4068,
    gstAmount: 732,
    totalAmount: 4800,
    status: 'Sent for Matching'
  },
  {
    id: 'INV-2024-005',
    vendorName: 'Howrah Tyres Ltd.',
    poId: 'PO-2024-002',
    grnId: undefined,
    date: '2024-01-28',
    amountExGst: 23729,
    gstAmount: 4271,
    totalAmount: 28000,
    status: 'Pending Booking'
  },
  {
    id: 'INV-2024-006',
    vendorName: 'Bengal Auto Supplies',
    poId: 'PO-2024-005',
    grnId: undefined,
    date: '',
    amountExGst: 0,
    gstAmount: 0,
    totalAmount: 0,
    status: 'Pending Booking'
  },
  {
    id: 'INV-2024-007',
    vendorName: 'Kolkata Spare Parts Co.',
    poId: 'PO-2024-009',
    grnId: undefined,
    date: '2024-01-24',
    amountExGst: 3051,
    gstAmount: 549,
    totalAmount: 3600,
    status: 'Exception',
    exceptionType: 'Duplicate Invoice detected',
    flaggedOn: '2024-01-24'
  },
  {
    id: 'INV-2024-008',
    vendorName: 'Metro Accessories',
    poId: 'PO-2024-010',
    grnId: undefined,
    date: '2024-01-27',
    amountExGst: 12458,
    gstAmount: 2242,
    totalAmount: 14700,
    status: 'Pending Booking'
  }
];

export const INITIAL_CONTRACTS: Contract[] = [
  { vendorName: 'Ramesh Traders', startDate: '2024-01-01', endDate: '2024-12-31', daysLeft: 345, slaTerms: '3-day delivery. Late fees 1% per day.', status: 'Active' },
  { vendorName: 'Bengal Auto Supplies', startDate: '2024-01-01', endDate: '2024-06-30', daysLeft: 162, slaTerms: '5-day delivery. Return of defective parts within 7 days.', status: 'Active' },
  { vendorName: 'Howrah Tyres Ltd.', startDate: '2023-07-01', endDate: '2024-01-31', daysLeft: 7, slaTerms: '2-day delivery. Manufacturer warranty documents included.', status: 'Expiring Soon' },
  { vendorName: 'Eastern Lubricants Pvt Ltd.', startDate: '2024-01-01', endDate: '2024-12-31', daysLeft: 345, slaTerms: '3-day delivery. Minimum bulk discount of 5% applied.', status: 'Active' },
  { vendorName: 'Metro Accessories', startDate: '2023-06-01', endDate: '2024-02-15', daysLeft: 21, slaTerms: '4-day delivery. Sealed packaging mandated.', status: 'Expiring Soon' },
  { vendorName: 'New Town Auto Parts', startDate: '2024-01-15', endDate: '2025-01-14', daysLeft: 360, slaTerms: '5-day delivery. Replacement within 3 days for defects.', status: 'Active' },
  { vendorName: 'Jadavpur Hardware', startDate: '2023-09-01', endDate: '2024-08-31', daysLeft: 224, slaTerms: '2-day delivery. All bulk tooling needs supported.', status: 'Active' },
  { vendorName: 'Diamond Harbour Oils', startDate: '2023-12-01', endDate: '2024-11-30', daysLeft: 305, slaTerms: '3-day delivery. Industrial grade seals only.', status: 'Active' }
];

export const INITIAL_PAYMENT_BATCHES: PaymentBatch[] = [
  { id: 'BATCH-2024-001', vendorName: 'Ramesh Traders', invoiceCount: 1, amount: 12000, dueDate: '2024-01-28', status: 'Approved' },
  { id: 'BATCH-2024-002', vendorName: 'Eastern Lubricants Pvt Ltd.', invoiceCount: 1, amount: 6200, dueDate: '2024-01-20', status: 'Approved' },
  { id: 'BATCH-2024-003', vendorName: 'New Town Auto Parts + Jadavpur Hardware', invoiceCount: 2, amount: 14300, dueDate: '2024-02-01', status: 'Pending Approval' },
  { id: 'BATCH-2024-004', vendorName: 'Metro Accessories', invoiceCount: 1, amount: 14700, dueDate: '2024-02-05', status: 'Pending Approval' },
  { id: 'BATCH-2024-005', vendorName: 'Howrah Tyres Ltd.', invoiceCount: 1, amount: 28000, dueDate: '2024-02-10', status: 'Pending Approval' }
];
