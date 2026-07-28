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
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
      <ProgramsBrowser
        programs={programs}
        institutionsById={institutionsById}
        careers={careers}
        careerEducationLinks={careerEducationLinks}
      />
    </div>
  );
}
