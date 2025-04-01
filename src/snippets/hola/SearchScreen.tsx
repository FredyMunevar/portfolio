import React, {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Gradient from 'presentation/components/gradient/Gradient';
import Header from 'presentation/components/header/Header';
import SearchScreenBanner from './components/searchScreenBanner/SearchScreenBanner';
import SearchScreenCalendar from './components/searchScreenCalendar/SearchScreenCalendar';
import {useTranslation} from 'react-i18next';
import Search from 'presentation/components/search/Search';
import BookingCalendar from 'presentation/components/bookingCalendar/BookingCalendar';
import {PresentationHelper} from 'domain/helpers/PresentationHelper';
import BookingHours from 'presentation/components/bookingHours/BookingHours';
import {LocationModel} from 'domain/location/entities/locationModel';
import LocationContainer from './components/locationContainer/LocationContainer';
import Button from 'presentation/components/button/Button';
import {styles} from './SearchScreen.styles';
import {useQuickSearch} from 'shared/hooks/useQuickSearch';
import GoogleReviews from './components/googleReviews/GoogleReviews';
import LanguageSelector from 'presentation/components/languageSelector/LanguageSelector';
import AnimatedContainer from 'presentation/components/animatedContainer/AnimatedContainer';
import {useAnimationContext} from 'shared/commons/AnimatedContainerContext';
import {useHandleSheetAnimate} from 'shared/commons/handleSheetAnimate';
import {useLocalization} from 'shared/hooks/architecture/useLocalization';
import HolaAnimation from 'shared/commons/HolaAnimation';

/**
 * SearchScreen component that displays the search screen with a header, banner, form, and list of cities.
 */
const SearchScreen = ({navigation}: {navigation: any}) => {
  useLocalization();
  const {t} = useTranslation();

  /** Animated shared values */
  const {
    isSheetOpen,
    scale,
    searchSheetModalRef,
    bookingCalendarSheetModalRef,
    bookingHoursSheetModalRef,
    languageSheetModalRef,
    handlePresentSearchSheet,
    handlePresentBookingCalendarSheet,
    handlePresentBookingHoursSheet,
    handlePresentLanguageSheet,
  } = useAnimationContext();

  const [searchType, setSearchType] = useState(
    'pickup' as 'pickup' | 'dropoff',
  );
  const [differentDropOff, setDifferentDropOff] = useState(false);

  const {
    quickSearchData,
    setPickupLocation,
    setDropoffLocation,
    setPickupDate,
    setDropoffDate,
    setPickupTime,
    setDropoffTime,
  } = useQuickSearch();

  const {
    pickupLocation,
    dropoffLocation,
    pickUpDate,
    dropOffDate,
    pickUpTime,
    dropOffTime,
  } = quickSearchData;

  const handleSearchTitle = () => {
    return searchType === 'pickup'
      ? t('bookingForm.pickUpLocation')
      : t('bookingForm.dropOffLocation');
  };

  const handleItemSelected = (item: LocationModel) => {
    const locationInfo = {
      name: item.name,
      code: item.code,
      locationType: item.locationType,
    };

    if (searchType === 'pickup') {
      setPickupLocation(locationInfo);
    } else {
      setDropoffLocation(locationInfo);
    }
  };

  return (
    <>
      <AnimatedContainer isSheetOpen={isSheetOpen} scale={scale}>
        <HolaAnimation
          style={styles.container}
          entering={'FadeInUp'}
          exiting={'FadeOutDown'}>
          <Gradient>
            <SafeAreaView style={styles.contentContainer}>
              <Header onLanguagePress={handlePresentLanguageSheet} />
              <SearchScreenBanner />
              <LocationContainer
                handlePresentSearchSheet={handlePresentSearchSheet}
                setPickUpLocation={() => setSearchType('pickup')}
                pickUpLocation={pickupLocation?.name}
                setDropOffLocation={() => setSearchType('dropoff')}
                dropOffLocation={dropoffLocation?.name}
                differentDropOff={differentDropOff}
                setDifferentDropOff={setDifferentDropOff}
              />
              <SearchScreenCalendar
                handlePresentBookingCalendarSheet={
                  handlePresentBookingCalendarSheet
                }
                handlePresentBookingHoursSheet={handlePresentBookingHoursSheet}
                pickUpDate={PresentationHelper.formatDate(pickUpDate)}
                dropOffDate={PresentationHelper.formatDate(dropOffDate)}
                pickUpTime={pickUpTime}
                dropOffTime={dropOffTime}
              />
              <View style={styles.buttonContainer}>
                <Button
                  upperCase
                  onPress={() => {
                    if (!pickupLocation) {
                      handlePresentSearchSheet();
                      return;
                    }

                    navigation.navigate('AvailabilityScreen', {
                      pickupLocation,
                      dropoffLocation,
                      pickUpDate,
                      dropOffDate,
                      pickUpTime,
                      dropOffTime,
                    });
                  }}
                  text={t('bookingForm.bookingButton')}
                />
              </View>
              <GoogleReviews />
            </SafeAreaView>
            <LanguageSelector
              bottomSheetModalRef={languageSheetModalRef}
              onSheetAnimate={useHandleSheetAnimate({isSheetOpen, scale})}
            />
            <Search
              bottomSheetModalRef={searchSheetModalRef}
              onSheetAnimate={useHandleSheetAnimate({isSheetOpen, scale})}
              title={handleSearchTitle()}
              onItemSelected={handleItemSelected}
            />
            <BookingCalendar
              bottomSheetModalRef={bookingCalendarSheetModalRef}
              onSheetAnimate={useHandleSheetAnimate({isSheetOpen, scale})}
              onPickUpDateSelected={setPickupDate}
              onDropOffSelected={setDropoffDate}
              pickUpDate={pickUpDate}
              dropOffDate={dropOffDate}
            />
            <BookingHours
              bottomSheetModalRef={bookingHoursSheetModalRef}
              onSheetAnimate={useHandleSheetAnimate({isSheetOpen, scale})}
              dropOffTime={dropOffTime}
              setDropOffTime={value => setDropoffTime(value)}
              pickUpTime={pickUpTime}
              setPickUpTime={value => setPickupTime(value)}
            />
          </Gradient>
        </HolaAnimation>
      </AnimatedContainer>
    </>
  );
};

export default React.memo(SearchScreen);
