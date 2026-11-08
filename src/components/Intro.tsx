/**
 * Full-screen logo intro on every page load. Pure CSS (see `.intro` in globals.css) so it is
 * in the first paint, needs no JavaScript and always clears itself; skipped for reduced motion.
 */
export default function Intro() {
  return (
    <div aria-hidden className="intro">
      <div className="intro-glow" />
      <div className="intro-content">
        <span className="intro-ring" />
        <span className="intro-ring intro-ring-2" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" width={160} height={102} className="intro-logo" />
      </div>
    </div>
  );
}
