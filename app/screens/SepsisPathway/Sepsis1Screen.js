import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { PathwayHeader, SectionHead, Button, LinkButton, HTML, PatientWeight, StandardPathwayFooter } from '../../common-components';
import Timers from '../../Timers';
import { ConditionalTimerBar } from '../../TimerBar';
import Helpers from '../../helpers';
import createStyles, { theme } from '../../theme';

const PHASE_NUM = 1;

class InitialResusScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 1: Initial 15 Minutes');
  
  constructor(props) {
    super(props);

    const activePhase = this.props.navigation.getParam('activePhase');
    this.state = {
      pending: activePhase === undefined || activePhase < PHASE_NUM,
      active: activePhase == PHASE_NUM,
      done: activePhase > PHASE_NUM,

      ptWeight: this.props.navigation.getParam('ptWeight', ''),
    }
    this.timer = Timers.get('sepsis');
  }

  activate = () => {
    this.restartTimer();
    this.props.navigation.setParams({ activePhase: PHASE_NUM, startOnRender: false });
    this.setState({active: true, pending: false, done: false})
  }

  restartTimer = () => {
    this.timer = Timers.replace('sepsis', {
      duration: 15 * 60,
      notifyTitle: 'Sepsis Pathway',
      notifyBody: '15 minutes for step 2 expired. Proceed to next step.'
    });
    this.timer.start();
  }

  handleWeightInput = (v) => {
    // update both navigator state and react state
    this.props.navigation.setParams({ptWeight: v});
    this.setState({ptWeight: v});
  }

  render() {
    // the startOnRender flag indicates that this phase should
    // be automatically started when the user switches to it
    if (this.state.active && this.props.navigation.getParam('startOnRender')) {
      this.restartTimer();
      this.props.navigation.state.params.startOnRender = false;
    }

    const weight = this.state.ptWeight ? parseFloat(this.state.ptWeight) : 0;

    return (
      <View style={ styles.container }>
        <ConditionalTimerBar timer={ this.timer } onActivate={ this.activate } {...this.state}/>
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
        <StandardPathwayFooter
          prev="ActivateSepsisPathwayScreen"
          title="Activate Step 2 (30 min)"
          target="Sepsis2Screen"
          params={{ activePhase: 2, startOnRender: true }}
        />
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