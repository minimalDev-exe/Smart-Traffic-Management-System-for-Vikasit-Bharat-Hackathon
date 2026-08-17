import React from 'react';
import { ArrowLeft, Mail, Phone, FileText, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SupportPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] font-display flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={() => navigate('/command-center')}
            className="p-2 hover:bg-[var(--color-paper-2)] rounded-[4px] transition-colors border border-[var(--border)]"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--color-ink)]" />
          </button>
          <h1 className="text-4xl font-bold font-display tracking-tight">Help & Support</h1>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <section className="p-8 bg-[var(--color-paper-2)] rounded-[8px] border border-[var(--border)] space-y-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 border-b border-[var(--border)] pb-2">Direct Contact</h2>
            
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[var(--color-petrol)] shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[15px]">Email Support</h3>
                <p className="text-[14px] text-[var(--color-muted)] font-mono mt-1">support@sadaksense.ai</p>
                <p className="text-[13px] text-[var(--color-muted)] mt-1">Response time: &lt; 2 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[var(--color-rust)] shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[15px]">Emergency Hotline</h3>
                <p className="text-[14px] text-[var(--color-muted)] font-mono mt-1">1-800-SADAKSENSE</p>
                <p className="text-[13px] text-[var(--color-muted)] mt-1">24/7 Priority line for critical system failures</p>
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section className="p-8 bg-[var(--color-paper-2)] rounded-[8px] border border-[var(--border)] space-y-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 border-b border-[var(--border)] pb-2">Resources</h2>
            
            <a href="#" className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-[var(--color-paper)] border border-[var(--border)] rounded-[4px] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-petrol)] group-hover:text-[var(--color-paper)] transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[15px]">Documentation</h3>
                <p className="text-[13px] text-[var(--color-muted)]">Read the technical integration guides</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[var(--color-muted)]" />
            </a>

            <a href="#" className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-[var(--color-paper)] border border-[var(--border)] rounded-[4px] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-petrol)] group-hover:text-[var(--color-paper)] transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[15px]">API Reference</h3>
                <p className="text-[13px] text-[var(--color-muted)]">Endpoints for the Traffic Sync API</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[var(--color-muted)]" />
            </a>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-[13px] text-[var(--color-muted)] font-mono">
          SadakSense System v2.1.4 • Datacenter: Mumbai (AP-South-1)
        </div>
      </div>
    </div>
  );
};
