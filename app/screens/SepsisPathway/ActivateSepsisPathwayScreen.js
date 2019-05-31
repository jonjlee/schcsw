import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PathwayHeader, LinkButton, HTML, ErrText, PatientWeight, StandardPathwayFooter } from '../../common-components'
import createStyles from '../../theme';

class ActivateSepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Activate Sepsis Pathway');
  
  state = {
    ptWeight: this.props.navigation.getParam('ptWeight', ''),
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
          <PatientWeight
            style={{ marginTop: 15 }}
            weight={ this.state.ptWeight }
            onChange={ this.handleWeightInput } />
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
        <StandardPathwayFooter
          prev="SepsisPathwayScreen"
          title="Activate Step 1 (15 minutes)"
          target="Sepsis1Screen"
          params={{ activePhase: 1, startOnRender: true }}
        />
      </View>
    );
  }
}

const styles = createStyles();

export default ActivateSepsisPathwayScreen;