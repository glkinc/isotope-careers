import Link from "next/link";
import { getCareerCategories, getCareers } from "@/data/queries";

export default async function HomePage() {
  const [categories, careers] = await Promise.all([
    getCareerCategories(),
    getCareers(),
  ]);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Build a career in isotope production and use.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate-600">
          A guide to the careers, education paths, and skills behind Canada&apos;s
          medical and industrial isotope industry — from reactor operations to
          radiopharmaceutical chemistry.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/careers"
            className="rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-700"
          >
            Explore careers
          </Link>
          <Link
            href="/education"
            className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-teal-600 hover:text-teal-600"
          >
            Explore education paths
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-xl font-semibold text-slate-900">
            Career areas
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                <h3 className="font-semibold text-slate-900">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-xl font-semibold text-slate-900">
          Featured careers
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {careers.slice(0, 4).map((career) => (
            <Link
              key={career.id}
              href={`/careers/${career.slug}`}
              className="rounded-lg border border-slate-200 p-6 hover:border-teal-600"
            >
              <h3 className="font-semibold text-slate-900">{career.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{career.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
