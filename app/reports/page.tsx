"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  firstName: string;
  lastName: string;
  projectName: string;
  accessCode: string;
  email: string;
  phone: string;
  cityState: string;
  countryRegion: string;
  platform: string;
  personToComplainAbout: string;
  amountDeposited: string;
  depositDates: string;
  txid: string;
  walletAddresses: string;
  timeline: string;
  withdrawalProblems: string;
  feeTaxDemands: string;
  websiteBehavior: string;
  trainingMaterials: string;
  chatMessages: string;
  files: EvidenceFile[];
  complaints: ComplaintStatus;
  createdAt: string;
  status: string;
};

export default function ReportsPage() {
  const ADMIN_CODE = "admin123";

  const [cases, setCases] = useState<VictimCase[]>([]);
  const [adminCode, setAdminCode] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    const savedCases = localStorage.getItem("victim_cases");
    if (savedCases) setCases(JSON.parse(savedCases));
  }, []);

  function unlockAdmin() {
    if (adminCode === ADMIN_CODE) {
      setAdminUnlocked(true);
      setAdminError("");
    } else {
      setAdminError("Incorrect admin code.");
    }
  }

  function deleteCase(caseId: string) {
    const updatedCases = cases.filter((caseFile) => caseFile.id !== caseId);
    setCases(updatedCases);
    localStorage.setItem("victim_cases", JSON.stringify(updatedCases));
  }

  function exportAllCases() {
    const savedCases = localStorage.getItem("victim_cases") || "[]";
    const blob = new Blob([savedCases], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `victim-cases-backup-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function importBackup(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const importedCases = JSON.parse(reader.result as string);

        if (!Array.isArray(importedCases)) {
          alert("Invalid backup file.");
          return;
        }

        localStorage.setItem("victim_cases", JSON.stringify(importedCases));
        setCases(importedCases);
        alert("Backup imported successfully.");
      } catch {
        alert("Could not import backup file.");
      }
    };

    reader.readAsText(file);
    event.target.value = "";
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          ← Back to Home
        </Link>

        <section className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Saved Individual Reports
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                View, open, and manage saved victim intake reports.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {cases.length} saved report{cases.length === 1 ? "" : "s"}
              </p>
            </div>

            <Link
              href="/new"
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-medium text-white hover:opacity-90"
            >
              New Intake Form
            </Link>
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Admin Tools
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Backup and restore tools are protected by the admin code.
              </p>
            </div>

            {adminUnlocked ? (
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={exportAllCases}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  Export Backup
                </button>

                <label className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-800 hover:bg-slate-50">
                  Import Backup
                  <input
                    type="file"
                    accept="application/json,.json"
                    onChange={importBackup}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Admin code"
                  className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />

                <button
                  type="button"
                  onClick={unlockAdmin}
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
                >
                  Unlock
                </button>
              </div>
            )}
          </div>

          {adminError && (
            <p className="mt-2 text-sm text-red-600">{adminError}</p>
          )}
        </section>

        {cases.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No saved reports yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {cases.map((caseFile) => {
              const complaintCount = [
                caseFile.complaints?.ftc,
                caseFile.complaints?.bbb,
                caseFile.complaints?.ic3,
                caseFile.complaints?.philippines,
                caseFile.complaints?.canada,
              ].filter(Boolean).length;

              return (
                <article
                  key={caseFile.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {caseFile.projectName || "Unnamed Victim"}
                      </h2>

                      <p className="mt-1 font-mono text-xs text-slate-500">
                        Report #{caseFile.id.slice(0, 8)}
                      </p>

                      <div className="mt-3 grid gap-x-8 gap-y-1 text-sm text-slate-600 md:grid-cols-2">
                        <p>
                          <span className="font-medium text-slate-700">
                            Country:
                          </span>{" "}
                          {caseFile.countryRegion || "Not provided"}
                        </p>

                        <p>
                          <span className="font-medium text-slate-700">
                            Platform:
                          </span>{" "}
                          {caseFile.platform || "Not provided"}
                        </p>

                        <p>
                          <span className="font-medium text-slate-700">
                            Amount:
                          </span>{" "}
                          {caseFile.amountDeposited || "Not provided"}
                        </p>

                        <p>
                          <span className="font-medium text-slate-700">
                            Complaint Against:
                          </span>{" "}
                          {caseFile.personToComplainAbout || "Not provided"}
                        </p>

                        <p>
                          <span className="font-medium text-slate-700">
                            Evidence:
                          </span>{" "}
                          {caseFile.files?.length || 0} file
                          {(caseFile.files?.length || 0) === 1 ? "" : "s"}
                        </p>

                        <p>
                          <span className="font-medium text-slate-700">
                            Created:
                          </span>{" "}
                          {caseFile.createdAt
                            ? new Date(caseFile.createdAt).toLocaleDateString()
                            : "Not provided"}
                        </p>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs text-slate-500">
                          Complaint Progress: {complaintCount} / 5
                        </p>

                        <div className="mt-1.5 h-2 w-full max-w-sm rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-slate-900"
                            style={{
                              width: `${(complaintCount / 5) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      {caseFile.status || "Draft"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/cases/${caseFile.id}`}
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Open Report
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteCase(caseFile.id)}
                      className="rounded-xl border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}