export function Gem({ className = "" }: { className?: string }) {
  return (
    <svg className={`gem ${className}`} viewBox="0 0 24 32" aria-hidden="true">
      <path d="M12 .8 20.4 7.4 22.6 13.2 12 31.2 1.4 13.2 3.6 7.4Z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ variant = "lockup" }: { variant?: "lockup" | "stack" | "mark" }) {
  const mark = <img src="/brand/mark.svg" alt="" className="logo-mark" />;
  if (variant === "mark") return <span className="logo logo-mark-only">{mark}</span>;
  return (
    <span className={`logo logo-${variant}`}>
      {mark}
      <span className="logo-words">
        <span className="logo-word">ستر</span>
        <span className="logo-sub">للزي الإسلامي</span>
      </span>
      {variant === "stack" ? <img src="/brand/crystal.svg" alt="" className="logo-crystal" /> : null}
    </span>
  );
}
