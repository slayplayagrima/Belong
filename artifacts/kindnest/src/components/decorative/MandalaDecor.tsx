export function MandalaDecor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-10 pointer-events-none ${className}`}>
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-primary" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" className="text-secondary" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="2 6" className="text-primary" />
      <path d="M100 20 C110 50 130 70 180 100 C130 130 110 150 100 180 C90 150 70 130 20 100 C70 70 90 50 100 20 Z" stroke="currentColor" strokeWidth="1.5" className="text-secondary" />
      <path d="M100 40 C105 60 120 75 160 100 C120 125 105 140 100 160 C95 140 80 125 40 100 C80 75 95 60 100 40 Z" fill="currentColor" className="text-primary/20" />
      <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <circle cx="100" cy="100" r="5" fill="currentColor" className="text-secondary" />
    </svg>
  );
}
