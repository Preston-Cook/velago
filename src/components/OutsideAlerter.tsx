import React, { useEffect, useRef } from 'react';

interface OutsideAlerterProps {
  children: React.ReactNode;
  func: () => void;
}

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  func: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        func();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, func]);
}

export function OutsideAlerter(props: OutsideAlerterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(wrapperRef, props.func);

  return <div ref={wrapperRef}>{props.children}</div>;
}
