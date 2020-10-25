import React, { useEffect, useState } from 'react';

import ChampionsCompassItem from './ChampionsCompassItem';
import ChampionsCompassTitle from './ChampionsCompassTitle';
import Compass from '../../components/Compass';
import CompassAxisesCross from '../Compass/CompassAxisesCross';
import CompassItems from '../Compass/CompassItems';
import CompassWithTitles from '../CompassWithTitles';
import sleep from '../../../helpers/sleep';
import usePanZoom from '../../hooks/usePanZoom';

const ChampionsCompass = ({ champions }) => {
  const panZoomRef = usePanZoom();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let hasView = true;

    const sortedChamps = champions.sort((a, b) => {
      const distanceFromCenter = ({ x, y }) => {
        const centerPercentage = 50;
        return Math.hypot(x - centerPercentage, y - centerPercentage);
      };
      return distanceFromCenter(a) < distanceFromCenter(b) ? -1 : 1;
    });

    const displayChampionsAsync = async () => {
      for (const champ of sortedChamps) {
        await sleep(0).then(() => {
          if (!hasView) return;
          setItems((items) => [
            ...items,
            <ChampionsCompassItem key={champ.name} {...champ} />,
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
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '100px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        ref={panZoomRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: '1em',
          transition: 'transform 0.15s ease-out',
        }}
      >
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
      </div>
    </div>
  );
};

export default ChampionsCompass;
