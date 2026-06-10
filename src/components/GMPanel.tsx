import React, { useState } from 'react';
import { 
  FileCheck, FileSpreadsheet, Layers, Truck, CheckSquare, 
  Search, Filter, Eye, Check, X, AlertTriangle, ArrowLeft, RefreshCw, FileText, UserPlus
} from 'lucide-react';
import { Vendor, Requisition, RFQ, PurchaseOrder, GRN, Invoice, Contract, PaymentBatch, User, Location } from '../types';
import SharedShell from './SharedShell';

interface GMPanelProps {
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

export default function GMPanel({
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
}: GMPanelProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Requisitions substation
  const [reqFilterStatus, setReqFilterStatus] = useState('All');
  const [reqFilterPriority, setReqFilterPriority] = useState('All');
  const [selectedReq, setSelectedReq] = useState<Requisition | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemQty, setEditingItemQty] = useState<number>(0);
  const [reqReviewRemark, setReqReviewRemark] = useState('');
  const [reqSuccessMsg, setReqSuccessMsg] = useState('');

  // RFQ substation & Selection substation
  const [selectedRfq, setSelectedRfq] = useState<RFQ | null>(null);
  const [selectedRfqForSelection, setSelectedRfqForSelection] = useState<RFQ | null>(null);
  const [selectionRemark, setSelectionRemark] = useState('');
  const [selectionSuccessMsg, setSelectionSuccessMsg] = useState('');

  // PO substation
  const [selectedPo, setSelectedPo] = useState<PurchaseOrder | null>(null);

  // QC substation
  const [selectedGRNForQC, setSelectedGRNForQC] = useState<GRN | null>(null);
  const [qcRows, setQCRows] = useState<{ id: string; receivedQty: number; condition: 'Good' | 'Damaged' | 'Partial'; passed: boolean }[]>([]);
  const [qcDamageNotes, setQcDamageNotes] = useState('');
  const [qcRemarks, setQcRemarks] = useState('');
  const [qcRejectionType, setQcRejectionType] = useState('Return to Vendor');
  const [qcTriggeredReject, setQcTriggeredReject] = useState(false);
  const [qcSuccessMsg, setQcSuccessMsg] = useState('');

  // General Toast info
  const [toastMsg, setToastMsg] = useState('');

  // Interactive Graph Selections
  const [selectedDemandMonth, setSelectedDemandMonth] = useState<'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun'>('Jun');
  const [selectedCategory, setSelectedCategory] = useState<'Lubricants' | 'Spare Parts' | 'Tyres' | 'Electricals'>('Lubricants');

