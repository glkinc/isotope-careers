import type { Career, CareerRequirement, Subject } from "@/data/types";

export type CareerMatch = {
  career: Career;
  requiredSubjects: Subject[];
  matchedSubjects: Subject[];
  missingSubjects: Subject[];
  status: "match" | "close";
};

// Compares a user's completed subjects against each career's requirements.
// Careers with zero overlap are dropped entirely - the goal is to surface
// careers the user is either qualified for or one step away from.
export function matchCareers(
  selectedSubjectIds: number[],
  careers: Career[],
  requirements: CareerRequirement[],
  subjects: Subject[],
): CareerMatch[] {
  const subjectById = new Map(subjects.map((s) => [s.id, s]));
  const selected = new Set(selectedSubjectIds);

  const results: CareerMatch[] = [];

  for (const career of careers) {
    const requiredSubjects = requirements
      .filter((r) => r.careerId === career.id)
      .map((r) => subjectById.get(r.subjectId))
      .filter((s): s is Subject => Boolean(s));

    if (requiredSubjects.length === 0) continue;

    const matchedSubjects = requiredSubjects.filter((s) => selected.has(s.id));
    const missingSubjects = requiredSubjects.filter((s) => !selected.has(s.id));

    if (matchedSubjects.length === 0) continue;

    results.push({
      career,
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
