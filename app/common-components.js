import React, { Component } from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button as RNEButton, Icon, Divider } from 'react-native-elements';
import RNRenderHTML from 'react-native-render-html';
import createStyles, { theme } from './theme';

const styles = createStyles();

// A button styled with our theme colors
export const Button = (props) => {
  return (
    <RNEButton
      buttonStyle={ styles.button }
      {...props} />
  );
};

// Text styled with default font
export const Text = (props) => {
  const { children, style, ...rest } = props;
  return (
    <RNText
      style={ [{ fontSize: theme.fontSizeMd, color: theme.text}, style] }
      {...rest } >
        { children }
    </RNText>
  );
}

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

// A centered bolded Text element
export const SectionHead = (props) => (
  <View style={{ flex: 1, alignItems: 'center' }}>
    <Text style={ [{ fontSize: theme.fontSizeLg }, props.style] }>{ props.children }</Text>
  </View>
);

// Text preceded by a bullet icon
export const Bullet = (props) => {
  const bullet = '\u2022';
  const bulletWidth = 15;
  const { style, ...rest } = props;
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ width: bulletWidth }}>
        <RNText style={ [{ fontSize: theme.fontSizeLg }, style] }>
          { bullet + ' ' }
        </RNText>
      </View>
      <View style={{ flex: 1 }}>
        <RNText style={ [{ fontSize: theme.fontSizeMd }, style] }>
          { props.children }
        </RNText>
      </View>
    </View>
  );
}

// Encapsulated HTML component from react-native-render-html with the app's
// styles. Also allow html content to be sepcified as the component's children.
export const HTML = (props) => {
  const { children, ...rest } = props;
  return (
    <RNRenderHTML
      html={ children }
      containerStyle={ styles.section }
      tagsStyles={ styles.tagStyles }
      classesStyles={ styles.htmlClassStyles }
      baseFontStyle={{ fontSize: theme.fontSizeMd }}
      { ...rest } />
  );
}

// Yellow colored, outlined, text box with an icon
export const WarnText = (props) => {
  const iconColor = props.iconColor || 'white';
  return (
    <View style={ [WarnTextStyles.container, props.containerStyle] }>
      <View style={ [WarnTextStyles.iconContainer, props.iconContainerStyle] }>
        <Icon type='font-awesome' name='warning' size={ 36 } color={ iconColor } />
      </View>
      <View style={ WarnTextStyles.textContainer }>
        <RNText style={ [WarnTextStyles.text, props.style] }>
          { props.children }
        </RNText>
      </View>
    </View>
  );
};

// Red colored, outlined, text box with an icon
export const ErrText = (props) => {
  return (
    <WarnText containerStyle={{ backgroundColor: theme.errBackground }} style={{ color: theme.errText }}>
      { props.children }
    </WarnText>
  )
};

// Empty View to fill remaining vertical space if flex container
export const Spacer = (props) => <View style={ [{ flex: 1}, props.style] } />

// Footer with a divider line
export const Footer = (props) => {
  return (
    <View style={ [FooterStyles.container, props.style] }>
      <Divider style={ FooterStyles.divider } />
      { props.children }
    </View>
  );
}



export const PathwayHeader = (navigation, title, props = {}) => {
  return {
    title,
    headerRight: (
      <RNText style={ styles.headerText } onPress={() => { navigation.navigate('Pathways') }}>
        Exit
      </RNText>
    ),
    ...props,
  }
}

const WarnTextStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: theme.warnBackground,
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
    color: theme.warnText
  }
});

const FooterStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    height: 55,
  },
  divider: {
    marginBottom: 10,
    height: 1,
    backgroundColor: theme.divider,
  },
});