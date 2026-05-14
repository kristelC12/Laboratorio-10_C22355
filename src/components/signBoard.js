class SignBoard extends HTMLElement {
  static get observedAttributes() {
    return ["institution"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML !== "") this.#render();
  }

  #attr(name, fallback = "") {
    return this.getAttribute(name) ?? fallback;
  }

  #render() {
    const institution = this.#attr("institution", "UCR");

    this.shadowRoot.innerHTML = /* html */ `
      <style>${SignBoard.#styles()}</style>
      <section class="container-all" role="list" aria-label="Panel de señalización">
        <div class="container">
          <slot></slot>
          <footer class="container-sign container-sign--curve" aria-label="Institución">
            <h2 class="container-sign__institution">${institution}</h2>
          </footer>
        </div>
      </section>
    `;
  }

  static #styles() {
    return /* css */ `
      :host {
        display: block;
        width: 100%;
        max-width: 390px;
        margin: 0 auto;
        overflow: hidden;

        --color-blue: #005da4;
        --color-white: #ffffff;
      }

      .container-all {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 100%;
        max-width: 860px;
        margin: 0 auto;
        overflow: hidden;
      }

      /* column that contains the signs and the curved footer; keep it blue */
      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 390px;
        margin: 0 auto;
        overflow: visible;
        background-color: var(--color-blue);
        padding-bottom: 0; /* curve provides the white area */
        padding-right: 0;
      }

      ::slotted(directional-sign) {
        display: block;
        width: 100%;
      }

      /* footer curve container */
      .container-sign {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        width: 100%;
        height: max-content;
        flex: 1;
        margin-right: 0;
        background-color: var(--color-blue);
        border-bottom: 1px solid var(--color-white);
      }

      .container-sign--curve {
        overflow: hidden;
        min-height: 74px;
        border-bottom: none;
      }

      .container-sign--curve::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 56px;
        background: var(--color-white);
        border-top-left-radius: 50% 40%;
        border-top-right-radius: 50% 40%;
        z-index: 2;
      }

      .container-sign__institution {
        position: absolute;
        bottom: 5px;
        left: 50%;
        z-index: 3;
        margin: 0;
        transform: translateX(-50%);
        line-height: 1;
        color: var(--color-blue);
        font-family: "Cinzel", "Times New Roman", serif;
        font-size: 3.1rem;
        font-weight: 500;
        letter-spacing: 0.02em;
      }
    `;
  }
}

customElements.define("sign-board", SignBoard);
