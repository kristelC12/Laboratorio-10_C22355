/**
 * <directional-sign>
 *
 * Una fila de señalización con etiqueta y flecha.
 * Debe usarse como hijo de <sign-board>.
 *
 * Atributos:
 *   label      – texto del destino (requerido)
 *   arrow-src  – ruta de la imagen de flecha
 *   arrow-alt  – texto alternativo de la flecha (default: "→")
 */
class DirectionalSign extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'arrow-src', 'arrow-alt'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML !== '') this.#render();
  }

  #attr(name, fallback = '') {
    return this.getAttribute(name) ?? fallback;
  }

  #render() {
    const label = this.#attr('label', '—');
    const arrowSrc = this.#attr('arrow-src');
    const arrowAlt = this.#attr('arrow-alt', '→');

    this.shadowRoot.innerHTML = /* html */`
      <style>${DirectionalSign.#styles()}</style>
      <div class="container-sign" role="listitem">
        <h2 class="container-sign__label">${label}</h2>
        ${arrowSrc
          ? `<img class="arrow" src="${arrowSrc}" alt="${arrowAlt}">`
          : `<span class="arrow arrow--fallback" aria-hidden="true">${arrowAlt}</span>`
        }
      </div>
    `;
  }

  static #styles() {
    return /* css */`
      :host {
        display: block;
        width: 100%;
      }

      .container-sign {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        gap: 12px;
        width: 100%;
        min-height: max-content;
        position: relative;
        flex: 1;
        background-color: #005da4;
        border-bottom: 1px solid #ffffff;
        padding: 14px 0;
      }

      .container-sign__label {
        margin: 0;
        font-family: 'Cinzel', serif;
        font-size: clamp(1rem, 1.6vw, 1.35rem);
        font-weight: 700;
        line-height: 1.1;
        color: #ffffff;
        flex: 1;
        padding-left: 1.15rem;
      }

      .arrow {
        flex-shrink: 0;
        width: 24px;
        height: auto;
        object-fit: contain;
        display: block;
        margin-left: auto;
        margin-right: 18px;
      }

      .arrow--fallback {
        font-size: 1.5rem;
        color: #ffffff;
      }
    `;
  }
}

customElements.define('directional-sign', DirectionalSign);