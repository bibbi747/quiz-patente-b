"use client";

import { useState } from "react";

export default function ImageWithFallback({ src, alt, fallback, className }) {
  const [failed, setFailed] = useState(false);

  if (failed) return fallback;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