  // Vendor Onboarding form states (GM input)
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [coForm, setCoForm] = useState({
    businessName: '',
    tradeName: '',
    businessType: 'Private Limited',
    yearsInOperation: 5,
    coverage: ['Kolkata HQ'] as string[],
    reputationNotes: 'Prepared independently by General Manager (Kolkata HQ).',
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
  });
  const [onboardingSuccessMsg, setOnboardingSuccessMsg] = useState('');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Layers className="w-4 h-4" /> },
    { id: 'requisitions', label: 'Requisitions', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'rfqQuotes', label: 'RFQ & Quotes', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'vendorSelection', label: 'Vendor Selection', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'activePOs', label: 'Active POs', icon: <Truck className="w-4 h-4" /> },
    { id: 'qualityCheck', label: 'Quality Check', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'vendorOnboarding', label: 'Vendor Onboarding', icon: <UserPlus className="w-4 h-4" /> }
  ];

  // Logic Calculations
  const pendingReqsCount = requisitions.filter(r => r.status === 'Pending Approval').length;
  const pendingQCGrns = grns.filter(g => g.status === 'Submitted' || g.status === 'Accepted (QC Pending)').length;

  return (
    <SharedShell
      role="GM"
      roleColor="#D97706"
      roleBadgeBg="bg-amber-50"
      roleBadgeText="text-amber-700"
      sidebarItems={sidebarItems}
      currentPage={currentPage}
      setCurrentPage={(p) => {
        setCurrentPage(p);
        setSelectedReq(null);
        setSelectedRfq(null);
        setSelectedRfqForSelection(null);
        setSelectedPo(null);
        setSelectedGRNForQC(null);
        setQcTriggeredReject(false);
        setOnboardingSuccessMsg('');
        setShowOnboardingForm(false);
      }}
      onBack={onBack}
      userName="Vikram Sen"
      userBranch="Kolkata HQ"
    >
      {/* 2.1 GM > DASHBOARD */}
      {currentPage === 'dashboard' && (
        <div id="gm-dashboard">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">GM Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Kolkata HQ — Head approval authorizations & branch quality audits</p>
            </div>
          </div>

          {toastMsg && (
            <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-800 text-xs p-3 px-4 rounded">
              {toastMsg}
            </div>
          )}

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setCurrentPage('requisitions')}
              className="bg-white border border-gray-200 rounded p-5 shadow-sm text-left hover:border-amber-500 transition-colors block cursor-pointer"
            >
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Requisitions Pending</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{pendingReqsCount}</div>
              <p className="text-xs text-blue-600 font-semibold mt-1">Review demands →</p>
            </button>
            
            <button
              onClick={() => setCurrentPage('vendorSelection')}
              className="bg-white border border-gray-200 rounded p-5 shadow-sm text-left hover:border-amber-500 transition-colors block cursor-pointer"
            >
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Vendor Selection Awaiting</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">2</div>
              <p className="text-xs text-blue-600 font-semibold mt-1">Confirm quotes →</p>
            </button>

            <button
              onClick={() => setCurrentPage('qualityCheck')}
              className="bg-white border border-gray-200 rounded p-5 shadow-sm text-left hover:border-amber-500 transition-colors block cursor-pointer"
            >
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Quality Checks Pending</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{pendingQCGrns}</div>
              <p className="text-xs text-blue-600 font-semibold mt-1">Run inspections →</p>
            </button>

            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Deliveries expected (7 days)</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">5</div>
              <p className="text-xs text-gray-500 mt-1">Track transit transits</p>
            </div>
          </div>

          {/* Visual Intelligence Grid - Upgraded spacious & bordered layouts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 text-neutral-850">
            {/* Chart 1: Monthly Demand Profile Curve (Area Chart) */}
            <div className="bg-white border border-gray-250 rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Monthly Branch Demand curves</h3>
                  <span className="text-[10px] bg-amber-50 text-amber-700 font-extrabold px-2.5 py-1 rounded border border-amber-150">Active Year Log</span>
                </div>
                <p className="text-[11px] text-gray-550 mt-1">
                  Click on any month node to inspect item aggregates and procurement peak justification logs.
                </p>
              </div>

              {/* Custom SVG Line Area Graph with gradient curves */}
              <div className="mt-8 flex-1 flex flex-col justify-center">
                <div className="relative w-full h-44 bg-gray-50/50 rounded-xl border border-gray-100 p-4">
                  {/* Grid Lines */}
                  <div className="absolute inset-x-4 inset-y-6 flex flex-col justify-between pointer-events-none text-gray-200">
                    <div className="border-t border-gray-100 w-full" />
                    <div className="border-t border-gray-100 w-full" />
                    <div className="border-t border-gray-100 w-full" />
                    <div className="border-b border-gray-200 w-full" />
                  </div>

                  {/* SVG Chart Drawing */}
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 350 176" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gmAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d97706" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Area Path */}
                    <path
                      d="M 25 150 L 25 110 L 80 80 L 135 120 L 190 60 L 245 105 L 300 45 L 300 150 Z"
                      fill="url(#gmAreaGrad)"
                    />

                    {/* Bold Trend Line */}
                    <path
                      d="M 25 110 L 80 80 L 135 120 L 190 60 L 245 105 L 300 45"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Interactive Clickable Nodes */}
                    <circle cx="25" cy="110" r={selectedDemandMonth === 'Jan' ? '7' : '5'} className="cursor-pointer transition-all" fill={selectedDemandMonth === 'Jan' ? '#92400e' : '#d97706'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedDemandMonth('Jan')} />
                    <circle cx="80" cy="80" r={selectedDemandMonth === 'Feb' ? '7' : '5'} className="cursor-pointer transition-all" fill={selectedDemandMonth === 'Feb' ? '#92400e' : '#d97706'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedDemandMonth('Feb')} />
                    <circle cx="135" cy="120" r={selectedDemandMonth === 'Mar' ? '7' : '5'} className="cursor-pointer transition-all" fill={selectedDemandMonth === 'Mar' ? '#92400e' : '#d97706'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedDemandMonth('Mar')} />
                    <circle cx="190" cy="60" r={selectedDemandMonth === 'Apr' ? '7' : '5'} className="cursor-pointer transition-all" fill={selectedDemandMonth === 'Apr' ? '#92400e' : '#d97706'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedDemandMonth('Apr')} />
                    <circle cx="245" cy="105" r={selectedDemandMonth === 'May' ? '7' : '5'} className="cursor-pointer transition-all" fill={selectedDemandMonth === 'May' ? '#92400e' : '#d97706'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedDemandMonth('May')} />
                    <circle cx="300" cy="45" r={selectedDemandMonth === 'Jun' ? '7' : '5'} className="cursor-pointer transition-all" fill={selectedDemandMonth === 'Jun' ? '#92400e' : '#d97706'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedDemandMonth('Jun')} />

                    {/* Axis Labeled Months */}
                    <text x="25" y="168" textAnchor="middle" className={`text-[9px] font-bold uppercase tracking-wider cursor-pointer ${selectedDemandMonth === 'Jan' ? 'fill-amber-800 font-extrabold' : 'fill-gray-400'}`} onClick={() => setSelectedDemandMonth('Jan')}>Jan</text>
                    <text x="80" y="168" textAnchor="middle" className={`text-[9px] font-bold uppercase tracking-wider cursor-pointer ${selectedDemandMonth === 'Feb' ? 'fill-amber-800 font-extrabold' : 'fill-gray-400'}`} onClick={() => setSelectedDemandMonth('Feb')}>Feb</text>
                    <text x="135" y="168" textAnchor="middle" className={`text-[9px] font-bold uppercase tracking-wider cursor-pointer ${selectedDemandMonth === 'Mar' ? 'fill-amber-800 font-extrabold' : 'fill-gray-400'}`} onClick={() => setSelectedDemandMonth('Mar')}>Mar</text>
                    <text x="190" y="168" textAnchor="middle" className={`text-[9px] font-bold uppercase tracking-wider cursor-pointer ${selectedDemandMonth === 'Apr' ? 'fill-amber-800 font-extrabold' : 'fill-gray-400'}`} onClick={() => setSelectedDemandMonth('Apr')}>Apr</text>
                    <text x="245" y="168" textAnchor="middle" className={`text-[9px] font-bold uppercase tracking-wider cursor-pointer ${selectedDemandMonth === 'May' ? 'fill-amber-800 font-extrabold' : 'fill-gray-400'}`} onClick={() => setSelectedDemandMonth('May')}>May</text>
                    <text x="300" y="168" textAnchor="middle" className={`text-[9px] font-bold uppercase tracking-wider cursor-pointer ${selectedDemandMonth === 'Jun' ? 'fill-amber-800 font-extrabold' : 'fill-gray-400'}`} onClick={() => setSelectedDemandMonth('Jun')}>Jun</text>

                    {/* Peak Spend Value Tags */}
                    <text x="190" y="44" textAnchor="middle" className="text-[10px] fill-amber-700 font-mono font-black">₹36k</text>
                    <text x="300" y="30" textAnchor="middle" className="text-[10px] fill-amber-700 font-mono font-black">₹48k</text>
                  </svg>
                </div>

                {/* Interactive demand details card matching requested spacing */}
                <div className="mt-5 bg-amber-50/55 border border-amber-200/50 p-4 rounded-lg text-xs leading-relaxed">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="font-extrabold text-[10px] uppercase text-amber-800">
                      Month Diagnostic: {selectedDemandMonth} Allocation Summary
                    </span>
                  </div>
                  {selectedDemandMonth === 'Jan' && <p className="text-gray-600">Spent: <strong>₹25,000</strong>. Soft post-winter branch opening. Heavy requirement centered on basic maintenance lubricants & synthetic additives.</p>}
                  {selectedDemandMonth === 'Feb' && <p className="text-gray-600">Spent: <strong>₹30,000</strong>. Seasonal tire rotation inventory cycle. Added Ramesh Traders to active supply contracts stream.</p>}
                  {selectedDemandMonth === 'Mar' && <p className="text-gray-600">Spent: <strong>₹22,000</strong>. Minimum threshold month. Standard GSTR invoices validated over all branches without any price drift tickets.</p>}
                  {selectedDemandMonth === 'Apr' && <p className="text-gray-600">Spent: <strong>₹36,000</strong>. Elevated demand. High-volume purchase desk orders for specialized copper wire bundles and heavy tools.</p>}
                  {selectedDemandMonth === 'May' && <p className="text-gray-600">Spent: <strong>₹28,500</strong>. Salt Lake regional subhub relocation procurement. 3-way match successfully auto-cleared for 90% of GRN entries.</p>}
                  {selectedDemandMonth === 'Jun' && <p className="text-gray-600">Spent: <strong>₹48,050</strong>. Peak commercial quarter closure. Bulk purchase order release for premium gear sets & heavy battery lines.</p>}
                </div>
              </div>
            </div>

            {/* Chart 2: AVL Supplier Category Coverage (Donut Graph) */}
            <div className="bg-white border border-gray-250 rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">AVL Supplier Category weightage</h3>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2.5 py-1 rounded border border-blue-150">Balanced Base</span>
                </div>
                <p className="text-[11px] text-gray-550 mt-1">
                  Click on categories below to analyze custom supplier coverage.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-8 mt-8">
                {/* SVG Donut */}
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                    {/* Slice 1 (Lubricants - 45%): color amber-500 (#f59e0b) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#d97706"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray="113.1 251.3"
                      strokeDashoffset="0"
                      className="cursor-pointer hover:opacity-80 transition-all"
                      onClick={() => setSelectedCategory('Lubricants')}
                    />
                    {/* Slice 2 (Spare Parts - 30%): color blue-500 (#3b82f6) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray="75.4 251.3"
                      strokeDashoffset="-113.1"
                      className="cursor-pointer hover:opacity-80 transition-all"
                      onClick={() => setSelectedCategory('Spare Parts')}
                    />
                    {/* Slice 3 (Tyres - 15%): color emerald-500 (#10b981) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray="37.7 251.3"
                      strokeDashoffset="-188.5"
                      className="cursor-pointer hover:opacity-80 transition-all"
                      onClick={() => setSelectedCategory('Tyres')}
                    />
                    {/* Slice 4 (Others - 10%): color purple-500 (#8b5cf6) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#8b5cf6"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray="25.1 251.3"
                      strokeDashoffset="-226.2"
                      className="cursor-pointer hover:opacity-80 transition-all"
                      onClick={() => setSelectedCategory('Electricals')}
                    />
                  </svg>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-base font-black text-gray-900 leading-none">12</span>
                    <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold mt-1">AVL Total</span>
                  </div>
                </div>

                {/* Legends - Clickable triggers with dynamic high-contrast rings */}
                <div className="flex-1 space-y-3 text-xs w-full">
                  <button 
                    onClick={() => setSelectedCategory('Lubricants')}
                    className={`w-full flex items-center justify-between p-2 rounded text-left transition-all hover:bg-gray-50 focus:outline-none ${selectedCategory === 'Lubricants' ? 'bg-amber-50 ring-1 ring-amber-200' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-600 block shrink-0" />
                      <div>
                        <span className="block font-bold text-gray-800">Lubricants (45%)</span>
                        <span className="text-[10px] text-gray-400 block">5 Active Vendors</span>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedCategory('Spare Parts')}
                    className={`w-full flex items-center justify-between p-2 rounded text-left transition-all hover:bg-gray-50 focus:outline-none ${selectedCategory === 'Spare Parts' ? 'bg-blue-50 ring-1 ring-blue-200' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block shrink-0" />
                      <div>
                        <span className="block font-bold text-gray-800">Spare Parts (30%)</span>
                        <span className="text-[10px] text-gray-400 block">3 Active Vendors</span>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedCategory('Tyres')}
                    className={`w-full flex items-center justify-between p-2 rounded text-left transition-all hover:bg-gray-50 focus:outline-none ${selectedCategory === 'Tyres' ? 'bg-emerald-50 ring-1 ring-emerald-200' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block shrink-0" />
                      <div>
                        <span className="block font-bold text-gray-800">Tyres & Rubber (15%)</span>
                        <span className="text-[10px] text-gray-400 block">2 Active Vendors</span>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedCategory('Electricals')}
                    className={`w-full flex items-center justify-between p-2 rounded text-left transition-all hover:bg-gray-50 focus:outline-none ${selectedCategory === 'Electricals' ? 'bg-purple-50 ring-1 ring-purple-200' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 block shrink-0" />
                      <div>
                        <span className="block font-bold text-gray-800">Electricals (10%)</span>
                        <span className="text-[10px] text-gray-400 block">2 Active Vendors</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dynamic vendor breakdown details card */}
              <div className="mt-4 bg-slate-50 border border-slate-200/50 p-4 rounded-lg text-xs">
                <span className="block text-[9.5px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                  Active {selectedCategory} Dealers registered in VMS
                </span>
                {selectedCategory === 'Lubricants' && (
                  <p className="text-gray-600 font-medium">✓ Ramesh Traders, Salt Lake Chem-Line, General Oils Corp, Castrol Distributors HQ.</p>
                )}
                {selectedCategory === 'Spare Parts' && (
                  <p className="text-gray-600 font-medium">✓ Bengal Auto Supplies, Metro Auto Parts, High-Precision Gearbox Ltd.</p>
                )}
                {selectedCategory === 'Tyres' && (
                  <p className="text-gray-600 font-medium">✓ Howrah Tyres Ltd, Dunlop Wholesale Agency Corp.</p>
                )}
                {selectedCategory === 'Electricals' && (
                  <p className="text-gray-600 font-medium">✓ Metro Accessories Electricals, Kolkata Wiring Hub Co.</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Price benchmark alerts */}
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3.5">Price Benchmark Alerts</h2>
              <div className="overflow-x-auto text-[11px]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                      <th className="p-2">Item Description</th>
                      <th className="p-2 text-right">My Branch</th>
                      <th className="p-2 text-right">Cheapest</th>
                      <th className="p-2">Location</th>
                      <th className="p-2 text-center">Spread</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-150 h-9">
                      <td className="p-2 font-medium">Electrical Wiring Harness</td>
                      <td className="p-2 text-right font-mono font-medium">₹12,200</td>
                      <td className="p-2 text-right font-mono text-emerald-600">₹11,000</td>
                      <td className="p-2 text-gray-500">Salt Lake</td>
                      <td className="p-2 text-center"><span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">+10.9%</span></td>
                    </tr>
                    <tr className="border-b border-gray-150 h-9">
                      <td className="p-2 font-medium">Battery 12V</td>
                      <td className="p-2 text-right font-mono font-medium">₹5,200</td>
                      <td className="p-2 text-right font-mono text-emerald-600">₹4,800</td>
                      <td className="p-2 text-gray-500">Salt Lake</td>
                      <td className="p-2 text-center"><span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded">+8.3%</span></td>
                    </tr>
                    <tr className="border-b border-gray-150 h-9">
                      <td className="p-2 font-medium">Brake Pads</td>
                      <td className="p-2 text-right font-mono font-medium">₹980</td>
                      <td className="p-2 text-right font-mono text-emerald-600">₹920</td>
                      <td className="p-2 text-gray-500">Salt Lake</td>
                      <td className="p-2 text-center"><span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded">+6.5%</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bulk Consolidity */}
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 block">Bulk Consolidation Opportunities</h2>
              <div className="space-y-4">
                <div className="text-xs flex justify-between items-center bg-gray-50 border p-3 rounded">
                  <div>
                    <span className="font-semibold text-gray-900 block">Engine Oil 10W30</span>
                    <span className="text-gray-500 mt-1">Combine Kolkata + Howrah + Salt Lake branches (80 ltrs total).</span>
                  </div>
                  <span className="text-xs text-indigo-700 font-mono font-bold bg-indigo-50 px-2 py-0.5 rounded">Save 12.5%</span>
                </div>
                <button
                  onClick={() => setToastMsg("Instant notification ping dispatched to GMs of Salt Lake Branch, Howrah Branch, and Barasat Branch to synchronize order baskets.")}
                  className="bg-white border border-gray-200 text-gray-700 px-3 h-8 text-xs font-semibold rounded uppercase tracking-wider hover:bg-gray-50 cursor-pointer"
                >
                  Ping Location GM
                </button>
              </div>
            </div>
          </div>

          {/* Open Requisitions */}
          <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400">Open Requisitions — Kolkata HQ</h2>
              <button onClick={() => setCurrentPage('requisitions')} className="text-blue-600 font-semibold uppercase tracking-wider text-[10px] hover:underline">
                View All
              </button>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-3">Req ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Raised By</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-center">Priority</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requisitions
                    .filter(r => r.location === 'Kolkata HQ')
                    .map((r) => (
                      <tr key={r.id} className="border-b border-gray-200 h-10 hover:bg-gray-50/50">
                        <td className="p-3 font-semibold text-gray-500 font-mono">{r.id}</td>
                        <td className="p-3 text-gray-900 font-medium">{r.title}</td>
                        <td className="p-3 text-gray-600">{r.raisedBy}</td>
                        <td className="p-3 font-mono text-gray-400">{r.date}</td>
                        <td className="p-3 text-center">
                          <span className={`text-[9px] uppercase tracking-wider font-semibold rounded px-1.5 py-0.5 ${
                            r.priority === 'Critical' ? 'bg-red-50 text-red-700 border border-red-250' : r.priority === 'Urgent' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {r.priority}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`text-[9.5px] uppercase font-bold tracking-wider ${
                            r.status === 'Approved' ? 'text-green-700' : r.status === 'Rejected' ? 'text-red-650' : 'text-amber-700'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2.2 GM > REQUISITIONS */}
      {currentPage === 'requisitions' && !selectedReq && (
        <div id="requisitions-list-view">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Requisitions Approved Pipeline</h1>
              <p className="text-sm text-gray-500 mt-1">Review, authorize, alter quantity or reject branch spending requisitions</p>
            </div>
          </div>

          {reqSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3 px-4 rounded">
              {reqSuccessMsg}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded p-4 mb-5 flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-500 uppercase tracking-wider">Status:</span>
              <select
                value={reqFilterStatus}
                onChange={(e) => setReqFilterStatus(e.target.value)}
                className="h-8 border border-gray-200 bg-white rounded px-2 focus:outline-none"
              >
                <option value="All">All statuses</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-500 uppercase tracking-wider">Priority:</span>
              <select
                value={reqFilterPriority}
                onChange={(e) => setReqFilterPriority(e.target.value)}
                className="h-8 border border-gray-200 bg-white rounded px-2 focus:outline-none"
              >
                <option value="All">All priorities</option>
                <option value="Critical">Critical</option>
                <option value="Urgent">Urgent</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-28">Req ID</th>
                  <th className="p-3">Title Description</th>
                  <th className="p-3">Raised By</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-center">Priority</th>
                  <th className="p-3">Branch Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {requisitions
                  .filter((r) => {
                    const matchesStatus = reqFilterStatus === 'All' || r.status === reqFilterStatus;
                    const matchesPriority = reqFilterPriority === 'All' || r.priority === reqFilterPriority;
                    return matchesStatus && matchesPriority;
                  })
                  .map((r) => (
                    <tr key={r.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/40">
                      <td className="p-3 font-semibold text-gray-500 font-mono">{r.id}</td>
                      <td className="p-3 text-gray-900 font-semibold">{r.title}</td>
                      <td className="p-3 text-gray-600">{r.raisedBy}</td>
                      <td className="p-3 font-mono text-gray-400">{r.date}</td>
                      <td className="p-3 text-center">
                        <span className={`text-[9px] uppercase tracking-wider font-semibold rounded px-1.5 py-0.5 ${
                          r.priority === 'Critical' ? 'bg-red-50 text-red-700' : r.priority === 'Urgent' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {r.priority}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700 font-medium">{r.location}</td>
                      <td className="p-3">
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${
                          r.status === 'Approved' ? 'text-green-700' : r.status === 'Rejected' ? 'text-red-650' : 'text-amber-700 animate-pulse'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {r.status === 'Pending Approval' ? (
                          <button
                            onClick={() => {
                              setSelectedReq(r);
                              setReqReviewRemark('');
                              setReqSuccessMsg('');
                            }}
                            className="bg-blue-600 text-white font-medium px-3 h-7 rounded hover:bg-blue-700 text-xs tracking-wider uppercase cursor-pointer"
                          >
                            Review
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedReq(r);
                              setReqSuccessMsg('');
                            }}
                            className="text-gray-500 hover:text-gray-800 text-[10px] uppercase font-bold"
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REQUISITION INLINE REVIEW DETAILED WORKFLOW IN GM PORTAL */}
      {currentPage === 'requisitions' && selectedReq && (
        <div id="requisition-review-panel" className="bg-white border border-gray-200 rounded p-6 shadow-sm text-xs">
          <button
            onClick={() => setSelectedReq(null)}
            className="text-[10px] uppercase font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Requisitions
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Left side detail specifications (col-span-3) */}
            <div className="lg:col-span-3 space-y-5">
              <div className="bg-gray-50 border p-4 rounded text-xs space-y-2.5">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider">Demand Reference</span>
                  <span className="font-bold text-gray-900 font-mono">{selectedReq.id}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider">Title Description</span>
                  <span className="font-semibold text-gray-900">{selectedReq.title}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider">Raised By Account</span>
                  <span className="font-medium text-gray-700">{selectedReq.raisedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider">Home Branch</span>
                  <span className="font-medium text-gray-700">{selectedReq.location}</span>
                </div>
              </div>

              {/* Line items table with editable quantities */}
              <div className="bg-white border rounded shadow-sm overflow-hidden p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Itemized Qty Requirements</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                      <th className="p-2">Description</th>
                      <th className="p-2">Category</th>
                      <th className="p-2 text-center w-28">Requested Qty</th>
                      <th className="p-2 text-right">Est UNIT Rate</th>
                      <th className="p-2 text-right">Total Est</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReq.items.map((item) => {
                      const isEditing = editingItemId === item.id;
                      return (
                        <tr key={item.id} className="border-b h-11 text-xs">
                          <td className="p-2 font-medium text-gray-900">{item.description}</td>
                          <td className="p-2 text-gray-500 uppercase text-[9px]">{item.category}</td>
                          <td className="p-2 text-center">
                            {isEditing ? (
                              <div className="flex items-center gap-1.5 justify-center">
                                <input
                                  type="number"
                                  value={editingItemQty}
                                  onChange={(e) => setEditingItemQty(Number(e.target.value))}
                                  onBlur={() => {
                                    const updatedRequisitions = requisitions.map((req) => {
                                      if (req.id === selectedReq.id) {
                                        return {
                                          ...req,
                                          items: req.items.map((it) => {
                                            if (it.id === item.id) {
                                              return { ...it, qty: editingItemQty };
                                            }
                                            return it;
                                          })
                                        };
                                      }
                                      return req;
                                    });
                                    setRequisitions(updatedRequisitions);
                                    // Update locally selected too
                                    setSelectedReq(prev => prev ? {
                                      ...prev,
                                      items: prev.items.map(it => it.id === item.id ? { ...it, qty: editingItemQty } : it)
                                    } : null);
                                    setEditingItemId(null);
                                  }}
                                  className="w-16 h-7 text-center border border-gray-300 rounded focus:border-indigo-650 text-xs focus:outline-none"
                                  autoFocus
                                />
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  if (selectedReq.status === 'Pending Approval') {
                                    setEditingItemId(item.id);
                                    setEditingItemQty(item.qty);
                                  }
                                }}
                                className={`font-mono text-gray-900 font-semibold underline px-2 py-1 select-none ${
                                  selectedReq.status === 'Pending Approval' ? 'hover:bg-blue-50 cursor-pointer text-blue-600' : 'no-underline text-gray-900'
                                }`}
                                title="Click to modify qty inline"
                              >
                                {item.qty} {item.unit}
                              </button>
                            )}
                          </td>
                          <td className="p-2 text-right font-mono text-gray-500">₹{item.estPrice.toLocaleString()}</td>
                          <td className="p-2 text-right font-mono font-semibold text-gray-900">₹{(item.qty * item.estPrice).toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {selectedReq.status === 'Pending Approval' && (
                  <p className="text-[10px] text-gray-400 mt-2 text-center">
                    Note: Click underlined quantity to adjust required baseline prior to approval dispatch.
                  </p>
                )}
              </div>
            </div>

            {/* Right side GM actions (col-span-2) */}
            <div className="lg:col-span-2 bg-gray-50 border p-5 rounded space-y-4">
              <h3 className="text-xs uppercase font-bold text-gray-400">GM Decision Action</h3>

              {selectedReq.status === 'Pending Approval' ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Remarks & Auditing Comments</label>
                    <textarea
                      rows={3}
                      value={reqReviewRemark}
                      onChange={(e) => setReqReviewRemark(e.target.value)}
                      placeholder="Comment is mandatory if rejecting..."
                      className="w-full border border-gray-200 rounded p-2 text-xs bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        const comments = reqReviewRemark || "Approved. Proceed with RFQ.";
                        const updated = requisitions.map((r) => {
                          if (r.id === selectedReq.id) {
                            return { ...r, status: 'Approved' as const, gmRemark: comments };
                          }
                          return r;
                        });
                        setRequisitions(updated);
                        setReqSuccessMsg(`Requisition ${selectedReq.id} approved successfully and pushed to active purchase execution lines.`);
                        setSelectedReq(null);
                      }}
                      className="bg-green-600 text-white font-medium px-4 h-9 w-full rounded hover:bg-green-700 text-xs tracking-wider uppercase cursor-pointer"
                    >
                      Approve Requisition
                    </button>
                    <button
                      onClick={() => {
                        if (!reqReviewRemark) {
                          alert("A detailed auditing remark comment is mandatory to reject a spending requisition.");
                          return;
                        }
                        const updated = requisitions.map((r) => {
                          if (r.id === selectedReq.id) {
                            return { ...r, status: 'Rejected' as const, gmRemark: reqReviewRemark };
                          }
                          return r;
                        });
                        setRequisitions(updated);
                        setReqSuccessMsg(`Requisition ${selectedReq.id} rejected and returned payload trace to Ratan Das.`);
                        setSelectedReq(null);
                      }}
                      className="bg-red-650 text-white font-medium px-4 h-9 w-full rounded hover:bg-red-700 text-xs tracking-wider uppercase cursor-pointer"
                    >
                      Reject Requisition
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 p-3.5 bg-white border border-gray-150 rounded text-xs">
                  <div>
                    <span className="text-gray-400 uppercase text-[9px] font-bold block">FMC Status</span>
                    <span className="font-semibold text-gray-900 uppercase">{selectedReq.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase text-[9px] font-bold block">Authorised GM Remark</span>
                    <p className="text-gray-700 font-mono mt-0.5">{selectedReq.gmRemark || 'No remarks recorded.'}</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 2.3 GM > RFQ & QUOTES */}
      {currentPage === 'rfqQuotes' && !selectedRfq && (
        <div id="rfq-quotes-list">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">RFQ & Quotes Comparison</h1>
              <p className="text-sm text-gray-500 mt-1">Cross-reference incoming vendor pricing quotes sent to branch stakeholders</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-28">RFQ ID</th>
                  <th className="p-3">Linked Req</th>
                  <th className="p-3">Vendors Approached</th>
                  <th className="p-3 text-center">Quotes In Logs</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {rfqs.map((r) => (
                  <tr key={r.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-500 font-mono">{r.id}</td>
                    <td className="p-3 font-mono font-medium text-gray-600">{r.linkedReqId}</td>
                    <td className="p-3 text-gray-700 font-medium truncate max-w-xs">{r.vendorsApproached.join(', ')}</td>
                    <td className="p-3 text-center font-mono font-bold text-blue-600">{r.quotes.length} / {r.vendorsApproached.length}</td>
                    <td className="p-3 font-mono text-gray-400">{r.deadline}</td>
                    <td className="p-3">
                      <span className={`text-[9px] uppercase tracking-wide rounded px-2 py-0.5 font-bold ${
                        r.status === 'Closed' ? 'text-gray-500 bg-gray-100' : 'text-blue-700 bg-blue-50'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedRfq(r)}
                        className="text-blue-600 hover:underline uppercase tracking-wider text-[10px] font-bold cursor-pointer"
                      >
                        View Comparison
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAIL RFQ SIDE-BY-SIDE COMPARE */}
      {currentPage === 'rfqQuotes' && selectedRfq && (
        <div id="rfq-comparison-detail" className="bg-white border border-gray-200 rounded p-6 shadow-sm text-xs">
          <button
            onClick={() => setSelectedRfq(null)}
            className="text-[10px] uppercase font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to RFQ Grid
          </button>

          <div className="border-b border-gray-200 pb-3 mb-5 flex justify-between items-center">
            <div>
              <h2 className="text-md font-semibold text-gray-900">RFQ Comparison Ledger: {selectedRfq.id}</h2>
              <span className="text-[10px] font-mono text-gray-400 mt-1 block">Linked Demand: {selectedRfq.linkedReqId}</span>
            </div>
            <span className="text-xs uppercase tracking-wide bg-blue-50 text-blue-700 rounded px-2.5 py-1 font-semibold font-mono">
              Deadline: {selectedRfq.deadline}
            </span>
          </div>

          {/* Vendors Approached Subtable */}
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">Vendors Approached Response</h3>
          <div className="bg-white border rounded shadow-sm overflow-hidden mb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                  <th className="p-2.5">Vendor Name</th>
                  <th className="p-2.5">SLA Check Category</th>
                  <th className="p-2.5 text-center">Quote Logged?</th>
                  <th className="p-2.5 text-right">Total Price logged</th>
                  <th className="p-2.5">Taxes Terms</th>
                </tr>
              </thead>
              <tbody>
                {selectedRfq.vendorsApproached.map((vName, idx) => {
                  const q = selectedRfq.quotes.find(it => it.vendorName === vName);
                  const totalPrice = q ? (Object.values(q.prices) as number[]).reduce((a: number, b: number) => a + b, 0) : 0;
                  return (
                    <tr key={idx} className="border-b h-10 text-xs">
                      <td className="p-2.5 font-semibold text-gray-900">{vName}</td>
                      <td className="p-2.5 text-gray-500">Lubricants / Parts</td>
                      <td className="p-2.5 text-center">
                        <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                          q ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50'
                        }`}>
                          {q ? 'Logged' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-2.5 text-right font-semibold font-mono text-gray-900">
                        {q ? `₹${totalPrice.toLocaleString()}` : '—'}
                      </td>
                      <td className="p-2.5 text-gray-600 font-mono text-[10px]">{q ? q.paymentTerms : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Comparative Matrix side by side */}
          {selectedRfq.quotes.length >= 2 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">Side-by-Side Quote Analytical Matrix</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedRfq.quotes.map((q, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded text-xs">
                    <div className="flex justify-between items-center border-b pb-2 mb-3">
                      <span className="font-bold text-gray-950 text-sm">{q.vendorName}</span>
                      <span className="text-[10px] bg-blue-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded">
                        Quote Submitted
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      {Object.entries(q.prices).map(([iKey, pVal]) => (
                        <div key={iKey} className="flex justify-between py-1 border-b border-gray-100">
                          <span className="text-gray-500 font-medium">Line Item ({iKey})</span>
                          <span className="font-semibold text-gray-900 font-mono">₹{pVal.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2.5 font-bold text-sm text-gray-900">
                        <span>Totalex-GST Bid</span>
                        <span className="text-blue-600 font-mono">₹{(Object.values(q.prices) as number[]).reduce((a: number, b: number) => a + b, 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2.4 GM > VENDOR SELECTION */}
      {currentPage === 'vendorSelection' && !selectedRfqForSelection && (
        <div id="selection-queue">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Vendor Selection Approvals</h1>
              <p className="text-sm text-gray-500 mt-1">Review and approve suggested L1 or justified non-L1 contract allocations</p>
            </div>
          </div>

          {selectionSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3 px-4 rounded">
              {selectionSuccessMsg}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-28">RFQ ID</th>
                  <th className="p-3">Suggested Vendor</th>
                  <th className="p-3">Reason / Justification summary</th>
                  <th className="p-3">Suggested By</th>
                  <th className="p-3">Proposed Value</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                  <td className="p-3 font-semibold text-gray-500 font-mono">RFQ-2024-001</td>
                  <td className="p-3 font-semibold text-gray-900">Ramesh Traders</td>
                  <td className="p-3 text-gray-600 max-w-sm truncate">L1 bidder matching immediate response specs...</td>
                  <td className="p-3 text-gray-500">Ratan Das</td>
                  <td className="p-3 font-mono font-semibold">₹18,000</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedRfqForSelection(rfqs[0])}
                      className="bg-blue-600 text-white font-medium px-3 h-7 rounded hover:bg-blue-700 text-xs tracking-wider uppercase cursor-pointer"
                    >
                      Compare & Decide
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                  <td className="p-3 font-semibold text-gray-500 font-mono">RFQ-2024-002</td>
                  <td className="p-3 font-semibold text-gray-900">Howrah Tyres Ltd.</td>
                  <td className="p-3 text-gray-600 max-w-sm truncate">Required for critical workshop priority. 2-day delivery guaranteed.</td>
                  <td className="p-3 text-gray-500">Ratan Das</td>
                  <td className="p-3 font-mono font-semibold">₹28,000</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedRfqForSelection(rfqs[1])}
                      className="bg-blue-600 text-white font-medium px-3 h-7 rounded hover:bg-blue-700 text-xs tracking-wider uppercase cursor-pointer"
                    >
                      Compare & Decide
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedRfqForSelection && (
        <div id="selection-action-panel" className="bg-white border border-gray-200 rounded p-6 shadow-sm text-xs">
          <button
            onClick={() => setSelectedRfqForSelection(null)}
            className="text-[10px] uppercase font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Selection Queue
          </button>

          <h2 className="text-sm font-semibold text-gray-900 border-b pb-2 mb-4">
            Allocation Sign-off: {selectedRfqForSelection.id}
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-5 text-xs text-blue-800">
            <span className="font-bold block uppercase text-[9px] mb-1">Proposed Allocator Recommendation Card</span>
            <p className="mt-1">
              Purchase Team suggests allocating order to <strong className="text-gray-900">Ramesh Traders</strong> for Engine Oil. 
              Price matches standard AVL guidelines. Low variance check passed.
            </p>
          </div>

          <div className="bg-gray-50 border p-5 rounded space-y-3 mb-6">
            <h3 className="text-xs uppercase font-bold text-gray-400">GM Decision remark</h3>
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Approval Comments</label>
              <textarea
                rows={2}
                value={selectionRemark}
                onChange={(e) => setSelectionRemark(e.target.value)}
                placeholder="Required comment..."
                className="w-full border border-gray-200 rounded p-2 text-xs bg-white focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectionSuccessMsg(`Selection recommendation for ${selectedRfqForSelection.id} has been Approved.`);
                  setSelectedRfqForSelection(null);
                }}
                className="bg-green-600 text-white font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-green-700 cursor-pointer"
              >
                Approve Selection
              </button>
              <button
                onClick={() => {
                  setSelectionSuccessMsg(`Selection recommendation for ${selectedRfqForSelection.id} has been Rejected. Requested renegotiated RFQ terms.`);
                  setSelectedRfqForSelection(null);
                }}
                className="bg-red-650 text-white font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-red-700 cursor-pointer"
              >
                Reject Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2.5 GM > ACTIVE POS */}
      {currentPage === 'activePOs' && !selectedPo && (
        <div id="pos-ledger-list">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Active Purchase Orders (POs)</h1>
              <p className="text-sm text-gray-500 mt-1">Audit active delivery schedules, dispatch logs, and pending items receipts</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-28">PO Number</th>
                  <th className="p-3">Vendor</th>
                  <th className="p-3">Item Summary</th>
                  <th className="p-3 text-right">Value</th>
                  <th className="p-3 text-center">Expected Delivery</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {pos.map((p) => (
                  <tr key={p.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-500 font-mono">{p.id}</td>
                    <td className="p-3 font-semibold text-gray-900">{p.vendorName}</td>
                    <td className="p-3 text-gray-600">{p.itemSummary}</td>
                    <td className="p-3 text-right font-mono font-semibold">₹{p.value.toLocaleString()}</td>
                    <td className="p-3 text-center font-mono text-gray-400">{p.expectedDelivery}</td>
                    <td className="p-3">
                      <span className={`text-[9px] uppercase tracking-wide rounded px-2 py-0.5 font-bold ${
                        p.status === 'Completed' ? 'text-green-700 bg-green-50' : 'text-blue-700 bg-blue-50'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedPo(p)}
                        className="text-blue-600 hover:underline uppercase tracking-wider text-[10px] font-bold cursor-pointer"
                      >
                        View Timeline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PO DETAIL TIMELINE TRACKER */}
      {currentPage === 'activePOs' && selectedPo && (
        <div id="po-timeline-tracking" className="bg-white border border-gray-200 rounded p-6 shadow-sm text-xs">
          <button
            onClick={() => setSelectedPo(null)}
            className="text-[10px] uppercase font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Active POs
          </button>

          <div className="bg-gray-50 border p-4 rounded text-xs grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <span className="text-gray-400 font-bold block uppercase text-[9px] tracking-wider">Purchase Order</span>
              <span className="font-mono text-sm font-semibold text-gray-900">{selectedPo.id}</span>
            </div>
            <div>
              <span className="text-gray-400 font-bold block uppercase text-[9px] tracking-wider">Vendor Account</span>
              <span className="text-sm font-semibold text-gray-900">{selectedPo.vendorName}</span>
            </div>
            <div>
              <span className="text-gray-400 font-bold block uppercase text-[9px] tracking-wider">Estimated Value</span>
              <span className="text-sm font-semibold text-gray-900 font-mono">₹{selectedPo.value.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-400 font-bold block uppercase text-[9px] tracking-wider">Status</span>
              <span className="text-xs uppercase bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded">{selectedPo.status}</span>
            </div>
          </div>

          {/* Stepper timeline indicator */}
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Milestone Delivery Timeline</h3>
          <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-gray-50 border border-gray-200 rounded mb-6 text-center text-xs">
            <div className="flex-1">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center mx-auto text-[10px]">✓</div>
              <span className="font-semibold block mt-1.5 text-gray-900">PO Raised</span>
            </div>
            <div className="w-6 h-px bg-gray-300" />
            <div className="flex-1">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center mx-auto text-[10px]">✓</div>
              <span className="font-semibold block mt-1.5 text-gray-900">Dispatched</span>
            </div>
            <div className="w-6 h-px bg-gray-300" />
            <div className="flex-1">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center mx-auto text-[10px]">✓</div>
              <span className="font-semibold block mt-1.5 text-gray-900">Delivered</span>
            </div>
            <div className="w-6 h-px bg-gray-300" />
            <div className="flex-1">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-[10px]">4</div>
              <span className="font-semibold block mt-1.5 text-blue-600">Pending QC</span>
            </div>
          </div>

          <div className="bg-white border rounded shadow-sm overflow-hidden p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">Specific ordered line items</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                  <th className="p-2">Description</th>
                  <th className="p-2 text-center">Ordered Qty</th>
                  <th className="p-2 text-right">Unit Net Price</th>
                  <th className="p-2 text-right">CGST / SGST</th>
                  <th className="p-2 text-right">Sum total value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b h-10">
                  <td className="p-2 text-gray-900 font-semibold">{selectedPo.itemSummary}</td>
                  <td className="p-2 text-center font-mono text-gray-700">10 Sets</td>
                  <td className="p-2 text-right font-mono text-gray-500">₹950</td>
                  <td className="p-2 text-right font-mono text-gray-500">18%</td>
                  <td className="p-2 text-right font-semibold font-mono text-gray-900">₹{selectedPo.value.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2.6 GM > QUALITY CHECK QUEUE */}
      {currentPage === 'qualityCheck' && !selectedGRNForQC && (
        <div id="qc-queue">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Quality Check (QC) Intake Queue</h1>
              <p className="text-sm text-gray-500 mt-1">Review incoming physical branch deliveries and log and audit shortfalls, damages or accept logs</p>
            </div>
          </div>

          {qcSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3 px-4 rounded">
              {qcSuccessMsg}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-28">GRN reference</th>
                  <th className="p-3 font-semibold">PO Number</th>
                  <th className="p-3 font-semibold">Vendor Name</th>
                  <th className="p-3">Received date</th>
                  <th className="p-3">Log Receiver</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {grns
                  .filter((g) => g.status === 'Submitted' || g.status === 'Accepted (QC Pending)')
                  .map((g) => (
                    <tr key={g.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                      <td className="p-3 font-semibold text-gray-500 font-mono">{g.id}</td>
                      <td className="p-3 font-mono text-gray-500">{g.poId}</td>
                      <td className="p-3 font-semibold text-gray-900">{g.vendorName}</td>
                      <td className="p-3 font-mono text-gray-400">{g.receivedDate}</td>
                      <td className="p-3 text-gray-600 font-medium">{g.receivedBy}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedGRNForQC(g);
                            // Initialise qc status items
                            setQCRows(g.items.map(it => ({
                              id: it.description,
                              receivedQty: g.items[0].receivedQty || 10,
                              condition: 'Good',
                              passed: true
                            })));
                            setQcDamageNotes('');
                            setQcRemarks('');
                            setQcTriggeredReject(false);
                          }}
                          className="bg-blue-600 text-white font-medium px-3 h-7 rounded hover:bg-blue-700 text-xs tracking-wider uppercase cursor-pointer"
                        >
                          Run QC
                        </button>
                      </td>
                    </tr>
                  ))}
                {grns.filter((g) => g.status === 'Submitted' || g.status === 'Accepted (QC Pending)').length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-xs text-gray-400">
                      No matching goods receipt awaiting quality checks.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedGRNForQC && (
        <div id="qc-flow-panel" className="bg-white border border-gray-200 rounded p-6 shadow-sm text-xs">
          <button
            onClick={() => setSelectedGRNForQC(null)}
            className="text-[10px] uppercase font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to QC Queue
          </button>

          <div className="border-b border-gray-250 pb-3 mb-5 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Run Material Inspection Check: {selectedGRNForQC.id}</h2>
              <span className="text-[10px] font-mono text-gray-400 mt-1 block">PO Ref: {selectedGRNForQC.poId} | Supplier: {selectedGRNForQC.vendorName}</span>
            </div>
          </div>

          {/* Photo Evidence Mocks */}
          <div className="bg-gray-50 border p-4 rounded mb-6">
            <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider mb-2 block">Delivery Photo Evidence</span>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-200 border border-gray-300 h-20 rounded flex items-center justify-center text-gray-400 text-[10px] font-mono select-none">
                Goods Photo 1
              </div>
              <div className="bg-gray-200 border border-gray-300 h-20 rounded flex items-center justify-center text-gray-400 text-[10px] font-mono select-none">
                Goods Photo 2
              </div>
              <div className="bg-gray-200 border border-gray-300 h-20 rounded flex items-center justify-center text-gray-400 text-[10px] font-mono select-none">
                Invoice Copy
              </div>
            </div>
          </div>

          {/* Line by line QC controls */}
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 block">Material Inspection Form</h3>
          <div className="bg-white border rounded shadow-sm overflow-hidden mb-6 p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                  <th className="p-2 text-left">Item Description</th>
                  <th className="p-2 text-center w-36">Received Quantity</th>
                  <th className="p-2 text-center w-40">Packaging Condition</th>
                  <th className="p-2 text-right w-36">Audit Result</th>
                </tr>
              </thead>
              <tbody>
                {qcRows.map((row, idx) => (
                  <tr key={idx} className="border-b h-12 text-xs">
                    <td className="p-2 font-semibold text-gray-900">{row.id}</td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        value={row.receivedQty}
                        onChange={(e) => {
                          const updated = [...qcRows];
                          updated[idx].receivedQty = Number(e.target.value);
                          setQCRows(updated);
                        }}
                        className="w-20 text-center text-sm font-mono border border-gray-200 rounded h-8 bg-white"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <select
                        value={row.condition}
                        onChange={(e) => {
                          const val = e.target.value as 'Good' | 'Damaged' | 'Partial';
                          const updated = [...qcRows];
                          updated[idx].condition = val;
                          if (val === 'Damaged' || val === 'Partial') {
                            updated[idx].passed = false;
                          } else {
                            updated[idx].passed = true;
                          }
                          setQCRows(updated);
                        }}
                        className="h-8 border border-gray-200 bg-white rounded px-2 text-xs w-28 focus:outline-none"
                      >
                        <option value="Good">Good</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Partial">Partial</option>
                      </select>
                    </td>
                    <td className="p-2 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => {
                            const updated = [...qcRows];
                            updated[idx].passed = true;
                            setQCRows(updated);
                          }}
                          className={`px-3 py-1 text-[10px] uppercase font-bold rounded cursor-pointer ${
                            row.passed ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          Pass
                        </button>
                        <button
                          onClick={() => {
                            const updated = [...qcRows];
                            updated[idx].passed = false;
                            setQCRows(updated);
                          }}
                          className={`px-3 py-1 text-[10px] uppercase font-bold rounded cursor-pointer ${
                            !row.passed ? 'bg-red-650 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          Fail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Damage shorthand text area */}
            {qcRows.some(r => !r.passed || r.condition !== 'Good') && (
              <div className="mt-4 transition-all">
                <label className="text-[10px] font-bold uppercase text-red-600 block mb-1">Shortage & Damage Notes (Required)</label>
                <textarea
                  rows={2}
                  value={qcDamageNotes}
                  onChange={(e) => setQcDamageNotes(e.target.value)}
                  placeholder="Detail exact breakdown of damages or missing count logs..."
                  className="w-full border border-red-200 rounded p-2 text-xs bg-white focus:outline-none"
                />
              </div>
            )}
          </div>

          <div className="bg-gray-50 border p-4 rounded text-xs mb-6">
            <span className="font-bold block uppercase text-[10px] tracking-wider mb-1 text-gray-500">Agreed SLA Standards reference</span>
            <p className="text-gray-600">
              Contract with <strong>{selectedGRNForQC.vendorName}</strong> demands delivery within 3 business days. 
              All items must show original tamperproof manufacturing seals. Tolerance limits: ±1%.
            </p>
          </div>

          <div className="bg-gray-100 p-5 border border-gray-200 rounded text-xs">
            <div className="mb-4">
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">General QC Supervisor Comments</label>
              <textarea
                rows={2}
                value={qcRemarks}
                onChange={(e) => setQcRemarks(e.target.value)}
                placeholder="Comment is mandatory if failing qc logs..."
                className="w-full border border-gray-200 rounded p-2 text-xs bg-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (qcRows.some(r => !r.passed) && !qcRemarks) {
                    alert("A general qc supervisor comment is mandatory to reject or record damaged components.");
                    return;
                  }

                  // Find status
                  const isSuccess = qcRows.every(r => r.passed);
                  
                  // Update grn state
                  const updatedGrns = grns.map(g => {
                    if (g.id === selectedGRNForQC.id) {
                      return {
                        ...g,
                        status: isSuccess ? 'Accepted' as const : 'Pending Submission' as const,
                        shortageDamageNotes: qcDamageNotes,
                        grnRemarks: qcRemarks
                      };
                    }
                    return g;
                  });
                  setGrns(updatedGrns);

                  // Update PO state too
                  const updatedPOs = pos.map(p => {
                    if (p.id === selectedGRNForQC.poId) {
                      return {
                        ...p,
                        status: isSuccess ? 'Completed' as const : 'Delivered (GRN Pending)' as const
                      };
                    }
                    return p;
                  });
                  setPos(updatedPOs);

                  setQcSuccessMsg(
                    isSuccess 
                      ? `GRN ${selectedGRNForQC.id} has PASSED quality checks and accepted onto Tally ERP books.` 
                      : `QC failures logged for GRN ${selectedGRNForQC.id}. Re-entry and vendor returns processes flagged.`
                  );
                  setSelectedGRNForQC(null);
                }}
                className="bg-green-600 text-white font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-green-700 cursor-pointer"
              >
                Accept Goods
              </button>
              
              <button
                onClick={() => setQcTriggeredReject(true)}
                className="bg-red-650 text-white font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-red-700 cursor-pointer"
              >
                Reject — Log Return
              </button>
            </div>

            {qcTriggeredReject && (
              <div className="mt-4 p-4 border border-rose-250 bg-rose-50/50 rounded transition-all">
                <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Rejection Logistics Type</label>
                    <select
                      value={qcRejectionType}
                      onChange={(e) => setQcRejectionType(e.target.value)}
                      className="w-full h-8 border border-gray-200 bg-white rounded px-2"
                    >
                      <option value="Return to Vendor">Return to Vendor Account</option>
                      <option value="Request Rework">Request Manufacturer Rework</option>
                      <option value="Replacement">Immediate Replacement</option>
                    </select>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] p-3 rounded mb-3">
                  Warning: Triggering rejection log trails will issue automated formal credit disputes linked to PO {selectedGRNForQC.poId}.
                </div>
                <button
                  onClick={() => {
                    setQcSuccessMsg(`Rejection logged for GRN ${selectedGRNForQC.id}. Rejection logistics flagged as: ${qcRejectionType}. Vendor notified.`);
                    setSelectedGRNForQC(null);
                    setQcTriggeredReject(false);
                  }}
                  className="bg-red-650 text-white font-semibold text-xs uppercase tracking-wider h-8 px-3 rounded hover:bg-red-700 cursor-pointer"
                >
                  Confirm Rejection
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2.7 GM > VENDOR ONBOARDING DOSSIER PREPARATION */}
      {currentPage === 'vendorOnboarding' && (
        <div id="gm-vendor-onboarding" className="space-y-6 text-xs animate-fade-in">
          
          {onboardingSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 px-4 rounded flex items-center justify-between mb-4 shadow-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{onboardingSuccessMsg}</span>
              </div>
              <button 
                onClick={() => setOnboardingSuccessMsg('')}
                className="text-xs text-emerald-700 font-bold hover:underline bg-transparent border-0 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {!showOnboardingForm ? (
            <div className="space-y-6">
              
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 p-5 rounded shadow-sm">
                <div>
                  <h1 className="text-xl font-bold text-gray-950 tracking-tight flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-amber-600" />
                    <span>AVL Onboarding Dossier Setup</span>
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">General Manager input hub for preparing initial supplier compliance papers, tax details and logistics parameters</p>
                </div>
                <button
                  onClick={() => {
                    setCoForm({
                      businessName: '',
                      tradeName: '',
                      businessType: 'Private Limited',
                      yearsInOperation: 5,
                      coverage: ['Kolkata HQ'],
                      reputationNotes: 'Prepared independently by GM Vikram Sen.',
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
                    });
                    setShowOnboardingForm(true);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs tracking-wider uppercase px-4 h-9.5 rounded shadow transition-colors flex items-center gap-1.5 cursor-pointer cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>✦ Setup New Vendor Profile</span>
                </button>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Awaiting Director Approval</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {vendors.filter(v => v.status === 'Pending Onboarding').length}
                  </div>
                  <p className="text-[11px] text-amber-600 font-medium mt-1">Dossiers prepared by GM awaiting director master key sign-off</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Approved Active AVL</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {vendors.filter(v => v.status === 'Active').length}
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">Active suppliers vetted & available for PO generation</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Suspended or Pending Vetting</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {vendors.filter(v => v.status === 'Suspended' || v.status === 'Pending').length}
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mt-1">Flagged profiles undergoing risk audits</p>
                </div>
              </div>

              {/* AVL Help Panel */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-4 text-gray-700 leading-relaxed">
                <h4 className="font-bold text-amber-800 text-xs mb-1 uppercase tracking-wide">AVS Dual Gatekeepers Protocol (GM & Director)</h4>
                <p className="text-[11px]">
                  Bhandari Automobiles mandates dual gatekeepers for AVL (Approved Vendor List) onboarding. 
                  As the **General Manager (GM)**, you prepare the detailed dossier profiles, compile the compliance audits, and verify KYC criteria. 
                  Upon submission, the dossier is forwarded onto the **Director's approval desk** for final master registration, unique ID mapping, and physical contract signing.
                </p>
              </div>

              {/* Onboarding applications Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-3">Onboarding Applications Under GM Draft</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                        <th className="p-2.5">Candidate ID</th>
                        <th className="p-2.5">Corporate Legal Name</th>
                        <th className="p-2.5">Category Segment</th>
                        <th className="p-2.5">Locations Allowed</th>
                        <th className="p-2.5">Contact Person</th>
                        <th className="p-2.5 text-right">Approval Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.filter(v => v.status === 'Pending Onboarding' || v.status === 'Pending').length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-6 text-gray-400 font-medium bg-gray-50/50">
                            No active onboarding submissions. Form a new vendor dossier using the button above.
                          </td>
                        </tr>
                      ) : (
                        vendors
                          .filter(v => v.status === 'Pending Onboarding' || v.status === 'Pending')
                          .map((v) => (
                            <tr key={v.id} className="border-b h-11 hover:bg-gray-50/20">
                              <td className="p-2.5 font-mono text-gray-500 font-semibold">{v.id}</td>
                              <td className="p-2.5 font-semibold text-gray-950">{v.name}</td>
                              <td className="p-2.5 text-gray-600">{v.category}</td>
                              <td className="p-2.5 text-gray-600">{v.locations.join(', ')}</td>
                              <td className="p-2.5 text-gray-500 font-medium">
                                <span className="block leading-tight font-semibold text-gray-800">{v.contactName || 'N/A'}</span>
                                <span className="block text-[10px] text-gray-400">{v.email || 'N/A'}</span>
                              </td>
                              <td className="p-2.5 text-right">
                                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                  Awaiting Director sign-off
                                </span>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Form Navigation Header */}
              <div className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded shadow-sm">
                <button
                  onClick={() => setShowOnboardingForm(false)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-semibold bg-white border border-gray-200 px-3 h-8.5 rounded cursor-pointer transition-colors"
                >
                  ← Back to Onboarding List
                </button>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600 block leading-tight">Master KYC Entry</span>
                  <span className="text-sm font-bold text-gray-800 leading-tight">GM Procurement Dossier Form</span>
                </div>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Forms (Takes 2 fractions) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Card 1: Corporate Status */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-amber-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>1. Corporate Identity & Registration Details</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Corporate Legal Registered Name *</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white text-xs text-gray-900"
                          placeholder="e.g. Anand Radiators Pvt Ltd"
                          required
                          value={coForm.businessName}
                          onChange={(e) => setCoForm({ ...coForm, businessName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Trade/DBA Brand Name</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white text-xs text-gray-900"
                          placeholder="e.g. Anand Radiators"
                          value={coForm.tradeName}
                          onChange={(e) => setCoForm({ ...coForm, tradeName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Business Constitution Code</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-900"
                          value={coForm.businessType}
                          onChange={(e) => setCoForm({ ...coForm, businessType: e.target.value })}
                        >
                          <option value="Proprietorship">Proprietorship Single Owner</option>
                          <option value="Partnership">Partnership Deed</option>
                          <option value="Private Limited">Private Limited Company</option>
                          <option value="Public Limited">Public Limited Listed Co.</option>
                          <option value="LLP">Limited Liability Partnership</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Date of Incorporation</label>
                        <input
                          type="date"
                          className="w-full h-8 border border-gray-200 rounded px-2 bg-white text-xs text-gray-900"
                          value={coForm.registrationIncorpDate}
                          onChange={(e) => setCoForm({ ...coForm, registrationIncorpDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Operation Duration (Years)</label>
                        <input
                          type="number"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white text-xs text-gray-900"
                          value={coForm.yearsInOperation}
                          onChange={(e) => setCoForm({ ...coForm, yearsInOperation: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">CIN / LLP Registration Number</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono text-xs uppercase text-gray-900"
                          placeholder="e.g. U34103WB2021PTC243812"
                          value={coForm.cinNumber}
                          onChange={(e) => setCoForm({ ...coForm, cinNumber: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Main Logistics Region</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white text-xs text-gray-900"
                          placeholder="e.g. Kolkata Hub / West Bengal"
                          value={coForm.logisticsRegion}
                          onChange={(e) => setCoForm({ ...coForm, logisticsRegion: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Registered HQ postal Address</label>
                      <textarea
                        className="w-full h-14 border border-gray-200 rounded p-2 bg-white text-xs text-gray-900"
                        placeholder="Complete primary lookup address..."
                        value={coForm.factoryAddress}
                        onChange={(e) => setCoForm({ ...coForm, factoryAddress: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Card 2: Regulatory registrations */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-amber-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>2. Tax & Compliance Registrations</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">GSTIN Identification Number *</label>
                          <span className="text-[9px] text-gray-450 font-semibold font-mono">15 Characters</span>
                        </div>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono text-xs uppercase text-gray-900"
                          placeholder="e.g. 19AAHCA9034E1Z3"
                          maxLength={15}
                          value={coForm.approvedGst}
                          onChange={(e) => setCoForm({ ...coForm, approvedGst: e.target.value.toUpperCase() })}
                        />
                        {coForm.approvedGst && coForm.approvedGst.length !== 15 && (
                          <span className="text-[10px] text-amber-600 block mt-1 font-medium">Must be exactly 15 characters current: {coForm.approvedGst.length}/15</span>
                        )}
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Permanent Account Number (PAN) *</label>
                          <span className="text-[9px] text-gray-450 font-semibold font-mono">10 Characters</span>
                        </div>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono text-xs uppercase text-gray-900"
                          placeholder="e.g. AAHCA9034E"
                          maxLength={10}
                          value={coForm.pan}
                          onChange={(e) => setCoForm({ ...coForm, pan: e.target.value.toUpperCase() })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Govt MSME Classification</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-900"
                          value={coForm.msmeClassification}
                          onChange={(e) => setCoForm({ ...coForm, msmeClassification: e.target.value })}
                        >
                          <option value="Not Registered">Not Registered as MSME</option>
                          <option value="Micro Enterprise (Udyam)">Micro Enterprise (Udyam Registered)</option>
                          <option value="Small Enterprise">Small Enterprise</option>
                          <option value="Medium Enterprise">Medium Enterprise</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Quality Standards ISO Badge</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-900"
                          value={coForm.isoStandard}
                          onChange={(e) => setCoForm({ ...coForm, isoStandard: e.target.value })}
                        >
                          <option value="None">None / Internal Controls only</option>
                          <option value="ISO 9001:2015 Certification">ISO 9001:2015 (Quality Standard)</option>
                          <option value="ISO 14001:2015 Certification">ISO 14001:2015 (Environmental)</option>
                          <option value="IATF 16949 Automotive">IATF 16949 (Automotive Standard)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Contacts */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-amber-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>3. Primary Sourcing Representatives</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Representative Name *</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white text-xs text-gray-900"
                          placeholder="e.g. Ramesh Chandra"
                          value={coForm.contactName}
                          onChange={(e) => setCoForm({ ...coForm, contactName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Helpline Phone *</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white text-xs text-gray-900"
                          placeholder="e.g. +91 94331 48201"
                          value={coForm.contactPhone}
                          onChange={(e) => setCoForm({ ...coForm, contactPhone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Trade Email ID *</label>
                        <input
                          type="email"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white text-xs text-gray-900"
                          placeholder="e.g. contact@anandhardware.in"
                          value={coForm.contactEmail}
                          onChange={(e) => setCoForm({ ...coForm, contactEmail: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Billing Escalation email</label>
                        <input
                          type="email"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white text-xs text-gray-900"
                          placeholder="e.g. billing@anandhardware.in"
                          value={coForm.escalationEmail}
                          onChange={(e) => setCoForm({ ...coForm, escalationEmail: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Offered Commodity Segment</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-900"
                          value={coForm.commodityCategory}
                          onChange={(e) => setCoForm({ ...coForm, commodityCategory: e.target.value })}
                        >
                          <option value="Spare Parts text-gray-900">Spare Parts (Valves, Pistons, Seals)</option>
                          <option value="Lubricants & Consumables">Lubricants & Consumables</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Scrap & Salvage">Scrap & Salvage</option>
                          <option value="Raw Materials">Raw Materials</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Branch Coverage Allowed</label>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {['Kolkata HQ', 'Howrah Hub', 'Siliguri Regional Branch'].map((loc) => {
                            const isChecked = coForm.coverage.includes(loc);
                            return (
                              <button
                                key={loc}
                                type="button"
                                onClick={() => {
                                  const nextCoverage = isChecked
                                    ? coForm.coverage.filter(c => c !== loc)
                                    : [...coForm.coverage, loc];
                                  setCoForm({ ...coForm, coverage: nextCoverage });
                                }}
                                className={`text-[9px] px-2 py-0.5 rounded border cursor-pointer ${
                                  isChecked 
                                    ? 'bg-amber-50 border-amber-300 text-amber-700 font-bold' 
                                    : 'bg-gray-50 border-gray-250 text-gray-600 hover:border-gray-350 bg-white'
                                }`}
                              >
                                {loc}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Settlement routing */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-amber-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>4. Settlements & Settlement Terms</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Beneficiary Bank Name *</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white text-xs text-gray-900"
                          placeholder="e.g. HDFC Bank Ltd"
                          value={coForm.bankName}
                          onChange={(e) => setCoForm({ ...coForm, bankName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Settlement Account Number *</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono text-xs text-gray-900"
                          placeholder="e.g. 50100438102381"
                          value={coForm.bankAccount}
                          onChange={(e) => setCoForm({ ...coForm, bankAccount: e.target.value })}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Clearing IFSC Code *</label>
                          <span className="text-[9px] text-gray-400 font-semibold font-mono">11 Characters</span>
                        </div>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono text-xs uppercase text-gray-900"
                          placeholder="e.g. HDFC0000014"
                          maxLength={11}
                          value={coForm.bankIfsc}
                          onChange={(e) => setCoForm({ ...coForm, bankIfsc: e.target.value.toUpperCase() })}
                        />
                        {coForm.bankIfsc && coForm.bankIfsc.length !== 11 && (
                          <span className="text-[10px] text-amber-600 block mt-1 font-medium">Clearance routing code is exactly 11 chars</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Contractor Payment Terms</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-900"
                          value={coForm.paymentTerms}
                          onChange={(e) => {
                            const val = e.target.value;
                            const pDays = val === 'Net 15' ? 15 : val === 'Net 30' ? 30 : val === 'Net 45' ? 45 : 0;
                            setCoForm({ ...coForm, paymentTerms: e.target.value, creditPeriod: pDays });
                          }}
                        >
                          <option value="Advance Payment">Advance Payment (No Credit)</option>
                          <option value="Net 15">Net 15 Delivery (15 Days Credit)</option>
                          <option value="Net 30">Net 30 Delivery (30 Days Credit)</option>
                          <option value="Net 45">Net 45 Delivery (45 Days Credit)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Vetted Credit Period (Days)</label>
                        <input
                          type="number"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-gray-50 text-gray-500 font-semibold font-mono text-xs text-gray-900"
                          disabled={coForm.paymentTerms === 'Advance Payment'}
                          value={coForm.paymentTerms === 'Advance Payment' ? 0 : coForm.creditPeriod}
                          onChange={(e) => setCoForm({ ...coForm, creditPeriod: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Sourcing Currency</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-900"
                          value={coForm.currencyOption}
                          onChange={(e) => setCoForm({ ...coForm, currencyOption: e.target.value })}
                        >
                          <option value="INR (₹)">INR (₹) - Standard Trade Ledger</option>
                          <option value="USD ($)">USD ($) - International trade</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Card 5: Sustainability details */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-amber-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>5. ESG Compliance & Integrity Code</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Vendor Net-Zero Reference Code</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono text-xs text-gray-900"
                          placeholder="e.g. ESG-CN-9034"
                          value={coForm.netZeroCode}
                          onChange={(e) => setCoForm({ ...coForm, netZeroCode: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center h-full pt-4">
                        <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-800 text-xs text-gray-950">
                          <input
                            type="checkbox"
                            className="rounded text-amber-650 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                            checked={coForm.sustainabilityPledge}
                            onChange={(e) => setCoForm({ ...coForm, sustainabilityPledge: e.target.checked })}
                          />
                          <span>Vendor confirms sustainability & anti-bribery integrity pledge</span>
                        </label>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Checklist pane */}
                <div className="space-y-6">
                  
                  {/* Dynamic checklist logs */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block border-b border-gray-100 pb-2 font-bold">Real-time Form Validation Audits</span>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium font-semibold">1. Corporate Legal Name</span>
                        {coForm.businessName.trim().length > 0 ? (
                          <span className="text-[9px] uppercase font-bold text-green-750 bg-green-50 border border-green-200 px-2 py-0.5 rounded">PASSED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">AWAITING</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium font-semibold font-semibold">2. GSTIN format (15 char)</span>
                        {coForm.approvedGst.trim().length === 15 ? (
                          <span className="text-[9px] uppercase font-bold text-green-750 bg-green-50 border border-green-200 px-2 py-0.5 rounded">VERIFIED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">INCOMPLETE</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium font-semibold font-semibold">3. PAN format (10 char)</span>
                        {coForm.pan.trim().length === 10 ? (
                          <span className="text-[9px] uppercase font-bold text-green-750 bg-green-50 border border-green-200 px-2 py-0.5 rounded">VALIDATED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">INCOMPLETE</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium font-semibold font-semibold">4. Banking Settlements</span>
                        {coForm.bankAccount.trim().length >= 8 && coForm.bankName.trim().length > 0 && coForm.bankIfsc.trim().length === 11 ? (
                          <span className="text-[9px] uppercase font-bold text-green-750 bg-green-50 border border-green-200 px-2 py-0.5 rounded">LINKED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">EMPTY</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium font-semibold font-semibold">5. Sourcing Representative</span>
                        {coForm.contactName.trim().length > 0 && coForm.contactPhone.trim().length > 0 && coForm.contactEmail.trim().length > 0 ? (
                          <span className="text-[9px] uppercase font-bold text-green-750 bg-green-50 border border-green-200 px-2 py-0.5 rounded">VERIFIED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">AWAITING</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submission and approval workflow card */}
                  <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg p-5 text-white shadow-md text-xs space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-100 block font-bold text-neutral-200">Commit Dossier Submission</span>
                    <p className="text-[11.5px] leading-relaxed text-amber-50">
                      Submitting this profile freezes parameters and puts the digitized KYC and bank routing information into the compliance vault. 
                      This triggers a pending review in the <strong>Director's Verification Pipeline</strong> for AVL assignment.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          if (!coForm.businessName.trim()) {
                            alert("Validation Error: Please supply the Corporate Legal Name.");
                            return;
                          }
                          if (!coForm.approvedGst.trim() || coForm.approvedGst.length !== 15) {
                            alert("Validation Error: A 15-character GSTIN number is mandatory.");
                            return;
                          }
                          if (!coForm.pan.trim() || coForm.pan.length !== 10) {
                            alert("Validation Error: A 10-character Permanent Account Number (PAN) is mandatory.");
                            return;
                          }
                          if (!coForm.bankAccount.trim() || !coForm.bankName.trim() || coForm.bankIfsc.trim().length !== 11) {
                            alert("Validation Error: Please supply complete Bank Settling details including fully compliant 11-char IFSC code.");
                            return;
                          }
                          if (!coForm.contactName.trim() || !coForm.contactPhone.trim() || !coForm.contactEmail.trim()) {
                            alert("Validation Error: Primary Sourcing Contact (Name, Phone, Business email) fields are mandatory.");
                            return;
                          }

                          // Register candidate as Pending Onboarding in global vendors state
                          const candidateId = `VND-2026-0${vendors.length + 11}`;
                          const newCandidateObj: Vendor = {
                            id: candidateId,
                            name: coForm.businessName,
                            category: coForm.commodityCategory,
                            status: 'Pending Onboarding',
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

                          setVendors(prev => [...prev, newCandidateObj]);
                          
                          setOnboardingSuccessMsg(`Dossier for "${coForm.businessName}" (${candidateId}) has been locked and compiled successfully. Escalated onto director sign-off queues.`);
                          setShowOnboardingForm(false);
                        }}
                        className="w-full bg-white text-amber-950 hover:bg-amber-50 uppercase h-10 rounded border-0 flex items-center justify-center gap-1 cursor-pointer transition-colors font-bold shadow-md cursor-pointer"
                      >
                        Submit Dossier for Director Review
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>
      )}
    </SharedShell>
  );
}
