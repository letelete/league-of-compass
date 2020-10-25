import { useEffect, useRef, useState } from 'react';

import panzoom from 'panzoom';

const usePanZoom = () => {
  const ref = useRef(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    setInstance(panzoom(ref.current));
    return () => {
      if (instance) instance.dispose();
    };
  }, [ref]);

  return ref;
};

export default usePanZoom;
