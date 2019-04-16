import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Slider, Icon } from 'react-native-elements';
import { PathwayHeader, SectionHead, Bullet, Button, Text, WarnText } from '../../common-components.js';
import TimerBar from '../../TimerBar';
import createStyles, { theme } from '../../theme';
import { debounce } from 'lodash';

class AsthmaPathwayScreen extends Component {
  static navigationOptions = ({ navigation }) => PathwayHeader(navigation, 'Asthma Pathway', { headerLeft: null });

  constructor(props) {
    super(props);
    this.state = {
      RS0Hour: {score: 0},
      RS1Hour: {score: 0},
      RS2Hour: {score: 0},
      RS3Hour: {score: 0},
      RS4Hour: {score: 0},
      timer0State: 0,
      activePhase: 0,
    }
    
    // Use debounce to prevent slow slider response caused by repeated setState().
    this.setRS = debounce(this.setState, 20);
  }
  
  render() {
    const headerColor0Hour = this.state.timer0State == 2 ? theme.greyText : theme.phaseHeader;
    const color0Hour = this.state.timer0State == 2 ? theme.greyText : theme.text;

    // The "RS Calculator" button
    const RSCalcButton = (props) =>
      <View style={ styles.RSCalcButtonContainer }>
        <Button
          title="Respiratory Score Calculator"
          buttonStyle={ styles.RSCalcButton }
          titleStyle={ styles.RSCalcButtonTitle }
          onPress={ ()=>this.props.navigation.navigate(
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
    
    return (
      <View style={ styles.container }>
        <ScrollView>
          <Card title="TRIAGE" titleStyle={ styles.phaseHeader }>
            <Bullet>Administer supplemental 02 to keep saturation > 90%</Bullet>
            <Bullet>
              <Text style={{ fontWeight: 'bold', color: theme.warnTextColored }}>Exclude</Text><Text>: other primary diagnoses, e.g. PNA, bronchiolitis, croup</Text>
            </Bullet>
            <Bullet>
              <Text style={{ fontWeight: 'bold', color: theme.warnTextColored }}>Exclude</Text><Text>: chronic conditions, e.g. cystic fibrosis, restrictive lung disease, BPD, cardiac diseases, airway issues (vocal cord paralysis, tracheomalacia, trach dependent), medically complex children, immune disorders, sickle cell</Text>
            </Bullet>
          </Card>
          <Card title="INITIATION" titleStyle={ [styles.phaseHeader, { color: headerColor0Hour }] }>
            <Card containerStyle={ [styles.phaseCard, {marginTop: 0}] }>
              <View>
                <View style={ styles.labelContainer }>
                  <Text>Respiratory Score on Arrival: { this.state.RS0Hour.score }</Text>
                </View>
                <View style={ styles.controlContainer }>
                  <Text>0</Text>
                  <View style={ styles.sliderContainer }>
                    <Slider
                      minimumValue={0} maximumValue={12} step={1}
                      thumbTintColor={ theme.button }
                      value={ this.state.RS0Hour.score }
                      onValueChange={ v => this.setRS({ RS0Hour: {score: v} }) }/>
                  </View>
                  <Text>12</Text>
                </View>
              </View>
              <RSCalcButton stateVar="RS0Hour" />
            </Card>
            <Card containerStyle={ styles.phaseCard } >
              <Bullet>Albuterol continuous neb 20mg x 1hr</Bullet>
              <Bullet>Ipratropium neb 1.5mg</Bullet>
              <Bullet>Dexamethasone 0.6mg/kg x1 (16mg max)</Bullet>
              <Bullet>Magnesium Sulfate IV 50mg/kg x1 (2g max) for age > 2yo</Bullet>
              <Bullet>Rescore after 60 minutes</Bullet>
            </Card>
            <View style={{ alignItems: 'stretch', marginTop: 10 }}>
              {
                this.state.timer0State == 0 ?
                  <Button title="Start 60 Minute Timer" onPress={ () => this.setState({ timer0State: 1 }) } /> :
                  (this.state.timer0State == 1 ?
                    <TimerBar duration={ 60 * 60 } onDone={ () => this.setState({ timer0State: 2 }) } /> :
                    <View style={{ flex: 1, alignItems: 'center' }}><Text style={{ fontSize: theme.fontSizeLg, color: theme.errTextColored }}>Continue to next step</Text></View>)
              }
            </View>
          </Card>
          
          <Card title="AFTER 1 HOUR" titleStyle={ styles.phaseHeader }>
            <Card containerStyle={ [styles.phaseCard, {marginTop: 0}] }>
              <View>
                <View style={ styles.labelContainer }>
                  <Text>Respiratory Score After 1 Hour: { this.state.RS1Hour.score }</Text>
                </View>
                <View style={ styles.controlContainer }>
                  <Text>0</Text>
                  <View style={ styles.sliderContainer }>
                    <Slider
                      minimumValue={0} maximumValue={12} step={1}
                      thumbTintColor={ theme.button }
                      value={ this.state.RS1Hour.score }
                      onValueChange={ v => this.setState({ RS1Hour: {score: v} }) }/>
                  </View>
                  <Text>12</Text>
                </View>
              </View>
              <RSCalcButton />
            </Card>
            <Card title="RS 9-12" containerStyle={ styles.phaseCard } >
              <Bullet>Albuterol continuous neb 20mg x 1hr</Bullet>
              <Bullet>Ipratropium neb 1.5mg- if not already given</Bullet>
              <Bullet>Magnesium Sulfate IV 50mg/kg x1 (2g max) for age > 2yo- if not already given</Bullet>
              <Bullet>Place bed request</Bullet>
              <Bullet>Rescore after 60 minutes</Bullet>
            </Card>
            <View style={{ alignItems: 'stretch', marginTop: 10 }}>
              <Button title="Start 60 Minute Timer" />
            </View>
          </Card>

          <Card title="AFTER 2 HOURS" titleStyle={ styles.phaseHeader }>
            <Card containerStyle={ [styles.phaseCard, {marginTop: 0}] }>
              <View>
                <View style={ styles.labelContainer }>
                  <Text>Respiratory Score After 2 Hours: { this.state.RS2Hour.Score }</Text>
                </View>
                <View style={ styles.controlContainer }>
                  <Text>0</Text>
                  <View style={ styles.sliderContainer }>
                    <Slider
                      minimumValue={0} maximumValue={12} step={1}
                      thumbTintColor={ theme.button }
                      value={ this.state.RS2Hour.score }
                      onValueChange={ v => this.setState({ RS2Hour: {score: v} }) }/>
                  </View>
                  <Text>12</Text>
                </View>
              </View>
              <RSCalcButton />
            </Card>
            <Card title="RS 9-12" containerStyle={ styles.phaseCard } >
              <Bullet>Albuterol continuous neb 20mg x 1hr</Bullet>
              <Bullet>Ipratropium neb 1.5mg- if not already given</Bullet>
              <Bullet>Magnesium Sulfate IV 50mg/kg x1 (2g max) for age > 2yo- if not already given</Bullet>
              <Bullet>Place bed request</Bullet>
              <Bullet>Rescore after 60 minutes</Bullet>
            </Card>
            <View style={{ alignItems: 'stretch', marginTop: 10 }}>
              <Button title="Start 60 Minute Timer" />
            </View>
          </Card>

          <Card title="AFTER 3 HOURS" titleStyle={ styles.phaseHeader }>
            <Card containerStyle={ [styles.phaseCard, {marginTop: 0}] }>
              <View>
                <View style={ styles.labelContainer }>
                  <Text>Respiratory Score After 3 Hours: { this.state.RS3Hour.score }</Text>
                </View>
                <View style={ styles.controlContainer }>
                  <Text>0</Text>
                  <View style={ styles.sliderContainer }>
                    <Slider
                      minimumValue={0} maximumValue={12} step={1}
                      thumbTintColor={ theme.button }
                      value={ this.state.RS3Hour.score }
                      onValueChange={ v => this.setState({ RS3Hour: {score: v} }) }/>
                  </View>
                  <Text>12</Text>
                </View>
              </View>
              <RSCalcButton />
            </Card>
            <Card title="RS 9-12" containerStyle={ styles.phaseCard } >
              <Bullet>Albuterol continuous neb 20mg x 1hr</Bullet>
              <Bullet>Ipratropium neb 1.5mg- if not already given</Bullet>
              <Bullet>Magnesium Sulfate IV 50mg/kg x1 (2g max) for age > 2yo- if not already given</Bullet>
              <Bullet>Place bed request</Bullet>
              <Bullet>Rescore after 60 minutes</Bullet>
            </Card>
            <View style={{ alignItems: 'stretch', marginTop: 10 }}>
              <Button title="Start 60 Minute Timer" />
            </View>
          </Card>

          <Card title="AFTER 4 HOURS" titleStyle={ styles.phaseHeader }>
            <Card containerStyle={ [styles.phaseCard, {marginTop: 0}] }>
              <View>
                <View style={ styles.labelContainer }>
                  <Text>Respiratory Score After 4 Hours: { this.state.RS4Hour.score }</Text>
                </View>
                <View style={ styles.controlContainer }>
                  <Text>0</Text>
                  <View style={ styles.sliderContainer }>
                    <Slider
                      minimumValue={0} maximumValue={12} step={1}
                      thumbTintColor={ theme.button }
                      value={ this.state.RS4Hour.score }
                      onValueChange={ v => this.setState({ RS4Hour: {score: v} }) }/>
                  </View>
                  <Text>12</Text>
                </View>
              </View>
              <RSCalcButton />
            </Card>
            <Card title="RS 9-12" containerStyle={ styles.phaseCard } >
              <Bullet>Albuterol continuous neb 20mg x 1hr</Bullet>
              <Bullet>Ipratropium neb 1.5mg- if not already given</Bullet>
              <Bullet>Magnesium Sulfate IV 50mg/kg x1 (2g max) for age > 2yo- if not already given</Bullet>
              <Bullet>Place bed request</Bullet>
              <Bullet>Rescore after 60 minutes</Bullet>
            </Card>
            <View style={{ alignItems: 'stretch', marginTop: 10 }}>
              <Button title="Start 60 Minute Timer" />
            </View>
          </Card>
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
});

export default AsthmaPathwayScreen;