export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A4A97] px-6 pb-16 pt-16 font-sans text-white">
      <main className="w-full max-w-2xl text-[rgba(234,242,252,0.98)]">
        <div className="flex flex-col gap-12">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(27,92,186,0.98)] shadow-[0_14px_40px_rgba(0,0,0,0.65)]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5 text-[rgba(234,242,252,0.98)]"
            >
              <path
                d="M7 5.5A2.5 2.5 0 0 1 9.5 3h5A2.5 2.5 0 0 1 17 5.5v4A2.5 2.5 0 0 1 14.5 12H12l-1.8 1.8A0.85 0.85 0 0 1 9.5 13.6V12H9.5A2.5 2.5 0 0 1 7 9.5v-4Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <section className="space-y-3 text-[rgba(234,242,252,0.98)]">
            <h1 className="text-[2.45rem] font-semibold leading-tight tracking-tight">
              Hi there!
            </h1>
            <p className="text-[1.95rem] font-semibold leading-tight tracking-tight">
              What would you like to know?
            </p>
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-[rgba(202,218,243,0.96)]">
              Use one of the most common prompts below or ask your own question.
            </p>
          </section>

          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-center">
              <div className="relative flex h-11 w-full max-w-[560px] flex-1 items-center rounded-full border border-[rgba(157,189,232,0.75)] bg-[rgba(6,55,126,0.45)] px-4 text-sm text-[rgba(213,227,245,0.95)] shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
                <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(157,189,232,0.8)] bg-transparent text-[rgba(213,227,245,0.95)]">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      d="M12 3a2.5 2.5 0 0 0-2.5 2.5v5A2.5 2.5 0 0 0 12 13a2.5 2.5 0 0 0 2.5-2.5v-5A2.5 2.5 0 0 0 12 3Zm-4 7.5A4 4 0 0 0 12 14.5a4 4 0 0 0 4-4V9h-1.5v1.5a2.5 2.5 0 0 1-5 0V9H8v1.5Zm3.25 5.13V19h1.5v-3.37A5.5 5.5 0 0 1 18.5 10H17a4 4 0 0 1-8 0H7.5a5.5 5.5 0 0 1 3.75 5.63Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="flex-1 truncate text-[0.9rem] text-[rgba(210,225,245,0.96)]">
                  Ask whatever you want
                </span>
                <button
                  type="button"
                  className="ml-3 flex h-9 w-11 items-center justify-center rounded-[18px] bg-[rgba(24,84,172,0.98)] text-[rgba(226,237,252,0.98)] shadow-[0_16px_32px_rgba(0,0,0,0.65)]"
                >
                  <span className="text-sm font-semibold leading-none">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
