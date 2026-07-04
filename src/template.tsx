import {
	type ReactNode,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
	useContext,
} from "react";

/* ============================================================================
 *  EXPORTED TYPES
 *  (data model preserved — only optionality tightened where needed so Real
 *   Portfolio Mode can omit fields without rendering placeholders.)
 * ========================================================================== */

export type NavLink = { id: string; label: string };
export type SkillTag = {
	label: string;
	category: "Design" | "Editing" | "Marketing" | "Creative Tools";
};
export type Project = {
	title: string;
	client?: string;
	description: string;
	tags: string[];
	year: string;
	highlights?: string[];
};
export type TimelineEntry = {
	role: string;
	company: string;
	period: string;
	description: string;
};
export type EducationEntry = {
	degree: string;
	institution: string;
	period: string;
	description?: string;
};
export type CertificationEntry = {
	title: string;
	issuer: string;
	year: string;
};
export type TestimonialEntry = { quote: string; author: string; role: string };
export type ServiceEntry = {
	title: string;
	description: string;
	bullets?: string[];
};
export type StatEntry = { value: string; label: string };

export type TemplateData = {
	brand: {
		name?: string;
		initials?: string;
		title?: string;
		tagline?: string;
		location?: string;
		email?: string;
		phone?: string;
	};
	navLinks?: NavLink[];
	about?: {
		story?: string;
		philosophy?: string;
		stats?: StatEntry[];
	};
	skills?: SkillTag[];
	projects?: Project[];
	experience?: TimelineEntry[];
	education?: EducationEntry[];
	certifications?: CertificationEntry[];
	testimonials?: TestimonialEntry[];
	services?: ServiceEntry[];
};

export interface TemplateProps {
	/**
	 * Portfolio data to render.
	 *  - In Real Portfolio Mode, pass the actual user's data. Sections / fields
	 *    that are missing or empty will be hidden — never replaced with mocks.
	 *  - In Demo / Browse Mode, explicitly pass `DEFAULT_DATA`.
	 *  - If omitted entirely, nothing user-facing is rendered (no fallback).
	 */
	portfolioData?: TemplateData;
	theme?: "light" | "dark";
}

/* ============================================================================
 *  DEFAULT DATA  (only used when EXPLICITLY passed by the browse/demo flow)
 * ========================================================================== */

export const DEFAULT_DATA: TemplateData = {
	brand: {
		name: "Aarav Khanna",
		initials: "AK",
		title: "Independent Brand Designer & Art Director",
		tagline:
			"I help Indian brands and creators build identities, art direction and editorial systems that feel rooted, modern and unmistakably theirs.",
		location: "Bengaluru, Karnataka",
		email: "hello@aaravkhanna.studio",
		phone: "+91 98450 12345",
	},
	navLinks: [
		{ id: "home", label: "Home" },
		{ id: "about", label: "About" },
		{ id: "work", label: "Work" },
		{ id: "services", label: "Services" },
		{ id: "experience", label: "Experience" },
		{ id: "voices", label: "Voices" },
		{ id: "contact", label: "Contact" },
	],
	about: {
		story:
			"I believe design is the quiet architecture of attention. Over the past eight years I've directed campaigns, edited films and built brand worlds for clients ranging from independent ateliers in Jaipur to cultural institutions in Mumbai. My practice sits at the intersection of editorial, motion and identity — disciplined, sensual and deeply human.",
		philosophy:
			"Craft over trend. Story over noise. Every frame, word and grid should earn its place. I work in long arcs with the people I trust, and I treat each brief as a collaboration, not a transaction.",
		stats: [
			{ value: "8+", label: "Years in practice" },
			{ value: "60+", label: "Brands shaped" },
			{ value: "18", label: "Awards & features" },
		],
	},
	skills: [
		{ label: "Brand Identity", category: "Design" },
		{ label: "Editorial Layout", category: "Design" },
		{ label: "Type Design", category: "Design" },
		{ label: "Art Direction", category: "Design" },
		{ label: "Color Systems", category: "Design" },
		{ label: "Adobe Premiere Pro", category: "Editing" },
		{ label: "DaVinci Resolve", category: "Editing" },
		{ label: "After Effects", category: "Editing" },
		{ label: "Final Cut Pro", category: "Editing" },
		{ label: "Social Strategy", category: "Marketing" },
		{ label: "Campaign Direction", category: "Marketing" },
		{ label: "Content Calendars", category: "Marketing" },
		{ label: "Figma", category: "Creative Tools" },
		{ label: "Photoshop", category: "Creative Tools" },
		{ label: "Illustrator", category: "Creative Tools" },
		{ label: "InDesign", category: "Creative Tools" },
		{ label: "Blender", category: "Creative Tools" },
	],
	projects: [
		{
			title: "Kala — Cultural Festival Identity",
			client: "Kala Foundation, Mumbai",
			description:
				"A complete identity system for a pan-Indian visual arts festival — wordmark, print series, signage and a films programme. Built around a custom display typeface inspired by Devanagari calligraphy.",
			tags: ["Brand Identity", "Type", "Print"],
			year: "2025",
			highlights: [
				"Wordmark + sub-brand system",
				"60-page risograph print series",
				"Festival signage across 4 cities",
			],
		},
		{
			title: "Saffron & Sandal — Spice Brand",
			client: "Saffron & Sandal Co., Kochi",
			description:
				"Repositioning a 40-year-old Kerala spice house for a new generation. Packaging, e-commerce art direction and a launch campaign shot in the spice plantations of Wayanad.",
			tags: ["Packaging", "Art Direction", "Photography"],
			year: "2024",
			highlights: [
				"12 SKUs of new packaging",
				"Editorial launch film",
				"+38% reorder rate in 6 months",
			],
		},
		{
			title: "Noor — Documentary Short",
			client: "Independent, Delhi",
			description:
				"Edited and color-graded a 22-minute documentary on female calligraphers from Old Delhi. Premiered at the Mumbai Frameline Festival in early 2024.",
			tags: ["Video Editing", "Color", "Documentary"],
			year: "2024",
			highlights: [
				"22-min director's cut",
				"Mumbai Frameline selection",
				"DD/5.1 sound design",
			],
		},
	],
	experience: [
		{
			role: "Independent Brand Designer",
			company: "Self-employed",
			period: "2021 — Present",
			description:
				"Lead visual direction for cultural institutions and fashion houses across India. Direct campaigns, edit short-form film and design brand systems end-to-end.",
		},
		{
			role: "Senior Art Director",
			company: "Forma Studio, Mumbai",
			period: "2017 — 2021",
			description:
				"Directed brand identity and editorial work for clients across India and the GCC. Mentored a team of four designers and one editor.",
		},
		{
			role: "Designer & Editor",
			company: "Casa Comum, Bengaluru",
			period: "2014 — 2017",
			description:
				"Hybrid role spanning editorial design, in-house video editing and the launch of the studio's digital magazine.",
		},
	],
	education: [
		{
			degree: "MA, Visual Communication",
			institution: "National Institute of Design, Ahmedabad",
			period: "2012 — 2014",
			description: "Specialised in editorial systems and typography.",
		},
		{
			degree: "BA, Graphic Design",
			institution: "Srishti Institute of Art, Design & Technology, Bengaluru",
			period: "2008 — 2012",
		},
	],
	certifications: [
		{ title: "Brand Strategy Essentials", issuer: "Domus India", year: "2023" },
		{
			title: "Color Grading with DaVinci Resolve",
			issuer: "FilmSkills",
			year: "2022",
		},
		{ title: "Editorial Typography", issuer: "Type@Cooper", year: "2021" },
		{
			title: "Motion Design Foundations",
			issuer: "School of Motion",
			year: "2020",
		},
	],
	testimonials: [
		{
			quote:
				"Aarav rebuilt our identity from the type up. The wordmark alone finally gives the festival the gravity it has always deserved. He works slowly, carefully, and the work is better for it.",
			author: "Priya Iyer",
			role: "Director, Kala Foundation",
		},
		{
			quote:
				"Working with Aarav is like editing with someone who already knows where the cut lives. Patient, precise and quietly opinionated — the way every editor should be.",
			author: "Rohan Mehta",
			role: "Director, Noor (doc. short)",
		},
		{
			quote:
				"He gave our forty-year-old spice brand a new visual language that still feels Indian. Sales have climbed every quarter since the relaunch.",
			author: "Anjali Thomas",
			role: "Founder, Saffron & Sandal Co.",
		},
	],
	services: [
		{
			title: "Brand Identity",
			description:
				"From naming and visual systems to guidelines and launch assets — identities built to last beyond the trend cycle.",
			bullets: [
				"Logo & wordmark",
				"Type system",
				"Color & motion",
				"Guidelines",
			],
		},
		{
			title: "Art Direction",
			description:
				"Editorial direction for campaigns, lookbooks and digital stories. Concept, casting, locations and final execution.",
			bullets: [
				"Campaign concept",
				"Mood & treatment",
				"On-set direction",
				"Final edit",
			],
		},
		{
			title: "Video Editing & Color",
			description:
				"Short-form films, documentaries and brand films. Edit, sound design and grade in Resolve or Premiere.",
			bullets: ["Narrative edit", "Sound design", "Color grading", "Delivery"],
		},
		{
			title: "Social & Content",
			description:
				"Visual content systems for Instagram, LinkedIn and newsletters. Calendar, art direction, production and handover.",
			bullets: [
				"Content pillars",
				"Templates",
				"Production",
				"Monthly reports",
			],
		},
	],
};

