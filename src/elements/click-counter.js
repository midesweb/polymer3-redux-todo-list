import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * `click-counter` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ClickCounter extends PolymerElement {
  static get properties() {
    return {
      counter: {
        type: Number,
      }
    }
  }

  static get template() {
    return html`
      <h1>[[counter]]</h1>
    `;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }
}

customElements.define('click-counter', ClickCounter);