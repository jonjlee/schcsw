import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PathwayHeader, LinkButton, HTML, Footer } from '../../common-components';
import TimerBar from '../../TimerBar';
import createStyles from '../../theme';

class FollowupResusScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Step 3: 60 Minutes');

  render() {
    return (
      <View style={ styles.container }>
        <TimerBar duration={ 60 * 60 } />
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
        <Footer>
          <LinkButton title="ICU / Wards Admission Guidelines" target="SepsisAdmitScreen" />
        </Footer>
      </View>
    );
  }
}

const styles = createStyles();

export default FollowupResusScreen;