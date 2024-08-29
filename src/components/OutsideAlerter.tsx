import React, { useEffect, useRef } from 'react';

interface OutsideAlerterProps {
  children: React.ReactNode;
  func: Function;
}

function useOutsideAlerter(ref: any, func: Function) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

function OutsideAlerter(props: OutsideAlerterProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.func);

  return <div ref={wrapperRef}>{props.children}</div>;
}

export default OutsideAlerter;
