import React, { useState } from 'react';
import { 
  CreditCard, FileText, CheckSquare, Layers, Plus, ArrowLeft, Check, AlertTriangle, Eye 
} from 'lucide-react';
import { Vendor, Requisition, RFQ, PurchaseOrder, GRN, Invoice, Contract, PaymentBatch, User, Location } from '../types';
import SharedShell from './SharedShell';

interface AccountsPanelProps {
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

export default function AccountsPanel({
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
}: AccountsPanelProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Verify Invoice substation
  const [verifyingInvoice, setVerifyingInvoice] = useState<Invoice | null>(null);
  const [qtyMatchCheck, setQtyMatchCheck] = useState(false);
  const [priceMatchCheck, setPriceMatchCheck] = useState(false);
  const [bankMatchCheck, setBankMatchCheck] = useState(false);
  const [verifierRemark, setVerifierRemark] = useState('');
  const [verifSuccessMsg, setVerifSuccessMsg] = useState('');

  // Payment Batch substation
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [selectedInvoiceIdsForBatch, setSelectedInvoiceIdsForBatch] = useState<string[]>([]);
  const [batchMethod, setBatchMethod] = useState('NEFT');
  const [batchBank, setBatchBank] = useState('HDFC Operational Branch');
  const [batchSuccessMsg, setBatchSuccessMsg] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<PaymentBatch | null>(null);
  const [batchTitle, setBatchTitle] = useState('MID-MONTH PROCUREMENT CLEARANCE');
  const [complianceKey, setComplianceKey] = useState('');
  const [batchRemarks, setBatchRemarks] = useState('Reconciliation validated against GRN yard receipt receipts of parts');
  
  // Overhauled Payment Batch details:
  const [authorizedBy, setAuthorizedBy] = useState('Arun Das (Senior Accountant)');
  const [tdsRule, setTdsRule] = useState('194C'); // 'None' | '194C' (1%) | '194Q' (0.1%) | '194J' (10%)
  const [urgencyPriority, setUrgencyPriority] = useState(false);
  const [emailAdvice, setEmailAdvice] = useState(true);
  const [utrPrefix, setUtrPrefix] = useState('HDFCCLEAR');
  const [apiGateway, setApiGateway] = useState('Direct ERP Host Hook'); // 'Direct ERP Host Hook' | 'Open SFTP' | 'Manual CSV Portal'

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Layers className="w-4 h-4" /> },
    { id: 'invoiceVerification', label: 'Invoice Verification', icon: <FileText className="w-4 h-4" /> },
    { id: 'paymentBatches', label: 'Payment Batches', icon: <CreditCard className="w-4 h-4" /> }
  ];

  // Calculations
  const awaitingVerificationCount = invoices.filter(i => i.status === 'Pending Verification' || i.status === 'Submitted').length;
  const readyForPaymentCount = invoices.filter(i => i.status === 'Approved').length;
  const outstandingSum = invoices
    .filter(i => i.status !== 'Paid')
    .reduce((sum, invoice) => sum + (invoice.amount || invoice.totalAmount), 0);

  return (
    <SharedShell
      role="Accounts"
      roleColor="#059669"
      roleBadgeBg="bg-emerald-50"
      roleBadgeText="text-emerald-700"
      sidebarItems={sidebarItems}
      currentPage={currentPage}
      setCurrentPage={(p) => {
        setCurrentPage(p);
        setVerifyingInvoice(null);
        setSelectedBatch(null);
        setShowCreateBatch(false);
      }}
      onBack={onBack}
      userName="Abhi Roy"
      userBranch="Kolkata HQ"
    >
      {/* 4.1 ACCOUNTS > DASHBOARD */}
      {currentPage === 'dashboard' && (
        <div id="accounts-dashboard">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Accounts & Billing Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Verify invoice mismatch records, balance outstanding ledgers, and manage NEFT batches</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setCurrentPage('invoiceVerification')}
              className="bg-white border border-gray-200 rounded p-5 shadow-sm text-left hover:border-emerald-500 transition-colors block cursor-pointer"
            >
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Verification Pending</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{awaitingVerificationCount}</div>
              <p className="text-xs text-indigo-600 font-semibold mt-1">Process matches →</p>
            </button>
            
            <button
              onClick={() => setCurrentPage('paymentBatches')}
              className="bg-white border border-gray-200 rounded p-5 shadow-sm text-left hover:border-emerald-500 transition-colors block cursor-pointer"
            >
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Ready for Payment</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{readyForPaymentCount}</div>
              <p className="text-xs text-blue-600 font-semibold mt-1">Release batches →</p>
            </button>

            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Outstanding Balance</span>
              <div className="text-2xl font-bold text-red-600 mt-1 font-mono">₹{outstandingSum.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">Unreleased liability logs</p>
            </div>

            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Payment Batches (Month)</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{paymentBatches.length}</div>
              <p className="text-xs text-emerald-700 mt-1">Fully cleared batches</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Awaiting Verification list */}
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm text-xs">
              <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3 block">Awaiting My Verification</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                      <th className="p-2.5">Invoice ID</th>
                      <th className="p-2.5">PO Ref</th>
                      <th className="p-2.5">Vendor Name</th>
                      <th className="p-2.5">Invoiced Date</th>
                      <th className="p-2.5 text-right">Invoiced amount</th>
                      <th className="p-2.5 text-right w-36">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices
                      .filter(i => i.status === 'Pending Verification' || i.status === 'Submitted')
                      .map((i) => (
                        <tr key={i.id} className="border-b h-11 hover:bg-gray-50/20 text-xs">
                          <td className="p-2.5 font-semibold font-mono text-gray-500">{i.id}</td>
                          <td className="p-2.5 font-mono text-gray-500">{i.poId}</td>
                          <td className="p-2.5 font-semibold text-gray-900">{i.vendorName}</td>
                          <td className="p-2.5 font-mono text-gray-400">{i.date}</td>
                          <td className="p-2.5 text-right font-semibold font-mono text-gray-950">₹{(i.amount || i.totalAmount).toLocaleString()}</td>
                          <td className="p-2.5 text-right">
                            <button
                              onClick={() => {
                                setVerifierRemark('');
                                setQtyMatchCheck(false);
                                setPriceMatchCheck(false);
                                setBankMatchCheck(false);
                                setVerifyingInvoice(i);
                                setCurrentPage('invoiceVerification');
                              }}
                              className="bg-blue-600 text-white font-medium px-3 h-7.5 rounded text-xs tracking-wider uppercase hover:bg-blue-700 cursor-pointer"
                            >
                              Verify Invoice
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Batches list */}
            <div className="bg-white border border-gray-200 rounded p-5 shadow-sm text-xs">
              <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3 block">Payment Batches Ledger</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-200 h-8">
                      <th className="p-3">Batch ID</th>
                      <th className="p-3">Created Date</th>
                      <th className="p-3">Transactions</th>
                      <th className="p-3 text-right">Total Payout</th>
                      <th className="p-3">Release Route</th>
                      <th className="p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentBatches.map((b) => (
                      <tr key={b.id} className="border-b h-11">
                        <td className="p-3 font-semibold font-mono text-gray-500">{b.id}</td>
                        <td className="p-3 font-mono text-gray-400">{b.payoutDate || b.dueDate}</td>
                        <td className="p-3 text-gray-700 font-medium">Bank Accounts Ledger ({b.invoiceIds ? b.invoiceIds.length : b.invoiceCount} bills)</td>
                        <td className="p-3 text-right font-semibold font-mono text-gray-900">₹{(b.totalValue !== undefined ? b.totalValue : (b.amount || 0)).toLocaleString()}</td>
                        <td className="p-3 font-mono text-gray-500">{b.targetAccount || 'HDFC Bank - Kolkata'}</td>
                        <td className="p-3">
                          <span className={`text-[9.5px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded ${
                            b.status === 'Paid' || b.status === 'Executed' ? 'text-green-705 bg-green-50' : 'text-amber-700 bg-amber-50'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4.2 ACCOUNTS > INVOICE VERIFICATION */}
      {currentPage === 'invoiceVerification' && !verifyingInvoice && (
        <div id="invoice-verification-vault">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Invoice Audit Vault</h1>
              <p className="text-sm text-gray-500 mt-1">Cross analyze billing receipts against physical goods intake documents</p>
            </div>
          </div>

          {verifSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3 px-4 rounded">
              {verifSuccessMsg}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                  <th className="p-3 w-28">Invoice ID</th>
                  <th className="p-3">Linked PO</th>
                  <th className="p-3 font-semibold">Vendor Name</th>
                  <th className="p-3">Invoice value</th>
                  <th className="p-3">Billing Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-500 font-mono">{i.id}</td>
                    <td className="p-3 font-mono text-gray-400">{i.poId}</td>
                    <td className="p-3 font-semibold text-gray-900">{i.vendorName}</td>
                    <td className="p-3 text-gray-900 font-bold font-mono">₹{(i.amount || i.totalAmount).toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${
                        i.status === 'Approved' ? 'text-green-700' : i.status === 'Rejected' ? 'text-red-750' : 'text-amber-700'
                      }`}>
                        {i.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {i.status === 'Pending Verification' || i.status === 'Submitted' ? (
                        <button
                          onClick={() => {
                            setVerifierRemark('');
                            setQtyMatchCheck(false);
                            setPriceMatchCheck(false);
                            setBankMatchCheck(false);
                            setVerifyingInvoice(i);
                          }}
                          className="bg-blue-600 text-white font-medium px-3 h-7.5 rounded text-xs tracking-wider uppercase hover:bg-blue-700 cursor-pointer"
                        >
                          Verify Match
                        </button>
                      ) : (
                        <button
                          onClick={() => setVerifyingInvoice(i)}
                          className="text-gray-500 hover:text-gray-800 text-[10px] uppercase font-bold"
                        >
                          Show Matching
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

      {/* 3-WAY MATCHING DETAILED ACTION VIEW IN PORTAL */}
      {currentPage === 'invoiceVerification' && verifyingInvoice && (
        <div id="three-way-matching-workspace" className="bg-white border border-gray-205 rounded p-6 shadow-sm text-xs">
          <button
            onClick={() => setVerifyingInvoice(null)}
            className="text-[10px] uppercase font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Verification vault
          </button>

          <h2 className="text-sm font-semibold border-b pb-2.5 mb-4 text-gray-900 font-mono">
            3-Way Accounting Match Ledger: {verifyingInvoice.id}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            
            {/* PO Baseline Specifications */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded text-xs space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block border-b pb-1">1. Purchase Order ({verifyingInvoice.poId})</span>
              <div><span className="text-gray-400 uppercase text-[9px] font-bold">Ordered Qty:</span> <strong className="font-mono">10 Units</strong></div>
              <div><span className="text-gray-400 uppercase text-[9px] font-bold">Base Unit Price:</span> <strong className="font-mono">₹950</strong></div>
              <div><span className="text-gray-400 uppercase text-[9px] font-bold">Agreed PO net amount:</span> <strong className="font-mono">₹{(verifyingInvoice?.amount || verifyingInvoice?.totalAmount || 0).toLocaleString()}</strong></div>
            </div>

            {/* GRN Received specifications */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded text-xs space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block border-b pb-1">2. Goods Receipt Ledger (GRN)</span>
              <div><span className="text-gray-400 uppercase text-[9px] font-bold">Intake accepted qty:</span> <strong className="font-mono">10 Units</strong></div>
              <div><span className="text-gray-400 uppercase text-[9px] font-bold">Physical status:</span> <span className="bg-green-50 text-green-700 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Damage checklist passed</span></div>
              <div><span className="text-gray-400 uppercase text-[9px] font-bold font-medium">Receipt Signer:</span> <span>Ratan Das</span></div>
            </div>

            {/* Invoice specifications */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded text-xs space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block border-b pb-1">3. Invoice Billing Details</span>
              <div><span className="text-gray-400 uppercase text-[9px] font-bold">Invoiced Qty:</span> <strong className="font-mono">10 Units</strong></div>
              <div><span className="text-gray-400 uppercase text-[9px] font-bold">Invoiced amount:</span> <strong className="font-mono text-emerald-750">₹{(verifyingInvoice?.amount || verifyingInvoice?.totalAmount || 0).toLocaleString()}</strong></div>
              <div>
                <span className="text-gray-400 uppercase text-[9px] font-bold">Tolerance verification:</span> 
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1 uppercase">Matches within limit 0%</span>
              </div>
            </div>

          </div>

          {/* Verification checklist checkboxes */}
          {verifyingInvoice.status !== 'Approved' && verifyingInvoice.status !== 'Paid' ? (
            <div className="bg-gray-50 border p-5 rounded space-y-4">
              <h3 className="text-xs uppercase font-bold text-gray-400">Match Compliance Indicators</h3>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 py-0.5 select-none hover:bg-gray-100/50">
                  <input
                    type="checkbox"
                    checked={qtyMatchCheck}
                    onChange={(e) => setQtyMatchCheck(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Invoice Qty matches PO baseline and accepted physical GRN intake counts.</span>
                </label>
                <label className="flex items-center gap-2 py-0.5 select-none hover:bg-gray-100/50">
                  <input
                    type="checkbox"
                    checked={priceMatchCheck}
                    onChange={(e) => setPriceMatchCheck(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Invoice unit rate matches agreed AVL contract tariffs and tax codes.</span>
                </label>
                <label className="flex items-center gap-2 py-0.5 select-none hover:bg-gray-100/50">
                  <input
                    type="checkbox"
                    checked={bankMatchCheck}
                    onChange={(e) => setBankMatchCheck(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Vendor bank particulars and PAN codes validated against AML database.</span>
                </label>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">General Audit Signer Remarks</label>
                <textarea
                  rows={2}
                  value={verifierRemark}
                  onChange={(e) => setVerifierRemark(e.target.value)}
                  placeholder="Verification support text..."
                  className="w-full border border-gray-200 bg-white rounded p-2 text-xs focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (!qtyMatchCheck || !priceMatchCheck || !bankMatchCheck) {
                      alert("Please compliance-check all 3 match parameters prior to approving disbursement sheets.");
                      return;
                    }

                    // Approved invoice state
                    const updated = invoices.map(i => {
                      if (i.id === verifyingInvoice.id) {
                        return { ...i, status: 'Approved' as const, verificationRemark: verifierRemark };
                      }
                      return i;
                    });
                    setInvoices(updated);

                    setVerifSuccessMsg(`Invoice ${verifyingInvoice.id} approved, 3-Way matches verified, queued for Bank batch release.`);
                    setVerifyingInvoice(null);
                  }}
                  className="bg-green-600 text-white font-semibold text-xs tracking-wider uppercase h-9 px-4 rounded hover:bg-green-700 cursor-pointer"
                >
                  Approve & Queue Payment
                </button>
                <button
                  onClick={() => {
                    if (!verifierRemark) {
                      alert("Detailed audit remarks are mandatory to reject invoicing matches.");
                      return;
                    }
                    const updated = invoices.map(i => {
                      if (i.id === verifyingInvoice.id) {
                        return { ...i, status: 'Rejected' as const, verificationRemark: verifierRemark };
                      }
                      return i;
                    });
                    setInvoices(updated);
                    setVerifSuccessMsg(`Invoice ${verifyingInvoice.id} disputed and returned. Accounts team notified.`);
                    setVerifyingInvoice(null);
                  }}
                  className="bg-red-650 text-white font-semibold text-xs tracking-wider uppercase h-9 px-4 rounded hover:bg-red-700 cursor-pointer"
                >
                  Reject & Log Dispute
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-100 rounded p-4 text-xs font-mono">
              <strong>Checklist Status:</strong> Verified & Approved. Linked payout accounts unlocked.
            </div>
          )}
        </div>
      )}

      {/* 4.3 ACCOUNTS > PAYMENT BATCHES */}
      {currentPage === 'paymentBatches' && (
        <div id="batches-workspace">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Payment Batches Workspace</h1>
              <p className="text-sm text-gray-500 mt-1">Bundle approved bills, export RTGS spreadsheets, and discharge cash liabilities</p>
            </div>
            {!showCreateBatch && (
              <button
                onClick={() => {
                  setSelectedInvoiceIdsForBatch([]);
                  setBatchSuccessMsg('');
                  setShowCreateBatch(true);
                }}
                className="bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase h-9 px-4 rounded hover:bg-blue-700 cursor-pointer"
              >
                + Create custom batch
              </button>
            )}
          </div>

          {batchSuccessMsg && (
            <div className="my-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3 px-4 rounded">
              {batchSuccessMsg}
            </div>
          )}

          {!showCreateBatch ? (
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="p-3">Batch Reference</th>
                    <th className="p-3">Payout Date</th>
                    <th className="p-3">Invoices aggregated</th>
                    <th className="p-3 text-right">Sum valuation</th>
                    <th className="p-3 font-semibold">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentBatches.map((b) => (
                    <tr key={b.id} className="border-b border-gray-200 h-11 hover:bg-gray-50/50">
                      <td className="p-3 font-semibold text-gray-500 font-mono">{b.id}</td>
                      <td className="p-3 font-mono text-gray-400">{b.payoutDate || b.dueDate}</td>
                      <td className="p-3 text-gray-700">{(b.invoiceIds || [`INV-${b.id.split('-')[1] || '001'}`]).join(', ')}</td>
                      <td className="p-3 text-right font-mono font-bold text-gray-950">₹{(b.totalValue !== undefined ? b.totalValue : (b.amount || 0)).toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`text-[9.5px] uppercase tracking-wide font-bold px-2 py-0.5 rounded ${
                          b.status === 'Paid' || b.status === 'Executed' ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Top controls */}
              <div className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded shadow-xs">
                <button
                  onClick={() => setShowCreateBatch(false)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-semibold bg-white border border-gray-200 px-3 h-8.5 rounded cursor-pointer transition-colors"
                >
                  ← Back to Batches
                </button>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-teal-600 block leading-tight">Treasury Operations</span>
                  <span className="text-sm font-bold text-gray-800 leading-tight">Master Payment Batch Compiler</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left side (Form Content: 2 Columns wide) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* General settings & target bank parameters */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5 text-xs">
                    <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                      <h3 className="font-bold text-sm text-gray-950 uppercase tracking-wide flex items-center gap-2 text-teal-700">
                        <CreditCard className="w-4 h-4 text-teal-600" />
                        1. Treasury Settling Bank & Route Parameters
                      </h3>
                      <span className="text-[10px] text-gray-450 uppercase font-mono">Clearing Account Details</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Batch Custom Description Name *</label>
                        <input
                          type="text"
                          value={batchTitle}
                          onChange={(e) => setBatchTitle(e.target.value)}
                          className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-semibold focus:outline-none focus:border-emerald-600 text-gray-800"
                          placeholder="e.g. MID-MONTH NEFT CLEARANCE"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Expected Payout Settle Date</label>
                        <input
                          type="date"
                          defaultValue="2026-06-10"
                          className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono text-gray-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Transfer Route Method *</label>
                        <select
                          value={batchMethod}
                          onChange={(e) => setBatchMethod(e.target.value)}
                          className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700 focus:outline-none focus:border-emerald-600 font-bold"
                        >
                          <option value="NEFT">NEFT (National Electronic Funds Transfer - Standard)</option>
                          <option value="RTGS">RTGS (Real-time Gross Settlement - Fast Treasury)</option>
                          <option value="IMPS">IMPS (Immediate Payment Service - Instant)</option>
                          <option value="LDG">INTERNAL BOOK TRANSFER (Ledger Settle)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Payer Settling Account *</label>
                        <select
                          value={batchBank}
                          onChange={(e) => setBatchBank(e.target.value)}
                          className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700 font-medium focus:outline-none focus:border-emerald-600"
                        >
                          <option value="HDFC Operational Branch">HDFC Corp Operational - A/c 50200012345678 (Kolkata)</option>
                          <option value="SBI Main Trade Account">SBI Main Trade Reserve - A/c 30012456789 (Salt Lake)</option>
                          <option value="ICICI Treasury Account">ICICI Capital Growth - A/c 001205006789 (Howrah)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Corporate Authorized Submitter Name *</label>
                        <input
                          type="text"
                          value={authorizedBy}
                          onChange={(e) => setAuthorizedBy(e.target.value)}
                          className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-semibold focus:outline-none focus:border-emerald-600 text-gray-800"
                          placeholder="e.g. Arun Das (Senior Accountant)"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">UTR ID Generation Prefix</label>
                        <input
                          type="text"
                          value={utrPrefix}
                          onChange={(e) => setUtrPrefix(e.target.value.toUpperCase())}
                          className="w-full h-9 border border-gray-200 bg-white rounded px-3 text-xs font-mono text-gray-800 focus:outline-none focus:border-emerald-600"
                          placeholder="e.g. HDFCCLEAR"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">TDS & withholding rule (Tax Deducted at Source) *</label>
                        <select
                          value={tdsRule}
                          onChange={(e) => setTdsRule(e.target.value)}
                          className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700 font-medium focus:outline-none focus:border-emerald-600"
                        >
                          <option value="None">None (No TDS Deduction - Pay 100%)</option>
                          <option value="194C">Section 194C - Contractors (Auto Deduct 1.0%)</option>
                          <option value="194Q">Section 194Q - Purchase of Goods &gt; ₹50L (Auto Deduct 0.1%)</option>
                          <option value="194J">Section 194J - Professional/Technical Services (Auto Deduct 10.0%)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Clearing Gateway/API Channel *</label>
                        <select
                          value={apiGateway}
                          onChange={(e) => setApiGateway(e.target.value)}
                          className="w-full h-9 border border-gray-200 bg-white rounded px-2.5 text-xs text-gray-700 font-medium focus:outline-none focus:border-emerald-600"
                        >
                          <option value="Direct ERP Host Hook">Direct Bank ERP Hub Integration API (Encrypted REST)</option>
                          <option value="Open SFTP">Secure SFTP File Clearance (Manual CSV Drop)</option>
                          <option value="Manual CSV Portal">Legacy Manual CMS Ledger Portal Upload</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <label className="flex items-center gap-2 text-xs text-gray-700 font-semibold cursor-pointer select-none">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                          checked={urgencyPriority}
                          onChange={(e) => setUrgencyPriority(e.target.checked)}
                        />
                        <div className="flex flex-col">
                          <span>Urgent Reserve Priority Clearing</span>
                          <span className="text-[10px] font-normal text-gray-400">Trigger immediate webhook validation on RBI clearing houses</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-gray-700 font-semibold cursor-pointer select-none">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                          checked={emailAdvice}
                          onChange={(e) => setEmailAdvice(e.target.checked)}
                        />
                        <div className="flex flex-col">
                          <span>Transmit Digital Payment Advice to Supplier</span>
                          <span className="text-[10px] font-normal text-gray-400">Mail stamped PDF clearing voucher to contact emails automatically</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Dynamic invoice checklist with mismatch clearance validations */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4 text-xs">
                    <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                      <h3 className="font-bold text-sm text-gray-950 uppercase tracking-wide flex items-center gap-2 text-teal-700">
                        <FileText className="w-4 h-4 text-teal-600" />
                        2. Select Verified & Approved Invoices to Bundle
                      </h3>
                      
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const approvedInvoiceIds = invoices.filter(i => i.status === 'Approved').map(i => i.id);
                            setSelectedInvoiceIdsForBatch(approvedInvoiceIds);
                          }}
                          className="text-[9px] uppercase font-bold text-indigo-600 hover:underline bg-indigo-50/50 px-2 py-0.5 rounded cursor-pointer leading-none h-5 flex items-center"
                        >
                          Select All
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceIdsForBatch([])}
                          className="text-[9px] uppercase font-bold text-gray-500 hover:underline bg-gray-100 px-2 py-0.5 rounded cursor-pointer leading-none h-5 flex items-center"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white max-h-60 overflow-y-auto w-full">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 h-8 border-b text-[9.5px] font-bold text-gray-400 uppercase tracking-wider">
                            <th className="p-2 w-12 text-center">Include</th>
                            <th className="p-2">Invoice ID</th>
                            <th className="p-2">Vendor Name</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">GST ITC Code</th>
                            <th className="p-2 text-right">Sum net</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.filter(i => i.status === 'Approved').length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-center py-6 text-gray-405 font-medium bg-gray-50/50">
                                No approved invoices are currently awaiting payment bundling.
                              </td>
                            </tr>
                          ) : (
                            invoices
                              .filter(i => i.status === 'Approved')
                              .map(i => {
                                const isChecked = selectedInvoiceIdsForBatch.includes(i.id);
                                return (
                                  <tr key={i.id} className="border-b h-10 hover:bg-gray-50/50">
                                    <td className="p-2 text-center">
                                      <input
                                        type="checkbox"
                                        className="rounded border-gray-350 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                                        checked={isChecked}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setSelectedInvoiceIdsForBatch([...selectedInvoiceIdsForBatch, i.id]);
                                          } else {
                                            setSelectedInvoiceIdsForBatch(selectedInvoiceIdsForBatch.filter(id => id !== i.id));
                                          }
                                        }}
                                      />
                                    </td>
                                    <td className="p-2 font-semibold font-mono text-gray-505">{i.id}</td>
                                    <td className="p-2 text-gray-900 font-semibold">{i.vendorName}</td>
                                    <td className="p-2 text-gray-500">Spare Parts</td>
                                    <td className="p-2">
                                      <span className="text-[9px] bg-green-50 text-green-700 font-bold border border-green-200 rounded px-1.5 py-0.5 uppercase tracking-wide">
                                        MATCHED 100%
                                      </span>
                                    </td>
                                    <td className="p-2 text-right font-semibold font-mono text-gray-950">
                                      ₹{(i.amount || i.totalAmount).toLocaleString()}
                                    </td>
                                  </tr>
                                );
                              })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Authorization signatures and auditing comments */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4 text-xs">
                    <div className="border-b border-gray-100 pb-3">
                      <h3 className="font-bold text-sm text-gray-950 uppercase tracking-wide flex items-center gap-2 text-teal-700">
                        <Check className="w-4 h-4 text-teal-600" />
                        3. Liability Clearance Signoff & Auditing Notes
                      </h3>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Reconciliation Audit Remarks</label>
                      <textarea
                        value={batchRemarks}
                        onChange={(e) => setBatchRemarks(e.target.value)}
                        className="w-full border border-gray-200 bg-white rounded p-3 text-xs focus:outline-none h-18 text-gray-700 focus:border-emerald-600"
                        placeholder="State any observations about this transaction cycle..."
                      />
                    </div>
                  </div>

                </div>

                {/* Right side status column (Liquid reserve impacts and actions) */}
                <div className="space-y-6">
                  
                  {/* Cash flow reserve projection box */}
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm text-xs space-y-4">
                    <span className="text-[10px] font-bold uppercase text-teal-700 tracking-wider block border-b border-gray-100 pb-2 font-bold">Liquidity Ledger Impact Auditor</span>
                    
                    {(() => {
                      // Mock initial balance based on bank account
                      const initialBalance = batchBank === 'SBI Main Trade Account' 
                        ? 7800000 
                        : (batchBank === 'ICICI Treasury Account' ? 3200000 : 4500000);
                      
                      const selectedSum = invoices
                        .filter(i => selectedInvoiceIdsForBatch.includes(i.id))
                        .reduce((sum, current) => sum + (current.amount || current.totalAmount), 0);

                      const finalBalance = initialBalance - selectedSum;
                      const hasSufficientFunds = finalBalance >= 0;

                      return (
                        <div className="space-y-3.5">
                          <div className="flex justify-between text-gray-500">
                            <span>Account Ledger Capital:</span>
                            <span className="font-mono font-bold text-gray-800">₹{initialBalance.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex justify-between text-gray-500">
                            <span>Bundle Net Outflow:</span>
                            <span className="font-mono font-bold text-red-600">-₹{selectedSum.toLocaleString()}</span>
                          </div>

                          <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
                            <span className="font-bold text-gray-900">Projected Ending Cash:</span>
                            <span className={`font-mono font-bold text-sm ${hasSufficientFunds ? 'text-green-700' : 'text-red-700'}`}>
                              ₹{finalBalance.toLocaleString()}
                            </span>
                          </div>

                          <div className="border-t border-gray-150 pt-3">
                            <span className="text-[10px] text-gray-400 block mb-1">Interactive Verification Code:</span>
                            <input
                              type="password"
                              maxLength={8}
                              value={complianceKey}
                              onChange={(e) => setComplianceKey(e.target.value.toUpperCase())}
                              className="w-full h-8.5 border border-emerald-200 rounded px-2.5 bg-emerald-50/20 font-bold tracking-widest text-center text-emerald-800 placeholder-emerald-300 focus:outline-none focus:border-emerald-500 uppercase"
                              placeholder="🔒 ENTER TREASURY SIGN KEY"
                            />
                            <span className="text-[9px] text-gray-400 block mt-1 tracking-tight text-center">Required to commit releasing logs. (e.g. ACC-3344)</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Aggregation summary stats sheet */}
                  {(() => {
                    const totalGrossValue = invoices
                      .filter(i => selectedInvoiceIdsForBatch.includes(i.id))
                      .reduce((sum, curr) => sum + (curr.amount || curr.totalAmount), 0);
                    
                    let tdsRate = 0;
                    if (tdsRule === '194C') tdsRate = 0.01;
                    else if (tdsRule === '194Q') tdsRate = 0.001;
                    else if (tdsRule === '194J') tdsRate = 0.10;

                    const tdsDeductedValue = Math.floor(totalGrossValue * tdsRate);
                    const netPayableValue = totalGrossValue - tdsDeductedValue;

                    return (
                      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm text-xs space-y-3.5">
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Clearance Summary Stats</span>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between text-gray-600">
                            <span>Packets Aggregated:</span>
                            <span className="font-bold text-gray-800">{selectedInvoiceIdsForBatch.length} approved bills</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Aggregate Gross Val:</span>
                            <span className="font-mono font-bold text-gray-800">₹{totalGrossValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>TDS Withheld ({tdsRule === 'None' ? '0%' : tdsRule === '194C' ? '1.0% Sec 194C' : tdsRule === '194Q' ? '0.1% Sec 194Q' : '10.0% Sec 194J'}):</span>
                            <span className="font-mono font-semibold text-rose-700">-₹{tdsDeductedValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t border-dashed border-gray-200 pt-2 font-bold text-gray-950">
                            <span>Net Bank Payout Outflow:</span>
                            <span className="font-mono text-emerald-700">₹{netPayableValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-gray-600 pt-1 border-t border-gray-100">
                            <span>GST ITC Claim Yield (Est. 18%):</span>
                            <span className="font-mono font-semibold text-teal-700">
                              ₹{Math.floor(totalGrossValue * 0.18).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Clearing Bank Fee:</span>
                            <span className="font-bold text-gray-800">
                              {batchMethod === 'RTGS' ? '₹15 (Immediate)' : '₹0 (Standard)'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Submission and approval action card */}
                  <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-lg p-5 text-white shadow-md text-xs space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-100 block">Release Settlement</span>
                    <p className="text-[11px] leading-relaxed text-emerald-50">
                      Finalizing this payload exports an encrypted clearing file to the partner gateway, updates ledger bills to "Paid", and closes outstanding liability journals.
                    </p>

                    <div className="pt-1 select-none">
                      <button
                        onClick={() => {
                          if (selectedInvoiceIdsForBatch.length === 0) {
                            alert("Select at least one approved invoice to packet inside batch settlement sheets.");
                            return;
                          }
                          if (!complianceKey) {
                            alert("Please enter your treasury authorization validation code (e.g. ACC-3344) to release the batch.");
                            return;
                          }

                          const totalValue = invoices
                            .filter(i => selectedInvoiceIdsForBatch.includes(i.id))
                            .reduce((sum, c) => sum + (c.amount || c.totalAmount), 0);

                          const firstInv = invoices.find(i => selectedInvoiceIdsForBatch.includes(i.id));
                          const vName = firstInv ? firstInv.vendorName : "Consolidated Batch";

                          let tdsPercentVal = 0;
                          if (tdsRule === '194C') tdsPercentVal = 0.01;
                          else if (tdsRule === '194Q') tdsPercentVal = 0.001;
                          else if (tdsRule === '194J') tdsPercentVal = 0.10;

                          const tdsDeductedValue = Math.floor(totalValue * tdsPercentVal);
                          const netPayoutValue = totalValue - tdsDeductedValue;

                          const batchId = `BATH-2026-0${paymentBatches.length + 10}`;
                          const generatedUtr = `${utrPrefix || 'HDFCCLEAR'}${batchId.replace(/\D/g, '')}X9`;

                          const newBatchObject: PaymentBatch = {
                            id: batchId,
                            vendorName: selectedInvoiceIdsForBatch.length === 1 ? vName : `${selectedInvoiceIdsForBatch.length} Suppliers Consolidated`,
                            invoiceCount: selectedInvoiceIdsForBatch.length,
                            amount: netPayoutValue,
                            dueDate: '2026-06-10',
                            invoiceIds: selectedInvoiceIdsForBatch,
                            totalValue: netPayoutValue,
                            payoutDate: '2026-06-10',
                            status: 'Paid',
                            targetAccount: batchBank
                          };

                          setPaymentBatches(prev => [...prev, newBatchObject]);

                          // Update invoice statuses inside state data too
                          const updatedInvoices = invoices.map(i => {
                            if (selectedInvoiceIdsForBatch.includes(i.id)) {
                              return { ...i, status: 'Paid' as const };
                            }
                            return i;
                          });
                          setInvoices(updatedInvoices);

                          setBatchSuccessMsg(`${batchMethod} settlement batch ${batchId} cleared successfully. ${urgencyPriority ? '⚡ HIGH PRIORITY URGENT ROUTING COMMITTED.' : ''} Net Bank Outflow: ₹${netPayoutValue.toLocaleString()} (TDS Deducted: ₹${tdsDeductedValue.toLocaleString()} withheld under Sec ${tdsRule}). Generated Bank UTR Ref: ${generatedUtr}. Authenticated with signatory code ${complianceKey} (Submitted by ${authorizedBy} via ${apiGateway}). ${emailAdvice ? '✉️ Payment Advice mailed to supplier.' : ''}`);
                          setShowCreateBatch(false);
                          
                          // Reset state
                          setComplianceKey('');
                          setSelectedInvoiceIdsForBatch([]);
                        }}
                        className="w-full bg-white text-emerald-800 uppercase font-bold tracking-wider text-xs px-4 h-9.5 rounded hover:bg-emerald-50 flex items-center justify-center gap-1 cursor-pointer transition-colors shadow"
                      >
                        Execute Batch & Transfer Funds
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
