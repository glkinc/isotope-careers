import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCareerBySlug,
  getCareerCategory,
  getCareers,
  getProgramsForCareer,
  getSkillTreeForCareer,
} from "@/data/queries";
import Button from "@/components/Button";
import PageActions from "@/components/PageActions";

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
      <div className="flex items-start justify-between gap-4">
        <div>
          {category && (
            <span className="text-xs font-semibold uppercase tracking-wide text-primary-text">
              {category.name}
            </span>
          )}
          <h1 className="mt-2 text-3xl font-semibold text-brand">
            {career.title}
          </h1>
        </div>
        <PageActions title={career.title} />
      </div>
      <p className="mt-4 text-lg text-brand/80">{career.description}</p>

      {career.salaryMin && career.salaryMax && (
        <p className="mt-4 text-sm text-brand/80">
          Estimated salary range: ${career.salaryMin.toLocaleString()} – $
          {career.salaryMax.toLocaleString()} / year
        </p>
      )}

      {career.responsibilities.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-brand">
            Responsibilities
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-brand/80">
            {career.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {career.dayToDay && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-brand">
            Day to day
          </h2>
          <p className="mt-3 text-brand/80">{career.dayToDay}</p>
        </section>
      )}

      {programs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-brand">
            Education paths
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {programs.map((program) => (
              <Link
                key={program.id}
                href={`/education/${program.slug}`}
                className="rounded-md border border-brand/10 px-4 py-2 text-sm text-brand/80 hover:border-primary hover:text-accent-text"
              >
                {program.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {skillTree.length > 0 && (
        <section className="mt-10">
          <Button href={`/skill-tree/${career.slug}`}>View skill tree</Button>
        </section>
      )}
    </div>
  );
}
