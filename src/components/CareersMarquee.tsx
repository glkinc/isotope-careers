import Link from "next/link";

type MarqueeCareer = { slug: string; title: string };

export default function CareersMarquee({
  careers,
}: {
  careers: MarqueeCareer[];
}) {
  if (careers.length === 0) return null;

  // Rendered twice back-to-back so the track can loop seamlessly at -50%.
  const track = [...careers, ...careers];

  return (
    <div className="relative overflow-hidden">
      <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
        {track.map((career, i) => {
          const isDuplicate = i >= careers.length;
          return (
            <Link
              key={`${career.slug}-${i}`}
              href={`/careers/${career.slug}`}
              aria-hidden={isDuplicate ? true : undefined}
              tabIndex={isDuplicate ? -1 : 0}
              className="shrink-0 rounded-full border border-brand/10 bg-white px-4 py-2 text-sm font-bold whitespace-nowrap text-brand shadow-sm transition-colors duration-200 hover:border-primary hover:text-primary-text hover:shadow-[inset_0_0_0_1px_#8570f2]"
            >
              {career.title}
            </Link>
          );
        })}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent sm:w-24 lg:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent sm:w-24 lg:w-40"
      />
    </div>
  );
}
