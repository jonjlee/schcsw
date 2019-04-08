import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PathwayHeader, LinkButton, HTML, ErrText, Footer } from '../../common-components'
import createStyles from '../../theme';

class ActivateSepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Activate Sepsis Pathway');
  
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
        <Footer>
          <LinkButton title="Start Step 1 (15 minutes)" target="InitialResusScreen" />
        </Footer>
      </View>
    );
  }
}

const styles = createStyles();

export default ActivateSepsisPathwayScreen;