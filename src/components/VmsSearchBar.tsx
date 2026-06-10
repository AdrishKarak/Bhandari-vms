import React, { useState, useEffect, useRef } from 'react';
import { Search, CornerDownLeft, Sparkles, FolderLock, ExternalLink, ArrowRight } from 'lucide-react';

interface VmsSearchBarProps {
  currentPage: string;
  activeRole: string;
}

export interface SearchRouteOption {
  pageId: string;
  pageLabel: string;
  roleName: 'Director' | 'GM' | 'Team' | 'Accounts' | 'Auditor';
  roleLabel: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  keywords: string[];
}

const VMS_SYSTEM_ROUTES: SearchRouteOption[] = [
  // Director
  { 
    pageId: 'dashboard', 
    pageLabel: 'Director Dashboard Overview', 
    roleName: 'Director', 
    roleLabel: 'Director / Master AVL', 
    colorClass: 'text-neutral-900', 
    bgClass: 'bg-neutral-100', 
    borderClass: 'border-neutral-300',
    keywords: ['director', 'dashboard', 'analytics', 'master', 'integrity', 'global', 'spend', 'overview', 'sla', 'maindesk'] 
  },
  { 
    pageId: 'avl', 
    pageLabel: 'Approved Vendor List (AVL)', 
    roleName: 'Director', 
    roleLabel: 'Director / Master AVL', 
    colorClass: 'text-neutral-900', 
    bgClass: 'bg-neutral-100', 
    borderClass: 'border-neutral-300',
    keywords: ['avl', 'vendors', 'supplier', 'active', 'list', 'approved', 'dealers', 'ramesh'] 
  },
  { 
    pageId: 'onboarding', 
    pageLabel: 'Director Vendor Onboarding Pipeline', 
    roleName: 'Director', 
    roleLabel: 'Director / Master AVL', 
    colorClass: 'text-neutral-900', 
    bgClass: 'bg-neutral-100', 
    borderClass: 'border-neutral-300',
    keywords: ['director', 'onboarding', 'pipeline', 'approval', 'signoff', 'new vendor', 'drafts', 'kyc'] 
  },
  { 
    pageId: 'contracts', 
    pageLabel: 'Master Contracts & SLAs', 
    roleName: 'Director', 
    roleLabel: 'Director / Master AVL', 
    colorClass: 'text-neutral-900', 
    bgClass: 'bg-neutral-100', 
    borderClass: 'border-neutral-300',
    keywords: ['contracts', 'sla', 'agreements', 'expiration', 'timeline', 'liability', 'legal'] 
  },
  { 
    pageId: 'priceIntelligence', 
    pageLabel: 'Pricing Intelligence and Variance', 
    roleName: 'Director', 
    roleLabel: 'Director / Master AVL', 
    colorClass: 'text-neutral-900', 
    bgClass: 'bg-neutral-100', 
    borderClass: 'border-neutral-300',
    keywords: ['pricing', 'price intelligence', 'market margin', 'variance', 'benchmark', 'rate validation', 'invoice drift'] 
  },
  { 
    pageId: 'users', 
    pageLabel: 'System Users Access Control', 
    roleName: 'Director', 
    roleLabel: 'Director / Master AVL', 
    colorClass: 'text-neutral-900', 
    bgClass: 'bg-neutral-100', 
    borderClass: 'border-neutral-300',
    keywords: ['users', 'roles', 'permissions', 'staff', 'employees', 'access', 'security', 'privilege'] 
  },

  // GM
  { 
    pageId: 'dashboard', 
    pageLabel: 'GM Overview Dashboard', 
    roleName: 'GM', 
    roleLabel: 'General Manager (GM)', 
    colorClass: 'text-amber-800', 
    bgClass: 'bg-amber-50', 
    borderClass: 'border-amber-200',
    keywords: ['gm', 'dashboard', 'overview', 'summary', 'demands', 'metrics', 'volume', 'executive'] 
  },
  { 
    pageId: 'requisitions', 
    pageLabel: 'Purchase Requisitions Approval', 
    roleName: 'GM', 
    roleLabel: 'General Manager (GM)', 
    colorClass: 'text-amber-800', 
    bgClass: 'bg-amber-50', 
    borderClass: 'border-amber-200',
    keywords: ['gm', 'requisitions', 'approve requisition', 'material demand', 'purchase request', 'limits', 'signoff'] 
  },
  { 
    pageId: 'rfqQuotes', 
    pageLabel: 'GM RFQs & Vendor Quotes Review', 
    roleName: 'GM', 
    roleLabel: 'General Manager (GM)', 
    colorClass: 'text-amber-800', 
    bgClass: 'bg-amber-50', 
    borderClass: 'border-amber-200',
    keywords: ['gm', 'rfq', 'quotes', 'bid compile', 'pricing comparison', 'vendor proposals', 'rate sheet'] 
  },
  { 
    pageId: 'vendorSelection', 
    pageLabel: 'Strategic Vendor Bid Selection', 
    roleName: 'GM', 
    roleLabel: 'General Manager (GM)', 
    colorClass: 'text-amber-800', 
    bgClass: 'bg-amber-50', 
    borderClass: 'border-amber-200',
    keywords: ['gm', 'selection', 'choose', 'award', 'po release', 'bid award', 'decision'] 
  },
  { 
    pageId: 'activePOs', 
    pageLabel: 'Active POs Ledger', 
    roleName: 'GM', 
    roleLabel: 'General Manager (GM)', 
    colorClass: 'text-amber-800', 
    bgClass: 'bg-amber-50', 
    borderClass: 'border-amber-200',
    keywords: ['gm', 'po', 'active pos', 'purchase orders', 'order history', 'procured'] 
  },
  { 
    pageId: 'qualityCheck', 
    pageLabel: 'Quality Control Gatepass', 
    roleName: 'GM', 
    roleLabel: 'General Manager (GM)', 
    colorClass: 'text-amber-800', 
    bgClass: 'bg-amber-50', 
    borderClass: 'border-amber-200',
    keywords: ['gm', 'quality', 'qc', 'gatepass', 'defect check', 'lab validation', 'accept', 'on-site'] 
  },
  { 
    pageId: 'vendorOnboarding', 
    pageLabel: 'GM Vendor Candidate Onboarding', 
    roleName: 'GM', 
    roleLabel: 'General Manager (GM)', 
    colorClass: 'text-amber-800', 
    bgClass: 'bg-amber-50', 
    borderClass: 'border-amber-200',
    keywords: ['gm', 'onboarding', 'onboard', 'registration', 'supplier signup', 'candidate'] 
  },

  // Team
  { 
    pageId: 'dashboard', 
    pageLabel: 'Purchase Desk Dashboard', 
    roleName: 'Team', 
    roleLabel: 'Purchase Desk', 
    colorClass: 'text-blue-800', 
    bgClass: 'bg-blue-50', 
    borderClass: 'border-blue-200',
    keywords: ['team', 'purchase', 'dashboard', 'activity', 'requisition log', 'quick actions'] 
  },
  { 
    pageId: 'raiseRequisition', 
    pageLabel: 'Raise Brand New Requisition', 
    roleName: 'Team', 
    roleLabel: 'Purchase Desk', 
    colorClass: 'text-blue-800', 
    bgClass: 'bg-blue-50', 
    borderClass: 'border-blue-200',
    keywords: ['team', 'raise', 'create requisition', 'new requisition', 'request parts', 'order materials'] 
  },
  { 
    pageId: 'myRequisitions', 
    pageLabel: 'My Requisitions History', 
    roleName: 'Team', 
    roleLabel: 'Purchase Desk', 
    colorClass: 'text-blue-800', 
    bgClass: 'bg-blue-50', 
    borderClass: 'border-blue-200',
    keywords: ['team', 'my requisitions', 'requisitions history', 'track demand', 'status'] 
  },
  { 
    pageId: 'rfqManagement', 
    pageLabel: 'RFQ Multi-Vendor Management', 
    roleName: 'Team', 
    roleLabel: 'Purchase Desk', 
    colorClass: 'text-blue-800', 
    bgClass: 'bg-blue-50', 
    borderClass: 'border-blue-200',
    keywords: ['team', 'rfq', 'request for quote', 'dealer bidding', 'publish rfqs'] 
  },
  { 
    pageId: 'goodsReceipt', 
    pageLabel: 'Goods Receipt Note (GRN) Intake', 
    roleName: 'Team', 
    roleLabel: 'Purchase Desk', 
    colorClass: 'text-blue-800', 
    bgClass: 'bg-blue-50', 
    borderClass: 'border-blue-200',
    keywords: ['team', 'goods receipt', 'grn', 'receive items', 'warehouse intake', 'materials check'] 
  },
  { 
    pageId: 'poTracker', 
    pageLabel: 'Purchase Order (PO) Tracker', 
    roleName: 'Team', 
    roleLabel: 'Purchase Desk', 
    colorClass: 'text-blue-800', 
    bgClass: 'bg-blue-50', 
    borderClass: 'border-blue-200',
    keywords: ['team', 'po tracker', 'track purchase orders', 'dispatch timeline', 'delivery'] 
  },

  // Accounts
  { 
    pageId: 'dashboard', 
    pageLabel: 'Accounts Settlement Overview', 
    roleName: 'Accounts', 
    roleLabel: 'Accounts Settlement', 
    colorClass: 'text-emerald-850', 
    bgClass: 'bg-emerald-50', 
    borderClass: 'border-emerald-250',
    keywords: ['accounts', 'dashboard', 'financials', 'outstanding', 'matching progress', 'billing'] 
  },
  { 
    pageId: 'invoiceVerification', 
    pageLabel: '3-Way Invoice Matching Audit', 
    roleName: 'Accounts', 
    roleLabel: 'Accounts Settlement', 
    colorClass: 'text-emerald-850', 
    bgClass: 'bg-emerald-50', 
    borderClass: 'border-emerald-250',
    keywords: ['accounts', 'verification', 'verify invoice', '3-way match', 'ledger matching', 'grn vs invoice'] 
  },
  { 
    pageId: 'paymentBatches', 
    pageLabel: 'Payment NEFT Payout Batches', 
    roleName: 'Accounts', 
    roleLabel: 'Accounts Settlement', 
    colorClass: 'text-emerald-850', 
    bgClass: 'bg-emerald-50', 
    borderClass: 'border-emerald-250',
    keywords: ['accounts', 'payment batches', 'release funds', 'neft payout', 'rtgs', 'bank settlement'] 
  },

  // Auditor (Audit role is Audit inside panels)
  { 
    pageId: 'dashboard', 
    pageLabel: 'Compliance Auditor Dashboard', 
    roleName: 'Auditor', 
    roleLabel: 'Compliance Auditor', 
    colorClass: 'text-indigo-800', 
    bgClass: 'bg-indigo-50', 
    borderClass: 'border-indigo-200',
    keywords: ['audit', 'auditor', 'compliance', 'dashboard', 'price variance', 'drifts', 'integrity', 'gstr'] 
  },
  { 
    pageId: 'avlContracts', 
    pageLabel: 'AVL & Contracts Audit Ledger', 
    roleName: 'Auditor', 
    roleLabel: 'Compliance Auditor', 
    colorClass: 'text-indigo-800', 
    bgClass: 'bg-indigo-50', 
    borderClass: 'border-indigo-200',
    keywords: ['audit', 'contracts', 'verify security', 'sla verification', 'onboarding check'] 
  },
  { 
    pageId: 'pricingAudit', 
    pageLabel: 'Pricing Intelligence & Tax Audit', 
    roleName: 'Auditor', 
    roleLabel: 'Compliance Auditor', 
    colorClass: 'text-indigo-800', 
    bgClass: 'bg-indigo-50', 
    borderClass: 'border-indigo-200',
    keywords: ['audit', 'pricing', 'mismatch', 'overpricing', 'tax audit', 'gst compliance'] 
  }
];

