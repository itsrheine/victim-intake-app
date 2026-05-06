import Link from "next/link";

export default function BBBGuidePage() {
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
              BBB Scam Tracker Guide
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Use this guide while the victim’s saved report is open. Follow
              each step slowly and copy details from the report when needed.
            </p>

            <a
              href="https://www.bbb.org/scamtracker/reportscam"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Open BBB Scam Tracker
            </a>
          </div>

          <div className="mt-6 space-y-4">
            <Step
              number="1"
              title="Open the BBB Scam Tracker website"
              details={[
                "Click the button above.",
                "The BBB Scam Tracker form will open in a new browser tab.",
                "Keep the victim’s saved report open so you can copy details.",
              ]}
            />

            <Step
              number="2"
              title="Choose who the scam happened to"
              details={[
                "Select whether the scam happened to yourself or another person.",
                "If helping an elderly victim, enter their information carefully.",
                "Double-check spelling before continuing.",
              ]}
            />

            <Step
              number="3"
              title="Choose the scam type"
              details={[
                "Choose the category that best matches the situation.",
                "For crypto or investment-related scams, choose the closest available investment, cryptocurrency, online purchase, employment, or phishing category.",
                "If there is no exact option, choose the closest match and explain the details later in the description.",
              ]}
            />

            <Step
              number="4"
              title="Enter company and platform details"
              details={[
                "Use the saved report for the platform or company name.",
                "Enter the website, app name, or business name if known.",
                "Add recruiter names, phone numbers, Telegram names, WhatsApp names, email addresses, or wallet addresses if available.",
                "Use screenshots and evidence files from the report to confirm details.",
              ]}
            />

            <Step
              number="5"
              title="Describe what happened"
              details={[
                "Use the victim’s saved timeline.",
                "Explain how the scam started.",
                "Include how much money was deposited.",
                "Mention withdrawal problems.",
                "Mention any fee or tax demands, including a 12% request if applicable.",
                "Mention if the website disappeared, blocked access, or stopped responding.",
              ]}
            />

            <Step
              number="6"
              title="Enter financial information carefully"
              details={[
                "Use the exact deposited amount if possible.",
                "Use transaction hashes (TXIDs) and wallet addresses from the report.",
                "Use the most accurate dates available.",
                "If an exact date is unknown, use an approximate date and explain that it is approximate.",
              ]}
            />

            <Step
              number="7"
              title="Provide contact information"
              details={[
                "Enter the victim’s name and contact details carefully.",
                "Use an email address if the victim wants confirmation or follow-up.",
                "Review the information before submitting.",
              ]}
            />

            <WarningBox />

            <Step
              number="8"
              title="Submit and save confirmation"
              details={[
                "Review the complaint before submitting.",
                "Submit the BBB Scam Tracker complaint.",
                "Save or screenshot the confirmation page if one appears.",
                "Return to the victim’s report and mark BBB as completed.",
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
        Do not enter Social Security numbers, bank passwords, crypto seed
        phrases, driver’s license numbers, PINs, or account passwords into the
        BBB complaint form.
      </p>
    </div>
  );
}