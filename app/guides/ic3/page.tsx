import Link from "next/link";

export default function IC3GuidePage() {
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
            FBI / IC3 Complaint Guide
          </h1>

          <p className="mt-3 text-slate-600">
            Follow these steps slowly while the victim’s saved report is open.
            Use the saved report information to complete the IC3 cybercrime
            complaint.
          </p>

          <a
            href="https://complaint.ic3.gov/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-white"
          >
            Open IC3 Complaint Website
          </a>

          <div className="mt-8 space-y-5">
            <Step
              number="1"
              title="Open the IC3 website"
              details={[
                "Click the button above.",
                "Read the notice page carefully.",
                "Continue to the complaint form.",
              ]}
            />

            <Step
              number="2"
              title="Enter victim information"
              details={[
                "Enter the victim’s name carefully.",
                "Enter their address, phone number, and email.",
                "Double-check spelling before continuing.",
                "Use an email address if they want updates from IC3.",
              ]}
            />

            <Step
              number="3"
              title="Enter financial transaction details"
              details={[
                "Use the exact deposited amount if possible.",
                "Use the dates from the saved report.",
                "Use TXIDs and blockchain transaction hashes from the report.",
                "Use wallet addresses connected to the scam.",
              ]}
            />

            <Step
              number="4"
              title="Enter company and suspect information"
              details={[
                "Enter the platform or company name.",
                "Enter recruiter or upline names if known.",
                "Enter websites, apps, Telegram groups, WhatsApp numbers, or phone numbers if available.",
                "Use information from screenshots and evidence files.",
              ]}
            />

            <Step
              number="5"
              title="Describe how the scam started"
              details={[
                "Explain how the victim was first contacted.",
                "Examples may include Telegram, WhatsApp, Facebook, friend referral, investment group, or advertisement.",
                "Use the timeline section from the saved report.",
              ]}
            />

            <Step
              number="6"
              title="Describe the scam in detail"
              details={[
                "Explain what promises were made.",
                "Explain how deposits were sent.",
                "Describe withdrawal problems.",
                "Describe any fee/tax requests including 12% demands.",
                "Describe disappearing website or app behavior.",
                "Describe pressure tactics or instructions given by the scammers.",
              ]}
            />

            <Step
              number="7"
              title="Attach or reference evidence"
              details={[
                "Use screenshots, PDFs, TXIDs, wallet addresses, and chat messages from the saved report.",
                "Reference uploaded evidence files if needed.",
                "Use exact details whenever possible.",
              ]}
            />

            <WarningBox />

            <Step
              number="8"
              title="Review and submit"
              details={[
                "Review the complaint carefully before submitting.",
                "Submit the IC3 complaint.",
                "Save or screenshot the confirmation page if one appears.",
                "Return to the victim’s report and mark FBI / IC3 as completed.",
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
        Do not include Social Security numbers, crypto seed phrases, bank
        passwords, driver’s license numbers, or account passwords in the IC3
        complaint form.
      </p>
    </div>
  );
}