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

// mis componentes
import './todo-item';

/**
 * @customElement
 * @polymer
 */
class ReduxDemoApp extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Todo list</h2>
      <template is="dom-repeat" items="[[_todos]]">
        <todo-item 
          todo="[[item]]" 
          index="[[index]]"
          on-cambia-estado="cambiaEstadoTodo"
        ></todo-item>
      </template>
      <p>
        Texto de la acción: <input type="text" id="actionText">
      </p>
      <p>
        <button on-click="addTodo">Añadir esa tarea</button>
        <button on-click="mostrarStore">mostrar store</button>
        <br>
        <button on-click="verTodos">Ver todas las todo</button>
        <button on-click="verNoCompletados">Ver NO completadas</button>
        <button on-click="verCompletados">Ver completadas</button>

      </p>
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

  addTodo() {
    let tarea = this.$.actionText.value;
    console.log('añado tarea ', tarea);
    store.dispatch(addTodo(tarea));
    this.$.actionText.value = '';
  }

  cambiaEstadoTodo(e) {
    console.log('en redux demo' ,e.detail);
    store.dispatch(toggleTodo(e.detail.id))
  }

  mostrarStore() {
    console.log(store.getState());
  }

  verTodos() {
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL));
  }

  verNoCompletados() {
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE));
  }

  verCompletados() {
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
