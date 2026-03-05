# Plan para Separar Header y Navbar

## Tarea: Separar la sección del header y navbar en etiquetas independientes

### Información Recopilada:

- Estructura actual: `#logo` y `#nav` están dentro de `<section id="header">`
- CSS: `#header` tiene imagen de fondo y posicionamiento
- JS: Referencia `#nav` para comportamiento sticky

### Plan de Implementación:

- [ ] **index.html**
  - [ ] Crear nuevo `<header id="header" class="wrapper">` solo para el logo
  - [ ] Crear nuevo `<nav id="nav">` como elemento separado
  - [ ] Mantener el ID `nav` para compatibilidad con JavaScript

- [ ] **assets/css/style.css**
  - [ ] Agregar estilos para navbar separado del header
  - [ ] Asegurar que el sticky nav funcione correctamente

- [ ] **nosotros/index.html** (si aplica)
  - [ ] Verificar y aplicar mismos cambios si tiene estructura similar

### Pasos de seguimiento:

1. Probar que el sticky nav funcione correctamente
2. Verificar que el diseño visual se mantenga igual
3. Confirmar que el JavaScript de scroll funcione
