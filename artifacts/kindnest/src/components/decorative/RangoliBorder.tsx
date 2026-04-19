export function RangoliBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden flex justify-center py-4 opacity-70 ${className}`}>
      <svg width="100%" height="24" preserveAspectRatio="none" viewBox="0 0 400 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: "100%" }}>
        <defs>
          <pattern id="rangoli-pat" x="0" y="0" width="40" height="24" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="12" r="3" fill="hsl(28 95% 58%)" />
            <path d="M12 12C12 12 16 4 20 4C24 4 28 12 28 12C28 12 24 20 20 20C16 20 12 12 12 12Z" stroke="hsl(44 90% 60%)" strokeWidth="1.5" />
            <circle cx="4" cy="12" r="1.5" fill="hsl(28 95% 58% / 0.4)" />
            <circle cx="36" cy="12" r="1.5" fill="hsl(28 95% 58% / 0.4)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="400" height="24" fill="url(#rangoli-pat)" />
      </svg>
    </div>
  );
}
