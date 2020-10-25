import React, { useEffect, useState } from 'react';

import ChampionCompassItem from './ChampionCompassItem';
import Compass from '../../components/Compass';
import sleep from '../../../helpers/sleep';
import usePanZoom from '../../hooks/usePanZoom';

const ChampionsCompass = ({ champions }) => {
  const panZoomRef = usePanZoom();
  const [items, setItems] = useState(() => []);

  useEffect(() => {
    (async () => {
      const sortedChamps = champions
        .sort((a, b) => {
          const distanceFromCenter = ({ x, y }) => {
            const centerPercentage = 50;
            return Math.hypot(x - centerPercentage, y - centerPercentage);
          };
          return distanceFromCenter(a) < distanceFromCenter(b) ? -1 : 1;
        })
        .map((champ) => (
          <ChampionCompassItem
            key={champ.name}
            x={champ.x}
            y={champ.y}
            image={`https://www.mobafire.com/images/avatars/${champ.name}-classic.png`}
          />
        ));
      for (const champ of sortedChamps) {
        setItems((items) => [...items, champ]);
        await sleep(0);
      }
    })();
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
        <Compass
          labelLeft={<div>Boring</div>}
          labelTop={<div>Difficult mechanics</div>}
          labelRight={<div>Interesting</div>}
          labelBottom={<div>No mechanics</div>}
        >
          {items}
        </Compass>
      </div>
    </div>
  );
};

export default ChampionsCompass;
