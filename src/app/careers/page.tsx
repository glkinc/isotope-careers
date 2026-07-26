import Link from "next/link";
import { getCareerCategories, getCareers } from "@/data/queries";

export const metadata = {
  title: "Careers",
};

export default async function CareersPage() {
  const [careers, categories] = await Promise.all([
    getCareers(),
    getCareerCategories(),
  ]);
  const categoryById = new Map(categories.map((c) => [c.id, c]));

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">Careers</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Careers in isotope production and use, across reactor operations,
        radiopharmaceutical sciences, and regulatory & safety.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {careers.map((career) => {
          const category = categoryById.get(career.categoryId);
          return (
            <Link
              key={career.id}
              href={`/careers/${career.slug}`}
              className="rounded-lg border border-slate-200 p-6 hover:border-teal-600"
            >
              {category && (
                <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">
                  {category.name}
                </span>
              )}
              <h2 className="mt-2 font-semibold text-slate-900">
                {career.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{career.summary}</p>
              {career.salaryMin && career.salaryMax && (
                <p className="mt-3 text-sm text-slate-500">
                  ${career.salaryMin.toLocaleString()} – $
                  {career.salaryMax.toLocaleString()} / year (estimate)
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
