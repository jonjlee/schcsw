// Row element with an icon and an active timer
//
import React, { Component } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Notifications } from 'expo';
import { Button } from './common-components';
import { format, addSeconds, differenceInSeconds } from 'date-fns';
import { theme } from './theme'

class TimerBar extends Component {
  constructor(props) {
    super(props);
    
    // appState: used to track when app goes to background
    // paused: is timer running or paused
    // lapsed: number of seconds since timer started
    // duration: number of seconds to set timer for
    // expired: has timer run for duration number of seconds
    // start: Date() of when timer was started
    // end: calculated Date() of when timer should be done
    this.state = {
      appState: {state: AppState.currentState, time: new Date()},
      paused: true,
      lapsed: 0,
      duration: this.props.duration || 0,
      expired: false,
      start: null,
      end: null,
    };
  }

  componentWillMount() {
    // start timer automatically
    this.onReset();
    this.onStart();
    AppState.addEventListener('change', this.onAppStateChange);
  }
  
  componentWillUnmount() {
    // Cancel underlying timer and notification when component destroyed
    clearInterval(this.timerId);
    Notifications.cancelScheduledNotificationAsync(this.notificationId);
    AppState.removeEventListener('change', this.onAppStateChange);
  }
  
  scheduleNotification = async (tm, title, body) => {
    this.notificationId = await Notifications.scheduleLocalNotificationAsync(
      {
        title: title,
        body: body,
        android: { sound: true },
        ios: { sound: true },
      },
      { time: tm },
    );
  }

  tick = () => {
    this.setState({ lapsed: this.state.lapsed + 1 });
    
    // Trigger expire event if seconds lapsed equals set timer duration, and not already expired
    if (this.state.duration > 0 && (this.state.lapsed >= this.state.duration) && !this.state.expired) {
      this.onExpire();
    }
  }
  
  formatLapsed = (numSecs) => {
    if (numSecs < 0) {
      return '--'
    }
    
    const hr = Math.floor(numSecs/60/60);
    const min = Math.floor((numSecs % 3600) /60);
    const sec = numSecs % 60;
    
    // if >= 1 hour, format H:MM:SS, otherwise M:SS
    const pad = (n) => (n < 10 ? '0' : '') + n;
    const hrStr = (hr > 0 ? (hr + ':') : '');
    const minStr =(hr > 0 ? pad(min) : min) + ':';
    const secStr = pad(sec)
    return hrStr + minStr + secStr;
  }
  
  onAppStateChange = (nextAppState) => {
    // detect when app is brought back to foreground
    if (
      this.state.appState.state.match(/inactive|background/) &&
      nextAppState === 'active' &&
      !this.state.paused
    ) {
      // update our lapsed counter if timer is active
      this.setState({ lapsed: this.state.lapsed + differenceInSeconds(new Date(), this.state.appState.time) });
    }
    this.setState({ appState: {state: nextAppState, time: new Date()} });
  };
  
  onPause = () => {
    // stop timer
    this.timerId = clearInterval(this.timerId);
    this.setState({ paused: true });

    // cancel notification
    if (this.notificationId) {
      Notifications.cancelScheduledNotificationAsync(this.notificationId);
    }
  }
  
  onStart = () => {
    // Calculate end time based on number of seconds remaining
    const start = this.state.start || new Date();
    const duration = this.state.duration;
    const remaining = this.state.duration - this.state.lapsed;
    const end = (duration > 0 && remaining >= 0) ?
      addSeconds(new Date(), remaining) :
      this.state.end;

    // Calculate end time
    this.setState({
      paused: false,
      start: start,
      end: end,
    });

    // Schedule notification to occur if requested
    if (this.props.notifyTitle || this.props.notifyBody) {
      this.scheduleNotification(end, this.props.notifyTitle, this.props.notifyBody);
    }

    // Call tick() every second
    this.timerId = setInterval(this.tick.bind(this), 1000);
  }
  
  onReset = () => {
    // Reset start time and number of seconds lapsed
    this.setState({
      lapsed: 0,
      start: null,
      end: null,
      expired: false,
    });
  }
  
  onExpire = () => {
    // let parent know timer finished
    this.setState({expired: true});
    if (this.props.onDone) {
      this.props.onDone();
    }
  }

  render() {
    // Convert start, end, and timer to readable strings
    const started = this.state.start !== null;
    const startStr = this.state.start ? format(this.state.start, 'h:mma') : '--';
    const endStr = (this.state.end && !this.state.paused) ? format(this.state.end, 'h:mma') : '--';
    const remainStr = this.state.duration > 0 ? this.formatLapsed(this.state.duration - this.state.lapsed) : '';
    const timeStr = this.formatLapsed(this.state.lapsed);
    const durationStr = this.formatLapsed(this.state.duration);

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
    if (this.state.expired) {
      color = colors.expired;
    } else if (this.state.paused) {
      color = colors.paused;
    }
    
    // Row with text on the left, divider, time centered on the right with buttons below
    return (
      <View style={ [styles.container, { borderColor: color.border, backgroundColor: color.background }] }>
        <View style={ styles.iconContainer }>
          <Icon type='material' name='timer' size={ 36 } color={ color.text } />
        </View>
        <View style={ styles.infoContainer }>
          <Text style={ [styles.infoText, {color: color.text}] }>Started: { startStr }</Text>
          <Text style={ [styles.infoText, {color: color.text}] }>Expires: { endStr }</Text>
          <Text style={ [styles.infoText, {color: color.text}] }>Remaining: { remainStr }</Text>
        </View>
        <View style={ [styles.divider, { borderColor: color.highlight }] } />
        <View style={ styles.rightContainer}>
          <View style={ styles.timerContainer }>
            <View style={ styles.timerTextContainer }>
              <Text style={ [styles.timerText, {color: color.text}] }>{ timeStr }</Text>
            </View>
            <View style={ styles.toolbar }>
              <Button
                icon={{ name: this.state.paused ? 'play-arrow' : 'stop', color: color.text, size: theme.fontSizeLg }}
                buttonStyle={ [styles.button, { backgroundColor: color.background, borderColor: color.text }] }
                titleStyle={{ fontSize: theme.fontSizeSm }}
                onPress={ this.state.paused ? this.onStart : this.onPause } />
            </View>
          </View>
        </View>
      </View>
    );
  }
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