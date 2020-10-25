import ChampionsCompassItem from './ChampionsCompassItem';
import ChampionsCompassTitle from './ChampionsCompassTitle';
import Compass from '../../components/Compass';
import CompassAxisesCross from '../Compass/CompassAxisesCross';
import CompassItems from '../Compass/CompassItems';
import CompassWithTitles from '../CompassWithTitles';
import React from 'react';
import Zoomable from '../Zoomable';
import usePanZoom from '../../hooks/usePanZoom';

const ChampionsCompass = ({ ratings }) => {
  const panZoomRef = usePanZoom({
    config: {
      maxZoom: 10,
      minZoom: 0.5,
      initialX: window.innerWidth / 2,
      initialY: window.innerHeight / 2,
      initialZoom: 0.9,
    },
  });

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
          <CompassItems
            items={ratings.map((entry) => (
              <ChampionsCompassItem key={entry.champion.id} {...entry} />
            ))}
          />
        </Compass>
      </CompassWithTitles>
    </Zoomable>
  );
};

export default ChampionsCompass;
