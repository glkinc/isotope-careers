// Data-access layer. Currently backed by static seed data; swap the bodies of
// these functions for Drizzle queries against src/db once a database is connected.
// Callers (pages) should not need to change.

import {
  careerCategories,
  careerEducationLinks,
  careerRequirements,
  careers,
  educationPrograms,
  institutions,
  skillTreeNodes,
  subjects,
} from "./seed-data";
import type {
  Career,
  CareerCategory,
  CareerRequirement,
  EducationProgram,
  Institution,
  SkillTreeNode,
  Subject,
} from "./types";

export async function getCareerCategories(): Promise<CareerCategory[]> {
  return careerCategories;
}

export async function getCareers(): Promise<Career[]> {
  return careers;
}

export async function getCareerBySlug(slug: string): Promise<Career | undefined> {
  return careers.find((c) => c.slug === slug);
}

export async function getCareerCategory(
  categoryId: number,
): Promise<CareerCategory | undefined> {
  return careerCategories.find((c) => c.id === categoryId);
}

export async function getEducationPrograms(): Promise<EducationProgram[]> {
  return educationPrograms;
}

export async function getEducationProgramBySlug(
  slug: string,
): Promise<EducationProgram | undefined> {
  return educationPrograms.find((p) => p.slug === slug);
}

export async function getInstitution(
  institutionId: number,
): Promise<Institution | undefined> {
  return institutions.find((i) => i.id === institutionId);
}

export async function getProgramsForCareer(
  careerSlug: string,
): Promise<EducationProgram[]> {
  const programSlugs = careerEducationLinks
    .filter((link) => link.careerSlug === careerSlug)
    .map((link) => link.programSlug);
  return educationPrograms.filter((p) => programSlugs.includes(p.slug));
}

export async function getCareersForProgram(
  programSlug: string,
): Promise<Career[]> {
  const careerSlugs = careerEducationLinks
    .filter((link) => link.programSlug === programSlug)
    .map((link) => link.careerSlug);
  return careers.filter((c) => careerSlugs.includes(c.slug));
}

export async function getSkillTreeForCareer(
  careerId: number,
): Promise<SkillTreeNode[]> {
  return skillTreeNodes
    .filter((n) => n.careerId === careerId)
    .sort((a, b) => a.tier - b.tier);
}

export async function getSubjects(): Promise<Subject[]> {
  return subjects;
}

export async function getCareerRequirements(): Promise<CareerRequirement[]> {
  return careerRequirements;
}
