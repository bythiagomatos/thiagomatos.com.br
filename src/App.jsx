import React from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Loader from "./Loader.jsx";


/**
 * Meu Portfolio ( SPA Single file React app)
 * --------------------------------------------------
 * • Home = masonry-like grid of works
 * • Clicking a work opens a beautiful case page (hero + sections)
 * • Built with Tailwind classes (no setup needed in this preview)
 * • Animations via framer-motion; routing via react-router-dom
 * • Edit the `PROJECTS` array below to add real content
 */

// -----------------------------
//  Mini CMS: Meus proejtos aqui 
// -----------------------------

const PROJECTS = [
  {
    id: "Batata, Óleo e Sal",
    slug: "Batata, Óleo e Sal",
    client: "Lay's",
    title: "BATATA, ÓLEO E SAL*",
    tagline:
      "Turning every victory photo into a discount hunt — hiding coupon codes inside the confetti.",
    year: 2024,
    coverPoster: `${import.meta.env.BASE_URL}Works/Lays/Cover-Lays.jpeg`,   // imagem leve
    coverVideo:  `${import.meta.env.BASE_URL}Works/Lays/Cover-Lays.mp4`,   // vídeo leve (principal)
    coverVideoMp4: `${import.meta.env.BASE_URL}Works/Lays/Cover-Lays.mp4`, // fallback p/ Safari antigo (opcional)
    cover: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?_gl=1*x0mtfs*_ga*NjA4ODYzODkwLjE3NTY4OTQ3OTk.*_ga_8JE65Q40S6*czE3NTY4OTQ3OTgkbzEkZzEkdDE3NTY4OTQ4NjkkajU5JGwwJGgw", // trophy-ish
    dominant: "#0b0b0b",
    badges: ["Film", "OOH", "Social", "PR"],
    heroImage: `${import.meta.env.BASE_URL}Works/Lays/Hero-Lays.png`,
    sections: [
      {
        type: "lede",
        heading: "The shot you've seen a thousand times",
        text:
          "The iconic frame after the final whistle. We hid unique coupon codes inside the confetti and let cameras do the rest.",
      },
      {
        type: "image",
        caption: "Confetti as media placement.",
        src: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2000&auto=format&fit=crop",
      },
      {
        type: "grid",
        items: [
          {
            kind: "image",
            src: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop",
            caption: "Press still",
          },
          {
            kind: "image",
            src: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=1200&auto=format&fit=crop",
            caption: "Social teaser",
          },
          {
            kind: "video",
            embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            caption: "Case cut (60s)",
          },
        ],
      },
      {
        type: "quote",
        text: "We just needed to stay close to the champions. Literally.",
      },
    ],
    credits: [
      { role: "ACD / Art Director", name: "You" },
      { role: "Copywriter", name: "Teammate" },
      { role: "Client", name: "Mercado Livre" },
      { role: "Prod. Co.", name: "Studio X" },
    ],
    awards: ["Cannes Shortlist", "One Show Merit", "Clio Bronze"],
  },
  {
    id: "temple-world",
    slug: "temple-world",
    client: "City of Lights",
    title: "TEMPLE WORLD",
    tagline: "An architectural dream rendered like a video game world.",
    year: 2023,
    coverPoster: `${import.meta.env.BASE_URL}Works/Santa_Negocios/Cover_Santa_Negocios.png`,   // imagem leve
 
    cover: `${import.meta.env.BASE_URL}Works/Santa_Negocios/Cover_Santa_Negocios.png`,
    dominant: "#0b1220",
    badges: ["3D", "Design", "Motion"],
    heroImage: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=2400&auto=format&fit=crop",
    sections: [
      {
        type: "lede",
        heading: "Pixel meets marble",
        text:
          "We built an imaginary temple in a game engine, then graded it like cinema for a twilight vibe.",
      },
      {
        type: "image",
        caption: "Key visual",
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
      },
      {
        type: "video",
        caption: "Exploration reel",
        embed: "https://player.vimeo.com/video/76979871?h=8272103f6e",
      },
    ],
    credits: [
      { role: "Art Director", name: "You" },
      { role: "3D", name: "Artist A" },
    ],
    awards: ["FWAs Site of the Day"],
  },
  {
    id: "neon-swoosh",
    slug: "neon-swoosh",
    client: "Neon Co.",
    title: "NEON SWOOSH",
    tagline: "A kinetic ribbon that paints in RGB.",
    year: 2022,
    coverPoster: `${import.meta.env.BASE_URL}Works/Jamerson/Cover_Jamerson.mp4`,   // imagem leve
    coverVideo:  `${import.meta.env.BASE_URL}Works/Jamerson/Cover_Jamerson.mp4`,   // vídeo leve (principal)
    coverVideoMp4: `${import.meta.env.BASE_URL}Works/Jamerson/Cover_Jamerson.mp4`, // fallback p/ Safari antigo (opcional)
    cover: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1500&auto=format&fit=crop",
    dominant: "#050505",
    badges: ["CG", "Exploration"],
    heroImage: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=2400&auto=format&fit=crop",
    sections: [
      {
        type: "lede",
        heading: "Energy you can draw",
        text: "A study in movement and color blending for a brand motion system.",
      },
      {
        type: "image",
        caption: "Styleframe",
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      },
    ],
    credits: [
      { role: "Design", name: "You" },
      { role: "Motion", name: "Animator B" },
    ],
    awards: [],
  },
  {
    id: "neon-swoosh",
    slug: "neon-swoosh",
    client: "Neon Co.",
    title: "NEON SWOOSH",
    tagline: "A kinetic ribbon that paints in RGB.",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1500&auto=format&fit=crop",
    dominant: "#050505",
    badges: ["CG", "Exploration"],
    heroImage: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=2400&auto=format&fit=crop",
    sections: [
      {
        type: "lede",
        heading: "Energy you can draw",
        text: "A study in movement and color blending for a brand motion system.",
      },
      {
        type: "image",
        caption: "Styleframe",
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      },
    ],
    credits: [
      { role: "Design", name: "You" },
      { role: "Motion", name: "Animator B" },
    ],
    awards: [],
  },
  {
    id: "neon-swoosh",
    slug: "neon-swoosh",
    client: "Neon Co.",
    title: "NEON SWOOSH",
    tagline: "A kinetic ribbon that paints in RGB.",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1500&auto=format&fit=crop",
    dominant: "#050505",
    badges: ["CG", "Exploration"],
    heroImage: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=2400&auto=format&fit=crop",
    sections: [
      {
        type: "lede",
        heading: "Energy you can draw",
        text: "A study in movement and color blending for a brand motion system.",
      },
      {
        type: "image",
        caption: "Styleframe",
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      },
    ],
    credits: [
      { role: "Design", name: "You" },
      { role: "Motion", name: "Animator B" },
    ],
    awards: [],
  },
  {
    id: "neon-swoosh",
    slug: "neon-swoosh",
    client: "Neon Co.",
    title: "NEON SWOOSH",
    tagline: "A kinetic ribbon that paints in RGB.",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1500&auto=format&fit=crop",
    dominant: "#050505",
    badges: ["CG", "Exploration"],
    heroImage: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=2400&auto=format&fit=crop",
    sections: [
      {
        type: "lede",
        heading: "Energy you can draw",
        text: "A study in movement and color blending for a brand motion system.",
      },
      {
        type: "image",
        caption: "Styleframe",
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      },
    ],
    credits: [
      { role: "Design", name: "You" },
      { role: "Motion", name: "Animator B" },
    ],
    awards: [],
  },
  {
    id: "neon-swoosh",
    slug: "neon-swoosh",
    client: "Neon Co.",
    title: "NEON SWOOSH",
    tagline: "A kinetic ribbon that paints in RGB.",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1500&auto=format&fit=crop",
    dominant: "#050505",
    badges: ["CG", "Exploration"],
    heroImage: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=2400&auto=format&fit=crop",
    sections: [
      {
        type: "lede",
        heading: "Energy you can draw",
        text: "A study in movement and color blending for a brand motion system.",
      },
      {
        type: "image",
        caption: "Styleframe",
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      },
    ],
    credits: [
      { role: "Design", name: "You" },
      { role: "Motion", name: "Animator B" },
    ],
    awards: [],
  },
  {
    id: "neon-swoosh",
    slug: "neon-swoosh",
    client: "Neon Co.",
    title: "NEON SWOOSH",
    tagline: "A kinetic ribbon that paints in RGB.",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1500&auto=format&fit=crop",
    dominant: "#050505",
    badges: ["CG", "Exploration"],
    heroImage: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=2400&auto=format&fit=crop",
    sections: [
      {
        type: "lede",
        heading: "Energy you can draw",
        text: "A study in movement and color blending for a brand motion system.",
      },
      {
        type: "image",
        caption: "Styleframe",
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      },
    ],
    credits: [
      { role: "Design", name: "You" },
      { role: "Motion", name: "Animator B" },
    ],
    awards: [],
  },
  {
    id: "neon-swoosh",
    slug: "neon-swoosh",
    client: "Neon Co.",
    title: "NEON SWOOSH",
    tagline: "A kinetic ribbon that paints in RGB.",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1500&auto=format&fit=crop",
    dominant: "#050505",
    badges: ["CG", "Exploration"],
    heroImage: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=2400&auto=format&fit=crop",
    sections: [
      {
        type: "lede",
        heading: "Energy you can draw",
        text: "A study in movement and color blending for a brand motion system.",
      },
      {
        type: "image",
        caption: "Styleframe",
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      },
    ],
    credits: [
      { role: "Design", name: "You" },
      { role: "Motion", name: "Animator B" },
    ],
    awards: [],
  },
];

