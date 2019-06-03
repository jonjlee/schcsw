import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { LinkButton, Footer as CommonFooter } from '../../common-components';
import Timers from '../../Timers';

// A footer with three buttons: prev, next, and a central button that is either 'Complete Step' or 'Back to Active Step'
const FooterComponent = (props) => {
  const { phaseIndex, navigation } = props;
  const activePhase = navigation.getParam('activePhase', 0);
  
  const current = phases[phaseIndex];
  const active = phases[activePhase];
  const prev = phases[phaseIndex-1] || null;
  const next = phases[phaseIndex+1] || null;
  const isActive = (phaseIndex <= 1 && activePhase <= 1) || (phaseIndex == activePhase);
  
  // <, >, and Back buttons
  const PrevButton = (
    <LinkButton
      buttonStyle={ styles.leftButton }
      icon={{ name: 'chevron-left', color: 'white' }}
      target={ prev && prev.screen } />);
  const NextButton = (
    <LinkButton
      buttonStyle={ styles.rightButton }
      icon={{ name: 'chevron-right', color: 'white' }}
      target={ next && next.screen } />);
  const BackButton = (
    <LinkButton
      icon={{ name: 'chevron-left', color: 'white' }}
      title="Back"
      target={ prev && prev.screen } />);

  // Center button returns to active step if not there. If at active step, call onGoPress().
  const GoButton = (
    <LinkButton
      buttonStyle={ prev ? styles.middleButton : styles.leftButton }
      title={ isActive ? current.btn : 'Back to Active Step' }
      target={ isActive ? next && next.screen : active.screen }
      onPress={ isActive ? () => onGoPress(navigation, current) : null }
    />);
  
  // Conditionally render buttons depending on if 1st, last, or middle step
  if (prev === null) {
    return (
      <CommonFooter>
        <View style={ styles.buttonsContainer }>
          <View style={{flex:6}}>{ GoButton }</View>
          <View style={{flex:1}}>{ NextButton }</View>
        </View>
      </CommonFooter>
    );
  } else if (next === null) {
    return (<CommonFooter>{ BackButton }</CommonFooter>);
  } else {
    return (
      <CommonFooter>
        <View style={ styles.buttonsContainer }>
          <View style={{flex:1}}>{ PrevButton }</View>
          <View style={{flex:5}}>{ GoButton }</View>
          <View style={{flex:1}}>{ NextButton }</View>
        </View>
      </CommonFooter>
    );
  }
}
export const Footer = withNavigation(FooterComponent);


// ---------------------------------
// Helpers
// ---------------------------------
const phases = [
  {
    screen: 'SepsisPathwayScreen',
    btn: 'Start',
  },
  {
    screen: 'ActivateSepsisPathwayScreen',
    btn: 'Start Step 1 (15 min)'
  },
  {
    screen: 'Sepsis1Screen',
    btn: 'Complete Step'
  },
  {
    screen: 'Sepsis2Screen',
    btn: 'Complete Step'
  },
  {
    screen: 'Sepsis3Screen',
    btn: 'Complete Step'
  },
  {
    screen: 'Sepsis4Screen',
    btn: 'Back'
  },
];

// Execute logic to transistion between active steps when "Step Complete" button is pressed.
const onGoPress = (navigation, phase) => {
  if (phase.screen === 'SepsisPathwayScreen') {
    if (navigation.state && navigation.state.params) {
      navigation.state.params.activePhase = 1;
    } else {
      navigation.state.params = { activePhase: 1 }
    }
  } else if (phase.screen === 'ActivateSepsisPathwayScreen') {
    // On pathway activation, start sepsis timer initially with 15 minutes.
    const timer = Timers.replace('sepsis', {
      duration: 30,
      notifyTitle: 'Sepsis Pathway',
      notifyBody: '15 minutes elapsed. Proceed to step 2.'
    });
    timer.start();
    navigation.state.params.activePhase = 2;
  } else if (phase.screen === 'Sepsis1Screen') {
    // Increase timer to 30 minutes from initial pathway activation, and advance to step 2
    const timer = Timers.get('sepsis');
    timer.changeDuration(120);
    timer.changeNotification('Sepsis Pathway', '30 minutes elapsed. Proceed to step 3.');
    navigation.state.params.activePhase = 3;
  } else if (phase.screen === 'Sepsis2Screen') {
    // Increase timer to 60 minutes from initial pathway activation, and advance to step 3
    const timer = Timers.get('sepsis');
    timer.changeDuration(5 * 60);
    timer.changeNotification('Sepsis Pathway', '60 minutes elapsed. Proceed to admission.');
    navigation.state.params.activePhase = 4;
  } else if (phase.screen === 'Sepsis3Screen') {
    // Stop timer and show admission criteria
    const timer = Timers.get('sepsis');
    timer.pause();
    navigation.state.params.activePhase = 5;
  }
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  leftButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    minHeight: 42,
  },
  middleButton: {
    borderRadius: 0,
    minHeight: 42,
  },
  rightButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    minHeight: 42,
  },
});
