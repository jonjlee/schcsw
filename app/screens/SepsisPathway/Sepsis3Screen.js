import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PathwayHeader, SectionHead, Button, LinkButton, HTML } from '../../common-components';
import { Footer } from './SepsisNavigator';
import { Card } from 'react-native-elements';
import Timers from '../../Timers';
import TimerBar from '../../TimerBar';
import createStyles from '../../theme';

class FollowupResusScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 3: Within 60 Minutes (5m For Demo)');
  
  constructor(props) {
    super(props);
    this.timer = Timers.get('sepsis');
  }
  
  get10PercentMAPforAge = (age, unit) => {
    try {
      age = parseFloat(age);
    } catch (e) {
      return '';
    }
    
    let txt = '';
    if (unit == 'mo') {
      if (age <= 1) {
        txt = '42mmHg for 0-30 days';
      } else if (age <= 3) {
        txt = '47mmHg for 31-90 days';
      } else if (age <= 12) {
        txt = '52mmHg for 91 days - 1 year';
      } else if (age > 12) {
        return this.get10PercentMAPforAge(age/12, 'yr');
      }
    } else if (unit == 'yr') {
      if (age <= 1) {
        return this.get10PercentMAPforAge(age*12, 'mo');
      } else if (age > 1 && age <= 2) {
        txt = '53mmHg for >1-2 years';
      } else if (age > 2 && age <= 4) {
        txt = '55mmHg for >2-4 years';
      } else if (age > 4 && age <= 6) {
        txt = '56mmHg for >4-6 years';
      } else if (age > 6 && age <= 10) {
        txt = '58mmHg for >6-10 years';
      } else if (age > 10 && age <= 13) {
        txt = '60mmHg for >10-13 years';
      } else if (age > 13) {
        txt = '61mmHg for >13 years';
      }
    }
    
    if (txt !== '') {
      txt = ':<br/>MAP &geq; ' + txt;
    }
    return txt;
  }
  
  render() {
    const navigation = this.props.navigation;
    const activePhase = navigation.getParam('activePhase', -1);
    const pathwayStarted = activePhase >= 2;
    const age = navigation.getParam('ptAge', '');
    const ageUnit = navigation.getParam('ptAgeUnit', 'yr');

    return (
      <View style={ styles.container }>
        { !pathwayStarted ? null : <TimerBar timer={ this.timer } /> }
        <ScrollView>
          <HTML onLinkPress={ () => this.props.navigation.navigate('MAPGoalsScreen') }>
            {`
              <h4>Initiate vasoactive/inotropic drips for Fluid Refactory Shock</h4>
              <ul>
                <li>Epinephrine for cold shock</li>
                <li>Norepinephrine for warm shock</li>
                <li>Titrate drips to <a href="#map-goals">resuscitation goals</a>${ this.get10PercentMAPforAge(age, ageUnit) }</li>
                <li>Consider broader antibiotic coverage</li>
              </ul>
              
              <h4>Determine Disposition</h4>
              <ul>
                <li>Consider involving ED provider, ICU, +/- Hospitalist</li>
              </ul>
              
              <h4>Respiratory Support</h4>
              <ul>
                <li>Consider ET intubation for ongoing respiratory distress or altered mental status</li>
              </ul>
            `}
          </HTML>
        </ScrollView>
        <Footer phaseIndex={ 4 } />
      </View>
    );
  }
}

const styles = createStyles({
  banner: {
    marginHorizontal: 5,
  },
});

export default FollowupResusScreen;