export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase dark:bg-zinc-100 dark:text-black">
            Template Starter
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            A consistent base for Next.js apps with Supabase and Tailwind.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
            Fork this repo, set your app name in{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
              .env.local
            </code>
            , and build your product — this template stays product-agnostic.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
            >
              Open dashboard
            </a>
            <a
              href="https://github.com/kulikman/template-starter"
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
