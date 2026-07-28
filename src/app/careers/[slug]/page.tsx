import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Briefcase,
  CalendarClock,
  ClipboardList,
  DollarSign,
  GraduationCap,
} from "lucide-react";
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
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#f6f6f7] p-4 text-sm text-brand/80">
          <DollarSign aria-hidden className="h-4 w-4 shrink-0 text-primary-text" />
          Estimated salary range: ${career.salaryMin.toLocaleString()} – $
          {career.salaryMax.toLocaleString()} / year
        </div>
      )}

      {career.responsibilities.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-brand">
            <ClipboardList aria-hidden className="h-5 w-5 text-primary-text" />
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
          <h2 className="flex items-center gap-2 text-lg font-semibold text-brand">
            <CalendarClock aria-hidden className="h-5 w-5 text-primary-text" />
            Day to day
          </h2>
          <p className="mt-3 text-brand/80">{career.dayToDay}</p>
        </section>
      )}

      {career.topEmployers.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-brand">
            <Briefcase aria-hidden className="h-5 w-5 text-primary-text" />
            Top employers
          </h2>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {career.topEmployers.map((employer) => (
              <li
                key={employer}
                className="rounded-md bg-[#f6f6f7] px-4 py-2.5 text-sm text-brand/80"
              >
                {employer}
              </li>
            ))}
          </ul>
        </section>
      )}

      {programs.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-brand">
            <GraduationCap aria-hidden className="h-5 w-5 text-primary-text" />
            Education paths
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {programs.map((program) => (
              <Link
                key={program.id}
                href={`/education/${program.slug}`}
                className="rounded-md border border-brand/10 bg-white px-4 py-2 text-sm text-brand/80 transition-colors duration-200 hover:border-primary-text hover:bg-primary-text hover:text-white"
              >
                {program.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {skillTree.length > 0 && (
        <section className="mt-10">
          <Button
            href={`/skill-tree/${career.slug}`}
            className="w-full justify-between sm:w-auto sm:justify-start"
          >
            View skill tree
          </Button>
        </section>
      )}
    </div>
  );
}
