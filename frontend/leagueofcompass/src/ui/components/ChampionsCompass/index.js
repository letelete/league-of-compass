import React, { useEffect, useState } from 'react';

import ChampionsCompassItem from './ChampionsCompassItem';
import ChampionsCompassTitle from './ChampionsCompassTitle';
import Compass from '../../components/Compass';
import CompassAxisesCross from '../Compass/CompassAxisesCross';
import CompassItems from '../Compass/CompassItems';
import CompassWithTitles from '../CompassWithTitles';
import Zoomable from '../Zoomable';
import sleep from '../../../helpers/sleep';
import usePanZoom from '../../hooks/usePanZoom';

const ChampionsCompass = ({ champions }) => {
  const [items, setItems] = useState([]);
  const [panZoomRef, panZoomInstance] = usePanZoom({
    config: {
      maxZoom: 10,
      minZoom: 0.5,
    },
  });

  useEffect(() => {
    let hasView = true;

    const displayChampionsAsync = async () => {
      for (const champion of champions) {
        await sleep(0).then(() => {
          if (!hasView) return;
          setItems((items) => [
            ...items,
            <ChampionsCompassItem key={champion.name} {...champion} />,
          ]);
        });
      }
    };

    displayChampionsAsync();

    return () => {
      hasView = false;
    };
  }, [champions]);

  return (
    <Zoomable panZoomRef={panZoomRef}>
      <CompassWithTitles
        left={<ChampionsCompassTitle label={'Boring'} />}
        top={<ChampionsCompassTitle label={'Difficult'} />}
        right={<ChampionsCompassTitle label={'Interesting'} />}
        bottom={<ChampionsCompassTitle label={'Easy'} />}
      >
        <Compass>
          <CompassAxisesCross />
          <CompassItems items={items} />
        </Compass>
      </CompassWithTitles>
    </Zoomable>
  );
};

export default ChampionsCompass;
