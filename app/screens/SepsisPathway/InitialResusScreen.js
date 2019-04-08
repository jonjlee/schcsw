import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PathwayHeader, LinkButton, HTML, Footer } from '../../common-components';
import TimerBar from '../../TimerBar';
import createStyles from '../../theme';

class InitialResusScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 1: Initial 15 Minutes');
  
  render() {
    return (
      <View style={ styles.container }>
        <TimerBar duration={ 15 * 60 } />
        <ScrollView>
          <HTML>
            {`
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
            `}
          </HTML>
        </ScrollView>
        <Footer>
          <LinkButton title="Continue to Step 2 (30 minutes)" target="OngoingResusScreen" />
        </Footer>
      </View>
    );
  }
}

const styles = createStyles();

export default InitialResusScreen;