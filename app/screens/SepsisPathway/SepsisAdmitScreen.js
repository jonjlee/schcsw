import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PathwayHeader, HTML } from '../../common-components';
import createStyles from '../../theme';

class SepsisAdmitScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 4: Admission');

  render() {
    return (
      <View style={ styles.container }>
        <HTML>
          {`
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
          `}
        </HTML>
      </View>
    );
  }
}

const styles = createStyles();

export default SepsisAdmitScreen;