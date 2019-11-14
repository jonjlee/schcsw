import React from 'react';
import * as Permissions from 'expo-permissions';
import { createAppContainer } from 'react-navigation';
import Navigator from './app/Navigator';

const AppContainer = createAppContainer(Navigator);

async function getNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

export default class App extends React.Component {
  componentWillMount() {
    getNotificationPermission();
  }
  render() {
    return <AppContainer />;
  }
}
