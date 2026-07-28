import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";

export const educationLevelEnum = pgEnum("education_level", [
  "high_school",
  "certificate",
  "diploma",
  "undergraduate",
  "graduate",
]);

export const subjectCategoryEnum = pgEnum("subject_category", [
  "math",
  "science",
  "language",
  "other",
]);

export const careerCategories = pgTable("career_categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const careers = pgTable("careers", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => careerCategories.id),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  nocCode: text("noc_code"),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  responsibilities: text("responsibilities").array(),
  dayToDay: text("day_to_day"),
  sources: text("sources").array(),
  topEmployers: text("top_employers").array(),
});

export const institutions = pgTable("institutions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city"),
  province: text("province"),
  description: text("description"),
  website: text("website"),
  logoUrl: text("logo_url"),
});

export const educationPrograms = pgTable("education_programs", {
  id: serial("id").primaryKey(),
  institutionId: integer("institution_id")
    .notNull()
    .references(() => institutions.id),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  level: educationLevelEnum("level").notNull(),
  description: text("description").notNull(),
  duration: text("duration"),
  requirements: text("requirements"),
  programUrl: text("program_url"),
  sources: text("sources").array(),
});

export const careerEducationPrograms = pgTable(
  "career_education_programs",
  {
    careerId: integer("career_id")
      .notNull()
      .references(() => careers.id),
    programId: integer("program_id")
      .notNull()
      .references(() => educationPrograms.id),
  },
  (table) => [primaryKey({ columns: [table.careerId, table.programId] })],
);

export const skillTreeNodes = pgTable("skill_tree_nodes", {
  id: serial("id").primaryKey(),
  careerId: integer("career_id")
    .notNull()
    .references(() => careers.id),
  title: text("title").notNull(),
  description: text("description"),
  tier: integer("tier").notNull(),
  prerequisiteNodeId: integer("prerequisite_node_id"),
});

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  code: text("code"),
  category: subjectCategoryEnum("category").notNull(),
});

export const programRequirements = pgTable(
  "program_requirements",
  {
    programId: integer("program_id")
      .notNull()
      .references(() => educationPrograms.id),
    subjectId: integer("subject_id")
      .notNull()
      .references(() => subjects.id),
    minGrade: integer("min_grade"),
  },
  (table) => [primaryKey({ columns: [table.programId, table.subjectId] })],
);

export const careerCategoriesRelations = relations(
  careerCategories,
  ({ many }) => ({
    careers: many(careers),
  }),
);

export const careersRelations = relations(careers, ({ one, many }) => ({
  category: one(careerCategories, {
    fields: [careers.categoryId],
    references: [careerCategories.id],
  }),
  educationLinks: many(careerEducationPrograms),
  skillTreeNodes: many(skillTreeNodes),
}));

export const institutionsRelations = relations(institutions, ({ many }) => ({
  programs: many(educationPrograms),
}));

export const educationProgramsRelations = relations(
  educationPrograms,
  ({ one, many }) => ({
    institution: one(institutions, {
      fields: [educationPrograms.institutionId],
      references: [institutions.id],
    }),
    careerLinks: many(careerEducationPrograms),
    subjectRequirements: many(programRequirements),
  }),
);

export const careerEducationProgramsRelations = relations(
  careerEducationPrograms,
  ({ one }) => ({
    career: one(careers, {
      fields: [careerEducationPrograms.careerId],
      references: [careers.id],
    }),
    program: one(educationPrograms, {
      fields: [careerEducationPrograms.programId],
      references: [educationPrograms.id],
    }),
  }),
);

export const skillTreeNodesRelations = relations(
  skillTreeNodes,
  ({ one }) => ({
    career: one(careers, {
      fields: [skillTreeNodes.careerId],
      references: [careers.id],
    }),
    prerequisite: one(skillTreeNodes, {
      fields: [skillTreeNodes.prerequisiteNodeId],
      references: [skillTreeNodes.id],
    }),
  }),
);

export const subjectsRelations = relations(subjects, ({ many }) => ({
  programRequirements: many(programRequirements),
}));

export const programRequirementsRelations = relations(
  programRequirements,
  ({ one }) => ({
    program: one(educationPrograms, {
      fields: [programRequirements.programId],
      references: [educationPrograms.id],
    }),
    subject: one(subjects, {
      fields: [programRequirements.subjectId],
      references: [subjects.id],
    }),
  }),
);
