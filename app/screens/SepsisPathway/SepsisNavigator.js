import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { LinkButton, Footer as CommonFooter } from '../../common-components';
import { theme } from '../../theme';
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
  const onStep1BeforeActive = (phaseIndex === 2 && activePhase < 2);
  
  // Left and right buttons are disabled at first and last steps
  const leftDisabled = (prev === null);
  const rightDisabled = (next === null);
  const goDisabled = (isActive && current.btn === null);
  const leftColor = leftDisabled ? theme.greyText : theme.button;
  const rightColor = rightDisabled ? theme.greyText : theme.button;
  
  // < and > buttons
  const PrevButton = (
    <LinkButton
      buttonStyle={ styles.leftButton }
      type="outline"
      disabled={ leftDisabled }
      icon={{ name: 'chevron-left', color: leftColor }}
      target={ prev && prev.screen } />);
  const NextButton = (
    <LinkButton
      buttonStyle={ styles.rightButton }
      type="outline"
      disabled={ rightDisabled }
      icon={{ name: 'chevron-right', color: rightColor }}
      target={ next && next.screen } />);

  // Center button returns to active step if not there. If at active step, call onGoPress().
  const GoButton = goDisabled ? null : (
    <LinkButton
      buttonStyle={ styles.middleButton }
      title={ isActive ? current.btn : 'Back to ' + active.title }
      type= { isActive ? 'solid' : 'outline' }
      target={ isActive ? next && next.screen : active.screen }
      onPress={ isActive ? () => onGoPress(navigation, current) : null } />);
    
  // If at Step 1, but active step is before Step 1, then make big button "Start Step 1",
  // which simulates button press from Activate screen
  const StartStep1 = (
    <LinkButton
      buttonStyle={ styles.middleButton }
      title={ "Start " + current.title }
      target={ current.screen }
      onPress={ () => onGoPress(navigation, prev) } />);
  
  // Render buttons
  const ActionButton = onStep1BeforeActive ? StartStep1 : GoButton;
  return (
    <CommonFooter>
      <View style={ styles.buttonsContainer }>
        <View>{ PrevButton }</View>
        <View style={{flex:1}}>{ ActionButton }</View>
        <View>{ NextButton }</View>
      </View>
    </CommonFooter>
  );
}
export const Footer = withNavigation(FooterComponent);


// ---------------------------------
// Helpers
// ---------------------------------
const phases = [
  {
    screen: 'SepsisPathwayScreen',
    title: 'Intro',
    btn: 'Start',
  },
  {
    screen: 'ActivateSepsisPathwayScreen',
    title: 'Activation Step',
    btn: 'Start Step 1 (15 min)',
  },
  {
    screen: 'Sepsis1Screen',
    title: 'Step 1',
    btn: 'Complete Step 1',
  },
  {
    screen: 'Sepsis2Screen',
    title: 'Step 2',
    btn: 'Complete Step 2',
  },
  {
    screen: 'Sepsis3Screen',
    title: 'Step 3',
    btn: 'Complete Step 3',
  },
  {
    screen: 'Sepsis4Screen',
    title: 'Step 4',
    btn: null,
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
    width: 42,
    height: 42,
    borderRadius: 21,
    padding: 0,
  },
  middleButton: {
    borderRadius: 21,
    minHeight: 42,
    marginHorizontal: 10,
  },
  rightButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    padding: 0,
  },
});
