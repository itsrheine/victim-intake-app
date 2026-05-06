import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">
            Victim Intake Case Manager
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Organize individual MLM and crypto scam victim reports, evidence,
            transaction details, and guided complaint steps.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/new"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-center text-white transition hover:opacity-90"
            >
              New Victim Intake Form
            </Link>

            <Link
              href="/reports"
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-center text-slate-900 transition hover:bg-slate-50"
            >
              View Saved Individual Reports
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Guided Complaint Steps
          </h2>

          <p className="mt-2 text-slate-600">
            After completing an individual report, use these guides to help the
            victim file complaints one at a time. These pages are written as
            simple step-by-step instructions.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <GuideCard
              title="FTC Guide"
              description="Step-by-step help for filing a fraud report with ReportFraud.ftc.gov."
              href="/guides/ftc"
              buttonText="Open FTC Guide"
            />

            <GuideCard
              title="BBB Guide"
              description="Step-by-step help for submitting a BBB Scam Tracker report."
              href="/guides/bbb"
              buttonText="Open BBB Guide"
            />

            <GuideCard
              title="FBI / IC3 Guide"
              description="Step-by-step help for submitting a cybercrime complaint to IC3."
              href="/guides/ic3"
              buttonText="Open IC3 Guide"
            />

            <GuideCard
              title="Philippines Reporting Guide"
              description="Step-by-step reporting help for victims located in the Philippines."
              href="/guides/philippines"
              buttonText="Open Philippines Guide"
            />

            <GuideCard
              title="Canada Reporting Guide"
              description="Step-by-step reporting help for victims located in Canada."
              href="/guides/canada"
              buttonText="Open Canada Guide"
            />
          </div>

          <p className="mt-5 text-xs text-slate-500">
            Reminder: Use the saved individual report details, TXIDs, wallet
            addresses, screenshots, dates, fee/tax demands, and timeline when
            filing each complaint.
          </p>
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm text-slate-600">{description}</p>

      <Link
        href={href}
        className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:opacity-90"
      >
        {buttonText}
      </Link>
    </div>
  );
}