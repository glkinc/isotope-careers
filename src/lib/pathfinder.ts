import type { Subject } from "@/data/types";

export type SubjectMatch<T> = {
  item: T;
  requiredSubjects: Subject[];
  matchedSubjects: Subject[];
  missingSubjects: Subject[];
  status: "match" | "close";
};

type Requirement = { subjectId: number };

// Compares a user's completed subjects against each item's (career or
// program) requirements. Items with zero overlap are dropped entirely - the
// goal is to surface options the user is either qualified for or one step
// away from.
export function matchBySubjects<T extends { id: number }>(
  selectedSubjectIds: number[],
  items: T[],
  requirementsByItemId: (item: T) => Requirement[],
  subjects: Subject[],
): SubjectMatch<T>[] {
  const subjectById = new Map(subjects.map((s) => [s.id, s]));
  const selected = new Set(selectedSubjectIds);

  const results: SubjectMatch<T>[] = [];

  for (const item of items) {
    const requiredSubjects = requirementsByItemId(item)
      .map((r) => subjectById.get(r.subjectId))
      .filter((s): s is Subject => Boolean(s));

    if (requiredSubjects.length === 0) continue;

    const matchedSubjects = requiredSubjects.filter((s) => selected.has(s.id));
    const missingSubjects = requiredSubjects.filter((s) => !selected.has(s.id));

    if (matchedSubjects.length === 0) continue;

    results.push({
      item,
      requiredSubjects,
      matchedSubjects,
      missingSubjects,
      status: missingSubjects.length === 0 ? "match" : "close",
    });
  }

  return results.sort((a, b) => {
    if (a.status !== b.status) return a.status === "match" ? -1 : 1;
    return a.missingSubjects.length - b.missingSubjects.length;
  });
}
