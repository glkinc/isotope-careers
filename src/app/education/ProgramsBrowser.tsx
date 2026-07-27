"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Career, EducationProgram, Institution } from "@/data/types";

type Props = {
  programs: EducationProgram[];
  institutionsById: Record<string, Institution | undefined>;
  careers: Career[];
  careerEducationLinks: { careerSlug: string; programSlug: string }[];
};

const levelLabels: Record<string, string> = {
  high_school: "High School",
  certificate: "Certificate",
  diploma: "Diploma",
  undergraduate: "Undergraduate",
  graduate: "Graduate",
};

const salaryBuckets = [
  { label: "Any salary", value: "all" },
  { label: "$60k+", value: "60000" },
  { label: "$80k+", value: "80000" },
  { label: "$100k+", value: "100000" },
  { label: "$120k+", value: "120000" },
];

export default function ProgramsBrowser({
  programs,
  institutionsById,
  careers,
  careerEducationLinks,
}: Props) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [institutionId, setInstitutionId] = useState("all");
  const [minSalary, setMinSalary] = useState("all");

  const levels = useMemo(
    () => Array.from(new Set(programs.map((p) => p.level))),
    [programs],
  );

  const institutionOptions = useMemo(() => {
    const seen = new Map<number, Institution>();
    for (const program of programs) {
      const institution = institutionsById[String(program.institutionId)];
      if (institution) seen.set(institution.id, institution);
    }
    return Array.from(seen.values());
  }, [programs, institutionsById]);

  const maxSalaryByProgramSlug = useMemo(() => {
    const map = new Map<string, number>();
    for (const program of programs) {
      const careerSlugs = careerEducationLinks
        .filter((l) => l.programSlug === program.slug)
        .map((l) => l.careerSlug);
      const max = Math.max(
        0,
        ...careers
          .filter((c) => careerSlugs.includes(c.slug) && c.salaryMax)
          .map((c) => c.salaryMax as number),
      );
      map.set(program.slug, max);
    }
    return map;
  }, [programs, careers, careerEducationLinks]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const threshold = minSalary === "all" ? 0 : Number(minSalary);
    return programs.filter((program) => {
      const institution = institutionsById[String(program.institutionId)];
      const matchesQuery =
        !q ||
        program.name.toLowerCase().includes(q) ||
        institution?.name.toLowerCase().includes(q);
      const matchesLevel = level === "all" || program.level === level;
      const matchesInstitution =
        institutionId === "all" || String(institution?.id) === institutionId;
      const matchesSalary =
        threshold === 0 ||
        (maxSalaryByProgramSlug.get(program.slug) ?? 0) >= threshold;
      return (
        matchesQuery && matchesLevel && matchesInstitution && matchesSalary
      );
    });
  }, [
    programs,
    institutionsById,
    query,
    level,
    institutionId,
    minSalary,
    maxSalaryByProgramSlug,
  ]);

  return (
    <div>
      <div className="mt-8 flex flex-col gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search programs or schools..."
          aria-label="Search programs"
          className="w-full max-w-sm rounded-md border border-brand/20 px-4 py-2.5 text-brand outline-none focus:border-primary"
        />

        <div className="flex flex-wrap gap-4">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            aria-label="Filter by credential"
            className="cursor-pointer rounded-md border border-brand/20 px-3 py-2 text-sm text-brand outline-none focus:border-primary"
          >
            <option value="all">All credentials</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                {levelLabels[l] ?? l}
              </option>
            ))}
          </select>

          <select
            value={institutionId}
            onChange={(e) => setInstitutionId(e.target.value)}
            aria-label="Filter by school"
            className="cursor-pointer rounded-md border border-brand/20 px-3 py-2 text-sm text-brand outline-none focus:border-primary"
          >
            <option value="all">All schools</option>
            {institutionOptions.map((institution) => (
              <option key={institution.id} value={String(institution.id)}>
                {institution.name}
              </option>
            ))}
          </select>

          <select
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            aria-label="Filter by salary"
            className="cursor-pointer rounded-md border border-brand/20 px-3 py-2 text-sm text-brand outline-none focus:border-primary"
          >
            {salaryBuckets.map((bucket) => (
              <option key={bucket.value} value={bucket.value}>
                {bucket.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-brand/80">
          No programs match your filters. Try loosening one of them.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {filtered.map((program) => {
            const institution = institutionsById[String(program.institutionId)];
            return (
              <Link
                key={program.id}
                href={`/education/${program.slug}`}
                className="rounded-lg border border-brand/10 p-6 hover:border-primary"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-primary-text">
                  {levelLabels[program.level] ?? program.level}
                </span>
                <h2 className="mt-2 font-semibold text-brand">
                  {program.name}
                </h2>
                {institution && (
                  <p className="mt-1 text-sm text-brand/80">
                    {institution.name}
                    {institution.city
                      ? ` — ${institution.city}, ${institution.province}`
                      : ""}
                  </p>
                )}
                <p className="mt-2 text-sm text-brand/80">
                  {program.description}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
