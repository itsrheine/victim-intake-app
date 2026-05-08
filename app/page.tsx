import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div>
            <div className="p-7 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Internal Case Coordination System
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
                BGWS 2025 Victim Support Portal
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
                Internal intake and organization system for BGWS 2025 members
                documenting blockchain transaction hashes, deposit history,
                withdrawal problems, evidence files, and complaint progress for
                official reporting purposes.
              </p>

              <div className="mt-5 inline-flex rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                Private Internal Use Only • Team BGWS 2025
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/new"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
                >
                  Start New Intake Report
                </Link>

                <Link
                  href="/reports"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  View Saved Reports
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Guided Complaint Steps
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Step-by-step walkthroughs for official fraud reporting websites
              and agencies.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <GuideCard
              title="FTC Guide"
              description="Guided walkthrough for ReportFraud.ftc.gov submissions."
              href="/guides/ftc"
              buttonText="Open FTC Guide"
            />

            <GuideCard
              title="BBB Guide"
              description="Step-by-step BBB Scam Tracker reporting guide."
              href="/guides/bbb"
              buttonText="Open BBB Guide"
            />

            <GuideCard
              title="FBI / IC3 Guide"
              description="Guided IC3 cybercrime complaint instructions."
              href="/guides/ic3"
              buttonText="Open IC3 Guide"
            />

            <GuideCard
              title="Philippines Guide"
              description="Reporting assistance for members located in the Philippines."
              href="/guides/philippines"
              buttonText="Open PH Guide"
            />

            <GuideCard
              title="Canada Guide"
              description="Reporting assistance for members located in Canada."
              href="/guides/canada"
              buttonText="Open Canada Guide"
            />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Use saved report details, screenshots, wallet addresses, dates,
            timelines, and evidence files while completing complaints.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-semibold text-amber-900">
            Important Privacy & Safety Reminder
          </h2>

          <div className="mt-3 space-y-2 text-sm leading-6 text-amber-800">
            <p>
              This portal is intended for internal organizational and reporting
              assistance purposes only.
            </p>

            <p>
              This portal does not provide legal advice, financial advice,
              investment advice, recovery services, or government services.
            </p>

            <ul className="list-disc space-y-1 pl-5">
              <li>Do not share crypto seed phrases or private keys</li>
              <li>Do not share passwords or PINs</li>
              <li>Do not share Social Security numbers</li>
              <li>Do not share bank login information</li>
              <li>Be cautious of anyone promising guaranteed recovery</li>
            </ul>

            <p>
              Members are responsible for protecting their own sensitive
              information.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
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