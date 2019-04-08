import {StyleSheet, Dimensions} from 'react-native';

export const palette = {
  // using vuetify-color-theme-builder
  background: '#fffcfa',  // very light brown
  primary: '#30BCED',     // blue (prev #2196f3)
  secondary: '#ff5722',   // red-orange
  accent: '#fb8c00',      // orange
  error: '#FF5252',       // red
  info: '#2196F3',        // blue
  success: '#4CAF50',     // green
  warning: '#ffecb3',     // yellow (prev #ffecb3)
  lightGray: '#eeeeee',
  medGray: '#efebe9',
  darkGray: '#757575',
  nearBlack: '#050401',
};

export const theme = {
  background: palette.background,
  header: palette.primary,
  headerText: 'white',
  footer: palette.primary,
  footerText: 'white',
  button: palette.primary,
  text: palette.nearBlack,
  warnBackground: palette.warning,
  warnText: palette.medGray,
  errBackground: palette.error,
  errText: 'white',
  tableHeaderBackground: palette.accent,
  tableHeaderText: 'black',
};

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

export const padding = {
  xs: 5,
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
};

export const fonts = {
  sm: 12,
  md: 16,
  lg: 18,
  xl: 24,
};

const baseStyles = {
  headerText: {
    marginRight: padding.sm,
    color: theme.headerText,
    fontSize: fonts.md,
  },
  container: {
    flex: 1,
    padding: padding.sm,
    width: dimensions.fullWidth,
    backgroundColor: theme.background,
  },
  contentContainer: {
    flex: 1,
    padding: padding.xs,
  },
  section: {
    marginTop: padding.md,
    paddingHorizontal: padding.sm,
  },
  button: {
    borderRadius: 5,
    backgroundColor: theme.button,
  },
  footerButton: {
    paddingVertical: padding.sm,
  }
}

export default function createStyles(overrides = {}) {
  const styles = StyleSheet.create({...baseStyles, ...overrides});
  styles.tagStyles = {
    h4: { marginTop: 0, paddingTop: 0, paddingBottom: padding.sm, fontSize: fonts.lg },
    li: { padding: 0, margin: 0 },
  }
  return styles;
}