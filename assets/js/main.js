(function () {
  "use strict";

  // URL del archivo JSON con los posts
  const POSTS_URL = "instagram-posts.json";

  // Función para cargar los posts desde JSON
  async function loadInstagramPosts() {
    try {
      const response = await fetch(POSTS_URL);
      if (!response.ok) {
        throw new Error("Error al cargar los posts: " + response.status);
      }
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error("Error cargando posts:", error);
      return [];
    }
  }

  // Función para renderizar el feed
  async function renderInstagramFeed() {
    const container = document.getElementById("instagram-feed");

    if (!container) {
      console.error("Contenedor instagram-feed no encontrado");
      return;
    }

    // Mostrar mensaje de carga
    container.innerHTML =
      '<p class="text-center w-100">Cargando publicaciones...</p>';

    // Cargar posts desde JSON
    const posts = await loadInstagramPosts();

    if (posts.length === 0) {
      container.innerHTML =
        '<p class="text-center w-100">No hay publicaciones disponibles.</p>';
      return;
    }

    // Limpiar contenedor
    container.innerHTML = "";

    // Generar HTML para cada post
    posts.forEach(function (post, index) {
      const card = createInstagramCard(post, index);
      container.appendChild(card);
    });
  }

  function createInstagramCard(post, index) {
    const card = document.createElement("div");
    card.className = "instagram-card";
    card.style.animationDelay = index * 0.05 + "s";
    card.style.opacity = "0";
    card.style.transform = "translateY(12px) scale(0.98)";
    card.style.animation = "instaFadeIn 0.4s ease forwards";

    // Imagen
    const img = document.createElement("img");
    img.src = post.img;
    img.alt = post.caption || "Instagram post";
    img.className = "insta-img";
    img.loading = "lazy";
    card.appendChild(img);

    // Tag de categoría
    if (post.tag) {
      const tag = document.createElement("span");
      tag.className = "badge insta-tag";
      tag.textContent = post.tag;
      card.appendChild(tag);
    }

    // Overlay
    const overlay = document.createElement("div");
    overlay.className = "insta-overlay";

    // Caption
    if (post.caption) {
      const caption = document.createElement("div");
      caption.className = "insta-caption";
      caption.textContent = post.caption;
      overlay.appendChild(caption);
    }

    // Stats (likes y comentarios)
    const stats = document.createElement("div");
    stats.className = "insta-stats";

    if (post.likes !== undefined) {
      const likesSpan = document.createElement("span");
      likesSpan.innerHTML =
        '<i class="fas fa-heart"></i> ' + formatNumber(post.likes);
      stats.appendChild(likesSpan);
    }

    if (post.comments !== undefined) {
      const commentsSpan = document.createElement("span");
      commentsSpan.innerHTML =
        '<i class="fas fa-comment"></i> ' + formatNumber(post.comments);
      stats.appendChild(commentsSpan);
    }

    if (post.likes !== undefined || post.comments !== undefined) {
      overlay.appendChild(stats);
    }

    card.appendChild(overlay);

    return card;
  }

  // Formatear números (1234 -> 1.2K)
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  // Animación de entrada
  const style = document.createElement("style");
  style.textContent = `
      @keyframes instaFadeIn {
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `;
  document.head.appendChild(style);

  // Esperar a que el DOM esté listo
  document.addEventListener("DOMContentLoaded", function () {
    renderInstagramFeed();
  });
})();

// ── STICKY SCROLL ──
const navbar = document.querySelector(".navbar-float");
let lastScroll = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const current = window.scrollY;
      if (current > lastScroll && current > 80) {
        // Bajando → ocultar
        navbar.classList.add("hidden");
      } else {
        // Subiendo → mostrar
        navbar.classList.remove("hidden");
      }
      // Fondo más sólido al hacer scroll
      if (current > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      lastScroll = current;
      ticking = false;
    });
    ticking = true;
  }
});

// ── HAMBURGER ──
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("open");
  if (isOpen) {
    closeMobile();
  } else {
    hamburger.classList.add("open");
    mobileMenu.style.display = "block";
    // pequeño delay para que la transición funcione
    requestAnimationFrame(() => {
      requestAnimationFrame(() => mobileMenu.classList.add("open"));
    });
  }
});

function closeMobile() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  setTimeout(() => {
    mobileMenu.style.display = "none";
  }, 300);
}

// Cerrar menú al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    if (mobileMenu.classList.contains("open")) closeMobile();
  }
});

// ── 1. SWIPER ──────────────────────────────────────────
const swiper = new Swiper(".testimonios-swiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 1.2 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
  on: {
    // GSAP anima la tarjeta que entra al convertirse en activa
    slideChangeTransitionStart() {
      const activeSlides = document.querySelectorAll(
        ".swiper-slide-active .testimonial-card, .swiper-slide-next .testimonial-card",
      );
      gsap.fromTo(
        activeSlides,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.1 },
      );
    },
  },
});

// ── 2. GSAP ScrollTrigger — animación de entrada ───────
gsap.registerPlugin(ScrollTrigger);

// Encabezado
gsap.from("#testimonios-header .section-label", {
  scrollTrigger: { trigger: "#testimonios", start: "top 80%" },
  x: -30,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
});

gsap.from("#testimonios-header .section-title", {
  scrollTrigger: { trigger: "#testimonios", start: "top 80%" },
  x: -30,
  opacity: 0,
  duration: 0.7,
  delay: 0.12,
  ease: "power2.out",
});

// Tarjetas — entrada escalonada al hacer scroll
gsap.from(".testimonial-card", {
  scrollTrigger: {
    trigger: ".testimonios-swiper",
    start: "top 85%",
  },
  y: 50,
  opacity: 0,
  duration: 0.7,
  stagger: 0.12,
  ease: "power3.out",
  onComplete() {
    // Dejar visibles para que Swiper pueda manejarlas
    gsap.set(".testimonial-card", { clearProps: "opacity,transform" });
  },
});

gsap.registerPlugin(ScrollTrigger);

// ── Encabezado ──────────────────────────────────
// gsap.from(".section-eyebrow", {
//   scrollTrigger: { trigger: "#proceso", start: "top 80%" },
//   x: -24,
//   opacity: 0,
//   duration: 0.6,
//   ease: "power2.out",
// });

// gsap.from(".section-title", {
//   scrollTrigger: { trigger: "#proceso", start: "top 80%" },
//   x: -24,
//   opacity: 0,
//   duration: 0.7,
//   delay: 0.1,
//   ease: "power2.out",
// });

// ── Línea de progreso ────────────────────────────
gsap.to("#tl-progress", {
  scrollTrigger: {
    trigger: ".timeline-wrap",
    start: "top 72%",
    end: "top 30%",
    scrub: 1.2,
  },
  width: "100%",
  ease: "none",
});

// ── Pasos — aparecen escalonados ─────────────────
gsap.to(".step", {
  scrollTrigger: {
    trigger: ".timeline-steps",
    start: "top 75%",
  },
  opacity: 1,
  y: 0,
  duration: 0.7,
  stagger: 0.18,
  ease: "power3.out",
});

// ── Dot — escala de entrada ──────────────────────
gsap.from(".step-dot", {
  scrollTrigger: {
    trigger: ".timeline-steps",
    start: "top 75%",
  },
  scale: 0.7,
  opacity: 0,
  duration: 0.5,
  stagger: 0.18,
  ease: "back.out(1.7)",
});
