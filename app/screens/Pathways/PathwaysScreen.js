import React, { Component } from 'react'; import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

class PathwaysScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'Pathways',
      headerRight: (
        <Icon
          containerStyle = { styles.headerButton }
          name = 'settings'
          color = { navigationOptions.headerTintColor }
          onPress = {() => {
            navigation.navigate('SettingsScreen');
          }}
        />)
    };
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      pathways: [
        {
          name: 'Asthma',
        },
        {
          name: 'Croup',
        },
        {
          name: 'Septic Shock',
          screen: 'SepsisPathwayScreen',
          params: {}
        }
      ]
    };
  }
  
  renderItem = ({ item }) => (
    <ListItem
      title = { item.name }
      subtitle = { item.subtitle }
      chevron={ !!item.screen }
      onPress={ () => item.screen && this.props.navigation.navigate(item.screen) }
    />
  );

  renderSeparator = () => {
    return <View style={ styles.listSeparator } />
  }

  render() {
    return (
      <View style={ styles.container }>
        <FlatList
          keyExtractor={ (item, index) => index.toString() }
          data={ this.state.pathways }
          renderItem={ this.renderItem }
          ItemSeparatorComponent={ this.renderSeparator }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15
  },
  container: {
    flex: 1,
  },
  listSeparator: {
    borderBottomColor: '#d1d0d4',
    borderBottomWidth: 1
  }
});

export default PathwaysScreen;