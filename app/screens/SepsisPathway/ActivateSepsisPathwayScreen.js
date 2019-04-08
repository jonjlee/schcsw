import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { ErrText, Footer, palette } from '../../common-components'
import HTML from 'react-native-render-html';

class ActivateSepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Activate Sepsis Pathway',
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
      <View style={ styles.container }>
        <ScrollView>
          <ErrText>
            Activate ED Sepsis Internal Response
          </ErrText>
          <HTML
            html={ ActivateSepsisPathwayScreen.html }
            containerStyle={ styles.htmlContainer }
            baseFontStyle={{ fontSize: 16 }} />
        </ScrollView>
        <Footer>
          <Button
            title="Start Step 1 (15 minutes)"
            buttonStyle={ styles.startButton }
            onPress={ () => this.props.navigation.navigate('InitialResusScreen') } />
        </Footer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginRight: 12,
    color: '#ffffff',
    fontSize: 18
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: palette.background
  },
  contentContainer: {
    alignItems: 'stretch'
  },
  htmlContainer: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  startButton: {
    paddingVertical: 10,
    borderRadius: 5,
  }
});

export default ActivateSepsisPathwayScreen;