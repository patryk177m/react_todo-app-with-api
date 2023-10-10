import { FormEventHandler, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useTodo } from '../providers/AppProvider';
import { Todo } from '../types/Todo';
import { USER_ID } from '../utils/fetchClient';

export const HeaderTodo = () => {
  const {
    todos,
    title,
    setTitleContext,
    addTodoContext,
    setError,
    isDisabled,
    setEditedTodo,
    completeAllTodosContext,
    isLoading,

  } = useTodo();

  const inputEdit = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputEdit.current) {
      inputEdit.current.focus();
    }
  }, [isLoading, todos.length]);

  const completeAllTodos = (todosHeader: Todo[]) => {
    const allCompleted = todos.every(todo => todo.completed);

    todosHeader.map(todo => {
      return completeAllTodosContext({ ...todo, completed: !allCompleted });
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  /* eslint-disable-next-line */
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const newTodo: Todo = {
      id: 0,
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    };

    if (event.key === 'Enter') {
      if (title.trim() === '') {
        setError('Title should not be empty');

        return;
      }

      setEditedTodo(newTodo);
      addTodoContext(newTodo);
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        /* eslint-disable-next-line */
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed === true),
          })}
          data-cy="ToggleAllButton"
          onClick={() => completeAllTodos(todos)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          disabled={isDisabled}
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitleContext(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          ref={inputEdit}
        />
      </form>
    </header>
  );
};
