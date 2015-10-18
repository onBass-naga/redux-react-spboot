import React, { Component, PropTypes } from 'react';
import TaskItem from './TaskItem';

export default class TaskList extends Component {

  render() {
    const {
      isFetching, items, loadingLabel, actions
    } = this.props;

    if (isFetching) {
      return <h2><i>{loadingLabel}</i></h2>;
    }

    const isEmpty = items.length === 0;
    if (isEmpty) {
      return <h2><i>There is no task.</i></h2>;
    }
    return (
      <div>
        {items.map(todo =>
          <TaskItem key={todo.id} todo={todo} { ...actions }></TaskItem>
        )}
      </div>
    );
  }
}

TaskList.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

TaskList.defaultProps = {
  isFetching: true,
  loadingLabel: 'Now Loading...'
};
