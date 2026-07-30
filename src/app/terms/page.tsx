import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
      <h1 className="text-3xl font-semibold text-brand">Terms of Service</h1>
      <p className="mt-4 text-sm text-brand/60">Last updated: July 29, 2026</p>

      <p className="mt-6 text-brand/80">
        These terms govern your use of Sabertree, an independent resource
        about careers, education paths, and skills for Canada&apos;s nuclear
        and medical isotope workforce. By using this site, you agree to the
        terms below.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">
          Independent resource
        </h2>
        <p className="mt-3 text-brand/80">
          Sabertree is not affiliated with any specific employer, reactor
          operator, educational institution, or regulator. References to
          organizations — including employers, schools, and licensing bodies —
          are for informational purposes only and do not imply endorsement or
          partnership.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">
          No professional or career guarantee
        </h2>
        <p className="mt-3 text-brand/80">
          Career descriptions, salary estimates, education requirements, and
          skill paths are provided for general guidance only. They are based
          on publicly available information and are not guaranteed to be
          complete, current, or accurate for any specific employer, program,
          or region. Salary figures are estimates and actual compensation
          varies by employer, location, and experience.
        </p>
        <p className="mt-3 text-brand/80">
          Nothing on this site constitutes career, financial, legal, or
          educational advice, and using it does not guarantee admission to any
          program or employment in any role.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Third-party sites</h2>
        <p className="mt-3 text-brand/80">
          This site links to institution and employer websites and to
          third-party social platforms. We don&apos;t control and aren&apos;t
          responsible for the content, accuracy, or availability of those
          external sites.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Acceptable use</h2>
        <p className="mt-3 text-brand/80">
          You agree not to misuse the site — including attempting to disrupt
          its operation, scraping content for republication without
          permission, or using it in any way that violates applicable law.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">
          Content and availability
        </h2>
        <p className="mt-3 text-brand/80">
          We may update, correct, or remove content at any time without
          notice, and we don&apos;t guarantee the site will be available
          uninterrupted or error-free.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">
          Limitation of liability
        </h2>
        <p className="mt-3 text-brand/80">
          Sabertree is provided &quot;as is,&quot; without warranties of any
          kind. To the fullest extent permitted by law, we are not liable for
          any damages arising from your use of, or reliance on, this site or
          its content.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Changes to these terms</h2>
        <p className="mt-3 text-brand/80">
          We may revise these terms from time to time. Continued use of the
          site after changes are posted means you accept the updated terms.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Contact</h2>
        <p className="mt-3 text-brand/80">
          Questions about these terms can be sent through the contact details
          listed on our{" "}
          <Link href="/about" className="text-primary-text underline">
            About
          </Link>{" "}
          page.
        </p>
      </section>
    </div>
  );
}
