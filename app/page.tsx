export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B4AA2] px-6 pb-16 pt-16 font-sans text-white">
      <main className="w-full max-w-2xl">
        <div className="flex flex-col gap-12">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 shadow-[0_10px_26px_rgba(0,0,0,0.45)]">
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
            <h1 className="text-[2.45rem] font-semibold leading-tight tracking-tight">
              Hi there!
            </h1>
            <p className="text-[1.95rem] font-semibold leading-tight tracking-tight">
              What would you like to know?
            </p>
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-white/80">
              Use one of the most common prompts below or ask your own question.
            </p>
          </section>

          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-center">
              <div className="relative flex h-[52px] w-full max-w-[620px] flex-1 items-center rounded-full border border-white/20 bg-[rgba(18,80,170,0.98)] px-5 text-sm text-white/80 shadow-[0_26px_70px_rgba(3,26,77,0.8)]">
                <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-white/75">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      d="M12 3a2.5 2.5 0 0 0-2.5 2.5v5A2.5 2.5 0 0 0 12 13a2.5 2.5 0 0 0 2.5-2.5v-5A2.5 2.5 0 0 0 12 3Zm-4 7.5A4 4 0 0 0 12 14.5a4 4 0 0 0 4-4V9h-1.5v1.5a2.5 2.5 0 0 1-5 0V9H8v1.5Zm3.25 5.13V19h1.5v-3.37A5.5 5.5 0 0 1 18.5 10H17a4 4 0 0 1-8 0H7.5a5.5 5.5 0 0 1 3.75 5.63Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="flex-1 truncate text-[0.96rem] text-[rgba(234,244,255,0.96)]">
                  Ask whatever you want
                </span>
                <button
                  type="button"
                  className="ml-4 flex h-[44px] w-[56px] items-center justify-center rounded-[22px] bg-[rgba(34,97,186,0.98)] text-[rgba(234,244,255,0.98)] shadow-[0_18px_40px_rgba(3,26,77,0.9)]"
                >
                  <span className="text-base font-semibold leading-none">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
