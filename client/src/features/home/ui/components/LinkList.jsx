import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Plus } from 'lucide-react';
 

const FONT_DISPLAY = "'Caveat', cursive";
const FONT_BODY = "'Work Sans', sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";
 
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
 
const Postmark = ({ clicks }) => {
  const ticks = Array.from({ length: 24 });
  return (
    <div className="relative w-16 h-16 shrink-0 rotate-[-8deg]">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <circle cx="32" cy="32" r="29" fill="none" stroke="#E1573F" strokeWidth="1.5" opacity="0.85" />
        <circle cx="32" cy="32" r="24" fill="none" stroke="#E1573F" strokeWidth="1" opacity="0.55" />
        {ticks.map((_, i) => {
          const angle = (i / ticks.length) * 2 * Math.PI;
          const x1 = 32 + 26 * Math.cos(angle);
          const y1 = 32 + 26 * Math.sin(angle);
          const x2 = 32 + 29 * Math.cos(angle);
          const y2 = 32 + 29 * Math.sin(angle);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E1573F" strokeWidth="1" opacity="0.6" />
          );
        })}
        <line x1="10" y1="22" x2="54" y2="42" stroke="#E1573F" strokeWidth="1" opacity="0.5" />
        <line x1="10" y1="42" x2="54" y2="22" stroke="#E1573F" strokeWidth="1" opacity="0.5" />
      </svg>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ color: '#E1573F' }}
      >
        <span className="text-lg font-semibold leading-none" style={{ fontFamily: FONT_MONO }}>
          {clicks}
        </span>
        <span className="text-[8px] uppercase tracking-widest leading-none mt-0.5">
          clicks
        </span>
      </div>
    </div>
  );
};
 
const Postcard = ({ link, index , onOpen }) => {
  const [copied, setCopied] = useState(false);
  const tilt = index % 2 === 0 ? '-rotate-1' : 'rotate-1';
 
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
    }
  };
 
  return (
    <div
      className={`group relative bg-[#FFFDF8] border-2 border-dashed border-[#8FA396]/50 rounded-sm p-5 pr-4 shadow-[3px_3px_0_rgba(31,58,46,0.08)] transition-all duration-200 ${tilt} hover:rotate-0 hover:-translate-y-1 hover:shadow-[5px_6px_0_rgba(31,58,46,0.12)]`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className="text-[11px] uppercase tracking-wider mb-1"
            style={{ fontFamily: FONT_BODY, color: '#8FA396' }}
          >
            sent {formatDate(link.createdAt)}
          </p>
          <h3
            className="text-3xl leading-tight mb-2 truncate"
            style={{ fontFamily: FONT_DISPLAY, color: '#1F3A2E' }}
          >
            {link.title}
          </h3>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm truncate block hover:underline"
            style={{ fontFamily: FONT_MONO, color: '#3E6B58' }}
          >
            {link.url.replace(/^https?:\/\//, '')}
          </a>
        </div>
        <Postmark clicks={link.clicks} />
      </div>
 
      <div className="flex gap-2 mt-4" style={{ fontFamily: FONT_BODY }}>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-[#1F3A2E]/15 text-[#1F3A2E] hover:bg-[#1F3A2E]/5 transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <a
          onClick={() => {
            onOpen(link._id)
            console.log(link)
          }
          }
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-[#1F3A2E]/15 text-[#1F3A2E] hover:bg-[#1F3A2E]/5 transition-colors"
        >
          <ExternalLink size={13} />
          Open
        </a>
      </div>
    </div>
  );
};
 
const EmptyState = ({ onCreate }) => (
  <div
    className="col-span-full flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-[#8FA396]/40 rounded-sm"
    style={{ fontFamily: FONT_BODY }}
  >
    <p className="text-4xl mb-2" style={{ fontFamily: FONT_DISPLAY, color: '#1F3A2E' }}>
      Nothing sent yet
    </p>
    <p className="text-sm mb-5" style={{ color: '#8FA396' }}>
      Shorten your first link and watch the clicks come in.
    </p>
    {onCreate && (
      <button
        onClick={onCreate}
        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-[#1F3A2E] text-[#F1F6F0] hover:opacity-90 transition-opacity"
      >
        <Plus size={15} />
        Create a link
      </button>
    )}
  </div>
);
 
const LoadingState = () => (
  <>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="h-40 rounded-sm border-2 border-dashed border-[#8FA396]/30 bg-[#FFFDF8]/60 animate-pulse"
      />
    ))}
  </>
);
 
const LinkList = ({ links = [], loading = false, onCreate , onLinkClick }) => {
  return (
    <div className="bg-[#F1F6F0] px-6 py-10 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1
              className="text-5xl mb-1"
              style={{ fontFamily: FONT_DISPLAY, color: '#1F3A2E' }}
            >
              Your links
            </h1>
            <p className="text-sm" style={{ fontFamily: FONT_BODY, color: '#8FA396' }}>
              {loading ? 'Fetching…' : `${links.length} sent so far`}
            </p>
          </div>
          {onCreate && !loading && links.length > 0 && (
            <button
              onClick={onCreate}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-[#1F3A2E] text-[#F1F6F0] hover:opacity-90 transition-opacity"
              style={{ fontFamily: FONT_BODY }}
            >
              <Plus size={15} />
              New link
            </button>
          )}
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <LoadingState />
          ) : links.length === 0 ? (
            <EmptyState onCreate={onCreate} />
          ) : (
            links.map((link, i) => <Postcard key={link._id} link={link} index={i} onOpen={onLinkClick} />)
          )}
        </div>
      </div>
    </div>
  );
};
 
export default LinkList;