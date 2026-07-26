import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCareerBySlug,
  getCareerCategory,
  getCareers,
  getProgramsForCareer,
  getSkillTreeForCareer,
} from "@/data/queries";

export async function generateStaticParams() {
  const careers = await getCareers();
  return careers.map((career) => ({ slug: career.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);
  return { title: career?.title ?? "Career not found" };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);
  if (!career) notFound();

  const [category, programs, skillTree] = await Promise.all([
    getCareerCategory(career.categoryId),
    getProgramsForCareer(career.slug),
    getSkillTreeForCareer(career.id),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {category && (
        <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">
          {category.name}
        </span>
      )}
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">
        {career.title}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{career.description}</p>

      {career.salaryMin && career.salaryMax && (
        <p className="mt-4 text-sm text-slate-500">
          Estimated salary range: ${career.salaryMin.toLocaleString()} – $
          {career.salaryMax.toLocaleString()} / year
        </p>
      )}

      {career.responsibilities.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Responsibilities
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
            {career.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {career.dayToDay && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Day to day
          </h2>
          <p className="mt-3 text-slate-600">{career.dayToDay}</p>
        </section>
      )}

      {programs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Education paths
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {programs.map((program) => (
              <Link
                key={program.id}
                href={`/education/${program.slug}`}
                className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-teal-600 hover:text-teal-600"
              >
                {program.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {skillTree.length > 0 && (
        <section className="mt-10">
          <Link
            href={`/skill-tree/${career.slug}`}
            className="inline-block rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-700"
          >
            View skill tree →
          </Link>
        </section>
      )}
    </div>
  );
}
