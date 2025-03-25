import React, {useCallback, useRef} from 'react';
import {SectionList, SectionListData} from 'react-native';
import {useDispatch} from 'react-redux';
import getItemLayout from 'react-native-get-item-layout-section-list';

import {GetAllLeadModel, LeadModelGrouping} from 'domain/lead/models';

import {useAppSelector} from 'presentation/hooks/redux';
import {filtersSelector} from 'presentation/redux/lead/filters/selectors';
import {
  leadListRefresh,
  loadingListMoreLeads,
} from 'presentation/redux/lead/list/reducers';
import {leadListSelector} from 'presentation/redux/lead/list/selectors';
import {leadListPageNumber} from 'presentation/redux/lead/filters/reducers';
import LeadListNoResults from 'presentation/components/LeadListComponent/LeadListNoResults';

import SectionHeader from './SectionHeader';
import LeadItemContainer from './LeadItem/LeadItemContainer';
import LeadListHeaderContainer from 'presentation/components/LeadListComponent/LeadListHeaderContainer';
import Animated, {useSharedValue} from 'react-native-reanimated';
import useMillionAnimation from 'presentation/page/LeadDetail/useMillionAnimation';
import styles from './../LeadListContainer.style';
import useScrollToLocation from 'presentation/hooks/leadList/useScrollToLocation';
import {
  SCROLL_SAFE_AREA,
  MIN_REQUIRED_CONTENT_HEIGHT,
  MIN_HEADER_HEIGHT,
  MAX_HEADER_HEIGHT,
} from '../constants/ListScrollAnimationValues';
import ListFooter from './ListFooter';

/**
 * This component is responsible for rendering a scrollable and paginated section list of leads.
 * It provides lazy loading, refresh control, and header visibility animations based on the scroll behavior.
 * The component uses React Native's `SectionList` and integrates Redux for state management.
 */
