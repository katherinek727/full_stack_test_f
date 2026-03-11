export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-[#0B4AA2] via-[#084196] to-[#02285C] px-6 pb-16 pt-24 font-sans text-white">
      <main className="w-full max-w-2xl">
        <div className="flex flex-col gap-12">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 shadow-[0_14px_35px_rgba(0,0,0,0.45)]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 text-white/90"
            >
              <path
                d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H13l-3.5 3.5A1 1 0 0 1 8 18v-3H6.5A2.5 2.5 0 0 1 4 12.5v-7Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <section className="space-y-3">
            <h1 className="text-[2.65rem] font-semibold leading-tight tracking-tight">
              Hi there!
            </h1>
            <p className="text-[2.05rem] font-semibold leading-tight tracking-tight">
              What would you like to know?
            </p>
            <p className="max-w-xl text-[0.97rem] leading-relaxed text-white/75">
              Use one of the most common prompts below or ask your own question
              .
            </p>
          </section>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex h-[56px] w-full max-w-[720px] flex-1 items-center rounded-full border border-white/25 bg-[rgba(27,97,190,0.92)] px-7 text-sm text-white/80 shadow-[0_26px_80px_rgba(3,26,77,0.9)]">
                <button
                  type="button"
                  className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,255,255,0.55)] bg-[rgba(23,86,175,0.9)] text-xs text-white/80"
                >
                  <span className="text-[0.5rem] leading-none">●</span>
                </button>
                <span className="flex-1 truncate text-[0.96rem] text-[rgba(234,244,255,0.96)]">
                  Ask whatever you want
                </span>
              </div>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-[#0B4AA2] shadow-[0_24px_60px_rgba(3,26,77,0.9)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_30px_72px_rgba(3,26,77,0.95)]"
              >
                <span className="text-lg font-semibold leading-none">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
