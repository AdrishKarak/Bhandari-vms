import React from 'react';
import { LogOut, Menu, UserCheck } from 'lucide-react';
import { Role } from '../types';
import VmsSearchBar from './VmsSearchBar';
import logo from '../public/Bhandari-Automobiles-Logo-300x199.png';

interface SharedShellProps {
  role: Role;
  roleColor: string;
  roleBadgeBg: string;
  roleBadgeText: string;
  sidebarItems: { id: string; label: string; icon: React.ReactNode }[];
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onBack: () => void;
  children: React.ReactNode;
  userName: string;
  userBranch: string;
}

const getBadgeBorder = (badgeBg: string) => {
  if (badgeBg.includes('teal')) return 'border-teal-100';
  if (badgeBg.includes('amber')) return 'border-amber-100';
  if (badgeBg.includes('blue')) return 'border-blue-100';
  if (badgeBg.includes('emerald')) return 'border-emerald-100';
  return 'border-gray-200';
};

export default function SharedShell({
  role,
  roleColor,
  roleBadgeBg,
  roleBadgeText,
  sidebarItems,
  currentPage,
  setCurrentPage,
  onBack,
  children,
  userName,
  userBranch
}: SharedShellProps) {
  const borderClass = getBadgeBorder(roleBadgeBg);

  // Hook up state setter registry for global search bar direct navigation
  React.useEffect(() => {
    if (!(window as any).__setPanelPage) {
      (window as any).__setPanelPage = {};
    }
    
    // Normalize both ways (AuditPanel writes "Audit", dropdown select / options represent "Auditor")
    const normRole = role === 'Audit' ? 'Auditor' : role;
    (window as any).__setPanelPage[role] = setCurrentPage;
    (window as any).__setPanelPage[normRole] = setCurrentPage;

    // Check if there is a pending page direct-redirect queued from search selection
    const pendingPage = (window as any).__pendingPageRedirects?.[role] || (window as any).__pendingPageRedirects?.[normRole];
    if (pendingPage) {
      setCurrentPage(pendingPage);
      if ((window as any).__pendingPageRedirects) {
        delete (window as any).__pendingPageRedirects[role];
        delete (window as any).__pendingPageRedirects[normRole];
      }
    }

    return () => {
      if ((window as any).__setPanelPage) {
        delete (window as any).__setPanelPage[role];
        delete (window as any).__setPanelPage[normRole];
      }
    };
  }, [role, setCurrentPage]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextRole = e.target.value;
    if (nextRole === 'Landing') {
      onBack();
    } else if (typeof (window as any).__changeActiveRole === 'function') {
      (window as any).__changeActiveRole(nextRole);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col selection:bg-teal-100 selection:text-teal-950">
      {/* Topbar with spacious layout & high contrast borders */}
      <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 shadow-xs">
        <div className="flex items-center gap-6">
          {/* Brand Logo - Clickable to return to landing page */}
          <button
            onClick={onBack}
            className="flex items-center gap-3 hover:opacity-85 active:scale-98 transition-all cursor-pointer bg-transparent border-none text-left p-0"
            title="Return to Corporate Landing Page"
          >
            <img
              src={logo}
              alt="Bhandari Automobiles"
              className="h-9 w-auto object-contain bg-white rounded shadow-sm"
            />
            <div>
              <span className="text-sm font-extrabold tracking-tight text-blue-600 uppercase block">
                Bhandari Auto
              </span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">
                VMS Terminal
              </span>
            </div>
          </button>

          {/* Role Dropdown Selector */}
          <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1 rounded border border-gray-200">
            <label htmlFor="role-select" className="text-[10px] uppercase font-mono font-bold text-gray-400 tracking-wider">
              Role:
            </label>
            <select
              id="role-select"
              value={role === 'Audit' ? 'Auditor' : role}
              onChange={handleRoleChange}
              className="text-xs font-bold text-neutral-800 bg-transparent border-none outline-none focus:ring-0 cursor-pointer pr-1 py-0"
            >
              <option value="Director">Director / Master AVL</option>
              <option value="GM">General Manager (GM)</option>
              <option value="Team">Purchase Desk</option>
              <option value="Accounts">Accounts Settlement</option>
              <option value="Auditor">Compliance Auditor</option>
              <option value="Landing">← Logout to Landing</option>
            </select>
          </div>
        </div>

        {/* Global Finder Highlight & Navigation Search Bar */}
        <VmsSearchBar currentPage={currentPage} activeRole={role} />

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs font-extrabold text-neutral-900 leading-tight">{userName}</p>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{role} Panel | {userBranch}</p>
          </div>
          <button
            onClick={onBack}
            className="text-xs text-blue-600 font-semibold hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded px-3 py-1.5 transition-all cursor-pointer border border-blue-200/50"
            id="back-to-roles-btn"
          >
            Main Desk
          </button>
        </div>
      </header>

      {/* Sidebar - fixed */}
      <aside className="w-60 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed left-0 top-16 z-30 flex flex-col shadow-xs">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-450 px-4 pt-6 pb-3">
          Navigation
        </div>
        <nav className="flex-1 space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 h-11 text-xs font-bold uppercase tracking-wider transition-all text-left rounded-r border-l-4 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-blue-650 shadow-xs'
                    : 'text-gray-650 hover:text-gray-900 hover:bg-gray-100/70 border-transparent'
                }`}
                id={`nav-${item.id}`}
              >
                <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-gray-200 px-5 py-4 bg-gray-50 mt-auto">
          <div className="text-[10px] font-mono text-gray-400 font-semibold tracking-tight uppercase">
            v1.2 — B-Automobiles
          </div>
        </div>
      </aside>

      {/* Main Content Area - upgraded with h-[calc(100vh-4rem)] and top-16 to preserve correct spacing */}
      <main className="ml-60 pt-16 flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="p-10 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}
