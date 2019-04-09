import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { theme } from '../../theme'

class MAPGoalsScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '',
    }
  };

  header = (t) => {
    return (
      <View style={ styles.headerCell }>
        <Text style={ styles.headerCellText }>{ t }</Text>
      </View>
    );
  };
  
  cell = (t) => {
    return (
      <View style={ styles.cell }>
        <Text style={ styles.cellText }>{ t }</Text>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={ styles.container }>
        <View style={ styles.titleContainer }>
          <Text style={ styles.title }>Hypotension & Resuscitation Goals</Text>
        </View>
        <View style={ styles.table }>
          <View style={ styles.headerRow }>
            { this.header() }
            { this.header('Critical Hypotension') }
            { this.header('Hypotension') }
            { this.header('Resuscitation Goal (Minimum') }
            { this.header('Normotension (Median for Age)') }
          </View>
          <View style={ styles.headerRow }>
            { this.header('Age') }
            { this.header('MAP ≤ 1% for age') }
            { this.header('MAP ≤ 5% for age') }
            { this.header('MAP ≥ 10% for age') }
            { this.header('MAP = 50% for age') }
          </View>
          <View style={ styles.tableRow }>
            { this.cell('0-30 days') }
            { this.cell('32') }
            { this.cell('≤ 39') }
            { this.cell('≥ 42') }
            { this.cell('57') }
          </View>
          <View style={ styles.tableRow }>
            { this.cell('31-90 days') }
            { this.cell('37') }
            { this.cell('≤ 44') }
            { this.cell('≥ 47') }
            { this.cell('62') }
          </View>
          <View style={ styles.tableRow }>
            { this.cell('91 days-1 year') }
            { this.cell('41') }
            { this.cell('≤ 48') }
            { this.cell('≥ 52') }
            { this.cell('68') }
          </View>
          <View style={ styles.tableRow }>
            { this.cell('>1-2 years') }
            { this.cell('41') }
            { this.cell('≤ 48') }
            { this.cell('≥ 53') }
            { this.cell('70') }
          </View>
          <View style={ styles.tableRow }>
            { this.cell('>2-4 years') }
            { this.cell('41') }
            { this.cell('≤ 50') }
            { this.cell('≥ 55') }
            { this.cell('70') }
          </View>
          <View style={ styles.tableRow }>
            { this.cell('>4-6 years') }
            { this.cell('43') }
            { this.cell('≤ 51') }
            { this.cell('≥ 56') }
            { this.cell('70') }
          </View>
          <View style={ styles.tableRow }>
            { this.cell('>6-10 years') }
            { this.cell('46') }
            { this.cell('≤ 54') }
            { this.cell('≥ 58') }
            { this.cell('72') }
          </View>
          <View style={ styles.tableRow }>
            { this.cell('>10-13 years') }
            { this.cell('47') }
            { this.cell('≤ 55') }
            { this.cell('≥ 60') }
            { this.cell('74') }
          </View>
          <View style={ styles.tableRow }>
            { this.cell('>13 years') }
            { this.cell('48') }
            { this.cell('≤ 57') }
            { this.cell('≥ 61') }
            { this.cell('76') }
          </View>
        </View>
        <View style={ styles.footer }>
          <Text>Resolution of hypotension = two blood pressure measurements obtained 15 minutes apart with MAP ≥ 10 percentile.</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginRight: 12,
    color: '#ffffff',
    fontSize: 18
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSizeLg,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  table: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    backgroundColor: 'powderblue',
    height: 75,
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerCellText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    paddingTop: 15,
    alignItems: 'center',
  }
});

const tagsStyles = {
  div: {
    textAlign: 'center'
  },
  h4: {
    marginTop: 0,
    paddingBottom: 5,
    fontSize: theme.fontSizeLg,
  }
};

export default MAPGoalsScreen;