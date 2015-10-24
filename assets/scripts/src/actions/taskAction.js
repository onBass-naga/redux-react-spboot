import { CALL_API } from '../middleware/api';


export const LOAD_TASKS_REQUEST = 'LOAD_TASKS_REQUEST';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
export const LOAD_TASKS_FAILURE = 'LOAD_TASKS_FAILURE';

function _loadTasks() {
  return {
    [CALL_API]: {
      types: [LOAD_TASKS_REQUEST, LOAD_TASKS_SUCCESS, LOAD_TASKS_FAILURE],
      endpoint: 'todos'
    }
  };
}

export function loadTasks() {
  return (dispatch, getState) => {
    return dispatch(_loadTasks());
  };
}

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

function _addTask(task) {
  return {
    [CALL_API]: {
      types: [ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE],
      endpoint: `todos`
    },
    requestBody: { task: task, completed: false }
  };
}

export function addTask(task) {
  return (dispatch, getState) => {
    return dispatch(_addTask(task));
  };
}

export const EDIT_TASK_REQUEST = 'EDIT_TASK_REQUEST';
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
export const EDIT_TASK_FAILURE = 'EDIT_TASK_FAILURE';

function _editTask(todo) {
  return {
    [CALL_API]: {
      types: [EDIT_TASK_REQUEST, EDIT_TASK_SUCCESS, EDIT_TASK_FAILURE],
      endpoint: `todos/${todo.id}`
    },
    requestBody: todo
  };
}

export function editTask(id) {
  return (dispatch, getState) => {
    const target = getState().task.tasks.filter(
        (task) => task.id === id
    )[0];
    target.completed = !target.completed;
    return dispatch(_editTask(target));
  };
}

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

function _deleteTask(id) {
  return {
    [CALL_API]: {
      types: [DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE],
      endpoint: `todos/${id}`
    },
    id: id
  }
}

export function deleteTask(id) {
  return (dispatch, getState) => {
    return dispatch(_deleteTask(id));
  };
}