const List = () => {
  const dispatch = useDispatch();

  const {leadsData, totalPages, loadingMoreLeads, refresh, totalLeads} =
    useAppSelector(leadListSelector);
  const {pageNumber} = useAppSelector(filtersSelector);

  let scrollPosition = useSharedValue(0);

  const LAST_SCROLL_Y = useRef(0);

  const sectionListRef = useScrollToLocation({
    leadsData,
  });

  /**
   * State to manage the removal of clipped subviews.
   *
   * `removeClippedSubviews` - A boolean state that determines whether off-screen subviews should be removed to improve performance.
   * `setRemoveClippedSubviews` - A function to update the `removeClippedSubviews` state.
   */
  const [removeClippedSubviews, setRemoveClippedSubviews] =
    React.useState(false);

  const renderItem = useCallback(
    ({
      item,
      index: leadIndex,
      section,
    }: {
      item: GetAllLeadModel;
      index: number;
      section: SectionListData<GetAllLeadModel, LeadModelGrouping>;
    }) => (
      <LeadItemContainer
        {...item}
        itemIndex={leadIndex}
        sectionDate={section.date}
      />
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({
      section,
    }: {
      section: SectionListData<GetAllLeadModel, LeadModelGrouping>;
    }) =>
      section.date === '' ? null : (
        <SectionHeader date={section.date} totalLeads={section.totalLeads} />
      ),
    [],
  );

  const keyExtractor = useCallback(
    (item: GetAllLeadModel) => String(item.Id),
    [],
  );

  /**
   * This function is triggered when the user scrolls to the end of the list. It loads more leads by dispatching actions to update
   * the page number and toggle the loading state.
   */
  const handleEndReached = () => {
    let newPage = pageNumber + 1;
    if (newPage <= totalPages && !loadingMoreLeads) {
      dispatch(loadingListMoreLeads(true));
      dispatch(leadListPageNumber(newPage));
    }
  };

  /**
   * This function is triggered when the user pulls to refresh the list. It refreshes the list by dispatching actions to reset the
   * page number and toggle the refresh state.
   */
  const handleRefresh = () => {
    dispatch(leadListRefresh(true));
    dispatch(leadListPageNumber(1));
  };

  /**
   * This function optimizes the performance of the list by pre-calculating the height of each item and section header.
   * It helps improve scrolling performance by allowing React Native to skip recalculating item layouts on the fly.
   */
  const buildGetItemLayout: any = getItemLayout({
    getItemHeight: 150, // Height of each lead item
    getSectionHeaderHeight: 40, // Height of each section header
  });

  /**
   * scrollHandler
   *
   * This function adjusts the header visibility based on the user's scroll direction. It hides the header
   * when the user scrolls down past the safe area and shows the header when the user scrolls up.
   *
   * - **Scroll Down**: When scrolling **down** past the `SCROLL_SAFE_AREA` (150 units), the header is gradually hidden.
   * - **Scroll Up**: When scrolling **up** within the threshold, the header is gradually shown.
   * - **Safe Conditions**: Ensures that the content height is greater than `MIN_REQUIRED_CONTENT_HEIGHT` (900 units)
   *   to prevent unexpected behavior.
   *
   * @constant {number} SCROLL_SAFE_AREA - The safe area (150 units) after which the header starts hiding when scrolling down.
   * @constant {number} MIN_REQUIRED_CONTENT_HEIGHT - Minimum height of content (900 units) required to trigger header animations.
   * @constant {number} MIN_HEADER_HEIGHT - Minimum height of the header (0 units).
   * @constant {number} MAX_HEADER_HEIGHT - Maximum height of the header (114.7 units).
   * @constant {function} scrollHandler - The scroll handler function that activates during scroll events.
   *
   * @param {object} event - The scroll event containing content offset, content size, and viewport height details.
   * @param {object} event.nativeEvent - The native event object.
   * @param {object} event.nativeEvent.contentOffset - The content offset object.
   * @param {number} event.nativeEvent.contentOffset.y - The y-offset of the content.
   * @param {object} event.nativeEvent.contentSize - The content size object.
   * @param {number} event.nativeEvent.contentSize.height - The height of the content.
   * @param {object} event.nativeEvent.layoutMeasurement - The layout measurement object.
   * @param {number} event.nativeEvent.layoutMeasurement.height - The height of the viewport.
   */
  const scrollHandler = (event: {
    nativeEvent: {
      contentOffset: {y: number};
      contentSize: {height: number};
      layoutMeasurement: {height: number};
    };
  }): void => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const viewportHeight = event.nativeEvent.layoutMeasurement.height;
    const threshold = contentHeight - viewportHeight - SCROLL_SAFE_AREA;

    // Ensure safe conditions to prevent unexpected behavior
    if (contentHeight <= MIN_REQUIRED_CONTENT_HEIGHT) {
      return;
    }

    // Calculate the target position based on scroll
    let targetPosition = scrollPosition.value;

    if (
      currentScrollY > LAST_SCROLL_Y.current &&
      currentScrollY > SCROLL_SAFE_AREA
    ) {
      // Scrolling down: Gradually close the header
      targetPosition = Math.min(
        MAX_HEADER_HEIGHT,
        scrollPosition.value + (currentScrollY - LAST_SCROLL_Y.current),
      );
    } else if (
      currentScrollY < LAST_SCROLL_Y.current &&
      currentScrollY < threshold
    ) {
      // Scrolling up: Gradually open the header
      targetPosition = Math.max(
        MIN_HEADER_HEIGHT,
        scrollPosition.value - (LAST_SCROLL_Y.current - currentScrollY),
      );
    }

    // Update the animation value directly
    scrollPosition.value = targetPosition;

    // Update the last scroll position
    LAST_SCROLL_Y.current = currentScrollY;
  };

  /**
   * This function animates the height of the header based on the scroll position.
   * It uses the `useMillionAnimation` hook to smoothly transition between the maximum and minimum header heights.
   */
  const headerHeight = useMillionAnimation(
    scrollPosition,
    ['height'], // Property to animate
    [MIN_HEADER_HEIGHT, MAX_HEADER_HEIGHT], // Range of values for the height
    [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT], // Target height values
  );

  /**
   * This function handles the removal of clipped subviews based on the scroll position.
   * It toggles the `removeClippedSubviews` state to improve performance by removing off-screen subviews.
   */
  const removeClippedSubviewsHandler = (event: {
    nativeEvent: {
      contentOffset: {y: number};
    };
  }): void => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY === 0 && removeClippedSubviews) {
      setRemoveClippedSubviews(false);
    } else if (currentScrollY > 0 && !removeClippedSubviews) {
      setRemoveClippedSubviews(true);
    }
  };

  return (
    <>
      <Animated.View style={[styles.headerContainer, headerHeight]}>
        <LeadListHeaderContainer />
      </Animated.View>
      <SectionList
        getItemLayout={buildGetItemLayout}
        initialNumToRender={10}
        keyExtractor={keyExtractor}
        ListEmptyComponent={LeadListNoResults || []}
        maxToRenderPerBatch={50}
        onEndReached={handleEndReached}
        onRefresh={handleRefresh}
        onScroll={e => {
          scrollHandler(e);
          removeClippedSubviewsHandler(e);
        }}
        ref={sectionListRef}
        refreshing={refresh}
        removeClippedSubviews={removeClippedSubviews}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        scrollsToTop
        sections={leadsData || []}
        testID="section-list"
        updateCellsBatchingPeriod={1000}
        windowSize={10}
        ListFooterComponent={
          <ListFooter
            leadsData={leadsData || []}
            totalLeads={totalLeads || 0}
          />
        }
      />
    </>
  );
};

export default List;
