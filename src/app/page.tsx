export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-zinc-100 dark:text-black">
            2SkyMobile CRM
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Unified workspace for clients, deals, and operational workflows.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Manage partner pipelines, internal tasks, and account data from one
            place. This project is the main CRM foundation for the
            2SkyMobile team.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
            >
              Open dashboard
            </a>
            <a
              href="https://github.com/kulikman/2Skymobile-CRM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Repository
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
