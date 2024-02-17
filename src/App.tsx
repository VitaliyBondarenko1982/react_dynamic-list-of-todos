/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { ActiveFilter } from './types/ActiveFilter';

import './App.scss';

const getFilteredTodos = (allTodos: Todo[], filter: ActiveFilter, query: string): Todo[] => {
  let filteredTodos = allTodos;

  if (query) {
    filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(query.trim().toLowerCase()));
  }

  switch (filter) {
    case ActiveFilter.Active:
      return filteredTodos.filter(todo => !todo.completed);
    case ActiveFilter.Completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(ActiveFilter.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredTodos = getFilteredTodos(todos, activeFilter, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={filteredTodos}
                  activeTodo={activeTodo}
                  setActiveTodo={setActiveTodo}
                />
              ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && <TodoModal activeTodo={activeTodo} setActiveTodo={setActiveTodo} />}
    </>
  );
};
