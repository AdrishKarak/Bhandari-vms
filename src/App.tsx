import React, { useState } from 'react';
import { 
  Building2, Users, FileCheck, FileText, CheckSquare, Shield, ShieldCheck, 
  ArrowRight, Key, Info, Layout
} from 'lucide-react';

// Sub panels
import DirectorPanel from './components/DirectorPanel';
import GMPanel from './components/GMPanel';
import TeamPanel from './components/TeamPanel';
import AccountsPanel from './components/AccountsPanel';
import AuditPanel from './components/AuditPanel';

// Types and mock data
import { 
  INITIAL_VENDORS, INITIAL_REQUISITIONS, INITIAL_RFQS, INITIAL_POS, 
  INITIAL_GRNS, INITIAL_INVOICES, INITIAL_CONTRACTS, INITIAL_PAYMENT_BATCHES, INITIAL_USERS 
} from './data';
import { Vendor, Requisition, RFQ, PurchaseOrder, GRN, Invoice, Contract, PaymentBatch, User } from './types';

export default function App() {
  const [activeRole, setActiveRole] = useState<string | null>(null);

  // Expose activeRole and setActiveRole globally to allow seamless role jumping in SharedShell
  React.useEffect(() => {
    (window as any).__changeActiveRole = (role: string | null) => {
      setActiveRole(role);
    };
    return () => {
      delete (window as any).__changeActiveRole;
    };
  }, []);

  // Unified global state for live interactions between roles
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [requisitions, setRequisitions] = useState<Requisition[]>(INITIAL_REQUISITIONS);
  const [rfqs, setRfqs] = useState<RFQ[]>(INITIAL_RFQS);
  const [pos, setPos] = useState<PurchaseOrder[]>(INITIAL_POS);
  const [grns, setGrns] = useState<GRN[]>(INITIAL_GRNS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [paymentBatches, setPaymentBatches] = useState<PaymentBatch[]>(INITIAL_PAYMENT_BATCHES);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  // Render role-specific dashboards
  const renderPanel = () => {
    switch (activeRole) {
      case 'Director':
        return (
          <DirectorPanel
            vendors={vendors}
            setVendors={setVendors}
            requisitions={requisitions}
            setRequisitions={setRequisitions}
            rfqs={rfqs}
            setRfqs={setRfqs}
            pos={pos}
            setPos={setPos}
            grns={grns}
            setGrns={setGrns}
            invoices={invoices}
            setInvoices={setInvoices}
            contracts={contracts}
            setContracts={setContracts}
            paymentBatches={paymentBatches}
            setPaymentBatches={setPaymentBatches}
            users={users}
            setUsers={setUsers}
            onBack={() => setActiveRole(null)}
          />
        );
      case 'GM':
        return (
          <GMPanel
            vendors={vendors}
            setVendors={setVendors}
            requisitions={requisitions}
            setRequisitions={setRequisitions}
            rfqs={rfqs}
            setRfqs={setRfqs}
            pos={pos}
            setPos={setPos}
            grns={grns}
            setGrns={setGrns}
            invoices={invoices}
            setInvoices={setInvoices}
            contracts={contracts}
            setContracts={setContracts}
            paymentBatches={paymentBatches}
            setPaymentBatches={setPaymentBatches}
            users={users}
            setUsers={setUsers}
            onBack={() => setActiveRole(null)}
          />
        );
      case 'Team':
        return (
          <TeamPanel
            vendors={vendors}
            setVendors={setVendors}
            requisitions={requisitions}
            setRequisitions={setRequisitions}
            rfqs={rfqs}
            setRfqs={setRfqs}
            pos={pos}
            setPos={setPos}
            grns={grns}
            setGrns={setGrns}
            invoices={invoices}
            setInvoices={setInvoices}
            contracts={contracts}
            setContracts={setContracts}
            paymentBatches={paymentBatches}
            setPaymentBatches={setPaymentBatches}
            users={users}
            setUsers={setUsers}
            onBack={() => setActiveRole(null)}
          />
        );
      case 'Accounts':
        return (
          <AccountsPanel
            vendors={vendors}
            setVendors={setVendors}
            requisitions={requisitions}
            setRequisitions={setRequisitions}
            rfqs={rfqs}
            setRfqs={setRfqs}
            pos={pos}
            setPos={setPos}
            grns={grns}
            setGrns={setGrns}
            invoices={invoices}
            setInvoices={setInvoices}
            contracts={contracts}
            setContracts={setContracts}
            paymentBatches={paymentBatches}
            setPaymentBatches={setPaymentBatches}
            users={users}
            setUsers={setUsers}
            onBack={() => setActiveRole(null)}
          />
        );
      case 'Auditor':
        return (
          <AuditPanel
            vendors={vendors}
            setVendors={setVendors}
            requisitions={requisitions}
            setRequisitions={setRequisitions}
            rfqs={rfqs}
            setRfqs={setRfqs}
            pos={pos}
            setPos={setPos}
            grns={grns}
            setGrns={setGrns}
            invoices={invoices}
            setInvoices={setInvoices}
            contracts={contracts}
            setContracts={setContracts}
            paymentBatches={paymentBatches}
            setPaymentBatches={setPaymentBatches}
            users={users}
            setUsers={setUsers}
            onBack={() => setActiveRole(null)}
          />
        );
      default:
        return renderLandingPage();
    }
  };

  const renderLandingPage = () => {
    // Determine dynamic live metrics from state to make the landing page active and authentic
    const activeVendorsCount = vendors.filter(v => v.status === 'Active').length;
    const totalPoVolume = pos.reduce((sum, po) => sum + po.value, 0);
    const pendingApprovalCount = requisitions.filter(r => r.status === 'Pending Approval').length;
    const pendingVerificationCount = invoices.filter(i => i.status === 'Pending Verification' || i.status === 'Submitted' || i.status === 'Pending Booking').length;

    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-950">
        
        {/* Top Premium Bar with high-contrast borders */}
        <header className="border-b border-gray-200 bg-white h-16 flex items-center px-8 justify-between shadow-xs z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded shadow-sm">
              <span className="text-white text-sm font-bold leading-none select-none font-sans">B</span>
            </div>
            <div>
              <span className="font-bold tracking-tight text-sm uppercase text-blue-600 block">Bhandari Automobiles</span>
              <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase block">Enterprise Vendor Portal & VMS</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-sm border border-gray-200 text-[10px] font-mono text-gray-600">
              System: <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" /> ONLINE
            </div>
            <span className="text-[10px] font-semibold text-neutral-400 font-mono hidden sm:inline-block">2026 ERP V4.8</span>
          </div>
        </header>

        {/* Spacious Main Area */}
        <main className="flex-1 flex flex-col items-center justify-center py-12 px-8 lg:p-16 max-w-7xl mx-auto w-full space-y-12">
          
          {/* Main Hero block with generous typography and breathing room */}
          <div className="text-center max-w-3xl space-y-5 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200/60 rounded-full text-blue-700 px-4 py-1.5 font-mono text-[10px] uppercase font-bold tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> 
              <span>State Audit Secure VMS Environment</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-950 leading-tight">
              Automated Procurement & <br className="hidden sm:inline" />
              <span className="text-blue-600">Vendor Management Suite</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
              Automate branch material requisitions, execute RFQ compilations, audit 3-way invoice matched billing ledgers, and trigger compliance-indexed bank payouts.
            </p>
          </div>

          {/* Dynamic real-time audit counters in a beautiful bento grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 px-2">
            <div className="bg-white border border-gray-200 p-5 rounded shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Active Approved AVL</span>
              <div className="mt-2 text-3xl font-black text-gray-950 font-mono">{activeVendorsCount} <span className="text-xs text-emerald-600">Offices</span></div>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">Vetted auto suppliers</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Dispatched PO Value</span>
              <div className="mt-2 text-3xl font-black text-gray-950 font-mono">₹{(totalPoVolume / 1000).toFixed(1)}k <span className="text-xs text-blue-600">Allocated</span></div>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">Cumulative branch orders</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Demands To Authorize</span>
              <div className="mt-2 text-3xl font-black text-gray-950 font-mono">{pendingApprovalCount} <span className="text-[11px] text-amber-600 font-bold uppercase">Pending</span></div>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">Awaiting GM/Director key</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Audit Mismatch Pipeline</span>
              <div className="mt-2 text-3xl font-black text-gray-950 font-mono">{pendingVerificationCount} <span className="text-xs text-red-500">Invoices</span></div>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">Verification matches needed</p>
            </div>
          </div>

          {/* Interactive Role Switch Cards (Spacious, beautifully bordered with hover transformations) */}
          <div className="w-full space-y-4">
            <div className="text-left">
              <h2 className="text-xs font-black uppercase tracking-widest text-neutral-400 block mb-1">Select Active Authentication Role</h2>
              <p className="text-[11px] text-gray-500">Log in to execute specific stage gates in the dual-signoff automobile procurement line</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
              {/* 1. Director */}
              <button
                onClick={() => setActiveRole('Director')}
                className="bg-white border border-gray-200 hover:border-gray-900 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 text-left rounded-lg cursor-pointer group flex flex-col justify-between h-56"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-gray-150 flex items-center justify-center text-gray-900 mb-5 group-hover:bg-gray-950 group-hover:text-white transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-gray-950 text-xs uppercase tracking-wider">Director</h3>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">AVL sign-offs, master user overrides, global contract configuration.</p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-[10px] font-black text-blue-600 group-hover:text-gray-950 flex items-center gap-1.5 uppercase tracking-wider">Auth Launch <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </button>

              {/* 2. GM */}
              <button
                onClick={() => setActiveRole('GM')}
                className="bg-white border border-gray-200 hover:border-amber-600 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 text-left rounded-lg cursor-pointer group flex flex-col justify-between h-56"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-amber-50 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-gray-950 text-xs uppercase tracking-wider">General Manager</h3>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Requisition approval limits, vendor dossier preparation, workshop QA.</p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-[10px] font-black text-amber-600 group-hover:text-amber-800 flex items-center gap-1.5 uppercase tracking-wider">Auth Launch <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </button>

              {/* 3. Team */}
              <button
                onClick={() => setActiveRole('Team')}
                className="bg-white border border-gray-200 hover:border-blue-600 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 text-left rounded-lg cursor-pointer group flex flex-col justify-between h-56"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-blue-50 text-blue-700 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-gray-950 text-xs uppercase tracking-wider">Purchase Team</h3>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Raise requisitions, RFQ inputs, trigger inventory GRN intakes.</p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-[10px] font-black text-blue-600 group-hover:text-blue-800 flex items-center gap-1.5 uppercase tracking-wider">Auth Launch <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </button>

              {/* 4. Accounts */}
              <button
                onClick={() => setActiveRole('Accounts')}
                className="bg-white border border-gray-200 hover:border-emerald-600 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 text-left rounded-lg cursor-pointer group flex flex-col justify-between h-56"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-gray-950 text-xs uppercase tracking-wider">Accounts Desk</h3>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Audit 3-way matches (PO vs GRN vs Invoice) & release NEFT batches.</p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-[10px] font-black text-emerald-600 group-hover:text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">Auth Launch <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </button>

              {/* 5. Auditor */}
              <button
                onClick={() => setActiveRole('Auditor')}
                className="bg-white border border-gray-200 hover:border-indigo-600 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 text-left rounded-lg cursor-pointer group flex flex-col justify-between h-56"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-indigo-50 text-indigo-700 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-gray-950 text-xs uppercase tracking-wider">Auditor / Compliance</h3>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Track price drift anomalies, purchase safety logs, compliance indexes.</p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-[10px] font-black text-indigo-600 group-hover:text-indigo-800 flex items-center gap-1.5 uppercase tracking-wider">Auth Launch <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </button>
            </div>
          </div>

          {/* Guidelines info card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl text-center shadow-xs flex items-start gap-4">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 animate-pulse" />
            <div className="text-left space-y-1 text-xs">
              <strong className="text-gray-900 block pb-1 font-extrabold border-b border-gray-100 uppercase tracking-wider">Live Simulative Memory State Flow:</strong>
              <p className="text-gray-600 leading-relaxed text-[11px]">
                Modifying state in any of the panels (such as onboarding a vendor in GM, initiating demands in purchasing, making approvals in Director, auditing compliance deviations) propagates instantly across other dashboards. Switch roles freely via the header selection.
              </p>
            </div>
          </div>
        </main>

        {/* Corporate Footer */}
        <footer className="border-t border-gray-200 bg-white py-5 text-center text-[10px] font-mono text-gray-400 tracking-wider">
          Bhandari Automobiles Ltd. Corporate Terminal — Confidential Security ID: {`BAL-VMS-829A`}. All session actions logged under ISO 27001 requirements.
        </footer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPanel()}
    </div>
  );
}

