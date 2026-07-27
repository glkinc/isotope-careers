import { getCareerCategories, getCareers } from "@/data/queries";
import CareersBrowser from "./CareersBrowser";

export const metadata = {
  title: "Careers",
};

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [careers, categories] = await Promise.all([
    getCareers(),
    getCareerCategories(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-brand">Careers</h1>
      <p className="mt-3 max-w-2xl text-brand/80">
        Careers in isotope production and use, across reactor operations,
        radiopharmaceutical sciences, and regulatory & safety.
      </p>

      <CareersBrowser
        careers={careers}
        categories={categories}
        initialCategory={category}
      />
    </div>
  );
}
