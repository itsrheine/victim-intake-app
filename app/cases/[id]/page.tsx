"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type EvidenceFile = {
  name: string;
  type: string;
  dataUrl: string;
};

type ComplaintStatus = {
  ftc: boolean;
  bbb: boolean;
  ic3: boolean;
  philippines: boolean;
  canada: boolean;
};

type VictimCase = {
  id: string;
  first_name: string;
  last_name: string;
  project_name: string;
  access_code: string;
  country_region: string;
  email: string;
  phone: string;
  city_state: string;
  platform: string;
  person_to_complain_about: string;
  amount_deposited: string;
  deposit_dates: string;
  txid: string;
  wallet_addresses: string;
  timeline: string;
  withdrawal_problems: string;
  fee_tax_demands: string;
  website_behavior: string;
  training_materials: string;
  chat_messages: string;
  complaints: ComplaintStatus;
  files: EvidenceFile[];
  created_at: string;
  status: string;
};

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;

  const ADMIN_CODE = "33535";

  const [caseFile, setCaseFile] = useState<VictimCase | null>(null);
  const [enteredCode, setEnteredCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadCase();
  }, []);

  async function loadCase() {
    const { data, error } = await supabase
      .from("victim_cases")
      .select("*")
      .eq("id", caseId)
      .single();

    if (error || !data) {
      console.error(error);
      router.push("/reports");
      return;
    }

    setCaseFile({
      ...data,
      complaints: {
        ftc: data.complaints?.ftc || false,
        bbb: data.complaints?.bbb || false,
        ic3: data.complaints?.ic3 || false,
        philippines: data.complaints?.philippines || false,
        canada: data.complaints?.canada || false,
      },
      files: data.files || [],
    });

    setLoading(false);
  }

  function updateField(field: keyof VictimCase, value: string) {
    if (!caseFile) return;

    const updatedCase = {
      ...caseFile,
      [field]: value,
    };

    if (field === "first_name" || field === "last_name") {
      updatedCase.project_name = `${updatedCase.last_name}, ${updatedCase.first_name}`;
    }

    setCaseFile(updatedCase);
  }

  function updateComplaintStatus(key: keyof ComplaintStatus) {
    if (!caseFile) return;

    setCaseFile({
      ...caseFile,
      complaints: {
        ftc: caseFile.complaints?.ftc || false,
        bbb: caseFile.complaints?.bbb || false,
        ic3: caseFile.complaints?.ic3 || false,
        philippines: caseFile.complaints?.philippines || false,
        canada: caseFile.complaints?.canada || false,
        [key]: !caseFile.complaints?.[key],
      },
    });
  }

  async function saveChanges() {
    if (!caseFile) return;

    const updatedCase = {
      ...caseFile,
      project_name: `${caseFile.last_name}, ${caseFile.first_name}`,
    };

    const { error } = await supabase
      .from("victim_cases")
      .update({
        first_name: updatedCase.first_name,
        last_name: updatedCase.last_name,
        project_name: updatedCase.project_name,
        access_code: updatedCase.access_code,
        country_region: updatedCase.country_region,
        email: updatedCase.email,
        phone: updatedCase.phone,
        city_state: updatedCase.city_state,
        platform: updatedCase.platform,
        person_to_complain_about: updatedCase.person_to_complain_about,
        amount_deposited: updatedCase.amount_deposited,
        deposit_dates: updatedCase.deposit_dates,
        txid: updatedCase.txid,
        wallet_addresses: updatedCase.wallet_addresses,
        timeline: updatedCase.timeline,
        withdrawal_problems: updatedCase.withdrawal_problems,
        fee_tax_demands: updatedCase.fee_tax_demands,
        website_behavior: updatedCase.website_behavior,
        training_materials: updatedCase.training_materials,
        chat_messages: updatedCase.chat_messages,
        complaints: updatedCase.complaints,
        files: updatedCase.files,
        status: updatedCase.status,
      })
      .eq("id", updatedCase.id);

    if (error) {
      console.error(error);
      alert("Could not save changes.");
      return;
    }

    setCaseFile(updatedCase);
    setSaveMessage("Changes saved");
    setIsEditing(false);

    setTimeout(() => setSaveMessage(""), 1500);
  }

  function handleEvidenceUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || !caseFile) return;

    setIsUploading(true);

    const readers = Array.from(uploadedFiles).map(
      (file) =>
        new Promise<EvidenceFile>((resolve) => {
          const reader = new FileReader();

          reader.onload = () => {
            resolve({
              name: file.name,
              type: file.type,
              dataUrl: reader.result as string,
            });
          };

          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((newFiles) => {
      setCaseFile((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          files: [...(prev.files || []), ...newFiles],
        };
      });

      setIsUploading(false);
      event.target.value = "";
    });
  }

  function removeEvidence(indexToRemove: number) {
    if (!caseFile) return;

    setCaseFile({
      ...caseFile,
      files: caseFile.files.filter((_, index) => index !== indexToRemove),
    });
  }

  if (loading || !caseFile) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <p className="text-sm text-slate-600">Loading report...</p>
      </main>
    );
  }

  const complaintCount = [
    caseFile.complaints?.ftc,
    caseFile.complaints?.bbb,
    caseFile.complaints?.ic3,
    caseFile.complaints?.philippines,
    caseFile.complaints?.canada,
  ].filter(Boolean).length;

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Enter Access Code
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            This report is private. Enter the victim’s access code or the admin
            code.
          </p>

          <input
            type="password"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            className="mt-5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
            placeholder="Access code"
          />

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <button
            type="button"
            onClick={() => {
              if (
                enteredCode === caseFile.access_code ||
                enteredCode === ADMIN_CODE
              ) {
                setUnlocked(true);
                setError("");
              } else {
                setError("Incorrect access code.");
              }
            }}
            className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
          >
            Open Report
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/reports"
          className="mb-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          ← Back to Saved Reports
        </Link>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-bold text-slate-900">
              Individual Victim Report
            </h1>

            <p className="mt-1 font-mono text-xs text-slate-500">
              Report #{caseFile.id.slice(0, 8)}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {isEditing ? (
                <button
                  type="button"
                  onClick={saveChanges}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Edit Report
                </button>
              )}

              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}

              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Export / Print PDF
              </button>
            </div>

            {saveMessage && (
              <p className="mt-3 text-sm font-medium text-green-600">
                {saveMessage}
              </p>
            )}
          </div>

          <div className="mt-6 space-y-6">
            <ReportSection title="1. Contact Information">
              <ReportRow
                label="First Name"
                value={caseFile.first_name}
                isEditing={isEditing}
                onChange={(value) => updateField("first_name", value)}
              />

              <ReportRow
                label="Last Name"
                value={caseFile.last_name}
                isEditing={isEditing}
                onChange={(value) => updateField("last_name", value)}
              />

              <ReportRow label="Case Name" value={caseFile.project_name} />

              <ReportRow
                label="Country / Region"
                value={caseFile.country_region}
                isEditing={isEditing}
                onChange={(value) => updateField("country_region", value)}
              />

              <ReportRow
                label="Email"
                value={caseFile.email}
                isEditing={isEditing}
                onChange={(value) => updateField("email", value)}
              />

              <ReportRow
                label="Phone"
                value={caseFile.phone}
                isEditing={isEditing}
                onChange={(value) => updateField("phone", value)}
              />

              <ReportRow
                label="City / State"
                value={caseFile.city_state}
                isEditing={isEditing}
                onChange={(value) => updateField("city_state", value)}
              />
            </ReportSection>

            <ReportSection title="2. Platform / Complaint Information">
              <ReportRow
                label="Platform / Company"
                value={caseFile.platform}
                isEditing={isEditing}
                onChange={(value) => updateField("platform", value)}
              />

              <ReportRow
                label="Specific Person To Complain About"
                value={caseFile.person_to_complain_about}
                isEditing={isEditing}
                onChange={(value) =>
                  updateField("person_to_complain_about", value)
                }
              />
            </ReportSection>

            <ReportSection title="3. Blockchain / Deposit Information">
              <ReportRow
                label="Total Amount Deposited"
                value={caseFile.amount_deposited}
                isEditing={isEditing}
                onChange={(value) => updateField("amount_deposited", value)}
              />

              <ReportRow
                label="Deposit Dates"
                value={caseFile.deposit_dates}
                isEditing={isEditing}
                onChange={(value) => updateField("deposit_dates", value)}
                multiline
              />

              <ReportRow
                label="TXID / Transaction Hash"
                value={caseFile.txid}
                isEditing={isEditing}
                onChange={(value) => updateField("txid", value)}
                multiline
              />

              <ReportRow
                label="Wallet Addresses"
                value={caseFile.wallet_addresses}
                isEditing={isEditing}
                onChange={(value) => updateField("wallet_addresses", value)}
                multiline
              />
            </ReportSection>

            <ReportSection title="4. Individual Story">
              <ReportRow
                label="Timeline Of Events"
                value={caseFile.timeline}
                isEditing={isEditing}
                onChange={(value) => updateField("timeline", value)}
                multiline
              />

              <ReportRow
                label="Withdrawal Problems"
                value={caseFile.withdrawal_problems}
                isEditing={isEditing}
                onChange={(value) => updateField("withdrawal_problems", value)}
                multiline
              />

              <ReportRow
                label="Fee / Tax Demands, Including 12% Request"
                value={caseFile.fee_tax_demands}
                isEditing={isEditing}
                onChange={(value) => updateField("fee_tax_demands", value)}
                multiline
              />

              <ReportRow
                label="Disappearing Website / App Behavior"
                value={caseFile.website_behavior}
                isEditing={isEditing}
                onChange={(value) => updateField("website_behavior", value)}
                multiline
              />
            </ReportSection>

            <ReportSection title="5. Supporting Evidence Notes">
              <ReportRow
                label="Training Materials"
                value={caseFile.training_materials}
                isEditing={isEditing}
                onChange={(value) => updateField("training_materials", value)}
                multiline
              />

              <ReportRow
                label="Chat Messages / Group Messages"
                value={caseFile.chat_messages}
                isEditing={isEditing}
                onChange={(value) => updateField("chat_messages", value)}
                multiline
              />
            </ReportSection>

            <ReportSection title="6. Complaint Submission Progress">
              <p className="text-sm text-slate-600">
                {complaintCount} / 5 complaint steps completed
              </p>

              <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-slate-900"
                  style={{ width: `${(complaintCount / 5) * 100}%` }}
                />
              </div>

              <div className="mt-4 space-y-2">
                <ComplaintCheckbox
                  label="FTC complaint submitted"
                  checked={caseFile.complaints?.ftc || false}
                  onChange={() => updateComplaintStatus("ftc")}
                />

                <ComplaintCheckbox
                  label="BBB Scam Tracker complaint submitted"
                  checked={caseFile.complaints?.bbb || false}
                  onChange={() => updateComplaintStatus("bbb")}
                />

                <ComplaintCheckbox
                  label="FBI / IC3 complaint submitted"
                  checked={caseFile.complaints?.ic3 || false}
                  onChange={() => updateComplaintStatus("ic3")}
                />

                <ComplaintCheckbox
                  label="Philippines complaint submitted if applicable"
                  checked={caseFile.complaints?.philippines || false}
                  onChange={() => updateComplaintStatus("philippines")}
                />

                <ComplaintCheckbox
                  label="Canada complaint submitted if applicable"
                  checked={caseFile.complaints?.canada || false}
                  onChange={() => updateComplaintStatus("canada")}
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                After checking a box, click “Save Changes” at the top to keep
                the update.
              </p>
            </ReportSection>

            <ReportSection title="7. Uploaded Evidence Files">
              {isEditing && (
                <div className="mb-4">
                  <label className="inline-flex cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    {isUploading ? "Uploading..." : "Add More Evidence Files"}
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleEvidenceUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {caseFile.files?.length > 0 ? (
                <div className="grid gap-4">
                  {caseFile.files.map((file, index) => (
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
                          className="mt-3 max-h-96 rounded-xl border object-contain"
                        />
                      ) : (
                        <a
                          href={file.dataUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Open PDF
                        </a>
                      )}

                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeEvidence(index)}
                          className="mt-3 rounded-xl border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Remove Evidence
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No files uploaded.</p>
              )}
            </ReportSection>
          </div>
        </div>
      </div>
    </main>
  );
}

function ReportSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 p-4">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}

function ReportRow({
  label,
  value,
  isEditing,
  onChange,
  multiline = false,
}: {
  label: string;
  value?: string;
  isEditing?: boolean;
  onChange?: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      {isEditing && onChange ? (
        multiline ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={5}
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800"
          />
        ) : (
          <input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800"
          />
        )
      ) : (
        <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
          {value || "Not provided"}
        </p>
      )}
    </div>
  );
}

function ComplaintCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}