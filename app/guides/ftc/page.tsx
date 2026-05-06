import Link from "next/link";

export default function FTCGuidePage() {
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
            FTC Report Guide
          </h1>

          <p className="mt-3 text-slate-600">
            Follow these steps slowly while the victim’s saved report is open.
            Use the report details to complete the FTC form.
          </p>

          <a
            href="https://reportfraud.ftc.gov/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-white"
          >
            Open ReportFraud.ftc.gov
          </a>

          <div className="mt-8 space-y-5">
            <Step
              number="1"
              title="Open the FTC website"
              details={[
                "Click the button above.",
                "When the FTC page opens, click “Report Now.”",
              ]}
            />

            <Step
              number="2"
              title="Choose the common problem"
              details={[
                "When it asks: “Is your report about any of these common problems?”",
                "Choose: Job, Investment, Money-Making Opportunity, Franchise.",
              ]}
            />

            <Step
              number="3"
              title="Choose the type"
              details={[
                "When it asks: “What type of job, investment, money-making opportunity, or franchise was it?”",
                "Choose: Investment / Investment Seminar.",
              ]}
            />

            <Step
              number="4"
              title="Report details: payment"
              details={[
                "When it asks: “Did you pay or send money?” choose Yes.",
                "Enter the total amount sent.",
                "Choose how the money was sent.",
                "Enter the most recent payment date if known.",
                "Use the victim’s report for TXIDs, wallet addresses, amounts, and dates.",
              ]}
            />

            <Step
              number="5"
              title="How it started"
              details={[
                "Choose the closest answer for how contact began.",
                "Examples: friend referral, Telegram, WhatsApp, Facebook, text message, online ad, or investment group.",
                "Use the timeline in the saved report to explain how the victim first became involved.",
              ]}
            />

            <Step
              number="6"
              title="Company or person details"
              details={[
                "Enter the company/platform name.",
                "Enter the name of the person the victim dealt with if known.",
                "Add any other information available: phone, website, app name, Telegram group, WhatsApp number, or wallet address.",
              ]}
            />

            <Step
              number="7"
              title="Comments: describe what happened"
              details={[
                "Use the saved report to write the story in the victim’s own words.",
                "Include timeline of events.",
                "Include blockchain transaction proof or TXIDs.",
                "Include withdrawal problems.",
                "Include fee/tax demands, including any 12% request.",
                "Include disappearing website or app behavior.",
              ]}
            />

            <Step
              number="8"
              title="About you"
              details={[
                "Answer whether you are filing for yourself or someone else.",
                "Enter the victim’s details carefully.",
                "Email is recommended if they want confirmation from the FTC.",
                "Only enter information they are comfortable providing.",
              ]}
            />

            <WarningBox />

            <Step
              number="9"
              title="Submit and save confirmation"
              details={[
                "Review the report before submitting.",
                "Submit the FTC report.",
                "Save or screenshot the confirmation page if one appears.",
                "Return to this app and mark FTC as completed inside the victim’s report.",
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
        Do not enter Social Security numbers, birth dates, driver’s license
        numbers, bank passwords, crypto seed phrases, medical history, or account
        passwords.
      </p>
    </div>
  );
}