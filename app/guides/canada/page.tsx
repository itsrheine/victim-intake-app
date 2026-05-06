import Link from "next/link";

export default function CanadaGuidePage() {
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
              Canada Scam Reporting Guide
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Use this guide while the victim’s saved report is open. Copy
              details such as TXIDs, wallet addresses, screenshots, dates, and
              timelines when filing complaints.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <AgencyCard
              number="1"
              title="Canadian Anti-Fraud Centre (CAFC)"
              description="Use this for fraud, crypto scams, investment scams, phishing, and online scam reporting."
              website="https://antifraudcentre-centreantifraude.ca/"
              buttonText="Open CAFC Website"
              steps={[
                "Open the CAFC website using the button below.",
                "Prepare the victim’s timeline of events.",
                "Prepare screenshots, TXIDs, wallet addresses, and payment details.",
                "Explain withdrawal problems and fee/tax demands.",
                "Include recruiter names, websites, Telegram groups, WhatsApp numbers, or email addresses.",
                "Save or screenshot any confirmation page or reference number.",
              ]}
            />

            <AgencyCard
              number="2"
              title="Competition Bureau Canada"
              description="Use this for deceptive marketing, fake investment promises, misleading earnings claims, or scam promotions."
              website="https://competition-bureau.canada.ca/contact-competition-bureau-canada/complaint-form"
              buttonText="Open Competition Bureau Complaint Form"
              steps={[
                "Open the Competition Bureau complaint form.",
                "Use the victim’s saved report while completing the complaint.",
                "Explain the investment or money-making promises made.",
                "Include platform names, websites, recruiter names, advertisements, and group chat details.",
                "Include screenshots and saved evidence files if requested.",
                "Save or screenshot any confirmation page or reference number.",
              ]}
            />

            <AgencyCard
              number="3"
              title="Local Police or RCMP"
              description="Use this if there were significant financial losses, threats, organized scam activity, or identity misuse."
              website="https://www.rcmp-grc.gc.ca/"
              buttonText="Open RCMP Website"
              steps={[
                "Prepare the victim’s saved report before contacting police.",
                "Include TXIDs, wallet addresses, screenshots, and payment records.",
                "Include names, phone numbers, Telegram groups, WhatsApp numbers, emails, or websites involved.",
                "Describe disappearing website behavior, blocked withdrawals, and fee/tax demands.",
                "Ask for a police report number or reference number.",
                "Save the report number inside the victim’s case file.",
              ]}
            />

            <WarningBox />

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Important Reminder
              </h2>

              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                <li>Keep all screenshots and PDFs saved.</li>
                <li>Do not delete Telegram or WhatsApp conversations.</li>
                <li>Keep TXIDs and wallet addresses available.</li>
                <li>
                  Do not pay “recovery companies” claiming they can recover
                  crypto funds.
                </li>
                <li>
                  Save screenshots of confirmation pages and reference numbers.
                </li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function AgencyCard({
  number,
  title,
  description,
  website,
  buttonText,
  steps,
}: {
  number: string;
  title: string;
  description: string;
  website: string;
  buttonText: string;
  steps: string[];
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {number}
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

          <p className="mt-1 text-sm text-slate-600">{description}</p>

          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            {buttonText}
          </a>
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
        Do not include passwords, crypto seed phrases, bank PINs, account
        passwords, Social Insurance Numbers, or full banking credentials when
        filing complaints.
      </p>
    </div>
  );
}