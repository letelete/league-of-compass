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

const ChampionsCompass = ({ ratings }) => {
  const [items, setItems] = useState([]);
  const panZoomRef = usePanZoom({
    config: {
      maxZoom: 10,
      minZoom: 0.5,
      initialX: window.innerWidth / 2,
      initialY: window.innerHeight / 2,
      initialZoom: 0.9,
    },
  });

  useEffect(() => {
    let hasView = true;

    console.log('ratings', ratings.length);

    const displayChampionsAsync = async () => {
      for (const entry of ratings) {
        await sleep(0).then(() => {
          if (!hasView) return;
          setItems((items) => [
            ...items,
            <ChampionsCompassItem key={entry.champion.id} {...entry} />,
          ]);
        });
      }
    };

    displayChampionsAsync();

    return () => {
      hasView = false;
    };
  }, [ratings]);

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
