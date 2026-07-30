"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import type { Career, EducationProgram, Institution } from "@/data/types";
import InstitutionLogo from "@/components/InstitutionLogo";

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const schoolScrollRef = useRef<HTMLDivElement>(null);

  function updateSchoolScrollFade(el: HTMLDivElement) {
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

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
    return Array.from(seen.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [programs, institutionsById]);

  useEffect(() => {
    if (schoolScrollRef.current) updateSchoolScrollFade(schoolScrollRef.current);
  }, [institutionOptions]);

  const programCountByInstitutionId = useMemo(() => {
    const counts = new Map<number, number>();
    for (const program of programs) {
      counts.set(
        program.institutionId,
        (counts.get(program.institutionId) ?? 0) + 1,
      );
    }
    return counts;
  }, [programs]);

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
    return programs
      .filter((program) => {
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
      })
      .sort((a, b) => a.name.localeCompare(b.name));
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
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-brand">Education</h1>
          <p className="mt-3 max-w-2xl text-brand/80">
            Programs that prepare you for careers in isotope production and
            use, from technical diplomas to graduate specializations.
          </p>
        </div>
        <div className="relative w-full sm:w-64 sm:shrink-0">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-brand/50"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs or schools..."
            aria-label="Search programs"
            className="w-full rounded-md border border-brand/20 py-2.5 pl-9 pr-4 text-brand outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Browse by school</h2>
        <div className="relative mt-4">
          <div
            ref={schoolScrollRef}
            onScroll={(e) => updateSchoolScrollFade(e.currentTarget)}
            className="scrollbar-desktop flex gap-3 overflow-x-auto px-1 py-1 pb-3"
          >
            {institutionOptions.map((institution) => {
              const isSelected = institutionId === String(institution.id);
              return (
                <button
                  key={institution.id}
                  type="button"
                  onClick={() =>
                    setInstitutionId(
                      isSelected ? "all" : String(institution.id),
                    )
                  }
                  className={`flex w-56 shrink-0 items-center gap-3 rounded-lg border p-3 text-left transition-colors duration-200 ${
                    isSelected
                      ? "border-primary bg-primary-text/5 shadow-[inset_0_0_0_1px_#8570f2]"
                      : "border-brand/10 hover:border-primary-text"
                  }`}
                >
                  <InstitutionLogo
                    name={institution.name}
                    website={institution.website}
                    className="h-9 w-9 shrink-0 rounded-md"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brand">
                      {institution.name}
                    </p>
                    <p className="text-xs text-brand/60">
                      {programCountByInstitutionId.get(institution.id) ?? 0}{" "}
                      program
                      {programCountByInstitutionId.get(institution.id) === 1
                        ? ""
                        : "s"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <div
            aria-hidden
            className={`pointer-events-none absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="w-full sm:w-56">
          <label
            htmlFor="credential-filter"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-brand"
          >
            Filter by credential
          </label>
          <div className="relative">
            <select
              id="credential-filter"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-md border border-brand/20 py-2.5 pl-3 pr-9 text-sm text-brand outline-none focus:border-primary"
            >
              <option value="all">All credentials</option>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {levelLabels[l] ?? l}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-brand/50"
            />
          </div>
        </div>

        <div className="w-full sm:w-56">
          <label
            htmlFor="salary-filter"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-brand"
          >
            Filter by salary potential
          </label>
          <div className="relative">
            <select
              id="salary-filter"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-md border border-brand/20 py-2.5 pl-3 pr-9 text-sm text-brand outline-none focus:border-primary"
            >
              {salaryBuckets.map((bucket) => (
                <option key={bucket.value} value={bucket.value}>
                  {bucket.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-brand/50"
            />
          </div>
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
                className="flex gap-4 rounded-lg border border-brand/10 p-6 hover:border-primary hover:shadow-[inset_0_0_0_1px_#8570f2]"
              >
                {institution && (
                  <InstitutionLogo
                    name={institution.name}
                    website={institution.website}
                    className="h-10 w-10 shrink-0 rounded-md"
                  />
                )}
                <div className="min-w-0">
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
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
