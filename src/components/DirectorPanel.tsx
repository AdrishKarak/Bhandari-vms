import React, { useState } from 'react';
import { 
  Building2, Users, FileText, TrendingUp, Search, Filter, 
  Eye, Check, X, ShieldAlert, AlertTriangle, CheckCircle2, ChevronRight, UserPlus,
  ArrowLeft
} from 'lucide-react';
import { Vendor, Requisition, RFQ, PurchaseOrder, GRN, Invoice, Contract, PaymentBatch, User, Location } from '../types';
import SharedShell from './SharedShell';

// Map of comprehensive default onboarding drafts for default pipeline candidates
const ONBOARDING_METADATA_MAP: Record<string, any> = {
  O1: {
    businessName: 'North Bengal Filters',
    tradeName: 'NB Filters & Spares',
    businessType: 'Partnership',
    yearsInOperation: 8,
    coverage: ['Kolkata HQ', 'Howrah Branch'],
    reputationNotes: 'Clean market standing, major distributor in North Bengal.',
    complianceNotes: 'All GST filings match. Nil defaults.',
    stability: 'Low Risk',
    blacklistCheck: 'Clear',
    approvedGst: '19AABCU9611R1ZF',
    pan: 'AABCU9611R',
    slaTerms: 'Delivery within 3 business days, replacement within 24 hours of defects.',
    pricingNotes: 'Fixed trade discount of 15% on wholesale filter cartridges.',
    directorRemarks: '',
    bankName: 'State Bank of India',
    bankAccount: '30491084201',
    bankIfsc: 'SBIN0001235',
    contactName: 'Ratan Das',
    contactPhone: '+91 98310 12345',
    contactEmail: 'sales@nbfilters.com',
    commodityCategory: 'Spare Parts',
    paymentTerms: 'Net 30',
    creditPeriod: 30,
    regulatoryStatus: 'Fully Compliant',
    securityStatus: 'Pass',
    gstCertFile: 'GST_Reg_Certificate_signed.pdf',
    chequeFile: 'Cancelled_Cheque_NB.pdf',
    financialFile: 'Audited_Financials_FY25.pdf'
  },
  O2: {
    businessName: 'Sunrise Batteries',
    tradeName: 'Sunrise Battery Corporation',
    businessType: 'Proprietorship',
    yearsInOperation: 4,
    coverage: ['Salt Lake Branch', 'Barasat Branch'],
    reputationNotes: 'Local supplier with excellent service record for industrial lead-acid cells.',
    complianceNotes: 'GST returns active up to last quarter.',
    stability: 'Medium Risk',
    blacklistCheck: 'Clear',
    approvedGst: '19AMKPO4152A1ZG',
    pan: 'AMKPO4152A',
    slaTerms: '2-day delivery SLA. 1-year manufacturer warranty replacement guaranteed.',
    pricingNotes: 'Bulk pricing of ₹3,400 per heavy inverter battery item.',
    directorRemarks: '',
    bankName: 'HDFC Bank Ltd',
    bankAccount: '50100249150532',
    bankIfsc: 'HDFC0000014',
    contactName: 'Suresh Kumar',
    contactPhone: '+91 94330 56789',
    contactEmail: 'info@sunrisebattery.in',
    commodityCategory: 'Electricals',
    paymentTerms: 'Net 15',
    creditPeriod: 15,
    regulatoryStatus: 'Fully Compliant',
    securityStatus: 'Pass',
    gstCertFile: 'Sunrise_Tax_Cert.pdf',
    chequeFile: 'HDFC_Cheque_Sunrise.pdf',
    financialFile: 'Sunrise_P_L_Statement.pdf'
  },
  O3: {
    businessName: 'West Bengal Plastics',
    tradeName: 'WB Plastic Moulds & Parts',
    businessType: 'Private Limited',
    yearsInOperation: 12,
    coverage: ['Howrah Branch', 'Kolkata HQ'],
    reputationNotes: 'ISO 9001 certified manufacturer. Serves multiple automotive companies.',
    complianceNotes: 'Audited financials uploaded. Strong liquidity indicators.',
    stability: 'Low Risk',
    blacklistCheck: 'Clear',
    approvedGst: '19AAZCW5567B1ZN',
    pan: 'AAZCW5567B',
    slaTerms: '4-day shipping SLA. Zero-tolerance packaging defects terms.',
    pricingNotes: 'Wholesale discount: Tiered volume pricing of 5% on orders > 1000 units.',
    directorRemarks: '',
    bankName: 'ICICI Bank',
    bankAccount: '015005001243',
    bankIfsc: 'ICIC0000150',
    contactName: 'Priya Nair',
    contactPhone: '+91 82401 98765',
    contactEmail: 'procurement@wbplastics.co.in',
    commodityCategory: 'Accessories',
    paymentTerms: 'Net 45',
    creditPeriod: 45,
    regulatoryStatus: 'Fully Compliant',
    securityStatus: 'Pass',
    gstCertFile: 'WB_Plastics_GST_9V.pdf',
    chequeFile: 'ICICI_CancelledCheque_WB_Plastics.pdf',
    financialFile: 'WB_Audited_FY24_FY25.pdf'
  }
};

