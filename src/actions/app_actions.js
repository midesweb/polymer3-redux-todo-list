/*
* Action types
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * otras constantes
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
* Action creators
*/

export function navigate(path) {
  let page = path === '/' ? 'todo-home' : path.slice(1);
  switch(page) {
    case 'todo-home':
      break;
    case 'estadisticas':
      import('../elements/todo-stats.js');
      break;
    case 'contador':
      import('../elements/click-counter.js');
      break;
    case 'view2':
      import('../elements/my-view2.js');
      break;
    case 'link':
      import('../elements/imperative-link.js');
      break;
    case 'posts':
      import('../elements/post-list.js');
      break;
    default:
      page = 'view404';
      import('../elements/error-404.js');
  }
  return {
    type: UPDATE_PAGE,
    page: page
  }
} 

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}