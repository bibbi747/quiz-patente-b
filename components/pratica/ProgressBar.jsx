"use client";

export default function ProgressBar({
  value = 0,
  color = "#2563eb",
}) {
  return (
    <div className="progress">
      <div
        className="progress-fill"
        style={{
          width: `${value}%`,
          background: color,
        }}
      />
    </div>
  );
}