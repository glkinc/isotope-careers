import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getCareersForCompany, getCompanies } from "@/data/queries";
import OrgLogo from "@/components/OrgLogo";

export const metadata = {
  title: "Employers",
};

export default async function EmployersPage() {
  const companies = await getCompanies();
  const careersByCompanyId = Object.fromEntries(
    await Promise.all(
      companies.map(
        async (company) =>
          [company.id, await getCareersForCompany(company.id)] as const,
      ),
    ),
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
      <h1 className="text-3xl font-semibold text-brand">Employers</h1>
      <p className="mt-3 max-w-2xl text-brand/80">
        A look at organizations across Canada that operate in the isotope
        production and use space — reactor operators, radiopharmaceutical
        companies, regulators, hospitals, and more. Sabertree isn&apos;t
        endorsed by or affiliated with any of them; this is simply here to
        show the breadth of who hires into this field.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => {
          const relatedCareers = careersByCompanyId[company.id] ?? [];
          return (
            <div
              key={company.id}
              className="flex flex-col gap-3 rounded-lg border border-brand/10 p-5"
            >
              <div className="flex items-center gap-3">
                <OrgLogo
                  name={company.name}
                  website={company.website}
                  className="h-10 w-10 shrink-0 rounded-md"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-brand">
                    {company.name}
                  </p>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary-text hover:underline"
                    >
                      Visit website
                      <ExternalLink aria-hidden className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              {relatedCareers.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {relatedCareers.map((career) => (
                    <Link
                      key={career.id}
                      href={`/careers/${career.slug}`}
                      className="rounded-md bg-[#f6f6f7] px-3 py-1.5 text-xs font-semibold text-brand/80 transition-colors duration-200 hover:bg-primary-text hover:text-white"
                    >
                      {career.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
