import { useEffect, useRef, useState } from 'react';

import panzoom from 'panzoom';

const usePanZoom = ({ config, onInit } = {}) => {
  const ref = useRef(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    if (!instance) {
      const panZoomInstance = panzoom(ref.current, { ...config });
      setInstance(panZoomInstance);
      if (onInit) onInit(panZoomInstance);
    }
    return () => {
      if (instance) {
        instance.dispose();
      }
    };
  }, [instance]);

  return [ref, instance];
};

export default usePanZoom;
