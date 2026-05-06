import Link from "next/link";

export default function PhilippinesGuidePage() {
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
              Philippines Scam Reporting Guide
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Use this guide while the victim’s saved report is open. Copy
              details such as screenshots, TXIDs, wallet addresses, payment
              dates, recruiter names, and chat messages when reporting.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <AgencyCard
              number="1"
              title="PNP Anti-Cybercrime Group"
              description="Use this for online scams, crypto scams, investment scams, impersonation, and messaging app fraud."
              website="https://acg.pnp.gov.ph/"
              buttonText="Open PNP Anti-Cybercrime Website"
              steps={[
                "Open the PNP Anti-Cybercrime website using the button below.",
                "Prepare the victim’s timeline of events.",
                "Prepare screenshots, TXIDs, wallet addresses, and payment records.",
                "Prepare recruiter names, Telegram groups, WhatsApp chats, phone numbers, websites, or app names involved.",
                "Explain withdrawal problems and fee/tax demands.",
                "Save or screenshot any confirmation page or reference number.",
              ]}
            />

            <AgencyCard
              number="2"
              title="DOJ Office of Cybercrime"
              description="Use this for cybercrime reports involving online fraud, digital evidence, fake platforms, or organized online scam activity."
              website="https://cybercrime.doj.gov.ph/"
              buttonText="Open DOJ Cybercrime Website"
              steps={[
                "Open the DOJ Office of Cybercrime website.",
                "Use the saved victim report while preparing the complaint.",
                "Include platform names, websites, recruiter information, and group chat details.",
                "Include TXIDs, wallet addresses, screenshots, PDFs, and payment records.",
                "Describe disappearing website behavior, blocked withdrawals, or fee/tax requests.",
                "Save or screenshot any confirmation page or reference number.",
              ]}
            />

            <AgencyCard
              number="3"
              title="SEC Philippines"
              description="Use this if the scam involved investments, trading platforms, promised profits, or money-making opportunities."
              website="https://www.sec.gov.ph/"
              buttonText="Open SEC Philippines"
              steps={[
                "Open the SEC Philippines website.",
                "Look for investor complaint or scam reporting information.",
                "Explain the investment promises made to the victim.",
                "Include the platform name, recruiter names, group names, websites, and financial losses.",
                "Include evidence of deposits, TXIDs, wallet addresses, screenshots, and chat messages.",
                "Save or screenshot any complaint confirmation or reference number.",
              ]}
            />

            <AgencyCard
              number="4"
              title="Bangko Sentral ng Pilipinas (BSP)"
              description="Use this if banks, e-wallets, payment services, or financial institutions were involved."
              website="https://www.bsp.gov.ph/"
              buttonText="Open BSP Website"
              steps={[
                "Open the BSP website.",
                "Prepare bank names, e-wallet names, payment provider details, or transfer records.",
                "Prepare dates and amounts of payments sent.",
                "Use screenshots and evidence from the saved report.",
                "Save or screenshot any complaint confirmation or reference number.",
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
                <li>Keep payment receipts or bank/e-wallet records.</li>
                <li>
                  Do not pay anyone claiming they can “recover” the money.
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
        passwords, or full banking credentials when filing complaints.
      </p>
    </div>
  );
}