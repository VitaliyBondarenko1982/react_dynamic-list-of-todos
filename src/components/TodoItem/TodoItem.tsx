import React, { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  isActiveTodo: boolean;
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>
}

export const TodoItem: FC<Props> = ({ todo, isActiveTodo, setActiveTodo }) => {
  const selectTodo = () => {
    setActiveTodo(isActiveTodo ? null : todo);
  };

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': isActiveTodo })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={cn('has-text-success', {
            'has-text-danger': !todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={selectTodo}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': isActiveTodo,
                'fa-eye': !isActiveTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
