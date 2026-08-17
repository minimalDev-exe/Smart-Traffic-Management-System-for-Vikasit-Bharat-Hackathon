import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Menu, X, Activity, ShieldCheck, Award, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="w-full max-w-6xl mx-auto px-4 pt-6 pb-2">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-amber-900/10 px-6 py-4 flex items-center justify-between transition-all">
        {/* Left: Event & Brand Logo */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-[#1A2B4C]">
                MANTHAN <span className="text-orange-600">4 YUVA</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                Official Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              National Smart City Innovation Hackathon
            </p>
          </div>
        </div>

        {/* Center: Quick Portal Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            to="/register"
            className="text-orange-600 font-semibold border-b-2 border-orange-500 pb-0.5"
          >
            Team Registration
          </Link>
          <Link
            to="/command-center"
            className="hover:text-orange-600 transition-colors flex items-center gap-1.5"
          >
            <Activity className="w-4 h-4 text-slate-400" />
            Command Center
          </Link>
          <a
            href="#guidelines"
            onClick={(e) => {
              e.preventDefault();
              alert('Manthan 4 Yuva Rules: 2-5 members per team, 24-hour simulation evaluation.');
            }}
            className="hover:text-orange-600 transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            Evaluation Rules
          </a>
        </div>

        {/* Right: Actions / Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/command-center"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-[#1A2B4C] text-white hover:bg-slate-800 transition-all shadow-sm shadow-slate-900/10"
          >
            <span>Live Workspace</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors md:hidden"
            aria-label="Toggle Menu"
          >
            {drawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="md:hidden mt-2 bg-white rounded-2xl p-5 shadow-lg border border-amber-900/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-2">
            <Link
              to="/register"
              onClick={() => setDrawerOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold bg-orange-50 text-orange-700"
            >
              Team Registration Flow
            </Link>
            <Link
              to="/command-center"
              onClick={() => setDrawerOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Traffic Simulation Command Center
            </Link>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Event ID: M4Y-2024-NAT</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <Award className="w-3.5 h-3.5" /> Portal Active
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};
