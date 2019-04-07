import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings'
  };
  
  render() {
    return (
      <View style={ styles.container }>
        <Text>This is the Settings screen.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SettingsScreen;