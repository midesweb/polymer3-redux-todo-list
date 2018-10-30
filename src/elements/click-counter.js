import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';

import {
  increaseCounter,
  decreaseCounter
} from '../actions/counter_actions';

import counterReducer from '../reducers/counter_reducers';
store.addReducers({
  counter: counterReducer
});

/**
 * `click-counter` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ClickCounter extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      _counter: {
        type: Number,
      }
    }
  }

  static get template() {
    return html`
      <h1>[[_counter]]</h1>
      <p>
        <vaadin-button on-click="incrementar">Incrementar</vaadin-button>
        <vaadin-button on-click="decrementar">Decrementar</vaadin-button>
      </p>
    `;
  }


  stateChanged(state) {
    console.log('stateChanged click-counter', state);
    this._counter = state.counter.value;
  }

  incrementar() {
    store.dispatch(increaseCounter());
  }
  decrementar() {
    store.dispatch(decreaseCounter());
  }
}

customElements.define('click-counter', ClickCounter);