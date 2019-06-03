import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { PathwayHeader, SectionHead, Button, LinkButton, HTML, PatientWeight } from '../../common-components';
import { Footer } from './SepsisNavigator';
import Timers from '../../Timers';
import TimerBar from '../../TimerBar';
import Helpers from '../../helpers';
import createStyles, { theme } from '../../theme';

class InitialResusScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 1: Initial 15 Minutes');
  
  constructor(props) {
    super(props);

    const activePhase = this.props.navigation.getParam('activePhase');
    this.state = {
      ptWeight: this.props.navigation.getParam('ptWeight', ''),
    }
    this.timer = Timers.get('sepsis');
  }

  handleWeightInput = (v) => {
    // update both navigator state and react state
    this.props.navigation.setParams({ptWeight: v});
    this.setState({ptWeight: v});
  }

  render() {
    const activePhase = this.props.navigation.getParam('activePhase', -1);
    const pathwayStarted = activePhase >= 2;
    const weight = this.state.ptWeight ? parseFloat(this.state.ptWeight) : 0;

    return (
      <View style={ styles.container }>
        { !pathwayStarted ? null : <TimerBar timer={ this.timer } /> }
        <PatientWeight weight={ this.state.ptWeight } onChange={ this.handleWeightInput } />
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
                <li>Administer 1st bolus of ${Helpers.getBolusDose(this.state.ptWeight)} normal saline <b>rapidly over 20 minutes OR LESS</li>
                <li>Consider 5-10 mL/kg boluses if concern for fluid intolerance (cardiac/renal dysfunction)</li>
                <li>Give stress dose steroids if known adrenal insufficiency</li>
                <li>Correct glucose and calcium</li>
              </ul>
            `}
          </HTML>
        </ScrollView>
        <Footer phaseIndex={ 2 } />
      </View>
    );
  }
}

const styles = createStyles({
  banner: {
    marginHorizontal: 5,
  },
});

export default InitialResusScreen;