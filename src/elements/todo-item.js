import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import '@vaadin/vaadin-item/vaadin-item.js';

/**
 * `todo-item` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class TodoItem extends PolymerElement {
  static get properties() {
    return {
      todo: {
        type: Object
      }
    }
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        div {
          display: inline-block;
        }
      </style>
      <vaadin-item on-click="cambiarEstado">
        <vaadin-checkbox checked="[[todo.completed]]">
          [[todo.id]]: [[todo.text]]
        </vaadin-checkbox>
      </vaadin-item>
    `;
  }

  cambiarEstado() {
    console.log('cambiar estado en todo-item', this.index)
    this.dispatchEvent(new CustomEvent('cambia-estado', {
      detail: {
        id: this.todo.id
      }
    }));
  }

  // todoObserver(todo) {
  //   console.log('todoObserver', todo);
  // }
}

customElements.define('todo-item', TodoItem);