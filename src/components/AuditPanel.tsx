import React, { useState } from 'react';
import { 
  FileText, ShieldAlert, BadgeInfo, Scale, CheckSquare, Search, Filter, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { Vendor, Requisition, RFQ, PurchaseOrder, GRN, Invoice, Contract, PaymentBatch, User, Location } from '../types';
import SharedShell from './SharedShell';

interface AuditPanelProps {
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

export default function AuditPanel({
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
}: AuditPanelProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Interactive Webgraph & Bar selection states
  const [selectedRadarMetric, setSelectedRadarMetric] = useState<'AML' | 'Price' | 'GST' | 'SLA' | 'Match'>('AML');
  const [selectedBarBranch, setSelectedBarBranch] = useState<'Kolkata' | 'SaltLake' | 'Howrah' | 'Barasat'>('Kolkata');

  // AVL Audit substation
  const [auditingContract, setAuditingContract] = useState<Contract | null>(null);
  const [panChecked, setPanChecked] = useState(true);
  const [gstChecked, setGstChecked] = useState(true);
  const [bankChecked, setBankChecked] = useState(true);
  const [auditComment, setAuditComment] = useState('');
  const [auditSuccessMsg, setAuditSuccessMsg] = useState('');

  // Pricing audit tickets
  const [ticketSuccessMsg, setTicketSuccessMsg] = useState('');

  const sidebarItems = [
    { id: 'dashboard', label: 'Compliance Dashboard', icon: <Scale className="w-4 h-4" /> },
    { id: 'avlContracts', label: 'AVL & Contracts Audit', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'pricingAudit', label: 'Pricing Intelligence Audit', icon: <ShieldAlert className="w-4 h-4" /> }
  ];

  return (
    <SharedShell
      role="Audit"
      roleColor="#4B5563"
      roleBadgeBg="bg-gray-50"
      roleBadgeText="text-gray-700"
      sidebarItems={sidebarItems}
      currentPage={currentPage}
      setCurrentPage={(p) => {
        setCurrentPage(p);
        setAuditingContract(null);
      }}
      onBack={onBack}
      userName="Rajesh Gupta"
      userBranch="Kolkata HQ"
    >
      {/* 5.1 AUDITOR > DASHBOARD */}
      {currentPage === 'dashboard' && (
        <div id="compliance-dashboard">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Auditor Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Cross-check AVL compliance scores, evaluate branch price variance alerts, and review risk logs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-xs">
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">AML Verified AVL Vendors</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">10</div>
              <p className="text-xs text-green-700 font-semibold mt-1">100% compliance checked</p>
            </div>
            
            <button
              onClick={() => setCurrentPage('avlContracts')}
              className="bg-white border border-gray-200 rounded p-5 shadow-sm text-left hover:border-gray-500 transition-colors block cursor-pointer"
            >
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Active Service Contracts</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{contracts.length}</div>
              <p className="text-xs text-blue-600 font-semibold mt-1">Audit SLA parameters →</p>
            </button>

            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase font-medium">Pending Auditor Release</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">0</div>
              <p className="text-xs text-gray-400 mt-1">No items blocked</p>
            </div>

            <button
              onClick={() => setCurrentPage('pricingAudit')}
              className="bg-white border border-gray-200 rounded p-5 shadow-sm text-left hover:border-gray-500 transition-colors block cursor-pointer"
            >
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Pricing alerts logged</span>
              <div className="text-2xl font-bold text-red-600 mt-1">2</div>
              <p className="text-xs text-red-650 font-semibold mt-1">Risk checklist →</p>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 text-neutral-850">
            {/* Chart 1: Interactive Compliance Webgraph (Radar/Spider Graph) */}
            <div className="bg-white border border-gray-250 rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Enterprise Statutory Webgraph</h3>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2.5 py-1 rounded border border-blue-100">Live AVL Analytics</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Click on any vertex to drill down into active safety, tax, or AML verification check status
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-8 mt-8">
                {/* SVG Webgraph */}
                <div className="relative w-[280px] h-[280px] flex items-center justify-center bg-gray-50/50 rounded-xl border border-gray-100 p-4">
                  <svg className="w-full h-full" viewBox="0 0 280 280">
                    <defs>
                      <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.32" />
                      </radialGradient>
                    </defs>

                    {/* Concentric grid lines (Pentagons) */}
                    {/* 100% boundary */}
                    <polygon points="140,50 225.6,112.2 192.9,212.8 87.1,212.8 54.4,112.2" stroke="#E5E7EB" fill="none" strokeWidth="1.5" />
                    {/* 80% boundary */}
                    <polygon points="140,68 208.5,117.8 182.3,198.2 97.7,198.2 71.5,117.8" stroke="#E5E7EB" fill="none" strokeWidth="1" strokeDasharray="3,3" />
                    {/* 60% boundary */}
                    <polygon points="140,86 191.4,123.3 171.7,183.7 108.3,183.7 88.6,123.3" stroke="#F3F4F6" fill="none" strokeWidth="1" />
                    {/* 40% boundary */}
                    <polygon points="140,104 174.2,128.9 161.2,169.1 118.8,169.1 105.8,128.9" stroke="#F3F4F6" fill="none" strokeWidth="1" strokeDasharray="3,3" />

                    {/* Axes Spoke lines */}
                    <line x1="140" y1="140" x2="140" y2="50" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="140" y1="140" x2="225.6" y2="112.2" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="140" y1="140" x2="192.9" y2="212.8" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="140" y1="140" x2="87.1" y2="212.8" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="140" y1="140" x2="54.4" y2="112.2" stroke="#E5E7EB" strokeWidth="1" />

                    {/* Labeled Vertices - Clickable */}
                    <g className="cursor-pointer" onClick={() => setSelectedRadarMetric('AML')}>
                      <rect x="110" y="24" width="60" height="15" rx="3" fill={selectedRadarMetric === 'AML' ? '#3b82f6' : 'white'} stroke="#E5E7EB" strokeWidth="0.5" />
                      <text x="140" y="34" textAnchor="middle" className={`text-[8px] font-black uppercase tracking-wider ${selectedRadarMetric === 'AML' ? 'fill-white' : 'fill-gray-600'}`}>AML CHECK</text>
                    </g>

                    <g className="cursor-pointer" onClick={() => setSelectedRadarMetric('Price')}>
                      <rect x="200" y="94" width="75" height="15" rx="3" fill={selectedRadarMetric === 'Price' ? '#3b82f6' : 'white'} stroke="#E5E7EB" strokeWidth="0.5" />
                      <text x="237" y="104" textAnchor="middle" className={`text-[8px] font-black uppercase tracking-wider ${selectedRadarMetric === 'Price' ? 'fill-white' : 'fill-gray-650'}`}>PRICE DRIFT</text>
                    </g>

                    <g className="cursor-pointer" onClick={() => setSelectedRadarMetric('GST')}>
                      <rect x="160" y="210" width="70" height="15" rx="3" fill={selectedRadarMetric === 'GST' ? '#3b82f6' : 'white'} stroke="#E5E7EB" strokeWidth="0.5" />
                      <text x="195" y="220" textAnchor="middle" className={`text-[8px] font-black uppercase tracking-wider ${selectedRadarMetric === 'GST' ? 'fill-white' : 'fill-gray-650'}`}>GST MATCH</text>
                    </g>

                    <g className="cursor-pointer" onClick={() => setSelectedRadarMetric('SLA')}>
                      <rect x="50" y="210" width="70" height="15" rx="3" fill={selectedRadarMetric === 'SLA' ? '#3b82f6' : 'white'} stroke="#E5E7EB" strokeWidth="0.5" />
                      <text x="85" y="220" textAnchor="middle" className={`text-[8px] font-black uppercase tracking-wider ${selectedRadarMetric === 'SLA' ? 'fill-white' : 'fill-gray-650'}`}>SLA SLA</text>
                    </g>

                    <g className="cursor-pointer" onClick={() => setSelectedRadarMetric('Match')}>
                      <rect x="15" y="94" width="75" height="15" rx="3" fill={selectedRadarMetric === 'Match' ? '#3b82f6' : 'white'} stroke="#E5E7EB" strokeWidth="0.5" />
                      <text x="52" y="104" textAnchor="middle" className={`text-[8px] font-black uppercase tracking-wider ${selectedRadarMetric === 'Match' ? 'fill-white' : 'fill-gray-650'}`}>3-WAY MATCH</text>
                    </g>

                    {/* Active compliance area polygon (Actual Metrics) */}
                    <polygon points="140,54.5 208.5,117.8 192.9,212.8 95,201.9 63,115" fill="url(#radarGrad)" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Points Overlay Markers */}
                    <circle cx="140" cy="54.5" r="5" className="cursor-pointer" fill={selectedRadarMetric === 'AML' ? '#1d4ed8' : '#3b82f6'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedRadarMetric('AML')} />
                    <circle cx="208.5" cy="117.8" r="5" className="cursor-pointer" fill={selectedRadarMetric === 'Price' ? '#1d4ed8' : '#3b82f6'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedRadarMetric('Price')} />
                    <circle cx="192.9" cy="212.8" r="5" className="cursor-pointer" fill={selectedRadarMetric === 'GST' ? '#10b981' : '#10b981'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedRadarMetric('GST')} />
                    <circle cx="95" cy="201.9" r="5" className="cursor-pointer" fill={selectedRadarMetric === 'SLA' ? '#1d4ed8' : '#3b82f6'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedRadarMetric('SLA')} />
                    <circle cx="63" cy="115" r="5" className="cursor-pointer" fill={selectedRadarMetric === 'Match' ? '#1d4ed8' : '#3b82f6'} stroke="#fff" strokeWidth="2" onClick={() => setSelectedRadarMetric('Match')} />
                  </svg>
                </div>

                {/* Interactive Legend Details with high contrast */}
                <div className="space-y-4 text-xs text-neutral-850 w-full sm:w-60 bg-neutral-50 p-5 rounded-xl border border-gray-150 shadow-xs">
                  <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest pb-2 border-b border-gray-200">Selected Metric Drilldown</span>
                  
                  {selectedRadarMetric === 'AML' && (
                    <div className="space-y-1.5">
                      <p className="font-extrabold text-blue-800 text-[11px] uppercase tracking-wide">AML Compliance: 95%</p>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        95% of active AVL dealers successfully completed statutory PAN & KYC verification. 
                        <strong> Action required</strong> for Bengal Auto (Pending renewal).
                      </p>
                    </div>
                  )}

                  {selectedRadarMetric === 'Price' && (
                    <div className="space-y-1.5">
                      <p className="font-extrabold text-amber-800 text-[11px] uppercase tracking-wide">Price Integrity Check: 80%</p>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        80% of transactions conform to the wholesale master price indices. 
                        Benign drift detected on Howrah tyres contracts.
                      </p>
                    </div>
                  )}

                  {selectedRadarMetric === 'GST' && (
                    <div className="space-y-1.5">
                      <p className="font-extrabold text-emerald-800 text-[11px] uppercase tracking-wide">GST Match Rate: 100%</p>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        Perfect score achieved. All tax invoices successfully cross-checked against live corporate portals under GST rule 16(4).
                      </p>
                    </div>
                  )}

                  {selectedRadarMetric === 'SLA' && (
                    <div className="space-y-1.5">
                      <p className="font-extrabold text-purple-800 text-[11px] uppercase tracking-wide">SLA SLA fulfillment: 85%</p>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        Standard Service Level Agreements for spare material delivery schedules remain within acceptable variance limits.
                      </p>
                    </div>
                  )}

                  {selectedRadarMetric === 'Match' && (
                    <div className="space-y-1.5">
                      <p className="font-extrabold text-blue-800 text-[11px] uppercase tracking-wide">3-Way matching: 90%</p>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        90% of submitted billing entries successfully auto-match (Goods Received Note (GRN) quantity vs purchase invoice values).
                      </p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200 mt-2 flex justify-between items-center text-[10px] text-gray-400">
                    <span>Selected: <strong>{selectedRadarMetric}</strong></span>
                    <span className="text-blue-600 hover:underline cursor-pointer font-bold">Refresh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 2: Branch Statutory Price Deviation Check (Bar Chart) */}
            <div className="bg-white border border-gray-250 rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Statutory Price Drift deviation</h3>
                  <span className="text-[10px] bg-red-50 text-red-700 font-extrabold px-2.5 py-1 rounded border border-red-100">Action Needed</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Cross-branch budget deviation alerts. Click on any branch bar to inspect diagnostic logs.
                </p>
              </div>

              {/* Custom SVG Bar Chart */}
              <div className="mt-8 flex-1 flex flex-col justify-center">
                <div className="relative w-full h-40 flex items-end gap-10 px-6">
                  {/* Grid background lines */}
                  <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-t border-gray-100 w-full" />
                    <div className="border-t border-gray-100 w-full" />
                    <div className="border-t border-gray-100 w-full" />
                    <div className="border-b border-gray-200 w-full" />
                  </div>

                  {/* Bars */}
                  {/* Bar 1 */}
                  <button 
                    onClick={() => setSelectedBarBranch('Kolkata')}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative z-10 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded"
                  >
                    <div className={`text-[10px] font-bold mb-1 transition-all ${selectedBarBranch === 'Kolkata' ? 'text-rose-600 scale-110 font-extrabold' : 'text-gray-400'}`}>10.9%</div>
                    <div className={`w-full transition-all rounded-t-sm ${selectedBarBranch === 'Kolkata' ? 'bg-rose-600 shadow-md ring-4 ring-rose-100' : 'bg-rose-400 group-hover:bg-rose-500'}`} style={{ height: '70%' }} />
                    <span className={`text-[10px] uppercase font-bold tracking-wider mt-3 ${selectedBarBranch === 'Kolkata' ? 'text-gray-900 border-b-2 border-rose-500 pb-0.5' : 'text-gray-500'}`}>Kolkata HQ</span>
                  </button>

                  {/* Bar 2 */}
                  <button 
                    onClick={() => setSelectedBarBranch('SaltLake')}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative z-10 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded"
                  >
                    <div className={`text-[10px] font-bold mb-1 transition-all ${selectedBarBranch === 'SaltLake' ? 'text-emerald-700 scale-110 font-extrabold' : 'text-gray-400'}`}>2.2%</div>
                    <div className={`w-full transition-all rounded-t-sm ${selectedBarBranch === 'SaltLake' ? 'bg-emerald-600 shadow-md ring-4 ring-emerald-100' : 'bg-emerald-400 group-hover:bg-emerald-500'}`} style={{ height: '18%' }} />
                    <span className={`text-[10px] uppercase font-bold tracking-wider mt-3 ${selectedBarBranch === 'SaltLake' ? 'text-gray-900 border-b-2 border-emerald-500 pb-0.5' : 'text-gray-500'}`}>Salt Lake</span>
                  </button>

                  {/* Bar 3 */}
                  <button 
                    onClick={() => setSelectedBarBranch('Howrah')}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative z-10 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded"
                  >
                    <div className={`text-[10px] font-bold mb-1 transition-all ${selectedBarBranch === 'Howrah' ? 'text-amber-700 scale-110 font-extrabold' : 'text-gray-400'}`}>8.3%</div>
                    <div className={`w-full transition-all rounded-t-sm ${selectedBarBranch === 'Howrah' ? 'bg-amber-600 shadow-md ring-4 ring-amber-100' : 'bg-amber-400 group-hover:bg-amber-500'}`} style={{ height: '54%' }} />
                    <span className={`text-[10px] uppercase font-bold tracking-wider mt-3 ${selectedBarBranch === 'Howrah' ? 'text-gray-900 border-b-2 border-amber-500 pb-0.5' : 'text-gray-500'}`}>Howrah</span>
                  </button>

                  {/* Bar 4 */}
                  <button 
                    onClick={() => setSelectedBarBranch('Barasat')}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative z-10 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded"
                  >
                    <div className={`text-[10px] font-bold mb-1 transition-all ${selectedBarBranch === 'Barasat' ? 'text-emerald-700 scale-110 font-extrabold' : 'text-gray-400'}`}>1.5%</div>
                    <div className={`w-full transition-all rounded-t-sm ${selectedBarBranch === 'Barasat' ? 'bg-emerald-600 shadow-md ring-4 ring-emerald-100' : 'bg-emerald-400 group-hover:bg-emerald-500'}`} style={{ height: '12%' }} />
                    <span className={`text-[10px] uppercase font-bold tracking-wider mt-3 ${selectedBarBranch === 'Barasat' ? 'text-gray-900 border-b-2 border-emerald-500 pb-0.5' : 'text-gray-500'}`}>Barasat</span>
                  </button>
                </div>

                {/* Reactive branch details overlay card */}
                <div className="mt-6 bg-slate-50 border border-slate-200/60 p-4 rounded-lg flex items-center justify-between text-xs transition-all animate-fade-in">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 block" />
                      <span className="font-extrabold uppercase text-gray-500 text-[10px]">Active branch selected: <strong>{selectedBarBranch} branch</strong></span>
                    </div>
                    {selectedBarBranch === 'Kolkata' && (
                      <p className="text-[11px] text-gray-600">
                        🚨 Price deviation is <strong>10.9%</strong> (Above statutory 8% threshold). Raised by Rajesh G. on replacement brake fluid lines.
                      </p>
                    )}
                    {selectedBarBranch === 'SaltLake' && (
                      <p className="text-[11px] text-gray-600">
                        ✓ Excellent compliance (<strong>2.2%</strong> drift). Wholesale lubricants matched contract pricing matrix automatically.
                      </p>
                    )}
                    {selectedBarBranch === 'Howrah' && (
                      <p className="text-[11px] text-gray-600">
                        ⚠ Drift flag (<strong>8.3%</strong> drift). Slightly elevated quotation filed last Tuesday due to raw rubber steel cord surcharges.
                      </p>
                    )}
                    {selectedBarBranch === 'Barasat' && (
                      <p className="text-[11px] text-gray-600">
                        ✓ Prime match rating (<strong>1.5%</strong> drift). Fully clean 3-way match across 14 separate procurement orders.
                      </p>
                    )}
                  </div>
                  <button className="bg-white hover:bg-neutral-100 border border-neutral-200 transition-colors px-2.5 py-1 text-[10px] font-bold text-gray-700 rounded shadow-xs ml-4 font-mono">
                    Audit Log
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Compliance Logs left (col-span-3) */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded p-5 shadow-sm text-xs">
              <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3.5">Vendor Compliance audit Event log</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                      <th className="p-2">Event ID</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Timestamp</th>
                      <th className="p-2">Details</th>
                      <th className="p-2 text-center">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b h-10">
                      <td className="p-2 font-semibold font-mono text-gray-500">EV-2024-09</td>
                      <td className="p-2 text-gray-600 font-medium">AVL Drift</td>
                      <td className="p-2 text-gray-400 font-mono">10-Feb 15:40</td>
                      <td className="p-2 text-gray-800">Branch Price deviation detected on electrical wires bundle.</td>
                      <td className="p-2 text-center">
                        <span className="text-[10px] bg-red-50 text-red-700 font-bold px-1.5 py-1 rounded">High</span>
                      </td>
                    </tr>
                    <tr className="border-b h-10">
                      <td className="p-2 font-semibold font-mono text-gray-500">EV-2024-03</td>
                      <td className="p-2 text-gray-600 font-medium">Verification Match</td>
                      <td className="p-2 text-gray-400 font-mono">08-Feb 09:12</td>
                      <td className="p-2 text-gray-800">3-Way match verified for invoice INV-1049.</td>
                      <td className="p-2 text-center">
                        <span className="text-[10px] bg-green-50 text-green-700 font-bold px-1.5 py-1 rounded">Low</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compliance Status right (col-span-2) */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded p-5 shadow-sm text-xs space-y-3.5">
              <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400">Branch Statutory checklist status</h2>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center bg-gray-50 border p-2.5 rounded">
                  <span className="font-semibold text-gray-900">Kolkata HQ Branch</span>
                  <span className="text-[10px] bg-green-50 text-green-700 font-bold px-1.5 py-0.5 rounded">100% Statutory Compliant</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 border p-2.5 rounded">
                  <span className="font-semibold text-gray-900">Salt Lake Branch</span>
                  <span className="text-[10px] bg-green-50 text-green-700 font-bold px-1.5 py-0.5 rounded">100% Statutory Compliant</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 border p-2.5 rounded">
                  <span className="font-semibold text-gray-900">Howrah Workshop</span>
                  <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded">Pending AML Update</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5.2 AUDITOR > AVL & CONTRACTS */}
      {currentPage === 'avlContracts' && !auditingContract && (
        <div id="avl-monitoring-contracts">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AVL & Contracts Compliance audit</h1>
              <p className="text-sm text-gray-500 mt-1">Audit statutory frameworks, SLA scores, and AML logs for verified partners</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-32">Contract Ref</th>
                  <th className="p-3 font-semibold">Vendor Name</th>
                  <th className="p-3">Category Classification</th>
                  <th className="p-3 text-center">SLA Compliance Index</th>
                  <th className="p-3">Expiry Deadline</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => (
                  <tr key={c.vendorName} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-500 font-mono">{c.vendorName.substring(0, 3).toUpperCase() + '-CTR'}</td>
                    <td className="p-3 font-semibold text-gray-900">{c.vendorName}</td>
                    <td className="p-3 text-gray-700 font-medium">SLA Contract</td>
                    <td className="p-3 text-center">
                      <span className="text-emerald-700 font-bold font-mono">98% compliant</span>
                    </td>
                    <td className="p-3 font-mono text-gray-400">{c.endDate}</td>
                    <td className="p-3">
                      <span className="text-xs uppercase bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded">Active</span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setPanChecked(true);
                          setGstChecked(true);
                          setBankChecked(true);
                          setAuditComment('');
                          setAuditSuccessMsg('');
                          setAuditingContract(c);
                        }}
                        className="bg-gray-100 px-3 h-7 rounded hover:bg-gray-200 font-bold text-[10px] uppercase cursor-pointer text-gray-700"
                      >
                        Audit SLA
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentPage === 'avlContracts' && auditingContract && (
        <div id="statutory-sla-audit-workspace" className="bg-white border border-gray-200 rounded p-6 shadow-sm text-xs">
          <button
            onClick={() => setAuditingContract(null)}
            className="text-[10px] uppercase font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to AML list
          </button>

          <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-900 font-mono">
            SLA Statutory Audit: {auditingContract.vendorName.substring(0, 3).toUpperCase() + '-CTR'} ({auditingContract.vendorName})
          </h2>

          {auditSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3 px-4 rounded">
              {auditSuccessMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 border border-gray-200 p-5 rounded space-y-4">
              <h3 className="text-xs uppercase font-bold text-gray-400">Statutory checks tracker</h3>
              
              <div className="space-y-2.5 text-xs">
                <label className="flex items-center gap-2 py-0.5 select-none font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={panChecked}
                    onChange={(e) => setPanChecked(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Income Tax PAN validation verified and found active.</span>
                </label>
                <label className="flex items-center gap-2 py-0.5 select-none font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={gstChecked}
                    onChange={(e) => setGstChecked(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>GSTIN filings verified and matching monthly ledger records.</span>
                </label>
                <label className="flex items-center gap-2 py-0.5 select-none font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={bankChecked}
                    onChange={(e) => setBankChecked(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Bank Solvency & credit reference score limits check passed.</span>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-5 rounded space-y-3">
              <h3 className="text-xs uppercase font-bold text-gray-400">Log Auditor comments</h3>
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Audit assessment comment</label>
                <textarea
                  rows={2}
                  value={auditComment}
                  onChange={(e) => setAuditComment(e.target.value)}
                  placeholder="Record assessment comments..."
                  className="w-full border border-gray-200 bg-white rounded p-2 text-xs focus:outline-none"
                />
              </div>
              <button
                onClick={() => {
                  setAuditSuccessMsg(`AML / Statutory audit records for ${auditingContract.vendorName} updated on central compliance registries.`);
                  setAuditComment('');
                }}
                className="bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase h-9 px-4 rounded hover:bg-blue-700 cursor-pointer"
              >
                Log assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5.3 AUDITOR > PRICING AUDIT */}
      {currentPage === 'pricingAudit' && (
        <div id="pricing-intelligence-audit">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Pricing Intelligence & Variance Audit</h1>
              <p className="text-sm text-gray-500 mt-1">Review dynamic baseline price anomalies between separate branch locations</p>
            </div>
          </div>

          {ticketSuccessMsg && (
            <div className="my-4 bg-amber-50 border border-amber-250 text-amber-800 text-xs p-3.5 rounded font-mono leading-relaxed">
              {ticketSuccessMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Variance Card 1 */}
            <div className="bg-white border border-gray-200 p-5 rounded shadow-sm space-y-3.5">
              <div className="flex justify-between items-start border-b pb-2">
                <div>
                  <span className="font-bold text-gray-900 text-sm block">Electrical Wiring Harness</span>
                  <span className="text-[10px] font-mono text-gray-400 mt-0.5 block">Category: Parts</span>
                </div>
                <span className="text-[10px] bg-red-105 text-red-700 font-bold px-1.5 py-0.5 rounded uppercase">
                  10.9% Deviation alert
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">Kolkata HQ Baseline Invoiced Price</span>
                  <span className="font-semibold text-gray-900 font-mono">₹12,200</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">Salt Lake Branch Invoiced Price</span>
                  <span className="font-semibold text-emerald-700 font-mono">₹11,000</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Salt Lake Workshop purchasing team secured a lower baseline tariff with Ramesh Traders. HQ contracts suffer leakage.
              </p>
              <button
                onClick={() => setTicketSuccessMsg(`Renegotiation process launched for 'Electrical Wiring Harness' linked to Ramesh Traders. Active purchase pathways on this specific item have been isolated.`)}
                className="bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase h-8 px-3 rounded hover:bg-blue-700 cursor-pointer"
              >
                Issue Renegotiation Ticket
              </button>
            </div>

            {/* Variance Card 2 */}
            <div className="bg-white border border-gray-250 p-5 rounded shadow-sm space-y-3.5">
              <div className="flex justify-between items-start border-b pb-2">
                <div>
                  <span className="font-bold text-gray-900 text-sm block">Battery 12V</span>
                  <span className="text-[10px] font-mono text-gray-400 mt-0.5 block">Category: Batteries</span>
                </div>
                <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded uppercase font-bold">
                  8.3% alert
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400 font-semibold">Kolkata HQ baseline price</span>
                  <span className="font-semibold text-gray-900 font-mono">₹5,200</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-450 font-semibold">Salt Lake branch price</span>
                  <span className="font-semibold text-emerald-700 font-mono">₹4,800</span>
                </div>
              </div>
              <p className="text-gray-650 leading-relaxed">
                HQ inventory acquisitions show persistent margin inflation deviations. Immediate renegotiation ticket recommended.
              </p>
              <button
                onClick={() => setTicketSuccessMsg(`Renegotiation ticket launched for item 'Battery 12V'. Discrepancy logged.`)}
                className="bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase h-8 px-3 rounded hover:bg-blue-700 cursor-pointer"
              >
                Issue Renegotiation Ticket
              </button>
            </div>

          </div>
        </div>
      )}
    </SharedShell>
  );
}
