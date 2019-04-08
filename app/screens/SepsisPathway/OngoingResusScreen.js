import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PathwayHeader, LinkButton, HTML, Footer } from '../../common-components';
import TimerBar from '../../TimerBar';
import createStyles from '../../theme';

class OngoingResusScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 2: 30 Minutes');

  render() {
    return (
      <View style={ styles.container }>
        <TimerBar duration={ 30 * 60 } />
        <ScrollView>
          <HTML>
            {`
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
            `}
          </HTML>
        </ScrollView>
        <Footer>
          <LinkButton title="Continue to Step 3 (60 minutes)" target="FollowupResusScreen" />
        </Footer>
      </View>
    );
  }
}

const styles = createStyles();

export default OngoingResusScreen;