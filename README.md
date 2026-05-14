# Lab 2 — Web Components

Proyecto reestructurado como **Web Components nativos** (Custom Elements v1 + Shadow DOM v1).  
Cada componente está totalmente encapsulado y es **100 % personalizable** desde el exterior mediante:

- **CSS Custom Properties** — para colores, tamaños y fuentes
- **CSS `::part()`** — para sobreescribir estilos de partes internas específicas
- **`<slot>`** — para reemplazar o extender el contenido interno

---

## Estructura del proyecto

```
lab2-webcomponents/
├── index.html
├── index.css
└── components/
    ├── poster-card.js       → <poster-card>
    ├── directional-sign.js  → <directional-sign>
    └── sign-board.js        → <sign-board>
```

---

## `<poster-card>`

Póster informativo con encabezado multibloque, subtítulos, QR e imagen principal.

### Atributos

| Atributo        | Tipo     | Default       | Descripción                          |
|-----------------|----------|---------------|--------------------------------------|
| `title-line1`   | `string` | `"LA SEDE"`   | Texto del bloque azul                |
| `title-line2`   | `string` | `"TE"`        | Texto del bloque blanco              |
| `title-line3`   | `string` | `"ACOMPAÑA"`  | Texto del bloque morado              |
| `subtitle`      | `string` | —             | Subtítulo normal (h1 morado)         |
| `bold-subtitle` | `string` | —             | Subtítulo en negrita                 |
| `qr-src`        | `string` | —             | Ruta de la imagen QR                 |
| `qr-alt`        | `string` | `"QR"`        | Texto alternativo del QR             |
| `poster-src`    | `string` | —             | Ruta de la imagen principal          |
| `poster-alt`    | `string` | `"Póster"`    | Texto alternativo de la imagen       |
| `institution`   | `string` | `"UCR"`       | Texto de pie del card                |

### Slots

| Nombre           | Descripción                                                   |
|------------------|---------------------------------------------------------------|
| *(default)*      | Contenido libre adicional dentro del cuerpo                   |
| `header-prefix`  | Reemplaza el bloque del signo `¡`                             |
| `header-line1`   | Reemplaza el bloque de la línea 1 (fondo azul)                |
| `header-line2`   | Reemplaza el bloque de la línea 2 (fondo blanco)              |
| `header-line3`   | Reemplaza el bloque de la línea 3 (fondo morado)              |
| `header-suffix`  | Reemplaza el bloque del signo `!`                             |
| `subtitle`       | Reemplaza el subtítulo normal                                 |
| `bold-subtitle`  | Reemplaza el subtítulo en negrita                             |
| `cta`            | Reemplaza el párrafo de llamada a acción                      |
| `qr`             | Reemplaza la imagen QR completa                               |
| `poster-image`   | Reemplaza la imagen del póster                                |
| `card-footer`    | Reemplaza el pie / institución                                |

### CSS Parts

Seleccionar con `poster-card::part(<nombre>)`.

| Part             | Elemento              | Descripción                            |
|------------------|-----------------------|----------------------------------------|
| `card`           | `<article>`           | Contenedor raíz del componente         |
| `header`         | `<header>`            | Encabezado multibloque                 |
| `block-prefix`   | `<div>`               | Bloque signo de apertura `¡`           |
| `block-line1`    | `<div>`               | Bloque fondo azul (línea 1)            |
| `block-line2`    | `<div>`               | Bloque fondo blanco (línea 2)          |
| `block-line3`    | `<div>`               | Bloque fondo morado (línea 3)          |
| `block-suffix`   | `<div>`               | Bloque signo de cierre `!`             |
| `body`           | `<section>`           | Cuerpo del póster                      |
| `subtitle`       | `<h1>`                | Subtítulo normal                       |
| `bold-subtitle`  | `<h1>`                | Subtítulo en negrita                   |
| `cta`            | `<p>`                 | Párrafo de llamada a la acción         |
| `qr`             | `<img>`               | Imagen QR                              |
| `poster-image`   | `<img>`               | Imagen principal del póster            |
| `card-footer`    | `<p>`                 | Pie / institución                      |

### CSS Custom Properties

