"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Career, CareerCategory } from "@/data/types";

type Props = {
  careers: Career[];
  categories: CareerCategory[];
  initialCategory?: string;
};

export default function CareersBrowser({
  careers,
  categories,
  initialCategory,
}: Props) {
  const [query, setQuery] = useState("");
  const [categorySlug, setCategorySlug] = useState(initialCategory ?? "all");

  const categoryById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return careers
      .filter((career) => {
        const category = categoryById.get(career.categoryId);
        const matchesCategory =
          categorySlug === "all" || category?.slug === categorySlug;
        const matchesQuery =
          !q ||
          career.title.toLowerCase().includes(q) ||
          career.summary.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [careers, categoryById, categorySlug, query]);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-brand">Careers</h1>
          <p className="mt-3 max-w-2xl text-brand/80">
            Careers in isotope production and use, across reactor operations,
            radiopharmaceutical sciences, and regulatory & safety.
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
            placeholder="Search careers..."
            aria-label="Search careers"
            className="w-full rounded-md border border-brand/20 py-2.5 pl-9 pr-4 text-brand outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="relative mt-6">
        <div className="scrollbar-none flex gap-2 overflow-x-auto pr-8 pb-1">
          <button
            type="button"
            onClick={() => setCategorySlug("all")}
            className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold whitespace-nowrap transition-colors duration-200 ${
              categorySlug === "all"
                ? "bg-primary-text text-white"
                : "bg-brand/5 text-brand hover:bg-primary/10"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setCategorySlug(category.slug)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold whitespace-nowrap transition-colors duration-200 ${
                categorySlug === category.slug
                  ? "bg-primary-text text-white"
                  : "bg-brand/5 text-brand hover:bg-primary/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-transparent"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-brand/80">
          No careers match your search. Try a different keyword or category.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {filtered.map((career) => {
            const category = categoryById.get(career.categoryId);
            return (
              <Link
                key={career.id}
                href={`/careers/${career.slug}`}
                className="rounded-lg border border-brand/10 p-6 hover:border-primary hover:shadow-[inset_0_0_0_1px_#8570f2]"
              >
                {category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary-text">
                    {category.name}
                  </span>
                )}
                <h2 className="mt-2 font-semibold text-brand">
                  {career.title}
                </h2>
                <p className="mt-2 text-sm text-brand/80">{career.summary}</p>
                {career.salaryMin && career.salaryMax && (
                  <p className="mt-3 text-sm text-brand/80">
                    ${career.salaryMin.toLocaleString()} – $
                    {career.salaryMax.toLocaleString()} / year (estimate)
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
