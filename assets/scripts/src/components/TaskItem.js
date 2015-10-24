import React, { Component, PropTypes } from 'react';

export default class TaskItem extends Component {

  render() {

    const style = {
      complete: {
        margin: "0 5px",
        backgroundColor: "#def",
        paddingLeft: "5px",
        paddingRight: "5px"
      },
      remove: {
        margin: "0 5px",
        backgroundColor: "#fdd",
        paddingLeft: "5px",
        paddingRight: "5px"
      }
    };

    const { todo, onRemoveClick, onCompleteClick } = this.props;

    const completed = todo.completed?
        {
          color: "#adadad",
          textDecoration: "line-through"
        }: {};

    return (
        <div className="item">
          <li>
            <label style={completed}>
              {todo.task}
            </label>
            <button className="btn btn-sm" style={style.complete}
                    onClick={() => onCompleteClick(todo.id)} >complete</button>
            <button className="btn btn-sm" style={style.remove}
                    onClick={() => onRemoveClick(todo.id)} >remove</button>
          </li>
        </div>
    );
  }
}

TaskItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onCompleteClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
};
