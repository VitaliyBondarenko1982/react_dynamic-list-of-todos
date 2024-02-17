import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  activeTodo: Todo | null;
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>
}

export const TodoList: React.FC<Props> = ({
  todos,
  activeTodo,
  setActiveTodo,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          isActiveTodo={todo.id === activeTodo?.id}
          setActiveTodo={setActiveTodo}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);
