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
      <div class="container-sign" part="sign" role="listitem">
        <slot name="label">
          <h2 class="container-sign__label" part="label">${label}</h2>
        </slot>

        <slot name="arrow">
          ${arrowSrc
            ? `<img class="arrow" part="arrow" src="${arrowSrc}" alt="${arrowAlt}">`
            : `<span class="arrow arrow--fallback" part="arrow-text" aria-hidden="true">${arrowAlt}</span>`
          }
        </slot>
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
        background-color: var(--ds-bg, #005da4);
        border-bottom: 1px solid var(--ds-divider-color, #ffffff);
        padding: 14px 0;
      }

      .container-sign__label {
        margin: 0;
        font-family: var(--ds-font-family, 'Cinzel', serif);
        font-size: var(--ds-label-font-size, clamp(1rem, 1.6vw, 1.35rem));
        font-weight: var(--ds-label-weight, 700);
        line-height: 1.1;
        color: var(--ds-label-color, #ffffff);
        flex: 1;
        padding-left: 1.15rem;
      }

      .arrow {
        flex-shrink: 0;
        width: var(--ds-arrow-size, 24px);
        height: auto;
        object-fit: contain;
        display: block;
        margin-left: auto;
        margin-right: var(--ds-arrow-gap, 18px);
      }

      .arrow--fallback {
        font-size: var(--ds-arrow-font-size, 1.5rem);
        color: var(--ds-label-color, #ffffff);
      }
    `;
  }
}

customElements.define('directional-sign', DirectionalSign);