/* ============================================================================
 *  INTERNAL HELPERS
 * ========================================================================== */

const cn = (...c: (string | false | undefined | null)[]) =>
	c.filter(Boolean).join(" ");

const nonEmptyStr = (v: unknown): v is string =>
	typeof v === "string" && v.trim().length > 0;

const nonEmptyArr = <T,>(v: T[] | undefined | null): v is T[] =>
	Array.isArray(v) && v.length > 0;

/** Compute which sections actually have user data — used for nav filtering. */
function computePresence(data: TemplateData) {
	const brand = data.brand ?? {};
	const about = data.about ?? {};
	return {
		home:
			nonEmptyStr(brand.name) ||
			nonEmptyStr(brand.title) ||
			nonEmptyStr(brand.tagline) ||
			nonEmptyStr(brand.location) ||
			nonEmptyStr(brand.initials),
		about:
			nonEmptyStr(about.story) ||
			nonEmptyStr(about.philosophy) ||
			nonEmptyArr(about.stats),
		skills: nonEmptyArr(data.skills),
		work: nonEmptyArr(data.projects),
		experience: nonEmptyArr(data.experience),
		education: nonEmptyArr(data.education),
		certifications: nonEmptyArr(data.certifications),
		voices: nonEmptyArr(data.testimonials),
		services: nonEmptyArr(data.services),
		contact:
			nonEmptyStr(brand.email) ||
			nonEmptyStr(brand.phone) ||
			nonEmptyStr(brand.location),
	};
}

const EYEBROW_COLORS: Record<string, string> = {
	ember: "text-ember",
	plum: "text-plum",
	teal: "text-teal",
	moss: "text-moss",
	saffron: "text-saffron",
};

const CATEGORY_ACCENT: Record<SkillTag["category"], string> = {
	Design: "hover:bg-ember hover:text-paper hover:border-ember",
	Editing: "hover:bg-plum hover:text-paper hover:border-plum",
	Marketing: "hover:bg-teal hover:text-paper hover:border-teal",
	"Creative Tools": "hover:bg-moss hover:text-paper hover:border-moss",
};

const DOT_COLOR: Record<SkillTag["category"], string> = {
	Design: "bg-ember",
	Editing: "bg-plum",
	Marketing: "bg-teal",
	"Creative Tools": "bg-moss",
};

