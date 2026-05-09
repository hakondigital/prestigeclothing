import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full bg-ink text-bone overflow-hidden flex items-center justify-center">
      <h1
        aria-label="Prestigé"
        className="display tracking-tightest leading-[0.85] text-bone select-none"
        style={{ fontSize: 'clamp(120px, 26vw, 520px)' }}
      >
        PRESTIGÉ
      </h1>

      <div className="absolute bottom-10 left-0 right-0 px-6 md:px-10 flex items-center justify-between eyebrow tabular text-bone/80">
        <span>404 — Off the Grid</span>
        <Link href="/" className="group inline-flex items-center gap-2 hover:text-bone">
          <span aria-hidden>←</span>
          <span className="relative">
            Return
            <span aria-hidden className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-[width] duration-500 ease-out-expo group-hover:w-full" />
          </span>
        </Link>
      </div>
    </main>
  );
}
