import Link from "next/link";
import { getCareerCategories, getCareers } from "@/data/queries";
import Button from "@/components/Button";

export default async function HomePage() {
  const [categories, careers] = await Promise.all([
    getCareerCategories(),
    getCareers(),
  ]);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          Build a career in isotope production and use.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-brand/80">
          A guide to the careers, education paths, and skills behind Canada&apos;s
          medical and industrial isotope industry — from reactor operations to
          radiopharmaceutical chemistry.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/path-finder" variant="solid">
            Find my path
          </Button>
          <Button href="/careers" variant="outline">
            Explore all careers
          </Button>
        </div>
      </section>

      <section className="border-t border-brand/10 bg-[#f1f1f1]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-xl font-semibold text-brand">
            Career areas
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg border border-brand/10 bg-white p-6"
              >
                <h3 className="font-semibold text-brand">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-brand/80">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-xl font-semibold text-brand">
          Featured careers
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {careers.slice(0, 4).map((career) => (
            <Link
              key={career.id}
              href={`/careers/${career.slug}`}
              className="rounded-lg border border-brand/10 p-6 hover:border-primary"
            >
              <h3 className="font-semibold text-brand">{career.title}</h3>
              <p className="mt-2 text-sm text-brand/80">{career.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
