"use client";

export default function LoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="chapter-skeleton">
          <div className="skeleton-icon" />
          <div className="skeleton-title" />
          <div className="skeleton-text" />
          <div className="skeleton-text small" />
          <div className="skeleton-progress" />
          <div className="skeleton-button" />
        </div>
      ))}
    </>
  );
}
