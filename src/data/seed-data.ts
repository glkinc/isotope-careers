// Placeholder content for the isotope-careers MVP.
// Institution names are real Canadian institutions with genuinely related programs,
// but program durations/requirements and salary ranges here are illustrative estimates,
// not sourced figures — verify before treating any of this as authoritative.

import type {
  Career,
  CareerCategory,
  EducationProgram,
  Institution,
  SkillTreeNode,
} from "./types";

export const careerCategories: CareerCategory[] = [
  {
    id: 1,
    slug: "reactor-operations",
    name: "Reactor Operations",
    description:
      "Running and maintaining the nuclear reactors that produce medical and industrial isotopes.",
  },
  {
    id: 2,
    slug: "radiopharmaceutical-sciences",
    name: "Radiopharmaceutical Sciences",
    description:
      "Turning raw isotopes into the diagnostic and therapeutic products used in hospitals and clinics.",
  },
  {
    id: 3,
    slug: "regulatory-and-safety",
    name: "Regulatory & Radiation Safety",
    description:
      "Keeping isotope production, transport, and use compliant and safe for workers and the public.",
  },
];

export const careers: Career[] = [
  {
    id: 1,
    categoryId: 1,
    slug: "nuclear-reactor-operator",
    title: "Nuclear Reactor Operator",
    summary: "Operates and monitors reactor systems used in isotope production.",
    description:
      "Reactor operators run the control-room systems that keep a research or production reactor operating safely within its licensed limits, including the irradiation cycles used to produce medical isotopes.",
    salaryMin: 75000,
    salaryMax: 110000,
    responsibilities: [
      "Monitor reactor instrumentation and control systems",
      "Execute startup, shutdown, and irradiation procedures",
      "Respond to abnormal conditions per safety protocols",
      "Log operational data for regulatory reporting",
    ],
    dayToDay:
      "Shift-based control-room work, procedure execution, and close coordination with radiation safety staff.",
  },
  {
    id: 2,
    categoryId: 1,
    slug: "nuclear-engineer",
    title: "Nuclear Engineer",
    summary: "Designs and improves reactor and isotope-production systems.",
    description:
      "Nuclear engineers design, analyze, and improve the systems used to irradiate targets and extract isotopes, working on everything from reactor core physics to production-line equipment.",
    salaryMin: 85000,
    salaryMax: 130000,
    responsibilities: [
      "Design and analyze reactor and irradiation systems",
      "Model neutron flux and isotope yield",
      "Support licensing and safety case documentation",
      "Troubleshoot production equipment issues",
    ],
    dayToDay:
      "Engineering analysis, simulation work, and cross-team collaboration with operations and regulatory staff.",
  },
  {
    id: 3,
    categoryId: 2,
    slug: "radiopharmaceutical-chemist",
    title: "Radiopharmaceutical Chemist",
    summary: "Synthesizes and purifies isotope-based drug products.",
    description:
      "Radiopharmaceutical chemists develop and run the chemistry processes that convert raw isotopes into labeled compounds used for imaging and treatment, working under strict quality and radiation-handling protocols.",
    salaryMin: 70000,
    salaryMax: 105000,
    responsibilities: [
      "Synthesize and purify radiolabeled compounds",
      "Perform quality control testing on batches",
      "Maintain hot-cell and lab equipment",
      "Document processes for regulatory compliance",
    ],
    dayToDay:
      "Lab-based synthesis and QC work in shielded environments, on tight production timelines tied to isotope half-life.",
  },
  {
    id: 4,
    categoryId: 2,
    slug: "nuclear-medicine-physicist",
    title: "Medical Physicist (Nuclear Medicine)",
    summary: "Ensures safe, accurate clinical use of radioisotopes.",
    description:
      "Medical physicists in nuclear medicine oversee dosing accuracy, equipment calibration, and radiation safety for isotope-based diagnostic and therapeutic procedures in hospitals.",
    salaryMin: 100000,
    salaryMax: 150000,
    responsibilities: [
      "Calibrate imaging and dosing equipment",
      "Verify radiation dose calculations",
      "Support treatment planning for radiotherapy",
      "Maintain regulatory and safety documentation",
    ],
    dayToDay:
      "Hospital-based work split between equipment QA, dose planning support, and clinical consultation.",
  },
  {
    id: 5,
    categoryId: 3,
    slug: "radiation-safety-officer",
    title: "Radiation Safety Officer",
    summary: "Oversees radiation protection programs at production and clinical sites.",
    description:
      "Radiation safety officers design and enforce the procedures that keep workers, the public, and the environment safe from radiation exposure across isotope production, handling, and transport.",
    salaryMin: 75000,
    salaryMax: 115000,
    responsibilities: [
      "Monitor radiation exposure levels and dosimetry",
      "Conduct safety audits and inspections",
      "Maintain compliance with CNSC regulations",
      "Train staff on radiation protection procedures",
    ],
    dayToDay:
      "Mix of site inspections, monitoring data review, training delivery, and regulatory reporting.",
  },
  {
    id: 6,
    categoryId: 3,
    slug: "isotope-logistics-specialist",
    title: "Isotope Logistics Specialist",
    summary: "Coordinates time-critical, regulated transport of isotopes.",
    description:
      "Because many medical isotopes decay within hours, logistics specialists coordinate tightly scheduled, regulation-compliant transport from production sites to hospitals and distributors across Canada and internationally.",
    salaryMin: 60000,
    salaryMax: 90000,
    responsibilities: [
      "Schedule time-sensitive isotope shipments",
      "Ensure compliance with transport-of-dangerous-goods regulations",
      "Coordinate with carriers, customs, and receiving sites",
      "Track shipments and manage exceptions in real time",
    ],
    dayToDay:
      "Fast-paced coordination work against tight decay-driven deadlines, with heavy regulatory documentation.",
  },
];

