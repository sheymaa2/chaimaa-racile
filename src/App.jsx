import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations, projectsMeta, social, colorFor } from './data.js';

gsap.registerPlugin(ScrollTrigger);

// Sections masquées tant qu'elles sont vides : passe à true quand le contenu est prêt
const SHOW_EXPERIENCE = false;
const SHOW_CERTIFICATIONS = false;

// Sections du menu, dans l'ordre d'affichage
const NAV_IDS = ['about', 'formation', 'skills', 'projects', SHOW_EXPERIENCE && 'experience', SHOW_CERTIFICATIONS && 'certifications', 'contact'].filter(Boolean);

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio-lang') || 'fr');
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);
  // Passe à false automatiquement tant que public/photo.jpg n'existe pas
  const [hasPhoto, setHasPhoto] = useState(true);
  const [activeId, setActiveId] = useState(null);

  // Met en évidence dans le menu la section visible au milieu de l'écran
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    const hero = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveId(null); },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV_IDS.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    if (hero) heroObserver.observe(hero);
    return () => { observer.disconnect(); heroObserver.disconnect(); };
  }, []);
  const t = translations[lang];
  const heroRef = useRef(null);
  const projectRefs = useRef([]);

  // Entrée animée du hero (une seule fois, au chargement)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(heroRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
  }, []);

  // Apparition de chaque section au scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('section:not(.hero)').forEach((section) => {
        gsap.fromTo(
          section.querySelector('.wrap'),
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 82%' },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [lang]);

  // Léger effet 3D au survol des cartes projet
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const handlers = [];
    projectRefs.current.forEach((el) => {
      if (!el) return;
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotateX: y * -4, rotateY: x * 6, scale: 1.01, duration: 0.4, ease: 'power2.out', transformPerspective: 700 });
      };
      const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      handlers.push({ el, onMove, onLeave });
    });
    return () => handlers.forEach(({ el, onMove, onLeave }) => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    });
  }, [lang]);

  // Halo qui suit la souris dans le hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  // Apparition en cascade des badges de compétences et langues au scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      ['.skill', '.lang-pill'].forEach((sel) => {
        const items = gsap.utils.toArray(sel);
        if (!items.length) return;
        gsap.fromTo(items, { opacity: 0, y: 12 }, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: items[0].closest('section'), start: 'top 78%' },
        });
      });
    });
    return () => ctx.revert();
  }, [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/xqpaggqk', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSent(true);
        setSendError(false);
        form.reset();
      } else {
        setSendError(true);
      }
    } catch (err) {
      setSendError(true);
    }
  };

  return (
    <>
      <header>
        <div className="wrap">
          <div className="logo">
            <span className="avatar">
              {hasPhoto
                ? <img src="/photo.jpg" alt="" onError={() => setHasPhoto(false)} />
                : 'CR'}
            </span>
            Chaimaa Racile
          </div>
          <nav>
            {NAV_IDS.map((id) => (
              <a key={id} href={`#${id}`} className={activeId === id ? 'active' : ''}>{t.nav[id]}</a>
            ))}
          </nav>
          <div className="lang-switch">
            <button className={lang === 'fr' ? 'active' : ''} onClick={() => { setLang('fr'); localStorage.setItem('portfolio-lang', 'fr'); }}>FR</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => { setLang('en'); localStorage.setItem('portfolio-lang', 'en'); }}>EN</button>
          </div>
        </div>
      </header>

      <section className="hero" ref={heroRef}>
        <div className="wrap">
          <div>
            <div className="available-badge"><span className="dot"></span>{t.hero.available}</div>
            <h1 className="name">Chaimaa <span>Racile</span></h1>
            <div className="role">{t.hero.kicker}</div>
            <p className="tagline">{t.hero.title}</p>
            <p className="bio">{t.hero.bio}</p>
            <div className="links">
              <a className="btn primary" href="#projects">{t.hero.cta}</a>
              <a className="btn ghost" href={social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="btn ghost" href={social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <button className="btn ghost" disabled>{t.hero.cv}</button>
            </div>
          </div>
          {/* Ta photo : place-la dans le dossier public sous le nom photo.jpg, elle s'affiche ici et dans la barre */}
          <div className="photo-box">
            {hasPhoto
              ? <img src="/photo.jpg" alt="Chaimaa Racile" onError={() => setHasPhoto(false)} />
              : <span className="mono">CR</span>}
          </div>
        </div>
      </section>

      <section id="about">
        <div className="wrap">
          <div className="section-head"><h2>{t.about.heading}</h2></div>
          <div className="about-grid">
            <p>{t.about.text}</p>
            <div className="facts">
              <div><b>{t.about.formationLabel}</b>{t.about.formationValue}</div>
              <div><b>{t.about.locationLabel}</b>{t.about.locationValue}</div>
            </div>
          </div>
          <div className="stats">
            {t.stats.map((s) => (
              <div className="stat" key={s.label}><div className="n">{s.n}</div><div className="lbl">{s.label}</div></div>
            ))}
          </div>
          <div className="quote">
            "The hardest single part of building a software system is deciding precisely what to build."
            <span>— Fred Brooks</span>
          </div>
        </div>
      </section>

      <section id="formation">
        <div className="wrap">
          <div className="section-head"><h2>{t.formation.heading}</h2></div>
          <div className="timeline-item">
            <div className="when">{t.formation.when}</div>
            <div><h3>{t.formation.title}</h3><p>{t.formation.desc}</p></div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="wrap">
          <div className="section-head"><h2>{t.skills.heading}</h2></div>
          <div className="skill-groups">
            {t.skills.groups.map((g) => (
              <div className="skill-group" key={g.name}>
                <h3 className="skill-group-name">{g.name}</h3>
                <div className="skills">
                  {g.items.map((s) => <span className="skill" key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="languages">
        <div className="wrap">
          <div className="section-head"><h2>{t.languages.heading}</h2></div>
          <div className="langs">
            {t.languages.items.map((l) => (
              <div className="lang-pill" key={l.name}><span>{l.name}</span><span className="lvl">{l.level}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="wrap">
          <div className="section-head"><h2>{t.projects.heading}</h2></div>
          <div className="projects-grid">
            {projectsMeta.map((meta, i) => {
              const p = t.projects.items[meta.id];
              return (
                <div className="project-card" key={meta.id} ref={(el) => (projectRefs.current[i] = el)}>
                  <span className={`cat-pill tag-${meta.category.color}`}>{meta.category.label}</span>
                  <h3>{p.title}</h3>
                  <div className="subtitle">{p.subtitle}</div>
                  <p className="desc">{p.desc}</p>
                  <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <div className="tags">{meta.tags.map((tag) => <span className={`tag tag-${colorFor(tag)}`} key={tag}>{tag}</span>)}</div>
                  {(meta.link || p.action) && (
                    <div className="action-row">
                      {meta.link
                        ? <a className="gh-btn" href={meta.link} target="_blank" rel="noopener noreferrer">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                            {p.action}
                          </a>
                        : <span className="gh-btn muted">{p.action}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {SHOW_EXPERIENCE && <section id="experience">
        <div className="wrap">
          <div className="section-head"><h2>{t.experience.heading}</h2></div>
          <div className="empty-state">{t.experience.empty}</div>
        </div>
      </section>}

      {SHOW_CERTIFICATIONS && <section id="certifications">
        <div className="wrap">
          <div className="section-head"><h2>{t.certifications.heading}</h2></div>
          <div className="empty-state">{t.certifications.empty}</div>
        </div>
      </section>}

      <section id="contact">
        <div className="wrap">
          <div className="section-head"><h2>{t.contact.heading}</h2></div>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '56ch', marginBottom: 28 }}>{t.contact.intro}</p>
          <div className="contact-grid">
            <div className="card">
              <div className="info-row"><div className="ic">✉</div><div><div className="lbl">{t.contact.emailLabel}</div><div className="val">{social.email}</div></div></div>
              <div className="info-row"><div className="ic">☎</div><div><div className="lbl">{t.contact.phoneLabel}</div><div className="val">{social.phone}</div></div></div>
              <div className="info-row"><div className="ic">◎</div><div><div className="lbl">{t.contact.locationLabel}</div><div className="val">{t.about.locationValue}</div></div></div>
              <div className="socials">
                <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                </a>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div className="card">
              {sent ? (
                <p className="sent-msg">{t.contact.form.sent}</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input type="text" name="name" placeholder={t.contact.form.name} required />
                  <input type="email" name="email" placeholder={t.contact.form.email} required />
                  <input type="text" name="subject" placeholder={t.contact.form.subject} />
                  <textarea name="message" placeholder={t.contact.form.message} required />
                  <button type="submit" className="btn primary">{t.contact.form.send}</button>
                  {sendError && (
                    <p className="send-error">
                      {t.contact.form.error} <a href={`mailto:${social.email}`}>{social.email}</a>
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-id">
            <span className="avatar">
              {hasPhoto
                ? <img src="/photo.jpg" alt="" onError={() => setHasPhoto(false)} />
                : 'CR'}
            </span>
            <div>
              <div className="footer-name">Chaimaa Racile</div>
              <div className="footer-role">{t.footer.role}</div>
            </div>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} Chaimaa Racile. {t.footer.rights}</div>
          <div className="footer-icons">
            <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={`mailto:${social.email}`} aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
