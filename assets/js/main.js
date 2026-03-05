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

//////////////////////////
// Navbar Sticky
(function () {
  // Referencias al navbar
  const nav = document.getElementById("nav");

  // Variables de estado
  let lastScroll = 0;
  let ticking = false;
  const SCROLL_THRESHOLD = 50; // Píxeles mínimo para activar lógica

  // Función principal de manejo de scroll
  function updateNavOnScroll(currentScroll) {
    // Si es el primer scroll (lastScroll es 0), inicializar y salir
    if (lastScroll === 0) {
      lastScroll = currentScroll;
      return;
    }

    // Determinar dirección del scroll
    const scrollDown = currentScroll > lastScroll;
    const scrollDifference = Math.abs(currentScroll - lastScroll);

    // Solo actuar si el scroll supera el threshold
    if (scrollDifference < SCROLL_THRESHOLD) {
      return;
    }

    // Aplicar clase según dirección
    if (scrollDown) {
      // Scroll hacia ABAJO - ocultar navbar
      nav.classList.remove("nav-visible");
      nav.classList.add("nav-hidden");
    } else {
      // Scroll hacia ARRIBA - mostrar navbar
      nav.classList.remove("nav-hidden");
      nav.classList.add("nav-visible");
    }

    // Actualizar posición anterior
    lastScroll = currentScroll;
  }

  // Función que se ejecuta en cada scroll (con requestAnimationFrame)
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const currentScroll =
          window.pageYOffset || document.documentElement.scrollTop;
        updateNavOnScroll(currentScroll);
        ticking = false;
      });
      ticking = true;
    }
  }

  // Función para activar el modo sticky cuando se hace scroll
  function handleStickyState() {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // Agregar clase sticky cuando se ha hecho scroll suficiente
    if (currentScroll > SCROLL_THRESHOLD) {
      nav.classList.add("sticky");
      // Asegurar que se muestre al hacer sticky
      nav.classList.add("nav-visible");
      nav.classList.remove("nav-hidden");
    } else {
      nav.classList.remove("sticky");
      nav.classList.remove("nav-hidden", "nav-visible");
    }

    // Actualizar lastScroll
    lastScroll = currentScroll;
  }

  // Event listener para scroll
  window.addEventListener(
    "scroll",
    function () {
      // Primero manejar el estado sticky
      handleStickyState();
      // Luego manejar la animación de mostrar/ocultar
      onScroll();
    },
    { passive: true },
  );

  // Verificar estado inicial al cargar la página
  handleStickyState();
})();
