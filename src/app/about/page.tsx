export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">
        About Isotope Careers Canada
      </h1>
      <p className="mt-6 text-slate-600">
        Isotope Careers Canada is a guide to the career paths, education
        requirements, and skills involved in producing and using isotopes for
        medical, industrial, and research purposes in Canada — from operating
        the reactors that produce isotopes, to the chemistry that turns them
        into radiopharmaceuticals, to the safety and logistics work that keeps
        the whole chain compliant and on schedule.
      </p>
      <p className="mt-4 text-slate-600">
        This site is an independent resource and is not affiliated with any
        specific employer, reactor operator, or regulator.
      </p>
    </div>
  );
}