// -----------------------------
//  Utilities
// -----------------------------


const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

function useScrollTopOnRoute() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
}

function useAutoPlayVideo(shouldPlay = true) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (!shouldPlay) return;
        if (entry.isIntersecting) {
          el.play().catch(() => {/* silencioso: autoplay pode ser bloqueado */});
        } else {
          el.pause();
        }
      });
    };

    const io = new IntersectionObserver(onIntersect, { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, [shouldPlay]);

  return ref;
}

// -----------------------------
//  Layout
// -----------------------------
function Nav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-900 bg-black/60">
      <div className="upx-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-semibold tracking-tight text-xl">Thiago Matos — Art Director / Motion </Link>
        <nav className="flex items-center gap-6 text-sm">
          {[
            { to: "/", label: "Work" },
            { to: "/awards", label: "Awards" },
            { to: "/about", label: "About" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`uppercase tracking-wide ${
                isActive(item.to) ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Page({ children }) {
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <Nav />
      <main className="px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      <footer className="px-4 sm:px-6 lg:px-8 py-12 text-white/60 text-sm">
        © {new Date().getFullYear()} — Built with love by me and my best friend: ChatGPT.
      </footer>
    </div>
  );
}

// -----------------------------
//  Home (grid of works)
// -----------------------------
function Home() {
  useScrollTopOnRoute();
  return (
    <Page>
      
      {/*
      <motion.h1 {...fade} className="text-5xl md:text-7xl font-black tracking-tight mb-8">
        Work
      </motion.h1>
*/}
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
        {PROJECTS.map((p, idx) => (
          <WorkCard key={p.id} project={p} index={idx} />
        ))}
      </section>
    </Page>
  );
}

function WorkCard({ project, index }) {
  const videoRef = useAutoPlayVideo(Boolean(project.coverVideo));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl bg-neutral-900 border border-[#ffffff]/0"
    >
      <Link to={`/work/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {project.coverVideo ? (
            <>
              <video
                ref={videoRef}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                muted
                loop
                playsInline
                preload="metadata"
                poster={project.coverPoster}
              >
                {/* ordem importa: webm primeiro, mp4 fallback */}
                <source src={project.coverVideo} type="video/webm" />
                {project.coverVideoMp4 && (
                  <source src={project.coverVideoMp4} type="video/mp4" />
                )}
              </video>

              {/* overlay preto com opcaidade que some no hover */}
              <div className="absolute inset-0 bg-black/40 opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
            </>
          ) : (
            <>
              <img
                src={project.cover}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
}


{/* Feature que adiciona uma barra inferior ao WorkCard com informações úteis. (desativado)
 
       <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-white/60 text-sm">{project.client} · {project.year}</p>
          </div>
          <div className="flex gap-2">
            {project.badges?.slice(0,3).map((b) => (
              <span key={b} className="text-[10px] uppercase tracking-wide bg-white/10 px-2 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>
*/}

// -----------------------------
//  Work Detail Page
// -----------------------------
function WorkDetail() {
  useScrollTopOnRoute();
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return <Page><p>Not found.</p></Page>;

  return (
    <Page>
      <AnimatePresence mode="wait">
        <motion.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* Hero Title */}
          <motion.header {...fade} className="mb-6">
            <p className="uppercase text-white/60 tracking-wider text-xs mb-2">{project.client} · {project.year}</p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight">{project.title}</h1>
            {project.tagline && <p className="mt-4 text-lg text-white/80 max-w-3xl">{project.tagline}</p>}
          </motion.header>

          {/* Hero Visual */}
          <motion.div {...fade} className="rounded-3xl overflow-hidden shadow-2xl mb-8">
            <img src={project.heroImage || project.cover} alt={project.title} className="w-full object-cover" />
          </motion.div>

          {/* Sections */}
          <div className="space-y-16">
            {project.sections?.map((section, idx) => (
              <Section key={idx} section={section} />
            ))}
          </div>

          {/* Credits & Awards */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Credits</h3>
              <ul className="space-y-1 text-white/80">
                {project.credits?.map((c, i) => (
                  <li key={i}><span className="text-white/60">{c.role}:</span> {c.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">Awards</h3>
              {project.awards?.length ? (
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  {project.awards.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              ) : (
                <p className="text-white/60">—</p>
              )}
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90"
            >
              ← Back to work
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Page>
  );
}

function Section({ section }) {
  switch (section.type) {
    case "lede":
      return (
        <motion.section {...fade} className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">{section.heading}</h2>
          <p className="text-white/80 leading-relaxed">{section.text}</p>
        </motion.section>
      );
    case "image":
      return (
        <motion.figure {...fade} className="rounded-3xl overflow-hidden shadow-2xl">
          <img src={section.src} alt={section.caption || "Project image"} className="w-full object-cover" />
          {section.caption && (
            <figcaption className="text-white/60 text-sm p-3">{section.caption}</figcaption>
          )}
        </motion.figure>
      );
    case "video":
      return (
        <motion.div {...fade} className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
          <iframe
            className="w-full h-full"
            src={section.embed}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={section.caption || "Embedded video"}
          />
        </motion.div>
      );
    case "grid":
      return (
        <motion.div {...fade} className="grid md:grid-cols-3 gap-6">
          {section.items?.map((it, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-neutral-900 shadow-xl">
              {it.kind === "image" ? (
                <img src={it.src} alt={it.caption || "Grid item"} className="w-full h-full object-cover" />
              ) : (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={it.embed}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={it.caption || `Video ${i+1}`}
                  />
                </div>
              )}
              {it.caption && (
                <div className="p-3 text-white/70 text-sm">{it.caption}</div>
              )}
            </div>
          ))}
        </motion.div>
      );
    case "quote":
      return (
        <motion.blockquote {...fade} className="text-2xl md:text-3xl leading-snug font-semibold max-w-3xl">
          “{section.text}”
        </motion.blockquote>
      );
    default:
      return null;
  }
}

// -----------------------------
//  Awards & About
// -----------------------------
function Awards() {
  useScrollTopOnRoute();
  const flatAwards = PROJECTS.flatMap((p) => p.awards?.map((a) => ({ a, p })) || []);
  return (
    <Page>
      <motion.h1 {...fade} className="text-5xl md:text-7xl font-black tracking-tight mb-8">Award</motion.h1>
      {flatAwards.length ? (
        <ul className="space-y-3">
          {flatAwards.map((row, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-white/60">{row.a}</span>
              <span className="opacity-40">·</span>
              <Link to={`/work/${row.p.slug}`} className="underline decoration-white/30 hover:decoration-white">{row.p.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white/60">Add awards to your projects to populate this page.</p>
      )}
    </Page>
  );
}

function About() {
  useScrollTopOnRoute();
  return (
    <Page>
      <motion.div {...fade} className="prose prose-invert max-w-3xl">
        <h1>About</h1>
        <p>
          I’m an Associate Creative Director / Art Director crafting brand worlds across film, design, and
          interactive. This portfolio is a lightweight React app — edit <code>PROJECTS</code> in code to update
          content or plug a headless CMS later.
        </p>
        <h3>Contact</h3>
        <ul>
          <li><a href="#" className="underline">email@yourstudio.com</a></li>
          <li><a href="#" className="underline">@yourhandle</a></li>
        </ul>
      </motion.div>
    </Page>
  );
}

// -----------------------------
//  App (Router)
// -----------------------------

export default function App() {

 
  const [ready, setReady] = useState(false);

  
 if (!ready) return <Loader onDone={() => setReady(true)} />;
  
  return (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page><p>Not found.</p></Page>} />
      </Routes>
    </BrowserRouter>
  );
}
