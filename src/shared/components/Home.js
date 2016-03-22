import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/TodoActions';
import Immutable from 'immutable';
import TodosView from './TodosView';
import TodosForm from './TodosForm';

@connect(state => ({ todos: state.todos }))
export default class Home extends React.Component {

  static propTypes = {
    todos: React.PropTypes.instanceOf(Immutable.List).isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  render() {
    const { todos, dispatch } = this.props;

    return (
      <div id="todo-list">
        <TodosView todos={todos} {...bindActionCreators(TodoActions, dispatch)} />
        <TodosForm {...bindActionCreators(TodoActions, dispatch)} />
      </div>
    );
  }
}
