import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Input } from 'react-native-elements';
import { PathwayHeader, LinkButton, HTML, ErrText, Button, PatientWeight } from '../../common-components'
import { Footer } from './SepsisNavigator';
import createStyles, { theme } from '../../theme';

class ActivateSepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Activate Sepsis Pathway');
  
  state = {
    ptWeight: this.props.navigation.getParam('ptWeight', ''),
    ptAgeUnits: this.props.navigation.getParam('ptAgeUnits', 'yr'),
    ptAge: this.props.navigation.getParam('ptAge', '')
  }
  
  handleWeightInput = (v) => {
    // update both navigator state and react state
    this.props.navigation.setParams({ptWeight: v});
    this.setState({ptWeight: v});
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView>
          <ErrText>
            Activate ED Sepsis Internal Response
          </ErrText>
          <HTML>
            {`
              <ul>
                <li>Assess airway, breathing, circulation</li>
                <li>Provide supplemental oxygen</li>
                <li>Reassess vital signs every 5 minutes</li>
                <li>Order appropriate antibiotics</li>
              </ul>
            `}
          </HTML>
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