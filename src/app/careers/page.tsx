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
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
      <CareersBrowser
        careers={careers}
        categories={categories}
        initialCategory={category}
      />
    </div>
  );
}
