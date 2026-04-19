export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 22C12 22 17 18 19 13C21 8 18 4 15 4C13.5 4 12 6 12 6C12 6 10.5 4 9 4C6 4 3 8 5 13C7 18 12 22 12 22Z" fill="currentColor" className="opacity-80" />
      <path d="M12 22C12 22 15 16 15 11C15 7 13 4 12 4C11 4 9 7 9 11C9 16 12 22 12 22Z" fill="white" className="opacity-40" />
      <path d="M12 22C12 22 7 20 4 16C1 12 2 8 5 6C7 4.5 9.5 6 12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 22C12 22 17 20 20 16C23 12 22 8 19 6C17 4.5 14.5 6 12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
