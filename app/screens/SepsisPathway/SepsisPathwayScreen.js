import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { PathwayHeader, Button, HTML } from '../../common-components';
import { Footer } from './SepsisNavigator';

import createStyles, { theme } from '../../theme';

class SepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Septic Shock Pathway', { headerLeft: null });
  
  onLinkPress = (evt, href) => {
    if (href === '#sepsis-calc') {
      this.props.navigation.navigate('SepsisCalcScreen');
    } else if (href === '#map-goals') {
      this.props.navigation.navigate('MAPGoalsScreen');
    }
  }
  
  getMAPforAge = (age, unit) => {
    try {
      age = parseFloat(age);
    } catch (e) {
      return '';
    }
    
    let txt = '';
    if (unit == 'mo') {
      if (age <= 1) {
        txt = '39mmHg for 0-30 days';
      } else if (age <= 3) {
        txt = '44mmHg for 31-90 days';
      } else if (age <= 12) {
        txt = '48mmHg for 91 days - 1 year';
      } else if (age > 12) {
        return this.getMAPforAge(age/12, 'yr');
      }
    } else if (unit == 'yr') {
      if (age <= 1) {
        return this.getMAPforAge(age*12, 'mo');
      } else if (age > 1 && age <= 2) {
        txt = '48mmHg for >1-2 years';
      } else if (age > 2 && age <= 4) {
        txt = '50mmHg for >2-4 years';
      } else if (age > 4 && age <= 6) {
        txt = '51mmHg for >4-6 years';
      } else if (age > 6 && age <= 10) {
        txt = '54mmHg for >6-10 years';
      } else if (age > 10 && age <= 13) {
        txt = '55mmHg for >10-13 years';
      } else if (age > 13) {
        txt = '57mmHg for >13 years';
      }
    }
    
    if (txt !== '') {
      txt = ': MAP &leq; ' + txt;
    }
    return txt;
  }

  render() {
    const navigation = this.props.navigation;
    const age = navigation.getParam('ptAge', '');
    const ageUnit = navigation.getParam('ptAgeUnit', 'yr');
    
    return (
      <View style={ styles.container }>
        <ScrollView>
          <HTML onLinkPress={ this.onLinkPress }>
            {`
              <h4>Inclusion criteria</h4>
              <ul>
                <li>Clinical concern for sepsis/septic shock OR ED Sepsis Score &geq; 3 (<a href="#sepsis-calc">Sepsis Score calculator</a>)</li>
                <li>Attending/fellow assessment with concern for sepsis/septic shock</li>
              </ul>
              <h4>Signs &amp; Symptoms of Sepsis</h4>
              <ul>
                <li>Hypotension${ this.getMAPforAge(age, ageUnit) } (<a href="#map-goals">MAP &leq; 5% for age</a>)</li>
                <li>Tachycardia</li>
                <li>Poor perfusion</li>
                <li>Reduced urine output</li>
                <li>Tachypnea / new oxygen requirment</li>
                <li>Mental status changes</li>
              </ul>
            `}
          </HTML>
        </ScrollView>
        <Footer phaseIndex={ 0 } />
      </View>
    );
  }
}

const styles = createStyles();

export default SepsisPathwayScreen;