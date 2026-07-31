// Data-access layer, backed by Postgres (Neon) via Drizzle. Callers (pages)
// depend only on the types in ./types, not on the shape of the db schema.

import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  careerCategories as careerCategoriesTable,
  careerEducationPrograms,
  careerTopEmployers as careerTopEmployersTable,
  careers as careersTable,
  companies as companiesTable,
  educationPrograms as educationProgramsTable,
  institutions as institutionsTable,
  programRequirements as programRequirementsTable,
  skillTreeNodes as skillTreeNodesTable,
  subjects as subjectsTable,
} from "@/db/schema";
import type {
  Career,
  CareerCategory,
  Company,
  EducationProgram,
  Institution,
  ProgramRequirement,
  SkillTreeNode,
  Subject,
} from "./types";

function toCareer(row: typeof careersTable.$inferSelect): Career {
  return {
    ...row,
    responsibilities: row.responsibilities ?? [],
    sources: row.sources ?? [],
  };
}

function toEducationProgram(
  row: typeof educationProgramsTable.$inferSelect,
): EducationProgram {
  return {
    ...row,
    sources: row.sources ?? [],
  };
}

export async function getCareerCategories(): Promise<CareerCategory[]> {
  return db.select().from(careerCategoriesTable);
}

export async function getCareers(): Promise<Career[]> {
  const rows = await db.select().from(careersTable);
  return rows.map(toCareer);
}

export async function getCareerBySlug(
  slug: string,
): Promise<Career | undefined> {
  const rows = await db
    .select()
    .from(careersTable)
    .where(eq(careersTable.slug, slug));
  return rows[0] ? toCareer(rows[0]) : undefined;
}

export async function getCareerCategory(
  categoryId: number,
): Promise<CareerCategory | undefined> {
  const rows = await db
    .select()
    .from(careerCategoriesTable)
    .where(eq(careerCategoriesTable.id, categoryId));
  return rows[0];
}

export async function getEducationPrograms(): Promise<EducationProgram[]> {
  const rows = await db.select().from(educationProgramsTable);
  return rows.map(toEducationProgram);
}

export async function getEducationProgramBySlug(
  slug: string,
): Promise<EducationProgram | undefined> {
  const rows = await db
    .select()
    .from(educationProgramsTable)
    .where(eq(educationProgramsTable.slug, slug));
  return rows[0] ? toEducationProgram(rows[0]) : undefined;
}

export async function getInstitution(
  institutionId: number,
): Promise<Institution | undefined> {
  const rows = await db
    .select()
    .from(institutionsTable)
    .where(eq(institutionsTable.id, institutionId));
  return rows[0];
}

export async function getInstitutions(): Promise<Institution[]> {
  return db.select().from(institutionsTable);
}

export async function getProgramsForInstitution(
  institutionId: number,
): Promise<EducationProgram[]> {
  const rows = await db
    .select()
    .from(educationProgramsTable)
    .where(eq(educationProgramsTable.institutionId, institutionId));
  return rows.map(toEducationProgram);
}

export async function getProgramsForCareer(
  careerSlug: string,
): Promise<EducationProgram[]> {
  const rows = await db
    .select({ program: educationProgramsTable })
    .from(careerEducationPrograms)
    .innerJoin(
      educationProgramsTable,
      eq(careerEducationPrograms.programId, educationProgramsTable.id),
    )
    .innerJoin(
      careersTable,
      eq(careerEducationPrograms.careerId, careersTable.id),
    )
    .where(eq(careersTable.slug, careerSlug));
  return rows.map((r) => toEducationProgram(r.program));
}

export async function getCareersForProgram(
  programSlug: string,
): Promise<Career[]> {
  const rows = await db
    .select({ career: careersTable })
    .from(careerEducationPrograms)
    .innerJoin(careersTable, eq(careerEducationPrograms.careerId, careersTable.id))
    .innerJoin(
      educationProgramsTable,
      eq(careerEducationPrograms.programId, educationProgramsTable.id),
    )
    .where(eq(educationProgramsTable.slug, programSlug));
  return rows.map((r) => toCareer(r.career));
}

export async function getSkillTreeForCareer(
  careerId: number,
): Promise<SkillTreeNode[]> {
  const rows = await db
    .select()
    .from(skillTreeNodesTable)
    .where(eq(skillTreeNodesTable.careerId, careerId));
  return rows.sort((a, b) => a.tier - b.tier);
}

export async function getSubjects(): Promise<Subject[]> {
  return db.select().from(subjectsTable);
}

export async function getProgramRequirements(): Promise<ProgramRequirement[]> {
  return db.select().from(programRequirementsTable);
}

export async function getTopEmployersForCareer(
  careerId: number,
): Promise<Company[]> {
  const rows = await db
    .select({ company: companiesTable })
    .from(careerTopEmployersTable)
    .innerJoin(
      companiesTable,
      eq(careerTopEmployersTable.companyId, companiesTable.id),
    )
    .where(eq(careerTopEmployersTable.careerId, careerId))
    .orderBy(asc(careerTopEmployersTable.sortOrder));
  return rows.map((r) => r.company);
}

export async function getCompanies(): Promise<Company[]> {
  const rows = await db.select().from(companiesTable);
  return rows.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCareersForCompany(
  companyId: number,
): Promise<Career[]> {
  const rows = await db
    .select({ career: careersTable })
    .from(careerTopEmployersTable)
    .innerJoin(
      careersTable,
      eq(careerTopEmployersTable.careerId, careersTable.id),
    )
    .where(eq(careerTopEmployersTable.companyId, companyId));
  return rows.map((r) => toCareer(r.career));
}

export async function getCareerEducationLinks(): Promise<
  { careerSlug: string; programSlug: string }[]
> {
  const rows = await db
    .select({
      careerSlug: careersTable.slug,
      programSlug: educationProgramsTable.slug,
    })
    .from(careerEducationPrograms)
    .innerJoin(careersTable, eq(careerEducationPrograms.careerId, careersTable.id))
    .innerJoin(
      educationProgramsTable,
      eq(careerEducationPrograms.programId, educationProgramsTable.id),
    );
  return rows;
}
