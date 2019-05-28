import React from 'react';

export default function Nothing(props) {

  const cls = props.cls;
  const children = props.children;

  return (
    <p className={cls}>
      {children}
    </p>
  );
}