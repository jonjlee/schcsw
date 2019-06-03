import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PathwayHeader, HTML, LinkButton } from '../../common-components';
import { Footer } from './SepsisNavigator';
import createStyles from '../../theme';

class SepsisAdmitScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 4: Admission');

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView>
          <HTML>
            {`
              <h4>ICU Criteria at Seattle Children's</h4>
              <ul>
                <li>Recurrent hypotension after > 40mL/kg in last 12 hours</li>
                <li>Not appropriate for ongoing fluid resuscitation: cardiac or lung disease, fluid overload, impaired renal function</li>
                <li>Lactate ≥ 4 or base excess < -1</li>
                <li>Sustained (>15 min) mental status or perfusion change</li>
                <li>Continuous ICU monitoring or ICU level respiratory support</li>
              </ul>
              
              <h4>Inpatient Criteria at Seattle Children's</h4>
              <ul>
                <li>Resolved hypotension AND no signs of sepsis after ≤ 40 mL/kg</li>
                <li>First dose antibiotics given</li>
              </ul>
            `}
          </HTML>
        </ScrollView>
        <Footer phaseIndex={ 5 } />
      </View>
    );
  }
}

const styles = createStyles();

export default SepsisAdmitScreen;