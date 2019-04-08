// Row element with an icon and an active timer
//
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { palette } from './theme'

class TimerBar extends Component {
  constructor(props) {
    super(props);
    
    // lapsed: number of seconds since timer started
    // duration: number of seconds to set timer for
    // start: time in ms timer was started
    this.state = {
      lapsed: 0,
      duration: this.props.duration || 0,
      start: Date.now()
    };
  
    // Call tick() every second
    this.timer = setInterval(this.tick.bind(this), 1000);
  }
  
  tick = () => {
    this.setState({ lapsed: this.state.lapsed + 1 });
  }

  componentWillUnmount() {
    // Cancel 1 second timer when component destroyed
    clearInterval(this.timer);
  }
  
  render() {
    const min = Math.floor(this.state.lapsed/60);
    const sec = this.state.lapsed % 60;
    
    // Timer turns red after defined duration passes
    const expired = (this.state.duration > 0) && (this.state.lapsed >= this.state.duration);
    const iconColor = expired ? styles.redIcon : styles.greenIcon;
    const textColor  = expired ? styles.redText : styles.greenText;
    
    // View with timer icon on left and time text on right
    return (
      <View style={ styles.container }>
        <View style={ [styles.iconContainer, iconColor] }>
          <Icon type='material' name='timer' size={ 24 } color='white' />
        </View>
        <View style={ styles.textContainer }>
          <Text style={ [styles.timerText, textColor ] }>{ min }:{ ((sec < 10) ? '0' : '') + sec }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    height: 45,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#EEEEEE',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
  },
  greenIcon: {
    backgroundColor: 'limegreen'
  },
  redIcon: {
    backgroundColor: 'tomato'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
  },
  greenText: {
    color: 'green',
  },
  redText: {
    color: 'firebrick',
  },
});

export default TimerBar;