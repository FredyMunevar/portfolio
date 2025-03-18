import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../../shared/presentation/styles/tokens/_colors';
import spacers from '../../../../shared/presentation/styles/tokens/_spacers';
import fonts from '../../../../shared/presentation/styles/tokens/_fonts';

const styles = EStyleSheet.create({
  ...fonts,
  ...colors,
  ...spacers,
  container: {
    flex: 1,
    backgroundColor: colors.$white,
  },
  contentContainer: {
    paddingHorizontal: spacers.$s,
  },
  title: {
    marginTop: spacers.$xs,
  },
  bank: {
    marginVertical: spacers.$s + spacers.$xs,
    justifyContent: 'space-between',
    borderColor: colors.$primary,
    borderWidth: 1,
    borderRadius: '10rem',
    padding: spacers.$s,
  },
  bankAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankImageContainer: {
    width: '50rem',
    height: '50rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacers.$s,
  },
  bankImage: {
    width: '70%',
    height: '70%',
    position: 'absolute',
  },
  bankIcon: {
    width: '100%',
    height: '100%',
  },
  bankName: {
    color: colors.$textColor,
    fontSize: '18rem',
    fontFamily: fonts.$fontBold,
  },
  bankClose: {
    fontSize: '20rem',
  },
  switchContainer: {
    justifyContent: 'space-between',
    marginTop: spacers.$xs,
  },
  switchContent: {
    width: '150rem',
  },
  switchTitle: {
    fontFamily: fonts.$fontBold,
    fontSize: '14rem',
  },
  button: {
    marginTop: spacers.$m,
    marginBottom: spacers.$s,
  },
});

export default styles;
