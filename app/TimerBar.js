import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { palette } from './common-components'

class TimerBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lapsed: 0,
      duration: this.props.duration || 0,
      start: Date.now()
    };
  
    this.timer = setInterval(this.tick.bind(this), 1000);
  }
  
  tick = () => {
    this.setState({ lapsed: this.state.lapsed + 1 });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  render() {
    const min = Math.floor(this.state.lapsed/60);
    const sec = this.state.lapsed % 60;
    const expired = (this.state.duration > 0) && (this.state.lapsed >= this.state.duration);
    const iconColor = expired ? styles.redIcon : styles.greenIcon;
    const textColor  = expired ? styles.redText : styles.greenText;
    
    return (
      <View style={ styles.container }>
        <View style={ [styles.iconContainer, iconColor] }>
          <Icon type='material' name='timer' size={ 24 } color={ palette.hilite } />
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