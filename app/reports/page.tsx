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

    if (savedCases) {
      setCases(JSON.parse(savedCases));
    }
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

    const blob = new Blob([savedCases], {
      type: "application/json",
    });

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
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
        >
          ← Back to Home
        </Link>

        <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Saved Individual Reports
              </h1>

              <p className="mt-3 text-slate-600">
                View, open, and manage saved victim intake reports.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {cases.length} saved report{cases.length === 1 ? "" : "s"}
              </p>
            </div>

            <Link
              href="/new"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-center text-white transition hover:opacity-90"
            >
              New Victim Intake Form
            </Link>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Admin Tools</h2>

          {adminUnlocked ? (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={exportAllCases}
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-center text-slate-900 transition hover:bg-slate-50"
              >
                Export Backup
              </button>

              <label className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-5 py-3 text-center text-slate-900 transition hover:bg-slate-50">
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
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                Admin tools are locked.
              </p>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Enter admin code"
                  className="rounded-xl border border-slate-300 px-4 py-2"
                />

                <button
                  type="button"
                  onClick={unlockAdmin}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-white"
                >
                  Unlock Admin Tools
                </button>
              </div>

              {adminError && (
                <p className="mt-2 text-sm text-red-600">{adminError}</p>
              )}
            </div>
          )}
        </section>

        {cases.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No saved reports yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {cases.map((caseFile) => {
              const complaintCount = [
                caseFile.complaints?.ftc,
                caseFile.complaints?.bbb,
                caseFile.complaints?.ic3,
                caseFile.complaints?.philippines,
                caseFile.complaints?.canada,
              ].filter(Boolean).length;

              return (
                <div
                  key={caseFile.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        {caseFile.projectName || "Unnamed Victim"}
                      </h2>

                      <p className="mt-1 font-mono text-xs text-slate-500">
                        Report #{caseFile.id.slice(0, 8)}
                      </p>

                      <p className="mt-3 text-sm text-slate-600">
                        Country / Region:{" "}
                        {caseFile.countryRegion || "Not provided"}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Platform: {caseFile.platform || "Not provided"}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Amount Deposited:{" "}
                        {caseFile.amountDeposited || "Not provided"}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Complaint Against:{" "}
                        {caseFile.personToComplainAbout || "Not provided"}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Evidence Files: {caseFile.files?.length || 0}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Complaint Progress: {complaintCount} / 5
                      </p>

                      <div className="mt-2 h-2 w-full max-w-sm rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-slate-900"
                          style={{
                            width: `${(complaintCount / 5) * 100}%`,
                          }}
                        />
                      </div>

                      <p className="mt-2 text-sm text-slate-600">
                        Created:{" "}
                        {caseFile.createdAt
                          ? new Date(caseFile.createdAt).toLocaleDateString()
                          : "Not provided"}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      {caseFile.status || "Draft"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/cases/${caseFile.id}`}
                      className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Open Report
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteCase(caseFile.id)}
                      className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}