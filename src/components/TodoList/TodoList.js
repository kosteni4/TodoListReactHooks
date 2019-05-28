import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import Loader from '../Loader/Loader';

import './TodoList.scss';

function TodoList(props) {
  const htmlElement = document.documentElement;
  let countPush = 0;

  const [todos, setTodos] = useState([props.todos]);
  const [isFetching, setIsFetching] = useState(false);

  const pushItems = countPush => {
    console.log('run pushItems');
    fetch('./data.json')
      .then(response => response.json())
      .then(todos => {
        countPush = todos.length < countPush + 10
          ? todos.length
          : countPush + 10;
        let result = todos.filter(todo => +todo.id < countPush && +todo.id >= countPush - 10);
        setTodos(result);
        return result;
      })
  };

  const memoResultItems = useMemo(() => pushItems(countPush), [countPush]);

  console.log(memoResultItems);

  const memoPushItems = useCallback(
    () => {
      pushItems(countPush);
    },
    [countPush],
  );

  useEffect(memoPushItems.bind(null, countPush), []);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + htmlElement.scrollTop !== htmlElement.offsetHeight) return;
      setIsFetching(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [htmlElement.scrollTop, htmlElement.offsetHeight]);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function fetchMoreListItems() {
    setTimeout(() => {
      setTodos(prevState => ([...prevState, memoResultItems]));
      setIsFetching(false);
    }, 2000);
  }

  useEffect(() => {
    document.title = todos
      ? todos.length > 1
        ? todos.length + ' tasks'
        : todos.length + ' task'
      : '0 task';
  });

  return (
    todos && todos.length > 1
      ? (
        <ul className='todo-list'>
          {todos.map(item =>
            <Todo
              key={item.id}
              id={item.id}
              cls={item.cls}
              paragraph={item.paragraph}
            />
          )}
        </ul>
      )
      : isFetching && <Loader />
  );

}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object)
};

export default TodoList;