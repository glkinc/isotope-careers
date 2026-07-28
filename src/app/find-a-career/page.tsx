import type { Metadata } from "next";
import {
  getCareerCategories,
  getCareerEducationLinks,
  getCareers,
  getEducationPrograms,
  getInstitution,
  getProgramRequirements,
  getSubjects,
} from "@/data/queries";
import CareerFinderTool from "./CareerFinderTool";

export const metadata: Metadata = {
  title: "Find a Career",
  description:
    "Tell us where you are in school and we'll show you the isotope-industry programs and careers already within reach.",
};

export default async function FindACareerPage() {
  const [subjects, programs, requirements, careers, categories, links] =
    await Promise.all([
      getSubjects(),
      getEducationPrograms(),
      getProgramRequirements(),
      getCareers(),
      getCareerCategories(),
      getCareerEducationLinks(),
    ]);

  const institutions = await Promise.all(
    programs.map((p) => getInstitution(p.institutionId)),
  );
  const institutionByProgramId = new Map(
    programs.map((p, i) => [p.id, institutions[i]]),
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
      <h1 className="max-w-2xl text-4xl">Find a career</h1>
      <p className="mt-4 max-w-xl text-brand/80">
        Most people have never heard of half these careers. Tell us where
        you&apos;re at and we&apos;ll show you what&apos;s already within
        reach.
      </p>

      <div className="mt-10">
        <CareerFinderTool
          subjects={subjects}
          programs={programs}
          requirements={requirements}
          careers={careers}
          categories={categories}
          careerEducationLinks={links}
          institutionByProgramId={Object.fromEntries(institutionByProgramId)}
        />
      </div>
    </div>
  );
}
