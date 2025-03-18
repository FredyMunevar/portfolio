/**
 * @description View used to show current user bank list
 */
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './PaymentAddDetail.styles';
import {WeeloTitleBarPresenter} from '../../../../shared/presentation/presenters/WeeloTitleBarPresenter';
import colors from '../../../../shared/presentation/styles/tokens/_colors';
import FadeIn from '../../../../shared/assets/animations/FadeIn/FadeIn';
import typography from '../../../../shared/presentation/styles/tokens/_typography';
import WeeloButton from '../../../../shared/presentation/components/Buttons/WeeloButton';
import WeeloSquareIcon from '../../../../shared/presentation/components/SquareIcon/WeeloSquareIcon';
import WeeloSwitch from '../../../../shared/presentation/components/Switch/WeeloSwitch';
import {
  IBraintreeIntegration,
  IExchangePublicTokenResponse,
} from '../../../domain';
import LoadingOverlay from '../../../../shared/presentation/components/LoadingOverlay/LoadingOverlay';
import {useFormikContext} from 'formik';
import {PaymentAddDetailForm} from '../../presenters/PaymentAddDetailPresenter';
import BrandCreditCard from '../../../../shared/presentation/components/BrandCreditCard/BrandCreditCard';
import WeeloNameInput from '!/shared/presentation/components/Inputs/WeeloNameInput';

function getPaymentTypeMethod(braintreeInfo: IBraintreeIntegration): string {
  switch (braintreeInfo.transactionType) {
    case 'applePay':
      return 'Apple Pay';
    case 'creditCard':
      return 'Credit Card';
    case 'googlePay':
      return 'Google Pay';
    case 'paypal':
      return 'Paypal';
    case 'venmo':
      return 'Venmo';
  }
}
function PaymentAddDetail({
  isLoading,
  onHandleGoBack,
  exchangeToken,
  braintreeInfo,
}: {
  isLoading: boolean;
  onHandleGoBack: () => void;
  exchangeToken?: IExchangePublicTokenResponse;
  braintreeInfo?: IBraintreeIntegration;
}) {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    errors,
    touched,
  } = useFormikContext<PaymentAddDetailForm>();
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.$white} />
      <FadeIn style={styles.contentContainer}>
        <WeeloTitleBarPresenter back onPress={onHandleGoBack} />
      </FadeIn>
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior="position"
        keyboardVerticalOffset={-250}>
        <ScrollView keyboardDismissMode="on-drag">
          <FadeIn>
            <Text style={[typography.h2, styles.title]}>payment method</Text>
          </FadeIn>
          <FadeIn delay={200} style={[styles.bank, styles.bankAlignment]}>
            <View style={styles.bankAlignment}>
              {exchangeToken != null && (
                <View style={styles.bankImageContainer}>
                  <Image
                    style={styles.bankImage}
                    source={{
                      uri: `data:image/png;base64,${exchangeToken.MethodIcon}`,
                    }}
                  />
                  <WeeloSquareIcon
                    color={colors.$borderLight}
                    style={styles.bankIcon}
                  />
                </View>
              )}
              {braintreeInfo != null && (
                <BrandCreditCard
                  creditCardNumber={
                    braintreeInfo?.creditCardData?.creditCardNumber
                  }
                  payMethod={braintreeInfo?.transactionType}
                />
              )}
              {exchangeToken != null && (
                <Text style={styles.bankName}>{exchangeToken.MethodName}</Text>
              )}
              {braintreeInfo != null && (
                <Text style={styles.bankName}>
                  {getPaymentTypeMethod(braintreeInfo)}
                </Text>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              // onPress={() => navigation.navigate(listData.bankAdd)}
            >
              {/*<WeeloIcon name="state-due" style={styles.bankClose} />*/}
            </TouchableOpacity>
          </FadeIn>
          <FadeIn delay={400}>
            <WeeloNameInput
              label="nickname"
              error={
                errors.nickName &&
                touched.nickName && {message: errors.nickName}
              }
              isDirty={touched.nickName}
              inputProps={{
                value: values.nickName,
                onChangeText: handleChange('nickName'),
                onBlur: handleBlur('nickName'),
                autoFocus: true,
              }}
            />
          </FadeIn>
          <FadeIn
            delay={600}
            style={[styles.switchContainer, styles.bankAlignment]}>
            <Text style={styles.switchTitle}>set as default account</Text>
            <View style={styles.switchContent}>
              <WeeloSwitch
                onChange={handleChange('makeDefault')}
                option1={'no'}
                option2={'yes'}
                value={values.makeDefault}
              />
            </View>
          </FadeIn>
          <FadeIn delay={800}>
            <WeeloButton
              styleName={styles.button}
              type="solid"
              label="Add Payment Method"
              align="center"
              shortButton
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </FadeIn>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default PaymentAddDetail;
