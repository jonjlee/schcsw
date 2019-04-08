import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch } from 'react-native'
import createStyles, { padding, fonts, theme } from '../../theme'
import { HTML, Footer } from '../../common-components';

class SepsisCalcScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '',
      headerLeft: null,
      headerRight: (
        <Text style={ styles.headerText } onPress={() => { navigation.pop() }}>
          Done
        </Text>
      )
    }
  };
  
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
        <ScrollView>
          <HTML>
            {`
              <div class="centered"><h4>Sepsis Score Calculator</h4></div>
              <p>Adapted from the Pediatric septic shock collaborative patient identification tool. Currently validated for ED use only.</p>
            `}
          </HTML>
  
          <View style={ styles.optionsContainer }>
            { this.renderOption('High risk condition (immunocompromised/central line)', 'highRisk') }
            { this.renderOption('Vital sign abnormality for age (temperature, hypotension, tachycardia, tachypnea)', 'vitalsAbnl') }
            { this.renderOption('Abnormal capillary refill', 'capRefillAbnl') }
            { this.renderOption('Abnormal mental status', 'mentalStatusAbnl') }
            { this.renderOption('Abnormal pulse', 'hrAbnl') }
            { this.renderOption('Abnormal skin exam', 'skinAbnl') }
          </View>
        </ScrollView>
        <View style={ styles.centeredFooter }>
          <Text style={ styles.scoreText }>Sepsis Score: { score }</Text>
        </View>
      </View>
    );
  }
}

const styles = createStyles({
  centeredFooter: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.footer,
  },
  optionsContainer: {
    padding: padding.sm,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55
  },
  optionText: {
    paddingRight: padding.sm,
    flex: 4,
    fontSize: fonts.md,
    color: theme.text,
  },
  optionValContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  optionVal: {
    flex: 1,
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }]
  },
  scoreText: {
    fontSize: fonts.lg,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default SepsisCalcScreen;