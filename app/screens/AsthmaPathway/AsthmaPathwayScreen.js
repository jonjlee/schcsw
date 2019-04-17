import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button as RNEButton, Card, Slider, Icon } from 'react-native-elements';
import { PathwayHeader, SectionHead, Bullet, Button, Text, WarnText } from '../../common-components.js';
import TimerBar from '../../TimerBar';
import createStyles, { theme } from '../../theme';
import { debounce } from 'lodash';

class AsthmaPathwayScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Asthma Pathway', { headerLeft: null });

  constructor(props) {
    super(props);
    this.state = {
      RS0Hour: {score: 1},
      RS1Hour: {score: 1},
      RS2Hour: {score: 1},
      RS3Hour: {score: 1},
      RS4Hour: {score: 1},
      activePhase: 1,
      phaseTimerStarted: false,
    }
  }
  
  onStartTimerPress = (phase) => {
    // Show timer and scroll to bottom of page
    this.setState({ phaseTimerStarted: true });
    setTimeout(this.scrollView.scrollToEnd, 0);
  }

  onResetPress = () => {
    this.setState({ phaseTimerStarted: false });
  }

  nextPhase = () => {
    this.setState({
      activePhase: this.state.activePhase+1,
      phaseTimerStarted: false,
    }, () => {
      // after render completed, scroll to bottom to reveal new phase
      setTimeout(this.scrollView.scrollToEnd, 0);
    })
  }

  renderPhase0 = () => {
    const conditionalGreyText = this.state.activePhase > 1 ? { color: theme.greyText } : null;

    // Phase 0: give O2 and exclusion criteria
    return (
      <Card key={0} title="TRIAGE" titleStyle={ [styles.phaseHeader, conditionalGreyText] }>
        <Bullet style={ conditionalGreyText }>Administer supplemental 02 to keep saturation > 90%</Bullet>
        <Bullet style={ conditionalGreyText }>
          <Text style={ [{ fontWeight: 'bold', color: theme.warnTextColored }, conditionalGreyText] }>Exclude</Text><Text style={ conditionalGreyText }>: other primary diagnoses, e.g. PNA, bronchiolitis, croup</Text>
        </Bullet>
        <Bullet style={ conditionalGreyText }>
          <Text style={ [{ fontWeight: 'bold', color: theme.warnTextColored }, conditionalGreyText] }>Exclude</Text><Text style={ conditionalGreyText }>: chronic conditions, e.g. cystic fibrosis, restrictive lung disease, BPD, cardiac diseases, airway issues (vocal cord paralysis, tracheomalacia, trach dependent), medically complex children, immune disorders, sickle cell</Text>
        </Bullet>
      </Card>
    );
  }
  
  renderGenericPhase = ({ phase, title, rsLabel, score, rsStateVar, bulletsTitle, bullets }) => {
    const visible = (this.state.activePhase >= phase);
    const timerActive = (this.state.activePhase === phase) && this.state.phaseTimerStarted;
    const greyedOut = (this.state.activePhase > phase);
    const conditionalGreyText = greyedOut ? { color: theme.greyText } : null;
    const conditionalGreyBkg = greyedOut ? { backgroundColor: theme.greyText } : null;
    const conditionalGreyBorder = greyedOut ? { borderColor: theme.greyText } : {};

    // The "RS Calculator" button
    const RSCalcButton = (props) =>
      <View style={ styles.RSCalcButtonContainer }>
        <Button
          title="Score Calculator"
          type="outline"
          buttonStyle={ conditionalGreyBorder }
          titleStyle={ conditionalGreyText }
          onPress={ () => this.props.navigation.navigate(
            'RSCalcScreen',
            {
              // Initialize calculator with current data from our state
              data: this.state[props.stateVar],
              onAccept: (data) => {
                // Save data from calculator to our state variable (e.g. setState({'RS0Hour': data}) )
                this.setState({[props.stateVar]: data})
              }
            })
          }
        />
      </View>

    if (!visible) {
      return null;
    }

    return (
      <Card key={phase} title={ title } titleStyle={ [styles.phaseHeader, conditionalGreyText] }>
        <Card containerStyle={ styles.phaseCard }>

          { /* Respiratory score label and slider */ }
          <View>
            <View style={ styles.labelContainer }>
              <Text style={ conditionalGreyText }>{ rsLabel + ': ' + score }</Text>
            </View>
            <View style={ styles.controlContainer }>
              { /* Minimum value label */ }
              <Text style={ conditionalGreyText }>1</Text>
              { /* Slider control */ }
              <View style={ styles.sliderContainer }>
                <Slider
                  minimumValue={1} maximumValue={12} step={1}
                  thumbTintColor={ greyedOut ? theme.greyText : theme.button }
                  value={ score }
                  onValueChange={ v => this.setState({ [rsStateVar]: {score: v} }) }/>
              </View>
              { /* Max value label */ }
              <Text style={ conditionalGreyText }>12</Text>
            </View>
          </View>

          { /* RS Calculator button */ }
          <RSCalcButton style={ conditionalGreyBkg } stateVar={ rsStateVar } />
        </Card>
        
        { /* Actions to perform given RS */ }
        <Card title={ bulletsTitle } containerStyle={ styles.phaseCard } titleStyle={ conditionalGreyText }>
          {
            bullets.map((text, i) => <Bullet key={i} style={ conditionalGreyText }>{ text }</Bullet>)
          }
        </Card>

        { /* Start Timer button or timer bar */ }
        <View style={{ alignItems: 'stretch', marginTop: 10 }}>
          {
            timerActive ?
              <View>
                <TimerBar duration={ 20 } onDone={ this.nextPhase } notifyTitle="Asthma Pathway" notifyBody={ 'Hour ' + phase + ' complete. Rescore patient.' } />
                {(phase < 4 ?
                  <View style={ styles.timerToolbar }>
                    <Button title="Reset" type="outline" containerStyle={{ flex: 1 }} buttonStyle={ styles.timerToolbarButton } onPress={ this.onResetPress } />
                    <Button title="Skip" type="outline" containerStyle={{ flex: 1 }} buttonStyle={ styles.timerToolbarButton } onPress={ this.nextPhase } />
                  </View> :
                  null)}
              </View> :
            !greyedOut ?
              <Button title="Start Timer" onPress={ () => this.onStartTimerPress(phase) } /> :
              null
          }
        </View>
      </Card>
    );
  }
  
  renderPhase1 = () => {
    const phase = 1;
    let bulletsTitle = null;
    let bullets = null;
    if (this.state.RS0Hour.score <= 5) {
      bulletsTitle = 'RS 1 to 5';
      bullets = ['Albuterol MDI 8 puffs',
        'Dexamethasone 0.6 mg/kg x1 (16mg max)',
        'Rescore after 60 minutes'];
    } else if (this.state.RS0Hour.score <= 9) {
      bulletsTitle = 'RS 6 to 9';
      bullets = ['Albuterol continuous neb 20 mg x 1hr',
        'Ipratroprium neb 1.5 mg (0.75 mg for <2 yo)',
        'Dexamethasone 0.6 mg/kg x1 (16 mg max)',
        'Rescore after 60 minutes'];
    } else {
      bulletsTitle = 'RS 10 to 12';
      bullets = ['Albuterol continuous neb 20 mg x 1hr',
        'Ipratropium neb 1.5 mg (0.75 mg for <2 yo)',
        'Dexamethasone 0.6 mg/kg x1 (16 mg max)',
        'Magnesium Sulfate IV 50 mg/kg x1 (max 2 grams) for age >2 yo',
        'Rescore after 60 minutes'];
    }
    
    return this.renderGenericPhase({
      phase: phase,
      title: 'INITIATION',
      rsLabel: 'Respiratory Score on Arrival',
      score: this.state['RS0Hour'].score,
      rsStateVar: 'RS0Hour',
      bulletsTitle: bulletsTitle,
      bullets: bullets
    });
  }
  
  renderPhase2 = () => {
    const phase = 2;
    let bulletsTitle = null;
    let bullets = null;
    if (this.state.RS1Hour.score <= 4) {
      bulletsTitle = 'RS 1 to 4';
      bullets = ['If first hour RS 1-5, discharge', 'If first hour RS 6-9, observe for 1 hour', 'If first hour RS 10-12, observe for 2 hours', 'Rescore after 60 minutes'];
    } else if (this.state.RS1Hour.score <= 9) {
      bulletsTitle = 'RS 5 to 9';
      bullets = ['Albuterol MDI 8 puffs', 'Rescore after 60 minutes'];
    } else {
      bulletsTitle = 'RS 10 to 12';
      bullets = ['Albuterol continuous neb 20 mg/hr', 'Ipratroprium neb 1.5 mg (0.75 mg for <2 yo)- if not already given', 'Magnesium Sulfate IV 50 mg/kg x1 (max 2 grams) for age ≥ 2 y.o- if not already given', 'Place bed request', 'Rescore after 60 minutes'];
    }
    
    return this.renderGenericPhase({
      phase: phase,
      title: 'AFTER 1 HOUR',
      rsLabel: 'Respiratory Score After 1 Hour',
      score: this.state['RS1Hour'].score,
      rsStateVar: 'RS1Hour',
      bulletsTitle: bulletsTitle,
      bullets: bullets,
    });
  }
  
  renderPhase3 = () => {
    const phase = 3;
    const phaseVisible = (this.state.activePhase >= (phase-1));
    if (!phaseVisible) {
      return null;
    }

    let bulletsTitle = null;
    let bullets = null;
    if (this.state.RS2Hour.score <= 4) {
      bulletsTitle = 'RS 1 to 4';
      bullets = ['Discharge', 'RS 1-4 for minimum of 1 hour', '(Patients with an initial RS of 10-12 should be observed for 2 hours prior to discharge)', 'Shared decision making in hour 3 for RS 5-8', 'Tolerating oral intake', 'Adequate family teaching', 'Follow-up established'];
    } else if (this.state.RS2Hour.score <= 8) {
      bulletsTitle = 'RS 5 to 8';
      bullets = ['Albuterol MDI 8 puffs',
        'Give ipratropium neb 1.5 mg (0.75 mg for <2 yo) if not given',
        'Determine disposition',
        'Rescore after 60 minutes'];
    } else {
      bulletsTitle = 'RS 9 to 12';
      bullets = ['ICU Consult for RS 10-12', 'Albuterol continuous neb 20 mg/hr', 'Manesium Sulfate IV 50 mg/kg x1 (max 2 grams) for age ≥ 2 y.o. if not given', 'Admit to Inpatient / ICU', 'If undecided on Inpatient or ICU, move on to 4th hour', 'Rescore after 60 minutes'];
    }
    
    return this.renderGenericPhase({
      phase: phase,
      title: 'AFTER 2 HOURS',
      rsLabel: 'Respiratory Score After 2 Hours',
      score: this.state['RS2Hour'].score,
      rsStateVar: 'RS2Hour',
      bulletsTitle: bulletsTitle,
      bullets: bullets,
    });
  }
  
  renderPhase4 = () => {
    const phase = 4;
    const phaseVisible = (this.state.activePhase >= (phase-1));
    if (!phaseVisible) {
      return null;
    }

    let bulletsTitle = null;
    let bullets = null;
    if (this.state.RS3Hour.score <= 8) {
      bulletsTitle = 'RS 1 to 8';
      bullets = ['Determine disposition'];
    } else if (this.state.RS3Hour.score <= 10) {
      bulletsTitle = 'RS 9 to 10';
      bullets = ['Albuterol continuous neb 20 mg/hr x 1 hr',
        'Rescore after 60 minutes',
        'Huddle with: Floor Charge Nurse, Floor Team, and consider ICU consult (if not already done)',
        'Admit to inpatient or ICU'];
    } else {
      bulletsTitle = 'RS 11 to 12';
      bullets = ['Admit to ICU'];
    }
    
    return this.renderGenericPhase({
      phase: phase,
      title: 'AFTER 3 HOURS',
      rsLabel: 'Respiratory Score After 3 Hours',
      score: this.state['RS3Hour'].score,
      rsStateVar: 'RS3Hour',
      bulletsTitle: bulletsTitle,
      bullets: bullets,
    });
  }
  
  render() {
    return (
      <View style={ styles.container }>
        <ScrollView ref={ref => this.scrollView = ref}>
          {[
            this.renderPhase0(),
            this.renderPhase1(),
            this.renderPhase2(),
            this.renderPhase3(),
            this.renderPhase4(),
          ]}
        </ScrollView>
      </View>
    );
  }
}

const styles = createStyles({
  phaseHeader: {
    fontSize: theme.fontSizeLg,
    color: theme.phaseHeader,
  },
  phaseCard: {
    marginHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
  },
  labelContainer: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
  },
  controlContainer: {
    flex: 2,
    flexDirection: 'row',
    marginLeft: theme.paddingSm,
    alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
    paddingHorizontal: theme.paddingSm,
  },
  RSCalcButtonContainer: {
    marginTop: theme.paddingSm,
    alignItems: 'center'
  },
  RSCalcButton: {
    paddingVertical: 3,
    paddingHorizontal: theme.paddingSm,
    backgroundColor: theme.button,
  },
  RSCalcButtonTitle: {
    fontSize: theme.fontSizeMd,
  },
  timerToolbar: {
    flexDirection: 'row',
    marginTop: theme.paddingXs,
  },
  timerToolbarButton: {
    marginHorizontal: theme.paddingSm,
    paddingVertical: 3,
  },
});

export default AsthmaPathwayScreen;