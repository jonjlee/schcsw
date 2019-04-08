// React Navigation
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

// Screens
import SettingsScreen from './screens/Settings';
import PathwaysScreen from './screens/Pathways';
import SepsisPathwayScreen from './screens/SepsisPathway';
import ActivateSepsisPathwayScreen from './screens/SepsisPathway/ActivateSepsisPathwayScreen'
import InitialResusScreen from './screens/SepsisPathway/InitialResusScreen'
import OngoingResusScreen from './screens/SepsisPathway/OngoingResusScreen'
import FollowupResusScreen from './screens/SepsisPathway/FollowupResusScreen'
import SepsisAdmitScreen from './screens/SepsisPathway/SepsisAdmitScreen'
import SepsisCalcScreen from './screens/SepsisCalc';
import MAPGoalsScreen from './screens/MAPGoals';

// Default nav styles
const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: '#46bed6',
  },
  headerTintColor: '#ffffff'
};
const styles = {
};

// Stack for list of pathways
const PathwaysStack = createStackNavigator(
  { PathwaysScreen, SettingsScreen },
  { defaultNavigationOptions });
const SepsisPathwayStack = createStackNavigator(
  { SepsisPathwayScreen, SepsisCalcScreen, MAPGoalsScreen, ActivateSepsisPathwayScreen, InitialResusScreen, OngoingResusScreen, FollowupResusScreen, SepsisAdmitScreen },
  { defaultNavigationOptions });

const PathwaysNavigator = createSwitchNavigator(
  {
    Pathways: PathwaysStack,
    Sepsis: SepsisPathwayStack,
  },
  {
    initialRouteName: 'Pathways',
  });

const Navigator = PathwaysNavigator;
export default Navigator;