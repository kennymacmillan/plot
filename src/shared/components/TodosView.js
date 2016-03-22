import React from 'react';
import Immutable from 'immutable';

export default class TodosView extends React.Component {

  static propTypes = {
    todos: React.PropTypes.instanceOf(Immutable.List).isRequired,
    editTodo: React.PropTypes.func.isRequired,
    deleteTodo: React.PropTypes.func.isRequired
  }

  handleDelete = (e) => {
    const id = Number(e.target.dataset.id);

    // equivalent to dispatch(deleteTodo())
    this.props.deleteTodo(id);
  }

  handleEdit = (e) => {
    const id = Number(e.target.dataset.id);
    const val = this.props.todos.get(id).text;

    const newVal = window.prompt('', val); // eslint-disable-line no-alert, no-undef
    this.props.editTodo(id, newVal);
  }

  render() {
    return (
      <div id="todo-list">
        {
          this.props.todos.map((todo, index) =>
            <div key={index}>
              <span>{todo}</span>

              <button data-id={index} onClick={this.handleDelete}>X</button>
              <button data-id={index} onClick={this.handleEdit}>Edit</button>
            </div>
          )
        }
      </div>
    );
  }
}