export const institutions: Institution[] = [
  {
    id: 1,
    name: "Ontario Tech University",
    city: "Oshawa",
    province: "ON",
    description: "Offers nuclear engineering programs with ties to Canada's nuclear industry.",
    website: "https://ontariotechu.ca",
  },
  {
    id: 2,
    name: "McMaster University",
    city: "Hamilton",
    province: "ON",
    description:
      "Home to the McMaster Nuclear Reactor, a major source of medical isotope research and production in Canada.",
    website: "https://www.mcmaster.ca",
  },
  {
    id: 3,
    name: "University of Toronto",
    city: "Toronto",
    province: "ON",
    description: "Offers engineering physics and medical physics programs relevant to isotope work.",
    website: "https://www.utoronto.ca",
  },
  {
    id: 4,
    name: "Ontario College (generic technologist program)",
    city: "Various",
    province: "ON",
    description:
      "Placeholder entry representing college-level nuclear/radiation technologist diploma programs offered across Ontario.",
    website: null,
  },
];

export const educationPrograms: EducationProgram[] = [
  {
    id: 1,
    institutionId: 1,
    slug: "nuclear-engineering-beng",
    name: "Nuclear Engineering (BEng)",
    level: "undergraduate",
    description:
      "Undergraduate engineering program covering reactor physics, thermodynamics, and nuclear systems design.",
    duration: "~4 years",
    requirements: "High school diploma with strong math/physics background",
  },
  {
    id: 2,
    institutionId: 4,
    slug: "nuclear-radiation-technologist-diploma",
    name: "Nuclear/Radiation Technologist Diploma",
    level: "diploma",
    description:
      "College diploma preparing graduates for reactor operations and radiation-monitoring technician roles.",
    duration: "~2-3 years",
    requirements: "High school diploma with math/science credits",
  },
  {
    id: 3,
    institutionId: 3,
    slug: "engineering-physics-medical-physics",
    name: "Engineering Physics / Medical Physics stream",
    level: "graduate",
    description:
      "Undergraduate engineering physics followed by graduate specialization in medical physics for nuclear medicine roles.",
    duration: "~4 years undergrad + 2-3 years graduate",
    requirements: "Undergraduate physics/engineering degree for graduate entry",
  },
  {
    id: 4,
    institutionId: 2,
    slug: "chemistry-radiochemistry",
    name: "Chemistry (Radiochemistry focus)",
    level: "undergraduate",
    description:
      "Chemistry degree with coursework and research opportunities in radiochemistry, supported by on-campus reactor access.",
    duration: "~4 years",
    requirements: "High school diploma with strong chemistry/math background",
  },
  {
    id: 5,
    institutionId: 4,
    slug: "radiation-safety-certificate",
    name: "Radiation Safety Certificate",
    level: "certificate",
    description:
      "Short professional certificate covering radiation protection principles and regulatory compliance.",
    duration: "~3-6 months",
    requirements: "Typically requires a related science/engineering background",
  },
];

export const careerEducationLinks: { careerSlug: string; programSlug: string }[] = [
  { careerSlug: "nuclear-reactor-operator", programSlug: "nuclear-radiation-technologist-diploma" },
  { careerSlug: "nuclear-engineer", programSlug: "nuclear-engineering-beng" },
  { careerSlug: "radiopharmaceutical-chemist", programSlug: "chemistry-radiochemistry" },
  { careerSlug: "nuclear-medicine-physicist", programSlug: "engineering-physics-medical-physics" },
  { careerSlug: "radiation-safety-officer", programSlug: "radiation-safety-certificate" },
  { careerSlug: "radiation-safety-officer", programSlug: "nuclear-radiation-technologist-diploma" },
];

export const skillTreeNodes: SkillTreeNode[] = [
  // Nuclear Reactor Operator path
  { id: 1, careerId: 1, title: "High school math & physics", description: "Foundation coursework.", tier: 1, prerequisiteNodeId: null },
  { id: 2, careerId: 1, title: "Nuclear/Radiation Technologist Diploma", description: "College-level technical training.", tier: 2, prerequisiteNodeId: 1 },
  { id: 3, careerId: 1, title: "Reactor operator certification", description: "Facility-specific licensing and training.", tier: 3, prerequisiteNodeId: 2 },
  { id: 4, careerId: 1, title: "Licensed Reactor Operator", description: "Fully qualified, independent shift operator.", tier: 4, prerequisiteNodeId: 3 },

  // Radiopharmaceutical Chemist path
  { id: 5, careerId: 3, title: "High school chemistry & math", description: "Foundation coursework.", tier: 1, prerequisiteNodeId: null },
  { id: 6, careerId: 3, title: "Chemistry degree (radiochemistry focus)", description: "Undergraduate specialization.", tier: 2, prerequisiteNodeId: 5 },
  { id: 7, careerId: 3, title: "Hot-cell / radiochemistry lab training", description: "Hands-on production experience.", tier: 3, prerequisiteNodeId: 6 },
  { id: 8, careerId: 3, title: "Radiopharmaceutical Chemist", description: "Independent production chemist role.", tier: 4, prerequisiteNodeId: 7 },
];
