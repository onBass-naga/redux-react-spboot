import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class TaskForm extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
        text: this.props.text || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      text: nextProps.text || ''
    };
  }

  handleSubmit() {
    const text = this.refs.taskInput.value.trim();
    this.props.onAddClick(text);
  }

  handlePressEnter(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onAddClick(text);
    }
  }

  handleChange(e) {
    const text = e.target.value.trim();
    this.setState({text: text});
  }


  render() {

    const style = {
      btn: {
        margin: "0 5px",
        backgroundColor: "#dfe",
        paddingLeft: "5px",
        paddingRight: "5px"
      }
    };

    const { addTodo } = this.props;
    return (
      <div style={{float: 'right', display: 'inline'}}>
        <input type="text" size="20"
               ref="taskInput"
               value={this.state.text}
               onChange={this.handleChange.bind(this)}
               onKeyDown={this.handlePressEnter.bind(this)}/>
        <button className="btn btn-sm" style={style.btn}
                onClick={ () => this.handleSubmit()} >add</button>
      </div>
    );
  }
}

TaskForm.propTypes = {
    text: PropTypes.string,
    onAddClick: PropTypes.func.isRequired
};
