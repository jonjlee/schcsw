import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SectionHead, Footer, Button, Text } from '../../common-components';
import HTML from 'react-native-render-html';
import createStyles, { theme } from '../../theme';

class RSCalcScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const onAccept = () => {
      // Send selected options and total respiratory score
      const parentOnAccept = navigation.getParam('onAccept');
      const data = navigation.getParam('data');
      if (parentOnAccept) {
        parentOnAccept(data);
      }
      
      navigation.pop();
    };
    
    return {
      title: '',
      headerRight: <Text style={ styles.headerText } onPress={ onAccept }>Accept</Text>
    }
  };

  constructor(props) {
    super(props);

    // Load state from navigation param
    const data = this.props.navigation.getParam('data');
    this.state = {
      selectedAge: data.selectedAge || 0,
      selectedRR: data.selectedRR || 0,
      selectedRetractions: data.selectedRetractions || 0,
      selectedDyspnea: data.selectedDyspnea || 0,
      selectedAuscultation: data.selectedAuscultation || 0,
    }
  }
  
  componentDidMount() {
    // Navigation is a static member, so it needs to be updated with props from current instance
    this.updateNavigation();
  }
  
  updateNavigation = () => {
    // Send current options to our navigation so it can update parent view on completion
    this.props.navigation.setParams({
      data: {
        score: this.getRS(),
        ...this.state
      }
    });
  }
  
  getRROpts = () => {
    // Return corresponding respiratory rates for the selected age group
    console.log(JSON.stringify(this.state))
    const { selectedAge } =  this.state;
    const RRlt2mo = ['≤60', '61-90', '≥70'];
    const RR2moto12mo = ['≤50', '51-59', '≥60'];
    const RR1yrto2yr = ['≤40', '41-44', '≥45'];
    const RR2yrto3yr = ['≤34', '35-39', '≥40'];
    const RR4yrto6yr = ['≤30', '31-35', '≥36'];
    const RR6yrto12yr = ['≤26', '27-30', '≥31'];
    const RRgt12yr = ['≤23', '24-27', '≥28'];
    const ageToRR = {
      0: RRlt2mo,
      1: RR2moto12mo,
      2: RR1yrto2yr,
      3: RR2yrto3yr,
      4: RR4yrto6yr,
      5: RR6yrto12yr,
      6: RRgt12yr,
    }
    return ageToRR[selectedAge];
  }

  getDyspneaOpts = () => {
    // Return corresponding definitions of dyspnea for the selected age group
    const { selectedAge } =  this.state;
    const dyspnea0to2yr = ['Normal feeding, vocalizations and activity', '1 of the following: difficulty feeding, decreased vocalization or agitated', '2 of the following: difficulty feeding, decreased vocalization or agitated', 'Stops feeding, no vocalization, drowsy or confused'];
    const dyspnea2to4yr = ['Normal feeding, vocalizations and play', '1 of the following: decreased appetite, increased coughing after play, hyperactivity', '2 of the following: decreased appetite, increased coughing after play, hyperactivity', 'Stops eating or drinking, stops playing, OR drowsy and confused'];
    const dyspneaGt4yr = ['Counts to ≥10 in one breath', 'Counts to 7-9 in one breath', 'Counts to 4-6 in one breath', 'Counts to ≤3 in one breath'];
    const ageToDyspnea = {
      0: dyspnea0to2yr,
      1: dyspnea0to2yr,
      2: dyspnea0to2yr,
      3: dyspnea2to4yr,
      4: dyspneaGt4yr,
      5: dyspneaGt4yr,
      6: dyspneaGt4yr,
    }
    return ageToDyspnea[selectedAge];
  }

  getRS = () => {
    // Calculate overall respiratory score
    const { selectedRR, selectedRetractions, selectedDyspnea, selectedAuscultation } = this.state;
    return (selectedRR+1) + selectedRetractions + selectedDyspnea + selectedAuscultation;
  }

  // Represents one question with options. Creates a View with a title (e.g. Respiratory Rate:) and a group of option buttons.
  renderItem = (key, title, options, stateEl) => {
    
    // <Button> element that represents a single option which may be selected
    const getOption = (title, i) => {
      
      // Highlight element if selected
      const selected = (i==this.state[stateEl]);
      const titleStyle = selected ? styles.itemSelectedTitle : styles.itemTitle;
      const buttonStyle = selected ? styles.itemSelectedButton : styles.itemButton;
      
      // Top border on all except first element (since container has borders)
      const borderStyle = { borderTopWidth: (i>0) ? 1 : 0 }
      return (
        <Button
          key={ i }
          buttonStyle={ [buttonStyle, borderStyle] }
          titleStyle={ titleStyle }
          title={ title }
          onPress={ () => {
            // Add selected option to state. When state update done, sync navigation state to match so it can be passed back to parent view
            this.setState(
              {[stateEl]: i},
              () => this.updateNavigation());
          }} />
      );
    }

    // Return a View with a item title (e.g. Respiratory Rate:) and a list of options
    return (
      <View key={ key } style={ styles.itemContainer }>
        <Text style={ styles.optionTitle }>{ title }</Text>
        <View style={ styles.optionContainer }>
          {
            options.map((title, i) => getOption(title, i))
          }
        </View>
      </View>
    );
  }

  render() {
    const ageOpts = ['<2mo', '2-12mo', '1-2yr', '2-3yr', '4-5yr', '6-12yr', '>12yr'];
    const rrOpts = this.getRROpts();
    const retractionsOpts = ['None', 'Subcostal or intercostal', '2 of the following: subcostal, intercostal, substernal, OR nasal flaring (infant)', '3 of the following: subcostal, intercostal, substernal, suprasternal, supraclavicular OR nasal flaring / head bobbing (infant)'];
    const dyspneaOpts = this.getDyspneaOpts();
    const auscultationOpts = ['Normal breathing, no wheezing present', 'End-expiratory wheeze only', 'Expiratory wheeze only (greater than end-expiratory wheeze)', 'Inspiratory and expiratory wheeze OR diminished breath sounds OR both'];
    
    return (
      <View style={ styles.container }>
        <ScrollView>
          <SectionHead style={ styles.sectionHead }>Respiratory Score Calculator</SectionHead>
          <View style={ styles.descContainer }>
            <Text>Four elements (based on age) make up this respiratory assessment of the patient in distress. Assess each independently. Total score between 1-12.</Text>
          </View>
          <View style={ styles.itemsContainer }>
            {
              [
                ['Age:', ageOpts, 'selectedAge'],
                ['Respiratory Rate:', rrOpts, 'selectedRR'],
                ['Retractions:', retractionsOpts, 'selectedRetractions'],
                ['Dyspnea:', dyspneaOpts, 'selectedDyspnea'],
                ['Auscultation:', auscultationOpts, 'selectedAuscultation']
              ].map((params, i) => this.renderItem(i, ...params))
            }
          </View>
        </ScrollView>
        <View style={ styles.centeredFooter }>
          <Text style={ styles.scoreText }>Respiratory Score: { this.getRS() }</Text>
        </View>
      </View>
    );
  }
}

const styles = createStyles({
  sectionHead: {
    paddingTop: theme.paddingMd,
    fontWeight: 'bold',
  },
  descContainer: {
    paddingTop: theme.paddingSm,
    paddingHorizontal: theme.paddingMd,
  },
  itemsContainer: {
    padding: theme.paddingSm,
  },
  itemContainer: {
    marginTop: theme.paddingMd,
  },
  optionTitle: {
    fontSize: theme.fontSizeLg,
  },
  optionContainer: {
    marginTop: theme.paddingSm,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  itemButton: {
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  itemSelectedButton: {
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: theme.secondaryButton,
    borderColor: 'black',
  },
  itemTitle: {
    color: theme.text,
  },
  itemSelectedTitle: {
    color: 'white',
  },
  centeredFooter: {
    height: 50,
    marginTop: theme.paddingSm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.footer,
  },
  scoreText: {
    fontSize: theme.fontSizeLg,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default RSCalcScreen;