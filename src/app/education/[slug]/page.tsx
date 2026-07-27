import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCareersForProgram,
  getEducationProgramBySlug,
  getEducationPrograms,
  getInstitution,
} from "@/data/queries";
import PageActions from "@/components/PageActions";

const levelLabels: Record<string, string> = {
  high_school: "High School",
  certificate: "Certificate",
  diploma: "Diploma",
  undergraduate: "Undergraduate",
  graduate: "Graduate",
};

export async function generateStaticParams() {
  const programs = await getEducationPrograms();
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getEducationProgramBySlug(slug);
  return { title: program?.name ?? "Program not found" };
}

export default async function EducationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getEducationProgramBySlug(slug);
  if (!program) notFound();

  const [institution, relatedCareers] = await Promise.all([
    getInstitution(program.institutionId),
    getCareersForProgram(program.slug),
  ]);

  const schoolLink = program.programUrl ?? institution?.website ?? null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-primary-text">
            {levelLabels[program.level] ?? program.level}
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-brand">
            {program.name}
          </h1>
        </div>
        <PageActions title={program.name} />
      </div>
      {institution && (
        <p className="mt-2 text-brand/80">
          {institution.name}
          {institution.city ? ` — ${institution.city}, ${institution.province}` : ""}
        </p>
      )}
      <p className="mt-4 text-lg text-brand/80">{program.description}</p>

      <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
        {program.duration && (
          <div>
            <dt className="font-semibold text-brand">Duration</dt>
            <dd className="mt-1 text-brand/80">{program.duration}</dd>
          </div>
        )}
        {program.requirements && (
          <div>
            <dt className="font-semibold text-brand">Requirements</dt>
            <dd className="mt-1 text-brand/80">{program.requirements}</dd>
          </div>
        )}
      </dl>

      {institution && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-brand">School</h2>
          <div className="mt-3 rounded-lg border border-brand/10 p-4">
            <p className="font-semibold text-brand">{institution.name}</p>
            {institution.city && (
              <p className="mt-1 text-sm text-brand/80">
                {institution.city}, {institution.province}
              </p>
            )}
            {schoolLink && (
              <a
                href={schoolLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-bold text-primary-text hover:underline"
              >
                View this program at {institution.name} →
              </a>
            )}
          </div>
        </section>
      )}

      {relatedCareers.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-brand">
            Careers this leads to
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {relatedCareers.map((career) => (
              <Link
                key={career.id}
                href={`/careers/${career.slug}`}
                className="rounded-md border border-brand/10 px-4 py-2 text-sm text-brand/80 hover:border-primary hover:text-accent-text"
              >
                {career.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
