import Link from "next/link";

export default function PhilippinesGuidePage() {
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
            Philippines Scam Reporting Guide
          </h1>

          <p className="mt-3 text-slate-600">
            Follow these steps slowly while the victim’s saved report is open.
            Use the saved report information, screenshots, TXIDs, wallet
            addresses, and timeline details while filing complaints.
          </p>

          <div className="mt-8 space-y-5">
            <AgencyCard
              number="1"
              title="PNP Anti-Cybercrime Group"
              description="Use this for online scams, crypto scams, investment scams, impersonation, and social media or messaging app fraud."
              website="https://acg.pnp.gov.ph/"
              buttonText="Open PNP Anti-Cybercrime Website"
              steps={[
                "Open the website using the button below.",
                "Prepare the victim’s timeline of events.",
                "Prepare screenshots, TXIDs, wallet addresses, and payment details.",
                "Prepare recruiter names, Telegram groups, WhatsApp chats, or websites involved.",
                "Explain withdrawal problems and fee/tax requests.",
                "Save screenshots of any confirmation pages after reporting.",
              ]}
            />

            <AgencyCard
              number="2"
              title="NBI Cybercrime Division"
              description="Use this for organized cybercrime activity, online fraud, fake investment platforms, or larger scam operations."
              website="https://cybercrime.doj.gov.ph/"
              buttonText="Open NBI / DOJ Cybercrime Website"
              steps={[
                "Open the website using the button below.",
                "Use the saved report while filling out details.",
                "Include platform names, websites, and recruiter information.",
                "Include blockchain transactions, wallet addresses, and evidence files.",
                "Include disappearing website behavior or blocked withdrawals.",
                "Save screenshots of any complaint confirmations.",
              ]}
            />

            <AgencyCard
              number="3"
              title="SEC Philippines"
              description="Use this if the scam involved investments, trading platforms, or promises of profits or returns."
              website="https://www.sec.gov.ph/"
              buttonText="Open SEC Philippines"
              steps={[
                "Open the SEC Philippines website.",
                "Search for investor complaint or scam reporting information.",
                "Explain the investment promises made to the victim.",
                "Include platform names, recruiter names, and financial losses.",
                "Include evidence of deposits, TXIDs, and wallet addresses.",
                "Save screenshots of any submissions or confirmations.",
              ]}
            />

            <AgencyCard
              number="4"
              title="Bangko Sentral ng Pilipinas (BSP)"
              description="Use this if banks, e-wallets, or payment services were involved."
              website="https://www.bsp.gov.ph/"
              buttonText="Open BSP Website"
              steps={[
                "Open the BSP website.",
                "Prepare bank names, e-wallet names, or payment provider details.",
                "Prepare dates and amounts of payments sent.",
                "Use screenshots and evidence from the saved report.",
                "Save any complaint confirmation pages.",
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
                  Do not pay anyone claiming they can “recover” the money.
                </li>
                <li>
                  Save screenshots of confirmation pages after submitting
                  complaints.
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
        Do not include Social Security numbers, passwords, crypto seed phrases,
        bank PINs, or account passwords when submitting complaints.
      </p>
    </div>
  );
}