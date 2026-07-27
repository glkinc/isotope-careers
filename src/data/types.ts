export type EducationLevel =
  | "high_school"
  | "certificate"
  | "diploma"
  | "undergraduate"
  | "graduate";

export type CareerCategory = {
  id: number;
  slug: string;
  name: string;
  description: string;
};

export type Career = {
  id: number;
  categoryId: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  salaryMin: number | null;
  salaryMax: number | null;
  responsibilities: string[];
  dayToDay: string | null;
};

export type Institution = {
  id: number;
  name: string;
  city: string | null;
  province: string | null;
  description: string | null;
  website: string | null;
};

export type EducationProgram = {
  id: number;
  institutionId: number;
  slug: string;
  name: string;
  level: EducationLevel;
  description: string;
  duration: string | null;
  requirements: string | null;
};

export type SkillTreeNode = {
  id: number;
  careerId: number;
  title: string;
  description: string | null;
  tier: number;
  prerequisiteNodeId: number | null;
};

export type SubjectCategory = "math" | "science" | "language" | "other";

export type Subject = {
  id: number;
  slug: string;
  name: string;
  category: SubjectCategory;
};

export type CareerRequirement = {
  careerId: number;
  subjectId: number;
};
