// ================================================
// GSAP ANIMATIONS — The Trending Box
// Archivo: assets/js/gsap-anim.js
// Dependencias: GSAP 3.12.5 + ScrollTrigger
// ================================================

gsap.registerPlugin(ScrollTrigger);

// ── REGISTRO DE PLUGINS ──────────────────────────

// ScrollTrigger ya registrado arriba para asegurar disponibilidad

// Contexto global para limpieza correcta con Barba.js
let animCtx = null;

// ── UTILIDADES ───────────────────────────────────

/**
 * Selectores que excluyen siempre (nav, hero, menu móvil, etc.)
 * para no duplicar animaciones que ya tienen su propia lógica.
 */
const EXCLUDED =
  "nav, .demo-hero, .mobile-menu, .navbar-float, .parallax-bg, .hamburger";

/**
 * Determina si un elemento debe saltarse completamente.
 */
function shouldSkip(el) {
  if (!el || !el.closest) return true;
  // Sección "Nuestro proceso" (prohibido modificar)
  if (el.closest("#proceso, .proceso-section")) return true;
  // Skip explícito por atributo
  if (el.closest("[data-anim-skip]")) return true;
  // Zonas con animaciones propias
  if (el.closest(EXCLUDED)) return true;
  // Elementos que ya animan desde main.js (testimonios, parallax, proceso)
  if (el.closest(".testimonial-card")) return true;
  if (el.matches(".testimonial-card")) return true;
  return false;
}

/**
 * Envuelve el texto directo de un título en un <span>
 * (necesario para el efecto de máscara slide-up).
 * Si ya tiene un span hijo, lo retorna tal cual.
 */
function ensureSpanWrapper(title) {
  const existing = title.querySelector(":scope > span");
  if (existing) return existing;

  const span = document.createElement("span");
  // Mover todos los nodos hijos (texto + <em>, <sup>, etc.)
  while (title.firstChild) {
    span.appendChild(title.firstChild);
  }
  title.appendChild(span);
  return span;
}

/**
 * Agrupa elementos por su sección contenedora más cercana.
 * Devuelve un Map donde cada clave es el padre y el valor
 * es un array de elementos hijos.
 */
function groupBySection(elements, sectionSelector) {
  const groups = new Map();
  elements.forEach((el) => {
    const section = el.closest(sectionSelector) || el.parentElement;
    if (!groups.has(section)) groups.set(section, []);
    groups.get(section).push(el);
  });
  return groups;
}

// ── TÍTULOS (h1, h2, h3) ─────────────────────────
// Slide up con máscara: overflow hidden en el título,
// el span interno se desplaza de y: "100%" a y: 0.

function animateTitles() {
  const titles = document.querySelectorAll("h1, h2, h3");

  titles.forEach((title) => {
    if (shouldSkip(title)) return;

    // Crear span wrapper si no existe
    const span = ensureSpanWrapper(title);

    // Máscara
    gsap.set(title, { overflow: "hidden" });
    gsap.set(span, { display: "block", y: "105%" });

    ScrollTrigger.create({
      trigger: title,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(span, {
          y: "0%",
          duration: 0.7,
          ease: "power3.out",
        });
      },
    });
  });
}

// ── PÁRRAFOS ─────────────────────────────────────
// Fade up sutil: y: 20, opacity: 0 → y: 0, opacity: 1

function animateParagraphs() {
  const paragraphs = document.querySelectorAll("p");

  paragraphs.forEach((p) => {
    if (shouldSkip(p)) return;
    // Ignorar párrafos que son solo decorativos o de estructura
    if (p.closest(".swiper-pagination")) return;
    // Ignorar párrafo de copyright (div con fondo #111111)
    if (p.closest('[style*="background: #111111"]')) return;

    gsap.set(p, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: p,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(p, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      },
    });
  });
}

// ── IMÁGENES ─────────────────────────────────────
// Fade in con scale sutil: scale 0.96 → 1
// + reveal con clip-path de arriba hacia abajo

function animateImages() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (shouldSkip(img)) return;
    // Excluir logos de navbar y footer (demasiado pequeños, no aportan)
    if (img.closest(".nav-logo, .navbar-brand")) return;
    // Excluir iconos pequeños dentro de features/contacts
    if (img.closest(".feature .icon, .d-flex") && img.offsetWidth < 60) return;

    gsap.set(img, { scale: 0.96, opacity: 0 });

    ScrollTrigger.create({
      trigger: img,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(img, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
    });
  });
}

// ── ICONOS Y SVG ─────────────────────────────────
// Fade in con scale pequeño: scale 0.8 → 1, ease back.out

function animateIcons() {
  const icons = document.querySelectorAll("i, svg, .icon");

  icons.forEach((icon) => {
    if (shouldSkip(icon)) return;
    // Excluir iconos que ya son parte de elementos animados como cards
    if (icon.closest(".card-quote-icon")) return;

    gsap.set(icon, { scale: 0.8, opacity: 0 });

    ScrollTrigger.create({
      trigger: icon,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(icon, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
        });
      },
    });
  });
}

// ── LISTAS ───────────────────────────────────────
// Stagger fade up, cada item con delay de 0.07s

function animateLists() {
  const listItems = document.querySelectorAll("ul li, ol li");

  // Agrupar por lista padre para stagger correcto
  const groups = groupBySection(listItems, "ul, ol");

  groups.forEach((items, parent) => {
    // Saltar listas de navegación
    if (shouldSkip(parent)) return;

    gsap.set(items, { y: 15, opacity: 0 });

    ScrollTrigger.create({
      trigger: parent,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
        });
      },
    });
  });
}

