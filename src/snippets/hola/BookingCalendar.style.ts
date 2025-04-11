import {Dimensions, Platform, StyleSheet} from 'react-native';
import theme, {rem} from 'presentation/static/theme';

const {colors, space, text} = theme;

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
  },
  headerShadow: {
    overflow: 'hidden',
    marginTop: space.s,
    marginBottom: space.xs,
    paddingBottom: space.xs,
  },
  header: {
    backgroundColor: colors.text,
    flexDirection: 'row',
    paddingHorizontal: space.s,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  headerDateContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: space.s,
    borderBottomWidth: 2,
    borderBottomColor: colors.text,
  },
  headerDateContainerActive: {
    borderBottomColor: colors.secondary,
  },
  headerDate: {
    ...text.openBold,
    fontSize: 15 * rem,
    textTransform: 'capitalize',
  },
  headerDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: space.m,
    paddingVertical: space.s,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  headerDay: {
    ...text.openRegular,
    fontSize: 13 * rem,
  },
  calendarContainer: {
    height: Platform.OS === 'android' ? space.xl * 5 : space.xl * 6,
  },
  calendarHeader: {
    width: '100%',
    paddingVertical: space.xs,
  },
  calendarHeaderText: {
    ...text.openBold,
    fontSize: 14 * rem,
  },
  calendarDay: {
    width: space.m + space.s + space.xs,
    height: space.m + space.s + space.xs,
    borderRadius: space.l + space.s,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  calendarStartDate: {
    backgroundColor: colors.secondary,
  },
  calendarEndDate: {
    backgroundColor: colors.secondary,
  },
  calendarInRange: {
    backgroundColor: colors.secondaryAlpha,
  },
  calendarDayText: {
    ...text.openSemibold,
    fontSize: 16,
    color: colors.black,
  },
  calendarTodayText: {
    color: colors.secondary,
  },
  calendarStartDateText: {
    color: colors.text,
  },
  calendarEndDateText: {
    color: colors.text,
  },
  calendarInRangeText: {
    color: colors.black,
  },
  footer: {
    paddingTop: space.s,
    paddingHorizontal: space.s,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? space.s : space.l + space.m,
    left: -space.s,
  },
  footerShadow: {
    width: width,
    flexGrow: 0,
    flexShrink: 1,
    backgroundColor: colors.text,
    paddingHorizontal: space.s,
    paddingBottom: space.m + space.s,
    paddingTop: space.xs,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
  footerButton: {
    marginTop: 0,
    marginBottom: 0,
  },
});
