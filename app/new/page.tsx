"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCasePage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
  const [countryRegion, setCountryRegion] = useState("");

  const [files, setFiles] = useState<
    { name: string; type: string; dataUrl: string }[]
  >([]);

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
    }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newCase = {
      id: crypto.randomUUID(),

      firstName,
      lastName,
      projectName: `${lastName}, ${firstName}`,
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
      countryRegion,

      files,

      createdAt: new Date().toISOString(),
      status: "Draft",
      complaints: {
          ftc: false,
          bbb: false,
          ic3: false,
          philippines: false,
          canada: false,
        },
    };

    const savedCases = localStorage.getItem("victim_cases");
    const cases = savedCases ? JSON.parse(savedCases) : [];

    localStorage.setItem("victim_cases", JSON.stringify([newCase, ...cases]));

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => router.push("/")}
          className="mb-6 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
        >
          ← Back
        </button>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            New Victim Intake Report
          </h1>

          <p className="mt-2 text-slate-600">
            Create an individual report with the victim’s story, transaction
            details, withdrawal issues, fee/tax demands, and evidence.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <Section title="1. Contact Information">
            <Input label="First Name" value={firstName} onChange={setFirstName} />
            <Input label="Last Name" value={lastName} onChange={setLastName} />
              <Input label="Email" value={email} onChange={setEmail} />
              <Input label="Phone Number" value={phone} onChange={setPhone} />
              <Input label="City / State" value={cityState} onChange={setCityState} />
              <Input label="Country / Region" value={countryRegion} onChange={setCountryRegion} />
            </Section>

            <Section title="2. Platform / Complaint Information">
              <Input label="Platform / Company Name" value={platform} onChange={setPlatform} />
              <Input
                label="Specific Person They Want To Complain About"
                value={personToComplainAbout}
                onChange={setPersonToComplainAbout}
              />
            </Section>

            <Section title="3. Blockchain / Deposit Information">
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
            </Section>

            <Section title="4. Their Individual Story">
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
              <label className="inline-flex cursor-pointer rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700">
                Upload PDFs, Screenshots, Or Evidence Files
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

                {files.length > 0 && (
                <div className="mt-4 grid gap-3">
                    {files.map((file, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                        <p className="text-sm font-medium text-slate-700">{file.name}</p>

                        {file.type.startsWith("image/") ? (
                        <img
                            src={file.dataUrl}
                            alt={file.name}
                            className="mt-3 max-h-64 rounded-xl border object-contain"
                        />
                        ) : (
                        <p className="mt-2 text-sm text-slate-500">
                            PDF uploaded and saved with this report.
                        </p>
                        )}
                        <button
                            type="button"
                            onClick={() => {
                                setFiles((prev) => prev.filter((_, fileIndex) => fileIndex !== index));
                            }}
                            className="mt-3 rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
            <p className="text-sm text-slate-500">
                This code will be needed to open this person’s report later.
            </p>
            </Section>

            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white"
            >
              Save Individual Report
            </button>
          </form>
        </div>
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
    <section className="rounded-3xl border border-slate-200 p-5">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
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
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3"
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
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3"
      />
    </div>
  );
}