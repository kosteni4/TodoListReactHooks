import React from 'react';

import './Title.scss';

function Title(props) {

  const cls = props.cls;
  const children = props.children;

  return (
    <h1 className={cls + ' title'}>
      {children}
    </h1>
  );
}

export default Title;
