import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { WarnText, Footer, palette } from '../../common-components'
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
      <View style={ styles.container }>
        <ScrollView contentContainerStyle={ styles.contentContainer }>
          <WarnText>
            Use the ED Suspected Septic Shock pathway for ill appearing patients including HemOnc/BMT, Central Line Infection and Neonates.
          </WarnText>
          <HTML
            html={ initialAssessmentHtml }
            containerStyle={ styles.htmlContainer }
            tagsStyles={ tagsStyles }
            baseFontStyle={{ fontSize: 16 }}
            onLinkPress={ this.onLinkPress } />
        </ScrollView>
        <Footer>
          <Button
            title="Start"
            buttonStyle={ styles.startButton }
            onPress={ () => this.props.navigation.navigate('ActivateSepsisPathwayScreen') } />
        </Footer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginRight: 12,
    color: '#ffffff',
    fontSize: 18
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: palette.background,
  },
  contentContainer: {
    alignItems: 'stretch'
  },
  htmlContainer: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  startButton: {
    paddingVertical: 10,
    borderRadius: 5,
  },
});

const tagsStyles = {
  h4: { marginTop: 0, paddingBottom: 10, fontSize: 18 },
};

export default SepsisPathwayScreen;