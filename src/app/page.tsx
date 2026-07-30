import Link from "next/link";
import { Info, Sprout, ListChecks, MapPinned, Sparkles, BriefcaseBusiness } from "lucide-react";
import { getCareerCategories } from "@/data/queries";
import Button from "@/components/Button";
import Pill from "@/components/Pill";

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
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(181,166,247,0.60), rgba(181,166,247,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-12 sm:py-30">
          <div className="max-w-2xl text-center mx-auto">
            <Pill icon={BriefcaseBusiness}>Over 20 career opportunities</Pill>
            
            <h1 className="text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
              Build a career in isotope production and use.
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-lg text-brand/80">
              A guide to the careers, education paths, and skills behind
              Canada&apos;s medical and industrial isotope industry, from
              reactor operations to radiopharmaceutical chemistry.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
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
      </section>

      <section className="border border-brand/10 bg-primary/8 mx-auto max-w-6xl md:mx-5 lg:mx-auto md:rounded-xl">
        <div className="px-6 py-10 sm:py-16 lg:px-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Pill icon={Sprout}>Opportunites Await</Pill>
              <h2 className="text-3xl font-semibold text-brand sm:text-5xl">Why work with isotope production?</h2>
              <p className="mt-6 max-w-xl text-lg text-brand/80">
                Canada has spent 70+ years building a global reputation in isotope production — and it&apos;s entering a new growth phase. With a national Radioisotope Strategy now underway, the sector is expanding across reactors, accelerators, and production facilities nationwide, creating demand for technologists, engineers, physicists, and skilled trades. Now is the time to build a career at the center of one of Canada&apos;s fastest-growing industries.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-center">
              <div className="rounded-2xl border border-primary/15 flex-col content-center bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <p className="text-3xl font-bold text-primary-text">8,500+</p>
                <p className="mt-2 text-sm text-gray-500">jobs in Canada&apos;s medical isotope sector</p>
              </div>
              <div className="rounded-2xl border border-primary/15 flex-col content-center bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <p className="text-3xl font-bold text-primary-text">70+ years</p>
                <p className="mt-2 text-sm text-gray-500">as a global isotope leader</p>
              </div>
              <div className="rounded-2xl border border-primary/15 flex-col content-center bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <p className="text-3xl font-bold text-primary-text">$770B CAD</p>
                <p className="mt-2 text-sm text-gray-500">in GDP supported by isotope-reliant industries</p>
              </div>
              <div className="rounded-2xl border border-primary/15 flex-col content-center bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <p className="text-3xl font-bold text-primary-text">10%</p>
                <p className="mt-2 text-sm text-gray-500">targeted growth in global market share</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(181,166,247,0.60), rgba(181,166,247,0) 70%)",
          }}
        />
        <div className="relative mx-auto px-6 py-12 sm:py-30">
          <div className=" text-center mx-auto">
            <Pill icon={Info}>How it works</Pill>
            
            <h2 className="text-6xl font-semibold max-w-xl mx-auto tracking-tight text-brand sm:text-5xl">
              Three Simple Steps To Get Started 
            </h2>
            
            <div className="mt-6 grid gap-6 max-w-6xl mx-auto text-left sm:grid-cols-3">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="relative flex gap-4 rounded-lg border border-brand/10 bg-primary/8 p-6"
                >
                  <span className="shrink-0 text-6xl font-bold text-primary-text">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand">{step.title}</h3>
                    <p className="mt-1 text-sm text-brand/80">{step.description}</p>
                  </div>
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
          </div>
        </div>
      </section>
    </div>
  );
}
