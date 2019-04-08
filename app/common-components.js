import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button as RNEButton, Icon, Divider } from 'react-native-elements';
import RNRenderHTML from 'react-native-render-html';
import createStyles, { theme, palette, fonts } from './theme';

const styles = createStyles();

// A button styled with our theme colors
export const Button = (props) => {
  return (
    <RNEButton
      buttonStyle={ styles.button }
      {...props} />
  );
};

// Button that navigates to a given route when clicked
class LinkButtonComponent extends Component {
  render() {
    const { target, navigation, ...rest } = this.props;
    return (
      <Button
        onPress={ () => navigation.navigate(target) }
        {...rest} />
    );
  }
};
export const LinkButton = withNavigation(LinkButtonComponent);

export const HTML = (props) => {
  const { children, ...rest } = props;
  return (
    <RNRenderHTML
      html={ children }
      containerStyle={ styles.section }
      tagsStyles={ styles.tagStyles }
      baseFontStyle={{ fontSize: fonts.md }}
      { ...rest } />
  );
}

export const WarnText = (props) => {
  const iconColor = props.iconColor || 'white';
  return (
    <View style={ [WarnTextStyles.container, props.containerStyle] }>
      <View style={ [WarnTextStyles.iconContainer, props.iconContainerStyle] }>
        <Icon type='font-awesome' name='warning' size={ 36 } color={ iconColor } />
      </View>
      <View style={ WarnTextStyles.textContainer }>
        <Text style={ [WarnTextStyles.text, props.style] }>
          { props.children }
        </Text>
      </View>
    </View>
  );
};

export const ErrText = (props) => {
  return (
    <WarnText containerStyle={{ backgroundColor: theme.errBackground }} style={{ color: theme.errText }}>
      { props.children }
    </WarnText>
  )
};

export const Spacer = (props) => <View style={ [{ flex: 1}, props.style] } />

export const Footer = (props) => {
  return (
    <View style={ FooterStyles.container }>
      <Divider style={ FooterStyles.divider } />
      { props.children }
    </View>
  );
}

export const PathwayHeader = (navigation, title, props = {}) => {
  return {
    title,
    headerRight: (
      <Text style={ styles.headerText } onPress={() => { navigation.navigate('Pathways') }}>
        Exit
      </Text>
    ),
    ...props,
  }
}

// export const palette = {
//   background: '#FFFAFF',  // near white
//   header: '#30BCED',      // blue
//   footer: '#30BCED',
//   text: '#050401',        // dark gray
//   gray: '#6E6E7A',        // medium gray
//   lightGray: '#BCBCBC',
//   warn: '#fffaaa',        // yellow
//   hilite: '#ffffff',
// };

const WarnTextStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: palette.warning,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 5
  },
  textContainer: {
    flex: 8,
    margin: 18,
  },
  text: {
    color: palette.darkGray
  }
});

const FooterStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    height: 55,
  },
  divider: {
    marginBottom: 10,
    height:1,
    backgroundColor: palette.lightGray,
  },
});