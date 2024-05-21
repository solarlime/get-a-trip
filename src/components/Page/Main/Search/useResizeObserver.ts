import { MutableRefObject, useState, useEffect } from 'react';

function useCssProperty(
  ref: MutableRefObject<HTMLAnchorElement | null>,
  property: string,
  value: number,
): [state: number, setValue: (newString: number) => void] {
  const [state, setState] = useState(value);

  const setValue = (newValue: number) => {
    console.log('oh', Date.now());
    if (ref.current) {
      console.log('yeah', newValue);
      ref.current.style.setProperty(property, `${newValue}px`);
    }
    setState(newValue);
  };

  return [state, setValue];
}

function useResizeObserver(ref: MutableRefObject<HTMLAnchorElement | null>) {
  const [minWidth, setMinWidth] = useCssProperty(ref, '--calculated-height', 0);

  useEffect(() => {
    let inProgress = false;
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.borderBoxSize) {
            const { offsetHeight } = entry.target as HTMLAnchorElement;
            if (offsetHeight !== minWidth) {
              if (!inProgress) {
                inProgress = true;
                // Throttle is helpful here
                const timeout = setTimeout(() => {
                  clearTimeout(timeout);
                  setMinWidth(ref.current!.offsetHeight);
                  inProgress = false;
                }, 200);
              }
            }
          }
        });
      });
      resizeObserver.observe(ref.current);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      const calculatedHeight = ref.current.getBoundingClientRect().height;
      setMinWidth(calculatedHeight);
    }
  }, [minWidth]);
}

export default useResizeObserver;
