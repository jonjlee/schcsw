import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import HTML from 'react-native-render-html';
import { Footer, palette } from '../../common-components';
import TimerBar from '../../TimerBar';

class OngoingResusScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Step 2: 30 Minutes',
      headerRight: (
        <Text
          style={ styles.header }
          onPress={() => { navigation.navigate('Pathways') }}> Exit
        </Text>
      )
    }
  };

  static html = `
    <h4>Administer Antimicrobials</h4>
    <ul>
      <li>Previously healthy patients: ceftriaxone (+vancomycin if history or concern for MRSA)</li>
      <li>Appropriate antibiotics for specific populations: HOBSI, CLABSI, neonatal fever (0-30 days)</li>
      <li>Consider history of resistant organisms</li>
    </ul>
    
    <h4>Ongoing Resuscitation</h4>
    <ul>
      <li>2nd and 3rd boluses of 20 mL/kg NS <b>rapidly over 20 minutes OR LESS</b> until perfusion improves or unless rales or hepatomegaly develops</li>
      <li>Order vasoactive/inotropic drips</li>
      <li>Consider blood products</li>
    </ul>
  `;
  
  render() {
    return (
      <View style={ styles.container }>
        <TimerBar duration={ 30 * 60 } />
        <ScrollView style={ styles.contentContainer }>
          <HTML
            html={ OngoingResusScreen.html }
            containerStyle={ styles.htmlContainer }
            tagsStyles={ tagsStyles }
            baseFontStyle={{ fontSize: 16 }} />
        </ScrollView>
        <Footer>
          <Button
            title="Continue to Step 3 (60 minutes)"
            buttonStyle={ styles.startButton }
            onPress={ () => this.props.navigation.navigate('FollowupResusScreen') } />
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

export default OngoingResusScreen;