import React, { Component } from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Card, Button as RNEButton, Input, Icon, Divider } from 'react-native-elements';
import RNRenderHTML from 'react-native-render-html';
import createStyles, { theme } from './theme';

const styles = createStyles();

// A button styled with our theme colors
export const Button = (props) => {
  const { type, buttonStyle, ...rest } = props;
  const backgroundColor = (type === 'outline') ? { backgroundColor: 'transparent' } : null;
  return (
    <RNEButton
      buttonStyle={ StyleSheet.flatten([ styles.button, backgroundColor, buttonStyle ]) }
      type={ type }
      {...rest} />
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
    const { navigation, target, params, onPress, ...rest } = this.props;
    return (
      <Button
        onPress={ (event) => {
          if (onPress) {
            onPress(event);
          }
          navigation.replace(target, {...navigation.state.params, ...params});
        }}
        {...rest} />
    );
  }
}
export const LinkButton = withNavigation(LinkButtonComponent);

// A centered bolded Text element
export const SectionHead = (props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

// Footer with 3 buttons that call props.navigation.navigate(): a central button and previous/next buttons
export const StandardPathwayFooter = (props) => {
  const { prev, title, target, params={}, style } = props;
  return (
    <Footer style={ style }>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        { prev ?
            <View style={{flex:1}}>
              <LinkButton
                buttonStyle={ FooterStyles.leftButton }
                icon={{ name: 'chevron-left', color: 'white' }}
                target={ prev } />
            </View>
          : null
        }
        <View style={{flex:5}}>
          <LinkButton
            buttonStyle={ prev ? FooterStyles.middleButton : FooterStyles.leftButton }
            title={ title }
            target={ target }
            params={ params }
          />
        </View>
        <View style={{flex:1}}>
          <LinkButton
            buttonStyle={ FooterStyles.rightButton }
            icon={{ name: 'chevron-right', color: 'white' }}
            target={ target } />
        </View>
      </View>
    </Footer>
  );
}

export const PatientWeight = (props) => {
  const { style } = props;
  return (
    <Card containerStyle={ [PatientWeightStyles.ptWeightCard, style] }>
      <View style={ PatientWeightStyles.ptWeightContainer }>
        <View>
          <Text style={ PatientWeightStyles.ptWeightLabel }>Patient Weight:</Text>
        </View>
        <View style={ PatientWeightStyles.ptWeightInputContainer }>
          <Input
            placeholder="?"
            keyboardType="numeric"
            textAlign="center"
            value={ props.weight }
            onChangeText={ props.onChange } />
        </View>
        <View>
          <Text style={ PatientWeightStyles.ptWeightLabel }>kg</Text>
        </View>
      </View>
    </Card>
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
    color: theme.warnText,
    fontSize: theme.fontSizeMd,
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
  leftButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    minHeight: 42,
  },
  middleButton: {
    borderRadius: 0,
    minHeight: 42,
  },
  rightButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    minHeight: 42,
  },
});

const PatientWeightStyles = StyleSheet.create({
  ptWeightCard: {
    marginTop: -6,
    marginHorizontal: 5,
    paddingTop: 2,
    paddingBottom: 5
  },
  ptWeightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  ptWeightLabel: {
    fontSize: theme.fontSizeLg,
  },
  ptWeightInputContainer: {
    width: 75
  },
});