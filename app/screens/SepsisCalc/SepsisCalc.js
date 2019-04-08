import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch } from 'react-native'
import { palette } from '../../common-components'
import HTML from 'react-native-render-html';

class SepsisCalcScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '',
      headerLeft: null,
      headerRight: (
        <Text
          style={ styles.header }
          onPress={() => { navigation.pop() }}>
            Done
        </Text>
      )
    }
  };
  
  static descriptionHtml = `
    <div><h4>Sepsis Score Calculator</h4></div>
    <p>Adapted from the Pediatric septic shock collaborative patient identification tool. Currently validated for ED use only</p>`
    
  constructor(props) {
    super(props);
    
    this.state = {
      highRisk: false,
      vitalsAbnl: false,
      capRefillAbnl: false,
      mentalStatusAbnl: false,
      hrAbnl: false,
      skinAbnl: false
    }
  }

  renderOption(text, stateVar) {
    return (
      <View style={ styles.optionRow }>
        <Text style={ styles.optionText }>{ text }</Text>
        <View style={ styles.optionValContainer }>
          <Switch
            style={ styles.optionVal }
            onValueChange={ value => this.setState({ [stateVar]: value }) }
            value={ this.state[stateVar] } />
        </View>
      </View>
    );
  }

  render() {
    const score = this.state.highRisk + this.state.vitalsAbnl + this.state.capRefillAbnl + this.state.mentalStatusAbnl + this.state.hrAbnl + this.state.skinAbnl;
    return (
      <View style={ styles.container }>
        <ScrollView contentContainerStyle={ styles.contentContainer }>
          <HTML
            tagsStyles={ tagsStyles }
            baseFontStyle={{ fontSize: 16 }}
            html={ SepsisCalcScreen.descriptionHtml } />
  
          <View style={ styles.optionsContainer }>
            { this.renderOption('High risk condition (immunocompromised/central line)', 'highRisk') }
            { this.renderOption('Vital sign abnormality for age (temperature, hypotension, tachycardia, tachypnea)', 'vitalsAbnl') }
            { this.renderOption('Abnormal capillary refill', 'capRefillAbnl') }
            { this.renderOption('Abnormal mental status', 'mentalStatusAbnl') }
            { this.renderOption('Abnormal pulse', 'hrAbnl') }
            { this.renderOption('Abnormal skin exam', 'skinAbnl') }
          </View>
        </ScrollView>
        <View style={ styles.footer }>
          <Text style={ styles.scoreText }>Sepsis Score: { score }</Text>
        </View>
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
  },
  contentContainer: {
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.footer
  },
  optionsContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55
  },
  optionText: {
    paddingRight: 10,
    flex: 4,
    fontSize: 16,
    color: palette.text
  },
  optionValContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  optionVal: {
    flex: 1,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
  },
  score: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: palette.footer
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});

const tagsStyles = {
  div: {
    textAlign: 'center'
  },
  h4: {
    marginTop: 0,
    paddingBottom: 5,
    fontSize: 18,
  }
};

export default SepsisCalcScreen;