import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { PathwayHeader, LinkButton, HTML, WarnText, StandardPathwayFooter } from '../../common-components';
import createStyles from '../../theme';

class SepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Septic Shock Pathway', { headerLeft: null });
  
  onLinkPress = (evt, href) => {
    if (href === '#sepsis-calc') {
      this.props.navigation.navigate('SepsisCalcScreen');
    } else if (href === '#map-goals') {
      this.props.navigation.navigate('MAPGoalsScreen');
    }
  }
  
  render() {
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
                <li>Hypotension (<a href="#map-goals">MAP &leq; 5% for age</a>)</li>
                <li>Tachycardia</li>
                <li>Poor perfusion</li>
                <li>Reduced urine output</li>
                <li>Tachypnea / new oxygen requirment</li>
                <li>Mental status changes</li>
              </ul>
            `}
          </HTML>
        </ScrollView>
        <StandardPathwayFooter
          title="Start"
          target="ActivateSepsisPathwayScreen"
          params={{ activePhase: 0 }} />
      </View>
    );
  }
}

const styles = createStyles();

export default SepsisPathwayScreen;