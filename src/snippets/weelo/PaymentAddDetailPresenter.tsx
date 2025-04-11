import React from 'react';
import PaymentAddDetail from '../components/PaymentAddDetail/PaymentAddDetail';
import useAddPaymentMethod from '../../application/hooks/useAddPaymentMethod';
import {StackScreenProps} from '@react-navigation/stack';
import {CollectPayStackParamList} from '../navigation/CollectPayStack';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {TabStackParamList} from '!/core/navigation/PrivateStack';
import {CollectPayErrorsCode} from '!/payment/domain/constants/collect-pay-errors';
import {Formik} from 'formik';
import {useToastContext} from '!/core/hooks';

type CollectScreenProps = CompositeScreenProps<
  StackScreenProps<CollectPayStackParamList, 'PaymentAddDetail'>,
  BottomTabScreenProps<TabStackParamList>
>;

type Props = CollectScreenProps;

export type PaymentAddDetailForm = {
  makeDefault: string;
  nickName: string;
};

function PaymentAddDetailPresenter({navigation, route}: Props) {
  const {exchangeToken, braintreeInfo} = route.params;
  const {openToast} = useToastContext();
  const {
    mutate: addPaymentMethod,
    isLoading,
    isSuccess,
    error,
  } = useAddPaymentMethod();

  const onHandleGoBack = () => {
    navigation.goBack();
  };

  const onHandleSubmit = (data: PaymentAddDetailForm) => {
    if (braintreeInfo != null && braintreeInfo.nonce != null) {
      addPaymentMethod({
        Nonce: braintreeInfo.nonce,
        NickName: data.nickName,
        MakeDefault: data.makeDefault === 'yes',
        LastFourCardNumber:
          braintreeInfo.creditCardData?.creditCardNumber.substring(
            braintreeInfo.creditCardData?.creditCardNumber.length - 4,
            braintreeInfo.creditCardData?.creditCardNumber.length,
          ) || '',
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isSuccess) {
        navigation.navigate('Dashboard', {
          currentSection: 3,
        });
        openToast({
          message1: 'Payment method added correctly',
          message2: '',
          isError: false,
        });
      } else if (
        error != null &&
        !isSuccess &&
        CollectPayErrorsCode.PAYMENT_ALREADY_RELATED
      ) {
        openToast({
          message1: 'Payment method already in use',
          message2: 'Try adding another credit card or virtual wallet.',
          isError: true,
        });
      } else if (error != null && !isSuccess) {
        openToast({
          message1: 'An unexpected error occurred',
          message2: 'Try again.',
          isError: true,
        });
      }
    }, [error, isSuccess, navigation, openToast]),
  );

  return (
    <Formik
      initialValues={{
        makeDefault: 'yes',
        nickName: '',
      }}
      onSubmit={onHandleSubmit}>
      <PaymentAddDetail
        isLoading={isLoading}
        onHandleGoBack={onHandleGoBack}
        exchangeToken={exchangeToken}
        braintreeInfo={braintreeInfo}
      />
    </Formik>
  );
}

export default PaymentAddDetailPresenter;
