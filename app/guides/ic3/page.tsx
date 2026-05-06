import Link from "next/link";

export default function IC3GuidePage() {
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
              FBI / IC3 Reporting Guide
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Use this guide while the victim’s saved report is open. Use the
              saved TXIDs, screenshots, wallet addresses, dates, and timeline
              while filing the cybercrime complaint.
            </p>

            <a
              href="https://www.ic3.gov/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Open IC3 Website
            </a>
          </div>

          <div className="mt-6 space-y-4">
            <Step
              number="1"
              title="Open the IC3 website"
              details={[
                "Click the button above to open the FBI Internet Crime Complaint Center website.",
                "Keep the victim’s saved report open in another tab or window.",
                "You will copy details from the saved report into the IC3 form.",
              ]}
            />

            <Step
              number="2"
              title="Start a new complaint"
              details={[
                "Click “File A Complaint.”",
                "Read the information page carefully.",
                "Continue to the complaint form.",
                "The form may take time to complete, so move slowly and carefully.",
              ]}
            />

            <Step
              number="3"
              title="Enter victim information"
              details={[
                "Enter the victim’s full name carefully.",
                "Enter contact information accurately.",
                "Double-check phone numbers and email addresses.",
                "Use an email address the victim can access if they want updates.",
              ]}
            />

            <Step
              number="4"
              title="Enter financial transaction information"
              details={[
                "Use TXIDs and wallet addresses from the saved report.",
                "Use the total deposited amount if known.",
                "Use accurate dates whenever possible.",
                "If exact dates are unknown, provide approximate dates and explain they are approximate.",
                "Include exchange platforms, crypto apps, or wallet providers if relevant.",
              ]}
            />

            <Step
              number="5"
              title="Describe how the scam started"
              details={[
                "Explain how the victim first encountered the platform or recruiter.",
                "Examples may include Telegram groups, WhatsApp messages, social media, investment seminars, or online advertisements.",
                "Use the saved timeline of events to keep details accurate.",
              ]}
            />

            <Step
              number="6"
              title="Describe what happened"
              details={[
                "Explain how much money was deposited.",
                "Describe withdrawal problems or blocked withdrawals.",
                "Describe fee or tax demands, including any 12% request if applicable.",
                "Explain if the website disappeared, stopped responding, or blocked access.",
                "Include recruiter names, websites, emails, phone numbers, or usernames if known.",
                "Use calm and clear wording.",
              ]}
            />

            <Step
              number="7"
              title="Review all entered information"
              details={[
                "Review the complaint carefully before submitting.",
                "Double-check wallet addresses, TXIDs, dates, and contact information.",
                "Make sure the complaint description is understandable and complete.",
              ]}
            />

            <WarningBox />

            <Step
              number="8"
              title="Submit and save confirmation"
              details={[
                "Submit the IC3 complaint.",
                "Save or screenshot the IC3 confirmation page or reference number.",
                "Return to the victim’s report and mark FBI / IC3 as completed.",
                "Save the confirmation number inside the report notes if desired.",
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
        Do not include Social Security numbers, bank passwords, crypto seed
        phrases, PINs, or account passwords when filing IC3 complaints.
      </p>
    </div>
  );
}