import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

export const WarnText = (props) => {
  const iconColor = props.iconColor || palette.hilite;
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
    <WarnText containerStyle={{ backgroundColor: 'coral' }} style={{ color: 'white' }}>
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

export const palette = {
  background: '#FFFAFF',  // near white
  header: '#30BCED',      // blue
  footer: '#30BCED',
  text: '#050401',        // dark gray
  gray: '#6E6E7A',        // medium gray
  lightGray: '#BCBCBC',
  warn: '#fffaaa',        // yellow
  hilite: '#ffffff',
};

const WarnTextStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: palette.warn,
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
    color: palette.gray
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