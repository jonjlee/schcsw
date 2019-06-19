import React, { Component } from 'react';
import { Platform, View, ScrollView, Keyboard, InputAccessoryView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Text, Button } from '../../common-components'
import createStyles, { theme } from '../../theme';

class BroselowButtonComponent extends Component {
  render() {
    const { title, color, weight } = this.props;
    const whiteStyle = (color === 'white') ? { borderColor: 'grey', borderWidth: 1 } : {};
    const titleStyle = (color === 'white') ? { color:'black' } : {};

    return (
      <Button
        buttonStyle={ [styles.broselowBtn, {backgroundColor: color}, whiteStyle] }
        titleStyle={ titleStyle }
        title={ title }
        onPress={ () => {
          this.props.navigation.setParams({ ptWeight: weight });
        }}
      />
    );
  }
}
const BroselowButton = withNavigation(BroselowButtonComponent);

export const BroselowAccessoryID = (Platform.OS === 'ios') ? 'broselowAccessory' : null;
export class BroselowAccessory extends Component {
  
  render() {
    // InputAccessoryView only works in iOS in current version of RN
    if (Platform.OS !== 'ios') {
      return null;
    }
    
    return (
      <InputAccessoryView nativeID={ BroselowAccessoryID }>
        <View style={{flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', paddingLeft: 7}}>
          <ScrollView
            horizontal
            style={{flex: 1, flexDirection: 'row'}}
            keyboardShouldPersistTaps="always">
            
            <View style={{ justifyContent: 'center' }}>
              <Text style={{fontSize: theme.fontSizeMd }}>Broselow:</Text>
            </View>
            <BroselowButton color='grey' title="3-5" weight="3"/>
            <BroselowButton color='pink' title="6-7" weight="6"/>
            <BroselowButton color='red' title="8-9" weight="8"/>
            <BroselowButton color='purple' title="10-11" weight="10"/>
            <BroselowButton color='yellow' title="12-14" weight="12"/>
            <BroselowButton color='white' title="15-18" weight="15"/>
            <BroselowButton color='blue' title="19-23" weight="19"/>
            <BroselowButton color='orange' title="24-29" weight="24"/>
            <BroselowButton color='green' title="30-26" weight="30"/>
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              title="Done"
              type="clear"
              onPress={ Keyboard.dismiss } />
          </View>
        </View>
      </InputAccessoryView>
    );
  }
}

const styles = createStyles({
  broselowBtn: {
    paddingVertical: 0,
    paddingHorizontal: 2,
    marginHorizontal: theme.paddingXs,
    height: 25
  },
});

export default {
  View: BroselowAccessory,
  ID: BroselowAccessoryID,
}