"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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
  email: string;
  phone: string;
  city_state: string;
  country_region: string;
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
  files: EvidenceFile[];
  complaints: ComplaintStatus;
  created_at: string;
  status: string;
};

export default function ReportsPage() {
  const ADMIN_CODE = "33535";

  const [cases, setCases] = useState<VictimCase[]>([]);
  const [loading, setLoading] = useState(true);

  const [adminCode, setAdminCode] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [importing, setImporting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [progressFilter, setProgressFilter] = useState("");

  useEffect(() => {
    loadCases();
  }, []);

  async function loadCases() {
    const { data, error } = await supabase
      .from("victim_cases")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Could not load reports.");
      setLoading(false);
      return;
    }

    setCases(data || []);
    setLoading(false);
  }

  function unlockAdmin() {
    if (adminCode === ADMIN_CODE) {
      setAdminUnlocked(true);
      setAdminError("");
    } else {
      setAdminError("Incorrect admin code.");
    }
  }

  async function deleteCase(caseId: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("victim_cases")
      .delete()
      .eq("id", caseId);

    if (error) {
      console.error(error);
      alert("Could not delete report.");
      return;
    }

    setCases((prev) => prev.filter((caseFile) => caseFile.id !== caseId));
  }

  function exportAllCases() {
    const blob = new Blob([JSON.stringify(cases, null, 2)], {
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

  function normalizeCase(item: any): Omit<VictimCase, "created_at"> {
    const firstName = item.first_name || item.firstName || "";
    const lastName = item.last_name || item.lastName || "";
    const projectName =
      item.project_name ||
      item.projectName ||
      `${lastName}, ${firstName}`.trim();

    return {
      id: item.id || crypto.randomUUID(),

      first_name: firstName,
      last_name: lastName,
      project_name: projectName,
      access_code: item.access_code || item.accessCode || "",

      email: item.email || "",
      phone: item.phone || "",
      city_state: item.city_state || item.cityState || "",
      country_region: item.country_region || item.countryRegion || "",

      platform: item.platform || "",
      person_to_complain_about:
        item.person_to_complain_about || item.personToComplainAbout || "",

      amount_deposited: item.amount_deposited || item.amountDeposited || "",
      deposit_dates: item.deposit_dates || item.depositDates || "",
      txid: item.txid || "",
      wallet_addresses: item.wallet_addresses || item.walletAddresses || "",

      timeline: item.timeline || "",
      withdrawal_problems:
        item.withdrawal_problems || item.withdrawalProblems || "",
      fee_tax_demands: item.fee_tax_demands || item.feeTaxDemands || "",
      website_behavior: item.website_behavior || item.websiteBehavior || "",

      training_materials:
        item.training_materials || item.trainingMaterials || "",
      chat_messages: item.chat_messages || item.chatMessages || "",

      files: item.files || [],

      complaints: {
        ftc: item.complaints?.ftc || false,
        bbb: item.complaints?.bbb || false,
        ic3: item.complaints?.ic3 || false,
        philippines: item.complaints?.philippines || false,
        canada: item.complaints?.canada || false,
      },

      status: item.status || "Draft",
    };
  }

  async function importBackupToSupabase(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const importedCases = JSON.parse(reader.result as string);

        if (!Array.isArray(importedCases)) {
          alert("Invalid backup file. The backup should contain a list of cases.");
          setImporting(false);
          return;
        }

        const normalizedCases = importedCases.map(normalizeCase);

        const { error } = await supabase
          .from("victim_cases")
          .upsert(normalizedCases, { onConflict: "id" });

        if (error) {
          console.error(error);
          alert("Could not import backup into Supabase.");
          setImporting(false);
          return;
        }

        alert("Backup imported successfully into Supabase.");
        await loadCases();
      } catch (error) {
        console.error(error);
        alert("Could not read backup file.");
      } finally {
        setImporting(false);
        event.target.value = "";
      }
    };

    reader.readAsText(file);
  }

  const filteredCases = cases.filter((caseFile) => {
    const complaintCount = [
      caseFile.complaints?.ftc,
      caseFile.complaints?.bbb,
      caseFile.complaints?.ic3,
      caseFile.complaints?.philippines,
      caseFile.complaints?.canada,
    ].filter(Boolean).length;

    const searchText = [
      caseFile.project_name,
      caseFile.first_name,
      caseFile.last_name,
      caseFile.platform,
      caseFile.country_region,
      caseFile.person_to_complain_about,
      caseFile.amount_deposited,
      caseFile.email,
      caseFile.phone,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchText.includes(searchTerm.toLowerCase());

    const matchesCountry =
      countryFilter === "" ||
      caseFile.country_region
        ?.toLowerCase()
        .includes(countryFilter.toLowerCase());

    const matchesProgress =
      progressFilter === "" ||
      (progressFilter === "not-started" && complaintCount === 0) ||
      (progressFilter === "in-progress" &&
        complaintCount > 0 &&
        complaintCount < 5) ||
      (progressFilter === "completed" && complaintCount === 5);

    return matchesSearch && matchesCountry && matchesProgress;
  });

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
                View, open, search, and manage saved victim intake reports.
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
                Backup, restore, and import tools are protected by the admin code.
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
                  {importing ? "Importing..." : "Import Backup to Supabase"}
                  <input
                    type="file"
                    accept="application/json,.json"
                    onChange={importBackupToSupabase}
                    className="hidden"
                    disabled={importing}
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

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Search Reports
          </h2>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, platform, phone, email..."
              className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
            />

            <input
              type="text"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              placeholder="Filter by country"
              className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
            />

            <select
              value={progressFilter}
              onChange={(e) => setProgressFilter(e.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
            >
              <option value="">All progress</option>
              <option value="not-started">Not started</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="text-xs text-slate-500">
              Showing {filteredCases.length} of {cases.length} reports.
            </p>

            {(searchTerm || countryFilter || progressFilter) && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCountryFilter("");
                  setProgressFilter("");
                }}
                className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50"
              >
                Clear filters
              </button>
            )}
          </div>
        </section>

        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500">
            Loading reports...
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No reports found.
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredCases.map((caseFile) => {
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
                        {caseFile.project_name || "Unnamed Victim"}
                      </h2>

                      <p className="mt-1 font-mono text-xs text-slate-500">
                        Report #{caseFile.id.slice(0, 8)}
                      </p>

                      <div className="mt-3 grid gap-x-8 gap-y-1 text-sm text-slate-600 md:grid-cols-2">
                        <p>
                          <span className="font-medium text-slate-700">
                            Country:
                          </span>{" "}
                          {caseFile.country_region || "Not provided"}
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
                          {caseFile.amount_deposited || "Not provided"}
                        </p>

                        <p>
                          <span className="font-medium text-slate-700">
                            Complaint Against:
                          </span>{" "}
                          {caseFile.person_to_complain_about || "Not provided"}
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
                          {caseFile.created_at
                            ? new Date(caseFile.created_at).toLocaleDateString()
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