import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Download,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
  X
} from "lucide-react";

const assetBase = import.meta.env.BASE_URL;
const headshot = `${assetBase}headshot.jpg`;
const resumeHref = `${assetBase}Leonardo_Medina_Resume.pdf`;
const linkedInHref = "https://www.linkedin.com/in/leonardo-medina-391817287";

const financeVisuals = [
  {
    src: `${assetBase}finance-visuals/finance-page-15.png`,
    title: "Current-state context diagram",
    caption: "Current F&I workflow and disconnected handoffs."
  },
  {
    src: `${assetBase}finance-visuals/finance-page-18.png`,
    title: "Proposed integrated system",
    caption: "Single integrated F&I flow replacing manual portal transitions."
  },
  {
    src: `${assetBase}finance-visuals/finance-page-19.png`,
    title: "Level 0 DFD",
    caption: "Revamped processes and the added document repository store."
  },
  {
    src: `${assetBase}finance-visuals/finance-page-20.png`,
    title: "Level 1 DFD + ERD",
    caption: "Detailed 2.0 process flow plus the proposed data model."
  }
] as const;

const crmDashboardVisual = `${assetBase}crm-dashboard.png`;

const r4v3Visuals = [
  {
    src: `${assetBase}r4v3-visuals/Simulator Screenshot - iPhone 16 Pro - 2026-04-13 at 14.54.35.png`,
    title: "Browse Local Events",
    caption: "Users browse curated local events and signal intent by selecting ones they plan to attend."
  },
  {
    src: `${assetBase}r4v3-visuals/Simulator Screenshot - iPhone 16 Pro - 2026-04-13 at 14.54.11.png`,
    title: "Crew Toggle (Core Feature)",
    caption: "Matching is activated at the event level—users opt into 'Looking for Crew' to become visible to others attending."
  },
  {
    src: `${assetBase}r4v3-visuals/Simulator Screenshot - iPhone 16 Pro - 2026-04-13 at 14.55.29.png`,
    title: "Event Detail (Depth)",
    caption: "Event pages centralize RSVP, visibility controls, and real-time context for coordination and connection."
  }
] as const;

