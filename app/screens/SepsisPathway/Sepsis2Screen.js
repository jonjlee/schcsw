import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PathwayHeader, SectionHead, Text, Button, Bullet, LinkButton, HTML, PatientWeight } from '../../common-components';
import { Footer } from './SepsisNavigator';
import { Card, Input, ButtonGroup } from 'react-native-elements';
import Timers from '../../Timers';
import TimerBar from '../../TimerBar';
import Helpers from '../../helpers';
import createStyles, { theme } from '../../theme';

class OngoingResusScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 2: Within 30 Minutes', { headerLeft: null });

  constructor(props) {
    super(props);
    this.timer = Timers.get('sepsis');
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
    const buttons = ['Healthy >30d', '<30 days', 'Cancer / BMT', 'Central Line'];
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
            containerStyle={{minHeight:47, marginBottom: 12}}
            selectedButtonStyle={{backgroundColor: theme.button}}
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
    const navigation = this.props.navigation;
    const activePhase = navigation.getParam('activePhase', -1);
    const pathwayStarted = activePhase >= 2;
    const weight = navigation.getParam('ptWeight', '');
    const ptTypeIdx = navigation.getParam('ptTypeIdx', 0);

    return (
      <View style={ styles.container }>
        { !pathwayStarted ? null : <TimerBar timer={ this.timer } /> }
        <PatientWeight weight={ weight } onChange={ (v) => { navigation.setParams({ptWeight: v}) } } />
        <ScrollView>
          <HTML>
            {`
              <h4>Administer Antimicrobials</h4>
              <ul>
                <li>Antibiotics for specific populations:</li>
              </ul>
            `}
          </HTML>

          { this.renderSepsisAbxTable(ptTypeIdx, weight, (v) => navigation.setParams({ptTypeIdx: v})) }

          <HTML>
            {`
              <h4>Ongoing Resuscitation</h4>
              <ul>
                <li>2nd and 3rd boluses of ${Helpers.getBolusDose(weight)} NS <b>rapidly over 20 minutes OR LESS</b> until perfusion improves or unless rales or hepatomegaly develops</li>
                <li>Order vasoactive/inotropic drips</li>
                <li>Consider blood products</li>
              </ul>
            `}
          </HTML>
        </ScrollView>
        <Footer phaseIndex={ 3 } />
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