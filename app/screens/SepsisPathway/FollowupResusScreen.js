import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import HTML from 'react-native-render-html';
import { Footer, palette } from '../../common-components';
import TimerBar from '../../TimerBar';

class FollowupResusScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Step 3: 60 Minutes',
      headerRight: (
        <Text
          style={ styles.header }
          onPress={() => { navigation.navigate('Pathways') }}> Exit
        </Text>
      )
    }
  };

  static html = `
    <h4>Initiate vasoactive/inotropic drips for Fluid Refactory Shock</h4>
    <ul>
      <li>Epinephrine for cold shock</li>
      <li>Norepinephrine for warm shock</li>
      <li>Titrate drips to <a href="#map-goals">resuscitation goals</a></li>
      <li>Consider broader antibiotic coverage</li>
    </ul>
    
    <h4>Bedside Huddle</h4>
    <ul>
      <li>ED, ICU, +/- Hospitalist</li>
    </ul>
    
    <h4>Respiratory Support</h4>
    <ul>
      <li>Consider ET intubation for ongoing respiratory distress or altered mental status</li>
    </ul>
  `;
  
  render() {
    return (
      <View style={ styles.container }>
        <TimerBar duration={ 60 * 60 } />
        <ScrollView style={ styles.contentContainer }>
          <HTML
            html={ FollowupResusScreen.html }
            containerStyle={ styles.htmlContainer }
            tagsStyles={ tagsStyles }
            baseFontStyle={{ fontSize: 16 }}
            onLinkPress={ () => this.props.navigation.navigate('MAPGoalsScreen') } />
        </ScrollView>
        <Footer>
          <Button
            title="ICU / Wards Admission Guidelines"
            buttonStyle={ styles.startButton }
            onPress={ () => this.props.navigation.navigate('SepsisAdmitScreen') } />
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
};

export default FollowupResusScreen;