// ── CARDS ────────────────────────────────────────
// Stagger fade up en grupos por sección contenedora

function animateCards() {
  const cardSelectors = [
    ".stat-pill",
    ".mv-card",
    ".feature",
    ".m-card",
    ".footer-card",
    ".testimonial-card",
  ];

  const cards = document.querySelectorAll(cardSelectors.join(", "));

  // Agrupar cards por sección contenedora (row, section, etc.)
  const groups = groupBySection(cards, "section, .row, .container");

  groups.forEach((items, parent) => {
    if (shouldSkip(parent)) return;

    gsap.set(items, { y: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: parent,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
      },
    });
  });
}

// ── BOTONES ──────────────────────────────────────
// Fade up sutil — solo botones aislados (no dentro de cards)

function animateButtons() {
  const buttons = document.querySelectorAll(
    "a.button-white, a.button-black, a.button-whatsapp, button.button-black, button.button-white"
  );

  buttons.forEach((btn) => {
    if (shouldSkip(btn)) return;
    // Solo botones aislados, no dentro de cards o formularios
    if (btn.closest(".card, .feature, .mv-card, .footer-card, form")) return;

    gsap.set(btn, { y: 15, opacity: 0 });

    ScrollTrigger.create({
      trigger: btn,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(btn, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  });
}

// ── LÍNEAS DECORATIVAS ───────────────────────────
// Clip de izquierda a derecha: scaleX 0 → 1

function animateDividers() {
  const dividers = document.querySelectorAll("hr, .divider, .nav-divider");

  dividers.forEach((divider) => {
    if (shouldSkip(divider)) return;

    gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });

    ScrollTrigger.create({
      trigger: divider,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(divider, {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.inOut",
        });
      },
    });
  });
}

// ── STATS COUNTER ────────────────────────────────
// Animación de contador numérico para los stats

function animateCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    if (shouldSkip(stat)) return;

    const text = stat.textContent.trim();
    // Solo animar si es un número (con o sin sufijo como "+")
    const match = text.match(/^(\d+)(.*)$/);
    if (!match) return; // Ignorar valores no numéricos como "∞"

    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";

    gsap.set(stat, { opacity: 0 });

    ScrollTrigger.create({
      trigger: stat,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(stat, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            stat.textContent = Math.round(counter.val) + suffix;
          },
        });
      },
    });
  });
}

// ── SECCIÓN EYEBROW (etiquetas de sección) ───────
// Fade up sutil para los "kickers" y "section-eyebrow"

function animateEyebrows() {
  const eyebrows = document.querySelectorAll(
    ".section-eyebrow, .section-label, .kicker-text"
  );

  eyebrows.forEach((el) => {
    if (shouldSkip(el)) return;

    gsap.set(el, { y: 15, opacity: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  });
}

// ── MOSAICO — stagger individual ─────────────────
// Las cards del mosaico animan con stagger escalonado

function animateMosaic() {
  const mosaicCards = document.querySelectorAll(".mosaic .m-card");
  if (mosaicCards.length === 0) return;

  gsap.set(mosaicCards, { y: 50, opacity: 0 });

  ScrollTrigger.create({
    trigger: ".mosaic",
    start: "top 88%",
    toggleActions: "play none none none",
    onEnter: () => {
      gsap.to(mosaicCards, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
  });
}

// ── FUNCIÓN PRINCIPAL ────────────────────────────

/**
 * Inicializa (o reinicializa) todas las animaciones GSAP.
 *
 * Debe llamarse:
 *  1. En la carga inicial de la página (DOMContentLoaded)
 *  2. En cada transición de Barba (hook beforeEnter o after)
 *
 * Usa gsap.context() para agrupar todas las animaciones
 * y poder revertirlas limpiamente al navegar entre páginas.
 */
function initAnimations() {
  // ── Prefers reduced motion ──
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  // ── Limpiar contexto anterior (mata tweens + ScrollTriggers creados dentro) ──
  if (animCtx) {
    animCtx.revert();
    animCtx = null;
  }

  // ── Crear nuevo contexto ──
  // Usar el contenedor de Barba si existe, de lo contrario document.body
  const container =
    (typeof barba !== "undefined" && barba.wrapper) || document.body;

  animCtx = gsap.context(() => {
    // Refresh de ScrollTrigger para recalcular posiciones
    ScrollTrigger.refresh();

    // Ejecutar cada bloque de animación
    animateEyebrows();
    animateTitles();
    animateParagraphs();
    animateImages();
    animateIcons();
    animateLists();
    animateMosaic();
    animateCards();
    animateButtons();
    animateDividers();
    animateCounters();
  }, container);

  return animCtx;
}

// Carga inicial (primera vez que se abre la página)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    // Pequeño delay para asegurar que el DOM está pintado
    requestAnimationFrame(() => initAnimations());
  });
} else {
  requestAnimationFrame(() => initAnimations());
}

// ── USO EN TRANSITION.JS ─────────────────────────
//
// En el archivo assets/js/transitions.js, dentro de la configuración
// de Barba, agregar la llamada a initAnimations() en el hook `after`:
//
//   barba.init({
//     transitions: [{
//       name: "fade",
//       leave(data) { ... },
//       beforeEnter(data) { ... },
//       enter(data) { ... },
//       after(data) {
//         // Reiniciar animaciones GSAP para la nueva página
//         if (typeof initAnimations === "function") {
//           requestAnimationFrame(() => initAnimations());
//         }
//       },
//     }],
//   });
//
// NOTA: también es posible llamarlo en `beforeEnter` si se quiere que
// los elementos ya estén en su estado inicial (opacity: 0) antes de
// que la página se haga visible.
