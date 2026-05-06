import Link from "next/link";

export default function BBBGuidePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
        >
          ← Back to Dashboard
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            BBB Scam Tracker Guide
          </h1>

          <p className="mt-3 text-slate-600">
            Follow these steps carefully while the victim’s saved report is open.
            Use the report details to complete the BBB Scam Tracker complaint.
          </p>

          <a
            href="https://www.bbb.org/scamtracker/reportscam"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-white"
          >
            Open BBB Scam Tracker
          </a>

          <div className="mt-8 space-y-5">
            <Step
              number="1"
              title="Open the BBB Scam Tracker website"
              details={[
                "Click the button above.",
                "The BBB Scam Tracker form will open in a new tab.",
              ]}
            />

            <Step
              number="2"
              title="Choose who the scam happened to"
              details={[
                "Select whether the scam happened to yourself or another person.",
                "If helping an elderly victim, make sure their information is entered correctly.",
              ]}
            />

            <Step
              number="3"
              title="Choose the scam type"
              details={[
                "Choose the scam category that best matches the situation.",
                "Examples may include cryptocurrency, investment, online purchase, employment, or phishing scams.",
                "Pick the closest category if an exact match does not exist.",
              ]}
            />

            <Step
              number="4"
              title="Enter company and platform details"
              details={[
                "Use the saved report for the platform name.",
                "Enter the website or app name if known.",
                "Add phone numbers, Telegram names, WhatsApp names, wallet addresses, or recruiter names if available.",
                "Use any screenshots or evidence already saved in the report.",
              ]}
            />

            <Step
              number="5"
              title="Describe what happened"
              details={[
                "Use the victim’s saved timeline.",
                "Explain how the scam started.",
                "Explain how much money was sent.",
                "Include withdrawal problems.",
                "Include any fee/tax demands such as a 12% request.",
                "Explain if the website disappeared or stopped responding.",
              ]}
            />

            <Step
              number="6"
              title="Enter financial information carefully"
              details={[
                "Use the exact deposited amount if possible.",
                "Use transaction hashes (TXIDs) and wallet addresses from the report.",
                "Use approximate dates if exact dates are unknown.",
              ]}
            />

            <Step
              number="7"
              title="Provide contact information"
              details={[
                "Enter the victim’s name and contact information carefully.",
                "Use an email address if they want updates or confirmation.",
                "Double-check spelling before continuing.",
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
        </div>
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
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
          {number}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
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
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
      <h2 className="text-xl font-semibold text-red-800">
        Do not include sensitive private information
      </h2>

      <p className="mt-2 text-sm text-red-700">
        Do not enter Social Security numbers, bank passwords, crypto seed
        phrases, driver’s license numbers, or account passwords into the BBB
        complaint form.
      </p>
    </div>
  );
}