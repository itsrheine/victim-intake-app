"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type EvidenceFile = {
  name: string;
  type: string;
  dataUrl: string;
};

export default function NewCasePage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryRegion, setCountryRegion] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cityState, setCityState] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const [platform, setPlatform] = useState("");
  const [personToComplainAbout, setPersonToComplainAbout] = useState("");
  const [amountDeposited, setAmountDeposited] = useState("");
  const [depositDates, setDepositDates] = useState("");
  const [txid, setTxid] = useState("");
  const [walletAddresses, setWalletAddresses] = useState("");

  const [timeline, setTimeline] = useState("");
  const [withdrawalProblems, setWithdrawalProblems] = useState("");
  const [feeTaxDemands, setFeeTaxDemands] = useState("");
  const [websiteBehavior, setWebsiteBehavior] = useState("");
  const [trainingMaterials, setTrainingMaterials] = useState("");
  const [chatMessages, setChatMessages] = useState("");

  const [files, setFiles] = useState<EvidenceFile[]>([]);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setFiles((prev) => [
          ...prev,
          {
            name: file.name,
            type: file.type,
            dataUrl: reader.result as string,
          },
        ]);
      };

      reader.readAsDataURL(file);
    });

    e.target.value = "";
  }

  function removeFile(indexToRemove: number) {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newCase = {
      id: crypto.randomUUID(),

      firstName,
      lastName,
      projectName: `${lastName}, ${firstName}`.trim(),
      countryRegion,
      email,
      phone,
      cityState,
      accessCode,

      platform,
      personToComplainAbout,
      amountDeposited,
      depositDates,
      txid,
      walletAddresses,

      timeline,
      withdrawalProblems,
      feeTaxDemands,
      websiteBehavior,
      trainingMaterials,
      chatMessages,

      complaints: {
        ftc: false,
        bbb: false,
        ic3: false,
        philippines: false,
        canada: false,
      },

      files,

      createdAt: new Date().toISOString(),
      status: "Draft",
    };

    const savedCases = localStorage.getItem("victim_cases");
    const cases = savedCases ? JSON.parse(savedCases) : [];

    localStorage.setItem("victim_cases", JSON.stringify([newCase, ...cases]));

    router.push("/reports");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          ← Back to Home
        </Link>

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            New Victim Intake Report
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Create an individual report with contact details, transaction
            proof, withdrawal issues, fee/tax demands, website behavior, and
            evidence files.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Section title="1. Contact Information">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="First Name" value={firstName} onChange={setFirstName} />
              <Input label="Last Name" value={lastName} onChange={setLastName} />
              <Input label="Country / Region" value={countryRegion} onChange={setCountryRegion} />
              <Input label="City / State" value={cityState} onChange={setCityState} />
              <Input label="Email" value={email} onChange={setEmail} />
              <Input label="Phone Number" value={phone} onChange={setPhone} />
            </div>
          </Section>

          <Section title="2. Platform / Complaint Information">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Platform / Company Name"
                value={platform}
                onChange={setPlatform}
              />

              <Input
                label="Specific Person To Complain About"
                value={personToComplainAbout}
                onChange={setPersonToComplainAbout}
              />
            </div>
          </Section>

          <Section title="3. Blockchain / Deposit Information">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Total Amount Deposited"
                value={amountDeposited}
                onChange={setAmountDeposited}
              />

              <Textarea
                label="Deposit Dates"
                value={depositDates}
                onChange={setDepositDates}
              />

              <Textarea
                label="TXID / Transaction Hash"
                value={txid}
                onChange={setTxid}
              />

              <Textarea
                label="Wallet Addresses"
                value={walletAddresses}
                onChange={setWalletAddresses}
              />
            </div>
          </Section>

          <Section title="4. Individual Story">
            <Textarea
              label="Timeline Of Events"
              value={timeline}
              onChange={setTimeline}
            />

            <Textarea
              label="Withdrawal Problems"
              value={withdrawalProblems}
              onChange={setWithdrawalProblems}
            />

            <Textarea
              label="Fee / Tax Demands, Including Any 12% Request"
              value={feeTaxDemands}
              onChange={setFeeTaxDemands}
            />

            <Textarea
              label="Disappearing Website / App Behavior"
              value={websiteBehavior}
              onChange={setWebsiteBehavior}
            />
          </Section>

          <Section title="5. Supporting Evidence Notes">
            <Textarea
              label="Training Materials"
              value={trainingMaterials}
              onChange={setTrainingMaterials}
            />

            <Textarea
              label="Chat Messages / Group Messages"
              value={chatMessages}
              onChange={setChatMessages}
            />
          </Section>

          <Section title="6. Upload Evidence">
            <label className="inline-flex cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Upload PDFs, Screenshots, Or Evidence Files
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <p className="mt-2 text-xs text-slate-500">
              Upload screenshots, PDFs, TXID proof, wallet records, chat
              messages, withdrawal problems, fee/tax requests, or training
              materials.
            </p>

            {files.length > 0 && (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-medium text-slate-700">
                      {file.name}
                    </p>

                    {file.type.startsWith("image/") ? (
                      <img
                        src={file.dataUrl}
                        alt={file.name}
                        className="mt-3 max-h-52 rounded-lg border object-contain"
                      />
                    ) : (
                      <p className="mt-2 text-sm text-slate-500">
                        PDF uploaded and saved with this report.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="mt-3 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Remove File
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="7. Report Access Code">
            <Input
              label="Create A Private Access Code"
              value={accessCode}
              onChange={setAccessCode}
            />

            <p className="text-xs text-slate-500">
              This code will be needed to open this person’s report later. Keep
              it simple enough for the victim to remember, but not obvious to
              others.
            </p>
          </Section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-lg font-semibold text-amber-900">
              Reminder Before Saving
            </h2>

            <p className="mt-2 text-sm text-amber-800">
              Do not enter crypto seed phrases, bank passwords, account
              passwords, PINs, Social Security numbers, or other highly
              sensitive private information.
            </p>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Save Individual Report
            </button>

            <Link
              href="/reports"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
      />
    </div>
  );
}