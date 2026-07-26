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
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  responsibilities: text("responsibilities"),
  dayToDay: text("day_to_day"),
});

export const institutions = pgTable("institutions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city"),
  province: text("province"),
  description: text("description"),
  website: text("website"),
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