interface DirectorPanelProps {
  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
  requisitions: Requisition[];
  setRequisitions: React.Dispatch<React.SetStateAction<Requisition[]>>;
  rfqs: RFQ[];
  setRfqs: React.Dispatch<React.SetStateAction<RFQ[]>>;
  pos: PurchaseOrder[];
  setPos: React.Dispatch<React.SetStateAction<PurchaseOrder[]>>;
  grns: GRN[];
  setGrns: React.Dispatch<React.SetStateAction<GRN[]>>;
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  contracts: Contract[];
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
  paymentBatches: PaymentBatch[];
  setPaymentBatches: React.Dispatch<React.SetStateAction<PaymentBatch[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onBack: () => void;
}

export default function DirectorPanel({
  vendors,
  setVendors,
  requisitions,
  setRequisitions,
  rfqs,
  setRfqs,
  pos,
  setPos,
  grns,
  setGrns,
  invoices,
  setInvoices,
  contracts,
  setContracts,
  paymentBatches,
  setPaymentBatches,
  users,
  setUsers,
  onBack
}: DirectorPanelProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // AVL Substates
  const [avlSearch, setAvlSearch] = useState('');
  const [avlCategory, setAvlCategory] = useState('All');
  const [avlStatus, setAvlStatus] = useState('All');
  const [selectedVendorForView, setSelectedVendorForView] = useState<Vendor | null>(null);
  const [vendorDetailTab, setVendorDetailTab] = useState<'overview' | 'documents' | 'transactions' | 'pricing' | 'remarks'>('overview');

  // Onboarding pipeline substates
  const [onboardingPipeline, setOnboardingPipeline] = useState([
    { id: 'O1', name: 'North Bengal Filters', step: 3, daysPending: 4, category: 'Spare Parts' },
    { id: 'O2', name: 'Sunrise Batteries', step: 2, daysPending: 2, category: 'Electricals' },
    { id: 'O3', name: 'West Bengal Plastics', step: 5, daysPending: 7, category: 'Accessories' }
  ]);
  const [activeOnboardingId, setActiveOnboardingId] = useState('O1');

  // Interactive Director Dashboard Chart Selections
  const [selectedContractBar, setSelectedContractBar] = useState<'Ramesh' | 'Bengal' | 'Howrah' | 'Metro'>('Howrah');
  const [selectedAuditQuarter, setSelectedAuditQuarter] = useState<'Q3' | 'Q4' | 'Q1'>('Q1');
  
  // Stepper state for edited vendor
  const [obForm, setObForm] = useState({
    businessName: 'North Bengal Filters',
    tradeName: 'NB Filters & Spares',
    businessType: 'Partnership',
    yearsInOperation: 8,
    coverage: ['Kolkata HQ', 'Howrah Branch'],
    reputationNotes: 'Clean market standing, major distributor in North Bengal.',
    complianceNotes: 'All GST filings match. Nil defaults.',
    stability: 'Low Risk',
    blacklistCheck: 'Clear',
    approvedGst: '19AABCU9611R1ZF',
    pan: 'AABCU9611R',
    slaTerms: 'Delivery within 3 business days, replacement within 24 hours of defects.',
    pricingNotes: 'Fixed trade discount of 15% on wholesale filter cartridges.',
    directorRemarks: '',
    
    // Step 5 Bank & system setups
    bankName: 'State Bank of India',
    bankAccount: '30491084201',
    bankIfsc: 'SBIN0001235',
    contactName: 'Ratan Das',
    contactPhone: '+91 98310 12345',
    contactEmail: 'sales@nbfilters.com',
    commodityCategory: 'Spare Parts',
    paymentTerms: 'Net 30',
    creditPeriod: 30,
    
    // Step 3 advanced checks
    regulatoryStatus: 'Fully Compliant',
    securityStatus: 'Pass',
    
    // Uploads
    gstCertFile: 'GST_Reg_Certificate_signed.pdf',
    chequeFile: 'Cancelled_Cheque_NB.pdf',
    financialFile: 'Audited_Financials_FY25.pdf'
  });

  const [onboardingCompleteMsg, setOnboardingCompleteMsg] = useState('');

  // Brand-new, highly complete independent custom onboarding form state
  const [coForm, setCoForm] = useState({
    businessName: '',
    tradeName: '',
    businessType: 'Private Limited',
    yearsInOperation: 5,
    coverage: ['Kolkata HQ'],
    reputationNotes: 'Independently registered via secure portal.',
    complianceNotes: 'Self-declared compliance matched.',
    stability: 'Low Risk',
    blacklistCheck: 'Clear',
    approvedGst: '',
    pan: '',
    registrationIncorpDate: '2021-03-15',
    cinNumber: '',
    factoryAddress: '',
    logisticsRegion: 'Kolkata Regional Subhub',
    msmeClassification: 'Micro Enterprise (Udyam)',
    isoStandard: 'ISO 9001:2015 Certification',
    currencyOption: 'INR (₹)',
    bankName: '',
    bankAccount: '',
    bankIfsc: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    commodityCategory: 'Spare Parts',
    paymentTerms: 'Net 30',
    creditPeriod: 30,
    leadSourcingRep: '',
    escalationEmail: '',
    netZeroCode: '',
    sustainabilityPledge: true,
    verificationCode: '',
  });

  // Contracts view
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [contractFilterStatus, setContractFilterStatus] = useState('All');

  // Price Intel Alerts
  const [gmAlertMsg, setGmAlertMsg] = useState('');

  // System Users Substates
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'Team',
    location: 'Kolkata HQ' as Location,
    status: 'Active' as 'Active' | 'Inactive',
    empId: '',
    phone: '',
    department: 'Procurement',
    mfaEnabled: true,
    privileges: ['Requisition Creation & Submission'] as string[]
  });
  const [userSuccessMsg, setUserSuccessMsg] = useState('');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Building2 className="w-4 h-4" /> },
    { id: 'avl', label: 'Vendor List (AVL)', icon: <Users className="w-4 h-4" /> },
    { id: 'onboarding', label: 'Vendor Onboarding', icon: <ChevronRight className="w-4 h-4" /> },
    { id: 'contracts', label: 'Contracts & SLAs', icon: <FileText className="w-4 h-4" /> },
    { id: 'priceIntelligence', label: 'Price Intelligence', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'users', label: 'System Users', icon: <Users className="w-4 h-4" /> }
  ];

  // Logic calculation
  const activePipelineItems = [
    ...onboardingPipeline,
    ...vendors
      .filter(v => v.status === 'Pending Onboarding' && v.id !== 'V011' && !onboardingPipeline.some(p => p.id === v.id))
      .map(v => ({
        id: v.id,
        name: v.name,
        step: 1,
        daysPending: 1,
        category: v.category || 'Spare Parts'
      }))
  ];

  const totalAvalCount = vendors.filter(v => v.status === 'Active').length;
  const pendingOnboardCount = activePipelineItems.length;
  const expiringContractsCount = contracts.filter(c => c.status === 'Expiring Soon').length;

  return (
    <SharedShell
      role="Director"
      roleColor="#0D9488"
      roleBadgeBg="bg-teal-50"
      roleBadgeText="text-teal-700"
      sidebarItems={sidebarItems}
      currentPage={currentPage === 'customOnboarding' ? 'onboarding' : currentPage}
      setCurrentPage={(p) => {
        setCurrentPage(p);
        setSelectedVendorForView(null);
      }}
      onBack={onBack}
      userName="Arun Bhandari"
      userBranch="Kolkata HQ"
    >
      {/* 1. DIRECTOR > DASHBOARD */}
      {currentPage === 'dashboard' && (
        <div id="director-dashboard-page">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Director Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Vendor governance, AVL, contracts & onboarding</p>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Total Vendors on AVL</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{totalAvalCount}</div>
              <p className="text-xs text-gray-500 mt-1">8 categories covered</p>
            </div>
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Pending Onboard Intake</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{pendingOnboardCount}</div>
              <p className="text-xs text-amber-600 font-semibold mt-1">Awaiting Director sign-off</p>
            </div>
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Contracts Expiring (30 days)</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{expiringContractsCount}</div>
              <p className="text-xs text-red-600 font-semibold mt-1">Howrah Tyres, Metro Accessories</p>
            </div>
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Price Anomalies Flagged</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">5</div>
              <p className="text-xs text-rose-600 font-semibold mt-1">Cross-location variance &gt; 10%</p>
            </div>
          </div>

          {/* Director Visual Portfolio Row - Spacious & elegant borders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 text-neutral-850">
            {/* Chart 1: Global Contract Expiration Timeline */}
            <div className="bg-white border border-gray-250 rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Global Service SLA timeline</h3>
                  <span className="text-[10px] bg-red-50 text-red-700 font-extrabold px-2.5 py-1 rounded border border-red-100">Critical Expirations</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Active days remaining. Click on any dealer bar to load security compliance logs.
                </p>
              </div>

              {/* Custom Horizontal interactive rows representing days remaining */}
              <div className="mt-8 space-y-5">
                {/* 1 */}
                <button 
                  onClick={() => setSelectedContractBar('Ramesh')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all block focus:outline-none focus:ring-1 focus:ring-teal-100 ${selectedContractBar === 'Ramesh' ? 'bg-teal-50/50 border-teal-200' : 'border-gray-100 hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between text-xs font-bold text-neutral-800 mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Ramesh Traders (Lubricants)
                    </span>
                    <span className="font-mono text-gray-405">345 Days Remaining</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: '94%' }} />
                  </div>
                </button>

                {/* 2 */}
                <button 
                  onClick={() => setSelectedContractBar('Bengal')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all block focus:outline-none focus:ring-1 focus:ring-teal-100 ${selectedContractBar === 'Bengal' ? 'bg-teal-50/50 border-teal-200' : 'border-gray-100 hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between text-xs font-bold text-neutral-800 mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Bengal Auto Supplies (Spare Parts)
                    </span>
                    <span className="font-mono text-gray-405">162 Days Remaining</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: '44%' }} />
                  </div>
                </button>

                {/* 3 */}
                <button 
                  onClick={() => setSelectedContractBar('Howrah')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all block focus:outline-none focus:ring-1 focus:ring-teal-100 ${selectedContractBar === 'Howrah' ? 'bg-teal-50/50 border-teal-205' : 'border-gray-100 hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between text-xs font-bold text-neutral-850 mb-2">
                    <span className="flex items-center gap-1.5 text-red-700 font-extrabold">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Howrah Tyres Ltd. (Tyres)
                    </span>
                    <span className="font-mono text-red-650 font-extrabold">7 Days Remaining (Critical)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full transition-all" style={{ width: '5%' }} />
                  </div>
                </button>

                {/* 4 */}
                <button 
                  onClick={() => setSelectedContractBar('Metro')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all block focus:outline-none focus:ring-1 focus:ring-teal-100 ${selectedContractBar === 'Metro' ? 'bg-teal-50/50 border-teal-200' : 'border-gray-100 hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between text-xs font-bold text-neutral-800 mb-2">
                    <span className="flex items-center gap-1.5 text-amber-805">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Metro Accessories (Electricals)
                    </span>
                    <span className="font-mono text-amber-600">21 Days Remaining</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: '12%' }} />
                  </div>
                </button>
              </div>

              {/* Dynamic feedback pane below the contract bar list */}
              <div className="mt-5 bg-teal-50/40 border border-teal-100 p-4 rounded-lg text-xs">
                <span className="block text-[9.5px] font-extrabold text-teal-800 uppercase tracking-widest mb-1">
                  Contract Selected: <strong>{selectedContractBar} Details</strong>
                </span>
                {selectedContractBar === 'Ramesh' && <p className="text-gray-650">✓ Ramesh Traders holds clean pricing parity. No compliance drifts flagged. Premium priority classification in AVL.</p>}
                {selectedContractBar === 'Bengal' && <p className="text-gray-650">✓ Bengal Auto Supplies GSTR matched at 100% precision. Service SLA verified at 94% on-site completion speed.</p>}
                {selectedContractBar === 'Howrah' && <p className="text-red-700 font-medium">⚠️ Renewal action required immediately. Contract expires next week. Negotiation rates must remain within the 8% statutory benchmark.</p>}
                {selectedContractBar === 'Metro' && <p className="text-amber-800 font-medium">⚠ Expiration approaching (21 days remaining). Initiating auto-renewal protocol under digital token parameters.</p>}
              </div>
            </div>

            {/* Chart 2: Dual Sign-off Compliance Match Rates */}
            <div className="bg-white border border-gray-250 rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Corporate Integrity Match Index</h3>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2.5 py-1 rounded border border-blue-150">GSTR-2B Verified</span>
                </div>
                <p className="text-[11px] text-gray-550 mt-1">
                  Historical verification rates on statutory GST audits. Click on active markers to view audits.
                </p>
              </div>

              {/* Custom SVG Spark-wave Area chart */}
              <div className="mt-6 flex-1 flex flex-col justify-center">
                <div className="relative w-full h-36 bg-slate-50/50 rounded-xl border border-slate-100 p-2">
                  {/* Grid Lines */}
                  <div className="absolute inset-x-2 inset-y-4 flex flex-col justify-between pointer-events-none text-gray-100">
                    <div className="border-t border-gray-100 w-full" />
                    <div className="border-t border-gray-100 w-full" />
                    <div className="border-b border-gray-200 w-full" />
                  </div>

                  <svg className="w-full h-full overflow-visible" viewBox="0 0 350 144" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="dirGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0d9488" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#0d9488" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 10 130 L 10 90 Q 60 40 120 70 T 230 20 T 340 50 L 340 130 Z"
                      fill="url(#dirGrad)"
                    />
                    <path
                      d="M 10 90 Q 60 40 120 70 T 230 20 T 340 50"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="3.5"
                    />
                    {/* Clickable Dots */}
                    <circle cx="10" cy="90" r={selectedAuditQuarter === 'Q3' ? '8' : '5'} className="cursor-pointer transition-all" fill={selectedAuditQuarter === 'Q3' ? '#115e59' : '#0d9488'} stroke="#fff" strokeWidth="2.5" onClick={() => setSelectedAuditQuarter('Q3')} />
                    <circle cx="120" cy="70" r={selectedAuditQuarter === 'Q4' ? '8' : '5'} className="cursor-pointer transition-all" fill={selectedAuditQuarter === 'Q4' ? '#115e59' : '#0d9488'} stroke="#fff" strokeWidth="2.5" onClick={() => setSelectedAuditQuarter('Q4')} />
                    <circle cx="230" cy="20" r={selectedAuditQuarter === 'Q1' ? '8' : '5'} className="cursor-pointer transition-all" fill={selectedAuditQuarter === 'Q1' ? '#115e59' : '#10b981'} stroke="#fff" strokeWidth="2.5" onClick={() => setSelectedAuditQuarter('Q1')} />
                    <circle cx="340" cy="50" r="5" fill="#9ca3af" stroke="#fff" strokeWidth="1.5" />
                  </svg>
                </div>

                <div className="mt-5 flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                  <button onClick={() => setSelectedAuditQuarter('Q3')} className={`focus:outline-none ${selectedAuditQuarter === 'Q3' ? 'text-teal-700 underline font-extrabold' : ''}`}>Q3 Audit Logs</button>
                  <button onClick={() => setSelectedAuditQuarter('Q4')} className={`focus:outline-none ${selectedAuditQuarter === 'Q4' ? 'text-teal-700 underline font-extrabold' : ''}`}>Q4 Audit Logs</button>
                  <button onClick={() => setSelectedAuditQuarter('Q1')} className={`focus:outline-none ${selectedAuditQuarter === 'Q1' ? 'text-teal-700 underline font-extrabold' : ''}`}>Q1 Current (98.4%)</button>
                </div>

                {/* Audit details card displaying high-contrast stats info */}
                <div className="mt-4 bg-slate-50 border border-slate-200/50 p-4 rounded-lg text-xs leading-relaxed">
                  <div className="flex items-center justify-between font-bold text-gray-500 mb-1">
                    <span className="uppercase text-[9px] tracking-widest text-slate-400">Quarter Status ({selectedAuditQuarter})</span>
                    <span className="font-mono text-[10px] text-teal-800">Verified GSTR Ledger</span>
                  </div>
                  {selectedAuditQuarter === 'Q3' && <p className="text-gray-600">✓ <strong>94.2% Success Match Ratio</strong>. Addressed minor GSTR discrepancies for 2 small-scale accessories dealerships. No permanent ledger drifts logged.</p>}
                  {selectedAuditQuarter === 'Q4' && <p className="text-gray-600">✓ <strong>96.8% Success Match Ratio</strong>. Multi-location purchase entries reconciled with perfect physical GRN logs. Tax filing compliant.</p>}
                  {selectedAuditQuarter === 'Q1' && <p className="text-gray-600">✓ <strong>98.4% Exceptional Rate</strong>. Live API integration match successful across all 12 active AVL vendors. Prime compliance rating maintained.</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Two Columns Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            {/* Left side (col-span-3) - Pending Onboarding */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded p-6 shadow-sm">
              <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-4">Pending Onboarding Sign-offs</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                      <th className="p-3">Vendor Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Days Pending</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePipelineItems.map((obj) => (
                      <tr key={obj.id} className="border-b border-gray-200 hover:bg-gray-50/50">
                        <td className="p-3 text-sm font-semibold text-gray-900">{obj.name}</td>
                        <td className="p-3 text-xs text-gray-600 uppercase font-medium">{obj.category}</td>
                        <td className="p-3 text-sm font-mono text-gray-500">{obj.daysPending} days</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setActiveOnboardingId(obj.id);
                              const matchVendor = vendors.find(v => v.id === obj.id);
                              if (matchVendor) {
                                setObForm({
                                  businessName: matchVendor.name,
                                  tradeName: matchVendor.name + ' Trade',
                                  businessType: matchVendor.accountType || 'Private Limited',
                                  yearsInOperation: 5,
                                  coverage: matchVendor.locations || ['Kolkata HQ'],
                                  reputationNotes: 'Dossier gathered and prepared by Department/Team.',
                                  complianceNotes: 'Self-declared compliance matched.',
                                  stability: 'Low Risk',
                                  blacklistCheck: 'Clear',
                                  approvedGst: matchVendor.gstin || '',
                                  pan: matchVendor.pan || '',
                                  registrationIncorpDate: '2021-03-15',
                                  cinNumber: '',
                                  factoryAddress: '',
                                  logisticsRegion: 'Kolkata Regional Subhub',
                                  commodityCategory: matchVendor.category || 'Spare Parts',
                                  paymentTerms: matchVendor.paymentTerms || 'Net 30',
                                  creditPeriod: Number(matchVendor.creditPeriod?.replace(/\D/g, '') || 30),
                                  directorRemarks: '',
                                  bankName: matchVendor.bankName || '',
                                  bankAccount: matchVendor.bankAccount || '',
                                  bankIfsc: matchVendor.ifsc || '',
                                  contactName: matchVendor.contactName || '',
                                  contactPhone: matchVendor.phone || '',
                                  contactEmail: matchVendor.email || '',
                                  regulatoryStatus: 'Fully Compliant',
                                  securityStatus: 'Pass',
                                  gstCertFile: 'GST_Reg_Certificate_signed.pdf',
                                  chequeFile: 'Cancelled_Cheque_NB.pdf',
                                  financialFile: 'Audited_Financials_FY25.pdf'
                                });
                              } else {
                                const pref = ONBOARDING_METADATA_MAP[obj.id] || ONBOARDING_METADATA_MAP['O1'];
                                setObForm({ ...pref, directorRemarks: '' });
                              }
                              setCurrentPage('onboarding');
                            }}
                            className="bg-blue-600 text-white font-medium px-3 h-7 rounded hover:bg-blue-700 text-xs tracking-wider uppercase cursor-pointer"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right side (col-span-2) - Credit Cycle Alerts */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded p-6 shadow-sm">
              <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-4">Credit Cycle Alerts</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div>
                    <div className="text-sm font-semibold text-gray-950">Ramesh Traders</div>
                    <div className="text-xs text-gray-500 mt-0.5">Outstanding: ₹18,000</div>
                  </div>
                  <span className="text-xs uppercase tracking-wide rounded px-2 py-0.5 font-medium text-amber-700 bg-amber-50">
                    Due in 12 days
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div>
                    <div className="text-sm font-semibold text-gray-950">Bengal Auto Supplies</div>
                    <div className="text-xs text-gray-500 mt-0.5">Outstanding: ₹22,400</div>
                  </div>
                  <span className="text-xs uppercase tracking-wide rounded px-2 py-0.5 font-medium text-red-600 bg-red-50">
                    Overdue 5 days
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div>
                    <div className="text-sm font-semibold text-gray-950">Howrah Tyres</div>
                    <div className="text-xs text-gray-500 mt-0.5">Outstanding: ₹28,000</div>
                  </div>
                  <span className="text-xs uppercase tracking-wide rounded px-2 py-0.5 font-medium text-red-600 bg-red-50">
                    Overdue 3 days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-950">Eastern Lubricants</div>
                    <div className="text-xs text-gray-500 mt-0.5">Outstanding: ₹6,200</div>
                  </div>
                  <span className="text-xs uppercase tracking-wide rounded px-2 py-0.5 font-medium text-green-700 bg-green-50">
                    OK (28d left)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location wise Spend */}
          <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-4">Location-wise Spend — This Month</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-3 font-semibold">Location</th>
                    <th className="p-3 font-semibold text-center">Active Requisitions</th>
                    <th className="p-3 font-semibold text-right">Total PO Value Issued</th>
                    <th className="p-3 font-semibold">Top Category / Vendor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 h-11 hover:bg-gray-50/30">
                    <td className="p-3 text-sm text-gray-900 font-semibold">Kolkata HQ</td>
                    <td className="p-3 text-sm text-center font-mono">6</td>
                    <td className="p-3 text-sm text-right font-mono font-semibold">₹89,400</td>
                    <td className="p-3 text-xs text-gray-600">Lubricants — Ramesh Traders</td>
                  </tr>
                  <tr className="border-b border-gray-200 h-11 hover:bg-gray-50/30">
                    <td className="p-3 text-sm text-gray-900 font-semibold">Salt Lake Branch</td>
                    <td className="p-3 text-sm text-center font-mono">3</td>
                    <td className="p-3 text-sm text-right font-mono font-semibold">₹41,200</td>
                    <td className="p-3 text-xs text-gray-600">Accessories — Metro Accessories</td>
                  </tr>
                  <tr className="border-b border-gray-200 h-11 hover:bg-gray-50/30">
                    <td className="p-3 text-sm text-gray-900 font-semibold">Howrah Branch</td>
                    <td className="p-3 text-sm text-center font-mono">4</td>
                    <td className="p-3 text-sm text-right font-mono font-semibold">₹52,600</td>
                    <td className="p-3 text-xs text-gray-600">Spare Parts — New Town Auto Parts</td>
                  </tr>
                  <tr className="border-b border-gray-200 h-11 hover:bg-gray-50/30">
                    <td className="p-3 text-sm text-gray-900 font-semibold">Barasat Branch</td>
                    <td className="p-3 text-sm text-center font-mono">2</td>
                    <td className="p-3 text-sm text-right font-mono font-semibold">₹18,000</td>
                    <td className="p-3 text-xs text-gray-600">Lubricants — Bengal Auto Supplies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. DIRECTOR > VENDOR LIST (AVL) */}
      {currentPage === 'avl' && !selectedVendorForView && (
        <div id="avl-view">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Approved Vendor List (AVL)</h1>
              <p className="text-sm text-gray-500 mt-1">Official registered and vetted vendors for Barasat, Salt Lake, Howrah, and Kolkata HQ</p>
            </div>
            <button 
              onClick={() => {
                setCoForm({
                  businessName: '',
                  tradeName: '',
                  businessType: 'Private Limited',
                  yearsInOperation: 5,
                  coverage: ['Kolkata HQ'],
                  reputationNotes: 'Independently registered via secure portal.',
                  complianceNotes: 'Self-declared compliance matched.',
                  stability: 'Low Risk',
                  blacklistCheck: 'Clear',
                  approvedGst: '',
                  pan: '',
                  registrationIncorpDate: '2021-03-15',
                  cinNumber: '',
                  factoryAddress: '',
                  logisticsRegion: 'Kolkata Regional Subhub',
                  msmeClassification: 'Micro Enterprise (Udyam)',
                  isoStandard: 'ISO 9001:2015 Certification',
                  currencyOption: 'INR (₹)',
                  bankName: '',
                  bankAccount: '',
                  bankIfsc: '',
                  contactName: '',
                  contactPhone: '',
                  contactEmail: '',
                  commodityCategory: 'Spare Parts',
                  paymentTerms: 'Net 30',
                  creditPeriod: 30,
                  leadSourcingRep: '',
                  escalationEmail: '',
                  netZeroCode: '',
                  sustainabilityPledge: true,
                  verificationCode: '',
                });
                setCurrentPage('customOnboarding');
              }}
              className="bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase px-4 h-9 rounded hover:bg-blue-700 cursor-pointer"
            >
              + Add Vendor
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white border border-gray-200 rounded p-4 mb-5 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendor name or ID..."
                value={avlSearch}
                onChange={(e) => setAvlSearch(e.target.value)}
                className="w-full pl-9 h-9 border border-gray-200 bg-white rounded text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 uppercase tracking-wider font-semibold">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              Category
            </div>
            <select
              value={avlCategory}
              onChange={(e) => setAvlCategory(e.target.value)}
              className="h-9 border border-gray-200 bg-white rounded px-3 text-sm focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Lubricants">Lubricants</option>
              <option value="Spare Parts">Spare Parts</option>
              <option value="Tyres">Tyres</option>
              <option value="Electricals">Electricals</option>
              <option value="Accessories">Accessories</option>
              <option value="Tools">Tools</option>
            </select>
            
            <div className="flex items-center gap-1.5 text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Status
            </div>
            <select
              value={avlStatus}
              onChange={(e) => setAvlStatus(e.target.value)}
              className="h-9 border border-gray-200 bg-white rounded px-3 text-sm focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>

            <button 
              onClick={() => alert("AVL exported to Excel format successfully.")}
              className="bg-white border border-gray-200 text-gray-700 font-semibold text-xs tracking-wider uppercase px-3 h-9 rounded hover:bg-gray-50 ml-auto cursor-pointer"
            >
              Export Excel
            </button>
          </div>

          {/* Vendors Table */}
          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-3 w-20">ID</th>
                    <th className="p-3">Vendor Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">GSTIN</th>
                    <th className="p-3">Credit Terms</th>
                    <th className="p-3">Locations</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors
                    .filter((v) => {
                      const matchesSearch = v.name.toLowerCase().includes(avlSearch.toLowerCase()) || v.id.toLowerCase().includes(avlSearch.toLowerCase());
                      const matchesCat = avlCategory === 'All' || v.category === avlCategory;
                      const matchesStatus = avlStatus === 'All' || v.status === avlStatus;
                      return matchesSearch && matchesCat && matchesStatus;
                    })
                    .map((vendor) => {
                      let statusStyle = "text-green-700 bg-green-50";
                      if (vendor.status === 'Pending') statusStyle = "text-amber-700 bg-amber-50";
                      if (vendor.status === 'Suspended') statusStyle = "text-red-700 bg-red-50";
                      if (vendor.status === 'Pending Onboarding') statusStyle = "text-gray-600 bg-gray-100";

                      return (
                        <tr key={vendor.id} className="border-b border-gray-200 h-12 hover:bg-gray-50/50">
                          <td className="p-3 text-xs font-mono font-semibold text-gray-500">{vendor.id}</td>
                          <td className="p-3 text-sm font-semibold text-gray-900">{vendor.name}</td>
                          <td className="p-3 text-xs font-medium text-gray-600 uppercase">{vendor.category}</td>
                          <td className="p-3 text-xs font-mono text-gray-500">{vendor.gstin || '—'}</td>
                          <td className="p-3 text-xs font-medium text-gray-700">{vendor.creditPeriod || 'Cash/Advance'}</td>
                          <td className="p-3 text-xs text-gray-500 max-w-[150px] truncate">{vendor.locations.join(', ')}</td>
                          <td className="p-3">
                            <span className={`text-[10px] uppercase tracking-wide rounded px-2 py-0.5 font-semibold ${statusStyle}`}>
                              {vendor.status}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => {
                                setSelectedVendorForView(vendor);
                                setVendorDetailTab('overview');
                              }}
                              className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest px-2 py-1 cursor-pointer"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VENDOR DETAILED PROFILE VIEW (INLINE IN CELL) */}
      {currentPage === 'avl' && selectedVendorForView && (
        <div id="vendor-profile-panel" className="bg-white border border-gray-200 rounded p-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-5">
            <button
               onClick={() => setSelectedVendorForView(null)}
               className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-800"
            >
              ← Back to AVL
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-gray-900">{selectedVendorForView.name}</span>
              <span className="text-xs font-mono text-gray-400">({selectedVendorForView.id})</span>
              <span className={`text-[10px] uppercase tracking-wide rounded px-2 py-0.5 font-semibold ${
                selectedVendorForView.status === 'Active' ? 'text-green-700 bg-green-50' : selectedVendorForView.status === 'Suspended' ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'
              }`}>
                {selectedVendorForView.status}
              </span>
            </div>
            <div>
              <button 
                onClick={() => alert('Vendor status update mode.')}
                className="bg-white border border-gray-200 text-gray-700 font-semibold text-xs tracking-wider uppercase px-3 h-8 rounded hover:bg-gray-50"
              >
                Modify Vendor Terms
              </button>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="flex border-b border-gray-200 mb-6 gap-2">
            {(['overview', 'documents', 'transactions', 'pricing', 'remarks'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setVendorDetailTab(tab)}
                className={`py-2 px-3 text-xs uppercase tracking-wide font-semibold border-b-2 cursor-pointer transition-all ${
                  vendorDetailTab === tab 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content OVERVIEW */}
          {vendorDetailTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50/50 border border-gray-200 p-5 rounded">
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3.5">Contact Information</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">Contact Name</span> <span className="text-gray-900 font-medium">{selectedVendorForView.contactName || '—'}</span></div>
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">Phone</span> <span className="text-gray-900 font-mono">{selectedVendorForView.phone || '—'}</span></div>
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">Email</span> <span className="text-gray-900 font-mono">{selectedVendorForView.email || '—'}</span></div>
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">GSTIN</span> <span className="text-gray-900 font-mono">{selectedVendorForView.gstin || '—'}</span></div>
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">PAN</span> <span className="text-gray-900 font-mono">{selectedVendorForView.pan || '—'}</span></div>
                </div>
              </div>

              <div className="bg-gray-50/50 border border-gray-200 p-5 rounded">
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3.5">Banking & Terms</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">Bank Name</span> <span className="text-gray-900 font-medium">{selectedVendorForView.bankName || '—'}</span></div>
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">Account Number</span> <span className="text-gray-900 font-mono">{selectedVendorForView.bankAccount ? `XXXX XXXX ${selectedVendorForView.bankAccount.slice(-4)}` : '—'}</span></div>
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">IFSC Code</span> <span className="text-gray-900 font-mono">{selectedVendorForView.ifsc || '—'}</span></div>
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">Account Type</span> <span className="text-gray-900">{selectedVendorForView.accountType || 'Current'}</span></div>
                  <div className="flex justify-between py-1 border-b border-gray-150"><span className="text-gray-400 uppercase font-semibold">Credit Period</span> <span className="text-gray-900">{selectedVendorForView.creditPeriod || '0 days (advance)'}</span></div>
                </div>
              </div>

              <div className="md:col-span-2 bg-gray-50/50 border border-gray-200 p-5 rounded">
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Approved Categories & Coverage</h3>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs uppercase tracking-wider bg-gray-100 text-gray-700 px-2.5 py-1 rounded font-medium">
                    {selectedVendorForView.category}
                  </span>
                </div>
                <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">Branches Served</h4>
                <div className="flex gap-2">
                  {selectedVendorForView.locations.map((loc, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">{loc}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content DOCUMENTS */}
          {vendorDetailTab === 'documents' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-3">Document Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Uploaded Date</th>
                    <th className="p-3">Uploaded By</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 text-xs h-10">
                    <td className="p-3 font-medium text-gray-900">GST Registration Certificate.pdf</td>
                    <td className="p-3 text-gray-600">GST Registration</td>
                    <td className="p-3 text-gray-500 font-mono">2024-01-05</td>
                    <td className="p-3 text-gray-600">Ratan Das</td>
                    <td className="p-3 text-right text-blue-600 hover:underline cursor-pointer">Download</td>
                  </tr>
                  <tr className="border-b border-gray-200 text-xs h-10">
                    <td className="p-3 font-medium text-gray-900">Cancelled Cheque Copy.pdf</td>
                    <td className="p-3 text-gray-600">Bank Details Verification</td>
                    <td className="p-3 text-gray-500 font-mono">2024-01-05</td>
                    <td className="p-3 text-gray-600">Ratan Das</td>
                    <td className="p-3 text-right text-blue-600 hover:underline cursor-pointer">Download</td>
                  </tr>
                  <tr className="border-b border-gray-200 text-xs h-10">
                    <td className="p-3 font-medium text-gray-900">Financial Statements FY23.pdf</td>
                    <td className="p-3 text-gray-600">Balance Sheets</td>
                    <td className="p-3 text-gray-500 font-mono">2024-01-05</td>
                    <td className="p-3 text-gray-600">Ratan Das</td>
                    <td className="p-3 text-right text-blue-600 hover:underline cursor-pointer">Download</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Tab Content TRANSACTIONS */}
          {vendorDetailTab === 'transactions' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-3">PO ID</th>
                    <th className="p-3">Item Summary</th>
                    <th className="p-3 text-right">Value</th>
                    <th className="p-3">Issued Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pos
                    .filter((p) => p.vendorName === selectedVendorForView.name)
                    .map((po) => (
                      <tr key={po.id} className="border-b border-gray-200 text-xs h-10">
                        <td className="p-3 font-semibold text-gray-500 font-mono">{po.id}</td>
                        <td className="p-3 text-gray-900 font-medium">{po.itemSummary}</td>
                        <td className="p-3 text-right font-mono font-semibold">₹{po.value.toLocaleString()}</td>
                        <td className="p-3 font-mono text-gray-500">{po.issuedDate}</td>
                        <td className="p-3">
                          <span className="text-[9px] uppercase font-bold tracking-wider bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">
                            {po.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  {pos.filter((p) => p.vendorName === selectedVendorForView.name).length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-xs text-gray-400">
                        No transactions found for this vendor.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab Content PRICING */}
          {vendorDetailTab === 'pricing' && (
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-3">Item Description</th>
                    <th className="p-3">Location Served</th>
                    <th className="p-3 text-right">Last Quoted Unit Price</th>
                    <th className="p-3">Last Quote Date</th>
                    <th className="p-3 text-center">Variance to Average</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 h-10">
                    <td className="p-3 font-medium text-gray-900">Engine Oil 10W30 (Ltr)</td>
                    <td className="p-3 text-gray-500">Kolkata HQ</td>
                    <td className="p-3 text-right font-semibold font-mono">₹880</td>
                    <td className="p-3 font-mono text-gray-400">2024-01-18</td>
                    <td className="p-3 text-center text-green-700 font-medium bg-green-50">-2.2%</td>
                  </tr>
                  <tr className="border-b border-gray-200 h-10">
                    <td className="p-3 font-medium text-gray-900">Engine Oil 10W30 (Ltr)</td>
                    <td className="p-3 text-gray-500">Salt Lake Branch</td>
                    <td className="p-3 text-right font-semibold font-mono">₹920</td>
                    <td className="p-3 font-mono text-gray-400">2024-01-12</td>
                    <td className="p-3 text-center text-red-700 font-medium bg-red-50">+4.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Tab Content REMARKS */}
          {vendorDetailTab === 'remarks' && (
            <div className="space-y-4">
              <div className="text-xs p-3.5 bg-gray-50 border border-gray-200 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-900">Arun Bhandari (Director)</span>
                  <span className="text-[10px] font-mono text-gray-400">2024-01-08 14:32</span>
                </div>
                <p className="text-gray-700 mt-1">Vendor qualification complete. All legal and tax inputs comply. Moving to AVL active stream.</p>
              </div>
              <div className="text-xs p-3.5 bg-gray-50 border border-gray-200 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-900">Priya Nair (Salt Lake Branch GM)</span>
                  <span className="text-[10px] font-mono text-gray-400">2024-01-06 11:20</span>
                </div>
                <p className="text-gray-700 mt-1">SLA checks completed. Fast delivery response parameters acknowledged.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. DIRECTOR > VENDOR ONBOARDING */}
      {currentPage === 'onboarding' && (
        <div id="onboarding-stepper-view" className="space-y-6">
          <div className="flex justify-between items-start border-b border-gray-150 pb-3 mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-950 tracking-tight">Vendor Onboarding Pipeline</h1>
              <p className="text-xs text-gray-500 mt-1">6-step verification pipeline for compliance, banking, and contract validation</p>
            </div>
            <button
              onClick={() => setCurrentPage('customOnboarding')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] tracking-wider uppercase px-4 h-9 rounded shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>✦ Master Custom Registration</span>
            </button>
          </div>

          {onboardingCompleteMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-sm p-4 rounded flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>{onboardingCompleteMsg}</span>
              </div>
              <button 
                onClick={() => setOnboardingCompleteMsg('')}
                className="text-xs text-green-700 font-bold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            
            {/* Step Selection Left */}
            <div className="bg-white border border-gray-200 rounded p-4 shadow-sm self-start">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3.5">Pipeline</h2>
              <div className="space-y-2">
                {activePipelineItems.map((item) => {
                  const matchVendor = vendors.find(v => v.id === item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveOnboardingId(item.id);
                        if (matchVendor) {
                          setObForm({
                            businessName: matchVendor.name,
                            tradeName: matchVendor.name + ' Trade',
                            businessType: matchVendor.accountType || 'Private Limited',
                            yearsInOperation: 5,
                            coverage: matchVendor.locations || ['Kolkata HQ'],
                            reputationNotes: 'Dossier gathered and prepared by Department/Team.',
                            complianceNotes: 'Self-declared compliance matched.',
                            stability: 'Low Risk',
                            blacklistCheck: 'Clear',
                            approvedGst: matchVendor.gstin || '',
                            pan: matchVendor.pan || '',
                            registrationIncorpDate: '2021-03-15',
                            cinNumber: '',
                            factoryAddress: '',
                            logisticsRegion: 'Kolkata Regional Subhub',
                            commodityCategory: matchVendor.category || 'Spare Parts',
                            paymentTerms: matchVendor.paymentTerms || 'Net 30',
                            creditPeriod: Number(matchVendor.creditPeriod?.replace(/\D/g, '') || 30),
                            directorRemarks: '',
                            bankName: matchVendor.bankName || '',
                            bankAccount: matchVendor.bankAccount || '',
                            bankIfsc: matchVendor.ifsc || '',
                            contactName: matchVendor.contactName || '',
                            contactPhone: matchVendor.phone || '',
                            contactEmail: matchVendor.email || '',
                            regulatoryStatus: 'Fully Compliant',
                            securityStatus: 'Pass',
                            gstCertFile: 'GST_Reg_Certificate_signed.pdf',
                            chequeFile: 'Cancelled_Cheque_NB.pdf',
                            financialFile: 'Audited_Financials_FY25.pdf'
                          });
                        } else {
                          const pref = ONBOARDING_METADATA_MAP[item.id] || ONBOARDING_METADATA_MAP['O1'];
                          setObForm({ ...pref, directorRemarks: '' });
                        }
                      }}
                      className={`w-full p-3.5 border rounded text-left transition-colors cursor-pointer block ${
                        activeOnboardingId === item.id 
                          ? 'border-blue-600 bg-blue-50/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                      <div className="flex justify-between items-center mt-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                        <span>Step {item.step} of 6</span>
                        <span>{item.daysPending}d pending</span>
                      </div>
                    </button>
                  );
                })}

                {/* Creation mode visual helper inside pipeline */}
                {activeOnboardingId === '' && (
                  <div className="w-full p-3.5 border border-teal-600 bg-teal-50/20 rounded text-left select-none">
                    <div className="text-sm font-semibold text-teal-900">{obForm.businessName || 'New Onboarding Registration'}</div>
                    <div className="flex justify-between items-center mt-1 text-[10px] font-medium uppercase tracking-wider text-teal-600 font-bold">
                      <span>Form draft started</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step Controls Right - Fully Interactive Vertical Stepper */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded p-6 shadow-sm">
              <div className="border-b border-gray-200 pb-3.5 mb-5 flex justify-between items-center bg-gray-50/50 p-3 rounded-t border border-gray-150">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">AVL Onboarding Step-Wizard</span>
                  <h2 className="text-sm font-bold text-gray-950 mt-0.5">
                    {activeOnboardingId ? `Reviewing Candidate Draft: ${obForm.businessName}` : `New Form Onboarding Registration`}
                  </h2>
                </div>
                <span className="text-xs uppercase font-mono tracking-wider bg-gray-100 text-gray-600 px-2.5 py-1 rounded font-bold border border-gray-200">
                  {obForm.commodityCategory || (onboardingPipeline.find(o => o.id === activeOnboardingId)?.category || 'Spare Parts')}
                </span>
              </div>

              {/* Vertical Stepper UI */}
              <div className="space-y-8">
                
                {/* Step 1 - Vendor Identification */}
                <div className="flex gap-4 border-b border-gray-100 pb-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      obForm.businessName ? 'bg-teal-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {obForm.businessName ? <Check className="w-4 h-4" /> : '1'}
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 min-h-[40px] mt-1" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Step 1 — Vendor Identification & Initial Vetting</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Define corporate legal entity records, trading names, operations duration, and home branches.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 bg-gray-50/80 p-4 rounded text-xs border border-gray-150">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Legal Entity / Business Name *</label>
                        <input 
                          type="text" 
                          value={obForm.businessName} 
                          onChange={(e) => setObForm({ ...obForm, businessName: e.target.value })} 
                          placeholder="e.g. Bhandari Filters Corp"
                          className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white focus:outline-none focus:border-blue-600" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Trade/DBA Name</label>
                        <input 
                          type="text" 
                          value={obForm.tradeName} 
                          onChange={(e) => setObForm({ ...obForm, tradeName: e.target.value })} 
                          placeholder="e.g. BF Spares"
                          className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white focus:outline-none focus:border-blue-600" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Business Constitution Type</label>
                        <select 
                          value={obForm.businessType} 
                          onChange={(e) => setObForm({ ...obForm, businessType: e.target.value })}
                          className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white"
                        >
                          <option value="Proprietorship">Proprietorship</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Private Limited">Private Limited</option>
                          <option value="Public Limited">Public Limited</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Years Active in Operation</label>
                        <input 
                          type="number" 
                          value={obForm.yearsInOperation} 
                          onChange={(e) => setObForm({ ...obForm, yearsInOperation: Number(e.target.value) })}
                          min={1}
                          className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white focus:outline-none focus:border-blue-600" 
                        />
                      </div>
                      
                      <div className="col-span-1 md:col-span-2">
                        <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Coverage Branches (Operational Areas):</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {['Kolkata HQ', 'Salt Lake Branch', 'Howrah Branch', 'Barasat Branch'].map((loc) => {
                            const isChecked = obForm.coverage?.includes(loc);
                            return (
                              <label key={loc} className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-semibold cursor-pointer transition-colors ${
                                isChecked ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                              }`}>
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={isChecked}
                                  onChange={() => {
                                    const nextCov = isChecked 
                                      ? obForm.coverage.filter((c: string) => c !== loc)
                                      : [...(obForm.coverage || []), loc];
                                    setObForm({ ...obForm, coverage: nextCov });
                                  }}
                                />
                                <span>{loc}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Initial Vetting Notes / Reputation Profile</label>
                        <textarea
                          rows={2}
                          value={obForm.reputationNotes}
                          onChange={(e) => setObForm({ ...obForm, reputationNotes: e.target.value })}
                          placeholder="e.g. Screened and verified with field references. Good local market delivery records."
                          className="w-full border border-gray-200 rounded p-2 text-xs bg-white focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Qualification Documents */}
                <div className="flex gap-4 border-b border-gray-100 pb-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      obForm.approvedGst ? 'bg-teal-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {obForm.approvedGst ? <Check className="w-4 h-4" /> : '2'}
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 min-h-[40px] mt-1" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Step 2 — Qualification Documentation & Tax Verification</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Upload required KYC validation certificates, configure GSTIN IDs, and upload compliance attachments.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 bg-gray-50/80 p-4 rounded text-xs border border-gray-150">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">GSTIN Number (15-char ID) *</label>
                        <input 
                          type="text" 
                          maxLength={15}
                          value={obForm.approvedGst} 
                          onChange={(e) => setObForm({ ...obForm, approvedGst: e.target.value.toUpperCase() })} 
                          placeholder="e.g. 19AABCU9611R1ZF"
                          className="w-full h-8 border border-gray-200 rounded px-2 text-xs font-mono bg-white focus:outline-none focus:border-blue-600"
                        />
                        {obForm.approvedGst && obForm.approvedGst.length !== 15 && (
                          <span className="text-[10px] text-amber-600 font-medium tracking-wide mt-1 block">⚠️ GSTIN must be exactly 15 characters.</span>
                        )}
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Permanent Account Number (PAN) *</label>
                        <input 
                          type="text" 
                          maxLength={10}
                          value={obForm.pan} 
                          onChange={(e) => setObForm({ ...obForm, pan: e.target.value.toUpperCase() })} 
                          placeholder="e.g. AABCU9611R"
                          className="w-full h-8 border border-gray-200 rounded px-2 text-xs font-mono bg-white focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-gray-200 pt-3.5 mt-1">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">GST registration Copy</label>
                          <div className="flex gap-1.5 mt-1">
                            <span className="flex-1 overflow-hidden truncate bg-white border border-gray-200 rounded px-2 h-7 flex items-center text-[10px] font-mono text-gray-500">
                              {obForm.gstCertFile || "No PDF selected"}
                            </span>
                            <button
                              type="button"
                              onClick={() => setObForm({ ...obForm, gstCertFile: 'GST_Reg_Certificate_signed.pdf' })}
                              className="bg-gray-150 border border-gray-200 text-gray-700 px-2 h-7 rounded text-[10px] font-semibold hover:bg-gray-250 cursor-pointer whitespace-nowrap"
                            >
                              Browse
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Cancelled Cheque Copy</label>
                          <div className="flex gap-1.5 mt-1">
                            <span className="flex-1 overflow-hidden truncate bg-white border border-gray-200 rounded px-2 h-7 flex items-center text-[10px] font-mono text-gray-500">
                              {obForm.chequeFile || "No PDF selected"}
                            </span>
                            <button
                              type="button"
                              onClick={() => setObForm({ ...obForm, chequeFile: 'Cancelled_Cheque_NB.pdf' })}
                              className="bg-gray-150 border border-gray-200 text-gray-700 px-2 h-7 rounded text-[10px] font-semibold hover:bg-gray-250 cursor-pointer whitespace-nowrap"
                            >
                              Browse
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Audited Financial Sheets</label>
                          <div className="flex gap-1.5 mt-1">
                            <span className="flex-1 overflow-hidden truncate bg-white border border-gray-200 rounded px-2 h-7 flex items-center text-[10px] font-mono text-gray-500">
                              {obForm.financialFile || "No PDF selected"}
                            </span>
                            <button
                              type="button"
                              onClick={() => setObForm({ ...obForm, financialFile: 'Audited_Financials_FY25.pdf' })}
                              className="bg-gray-150 border border-gray-200 text-gray-700 px-2 h-7 rounded text-[10px] font-semibold hover:bg-gray-250 cursor-pointer whitespace-nowrap"
                            >
                              Browse
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 - Risk & Compliance Check */}
                <div className="flex gap-4 border-b border-gray-100 pb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 min-h-[40px] mt-1" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Step 3 — Risk, Regulatory & Compliance Checks</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Identify financial risks, scan active legal blacklists, and log regulatory compliance status levels.</p>
                    
                    <div className="mt-3 space-y-3 bg-gray-50/80 p-4 rounded text-xs border border-gray-150">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Financial Stability Rating</label>
                          <select 
                            value={obForm.stability}
                            onChange={(e) => setObForm({ ...obForm, stability: e.target.value })}
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white"
                          >
                            <option value="Low Risk">Low Risk - Highly Stable</option>
                            <option value="Medium Risk">Medium Risk</option>
                            <option value="High Risk">High Risk - Escalate</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Blacklist & Sanction Check</label>
                          <select 
                            value={obForm.blacklistCheck}
                            onChange={(e) => setObForm({ ...obForm, blacklistCheck: e.target.value })}
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white"
                          >
                            <option value="Clear">Clear - Verified</option>
                            <option value="Flagged">Flagged Alert / Suspended</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Regulatory & Security Posture</label>
                          <select 
                            value={obForm.securityStatus}
                            onChange={(e) => setObForm({ ...obForm, securityStatus: e.target.value })}
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white"
                          >
                            <option value="Pass">Pass - Fully Verified</option>
                            <option value="Fail">Fail - Rejected</option>
                            <option value="Under Review">Under Active Review</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Vesting & Risk Compliance Summary Notes</label>
                        <textarea
                          rows={2}
                          value={obForm.complianceNotes}
                          onChange={(e) => setObForm({ ...obForm, complianceNotes: e.target.value })}
                          className="w-full border border-gray-200 rounded p-2 text-xs bg-white focus:outline-none focus:border-blue-600"
                          placeholder="Log compliance check observations e.g., GST return history verification and audit trail clearance."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 - Contract & SLA Setup */}
                <div className="flex gap-4 border-b border-gray-100 pb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 min-h-[40px] mt-1" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Step 4 — Contract Drafting, SLA & Negotiation</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Determine SLA terms, custom pricing rules, discount structures, and contract termination policies.</p>
                    
                    <div className="mt-3 bg-gray-50/80 p-4 rounded text-xs border border-gray-150 space-y-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Agreed Service Level Agreement (SLA) Guidelines *</label>
                        <textarea
                          rows={2}
                          value={obForm.slaTerms}
                          onChange={(e) => setObForm({ ...obForm, slaTerms: e.target.value })}
                          className="w-full border border-gray-200 rounded p-2 text-xs font-mono bg-white focus:outline-none focus:border-blue-600"
                          placeholder="e.g. Delivery within 3 business days, replacement within 24 hours of defects."
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Pricing Structure & Bulk Trade Volume Discounts</label>
                        <textarea
                          rows={2}
                          value={obForm.pricingNotes}
                          onChange={(e) => setObForm({ ...obForm, pricingNotes: e.target.value })}
                          className="w-full border border-gray-200 rounded p-2 text-xs font-mono bg-white focus:outline-none focus:border-blue-600"
                          placeholder="e.g. Fixed trade discount of 15% on wholesale parts orders above ₹10,000."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 - Banking & ERP System Setup */}
                <div className="flex gap-4 border-b border-gray-100 pb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      5
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 min-h-[40px] mt-1" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Step 5 — ERP Account & Banking System Setup</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Add contact coordinates, core banking instructions (IFSC, Account), commodity segments, and credit periods.</p>
                    
                    <div className="mt-3 bg-gray-50/80 p-4 rounded text-xs border border-gray-150 space-y-3.5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Beneficiary Bank Name *</label>
                          <input 
                            type="text" 
                            value={obForm.bankName} 
                            onChange={(e) => setObForm({ ...obForm, bankName: e.target.value })}
                            placeholder="e.g. State Bank of India"
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white focus:outline-none focus:border-blue-600" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Bank Account Number *</label>
                          <input 
                            type="text" 
                            value={obForm.bankAccount} 
                            onChange={(e) => setObForm({ ...obForm, bankAccount: e.target.value })}
                            placeholder="e.g. 30491084201"
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs font-mono bg-white focus:outline-none focus:border-blue-600" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">IFSC Branch Code *</label>
                          <input 
                            type="text" 
                            maxLength={11}
                            value={obForm.bankIfsc} 
                            onChange={(e) => setObForm({ ...obForm, bankIfsc: e.target.value.toUpperCase() })}
                            placeholder="e.g. SBIN0001235"
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs font-mono bg-white focus:outline-none focus:border-blue-600" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Point of Contact Name *</label>
                          <input 
                            type="text" 
                            value={obForm.contactName} 
                            onChange={(e) => setObForm({ ...obForm, contactName: e.target.value })}
                            placeholder="e.g. Ratan Das"
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Contact Phone Number *</label>
                          <input 
                            type="text" 
                            value={obForm.contactPhone} 
                            onChange={(e) => setObForm({ ...obForm, contactPhone: e.target.value })}
                            placeholder="e.g. +91 98310 12345"
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Contact Email Account</label>
                          <input 
                            type="email" 
                            value={obForm.contactEmail} 
                            onChange={(e) => setObForm({ ...obForm, contactEmail: e.target.value })}
                            placeholder="sales@nbfilters.com"
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs font-mono bg-white" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-gray-200 pt-3.5">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Approved Commodity Segment</label>
                          <select 
                            value={obForm.commodityCategory}
                            onChange={(e) => setObForm({ ...obForm, commodityCategory: e.target.value })}
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white font-semibold text-gray-700"
                          >
                            <option value="Spare Parts">Spare Parts</option>
                            <option value="Electricals">Electricals</option>
                            <option value="Lubricants">Lubricants</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Tools & Hardware">Tools & Hardware</option>
                            <option value="Oils & Greases">Oils & Greases</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Payment Method Plan</label>
                          <select 
                            value={obForm.paymentTerms}
                            onChange={(e) => {
                              const value = e.target.value;
                              setObForm({ 
                                ...obForm, 
                                paymentTerms: value,
                                creditPeriod: value === 'Advance Payment' ? 0 : obForm.creditPeriod || 30
                              });
                            }}
                            className="w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white font-semibold text-gray-700"
                          >
                            <option value="Net 30">Net 30 Outstandings</option>
                            <option value="Net 15">Net 15 Outstandings</option>
                            <option value="Net 45">Net 45 Outstandings</option>
                            <option value="Advance Payment">Advance Payment Required</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Agreed Credit Grace Period (Days)</label>
                          <input 
                            type="number" 
                            disabled={obForm.paymentTerms === 'Advance Payment'}
                            value={obForm.paymentTerms === 'Advance Payment' ? 0 : obForm.creditPeriod} 
                            onChange={(e) => setObForm({ ...obForm, creditPeriod: Number(e.target.value) })}
                            min={0}
                            className={`w-full h-8 border border-gray-200 rounded px-2 text-xs bg-white focus:outline-none focus:border-blue-600 ${
                              obForm.paymentTerms === 'Advance Payment' ? 'bg-gray-150 text-gray-400 cursor-not-allowed' : ''
                            }`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 - Director Admission Signoff */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
                      6
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Step 6 — Final Director Approval Admission</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Supply audit-logged remarks to permanently admit this vendor onto the Approved Vendor List (AVL).</p>

                    <div className="mt-3 bg-gray-50 border border-gray-200 rounded p-4 text-xs">
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5">Director Review Remarks *</label>
                      <textarea
                        rows={2}
                        value={obForm.directorRemarks}
                        onChange={(e) => setObForm({ ...obForm, directorRemarks: e.target.value })}
                        placeholder="Add required professional signoff comments for compliance audits..."
                        className="w-full border border-gray-200 rounded p-2 text-xs bg-white mb-3 focus:outline-none focus:border-blue-600"
                      />
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (!obForm.businessName) {
                              alert("Step 1 Validation Error: Legal entity name must be filled.");
                              return;
                            }
                            if (!obForm.approvedGst || obForm.approvedGst.length !== 15) {
                              alert("Step 2 Validation Error: You must supply a valid 15-character GSTIN number.");
                              return;
                            }
                            if (!obForm.bankName || !obForm.bankAccount || !obForm.bankIfsc) {
                              alert("Step 5 Validation Error: Please provide Bank Name, Account Number and IFSC branch code.");
                              return;
                            }
                            if (!obForm.directorRemarks) {
                              alert("Step 6 Validation Error: Please add director audit review and approval comments.");
                              return;
                            }
                            
                            // Log on success
                            const matchedPipeline = onboardingPipeline.find(v => v.id === activeOnboardingId);
                            const name = obForm.businessName;
                            
                            // Add/Complete to AVL
                            const generatedId = activeOnboardingId.startsWith('O') ? `V0${vendors.length + 1}` : activeOnboardingId;
                            const newVendor: Vendor = {
                              id: generatedId,
                              name: obForm.businessName,
                              category: obForm.commodityCategory || 'Spare Parts',
                              status: 'Active',
                              creditPeriod: obForm.paymentTerms === 'Advance Payment' ? '0 days (advance)' : `${obForm.creditPeriod} days credit`,
                              gstin: obForm.approvedGst,
                              paymentTerms: obForm.paymentTerms,
                              locations: (obForm.coverage && obForm.coverage.length > 0) ? (obForm.coverage as Location[]) : ['Kolkata HQ'],
                              contactName: obForm.contactName,
                              phone: obForm.contactPhone,
                              email: obForm.contactEmail,
                              bankName: obForm.bankName,
                              bankAccount: obForm.bankAccount,
                              ifsc: obForm.bankIfsc,
                              pan: obForm.pan
                            };

                            setVendors(prev => {
                              const exists = prev.some(v => v.id === activeOnboardingId);
                              if (exists) {
                                return prev.map(v => v.id === activeOnboardingId ? { ...v, ...newVendor, status: 'Active' as const } : v);
                              } else {
                                return [...prev, newVendor];
                              }
                            });
                            
                            // Remove from pipeline if it was a pre-draft
                            if (activeOnboardingId) {
                              setOnboardingPipeline(prev => prev.filter(p => p.id !== activeOnboardingId));
                            }
                            setOnboardingCompleteMsg(`Approved and admitted "${name}" successfully to Approved Vendor List (AVL). System ID ${generatedId} generated with direct bank/Tally routing setup.`);
                            
                            // Auto select next onboarding or defaults
                            const remaining = onboardingPipeline.filter(p => p.id !== activeOnboardingId);
                            if (remaining.length > 0) {
                              setActiveOnboardingId(remaining[0].id);
                              const pref = ONBOARDING_METADATA_MAP[remaining[0].id] || ONBOARDING_METADATA_MAP['O1'];
                              setObForm({ ...pref, directorRemarks: '' });
                            } else {
                              setActiveOnboardingId('');
                              // Reset to blank
                              setObForm({
                                businessName: '',
                                tradeName: '',
                                businessType: 'Private Limited',
                                yearsInOperation: 1,
                                coverage: ['Kolkata HQ'],
                                reputationNotes: '',
                                complianceNotes: '',
                                stability: 'Low Risk',
                                blacklistCheck: 'Clear',
                                approvedGst: '',
                                pan: '',
                                slaTerms: 'Delivery within 3 business days, replacement within 24 hours of defects.',
                                pricingNotes: '',
                                directorRemarks: '',
                                bankName: '',
                                bankAccount: '',
                                bankIfsc: '',
                                contactName: '',
                                contactPhone: '',
                                contactEmail: '',
                                commodityCategory: 'Spare Parts',
                                paymentTerms: 'Net 30',
                                creditPeriod: 30,
                                regulatoryStatus: 'Fully Compliant',
                                securityStatus: 'Pass',
                                gstCertFile: '',
                                chequeFile: '',
                                financialFile: ''
                              });
                            }
                            setCurrentPage('avl');
                          }}
                          className="bg-green-600 text-white font-medium px-4 h-9 rounded hover:bg-green-700 text-xs tracking-wider uppercase cursor-pointer"
                        >
                          Admit to AVL
                        </button>
                        <button
                          onClick={() => {
                            alert(`onboarding case returned for revision. Audit trail recorded: ${obForm.directorRemarks || "General review requested."}`);
                          }}
                          className="bg-white border border-gray-200 text-gray-700 font-semibold text-xs tracking-wider uppercase px-4 h-9 rounded hover:bg-gray-50"
                        >
                          Return for Revision
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3.1 COMPREHENSIVE INDEPENDENT CUSTOM VENDOR REGISTRATION FORM */}
      {currentPage === 'customOnboarding' && (
        <div id="custom-independent-onboarding-view" className="space-y-6">
          {/* Top page actions bar */}
          <div className="flex justify-between items-center bg-white border border-gray-200 rounded p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage('avl')}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-semibold bg-white border border-gray-200 px-3 h-8.5 rounded cursor-pointer transition-colors"
              >
                ← Back to List
              </button>
              <div className="h-5 w-[1px] bg-gray-200" />
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 block leading-tight">Vendor Self-Governance</span>
                <span className="text-sm font-bold text-gray-800 leading-tight">Master Custom Enrollment Form</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('onboarding')}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 h-8.5 px-3 rounded.5 cursor-pointer"
              >
                Go to Pipeline Reviews
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left & Middle Column (Form Sections) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Form Card 1: Incorporation, Business Classification and Logistical footprints */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5 text-xs">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2 text-indigo-700">
                    <span className="w-5 h-5 bg-indigo-50 text-indigo-700 text-xs rounded-full flex items-center justify-center font-bold">1</span>
                    Legal Identity & Corporate Footprint
                  </h3>
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Master Database Entity</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Official Corporate Legal Name *</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs focus:outline-none focus:border-indigo-600"
                      placeholder="e.g. West Bengal Rubber Products Pvt Ltd"
                      value={coForm.businessName}
                      onChange={(e) => setCoForm({ ...coForm, businessName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Trade Name / DBA (Brand name)</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs focus:outline-none focus:border-indigo-600"
                      placeholder="e.g. WB Rubber Spares"
                      value={coForm.tradeName}
                      onChange={(e) => setCoForm({ ...coForm, tradeName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Constitution Type *</label>
                    <select
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700 focus:outline-none focus:border-indigo-600"
                      value={coForm.businessType}
                      onChange={(e) => setCoForm({ ...coForm, businessType: e.target.value })}
                    >
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Private Limited">Private Limited</option>
                      <option value="Public Limited">Public Limited</option>
                      <option value="LLP">Limited Liability Partnership (LLP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Incorporation Date</label>
                    <input
                      type="date"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs focus:outline-none focus:border-indigo-600 font-mono text-gray-505"
                      value={coForm.registrationIncorpDate}
                      onChange={(e) => setCoForm({ ...coForm, registrationIncorpDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Years Active</label>
                    <input
                      type="number"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs focus:outline-none focus:border-indigo-600"
                      value={coForm.yearsInOperation}
                      onChange={(e) => setCoForm({ ...coForm, yearsInOperation: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Corporate Identification Number (CIN)</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono focus:outline-none focus:border-indigo-600"
                      placeholder="e.g. U74140WB2021PTC123456"
                      value={coForm.cinNumber}
                      onChange={(e) => setCoForm({ ...coForm, cinNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5 font-mono">Primary Transport / Logistics Route Mode</label>
                    <select
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700 focus:outline-none"
                      value={coForm.logisticsRegion}
                      onChange={(e) => setCoForm({ ...coForm, logisticsRegion: e.target.value })}
                    >
                      <option value="Kolkata Regional Subhub">Kolkata Regional Subhub (Express Air Delivery)</option>
                      <option value="West Bengal Freight Lines">West Bengal Freight Lines (Heavy Surface Cargo)</option>
                      <option value="Salt Lake Immediate Air Cargo">Salt Lake Immediate Air Cargo (Hyperlocal Courier)</option>
                      <option value="South Bengal Road Carriers">South Bengal Road Carriers (Standard Inter-state truck)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Factory / Warehouse dispatch physical address</label>
                  <textarea
                    className="w-full border border-gray-200 bg-white rounded p-3 text-xs focus:outline-none h-16 text-gray-700 focus:border-indigo-600"
                    placeholder="e.g. Plot No. 45, Sector V, Salt Lake City, Kolkata 700091, West Bengal"
                    value={coForm.factoryAddress}
                    onChange={(e) => setCoForm({ ...coForm, factoryAddress: e.target.value })}
                  />
                </div>

                <div className="pt-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-2">Registered Branch Coverage (SLA Areas)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 p-3 rounded">
                    {['Kolkata HQ', 'Salt Lake Branch', 'Howrah Branch', 'Barasat Branch'].map((locName) => {
                      const isChecked = coForm.coverage.includes(locName as Location);
                      return (
                        <label key={locName} className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            className="rounded border-gray-350 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                            checked={isChecked}
                            onChange={() => {
                              const nextBranches = isChecked
                                ? coForm.coverage.filter(b => b !== locName)
                                : [...coForm.coverage, locName];
                              setCoForm({ ...coForm, coverage: nextBranches });
                            }}
                          />
                          <span className="text-[11px] font-semibold text-gray-700">{locName}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Form Card 2: Regulatory Audits, Tax Registrations and MSME Certs */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5 text-xs">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2 text-indigo-700">
                    <span className="w-5 h-5 bg-indigo-50 text-indigo-700 text-xs rounded-full flex items-center justify-center font-bold">2</span>
                    Regulatory Auditing, GSTIN & MSME Governance
                  </h3>
                  <span className="text-[10px] text-gray-400 uppercase font-mono">KYC & Statutory Cleared</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">GSTIN Registration Number *</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono uppercase focus:outline-none focus:border-indigo-600"
                      maxLength={15}
                      placeholder="e.g. 19AABCU9611R1ZF"
                      value={coForm.approvedGst}
                      onChange={(e) => setCoForm({ ...coForm, approvedGst: e.target.value.toUpperCase() })}
                    />
                    {coForm.approvedGst && coForm.approvedGst.length !== 15 && (
                      <span className="text-[10px] font-medium text-red-500 block mt-1">⚠️ GSTIN must be exactly 15 characters (currently {coForm.approvedGst.length}/15)</span>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Permanent Account Number (PAN) *</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono uppercase focus:outline-none focus:border-indigo-600"
                      maxLength={10}
                      placeholder="e.g. AABCU9611R"
                      value={coForm.pan}
                      onChange={(e) => setCoForm({ ...coForm, pan: e.target.value.toUpperCase() })}
                    />
                    {coForm.pan && coForm.pan.length !== 10 && (
                      <span className="text-[10px] font-medium text-red-500 block mt-1">⚠️ PAN must be exactly 10 characters (currently {coForm.pan.length}/10)</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">National MSME Classification Type</label>
                    <select
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700 focus:outline-none focus:border-indigo-600"
                      value={coForm.msmeClassification}
                      onChange={(e) => setCoForm({ ...coForm, msmeClassification: e.target.value })}
                    >
                      <option value="Micro Enterprise (Udyam)">Micro Enterprise (Udyam Registered)</option>
                      <option value="Small Enterprise (Udyam)">Small Enterprise (Udyam Registered)</option>
                      <option value="Medium Enterprise (Udyam)">Medium Enterprise (Udyam Registered)</option>
                      <option value="Exempt/Large Enterprise">Exempt / Large scale manufacturer</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">ISO Quality Standards Compliance</label>
                    <select
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700 focus:outline-none focus:border-indigo-600"
                      value={coForm.isoStandard}
                      onChange={(e) => setCoForm({ ...coForm, isoStandard: e.target.value })}
                    >
                      <option value="ISO 9001:2015 Certification">ISO 9001:2015 (Quality Governance)</option>
                      <option value="ISO 14001:2015 Certification">ISO 14001:2015 (Environmental stewardship)</option>
                      <option value="ISO 45001:2018 Certification">ISO 45001:2018 (Occupational health)</option>
                      <option value="Uncertified">Uncertified / Local workshop standard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 block mb-2">Statutory Security Uploads Status</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="border border-gray-200 rounded p-3 flex items-center justify-between bg-gray-50/50">
                      <div>
                        <span className="font-semibold block text-gray-800">GST-REG Cert</span>
                        <span className="text-[10px] text-gray-400 block">GST certificate copy</span>
                      </div>
                      <span className="text-[9px] bg-green-50 text-green-700 uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border border-green-150">Ready</span>
                    </div>
                    <div className="border border-gray-200 rounded p-3 flex items-center justify-between bg-gray-50/50">
                      <div>
                        <span className="font-semibold block text-gray-800">Cancel Cheque</span>
                        <span className="text-[10px] text-gray-400 block">Bank checking proof</span>
                      </div>
                      <span className="text-[9px] bg-green-50 text-green-700 uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border border-green-150">Ready</span>
                    </div>
                    <div className="border border-gray-200 rounded p-3 flex items-center justify-between bg-gray-50/50">
                      <div>
                        <span className="font-semibold block text-gray-800">Financial Audit Sheet</span>
                        <span className="text-[10px] text-gray-400 block">FY25 statement audits</span>
                      </div>
                      <span className="text-[9px] bg-green-50 text-green-700 uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border border-green-150">Ready</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Form Card 3: Bank account setups and Sourcing agreements */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5 text-xs">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2 text-indigo-700">
                    <span className="w-5 h-5 bg-indigo-50 text-indigo-700 text-xs rounded-full flex items-center justify-center font-bold">3</span>
                    Bank Settlements & Payout routing structures
                  </h3>
                  <span className="text-[10px] text-gray-400 uppercase font-mono font-bold">Commercial terms synced</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Official Payout Bank *</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs focus:outline-none focus:border-indigo-600"
                      placeholder="e.g. State Bank of India, Kolkata Corporate Branch"
                      value={coForm.bankName}
                      onChange={(e) => setCoForm({ ...coForm, bankName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Official Beneficiary Bank Account Number *</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono focus:outline-none focus:border-indigo-600"
                      placeholder="e.g. 30123456789"
                      value={coForm.bankAccount}
                      onChange={(e) => setCoForm({ ...coForm, bankAccount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">IFSC Routing Transit Code *</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono uppercase focus:outline-none focus:border-indigo-600"
                      placeholder="e.g. SBIN0001235"
                      maxLength={11}
                      value={coForm.bankIfsc}
                      onChange={(e) => setCoForm({ ...coForm, bankIfsc: e.target.value.toUpperCase() })}
                    />
                    {coForm.bankIfsc && coForm.bankIfsc.length !== 11 && (
                      <span className="text-[10px] font-medium text-red-500 block mt-1">⚠️ IFSC must be 11 characters</span>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Payment currency options</label>
                    <select
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700"
                      value={coForm.currencyOption}
                      onChange={(e) => setCoForm({ ...coForm, currencyOption: e.target.value })}
                    >
                      <option value="INR (₹)">INR (Indian Rupee - ₹)</option>
                      <option value="USD ($)">USD (United States Dollar - $)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5 font-bold">Standard Payment Credit Duration *</label>
                    <select
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-indigo-700 focus:outline-none"
                      value={coForm.paymentTerms}
                      onChange={(e) => {
                        const val = e.target.value;
                        const pDays = val === 'Net 30' ? 30 : (val === 'Net 15' ? 15 : (val === 'Net 45' ? 45 : 0));
                        setCoForm({ ...coForm, paymentTerms: val, creditPeriod: pDays });
                      }}
                    >
                      <option value="Net 30">Net 30 (30 Days Credit Term)</option>
                      <option value="Net 15">Net 15 (15 Days Credit Term)</option>
                      <option value="Net 45">Net 45 (45 Days Credit Term)</option>
                      <option value="Advance Payment">Advance Payment (0 Days Credit Term)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Standard Sourcing Category *</label>
                    <select
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700"
                      value={coForm.commodityCategory}
                      onChange={(e) => setCoForm({ ...coForm, commodityCategory: e.target.value })}
                    >
                      <option value="Spare Parts">Spare Parts</option>
                      <option value="Electricals">Electricals & Alternators</option>
                      <option value="Lubricants">Lubricants & Engine Oils</option>
                      <option value="Accessories">Accessories & Mats</option>
                      <option value="Hardware">Hardware & Pipes</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">SLA Order Lead Time (days)</label>
                    <input
                      type="number"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs"
                      defaultValue={3}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Standard Wholesale Discount (%)</label>
                    <input
                      type="number"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs"
                      defaultValue={15}
                    />
                  </div>
                </div>

              </div>

              {/* Form Card 4: Sourcing POCs & Sustainability metrics */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5 text-xs">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2 text-indigo-700">
                    <span className="w-5 h-5 bg-indigo-50 text-indigo-700 text-xs rounded-full flex items-center justify-center font-bold">4</span>
                    Primary Contacts & ESG Sustainability Checklist
                  </h3>
                  <span className="text-[10px] text-gray-400 uppercase font-mono font-bold">Global SLA aligned</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Lead Sourcing Rep Name *</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs focus:outline-none focus:border-indigo-600"
                      placeholder="e.g. Pradip Sen"
                      value={coForm.contactName}
                      onChange={(e) => setCoForm({ ...coForm, contactName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Contact Rep Phone *</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs focus:outline-none focus:border-indigo-600"
                      placeholder="e.g. +91 91234 56780"
                      value={coForm.contactPhone || ''}
                      onChange={(e) => setCoForm({ ...coForm, contactPhone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Contact Rep Email *</label>
                    <input
                      type="email"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono focus:outline-none focus:border-indigo-600"
                      placeholder="e.g. p.sen@westbengalrubber.com"
                      value={coForm.contactEmail || ''}
                      onChange={(e) => setCoForm({ ...coForm, contactEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Escalations Director Email Account</label>
                    <input
                      type="email"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono focus:outline-none"
                      placeholder="e.g. management@westbengalrubber.com"
                      value={coForm.escalationEmail}
                      onChange={(e) => setCoForm({ ...coForm, escalationEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Net Zero clearance emission code</label>
                    <input
                      type="text"
                      className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono focus:outline-none"
                      placeholder="e.g. ECO-NZ-2026X"
                      value={coForm.netZeroCode}
                      onChange={(e) => setCoForm({ ...coForm, netZeroCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border border-indigo-150 bg-indigo-50/40 p-4 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5 mt-0.5"
                      checked={coForm.sustainabilityPledge}
                      onChange={(e) => setCoForm({ ...coForm, sustainabilityPledge: e.target.checked })}
                    />
                    <div>
                      <span className="font-bold block text-gray-900 text-xs">Authorize Sustainable & Ethical Working Code</span>
                      <span className="text-[10px] text-gray-600 block mt-0.5 leading-relaxed">
                        We pledge that this manufacturing/trading partner complies fully with the Indian National Guidelines on Responsible Business Conduct (NGRBC). We audit their warehouse safety protocols and child labor zero tolerance standards under regional labor acts.
                      </span>
                    </div>
                  </label>
                </div>

              </div>

            </div>

            {/* Right Column (Live Auditor & Actions Summary) */}
            <div className="space-y-6">
              
              {/* Card Right 1: Interactive Real-time Auditor Verification */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm text-xs space-y-4">
                <span className="text-[10px] font-bold uppercase text-indigo-700 tracking-wider block border-b border-gray-100 pb-2">Real-time Form Auditing Checks</span>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">1. Corporate Legal Name</span>
                    {coForm.businessName.trim().length > 0 ? (
                      <span className="text-[9.5px] uppercase font-bold text-green-700 bg-green-50 border border-green-250 px-2 py-0.5 rounded">PASSED</span>
                    ) : (
                      <span className="text-[9.5px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-250 px-2 py-0.5 rounded">AWAITING</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">2. GSTIN format (15 char)</span>
                    {coForm.approvedGst.trim().length === 15 ? (
                      <span className="text-[9.5px] uppercase font-bold text-green-700 bg-green-50 border border-green-250 px-2 py-0.5 rounded">VERIFIED</span>
                    ) : (
                      <span className="text-[9.5px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-250 px-2 py-0.5 rounded">INCOMPLETE</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">3. PAN format (10 char)</span>
                    {coForm.pan.trim().length === 10 ? (
                      <span className="text-[9.5px] uppercase font-bold text-green-700 bg-green-50 border border-green-250 px-2 py-0.5 rounded">VALIDATED</span>
                    ) : (
                      <span className="text-[9.5px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-250 px-2 py-0.5 rounded">INCOMPLETE</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">4. Banking Settlements</span>
                    {coForm.bankAccount && coForm.bankAccount.trim().length >= 8 && coForm.bankName.trim().length > 0 ? (
                      <span className="text-[9.5px] uppercase font-bold text-green-700 bg-green-50 border border-green-250 px-2 py-0.5 rounded">LINKED</span>
                    ) : (
                      <span className="text-[9.5px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-250 px-2 py-0.5 rounded">EMPTY</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">5. Sourcing Representative</span>
                    {coForm.contactName.trim().length > 0 && coForm.contactPhone && coForm.contactPhone.trim().length > 0 ? (
                      <span className="text-[9.5px] uppercase font-bold text-green-700 bg-green-50 border border-green-250 px-2 py-0.5 rounded">CONTACTED</span>
                    ) : (
                      <span className="text-[9.5px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-250 px-2 py-0.5 rounded">AWAITING</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">6. Ethical Code Pledge</span>
                    {coForm.sustainabilityPledge ? (
                      <span className="text-[9.5px] uppercase font-bold text-indigo-700 bg-indigo-50 border border-indigo-250 px-2 py-0.5 rounded font-bold">SIGNED</span>
                    ) : (
                      <span className="text-[9.5px] uppercase font-bold text-red-700 bg-red-50 border border-red-250 px-2 py-0.5 rounded">DECLINED</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-150 pt-3">
                  <span className="text-[10px] text-gray-400 block mb-1">Authorization Clearance Passcode:</span>
                  <input
                    type="password"
                    maxLength={4}
                    value={coForm.verificationCode}
                    onChange={(e) => setCoForm({ ...coForm, verificationCode: e.target.value.replace(/\D/g, '') })}
                    className="w-full h-8.5 border border-indigo-200 rounded px-2.5 bg-indigo-50/20 font-bold tracking-widest text-center text-indigo-800 placeholder-indigo-300 focus:outline-none focus:border-indigo-500"
                    placeholder="⚡ ENTER 4-DIGIT PIN"
                  />
                  <span className="text-[9px] text-gray-400 block mt-1 tracking-tight text-center">Required to bypass standard compliance audits. (e.g. 3344)</span>
                </div>
              </div>

              {/* Card Right 2: AVL Preview Box */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm text-xs space-y-3">
                <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Master AVL Listing Preview</span>
                <div className="border border-gray-150 p-4 rounded-lg bg-gray-50 text-xs">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-green-700 bg-green-50 px-2 py-0.5 border border-green-200 rounded">ACTIVE SUPPLIER</span>
                  <div className="font-bold text-sm text-gray-950 mt-1.5 leading-tight">{coForm.businessName || 'Business legal name...'}</div>
                  <div className="text-[10px] font-mono text-gray-400 mt-0.5">{coForm.approvedGst || '19Axxxxxx...'}</div>
                  
                  <div className="mt-3.5 space-y-1.5 border-t border-dashed border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Class:</span>
                      <span className="font-semibold text-gray-700">{coForm.businessType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Segments:</span>
                      <span className="font-semibold text-indigo-700">{coForm.commodityCategory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Branches:</span>
                      <span className="font-semibold text-gray-700">{(coForm.coverage || []).join(', ') || 'Kolkata HQ'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Right 3: Quick Action Buttons */}
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg p-5 text-white shadow-md text-xs space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100 block">Commit Registration</span>
                <p className="text-[11px] leading-relaxed text-indigo-50">
                  By executing register, the vendor will be marked as "Active" on the Approved Vendor List (AVL) database and an immediate contract entry will be issued automatically.
                </p>

                <div className="space-y-2 pt-1 font-semibold">
                  <button
                    onClick={() => {
                      if (!coForm.businessName.trim()) {
                        alert("Please supply the Corporate Legal Name.");
                        return;
                      }
                      if (!coForm.approvedGst.trim()) {
                        alert("GSTIN Registration number is mandatory.");
                        return;
                      }
                      if (!coForm.pan.trim()) {
                        alert("Permanent Account Number (PAN) is mandatory.");
                        return;
                      }
                      if (!coForm.bankAccount || !coForm.bankAccount.trim() || !coForm.bankName.trim() || !coForm.bankIfsc.trim()) {
                        alert("Treasury settling bank name, account, and IFSC routing code must be supplied.");
                        return;
                      }
                      if (!coForm.contactName.trim() || !coForm.contactEmail || !coForm.contactEmail.trim() || !coForm.contactPhone || !coForm.contactPhone.trim()) {
                        alert("Primary Sourcing representative details (name, email, phone) must be provided.");
                        return;
                      }
                      if (!coForm.verificationCode) {
                        alert("Please supply your authorization clearance PIN (e.g. 3344) to bypass standard onboarding reviews.");
                        return;
                      }

                      // Create the new active Vendor
                      const generatedId = `VND-2026-0${vendors.length + 11}`;
                      const newVendorObj: Vendor = {
                        id: generatedId,
                        name: coForm.businessName,
                        category: coForm.commodityCategory,
                        status: 'Active',
                        creditPeriod: `${coForm.creditPeriod} days credit`,
                        gstin: coForm.approvedGst,
                        paymentTerms: coForm.paymentTerms,
                        locations: coForm.coverage as Location[],
                        contactName: coForm.contactName,
                        phone: coForm.contactPhone,
                        email: coForm.contactEmail,
                        bankName: coForm.bankName,
                        bankAccount: coForm.bankAccount,
                        ifsc: coForm.bankIfsc,
                        accountType: 'Current Account',
                        gstTreatment: 'Registered Business',
                        pan: coForm.pan
                      };

                      setVendors(prev => [...prev, newVendorObj]);

                      // Also issue a basic contract automatically
                      const newContractObj: Contract = {
                        vendorName: coForm.businessName,
                        startDate: '2026-06-10',
                        endDate: '2027-06-10',
                        daysLeft: 365,
                        slaTerms: `Lead time: 3 business days. Trade Wholesale discount: 15%. Direct settlements to beneficiary ${coForm.bankAccount}.`,
                        status: 'Active'
                      };
                      setContracts(prev => [...prev, newContractObj]);

                      alert(`Success! Master Supplier "${coForm.businessName}" (${generatedId}) has been successfully enrolled into the Approved Vendor List (AVL) database with Active clearance status.`);
                      setCurrentPage('avl');
                    }}
                    className="w-full bg-white text-indigo-700 uppercase tracking-wider text-xs px-4 h-9.5 rounded hover:bg-indigo-50 flex items-center justify-center gap-1 cursor-pointer transition-colors shadow font-bold"
                  >
                    Register & Admit to AVL
                  </button>
                  <button
                    onClick={() => {
                      alert("Self-Declaration draft saved successfully inside local system temporary storage.");
                      setCurrentPage('avl');
                    }}
                    className="w-full bg-transparent hover:bg-white/10 text-white border border-white/30 px-4 h-9.5 rounded text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Save Draft
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 4. DIRECTOR > CONTRACTS & SLAS */}
      {currentPage === 'contracts' && (
        <div id="contracts-slas-view">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Contracts & SLAs</h1>
              <p className="text-sm text-gray-500 mt-1">Legal coverage durations, service level agreement delivery conditions, and penalties tracker</p>
            </div>
          </div>

          {/* Filter contract statuses */}
          <div className="bg-white border border-gray-200 rounded p-4 mb-5 flex gap-3">
            <select
              value={contractFilterStatus}
              onChange={(e) => setContractFilterStatus(e.target.value)}
              className="h-9 border border-gray-200 bg-white rounded px-3 text-sm focus:outline-none"
            >
              <option value="All">All Contract Statuses</option>
              <option value="Active">Active</option>
              <option value="Expiring Soon">Expiring Soon</option>
            </select>
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3">Vendor</th>
                  <th className="p-3">SLA Summary details</th>
                  <th className="p-3">Start Date</th>
                  <th className="p-3">End Date</th>
                  <th className="p-3 text-center">Days Remaining</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contracts
                  .filter(c => contractFilterStatus === 'All' || c.status === contractFilterStatus)
                  .map((c, idx) => (
                    <tr key={idx} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                      <td className="p-3 font-semibold text-gray-900">{c.vendorName}</td>
                      <td className="p-3 text-gray-600 max-w-xs truncate">{c.slaTerms}</td>
                      <td className="p-3 text-gray-500 font-mono">{c.startDate}</td>
                      <td className="p-3 text-gray-500 font-mono">{c.endDate}</td>
                      <td className="p-3 text-center font-mono">
                        <span className={`font-semibold ${c.daysLeft <= 30 ? 'text-red-600' : 'text-gray-700'}`}>
                          {c.daysLeft} days
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[9px] uppercase tracking-wide rounded px-2 py-0.5 font-bold ${
                          c.status === 'Active' ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => setSelectedContract(c)}
                          className="text-blue-600 hover:underline uppercase tracking-wider text-[10px] font-bold"
                        >
                          View
                        </button>
                        <button
                          onClick={() => alert(`Initiating renewal pipeline for ${c.vendorName}`)}
                          className="bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded text-[10px] uppercase font-medium hover:bg-gray-50"
                        >
                          Renew
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* SLA VIEW MODAL (pure React State Overlay) */}
          {selectedContract && (
            <div className="fixed inset-0 bg-gray-950/40 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded border border-gray-200 shadow-md max-w-md w-full p-6">
                <div className="flex justify-between items-start border-b border-gray-200 pb-3 mb-4">
                  <h3 className="text-md font-semibold text-gray-900">{selectedContract.vendorName} SLA Contract</h3>
                  <button onClick={() => setSelectedContract(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-gray-500 font-semibold block uppercase text-[10px] tracking-wide">Agreement Period</span>
                    <span className="text-gray-900 font-semibold font-mono">{selectedContract.startDate} to {selectedContract.endDate}</span>
                    <span className="ml-2 text-rose-600 font-bold">({selectedContract.daysLeft} days left)</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold block uppercase text-[10px] tracking-wide mb-1">Signed SLA terms</span>
                    <div className="bg-gray-50 border border-gray-200 p-3 rounded font-mono text-gray-700 leading-relaxed text-[11px]">
                      {selectedContract.slaTerms}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-150">
                    <span className="text-gray-500 font-semibold block uppercase text-[10px] tracking-wide mb-1">Escalation Path</span>
                    <p className="text-gray-600">Level 1: Purchase Exec &gt; Level 2: GM Services &gt; Level 3: Company Director</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-5">
                  <button
                    onClick={() => setSelectedContract(null)}
                    className="bg-white border border-gray-200 text-gray-700 font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      alert("Opening amendment window.");
                      setSelectedContract(null);
                    }}
                    className="bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Request Amendment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. DIRECTOR > PRICE INTELLIGENCE */}
      {currentPage === 'priceIntelligence' && (
        <div id="price-intelligence-view">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Cross-Location Price Intelligence</h1>
            <p className="text-sm text-gray-500 mt-1">Cross-reference quotes and historic purchase patterns to eliminate regional pricing leakage</p>
          </div>

          {gmAlertMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3.5 rounded">
              {gmAlertMsg}
            </div>
          )}

          {/* Pricing analysis table */}
          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden mt-6 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 font-semibold">Item Description</th>
                  <th className="p-3 font-semibold">Category</th>
                  <th className="p-3 font-semibold text-right">Kolkata HQ</th>
                  <th className="p-3 font-semibold text-right">Salt Lake Branch</th>
                  <th className="p-3 font-semibold text-right">Howrah Branch</th>
                  <th className="p-3 font-semibold text-right">Barasat Branch</th>
                  <th className="p-3 font-semibold text-right">Pricing Spread</th>
                  <th className="p-3 font-semibold">Cheapest Location</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50/20">
                  <td className="p-3 font-semibold text-gray-900">Engine Oil 10W30 (Ltr)</td>
                  <td className="p-3 text-gray-500 uppercase text-[10px]">Lubricants</td>
                  <td className="p-3 text-right font-mono font-medium">₹900</td>
                  <td className="p-3 text-right font-mono font-medium">₹860</td>
                  <td className="p-3 text-right font-mono font-medium">₹920</td>
                  <td className="p-3 text-right font-mono font-medium">₹880</td>
                  <td className="p-3 text-right text-amber-700 font-bold">7.0%</td>
                  <td className="p-3 text-teal-600 font-semibold font-mono">Salt Lake (₹860)</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setGmAlertMsg("Benchmark pricing alert sent to GM Vikram Sen & Priya Nair successfully.")}
                      className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-2 py-1 rounded text-[10px] uppercase font-semibold cursor-pointer"
                    >
                      Alert GM
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50/20">
                  <td className="p-3 font-semibold text-gray-900">Electrical Wiring Harness</td>
                  <td className="p-3 text-gray-500 uppercase text-[10px]">Electricals</td>
                  <td className="p-3 text-right font-mono font-medium">₹11,400</td>
                  <td className="p-3 text-right font-mono font-medium">₹11,000</td>
                  <td className="p-3 text-right font-mono font-medium">₹12,200</td>
                  <td className="p-3 text-right font-mono font-medium">₹11,100</td>
                  <td className="p-3 text-right text-red-600 font-extrabold">10.9%</td>
                  <td className="p-3 text-teal-600 font-semibold font-mono text-rose-600">Salt Lake (₹11,000)</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setGmAlertMsg("Critical anomaly escalation: Pricing alert dispatched to branch GMs.")}
                      className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-2 py-1 rounded text-[10px] uppercase font-semibold cursor-pointer"
                    >
                      Alert GM
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50/20">
                  <td className="p-3 font-semibold text-gray-900">Brake Pads Set</td>
                  <td className="p-3 text-gray-500 uppercase text-[10px]">Spare Parts</td>
                  <td className="p-3 text-right font-mono font-medium">₹950</td>
                  <td className="p-3 text-right font-mono font-medium">₹920</td>
                  <td className="p-3 text-right font-mono font-medium">₹980</td>
                  <td className="p-3 text-right font-mono font-medium">₹940</td>
                  <td className="p-3 text-right text-amber-700 font-bold">6.5%</td>
                  <td className="p-3 text-teal-600 font-semibold font-mono">Salt Lake (₹920)</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setGmAlertMsg("Benchmark pricing alert sent to GM.")}
                      className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-2 py-1 rounded text-[10px] uppercase font-semibold cursor-pointer"
                    >
                      Alert GM
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-white border border-gray-200 rounded p-6 shadow-sm">
            <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3 block">Bulk Consolidation Opportunities</h3>
            <p className="text-xs text-gray-500 mb-4">The following categories show highly parallel orders across different branches. We recommend consolidating individual requisitions into master bulk service contracts to leverage 12% + bulk discounts.</p>
            
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-3">Item Name</th>
                    <th className="p-3">Monthly Open Volume</th>
                    <th className="p-3">Target Bulk Rate</th>
                    <th className="p-3">Estimated Annualized Saving</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 h-10">
                    <td className="p-3 font-semibold text-gray-900">Engine Oil 10W30</td>
                    <td className="p-3">80 Ltrs</td>
                    <td className="p-3 font-mono font-medium text-emerald-700">₹810 vs ₹885 avg</td>
                    <td className="p-3 font-semibold font-mono text-emerald-600">₹72,000</td>
                    <td className="p-3"><span className="text-[10px] bg-blue-50 text-blue-600 font-bold uppercase rounded px-1.5 py-0.5">Under Tender</span></td>
                  </tr>
                  <tr className="border-b border-gray-200 h-10">
                    <td className="p-3 font-semibold text-gray-900">Workshop Safety Equipment</td>
                    <td className="p-3">120 Uniform sets</td>
                    <td className="p-3 font-mono font-medium text-emerald-700">₹450 vs ₹510 avg</td>
                    <td className="p-3 font-semibold font-mono text-emerald-600">₹24,000</td>
                    <td className="p-3"><span className="text-[10px] bg-green-50 text-green-700 font-bold uppercase rounded px-1.5 py-0.5">Contract Negotiated</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. DIRECTOR > SYSTEM USERS */}
      {currentPage === 'users' && (
        <div id="users-manager-view">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">System Users</h1>
              <p className="text-sm text-gray-500 mt-1">Authorise and monitor platform permissions, branches of service, and session logs</p>
            </div>
            <button
              onClick={() => {
                setNewUserForm({
                  name: '',
                  email: '',
                  role: 'Team',
                  location: 'Kolkata HQ' as Location,
                  status: 'Active' as 'Active' | 'Inactive',
                  empId: `EMP-${2026}-${Math.floor(100 + Math.random() * 900)}`,
                  phone: '',
                  department: 'Procurement',
                  mfaEnabled: true,
                  privileges: ['Requisition Creation & Submission']
                });
                setUserSuccessMsg('');
                setCurrentPage('addUser');
              }}
              className="bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase px-4 h-9 rounded hover:bg-blue-700 cursor-pointer"
            >
              + Add User
            </button>
          </div>

          {userSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3.5 rounded">
              {userSuccessMsg}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 font-semibold">User Name</th>
                  <th className="p-3 font-semibold">Email Account</th>
                  <th className="p-3 font-semibold">Role</th>
                  <th className="p-3 font-semibold">Home Branch</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Last Active</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={idx} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-900">{u.name}</td>
                    <td className="p-3 font-mono text-gray-500">{u.email}</td>
                    <td className="p-3"><span className="text-[10px] font-bold bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">{u.role}</span></td>
                    <td className="p-3 text-gray-700">{u.location}</td>
                    <td className="p-3">
                      <span className={`text-[9px] uppercase tracking-wide rounded px-1.5 py-0.5 font-bold ${
                        u.status === 'Active' ? 'text-green-700 bg-green-50' : 'text-gray-500 bg-gray-100'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500">{u.lastActive}</td>
                    <td className="p-3 text-right space-x-2">
                      <button 
                        onClick={() => {
                          const updated = [...users];
                          updated[idx].status = updated[idx].status === 'Active' ? 'Inactive' : 'Active';
                          setUsers(updated);
                        }}
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          u.status === 'Active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                        }`}
                      >
                        {u.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6.1 DEDICATED ADD USER FORM PAGE */}
      {currentPage === 'addUser' && (
        <div id="add-user-page-view" className="space-y-6">
          
          {/* Header toolbar */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage('users')}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 font-semibold bg-white border border-gray-200 px-3 h-8 rounded cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Users</span>
            </button>
          </div>

          <div className="border-b border-gray-200 pb-3.5">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Authorize Corporate Platform Account</h1>
            <p className="text-xs text-gray-500 mt-1">Configure permanent employee indexes, system clearance permissions, and multi-factor security credentials.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Form Fields Left (Col span 2) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Card 1: Core Corporate Profile details */}
              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm space-y-4 text-xs">
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-gray-100 pb-2">1. Organization Profile Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Full Legal Name *</label>
                    <input 
                      type="text" 
                      value={newUserForm.name}
                      onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                      placeholder="e.g. Neha Roy"
                      className="w-full h-9 border border-gray-200 rounded px-3 bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Employment Record ID *</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newUserForm.empId}
                        onChange={(e) => setNewUserForm({ ...newUserForm, empId: e.target.value })}
                        placeholder="e.g. EMP-2026-741"
                        className="w-full h-9 border border-gray-200 rounded px-3 font-mono bg-white focus:outline-none focus:border-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => setNewUserForm({ ...newUserForm, empId: `EMP-${2026}-${Math.floor(100 + Math.random() * 900)}` })}
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 font-semibold px-2.5 h-9 rounded text-[11px] whitespace-nowrap cursor-pointer"
                      >
                        Generate ID
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Corporate Email Address *</label>
                    <input 
                      type="email" 
                      value={newUserForm.email}
                      onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                      placeholder="e.g. n.roy@bhandariautomotive.com"
                      className="w-full h-9 border border-gray-200 rounded px-3 font-mono bg-white focus:outline-none focus:border-blue-600"
                    />
                    {newUserForm.email && !newUserForm.email.includes('@') && (
                      <span className="text-[10px] text-red-600 font-medium tracking-wide mt-1 block">⚠️ Enter a valid email address.</span>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Contact Office Phone *</label>
                    <input 
                      type="text" 
                      value={newUserForm.phone}
                      onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                      placeholder="e.g. +91 91234 56789"
                      className="w-full h-9 border border-gray-200 rounded px-3 bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Spatial assignment (home branch)</label>
                    <select
                      value={newUserForm.location}
                      onChange={(e) => setNewUserForm({ ...newUserForm, location: e.target.value as Location })}
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs font-semibold text-gray-700"
                    >
                      <option value="Kolkata HQ">Kolkata HQ</option>
                      <option value="Salt Lake Branch">Salt Lake Branch</option>
                      <option value="Howrah Branch">Howrah Branch</option>
                      <option value="Barasat Branch">Barasat Branch</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Cost Center Department</label>
                    <select
                      value={newUserForm.department}
                      onChange={(e) => setNewUserForm({ ...newUserForm, department: e.target.value })}
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs font-semibold text-gray-700"
                    >
                      <option value="Management">Executive Management</option>
                      <option value="Procurement">Procurement & Sourcing</option>
                      <option value="Finance & Accounts">Finance & Accounts</option>
                      <option value="Internal Audit">Internal Audit & Compliance</option>
                      <option value="Service & Spares">Service & Spares Dispatch</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">System Access Role *</label>
                    <select
                      value={newUserForm.role}
                      onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs font-bold text-gray-800"
                    >
                      <option value="Director">Director</option>
                      <option value="GM">General Manager (GM)</option>
                      <option value="Team">Team / Procurement Officer</option>
                      <option value="Accounts">Accounts Specialist</option>
                      <option value="Audit">Compliance Auditor</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Card 2: Security & MFA Settings */}
              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm text-xs space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-gray-100 pb-2">2. Security Policies & Authorization Constraints</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2.5 border border-gray-150 bg-gray-50/50 p-4 rounded.5">
                    <span className="text-[10px] font-bold uppercase text-gray-400 block">Single Sign-On & Verification</span>
                    <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={newUserForm.mfaEnabled}
                        onChange={(e) => setNewUserForm({ ...newUserForm, mfaEnabled: e.target.checked })}
                        className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <div>
                        <span className="font-semibold block">Mandate Multi-Factor Auths (MFA)</span>
                        <span className="text-[10px] text-gray-400 block">Force users to verify logins via secure one-time-passcode authenticators.</span>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-2.5 border border-gray-150 bg-gray-50/50 p-4 rounded.5">
                    <span className="text-[10px] font-bold uppercase text-gray-400 block">Password Rotation Policies</span>
                    <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <div>
                        <span className="font-semibold block">Enforce Initial Rotation</span>
                        <span className="text-[10px] text-gray-400 block">Require user to choose a custom primary password upon their initial platform login.</span>
                      </div>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* Sidebar Right (Col span 1) */}
            <div className="space-y-6">
              
              {/* Privilege Checklist */}
              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm text-xs space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-gray-100 pb-2">3. Granular System Privileges</h2>
                <p className="text-[11px] text-gray-500">Fine-tune functional clearances for the ERP accounts system.</p>
                
                <div className="space-y-3 pt-1">
                  {[
                    'Requisition Creation & Submission',
                    'AVL Master Data Governance',
                    'RFQ Approval & Bid Opening Signoff',
                    'Purchase Order Authorisation & Issuance',
                    'Accounts Payable Match Approvals',
                    'Audit Ledger Logs Tracking'
                  ].map((priv) => {
                    const isChecked = newUserForm.privileges?.includes(priv);
                    return (
                      <label key={priv} className="flex gap-2.5 items-start cursor-pointer select-none">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            const nextPriv = isChecked 
                              ? newUserForm.privileges.filter(p => p !== priv)
                              : [...(newUserForm.privileges || []), priv];
                            setNewUserForm({ ...newUserForm, privileges: nextPriv });
                          }}
                          className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-medium text-gray-700 text-[11px] leading-tight">{priv}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* CTA Action Panel Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded p-6 shadow-sm text-xs space-y-4 text-gray-700">
                <span className="text-[10px] font-bold uppercase text-blue-700 block">Final Approval</span>
                <p className="text-[11px] leading-relaxed">
                  Upon clicking register, the system generates an audit record and sends secure onboarding credentials to the specified corporate inbox.
                </p>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      if (!newUserForm.name) {
                        alert("Please supply a valid User Name in section 1.");
                        return;
                      }
                      if (!newUserForm.email || !newUserForm.email.includes('@')) {
                        alert("Please supply a valid corporate Email Account.");
                        return;
                      }
                      if (!newUserForm.phone) {
                        alert("Please supply a valid contact phone number.");
                        return;
                      }

                      // Create and add user
                      const createdUser: User = {
                        name: newUserForm.name,
                        email: newUserForm.email,
                        role: newUserForm.role,
                        location: newUserForm.location,
                        status: 'Active',
                        lastActive: 'Never'
                      };

                      setUsers(prev => [...prev, createdUser]);
                      setUserSuccessMsg(`User registration completed successfully for Employee "${newUserForm.name}" (${newUserForm.empId}) with the system privilege level ${newUserForm.role}.`);
                      
                      // Return to user list
                      setCurrentPage('users');
                    }}
                    className="w-full bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase h-9 rounded hover:bg-blue-700 cursor-pointer text-center"
                  >
                    Authorize Account
                  </button>
                  <button
                    onClick={() => setCurrentPage('users')}
                    className="w-full bg-white border border-gray-200 text-gray-700 font-semibold text-xs tracking-wider uppercase h-9 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </SharedShell>
  );
}
