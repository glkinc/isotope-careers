export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
      <h1 className="text-3xl font-semibold text-brand">
        About Sabertree
      </h1>

      <div className="border border-brand/10 bg-primary/8 mx-auto max-w-6xl p-6 mt-8 md:mx-5 lg:mx-auto rounded-xl">
        <h2 className="text-2xl font-semibold text-brand">
          Our Mission
        </h2>
        <p className="mt-4 text-brand/80">
          Our mission is to strengthen Canada's nuclear and medical isotope workforce by connecting people with meaningful career pathways, educational opportunities, and industry resources. We empower students, professionals, and individuals who want a career change to develop the skills needed to support Canada's leadership in nuclear innovation, healthcare, clean energy, and life-saving medical isotope production for generations to come. 
        </p>
        <p className="mt-4 text-brand/80">
          This site is an independent resource and is not affiliated with any
          specific employer, reactor operator, or regulator.
        </p>
      </div>

      <p className="mt-6 text-brand/80">
        Canada is a world leader in isotope production, with Ontario playing a key role in advancing healthcare, scientific research, and clean energy innovation. Recent investments, including Ontario's support for expanded isotope production, are strengthening the province's position as a global hub for life-saving nuclear technologies and supporting the continued growth of Canada's nuclear and energy sectors.
      </p>
      <p className="mt-6 text-brand/80">
        Careers in isotopes span the entire industry, from scientists and engineers who develop and produce isotopes to healthcare professionals who use them to diagnose and treat disease. Researchers, medical physicists, nuclear medicine technologists, pharmacists, and radiation safety specialists all contribute to improving patient care. The sector also relies on professionals in energy production, logistics, manufacturing, quality assurance, and supply-chain management to safely transport materials and support Canada's clean energy infrastructure.
      </p>
      <p className="mt-6 text-brand/80">
        Our workforce platform was created to help connect students, job seekers, and professionals with opportunities across Canada's growing isotope industry. By providing career pathways, educational resources, and information about the diverse roles that support isotope production, healthcare, and energy, the platform aims to make these careers more accessible and help build the skilled workforce needed to support Ontario's and Canada's future.
      </p>
    </div>
  );
}
