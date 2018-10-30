import { combineReducers } from 'redux'

import {
  UPDATE_PAGE,
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER
} from '../actions/app_actions.js';

/*
* Reducer para la navegación
*/
function navigation(state = '', action) {
  switch(action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      }
    default:
      return state
  }
} 

/*
* Reducer para las TODO
*/
function todos(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          id: (state)? state.length + 1 : 1
        }
      ]
    case TOGGLE_TODO: 
      return state.map((todo) => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default: 
      return state
  }
}

/*
* Reducer para el filtro de visibilidad
*/
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER: 
      return action.filter
    default:
      return state
  }
}

// function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }
//Eso mismo se consigue con combineReducers

export const todoApp = combineReducers({
  navigation,
  visibilityFilter,
  todos
})