| Propiedad                  | Default                             | Afecta a                        |
|----------------------------|-------------------------------------|---------------------------------|
| `--pc-font-family`         | `'Cinzel', serif`                   | Fuente general                  |
| `--pc-body-font`           | `Arial, sans-serif`                 | Fuente del cuerpo de texto      |
| `--pc-color-block1-bg`     | `#003087`                           | Fondo bloque línea 1            |
| `--pc-color-block1-text`   | `#ffffff`                           | Texto bloque línea 1            |
| `--pc-color-block2-bg`     | `#ffffff`                           | Fondo bloque línea 2            |
| `--pc-color-block2-text`   | `#ffd700`                           | Texto bloque línea 2            |
| `--pc-color-block3-bg`     | `#5b2d8e`                           | Fondo bloque línea 3            |
| `--pc-color-block3-text`   | `#ffffff`                           | Texto bloque línea 3            |
| `--pc-color-accent-bg`     | `#ffd700`                           | Fondo bloques `¡` y `!`         |
| `--pc-color-accent-text`   | `#003087`                           | Color signo `¡` y `!`           |
| `--pc-header-height`       | `80px`                              | Alto del encabezado             |
| `--pc-header-font-size`    | `clamp(1rem, 2.5vw, 1.5rem)`        | Tamaño fuente encabezado        |
| `--pc-card-bg`             | `#ffffff`                           | Fondo del card                  |
| `--pc-card-radius`         | `8px`                               | Radio de borde del card         |
| `--pc-card-shadow`         | `0 4px 24px rgba(0,0,0,.18)`        | Sombra del card                 |
| `--pc-card-width`          | `min(100%, 460px)`                  | Ancho máximo del card           |
| `--pc-body-padding`        | `24px 20px`                         | Padding del cuerpo              |
| `--pc-body-gap`            | `12px`                              | Gap entre ítems del cuerpo      |
| `--pc-subtitle-color`      | `#5b2d8e`                           | Color de los subtítulos         |
| `--pc-subtitle-font-size`  | `clamp(1rem, 2.5vw, 1.4rem)`        | Tamaño fuente subtítulo         |
| `--pc-cta-color`           | `#444444`                           | Color del párrafo CTA           |
| `--pc-cta-font-size`       | `0.9rem`                            | Tamaño fuente CTA               |
| `--pc-qr-size`             | `120px`                             | Ancho y alto de la imagen QR    |
| `--pc-poster-max-width`    | `320px`                             | Ancho máximo de la imagen       |
| `--pc-poster-radius`       | `4px`                               | Radio de borde imagen principal |
| `--pc-footer-color`        | `#003087`                           | Color del texto de pie          |
| `--pc-footer-font-size`    | `1.1rem`                            | Tamaño fuente pie               |

### Ejemplo de personalización

```html
<!-- Cambiar paleta a rojo/verde con radio mayor -->
<poster-card
  title-line1="SEDE CENTRAL"
  title-line2="NOS"
  title-line3="CUIDA"
  institution="UCR — Sede Central"
  style="
    --pc-color-block1-bg:  #b22222;
    --pc-color-block3-bg:  #006400;
    --pc-color-accent-bg:  #f0e000;
    --pc-subtitle-color:   #006400;
    --pc-card-radius:      16px;
  "
>
  <!-- Slot: reemplazar el CTA -->
  <p slot="cta">Más información en la recepción</p>
</poster-card>

<!-- Cambiar estilos de la imagen QR con ::part() -->
<style>
  poster-card::part(qr) {
    border: 3px solid #003087;
    border-radius: 8px;
    padding: 4px;
  }
</style>
```

---

## `<directional-sign>`

Fila de señalización con etiqueta de destino y flecha. Se usa dentro de `<sign-board>`.

### Atributos

| Atributo    | Tipo     | Default | Descripción                              |
|-------------|----------|---------|------------------------------------------|
| `label`     | `string` | `"—"`   | Texto del destino *(requerido)*          |
| `arrow-src` | `string` | —       | Ruta de la imagen de flecha              |
| `arrow-alt` | `string` | `"→"`   | Alt / fallback si no hay imagen          |

### Slots

| Nombre  | Descripción                              |
|---------|------------------------------------------|
| `label` | Reemplaza el elemento `<h1>` de destino  |
| `arrow` | Reemplaza la imagen de la flecha         |

### CSS Parts

| Part         | Elemento  | Descripción                              |
|--------------|-----------|------------------------------------------|
| `sign`       | `<div>`   | Contenedor raíz de la fila               |
| `label`      | `<h1>`    | Texto del destino                        |
| `arrow`      | `<img>`   | Imagen de la flecha                      |
| `arrow-text` | `<span>`  | Flecha de texto de respaldo (sin imagen) |

### CSS Custom Properties

