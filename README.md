## Laboratorio — Web Components (resumen)

Este proyecto usa Web Components nativos (Custom Elements v1 + Shadow DOM v1). Cada componente está encapsulado y puede personalizarse desde fuera con:

- CSS custom properties (variables) — colores, tamaños, fuentes.
- `::part()` — sobrescribir estilos de subelementos internos.
- `<slot>` — reemplazar o inyectar contenido.

En esta guía encontrarás una referencia breve y ejemplos rápidos para `poster-card`, `directional-sign` y `sign-board`.

---

### Estructura relevante

```
src/
  index.html
  components/
    posterCard.js        -> <poster-card>
    directionalSign.js   -> <directional-sign>
    signBoard.js         -> <sign-board>
```

---

## Uso rápido

Inserta los componentes en tu HTML (ya están registrados como elementos personalizados):

```html
<sign-board institution="UCR">
  <directional-sign label="Aulas 1–4" arrow-src="images/flecha.png"></directional-sign>
  <directional-sign label="Laboratorios" arrow-src="images/flecha.png"></directional-sign>
</sign-board>

<poster-card title-line1="LA SEDE" title-line2="TE" title-line3="ACOMPAÑA" poster-src="images/poster.jpg"></poster-card>
```

---

## Resumen por componente (rápido)

- `poster-card` — Póster completo. Implementa múltiples atributos, `named slots`, `part` y muchas variables CSS para personalizar totalmente el aspecto.
- `directional-sign` — Fila de señal con `label` y `arrow`. Ahora expone `part` y soporta `slot` para `label` y `arrow` (si se necesita contenido más complejo). Variables CSS disponibles: `--ds-bg`, `--ds-label-color`, `--ds-label-font-size`, `--ds-label-weight`, `--ds-arrow-size`, `--ds-divider-color`, etc.
- `sign-board` — Contenedor de señales. Proyecta hijos con `<slot>` y expone `part="board-footer"` y `part="institution"` en el pie. Tiene variables `--sb-*` para personalizar colores y tamaños del panel.

---

## Personalización rápida

- Cambiar colores o radios con variables inline:

```html
<sign-board style="--sb-footer-bg:#5b2d8e; --sb-radius:12px;">
  ...
</sign-board>

<poster-card style="--pc-card-radius:16px; --pc-color-block1-bg:#b22222;">
  <p slot="cta">Más información en recepción</p>
</poster-card>
```

- Aplicar estilos a partes internas con `::part()`:

```html
<style>
  poster-card::part(qr) { border: 3px solid #003087; border-radius:8px; }
  sign-board::part(institution) { font-style:italic; letter-spacing:0.25em; }
</style>
```

- Reemplazar elementos concretos con slots:

```html
<directional-sign>
  <span slot="label">Custom label markup</span>
  <img slot="arrow" src="icons/arrow.svg" alt=""> 
</directional-sign>
```

---

Si necesitas más detalle, dime qué componente quieres y mostraré la lista completa.

---

## Atributos personalizables (por componente)

- `poster-card`
  - `title-line1` (string) — Texto del bloque azul. Default: `LA SEDE`.
  - `title-line2` (string) — Texto del bloque blanco. Default: `TE`.
  - `title-line3` (string) — Texto del bloque morado. Default: `ACOMPAÑA`.
  - `subtitle` (string) — Subtítulo normal (opcional).
  - `bold-subtitle` (string) — Subtítulo en negrita (opcional).
  - `qr-src` (string) — URL de la imagen QR (opcional).
  - `qr-alt` (string) — Texto alternativo del QR. Default: `QR`.
  - `poster-src` (string) — URL de la imagen principal (opcional).
  - `poster-alt` (string) — Texto alternativo de la imagen principal. Default: `Póster`.
  - `institution` (string) — Texto del pie del card. Default: `UCR`.

- `directional-sign`
  - `label` (string) — Texto del destino. Default: `—`.
  - `arrow-src` (string) — URL de la imagen de la flecha (opcional).
  - `arrow-alt` (string) — Texto alternativo / fallback de la flecha. Default: `→`.

- `sign-board`
  - `institution` (string) — Texto del pie del panel. Default: `UCR`.

---

¿Quieres que actualice el README también con ejemplos cortos de `::part()` y `--var` para cada atributo (por ejemplo: cómo cambiar el color del label de `directional-sign` con `--ds-label-color`)?