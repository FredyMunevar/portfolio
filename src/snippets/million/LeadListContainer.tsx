import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';

import {RootStackParamList} from 'presentation/navigation/interfaces';
import List from 'presentation/page/LeadList/components/List';
import {useGetLeads} from 'presentation/hooks/leadList/useGetLeads';
import useNavToLeadDetail from 'presentation/hooks/leadList/useNavToLeadDetail';
import {leadDetailHandler} from 'presentation/helpers/leadDetailHandler';
import useRedirectToLeadDetail from 'presentation/hooks/leadList/useRedirectToLeadDetail';
import {useAppSelector} from 'presentation/hooks/redux';
import {leadListSelector} from 'presentation/redux/lead/list/selectors';
import LoadingLeadList from 'presentation/components/Loaders/LoadingLeadList';
import useLoadingToast from 'presentation/hooks/leadList/useLoadingToast';
import {filtersSelector} from 'presentation/redux/lead/filters/selectors';
import {useRefreshOnStateChange} from 'presentation/hooks/useRefreshOnStateChange';
import {useListenStatusChange} from 'presentation/hooks/realTime/useListenStatusChange';
import {leadListRefresh} from 'presentation/redux/lead/list/reducers';
import {callSelector} from 'presentation/redux/event/call/selectors';
import {useHandleNewLead} from 'presentation/hooks/realTime/useHandleNewLead';
import {useRefreshLeads} from 'presentation/hooks/leadList/useRefreshLeads';
import EventCallContainer from 'presentation/components/LeadDetail/Container/EventCallContainer';
import {closeModalShowing} from 'presentation/redux/general/modal/reducers';

import EventMessageContainer from 'presentation/components/LeadDetail/Container/EventMessageContainer';
import {modalSelector} from 'presentation/redux/general/modal/selectors';
import {
  EventsContainerContext,
  ILeadSelectedToCall,
  ILeadSelectedToMessage,
} from './components/LeadListContext';
import FilterModalContainer from './components/FilterModalContainer';

import styles from './LeadListContainer.style';
import useRefreshPipeline from 'presentation/hooks/leadList/useRefreshPipeline';
import useDaysSinceLeadAccepted from 'presentation/hooks/detail/useDaysSinceLeadAccepted';
import {leadInfoSelector} from 'presentation/redux/lead/detail/selectors';

export type Props = NativeStackScreenProps<
  RootStackParamList,
  'LeadListContainer'
>;

const LeadListContainer = ({navigation, route}: Props) => {
  const linkIdLead = route?.params?.linkIdLead;

  const dispatch = useDispatch();

  const {
    isFavorite,
    pageNumber,
    pipelineFilters,
    searchParams,
    vipFilters,
    refreshPipeline,
  } = useAppSelector(filtersSelector);

  const {leadDetailRedirect, loadingLeads, loadingPipeline, refresh} =
    useAppSelector(leadListSelector);

  const {idCall} = useAppSelector(callSelector);

  const {showCarrierListMessage} = useAppSelector(modalSelector);

  const {dateAccepted} = useAppSelector(leadInfoSelector);

  const commonParams = useMemo(
    () => ({
      isFavorite,
      pipelineFilters,
      searchParams,
      vipFilters,
    }),
    [isFavorite, pipelineFilters, searchParams, vipFilters],
  );

  useRefreshOnStateChange(idCall, () => dispatch(leadListRefresh(true)));

  useListenStatusChange(navigation);

  useHandleNewLead();

  useGetLeads({
    ...commonParams,
    pageNumber,
  });

  useNavToLeadDetail(
    navigation,
    linkIdLead,
    leadDetailHandler(navigation, dispatch),
  );

  useRedirectToLeadDetail(navigation, leadDetailRedirect);

  useLoadingToast(loadingLeads);

  useRefreshLeads({
    ...commonParams,
    refresh,
  });
  useRefreshPipeline({...commonParams, refreshPipeline});

  const daysSinceLeadAccepted = useDaysSinceLeadAccepted(dateAccepted) ?? 0;

  const isLeadRecentlyAccepted = (days: number): boolean => days < 7;

  // This is necessary to control the mount and unmount of the event call container
  const [startCallEvent, setStartCallEvent] = useState(false);

  const [selectedLeadToCall, setSelectedLeadToCall] =
    useState<ILeadSelectedToCall>({
      phones: [],
      mainPhone: undefined,
      hasPendingCall: false,
      id: 0,
      country: undefined,
      mainEmail: undefined,
      emails: [],
      vipStars: undefined,
      name: undefined,
      proyectName: null,
    });

  const [selectedLeadToMessage, setSelectedLeadToMessage] =
    useState<ILeadSelectedToMessage>({
      mainPhone: undefined,
      hasPendingMessages: false,
      id: 0,
      idEstate: 0,
      country: undefined,
      language: 'en',
    });

  /**
   * Clear option model in Call options
   */
  const handlerClearAction = () => {
    setStartCallEvent(false);
    dispatch(closeModalShowing());
  };

  const contextValue = useMemo(
    () => ({
      setSelectedLeadToCall,
      setStartCallEvent,
      setSelectedLeadToMessage,
    }),
    [],
  );

  if (loadingLeads || loadingPipeline) {
    return <LoadingLeadList />;
  }

  return (
    <View style={styles.containerLeads}>
      <EventsContainerContext.Provider value={contextValue}>
        {startCallEvent && (
          <EventCallContainer
            leadId={selectedLeadToCall.id}
            mainPhone={selectedLeadToCall.mainPhone}
            clearAction={handlerClearAction}
            phoneNumbers={selectedLeadToCall.phones}
            country={selectedLeadToCall.country}
            mainEmail={selectedLeadToCall.mainEmail}
            emails={selectedLeadToCall.emails}
            vipStars={selectedLeadToCall.vipStars}
            name={selectedLeadToCall.name}
            projectName={selectedLeadToCall.proyectName}
            isLeadRecentlyAccepted={isLeadRecentlyAccepted(
              daysSinceLeadAccepted,
            )}
          />
        )}
        {showCarrierListMessage && (
          <EventMessageContainer
            idLead={selectedLeadToMessage.id}
            idEstate={selectedLeadToMessage.idEstate}
            hasPendingMessages={selectedLeadToMessage.hasPendingMessages}
            mainPhone={selectedLeadToMessage.mainPhone}
            cleanUp={() => dispatch(closeModalShowing())}
            country={selectedLeadToMessage.country}
            language={selectedLeadToMessage.language}
          />
        )}
        <FilterModalContainer />
        <List />
      </EventsContainerContext.Provider>
    </View>
  );
};

export default LeadListContainer;
