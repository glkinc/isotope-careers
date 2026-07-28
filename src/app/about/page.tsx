export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
      <h1 className="text-3xl font-semibold text-brand">
        Our Mission
      </h1>
      <p className="mt-6 text-brand/80">
        Our mission is to strengthen Canada's nuclear and medical isotope workforce by connecting people with meaningful career pathways, educational opportunities, and industry resources. We empower students, professionals, and individuals who want a career change to develop the skills needed to support Canada's leadership in nuclear innovation, healthcare, clean energy, and life-saving medical isotope production for generations to come. 
      </p>
      <p className="mt-4 text-brand/80">
        This site is an independent resource and is not affiliated with any
        specific employer, reactor operator, or regulator.
      </p>
    </div>
  );
}
