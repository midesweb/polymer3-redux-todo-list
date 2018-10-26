import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store';
import { 
  addTodo, 
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from '../actions/app_actions';

// componentes de terceros
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-styles/typography.js';
import '@polymer/paper-styles/shadow.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@polymer/paper-icon-button';
import '@vaadin/vaadin-button/vaadin-button.js';


// mis componentes
import './todo-item';

/**
 * @customElement
 * @polymer
 */
class ReduxDemoApp extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style is="custom-style">
        :host {
          display: block;
          --main-color: #8cf;
          @apply --paper-font-common-base;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 95vh;
        }
        input {
          padding: 5px;
          border-radius: 5px;
          border: 1px solid var(--main-color);
        }
        paper-icon-button {
          color: var(--main-color);
        }
        .sin-todos {
          padding: 10px 15px;
          margin: 15px 0;
          background-color: #eee;
          color: #966;
          border: 1px solid #edd;
          border-radius: 3px;
          font-size: 0.85em;
        }
        h1 {
          @apply --paper-font-headline;
        }
        .filter a {
          display: inline-block;
          margin-left: 10px;
          color: var(--main-color);
          text-decoration: none;
        }
        .filter span {
          text-transform: uppercase;
        }
        .container {
          padding: 15px;
          @apply --shadow-elevation-2dp;
        }
      </style>
      <div class="container">
        <h1>Todo list</h1>
        <template is="dom-repeat" items="[[_todos]]">
          <todo-item 
            todo="[[item]]" 
            index="[[index]]"
            on-cambia-estado="cambiaEstadoTodo"
          ></todo-item>
        </template>
        <template is="dom-if" if="[[!_todos.length]]">
          <p class="sin-todos">No tengo todos</p>
        </template>
        <p>
          Nueva acción: <input type="text" id="actionText" on-keypress="escrito"> 
          <paper-icon-button icon="vaadin:arrow-circle-right-o" on-click="addTodo"></paper-icon-button>
        </p>
        <p class="filter">
          <span>Filtro:</span> <a href="#" on-click="verTodos">Ver todas</a>
          <a href="#" on-click="verNoCompletados">Ver NO completadas</a>
          <a href="#" on-click="verCompletados">Ver completadas</a>

        </p>
        <p>
          <vaadin-button on-click="mostrarStore">Log store en consola</vaadin-button>
        </p>
      </div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'redux-demo-app'
      },
      _todos: {
        type: Array,
        value: function() { return [] }
      }
    };
  }

  escrito(e) {
    if(e.code == "Enter") {
      this.addTodo();
    }

  }
  addTodo() {
    let tarea = this.$.actionText.value;
    console.log('añado tarea ', tarea);
    store.dispatch(addTodo(tarea));
    this.$.actionText.value = '';
    this.$.actionText.focus();
  }

  cambiaEstadoTodo(e) {
    console.log('en redux demo' ,e.detail);
    store.dispatch(toggleTodo(e.detail.id))
  }

  mostrarStore() {
    console.log(store.getState());
  }

  verTodos(e) {
    e.preventDefault();
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL));
  }

  verNoCompletados(e) {
    e.preventDefault();
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE));
  }

  verCompletados(e) {
    e.preventDefault();
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));
  }

  stateChanged(state) {
    console.log('stateChanged', state);
    this._filter = state.todoApp.visibilityFilter;
    this._todos = state.todoApp.todos.filter(this.filtradoTodos.bind(this))
  }

  filtradoTodos(item) {
    //console.log('filtradoTodos', item, this._filter);
    if(this._filter == VisibilityFilters.SHOW_ALL) {
      return true;
    }
    if(this._filter == VisibilityFilters.SHOW_ACTIVE && item.completed) {
      return false;
    }
    if(this._filter == VisibilityFilters.SHOW_COMPLETED && !item.completed) {
      return false;
    }
    return true;
  }
}

window.customElements.define('redux-demo-app', ReduxDemoApp);
