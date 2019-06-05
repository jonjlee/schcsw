import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Input, ButtonGroup } from 'react-native-elements';
import { PathwayHeader, LinkButton, HTML, ErrText, Button } from '../../common-components'
import { Footer } from './SepsisNavigator';
import createStyles, { theme } from '../../theme';

class ActivateSepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Activate Sepsis Pathway');
  
  handleInput = (key) => {
    return (v) => { this.props.navigation.setParams({[key]: v}) };
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
          <ErrText>
            Activate ED Sepsis Internal Response
          </ErrText>
          <HTML>
            {`
              <h4>Initial Evaluation</h4>
              <ul>
                <li>Assess airway, breathing, circulation</li>
                <li>Provide supplemental oxygen</li>
                <li>Reassess vital signs every 5 minutes</li>
                <li>Order appropriate antibiotics</li>
              </ul>
              <h4>Patient Information</h4>
            `}
          </HTML>
          <Card containerStyle={{ marginTop: 0, marginHorizontal: 15, paddingTop: 5, paddingBottom: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center', paddingTop: 10 }}>
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
        <Footer phaseIndex={ 1 } />
      </View>
    );
  }
}

          // <PatientWeight
          //   style={{ marginTop: 15 }}
          //   weight={ this.state.ptWeight }
          //   onChange={ this.handleWeightInput } />
const styles = createStyles();

export default ActivateSepsisPathwayScreen;