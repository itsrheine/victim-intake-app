"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

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
  const [incidentDescription, setIncidentDescription] = useState("");

  const [files, setFiles] = useState<EvidenceFile[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [wentToSeminar, setWentToSeminar] = useState("");
  const [seminarHost, setSeminarHost] = useState("");
  const [seminarLocation, setSeminarLocation] = useState("");

  const [authorityPermission, setAuthorityPermission] = useState(false);

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSaving(true);

    const caseId = crypto.randomUUID();
    const projectName = `${lastName}, ${firstName}`.trim();

    const { error } = await supabase.from("victim_cases").insert([
      {
        id: caseId,

        first_name: firstName,
        last_name: lastName,
        project_name: projectName,
        country_region: countryRegion,
        email,
        phone,
        city_state: cityState,
        access_code: accessCode,

        platform,
        person_to_complain_about: personToComplainAbout,
        amount_deposited: amountDeposited,
        deposit_dates: depositDates,
        txid,
        wallet_addresses: walletAddresses,

        timeline,
        withdrawal_problems: withdrawalProblems,
        fee_tax_demands: feeTaxDemands,
        website_behavior: websiteBehavior,
        training_materials: trainingMaterials,
        chat_messages: chatMessages,

        went_to_seminar: wentToSeminar,
        seminar_host: seminarHost,
        seminar_location: seminarLocation,
        authority_permission: authorityPermission,
        incident_description: incidentDescription,

        complaints: {
          ftc: false,
          bbb: false,
          ic3: false,
          philippines: false,
          canada: false,
        },

        files,
        status: "Draft",
      },
    ]);

    console.log("SUPABASE ERROR:", error);

    setIsSaving(false);

    if (error) {
      console.error(error);
      alert("Could not save report to Supabase.");
      return;
    }

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
                label="Describe What Happened From The Beginning"
                value={incidentDescription}
                onChange={setIncidentDescription}
                placeholder="Describe how you first started with this company/platform, who introduced you, what you were told, how your membership or account progressed, the last day you traded or accessed the platform, and the total amount of money you lost. Do not include sensitive information such as SSN, DOB, driver's license numbers, account numbers, passwords, seed phrases, or medical history."
              />
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
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Seminar / Presentation Information
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Please provide information about any seminar, webinar, hotel presentation,
                recruitment meeting, or online event related to this platform.
              </p>

              <div className="mt-5 grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Did you attend a seminar, webinar, or presentation?
                  </label>

                  <select
                    value={wentToSeminar}
                    onChange={(e) => setWentToSeminar(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Who hosted or presented the seminar/presentation?
                  </label>

                  <input
                    type="text"
                    value={seminarHost}
                    onChange={(e) => setSeminarHost(e.target.value)}
                    placeholder="Name of presenter, recruiter, speaker, or organization"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Where was the seminar or presentation conducted?
                  </label>

                  <input
                    type="text"
                    value={seminarLocation}
                    onChange={(e) => setSeminarLocation(e.target.value)}
                    placeholder="Hotel, restaurant, Zoom, Discord, Telegram, city, etc."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={authorityPermission}
                    onChange={(e) => setAuthorityPermission(e.target.checked)}
                    className="mt-1 h-4 w-4"
                  />

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      I authorize this information to be used for reporting to the FTC,
                      BBB, FBI IC3, Canadian Anti-Fraud Centre, or other proper authorities.
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      We will NOT select options requesting direct interviews or personal
                      follow-up contact from authorities unless separately discussed with
                      you first.
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      This information is intended to help organize and submit fraud,
                      scam, or deceptive business activity reports to the proper agencies.
                    </p>
                  </div>
                </label>
              </div>
            </div>
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
              disabled={isSaving}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Individual Report"}
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
      />
    </div>
  );
}