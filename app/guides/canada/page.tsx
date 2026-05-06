import Link from "next/link";

export default function CanadaGuidePage() {
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
            Canada Scam Reporting Guide
          </h1>

          <p className="mt-3 text-slate-600">
            Follow these steps slowly while the victim’s saved report is open.
            Use the saved report details, screenshots, TXIDs, wallet addresses,
            and timelines while completing complaints.
          </p>

          <div className="mt-8 space-y-5">
            <AgencyCard
              number="1"
              title="Canadian Anti-Fraud Centre (CAFC)"
              description="Use this for fraud, crypto scams, investment scams, phishing, and online scam reporting."
              website="https://antifraudcentre-centreantifraude.ca/"
              buttonText="Open CAFC Website"
              steps={[
                "Open the website using the button below.",
                "Prepare the victim’s timeline of events.",
                "Prepare screenshots, TXIDs, wallet addresses, and payment details.",
                "Explain withdrawal problems and fee/tax requests.",
                "Include recruiter names, websites, Telegram groups, or WhatsApp numbers.",
                "Save screenshots of any confirmation pages.",
              ]}
            />

            <AgencyCard
              number="2"
              title="Competition Bureau Canada"
              description="Use this for deceptive marketing, fake investments, misleading earnings claims, or scam promotions."
              website="https://competition-bureau.canada.ca/"
              buttonText="Open Competition Bureau Website"
              steps={[
                "Open the Competition Bureau website.",
                "Look for complaint or deceptive marketing reporting options.",
                "Explain the investment or money-making promises made.",
                "Include platform names, websites, recruiter names, and advertisements.",
                "Use screenshots and saved evidence files.",
                "Save screenshots of any confirmation pages.",
              ]}
            />

            <AgencyCard
              number="3"
              title="Local Police or RCMP"
              description="Use this if there were significant financial losses or organized scam activity."
              website="https://www.rcmp-grc.gc.ca/"
              buttonText="Open RCMP Website"
              steps={[
                "Prepare the victim’s saved report before contacting police.",
                "Include TXIDs, wallet addresses, screenshots, and payment records.",
                "Include names, phone numbers, Telegram groups, or websites involved.",
                "Describe disappearing website behavior or blocked withdrawals.",
                "Save any police report or reference number received.",
              ]}
            />

            <WarningBox />

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Important Reminder
              </h2>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                <li>Keep all screenshots and PDFs saved.</li>
                <li>Do not delete Telegram or WhatsApp conversations.</li>
                <li>Keep TXIDs and wallet addresses available.</li>
                <li>
                  Do not pay “recovery companies” claiming they can recover
                  crypto funds.
                </li>
                <li>
                  Save screenshots of all confirmation pages after reporting.
                </li>
              </ul>
            </div>
          </div>
        </div>
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
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
          {number}
        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

          <p className="mt-2 text-sm text-slate-600">{description}</p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:opacity-90"
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
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
      <h2 className="text-xl font-semibold text-red-800">
        Do not include sensitive private information
      </h2>

      <p className="mt-2 text-sm text-red-700">
        Do not include passwords, crypto seed phrases, bank PINs, or account
        passwords when filing complaints.
      </p>
    </div>
  );
}