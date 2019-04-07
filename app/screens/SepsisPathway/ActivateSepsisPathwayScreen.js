import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { WarnText, palette } from '../../common-components'
import HTML from 'react-native-render-html';

class ActivateSepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Activate Septic Shock Pathway',
      headerRight: (
        <Text
          style={ styles.header }
          onPress={() => { navigation.navigate('Pathways') }}>
            Exit
        </Text>
      )
    }
  };
  
  static html = `
    <ul>
      <li>Assess airway, breathing, circulation</li>
      <li>Provide supplemental oxygen</li>
      <li>Reassess vital signs every 5 minutes</li>
      <li>Order appropriate antibiotics</li>
    </ul>
  `;
  
  render() {
    return (
      <ScrollView style={ styles.container }>
        <WarnText>
          Activate ED Sepsis Internal Response
        </WarnText>
        <HTML
          html={ ActivateSepsisPathwayScreen.html }
          containerStyle={ styles.mainContent }
          baseFontStyle={{ fontSize: 16 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginRight: 12,
    color: '#ffffff',
    fontSize: 18
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: palette.background,
  },
  mainContent: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ActivateSepsisPathwayScreen;