import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PathwayHeader, SectionHead, Text, Button, Bullet, LinkButton, HTML, PatientWeight, StandardPathwayFooter } from '../../common-components';
import { Card, Input, ButtonGroup } from 'react-native-elements';
import Timers from '../../Timers';
import { ConditionalTimerBar } from '../../TimerBar';
import Helpers from '../../helpers';
import createStyles, { theme } from '../../theme';

const PHASE_NUM = 2;

class OngoingResusScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 2: 30 Minutes', { headerLeft: null });

  constructor(props) {
    super(props);

    const activePhase = this.props.navigation.getParam('activePhase');
    this.state = {
      pending: activePhase === undefined || activePhase < PHASE_NUM,
      active: activePhase == PHASE_NUM,
      done: activePhase > PHASE_NUM,

      ptWeight: this.props.navigation.getParam('ptWeight', ''),
      selAbxIdx: 0,
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
      duration: 30 * 60,
      notifyTitle: 'Sepsis Pathway',
      notifyBody: '30 minutes for step 2 expired. Proceed to next step.'
    });
    this.timer.start();
  }

  handleWeightInput = (v) => {
    // update both navigator state and react state
    this.props.navigation.setParams({ptWeight: v});
    this.setState({ptWeight: v});
  }

  renderSepsisAbxTable = (selectedPopulationIdx, weight, onPressButton) => {
    const doseCTX = Helpers.getDose('ceftriaxone', 75, 2000, weight);
    const doseVanc = Helpers.getDose('vancomycin', 15, 850, weight);
    const doseAmp = Helpers.getDose('ampicillin', 100, 2000, weight)
    const doseCeftaz = Helpers.getDose('ceftazidime', 50, 2000, weight);
    const doseAcyclovir = Helpers.getDose('acyclovir', 20, null, weight);
    const doseMero = Helpers.getDose('meropenem', 20, 1000, weight);
    const doseCefepime = Helpers.getDose('cefepime', 50, 2000, weight);
    const doseGent = Helpers.getDose('gentamicin', 2.5, 120, weight);
    const doseClinda = Helpers.getDose('clindamycin', 10, 600, weight);
    const doseFlagyl = Helpers.getDose('metronidazole', 10, 500, weight);
    const doseFluc = Helpers.getDose('fluconazole', 12, 800, weight);

    // Actual antibiotic recommendations based on selected population
    const buttons = ['Healthy >30d', '<30 days', 'Hemonc / BMT', 'Central Line'];
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    let abxCard = (
      // Default, healthy >30
      <Card containerStyle={ styles.abxTableContainer }>
        <Bullet>{ capitalize(doseCTX) }</Bullet>
        <Bullet>AND { doseVanc } if known history of MRSA</Bullet>
      </Card>);
    if (selectedPopulationIdx === 1) {
      // infant <30d
      abxCard = (
        <Card containerStyle={ styles.abxTableContainer }>
          <Bullet>{ capitalize(doseAmp) }</Bullet>
          <Bullet>AND { doseCeftaz }</Bullet>
          <Bullet>AND { doseAcyclovir } if HSV suspected</Bullet>
        </Card>);
    } else if (selectedPopulationIdx === 2) {
      // Hemonc/BMT
      abxCard = (
        <Card containerStyle={ styles.abxTableContainer }>
          <Bullet>{ capitalize(doseMero) } if BMT</Bullet>
          <Bullet>OR { doseCeftaz } if cancer</Bullet>
          <Bullet>OR { doseCefepime } if certain cancers, e.g. AML, infant ALL, relapse ALL with recent cytarabine, hx strep viridans</Bullet>
          <Bullet>IF refractory hypotension after 40mg/kg fluids: add { doseGent }</Bullet>
          <Bullet>IF skin infection: add { doseVanc }</Bullet>
          <Bullet>IF mucositis or perineal infection: add { doseClinda }</Bullet>
          <Bullet>IF intra-abdominal infection and not using clindamycin or meropenem: add { doseFlagyl }</Bullet>
        </Card>);
    } else if (selectedPopulationIdx === 3) {
      // Patients with central lines
      abxCard = (
        <Card containerStyle={ styles.abxTableContainer }>
          <Bullet>{ capitalize(doseCefepime) }</Bullet>
          <Bullet>OR { doseMero } if unstable or immunocompromised</Bullet>
          <Bullet>IF unstable: add { doseVanc } AND { doseGent }</Bullet>
          <Bullet>IF fungal risk: add { doseFluc }</Bullet>
        </Card>);
    }

    return (
      // A button for each population followed by a list of meds for selected population
      <View>
        <View style={ styles.abxButtonGroupContainer }>
          <ButtonGroup
            textStyle={{textAlign: 'center'}}
            buttons={buttons}
            selectedIndex={selectedPopulationIdx}
            onPress={onPressButton}
          />
        </View>
        { abxCard }
      </View>
    );
  }

  render() {
    // the startOnRender flag indicates that this phase should
    // be automatically started when the user switches to it
    if (this.state.active && this.props.navigation.getParam('startOnRender')) {
      this.restartTimer();
      this.props.navigation.state.params.startOnRender = false;
    }

    return (
      <View style={ styles.container }>
        <ConditionalTimerBar timer={this.timer} onActivate={ this.activate } {...this.state}/>
        <PatientWeight weight={ this.state.ptWeight } onChange={ this.handleWeightInput } />
        <ScrollView>
          <HTML>
            {`
              <h4>Administer Antimicrobials</h4>
              <ul>
                <li>Antibiotics for specific populations:</li>
              </ul>
            `}
          </HTML>

          { this.renderSepsisAbxTable(this.state.selAbxIdx, this.state.ptWeight, (newIdx) => this.setState({selAbxIdx: newIdx})) }

          <HTML>
            {`
              <h4>Ongoing Resuscitation</h4>
              <ul>
                <li>2nd and 3rd boluses of ${Helpers.getBolusDose(this.state.ptWeight)} NS <b>rapidly over 20 minutes OR LESS</b> until perfusion improves or unless rales or hepatomegaly develops</li>
                <li>Order vasoactive/inotropic drips</li>
                <li>Consider blood products</li>
              </ul>
            `}
          </HTML>
        </ScrollView>
        <StandardPathwayFooter
          prev="Sepsis1Screen"
          title="Activate Step 3 (60 min)"
          target="Sepsis3Screen"
          params={{ activePhase: 3, startOnRender: true }}
        />
      </View>
    );
  }
}

const styles = createStyles({
  abxButtonGroupContainer: {
    marginTop:-15,
    marginLeft: 20,
    marginRight:10,
  },
  abxTableContainer: {
    marginTop:-6,
    marginLeft:30,
    marginRight:20
  },
});

export default OngoingResusScreen;