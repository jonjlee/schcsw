import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HTML from 'react-native-render-html';
import { palette } from '../../common-components';

class SepsisAdmitScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Step 4: Admission',
      headerRight: (
        <Text
          style={ styles.header }
          onPress={() => { navigation.navigate('Pathways') }}> Exit
        </Text>
      )
    }
  };

  static html = `
    <h4>ICU Criteria</h4>
    <ul>
      <li>Recurrent hypotension after > 40mL/kg in last 12 hours</li>
      <li>Not appropriate for ongoing fluid resuscitation: cardiac or lung disease, fluid overload, impaired renal function</li>
      <li>Lactate ≥ 4 or base excess < -1</li>
      <li>Sustained (>15 min) mental status or perfusion change</li>
      <li>Continuous ICU monitoring or ICU level respiratory support</li>
    </ul>
    
    <h4>Inpatient Criteria</h4>
    <ul>
      <li>Resolved hypotension AND no signs of sepsis after ≤ 40 mL/kg</li>
      <li>First dose antibiotics given</li>
      <li>RISK to follow</li>
    </ul>
  `;

  render() {
    return (
      <View style={ styles.container }>
        <HTML
          html={ SepsisAdmitScreen.html }
          containerStyle={ styles.htmlContainer }
          tagsStyles={ tagsStyles }
          baseFontStyle={{ fontSize: 16 }} />
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
  htmlContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 5,
  }
});

const tagsStyles = {
  h4: { marginTop: 0, paddingBottom: 10, fontSize: 18 },
};

export default SepsisAdmitScreen;