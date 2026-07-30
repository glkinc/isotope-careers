import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
      <h1 className="text-3xl font-semibold text-brand">Privacy Policy</h1>
      <p className="mt-4 text-sm text-brand/60">Last updated: July 29, 2026</p>

      <p className="mt-6 text-brand/80">
        Sabertree is an independent, public-facing resource about careers,
        education, and skill paths in Canada&apos;s isotope production and use
        sector. This policy explains what information we collect when you use
        this site and how it&apos;s handled.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">
          Information we collect
        </h2>
        <p className="mt-3 text-brand/80">
          Sabertree does not require an account, and we do not ask you to
          submit personal information to browse careers, education programs,
          or the skill tree tool. The site does not run a quiz, survey, or
          onboarding flow that collects personal details.
        </p>
        <p className="mt-3 text-brand/80">
          Like most websites, our hosting and analytics providers automatically
          receive standard technical information when you visit — such as your
          IP address, browser type, device type, and the pages you view. This
          is used only in aggregate to understand site usage and keep the
          service reliable and secure.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Cookies</h2>
        <p className="mt-3 text-brand/80">
          We don&apos;t use advertising or tracking cookies. Our hosting
          provider may use minimal functional cookies required to serve the
          site reliably.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">
          Third-party links
        </h2>
        <p className="mt-3 text-brand/80">
          Career pages, education program pages, and share buttons link out to
          third-party sites — school and institution websites, employer
          websites, and social platforms. We aren&apos;t responsible for the
          privacy practices of those external sites, so we encourage you to
          review their own policies.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Data retention</h2>
        <p className="mt-3 text-brand/80">
          Since we don&apos;t collect personal information through the site
          itself, there is no personal account data for us to retain or
          delete. Aggregate technical/analytics data is retained only as long
          as needed to operate the site.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Changes</h2>
        <p className="mt-3 text-brand/80">
          If this policy changes, we&apos;ll update this page and revise the
          date above.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand">Contact</h2>
        <p className="mt-3 text-brand/80">
          Questions about this policy can be sent through the contact details
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
