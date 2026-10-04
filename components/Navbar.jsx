export default function Navbar() {
  return (
    <header className="border-b border-[#eadfda] bg-[#fffdf9]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f06459] text-xl shadow-[0_5px_0_#d94d49]" aria-hidden="true">🎂</div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-tight text-[#27233b] sm:text-xl">Birthday wishes</h1>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8d83ce]">Textbee gateway</p>
          </div>
        </div>
        <span className="hidden rounded-full bg-[#e5f4ea] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#327052] sm:inline">SMS ready</span>
      </div>
    </header>
  );
}
