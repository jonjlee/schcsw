// Row element with an icon that displays information for a timer from Timers.js
//
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { SectionHead, Button } from './common-components';
import Timers from './Timers';
import { theme } from './theme'

class TimerBar extends Component {
  constructor(props) {
    super(props);
    
    const id = (Math.floor(Math.random() * 90000) + 10000);
    this.state = {
      paused: this.props.timer && this.props.timer.paused,
      lapsed: 0,
    };
  }
  
  componentWillMount() {
    // take over handling the tick event for the underlying timer
    this.props.timer.onTick = this.onTick;
  }

  componentWillUnmount() {
    if (this.props.timer.onTick === this.onTick) {
      this.props.timer.onTick = null;
    }
  }

  onTick = () => {
    this.setState({ lapsed: this.props.timer.lapsed });
  }
  
  onPause = () => {
    // stop timer
    this.props.timer.pause();
    this.setState({ paused: true });
  }
  
  onStart = () => {
    this.props.timer.start();
    this.props.timer.onTick = this.onTick;
    this.setState({ paused: false });
  }
  
  render() {
    // Read timer info
    const expired = this.props.timer.expired;
    const paused = this.props.timer.paused;
    const display = this.props.timer.display();

    // Timer turns yellow when paused and red after duration passes
    const colors = {
      active: {
        background: theme.okBackground,
        text: theme.okText,
        border: theme.okBorder,
        highlight: theme.okHighlight,
      },
      paused: {
        background: theme.warnBackground,
        text: theme.warnText,
        border: theme.warnBorder,
        highlight: theme.warnHighlight,
      },
      expired: {
        background: theme.errBackground,
        text: theme.errText,
        border: theme.errBorder,
        highlight: theme.errHighlight,
      }
    };
    let color = colors.active;
    if (expired) {
      color = colors.expired;
    } else if (paused) {
      color = colors.paused;
    }
    
    // Row with text on the left, divider, time centered on the right with buttons below
    return (
      <View style={ [styles.container, { borderColor: color.border, backgroundColor: color.background }] }>
        <View style={ styles.iconContainer }>
          <Icon type='material' name='timer' size={ 36 } color={ color.text } />
        </View>
        <View style={ styles.infoContainer }>
          <Text style={ [styles.infoText, {color: color.text}] }>Started: { display.start }</Text>
          <Text style={ [styles.infoText, {color: color.text}] }>Expires: { display.end }</Text>
          <Text style={ [styles.infoText, {color: color.text}] }>Remaining: { display.remain }</Text>
        </View>
        <View style={ [styles.divider, { borderColor: color.highlight }] } />
        <View style={ styles.rightContainer}>
          <View style={ styles.timerContainer }>
            <View style={ styles.timerTextContainer }>
              <Text style={ [styles.timerText, {color: color.text}] }>{ display.lapsed }</Text>
            </View>
            <View style={ styles.toolbar }>
              <Button
                icon={{ name: paused ? 'play-arrow' : 'stop', color: color.text, size: theme.fontSizeLg }}
                buttonStyle={ [styles.button, { backgroundColor: color.background, borderColor: color.text }] }
                titleStyle={{ fontSize: theme.fontSizeSm }}
                onPress={ paused ? this.onStart : this.onPause } />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// Property types for <TimerBar>
TimerBar.propTypes = {
  timer: PropTypes.object.isRequired,
  onTick: PropTypes.func,
  onDone: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: theme.paddingXs,
    height: 85,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: theme.okBorder,
  },
  
  // Info panel to left
  infoContainer: {
    flex: 3.5,
    paddingHorizontal: theme.paddingSm,
    paddingVertical: theme.paddingSm,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  infoText: {
    color: 'white',
    fontSize: theme.fontSizeSm,
  },

  // Vertical divider in middle
  divider: {
    width: 1,
    marginVertical: theme.paddingSm,
    borderWidth: 1,
  },

  // Container to right align controls
  rightContainer: {
    paddingVertical: theme.paddingSm,
    paddingHorizontal: theme.paddingMd,
    flex: 3,
    alignItems: 'center',
  },
  
  // Container for icon, timer, and buttons
  timerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Container for icon and timer
  timerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: theme.paddingSm,
    marginRight: theme.paddingXs,
  },
  timerText: {
    color: 'white',
    fontSize: 30,
  },
  
  // Container for buttons
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 30, // 63 for two buttons,
  },
  button: {
    margin: 0,
    padding: 0,
    borderWidth: 1,
    width: 30,
    height: 25,
  },
});

export default TimerBar;