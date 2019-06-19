import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PathwayHeader, LinkButton, HTML, ErrText, Button } from '../../common-components'
import { Footer } from './SepsisNavigator';
import createStyles, { theme } from '../../theme';

class ActivateSepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Activate Sepsis Pathway');
  
  render() {
    const navigation = this.props.navigation;
    const weight = navigation.getParam('ptWeight', '');
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
            `}
          </HTML>
        </ScrollView>
        <Footer phaseIndex={ 1 } />
      </View>
    );
  }
}

const styles = createStyles({
});

export default ActivateSepsisPathwayScreen;