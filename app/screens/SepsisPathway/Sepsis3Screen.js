import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PathwayHeader, SectionHead, Button, LinkButton, HTML, StandardPathwayFooter } from '../../common-components';
import { Card } from 'react-native-elements';
import Timers from '../../Timers';
import TimerBar from '../../TimerBar';
import createStyles from '../../theme';

const PHASE_NUM = 3;

class FollowupResusScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 3: 60 Minutes');
  
  constructor(props) {
    super(props);

    const activePhase = this.props.navigation.getParam('activePhase');
    this.state = {
      pending: activePhase === undefined || activePhase < PHASE_NUM,
      active: activePhase == PHASE_NUM,
      done: activePhase > PHASE_NUM,
    }
    this.timer = Timers.get('sepsis');
  }

  activate = () => {
    this.restartTimer();
    this.props.navigation.setParams({ activePhase: PHASE_NUM, startOnRender: false });
    this.setState({active: true, pending: false, done: false})
  }

  restartTimer = () => {
    this.timer = Timers.replace('sepsis', {
      duration: 60 * 60,
      notifyTitle: 'Sepsis Pathway',
      notifyBody: '60 minutes for step 3 expired. Proceed to next step.'
    });
    this.timer.start();
  }

  renderActiveCard = () => {
    if (this.state.active) {
      return (<TimerBar timer={ this.timer } />);
    } else if (this.state.pending) {
      return (
        <Card containerStyle={ styles.banner }>
          <View style={{flexDirection: 'row'}}>
            <SectionHead>Step Not Active</SectionHead>
            <Button title="Start Now" type="outline" onPress={ this.activate } />
          </View>
        </Card>
      );
    } else if (this.state.done) {
      return (
        <Card containerStyle={ styles.banner }>
          <View style={{flexDirection: 'row'}}>
            <SectionHead>Step Completed</SectionHead>
            <Button title="Restart" type="outline" onPress={ this.activate } />
          </View>
        </Card>
      );
    }
    return null;
  }

  render() {
    // the startOnRender flag indicates that this phase should
    // be automatically started when the user switches to it
    if (this.state.active && this.props.navigation.getParam('startOnRender')) {
      this.restartTimer();
      this.props.navigation.state.params.startOnRender = false;
    }

    return (
      <View style={ styles.container }>
        { this.renderActiveCard() }
        <ScrollView>
          <HTML onLinkPress={ () => this.props.navigation.navigate('MAPGoalsScreen') }>
            {`
              <h4>Initiate vasoactive/inotropic drips for Fluid Refactory Shock</h4>
              <ul>
                <li>Epinephrine for cold shock</li>
                <li>Norepinephrine for warm shock</li>
                <li>Titrate drips to <a href="#map-goals">resuscitation goals</a></li>
                <li>Consider broader antibiotic coverage</li>
              </ul>
              
              <h4>Bedside Huddle</h4>
              <ul>
                <li>ED, ICU, +/- Hospitalist</li>
              </ul>
              
              <h4>Respiratory Support</h4>
              <ul>
                <li>Consider ET intubation for ongoing respiratory distress or altered mental status</li>
              </ul>
            `}
          </HTML>
        </ScrollView>
        <StandardPathwayFooter
          prev="Sepsis2Screen"
          title="Show Admission Guidelines"
          target="Sepsis4Screen"
        />
      </View>
    );
  }
}

const styles = createStyles({
  banner: {
    marginHorizontal: 5,
  },
});

export default FollowupResusScreen;