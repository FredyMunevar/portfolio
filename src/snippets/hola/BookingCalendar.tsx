import React from 'react';
import {Text, View} from 'react-native';
import HolaBottomSheet from 'presentation/components/bottomSheet/HolaBottomSheet';
import {useTranslation} from 'react-i18next';
import {CalendarList} from 'react-native-calendars';
import Icon from '../icon/Icon';
import {styles} from './BookingCalendar.style';
import theme, {rem} from 'presentation/static/theme';
import Button from '../button/Button';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import {PresentationHelper} from 'domain/helpers/PresentationHelper';
import {DayProps} from 'react-native-calendars/src/calendar/day';

const {colors, space, text} = theme;

interface IBookingCalendar {
  /** Ref object for the BottomSheetModal */
  bottomSheetModalRef: React.RefObject<any>;
  /** Function to handle sheet animation changes */
  onSheetAnimate?: (fromIndex: number, toIndex: number) => void;
  pickUpDate: string;
  dropOffDate: string;
  onPickUpDateSelected: (date: string) => void;
  onDropOffSelected: (date: string) => void;
}

/**
 * BookingCalendar component that displays a calendar for selecting pick-up and drop-off dates.
 */
const BookingCalendar = ({
  bottomSheetModalRef,
  onSheetAnimate,
  pickUpDate,
  dropOffDate,
  onPickUpDateSelected,
  onDropOffSelected,
}: IBookingCalendar) => {
  /** State to manage the active selection (pickup or dropoff) */
  const [activeSelection, setActiveSelection] = React.useState<
    'pickup' | 'dropoff'
  >('pickup');

  /** Translation function from react-i18next */
  const {t, i18n} = useTranslation();

  const formattedPickUpDate = PresentationHelper.formatDate(pickUpDate);
  const formattedDropOffDate = PresentationHelper.formatDate(dropOffDate);
  const formattedDefaultDate = PresentationHelper.formatDate(
    new Date().toISOString().split('T')[0],
  );

  /**
   * Handle date selection logic.
   */
  const onDayPress = (day: {dateString: string}) => {
    const selectedDate = new Date(day.dateString);
    const newPickUpDate = new Date(pickUpDate);
    const newDropOffDate = new Date(dropOffDate);

    if (activeSelection === 'pickup') {
      // If the selected date exceeds drop-off date, update both dates.
      if (selectedDate > newDropOffDate) {
        onPickUpDateSelected(day.dateString);
        onDropOffSelected(day.dateString);
      } else {
        onPickUpDateSelected(day.dateString);
      }
      setActiveSelection('dropoff');
    }

    if (activeSelection === 'dropoff') {
      // If the selected date is before pick-up date, update both dates.
      if (selectedDate < newPickUpDate) {
        onPickUpDateSelected(day.dateString);
        onDropOffSelected(day.dateString);
      } else {
        onDropOffSelected(day.dateString);
      }
      setActiveSelection('pickup');
    }
  };

  // Generate marked dates for the range
  const getMarkedDates = () => {
    const marked: {[key: string]: any} = {};

    if (pickUpDate) {
      marked[pickUpDate] = {
        startingDay: true,
      };
    }

    if (dropOffDate) {
      marked[dropOffDate] = {
        endingDay: true,
      };

      // Highlight the range between start and end
      let currentDate = new Date(pickUpDate);
      const end = new Date(dropOffDate);

      while (currentDate < end) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateString !== pickUpDate && dateString !== dropOffDate) {
          marked[dateString] = {};
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return marked;
  };

  const renderCalendarHeader = (date: Date) => {
    return (
      <CalendarHeader
        date={date}
        locale={{
          options: PresentationHelper.getLocale(i18n.language).options,
          localize: PresentationHelper.getLocale(i18n.language).localize,
          formatLong: PresentationHelper.getLocale(i18n.language).formatLong,
        }}
      />
    );
  };

  const renderCalendarDay = (props: DayProps & {date?: any}) => {
    const {date, state} = props;
    return (
      <CalendarDay
        date={date}
        state={state}
        onDayPress={onDayPress}
        markedDates={getMarkedDates()}
      />
    );
  };

  return (
    <HolaBottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      onSheetAnimate={onSheetAnimate}>
      <View style={styles.container}>
        <View style={styles.headerShadow}>
          <View style={styles.header}>
            <View
              style={[
                styles.headerDateContainer,
                activeSelection === 'pickup' &&
                  styles.headerDateContainerActive,
              ]}>
              <Text style={styles.headerDate}>
                {formattedPickUpDate ?? formattedDefaultDate}
              </Text>
            </View>
            <Icon name={'ArrowRight'} size={space.s + space.xs} />
            <View
              style={[
                styles.headerDateContainer,
                activeSelection === 'dropoff' &&
                  styles.headerDateContainerActive,
              ]}>
              <Text style={styles.headerDate}>
                {formattedDropOffDate ?? formattedDefaultDate}
              </Text>
            </View>
          </View>
        </View>
        {/* Weekday Labels */}
        <View style={styles.headerDays}>
          {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
            <Text key={day} style={styles.headerDay}>
              {t(`bookingCalendar.calendar.days.${day}`)}
            </Text>
          ))}
        </View>
        <View style={styles.calendarContainer}>
          <CalendarList
            markingType="custom"
            hideDayNames={true}
            firstDay={1}
            pastScrollRange={0}
            futureScrollRange={12}
            scrollEnabled={true}
            showScrollIndicator={true}
            markedDates={getMarkedDates()}
            theme={{
              dayTextColor: colors.black,
              textDisabledColor: colors.placeholder,
              todayTextColor: colors.secondary,
              selectedDayTextColor: colors.text,
              textDayFontSize: 13 * rem,
              textMonthFontSize: 13 * rem,
              textDayStyle: {
                ...text.openSemibold,
                fontSize: 13 * rem,
              },
            }}
            renderHeader={renderCalendarHeader}
            dayComponent={renderCalendarDay}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.footerShadow}>
            <Button
              style={styles.footerButton}
              text={t('bookingCalendar.button.selectDates')}
              onPress={() => bottomSheetModalRef.current?.dismiss()}
            />
          </View>
        </View>
      </View>
    </HolaBottomSheet>
  );
};

export default BookingCalendar;
