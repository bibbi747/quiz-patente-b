"use client";

export default function PracticeLayout({ children, sidebar }) {
  return (
    <section className="practice-layout" id="capitoli">
      <div className="practice-content">{children}</div>
      <aside className="practice-aside">{sidebar}</aside>
    </section>
  );
}