const projects = [
  {
    id: "events",
    category: "Applied Project Work",
    role: "Founder · Product Manager",
    title: "R4V3 — Event-Based Social Platform",
    subtitle: "Designed and built an MVP for event-based social matching.",
    blurb:
      "Built an event-first social platform concept focused on helping users connect with others attending the same live events.",
    metrics: [],
    accent: "from-blue-500/20 to-cyan-400/10",
    overview:
      "Enable high-intent connections by matching users within shared event contexts rather than profiles.",
    problem:
      "Solo attendees struggle to connect at live events. Existing platforms are profile-based and ignore context, resulting in low-quality, low-intent interactions despite high activity.",
    users: [
      "Solo attendees at live events",
      "Users looking for shared-context interactions"
    ],
    insight:
      "Shared context (time, place, intent) increases trust and interaction likelihood, making events a stronger matching foundation than profiles.",
    solution:
      "Built an event-first matching system where users opt into events, triggering context-based discovery and messaging within that event.",
    decisions: [
      "Event-based matching vs swipe model",
      "RSVP-driven visibility",
      "Temporary event interactions"
    ],
    decisionDetails: [
      {
        title: "Event-based matching over swipe model",
        rationale:
          "Prioritized relevance and intent over volume."
      },
      {
        title: "RSVP-gated visibility",
        rationale:
          "Users only appear after opting in, increasing intent and reducing noise."
      },
      {
        title: "Time-bound interactions",
        rationale:
          "Conversations expire with events to maintain context and reduce pressure."
      }
    ],
    userFlow: [
      { step: "1", title: "Browse Events", description: "Discover local events by genre and location" },
      { step: "2", title: "RSVP & Opt In", description: "Confirm attendance and enable matching for that event" },
      { step: "3", title: "Match & Message", description: "Connect with others attending the same event" }
    ],
    tradeoffs: [
      "Lower match volume, higher relevance",
      "Lower scalability vs broad social platforms"
    ],
    expectedImpact:
      "Event-based matching is designed to improve interaction quality by grounding discovery in shared context instead of profile-first browsing.",
    roleDetails: [
      "Defined the product goal and core user problem",
      "Designed the event-first matching concept",
      "Built the MVP and iterated using user feedback"
    ],
    learnings: [
      "Shared context improves relevance",
      "Temporary interactions can increase intent"
    ],
    futureMetrics: [
      "RSVP -> match rate",
      "Match -> message conversion",
      "Messages per match",
      "Repeat event participation"
    ],
    nextSteps: [
      "Improve matching quality",
      "Validate concept further with real users",
      "Refine engagement and retention mechanics"
    ],
    outcome:
      "Early feedback suggested that visibility into other attendees increased user confidence before opting in, reinforcing the role of context in driving engagement."
    ,
    productThinking:
      "Shifts social discovery from profile-based matching to context-based matching.\n\nOptimizes for:\n• shared intent\n• timing\n• environment\n\nTrades volume for higher-quality interactions."
  },
  {
    id: "finance",
    category: "Applied Project Work",
    role: "Systems Analysis Project",
    title: "Integrated Automotive Finance System",
    subtitle: "Redesigned a fragmented F&I workflow into a centralized, API-driven system.",
    blurb:
      "Analyzed and redesigned a fragmented F&I workflow into a centralized system, focusing on reducing inefficiencies, improving data flow, and streamlining deal processing.",
    metrics: ["Workflow analysis", "System redesign", "Data architecture"],
    accent: "from-blue-600/20 to-slate-400/10",
    problem:
      "Customer and deal information in the F&I process is spread across multiple systems, requiring repeated data entry and manual handoffs between CRM, lenders, DMV, and insurance providers. This creates delays, errors, and slows down deal completion and funding.",
    insight:
      "The core issue isn't just process inefficiency-it's system fragmentation. Each step operates in isolation, forcing the same data to be re-entered and validated multiple times.",
    productDirection:
      "Analyzed the end-to-end deal workflow and designed an integrated system that centralizes customer and deal data. The system connects lenders, DMV, and insurance providers through APIs, reducing manual entry and enabling real-time data flow.",
    decisions: [
      "Centralized all deal data into a single system of record.",
      "Replaced manual entry with API-based integrations.",
      "Automated validation to reduce errors and rework.",
      "Standardized data flow across all external partners."
    ],
    tradeoffs: [
      "Required coordination across multiple external systems.",
      "Initial implementation complexity due to integrations.",
      "Prioritized core workflow improvements over edge-case handling."
    ],
    nextSteps: [
      "Define API standards for lender and DMV integrations.",
      "Build interface for real-time deal tracking.",
      "Add audit and compliance tracking features.",
      "Expand to support additional financing and insurance providers."
    ],
    outcome:
      "Developed a structured system design that replaces disconnected workflows with a centralized platform, reducing redundant data entry and improving process speed, accuracy, and visibility across the deal lifecycle.",
    visualSet: "finance"
  },
  {
    id: "spot",
    category: "Applied Project Work",
    role: "Data Analytics · Tableau · CRM Optimization · Business Strategy",
    title: "CRM Lead Performance Dashboard — STG Auto Group",
    subtitle: "",
    blurb:
      "Analyzed lead quality, conversion efficiency, and profitability across acquisition channels to identify where revenue is actually generated and where marketing spend is being wasted.",
    metrics: ["Data Analytics", "Tableau", "CRM Optimization", "Business Strategy"],
    accent: "from-sky-500/20 to-blue-400/10",
    statHighlights: [
      "30%+ close rate (Walk-In) vs ~6% average",
      "$455K profit from zero-cost channel (2026 YTD)",
      "25.3% bad lead rate identified as a key performance risk"
    ],
    context:
      "STG Auto Group generates leads across multiple acquisition channels but lacked visibility into which sources drive profit vs volume.",
    problem:
      "The dealership was optimizing for lead volume instead of profitability, with no clear visibility into which acquisition channels actually generate revenue.\n\n• Which sources actually generate profit\n• Conversion efficiency by channel\n• ROI of marketing spend",
    insights: [
      "Walk-In drives the majority of profit despite $0 acquisition cost\n• ~$455K profit (2026 YTD)\n• ~30.38% close rate\n• $0 acquisition cost",
      "Paid channels generate high volume but convert 3–5x less efficiently than Walk-In traffic, significantly reducing overall ROI\n• Phone Pop and 99Drive drive high leads\n• Lower close rates reduce ROI",
      "Bad lead rate is high (25.3%)\n• Indicates declining lead quality\n• Suggests weak filtering before CRM entry",
      "Profit concentration risk\n• A small number of sources drive a large share of total profit\n• Creates dependency on specific channels",
    ],
    tradeoffs: [
      "Volume vs conversion efficiency",
      "Growth vs profitability",
      "Spend scale vs ROI"
    ],
    decisions: [
      "Reallocate budget away from low ROI channels",
      "Invest more in high-conversion sources (Walk-In drivers)",
      "Improve lead qualification before entering CRM",
      "Optimize follow-up strategy",
      "Introduce source-level performance tracking"
    ],
    impact: [
      "Shifted focus from lead volume → profit per lead",
      "Identified inefficiencies in marketing spend",
      "Highlighted bad lead rate as a core issue",
      "Enabled clearer, data-driven acquisition strategy"
    ],
    scopeConstraints: [
      "Focused on Jan–Apr data to ensure consistent comparison window",
      "Adjusted Walk-In gross profit to reflect 2026-only performance",
      "Prioritized clarity over full CRM complexity"
    ],
    technicalExecution:
      "Built in Tableau using calculated fields and transformations for:\n\n• Close rate (Appointments → Sales conversion)\n• Profit by source (Revenue − acquisition cost)\n• Lead quality segmentation (Good / Neutral / Bad)\n• Year-over-year comparison (2025 vs 2026)",
    productThinking:
      "This dashboard converts CRM activity into a decision system, revealing where revenue is actually created and enabling targeted, ROI-driven acquisition strategy.",
    image: crmDashboardVisual
  }
] as const;

