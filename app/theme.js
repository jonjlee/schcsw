import {StyleSheet, Dimensions} from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

export const palette = {
  primary1: 'hsl(192,100%,15%)',
  primary2: 'hsl(192,100%,22%)',
  primary3: 'hsl(192,100%,29%)',
  primary4: 'hsl(192,100%,36%)',
  primary5: 'hsl(192,100%,43%)',
  primary6: 'hsl(192,100%,54.75%)',
  primary7: 'hsl(192,100%,66.5%)',
  primary8: 'hsl(192,100%,78.25%)',
  primary9: 'hsl(192,100%,90%)',
  secondary1: 'hsl(19,77%,15%)',
  secondary2: 'hsl(19,77%,23.5%)',
  secondary3: 'hsl(19,77%,32%)',
  secondary4: 'hsl(19,77%,40.5%)',
  secondary5: 'hsl(19,77%,49%)',
  secondary6: 'hsl(19,77%,59.25%)',
  secondary7: 'hsl(19,77%,69.5%)',
  secondary8: 'hsl(19,77%,79.75%)',
  secondary9: 'hsl(19,77%,90%)',
  ok1: 'hsl(144,100%,15%)',
  ok2: 'hsl(144,100%,19.25%)',
  ok3: 'hsl(144,100%,23.5%)',
  ok4: 'hsl(144,100%,27.75%)',
  ok5: 'hsl(144,100%,32%)',
  ok6: 'hsl(144,100%,46.5%)',
  ok7: 'hsl(144,100%,61%)',
  ok8: 'hsl(144,100%,75.5%)',
  ok9: 'hsl(144,100%,90%)',
  warn1: 'hsl(63,71%,15%)',
  warn2: 'hsl(63,71%,29.25%)',
  warn3: 'hsl(63,71%,43.5%)',
  warn4: 'hsl(63,71%,57.75%)',
  warn5: 'hsl(63,71%,72%)',
  warn6: 'hsl(63,71%,76.5%)',
  warn7: 'hsl(63,71%,81%)',
  warn8: 'hsl(63,71%,85.5%)',
  warn9: 'hsl(63,71%,90%)',
  err1: 'hsl(0,74%,15%)',
  err2: 'hsl(0,74%,24.5%)',
  err3: 'hsl(0,74%,34%)',
  err4: 'hsl(0,74%,43.5%)',
  err5: 'hsl(0,74%,53%)',
  err6: 'hsl(0,74%,62.25%)',
  err7: 'hsl(0,74%,71.5%)',
  err8: 'hsl(0,74%,80.75%)',
  err9: 'hsl(0,74%,90%)',
  grey1: 'hsl(208,16%,15%)',
  grey2: 'hsl(208,16%,30.5%)',
  grey3: 'hsl(208,16%,46%)',
  grey4: 'hsl(208,16%,61.5%)',
  grey5: 'hsl(208,16%,77%)',
  grey6: 'hsl(208,16%,82.75%)',
  grey7: 'hsl(208,16%,88.5%)',
  grey8: 'hsl(208,16%,94.25%)',
  grey9: 'hsl(208,16%,98%)',
};

export const theme = {
  // Colors
  background: palette.grey9,
  header: palette.primary5,
  headerText: 'white',
  footer: palette.primary5,
  footerText: 'white',
  button: palette.primary5,
  text: palette.grey1,
  okBackground: palette.ok5,
  okText: palette.grey2,
  okTextColored: palette.ok4,
  warnBackground: palette.warn6,
  warnText: palette.grey2,
  errBackground: palette.err5,
  errText: 'white',
  errTextColored: palette.err5,
  tableHeaderBackground: palette.primary6,
  tableHeaderText: palette.grey1,
  divider: palette.grey5,
  
  // Padding sizes
  paddingXs: 5,
  paddingSm: 10,
  paddingMd: 20,
  paddingLg: 30,
  paddingXl: 40,

  // Font sizes
  fontSizeSm: 12,
  fontSizeMd: 16,
  fontSizeLg: 18,
  fontSizeXl: 24,
};

const baseStyles = {
  headerText: {
    marginRight: theme.paddingSm,
    color: theme.headerText,
    fontSize: theme.fontSizeMd,
  },
  container: {
    flex: 1,
    padding: theme.paddingSm,
    width: dimensions.fullWidth,
    backgroundColor: theme.background,
  },
  contentContainer: {
    flex: 1,
    padding: theme.paddingXs,
  },
  section: {
    marginTop: theme.paddingMd,
    paddingHorizontal: theme.paddingSm,
  },
  button: {
    borderRadius: 5,
    backgroundColor: theme.button,
  },
  footerButton: {
    paddingVertical: theme.paddingSm,
  }
}

export default function createStyles(overrides = {}) {
  const styles = StyleSheet.create({...baseStyles, ...overrides});
  styles.tagStyles = {
    div: { },
    h4: { marginTop: 0, paddingTop: 0, paddingBottom: theme.paddingSm, fontSize: theme.fontSizeLg },
    li: { padding: 0, margin: 0 },
  };
  styles.htmlClassStyles = {
    centered: { textAlign: 'center' }
  };
  return styles;
}