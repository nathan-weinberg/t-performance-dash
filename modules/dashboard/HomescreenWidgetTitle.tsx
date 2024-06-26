import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  useDelimitatedRoute,
  useGenerateHref,
  useHandleConfigStore,
} from '../../common/utils/router';
import { LINE_COLORS } from '../../common/constants/colors';
import type { Page } from '../../common/constants/pages';
import { ALL_PAGES } from '../../common/constants/pages';
import { getSelectedDates } from '../../common/state/utils/dateStoreUtils';
import { mbtaTextConfig } from '../../common/styles/general';

interface HomescreenWidgetTitle {
  title: string;
  tab: Page;
}
export const HomescreenWidgetTitle: React.FC<HomescreenWidgetTitle> = ({ title, tab }) => {
  const { line, page, query, linePath } = useDelimitatedRoute();
  const handlePageConfig = useHandleConfigStore();
  const generateHref = useGenerateHref();
  const href = generateHref(ALL_PAGES[tab], page, query, linePath);
  const date = getSelectedDates({
    startDate: query.startDate,
    endDate: query.endDate,
    view: query.view,
  });
  return (
    <div className="flex w-full items-baseline justify-between">
      <Link onClick={() => handlePageConfig(ALL_PAGES[tab])} href={href}>
        <div className="flex w-full cursor-pointer flex-row items-center text-xl">
          <h3
            className={classNames(
              'font-semibold',
              line ? mbtaTextConfig[line] : 'text-design-subtitleGrey'
            )}
          >
            {title}
          </h3>
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ color: LINE_COLORS[line ?? 'default'] }}
            className="h-4 w-auto pl-2"
          />
        </div>
      </Link>
      <p className="text-xs italic text-stone-700">{date}</p>
    </div>
  );
};
