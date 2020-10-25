import { useEffect, useRef } from 'react';

import panzoom from 'panzoom';

const usePanZoom = () => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = panzoom(ref.current);
    return () => {
      if (ref) ref.current.dispose();
    };
  }, [ref]);

  return ref;
};

export default usePanZoom;
