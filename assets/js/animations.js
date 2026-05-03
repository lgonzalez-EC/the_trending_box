// Animaciones GSAP + ScrollTrigger para The Trending Box
// Patrón confiable: gsap.set() + ScrollTrigger.create() + gsap.to()

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Helper: oculta elementos y los anima al entrar en viewport
  function animOnScroll(selector, hideProps, trigger, start, animProps) {
    gsap.set(selector, hideProps);
    ScrollTrigger.create({
      trigger: trigger,
      start: start || "top 80%",
      once: true,
      onEnter: () => gsap.to(selector, animProps)
    });
  }

  // =========================================
  // HEADER - Carga inicial (sin scroll)
  // =========================================
  gsap.from(".demo-hero > img", {
    y: 60, opacity: 0, duration: 1, ease: "power3.out"
  });
  gsap.from(".demo-hero p", {
    y: 40, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.3, ease: "power3.out"
  });
  gsap.from(".demo-hero .button-white", {
    y: 30, opacity: 0, duration: 0.8, stagger: 0.15, delay: 0.8, ease: "power3.out"
  });

  // =========================================
  // SOBRE NOSOTROS
  // =========================================
  animOnScroll("#sobre-nosotros .section-eyebrow", { x: -50, opacity: 0 }, "#sobre-nosotros", "top 85%", { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
  animOnScroll("#sobre-nosotros .section-title", { x: -50, opacity: 0 }, "#sobre-nosotros", "top 85%", { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
  animOnScroll("#sobre-nosotros p", { y: 30, opacity: 0 }, "#sobre-nosotros", "top 80%", { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" });
  animOnScroll("#sobre-nosotros .button-black", { scale: 0.8, opacity: 0 }, "#sobre-nosotros", "top 75%", { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" });
  animOnScroll("#sobre-nosotros .img-about", { x: 60, opacity: 0 }, "#sobre-nosotros", "top 80%", { x: 0, opacity: 1, duration: 1, ease: "power3.out" });

  // =========================================
  // PRODUCTOS - SHOWCASE
  // =========================================
  animOnScroll(".showcase-section .section-eyebrow", { y: -30, opacity: 0 }, ".showcase-section", "top 85%", { y: 0, opacity: 1, duration: 0.6 });
  animOnScroll(".showcase-section .section-title", { y: -30, opacity: 0 }, ".showcase-section", "top 85%", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
  animOnScroll(".showcase-section .col-lg-6 p", { y: 30, opacity: 0 }, ".showcase-section", "top 80%", { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" });
  animOnScroll(".showcase-section .stat-pill", { y: 40, opacity: 0 }, ".showcase-section", "top 80%", { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" });
  animOnScroll(".m-card", { y: 60, opacity: 0 }, ".mosaic", "top 80%", { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" });

  // =========================================
  // CTA WHATSAPP BANNER (PRIMERO)
  // =========================================
  animOnScroll(".section-clip:first-of-type h2, .section-clip:first-of-type h3", { y: 40, opacity: 0 }, ".section-clip:first-of-type", "top 85%", { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" });
  animOnScroll(".section-clip:first-of-type .lead", { y: 30, opacity: 0 }, ".section-clip:first-of-type", "top 85%", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
  animOnScroll(".section-clip:first-of-type .button-whatsapp", { scale: 0.8, opacity: 0 }, ".section-clip:first-of-type", "top 85%", { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" });

  // =========================================
  // PROPUESTA DE VALOR
  // =========================================
  animOnScroll(".container-fluid.p-4 .section-eyebrow", { x: -40, opacity: 0 }, ".container-fluid.p-4", "top 85%", { x: 0, opacity: 1, duration: 0.6 });
  animOnScroll(".container-fluid.p-4 .section-title", { x: -40, opacity: 0 }, ".container-fluid.p-4", "top 85%", { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
  animOnScroll(".feature", { y: 50, opacity: 0 }, ".container-fluid.p-4 .row.my-5", "top 80%", { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" });
  animOnScroll(".container-fluid.p-4 .img-wrap", { x: 60, opacity: 0 }, ".container-fluid.p-4 .img-wrap", "top 85%", { x: 0, opacity: 1, duration: 1, ease: "power3.out" });

  // =========================================
  // PROCESO - TIMELINE STEPS (FIXED)
  // =========================================
  animOnScroll(".proceso-header .section-eyebrow", { y: -30, opacity: 0 }, ".proceso-section", "top 85%", { y: 0, opacity: 1, duration: 0.6 });
  animOnScroll(".proceso-header .section-title", { y: -30, opacity: 0 }, ".proceso-section", "top 85%", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
  animOnScroll(".timeline-steps .step", { y: 60, opacity: 0 }, ".timeline-wrap", "top 75%", { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" });

  // =========================================
  // TESTIMONIOS (FIXED)
  // =========================================
  animOnScroll("#testimonios-header .section-eyebrow", { x: -40, opacity: 0 }, "#testimonios", "top 85%", { x: 0, opacity: 1, duration: 0.6 });
  animOnScroll("#testimonios-header .section-title", { x: -40, opacity: 0 }, "#testimonios", "top 85%", { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
  animOnScroll(".testimonios-swiper .swiper-slide", { y: 40, opacity: 0 }, ".testimonios-swiper", "top 80%", { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });

  // =========================================
  // FORMULARIO DE CONTACTO
  // =========================================
  animOnScroll(".container-fluid form .col-lg-12 h2", { y: 40, opacity: 0 }, ".container-fluid form", "top 85%", { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" });
  animOnScroll(".container-fluid form input, .container-fluid form textarea", { y: 30, opacity: 0 }, ".container-fluid form", "top 80%", { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" });
  animOnScroll(".container-fluid form .button-black", { scale: 0.8, opacity: 0 }, ".container-fluid form", "top 75%", { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" });
  animOnScroll(".container-fluid .col-lg-5 h3", { x: 40, opacity: 0 }, ".container-fluid .col-lg-5", "top 85%", { x: 0, opacity: 1, duration: 0.6 });
  animOnScroll(".container-fluid .col-lg-5 .d-flex", { x: 40, opacity: 0 }, ".container-fluid .col-lg-5", "top 80%", { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" });

  // =========================================
  // INSTAGRAM SECTION
  // =========================================
  animOnScroll(".instagram-section .section-label", { y: -30, opacity: 0 }, ".instagram-section", "top 85%", { y: 0, opacity: 1, duration: 0.6 });
  animOnScroll(".instagram-section .section-title", { y: -30, opacity: 0 }, ".instagram-section", "top 85%", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
  animOnScroll(".instagram-section .button-black", { scale: 0.8, opacity: 0 }, ".instagram-section", "top 85%", { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" });
  animOnScroll("#instagram-feed", { y: 40, opacity: 0 }, "#instagram-feed", "top 85%", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });

  // =========================================
  // FINAL CTA BANNER (ÚLTIMO .section-clip)
  // =========================================
  const allSectionClips = document.querySelectorAll(".section-clip");
  const finalCta = allSectionClips[allSectionClips.length - 1];
  if (finalCta) {
    const h3s = finalCta.querySelectorAll("h3");
    const h2s = finalCta.querySelectorAll("h2");
    const leads = finalCta.querySelectorAll(".lead");
    const btn = finalCta.querySelector(".button-whatsapp");

    // Títulos y subtítulos
    const titles = [...h3s, ...h2s];
    gsap.set(titles, { y: 40, opacity: 0 });
    ScrollTrigger.create({
      trigger: finalCta,
      start: "top 85%",
      once: true,
      onEnter: () => gsap.to(titles, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" })
    });

    // Leads (textos)
    gsap.set([...leads], { y: 30, opacity: 0 });
    ScrollTrigger.create({
      trigger: finalCta,
      start: "top 85%",
      once: true,
      onEnter: () => gsap.to([...leads], { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.2, ease: "power2.out" })
    });

    // Botón
    if (btn) {
      gsap.set(btn, { scale: 0.8, opacity: 0 });
      ScrollTrigger.create({
        trigger: finalCta,
        start: "top 85%",
        once: true,
        onEnter: () => gsap.to(btn, { scale: 1, opacity: 1, duration: 0.6, delay: 0.4, ease: "back.out(1.7)" })
      });
    }
  }

  // =========================================
  // FOOTER
  // =========================================
  animOnScroll("#footer-page .navbar-brand", { y: 30, opacity: 0 }, "#footer-page", "top 85%", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
  animOnScroll("#footer-page .footer-card", { y: 40, opacity: 0 }, "#footer-page .row", "top 85%", { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power3.out" });
  animOnScroll("#footer-page + div p", { y: 20, opacity: 0 }, "#footer-page + div", "top 90%", { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });

  // Refrescar ScrollTrigger después de cargar
  setTimeout(() => ScrollTrigger.refresh(), 300);
});
