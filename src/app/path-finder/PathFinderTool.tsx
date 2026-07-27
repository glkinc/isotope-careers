"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  Career,
  CareerCategory,
  CareerRequirement,
  Subject,
} from "@/data/types";
import { matchCareers } from "@/lib/pathfinder";

type Props = {
  subjects: Subject[];
  careers: Career[];
  requirements: CareerRequirement[];
  categories: CareerCategory[];
};

export default function PathFinderTool({
  subjects,
  careers,
  requirements,
  categories,
}: Props) {
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
    return subjects
      .filter((s) => !selectedSet.has(s.id) && s.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, subjects, selectedSet]);

  const selectedSubjects = useMemo(
    () => subjects.filter((s) => selectedSet.has(s.id)),
    [subjects, selectedSet],
  );

  const matches = useMemo(
    () => matchCareers(selectedIds, careers, requirements, subjects),
    [selectedIds, careers, requirements, subjects],
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && suggestions.length > 0) {
      e.preventDefault();
      addSubject(suggestions[0].id);
    } else if (e.key === "Escape") {
      setQuery("");
    }
  }

  return (
    <div>
      <div className="relative max-w-lg">
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
          onKeyDown={handleKeyDown}
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
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-brand hover:bg-primary/10"
                >
                  <span>{s.name}</span>
                  <span className="text-xs uppercase text-brand/50">
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
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary"
            >
              {s.name}
              <button
                type="button"
                onClick={() => removeSubject(s.id)}
                aria-label={`Remove ${s.name}`}
                className="text-primary/70 hover:text-accent"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="mt-12">
        {selectedSubjects.length === 0 && (
          <p className="text-brand/70">
            Add a few subjects above to see which isotope careers fit — and
            which ones are within reach.
          </p>
        )}

        {selectedSubjects.length > 0 && matches.length === 0 && (
          <p className="text-brand/70">
            No careers overlap with what you&apos;ve entered yet. Try adding
            another subject, or{" "}
            <Link href="/careers" className="text-primary hover:text-accent">
              browse all careers
            </Link>
            .
          </p>
        )}

        {fullMatches.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-brand">
              You qualify for
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {fullMatches.map((m) => (
                <Link
                  key={m.career.id}
                  href={`/careers/${m.career.slug}`}
                  className="rounded-lg border border-brand/10 p-6 hover:border-primary"
                >
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">
                    {categoryById.get(m.career.categoryId)?.name}
                  </p>
                  <h3 className="font-bold text-brand">{m.career.title}</h3>
                  <p className="mt-2 text-sm text-brand/70">
                    {m.career.summary}
                  </p>
                  <p className="mt-3 text-sm font-bold text-accent">
                    ✓ You have everything this career typically needs
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {closeMatches.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-bold text-brand">
              You&apos;re close
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {closeMatches.map((m) => (
                <Link
                  key={m.career.id}
                  href={`/careers/${m.career.slug}`}
                  className="rounded-lg border border-brand/10 p-6 hover:border-primary"
                >
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">
                    {categoryById.get(m.career.categoryId)?.name}
                  </p>
                  <h3 className="font-bold text-brand">{m.career.title}</h3>
                  <p className="mt-2 text-sm text-brand/70">
                    {m.career.summary}
                  </p>
                  <p className="mt-3 text-sm text-brand">
                    You&apos;re close! Just add{" "}
                    <span className="font-bold text-primary">
                      {m.missingSubjects.map((s) => s.name).join(", ")}
                    </span>{" "}
                    to qualify.
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