const experience = [
  {
    period: "Jan 2022 — Present",
    role: "Sales Executive",
    company: "STG Auto Group",
    points: [
      "Analyzed customer behavior across the full purchase journey to identify friction points in pricing, financing, and decision-making.",
      "Balanced customer needs with business constraints by structuring deals, developing a strong understanding of tradeoffs and value optimization.",
      "Managed CRM workflows to improve data accuracy, follow-up timing, and pipeline visibility, ensuring more consistent deal progression.",
      "Identified patterns in drop-offs and delays, informing opportunities to improve sales processes and customer experience."
    ]
  },
  {
    period: "Jun 2021 — Jan 2022",
    role: "Warehouse Team Supervisor",
    company: "United Parcel Services",
    points: [
      "Led high-volume warehouse operations, analyzing workflow performance to identify bottlenecks impacting throughput and delivery timelines.",
      "Diagnosed inefficiencies in package flow and adjusted staffing allocation and process steps to maintain operational continuity under time constraints.",
      "Balanced speed, accuracy, and labor resources by making real-time tradeoff decisions in a dynamic, high-pressure environment.",
      "Coordinated across teams to ensure alignment on priorities, improving consistency in execution and reducing operational friction."
    ]
  },
  {
    period: "May 2020 — Jul 2021",
    role: "Creative Content Specialist",
    company: "Montclair Auto Exchange",
    points: [
      "Created and managed digital vehicle listings, ensuring consistency across platforms and improving content quality.",
      "Supported marketing workflows by organizing reusable assets and updating listings based on inventory and pricing changes."
    ]
  },
  {
    period: "Dec 2019 — May 2020",
    role: "Retail Sales Associate",
    company: "The Home Depot",
    points: [
      "Guided customers through product selection by identifying their needs, constraints, and intended use cases, improving decision clarity.",
      "Observed patterns in customer questions and challenges, informing how product information and in-store guidance could be improved."
    ]
  }
] as const;