const PROJECT_GRADIENTS = [
	"from-saffron via-ember to-plum",
	"from-teal via-moss to-plum",
	"from-mustard via-saffron to-ember",
];
const TIMELINE_COLORS = [
	"bg-ember",
	"bg-plum",
	"bg-teal",
	"bg-moss",
	"bg-mustard",
];
const CERT_COLORS = [
	"bg-saffron/15 text-ember",
	"bg-plum/15 text-plum",
	"bg-teal/15 text-teal",
	"bg-mustard/15 text-mustard",
];
const VOICE_COLORS = [
	{ mark: "text-ember", bar: "bg-ember", bg: "from-saffron/10 to-transparent" },
	{ mark: "text-plum", bar: "bg-plum", bg: "from-plum/10 to-transparent" },
	{ mark: "text-teal", bar: "bg-teal", bg: "from-teal/10 to-transparent" },
];
const SERVICE_ACCENTS = [
	{ bg: "hover:border-ember hover:shadow-ember/20", num: "text-ember" },
	{ bg: "hover:border-plum hover:shadow-plum/20", num: "text-plum" },
	{ bg: "hover:border-teal hover:shadow-teal/20", num: "text-teal" },
	{ bg: "hover:border-moss hover:shadow-moss/20", num: "text-moss" },
];
const SERVICE_GLOW = [
	"bg-ember",
	"bg-plum",
	"bg-teal",
	"bg-moss",
	"bg-mustard",
	"bg-rose",
];
const STAT_ACCENTS = ["bg-saffron", "bg-plum", "bg-teal"];
const EDU_ACCENTS = ["bg-saffron", "bg-plum"];
const CATEGORY_ORDER: SkillTag["category"][] = [
	"Design",
	"Editing",
	"Marketing",
	"Creative Tools",
];

/* ============================================================================
 *  THEME CONTEXT (internal)
 * ========================================================================== */

type ThemeCtx = { theme: "light" | "dark"; toggle: () => void };
const ThemeContext = createContext<ThemeCtx | null>(null);
const useTheme = () => {
	const c = useContext(ThemeContext);
	if (!c) throw new Error("useTheme must be used within provider");
	return c;
};

/* ============================================================================
 *  SECTION WRAPPER (internal)
 * ========================================================================== */

function SectionWrap({
	id,
	eyebrow,
	eyebrowColor = "ember",
	title,
	description,
	children,
}: {
	id: string;
	eyebrow?: string;
	eyebrowColor?: string;
	title?: string;
	description?: string;
	children: ReactNode;
}) {
	return (
		<section
			id={id}
			className="scroll-mt-24 px-6 py-16 md:px-10 md:py-24 lg:py-28 mx-auto w-full max-w-7xl"
		>
			{(eyebrow || title || description) && (
				<header className="mb-12 max-w-3xl md:mb-16">
					{eyebrow && (
						<div
							className={cn(
								"mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em]",
								EYEBROW_COLORS[eyebrowColor] || EYEBROW_COLORS.ember,
							)}
						>
							<span className="h-px w-8 bg-current" />
							{eyebrow}
						</div>
					)}
					{title && (
						<h2 className="font-display text-4xl leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
							{title}
						</h2>
					)}
					{description && (
						<p className="mt-6 text-lg leading-relaxed text-neutral-600 md:text-xl">
							{description}
						</p>
					)}
				</header>
			)}
			{children}
		</section>
	);
}

/* ============================================================================
 *  NAVIGATION (internal)
 * ========================================================================== */

