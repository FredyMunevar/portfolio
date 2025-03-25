import colors from "presentation/static/tokens/_colors";
import spacers from "presentation/static/tokens/_spacers";
import { Dimensions, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const height = Dimensions.get("window").height;

export default EStyleSheet.create({
  animation: {
    width: "16rem",
    height: "16rem",
  },
  contentAnimation: {
    paddingVertical: spacers.$s,
    paddingHorizontal: spacers.$m,
    borderRadius: spacers.$l,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.$primary,
  },
  footer: {
    height: 70,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.$primary,
    flexGrow: 1, // check this if container doesn't fill the screen
  },
  containerLeads: {
    backgroundColor: colors.$background,
    flex: 1,
    paddingBottom: spacers.$l,
  },
  headerContainer: {
    overflow: "hidden",
  },
  animationContainer: {
    backgroundColor: colors.$alert,
    overflow: "hidden",
  },
  listContainer: {
    backgroundColor: colors.$background,
  },
  contentContainer: {
    backgroundColor: colors.$background,
    paddingBottom: spacers.$xl + spacers.$s,
  },
  noResults: {
    width: "100%",
    height: height / 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsIcon: {
    fontSize: spacers.$l + spacers.$m,
    color: colors.$textColorLightGray,
    lineHeight: Platform.OS === "android" ? spacers.$l + spacers.$m : 0,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: spacers.$m,
    color: colors.$textColor,
  },
});