const education = [
  {
    school: "University of California Riverside",
    degree: "Master of Business Administration/Management",
    period: "Expected June 2026",
    notes: ["Beta Gamma Sigma Honors Society (Top 20% of Business Students)"]
  },
  {
    school: "California State Polytechnic University Pomona",
    degree: "Bachelor of Arts, Psychology",
    period: "May 2024",
    notes: []
  }
] as const;

const skills = {
  "Product Thinking": ["MVP Design", "Systems Analysis", "CRM Optimization", "KPI Tracking", "User Flows", "Workflow Design"],
  "Data & Technical Skills": ["Python", "SQL", "Excel", "Tableau", "Data Analytics", "Data Visualization", "Data Modeling", "Simulation Modeling", "Funnel Analysis"],
  "Execution & Leadership": ["Team Leadership", "Cross-functional Collaboration", "Stakeholder Communication", "Process Optimization", "Operational Execution"]
} as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-blue-500 dark:text-blue-300">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      {children}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const activeProject = useMemo(() => projects.find((project) => project.id === activeId) ?? null, [activeId]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) =>
      current.includes(sectionId) ? current.filter((item) => item !== sectionId) : [...current, sectionId]
    );
  };

  const openProject = (projectId: string) => {
    setActiveId(projectId);
    setExpandedSections([]);
  };

  const closeProject = () => {
    setActiveId(null);
    setExpandedSections([]);
  };

  return (
    <div className={dark ? "dark bg-[#06070b] text-white" : "bg-[#f7f9fc] text-[#0f172a]"}>
      <div className="min-h-screen overflow-x-hidden transition-colors duration-300">
        <div className="pointer-events-none fixed inset-0 opacity-80">
          <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_55%)]" />
          <div className="absolute inset-y-0 right-0 w-[420px] bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.08),transparent_60%)]" />
        </div>

        <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#06070b]/70">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <div>
              <div className="text-sm font-semibold tracking-wide">Leonardo Medina</div>
              <div className="text-xs text-black/55 dark:text-white/55">Professional portfolio</div>
            </div>
            <nav className="hidden items-center gap-6 text-sm md:flex">
              <a href="#about" className="text-black/70 transition hover:text-blue-500 dark:text-white/70 dark:hover:text-blue-300">About</a>
              <a href="#projects" className="text-black/70 transition hover:text-blue-500 dark:text-white/70 dark:hover:text-blue-300">Projects</a>
              <a href="#experience" className="text-black/70 transition hover:text-blue-500 dark:text-white/70 dark:hover:text-blue-300">Experience</a>
              <a href="#contact" className="text-black/70 transition hover:text-blue-500 dark:text-white/70 dark:hover:text-blue-300">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href={resumeHref} className="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(59,130,246,0.25)] transition hover:translate-y-[-1px] md:inline-flex">
                <Download className="h-4 w-4" /> Resume
              </a>
              <a
                href={linkedInHref}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-black/80 transition hover:border-blue-500/30 hover:text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-blue-400/30 dark:hover:text-blue-300 md:inline-flex"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <button
                onClick={() => setDark((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black transition hover:border-blue-500/30 hover:text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                aria-label="Toggle theme"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24 lg:pt-20">
            <div className="max-w-3xl">
              <SectionLabel>Aspiring Product Manager</SectionLabel>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl"
              >
                Product Management Candidate
                 <br />
                <span className="text-white/70">
                Focused on Sales, Data, and User Behavior
              </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="mt-6 max-w-2xl text-lg leading-8 text-black/65 dark:text-white/68"
              >
                I focus on understanding user problems, analyzing data, and applying real-world sales insight to inform product decisions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow-[0_12px_40px_rgba(59,130,246,0.28)] transition hover:translate-y-[-1px]">
                  <Mail className="h-4 w-4" /> Contact Me
                </a>
                <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-black/80 transition hover:border-blue-500/30 hover:text-blue-500 dark:border-white/10 dark:text-white/80 dark:hover:border-blue-400/30 dark:hover:text-blue-300">
                  View Projects <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  ["Customer Behavior", "Experience analyzing user interactions across sales, negotiation, and conversion funnels."],
                  ["Data & Decision Making", "Focused on using data to identify opportunities, improve processes, and guide product decisions."],
                  ["Cross-functional projects", "Background across product development, systems analysis, and team collaboration."]
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-3xl border border-black/6 bg-white/65 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">{copy}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-white/70 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <img src={headshot} alt="Leonardo Medina" className="h-[520px] w-full rounded-[1.5rem] object-cover object-center" />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-black/6 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs uppercase tracking-[0.18em] text-black/45 dark:text-white/45">Education</div>
                    <div className="mt-2 text-sm font-medium">MBA Candidate (Information Systems), UC Riverside</div>
                  </div>
                  <div className="rounded-2xl border border-black/6 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs uppercase tracking-[0.18em] text-black/45 dark:text-white/45">Based in</div>
                    <div className="mt-2 flex items-center gap-2 text-sm font-medium"><MapPin className="h-4 w-4 text-blue-500" /> Southern California</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="about" className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <SectionLabel>About</SectionLabel>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Short introduction.</h2>
              </div>
              <div className="space-y-5 text-base leading-8 text-slate-700 dark:text-white/68">
                <p>
                  I’m Leonardo Medina, an MBA candidate transitioning into product management with experience in sales operations and CRM optimization.
                </p>
                <p>
                  I focus on understanding user problems, defining practical solutions, and building products that improve engagement and decision-making. My background in customer-facing environments shapes how I approach product decisions, particularly in consumer platforms where behavior and execution directly impact outcomes.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {education.map((item) => (
                    <div key={item.school} className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_10px_25px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                      <div className="text-sm text-blue-500 dark:text-blue-300">{item.period}</div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{item.school}</h3>
                      <div className="mt-2 text-sm leading-7 text-slate-700 dark:text-white/65">{item.degree}</div>
                      {item.notes.map((note) => (
                        <div key={note} className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/60">{note}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>Selected Work</SectionLabel>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Selected Product Work</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-white/60">
                A collection of projects where I focused on solving user problems, making product decisions, and building practical solutions.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:auto-rows-fr">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  onClick={() => openProject(project.id)}
                  className="group relative flex h-full overflow-hidden rounded-[1.75rem] border border-black/6 bg-white/75 p-6 text-left shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-blue-500/20 dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 transition duration-300 group-hover:opacity-100`} />
                  <div className="relative flex min-h-[560px] w-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-white/45">{project.category}</div>
                        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{project.title}</h3>
                        <div className="mt-2 text-sm text-blue-500 dark:text-blue-300">{project.subtitle}</div>
                      </div>
                      <div className="rounded-full border border-black/8 bg-white/90 p-2 dark:border-white/10 dark:bg-white/5">
                        <ChevronRight className="h-4 w-4 text-blue-500 dark:text-blue-300" />
                      </div>
                    </div>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-white/63">{project.blurb}</p>
                    <div className="mt-5 flex-1">
                      {project.id === "finance" ? (
                        <div className="h-full overflow-hidden rounded-[1.4rem] border border-sky-500/20 bg-gradient-to-br from-sky-100 via-white to-slate-100 dark:from-sky-500/10 dark:via-white/5 dark:to-slate-500/10">
                          <div className="border-b border-sky-500/15 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                            Systems diagrams
                          </div>
                          <img src={financeVisuals[0].src} alt={financeVisuals[0].title} className="h-[230px] w-full object-cover object-top" />
                        </div>
                      ) : project.id === "events" ? (
                        <div className="h-full overflow-hidden rounded-[1.4rem] border border-orange-500/20 bg-gradient-to-br from-[#1b120d] via-[#11100d] to-[#0f172a]">
                          <div className="flex items-center justify-between border-b border-orange-400/15 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                            <span>Product screens</span>
                            <span className="text-white/45">3 views</span>
                          </div>
                          <div className="flex h-[230px] items-center justify-center p-4">
                            <div className="mx-auto max-w-[240px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                              <img src={r4v3Visuals[0].src} alt={r4v3Visuals[0].title} className="w-full object-cover object-top" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full overflow-hidden rounded-[1.4rem] border border-black/8 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:border-white/10 dark:from-white/5 dark:via-white/5 dark:to-slate-500/10">
                          <div className="border-b border-black/8 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 dark:border-white/10 dark:text-white/45">
                            Dashboard preview
                          </div>
                          <img src={project.image} alt={project.title} className="h-[230px] w-full object-cover object-center" />
                        </div>
                      )}
                    </div>
                    {project.metrics.length && project.id !== "spot" ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.metrics.map((item) => (
                          <span key={item} className="rounded-full border border-black/8 bg-white/85 px-3 py-1.5 text-xs text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          <section id="experience" className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <SectionLabel>Experience</SectionLabel>
              <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Experience & Product Thinking</h2>
                <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-white/60">
                  Frontline sales, operations, logistics, and customer-facing work that shaped how I approach execution, process, and user needs.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 xl:grid-cols-2">
              {experience.map((item) => (
                <div key={`${item.company}-${item.role}`} className="rounded-[1.5rem] border border-black/6 bg-white/70 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-blue-500 dark:text-blue-300"><Briefcase className="h-4 w-4" /> {item.role}</div>
                      <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{item.company}</h3>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-white/50">{item.period}</div>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700 dark:text-white/65">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{point}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
            <div className="grid gap-6 lg:grid-cols-3">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group} className="rounded-[1.75rem] border border-black/6 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2 text-sm font-semibold"><Layers3 className="h-4 w-4 text-blue-500" /> {group}</div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className="rounded-full border border-black/8 px-3 py-1.5 text-xs text-black/70 dark:border-white/10 dark:text-white/70">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 pt-10 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-500 via-blue-600 to-slate-900 p-px shadow-[0_20px_80px_rgba(59,130,246,0.18)]">
              <div className="rounded-[calc(2rem-1px)] bg-white px-8 py-10 dark:bg-[#09111f] sm:px-10 lg:px-12">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <SectionLabel>Contact</SectionLabel>
                    <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Let's connect</h2>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-black/65 dark:text-white/65">
                      Open to product, PMM, and technical PM opportunities. Reach out via email or LinkedIn.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <a href={linkedInHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                    <a href="mailto:Medina.Leonardo41@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[#0f172a] dark:border-white/10 dark:text-white">
                      <Mail className="h-4 w-4" /> Email
                    </a>
                    <a href={resumeHref} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[#0f172a] dark:border-white/10 dark:text-white">
                      <Download className="h-4 w-4" /> Resume
                    </a>
                    <a href="tel:9095450907" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[#0f172a] dark:border-white/10 dark:text-white">
                      <Phone className="h-4 w-4" /> Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <AnimatePresence>
          {activeProject ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
              onClick={closeProject}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={(event) => event.stopPropagation()}
                className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-black/8 bg-[#f8fbff] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-[#07111e] sm:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-blue-500 dark:text-blue-300">{activeProject.category}</div>
                    <h3 className="mt-3 text-3xl font-semibold tracking-tight">{activeProject.title}</h3>
                    <div className="mt-2 text-sm text-black/55 dark:text-white/55">
                      {activeProject.id === "events"
                        ? "Founder & Product Manager — Designed and built an MVP for event-based social matching."
                        : `${activeProject.role} · ${activeProject.subtitle}`}
                    </div>
                  </div>
                  <button onClick={closeProject} className="rounded-full border border-black/10 p-2 text-[#0f172a] dark:border-white/10 dark:text-white" aria-label="Close modal">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {activeProject.metrics.length && activeProject.id !== "spot" ? (
                  <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    {activeProject.metrics.map((metric) => (
                      <div key={metric} className="rounded-2xl border border-black/6 bg-white/80 p-4 text-sm dark:border-white/10 dark:bg-white/5">{metric}</div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-8 space-y-4">
                  {activeProject.id === "finance" ? (
                    <div className="overflow-hidden rounded-[1.5rem] border border-sky-500/20 bg-gradient-to-br from-sky-50 via-white to-slate-50 shadow-[0_18px_50px_rgba(14,116,144,0.08)] dark:from-sky-500/10 dark:via-[#07111e] dark:to-slate-500/10 dark:shadow-none">
                      <button
                        type="button"
                        onClick={() => toggleSection("finance-visuals")}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">Visual appendix</div>
                          <div className="mt-1 text-base font-semibold text-[#0f172a] dark:text-white">Direct PDF diagrams from the automotive systems project</div>
                          <div className="mt-1 text-xs text-[#475569] dark:text-white/60">4 diagrams, pages 15, 18, 19, 20</div>
                        </div>
                        <ChevronDown className={`h-5 w-5 shrink-0 text-sky-700 transition-transform dark:text-sky-300 ${expandedSections.includes("finance-visuals") ? "rotate-180" : ""}`} />
                      </button>
                      {expandedSections.includes("finance-visuals") ? (
                        <div className="border-t border-sky-500/15 px-5 pb-5 pt-4">
                          <div className="grid gap-4 lg:grid-cols-2">
                            {financeVisuals.map((visual) => (
                              <figure key={visual.src} className="overflow-hidden rounded-[1.25rem] border border-sky-500/15 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#08101c] dark:shadow-none">
                                <img src={visual.src} alt={visual.title} className="w-full object-cover object-top" />
                                <figcaption className="border-t border-black/5 px-4 py-3 dark:border-white/10">
                                  <div className="text-sm font-semibold text-[#0f172a] dark:text-white">{visual.title}</div>
                                  <div className="mt-1 text-xs leading-6 text-[#475569] dark:text-white/60">{visual.caption}</div>
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {activeProject.id === "events" ? (
                    <>
                      <div className="overflow-hidden rounded-[1.5rem] border border-orange-500/20 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.14),transparent_45%),linear-gradient(135deg,#130e0a,#0b1020)] shadow-[0_24px_70px_rgba(15,23,42,0.24)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                        <div className="flex items-center justify-between gap-4 px-5 py-4 text-left">
                          <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-orange-300">Product walkthrough</div>
                            <div className="mt-1 text-base font-semibold text-white">Event-Based Matching Flow</div>
                            <div className="mt-1 text-xs text-white/55">Browse, opt-in, coordinate</div>
                          </div>
                        </div>
                        <div className="border-t border-white/10 px-5 pb-5 pt-4">
                          <div className="grid gap-4 lg:grid-cols-3 lg:items-start">
                            {r4v3Visuals.map((visual, index) => (
                              <figure key={visual.src} className={`overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c0c0f] shadow-[0_18px_40px_rgba(0,0,0,0.28)] ${index === 1 ? "lg:-mt-3" : ""}`}>
                                <div className="flex h-[540px] items-start justify-center overflow-hidden bg-black p-3">
                                  <div className={`h-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#121217] shadow-[0_12px_28px_rgba(0,0,0,0.35)] ${index === 1 ? "w-[19.75rem]" : "w-[18.5rem]"}`}>
                                    <img src={visual.src} alt={visual.title} className="h-full w-full object-contain object-top" />
                                  </div>
                                </div>
                                <figcaption className="border-t border-white/10 px-4 py-4">
                                  <div className="text-sm font-semibold text-white">{visual.title}</div>
                                  <div className="mt-1 text-sm leading-6 text-white/65">{visual.caption}</div>
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 grid gap-4">
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Goal</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.overview}</p>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Problem</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.problem}</p>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Insight</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.insight}</p>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Solution</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.solution}</p>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-xs uppercase tracking-[0.2em] text-blue-500 dark:text-blue-300">User Flow</div>
                          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-stretch md:justify-between">
                            {activeProject.userFlow.map((step, index) => (
                              <React.Fragment key={step.step}>
                                <div className="flex-1 rounded-[1.1rem] border border-black/8 bg-[#f8fbff] p-4 dark:border-white/10 dark:bg-[#07111e]">
                                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500 dark:text-blue-300">Step {step.step}</div>
                                  <div className="mt-2 text-base font-semibold text-[#0f172a] dark:text-white">{step.title}</div>
                                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/60">{step.description}</p>
                                </div>
                                {index < activeProject.userFlow.length - 1 ? (
                                  <>
                                    <div className="hidden items-center justify-center text-slate-400 dark:text-white/35 md:flex">
                                      <ChevronRight className="h-5 w-5" />
                                    </div>
                                    <div className="flex items-center justify-center text-slate-400 dark:text-white/35 md:hidden">
                                      <ChevronDown className="h-5 w-5" />
                                    </div>
                                  </>
                                ) : null}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Key Decisions</div>
                          <ul className="mt-3 space-y-4">
                            {activeProject.decisionDetails.map((item) => (
                              <li key={item.title} className="flex gap-3">
                                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                <div>
                                  <div className="text-sm font-semibold leading-7 text-[#0f172a] dark:text-white">{item.title}</div>
                                  <p className="text-sm leading-6 text-slate-600 dark:text-white/60">{item.rationale}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Tradeoffs</div>
                          <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                            {activeProject.tradeoffs.map((item) => (
                              <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Metrics</div>
                          <div className="mt-3 space-y-4 text-sm leading-7 text-black/68 dark:text-white/68">
                            <div>
                              <div className="font-semibold text-[#0f172a] dark:text-white">Primary</div>
                              <div className="mt-2 flex gap-3">
                                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                <span>% of users connecting with at least one person per event</span>
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-[#0f172a] dark:text-white">Supporting</div>
                              <ul className="mt-2 space-y-2">
                                {activeProject.futureMetrics.map((item) => (
                                  <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Outcome</div>
                          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.outcome}</p>
                        </div>
                        <div className="rounded-[1.35rem] border border-black/8 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Product Thinking</div>
                          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.productThinking}</p>
                        </div>
                      </div>
                    </>
                  ) : null}

                  {activeProject.id === "finance" ? (
                    <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                      <div className="space-y-6">
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Problem</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.problem}</p>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Insight</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.insight}</p>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Product Direction</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.productDirection}</p>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Outcome</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.outcome}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Key Product Decisions</div>
                          <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                            {activeProject.decisions.map((item) => (
                              <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Tradeoffs</div>
                          <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                            {activeProject.tradeoffs.map((item) => (
                              <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Next Steps</div>
                          <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                            {activeProject.nextSteps.map((item) => (
                              <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : activeProject.id === "spot" ? (
                    <>
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {activeProject.statHighlights.map((item) => (
                          <div key={item} className="rounded-[1.2rem] border border-black/8 bg-white/80 px-4 py-4 text-sm font-medium leading-6 text-[#0f172a] shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none">
                            {item}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c0c0f] shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                        <img src={activeProject.image} alt={activeProject.title} className="w-full object-cover object-top" />
                      </div>

                      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="space-y-5">
                          <div>
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Context</div>
                            <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.context}</p>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Problem</div>
                            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.problem}</p>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Technical Execution</div>
                            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.technicalExecution}</p>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Scope & Constraints</div>
                            <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                              {activeProject.scopeConstraints.map((item) => (
                                <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-2">
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Product Thinking</div>
                            <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.productThinking}</p>
                          </div>
                        </div>

                        <div className="space-y-5">
                          <div>
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Dashboard Overview</div>
                            <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">
                              Integrates lead volume, conversion, cost, and profit into a single view, enabling direct comparison of acquisition channel performance and ROI across Jan–Apr 2025 vs Jan–Apr 2026.
                            </p>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Key Insights</div>
                            <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                              {activeProject.insights.map((item) => (
                                <li key={item} className="whitespace-pre-line">{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Tradeoffs Identified</div>
                            <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                              {activeProject.tradeoffs.map((item) => (
                                <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Product / Business Decisions</div>
                            <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                              {activeProject.decisions.map((item) => (
                                <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Impact</div>
                            <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                              {activeProject.impact.map((item) => (
                                <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                      <div className="space-y-6">
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Problem</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.problem}</p>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Insight</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.insight}</p>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Outcome</div>
                          <p className="mt-2 text-sm leading-7 text-black/68 dark:text-white/68">{activeProject.outcome}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Key Decisions</div>
                          <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                            {activeProject.decisions.map((item) => (
                              <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-500 dark:text-blue-300">Tradeoffs</div>
                          <ul className="mt-3 space-y-3 text-sm leading-7 text-black/68 dark:text-white/68">
                            {activeProject.tradeoffs.map((item) => (
                              <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" /> <span>{item}</span></li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
