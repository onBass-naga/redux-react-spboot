import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

import { loadTasks, deleteTask, addTask, editTask } from '../actions/taskAction';

function loadData(props) {
  props.loadTasks();
}

function hasDiff(tasks1, tasks2) {
  if (tasks1.length !== tasks2.length) {
    return true;
  }
  return _.any(tasks1, (task1)=> {
      const task2 = _.find(tasks2, (t2)=> {
          return t2.id === task1.id;
      });

      return task1.task !== task2.task
            || task1.completed !== task2.completed;
  });
}

class Task extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (hasDiff(nextProps.tasks, this.props.tasks)) {
      loadData(nextProps);
    }
  }

  render() {

    const onCompleteClick = (id) => {
      this.props.editTask(id);
    };

    const onRemoveClick = (id) => {
      this.props.deleteTask(id);
    };

    const onAddClick = (task) => {
      this.props.addTask(task);
    };

    const { tasks, text, isFetching } = this.props;
    const actions = Object.assign({},
      {onRemoveClick: onRemoveClick},
      {onCompleteClick: onCompleteClick}
    );
    return (
      <div style={{marginTop: '30px'}}>
        <h2 style={{display: 'inline'}}>task</h2>
        <TaskForm text={text} onAddClick={ onAddClick } />
        <hr style={{clear: 'both'}}/>
        <TaskList items={tasks}
                  isFetching={isFetching}
                  loadingLabel={`Loading...`}
                  actions={actions}/>
      </div>
    );
  }
}

Task.propTypes = {
  tasks: PropTypes.array.isRequired,
  loadTasks: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired
};

Task.defaultProps = {
  tasks: []
};

Task.contextTypes = {
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const tasks = state.task.tasks;
  const text = state.task.text;
  const isFetching = state.task.isFetching;
  return {tasks: tasks, text: text, isFetching: isFetching}
}

export default connect(
  mapStateToProps,
  {loadTasks, deleteTask, addTask, editTask}
)(Task);
