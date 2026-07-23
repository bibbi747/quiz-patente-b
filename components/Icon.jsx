const paths = {
  road: (
    <>
      <path d="M8 20 L10 4 H14 L16 20" />
      <path d="M12 4 V8" />
      <path d="M12 12 V15" />
      <path d="M12 18 V20" />
    </>
  ),
  car: (
    <>
      <path d="M4 16 L5.5 10.5 Q6.2 8 9 8 H15 Q17.8 8 18.5 10.5 L20 16" />
      <rect x="3" y="16" width="18" height="4" rx="1.5" />
      <circle cx="7.5" cy="20" r="1.6" />
      <circle cx="16.5" cy="20" r="1.6" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3 L22 20 H2 Z" />
      <path d="M12 10 V14" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M6 6 L18 18" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 15 a8 8 0 0 1 16 0" />
      <path d="M12 15 L16 10" />
      <circle cx="12" cy="15" r="1.3" />
    </>
  ),
  check: <path d="M4 12 L9 17 L20 6" />,
  book: (
    <>
      <path d="M4 5 Q8 3 12 5 V19 Q8 17 4 19 Z" />
      <path d="M20 5 Q16 3 12 5 V19 Q16 17 20 19 Z" />
    </>
  ),
};

export default function Icon({ name, size = 18, color = "currentColor" }) {
  const p = paths[name] || paths.road;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p}
    </svg>
  );
}
