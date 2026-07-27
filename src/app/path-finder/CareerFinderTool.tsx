"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  Career,
  CareerCategory,
  EducationProgram,
  Institution,
  ProgramRequirement,
  Subject,
} from "@/data/types";
import { matchBySubjects } from "@/lib/pathfinder";

type Props = {
  subjects: Subject[];
  programs: EducationProgram[];
  requirements: ProgramRequirement[];
  careers: Career[];
  categories: CareerCategory[];
  careerEducationLinks: { careerSlug: string; programSlug: string }[];
  institutionByProgramId: Record<string, Institution | undefined>;
};

const levelLabels: Record<string, string> = {
  high_school: "High School",
  certificate: "Certificate",
  diploma: "Diploma",
  undergraduate: "Undergraduate",
  graduate: "Graduate",
};

type Step = "start" | "high-school" | "post-secondary";

export default function CareerFinderTool({
  subjects,
  programs,
  requirements,
  careers,
  categories,
  careerEducationLinks,
  institutionByProgramId,
}: Props) {
  const [step, setStep] = useState<Step>("start");

  return (
    <div>
      {step === "start" && <StartStep onChoose={setStep} />}
      {step === "high-school" && (
        <HighSchoolStep
          subjects={subjects}
          programs={programs}
          requirements={requirements}
          careers={careers}
          careerEducationLinks={careerEducationLinks}
          institutionByProgramId={institutionByProgramId}
          onBack={() => setStep("start")}
        />
      )}
      {step === "post-secondary" && (
        <PostSecondaryStep
          programs={programs}
          careers={careers}
          categories={categories}
          careerEducationLinks={careerEducationLinks}
          institutionByProgramId={institutionByProgramId}
          onBack={() => setStep("start")}
        />
      )}
    </div>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="mb-8 cursor-pointer text-sm font-bold text-primary-text hover:underline"
    >
      ← Start over
    </button>
  );
}

function StartStep({ onChoose }: { onChoose: (step: Step) => void }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onChoose("high-school")}
        className="cursor-pointer rounded-lg border border-brand/10 p-8 text-left transition-colors duration-200 hover:border-primary"
      >
        <h2 className="text-xl font-bold text-brand">
          I&apos;m a high school student
        </h2>
        <p className="mt-2 text-brand/80">
          Tell us the courses you&apos;ve taken and we&apos;ll show you which
          programs point toward an isotope career.
        </p>
      </button>
      <button
        type="button"
        onClick={() => onChoose("post-secondary")}
        className="cursor-pointer rounded-lg border border-brand/10 p-8 text-left transition-colors duration-200 hover:border-primary"
      >
        <h2 className="text-xl font-bold text-brand">
          I&apos;m in, or have completed, post-secondary
        </h2>
        <p className="mt-2 text-brand/80">
          Select your program or credential and we&apos;ll show you the
          careers it already qualifies you for.
        </p>
      </button>
    </div>
  );
}

