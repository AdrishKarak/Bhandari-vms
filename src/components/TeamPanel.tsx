import React, { useState } from 'react';
import { 
  ClipboardList, ShoppingBag, Send, PackageX, Plus, FileSpreadsheet, Trash2,
  Search, Filter, Check, X, Eye, FileText, Upload, UserPlus
} from 'lucide-react';
import { Vendor, Requisition, RFQ, PurchaseOrder, GRN, Invoice, Contract, PaymentBatch, User, Location, RequisitionItem } from '../types';
import SharedShell from './SharedShell';

interface TeamPanelProps {
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

export default function TeamPanel({
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
}: TeamPanelProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Raise Requisitions substates
  const [newReqTitle, setNewReqTitle] = useState('');
  const [newReqDept, setNewReqDept] = useState('Parts');
  const [newReqPriority, setNewReqPriority] = useState<'Normal' | 'Urgent' | 'Critical'>('Normal');
  const [newReqDate, setNewReqDate] = useState('2024-02-15');
  const [newReqNotes, setNewReqNotes] = useState('');
  const [newReqItems, setNewReqItems] = useState<{ id: string; description: string; category: string; qty: number; unit: string; estPrice: number; preferredVendor: string; notes?: string }[]>([
    { id: 'N1', description: '', category: 'Lubricants', qty: 1, unit: 'Ltr', estPrice: 100, preferredVendor: 'Ramesh Traders' }
  ]);
  const [reqSubmitSuccessMsg, setReqSubmitSuccessMsg] = useState('');

  // My Requisitions
  const [myReqFilter, setMyReqFilter] = useState('All');
  const [viewedReq, setViewedReq] = useState<Requisition | null>(null);

  // RFQ Management substates
  const [showCreateRfqForm, setShowCreateRfqForm] = useState(false);
  const [rfqLinkedReq, setRfqLinkedReq] = useState('');
  const [selectedRfqVendors, setSelectedRfqVendors] = useState<string[]>([]);
  const [rfqDeadline, setRfqDeadline] = useState('2024-02-28');
  const [rfqSlaTerms, setRfqSlaTerms] = useState('');
  const [rfqSuccessMsg, setRfqSuccessMsg] = useState('');
  
  // Manage RFQ
  const [managedRfq, setManagedRfq] = useState<RFQ | null>(null);
  const [loggingQuoteVendor, setLoggingQuoteVendor] = useState<string | null>(null);
  const [loggedQuoteForm, setLoggedQuoteForm] = useState<{ prices: { [key: string]: number }; terms: string; validity: number }>({
    prices: {},
    terms: 'Net 30',
    validity: 30
  });

  // Goods Receipt (GRN) substates
  const [showCreateGrnForm, setShowCreateGrnForm] = useState(false);
  const [grnLinkedPO, setGrnLinkedPO] = useState('');
  const [grnReceivedDate, setGrnReceivedDate] = useState('2024-02-01');
  const [grnItems, setGrnItems] = useState<{ description: string; orderQty: number; receivedQty: number; condition: 'Good' | 'Damaged' | 'Partial' }[]>([]);
  const [grnDamageNotes, setGrnDamageNotes] = useState('');
  const [grnRemarks, setGrnRemarks] = useState('');
  const [grnSuccessMsg, setGrnSuccessMsg] = useState('');

  // PO Detail Substate
  const [trackedPo, setTrackedPo] = useState<PurchaseOrder | null>(null);

  // Deactivated onboarding dummies to satisfy typechecker
  const showOnboardingForm = false;
  const setShowOnboardingForm = (v: boolean) => {};
  const onboardingSuccessMsg = '';
  const setOnboardingSuccessMsg = (v: string) => {};
  const coForm = {
    businessName: '',
    tradeName: '',
    businessType: 'Private Limited',
    yearsInOperation: 5,
    coverage: [] as string[],
    reputationNotes: '',
    complianceNotes: '',
    stability: '',
    blacklistCheck: '',
    approvedGst: '',
    pan: '',
    registrationIncorpDate: '',
    cinNumber: '',
    factoryAddress: '',
    logisticsRegion: '',
    msmeClassification: '',
    isoStandard: '',
    currencyOption: '',
    bankName: '',
    bankAccount: '',
    bankIfsc: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    commodityCategory: '',
    paymentTerms: '',
    creditPeriod: 0,
    leadSourcingRep: '',
    escalationEmail: '',
    netZeroCode: '',
    sustainabilityPledge: false,
  };
  const setCoForm = (v: any) => {};

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'raiseRequisition', label: 'Raise Requisition', icon: <Plus className="w-4 h-4" /> },
    { id: 'myRequisitions', label: 'My Requisitions', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'rfqManagement', label: 'RFQ Management', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'goodsReceipt', label: 'Goods Receipt (GRN)', icon: <Send className="w-4 h-4" /> },
    { id: 'poTracker', label: 'PO Tracker', icon: <PackageX className="w-4 h-4" /> }
  ];

  return (
    <SharedShell
      role="Team"
      roleColor="#2563EB"
      roleBadgeBg="bg-blue-50"
      roleBadgeText="text-blue-700"
      sidebarItems={sidebarItems}
      currentPage={currentPage}
      setCurrentPage={(p) => {
        setCurrentPage(p);
        setViewedReq(null);
        setManagedRfq(null);
        setLoggingQuoteVendor(null);
        setShowCreateRfqForm(false);
        setShowCreateGrnForm(false);
        setTrackedPo(null);
        setShowOnboardingForm(false);
        setOnboardingSuccessMsg('');
      }}
      onBack={onBack}
      userName="Ratan Das"
      userBranch="Kolkata HQ"
    >
      {/* 3.1 PURCHASE TEAM > DASHBOARD */}
      {currentPage === 'dashboard' && (
        <div id="team-dashboard">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Purchase Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Raise requisitions, RFQs, compare bids & submit physical package GRNs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">My Open Requisitions</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">3</div>
              <p className="text-xs text-indigo-600 mt-1">Out of 10 total</p>
            </div>
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase font-medium">Active RFQs</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">2</div>
              <p className="text-xs text-blue-600 font-semibold mt-1">Bids compilation queue</p>
            </div>
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">POs Pending Receipt</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">4</div>
              <p className="text-xs text-amber-600 font-semibold mt-1">Needs GRN uploads</p>
            </div>
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">GRNs Awaiting QC Audits</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">2</div>
              <p className="text-xs text-green-700 font-semibold mt-1">Under GM verification</p>
            </div>
          </div>

          {/* Pending GRNs */}
          <div className="bg-white border border-gray-200 rounded p-6 shadow-sm mb-6 text-xs">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3.5">Pending GRN Submissions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                    <th className="p-2.5">PO Number</th>
                    <th className="p-2.5">Vendor</th>
                    <th className="p-2.5">Items Required</th>
                    <th className="p-2.5">Exp. Delivery</th>
                    <th className="p-2.5 text-right w-32">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pos
                    .filter(p => p.status === 'GRN Pending' || p.status === 'Delivered (GRN Pending)')
                    .map((p) => (
                      <tr key={p.id} className="border-b h-11 hover:bg-gray-50/20 text-xs">
                        <td className="p-2.5 font-mono text-gray-500 font-semibold">{p.id}</td>
                        <td className="p-2.5 font-semibold text-gray-900">{p.vendorName}</td>
                        <td className="p-2.5 text-gray-700">{p.itemSummary}</td>
                        <td className="p-2.5 font-mono text-gray-400">{p.expectedDelivery}</td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() => {
                              setGrnLinkedPO(p.id);
                              setGrnItems([{ description: p.itemSummary, orderQty: 10, receivedQty: 10, condition: 'Good' }]);
                              setGrnReceivedDate('2024-02-01');
                              setGrnRemarks('');
                              setGrnDamageNotes('');
                              setCurrentPage('goodsReceipt');
                              setShowCreateGrnForm(true);
                            }}
                            className="bg-blue-600 text-white font-medium px-3 h-7 rounded hover:bg-blue-700 text-xs tracking-wider uppercase cursor-pointer"
                          >
                            Submit GRN
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Open Requisitions */}
          <div className="bg-white border border-gray-200 rounded p-6 shadow-sm text-xs">
            <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3.5">My Requisitions — Recent Actions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                    <th className="p-2.5 w-28">Req ID</th>
                    <th className="p-2.5">Title</th>
                    <th className="p-2.5">Raised Date</th>
                    <th className="p-2.5 text-center">Priority</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requisitions
                    .filter((r) => r.raisedBy === 'Ratan Das')
                    .slice(0, 5)
                    .map((r) => (
                      <tr key={r.id} className="border-b h-10 hover:bg-gray-50/20">
                        <td className="p-2.5 font-semibold font-mono text-gray-500">{r.id}</td>
                        <td className="p-2.5 font-semibold text-gray-900">{r.title}</td>
                        <td className="p-2.5 text-gray-400 font-mono">{r.date}</td>
                        <td className="p-2.5 text-center">
                          <span className={`text-[9.5px] uppercase tracking-wide px-1.5 py-0.5 rounded font-bold ${
                            r.priority === 'Critical' ? 'bg-red-50 text-red-700' : r.priority === 'Urgent' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {r.priority}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <span className={`${r.status === 'Approved' ? 'text-green-700' : r.status === 'Rejected' ? 'text-red-700' : 'text-gray-600'}`}>
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

      {/* 3.2 PURCHASE TEAM > RAISE REQUISITION */}
      {currentPage === 'raiseRequisition' && (
        <div id="raise-new-req">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">New Materials Requisition</h1>
            <p className="text-sm text-gray-500 mt-1">Draft a demand basket and submit for automated General Manager approval chains</p>
          </div>

          {reqSubmitSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3.5 rounded">
              {reqSubmitSuccessMsg}
            </div>
          )}

          <div className="mt-6 bg-white border border-gray-200 rounded p-6 shadow-sm max-w-3xl">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Requisition Title Description</label>
                <input
                  type="text"
                  value={newReqTitle}
                  onChange={(e) => setNewReqTitle(e.target.value)}
                  placeholder="e.g. Workshop tyre spares replenishment"
                  className="w-full h-9 border border-gray-200 rounded px-2.5 text-xs bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Branch Location</label>
                  <input
                    type="text"
                    disabled
                    value="Kolkata HQ"
                    className="w-full h-9 border border-gray-200 bg-gray-50 text-gray-600 rounded px-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Cost Department</label>
                  <select
                    value={newReqDept}
                    onChange={(e) => setNewReqDept(e.target.value)}
                    className="w-full h-9 border border-gray-200 bg-white rounded px-2 text-xs"
                  >
                    <option value="Parts">Parts & Mechanical</option>
                    <option value="Service">Lubricants & Service</option>
                    <option value="Admin">Workshop Logistics / Admin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Priority Classification</label>
                  <select
                    value={newReqPriority}
                    onChange={(e) => setNewReqPriority(e.target.value as 'Normal' | 'Urgent' | 'Critical')}
                    className="w-full h-9 border border-gray-200 bg-white rounded px-2 text-xs"
                  >
                    <option value="Normal">Normal baseline replenishment</option>
                    <option value="Urgent">Urgent priority</option>
                    <option value="Critical">Critical breakdown alert</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Required Onsite By Date</label>
                  <input
                    type="date"
                    value={newReqDate}
                    onChange={(e) => setNewReqDate(e.target.value)}
                    className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Items Table container */}
              <div className="pt-4 border-t border-gray-200">
                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-3">Itemized materials demand</span>
                
                <div className="space-y-3">
                  {newReqItems.map((item, idx) => (
                    <div key={item.id} className="bg-gray-50 border border-gray-200 p-4 rounded text-xs relative space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 mb-0.5 block">Description Specification</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => {
                              const updated = [...newReqItems];
                              updated[idx].description = e.target.value;
                              setNewReqItems(updated);
                            }}
                            placeholder="e.g. Engine lube 10w40"
                            className="w-full h-8 border border-gray-200 bg-white rounded px-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 mb-0.5 block">Trade Category</label>
                          <select
                            value={item.category}
                            onChange={(e) => {
                              const updated = [...newReqItems];
                              updated[idx].category = e.target.value;
                              setNewReqItems(updated);
                            }}
                            className="w-full h-8 border border-gray-200 bg-white rounded px-2 text-xs"
                          >
                            <option value="Lubricants">Lubricants</option>
                            <option value="Spare Parts">Spare Parts</option>
                            <option value="Tyres">Tyres</option>
                            <option value="Electricals">Electricals</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 mb-0.5 block">Quantity</label>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => {
                              const updated = [...newReqItems];
                              updated[idx].qty = Number(e.target.value);
                              setNewReqItems(updated);
                            }}
                            className="w-full h-8 border border-gray-200 bg-white rounded px-2 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 mb-0.5 block">Unit Measure</label>
                          <select
                            value={item.unit}
                            onChange={(e) => {
                              const updated = [...newReqItems];
                              updated[idx].unit = e.target.value;
                              setNewReqItems(updated);
                            }}
                            className="w-full h-8 border border-gray-200 bg-white rounded px-2 text-xs"
                          >
                            <option value="Ltr">Ltr</option>
                            <option value="Pcs">Pcs</option>
                            <option value="Set">Set</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 mb-0.5 block">Est. Net Unit cost</label>
                          <input
                            type="number"
                            value={item.estPrice}
                            onChange={(e) => {
                              const updated = [...newReqItems];
                              updated[idx].estPrice = Number(e.target.value);
                              setNewReqItems(updated);
                            }}
                            className="w-full h-8 border border-gray-200 bg-white rounded px-2 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 mb-0.5 block">Preferred AVL vendor</label>
                          <select
                            value={item.preferredVendor}
                            onChange={(e) => {
                              const updated = [...newReqItems];
                              updated[idx].preferredVendor = e.target.value;
                              setNewReqItems(updated);
                            }}
                            className="w-full h-8 border border-gray-200 bg-white rounded px-1.5 text-xs"
                          >
                            {vendors.map(v => (
                              <option key={v.id} value={v.name}>{v.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {newReqItems.length > 1 && (
                        <button
                          onClick={() => setNewReqItems(prev => prev.filter(it => it.id !== item.id))}
                          className="absolute right-4 top-3 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={() => setNewReqItems([
                      ...newReqItems, 
                      { id: `N${newReqItems.length + 1}`, description: '', category: 'Lubricants', qty: 1, unit: 'Ltr', estPrice: 50, preferredVendor: 'Ramesh Traders' }
                    ])}
                    className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:bg-blue-50/50 border border-blue-200 border-dashed p-2 rounded justify-center w-full mt-2 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Material Line Item
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Additional justifications notes</label>
                <textarea
                  rows={2}
                  value={newReqNotes}
                  onChange={(e) => setNewReqNotes(e.target.value)}
                  placeholder="Supporting justification comments..."
                  className="w-full border border-gray-200 rounded p-2 text-xs bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-4 border-t flex gap-2">
                <button
                  onClick={() => {
                    if (!newReqTitle) {
                      alert("Please specify a requisition baseline title description.");
                      return;
                    }
                    const draftItem: Requisition = {
                      id: `REQ-2024-0${requisitions.length + 1}`,
                      title: newReqTitle,
                      raisedBy: 'Ratan Das',
                      date: '2024-02-15',
                      priority: newReqPriority,
                      status: 'Draft',
                      items: newReqItems.map((it, idx) => ({ ...it, id: `it-${idx}` })),
                      location: 'Kolkata HQ',
                      supportingNotes: newReqNotes
                    };
                    setRequisitions(prev => [...prev, draftItem]);
                    setReqSubmitSuccessMsg(`Requisition draft REQ-2024-0${requisitions.length + 1} finalized successfully.`);
                    
                    // Reset
                    setNewReqTitle('');
                    setNewReqItems([{ id: 'N1', description: '', category: 'Lubricants', qty: 1, unit: 'Ltr', estPrice: 100, preferredVendor: 'Ramesh Traders' }]);
                  }}
                  className="bg-white border border-gray-200 text-gray-700 font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-gray-50 cursor-pointer"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => {
                    if (!newReqTitle) {
                      alert("Requisition title is mandatory.");
                      return;
                    }
                    const submittedReq: Requisition = {
                      id: `REQ-2024-0${requisitions.length + 1}`,
                      title: newReqTitle,
                      raisedBy: 'Ratan Das',
                      date: '2024-02-15',
                      priority: newReqPriority,
                      status: 'Pending Approval',
                      items: newReqItems.map((it, idx) => ({ ...it, id: `it-${idx}` })),
                      location: 'Kolkata HQ',
                      supportingNotes: newReqNotes
                    };
                    setRequisitions(prev => [...prev, submittedReq]);
                    setReqSubmitSuccessMsg(`Requisition REQ-2024-0${requisitions.length + 1} submitted to GM Vikram Sen for authorization routing.`);
                    
                    // Reset
                    setNewReqTitle('');
                    setNewReqItems([{ id: 'N1', description: '', category: 'Lubricants', qty: 1, unit: 'Ltr', estPrice: 100, preferredVendor: 'Ramesh Traders' }]);
                  }}
                  className="bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Submit for Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3.3 PURCHASE TEAM > MY REQUISITIONS */}
      {currentPage === 'myRequisitions' && !viewedReq && (
        <div id="my-reqs-view">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">My Requisitions</h1>
              <p className="text-sm text-gray-500 mt-1">Audit status trajectories of materials and parts demand applications</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded p-4 mb-5 flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-500 uppercase tracking-wider">Status:</span>
              <select
                value={myReqFilter}
                onChange={(e) => setMyReqFilter(e.target.value)}
                className="h-8 border border-gray-200 bg-white rounded px-2"
              >
                <option value="All">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-28">Req ID</th>
                  <th className="p-3">Title Description</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-center">Priority</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">GM Remark Summary</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {requisitions
                  .filter(r => r.raisedBy === 'Ratan Das' && (myReqFilter === 'All' || r.status === myReqFilter))
                  .map((r) => (
                    <tr key={r.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                      <td className="p-3 font-semibold font-mono text-gray-500">{r.id}</td>
                      <td className="p-3 text-gray-900 font-semibold">{r.title}</td>
                      <td className="p-3 font-mono text-gray-400">{r.date}</td>
                      <td className="p-3 text-center">
                        <span className={`text-[9.5px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded ${
                          r.priority === 'Critical' ? 'bg-red-50 text-red-700' : r.priority === 'Urgent' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {r.priority}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] uppercase tracking-wide rounded px-2 py-0.5 font-bold ${
                          r.status === 'Approved' ? 'text-green-700 bg-green-50' : r.status === 'Rejected' ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500 max-w-xs truncate">{r.gmRemark || '—'}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setViewedReq(r)}
                          className="text-blue-600 hover:underline uppercase tracking-wider text-[10px] font-bold cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentPage === 'myRequisitions' && viewedReq && (
        <div className="bg-white border rounded p-6 shadow-sm text-xs">
          <button onClick={() => setViewedReq(null)} className="text-[10px] uppercase font-bold text-gray-500 mb-4 inline-block">
            ← Back to List
          </button>
          
          <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-900">Demand Details: {viewedReq.id}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-5 max-w-lg">
            <div><span className="text-gray-400">Requisition Title:</span> <strong>{viewedReq.title}</strong></div>
            <div><span className="text-gray-400">Status Code:</span> <span className="uppercase text-blue-600 font-mono font-bold">{viewedReq.status}</span></div>
            <div><span className="text-gray-400">Raised Date:</span> <span className="font-mono">{viewedReq.date}</span></div>
          </div>

          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">Item list requirements</h3>
          <div className="border rounded shadow-sm overflow-hidden mb-5">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                  <th className="p-2">Description</th>
                  <th className="p-2 text-center">Unit Volume</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Target Vendor</th>
                </tr>
              </thead>
              <tbody>
                {viewedReq.items.map((it, idx) => (
                  <tr key={idx} className="border-b h-10 text-xs">
                    <td className="p-2 text-gray-900 font-semibold">{it.description}</td>
                    <td className="p-2 text-center font-mono font-bold text-gray-800">{it.qty} {it.unit}</td>
                    <td className="p-2 text-gray-500 uppercase text-[9px]">{it.category}</td>
                    <td className="p-2 text-gray-700">{it.preferredVendor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {viewedReq.gmRemark && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded text-xs mb-3 font-mono leading-relaxed">
              <strong>Supervisor Remark trace:</strong> {viewedReq.gmRemark}
            </div>
          )}
        </div>
      )}

      {/* 3.4 PURCHASE TEAM > RFQ MANAGEMENT */}
      {currentPage === 'rfqManagement' && !showCreateRfqForm && !managedRfq && (
        <div id="rfq-manager-dashboard">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">RFQ Management Workspace</h1>
              <p className="text-sm text-gray-500 mt-1">Configure request for quotes (RFQs) and compile incoming supplier bids side by side</p>
            </div>
            <button
               onClick={() => {
                 setRfqLinkedReq('REQ-2024-001');
                 setSelectedRfqVendors(['Ramesh Traders']);
                 setRfqSuccessMsg('');
                 setShowCreateRfqForm(true);
               }}
               className="bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase h-9 px-4 rounded hover:bg-blue-700 cursor-pointer"
            >
              + Create RFQ
            </button>
          </div>

          {rfqSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3 px-4 rounded">
              {rfqSuccessMsg}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-28">RFQ ID</th>
                  <th className="p-3">Linked Req</th>
                  <th className="p-3">Vendors Sent To</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3 text-center">Bids Captured</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {rfqs.map((r) => (
                  <tr key={r.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-500 font-mono">{r.id}</td>
                    <td className="p-3 font-mono text-gray-500">{r.linkedReqId}</td>
                    <td className="p-3 text-gray-700 font-medium truncate max-w-xs">{r.vendorsApproached.join(', ')}</td>
                    <td className="p-3 font-mono text-gray-400">{r.deadline}</td>
                    <td className="p-3 text-center font-mono text-blue-600 font-bold">{r.quotes.length} / {r.vendorsApproached.length}</td>
                    <td className="p-3">
                      <span className={`text-[9.5px] uppercase tracking-wide rounded px-1.5 py-0.5 font-bold ${
                        r.status === 'Closed' ? 'text-gray-500 bg-gray-100' : 'text-blue-700 bg-blue-50'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setManagedRfq(r);
                          setLoggingQuoteVendor(null);
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[10px] uppercase px-2.5 h-7 rounded cursor-pointer"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RFQ CREATE FORM */}
      {currentPage === 'rfqManagement' && showCreateRfqForm && (
        <div className="bg-white border rounded p-6 shadow-sm text-xs">
          <button onClick={() => setShowCreateRfqForm(false)} className="text-[10px] uppercase font-bold text-gray-500 mb-4 inline-block">
            ← Cancel RFQ Creation
          </button>

          <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-900 bg-white">Configure RFQ Broadcast</h2>

          <div className="space-y-4 max-w-xl">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Select Approved Requisition</label>
              <select
                value={rfqLinkedReq}
                onChange={(e) => setRfqLinkedReq(e.target.value)}
                className="w-full h-9 border border-gray-200 bg-white rounded px-2"
              >
                {requisitions
                  .filter(r => r.status === 'Approved')
                  .map(r => (
                    <option key={r.id} value={r.id}>{r.id} — {r.title}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Approach AVL Target Vendors</label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto border border-gray-150 p-2 text-xs bg-white">
                {vendors.filter(v => v.status === 'Active').map((v) => (
                  <label key={v.id} className="flex items-center gap-2 py-0.5">
                    <input
                      type="checkbox"
                      checked={selectedRfqVendors.includes(v.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRfqVendors([...selectedRfqVendors, v.name]);
                        } else {
                          setSelectedRfqVendors(selectedRfqVendors.filter(name => name !== v.name));
                        }
                      }}
                    />
                    <span>{v.name} ({v.category} — {v.id})</span>
                  </label>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5">
                * Note: Non-compliant off-AVL vendors are strictly invisible to select lines.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Target Deadline</label>
                <input
                  type="date"
                  value={rfqDeadline}
                  onChange={(e) => setRfqDeadline(e.target.value)}
                  className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t flex gap-2">
              <button
                onClick={() => {
                  if (selectedRfqVendors.length === 0) {
                    alert("Please authorize at least one AVL recipient to broadcast.");
                    return;
                  }
                  
                  const newRFQ: RFQ = {
                    id: `RFQ-2024-0${rfqs.length + 1}`,
                    linkedReqId: rfqLinkedReq,
                    vendorsApproached: selectedRfqVendors,
                    deadline: rfqDeadline,
                    status: 'Sent',
                    quotes: []
                  };

                  setRfqs(prev => [...prev, newRFQ]);
                  setRfqSuccessMsg(`RFQ Broadcast pipeline RFQ-2024-0${rfqs.length + 1} transmitted successfully.`);
                  setShowCreateRfqForm(false);
                }}
                className="bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-blue-700 cursor-pointer"
              >
                Send RFQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANAGE INDIVIDUAL RFQ AND COMPUTE BID QUOTES INLINE */}
      {currentPage === 'rfqManagement' && managedRfq && (
        <div className="bg-white border rounded p-6 shadow-sm text-xs">
          <button onClick={() => setManagedRfq(null)} className="text-[10px] uppercase font-bold text-gray-500 mb-4 inline-block">
            ← Back to Worklist
          </button>

          <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-900 bg-white">
            Maintain quotes logs: {managedRfq.id}
          </h2>

          <div className="space-y-5">
            <div className="bg-gray-50 border p-4 rounded text-xs space-y-1">
              <div><span className="text-gray-400 font-semibold uppercase tracking-wider">Demand reference:</span> {managedRfq.linkedReqId}</div>
              <div><span className="text-gray-400 font-semibold uppercase tracking-wider">Baseline Deadline:</span> {managedRfq.deadline}</div>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Recipient responses compile</h3>
            <div className="border rounded shadow-sm overflow-hidden bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5 text-center w-36">Response Status</th>
                    <th className="p-2.5 text-right w-44">Submitted Value</th>
                    <th className="p-2.5 text-right w-36">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {managedRfq.vendorsApproached.map((vName, idx) => {
                    const qData = managedRfq.quotes.find(q => q.vendorName === vName);
                    return (
                      <React.Fragment key={idx}>
                        <tr className="border-b h-11 text-xs">
                          <td className="p-2.5 font-semibold text-gray-900">{vName}</td>
                          <td className="p-2.5 text-center">
                            <span className={`text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                              qData ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50 animate-pulse'
                            }`}>
                              {qData ? 'Recorded' : 'Awaiting Bid'}
                            </span>
                          </td>
                          <td className="p-2.5 text-right font-semibold font-mono text-gray-900">
                            {qData ? `₹${(Object.values(qData.prices) as number[]).reduce((a: number, b: number) => a + b, 0).toLocaleString()}` : '—'}
                          </td>
                          <td className="p-2.5 text-right">
                            {!qData ? (
                              <button
                                onClick={() => {
                                  setLoggingQuoteVendor(vName);
                                  setLoggedQuoteForm({
                                    prices: { 'item-1': 100 },
                                    terms: 'Net 30',
                                    validity: 30
                                  });
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase px-2 h-7.5 rounded cursor-pointer"
                              >
                                Log Quote
                              </button>
                            ) : (
                              <span className="text-gray-400 uppercase text-[9px] font-semibold">Done</span>
                            )}
                          </td>
                        </tr>

                        {/* Inline form to input data */}
                        {loggingQuoteVendor === vName && (
                          <tr>
                            <td colSpan={4} className="p-4 bg-gray-50 border-b transition-all">
                              <div className="bg-white border rounded p-4 max-w-sm space-y-3.5">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 block mb-1">
                                  Bid Input Panel: {vName}
                                </span>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                  <div>
                                    <label className="text-[9px] uppercase font-bold block mb-0.5">Bid Net price (LineItem-1)</label>
                                    <input
                                      type="number"
                                      value={loggedQuoteForm.prices['item-1'] || ''}
                                      onChange={(e) => setLoggedQuoteForm({
                                        ...loggedQuoteForm,
                                        prices: { 'item-1': Number(e.target.value) }
                                      })}
                                      className="w-full h-8 border border-gray-200 rounded px-2"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[9px] uppercase font-bold block mb-0.5">Bid Validity</label>
                                    <input
                                      type="number"
                                      value={loggedQuoteForm.validity || ''}
                                      onChange={(e) => setLoggedQuoteForm({ ...loggedQuoteForm, validity: Number(e.target.value) })}
                                      className="w-full h-8 border border-gray-200 rounded px-2"
                                    />
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      const newQuoteObject = {
                                        vendorId: `V-${vName.slice(0,3).toUpperCase()}`,
                                        vendorName: vName,
                                        date: '2024-01-20',
                                        prices: loggedQuoteForm.prices,
                                        paymentTerms: loggedQuoteForm.terms,
                                        validityDays: loggedQuoteForm.validity
                                      };

                                      // Append quote inside state hook
                                      const updatedRfqs = rfqs.map(r => {
                                        if (r.id === managedRfq.id) {
                                          return {
                                            ...r,
                                            quotes: [...r.quotes, newQuoteObject],
                                            status: r.quotes.length + 1 === r.vendorsApproached.length ? 'Quotes In' as const : r.status
                                          };
                                        }
                                        return r;
                                      });
                                      setRfqs(updatedRfqs);
                                      
                                      // Update local
                                      setManagedRfq(prev => prev ? {
                                        ...prev,
                                        quotes: [...prev.quotes, newQuoteObject],
                                        status: prev.quotes.length + 1 === prev.vendorsApproached.length ? 'Quotes In' as const : prev.status
                                      } : null);

                                      setLoggingQuoteVendor(null);
                                    }}
                                    className="bg-green-600 text-white font-semibold text-[10px] uppercase h-8 px-3 rounded hover:bg-green-700 cursor-pointer"
                                  >
                                    Save Quote
                                  </button>
                                  <button onClick={() => setLoggingQuoteVendor(null)} className="text-xs text-gray-500 hover:underline">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3.5 TEAM > GOODS RECEIPT (GRN) */}
      {currentPage === 'goodsReceipt' && (
        <div id="grns-workspace-form">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Goods Receipt Worklist (GRN)</h1>
              <p className="text-sm text-gray-500 mt-1">Upload physical intake and material bills to cross check PO deliverables</p>
            </div>
            {!showCreateGrnForm && (
              <button
                onClick={() => {
                  setGrnLinkedPO('PO-2024-001');
                  setGrnItems([{ description: 'Engine Oil 10W30', orderQty: 20, receivedQty: 20, condition: 'Good' }]);
                  setGrnSuccessMsg('');
                  setShowCreateGrnForm(true);
                }}
                className="bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase h-9 px-4 rounded hover:bg-blue-700 cursor-pointer"
              >
                + New GRN
              </button>
            )}
          </div>

          {grnSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3 px-4 rounded">
              {grnSuccessMsg}
            </div>
          )}

          {!showCreateGrnForm ? (
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-3 w-28">GRN ID</th>
                    <th className="p-3">PO Number</th>
                    <th className="p-3">Vendor Name</th>
                    <th className="p-3">Received date</th>
                    <th className="p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {grns.map((g) => (
                    <tr key={g.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                      <td className="p-3 font-semibold text-gray-500 font-mono">{g.id}</td>
                      <td className="p-3 font-mono text-gray-500">{g.poId}</td>
                      <td className="p-3 font-semibold text-gray-900">{g.vendorName}</td>
                      <td className="p-3 font-mono text-gray-400">{g.receivedDate}</td>
                      <td className="p-3">
                        <span className={`text-[9.5px] uppercase tracking-wide px-2 py-0.5 rounded font-bold ${
                          g.status === 'Accepted' ? 'text-green-700 bg-green-50' : 'text-blue-700 bg-blue-50'
                        }`}>
                          {g.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white border rounded p-6 shadow-sm text-xs max-w-2xl">
              <button onClick={() => setShowCreateGrnForm(false)} className="text-[10px] uppercase font-bold text-gray-500 mb-4 inline-block">
                ← Cancel Submission
              </button>
              
              <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-900 bg-white">Compile Goods Receipt Note (GRN)</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Linked PO ID</label>
                    <select
                      value={grnLinkedPO}
                      onChange={(e) => {
                        const po_val = e.target.value;
                        setGrnLinkedPO(po_val);
                        const matched_po = pos.find(p => p.id === po_val);
                        if (matched_po) {
                          setGrnItems([{ description: matched_po.itemSummary, orderQty: 10, receivedQty: 10, condition: 'Good' }]);
                        }
                      }}
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2"
                    >
                      {pos
                        .filter(p => p.status === 'GRN Pending' || p.status === 'Delivered (GRN Pending)' || p.status === 'Pending Delivery' || p.status === 'Dispatched')
                        .map(p => (
                          <option key={p.id} value={p.id}>{p.id} — {p.vendorName}</option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Received Date</label>
                    <input
                      type="date"
                      value={grnReceivedDate}
                      onChange={(e) => setGrnReceivedDate(e.target.value)}
                      className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 font-mono"
                    />
                  </div>
                </div>

                {/* Received items controls */}
                <h3 className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block pb-1 border-b">Intake Quantity Validation</h3>
                
                {grnItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-gray-50 border p-3 rounded">
                    <div className="md:col-span-2">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block">Description</span>
                      <span className="font-semibold text-gray-900 mt-1 block">{item.description}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block mb-0.5">Physical Received Count</span>
                      <input
                        type="number"
                        value={item.receivedQty}
                        onChange={(e) => {
                          const updated = [...grnItems];
                          updated[idx].receivedQty = Number(e.target.value);
                          setGrnItems(updated);
                        }}
                        className="w-full h-8 border border-gray-200 bg-white rounded px-2 text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Goods Physical photo (Minimum 1 Required)</label>
                    <div className="border border-gray-200 border-dashed rounded p-3 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-[10px] font-semibold text-blue-600 block mt-1">Select Photographic Attachment</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Receipt remarks</label>
                    <textarea
                      rows={2}
                      value={grnRemarks}
                      onChange={(e) => setGrnRemarks(e.target.value)}
                      placeholder="Special observation notes..."
                      className="w-full border border-gray-200 rounded p-2 text-xs bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t flex gap-2">
                  <button
                    onClick={() => {
                      const matched_po = pos.find(p => p.id === grnLinkedPO);
                      const vendorName = matched_po ? matched_po.vendorName : 'Ramesh Traders';
                      
                      const newGRNObject: GRN = {
                        id: `GRN-2024-0${grns.length + 1}`,
                        poId: grnLinkedPO,
                        vendorName: vendorName,
                        receivedDate: grnReceivedDate,
                        receivedBy: 'Ratan Das',
                        status: 'Submitted',
                        items: grnItems
                      };

                      setGrns(prev => [...prev, newGRNObject]);

                      // Update PO state too
                      const updatedPOs = pos.map(p => {
                        if (p.id === grnLinkedPO) {
                          return { ...p, status: 'QC Pending' as const };
                        }
                        return p;
                      });
                      setPos(updatedPOs);

                      setGrnSuccessMsg(`GRN-2024-0${grns.length + 1} filed successfully. Material QA inspector Vikram Sen (GM) notified.`);
                      setShowCreateGrnForm(false);
                    }}
                    className="bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider h-9 px-4 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Submit GRN
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3.6 TEAM > PO TRACKER */}
      {currentPage === 'poTracker' && !trackedPo && (
        <div id="po-tracker-workspace">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Purchase Order Tracker</h1>
              <p className="text-sm text-gray-500 mt-1">Monitor shipment delivery windows and audit trail histories</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-28">PO Number</th>
                  <th className="p-3 font-semibold">Vendor Name</th>
                  <th className="p-3">Summary items</th>
                  <th className="p-3 text-right">Sum net value</th>
                  <th className="p-3">Expected Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pos.map((p) => (
                  <tr key={p.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-500 font-mono hover:underline cursor-pointer" onClick={() => setTrackedPo(p)}>{p.id}</td>
                    <td className="p-3 font-semibold text-gray-900">{p.vendorName}</td>
                    <td className="p-3 text-gray-700">{p.itemSummary}</td>
                    <td className="p-3 text-right font-mono font-semibold text-gray-950">₹{p.value.toLocaleString()}</td>
                    <td className="p-3 font-mono text-gray-400">{p.expectedDelivery}</td>
                    <td className="p-3">
                      <span className={`text-[9.5px] uppercase tracking-wide rounded px-2 py-0.5 font-bold ${
                        p.status === 'Completed' ? 'text-green-700 bg-green-50' : 'text-blue-700 bg-blue-50'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentPage === 'poTracker' && trackedPo && (
        <div className="bg-white border rounded p-6 shadow-sm text-xs">
          <button onClick={() => setTrackedPo(null)} className="text-[10px] uppercase font-bold text-gray-300 mb-4 hover:text-gray-600 block">
            ← Back to tracker
          </button>
          
          <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-900 font-mono">Detail Audit trace: {trackedPo.id}</h2>
          
          <div className="grid grid-cols-2 gap-4 text-xs max-w-lg mb-6">
            <div><span className="text-gray-400 block font-bold uppercase text-[9px]">Vendor</span> <span>{trackedPo.vendorName}</span></div>
            <div><span className="text-gray-400 block font-bold uppercase text-[9px]">Estimated Net Cost</span> <span className="font-mono">₹{trackedPo.value.toLocaleString()}</span></div>
            <div><span className="text-gray-400 block font-bold uppercase text-[9px]">Tracking target status</span> <span className="font-semibold uppercase text-indigo-700">{trackedPo.status}</span></div>
          </div>

          <h3 className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">SLA delivery directions</h3>
          <div className="bg-gray-50 border p-3 rounded font-mono leading-relaxed text-gray-700">
            {trackedPo.deliveryTerms || 'Standard packing. Material delivery inside 1st floor stores.'}
          </div>
        </div>
      )}

      {currentPage === 'vendorOnboarding' && (
        <div id="team-vendor-onboarding" className="space-y-6 text-xs">
          <div className="p-6 bg-white border border-gray-250 rounded shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-2">Shifted to GM (General Manager)</h2>
            <p className="text-gray-600 leading-relaxed">
              Vendor Onboarding KYC & Dossier creations have been shifted under GM's governance. Please switch to the GM panel to register new vendor profiles or check draft compliance files.
            </p>
          </div>
        </div>
      )}

      {false && (
        <div id="team-vendor-onboarding-DEACTIVATED" className="space-y-6 text-xs">
          
          {onboardingSuccessMsg && (
            <div className="bg-green-50 border border-green-200 text-green-800 text-sm p-4 rounded flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 font-bold" />
                <span className="font-medium">{onboardingSuccessMsg}</span>
              </div>
              <button 
                onClick={() => setOnboardingSuccessMsg('')}
                className="text-xs text-green-700 font-bold hover:underline bg-transparent border-0 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {!showOnboardingForm ? (
            <div className="space-y-6">
              
              {/* Header Box */}
              <div className="flex justify-between items-center bg-white border border-gray-200 p-5 rounded shadow-sm">
                <div>
                  <h1 className="text-xl font-bold text-gray-950 tracking-tight">AVL Onboarding Preparations</h1>
                  <p className="text-xs text-gray-500 mt-1">Prepare compliance dossiers, tax details and logistics parameters for Director sign-off</p>
                </div>
                <button
                  onClick={() => {
                    // Reset to blanks
                    setCoForm({
                      businessName: '',
                      tradeName: '',
                      businessType: 'Private Limited',
                      yearsInOperation: 5,
                      coverage: ['Kolkata HQ'],
                      reputationNotes: 'Prepared independently by Procurement department.',
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs tracking-wider uppercase px-4 h-9.5 rounded shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>✦ Setup New Vendor Onboarding Dossier</span>
                </button>
              </div>

              {/* Status Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Awaiting Director Sign-off</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {vendors.filter(v => v.status === 'Pending Onboarding').length}
                  </div>
                  <p className="text-[11px] text-amber-600 font-medium mt-1">Dossiers locked in Director's review stepper</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Approved AVL Suppliers</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {vendors.filter(v => v.status === 'Active').length}
                  </div>
                  <p className="text-[11px] text-green-700 font-medium mt-1">Fully validated & active for PO issuances</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Suspended / Pending Vetting</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {vendors.filter(v => v.status === 'Suspended' || v.status === 'Pending').length}
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mt-1">Flagged entries undergoing risk audits</p>
                </div>
              </div>

              {/* Informative Help Card */}
              <div className="bg-blue-50/55 border border-blue-200 rounded-lg p-5 leading-relaxed text-gray-700">
                <h4 className="font-bold text-blue-800 text-xs mb-1.5 uppercase tracking-wide">AVS Governance Protocol (Module 3)</h4>
                <p className="text-[11px] mb-2">
                  Bhandari Automobiles mandates that <strong>every supplier</strong> must pass through a structured onboarding review before procurement operations can initiate. As a Department executive, you are responsible for preparing the initial supplier entity profile, inputting bank verification numbers, and attaching tax proofs. 
                </p>
                <p className="text-[11px]">
                  Once submitted, the system bundles your details and pushes a pending request card into the <strong>Director's Verification Pipeline Stepper</strong>. The Director evaluates compliance, drafts SLAs, signs off on the risk matrix, and issues an automated AVL unique ID.
                </p>
              </div>

              {/* Onboarding Queue Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-450 block mb-3">Onboarding Applications Queue Status</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                        <th className="p-2.5">Candidate ID</th>
                        <th className="p-2.5">Corporate Legal Name</th>
                        <th className="p-2.5">Category Segment</th>
                        <th className="p-2.5">Locations Allowed</th>
                        <th className="p-2.5">Primary Sourcing Person</th>
                        <th className="p-2.5 text-right">Pipeline Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.filter(v => v.status === 'Pending Onboarding' || v.status === 'Pending').length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-6 text-gray-400 font-medium bg-gray-50/50">
                            No draft or pending onboarding requests found. Click the button above to set one up.
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
                                <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded font-bold ${
                                  v.status === 'Pending Onboarding' 
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                                }`}>
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
              
              {/* Form Bar */}
              <div className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded shadow-sm">
                <button
                  onClick={() => setShowOnboardingForm(false)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-semibold bg-white border border-gray-200 px-3 h-8.5 rounded cursor-pointer transition-colors"
                >
                  ← Back to Dossier Queue
                </button>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 block leading-tight">Master KYC Entry</span>
                  <span className="text-sm font-bold text-gray-800 leading-tight">AVL Vendor Dossier Setup form</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Columns - Inputs */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Card 1: Legal Identity & Footprint */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>1. Corporate Legal Identity & Footprint</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Corporate Legal Entity Name *</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white focus:outline-none focus:border-indigo-600"
                          placeholder="e.g. Diamond Harbour Oils Pvt Ltd"
                          value={coForm.businessName}
                          onChange={(e) => setCoForm({ ...coForm, businessName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Trade/DBA Brand Name</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white focus:outline-none focus:border-indigo-600"
                          placeholder="e.g. DHO Lubrication"
                          value={coForm.tradeName}
                          onChange={(e) => setCoForm({ ...coForm, tradeName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Constitution Type *</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-700"
                          value={coForm.businessType}
                          onChange={(e) => setCoForm({ ...coForm, businessType: e.target.value })}
                        >
                          <option value="Proprietorship">Proprietorship</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Private Limited">Private Limited</option>
                          <option value="Public Limited">Public Limited</option>
                          <option value="LLP">LLP (Limited Liability Partnership)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Incorporation Date</label>
                        <input
                          type="date"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white"
                          value={coForm.registrationIncorpDate}
                          onChange={(e) => setCoForm({ ...coForm, registrationIncorpDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Years Active</label>
                        <input
                          type="number"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white"
                          value={coForm.yearsInOperation}
                          onChange={(e) => setCoForm({ ...coForm, yearsInOperation: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Corporate Identification Number (CIN)</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 font-mono focus:outline-none"
                          placeholder="U12345WB2020PTC123456"
                          value={coForm.cinNumber}
                          onChange={(e) => setCoForm({ ...coForm, cinNumber: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Primary Transport Subhub</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-700"
                          value={coForm.logisticsRegion}
                          onChange={(e) => setCoForm({ ...coForm, logisticsRegion: e.target.value })}
                        >
                          <option value="Kolkata Regional Subhub">Kolkata Regional Subhub (Express Air Delivery)</option>
                          <option value="West Bengal Freight Lines">West Bengal Freight Lines (Heavy Surface Cargo)</option>
                          <option value="Salt Lake Immediate Air Cargo">Salt Lake Immediate Air Cargo (Hyperlocal Courier)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Factory / Dispatch Warehouse Address</label>
                      <textarea
                        className="w-full border border-gray-200 rounded p-2.5 focus:outline-none h-14"
                        placeholder="Plot No. 120, Diamond Harbour Road, South 24 Parganas, Kolkata"
                        value={coForm.factoryAddress}
                        onChange={(e) => setCoForm({ ...coForm, factoryAddress: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Card 2: Qualification & Tax */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>2. Tax Registration & Qualification Documents</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">GSTIN Number (15-char)*</label>
                        <input
                          type="text"
                          maxLength={15}
                          className="w-full h-8 border border-gray-200 rounded px-2.5 font-mono focus:outline-none focus:border-indigo-600 uppercase"
                          placeholder="19AABCU9614R1ZI"
                          value={coForm.approvedGst}
                          onChange={(e) => setCoForm({ ...coForm, approvedGst: e.target.value.toUpperCase() })}
                        />
                        {coForm.approvedGst && coForm.approvedGst.length !== 15 && (
                          <span className="text-[10px] text-amber-600 font-semibold block mt-1">⚠️ GSTIN must be exactly 15 characters</span>
                        )}
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Permanent Account Number (PAN)*</label>
                        <input
                          type="text"
                          maxLength={10}
                          className="w-full h-8 border border-gray-200 rounded px-2.5 font-mono focus:outline-none focus:border-indigo-600 uppercase"
                          placeholder="AABCU9614R"
                          value={coForm.pan}
                          onChange={(e) => setCoForm({ ...coForm, pan: e.target.value.toUpperCase() })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">MSME Classification Status</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-700"
                          value={coForm.msmeClassification}
                          onChange={(e) => setCoForm({ ...coForm, msmeClassification: e.target.value })}
                        >
                          <option value="Micro Enterprise (Udyam)">Micro Enterprise (Udyam Certification Verified)</option>
                          <option value="Small Enterprise">Small Enterprise</option>
                          <option value="Medium Enterprise">Medium Enterprise</option>
                          <option value="Not MSME Registered">Not MSME-Registered</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Audited Quality Standards</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs text-gray-700"
                          value={coForm.isoStandard}
                          onChange={(e) => setCoForm({ ...coForm, isoStandard: e.target.value })}
                        >
                          <option value="ISO 9001:2015 Certification">ISO 9001:2015 Standard (Acreddited Retailer)</option>
                          <option value="ISO 14001 Standard">ISO 14001 Environmental Protection Standard</option>
                          <option value="Under Vetting Review">Under Vetting Process (Nil Certified)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-gray-100 pt-3 text-[10.5px]">
                      <div>
                        <span className="text-[9.5px] font-bold text-gray-400 block mb-1">GST Registry PDF Copy</span>
                        <div className="bg-gray-50 border border-gray-250 p-1.5 rounded flex items-center justify-between">
                          <span className="text-gray-500 font-semibold font-mono truncate">gst_cert.pdf</span>
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-1 text-[9px] rounded">ATTACHED</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9.5px] font-bold text-gray-400 block mb-1">Cancelled Cheque Copy</span>
                        <div className="bg-gray-50 border border-gray-250 p-1.5 rounded flex items-center justify-between">
                          <span className="text-gray-500 font-semibold font-mono truncate">cheque_copy.pdf</span>
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-1 text-[9px] rounded">ATTACHED</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9.5px] font-bold text-gray-400 block mb-1">Financial Audited sheets</span>
                        <div className="bg-gray-50 border border-gray-250 p-1.5 rounded flex items-center justify-between">
                          <span className="text-gray-500 font-semibold font-mono truncate">financials.pdf</span>
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-1 text-[9px] rounded">ATTACHED</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Contact details */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>3. Primary Sourcing Representatives & Escalations</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Sourcing Officer Name*</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white"
                          placeholder="e.g. Amitava Sen"
                          value={coForm.contactName}
                          onChange={(e) => setCoForm({ ...coForm, contactName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Sourcing Contact Phone*</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono"
                          placeholder="+91 98350 56789"
                          value={coForm.contactPhone}
                          onChange={(e) => setCoForm({ ...coForm, contactPhone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Primary Business Email*</label>
                        <input
                          type="email"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white"
                          placeholder="contact@diamondlubricants.in"
                          value={coForm.contactEmail}
                          onChange={(e) => setCoForm({ ...coForm, contactEmail: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Escalation Desk Email</label>
                        <input
                          type="email"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white"
                          placeholder="escalations@diamondlubricants.in"
                          value={coForm.escalationEmail}
                          onChange={(e) => setCoForm({ ...coForm, escalationEmail: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Sourcing parameters & Bank */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>4. Settling Treasury Banking & Sourcing Details</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Select Sourcing Commodity Category*</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs"
                          value={coForm.commodityCategory}
                          onChange={(e) => setCoForm({ ...coForm, commodityCategory: e.target.value })}
                        >
                          <option value="Spare Parts">Spare Parts (Automative Body, Gearbox, suspension parts)</option>
                          <option value="Lubricants">Lubricants (Engine multi-grade oils, synthetic grease)</option>
                          <option value="Tyres">Tyres (Radial heavy trucks, tubeless passenger tyres)</option>
                          <option value="Electricals">Electricals (Inverter batteries, dashboard wiring harnesses)</option>
                          <option value="Accessories">Accessories (Carpets, sound buffers)</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Allowed Branch Footprints</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {['Kolkata HQ', 'Salt Lake Branch', 'Howrah Branch', 'Barasat Branch'].map((loc) => {
                            const isChecked = coForm.coverage.includes(loc);
                            return (
                              <label key={loc} className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold cursor-pointer transition-colors ${
                                isChecked ? 'bg-indigo-50 border-indigo-350 text-indigo-700' : 'bg-white border-gray-200 text-gray-500'
                              }`}>
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={isChecked}
                                  onChange={() => {
                                    const nextCoverage = isChecked
                                      ? coForm.coverage.filter(c => c !== loc)
                                      : [...coForm.coverage, loc];
                                    setCoForm({ ...coForm, coverage: nextCoverage });
                                  }}
                                />
                                <span>{loc}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Beneficiary Bank Name*</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white"
                          placeholder="e.g. State Bank of India"
                          value={coForm.bankName}
                          onChange={(e) => setCoForm({ ...coForm, bankName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1 font-mono">Bank Account No.*</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono"
                          placeholder="50201082531"
                          value={coForm.bankAccount}
                          onChange={(e) => setCoForm({ ...coForm, bankAccount: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1 font-mono">Bank IFSC Code*</label>
                        <input
                          type="text"
                          maxLength={11}
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono uppercase"
                          placeholder="SBIN0001045"
                          value={coForm.bankIfsc}
                          onChange={(e) => setCoForm({ ...coForm, bankIfsc: e.target.value.toUpperCase() })}
                        />
                        {coForm.bankIfsc && coForm.bankIfsc.length !== 11 && (
                          <span className="text-[9px] text-amber-600 font-semibold block mt-1">IFSC must be 11 characters.</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Settling Payment Terms*</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs"
                          value={coForm.paymentTerms}
                          onChange={(e) => {
                            const pDays = e.target.value === 'Advance Payment' ? 0 : 30;
                            setCoForm({ ...coForm, paymentTerms: e.target.value, creditPeriod: pDays });
                          }}
                        >
                          <option value="Net 15">Net 15 Days Credit</option>
                          <option value="Net 30">Net 30 Days Credit (Standard)</option>
                          <option value="Net 45">Net 45 Days Credit</option>
                          <option value="Net 60">Net 60 Days Credit</option>
                          <option value="Advance Payment">Advance Payment Required</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Credit period (in days)</label>
                        <input
                          type="number"
                          min={0}
                          disabled={coForm.paymentTerms === 'Advance Payment'}
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white disabled:bg-gray-100 disabled:text-gray-400"
                          value={coForm.paymentTerms === 'Advance Payment' ? 0 : coForm.creditPeriod}
                          onChange={(e) => setCoForm({ ...coForm, creditPeriod: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Sourcing Currency</label>
                        <select
                          className="w-full h-8 border border-gray-200 rounded bg-white text-xs"
                          value={coForm.currencyOption}
                          onChange={(e) => setCoForm({ ...coForm, currencyOption: e.target.value })}
                        >
                          <option value="INR (₹)">INR (₹) - Standard Trade Ledger</option>
                          <option value="USD ($)">USD ($) - International Trade</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Card 5: Compliance and sustainability */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-1.5 pb-2 border-b border-gray-100">
                      <span>5. ESG Compliance & Integrity Code Signoff</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Vendor Net-Zero Reference Code</label>
                        <input
                          type="text"
                          className="w-full h-8 border border-gray-200 rounded px-2.5 bg-white font-mono"
                          placeholder="e.g. ESG-CN-9034"
                          value={coForm.netZeroCode}
                          onChange={(e) => setCoForm({ ...coForm, netZeroCode: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center h-full pt-4">
                        <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-800">
                          <input
                            type="checkbox"
                            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                            checked={coForm.sustainabilityPledge}
                            onChange={(e) => setCoForm({ ...coForm, sustainabilityPledge: e.target.checked })}
                          />
                          <span>Vendor confirms sustainability & anti-bribery integrity pledge</span>
                        </label>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column - Checklist & Submit */}
                <div className="space-y-6">
                  
                  {/* Dynamic checklist box */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block border-b border-gray-100 pb-2">Real-time Form Validation Audits</span>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">1. Corporate Legal Name</span>
                        {coForm.businessName.trim().length > 0 ? (
                          <span className="text-[9px] uppercase font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">PASSED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">AWAITING</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">2. GSTIN format (15 char)</span>
                        {coForm.approvedGst.trim().length === 15 ? (
                          <span className="text-[9px] uppercase font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">VERIFIED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">INCOMPLETE</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">3. PAN format (10 char)</span>
                        {coForm.pan.trim().length === 10 ? (
                          <span className="text-[9px] uppercase font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">VALIDATED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">INCOMPLETE</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">4. Banking Settlements</span>
                        {coForm.bankAccount.trim().length >= 8 && coForm.bankName.trim().length > 0 && coForm.bankIfsc.trim().length === 11 ? (
                          <span className="text-[9px] uppercase font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">LINKED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">EMPTY</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">5. Sourcing Representatives</span>
                        {coForm.contactName.trim().length > 0 && coForm.contactPhone.trim().length > 0 && coForm.contactEmail.trim().length > 0 ? (
                          <span className="text-[9px] uppercase font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">VERIFIED</span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">AWAITING</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submission block */}
                  <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-lg p-5 text-white shadow-md text-xs space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100 block">Commit Dossier Submission</span>
                    <p className="text-[11.5px] leading-relaxed text-indigo-100">
                      Submitting this payload freezes your parameters and uploads the digitized materials to the compliance vault. This triggers a pending review in the <strong>Director's Verification Pipeline Stepper</strong>.
                    </p>

                    <div className="pt-1.5">
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
                        className="w-full bg-white text-indigo-900 border-0 uppercase h-10 rounded hover:bg-indigo-50 flex items-center justify-center gap-1 cursor-pointer transition-colors font-bold shadow-md"
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
