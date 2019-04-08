import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import HTML from 'react-native-render-html';
import { Footer, palette } from '../../common-components';
import TimerBar from '../../TimerBar';

class InitialResusScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Step 1: Initial 15 Minutes',
      headerRight: (
        <Text
          style={ styles.header }
          onPress={() => { navigation.navigate('Pathways') }}> Exit
        </Text>
      )
    }
  };
  
  static html = `
    <h4>Access</h4>
    <ul>
      <li>Place 2 large bore PIVs if no central line</li>
      <li>Consider PIV in patients with central line</li>
      <li><b><u>If 2 unsuccessful IV attempts: consider IO</u></b></li>
    </ul>
    
    <h4>Labs</h4>
    <ul>
      <li>EPOC: VBG, lactate, iCa</li>
      <li>POCT glucose</li>
      <li>Electrolytes, magnesium, phosphorus</li>
      <li>BUN, creatinine</li>
      <li>Blood cultures</li>
      <li>CBC + diff</li>
      <li>CRP</li>
      <li>Consider ABO/RhD and antibody</li>
    </ul>
    
    <h4>Initial Fluid Resuscitation</h4>
    <ul>
      <li>Administer 1st bolus of 20 mL/kg normal saline <b>rapidly over 20 minutes OR LESS</li>
      <li>Consider 5-10 mL/kg boluses if concern for fluid intolerance (cardiac/renal dysfunction)</li>
      <li>Give stress dose steroids if known adrenal insufficiency</li>
      <li>Correct glucose and calcium</li>
    </ul>
  `;
  
  render() {
    return (
      <View style={ styles.container }>
        <TimerBar duration={ 15 * 60 } />
        <ScrollView style={ styles.contentContainer }>
          <HTML
            html={ InitialResusScreen.html }
            containerStyle={ styles.htmlContainer }
            tagsStyles={ tagsStyles }
            baseFontStyle={{ fontSize: 16 }} />
        </ScrollView>
        <Footer>
          <Button
            title="Continue to Step 2 (30 minutes)"
            buttonStyle={ styles.startButton }
            onPress={ () => this.props.navigation.navigate('OngoingResusScreen') } />
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
    backgroundColor: palette.background,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  htmlContainer: {
  },
  startButton: {
    paddingVertical: 10,
    borderRadius: 5,
  },
});

const tagsStyles = {
  h4: { marginTop: 0, paddingBottom: 10, fontSize: 18 },
  li: { padding: 0, margin: 0 }
};

export default InitialResusScreen;