function Nav({
	data,
	presence,
}: {
	data: TemplateData;
	presence: ReturnType<typeof computePresence>;
}) {
	const { theme, toggle } = useTheme();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fn = () => setScrolled(window.scrollY > 80);
		fn();
		window.addEventListener("scroll", fn, { passive: true });
		return () => window.removeEventListener("scroll", fn);
	}, []);

	const go = useCallback(
		(id: string) => (e: React.MouseEvent) => {
			e.preventDefault();
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
			setOpen(false);
		},
		[],
	);

	// Only show nav links whose target section actually has data.
	const visibleLinks = useMemo(() => {
		const links = data.navLinks ?? [];
		const presenceByKey: Record<string, boolean> = {
			home: presence.home,
			about: presence.about,
			skills: presence.skills,
			work: presence.work,
			projects: presence.work,
			experience: presence.experience,
			education: presence.education,
			certifications: presence.certifications,
			voices: presence.voices,
			testimonials: presence.voices,
			services: presence.services,
			contact: presence.contact,
		};
		return links.filter((l) => {
			const key = l.id?.toLowerCase();
			if (key in presenceByKey) return presenceByKey[key];
			return true; // unknown custom section ids — leave to consumer
		});
	}, [data.navLinks, presence]);

	const brandName = nonEmptyStr(data.brand?.name) ? data.brand.name : "";
	const brandInitials = nonEmptyStr(data.brand?.initials)
		? data.brand.initials
		: "";

	// If nothing to anchor to and no brand label, render nothing.
	if (!brandName && !brandInitials && visibleLinks.length === 0) return null;

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-50 transition-all duration-300",
				scrolled
					? "border-b border-neutral-200/70 bg-paper/85 backdrop-blur-md"
					: "border-b border-transparent bg-transparent",
			)}
		>
			<div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10">
				{/* biome-ignore lint/a11y/useValidAnchor: smooth scroll anchor link */}
				<a
					href="#home"
					onClick={go("home")}
					className="flex items-center gap-2.5 font-display text-lg font-medium tracking-tight text-neutral-900"
				>
					{brandInitials && (
						<span className="relative grid h-8 w-8 place-items-center rounded-full bg-saffron text-xs font-semibold tracking-wider text-neutral-50">
							{brandInitials}
							<span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-ember ring-2 ring-paper" />
						</span>
					)}
					{brandName && <span className="hidden sm:inline">{brandName}</span>}
				</a>
				<nav className="hidden items-center gap-8 md:flex">
					{(data.navLinks || []).map((l, i) => (
						<a
							key={l.id}
							href={`#${l.id}`}
							onClick={go(l.id)}
							className={cn(
								"text-sm transition-colors hover:text-neutral-900 dark:hover:text-neutral-50",
								i % 3 === 1
									? "text-ember dark:text-saffraffron"
									: i % 3 === 2
										? "text-plum dark:text-lilac"
										: "text-neutral-600 dark:text-neutral-400",
							)}
						>
							{l.label}
						</a>
					))}
				</nav>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={toggle}
						aria-label="Toggle theme"
						className="grid h-11 w-11 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-saffron/15 hover:text-ember md:hover:bg-saffron/20 dark:text-neutral-200 dark:hover:bg-saffron/20 dark:hover:text-saffron"
					>
						{theme === "dark" ? (
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
							>
								<circle cx="12" cy="12" r="4" />
								<path
									d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
									strokeLinecap="round"
								/>
							</svg>
						) : (
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
							>
								<path
									d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
									strokeLinejoin="round"
								/>
							</svg>
						)}
					</button>
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-label="Toggle menu"
						className="grid h-11 w-11 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-200/70 md:hidden dark:text-neutral-200 dark:hover:bg-neutral-800/70"
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							{open ? (
								<path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
							) : (
								<>
									<path d="M4 7h16" strokeLinecap="round" />
									<path d="M4 17h16" strokeLinecap="round" />
								</>
							)}
						</svg>
					</button>
				</div>
			</div>
			{visibleLinks.length > 0 && (
				<div
					className={cn(
						"overflow-hidden border-t border-neutral-200/70 bg-paper/95 backdrop-blur-md md:hidden transition-[max-height,opacity] duration-300",
						open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
					)}
				>
					<nav className="no-scrollbar flex gap-6 overflow-x-auto px-6 py-4">
						{visibleLinks.map((l, i) => (
							<a
								key={l.id}
								href={`#${l.id}`}
								onClick={go(l.id)}
								className={cn(
									"whitespace-nowrap text-sm",
									i % 3 === 1
										? "text-ember"
										: i % 3 === 2
											? "text-plum"
											: "text-neutral-700",
								)}
							>
								{l.label}
							</a>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}

/* ============================================================================
 *  HERO
 * ========================================================================== */

function Hero({
	data,
	hasContact,
}: {
	data: TemplateData;
	hasContact: boolean;
}) {
	const go = (id: string) => () =>
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

	const brand = data.brand ?? {};
	const hasName = nonEmptyStr(brand.name);
	const hasInitials = nonEmptyStr(brand.initials);
	const hasLocation = nonEmptyStr(brand.location);
	const hasTitle = nonEmptyStr(brand.title);
	const hasTagline = nonEmptyStr(brand.tagline);

	// If literally nothing is provided for the hero, hide the whole section.
	if (
		!hasName &&
		!hasInitials &&
		!hasLocation &&
		!hasTitle &&
		!hasTagline &&
		!hasContact
	) {
		return null;
	}

	const nameParts = hasName ? (brand.name as string).trim().split(/\s+/) : [];

	return (
		<section
			id="home"
			className="relative overflow-hidden px-6 pb-20 pt-28 md:px-10 md:pt-36 lg:pb-24 lg:pt-44"
		>
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-saffron/30 blur-3xl" />
				<div className="absolute right-[-6rem] top-32 h-96 w-96 rounded-full bg-plum/25 blur-3xl" />
				<div className="absolute bottom-[-4rem] left-1/3 h-72 w-72 rounded-full bg-teal/25 blur-3xl" />
				<div className="absolute bottom-10 right-1/4 h-56 w-56 rounded-full bg-rose/40 blur-3xl" />
			</div>
			<div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
				<div className="lg:col-span-7">
					<div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-ember dark:text-saffron">
						<span className="h-px w-10 bg-ember dark:bg-saffron" />
						{data.brand.location}
					</div>
					<h1 className="font-display text-5xl leading-[0.95] tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-6xl md:text-7xl lg:text-[80px]">
						{nameParts[0]}
						{nameParts.length > 1 && (
							<span className="block italic text-plum dark:text-lilac">
								{nameParts.slice(1).join(" ")}
							</span>
						)}
					</h1>
					<p className="mt-7 max-w-xl font-display text-2xl leading-snug text-neutral-800 dark:text-neutral-200 md:text-3xl">
						{data.brand.title}
					</p>
					<p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
						{data.brand.tagline}
					</p>
					{hasContact && (
						<div className="mt-9 flex flex-wrap gap-3">
							<button
								type="button"
								onClick={go("contact")}
								className="group inline-flex h-12 items-center justify-center rounded-full bg-ember px-7 text-sm font-medium text-neutral-50 transition-all hover:-translate-y-0.5 hover:bg-plum active:translate-y-0 dark:bg-saffron dark:text-neutral-900 dark:hover:bg-lilac"
							>
								Get in touch
								<svg
									className="ml-2 transition-transform group-hover:translate-x-1"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<path
										d="M5 12h14M13 5l7 7-7 7"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					)}
					<div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
						{[
							{ c: "bg-saffron", l: "Brand" },
							{ c: "bg-plum", l: "Editorial" },
							{ c: "bg-teal", l: "Motion" },
							{ c: "bg-ember", l: "Type" },
							{ c: "bg-moss", l: "Print" },
						].map((t) => (
							<span key={t.l} className="flex items-center gap-2">
								<span className={cn("h-2 w-2 rounded-full", t.c)} /> {t.l}
							</span>
						))}
					</div>
				</div>
				{hasInitials && (
					<div className="lg:col-span-5">
						<div className="relative mx-auto w-full max-w-md">
							<div className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-full border-2 border-plum/40 sm:block" />
							<div className="absolute -bottom-6 -right-6 hidden h-28 w-28 rounded-3xl bg-mustard/40 sm:block" />
							<div className="relative aspect-square overflow-hidden rounded-3xl border border-neutral-900/10 bg-gradient-to-br from-saffron via-ember to-plum p-10 shadow-2xl shadow-plum/20">
								<div
									className="absolute inset-0 opacity-[0.10]"
									style={{
										backgroundImage:
											"linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
										backgroundSize: "32px 32px",
									}}
								/>
								<div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-paper/15" />
								<div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-teal/40" />
								<div className="relative flex h-full flex-col justify-between text-paper">
									<div className="flex items-start justify-between text-xs uppercase tracking-[0.2em] text-paper/80">
										<span>Studio</span>
									</div>
									<div className="font-display text-[180px] leading-none tracking-tighter text-paper sm:text-[200px]">
										{brand.initials}
									</div>
									<div className="flex items-end justify-between">
										<div>
											<div className="text-xs uppercase tracking-[0.2em] text-paper/80">
												Practice
											</div>
											<div className="mt-1 font-display text-lg text-paper">
												Brand · Editorial · Motion
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

/* ============================================================================
 *  ABOUT
 * ========================================================================== */

function About({ data }: { data: TemplateData }) {
	const about = data.about ?? {};
	const hasStory = nonEmptyStr(about.story);
	const hasPhilosophy = nonEmptyStr(about.philosophy);
	const hasStats = nonEmptyArr(about.stats);
	if (!hasStory && !hasPhilosophy && !hasStats) return null;

	return (
		<SectionWrap
			id="about"
			eyebrow="About"
			eyebrowColor="plum"
			title="A practice rooted in patience, story and craft."
		>
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
				{(hasStory || hasPhilosophy) && (
					<div className="space-y-6 lg:col-span-7">
						{hasStory && (
							<p className="text-lg leading-relaxed text-neutral-700 md:text-xl">
								{about.story}
							</p>
						)}
						{hasPhilosophy && (
							<blockquote className="border-l-2 border-ember pl-6 font-display text-xl italic leading-snug text-neutral-800 md:text-2xl">
								&ldquo;{about.philosophy}&rdquo;
							</blockquote>
						)}
					</div>
				)}
				{hasStats && (
					<div className="lg:col-span-5">
						<div className="grid grid-cols-3 gap-4">
							{about.stats!.map((s, i) => (
								<div
									key={s.label}
									className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-1"
								>
									<div
										className={cn(
											"absolute inset-x-0 top-0 h-1",
											STAT_ACCENTS[i % STAT_ACCENTS.length],
										)}
									/>
									{nonEmptyStr(s.value) && (
										<div className="font-display text-3xl tracking-tight text-neutral-900 md:text-4xl">
											{s.value}
										</div>
									)}
									{nonEmptyStr(s.label) && (
										<div className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
											{s.label}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</SectionWrap>
	);
}

/* ============================================================================
 *  SKILLS
 * ========================================================================== */

function Skills({ data }: { data: TemplateData }) {
	const skills = data.skills ?? [];
	const grouped = useMemo(() => {
		const map = new Map<SkillTag["category"], SkillTag[]>();
		skills.forEach((s) =>
			map.set(s.category, [...(map.get(s.category) ?? []), s]),
		);
		return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({
			category: c,
			items: map.get(c) ?? [],
		}));
	}, [skills]);

	if (!nonEmptyArr(skills)) return null;

	return (
		<SectionWrap
			id="skills"
			eyebrow="Toolkit"
			eyebrowColor="teal"
			title="Skills & tools, kept human."
			description="A snapshot of the disciplines and software I reach for most. None of this is a percentage — every tool listed here has shipped in real client work."
		>
			<div className="grid grid-cols-1 gap-10 md:grid-cols-2">
				{grouped.map(({ category, items }) => (
					<div key={category}>
						<div className="mb-5 flex items-baseline justify-between">
							<h3 className="flex items-center gap-3 font-display text-xl text-neutral-900">
								<span
									className={cn(
										"h-2.5 w-2.5 rounded-full",
										DOT_COLOR[category],
									)}
								/>
								{category}
							</h3>
							<span className="text-xs uppercase tracking-wider text-neutral-500">
								{items.length} items
							</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{items.map((s) => (
								<span
									key={s.label}
									className={cn(
										"inline-flex items-center rounded-full border border-neutral-300 bg-transparent px-4 py-2 text-sm text-neutral-800 transition-colors",
										CATEGORY_ACCENT[category],
									)}
								>
									{s.label}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</SectionWrap>
	);
}

/* ============================================================================
 *  PROJECTS
 * ========================================================================== */

function Projects({ data }: { data: TemplateData }) {
	if (!nonEmptyArr(data.projects)) return null;
	return (
		<SectionWrap
			id="work"
			eyebrow="Selected Work"
			eyebrowColor="ember"
			title="A handful of projects I'm proud of."
			description="A curated cross-section across identity, editorial and film. Full case studies are available on request."
		>
			<div className="space-y-5">
				{data.projects!.map((p, i) => (
					<article
						key={p.title}
						className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-plum/10 md:border-neutral-900/10"
					>
						<div
							className={cn(
								"h-2 w-full bg-gradient-to-r",
								PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length],
							)}
						/>
						<div className="grid grid-cols-1 gap-6 p-7 md:grid-cols-12 md:gap-8 md:p-9">
							<div className="flex items-start justify-between md:col-span-3 md:flex-col md:items-start md:justify-start md:gap-3">
								<div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
									Project / 0{i + 1}
								</div>
								{nonEmptyStr(p.year) && (
									<div
										className={cn(
											"font-display text-5xl leading-none tracking-tighter transition-colors md:text-6xl",
											i % 3 === 0
												? "text-ember"
												: i % 3 === 1
													? "text-plum"
													: "text-teal",
										)}
									>
										{p.year}
									</div>
								)}
							</div>
							<div className="md:col-span-9">
								<div className="flex flex-wrap items-baseline justify-between gap-3">
									{nonEmptyStr(p.title) && (
										<h3 className="font-display text-2xl leading-tight tracking-tight text-neutral-900 md:text-3xl">
											{p.title}
										</h3>
									)}
									{nonEmptyStr(p.client) && (
										<span className="text-sm text-neutral-500">{p.client}</span>
									)}
								</div>
								{nonEmptyStr(p.description) && (
									<p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
										{p.description}
									</p>
								)}
								{nonEmptyArr(p.highlights) && (
									<ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
										{p.highlights!.map((h, hi) => (
											<li
												key={h}
												className="flex items-start gap-2 text-sm text-neutral-700"
											>
												<span
													className={cn(
														"mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full",
														hi === 0
															? "bg-saffron"
															: hi === 1
																? "bg-plum"
																: "bg-teal",
													)}
												/>
												{h}
											</li>
										))}
									</ul>
								)}
								{nonEmptyArr(p.tags) && (
									<div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-5">
										<div className="flex flex-wrap gap-2">
											{p.tags.map((t, ti) => (
												<span
													key={t}
													className={cn(
														"rounded-full px-3 py-1 text-xs",
														ti === 0
															? "bg-saffron/15 text-ember"
															: ti === 1
																? "bg-plum/15 text-plum"
																: "bg-teal/15 text-teal",
													)}
												>
													{t}
												</span>
											))}
										</div>
										<button
											type="button"
											className="inline-flex items-center gap-1 text-sm font-medium text-ember underline-offset-4 hover:underline dark:text-saffron"
										>
											Read case study
											<svg
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												aria-hidden="true"
											>
												<path
													d="M5 12h14M13 5l7 7-7 7"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									</div>
								)}
							</div>
						</div>
					</article>
				))}
			</div>
		</SectionWrap>
	);
}

/* ============================================================================
 *  EXPERIENCE
 * ========================================================================== */

function Experience({ data }: { data: TemplateData }) {
	if (!nonEmptyArr(data.experience)) return null;
	return (
		<SectionWrap
			id="experience"
			eyebrow="Experience"
			eyebrowColor="saffron"
			title="A timeline of practice."
			description="Roles, studios and the years that shaped how I work. Each entry is a chapter, not a CV line."
		>
			<ol className="relative space-y-12 border-l-2 border-dashed border-neutral-300 pl-8 md:pl-12">
				{data.experience!.map((item, i) => (
					<li key={item.role + item.company} className="relative">
						<span
							className={cn(
								"absolute -left-[37px] top-2 grid h-4 w-4 place-items-center rounded-full ring-4 ring-paper md:-left-[49px]",
								TIMELINE_COLORS[i % TIMELINE_COLORS.length],
							)}
						>
							<span className="h-1.5 w-1.5 rounded-full bg-paper" />
						</span>
						<div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
							{(nonEmptyStr(item.role) || nonEmptyStr(item.company)) && (
								<h3 className="font-display text-2xl tracking-tight text-neutral-900">
									{item.role}
									{nonEmptyStr(item.company) && (
										<span className="text-plum">
											{nonEmptyStr(item.role) ? " · " : ""}
											{item.company}
										</span>
									)}
								</h3>
							)}
							{nonEmptyStr(item.period) && (
								<span className="text-sm uppercase tracking-wider text-neutral-500">
									{item.period}
								</span>
							)}
						</div>
						{nonEmptyStr(item.description) && (
							<p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
								{item.description}
							</p>
						)}
					</li>
				))}
			</ol>
		</SectionWrap>
	);
}

/* ============================================================================
 *  EDUCATION
 * ========================================================================== */

function Education({ data }: { data: TemplateData }) {
	if (!nonEmptyArr(data.education)) return null;
	return (
		<SectionWrap
			id="education"
			eyebrow="Education"
			eyebrowColor="plum"
			title="Where I trained."
		>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				{data.education!.map((e, i) => (
					<div
						key={e.degree}
						className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-plum/10"
					>
						<div
							className={cn(
								"absolute inset-y-0 left-0 w-1.5",
								EDU_ACCENTS[i % EDU_ACCENTS.length],
							)}
						/>
						<div className="pl-3">
							{nonEmptyStr(e.period) && (
								<div className="text-xs uppercase tracking-wider text-neutral-500">
									{e.period}
								</div>
							)}
							{nonEmptyStr(e.degree) && (
								<h3 className="mt-3 font-display text-xl text-neutral-900">
									{e.degree}
								</h3>
							)}
							{nonEmptyStr(e.institution) && (
								<div className="mt-1 text-sm text-neutral-700">
									{e.institution}
								</div>
							)}
							{nonEmptyStr(e.description) && (
								<p className="mt-4 text-sm leading-relaxed text-neutral-600">
									{e.description}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</SectionWrap>
	);
}

/* ============================================================================
 *  CERTIFICATIONS
 * ========================================================================== */

function Certifications({ data }: { data: TemplateData }) {
	if (!nonEmptyArr(data.certifications)) return null;
	return (
		<SectionWrap
			id="certifications"
			eyebrow="Credentials"
			eyebrowColor="teal"
			title="Continuing education."
			description="A selection of courses and certifications kept up to date each year."
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{data.certifications!.map((c, i) => (
					<div
						key={c.title}
						className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-ember"
					>
						<div
							className={cn(
								"mb-4 inline-grid h-10 w-10 place-items-center rounded-full",
								CERT_COLORS[i % CERT_COLORS.length],
							)}
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
							>
								<circle cx="12" cy="8" r="6" />
								<path
									d="M15.5 12.5 17 22l-5-3-5 3 1.5-9.5"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						{nonEmptyStr(c.title) && (
							<h3 className="font-display text-lg leading-snug text-neutral-900">
								{c.title}
							</h3>
						)}
						{nonEmptyStr(c.issuer) && (
							<div className="mt-2 text-sm text-neutral-600">{c.issuer}</div>
						)}
						{nonEmptyStr(c.year) && (
							<div className="mt-auto pt-4 text-xs uppercase tracking-wider text-neutral-500">
								{c.year}
							</div>
						)}
					</div>
				))}
			</div>
		</SectionWrap>
	);
}

/* ============================================================================
 *  TESTIMONIALS
 * ========================================================================== */

function Testimonials({ data }: { data: TemplateData }) {
	if (!nonEmptyArr(data.testimonials)) return null;
	return (
		<SectionWrap
			id="voices"
			eyebrow="Voices"
			eyebrowColor="ember"
			title="What clients have said."
			description="A few lines from the people I've had the privilege of working with."
		>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{data.testimonials!.map((t, i) => {
					const c = VOICE_COLORS[i % VOICE_COLORS.length];
					return (
						<figure
							key={i}
							className={cn(
								"relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-plum/10",
								c.bg,
							)}
						>
							<div className={cn("absolute left-0 top-0 h-1 w-12", c.bar)} />
							<svg
								className={cn("mb-6", c.mark)}
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4V7zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7z" />
							</svg>
							{nonEmptyStr(t.quote) && (
								<blockquote className="flex-1 text-base leading-relaxed text-neutral-800 md:text-lg">
									&ldquo;{t.quote}&rdquo;
								</blockquote>
							)}
							{(nonEmptyStr(t.author) || nonEmptyStr(t.role)) && (
								<figcaption className="mt-6 border-t border-neutral-200 pt-5">
									{nonEmptyStr(t.author) && (
										<div className="font-display text-base text-neutral-900">
											{t.author}
										</div>
									)}
									{nonEmptyStr(t.role) && (
										<div className="text-sm text-neutral-500">{t.role}</div>
									)}
								</figcaption>
							)}
						</figure>
					);
				})}
			</div>
		</SectionWrap>
	);
}

/* ============================================================================
 *  SERVICES
 * ========================================================================== */

function Services({ data }: { data: TemplateData }) {
	if (!nonEmptyArr(data.services)) return null;
	return (
		<SectionWrap
			id="services"
			eyebrow="Services"
			eyebrowColor="moss"
			title="What I can help you with."
			description="A starting menu of disciplines I offer end-to-end. Every engagement is bespoke — these are starting points, not packages."
		>
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{data.services!.map((s, i) => {
					const a = SERVICE_ACCENTS[i % SERVICE_ACCENTS.length];
					return (
						<article
							key={s.title}
							className={cn(
								"group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
								a.bg,
							)}
						>
							<div
								className={cn(
									"absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60",
									SERVICE_GLOW[i % SERVICE_GLOW.length],
								)}
							/>
							<div className="relative mb-6 flex items-center justify-between">
								<span
									className={cn(
										"font-mono text-xs uppercase tracking-wider",
										a.num,
									)}
								>
									0{i + 1}
								</span>
								<span
									className={cn(
										"h-px w-12 bg-current opacity-40 transition-all group-hover:w-20 group-hover:opacity-100",
										a.num,
									)}
								/>
							</div>
							{nonEmptyStr(s.title) && (
								<h3 className="relative font-display text-2xl tracking-tight text-neutral-900">
									{s.title}
								</h3>
							)}
							{nonEmptyStr(s.description) && (
								<p className="relative mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
									{s.description}
								</p>
							)}
							{nonEmptyArr(s.bullets) && (
								<ul className="relative mt-6 flex flex-wrap gap-2">
									{s.bullets!.map((b) => (
										<li
											key={b}
											className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
										>
											{b}
										</li>
									))}
								</ul>
							)}
						</article>
					);
				})}
			</div>
		</SectionWrap>
	);
}

/* ============================================================================
 *  CONTACT
 * ========================================================================== */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact({ data }: { data: TemplateData }) {
	const brand = data.brand ?? {};
	const hasEmail = nonEmptyStr(brand.email);
	const hasPhone = nonEmptyStr(brand.phone);
	const hasLocation = nonEmptyStr(brand.location);

	const [values, setValues] = useState({ name: "", email: "", message: "" });
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");

	if (!hasEmail && !hasPhone && !hasLocation) return null;

	const validate = () => {
		const e: Record<string, string> = {};
		if (!values.name.trim()) e.name = "Please tell me your name.";
		if (!values.email.trim()) e.email = "An email is required.";
		else if (!EMAIL_RE.test(values.email.trim()))
			e.email = "That doesn't look like a valid email.";
		if (!values.message.trim())
			e.message = "A short message helps me reply well.";
		else if (values.message.trim().length < 10)
			e.message = "A few more words, please (10+ characters).";
		return e;
	};

	const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const v = validate();
		setErrors(v);
		if (Object.keys(v).length) return;
		setStatus("submitting");
		try {
			await new Promise((r) => setTimeout(r, 1500));
			setStatus("success");
			setValues({ name: "", email: "", message: "" });
		} catch {
			setStatus("error");
		}
	};

	const inputCls = (err?: string) =>
		cn(
			"w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1",
			err
				? "border-red-400 focus:border-red-500 focus:ring-red-200"
				: "border-neutral-300 focus:border-plum focus:ring-plum/30",
		);

	return (
		<SectionWrap
			id="contact"
			eyebrow="Contact"
			eyebrowColor="ember"
			title="Let's make something good."
			description="Tell me about your project, your brand or your idea. I read every message and reply within two working days."
		>
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
				<div className="lg:col-span-7">
					{status === "success" ? (
						<div
							role="status"
							className="rounded-3xl border border-teal/40 bg-teal/10 p-8 text-neutral-900"
						>
							<div className="mb-2 inline-flex items-center gap-2 rounded-full bg-teal/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-teal">
								<span className="h-2 w-2 rounded-full bg-teal" /> Sent
							</div>
							<h3 className="font-display text-2xl">
								Thank you! Your message has been sent.
							</h3>
							<p className="mt-2 text-sm leading-relaxed">
								I'll get back to you shortly.
							</p>
							<button
								type="button"
								onClick={() => setStatus("idle")}
								className="mt-6 inline-flex h-11 items-center rounded-full border border-teal px-5 text-sm font-medium text-teal hover:bg-teal hover:text-paper"
							>
								Send another message
							</button>
						</div>
					) : (
						<form onSubmit={onSubmit} noValidate className="space-y-5">
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
								<div>
									<label
										htmlFor="name"
										className="mb-2 block text-xs uppercase tracking-wider text-neutral-500"
									>
										Name
									</label>
									<input
										id="name"
										type="text"
										autoComplete="name"
										value={values.name}
										onChange={(e) =>
											setValues((v) => ({ ...v, name: e.target.value }))
										}
										className={inputCls(errors.name)}
										placeholder="Your full name"
									/>
									{errors.name && (
										<p className="mt-2 text-xs text-red-500">{errors.name}</p>
									)}
								</div>
								<div>
									<label
										htmlFor="email"
										className="mb-2 block text-xs uppercase tracking-wider text-neutral-500"
									>
										Email
									</label>
									<input
										id="email"
										type="email"
										autoComplete="email"
										value={values.email}
										onChange={(e) =>
											setValues((v) => ({ ...v, email: e.target.value }))
										}
										className={inputCls(errors.email)}
										placeholder="you@studio.com"
									/>
									{errors.email && (
										<p className="mt-2 text-xs text-red-500">{errors.email}</p>
									)}
								</div>
							</div>
							<div>
								<label
									htmlFor="message"
									className="mb-2 block text-xs uppercase tracking-wider text-neutral-500"
								>
									Message
								</label>
								<textarea
									id="message"
									rows={6}
									value={values.message}
									onChange={(e) =>
										setValues((v) => ({ ...v, message: e.target.value }))
									}
									className={inputCls(errors.message)}
									placeholder="Tell me about your project, timeline and budget…"
								/>
								{errors.message && (
									<p className="mt-2 text-xs text-red-500">{errors.message}</p>
								)}
							</div>
							{status === "error" && (
								<div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
									Something went wrong. Try again, or email me directly.
								</div>
							)}
							<button
								type="submit"
								disabled={status === "submitting"}
								className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-full bg-gradient-to-r from-ember via-plum to-plum px-7 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
							>
								{status === "submitting" ? (
									<>
										<svg
											className="mr-2 animate-spin"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											aria-hidden="true"
										>
											<path
												d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
												strokeLinecap="round"
											/>
										</svg>
										Sending…
									</>
								) : (
									<>
										Send message
										<svg
											className="ml-2"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											aria-hidden="true"
										>
											<path
												d="M5 12h14M13 5l7 7-7 7"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</>
								)}
							</button>
						</form>
					)}
				</div>
				<aside className="space-y-5 lg:col-span-5">
					<div className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white p-7">
						<div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-saffron/20 blur-2xl" />
						<div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-plum/20 blur-2xl" />
						<div className="relative">
							<div className="text-xs uppercase tracking-wider text-neutral-500">
								Direct lines
							</div>
							<ul className="mt-5 space-y-5">
								{hasEmail && (
									<li>
										<div className="text-xs uppercase tracking-wider text-ember">
											Email
										</div>
										<a
											href={`mailto:${brand.email}`}
											className="mt-1 block font-display text-xl text-neutral-900 hover:underline"
										>
											{brand.email}
										</a>
									</li>
								)}
								{hasPhone && (
									<li>
										<div className="text-xs uppercase tracking-wider text-plum">
											Phone
										</div>
										<a
											href={`tel:${(brand.phone as string).replace(/\s+/g, "")}`}
											className="mt-1 block font-display text-xl text-neutral-900 hover:underline"
										>
											{brand.phone}
										</a>
									</li>
								)}
								{hasLocation && (
									<li>
										<div className="text-xs uppercase tracking-wider text-teal">
											Studio
										</div>
										<div className="mt-1 font-display text-xl text-neutral-900">
											{brand.location}
										</div>
									</li>
								)}
							</ul>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-plum via-ember to-saffron p-7 text-paper">
						<div
							className="absolute inset-0 opacity-20"
							style={{
								backgroundImage:
									"radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0, transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0, transparent 40%)",
							}}
						/>
						<div className="relative">
							<div className="font-display text-lg">
								Currently booking projects for Q3.
							</div>
							<p className="mt-2 text-sm leading-relaxed text-paper/90">
								I take on a small number of clients each quarter so I can stay
								close to the work.
							</p>
						</div>
					</div>
				</aside>
			</div>
		</SectionWrap>
	);
}

/* ============================================================================
 *  FOOTER
 * ========================================================================== */

function Footer({ data }: { data: TemplateData }) {
	const brand = data.brand ?? {};
	const hasName = nonEmptyStr(brand.name);
	const hasTitle = nonEmptyStr(brand.title);
	const hasLocation = nonEmptyStr(brand.location);
	const hasEmail = nonEmptyStr(brand.email);
	const hasPhone = nonEmptyStr(brand.phone);

	if (!hasName && !hasTitle && !hasLocation && !hasEmail && !hasPhone)
		return null;

	const year = new Date().getFullYear();
	const nameParts = hasName ? (brand.name as string).trim().split(/\s+/) : [];

	return (
		<footer className="relative overflow-hidden border-t border-neutral-200 px-6 py-12 md:px-10">
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent" />
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
				<div>
					{hasName && (
						<div className="font-display text-3xl tracking-tight text-neutral-900">
							{nameParts[0]}
							{nameParts.length > 1 && (
								<span className="text-ember">
									{" "}
									{nameParts.slice(1).join(" ")}
								</span>
							)}
						</div>
					)}
					{(hasTitle || hasLocation) && (
						<p className="mt-2 max-w-md text-sm text-neutral-500">
							{hasTitle ? brand.title : ""}
							{hasTitle && hasLocation ? ". " : ""}
							{hasLocation ? brand.location : ""}
							{(hasTitle || hasLocation) && "."}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 text-sm md:items-end">
					{hasEmail && (
						<a
							href={`mailto:${brand.email}`}
							className="text-plum hover:text-ember"
						>
							{brand.email}
						</a>
					)}
					{hasPhone && (
						<a
							href={`tel:${(brand.phone as string).replace(/\s+/g, "")}`}
							className="text-plum hover:text-ember"
						>
							{brand.phone}
						</a>
					)}
					<div className="text-xs text-neutral-500">
						&copy; {year}
						{hasName ? ` ${brand.name}` : ""}. All work shown is owned by its
						respective client.
					</div>
				</div>
			</div>
		</footer>
	);
}

/* ============================================================================
 *  CreativeTemplate — MAIN EXPORT
 * ==========================================================================
 *  Modes:
 *   - Demo / Browse Mode: pass `DEFAULT_DATA` explicitly.
 *       <CreativeTemplate portfolioData={DEFAULT_DATA} />
 *   - Real Portfolio Mode: pass the actual user's data.
 *       <CreativeTemplate portfolioData={userData} />
 *
 *  In Real Portfolio Mode, sections and fields with no data are hidden.
 *  No default / mock content is ever rendered as a fallback.
 * ========================================================================== */

const EMPTY_DATA: TemplateData = { brand: {} };

export default function CreativeTemplate({
	portfolioData,
	theme: initialTheme,
}: TemplateProps) {
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		if (typeof window === "undefined") return initialTheme ?? "light";
		if (initialTheme) return initialTheme;
		const stored = window.localStorage.getItem("portfolio-theme") as
			| "light"
			| "dark"
			| null;
		return (
			stored ??
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light")
		);
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		window.localStorage.setItem("portfolio-theme", theme);
	}, [theme]);

	// IMPORTANT: do not silently fall back to DEFAULT_DATA. Real portfolios that
	// omit fields should simply hide those sections.
	const data: TemplateData = portfolioData ?? EMPTY_DATA;
	const presence = useMemo(() => computePresence(data), [data]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
			}}
		>
			<div className="min-h-screen bg-paper text-ink antialiased">
				<Nav data={data} presence={presence} />
				<main>
					<Hero data={data} hasContact={presence.contact} />
					<About data={data} />
					<Skills data={data} />
					<Projects data={data} />
					<Experience data={data} />
					<Education data={data} />
					<Certifications data={data} />
					<Testimonials data={data} />
					<Services data={data} />
					<Contact data={data} />
				</main>
				<Footer data={data} />
			</div>
		</ThemeContext.Provider>
	);
}
