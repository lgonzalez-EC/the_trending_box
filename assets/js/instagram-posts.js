/**
 * Instagram Posts Data
 *
 * Este archivo contiene los datos de las publicaciones de Instagram.
 * Para conectar con la API real de Instagram Graph API, simplemente
 * reemplaza este array con un fetch a la API.
 *
 * Estructura esperada:
 * {
 *   img: "ruta/imagen.jpg",
 *   caption: "Texto de la publicación",
 *   likes: 123,
 *   comments: 10,
 *   tag: "Categoría"
 * }
 */

const instagramPosts = [
  {
    img: "../../images/pic01.jpg",
    caption: "Caja premium para conservas artesanales con acabado mate",
    likes: 234,
    comments: 18,
    tag: "Cajas",
    url: "https://instagram.com/p/xxxxxxxxxx1",
  },
  {
    img: "../../images/pic02.jpg",
    caption: "Estuche de lujo para frasco de miel artesanal",
    likes: 189,
    comments: 12,
    tag: "Estuches",
    url: "https://instagram.com/p/xxxxxxxxxx2",
  },
  {
    img: "../../images/pic03.jpg",
    caption: "Etiquetas adhesivas premium con foil stamping",
    likes: 156,
    comments: 8,
    tag: "Etiquetas",
    url: "https://instagram.com/p/xxxxxxxxxx3",
  },
  {
    img: "../../images/pic04.jpg",
    caption: "Caja alargada para tableta de chocolate premium",
    likes: 298,
    comments: 24,
    tag: "Chocolates",
    url: "https://instagram.com/p/xxxxxxxxxx4",
  },
  {
    img: "../../images/pic05.jpg",
    caption: "Empaque vertical para bebida funcional",
    likes: 145,
    comments: 11,
    tag: "Bebidas",
    url: "https://instagram.com/p/xxxxxxxxxx5",
  },
  {
    img: "../../images/pic06.jpg",
    caption: "Tubo de aceite gourmet con serigrafía",
    likes: 267,
    comments: 21,
    tag: "Gourmet",
    url: "https://instagram.com/p/xxxxxxxxxx6",
  },
  {
    img: "../../images/pic07.jpg",
    caption: "Caja regalo para galletas artesanales",
    likes: 312,
    comments: 29,
    tag: "Regalos",
    url: "https://instagram.com/p/xxxxxxxxxx7",
  },
  {
    img: "../../images/pic08.jpg",
    caption: "Sobre para especias naturales",
    likes: 98,
    comments: 7,
    tag: "Especias",
    url: "https://instagram.com/p/xxxxxxxxxx8",
  },
  {
    img: "../../images/pic09.jpg",
    caption: "Caja de lujo para té premium con interior flocked",
    likes: 445,
    comments: 38,
    tag: "Té",
    url: "https://instagram.com/p/xxxxxxxxxx9",
  },
  {
    img: "../../images/pic10.jpg",
    caption: "Empaque para tabla de quesos artesanales",
    likes: 178,
    comments: 15,
    tag: "Quesos",
    url: "https://instagram.com/p/xxxxxxxxxx10",
  },
  {
    img: "../../images/pic01.jpg",
    caption: "Bolsa de café con válvula desgasificadora",
    likes: 223,
    comments: 19,
    tag: "Café",
    url: "https://instagram.com/p/xxxxxxxxxx11",
  },
  {
    img: "../../images/pic02.jpg",
    caption: "Caja set gourmet de temporada",
    likes: 389,
    comments: 32,
    tag: "Sets",
    url: "https://instagram.com/p/xxxxxxxxxx12",
  },
];

// Exportar para uso como módulo (opcional)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { instagramPosts };
}
