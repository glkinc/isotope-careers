import {
  getCareerEducationLinks,
  getCareers,
  getEducationPrograms,
  getInstitution,
} from "@/data/queries";
import ProgramsBrowser from "./ProgramsBrowser";

export const metadata = {
  title: "Education",
};

export default async function EducationPage() {
  const [programs, careers, careerEducationLinks] = await Promise.all([
    getEducationPrograms(),
    getCareers(),
    getCareerEducationLinks(),
  ]);

  const institutions = await Promise.all(
    programs.map((p) => getInstitution(p.institutionId)),
  );
  const institutionsById = Object.fromEntries(
    programs.map((p, i) => [p.institutionId, institutions[i]]),
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-brand">Education</h1>
      <p className="mt-3 max-w-2xl text-brand/80">
        Programs that prepare you for careers in isotope production and use,
        from technical diplomas to graduate specializations.
      </p>

      <ProgramsBrowser
        programs={programs}
        institutionsById={institutionsById}
        careers={careers}
        careerEducationLinks={careerEducationLinks}
      />
    </div>
  );
}
