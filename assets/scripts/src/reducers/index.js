import * as ActionTypes from '../actions/taskAction';
import merge from 'lodash/object/merge';
import { combineReducers } from 'redux';
import _ from 'lodash';

export function task(state = { tasks: [], text: '', isFetching: false }, action) {

  //console.log('state: %s', JSON.stringify(state));
  //console.log(state);
  //console.log(': %s', JSON.stringify('action'));
  //console.log(action);

  switch (action.type) {
    case ActionTypes.LOAD_TASKS_SUCCESS:
      if (action.response) {
        return merge({}, state, {
          tasks: action.response.data,
          isFetching: false
        });
      }
      break;

    case ActionTypes.ADD_TASK_SUCCESS:
      return merge({}, state, {
        tasks: state.tasks.concat(action.response.data),
        text: ''
      });

    case ActionTypes.EDIT_TASK_SUCCESS:
      let edited = action.response.data;
      //let tasks = state.tasks;
      let tasks = _.map(state.tasks, (task) => {
          return task.id === edited.id
              ? edited: task;
        }
      );
      return Object.assign({}, state, {tasks: tasks});

    case ActionTypes.DELETE_TASK_SUCCESS:
      let removed = state.tasks.filter(task =>
          task.id !== action.id
      );
      return Object.assign({}, state, {tasks: removed});

    case ActionTypes.LOAD_TASKS_REQUEST:
      return merge({}, state, {
        isFetching: true
      });

    case ActionTypes.LOAD_TASKS_FAILURE:
      return merge({}, state, {
        isFetching: false
      });

  }

  return state;
}


const rootReducer = combineReducers({
  task
});

export default rootReducer;