| Propiedad              | Default                        | Afecta a                       |
|------------------------|--------------------------------|--------------------------------|
| `--ds-font-family`     | `'Cinzel', serif`              | Fuente de la etiqueta          |
| `--ds-label-color`     | `#003087`                      | Color del texto de destino     |
| `--ds-label-font-size` | `clamp(0.85rem, 2vw, 1.1rem)`  | Tamaño fuente de la etiqueta   |
| `--ds-label-weight`    | `500`                          | Peso de fuente de la etiqueta  |
| `--ds-arrow-size`      | `40px`                         | Ancho y alto de la flecha      |
| `--ds-padding`         | `14px 20px`                    | Padding interno de la fila     |
| `--ds-divider-color`   | `rgba(0,48,135,.12)`           | Color del borde separador      |
| `--ds-bg`              | `transparent`                  | Fondo de la fila               |
| `--ds-bg-hover`        | `rgba(0,48,135,.04)`           | Fondo al pasar el puntero      |

---

## `<sign-board>`

Panel contenedor de señales direccionales. Proyecta hijos mediante `<slot>`.

### Atributos

| Atributo      | Tipo     | Default  | Descripción                               |
|---------------|----------|----------|-------------------------------------------|
| `institution` | `string` | `"UCR"`  | Texto del pie del panel                   |
| `heading`     | `string` | —        | Texto del encabezado del panel (opcional) |

### Slots

| Nombre          | Descripción                                                |
|-----------------|------------------------------------------------------------|
| *(default)*     | Los `<directional-sign>` u otros hijos del panel           |
| `board-header`  | Reemplaza el encabezado completo del panel                 |
| `board-footer`  | Reemplaza el pie completo del panel                        |

### CSS Parts

| Part            | Elemento    | Descripción                             |
|-----------------|-------------|-----------------------------------------|
| `board`         | `<section>` | Contenedor raíz del panel               |
| `board-header`  | `<header>`  | Encabezado opcional del panel           |
| `signs-list`    | `<div>`     | Envoltorio de señales proyectadas       |
| `board-footer`  | `<footer>`  | Pie del panel                           |
| `institution`   | `<h2>`      | Nombre de la institución en el pie      |

### CSS Custom Properties

| Propiedad                 | Default                         | Afecta a                         |
|---------------------------|---------------------------------|----------------------------------|
| `--sb-font-family`        | `'Cinzel', serif`               | Fuente del panel                 |
| `--sb-bg`                 | `#ffffff`                       | Fondo del panel                  |
| `--sb-radius`             | `8px`                           | Radio de borde del panel         |
| `--sb-shadow`             | `0 4px 24px rgba(0,0,0,.18)`    | Sombra del panel                 |
| `--sb-width`              | `min(100%, 460px)`              | Ancho máximo del panel           |
| `--sb-header-bg`          | `#003087`                       | Fondo del encabezado             |
| `--sb-header-color`       | `#ffffff`                       | Color texto del encabezado       |
| `--sb-header-padding`     | `14px 20px`                     | Padding del encabezado           |
| `--sb-header-font-size`   | `1rem`                          | Tamaño fuente del encabezado     |
| `--sb-footer-bg`          | `#003087`                       | Fondo del pie                    |
| `--sb-footer-color`       | `#ffffff`                       | Color texto del pie              |
| `--sb-footer-padding`     | `16px 20px`                     | Padding del pie                  |
| `--sb-footer-font-size`   | `1.3rem`                        | Tamaño fuente del pie            |
| `--sb-footer-letter-spc`  | `0.15em`                        | Letter-spacing del pie           |

### Ejemplo de personalización

```html
<!-- Panel con encabezado, colores personalizados y ::part() -->
<sign-board
  institution="Sede Rodrigo Facio"
  heading="Edificio de Ciencias"
  style="
    --sb-footer-bg:        #5b2d8e;
    --sb-header-bg:        #5b2d8e;
    --sb-radius:           12px;
    --sb-width:            min(100%, 560px);
  "
>
  <directional-sign label="Aulas 1–4"    arrow-src="images/flecha.png"></directional-sign>
  <directional-sign label="Laboratorios" arrow-src="images/flecha.png"></directional-sign>
</sign-board>

<!-- Personalizar el pie con ::part() -->
<style>
  sign-board::part(institution) {
    font-style: italic;
    letter-spacing: 0.25em;
  }
</style>
```

---

## Cuándo usar cada mecanismo

| Necesidad                                     | Mecanismo              |
|-----------------------------------------------|------------------------|
| Cambiar colores, tamaños, fuentes             | CSS Custom Properties  |
| Sobreescribir estilos de un elemento interno  | `::part()`             |
| Reemplazar contenido (texto, imagen, icono)   | `<slot name="...">`    |
| Añadir contenido extra dentro del componente  | Slot default `<slot>`  |