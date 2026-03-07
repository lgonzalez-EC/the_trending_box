barba.init({
  transitions: [
    {
      name: "fade",

      // Antes de salir: oculta la página actual
      leave(data) {
        return new Promise((resolve) => {
          const el = data.current.container;
          el.style.transition = "opacity 0.4s ease";
          el.style.opacity = "0";
          setTimeout(resolve, 400);
        });
      },

      // Antes de entrar: prepara la nueva página invisible
      beforeEnter(data) {
        const el = data.next.container;
        el.style.opacity = "0";
      },

      // Al entrar: muestra la nueva página
      enter(data) {
        return new Promise((resolve) => {
          const el = data.next.container;
          el.style.transition = "opacity 0.4s ease";
          el.style.opacity = "1";
          setTimeout(resolve, 400);
        });
      },
    },
  ],
});
