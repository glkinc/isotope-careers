"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
    return careers.filter((career) => {
      const category = categoryById.get(career.categoryId);
      const matchesCategory =
        categorySlug === "all" || category?.slug === categorySlug;
      const matchesQuery =
        !q ||
        career.title.toLowerCase().includes(q) ||
        career.summary.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [careers, categoryById, categorySlug, query]);

  return (
    <div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search careers..."
          aria-label="Search careers"
          className="w-full max-w-sm rounded-md border border-brand/20 px-4 py-2.5 text-brand outline-none focus:border-primary sm:w-auto"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategorySlug("all")}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold transition-colors duration-200 ${
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
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold transition-colors duration-200 ${
                categorySlug === category.slug
                  ? "bg-primary-text text-white"
                  : "bg-brand/5 text-brand hover:bg-primary/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
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
                className="rounded-lg border border-brand/10 p-6 hover:border-primary"
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
