import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { WarnText, palette } from '../../common-components'
import HTML from 'react-native-render-html';

const initialAssessmentHtml = `
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
`;

class SepsisPathwayScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Septic Shock Pathway',
      headerLeft: null,
      headerRight: (
        <Text
          style={ styles.header }
          onPress={() => { navigation.navigate('Pathways') }}>
            Exit
        </Text>
      )
    }
  };
  
  onLinkPress = (evt, href) => {
    if (href === '#sepsis-calc') {
      this.props.navigation.navigate('SepsisCalcScreen');
    } else if (href === '#map-goals') {
      this.props.navigation.navigate('MAPGoalsScreen');
    }
  }
  
  onStartPress = (evt) => {
    console.log('start')
  };
  
  render() {
    return (
      <ScrollView contentContainerStyle={ styles.container }>
        <WarnText>
          Use the ED Suspected Septic Shock pathway for ill appearing patients including HemOnc/BMT, Central Line Infection and Neonates.
        </WarnText>
        <HTML
          html={ initialAssessmentHtml }
          containerStyle={ styles.mainContent }
          tagsStyles={ tagsStyles }
          baseFontStyle={{ fontSize: 16 }}
          onLinkPress={ this.onLinkPress } />
        <View style={ styles.bottom }>
          <Divider style={{ height:1, backgroundColor: palette.lightGray, marginBottom: 10 }} />
          <Button
            title="Start"
            buttonStyle={ styles.startButton }
            onPress={ () => this.props.navigation.navigate('ActivateSepsisPathwayScreen') } />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginRight: 12,
    color: '#ffffff',
    fontSize: 18
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: palette.background,
    alignItems: "stretch"
  },
  mainContent: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  startButton: {
    paddingVertical: 10,
  }
});

const tagsStyles = {
  h4: { marginTop: 0, paddingBottom: 10 }
};

export default SepsisPathwayScreen;