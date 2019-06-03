// React Navigation
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

// Screens
import SettingsScreen from './screens/Settings';
import PathwaysScreen from './screens/Pathways';
import { SepsisPathwayScreen, ActivateSepsisPathwayScreen, Sepsis1Screen, Sepsis2Screen, Sepsis3Screen, Sepsis4Screen } from './screens/SepsisPathway';
import SepsisCalcScreen from './screens/SepsisCalc';
import MAPGoalsScreen from './screens/MAPGoals';
import { AsthmaPathwayScreen } from './screens/AsthmaPathway';
import RSCalcScreen from './screens/RSCalc';

// Default styles for navigation header
import { theme } from './theme';
const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.header,
  },
  headerTintColor: theme.headerText
};

// Stack navigator for main screen and Settings
const PathwaysStack = createStackNavigator(
  { PathwaysScreen, SettingsScreen },
  { defaultNavigationOptions });
  
// Stack for specific pathway
const SepsisPathwayStack = createStackNavigator(
  { SepsisPathwayScreen, ActivateSepsisPathwayScreen, Sepsis1Screen, Sepsis2Screen, Sepsis3Screen, Sepsis4Screen, SepsisCalcScreen, MAPGoalsScreen },
  { defaultNavigationOptions });
const AsthmaPathwayStack = createStackNavigator(
  { AsthmaPathwayScreen, RSCalcScreen },
  { defaultNavigationOptions });

// Main stack to swtich between list of pathways and individual pathways
const PathwaysNavigator = createSwitchNavigator(
  {
    Pathways: PathwaysStack,
    Sepsis: SepsisPathwayStack,
    Asthma: AsthmaPathwayStack,
  },
  {
    initialRouteName: 'Pathways',
  });

// Used in App.js as main entry point
const Navigator = PathwaysNavigator;
export default Navigator;