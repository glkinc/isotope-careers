import Link from "next/link";
import { getEducationPrograms, getInstitution } from "@/data/queries";

export const metadata = {
  title: "Education",
};

const levelLabels: Record<string, string> = {
  high_school: "High School",
  certificate: "Certificate",
  diploma: "Diploma",
  undergraduate: "Undergraduate",
  graduate: "Graduate",
};

export default async function EducationPage() {
  const programs = await getEducationPrograms();
  const withInstitutions = await Promise.all(
    programs.map(async (program) => ({
      program,
      institution: await getInstitution(program.institutionId),
    })),
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-brand">Education</h1>
      <p className="mt-3 max-w-2xl text-brand/80">
        Programs that prepare you for careers in isotope production and use,
        from technical diplomas to graduate specializations.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {withInstitutions.map(({ program, institution }) => (
          <Link
            key={program.id}
            href={`/education/${program.slug}`}
            className="rounded-lg border border-brand/10 p-6 hover:border-primary"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-primary-text">
              {levelLabels[program.level] ?? program.level}
            </span>
            <h2 className="mt-2 font-semibold text-brand">
              {program.name}
            </h2>
            {institution && (
              <p className="mt-1 text-sm text-brand/80">
                {institution.name}
                {institution.city ? ` — ${institution.city}, ${institution.province}` : ""}
              </p>
            )}
            <p className="mt-2 text-sm text-brand/80">{program.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
