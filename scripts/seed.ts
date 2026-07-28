import { readFileSync } from "node:fs";
import { join } from "node:path";
import { db } from "../src/db";
import {
  careerCategories,
  careers,
  institutions,
  educationPrograms,
  careerEducationPrograms,
  subjects,
  programRequirements,
} from "../src/db/schema";

type Dataset = {
  careerCategories: {
    id: number;
    slug: string;
    name: string;
    description: string;
  }[];
  careers: {
    id: number;
    categoryId: number;
    slug: string;
    title: string;
    summary: string;
    description: string;
    nocCode: string;
    salaryMin: number;
    salaryMax: number;
    responsibilities: string[];
    dayToDay: string;
    sources: string[];
    topEmployers: string[];
  }[];
  institutions: {
    id: number;
    name: string;
    city: string;
    province: string;
    description: string;
    website: string;
    logoUrl: string;
  }[];
  educationPrograms: {
    id: number;
    institutionId: number;
    slug: string;
    name: string;
    level: "high_school" | "certificate" | "diploma" | "undergraduate" | "graduate";
    description: string;
    duration: string;
    requirements: string;
    programUrl: string;
    sources: string[];
  }[];
  subjects: {
    id: number;
    slug: string;
    name: string;
    code: string;
    category: "math" | "science" | "language" | "other";
  }[];
  programRequirements: {
    programId: number;
    subjectId: number;
    minGrade: number | null;
  }[];
  careerEducationLinks: { careerSlug: string; programSlug: string }[];
};

async function main() {
  const raw = readFileSync(join(__dirname, "dataset.json"), "utf-8");
  const data: Dataset = JSON.parse(raw);

  console.log("Clearing existing rows...");
  await db.delete(careerEducationPrograms);
  await db.delete(programRequirements);
  await db.delete(subjects);
  await db.delete(educationPrograms);
  await db.delete(institutions);
  await db.delete(careers);
  await db.delete(careerCategories);

  console.log("Inserting career categories...");
  await db.insert(careerCategories).values(data.careerCategories);

  console.log("Inserting careers...");
  await db.insert(careers).values(data.careers);

  console.log("Inserting institutions...");
  await db.insert(institutions).values(data.institutions);

  console.log("Inserting education programs...");
  await db.insert(educationPrograms).values(data.educationPrograms);

  console.log("Inserting subjects...");
  await db.insert(subjects).values(data.subjects);

  console.log("Inserting program requirements...");
  await db.insert(programRequirements).values(data.programRequirements);

  console.log("Inserting career/education links...");
  const careerIdBySlug = new Map(data.careers.map((c) => [c.slug, c.id]));
  const programIdBySlug = new Map(
    data.educationPrograms.map((p) => [p.slug, p.id]),
  );
  const links = data.careerEducationLinks.map((link) => ({
    careerId: careerIdBySlug.get(link.careerSlug)!,
    programId: programIdBySlug.get(link.programSlug)!,
  }));
  await db.insert(careerEducationPrograms).values(links);

  console.log("Done.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
