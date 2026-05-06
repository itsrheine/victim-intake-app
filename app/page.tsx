import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Victim Intake Case Manager
              </h1>

              <p className="mt-2 max-w-3xl text-sm text-slate-600">
                Organize MLM and crypto scam victim reports, evidence,
                blockchain transaction details, and guided complaint steps.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/new"
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90"
              >
                New Intake Form
              </Link>

              <Link
                href="/reports"
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Saved Reports
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Guided Complaint Steps
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Step-by-step reporting guides for official fraud reporting
              websites and agencies.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <GuideCard
              title="FTC Guide"
              description="ReportFraud.ftc.gov walkthrough for investment and crypto scam victims."
              href="/guides/ftc"
              buttonText="Open FTC Guide"
            />

            <GuideCard
              title="BBB Guide"
              description="Step-by-step BBB Scam Tracker reporting instructions."
              href="/guides/bbb"
              buttonText="Open BBB Guide"
            />

            <GuideCard
              title="FBI / IC3 Guide"
              description="Guided IC3 cybercrime complaint walkthrough."
              href="/guides/ic3"
              buttonText="Open IC3 Guide"
            />

            <GuideCard
              title="Philippines Guide"
              description="Reporting help for victims located in the Philippines."
              href="/guides/philippines"
              buttonText="Open PH Guide"
            />

            <GuideCard
              title="Canada Guide"
              description="Reporting help for victims located in Canada."
              href="/guides/canada"
              buttonText="Open Canada Guide"
            />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Use saved report details, screenshots, TXIDs, wallet addresses,
            dates, and timelines while completing complaints.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-semibold text-amber-900">
            Important Disclaimer
          </h2>

          <div className="mt-3 space-y-2 text-sm text-amber-800">
            <p>
              This application is intended for organizational and reporting
              assistance purposes only.
            </p>

            <p>
              This app does not provide legal advice, financial advice,
              investment advice, recovery services, or government services.
            </p>

            <p>
              Users should only submit complaints through official reporting
              websites and agencies.
            </p>

            <ul className="list-disc space-y-1 pl-5">
              <li>Do not share crypto seed phrases</li>
              <li>Do not share passwords or PINs</li>
              <li>Do not share Social Security numbers</li>
              <li>Be cautious of “recovery” services</li>
            </ul>

            <p>
              Users are responsible for protecting their own sensitive
              information.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function GuideCard({
  title,
  description,
  href,
  buttonText,
}: {
  title: string;
  description: string;
  href: string;
  buttonText: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

      <p className="mt-1 text-sm text-slate-600">{description}</p>

      <Link
        href={href}
        className="mt-4 inline-flex rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        {buttonText}
      </Link>
    </div>
  );
}