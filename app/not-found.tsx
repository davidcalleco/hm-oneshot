import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center">
      <div className="shell">
        <p className="type-label text-faint">
          <span className="text-signal">404</span> &nbsp;/&nbsp; Not found
        </p>
        <h1 className="type-display mt-8 max-w-[14ch]">
          This page does not <span className="type-serif text-signal">exist</span>.
        </h1>
        <p className="type-lede mt-8 max-w-[44ch]">
          The link is broken or the page has moved. Everything Hello Machine
          publishes lives on the homepage.
        </p>
        <Link
          href="/"
          className="type-label mt-10 inline-block rounded-full bg-ink px-6 py-4 text-white transition-colors duration-300 hover:bg-signal"
        >
          Back to the studio
        </Link>
      </div>
    </main>
  );
}
