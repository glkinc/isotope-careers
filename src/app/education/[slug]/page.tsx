import Link from "next/link";
import { notFound } from "next/navigation";
import { Briefcase, Building2, Clock, ExternalLink, ListChecks } from "lucide-react";
import {
  getCareersForProgram,
  getEducationProgramBySlug,
  getEducationPrograms,
  getInstitution,
  getProgramsForInstitution,
} from "@/data/queries";
import PageActions from "@/components/PageActions";
import OrgLogo from "@/components/OrgLogo";

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

  const [institution, relatedCareers, institutionPrograms] =
    await Promise.all([
      getInstitution(program.institutionId),
      getCareersForProgram(program.slug),
      getProgramsForInstitution(program.institutionId),
    ]);

  const schoolLink = program.programUrl ?? institution?.website ?? null;
  const otherPrograms = institutionPrograms.filter(
    (p) => p.slug !== program.slug,
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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

      <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {program.duration && (
          <div className="rounded-lg bg-[#f6f6f7] p-4">
            <dt className="flex items-center gap-2 text-sm font-semibold text-brand">
              <Clock aria-hidden className="h-4 w-4 text-primary-text" />
              Duration
            </dt>
            <dd className="mt-1 text-sm text-brand/80">{program.duration}</dd>
          </div>
        )}
        {program.requirements && (
          <div className="rounded-lg bg-[#f6f6f7] p-4">
            <dt className="flex items-center gap-2 text-sm font-semibold text-brand">
              <ListChecks aria-hidden className="h-4 w-4 text-primary-text" />
              Requirements
            </dt>
            <dd className="mt-1 text-sm text-brand/80">
              {program.requirements}
            </dd>
          </div>
        )}
      </dl>

      {institution && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-brand">
            <Building2 aria-hidden className="h-5 w-5 text-primary-text" />
            School
          </h2>
          <div className="mt-3 flex items-start gap-4 rounded-lg bg-[#f6f6f7] p-4">
            <OrgLogo
              name={institution.name}
              website={institution.website}
              className="h-12 w-12 shrink-0 rounded-md"
            />
            <div>
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
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary-text hover:underline"
                >
                  View this program at {institution.name}
                  <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {otherPrograms.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-brand">
                Other programs at {institution.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {otherPrograms.map((p) => (
                  <Link
                    key={p.id}
                    href={`/education/${p.slug}`}
                    className="rounded-md border border-brand/10 bg-white px-4 py-2 text-sm text-brand/80 transition-colors duration-200 hover:border-primary-text hover:bg-primary-text hover:text-white"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {relatedCareers.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-brand">
            <Briefcase aria-hidden className="h-5 w-5 text-primary-text" />
            Careers this leads to
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {relatedCareers.map((career) => (
              <Link
                key={career.id}
                href={`/careers/${career.slug}`}
                className="rounded-md border border-brand/10 bg-white px-4 py-2 text-sm text-brand/80 transition-colors duration-200 hover:border-primary-text hover:bg-primary-text hover:text-white"
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
