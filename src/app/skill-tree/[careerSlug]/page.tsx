import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCareerBySlug,
  getCareers,
  getSkillTreeForCareer,
} from "@/data/queries";
import type { SkillTreeNode } from "@/data/types";

export async function generateStaticParams() {
  const careers = await getCareers();
  return careers.map((career) => ({ careerSlug: career.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ careerSlug: string }>;
}) {
  const { careerSlug } = await params;
  const career = await getCareerBySlug(careerSlug);
  return { title: career ? `${career.title} skill tree` : "Skill tree not found" };
}

export default async function SkillTreePage({
  params,
}: {
  params: Promise<{ careerSlug: string }>;
}) {
  const { careerSlug } = await params;
  const career = await getCareerBySlug(careerSlug);
  if (!career) notFound();

  const nodes = await getSkillTreeForCareer(career.id);
  const tiers = groupByTier(nodes);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href={`/careers/${career.slug}`}
        className="text-sm font-medium text-teal-600 hover:underline"
      >
        ← Back to {career.title}
      </Link>
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">
        Skill tree: {career.title}
      </h1>
      <p className="mt-3 text-slate-600">
        A step-by-step path from foundational education to this role.
      </p>

      {tiers.length === 0 ? (
        <p className="mt-10 text-slate-500">
          A skill tree for this career hasn&apos;t been added yet.
        </p>
      ) : (
        <ol className="mt-10 space-y-6">
          {tiers.map(([tier, tierNodes]) => (
            <li key={tier} className="relative pl-8">
              <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
                {tier}
              </span>
              {tier < tiers.length && (
                <span
                  aria-hidden
                  className="absolute left-3 top-7 h-full w-px bg-slate-200"
                />
              )}
              <div className="space-y-3">
                {tierNodes.map((node) => (
                  <div
                    key={node.id}
                    className="rounded-lg border border-slate-200 p-4"
                  >
                    <h2 className="font-semibold text-slate-900">
                      {node.title}
                    </h2>
                    {node.description && (
                      <p className="mt-1 text-sm text-slate-600">
                        {node.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function groupByTier(nodes: SkillTreeNode[]): [number, SkillTreeNode[]][] {
  const map = new Map<number, SkillTreeNode[]>();
  for (const node of nodes) {
    const list = map.get(node.tier) ?? [];
    list.push(node);
    map.set(node.tier, list);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a - b);
}
