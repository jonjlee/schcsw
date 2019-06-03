import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Input, ButtonGroup } from 'react-native-elements';
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
  
  handleInput = (key) => {
    return (v) => { this.props.navigation.setParams({[key]: v}) };
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
    const weight = navigation.getParam('ptWeight', '');
    const age = navigation.getParam('ptAge', '');
    const ageUnit = navigation.getParam('ptAgeUnit', 'yr');
    const typeIdx = navigation.getParam('ptTypeIdx', 0);
    
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
              <h4>Patient Demographics:</h4>
            `}
          </HTML>
          <Card containerStyle={ [{ marginTop: 0, marginHorizontal: 15, paddingTop: 5, paddingBottom: 8 }] }>
            <View style={{     flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
              <View>
                <Text style={{ fontSize: theme.fontSizeLg }}> Weight:</Text>
              </View>
              <View style={{ minWidth: 60 }}>
                <Input
                  placeholder="?"
                  keyboardType="numeric"
                  textAlign="center"
                  value={ weight }
                  onChangeText={ this.handleInput('ptWeight') } />
              </View>
              <View>
                <Text style={{ fontSize: theme.fontSizeLg }}>kg</Text>
              </View>
              <View>
                <Text style={{ fontSize: theme.fontSizeLg, marginLeft: 25 }}> Age:</Text>
              </View>
              <View style={{ minWidth: 60 }}>
                <Input
                  placeholder="?"
                  keyboardType="numeric"
                  textAlign="center"
                  value={ age }
                  onChangeText={ this.handleInput('ptAge') } />
              </View>
              <View>
                <View style={{ flexDirection: 'column'}}>
                  <Button
                    buttonStyle={{ minHeight: 22, minWidth: 25, padding: 0, borderRadius: 0 }}
                    titleStyle={{fontSize: theme.fontSizeSm}}
                    type={ageUnit=='mo' ? 'solid' : 'outline'}
                    onPress={ () => navigation.setParams({ptAgeUnit: 'mo'}) }
                    title="mo" />
                  <Button
                    buttonStyle={{ minHeight: 22, minWidth: 25, padding: 0, borderRadius: 0 }}
                    titleStyle={{fontSize: theme.fontSizeSm}}
                    type={ageUnit=='yr' ? 'solid' : 'outline'}
                    onPress={ () => navigation.setParams({ptAgeUnit: 'yr'}) }
                    title="yr" />
                </View>
              </View>
            </View>
            <View style={{     flexDirection: 'row', justifyContent: 'center', alignItems:'center', paddingTop: 10  }}>
              <View>
                <Text style={{ fontSize: theme.fontSizeLg }}>Type:</Text>
              </View>
              <View style={{flex:1}}>
                <ButtonGroup
                  containerStyle={{marginLeft: 8, minHeight: 47}}
                  buttonStyle={{ paddingHorizontal: 4, minHeight:30, minWidth: 45 }}
                  selectedButtonStyle={{backgroundColor: theme.button}}
                  textStyle={{textAlign: 'center', fontSize: theme.fontSizeSm
                  }}
                  buttons={['Healthy >30d', '<30 days', 'Cancer / BMT', 'Central Line']}
                  selectedIndex={navigation.getParam('ptTypeIdx', 0)}
                  onPress={(idx) => navigation.setParams({ptTypeIdx: idx})}
                />
              </View>
            </View>
          </Card>
        </ScrollView>
        <Footer phaseIndex={ 0 } />
      </View>
    );
  }
}

const styles = createStyles();

export default SepsisPathwayScreen;