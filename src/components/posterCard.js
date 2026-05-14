/**
 * @element poster-card
 *
 * Póster informativo con encabezado de bloques superpuestos y rotados,
 * cuerpo amarillo con QR e imagen principal.
 *
 * ─── Slots ────────────────────────────────────────────────────
 *  (default)        Contenido libre adicional dentro del cuerpo
 *  header-prefix    Reemplaza el bloque del signo "¡"
 *  header-line1     Reemplaza el bloque azul (línea 1)
 *  header-line2     Reemplaza el bloque blanco (línea 2)
 *  header-line3     Reemplaza el bloque morado (línea 3)
 *  header-suffix    Reemplaza el bloque del signo "!"
 *  subtitle         Reemplaza el subtítulo normal
 *  bold-subtitle    Reemplaza el subtítulo en negrita
 *  cta              Reemplaza el párrafo de llamada a la acción
 *  qr               Reemplaza la imagen QR
 *  poster-image     Reemplaza la imagen del póster
 *  card-footer      Reemplaza el texto de institución al pie
 *
 * ─── Atributos ────────────────────────────────────────────────
 *  title-line1    Texto bloque azul          (default: "LA SEDE")
 *  title-line2    Texto bloque blanco        (default: "TE")
 *  title-line3    Texto bloque morado        (default: "ACOMPAÑA")
 *  subtitle       Subtítulo normal
 *  bold-subtitle  Subtítulo en negrita
 *  qr-src         Ruta imagen QR
 *  qr-alt         Alt de la imagen QR        (default: "QR")
 *  poster-src     Ruta imagen principal
 *  poster-alt     Alt imagen principal       (default: "Póster")
 *  institution    Texto de pie               (default: "UCR")
 *
 * ─── CSS Parts ────────────────────────────────────────────────
 *  card              Artículo raíz del componente
 *  header            Contenedor del encabezado (.container-posterheader)
 *  block-prefix      Bloque signo "¡" (--inverted-exclamation-mark-block)
 *  block-line1       Bloque azul (--blue-block)
 *  block-line2       Bloque blanco (--white-block)
 *  block-line3       Bloque morado (--purple-block)
 *  block-suffix      Bloque signo "!" (--exclamation-mark-block)
 *  body              Contenedor del cuerpo (.container-posterbody)
 *  subtitle          Subtítulo normal (.h1-purple)
 *  bold-subtitle     Subtítulo en negrita (.h1-purple-bold)
 *  cta               Párrafo de llamada a acción
 *  qr                Imagen QR (.qr)
 *  poster-image      Imagen principal (.poster-image)
 *  card-footer       Texto de pie / institución
 *
 * ─── CSS Custom Properties ────────────────────────────────────
 *  --pc-font-family          Fuente general                ('Myriad Pro', Arial, sans-serif)
 *  --pc-color-yellow         Color amarillo de fondo       (#fdb912)
 *  --pc-color-blue           Color azul claro bloques      (#8ed8f8)
 *  --pc-color-purple         Color morado bloques          (#8a0552)
 *  --pc-color-white          Blanco                        (#ffffff)
 *  --pc-header-height        Alto del encabezado           (185px)
 *  --pc-header-max-width     Ancho máx encabezado          (380px)
 *  --pc-body-max-width       Ancho máx cuerpo              (380px)
 *  --pc-body-padding-top     Padding superior del cuerpo   (40px)
 *  --pc-subtitle-color       Color subtítulos              (#8a0552)
 *  --pc-subtitle-font-size   Tamaño fuente subtítulo       (1.2em)
 *  --pc-cta-color            Color texto CTA               (#ffffff)
 *  --pc-cta-margin-top       Margen superior del CTA       (50px)
 *  --pc-qr-size              Tamaño imagen QR              (55px)
 *  --pc-poster-max-width     Ancho máx imagen póster       (360px)
 *  --pc-card-max-width       Ancho máx total del card      (390px)
 *  --pc-card-padding-bottom  Padding inferior del card     (36px)
 */
class PosterCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'title-line1', 'title-line2', 'title-line3',
      'subtitle', 'bold-subtitle',
      'qr-src', 'qr-alt',
      'poster-src', 'poster-alt',
      'institution',
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() { this.#render(); }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML !== '') this.#render();
  }

  /* ── Helpers ─────────────────────────────────────────── */
  #attr(name, fallback = '') {
    return this.getAttribute(name) ?? fallback;
  }

  /* ── Render ──────────────────────────────────────────── */
  #render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>${PosterCard.#styles()}</style>
      ${this.#template()}
    `;
  }

  #template() {
    const line1       = this.#attr('title-line1', 'LA SEDE');
    const line2       = this.#attr('title-line2', 'TE');
    const line3       = this.#attr('title-line3', 'ACOMPAÑA');
    const subtitle    = this.#attr('subtitle');
    const boldSub     = this.#attr('bold-subtitle');
    const qrSrc       = this.#attr('qr-src');
    const qrAlt       = this.#attr('qr-alt', 'QR');
    const posterSrc   = this.#attr('poster-src');
    const posterAlt   = this.#attr('poster-alt', 'Póster');
    const institution = this.#attr('institution', 'UCR');

    return /* html */`
      <article class="container" part="card">

        <!-- ═══ HEADER ═══ -->
        <div class="container-posterheader" part="header">

          <slot name="header-prefix">
            <div class="container-posterheader--inverted-exclamation-mark-block" part="block-prefix">
              <h1 class="inverted-exclamation-mark">¡</h1>
            </div>
          </slot>

          <slot name="header-line1">
            <div class="container-posterheader--blue-block" part="block-line1">
              <h1 class="h1-white">${line1}</h1>
            </div>
          </slot>

          <slot name="header-line2">
            <div class="container-posterheader--white-block" part="block-line2">
              <h1 class="h1-yellow">${line2}</h1>
            </div>
          </slot>

          <slot name="header-line3">
            <div class="container-posterheader--purple-block" part="block-line3">
              <h1 class="h1-white">${line3}</h1>
            </div>
          </slot>

          <slot name="header-suffix">
            <div class="container-posterheader--exclamation-mark-block" part="block-suffix">
              <h1 class="exclamation-mark">!</h1>
            </div>
          </slot>

        </div>

        <!-- ═══ BODY ═══ -->
        <div class="container-posterbody" part="body">

          ${subtitle ? /* html */`
            <slot name="subtitle">
              <h1 class="h1-purple" part="subtitle">${subtitle}</h1>
            </slot>` : ''}

          ${boldSub ? /* html */`
            <slot name="bold-subtitle">
              <h1 class="h1-purple-bold" part="bold-subtitle">${boldSub}</h1>
            </slot>` : ''}

          <slot name="cta">
            <p part="cta">Escanea el qr para más información</p>
          </slot>

          ${qrSrc ? /* html */`
            <slot name="qr">
              <img class="qr" part="qr" src="${qrSrc}" alt="${qrAlt}">
            </slot>` : ''}

          ${posterSrc ? /* html */`
            <slot name="poster-image">
              <img class="poster-image" part="poster-image" src="${posterSrc}" alt="${posterAlt}">
            </slot>` : ''}

          <!-- Slot default: contenido libre adicional -->
          <slot></slot>

          <slot name="card-footer">
            <h2 part="card-footer">${institution}</h2>
          </slot>

        </div>

      </article>
    `;
  }

  /* ── Estilos (CSS original trasladado al Shadow DOM) ─── */
  static #styles() {
    return /* css */`
      /* ════ Tokens con valores por defecto ════ */
      :host {
        display: block;

        --pc-font-family:         'Myriad Pro', Arial, sans-serif;
        --pc-color-yellow:        #fdb912;
        --pc-color-blue:          #8ed8f8;
        --pc-color-purple:        #8a0552;
        --pc-color-white:         #ffffff;

        --pc-header-height:       185px;
        --pc-header-max-width:    380px;
        --pc-body-max-width:      380px;
        --pc-body-padding-top:    40px;

        --pc-subtitle-color:      #8a0552;
        --pc-subtitle-font-size:  1.2em;
        --pc-cta-color:           #ffffff;
        --pc-cta-margin-top:      50px;

        --pc-qr-size:             55px;
        --pc-poster-max-width:    360px;

        --pc-card-max-width:      390px;
        --pc-card-padding-bottom: 36px;
      }

      /* ── Resets internos ── */
      * {
        box-sizing: border-box;
      }

      h1 {
        font-size: 1.5em;
        color: white;
        text-align: left;
        margin-left: 30px;
        margin-right: 20px;
      }

      img {
        width: auto;
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
      }

      h2 {
        font-size: 1.5rem;
        color: var(--pc-color-white);
        position: absolute;
        bottom: 3px;
        left: 27%;
        transform: translateX(-50%);
        line-height: 1;
        font-family: "Cinzel", "Times New Roman", serif;
        font-weight: 500;
        letter-spacing: 0.02em;
        margin: 0;
        z-index: 3;
      }

      p {
        font-size: 0.9em;
        color: var(--pc-cta-color);
        text-align: center;
        margin-top: var(--pc-cta-margin-top);
      }

      /* ── Contenedor del card ── */
      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: var(--pc-card-max-width);
        background-color: transparent;
        margin: 0 auto;
        overflow: visible;
        padding-bottom: var(--pc-card-padding-bottom);
        padding-right: 0;
      }

      /* ── Header ── */
      .container-posterheader {
        background-color: var(--pc-color-yellow);
        position: relative;
        width: 100%;
        max-width: var(--pc-header-max-width);
        height: var(--pc-header-height);
      }

      .container-posterheader--blue-block {
        position: absolute;
        width: fit-content;
        height: fit-content;
        background-color: var(--pc-color-blue);
        transform: rotateZ(1deg);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
        top: 52px;
        left: 68px;
        z-index: 3;
      }

      .container-posterheader--purple-block {
        position: absolute;
        width: fit-content;
        height: fit-content;
        background-color: var(--pc-color-purple);
        transform: rotateZ(-3deg);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
        padding-left: 10px;
        top: 108px;
        left: 86px;
        z-index: 4;
      }

      .container-posterheader--white-block {
        position: absolute;
        background-color: var(--pc-color-white);
        width: fit-content;
        height: fit-content;
        transform: rotateZ(20deg);
        top: 104px;
        left: 60px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
        z-index: 5;
      }

      .container-posterheader--inverted-exclamation-mark-block {
        position: absolute;
        background-color: var(--pc-color-purple);
        width: fit-content;
        height: 70px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        padding: 4px 2px;
        transform: rotateZ(-10deg);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
        top: 18px;
        left: 36px;
        z-index: 2;
      }

      .container-posterheader--exclamation-mark-block {
        position: absolute;
        background-color: var(--pc-color-blue);
        width: fit-content;
        height: 70px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        padding: 4px 2px;
        transform: rotateZ(10deg);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
        top: 85px;
        left: 314px;
        z-index: 6;
      }

      /* ── Tipografías del header ── */
      .h1-white {
        font-size: 2em;
        color: var(--pc-color-white);
        font-family: var(--pc-font-family);
        font-weight: 700;
        margin: 8px 14px;
      }

      .h1-yellow {
        color: var(--pc-color-yellow);
        font-family: var(--pc-font-family);
        font-weight: 700;
        margin: 6px 8px;
      }

      .inverted-exclamation-mark {
        font-size: 4em;
        font-family: Arial, sans-serif;
        font-weight: 700;
        color: var(--pc-color-yellow);
        margin: 0;
        line-height: 1;
        display: block;
      }

      .exclamation-mark {
        font-size: 4em;
        font-family: Arial, sans-serif;
        font-weight: 700;
        color: var(--pc-color-purple);
        margin: 0;
        line-height: 1;
        display: block;
      }

      /* ── Body ── */
      .container-posterbody {
        background-color: var(--pc-color-yellow);
        width: 100%;
        max-width: var(--pc-body-max-width);
        height: max-content;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: var(--pc-body-padding-top);
      }

      .poster-image {
        width: 100%;
        max-width: var(--pc-poster-max-width);
        height: auto;
      }

      /* ── Subtítulos del cuerpo ── */
      .h1-purple {
        font-size: var(--pc-subtitle-font-size);
        color: var(--pc-subtitle-color);
        font-family: Arial, sans-serif;
        font-weight: 600;
        margin: 8px 14px;
        text-align: center;
      }

      .h1-purple-bold {
        font-size: var(--pc-subtitle-font-size);
        color: var(--pc-subtitle-color);
        font-family: Arial, sans-serif;
        font-weight: 800;
        margin: 8px 14px;
        text-align: center;
      }

      /* ── QR ── */
      .qr {
        font-size: 0.8em;
        width: var(--pc-qr-size);
        max-width: var(--pc-qr-size);
        height: auto;
        display: block;
        margin: 0 auto;
        border: 2px solid var(--pc-color-white);
      }

      /* ── Media query interna ── */
      @media (max-width: 860px) {
        .container {
          max-width: 380px;
          padding-bottom: 12px;
        }

        h1 {
          margin-left: 16px;
          margin-right: 12px;
        }
      }
    `;
  }
}

customElements.define('poster-card', PosterCard);