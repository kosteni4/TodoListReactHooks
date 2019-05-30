import React from 'react';

import './FilterTodos.scss';

function FilterTodos({ cls, status, filters, onFilter }) {

  function handlerFilter(event) {
    onFilter(event.target.name)
  }

  return (
    <div className={`${cls} filter-todos`}>
      {
        filters.map(btn => {
          const classActive = status === btn.name ? 'js-active' : '';
          return <button
            type='text'
            key={btn.id}
            className={`${btn.cls} ${classActive}`}
            name={btn.name}
            onClick={handlerFilter}>
              {btn.text}
          </button>
        })
      }
    </div>
  );
}

export default FilterTodos;