import type { Metadata } from "next";
import {
  getCareerCategories,
  getCareerRequirements,
  getCareers,
  getSubjects,
} from "@/data/queries";
import PathFinderTool from "./PathFinderTool";

export const metadata: Metadata = {
  title: "Find My Path",
  description:
    "Enter the subjects and courses you've completed to find isotope-industry careers you qualify for, or are close to qualifying for.",
};

export default async function PathFinderPage() {
  const [subjects, careers, requirements, categories] = await Promise.all([
    getSubjects(),
    getCareers(),
    getCareerRequirements(),
    getCareerCategories(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="max-w-2xl text-4xl">Find your path</h1>
      <p className="mt-4 max-w-xl text-brand/70">
        Most people have never heard of half these careers. Tell us what
        you&apos;ve studied and we&apos;ll show you what&apos;s already
        within reach.
      </p>

      <div className="mt-10">
        <PathFinderTool
          subjects={subjects}
          careers={careers}
          requirements={requirements}
          categories={categories}
        />
      </div>
    </div>
  );
}
