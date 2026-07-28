import Link from "next/link";
import Image from "next/image";
import { Compass, ListChecks, MapPinned, Sparkles } from "lucide-react";
import { getCareerCategories } from "@/data/queries";
import Button from "@/components/Button";

const steps = [
  {
    icon: MapPinned,
    title: "Tell us where you're at",
    description:
      "A high school student, or already in (or done with) post-secondary — either way, we start from what you've actually got.",
  },
  {
    icon: Sparkles,
    title: "We match you to what's real",
    description:
      "High school courses point you to programs; a program or credential points you to careers you can walk into.",
  },
  {
    icon: ListChecks,
    title: "See exactly what's missing",
    description:
      "Close but not quite there? We'll tell you precisely what to add to qualify.",
  },
];

export default async function HomePage() {
  const categories = await getCareerCategories();

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
          <div className="max-w-2xl lg:pr-24">
            <h1 className="text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
              Build a career in isotope production and use.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brand/80">
              A guide to the careers, education paths, and skills behind
              Canada&apos;s medical and industrial isotope industry — from
              reactor operations to radiopharmaceutical chemistry.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                href="/find-a-career"
                variant="solid"
                className="w-full justify-between sm:w-auto sm:justify-start"
              >
                Find a career
              </Button>
              <Button
                href="/careers"
                variant="outline"
                className="w-full justify-between sm:w-auto sm:justify-start"
              >
                Explore all careers
              </Button>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute top-6 right-12 hidden flex-col items-end opacity-90 lg:flex"
        >
          <Image
            src="/chevrons.svg"
            alt=""
            width={209}
            height={305}
            className="animate-chevron-in"
            style={{ animationDelay: "150ms" }}
          />
          <Image
            src="/chevrons.svg"
            alt=""
            width={209}
            height={305}
            className="animate-chevron-in -mt-10"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </section>

      <section className="border-t border-brand/10 bg-[#f1f1f1]">
        <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
          <div className="flex items-center gap-2">
            <Compass aria-hidden className="h-6 w-6 text-primary-text" />
            <h2 className="text-xl font-semibold text-brand">Career areas</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/careers?category=${category.slug}`}
                className="group rounded-lg border border-brand/10 bg-white p-6 transition-colors duration-200 hover:border-primary hover:shadow-[inset_0_0_0_1px_#8570f2]"
              >
                <h3 className="font-semibold text-brand">{category.name}</h3>
                <p className="mt-2 text-sm text-brand/80">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-text">
                  See careers
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
        <h2 className="text-xl font-semibold text-brand">How it works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-lg border border-brand/10 bg-[#f6f6f7] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-text text-white">
                  <step.icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-primary-text">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-brand">{step.title}</h3>
              <p className="mt-2 text-sm text-brand/80">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button
            href="/find-a-career"
            variant="solid"
            className="w-full justify-between sm:w-auto sm:justify-start"
          >
            Find a career
          </Button>
        </div>
      </section>
    </div>
  );
}
