import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { getBusRoutes } from '../../common/constants/stations';
import { getBusRouteSelectionItemHref, useDelimitatedRoute } from '../../common/utils/router';
import { useStationStore } from '../../common/state/stationStore';

interface BusSelectionProps {
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BusSelection: React.FC<BusSelectionProps> = ({ setSidebarOpen }) => {
  const route = useDelimitatedRoute();
  const busRoutes = getBusRoutes();
  const setStationStore = useStationStore((state) => state.setStationStore);

  const handleChange = () => {
    setSidebarOpen && setSidebarOpen(false);
    setStationStore({ from: undefined, to: undefined });
  };

  return (
    <Tab.Group
      manual
      aria-label={'Bus Routes'}
      selectedIndex={busRoutes.findIndex((key) => key === route.query.busRoute)}
      onChange={handleChange}
    >
      <Tab.List className="relative grid grid-cols-3 gap-2">
        {busRoutes.map((key) => {
          const selected = route.query.busRoute === key;
          return (
            <Tab key={key} aria-label={key}>
              <Link
                href={getBusRouteSelectionItemHref(key, route)}
                onClick={handleChange}
                key={key}
                aria-label={key}
                className={classNames(
                  'flex w-full cursor-pointer items-center justify-center rounded-md border border-mbta-bus bg-mbta-bus px-2 py-1 text-sm font-medium',
                  selected
                    ? 'bg-opacity-90 text-white'
                    : 'fovus:bg-opacity-70 border-opacity-0 bg-opacity-50 hover:border-opacity-100 hover:bg-opacity-70 hover:text-white focus:border-opacity-100 focus:text-white'
                )}
              >
                <p title={key} className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {key}
                </p>
              </Link>
            </Tab>
          );
        })}
      </Tab.List>
    </Tab.Group>
  );
};