export default function VmsSearchBar({ currentPage, activeRole }: VmsSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when currentPage or activeRole changes internally
  useEffect(() => {
    setQuery('');
    setIsOpen(false);
    setActiveSuggestionIndex(0);
  }, [currentPage, activeRole]);

  // Focus Search input on Command+P / Ctrl+K / Ctrl+Shift+S (convenient VMS hotkeys)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'p')) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Filter routes based on query
  const getFilteredRoutes = (): SearchRouteOption[] => {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return VMS_SYSTEM_ROUTES;

    return VMS_SYSTEM_ROUTES.filter((route) => {
      const matchLabel = route.pageLabel.toLowerCase().includes(cleanQuery);
      const matchRole = route.roleLabel.toLowerCase().includes(cleanQuery) || route.roleName.toLowerCase().includes(cleanQuery);
      const matchKeyword = route.keywords.some((kw) => kw.toLowerCase().includes(cleanQuery));
      return matchLabel || matchRole || matchKeyword;
    });
  };

  const filteredRoutes = getFilteredRoutes();

  // Handle outside click to hide dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current !== e.target
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set selected suggestion active index within valid ranges as route filter size alters
  useEffect(() => {
    if (activeSuggestionIndex >= filteredRoutes.length) {
      setActiveSuggestionIndex(Math.max(0, filteredRoutes.length - 1));
    }
  }, [filteredRoutes.length, activeSuggestionIndex]);

  // Trigger role and page navigation
  const handleNavigateToRoute = (route: SearchRouteOption) => {
    const targetRoleName = route.roleName; // 'Director' | 'GM' | 'Team' | 'Accounts' | 'Auditor'
    const pageId = route.pageId;

    // Call state dispatcher via window handle in App.tsx
    if (typeof (window as any).__changeActiveRole === 'function') {
      (window as any).__changeActiveRole(targetRoleName);
    }

    // Set page to target, but if react hasn't mounted the role panel we store this in cache
    if (!(window as any).__pendingPageRedirects) {
      (window as any).__pendingPageRedirects = {};
    }
    (window as any).__pendingPageRedirects[targetRoleName] = pageId;

    // Check if the panel was already registered in the active system
    const setter = (window as any).__setPanelPage?.[targetRoleName];
    if (setter) {
      setter(pageId);
    }

    // Clear and blur search input gracefully
    setQuery('');
    setIsOpen(false);
    setActiveSuggestionIndex(0);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (isOpen && filteredRoutes.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIndex((prev) => (prev + 1) % filteredRoutes.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIndex((prev) => (prev - 1 + filteredRoutes.length) % filteredRoutes.length);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNavigateToRoute(filteredRoutes[activeSuggestionIndex]);
        return;
      }
    }
  };

  return (
    <div className="relative w-80 md:w-96 vms-search-exclude flex flex-col items-center">
      <div className="relative w-full flex items-center bg-gray-100 hover:bg-gray-150/75 focus-within:bg-white rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
        <span className="pl-3.5 pr-2.5 text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveSuggestionIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search panel pages (e.g. Approved list, NEFT)..."
          className="w-full text-xs py-2 bg-transparent outline-none border-none text-gray-800 placeholder-gray-400 font-medium font-sans pr-14"
        />

        {/* Clear control */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveSuggestionIndex(0);
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200"
          >
            <span className="text-[10px] font-black uppercase tracking-wider block leading-none px-0.5">Clear</span>
          </button>
        )}

        {!query && (
          <div className="hidden sm:flex absolute right-3 items-center gap-1 bg-gray-200 text-gray-550 font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded leading-none select-none">
            Ctrl+K
          </div>
        )}
      </div>

      {/* Dropdown Options matching exact specifications */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 pb-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-2.5 max-h-80 overflow-y-auto w-full text-left"
        >
          {/* Header instructions label */}
          <div className="px-1.5 py-1 mb-2 border-b border-gray-100 flex items-center justify-between text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {query ? `MATCHING ROUTES (${filteredRoutes.length})` : 'QUICK NAVIGATION MAP'}
            </span>
            <span className="font-mono text-[8.5px] font-bold text-gray-300">
              Navigate: ↑↓ | Enter to jump
            </span>
          </div>

          {filteredRoutes.length > 0 ? (
            <div className="space-y-1">
              {filteredRoutes.map((route, idx) => {
                const isSelected = idx === activeSuggestionIndex;
                const isCurrentRoute = activeRole === route.roleName && currentPage === route.pageId;

                return (
                  <button
                    key={`${route.roleName}-${route.pageId}`}
                    type="button"
                    onClick={() => handleNavigateToRoute(route)}
                    onMouseEnter={() => setActiveSuggestionIndex(idx)}
                    className={`w-full text-left py-2 px-2.5 rounded flex items-center justify-between transition-colors border group relative ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-200 font-semibold'
                        : 'bg-white border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Page label with highlighted keyword matching feel */}
                        <span className={`text-[11.5px] truncate font-bold text-gray-800 ${isSelected ? 'text-blue-900' : ''}`}>
                          {route.pageLabel}
                        </span>

                        {isCurrentRoute && (
                          <span className="text-[8px] bg-emerald-100 text-emerald-850 font-black px-1.5 py-px rounded uppercase tracking-wider select-none">
                            Active Page
                          </span>
                        )}
                      </div>

                      {/* Display Keywords descriptor */}
                      <span className="block text-[9.5px] text-gray-400 font-medium truncate mt-0.5">
                        Tags: {route.keywords.slice(0, 5).join(', ')}
                      </span>
                    </div>

                    {/* Badge for Role indicating scope distinction */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${route.bgClass} ${route.colorClass} ${route.borderClass}`}>
                        {route.roleName}
                      </span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform ${isSelected ? 'bg-blue-600 text-white translate-x-1.5' : 'text-gray-300'}`}>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center">
              <FolderLock className="w-7 h-7 text-gray-350 mx-auto mb-1.5" />
              <p className="text-xs text-gray-500 font-medium font-sans">No role pages found matching "{query}"</p>
              <p className="text-[10px] text-gray-400 mt-1">Try typing main components such as "avl", "payouts", "requisitions", "quality" or role names.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
