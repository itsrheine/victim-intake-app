import Link from "next/link";

export default function FTCGuidePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          ← Back to Home
        </Link>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-bold text-slate-900">
              FTC Reporting Guide
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Use this guide while the victim’s saved report is open. Follow
              each step slowly and use the saved TXIDs, screenshots, wallet
              addresses, and timeline while filing the complaint.
            </p>

            <a
              href="https://reportfraud.ftc.gov/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Open ReportFraud.ftc.gov
            </a>
          </div>

          <div className="mt-6 space-y-4">
            <Step
              number="1"
              title="Open the FTC reporting website"
              details={[
                "Click the button above to open ReportFraud.ftc.gov.",
                "Keep the victim’s saved report open in another tab or window.",
                "You will copy information from the saved report into the FTC form.",
              ]}
            />

            <Step
              number="2"
              title="Start the report"
              details={[
                "Click “Report Now.”",
                "When asked about the type of problem, choose:",
                "Job, Investment, Money-Making Opportunity, or Franchise",
                "Then choose:",
                "Investment / Investment Seminar",
              ]}
            />

            <Step
              number="3"
              title="Enter payment information"
              details={[
                "Answer “Yes” if the victim sent money.",
                "Use the exact amount deposited if available.",
                "Use TXIDs and wallet addresses from the saved report.",
                "Use the most accurate payment dates available.",
                "If exact dates are unknown, use approximate dates and explain that they are approximate.",
              ]}
            />

            <Step
              number="4"
              title="Explain how the scam started"
              details={[
                "Explain how the victim first encountered the platform.",
                "Examples may include:",
                "Telegram groups",
                "WhatsApp messages",
                "Facebook messages",
                "Investment seminars",
                "Friends or recruiters",
                "Social media advertisements",
                "Use the victim’s timeline for accurate details.",
              ]}
            />

            <Step
              number="5"
              title="Enter company and recruiter information"
              details={[
                "Enter the company or platform name if known.",
                "Enter recruiter names, phone numbers, Telegram names, email addresses, or websites if available.",
                "Include wallet addresses or crypto platform names if relevant.",
                "Use screenshots and saved evidence files to confirm details.",
              ]}
            />

            <Step
              number="6"
              title="Describe what happened"
              details={[
                "Use the victim’s saved timeline of events.",
                "Explain how much money was deposited.",
                "Explain withdrawal problems or blocked withdrawals.",
                "Mention fee or tax demands, including any 12% request.",
                "Explain if the website disappeared, stopped responding, or blocked access.",
                "Include details calmly and clearly.",
              ]}
            />

            <Step
              number="7"
              title="Enter victim information"
              details={[
                "Enter the victim’s contact information carefully.",
                "Use an email address if the victim wants a confirmation email from the FTC.",
                "Double-check spelling and phone numbers before continuing.",
              ]}
            />

            <WarningBox />

            <Step
              number="8"
              title="Submit and save confirmation"
              details={[
                "Review the complaint carefully before submitting.",
                "Submit the FTC report.",
                "Save or screenshot the confirmation page if one appears.",
                "Return to the victim’s report and mark FTC as completed.",
              ]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function Step({
  number,
  title,
  details,
}: {
  number: string;
  title: string;
  details: string[];
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {number}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WarningBox() {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <h2 className="text-lg font-semibold text-red-800">
        Do not include sensitive private information
      </h2>

      <p className="mt-2 text-sm text-red-700">
        Do not include Social Security numbers, crypto seed phrases, bank
        passwords, PINs, or account passwords when filing FTC complaints.
      </p>
    </div>
  );
}