function HighSchoolStep({
  subjects,
  programs,
  requirements,
  careers,
  careerEducationLinks,
  institutionByProgramId,
  onBack,
}: {
  subjects: Subject[];
  programs: EducationProgram[];
  requirements: ProgramRequirement[];
  careers: Career[];
  careerEducationLinks: { careerSlug: string; programSlug: string }[];
  institutionByProgramId: Record<string, Institution | undefined>;
  onBack: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return subjects
      .filter((s) => !selectedSet.has(s.id) && s.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, subjects, selectedSet]);

  const selectedSubjects = useMemo(
    () => subjects.filter((s) => selectedSet.has(s.id)),
    [subjects, selectedSet],
  );

  const matches = useMemo(
    () =>
      matchBySubjects(
        selectedIds,
        programs,
        (program) =>
          requirements.filter((r) => r.programId === program.id),
        subjects,
      ),
    [selectedIds, programs, requirements, subjects],
  );

  const fullMatches = matches.filter((m) => m.status === "match");
  const closeMatches = matches.filter((m) => m.status === "close");

  function addSubject(id: number) {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setQuery("");
  }

  function removeSubject(id: number) {
    setSelectedIds((prev) => prev.filter((s) => s !== id));
  }

  function careersFor(programSlug: string) {
    const slugs = careerEducationLinks
      .filter((l) => l.programSlug === programSlug)
      .map((l) => l.careerSlug);
    return careers.filter((c) => slugs.includes(c.slug));
  }

  function ProgramCard({
    program,
    matchedSubjects,
    missingSubjects,
    status,
  }: {
    program: EducationProgram;
    matchedSubjects: Subject[];
    missingSubjects: Subject[];
    status: "match" | "close";
  }) {
    const institution = institutionByProgramId[String(program.id)];
    const leadsTo = careersFor(program.slug);
    return (
      <Link
        href={`/education/${program.slug}`}
        className="rounded-lg border border-brand/10 p-6 hover:border-primary"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-primary-text">
          {levelLabels[program.level] ?? program.level}
        </span>
        <h3 className="mt-2 font-bold text-brand">{program.name}</h3>
        {institution && (
          <p className="mt-1 text-sm text-brand/80">{institution.name}</p>
        )}
        {status === "match" ? (
          <p className="mt-3 text-sm font-bold text-accent-text">
            ✓ You have everything this program typically needs
          </p>
        ) : (
          <p className="mt-3 text-sm text-brand">
            You&apos;re close! Just add{" "}
            <span className="font-bold text-primary-text">
              {missingSubjects.map((s) => s.name).join(", ")}
            </span>{" "}
            to qualify.
          </p>
        )}
        {leadsTo.length > 0 && (
          <p className="mt-3 text-sm text-brand/80">
            Leads to: {leadsTo.map((c) => c.title).join(", ")}
          </p>
        )}
      </Link>
    );
  }

  return (
    <div>
      <BackButton onBack={onBack} />
      <h2 className="text-xl font-bold text-brand">What have you studied?</h2>

      <div className="relative mt-6 max-w-lg">
        <label
          htmlFor="subject-search"
          className="mb-2 block text-sm font-bold text-brand"
        >
          Search subjects or courses you&apos;ve completed
        </label>
        <input
          id="subject-search"
          type="text"
          role="combobox"
          aria-expanded={suggestions.length > 0}
          aria-controls="subject-suggestions"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) {
              e.preventDefault();
              addSubject(suggestions[0].id);
            } else if (e.key === "Escape") {
              setQuery("");
            }
          }}
          placeholder="e.g. Math, Chemistry, Physics..."
          className="w-full rounded-md border border-brand/20 px-4 py-3 text-brand outline-none focus:border-primary"
        />
        {suggestions.length > 0 && (
          <ul
            id="subject-suggestions"
            role="listbox"
            className="absolute z-10 mt-1 w-full rounded-md border border-brand/10 bg-white shadow-lg"
          >
            {suggestions.map((s) => (
              <li key={s.id} role="option" aria-selected="false">
                <button
                  type="button"
                  onClick={() => addSubject(s.id)}
                  className="flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left text-brand hover:bg-primary/10"
                >
                  <span>{s.name}</span>
                  <span className="text-xs uppercase text-brand/80">
                    {s.category}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedSubjects.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedSubjects.map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary-text"
            >
              {s.name}
              <button
                type="button"
                onClick={() => removeSubject(s.id)}
                aria-label={`Remove ${s.name}`}
                className="cursor-pointer text-primary-text/70 hover:text-accent-text"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="mt-12">
        {selectedSubjects.length === 0 && (
          <p className="text-brand/80">
            Add a few subjects above to see which programs fit — and which
            ones are within reach.
          </p>
        )}

        {selectedSubjects.length > 0 && matches.length === 0 && (
          <p className="text-brand/80">
            No programs overlap with what you&apos;ve entered yet. Try adding
            another subject, or{" "}
            <Link
              href="/education"
              className="text-primary-text hover:text-accent-text"
            >
              browse all programs
            </Link>
            .
          </p>
        )}

        {fullMatches.length > 0 && (
          <div className="mb-10">
            <h3 className="mb-4 text-lg font-bold text-brand">
              Programs you qualify for
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {fullMatches.map((m) => (
                <ProgramCard
                  key={m.item.id}
                  program={m.item}
                  matchedSubjects={m.matchedSubjects}
                  missingSubjects={m.missingSubjects}
                  status={m.status}
                />
              ))}
            </div>
          </div>
        )}

        {closeMatches.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-bold text-brand">
              Programs you&apos;re close to
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {closeMatches.map((m) => (
                <ProgramCard
                  key={m.item.id}
                  program={m.item}
                  matchedSubjects={m.matchedSubjects}
                  missingSubjects={m.missingSubjects}
                  status={m.status}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PostSecondaryStep({
  programs,
  careers,
  categories,
  careerEducationLinks,
  institutionByProgramId,
  onBack,
}: {
  programs: EducationProgram[];
  careers: Career[];
  categories: CareerCategory[];
  careerEducationLinks: { careerSlug: string; programSlug: string }[];
  institutionByProgramId: Record<string, Institution | undefined>;
  onBack: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const categoryById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories],
  );

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return programs
      .filter((p) => {
        if (selectedSet.has(p.id)) return false;
        const institution = institutionByProgramId[String(p.id)];
        return (
          p.name.toLowerCase().includes(q) ||
          institution?.name.toLowerCase().includes(q)
        );
      })
      .slice(0, 6);
  }, [query, programs, selectedSet, institutionByProgramId]);

  const selectedPrograms = useMemo(
    () => programs.filter((p) => selectedSet.has(p.id)),
    [programs, selectedSet],
  );

  const matchedCareers = useMemo(() => {
    if (selectedPrograms.length === 0) return [];
    const selectedSlugs = new Set(selectedPrograms.map((p) => p.slug));
    const careerSlugs = new Set(
      careerEducationLinks
        .filter((l) => selectedSlugs.has(l.programSlug))
        .map((l) => l.careerSlug),
    );
    return careers.filter((c) => careerSlugs.has(c.slug));
  }, [selectedPrograms, careerEducationLinks, careers]);

  function addProgram(id: number) {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setQuery("");
  }

  function removeProgram(id: number) {
    setSelectedIds((prev) => prev.filter((p) => p !== id));
  }

  return (
    <div>
      <BackButton onBack={onBack} />
      <h2 className="text-xl font-bold text-brand">
        What program or credential do you have?
      </h2>

      <div className="relative mt-6 max-w-lg">
        <label
          htmlFor="program-search"
          className="mb-2 block text-sm font-bold text-brand"
        >
          Search programs or schools
        </label>
        <input
          id="program-search"
          type="text"
          role="combobox"
          aria-expanded={suggestions.length > 0}
          aria-controls="program-suggestions"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) {
              e.preventDefault();
              addProgram(suggestions[0].id);
            } else if (e.key === "Escape") {
              setQuery("");
            }
          }}
          placeholder="e.g. Nuclear Engineering, McMaster..."
          className="w-full rounded-md border border-brand/20 px-4 py-3 text-brand outline-none focus:border-primary"
        />
        {suggestions.length > 0 && (
          <ul
            id="program-suggestions"
            role="listbox"
            className="absolute z-10 mt-1 w-full rounded-md border border-brand/10 bg-white shadow-lg"
          >
            {suggestions.map((p) => {
              const institution = institutionByProgramId[String(p.id)];
              return (
                <li key={p.id} role="option" aria-selected="false">
                  <button
                    type="button"
                    onClick={() => addProgram(p.id)}
                    className="flex w-full cursor-pointer flex-col px-4 py-2 text-left text-brand hover:bg-primary/10"
                  >
                    <span className="font-medium">{p.name}</span>
                    {institution && (
                      <span className="text-xs text-brand/80">
                        {institution.name}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {selectedPrograms.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedPrograms.map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary-text"
            >
              {p.name}
              <button
                type="button"
                onClick={() => removeProgram(p.id)}
                aria-label={`Remove ${p.name}`}
                className="cursor-pointer text-primary-text/70 hover:text-accent-text"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="mt-12">
        {selectedPrograms.length === 0 && (
          <p className="text-brand/80">
            Add a program or credential above to see which careers it
            qualifies you for.
          </p>
        )}

        {selectedPrograms.length > 0 && matchedCareers.length === 0 && (
          <p className="text-brand/80">
            We don&apos;t have a career mapped to that credential yet. Try{" "}
            <Link
              href="/careers"
              className="text-primary-text hover:text-accent-text"
            >
              browsing all careers
            </Link>{" "}
            instead.
          </p>
        )}

        {matchedCareers.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-bold text-brand">
              Careers you can pursue
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {matchedCareers.map((career) => (
                <Link
                  key={career.id}
                  href={`/careers/${career.slug}`}
                  className="rounded-lg border border-brand/10 p-6 hover:border-primary"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary-text">
                    {categoryById.get(career.categoryId)?.name}
                  </span>
                  <h3 className="mt-2 font-bold text-brand">
                    {career.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand/80">
                    {career.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
