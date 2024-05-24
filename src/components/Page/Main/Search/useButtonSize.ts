import { MutableRefObject, useState, useLayoutEffect } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

type SetPropertyFunction = (newString: string) => void;

function useCssProperty(
  ref: MutableRefObject<HTMLAnchorElement | null>,
  property: string,
  value: string = '',
): [state: string, setValue: SetPropertyFunction] {
  const [state, setState] = useState(value);

  const setValue = (newValue: string) => {
    if (ref.current) {
      ref.current.style.setProperty(property, newValue);
    }
    setState(newValue);
  };

  return [state, setValue];
}

function useButtonSize(ref: MutableRefObject<HTMLAnchorElement | null>) {
  const [minWidth, setMinWidth] = useCssProperty(ref, '--calculated-height');

  useLayoutEffect(() => {
    if (ref.current) {
      const calculatedHeight = ref.current.getBoundingClientRect().height;
      setMinWidth(`${calculatedHeight}px`);
    }
  }, [minWidth]);

  useResizeObserver(ref.current, (entry) => {
    const { offsetHeight } = entry.target as HTMLAnchorElement;
    if (`${offsetHeight}px` !== minWidth) {
      setMinWidth(`${ref.current!.offsetHeight}px`);
    }
  });
}

export default useButtonSize;
